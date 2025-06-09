import { Property } from "../types/Property";
import { dummyUnits } from "./dummyUnits";

export const dummyProperties: Property[] = [
  {
    id: 1,
    address: "123 Main St",
    purchasePrice: 500000,
    grossIncome: 85000,
    totalUnits: 2,
    grossExpenses: 20000,
    yearBuilt: 1990,
    squareFootage: 5000,
    units: dummyUnits.filter((u) => u.propertyId === 1),
  },
  {
    id: 2,
    address: "456 Maple Ave",
    purchasePrice: 650000,
    grossIncome: 95000,
    totalUnits: 1,
    grossExpenses: 30000,
    yearBuilt: 1985,
    squareFootage: 6000,
    units: dummyUnits.filter((u) => u.propertyId === 2),
  },
];
