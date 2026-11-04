# Choose Your Vehicle — UAE 4x4 comparison dashboard

Interactive dashboard for comparing 4x4s sold in the UAE **by model year and trim**:
price (AED), horsepower, torque (Nm), real-world km/L, dune score, maintenance score and
overall score. Compare a 2015 Patrol Y61 with a 2024 Patrol Y62 with a 2025 Land Cruiser
J300, and see how each model changed over the years.

- **Frontend:** Vite + React + TypeScript + Apache ECharts (`echarts-for-react`)
- **API:** a small read-only JSON API ([Hono](https://hono.dev)) at `/api`
- **Database:** local **SQLite** (`data/vehicles.db`) using Node's built-in `node:sqlite`
  (no native add-on to compile). Schema is kept Postgres-compatible for a later move.
- **Source of truth:** the TypeScript files in `src/data/brands/`. The DB is built from them.

> **This project uses pnpm only.** Do not use npm (no `package-lock.json`; the lockfile is
> `pnpm-lock.yaml`).

## Requirements

- **Node.js 24+** (`node -v`). The server is TypeScript run directly by Node (type stripping)
  and uses `node:sqlite`, both built in from Node 24.
- **pnpm 10+** (`pnpm -v`). Install it without npm:
  - macOS (Homebrew): `brew install pnpm`
  - or via Corepack: `corepack enable`
  - or the standalone script: `curl -fsSL https://get.pnpm.io/install.sh | sh -`

## Quick start

```bash
cd /Users/danielalvarez/repositories/choose_your_vehicle
pnpm install        # or: make install
pnpm run dev        # or: make dev   -> http://localhost:5173 (dashboard + /api)
```

`pnpm run dev` starts one process: the Vite dev server with the API mounted at `/api`. On first
request it creates `data/vehicles.db`, applies migrations and seeds it from `src/data`. Editing
a data file reseeds automatically.

Production-style run (one Node process serving the built dashboard and the API):

```bash
pnpm run build && pnpm start     # or: make start -> http://localhost:8787
```

## Features

- **Year/trim-aware compare:** pick *Model → Year → Generation · trim · engine* and add it
  (up to 4). Cards show year, generation, engine, fuel, drivetrain, whether the price is a
  **new** or **used-today** price, a **4x4** (low-range 4WD) or **AWD** tag, and an
  **Estimated** tag.
- **Model history by year:** one metric (HP, torque, price, km/L, scores) across model years
  for one model family, one line per generation + engine (e.g. Patrol Y61 TB48 → Y62 V8 → Y63
  twin-turbo). Click a point to add that year to the comparison.
- **Filters:** search, model, model-year range, brand, fuel, drivetrain (4x4 = low-range
  `4WD`, `AWD` = on-demand/road AWD, `RWD`, `FWD`), new/used price basis, max price, min dune
  score.
- **Table:** one row per year/trim variant with a drive tag and curb weight (kg), sortable by
  vehicle, year and every metric;
  `≈` marks estimated figures, `u` marks used-market prices.
- Radar score profile, value map (click a dot to compare), bar charts (your selection, or top 15
  of the filtered list), dark/light theme, responsive.
- The header badge shows **Live API** (data from SQLite) or **Static snapshot** (no API
  reachable, e.g. on GitHub Pages; the bundled data is used instead).

## Catalog

138 year/trim variants · 57 model families · 24 brands (Nov 2026). Live counts: `make data-summary`.

| Brand | Models (generations) |
| --- | --- |
| Nissan | Patrol (Y61, Y62, Y63), X-Terra (N50, D23-based), Pathfinder (R53), Navara PRO-4X (D23) |
| Toyota | Land Cruiser (J200, J300), Land Cruiser 70 (J79), Prado (J150, J250), Fortuner (AN50, AN160), 4Runner (N280, N500), Tundra (XK50, XK70), Sequoia (XK80), Hilux (GLX 2.7, Adventure 4.0 V6) |
| Lexus | LX (LX570, LX600), GX550 |
| Infiniti | QX80 (Z62, Z63) |
| Jeep | Wrangler (JK, JL incl. Sahara, Rubicon, Rubicon 392), Gladiator Rubicon, Grand Cherokee (WL) |
| RAM | 1500 (DS, DT incl. Rebel, TRX, RHO) |
| Ford | Ranger Raptor, F-150 Raptor / Raptor R, Bronco (Badlands, Raptor), Everest (U704), Expedition (U553, U554 Tremor) |
| GMC | Yukon (incl. AT4, Denali), Sierra 1500 (AT4, AT4X, Elevation), Canyon AT4X, Terrain AT4 |
| Land Rover | Defender (110, 130, OCTA), Range Rover (L460), Range Rover Sport (L461) |
| Porsche | Cayenne (92A GTS, 9YA base / S / E-Hybrid / Turbo GT) |
| Jetour (petrol) | T2, T1, X90 Plus, X70 Plus |
| Chevrolet | Tahoe (GMTK2UC, T1UC incl. Z71, High Country), Suburban, Silverado 1500 (Trail Boss, ZR2) |
| Cadillac | Escalade (incl. Escalade-V) |
| Mitsubishi | Pajero (V90), Montero Sport |
| Isuzu | MU-X, D-Max V-Cross |
| Mercedes-Benz | G-Class (W463A: G 500 V8 / I6, AMG G 63), GLE 450 |
| BMW | X5 xDrive40i, X7 (xDrive40i, M60i) |
| Volkswagen | Touareg (2.0 TSI, 3.0 V6) |
| Hyundai | Palisade (LX2, LX3) |
| Kia | Mohave, Telluride |
| Tank (GWM) | Tank 300 (2.0T, Hybrid), Tank 500 (3.0T V6) |
| Haval (GWM) | H9 (2nd gen) |
| Changan | CS95 |
| Geely | Monjaro (AWD crossover, kept for price comparison) |

**All figures are UAE ballpark estimates** (`estimated: true` on every record) for comparison,
not quotes. `priceBasis: 'new'` = dealer price for that model year when new;
`'used'` = typical GCC-spec used price today.

## Data shape

Authoring (`src/data/brands/<brand>.ts`) is nested: **brand → model family → generation →
one record per model year + trim**:

```ts
export const nissan: BrandData = {
  brand: 'Nissan', country: 'Japan',
  families: [{
    name: 'Patrol', bodyType: 'SUV',
    generations: [{
      code: 'Y61', yearStart: 1997, yearEnd: 2024,        // yearEnd: null = still on sale
      variants: [{
        year: 2015, trim: 'Super Safari', engine: '4.8L I6 (TB48DE)',
        fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', // 4WD = low-range 4x4; AWD = no low range
        priceAed: 115000, priceBasis: 'used',
        horsepower: 280, torqueNm: 451, curbWeightKg: 2350, realWorldKmPerL: 5.3,
        duneScore: 9.5, maintenanceScore: 9.5, overallScore: 8.3,
        // estimated defaults to true; set false only with a `source`
        // estimated: false, source: 'Al-Masaood price list 2026-05',
        notes: 'optional free text',
      }],
    }],
  }],
}
```

`src/data/index.ts` flattens that into one `Vehicle` row per variant (types in
`src/data/types.ts`) with a stable id `brand-family-generation-year-trim`, e.g.
`nissan-patrol-y61-2015-super-safari`, and **validates** it on every build/seed: duplicate ids,
a year outside its generation's range, scores outside 0–10 and non-positive specs all fail.

### Updating the data

Two paths. Both end with the same validation and DB reseed, and both feed the
**"data updated …"** date in the dashboard header (`DATA_LAST_UPDATED` = newest of
`BASE_DATA_UPDATED` in `src/data/index.ts` and the latest release batch id).

**A. Monthly releases (new models / model years / price corrections) — no code editing**

```bash
make data-template                         # writes data/releases/TEMPLATE.csv (+ .json)
cp data/releases/TEMPLATE.csv data/releases/2026-12.csv
# fill in one row per new year/trim (delete the EXAMPLE row)
make data-update FILE=data/releases/2026-12.csv DRY=1               # validate only, writes nothing
make data-update FILE=data/releases/2026-12.csv NOTES="Dec releases" # import + reseed
make restart                               # only if the background server (make up) is running
```

What `data-update FILE=…` does (`scripts/data.ts`):

1. Parses the CSV or JSON (`[ {...}, ... ]` or `{ "rows": [...] }`), coerces numbers
   (`"340,000"` is fine) and rejects unknown columns or missing required fields.
2. Applies the rows on top of the whole catalog and runs the same validation as the build:
   duplicate ids, year outside the generation, enums (`fuel`, `drivetrain`, `priceBasis`,
   `bodyType`), scores 0–10, specs > 0. Unusual numbers (e.g. 2 km/L) are printed as warnings.
3. Writes `src/data/releases/<id>.ts` (id defaults to the current month, `ID=2026-12` to set
   it; re-importing into the same id appends), regenerates `src/data/releases/index.ts` and
   appends an entry to `data/CHANGELOG.md`.
4. Reseeds `data/vehicles.db` and prints `db-status`.

Row rules: brand / model (`family`) / `generation` are matched by name. If one doesn't exist
yet it's created, and then `country` (new brand), `bodyType` (new model) and
`generationStart` (new generation) are required. An existing year + trim is rejected unless
the row has `replace=true` (use that for price/spec corrections). Set `estimated=false` only
with a `source`. To drop a bad batch, delete its file and its line in
`src/data/releases/index.ts`.

**B. Larger edits — edit the brand files**

1. Edit `src/data/brands/*.ts`. For a new model year, **add a new variant** rather than
   overwriting the old one, so year-over-year comparison keeps working. New generation → new
   `generations` entry; new model → new `families` entry; new brand → new file, then add it
   to `BASE_BRANDS` in `src/data/index.ts`.
2. Bump `BASE_DATA_UPDATED` in `src/data/index.ts` and add an entry to `data/CHANGELOG.md`.
3. `make data-update` (validate + reseed) or `make check` (lint, validate, type-check, build,
   rebuild the DB). The running server also reseeds itself on restart when the data changed
   (it stores a hash of the data in the DB).

Other helpers: `make data-validate` (no writes), `make data-summary` (counts per brand).

## API

Read-only JSON. `GET /api` lists everything.

| Endpoint | What |
| --- | --- |
| `GET /api/health` | status, variant count, data hash |
| `GET /api/meta` | counts, model-year range, last data update, seeded-at |
| `GET /api/brands` | brands with variant counts |
| `GET /api/models?brand=nissan` | model families → generations → available years |
| `GET /api/models/nissan-patrol` | one family with every year/trim variant, oldest first |
| `GET /api/years` | model years with variant counts |
| `GET /api/variants` | filtered list (below) → `{ total, limit, offset, items }` |
| `GET /api/variants/:id` | one variant (flattened, camelCase) |
| `GET /api/variants/:id/raw` | the raw `variants` table row (snake_case) |

`/api/variants` query params (lists are comma-separated): `brand`, `family` (slug, e.g.
`nissan-patrol`), `generation`, `year`, `yearFrom`, `yearTo`, `fuel`, `drivetrain`,
`bodyType`, `priceMax`, `minDune`, `q` (free text), `sort` (`year`, `price`, `horsepower`,
`torqueNm`, `curbWeightKg` (alias `weight`), `realWorldKmPerL`, `duneScore`, `maintenanceScore`, `overallScore`, `brand`,
`family`), `order` (`asc`/`desc`), `limit` (max 1000, default 200), `offset`.

```bash
curl 'http://localhost:5173/api/variants?family=nissan-patrol&yearFrom=2015&sort=year&order=asc'
curl 'http://localhost:5173/api/variants?brand=gmc,ford&bodyType=Pickup&sort=price&order=asc'
curl  http://localhost:5173/api/variants/nissan-patrol-y62-2024-le-platinum/raw
```

## Database

### Schema (`server/migrations/sqlite/001_init.sql`)

```
brands          (id, slug UNIQUE, name UNIQUE, country)
model_families  (id, brand_id → brands, slug UNIQUE, name, body_type)       UNIQUE(brand_id, name)
generations     (id, family_id → model_families, code, year_start, year_end) UNIQUE(family_id, code)
variants        (id TEXT PK, generation_id → generations, model_year, trim, engine, fuel,
                 drivetrain, transmission, price_aed, price_basis, horsepower, torque_nm,
                 curb_weight_kg, km_per_l, dune_score, maintenance_score, overall_score,
                 estimated, source, notes)                       UNIQUE(generation_id, model_year, trim)
dataset_meta    (key PK, value)       -- last_updated, data_hash, seeded_at
schema_migrations (version PK, applied_at)
VIEW variant_details                  -- variants joined to generation/family/brand (what the API reads)
```

Normalised so adding years/trims/brands is just rows; indexes on `(generation_id, model_year)`,
`model_year`, `price_aed`, `overall_score` and the foreign keys keep filters fast as it grows.
CHECK constraints guard enums and 0–10 scores.

### Commands

| pnpm | make | What |
| --- | --- | --- |
| `pnpm run db:migrate` | `make db-migrate` | apply pending migrations |
| `pnpm run db:seed` | `make db-seed` | reload the catalog from `src/data` (one transaction) |
| `pnpm run db:reset` | `make db-reset` | delete the DB file, migrate and seed |
| `pnpm run db:status` | `make db-status` | applied migrations + dataset counts |
| `pnpm run db:tables` | `make db-tables` | every table/view with row counts + the flat view's columns |
| `pnpm run db:query -- "SQL"` | `make db-query SQL="…" [JSON=1]` | one **read-only** SQL statement (table or JSON) |
| `pnpm run db:export` | `make db-export` | full catalog → `data/export/variants.json` + `.csv` |
| — | `make db-shell` | interactive `sqlite3` shell (needs the sqlite3 CLI; macOS has it) |

Examples:

```bash
make db-query SQL="SELECT brand, COUNT(*) AS variants FROM variant_details GROUP BY brand ORDER BY variants DESC"
make db-query SQL="SELECT id, model_year, trim, price_aed, horsepower FROM variant_details WHERE family = 'Patrol' ORDER BY model_year"
make db-query SQL="SELECT * FROM variants WHERE id = 'nissan-patrol-y62-2024-le-platinum'" JSON=1
```

The DB file is `data/vehicles.db` (git-ignored; it's rebuilt from `src/data`). Override with
`DATABASE_PATH=/some/path.db`. Inspect it with any SQLite tool, e.g.
`sqlite3 data/vehicles.db 'select * from variant_details limit 5'`.

### Schema changes

Add a new numbered file, e.g. `server/migrations/sqlite/002_add_seats.sql` (and the matching
`server/migrations/postgres/002_add_seats.sql`), add the field to `src/data/types.ts`, the seed
(`server/seed.ts`), the view and `toVehicle` in `server/repo.ts`. Migrations run in name order
and each is applied once (tracked in `schema_migrations`).

## Growth path: moving to hosted Postgres later

Local SQLite is the right size today (~140 rows; it is comfortable into the hundreds of thousands).
Move when you need several writers, an admin UI that edits data online, or the API hosted
somewhere without a persistent disk.

What already makes the swap straightforward:

- **Postgres DDL is ready:** `server/migrations/postgres/001_init.sql` mirrors the SQLite one
  (`GENERATED ALWAYS AS IDENTITY`, `NUMERIC(3,1)` scores, `BOOLEAN estimated`). Keep the two
  folders in sync when adding migrations.
- **Portable queries:** `server/repo.ts` uses standard SQL against the `variant_details` view;
  only the placeholder style differs (`?` → `$1, $2…`).
- **One seam:** routes and UI only talk to the `VehicleRepo` interface.

Steps:

1. Create the database and run `server/migrations/postgres/*.sql` in order (`psql "$DATABASE_URL" -f …`).
2. `pnpm add postgres` and write `PgVehicleRepo implements VehicleRepo` (copy
   `SqliteVehicleRepo`, swap placeholders, make the methods `async`, and `await` them in
   `server/app.ts`).
3. Point the seed at Postgres (same inserts; `RETURNING id` already works there).
4. In `server/index.ts` choose the repo by env: `DATABASE_URL` set → Postgres, otherwise SQLite.

Hosting options (from Daniel's research; check current pricing before signing up):

| Option | Cost | Notes |
| --- | --- | --- |
| **Oracle Cloud Always Free** | free | Always Free **Autonomous Database** (2 × 1 OCPU / 20 GB) is **Oracle Database, not Postgres**: it would need an Oracle version of the migrations (`NUMBER`, `VARCHAR2`, identity columns, `FETCH FIRST n ROWS` instead of `LIMIT`) and an Oracle driver. To stay on Postgres for free on Oracle, run Postgres yourself on an **Always Free Ampere A1 VM** instead (you manage backups/updates). |
| GCP Cloud SQL for PostgreSQL | ~$8/month | smallest shared-core instance; managed backups |
| AWS RDS / Azure Database for PostgreSQL | ~$12/month | smallest burstable instance |

## Makefile shortcuts

`make help` lists everything, grouped. All targets call pnpm.

**Run & build**

| Command | What it does |
| --- | --- |
| `make install` | `pnpm install --frozen-lockfile` |
| `make dev` | dev server + API on http://localhost:5173 (foreground, hot reload) |
| `make build` | type-check and build `dist` |
| `make start` | build, then serve dashboard + API on http://localhost:8787 (foreground) |
| `make api` | API (+ `dist` if built) on :8787 with auto-restart on code changes (foreground) |
| `make preview` | static preview of `dist` (no API → static snapshot) on :4173 |

**Middleware in the background** (so you can keep querying it from the same terminal)

| Command | What it does |
| --- | --- |
| `make up` | build, start dashboard + API in the background on :8787, wait for `/api/health` (pid + log in `.run/`) |
| `make down` / `make restart` | stop / restart it |
| `make logs` | follow `.run/server.log` |
| `make server-status` | running? + `/api/health` |

**Query the API** (default `API_URL=http://localhost:8787/api`; with `make dev` use
`API_URL=http://localhost:5173/api`). Output is pretty-printed with `jq` when installed.

| Command | Endpoint |
| --- | --- |
| `make api-index` | `GET /api` (endpoint list) |
| `make api-health` / `api-meta` | `/api/health`, `/api/meta` (counts, year range, last update) |
| `make api-brands` / `api-years` | `/api/brands`, `/api/years` |
| `make api-models [BRAND=toyota]` | `/api/models?brand=` |
| `make api-model MODEL=nissan-patrol` | `/api/models/:familySlug` (every year/trim) |
| `make api-variants Q='brand=toyota&yearFrom=2020&sort=price&order=asc&limit=5'` | `/api/variants?…` |
| `make api-variant ID=nissan-patrol-y62-2024-le-platinum` | `/api/variants/:id` |
| `make api-raw ID=nissan-patrol-y62-2024-le-platinum` | `/api/variants/:id/raw` (raw DB row) |
| `make api-query P='variants?fuel=diesel&limit=3'` | any path under `/api` |

**Database, data and checks**

| Command | What it does |
| --- | --- |
| `make db-tables` / `db-query SQL=…` / `db-export` / `db-shell` | inspect the full DB directly (no server needed) |
| `make db-migrate` / `db-seed` / `db-reset` / `db-status` | DB lifecycle |
| `make data-template` / `data-import FILE=…` / `data-update [FILE=…]` | monthly data updates (see above) |
| `make data-validate` / `data-summary` | check / count the catalog |
| `make lint` / `make typecheck` | oxlint / TypeScript (app + server + scripts) |
| `make check` | lint + validate data + type-check + build + rebuild the DB |
| `make clean` | stop the background server; remove `dist`, the DB, exports, `.run/`, `node_modules` |
| `make docker-build` / `docker-run` | Node image: dashboard + API + SQLite on :8787 |
| `make docker-build-static` / `docker-run-static` | nginx image: dashboard only on :8080 |

Typical "check the full database" session:

```bash
make up                         # dashboard + API on http://localhost:8787
make api-meta                   # counts + last update
make api-brands
make api-model MODEL=toyota-land-cruiser
make db-export                  # everything to data/export/variants.{json,csv}
make down
```

## Docker

Multi-stage `Dockerfile` (pnpm via Corepack in the build stage, no npm):

- default target **`server`**: `node:24-alpine` running `server/index.ts` — dashboard + API +
  SQLite. The DB lives in `/app/data` (volume) and is migrated/seeded on start.
- target **`static`**: `nginx:alpine` serving `dist` only (UI uses the bundled snapshot).

```bash
docker build -t choose-your-vehicle .
docker run --rm -p 8787:8787 -v cyv-data:/app/data choose-your-vehicle   # -> http://localhost:8787
```

(Docker Desktop must be running.)

## Free deployment

- **Static (no API):** Vercel, Netlify, Cloudflare Pages or GitHub Pages — build command
  `pnpm run build`, output `dist`. The dashboard detects there's no `/api` and uses the data
  bundled from `src/data` (header shows *Static snapshot*). The included
  `.github/workflows/deploy-pages.yml` deploys to GitHub Pages on push to `main`
  (*Settings → Pages → Source: GitHub Actions*).
- **With the API:** any host that runs a Docker container or Node 24 with a persistent disk
  (for the SQLite file), or move to hosted Postgres as above.

## Project layout

```
src/
  data/brands/*.ts        <- the catalog, one file per brand (edit these)
  data/index.ts           <- BASE_DATA_UPDATED / DATA_LAST_UPDATED, brand list, flatten + validate
  data/releases/*.ts      <- monthly release batches (generated by data:import)
  data/merge.ts           <- applies release batches on top of the brand files
  data/types.ts           <- data shapes
  lib/api.ts              <- loads data from /api, falls back to the bundled snapshot
  lib/metrics.ts          <- metric labels, units, formatting, "best value" logic
  components/ComparePicker.tsx  <- model -> year -> trim picker
  components/Charts.tsx   <- radar, model history, value map, bar charts
  components/CompareCards.tsx, VehicleTable.tsx
  App.tsx                 <- filters, selection, layout
server/
  app.ts                  <- Hono routes (/api/...)
  repo.ts                 <- VehicleRepo interface + SQLite implementation
  db.ts, bootstrap.ts     <- connection, migrations runner, init
  seed.ts                 <- src/data -> DB
  cli.ts                  <- db:migrate / seed / reset / status / tables / query / export
  index.ts                <- production server (API + dist)
  dev-handler.ts          <- API inside the Vite dev server
  migrations/sqlite/*.sql, migrations/postgres/*.sql
scripts/data.ts           <- data:validate / summary / template / import (monthly updates)
data/vehicles.db          <- local SQLite (git-ignored, rebuilt from src/data)
data/CHANGELOG.md         <- what changed in the data, per release / edit
data/releases/TEMPLATE.*  <- CSV / JSON templates for new releases
data/export/              <- make db-export output (git-ignored)
.run/                     <- make up pid + log (git-ignored)
```
