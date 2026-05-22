-- ============================================================================
-- NEWEBD — Schema de Supabase para leads y conversaciones
-- ============================================================================
-- Cómo aplicar:
-- 1. Crea proyecto en https://supabase.com
-- 2. SQL Editor → New query → Pega este archivo → Run
-- 3. Copia URL + anon key + service_role key del Project Settings → API
-- 4. Pégalas en /Users/dave/Code/newebd-web/.env.local
-- ============================================================================

-- Extensión para generar UUIDs
create extension if not exists "pgcrypto";

-- ============================================================================
-- Tabla: leads
-- ============================================================================
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),

  -- Datos del contacto
  nombre text not null,
  email text not null,
  telefono text,
  empresa text not null,

  -- Proyecto
  servicio_interes text not null,
  aplicacion_ia text not null,
  resumen_proyecto text not null,
  calificacion text not null check (calificacion in ('caliente', 'tibio', 'frio')),

  -- Origen y estado
  canal text not null default 'chat_web' check (canal in ('chat_web', 'whatsapp', 'formulario', 'manual')),
  estado text not null default 'nuevo' check (estado in ('nuevo', 'contactado', 'cotizado', 'ganado', 'perdido')),

  -- Conversación completa (para revisar contexto cuando el humano contacta)
  conversacion jsonb,

  -- Metadata
  user_agent text,
  ip_hash text,
  utm_source text,
  utm_medium text,
  utm_campaign text,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  contactado_at timestamptz
);

-- Indexes
create index if not exists leads_email_idx on public.leads (email);
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_estado_idx on public.leads (estado);
create index if not exists leads_calificacion_idx on public.leads (calificacion);

-- Trigger para actualizar updated_at automáticamente
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_updated_at_trigger on public.leads;
create trigger leads_updated_at_trigger
  before update on public.leads
  for each row
  execute function public.set_updated_at();

-- ============================================================================
-- Tabla: conversations (chat sessions completas, incluso las que no convierten)
-- ============================================================================
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),

  -- Vinculación con lead (opcional — pueden existir conversaciones sin lead)
  lead_id uuid references public.leads(id) on delete set null,

  -- Datos de la sesión
  session_id text not null,  -- identificador del cliente (localStorage)
  canal text not null default 'chat_web',

  -- Mensajes
  mensajes jsonb not null default '[]'::jsonb,
  total_mensajes int not null default 0,

  -- Estado
  estado text not null default 'activa' check (estado in ('activa', 'finalizada_lead', 'finalizada_sin_lead', 'handoff_humano', 'abandonada')),
  razon_finalizacion text,

  -- Metadata
  user_agent text,
  ip_hash text,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_session_id_idx on public.conversations (session_id);
create index if not exists conversations_lead_id_idx on public.conversations (lead_id);
create index if not exists conversations_estado_idx on public.conversations (estado);

drop trigger if exists conversations_updated_at_trigger on public.conversations;
create trigger conversations_updated_at_trigger
  before update on public.conversations
  for each row
  execute function public.set_updated_at();

-- ============================================================================
-- Row Level Security (RLS)
-- ============================================================================
-- Lectura solo desde el lado servidor con service_role key.
-- El widget de chat usa el endpoint /api/chat que llama Supabase con service_role.
-- El público (anon key) NO puede leer ni escribir directamente.

alter table public.leads enable row level security;
alter table public.conversations enable row level security;

-- Política: anon no puede ver nada (todas las queries son vía API route)
drop policy if exists "no_anon_access_leads" on public.leads;
create policy "no_anon_access_leads"
  on public.leads
  for all
  to anon
  using (false);

drop policy if exists "no_anon_access_conversations" on public.conversations;
create policy "no_anon_access_conversations"
  on public.conversations
  for all
  to anon
  using (false);

-- Política: service_role puede todo (lo usa nuestro API route)
drop policy if exists "service_role_full_access_leads" on public.leads;
create policy "service_role_full_access_leads"
  on public.leads
  for all
  to service_role
  using (true)
  with check (true);

drop policy if exists "service_role_full_access_conversations" on public.conversations;
create policy "service_role_full_access_conversations"
  on public.conversations
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================================
-- Vista útil: leads recientes con resumen
-- ============================================================================
create or replace view public.leads_recientes as
select
  id,
  created_at,
  nombre,
  email,
  empresa,
  servicio_interes,
  calificacion,
  estado,
  substring(resumen_proyecto, 1, 120) as resumen_corto
from public.leads
order by created_at desc
limit 50;

-- ============================================================================
-- Ready!
-- ============================================================================
-- Verifica: select count(*) from public.leads;  -- debería retornar 0
