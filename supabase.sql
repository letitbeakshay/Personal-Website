-- Run this in the Supabase dashboard: SQL Editor -> New query -> Run.
create table if not exists public.messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Anyone can submit a message; nobody can read, edit or delete via the public key.
-- You read messages in the dashboard Table Editor.
create policy "Anyone can send a message"
  on public.messages for insert
  to anon
  with check (true);
