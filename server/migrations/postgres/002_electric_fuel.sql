-- 002_electric_fuel: allow fuel = 'electric' (Tesla, BYD EVs). Mirrors ../sqlite/002_electric_fuel.sql.
ALTER TABLE variants DROP CONSTRAINT IF EXISTS variants_fuel_check;
ALTER TABLE variants ADD CONSTRAINT variants_fuel_check CHECK (fuel IN ('petrol', 'diesel', 'hybrid', 'electric'));
