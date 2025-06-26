import { Property } from "../types/Property";
import { Link } from "react-router-dom";

interface Props {
  property: Property;
}

export default function PropertyCard({ property }: Props) {
  const d = property.details;
  return (
    <div className="p-4 bg-white rounded shadow border">
      <h2 className="text-xl font-semibold text-gray-800">
        <Link to={`/properties/${property.id}`} className="text-blue-600 hover:underline">
          {d.name || "Unnamed Property"}
        </Link>
      </h2>
      <p className="text-gray-600">{d.address || "No address provided"}</p>
      <p className="text-sm text-gray-500">
        Units: {d.number_of_units ?? "?"}
      </p>
      <p className="text-sm text-gray-500">
        Price: {d.purchase_price ? `$${d.purchase_price.toLocaleString()}` : "N/A"}
      </p>
    </div>
  );
}
