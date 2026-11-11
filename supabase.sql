-- Run this ONCE in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- BEFORE running: replace YOUR_EMAIL (appears 4 times below) with the email of your admin user, in lowercase.
-- Then create that user: Authentication -> Users -> Add user -> your email and your admin password.
-- Then switch OFF public sign-ups: Authentication -> Sign In / Providers -> "Allow new users to sign up".

create table if not exists public.entries (
  id text primary key,
  kind text not null check (kind in ('thought','resource','memory','faith','experiment')),
  tag text not null default '',
  date date not null default current_date,
  title text not null check (char_length(title) <= 200),
  summary text not null default '' check (char_length(summary) <= 400),
  body text not null default '' check (char_length(body) <= 20000),
  hypothesis text not null default '',
  result text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.entries enable row level security;
alter table public.content enable row level security;

-- Everyone can read what is published on the site.
drop policy if exists "Public read entries" on public.entries;
create policy "Public read entries" on public.entries for select to anon, authenticated using (true);
drop policy if exists "Public read content" on public.content;
create policy "Public read content" on public.content for select to anon, authenticated using (true);

-- Only your one admin account can create, change or delete anything.
drop policy if exists "Admin write entries" on public.entries;
create policy "Admin write entries" on public.entries for all to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'YOUR_EMAIL');

drop policy if exists "Admin write content" on public.content;
create policy "Admin write content" on public.content for all to authenticated
  using ((auth.jwt() ->> 'email') = 'YOUR_EMAIL')
  with check ((auth.jwt() ->> 'email') = 'YOUR_EMAIL');
