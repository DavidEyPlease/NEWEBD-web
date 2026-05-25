import nodemailer, { type Transporter } from "nodemailer";

import type { ChatMessage, SaveLeadInput } from "@/lib/agent/types";

type SendArgs = {
  lead: SaveLeadInput;
  leadId: string;
  conversation: ChatMessage[];
  sessionId: string;
  locale: string;
};

let cachedTransporter: Transporter | null = null;

/**
 * Cliente SMTP que reutiliza la conexión entre llamadas. En producción usa
 * el Exim local del VPS HostGator (localhost:587 STARTTLS) con credenciales
 * de la cuenta noreply@newebd.com. En local sin credenciales, retorna null
 * y la función de envío hace no-op.
 */
function getTransporter(): Transporter | null {
  if (cachedTransporter) return cachedTransporter;
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  cachedTransporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT ?? 587) === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
  return cachedTransporter;
}

/**
 * Devuelve la lista de destinatarios para la notificación interna.
 * LEAD_NOTIFY_EMAIL admite múltiples emails separados por coma.
 */
function getNotifyRecipients(): string[] {
  const raw = process.env.LEAD_NOTIFY_EMAIL ?? "hola@newebd.com";
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

/**
 * Envía email al equipo cuando llega un lead nuevo, y simultáneamente
 * manda una confirmación al visitante. Ambos son fire-and-forget:
 * si fallan, el lead ya está guardado en Supabase.
 */
export async function sendLeadNotification(args: SendArgs): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[smtp] credenciales no configuradas — skipping emails");
    return;
  }

  // Disparamos los 2 en paralelo (no bloquean uno al otro).
  await Promise.all([
    sendInternalNotification(transporter, args),
    sendVisitorConfirmation(transporter, args),
  ]);
}

async function sendInternalNotification(
  transporter: Transporter,
  args: SendArgs,
): Promise<void> {
  const to = getNotifyRecipients();
  const from = process.env.SMTP_FROM ?? "NEWEBD Leads <noreply@newebd.com>";
  const html = renderInternalEmail(args);
  const subject = renderInternalSubject(args.lead, args.locale);
  const text = renderInternalText(args);

  try {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      text,
      replyTo: args.lead.email,
    });
    console.log(
      `[smtp] notificación interna enviada: ${info.messageId} → ${to.join(", ")}`,
    );
  } catch (err) {
    console.error("[smtp] error notificación interna:", err);
  }
}

async function sendVisitorConfirmation(
  transporter: Transporter,
  args: SendArgs,
): Promise<void> {
  const from = process.env.SMTP_FROM ?? "NEWEBD <noreply@newebd.com>";
  // Reply-To apunta a hola@ para que si el visitante responde, llegue al equipo
  // y NO al noreply (que no tiene a nadie leyéndolo).
  const replyTo = process.env.LEAD_REPLY_TO ?? "hola@newebd.com";
  const html = renderVisitorEmail(args);
  const subject = renderVisitorSubject(args.lead, args.locale);
  const text = renderVisitorText(args);

  try {
    const info = await transporter.sendMail({
      from,
      to: args.lead.email,
      subject,
      html,
      text,
      replyTo,
    });
    console.log(
      `[smtp] confirmación a visitante enviada: ${info.messageId} → ${args.lead.email}`,
    );
  } catch (err) {
    console.error("[smtp] error confirmación visitante:", err);
  }
}

// ============================================================================
// SUBJECT LINES
// ============================================================================

function renderInternalSubject(lead: SaveLeadInput, locale: string): string {
  const flag =
    lead.calificacion === "caliente" ? "🔥" : lead.calificacion === "tibio" ? "🌡️" : "❄️";
  if (locale === "en") {
    return `${flag} New lead: ${lead.nombre} (${lead.empresa}) — ${lead.servicio_interes}`;
  }
  return `${flag} Nuevo lead: ${lead.nombre} (${lead.empresa}) — ${lead.servicio_interes}`;
}

function renderVisitorSubject(lead: SaveLeadInput, locale: string): string {
  const firstName = lead.nombre.split(" ")[0];
  if (locale === "en") {
    return `We got your message, ${firstName} 👋`;
  }
  return `Recibimos tu mensaje, ${firstName} 👋`;
}

// ============================================================================
// PLAIN TEXT (fallback para clientes sin HTML)
// ============================================================================

