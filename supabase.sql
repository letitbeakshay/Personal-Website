-- Run this in the Supabase dashboard: SQL Editor -> New query -> Run.
-- Used by the "Request access" form on the Private page.
create table if not exists public.access_requests (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) <= 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) <= 1000),
  created_at timestamptz not null default now()
);

alter table public.access_requests enable row level security;

-- Anyone can submit a request; nobody can read, edit or delete via the public key.
-- You read requests in the dashboard Table Editor.
create policy "Anyone can request access"
  on public.access_requests for insert
  to anon
  with check (true);

-- Older table from the first version of the site (contact form). Safe to drop if you ran it:
-- drop table if exists public.messages;
