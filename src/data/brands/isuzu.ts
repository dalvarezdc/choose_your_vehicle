import type { BrandData } from '../types.ts'

// Isuzu — UAE ballpark figures (estimated).
export const isuzu: BrandData = {
  brand: 'Isuzu',
  country: 'Japan',
  families: [
    {
      name: 'MU-X',
      bodyType: 'SUV',
      generations: [
        {
          code: 'RJ (2nd gen)',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'LS-T 3.0', engine: '3.0L turbo-diesel I4 (4JJ3)', fuel: 'diesel', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 135000, priceBasis: 'new', horsepower: 190, torqueNm: 450, curbWeightKg: 2100, realWorldKmPerL: 11.0, duneScore: 6.5, maintenanceScore: 8.5, overallScore: 7.0 },
          ],
        },
      ],
    },
    {
      name: 'D-Max',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'RG (3rd gen)',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'V-Cross 3.0', engine: '3.0L turbo-diesel I4 (4JJ3)', fuel: 'diesel', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 115000, priceBasis: 'new', horsepower: 190, torqueNm: 450, curbWeightKg: 2000, realWorldKmPerL: 11.5, duneScore: 6.5, maintenanceScore: 8.5, overallScore: 6.9 },
          ],
        },
      ],
    },
  ],
}
