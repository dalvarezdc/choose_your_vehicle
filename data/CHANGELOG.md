# Data changelog

One entry per data change. `make data-import` / `make data-update FILE=…` appends an entry
automatically; add one by hand when you edit the brand files in `src/data/brands/` directly.

## 2026-11 — curb weight + drivetrain audit (brand files)

- New required field `curbWeightKg` (curb/kerb weight, kg) on every variant (234 rows), DB column
  `curb_weight_kg` (migration 003). Best-estimate GCC-spec figures, covered by `estimated: true`;
  validation warns outside 1,200–4,000 kg.
- Drivetrain fix: Jetour T2 (2025 2.0T 4WD, 2026 2.0T 4WD Premium) `4WD` → `AWD` — BorgWarner
  on-demand "XWD" with rear e-locker, no low-range transfer case (trim names kept, so ids are unchanged).
- UI: drivetrain filter chips (4x4 / AWD / RWD / FWD) and 4x4 / AWD tags, derived from `drivetrain`.

## 2026-11 — catalog expansion (brand files)

Added 13 brands and 23 model families (52 year/trim variants, all `estimated: true`):

- Chevrolet: Tahoe (GMTK2UC, T1UC), Suburban, Silverado 1500 (Trail Boss, ZR2)
- Cadillac: Escalade (incl. Escalade-V)
- Mitsubishi: Pajero (V90), Montero Sport
- Isuzu: MU-X, D-Max V-Cross
- Mercedes-Benz: G-Class (W463A: G 500 V8, G 500 I6, AMG G 63), GLE 450
- BMW: X5 xDrive40i, X7 (xDrive40i, M60i)
- Volkswagen: Touareg
- Hyundai: Palisade (LX2, LX3)
- Kia: Mohave, Telluride
- Tank (GWM): Tank 300 (2.0T, Hybrid), Tank 500
- Haval: H9 (2nd gen)
- Changan: CS95
- Geely: Monjaro
- Existing brands: Toyota Sequoia + Hilux, Nissan Pathfinder + Navara, Ford Everest + Expedition,
  Jeep Gladiator + Grand Cherokee, Land Rover Range Rover + Range Rover Sport + Defender 130 / OCTA
