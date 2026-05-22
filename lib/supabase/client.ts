import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase para uso server-side (API routes).
 * Usa service_role key — NO exponer al cliente.
 *
 * Si las variables de entorno no están configuradas, retorna null y los
 * endpoints operan en modo demo (sin persistencia).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type LeadRow = {
  nombre: string;
  email: string;
  telefono?: string | null;
  empresa: string;
  servicio_interes: string;
  aplicacion_ia: string;
  resumen_proyecto: string;
  calificacion: "caliente" | "tibio" | "frio";
  canal?: string;
  conversacion?: unknown;
  user_agent?: string | null;
  ip_hash?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};
