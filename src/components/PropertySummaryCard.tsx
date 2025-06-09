import { Link } from "react-router-dom"; // Import Link for routing
import { Property } from "../types/Property"; // Make sure the type is correct

const PropertySummaryCard = ({ property }: { property: Property }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      
      {/* <p>Purchase Price: ${property.purchasePrice.toLocaleString()}</p>
      <p>Total Units: {property.totalUnits}</p>
      <p>Gross Income: ${property.grossIncome.toLocaleString()}</p>
      <p>Expenses: ${property.grossExpenses.toLocaleString()}</p> */}
      
      {/* Link to detailed property page */}
      <Link to={`/properties/${property.id}`} className="text-blue-600 underline">
        <h2 className="text-xl font-bold">{property.address}</h2>
      </Link>
    </div>
  );
};

export default PropertySummaryCard;