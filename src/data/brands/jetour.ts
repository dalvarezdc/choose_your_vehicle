import type { BrandData } from '../types.ts'

// Jetour (Chery group) — petrol models sold in the UAE. Ballpark figures (estimated);
// the brand is newer to the market, so resale and long-term reliability are less proven.
export const jetour: BrandData = {
  brand: 'Jetour',
  country: 'China',
  families: [
    {
      name: 'T2',
      bodyType: 'SUV',
      generations: [
        {
          code: 'T2',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T 4WD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed DCT', priceAed: 125000, priceBasis: 'new', horsepower: 254, torqueNm: 390, realWorldKmPerL: 8.5, duneScore: 7.0, maintenanceScore: 6.5, overallScore: 7.2, notes: 'Boxy off-road styled SUV; part-time 4WD with low range on 4WD trims.' },
          ],
        },
      ],
    },
    {
      name: 'T1',
      bodyType: 'SUV',
      generations: [
        {
          code: 'T1',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2025, trim: '2.0T AWD', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: 'AWD', transmission: '7-speed DCT', priceAed: 105000, priceBasis: 'new', horsepower: 254, torqueNm: 390, realWorldKmPerL: 8.8, duneScore: 6.0, maintenanceScore: 6.5, overallScore: 6.9 },
          ],
        },
      ],
    },
    {
      name: 'X90 Plus',
      bodyType: 'SUV',
      generations: [
        {
          code: 'X90 Plus',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '2.0T', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: 'FWD', transmission: '7-speed DCT', priceAed: 95000, priceBasis: 'new', horsepower: 254, torqueNm: 390, realWorldKmPerL: 9.0, duneScore: 3.0, maintenanceScore: 6.5, overallScore: 6.0, notes: '7-seat family SUV; front-wheel drive, not for sand.' },
          ],
        },
      ],
    },
    {
      name: 'X70 Plus',
      bodyType: 'SUV',
      generations: [
        {
          code: 'X70 Plus',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2024, trim: '1.6T', engine: '1.6L turbo I4', fuel: 'petrol', drivetrain: 'FWD', transmission: '7-speed DCT', priceAed: 75000, priceBasis: 'new', horsepower: 194, torqueNm: 290, realWorldKmPerL: 10.0, duneScore: 2.5, maintenanceScore: 7.0, overallScore: 5.8, notes: 'Budget 7-seater; city/highway only.' },
          ],
        },
      ],
    },
  ],
}
