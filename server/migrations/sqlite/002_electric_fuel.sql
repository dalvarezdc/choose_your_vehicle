-- 002_electric_fuel: allow fuel = 'electric' (Tesla, BYD EVs).
-- SQLite cannot alter a CHECK constraint, so rebuild `variants` (the seed reloads it anyway).

DROP VIEW variant_details;

CREATE TABLE variants_new (
  id                TEXT PRIMARY KEY,
  generation_id     INTEGER NOT NULL REFERENCES generations(id) ON DELETE CASCADE,
  model_year        INTEGER NOT NULL,
  trim              TEXT NOT NULL,
  engine            TEXT NOT NULL,
  fuel              TEXT NOT NULL CHECK (fuel IN ('petrol', 'diesel', 'hybrid', 'electric')),
  drivetrain        TEXT NOT NULL CHECK (drivetrain IN ('4WD', 'AWD', 'RWD', 'FWD')),
  transmission      TEXT,
  price_aed         INTEGER NOT NULL CHECK (price_aed > 0),
  price_basis       TEXT NOT NULL CHECK (price_basis IN ('new', 'used')),
  horsepower        INTEGER NOT NULL,
  torque_nm         INTEGER NOT NULL,
  km_per_l          REAL NOT NULL,           -- electric: petrol-energy equivalent
  dune_score        REAL NOT NULL CHECK (dune_score BETWEEN 0 AND 10),
  maintenance_score REAL NOT NULL CHECK (maintenance_score BETWEEN 0 AND 10),
  overall_score     REAL NOT NULL CHECK (overall_score BETWEEN 0 AND 10),
  estimated         INTEGER NOT NULL DEFAULT 1,
  source            TEXT,
  notes             TEXT,
  UNIQUE (generation_id, model_year, trim)
);
INSERT INTO variants_new SELECT * FROM variants;
DROP TABLE variants;
ALTER TABLE variants_new RENAME TO variants;
CREATE INDEX idx_variants_generation_year ON variants(generation_id, model_year);
CREATE INDEX idx_variants_year ON variants(model_year);
CREATE INDEX idx_variants_price ON variants(price_aed);
CREATE INDEX idx_variants_overall ON variants(overall_score);

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
