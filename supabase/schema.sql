-- Enable required extensions
create extension if not exists pgcrypto;

-- Leads table
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agent_id uuid not null,
  property_type text not null,
  district text,
  budget_min numeric,
  budget_max numeric,
  timeline text,
  mortgage boolean not null default false,
  name text not null,
  phone text not null,
  email text,
  status text not null default 'new',
  constraint leads_status_check check (status in ('new', 'in_progress', 'closed'))
);

create index if not exists leads_agent_id_idx on public.leads (agent_id);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Lead events for simple analytics
create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  agent_id uuid not null,
  event_type text not null,
  source text,
  constraint lead_events_type_check check (event_type in ('form_view', 'form_submit', 'form_success'))
);

create index if not exists lead_events_agent_id_idx on public.lead_events (agent_id);
create index if not exists lead_events_created_at_idx on public.lead_events (created_at desc);

-- Optional notes for a lead
create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  note text not null,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id);

-- Row level security
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.lead_events enable row level security;

-- Leads policies: owner-only read/update/delete
create policy "leads_select_own"
  on public.leads
  for select
  to authenticated
  using (agent_id = auth.uid());

create policy "leads_update_own"
  on public.leads
  for update
  to authenticated
  using (agent_id = auth.uid())
  with check (agent_id = auth.uid());

create policy "leads_delete_own"
  on public.leads
  for delete
  to authenticated
  using (agent_id = auth.uid());

-- Notes policies: owner-only access via lead
create policy "lead_notes_select_own"
  on public.lead_notes
  for select
  to authenticated
  using (
    exists (
      select 1 from public.leads
      where leads.id = lead_notes.lead_id
        and leads.agent_id = auth.uid()
    )
  );

create policy "lead_notes_insert_own"
  on public.lead_notes
  for insert
  to authenticated
  with check (
    exists (
      select 1 from public.leads
      where leads.id = lead_notes.lead_id
        and leads.agent_id = auth.uid()
    )
  );

create policy "lead_notes_update_own"
  on public.lead_notes
  for update
  to authenticated
  using (
    exists (
      select 1 from public.leads
      where leads.id = lead_notes.lead_id
        and leads.agent_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.leads
      where leads.id = lead_notes.lead_id
        and leads.agent_id = auth.uid()
    )
  );

create policy "lead_notes_delete_own"
  on public.lead_notes
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.leads
      where leads.id = lead_notes.lead_id
        and leads.agent_id = auth.uid()
    )
  );

-- Lead events policies: owner-only access
create policy "lead_events_select_own"
  on public.lead_events
  for select
  to authenticated
  using (agent_id = auth.uid());

create policy "lead_events_insert_own"
  on public.lead_events
  for insert
  to authenticated
  with check (agent_id = auth.uid());

create policy "lead_events_delete_own"
  on public.lead_events
  for delete
  to authenticated
  using (agent_id = auth.uid());
