export type Vehicle = {
  name: string;
  models: string;
  seats: string;
  bags: number;
  ratePerKm: number;
};

// TODO(client): per-km rates are samples for the design. Replace with real rates before launch.
export const fleet: Vehicle[] = [
  { name: "Sedan", models: "Swift Dzire or similar", seats: "4", bags: 2, ratePerKm: 12 },
  { name: "SUV", models: "Maruti Ertiga or similar", seats: "6", bags: 3, ratePerKm: 15 },
  { name: "Innova Crysta", models: "Toyota Innova Crysta", seats: "7", bags: 4, ratePerKm: 19 },
  { name: "Tempo Traveller", models: "Force Traveller", seats: "12-17", bags: 8, ratePerKm: 26 },
];
