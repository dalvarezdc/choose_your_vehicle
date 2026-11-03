import type { BrandData } from '../types.ts'

// GWM / Great Wall — UAE ballpark figures (estimated). Cannon is sold as "Poer" in the UAE.
export const gwm: BrandData = {
  brand: 'GWM',
  country: 'China',
  families: [
    {
      name: 'Cannon (Poer)',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'P-Series',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2022, trim: '2.0T High 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 68000, priceBasis: 'used', horsepower: 218, torqueNm: 360, realWorldKmPerL: 8.5, duneScore: 6.0, maintenanceScore: 6.0, overallScore: 6.2, notes: 'Body-on-frame, low range, rear locker.' },
            { year: 2024, trim: '2.0T High 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 103000, priceBasis: 'new', horsepower: 218, torqueNm: 360, realWorldKmPerL: 8.5, duneScore: 6.0, maintenanceScore: 6.0, overallScore: 6.4, source: 'UAE price: drivearabia.com 2024 Poer' },
            { year: 2024, trim: '2.0T Platinum 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 111000, priceBasis: 'new', horsepower: 218, torqueNm: 360, realWorldKmPerL: 8.4, duneScore: 6.5, maintenanceScore: 6.0, overallScore: 6.6, source: 'UAE price: drivearabia.com 2024 Poer' },
          ],
        },
      ],
    },
  ],
}
