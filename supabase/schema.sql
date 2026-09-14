-- Dream Big for Children — admin/content schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).

-- ── Gallery images ──────────────────────────────────────────────
create table if not exists gallery_images (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  storage_path text not null,
  alt text not null default '',
  caption text,
  location text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gallery_images_section_created_idx
  on gallery_images (section, created_at desc);

-- ── Stories / blog posts ────────────────────────────────────────
create table if not exists stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  cover_storage_path text,
  content_html text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists stories_status_published_idx
  on stories (status, published_at desc);

-- ── Site content blocks (hero text, quote band, etc.) ───────────
-- `page` + `block_key` identify an editable region; `data` holds its
-- fields (heading, body, image path, ...) as arbitrary JSON so new
-- block shapes don't require schema changes.
create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  block_key text not null,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (page, block_key)
);

-- ── updated_at triggers ──────────────────────────────────────────
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists stories_set_updated_at on stories;
create trigger stories_set_updated_at
  before update on stories
  for each row execute function set_updated_at();

drop trigger if exists site_content_set_updated_at on site_content;
create trigger site_content_set_updated_at
  before update on site_content
  for each row execute function set_updated_at();

-- ── Row Level Security ───────────────────────────────────────────
-- Public can read gallery images, published stories, and site content.
-- Only authenticated users (the admin) can write. Since this is a
-- single-admin site, any logged-in user is treated as an admin.
alter table gallery_images enable row level security;
alter table stories enable row level security;
alter table site_content enable row level security;

create policy "gallery_images_public_read" on gallery_images
  for select using (true);
create policy "gallery_images_admin_write" on gallery_images
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "stories_public_read_published" on stories
  for select using (status = 'published' or auth.role() = 'authenticated');
create policy "stories_admin_write" on stories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "site_content_public_read" on site_content
  for select using (true);
create policy "site_content_admin_write" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ── Storage buckets ──────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('stories', 'stories', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('site-content', 'site-content', true)
on conflict (id) do nothing;

create policy "gallery_bucket_public_read" on storage.objects
  for select using (bucket_id = 'gallery');
create policy "gallery_bucket_admin_write" on storage.objects
  for all using (bucket_id = 'gallery' and auth.role() = 'authenticated')
  with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "stories_bucket_public_read" on storage.objects
  for select using (bucket_id = 'stories');
create policy "stories_bucket_admin_write" on storage.objects
  for all using (bucket_id = 'stories' and auth.role() = 'authenticated')
  with check (bucket_id = 'stories' and auth.role() = 'authenticated');

create policy "site_content_bucket_public_read" on storage.objects
  for select using (bucket_id = 'site-content');
create policy "site_content_bucket_admin_write" on storage.objects
  for all using (bucket_id = 'site-content' and auth.role() = 'authenticated')
  with check (bucket_id = 'site-content' and auth.role() = 'authenticated');
