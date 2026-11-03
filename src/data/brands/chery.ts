import type { BrandData } from '../types.ts'

// Chery — UAE ballpark figures (estimated). AWD crossovers, for price comparison.
export const chery: BrandData = {
  brand: 'Chery',
  country: 'China',
  families: [
    {
      name: 'Tiggo 8 Pro Max',
      bodyType: 'SUV',
      generations: [
        {
          code: 'T1D',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '2.0T AWD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '7-speed DCT', priceAed: 105000, priceBasis: 'new', horsepower: 254, torqueNm: 390, realWorldKmPerL: 9.0, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.6 },
          ],
        },
      ],
    },
    {
      name: 'Tiggo 9',
      bodyType: 'SUV',
      generations: [
        {
          code: 'T22',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T AWD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '7-speed DCT', priceAed: 125000, priceBasis: 'new', horsepower: 254, torqueNm: 390, realWorldKmPerL: 8.8, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.8, notes: 'UAE petrol 4WD listings ~AED 120–140k.' },
          ],
        },
      ],
    },
  ],
}
