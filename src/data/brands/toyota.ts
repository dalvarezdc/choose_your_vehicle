import type { BrandData } from '../types.ts'

// Toyota — UAE ballpark figures (estimated).
export const toyota: BrandData = {
  brand: 'Toyota',
  country: 'Japan',
  families: [
    {
      name: 'Land Cruiser',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J200',
          yearStart: 2008,
          yearEnd: 2021,
          variants: [
            { year: 2013, trim: 'GXR V8', engine: '4.6L V8 (1UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 85000, priceBasis: 'used', horsepower: 304, torqueNm: 439, realWorldKmPerL: 6.0, duneScore: 8.5, maintenanceScore: 9.0, overallScore: 8.2 },
            { year: 2016, trim: 'VXR', engine: '5.7L V8 (3UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 165000, priceBasis: 'used', horsepower: 362, torqueNm: 530, realWorldKmPerL: 5.6, duneScore: 9.0, maintenanceScore: 8.5, overallScore: 8.6 },
            { year: 2021, trim: 'GXR V8', engine: '4.6L V8 (1UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 210000, priceBasis: 'used', horsepower: 304, torqueNm: 439, realWorldKmPerL: 6.1, duneScore: 8.5, maintenanceScore: 9.0, overallScore: 8.6 },
            { year: 2021, trim: 'VXR', engine: '5.7L V8 (3UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 290000, priceBasis: 'used', horsepower: 362, torqueNm: 530, realWorldKmPerL: 5.7, duneScore: 9.0, maintenanceScore: 8.5, overallScore: 8.9, notes: 'Last V8 Land Cruiser; holds value very well.' },
          ],
        },
        {
          code: 'J300',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2022, trim: 'GX', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 200000, priceBasis: 'used', horsepower: 271, torqueNm: 385, realWorldKmPerL: 6.8, duneScore: 8.5, maintenanceScore: 9.5, overallScore: 8.4 },
            { year: 2022, trim: 'GXR Twin Turbo', engine: '3.5L twin-turbo V6 (V35A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 285000, priceBasis: 'used', horsepower: 409, torqueNm: 650, realWorldKmPerL: 6.9, duneScore: 9.5, maintenanceScore: 8.5, overallScore: 9.1 },
            { year: 2025, trim: 'GXR Twin Turbo', engine: '3.5L twin-turbo V6 (V35A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 409, torqueNm: 650, realWorldKmPerL: 7.0, duneScore: 9.5, maintenanceScore: 8.5, overallScore: 9.3 },
            { year: 2025, trim: 'GR Sport', engine: '3.5L twin-turbo V6 (V35A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 410000, priceBasis: 'new', horsepower: 409, torqueNm: 650, realWorldKmPerL: 6.8, duneScore: 9.5, maintenanceScore: 8.0, overallScore: 9.3, notes: 'Front/rear diff locks and E-KDSS.' },
          ],
        },
      ],
    },
    {
      name: 'Land Cruiser 70',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'J79',
          yearStart: 2007,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Single Cab Pickup', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed manual', priceAed: 150000, priceBasis: 'new', horsepower: 228, torqueNm: 360, realWorldKmPerL: 6.5, duneScore: 8.5, maintenanceScore: 10.0, overallScore: 7.8, notes: 'Workhorse: basic cabin, near-indestructible.' },
          ],
        },
      ],
    },
    {
      name: 'Land Cruiser Prado',
      bodyType: 'SUV',
      generations: [
        {
          code: 'J150',
          yearStart: 2010,
          yearEnd: 2023,
          variants: [
            { year: 2016, trim: 'VX V6', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 85000, priceBasis: 'used', horsepower: 271, torqueNm: 381, realWorldKmPerL: 7.0, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 7.9 },
            { year: 2021, trim: 'TXL 2.7', engine: '2.7L I4 (2TR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 115000, priceBasis: 'used', horsepower: 161, torqueNm: 246, realWorldKmPerL: 8.0, duneScore: 6.5, maintenanceScore: 9.5, overallScore: 7.3, notes: 'Underpowered on soft sand.' },
            { year: 2023, trim: 'VXR V6', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 165000, priceBasis: 'used', horsepower: 271, torqueNm: 381, realWorldKmPerL: 7.2, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 8.2 },
          ],
        },
        {
          code: 'J250',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'TX', engine: '2.4L turbo I4 (T24A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 195000, priceBasis: 'new', horsepower: 278, torqueNm: 430, realWorldKmPerL: 8.5, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 8.5 },
            { year: 2025, trim: 'VX', engine: '2.4L turbo I4 (T24A-FTS)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 245000, priceBasis: 'new', horsepower: 278, torqueNm: 430, realWorldKmPerL: 8.3, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 8.6 },
          ],
        },
      ],
    },
    {
      name: 'Fortuner',
      bodyType: 'SUV',
      generations: [
        {
          code: 'AN50',
          yearStart: 2005,
          yearEnd: 2015,
          variants: [
            { year: 2013, trim: 'V6 4x4', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 40000, priceBasis: 'used', horsepower: 235, torqueNm: 376, realWorldKmPerL: 6.8, duneScore: 7.0, maintenanceScore: 9.0, overallScore: 7.0 },
          ],
        },
        {
          code: 'AN160',
          yearStart: 2016,
          yearEnd: null,
          variants: [
            { year: 2020, trim: 'EXR 2.7', engine: '2.7L I4 (2TR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 80000, priceBasis: 'used', horsepower: 164, torqueNm: 245, realWorldKmPerL: 8.0, duneScore: 6.0, maintenanceScore: 9.5, overallScore: 6.9 },
            { year: 2024, trim: 'VXR V6', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 155000, priceBasis: 'new', horsepower: 235, torqueNm: 376, realWorldKmPerL: 7.0, duneScore: 7.0, maintenanceScore: 9.0, overallScore: 7.6 },
          ],
        },
      ],
    },
    {
      name: '4Runner',
      bodyType: 'SUV',
      generations: [
        {
          code: 'N280',
          yearStart: 2010,
          yearEnd: 2024,
          variants: [
            { year: 2019, trim: 'TRD Off-Road', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '5-speed automatic', priceAed: 115000, priceBasis: 'used', horsepower: 270, torqueNm: 377, realWorldKmPerL: 6.8, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 7.8 },
          ],
        },
        {
          code: 'N500',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'TRD Off-Road', engine: '2.4L turbo I4 (i-Force)', fuel: 'petrol', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 210000, priceBasis: 'new', horsepower: 278, torqueNm: 430, realWorldKmPerL: 8.0, duneScore: 8.0, maintenanceScore: 9.0, overallScore: 8.2 },
            { year: 2025, trim: 'TRD Pro', engine: '2.4L turbo I4 hybrid (i-Force MAX)', fuel: 'hybrid', drivetrain: '4WD', transmission: '8-speed automatic', priceAed: 285000, priceBasis: 'new', horsepower: 326, torqueNm: 630, realWorldKmPerL: 9.0, duneScore: 8.5, maintenanceScore: 8.0, overallScore: 8.4 },
          ],
        },
      ],
    },
    {
      name: 'Tundra',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'XK50',
          yearStart: 2007,
          yearEnd: 2021,
          variants: [
            { year: 2018, trim: 'TRD Pro', engine: '5.7L V8 (3UR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 125000, priceBasis: 'used', horsepower: 381, torqueNm: 544, realWorldKmPerL: 5.5, duneScore: 7.0, maintenanceScore: 8.5, overallScore: 7.5 },
          ],
        },
        {
          code: 'XK70',
          yearStart: 2022,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Limited', engine: '3.5L twin-turbo V6 (i-Force)', fuel: 'petrol', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 260000, priceBasis: 'new', horsepower: 389, torqueNm: 649, realWorldKmPerL: 6.5, duneScore: 7.0, maintenanceScore: 7.5, overallScore: 7.8 },
            { year: 2024, trim: 'TRD Pro', engine: '3.5L twin-turbo V6 hybrid (i-Force MAX)', fuel: 'hybrid', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 437, torqueNm: 790, realWorldKmPerL: 7.0, duneScore: 7.5, maintenanceScore: 7.0, overallScore: 8.0 },
          ],
        },
      ],
    },
    {
      name: 'Sequoia',
      bodyType: 'SUV',
      generations: [
        {
          code: 'XK80',
          yearStart: 2023,
          yearEnd: null,
          variants: [
            { year: 2024, trim: 'Limited', engine: '3.4L twin-turbo V6 hybrid (i-FORCE MAX)', fuel: 'hybrid', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 330000, priceBasis: 'new', horsepower: 437, torqueNm: 790, realWorldKmPerL: 8.0, duneScore: 7.0, maintenanceScore: 7.5, overallScore: 7.6 },
            { year: 2025, trim: 'TRD Pro', engine: '3.4L twin-turbo V6 hybrid (i-FORCE MAX)', fuel: 'hybrid', drivetrain: '4WD', transmission: '10-speed automatic', priceAed: 380000, priceBasis: 'new', horsepower: 437, torqueNm: 790, realWorldKmPerL: 7.6, duneScore: 8.0, maintenanceScore: 7.5, overallScore: 7.9, notes: 'FOX dampers, rear locker.' },
          ],
        },
      ],
    },
    {
      name: 'Hilux',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'AN120/AN130',
          yearStart: 2016,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'GLX 2.7 Double Cab 4x4', engine: '2.7L I4 (2TR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 105000, priceBasis: 'new', horsepower: 164, torqueNm: 245, realWorldKmPerL: 9.0, duneScore: 6.0, maintenanceScore: 9.5, overallScore: 7.0 },
            { year: 2024, trim: 'Adventure 4.0 V6', engine: '4.0L V6 (1GR-FE)', fuel: 'petrol', drivetrain: '4WD', transmission: '6-speed automatic', priceAed: 155000, priceBasis: 'new', horsepower: 228, torqueNm: 376, realWorldKmPerL: 7.5, duneScore: 7.5, maintenanceScore: 9.0, overallScore: 7.6 },
          ],
        },
      ],
    },
  ],
}
