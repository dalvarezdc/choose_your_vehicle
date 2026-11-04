import type { BrandData } from '../types.ts'

// Infiniti — UAE ballpark figures (estimated). `used` prices = today's UAE used market.
export const infiniti: BrandData = {
  brand: 'Infiniti',
  country: 'Japan',
  families: [
    {
      name: 'QX56',
      bodyType: 'SUV',
      generations: [
        {
          code: 'JA60',
          yearStart: 2004,
          yearEnd: 2010,
          variants: [
            { year: 2008, trim: 'Base 4WD', engine: '5.6L V8 (VK56DE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 18000, priceBasis: 'used', horsepower: 320, torqueNm: 529, curbWeightKg: 2600, realWorldKmPerL: 5.2, duneScore: 6.5, maintenanceScore: 6.5, overallScore: 6.0, notes: 'Armada-based; cheap entry V8 but old.' },
          ],
        },
        {
          code: 'Z62',
          yearStart: 2011,
          yearEnd: 2013,
          variants: [
            { year: 2012, trim: 'Base 4WD', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 38000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2700, realWorldKmPerL: 5.6, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.0, notes: 'Same platform as Patrol Y62; renamed QX80 for 2014.' },
          ],
        },
      ],
    },
    {
      name: 'QX80',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Z62',
          yearStart: 2013,
          yearEnd: 2024,
          variants: [
            { year: 2014, trim: 'Base 4WD', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 48000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2700, realWorldKmPerL: 5.7, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.1 },
            { year: 2016, trim: 'Luxe', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 70000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2700, realWorldKmPerL: 5.7, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.3 },
            { year: 2018, trim: 'Luxe', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 105000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2720, realWorldKmPerL: 5.8, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.6 },
            { year: 2020, trim: 'Luxe', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 140000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2720, realWorldKmPerL: 5.8, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.7 },
            { year: 2022, trim: 'Sensory', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 205000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2750, realWorldKmPerL: 5.9, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.8, notes: 'New 12.3-inch infotainment from MY2022.' },
            { year: 2023, trim: 'Sensory', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 255000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2750, realWorldKmPerL: 6.0, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.9 },
            { year: 2024, trim: 'Autograph', engine: '5.6L V8 (VK56VD)', fuel: 'petrol', drivetrain: '4WD', transmission: '7-speed automatic', priceAed: 300000, priceBasis: 'used', horsepower: 400, torqueNm: 560, curbWeightKg: 2770, realWorldKmPerL: 6.0, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.9, notes: 'Last V8 model year.' },
          ],
        },
        {
          code: 'Z63',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Luxe', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 365000, priceBasis: 'new', horsepower: 450, torqueNm: 700, curbWeightKg: 2700, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 8.0 },
            { year: 2025, trim: 'Sensory', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 400000, priceBasis: 'new', horsepower: 450, torqueNm: 700, curbWeightKg: 2720, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 8.1 },
            { year: 2025, trim: 'Autograph', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 475000, priceBasis: 'new', horsepower: 450, torqueNm: 700, curbWeightKg: 2750, realWorldKmPerL: 7.3, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 8.1, notes: 'Air suspension.' },
            { year: 2026, trim: 'Sensory', engine: '3.5L twin-turbo V6 (VR35DDTT)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 410000, priceBasis: 'new', horsepower: 450, torqueNm: 700, curbWeightKg: 2720, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 8.1 },
          ],
        },
      ],
    },
    {
      name: 'QX60',
      bodyType: 'SUV',
      generations: [
        {
          code: 'L50',
          yearStart: 2014,
          yearEnd: 2020,
          variants: [
            { year: 2018, trim: 'Luxe 3.5 AWD', engine: '3.5L V6 (VQ35DE)', fuel: 'petrol', drivetrain: 'AWD', transmission: 'CVT', priceAed: 48000, priceBasis: 'used', horsepower: 295, torqueNm: 366, curbWeightKg: 2000, realWorldKmPerL: 8.0, duneScore: 3.0, maintenanceScore: 6.0, overallScore: 5.3, notes: 'CVT dislikes heat and sand.' },
          ],
        },
        {
          code: 'L51',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Sensory 3.5 AWD', engine: '3.5L V6 (VQ35DD)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 230000, priceBasis: 'new', horsepower: 295, torqueNm: 366, curbWeightKg: 2040, realWorldKmPerL: 8.2, duneScore: 3.5, maintenanceScore: 6.5, overallScore: 5.8 },
            { year: 2025, trim: 'Autograph 2.0 VC-Turbo AWD', engine: '2.0L VC-Turbo I4 (KR20DDET)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 265000, priceBasis: 'new', horsepower: 268, torqueNm: 386, curbWeightKg: 2030, realWorldKmPerL: 8.8, duneScore: 3.5, maintenanceScore: 6.0, overallScore: 5.8 },
          ],
        },
      ],
    },
    {
      name: 'QX50',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J55',
          yearStart: 2019,
          yearEnd: 2025,
          variants: [
            { year: 2020, trim: 'Luxe 2.0 VC-Turbo AWD', engine: '2.0L VC-Turbo I4 (KR20DDET)', fuel: 'petrol', drivetrain: 'AWD', transmission: 'CVT', priceAed: 75000, priceBasis: 'used', horsepower: 268, torqueNm: 380, curbWeightKg: 1820, realWorldKmPerL: 9.0, duneScore: 2.5, maintenanceScore: 5.5, overallScore: 5.0 },
          ],
        },
      ],
    },
    {
      name: 'QX55',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J55',
          yearStart: 2022,
          yearEnd: 2025,
          variants: [
            { year: 2023, trim: 'Sensory 2.0 VC-Turbo AWD', engine: '2.0L VC-Turbo I4 (KR20DDET)', fuel: 'petrol', drivetrain: 'AWD', transmission: 'CVT', priceAed: 210000, priceBasis: 'new', horsepower: 268, torqueNm: 380, curbWeightKg: 1830, realWorldKmPerL: 9.0, duneScore: 2.5, maintenanceScore: 5.5, overallScore: 5.0, notes: 'Coupé-SUV; included for price comparison, not a sand vehicle.' },
          ],
        },
      ],
    },
  ],
}
