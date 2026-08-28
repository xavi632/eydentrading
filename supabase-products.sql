create table if not exists public.products (
  sku text primary key,
  title text not null,
  category text not null default 'General',
  price numeric(12, 2) not null default 0,
  image text not null default '',
  in_stock boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists updated_at timestamptz not null default now();

alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
drop policy if exists "Public can add products" on public.products;
drop policy if exists "Public can edit products" on public.products;
drop policy if exists "Public can delete products" on public.products;

create policy "Public can read products"
  on public.products for select
  using (true);

create policy "Public can add products"
  on public.products for insert
  with check (true);

create policy "Public can edit products"
  on public.products for update
  using (true)
  with check (true);

create policy "Public can delete products"
  on public.products for delete
  using (true);
