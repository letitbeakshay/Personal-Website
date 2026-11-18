-- Private tables for the Bible app (/bible). Only the admin account can read or write them.
-- Verses are stored by book number (1 = Genesis ... 66 = Revelation), chapter and verse,
-- so highlights and notes stay attached if you switch translations later.

create table if not exists public.bible_highlights (
  book int not null check (book between 1 and 66),
  chapter int not null check (chapter > 0),
  verse int not null check (verse > 0),
  color text not null check (color in ('yellow','green','blue','pink','orange')),
  updated_at timestamptz not null default now(),
  primary key (book, chapter, verse)
);

create table if not exists public.bible_notes (
  id uuid primary key default gen_random_uuid(),
  book int not null check (book between 1 and 66),
  chapter int not null check (chapter > 0),
  verse_start int not null check (verse_start > 0),
  verse_end int not null check (verse_end >= verse_start),
  body text not null check (char_length(body) between 1 and 20000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists bible_notes_ref on public.bible_notes (book, chapter);

alter table public.bible_highlights enable row level security;
alter table public.bible_notes enable row level security;

drop policy if exists "Admin only highlights" on public.bible_highlights;
create policy "Admin only highlights" on public.bible_highlights for all to authenticated
  using ((auth.jwt() ->> 'email') = 'toakshayskumar@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'toakshayskumar@gmail.com');

drop policy if exists "Admin only notes" on public.bible_notes;
create policy "Admin only notes" on public.bible_notes for all to authenticated
  using ((auth.jwt() ->> 'email') = 'toakshayskumar@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'toakshayskumar@gmail.com');

-- Added later: notes on a whole chapter (verse 0 means "the chapter itself"). Already applied.
alter table public.bible_notes drop constraint if exists bible_notes_verse_start_check;
alter table public.bible_notes drop constraint if exists bible_notes_verse_end_check;
alter table public.bible_notes add constraint bible_notes_verse_start_check check (verse_start >= 0);
alter table public.bible_notes add constraint bible_notes_verse_end_check check (verse_end >= verse_start);

-- Added later: free-standing "general" notes (book 0, chapter 0, verse 0 = not tied to any verse). Already applied.
alter table public.bible_notes drop constraint if exists bible_notes_book_check;
alter table public.bible_notes drop constraint if exists bible_notes_chapter_check;
alter table public.bible_notes drop constraint if exists bible_notes_general_check;
alter table public.bible_notes add constraint bible_notes_book_check check (book between 0 and 66);
alter table public.bible_notes add constraint bible_notes_chapter_check check (chapter >= 0);
alter table public.bible_notes add constraint bible_notes_general_check check (book > 0 or (chapter = 0 and verse_start = 0 and verse_end = 0));
