import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Tracking de click en link del email + redirección al destino real.
 *
 * Los links del email se reescriben a:
 *   https://newebd.com/api/track/click/{leadId}?to={encodedDestUrl}
 *
 * Cuando el visitante hace click:
 *  1. Registramos el click (URL destino + timestamp)
 *  2. Redirigimos con 302 a la URL real (transparente para el usuario)
 *
 * Validación de seguridad: solo permitimos redireccionar a un conjunto de
 * orígenes whitelisted para evitar que este endpoint se use como open
 * redirector en spam/phishing.
 */

type Params = Promise<{ leadId: string }>;

const ALLOWED_HOSTS = new Set([
  "newebd.com",
  "www.newebd.com",
  "wa.me",
  "api.whatsapp.com",
  "linkedin.com",
  "www.linkedin.com",
  "github.com",
  "supabase.com",
  // dominios de portafolio
  "eyplease.com.mx",
  "myanosa.mx",
  "vegemex.com.mx",
  "www.cloverleafaws.com",
  "americanenglish.mx",
]);

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { leadId } = await params;
  const to = req.nextUrl.searchParams.get("to");

  if (!to) {
    return NextResponse.json({ error: "missing 'to' param" }, { status: 400 });
  }

  // Validar URL destino
  let target: URL;
  try {
    target = new URL(to);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }
  if (target.protocol !== "https:" && target.protocol !== "http:") {
    return NextResponse.json({ error: "scheme not allowed" }, { status: 400 });
  }
  if (!ALLOWED_HOSTS.has(target.hostname)) {
    console.warn(`[track/click] host not allowed: ${target.hostname}`);
    return NextResponse.json({ error: "host not allowed" }, { status: 400 });
  }

  // Registrar click en background
  void recordClick(leadId, target.toString());

  return NextResponse.redirect(target.toString(), 302);
}

async function recordClick(leadId: string, url: string): Promise<void> {
  if (!leadId || leadId.length < 8) return;
  const supa = getSupabaseAdmin();
  if (!supa) return;

  try {
    const { data: existing } = await supa
      .from("leads")
      .select("email_confirmacion_clicks")
      .eq("id", leadId)
      .single();

    if (!existing) return;

    type Click = { url: string; at: string };
    const previous: Click[] = Array.isArray(existing.email_confirmacion_clicks)
      ? (existing.email_confirmacion_clicks as Click[])
      : [];

    const newClicks: Click[] = [
      ...previous,
      { url, at: new Date().toISOString() },
    ];

    await supa
      .from("leads")
      .update({ email_confirmacion_clicks: newClicks })
      .eq("id", leadId);
  } catch (err) {
    console.error("[track/click] error:", err);
  }
}
