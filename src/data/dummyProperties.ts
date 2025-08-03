import { Property } from "../types/Property";

export const dummyProperties: Property[] = [
  {
    id: 1,
    details: {
      name: "Sample Property 1",
      address: "123 Main St",
      purchase_price: 500000,
      gross_income: 85000,
      gross_expenses: 20000,
      number_of_units: 2,
      year_built: 1990,
      square_footage: 5000,
      unit_mix: [
        { bedrooms: 2, bathrooms: 1, count: 1 },
        { bedrooms: 1, bathrooms: 1, count: 1 },
      ],
    },
  },
  {
    id: 2,
    details: {
      name: "Sample Property 2",
      address: "456 Maple Ave",
      purchase_price: 720000,
      gross_income: 98000,
      gross_expenses: 25000,
      number_of_units: 3,
      year_built: 1985,
      square_footage: 6200,
      unit_mix: [
        { bedrooms: 3, bathrooms: 2, count: 2 },
        { bedrooms: 2, bathrooms: 1, count: 1 },
      ],
    },
  },
];
