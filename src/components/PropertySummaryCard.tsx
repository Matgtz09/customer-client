import { Link } from "react-router-dom";
import { Property } from "../types/Property";

const PropertySummaryCard = ({ property }: { property: Property }) => {
  const d = property.details;

  return (
    <div className="border p-4 rounded shadow mb-4">

      <Link to={`/properties/${property.id}`} className="text-blue-600 underline">
        <h2 className="text-xl font-bold">{d.name || "Unnamed Property"}</h2>
      </Link>

      <p>Purchase Price: ${d.purchase_price?.toLocaleString() ?? "N/A"}</p>
      <p>Total Units: {d.number_of_units ?? "N/A"}</p>
      <p>Gross Income: ${d.gross_income?.toLocaleString() ?? "N/A"}</p>
      <p>Expenses: ${d.gross_expenses?.toLocaleString() ?? "N/A"}</p>
      
    </div>
  );
};

export default PropertySummaryCard;