function renderInternalText({
  lead,
  conversation,
  locale,
}: SendArgs): string {
  const t = locale === "en" ? LABELS_EN : LABELS_ES;
  const lines: string[] = [];
  lines.push(`${lead.nombre} — ${lead.empresa}`);
  lines.push(`${t.email}: ${lead.email}`);
  if (lead.telefono) lines.push(`${t.phone}: ${lead.telefono}`);
  lines.push(`${t.service}: ${lead.servicio_interes}`);
  lines.push(`${t.aiApp}: ${lead.aplicacion_ia}`);
  lines.push("");
  lines.push(t.summary + ":");
  lines.push(lead.resumen_proyecto);
  lines.push("");
  lines.push(t.conversation + ":");
  for (const m of conversation) {
    if (m.id === "welcome") continue;
    const who = m.role === "user" ? t.visitor : "NEWEBD AI";
    lines.push(`[${who}] ${m.content}`);
  }
  return lines.join("\n");
}

function renderVisitorText({ lead, locale }: SendArgs): string {
  const firstName = lead.nombre.split(" ")[0];
  const tv = locale === "en" ? VISITOR_EN : VISITOR_ES;
  return [
    `${tv.greeting} ${firstName},`,
    "",
    tv.thanks,
    "",
    `${tv.understoodLabel}:`,
    lead.resumen_proyecto,
    "",
    tv.followUp,
    "",
    tv.reply,
    "",
    `— ${tv.team}`,
    "newebd.com",
  ].join("\n");
}

// ============================================================================
// HTML — Email interno (al equipo)
// ============================================================================

