-- Run this once in the Supabase dashboard: SQL Editor -> New query -> Run.
-- Used by the "Let's talk" form.
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Visitors can send a message; nobody can read, edit or delete through the public key.
-- You read messages in the dashboard Table Editor.
drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message"
  on public.messages for insert
  to anon
  with check (true);

-- Unused tables from earlier versions, safe to remove if you created them:
-- drop table if exists public.access_requests;
