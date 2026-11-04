import type { BrandData } from '../types.ts'

// Tank (Great Wall Motor) — UAE ballpark figures (estimated).
export const tank: BrandData = {
  brand: 'Tank',
  country: 'China',
  families: [
    {
      name: 'Tank 300',
      bodyType: 'SUV',
      generations: [
        {
          code: 'P01',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2022, trim: '2.0T Off-Road', engine: '2.0L turbo I4 (E20CB)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 85000, priceBasis: 'used', horsepower: 220, torqueNm: 380, curbWeightKg: 2165, realWorldKmPerL: 8.7, duneScore: 7.5, maintenanceScore: 6.0, overallScore: 6.9, notes: 'First UAE model year.' },
            { year: 2023, trim: '2.0T Adventure', engine: '2.0L turbo I4 (E20CB)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 125000, priceBasis: 'new', horsepower: 220, torqueNm: 380, curbWeightKg: 2165, realWorldKmPerL: 8.8, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 7.1, notes: 'Body-on-frame, front + rear lockers.' },
            { year: 2024, trim: '2.0T Challenger', engine: '2.0L turbo I4 (E20CB)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 130000, priceBasis: 'new', horsepower: 220, torqueNm: 380, curbWeightKg: 2165, realWorldKmPerL: 8.8, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 7.2 },
            { year: 2025, trim: '2.0T Hybrid', engine: '2.0L turbo I4 HEV', fuel: 'hybrid', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 145000, priceBasis: 'new', horsepower: 342, torqueNm: 648, curbWeightKg: 2330, realWorldKmPerL: 10.0, duneScore: 7.5, maintenanceScore: 6.0, overallScore: 7.3 },
          ],
        },
      ],
    },
    {
      name: 'Tank 500',
      bodyType: 'SUV',
      generations: [
        {
          code: 'B01',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '3.0T V6 Luxury', engine: '3.0L twin-turbo V6', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 190000, priceBasis: 'new', horsepower: 354, torqueNm: 500, curbWeightKg: 2480, realWorldKmPerL: 7.5, duneScore: 7.0, maintenanceScore: 6.0, overallScore: 7.2 },
            { year: 2025, trim: '2.0T Hybrid Ultra', engine: '2.0L turbo I4 HEV', fuel: 'hybrid', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 205000, priceBasis: 'new', horsepower: 342, torqueNm: 648, curbWeightKg: 2580, realWorldKmPerL: 9.5, duneScore: 7.0, maintenanceScore: 5.5, overallScore: 7.3, notes: '7-seat ladder-frame; hybrid powertrain shared with Tank 300 HEV.' },
            { year: 2026, trim: '3.0T V6 Ultra', engine: '3.0L twin-turbo V6', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 200000, priceBasis: 'new', horsepower: 354, torqueNm: 500, curbWeightKg: 2500, realWorldKmPerL: 7.5, duneScore: 7.0, maintenanceScore: 6.0, overallScore: 7.3 },
          ],
        },
      ],
    },
  ],
}
