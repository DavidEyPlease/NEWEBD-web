-- ============================================================================
-- 002_email_tracking.sql
-- Agrega tracking de apertura y clicks del email de confirmación al visitante.
-- ============================================================================
-- Idempotente: usa ADD COLUMN IF NOT EXISTS. Seguro re-ejecutar.

alter table public.leads
  add column if not exists email_confirmacion_enviada_at timestamptz,
  add column if not exists email_confirmacion_aperturas int not null default 0,
  add column if not exists email_confirmacion_primera_apertura_at timestamptz,
  add column if not exists email_confirmacion_clicks jsonb not null default '[]'::jsonb,
  add column if not exists idioma text not null default 'es' check (idioma in ('es', 'en'));

-- Index para filtrar leads que han abierto el email (engagement)
create index if not exists leads_email_engagement_idx
  on public.leads (email_confirmacion_primera_apertura_at desc nulls last);

-- Index por idioma para análisis de mix ES/EN
create index if not exists leads_idioma_idx on public.leads (idioma);
