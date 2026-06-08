# 🌌 E7 Tracker

Personal tracker untuk Epic Seven — Roster, Team Builder, dan Farming Route.

---

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Setup Supabase

Buat project di [supabase.com](https://supabase.com), lalu jalankan SQL ini di **SQL Editor**:

```sql
-- Roster
create table roster (
  id         uuid primary key default gen_random_uuid(),
  hero_id    text not null unique,
  owned      boolean default false,
  built      boolean default false,
  stars      int default 0,
  gear_set   text default '',
  notes      text default '',
  created_at timestamptz default now()
);
alter table roster enable row level security;
create policy "Public" on roster for all using (true) with check (true);

-- Teams
create table teams (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  mode       text default '',
  slot1      text,
  slot2      text,
  slot3      text,
  slot4      text,
  notes      text default '',
  created_at timestamptz default now()
);
alter table teams enable row level security;
create policy "Public" on teams for all using (true) with check (true);

-- Farming log
create table farming_log (
  id          uuid primary key default gen_random_uuid(),
  hunt        text not null,
  date        date not null,
  runs_done   int default 0,
  daily_done  boolean default false,
  target_gear text default '',
  created_at  timestamptz default now(),
  unique(hunt, date)
);
alter table farming_log enable row level security;
create policy "Public" on farming_log for all using (true) with check (true);
```

### 3. Isi kredensial

Copy `.env.example` jadi `.env` dan isi:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Jalankan

```bash
npm run dev
```

---

## Deploy ke Vercel

1. Push ke GitHub
2. Buka [vercel.com](https://vercel.com) → Import repo
3. Tambah environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
4. Deploy — otomatis!

---

## Fitur

- **Roster** — track semua hero E7, toggle owned/built, simpan gear set & notes, filter by element/class
- **Team Builder** — buat & simpan tim untuk berbagai mode (Wyvern, PvP, dll), pilih dari hero yang dimiliki
- **Farming** — checklist harian per hunt, run counter, target gear, progress bar harian, total runs all-time
