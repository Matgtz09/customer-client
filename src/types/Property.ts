import { Unit } from "./Unit";

export interface Property {
  id?: number;
  address: string;
  purchasePrice: number;
  grossIncome: number;
  totalUnits: number;
  grossExpenses: number;
  yearBuilt?: number;
  squareFootage?: number;
  units?: Unit[]; // optional relationship
}