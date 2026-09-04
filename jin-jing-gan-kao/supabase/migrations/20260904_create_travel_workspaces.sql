create table if not exists public.travel_workspaces (
  user_id uuid primary key references auth.users (id) on delete cascade,
  workspace jsonb not null default '{"version": 1}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint travel_workspaces_workspace_object
    check (jsonb_typeof(workspace) = 'object'),
  constraint travel_workspaces_workspace_size
    check (pg_column_size(workspace) <= 1048576)
);

comment on table public.travel_workspaces is
  'One versioned travel-planning workspace per authenticated user.';

alter table public.travel_workspaces enable row level security;

revoke all on table public.travel_workspaces from anon, authenticated;
grant select, insert, update on table public.travel_workspaces to authenticated;

drop policy if exists "Users can view their own travel workspace" on public.travel_workspaces;
drop policy if exists "Users can create their own travel workspace" on public.travel_workspaces;
drop policy if exists "Users can update their own travel workspace" on public.travel_workspaces;

create policy "Users can view their own travel workspace"
  on public.travel_workspaces
  for select
  to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users can create their own travel workspace"
  on public.travel_workspaces
  for insert
  to authenticated
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

create policy "Users can update their own travel workspace"
  on public.travel_workspaces
  for update
  to authenticated
  using ((select auth.uid()) is not null and (select auth.uid()) = user_id)
  with check ((select auth.uid()) is not null and (select auth.uid()) = user_id);

