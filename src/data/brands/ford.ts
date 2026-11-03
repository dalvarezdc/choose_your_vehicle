import type { BrandData } from '../types.ts'

// Ford — UAE ballpark figures (estimated).
export const ford: BrandData = {
  brand: 'Ford',
  country: 'USA',
  families: [
    {
      name: 'Ranger Raptor',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'P703',
          yearStart: 2023,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Raptor', engine: '3.0L twin-turbo V6 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 185000, priceBasis: 'used', horsepower: 392, torqueNm: 583, realWorldKmPerL: 7.0, duneScore: 9.0, maintenanceScore: 7.0, overallScore: 8.2 },
            { year: 2025, trim: 'Raptor', engine: '3.0L twin-turbo V6 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 235000, priceBasis: 'new', horsepower: 392, torqueNm: 583, realWorldKmPerL: 7.0, duneScore: 9.0, maintenanceScore: 7.0, overallScore: 8.4, notes: 'Fox Live Valve dampers; very capable on dunes for the size.' },
          ],
        },
      ],
    },
    {
      name: 'F-150 Raptor',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'P552',
          yearStart: 2017,
          yearEnd: 2020,
          variants: [
            { year: 2018, trim: 'Raptor SuperCrew', engine: '3.5L twin-turbo V6 (EcoBoost HO)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 140000, priceBasis: 'used', horsepower: 450, torqueNm: 691, realWorldKmPerL: 5.8, duneScore: 9.0, maintenanceScore: 6.5, overallScore: 7.9 },
          ],
        },
        {
          code: 'P702',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Raptor', engine: '3.5L twin-turbo V6 (EcoBoost HO)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 450, torqueNm: 691, realWorldKmPerL: 6.0, duneScore: 9.5, maintenanceScore: 6.5, overallScore: 8.4 },
            { year: 2024, trim: 'Raptor R', engine: '5.2L supercharged V8 (Predator)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 520000, priceBasis: 'new', horsepower: 720, torqueNm: 868, realWorldKmPerL: 4.3, duneScore: 9.5, maintenanceScore: 5.0, overallScore: 8.0 },
          ],
        },
      ],
    },
    {
      name: 'Bronco',
      bodyType: 'SUV',
      generations: [
        {
          code: 'U725',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Badlands 4-door', engine: '2.7L twin-turbo V6 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 235000, priceBasis: 'new', horsepower: 330, torqueNm: 563, realWorldKmPerL: 7.0, duneScore: 8.5, maintenanceScore: 6.5, overallScore: 7.8 },
            { year: 2024, trim: 'Raptor', engine: '3.0L twin-turbo V6 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 340000, priceBasis: 'new', horsepower: 418, torqueNm: 597, realWorldKmPerL: 6.0, duneScore: 9.5, maintenanceScore: 6.0, overallScore: 8.1 },
          ],
        },
      ],
    },
    {
      name: 'Everest',
      bodyType: 'SUV',
      generations: [
        {
          code: 'U704',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Sport 2.3 EcoBoost', engine: '2.3L turbo I4 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 165000, priceBasis: 'new', horsepower: 297, torqueNm: 450, realWorldKmPerL: 8.5, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.3 },
            { year: 2025, trim: 'Platinum 2.3 EcoBoost', engine: '2.3L turbo I4 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 205000, priceBasis: 'new', horsepower: 297, torqueNm: 450, realWorldKmPerL: 8.3, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 7.4 },
          ],
        },
      ],
    },
    {
      name: 'Expedition',
      bodyType: 'SUV',
      generations: [
        {
          code: 'U553',
          yearStart: 2018,
          yearEnd: 2024,
          variants: [
            { year: 2022, trim: 'Limited', engine: '3.5L twin-turbo V6 (EcoBoost)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 160000, priceBasis: 'used', horsepower: 375, torqueNm: 637, realWorldKmPerL: 6.8, duneScore: 6.5, maintenanceScore: 6.5, overallScore: 6.9 },
          ],
        },
        {
          code: 'U554',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'Tremor', engine: '3.5L twin-turbo V6 (EcoBoost HO)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 360000, priceBasis: 'new', horsepower: 440, torqueNm: 691, realWorldKmPerL: 6.5, duneScore: 7.5, maintenanceScore: 6.5, overallScore: 7.4 },
          ],
        },
      ],
    },
  ],
}
