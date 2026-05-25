/**
 * Rate limiting in-memory sencillo para /api/chat y save_lead.
 *
 * Limitaciones conocidas:
 *  - Memoria por instancia: si escalamos a varias instancias detrás de un LB,
 *    cada una tiene su propio contador. Para 1 instancia en VPS funciona bien.
 *  - Se resetea en cada restart de PM2 — aceptable, el peor caso es que un
 *    abuser pueda hacer +1 request al reiniciar.
 *  - No usa Redis. Si crecemos mucho, migrar a Upstash o Redis local.
 *
 * Estrategia:
 *  - chat per IP: 60 mensajes / hora
 *  - lead per IP: 3 leads / hora (alguien legítimo no debería pasar de 1)
 *  - lead per email: 1 cada 24h (anti-duplicado)
 *  - mensaje individual: máx 2500 caracteres (anti copy-paste de spam masivo)
 */

type Bucket = {
  count: number;
  resetAt: number;
};

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

const chatByIp = new Map<string, Bucket>();
const leadByIp = new Map<string, Bucket>();
const leadByEmail = new Map<string, number>(); // email → último timestamp

/** Máximo mensajes al endpoint /api/chat por IP cada hora. */
const CHAT_PER_IP_PER_HOUR = 60;
/** Máximo leads guardados por IP cada hora. */
const LEAD_PER_IP_PER_HOUR = 3;
/** Tiempo mínimo entre 2 leads del mismo email. */
const LEAD_PER_EMAIL_COOLDOWN_MS = DAY_MS;
/** Tamaño máximo de un mensaje individual del usuario. */
const MAX_MESSAGE_LENGTH = 2500;

export type RateCheckResult = { ok: true } | { ok: false; reason: string };

function checkBucket(
  store: Map<string, Bucket>,
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const b = store.get(key);
  if (!b || b.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count += 1;
  return true;
}

/** Llamar al inicio de POST /api/chat. */
export function checkChatRequest(
  ip: string,
  messages: { content: string }[],
): RateCheckResult {
  if (!checkBucket(chatByIp, ip, CHAT_PER_IP_PER_HOUR, HOUR_MS)) {
    return {
      ok: false,
      reason: `chat:ip exceeded ${CHAT_PER_IP_PER_HOUR} req/h`,
    };
  }
  // Último mensaje del usuario
  const lastUser = [...messages].reverse().find((m) => "role" in m);
  const content = lastUser?.content ?? "";
  if (content.length > MAX_MESSAGE_LENGTH) {
    return {
      ok: false,
      reason: `message too long: ${content.length} > ${MAX_MESSAGE_LENGTH}`,
    };
  }
  return { ok: true };
}

/** Llamar justo antes de hacer el INSERT en leads. */
export function checkLeadCreate(ip: string, email: string): RateCheckResult {
  if (!checkBucket(leadByIp, ip, LEAD_PER_IP_PER_HOUR, HOUR_MS)) {
    return {
      ok: false,
      reason: `lead:ip exceeded ${LEAD_PER_IP_PER_HOUR}/h`,
    };
  }
  const last = leadByEmail.get(email.toLowerCase());
  const now = Date.now();
  if (last && now - last < LEAD_PER_EMAIL_COOLDOWN_MS) {
    const hoursLeft = Math.ceil(
      (LEAD_PER_EMAIL_COOLDOWN_MS - (now - last)) / HOUR_MS,
    );
    return {
      ok: false,
      reason: `lead:email duplicate within ${hoursLeft}h`,
    };
  }
  leadByEmail.set(email.toLowerCase(), now);
  return { ok: true };
}

/** Extrae IP del request — respeta x-forwarded-for porque estamos detrás de Apache. */
export function getClientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}

/** Limpieza periódica para que el Map no crezca infinito. */
function cleanup() {
  const now = Date.now();
  for (const [k, b] of chatByIp) if (b.resetAt < now) chatByIp.delete(k);
  for (const [k, b] of leadByIp) if (b.resetAt < now) leadByIp.delete(k);
  for (const [k, t] of leadByEmail)
    if (now - t > LEAD_PER_EMAIL_COOLDOWN_MS) leadByEmail.delete(k);
}

// Cleanup cada 15 min. setInterval en Node no impide que el proceso termine
// si tiene unref, pero en Next/PM2 el proceso vive siempre.
if (typeof setInterval !== "undefined") {
  const id = setInterval(cleanup, 15 * 60 * 1000);
  if (typeof id === "object" && "unref" in id) id.unref();
}
