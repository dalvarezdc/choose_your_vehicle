import type { BrandData } from '../types.ts'

// Jeep — UAE ballpark figures (estimated).
export const jeep: BrandData = {
  brand: 'Jeep',
  country: 'USA',
  families: [
    {
      name: 'Wrangler',
      bodyType: 'SUV',
      generations: [
        {
          code: 'JK',
          yearStart: 2007,
          yearEnd: 2018,
          variants: [
            { year: 2016, trim: 'Rubicon Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 75000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.5, maintenanceScore: 5.5, overallScore: 7.1 },
          ],
        },
        {
          code: 'JL',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2020, trim: 'Sahara Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 120000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 7.2, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.3 },
            { year: 2024, trim: 'Sahara Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 215000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 8.0, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.4 },
            { year: 2024, trim: 'Rubicon Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 245000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 7.5, duneScore: 9.0, maintenanceScore: 6.0, overallScore: 7.9 },
            { year: 2024, trim: 'Rubicon 392', engine: '6.4L V8 (HEMI 392)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 380000, priceBasis: 'new', horsepower: 470, torqueNm: 637, realWorldKmPerL: 5.2, duneScore: 9.5, maintenanceScore: 5.0, overallScore: 7.9 },
          ],
        },
      ],
    },
    {
      name: 'Gladiator',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'JT',
          yearStart: 2020,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Rubicon', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 245000, priceBasis: 'new', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.4, notes: 'Long wheelbase limits dune break-over vs Wrangler.' },
          ],
        },
      ],
    },
    {
      name: 'Grand Cherokee',
      bodyType: 'SUV',
      generations: [
        {
          code: 'WL',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Overland 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 260000, priceBasis: 'new', horsepower: 293, torqueNm: 353, realWorldKmPerL: 7.8, duneScore: 6.5, maintenanceScore: 6.0, overallScore: 6.8 },
          ],
        },
      ],
    },
  ],
}
