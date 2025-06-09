export interface Unit {
  id?: number;
  propertyId?: number; // Foreign key
  unitType: string; // e.g., "1BR", "Studio"
  size: number; // in sq ft
  rent: number; // current rent
}