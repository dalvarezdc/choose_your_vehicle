import type { BrandData } from '../types.ts'

// Porsche — UAE ballpark figures (estimated). On-road performance SUV; dune scores
// assume stock tyres and air suspension, not a dedicated sand vehicle.
export const porsche: BrandData = {
  brand: 'Porsche',
  country: 'Germany',
  families: [
    {
      name: 'Cayenne',
      bodyType: 'SUV',
      generations: [
        {
          code: '92A',
          yearStart: 2011,
          yearEnd: 2017,
          variants: [
            { year: 2016, trim: 'GTS', engine: '3.6L twin-turbo V6', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 95000, priceBasis: 'used', horsepower: 440, torqueNm: 600, realWorldKmPerL: 6.5, duneScore: 5.5, maintenanceScore: 4.5, overallScore: 6.6, notes: 'Out-of-warranty Porsche: budget for air suspension and cooling repairs.' },
          ],
        },
        {
          code: '9YA',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2019, trim: 'Cayenne', engine: '3.0L turbo V6', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 165000, priceBasis: 'used', horsepower: 340, torqueNm: 450, realWorldKmPerL: 8.0, duneScore: 5.5, maintenanceScore: 5.5, overallScore: 7.0 },
            { year: 2024, trim: 'Cayenne', engine: '3.0L turbo V6', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 400000, priceBasis: 'new', horsepower: 353, torqueNm: 500, realWorldKmPerL: 8.2, duneScore: 5.5, maintenanceScore: 5.5, overallScore: 7.3, notes: '2024 facelift (E3 II).' },
            { year: 2024, trim: 'S', engine: '4.0L twin-turbo V8', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 520000, priceBasis: 'new', horsepower: 474, torqueNm: 600, realWorldKmPerL: 6.8, duneScore: 6.0, maintenanceScore: 5.0, overallScore: 7.5 },
            { year: 2024, trim: 'E-Hybrid', engine: '3.0L turbo V6 plug-in hybrid', fuel: 'hybrid', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 450000, priceBasis: 'new', horsepower: 470, torqueNm: 650, realWorldKmPerL: 10.0, duneScore: 5.0, maintenanceScore: 5.0, overallScore: 7.3 },
            { year: 2023, trim: 'Turbo GT', engine: '4.0L twin-turbo V8', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 850000, priceBasis: 'new', horsepower: 640, torqueNm: 850, realWorldKmPerL: 5.5, duneScore: 4.5, maintenanceScore: 4.0, overallScore: 6.8 },
          ],
        },
      ],
    },
  ],
}
