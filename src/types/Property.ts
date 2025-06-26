export type UnitMix = {
  bedrooms: number;
  bathrooms: number;
  count: number;
};

export type PropertyDetails = {
  name: string;
  address: string;
  purchase_price?: number;
  gross_income?: number;
  insurance?: number;
  repairs?: number;
  management_fees?: number;
  utilities?: number;
  number_of_units?: number;
  unit_mix?: UnitMix[];
  year_built?: number;
  square_footage?: number;
  gross_expenses?: number;
};

export type Property = {
  id: number;
  details: PropertyDetails;
};
