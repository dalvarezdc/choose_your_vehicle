import type { BrandData } from '../types.ts'

// Tesla — UAE figures. New prices: Tesla UAE configurator (VAT incl.) as read by
// plaidcars.com/tesla-prices-uae and madena.ae, 3 Nov 2026. Used prices: PlaidCars GCC-spec
// median asking, 3 Nov 2026. Tesla UAE no longer sells Model S/X new (used only).
// Electric: `realWorldKmPerL` is the petrol-energy equivalent (8.9 kWh = 1 L petrol, like
// US "MPGe"), estimated from real-world UAE consumption with A/C on — lower than the
// official figure. Dune scores are low: no low range, heavy, road tyres.
export const tesla: BrandData = {
  brand: 'Tesla',
  country: 'USA',
  families: [
    {
      name: 'Model Y',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Model Y (1st gen)',
          yearStart: 2020,
          yearEnd: 2024,
          variants: [
            { year: 2022, trim: 'Long Range AWD', engine: 'Dual motor electric (~75 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 115000, priceBasis: 'used', horsepower: 384, torqueNm: 493, curbWeightKg: 1980, realWorldKmPerL: 52, duneScore: 2.0, maintenanceScore: 7.0, overallScore: 5.2, notes: 'km/L = petrol-energy equivalent (~17 kWh/100 km).', source: 'Used price: PlaidCars Pre-Juniper Long Range GCC median AED 115,000 (3 Nov 2026).' },
            { year: 2023, trim: 'Performance', engine: 'Dual motor electric (~75 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 129000, priceBasis: 'used', horsepower: 456, torqueNm: 660, curbWeightKg: 2000, realWorldKmPerL: 47, duneScore: 1.5, maintenanceScore: 6.5, overallScore: 5.0, notes: 'km/L = petrol-energy equivalent. 21-inch wheels, lowered.', source: 'Used price: PlaidCars Pre-Juniper Performance GCC median AED 129,000 (3 Nov 2026).' },
          ],
        },
        {
          code: 'Model Y (Juniper)',
          yearStart: 2025,
          yearEnd: null,
          variants: [
            { year: 2025, trim: 'RWD', engine: 'Single motor electric', fuel: 'electric', drivetrain: 'RWD', transmission: 'Single-speed', priceAed: 174990, priceBasis: 'new', horsepower: 295, torqueNm: 420, curbWeightKg: 1930, realWorldKmPerL: 55, duneScore: 1.0, maintenanceScore: 7.5, overallScore: 5.0, notes: 'Premium RWD. km/L = petrol-energy equivalent. HP/torque are estimates (Tesla does not publish them for UAE).', source: 'UAE price: Tesla UAE configurator via plaidcars.com / madena.ae (3 Nov 2026).' },
            { year: 2025, trim: 'Long Range AWD', engine: 'Dual motor electric (~79 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 204990, priceBasis: 'new', horsepower: 507, torqueNm: 493, curbWeightKg: 2010, realWorldKmPerL: 52, duneScore: 2.0, maintenanceScore: 7.5, overallScore: 5.4, notes: 'Premium Long Range AWD. km/L = real-world petrol-energy equivalent (official UAE 15.3 kWh/100 km ≈ 58 km/L). Power 378 kW / 507 hp, 493 Nm per EV Database / evstats.', source: 'UAE price + consumption: Tesla UAE (tesla.com/en_ae, configurator via plaidcars.com, 3 Nov 2026). Power: ev-database.org / evstats.org.' },
            { year: 2026, trim: 'Performance', engine: 'Dual motor electric (~79 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 239990, priceBasis: 'new', horsepower: 460, torqueNm: 741, curbWeightKg: 2040, realWorldKmPerL: 47, duneScore: 1.5, maintenanceScore: 7.0, overallScore: 5.2, notes: 'km/L = real-world petrol-energy equivalent (official UAE 16.2 kWh/100 km ≈ 55 km/L). 460 hp, 3.5 s 0–100, 580 km WLTP per Tesla UAE launch; 741 Nm per EV Database.', source: 'Tesla UAE Model Y Performance launch (Jan 2026, zigwheels.ae / Zawya); price confirmed Tesla UAE configurator via plaidcars.com (3 Nov 2026). Torque: ev-database.org.' },
          ],
        },
      ],
    },
    {
      name: 'Model X',
      bodyType: 'SUV',
      generations: [
        {
          code: 'Model X (1st gen)',
          yearStart: 2016,
          yearEnd: 2020,
          variants: [
            { year: 2018, trim: '100D', engine: 'Dual motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 95000, priceBasis: 'used', horsepower: 417, torqueNm: 660, curbWeightKg: 2460, realWorldKmPerL: 38, duneScore: 2.5, maintenanceScore: 5.0, overallScore: 4.8, notes: 'km/L = petrol-energy equivalent. Falcon doors and older battery are the risk items.', source: 'Used price estimate: PlaidCars Model X GCC median AED 99,400 all trims, older Performance AED 97,900 (3 Nov 2026); 100D cohort too thin to quote.' },
          ],
        },
        {
          code: 'Model X (refresh)',
          yearStart: 2021,
          yearEnd: null,
          variants: [
            { year: 2023, trim: 'Long Range AWD', engine: 'Dual motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 210000, priceBasis: 'used', horsepower: 670, torqueNm: 967, curbWeightKg: 2350, realWorldKmPerL: 40, duneScore: 2.5, maintenanceScore: 6.0, overallScore: 5.4, notes: 'No longer sold new in the UAE. km/L = petrol-energy equivalent. Adjustable air suspension.', source: 'Used price estimate: PlaidCars Model X Long Range GCC range AED 90k–218k (median 118,250 mixes older cars), 3 Nov 2026; refresh cars sit at the top of the range.' },
            { year: 2025, trim: 'Plaid', engine: 'Tri motor electric (100 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 269000, priceBasis: 'used', horsepower: 1020, torqueNm: 1420, curbWeightKg: 2450, realWorldKmPerL: 37, duneScore: 2.5, maintenanceScore: 5.5, overallScore: 5.3, notes: 'No longer sold new in the UAE. km/L = petrol-energy equivalent.', source: 'Used price: PlaidCars Model X Plaid GCC median AED 269,000 (3 Nov 2026).' },
          ],
        },
      ],
    },
    {
      name: 'Cybertruck',
      bodyType: 'Pickup',
      generations: [
        {
          code: 'Cybertruck',
          yearStart: 2024,
          yearEnd: null,
          variants: [
            { year: 2026, trim: 'All-Wheel Drive', engine: 'Dual motor electric (~123 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 404990, priceBasis: 'new', horsepower: 600, torqueNm: 1000, curbWeightKg: 2995, realWorldKmPerL: 34, duneScore: 6.0, maintenanceScore: 5.5, overallScore: 6.3, notes: 'UAE orders Sep 2025, deliveries Jan 2026. Air suspension, rear-wheel steer, front/rear lockers. km/L = petrol-energy equivalent. Torque is an estimate (Tesla quotes wheel torque).', source: 'UAE price: Tesla UAE launch (Sep 2025) via zigwheels.ae / electrek.co; confirmed Tesla UAE configurator via plaidcars.com (3 Nov 2026).' },
            { year: 2026, trim: 'Cyberbeast', engine: 'Tri motor electric (~123 kWh)', fuel: 'electric', drivetrain: 'AWD', transmission: 'Single-speed', priceAed: 454990, priceBasis: 'new', horsepower: 845, torqueNm: 1300, curbWeightKg: 3105, realWorldKmPerL: 32, duneScore: 6.5, maintenanceScore: 5.0, overallScore: 6.4, notes: 'km/L = petrol-energy equivalent. Torque is an estimate.', source: 'UAE price: Tesla UAE launch (Sep 2025) via zigwheels.ae / electrek.co; confirmed Tesla UAE configurator via plaidcars.com (3 Nov 2026).' },
          ],
        },
      ],
    },
  ],
}