function renderInternalEmail(args: SendArgs): string {
  const { lead, leadId, conversation, sessionId, locale } = args;
  const supabaseProject = extractSupabaseRef(process.env.SUPABASE_URL ?? "");
  const supabaseLink = supabaseProject
    ? `https://supabase.com/dashboard/project/${supabaseProject}/editor?schema=public&table=leads&row=${leadId}`
    : null;

  const flag =
    lead.calificacion === "caliente" ? "🔥" : lead.calificacion === "tibio" ? "🌡️" : "❄️";

  const t = locale === "en" ? LABELS_EN : LABELS_ES;

  const calificacionLabel =
    locale === "en"
      ? lead.calificacion === "caliente"
        ? "Hot"
        : lead.calificacion === "tibio"
          ? "Warm"
          : "Cold"
      : lead.calificacion === "caliente"
        ? "Caliente"
        : lead.calificacion === "tibio"
          ? "Tibio"
          : "Frío";

  const calificacionColor =
    lead.calificacion === "caliente"
      ? "#ff24b8"
      : lead.calificacion === "tibio"
        ? "#bd41e0"
        : "#6cbde7";

  const conversationHtml = conversation
    .filter((m) => m.id !== "welcome")
    .map((m) => {
      const isUser = m.role === "user";
      const bg = isUser ? "#1b073b" : "#0d0420";
      const align = isUser ? "right" : "left";
      const author = isUser ? t.visitor : "NEWEBD AI";
      return `
        <div style="text-align:${align};margin:8px 0;">
          <div style="display:inline-block;max-width:80%;padding:10px 14px;border-radius:12px;background:${bg};border:1px solid rgba(245,243,255,0.08);text-align:left;">
            <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.15em;color:#8b82a8;margin-bottom:4px;">${author}</div>
            <div style="font-size:14px;color:#f5f3ff;white-space:pre-wrap;">${escapeHtml(m.content)}</div>
          </div>
        </div>
      `;
    })
    .join("");

  const phoneLine = lead.telefono
    ? `<tr><td style="padding:6px 0;color:#8b82a8;font-size:13px;width:120px;">${t.phone}</td><td style="padding:6px 0;color:#f5f3ff;font-size:14px;"><a href="https://wa.me/${lead.telefono.replace(/\D/g, "")}" style="color:#6cbde7;text-decoration:none;">${escapeHtml(lead.telefono)}</a></td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(renderInternalSubject(lead, locale))}</title>
</head>
<body style="margin:0;padding:0;background:#0d0420;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#ff24b8 0%,#bd41e0 40%,#6cbde7 100%);padding:1px;border-radius:20px;">
      <div style="background:#1b073b;border-radius:19px;padding:32px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px;">
          <div style="font-size:14px;font-weight:600;letter-spacing:0.12em;color:#f5f3ff;text-transform:uppercase;">NEWEBD</div>
          <div style="flex:1;height:1px;background:rgba(245,243,255,0.08);"></div>
        </div>

        <div style="display:inline-block;padding:6px 14px;border-radius:999px;background:${calificacionColor}22;border:1px solid ${calificacionColor};color:${calificacionColor};font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;margin-bottom:16px;">
          ${flag} ${calificacionLabel}
        </div>

        <h1 style="margin:0 0 8px;font-size:24px;line-height:1.2;color:#f5f3ff;font-weight:600;">
          ${escapeHtml(lead.nombre)}
        </h1>
        <p style="margin:0 0 24px;color:#c4bce0;font-size:15px;">
          ${escapeHtml(lead.empresa)} · ${escapeHtml(lead.servicio_interes)}
        </p>

        <table cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid rgba(245,243,255,0.08);margin-top:8px;">
          <tr><td style="padding:12px 0 6px;color:#8b82a8;font-size:13px;width:120px;">${t.email}</td><td style="padding:12px 0 6px;color:#f5f3ff;font-size:14px;"><a href="mailto:${lead.email}" style="color:#6cbde7;text-decoration:none;">${escapeHtml(lead.email)}</a></td></tr>
          ${phoneLine}
          <tr><td style="padding:6px 0;color:#8b82a8;font-size:13px;">${t.aiApp}</td><td style="padding:6px 0;color:#f5f3ff;font-size:14px;">${escapeHtml(lead.aplicacion_ia)}</td></tr>
        </table>

        <div style="margin-top:24px;padding:16px;background:rgba(245,243,255,0.03);border:1px solid rgba(245,243,255,0.08);border-radius:12px;">
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.18em;color:#8b82a8;margin-bottom:8px;">${t.summary}</div>
          <p style="margin:0;font-size:14px;line-height:1.55;color:#f5f3ff;">${escapeHtml(lead.resumen_proyecto)}</p>
        </div>

        <div style="margin:24px 0 16px;">
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.18em;color:#8b82a8;margin-bottom:12px;">${t.conversation}</div>
          ${conversationHtml || `<p style="color:#8b82a8;font-size:13px;font-style:italic;">${t.noConversation}</p>`}
        </div>

        <div style="margin-top:24px;display:flex;flex-wrap:wrap;gap:8px;">
          ${supabaseLink ? `<a href="${supabaseLink}" style="display:inline-block;padding:10px 18px;background:linear-gradient(120deg,#ff24b8,#bd41e0,#6cbde7);color:#fff;text-decoration:none;border-radius:999px;font-size:13px;font-weight:600;">${t.viewInSupabase}</a>` : ""}
          <a href="mailto:${lead.email}?subject=${encodeURIComponent(t.replySubject + " " + lead.empresa)}" style="display:inline-block;padding:10px 18px;background:rgba(245,243,255,0.06);color:#f5f3ff;text-decoration:none;border-radius:999px;font-size:13px;font-weight:500;border:1px solid rgba(245,243,255,0.16);">${t.replyByEmail}</a>
          ${lead.telefono ? `<a href="https://wa.me/${lead.telefono.replace(/\D/g, "")}" style="display:inline-block;padding:10px 18px;background:rgba(108,189,231,0.12);color:#6cbde7;text-decoration:none;border-radius:999px;font-size:13px;font-weight:500;border:1px solid rgba(108,189,231,0.3);">${t.replyByWhatsapp}</a>` : ""}
        </div>

        <div style="margin-top:24px;padding-top:16px;border-top:1px solid rgba(245,243,255,0.08);font-size:11px;color:#8b82a8;">
          ${t.locale}: ${locale === "en" ? "English" : "Español"} · ${t.session}: ${escapeHtml(sessionId)}
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================================
// HTML — Email confirmación al visitante
// ============================================================================

function renderVisitorEmail(args: SendArgs): string {
  const { lead, locale } = args;
  const tv = locale === "en" ? VISITOR_EN : VISITOR_ES;
  const firstName = lead.nombre.split(" ")[0];
  const homeUrl = locale === "en" ? "https://newebd.com/en" : "https://newebd.com";
  const portfolioUrl =
    locale === "en" ? "https://newebd.com/en/portfolio" : "https://newebd.com/portafolio";

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(renderVisitorSubject(lead, locale))}</title>
</head>
<body style="margin:0;padding:0;background:#0d0420;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:linear-gradient(135deg,#ff24b8 0%,#bd41e0 40%,#6cbde7 100%);padding:1px;border-radius:20px;">
      <div style="background:#1b073b;border-radius:19px;padding:36px 32px;">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="font-size:18px;font-weight:700;letter-spacing:0.14em;color:#f5f3ff;text-transform:uppercase;">NEWEBD</div>
          <div style="margin-top:8px;font-size:11px;letter-spacing:0.2em;color:#8b82a8;text-transform:uppercase;">${tv.tagline}</div>
        </div>

        <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#f5f3ff;font-weight:600;">
          ${tv.greeting} ${escapeHtml(firstName)} 👋
        </h1>

        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#c4bce0;">
          ${tv.thanks}
        </p>

        <div style="margin:24px 0;padding:18px;background:rgba(245,243,255,0.03);border:1px solid rgba(245,243,255,0.08);border-radius:12px;">
          <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.18em;color:#8b82a8;margin-bottom:8px;">${tv.understoodLabel}</div>
          <p style="margin:0;font-size:14px;line-height:1.55;color:#f5f3ff;">${escapeHtml(lead.resumen_proyecto)}</p>
        </div>

        <p style="margin:20px 0 28px;font-size:15px;line-height:1.6;color:#c4bce0;">
          ${tv.followUp}
        </p>

        <div style="text-align:center;margin:28px 0;">
          <a href="${portfolioUrl}" style="display:inline-block;padding:12px 24px;background:linear-gradient(120deg,#ff24b8,#bd41e0,#6cbde7);color:#fff;text-decoration:none;border-radius:999px;font-size:14px;font-weight:600;">
            ${tv.ctaPortfolio}
          </a>
        </div>

        <p style="margin:24px 0 0;font-size:13px;line-height:1.5;color:#8b82a8;">
          ${tv.reply}
        </p>

        <div style="margin-top:28px;padding-top:20px;border-top:1px solid rgba(245,243,255,0.08);font-size:12px;color:#8b82a8;text-align:center;">
          <a href="${homeUrl}" style="color:#6cbde7;text-decoration:none;">newebd.com</a>
          <br /><br />
          <span style="font-size:11px;">${tv.footer}</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// ============================================================================
// LABELS
// ============================================================================

const LABELS_ES = {
  email: "Email",
  phone: "Teléfono",
  service: "Servicio",
  aiApp: "Aplicación IA",
  summary: "Resumen del proyecto",
  conversation: "Conversación",
  noConversation: "Sin conversación adjunta.",
  viewInSupabase: "Ver en Supabase",
  replyByEmail: "Responder por email",
  replyByWhatsapp: "Responder por WhatsApp",
  replySubject: "Hola desde NEWEBD —",
  locale: "Idioma",
  session: "Sesión",
  visitor: "Visitante",
};

const LABELS_EN = {
  email: "Email",
  phone: "Phone",
  service: "Service",
  aiApp: "AI use case",
  summary: "Project summary",
  conversation: "Conversation",
  noConversation: "No conversation attached.",
  viewInSupabase: "View in Supabase",
  replyByEmail: "Reply by email",
  replyByWhatsapp: "Reply by WhatsApp",
  replySubject: "Hi from NEWEBD —",
  locale: "Language",
  session: "Session",
  visitor: "Visitor",
};

const VISITOR_ES = {
  tagline: "El nuevo desarrollo web es con IA",
  greeting: "Hola",
  thanks:
    "Gracias por escribirnos. Recibimos tu mensaje y el equipo ya lo está revisando.",
  understoodLabel: "Esto fue lo que entendimos de tu proyecto",
  followUp:
    "Te contactaremos pronto, normalmente en menos de un día hábil. Si tu caso es urgente o quieres compartirnos más detalles, simplemente responde a este correo.",
  ctaPortfolio: "Mira nuestros casos",
  reply:
    "Puedes responder este email directamente — llega al equipo (no a un buzón automático).",
  team: "Equipo NEWEBD",
  footer:
    "Este correo se generó automáticamente porque iniciaste una conversación con nuestro agente IA en newebd.com.",
};

const VISITOR_EN = {
  tagline: "The new web development is with AI",
  greeting: "Hi",
  thanks:
    "Thanks for reaching out. We got your message and the team is already reviewing it.",
  understoodLabel: "Here's what we understood about your project",
  followUp:
    "We'll get back to you soon, usually within one business day. If your case is urgent or you want to share more details, just reply to this email.",
  ctaPortfolio: "See our cases",
  reply:
    "You can reply directly to this email — it goes straight to the team (not an automated mailbox).",
  team: "NEWEBD Team",
  footer:
    "This email was generated automatically because you started a conversation with our AI agent at newebd.com.",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractSupabaseRef(url: string): string | null {
  const m = url.match(/https?:\/\/([^.]+)\.supabase\.co/);
  return m ? m[1] : null;
}
