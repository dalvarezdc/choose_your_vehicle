import type { BrandData } from '../types.ts'

// Jeep — UAE ballpark figures (estimated). `used` prices = today's UAE used market.
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
            { year: 2010, trim: 'Sahara Unlimited 3.8', engine: '3.8L V6 (EGH)', fuel: 'petrol', drivetrain: '4WD', transmission: '4-speed automatic', priceAed: 35000, priceBasis: 'used', horsepower: 202, torqueNm: 321, realWorldKmPerL: 6.0, duneScore: 7.5, maintenanceScore: 5.0, overallScore: 6.2, notes: 'Pre-Pentastar; underpowered on soft sand.' },
            { year: 2013, trim: 'Sahara Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 55000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 5.5, overallScore: 6.8 },
            { year: 2016, trim: 'Rubicon Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 75000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.5, maintenanceScore: 5.5, overallScore: 7.1 },
            { year: 2018, trim: 'Rubicon Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 90000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.5, maintenanceScore: 5.5, overallScore: 7.2, notes: 'Last JK model year.' },
          ],
        },
        {
          code: 'JL',
          yearStart: 2018,
          yearEnd: null,
          variants: [
            { year: 2019, trim: 'Rubicon Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 110000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 7.0, duneScore: 9.0, maintenanceScore: 6.0, overallScore: 7.6 },
            { year: 2020, trim: 'Sahara Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 120000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 7.2, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.3 },
            { year: 2022, trim: 'Rubicon Unlimited', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 160000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 7.0, duneScore: 9.0, maintenanceScore: 6.0, overallScore: 7.7 },
            { year: 2024, trim: 'Sahara Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 215000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 8.0, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.4 },
            { year: 2024, trim: 'Rubicon Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 245000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 7.5, duneScore: 9.0, maintenanceScore: 6.0, overallScore: 7.9 },
            { year: 2024, trim: 'Rubicon 392', engine: '6.4L V8 (HEMI 392)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 380000, priceBasis: 'new', horsepower: 470, torqueNm: 637, realWorldKmPerL: 5.2, duneScore: 9.5, maintenanceScore: 5.0, overallScore: 7.9 },
            { year: 2025, trim: 'Sport S Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 190000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 8.0, duneScore: 7.5, maintenanceScore: 6.0, overallScore: 7.2 },
            { year: 2025, trim: 'Willys Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 210000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 7.8, duneScore: 8.5, maintenanceScore: 6.0, overallScore: 7.5, notes: 'Rear locker, 33-inch tyres.' },
            { year: 2026, trim: 'Rubicon Unlimited', engine: '2.0L turbo I4', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 255000, priceBasis: 'new', horsepower: 270, torqueNm: 400, realWorldKmPerL: 7.5, duneScore: 9.0, maintenanceScore: 6.0, overallScore: 7.9 },
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
            { year: 2021, trim: 'Rubicon', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 140000, priceBasis: 'used', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.2 },
            { year: 2023, trim: 'Rubicon', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 245000, priceBasis: 'new', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.4, notes: 'Long wheelbase limits dune break-over vs Wrangler.' },
            { year: 2024, trim: 'Mojave', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 250000, priceBasis: 'new', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.7, duneScore: 8.5, maintenanceScore: 6.0, overallScore: 7.6, notes: 'Desert-tuned: Fox internal-bypass shocks, 1-inch lift.' },
            { year: 2025, trim: 'Rubicon', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 260000, priceBasis: 'new', horsepower: 285, torqueNm: 353, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 6.0, overallScore: 7.5, notes: 'Facelift year (new grille, 12.3-inch screen).' },
          ],
        },
      ],
    },
    {
      name: 'Grand Cherokee',
      bodyType: 'SUV',
      generations: [
        {
          code: 'WK2',
          yearStart: 2011,
          yearEnd: 2021,
          variants: [
            { year: 2014, trim: 'Limited 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 38000, priceBasis: 'used', horsepower: 290, torqueNm: 353, realWorldKmPerL: 7.5, duneScore: 6.0, maintenanceScore: 5.5, overallScore: 6.0 },
            { year: 2016, trim: 'SRT 6.4', engine: '6.4L V8 (HEMI 392)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 80000, priceBasis: 'used', horsepower: 475, torqueNm: 637, realWorldKmPerL: 5.0, duneScore: 5.5, maintenanceScore: 5.0, overallScore: 6.3 },
            { year: 2018, trim: 'Trackhawk', engine: '6.2L supercharged V8 (Hellcat)', fuel: 'petrol', drivetrain: 'AWD', transmission: '8-speed automatic', priceAed: 210000, priceBasis: 'used', horsepower: 707, torqueNm: 875, realWorldKmPerL: 4.2, duneScore: 5.0, maintenanceScore: 4.0, overallScore: 6.2, notes: 'Road performance, not a dune tool.' },
            { year: 2019, trim: 'Limited 5.7 V8', engine: '5.7L V8 (HEMI)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 75000, priceBasis: 'used', horsepower: 360, torqueNm: 528, realWorldKmPerL: 6.2, duneScore: 6.5, maintenanceScore: 5.5, overallScore: 6.5 },
            { year: 2020, trim: 'Trailhawk 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 95000, priceBasis: 'used', horsepower: 290, torqueNm: 353, realWorldKmPerL: 7.3, duneScore: 7.0, maintenanceScore: 5.5, overallScore: 6.6, notes: 'Quadra-Drive II rear e-LSD, air suspension.' },
          ],
        },
        {
          code: 'WL',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'Limited 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 140000, priceBasis: 'used', horsepower: 293, torqueNm: 353, realWorldKmPerL: 7.8, duneScore: 6.0, maintenanceScore: 6.0, overallScore: 6.6 },
            { year: 2023, trim: 'L Summit Reserve 5.7 V8', engine: '5.7L V8 (HEMI)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 230000, priceBasis: 'used', horsepower: 357, torqueNm: 529, realWorldKmPerL: 6.3, duneScore: 6.5, maintenanceScore: 5.5, overallScore: 6.8, notes: 'Three-row long-wheelbase L body.' },
            { year: 2024, trim: 'Overland 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 260000, priceBasis: 'new', horsepower: 293, torqueNm: 353, realWorldKmPerL: 7.8, duneScore: 6.5, maintenanceScore: 6.0, overallScore: 6.8 },
            { year: 2025, trim: 'Limited 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 225000, priceBasis: 'new', horsepower: 293, torqueNm: 353, realWorldKmPerL: 7.8, duneScore: 6.0, maintenanceScore: 6.0, overallScore: 6.7 },
            { year: 2026, trim: 'Summit Reserve 3.6', engine: '3.6L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 320000, priceBasis: 'new', horsepower: 293, torqueNm: 353, realWorldKmPerL: 7.6, duneScore: 6.5, maintenanceScore: 6.0, overallScore: 6.9 },
          ],
        },
      ],
    },
    {
      name: 'Cherokee',
      bodyType: 'SUV',
      generations: [
        {
          code: 'KL',
          yearStart: 2014,
          yearEnd: 2023,
          variants: [
            { year: 2016, trim: 'Trailhawk 3.2', engine: '3.2L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 38000, priceBasis: 'used', horsepower: 271, torqueNm: 316, realWorldKmPerL: 8.0, duneScore: 5.5, maintenanceScore: 5.0, overallScore: 5.6, notes: 'Rear locker; 9-speed gearbox is the weak point.' },
            { year: 2019, trim: 'Trailhawk 3.2', engine: '3.2L V6 (Pentastar)', fuel: 'petrol', drivetrain: '4WD', transmission: '9-speed automatic', priceAed: 62000, priceBasis: 'used', horsepower: 271, torqueNm: 316, realWorldKmPerL: 8.0, duneScore: 5.5, maintenanceScore: 5.5, overallScore: 5.9 },
            { year: 2021, trim: 'Limited 2.4 4x4', engine: '2.4L I4 (Tigershark)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 60000, priceBasis: 'used', horsepower: 180, torqueNm: 232, realWorldKmPerL: 9.0, duneScore: 4.0, maintenanceScore: 5.5, overallScore: 5.4 },
          ],
        },
      ],
    },
    {
      name: 'Compass',
      bodyType: 'SUV',
      generations: [
        {
          code: 'MP',
          yearStart: 2017,
          yearEnd: null,
          variants: [
            { year: 2018, trim: 'Limited 2.4 4x4', engine: '2.4L I4 (Tigershark)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 38000, priceBasis: 'used', horsepower: 180, torqueNm: 237, realWorldKmPerL: 9.5, duneScore: 3.5, maintenanceScore: 5.5, overallScore: 5.0 },
            { year: 2023, trim: 'Trailhawk 2.4 4x4', engine: '2.4L I4 (Tigershark)', fuel: 'petrol', drivetrain: 'AWD', transmission: '9-speed automatic', priceAed: 125000, priceBasis: 'new', horsepower: 177, torqueNm: 232, realWorldKmPerL: 9.3, duneScore: 4.5, maintenanceScore: 5.5, overallScore: 5.4, notes: 'Compact crossover; Trailhawk adds low-range-style crawl ratio and hill descent.' },
          ],
        },
      ],
    },
    {
      name: 'Wagoneer',
      bodyType: 'SUV',
      generations: [
        {
          code: 'WS',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Series II 5.7 V8', engine: '5.7L V8 (HEMI eTorque)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 230000, priceBasis: 'used', horsepower: 392, torqueNm: 548, realWorldKmPerL: 5.8, duneScore: 6.5, maintenanceScore: 5.5, overallScore: 6.6 },
            { year: 2025, trim: 'Series III 3.0 Hurricane', engine: '3.0L twin-turbo I6 (Hurricane)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 340000, priceBasis: 'new', horsepower: 420, torqueNm: 637, realWorldKmPerL: 6.5, duneScore: 6.5, maintenanceScore: 5.5, overallScore: 6.9 },
          ],
        },
      ],
    },
    {
      name: 'Grand Wagoneer',
      bodyType: 'SUV',
      generations: [
        {
          code: 'WS',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Series III 6.4 V8', engine: '6.4L V8 (HEMI 392)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 320000, priceBasis: 'used', horsepower: 471, torqueNm: 617, realWorldKmPerL: 5.0, duneScore: 6.5, maintenanceScore: 5.0, overallScore: 6.6 },
            { year: 2025, trim: 'Series III 3.0 Hurricane H.O.', engine: '3.0L twin-turbo I6 (Hurricane H.O.)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 450000, priceBasis: 'new', horsepower: 510, torqueNm: 678, realWorldKmPerL: 6.2, duneScore: 6.5, maintenanceScore: 5.0, overallScore: 6.9 },
          ],
        },
      ],
    },
  ],
}
