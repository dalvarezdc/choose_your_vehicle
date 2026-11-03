-- 001_init: normalised catalog. brand -> model family -> generation -> year/trim variant.
-- Postgres (e.g. Neon) version of ../sqlite/001_init.sql. Keep the two in sync.

CREATE TABLE brands (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug      TEXT NOT NULL UNIQUE,
  name      TEXT NOT NULL UNIQUE,
  country   TEXT
);

CREATE TABLE model_families (
  id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand_id  INTEGER NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  slug      TEXT NOT NULL UNIQUE,
  name      TEXT NOT NULL,
  body_type TEXT NOT NULL CHECK (body_type IN ('SUV', 'Pickup')),
  UNIQUE (brand_id, name)
);
CREATE INDEX idx_model_families_brand ON model_families(brand_id);

CREATE TABLE generations (
  id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  family_id  INTEGER NOT NULL REFERENCES model_families(id) ON DELETE CASCADE,
  code       TEXT NOT NULL,
  year_start INTEGER NOT NULL,
  year_end   INTEGER,              -- NULL = still on sale
  UNIQUE (family_id, code)
);
CREATE INDEX idx_generations_family ON generations(family_id);

CREATE TABLE variants (
  id                TEXT PRIMARY KEY,   -- stable slug: brand-family-generation-year-trim
  generation_id     INTEGER NOT NULL REFERENCES generations(id) ON DELETE CASCADE,
  model_year        INTEGER NOT NULL,
  trim              TEXT NOT NULL,
  engine            TEXT NOT NULL,
  fuel              TEXT NOT NULL CHECK (fuel IN ('petrol', 'diesel', 'hybrid')),
  drivetrain        TEXT NOT NULL CHECK (drivetrain IN ('4WD', 'AWD', 'RWD', 'FWD')),
  transmission      TEXT,
  price_aed         INTEGER NOT NULL CHECK (price_aed > 0),
  price_basis       TEXT NOT NULL CHECK (price_basis IN ('new', 'used')),
  horsepower        INTEGER NOT NULL,
  torque_nm         INTEGER NOT NULL,
  km_per_l          NUMERIC(4,1) NOT NULL,
  dune_score        NUMERIC(3,1) NOT NULL CHECK (dune_score BETWEEN 0 AND 10),
  maintenance_score NUMERIC(3,1) NOT NULL CHECK (maintenance_score BETWEEN 0 AND 10),
  overall_score     NUMERIC(3,1) NOT NULL CHECK (overall_score BETWEEN 0 AND 10),
  estimated         BOOLEAN NOT NULL DEFAULT TRUE,
  source            TEXT,
  notes             TEXT,
  UNIQUE (generation_id, model_year, trim)
);
CREATE INDEX idx_variants_generation_year ON variants(generation_id, model_year);
CREATE INDEX idx_variants_year ON variants(model_year);
CREATE INDEX idx_variants_price ON variants(price_aed);
CREATE INDEX idx_variants_overall ON variants(overall_score);

-- Key/value facts about the loaded dataset (last_updated, data_hash, seeded_at).
CREATE TABLE dataset_meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Flat read model used by the API.
CREATE VIEW variant_details AS
SELECT
  v.id, b.name AS brand, b.slug AS brand_slug, f.name AS family, f.slug AS family_slug,
  f.body_type, g.code AS generation, g.year_start AS generation_start, g.year_end AS generation_end,
  v.model_year, v.trim, v.engine, v.fuel, v.drivetrain, v.transmission, v.price_aed, v.price_basis,
  v.horsepower, v.torque_nm, v.km_per_l, v.dune_score, v.maintenance_score, v.overall_score,
  v.estimated, v.source, v.notes
FROM variants v
JOIN generations g    ON g.id = v.generation_id
JOIN model_families f ON f.id = g.family_id
JOIN brands b         ON b.id = f.brand_id;
