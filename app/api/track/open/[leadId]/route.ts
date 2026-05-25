import type { NextRequest } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Pixel tracking de apertura de email.
 *
 * El template HTML del email contiene:
 *   <img src="https://newebd.com/api/track/open/{leadId}" width="1" height="1" />
 *
 * Cuando el cliente de correo carga la imagen → contamos apertura.
 *
 * Limitaciones conocidas:
 *  - Gmail proxea imágenes a través de su CDN, así que veremos "abrió" cuando
 *    Gmail pre-cargó la imagen al recibir el email (en algunos casos, antes de
 *    que el usuario realmente lo abriera). Apple Mail Privacy Protection hace
 *    lo mismo. Esto es estándar en email tracking — el dato es aproximado.
 *  - Si el cliente bloquea imágenes (texto plano), no detectamos apertura.
 *  - Devolvemos siempre el pixel — fallar silenciosamente para no romper el render.
 */

// GIF transparente 1x1
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  "base64",
);

type Params = Promise<{ leadId: string }>;

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { leadId } = await params;

  // Registrar apertura en background — no bloqueamos el response del pixel
  void recordOpen(leadId);

  return new Response(new Uint8Array(PIXEL), {
    headers: {
      "Content-Type": "image/gif",
      "Content-Length": String(PIXEL.length),
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

async function recordOpen(leadId: string): Promise<void> {
  if (!leadId || leadId.length < 8) return;
  const supa = getSupabaseAdmin();
  if (!supa) return;

  try {
    // Fetch primera apertura para no sobreescribir
    const { data: existing } = await supa
      .from("leads")
      .select("email_confirmacion_aperturas, email_confirmacion_primera_apertura_at")
      .eq("id", leadId)
      .single();

    if (!existing) return;

    const now = new Date().toISOString();
    const update: Record<string, unknown> = {
      email_confirmacion_aperturas:
        (existing.email_confirmacion_aperturas ?? 0) + 1,
    };
    if (!existing.email_confirmacion_primera_apertura_at) {
      update.email_confirmacion_primera_apertura_at = now;
    }

    await supa.from("leads").update(update).eq("id", leadId);
  } catch (err) {
    console.error("[track/open] error:", err);
  }
}
