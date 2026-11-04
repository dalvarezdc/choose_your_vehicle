import type { BrandData } from '../types.ts'

// Hyundai — UAE ballpark figures (estimated). Unibody AWD family SUV, not a dune machine.
export const hyundai: BrandData = {
  brand: 'Hyundai',
  country: 'South Korea',
  families: [
    {
      name: 'Palisade',
      bodyType: 'SUV',
      generations: [
        {
          code: 'LX2',
          yearStart: 2019,
          yearEnd: 2025,
          variants: [
            { year: 2023, trim: 'Limited 3.8 AWD', engine: '3.8L V6 (Lambda II)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 120000, priceBasis: 'used', horsepower: 291, torqueNm: 355, curbWeightKg: 2000, realWorldKmPerL: 8.5, duneScore: 4.5, maintenanceScore: 7.5, overallScore: 6.3 },
          ],
        },
        {
          code: 'LX3',
          yearStart: 2026,
          yearEnd: null,
          variants: [
            { year: 2026, trim: 'Calligraphy 3.5 AWD', engine: '3.5L V6', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 210000, priceBasis: 'new', horsepower: 287, torqueNm: 352, curbWeightKg: 2050, realWorldKmPerL: 8.5, duneScore: 4.5, maintenanceScore: 7.5, overallScore: 6.5 },
          ],
        },
      ],
    },
  ],
}
