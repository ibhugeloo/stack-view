-- ============================================================
-- StackView — Supabase SQL Schema
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- PROJECTS
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#3b82f6',
  description text not null default '',
  environment text not null check (environment in ('production','staging','development','infrastructure')),
  status text not null check (status in ('active','maintenance','archived')) default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- MACHINES
create table public.machines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  name text not null,
  ip text not null,
  is_static boolean not null default true,
  os text not null check (os in ('ubuntu','debian','centos','windows','macos','proxmox','esxi','truenas','pfsense')),
  description text not null default '',
  tasks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- SERVICES
create table public.services (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  machine_id uuid references public.machines(id) on delete set null,
  name text not null,
  description text not null default '',
  category text not null check (category in ('web','database','monitoring','storage','auth','devops','network','other')),
  status text not null check (status in ('running','stopped','degraded','to_test')) default 'to_test',
  url text,
  port integer,
  tasks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- DOMAINS
create table public.domains (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  name text not null,
  provider text not null check (provider in ('cloudflare','lws','ovh','gandi','namecheap','google')),
  dashboard_url text not null default '',
  expires_at date not null,
  auto_renew boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- INDEXES
create index on public.machines(user_id);
create index on public.machines(project_id);
create index on public.services(user_id);
create index on public.services(project_id);
create index on public.domains(user_id);
create index on public.projects(user_id);

-- UPDATED_AT TRIGGER
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_updated_at before update on public.projects for each row execute function public.handle_updated_at();
create trigger machines_updated_at before update on public.machines for each row execute function public.handle_updated_at();
create trigger services_updated_at before update on public.services for each row execute function public.handle_updated_at();
create trigger domains_updated_at before update on public.domains  for each row execute function public.handle_updated_at();

-- ROW LEVEL SECURITY
alter table public.projects enable row level security;
alter table public.machines  enable row level security;
alter table public.services  enable row level security;
alter table public.domains   enable row level security;

create policy "projects_all" on public.projects for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "machines_all" on public.machines for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "services_all" on public.services for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "domains_all"  on public.domains  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
