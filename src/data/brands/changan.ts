import type { BrandData } from '../types.ts'

// Changan — UAE ballpark figures (estimated).
export const changan: BrandData = {
  brand: 'Changan',
  country: 'China',
  families: [
    {
      name: 'CS95',
      bodyType: 'SUV',
      generations: [
        {
          code: 'CS95',
          yearStart: 2017,
          yearEnd: null,
          variants: [
            { year: 2021, trim: '2.0T AWD', engine: '2.0L turbo I4 (Blue Core)', fuel: 'petrol', drivetrain: 'AWD', transmission: '6-speed automatic', priceAed: 52000, priceBasis: 'used', horsepower: 233, torqueNm: 360, curbWeightKg: 1850, realWorldKmPerL: 8.5, duneScore: 4.0, maintenanceScore: 5.5, overallScore: 5.4 },
            { year: 2024, trim: '2.0T AWD', engine: '2.0L turbo I4 (Blue Core)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 105000, priceBasis: 'new', horsepower: 233, torqueNm: 360, curbWeightKg: 1850, realWorldKmPerL: 8.8, duneScore: 4.0, maintenanceScore: 6.0, overallScore: 5.8 },
            { year: 2026, trim: '2.0T AWD Platinum', engine: '2.0L turbo I4 (Blue Core)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 110000, priceBasis: 'new', horsepower: 233, torqueNm: 360, curbWeightKg: 1850, realWorldKmPerL: 8.8, duneScore: 4.0, maintenanceScore: 6.0, overallScore: 5.9 },
          ],
        },
      ],
    },
    {
      name: 'UNI-K',
      bodyType: 'SUV',
      generations: [
        {
          code: 'UNI-K',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '2.0T AWD', engine: '2.0L turbo I4 (Blue Core)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 120000, priceBasis: 'new', horsepower: 233, torqueNm: 390, curbWeightKg: 1750, realWorldKmPerL: 9.0, duneScore: 3.0, maintenanceScore: 6.0, overallScore: 5.6 },
          ],
        },
      ],
    },
    {
      name: 'Hunter',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'Hunter',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '2.0T 4WD', engine: '2.0L turbo I4 (Blue Core)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 95000, priceBasis: 'new', horsepower: 220, torqueNm: 360, curbWeightKg: 2000, realWorldKmPerL: 8.5, duneScore: 5.5, maintenanceScore: 5.5, overallScore: 5.8, notes: 'Ladder-frame double cab with low range.' },
          ],
        },
      ],
    },
  ],
}
