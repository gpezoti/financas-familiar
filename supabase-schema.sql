create table if not exists public.finance_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.finance_states enable row level security;

grant select, insert, update, delete on public.finance_states to authenticated;

drop policy if exists "finance_states_select_own" on public.finance_states;
drop policy if exists "finance_states_insert_own" on public.finance_states;
drop policy if exists "finance_states_update_own" on public.finance_states;
drop policy if exists "finance_states_delete_own" on public.finance_states;

create policy "finance_states_select_own"
on public.finance_states
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "finance_states_insert_own"
on public.finance_states
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "finance_states_update_own"
on public.finance_states
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "finance_states_delete_own"
on public.finance_states
for delete
to authenticated
using ((select auth.uid()) = user_id);

