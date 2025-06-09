import { Property } from "../types/Property";
// import { Link } from "react-router-dom";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{property.address}</h2>
      <p>Purchase Price: ${property.purchasePrice.toLocaleString()}</p>
      <p>Total Units: {property.totalUnits}</p>
      <p>Gross Income: ${property.grossIncome.toLocaleString()}</p>
      <p>Expenses: ${property.grossExpenses.toLocaleString()}</p>

      
    </div>
  );
};

export default PropertyCard;
