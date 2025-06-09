import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Property } from "../types/Property";
import PropertyCard from "../components/PropertyCard";

const dummyProperties: Property[] = [
  {
    id: 1,
    address: "123 Main St",
    purchasePrice: 500000,
    grossIncome: 85000,
    totalUnits: 4,
    grossExpenses: 20000,
    units: [
      { id: 1, unitType: "1BR", rent: 1500, size: 600 },
      { id: 2, unitType: "2BR", rent: 1800, size: 850 },
      { id: 3, unitType: "Studio", rent: 1200, size: 400 },
      { id: 4, unitType: "1BR", rent: 1450, size: 600 },
    ],
  },
  {
    id: 2,
    address: "456 Market Ave",
    purchasePrice: 720000,
    grossIncome: 95000,
    totalUnits: 6,
    grossExpenses: 25000,
    units: [
      { id: 5, unitType: "2BR", rent: 2000, size: 850 },
      { id: 6, unitType: "Studio", rent: 1300, size: 400 },
    ],
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const propertyId = Number(id);
    const found = dummyProperties.find((prop) => prop.id === propertyId);
    setProperty(found ?? null);
  }, [id]);

  if (!property) return <p className="p-4">Property not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Property Details</h1>
      <PropertyCard property={property} />
    </div>
  );
};

export default PropertyDetails;
