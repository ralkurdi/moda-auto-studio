-- MODA Auto Studio — initial schema
-- Tables: bookings, gallery_items, reviews, consultations
-- Apply via Supabase Dashboard SQL Editor or `supabase db push` (if using CLI).

-- ───────────────────────────────────────────────────────────────────────────
-- bookings
-- ───────────────────────────────────────────────────────────────────────────
create table public.bookings (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  status               text not null default 'pending'
                         check (status in ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),

  -- Client
  client_name          text,
  client_phone         text not null,
  client_email         text,

  -- Vehicle
  vehicle_year         text,
  vehicle_make         text,
  vehicle_model        text,
  vehicle_trim         text,
  vehicle_tier         text check (vehicle_tier in ('coupe', 'sedan', 'suv', 'truck', 'exotic')),

  -- Service
  services             jsonb not null default '[]'::jsonb,
  notes                text,
  estimated_total      int,

  -- Scheduling
  requested_date       date,
  requested_slot       text,

  -- Deposit
  deposit_required     boolean not null default false,
  deposit_paid         boolean not null default false,
  deposit_stripe_id    text,

  -- Client-facing reference (e.g. "MA-4821")
  reservation_ref      text unique
);

create index bookings_status_idx on public.bookings (status);
create index bookings_created_at_idx on public.bookings (created_at desc);

-- ───────────────────────────────────────────────────────────────────────────
-- gallery_items (case studies)
-- ───────────────────────────────────────────────────────────────────────────
create table public.gallery_items (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  slug                 text not null unique,
  title                text not null,
  vehicle              text,
  service_type         text,
  hours                int,
  warranty             text,
  before_image_url     text,
  after_image_url      text,
  additional_images    jsonb not null default '[]'::jsonb,
  description          text,
  materials_used       jsonb not null default '[]'::jsonb,
  featured             boolean not null default false,
  display_order        int not null default 0
);

create index gallery_items_featured_idx on public.gallery_items (featured) where featured = true;
create index gallery_items_display_order_idx on public.gallery_items (display_order);

-- ───────────────────────────────────────────────────────────────────────────
-- reviews (cached from Google Places API)
-- ───────────────────────────────────────────────────────────────────────────
create table public.reviews (
  id                   uuid primary key default gen_random_uuid(),
  google_id            text unique,
  rating               int not null check (rating between 1 and 5),
  body                 text,
  author               text,
  vehicle              text,
  created_at           timestamptz not null default now(),
  fetched_at           timestamptz not null default now(),
  display              boolean not null default true
);

create index reviews_display_rating_idx on public.reviews (display, rating desc);

-- ───────────────────────────────────────────────────────────────────────────
-- consultations (inbound from About page contact form)
-- ───────────────────────────────────────────────────────────────────────────
create table public.consultations (
  id                   uuid primary key default gen_random_uuid(),
  created_at           timestamptz not null default now(),
  client_name          text,
  client_phone         text not null,
  client_email         text,
  vehicle              text,
  service_interest     text,
  referral_source      text,
  status               text not null default 'new'
                         check (status in ('new', 'contacted', 'booked', 'closed')),
  notes                text
);

create index consultations_status_idx on public.consultations (status);

-- ───────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ───────────────────────────────────────────────────────────────────────────
-- Note: the service role key bypasses RLS, so server-side API routes can
-- always read/write. These policies govern what the anon (public) key can do.
-- ───────────────────────────────────────────────────────────────────────────
alter table public.bookings        enable row level security;
alter table public.gallery_items   enable row level security;
alter table public.reviews         enable row level security;
alter table public.consultations   enable row level security;

-- Bookings: public can insert (the booking form), only authenticated owner can read/update.
create policy "Anyone can submit a booking"
  on public.bookings for insert
  to anon, authenticated
  with check (true);

create policy "Owner can read all bookings"
  on public.bookings for select
  to authenticated
  using (true);

create policy "Owner can update bookings"
  on public.bookings for update
  to authenticated
  using (true)
  with check (true);

-- Gallery items: public read, only authenticated owner can write.
create policy "Anyone can read gallery items"
  on public.gallery_items for select
  to anon, authenticated
  using (true);

create policy "Owner can manage gallery items"
  on public.gallery_items for all
  to authenticated
  using (true)
  with check (true);

-- Reviews: public can read displayable reviews only. Writes happen server-side via service role.
create policy "Anyone can read displayed reviews"
  on public.reviews for select
  to anon, authenticated
  using (display = true);

-- Consultations: public can insert (the contact form), only authenticated owner can read/update.
create policy "Anyone can submit a consultation"
  on public.consultations for insert
  to anon, authenticated
  with check (true);

create policy "Owner can read all consultations"
  on public.consultations for select
  to authenticated
  using (true);

create policy "Owner can update consultations"
  on public.consultations for update
  to authenticated
  using (true)
  with check (true);
