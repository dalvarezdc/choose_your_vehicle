-- 003_curb_weight: curb (kerb) weight in kg per variant. Mirrors ../sqlite/003_curb_weight.sql.
ALTER TABLE variants ADD COLUMN IF NOT EXISTS curb_weight_kg INTEGER CHECK (curb_weight_kg IS NULL OR curb_weight_kg > 0);

-- Postgres can only append view columns with CREATE OR REPLACE, so drop and recreate.
DROP VIEW IF EXISTS variant_details;
CREATE VIEW variant_details AS
SELECT
  v.id, b.name AS brand, b.slug AS brand_slug, f.name AS family, f.slug AS family_slug,
  f.body_type, g.code AS generation, g.year_start AS generation_start, g.year_end AS generation_end,
  v.model_year, v.trim, v.engine, v.fuel, v.drivetrain, v.transmission, v.price_aed, v.price_basis,
  v.horsepower, v.torque_nm, v.curb_weight_kg, v.km_per_l, v.dune_score, v.maintenance_score, v.overall_score,
  v.estimated, v.source, v.notes
FROM variants v
JOIN generations g    ON g.id = v.generation_id
JOIN model_families f ON f.id = g.family_id
JOIN brands b         ON b.id = f.brand_id;
