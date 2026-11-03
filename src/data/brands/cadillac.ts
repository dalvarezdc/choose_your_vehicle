import type { BrandData } from '../types.ts'

// Cadillac — UAE ballpark figures (estimated).
export const cadillac: BrandData = {
  brand: 'Cadillac',
  country: 'USA',
  families: [
    {
      name: 'Escalade',
      bodyType: 'SUV',
      generations: [
        {
          code: 'GMT T1 (5th gen)',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'Premium Luxury', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 255000, priceBasis: 'used', horsepower: 420, torqueNm: 624, realWorldKmPerL: 6.0, duneScore: 5.5, maintenanceScore: 6.5, overallScore: 6.8 },
            { year: 2025, trim: 'Sport Platinum', engine: '6.2L V8 (L87)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 520000, priceBasis: 'new', horsepower: 420, torqueNm: 624, realWorldKmPerL: 5.9, duneScore: 5.5, maintenanceScore: 6.0, overallScore: 6.9 },
            { year: 2025, trim: 'Escalade-V', engine: '6.2L supercharged V8 (LT4)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 650000, priceBasis: 'new', horsepower: 682, torqueNm: 885, realWorldKmPerL: 4.6, duneScore: 5.5, maintenanceScore: 5.0, overallScore: 6.6 },
          ],
        },
      ],
    },
  ],
}
