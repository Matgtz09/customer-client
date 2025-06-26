import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config";


type UnitMix = {
  bedrooms: number;
  bathrooms: number;
  count: number;
};

type PropertyDetailsType = {
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

type Property = {
  id: number;
  details: PropertyDetailsType;
};

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/v1/properties/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch property");
        return res.json();
      })
      .then(setProperty)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading property details...</p>;

  if (!property) return <p>Property not found.</p>;

  const d = property.details;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Link to="/properties" className="text-blue-600 hover:underline mb-4 inline-block">
        &larr; Back to Properties
      </Link>

      <h1 className="text-3xl font-bold mb-6">{d.name || "Unnamed Property"}</h1>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <p><strong>Address:</strong> {d.address || "N/A"}</p>
        <p><strong>Purchase Price:</strong> {d.purchase_price ? `$${d.purchase_price.toLocaleString()}` : "N/A"}</p>
        <p><strong>Gross Income:</strong> {d.gross_income ? `$${d.gross_income.toLocaleString()}` : "N/A"}</p>
        <p><strong>Insurance:</strong> {d.insurance ? `$${d.insurance.toLocaleString()}` : "N/A"}</p>
        <p><strong>Repairs:</strong> {d.repairs ? `$${d.repairs.toLocaleString()}` : "N/A"}</p>
        <p><strong>Management Fees:</strong> {d.management_fees ? `$${d.management_fees.toLocaleString()}` : "N/A"}</p>
        <p><strong>Utilities:</strong> {d.utilities ? `$${d.utilities.toLocaleString()}` : "N/A"}</p>
        <p><strong>Number of Units:</strong> {d.number_of_units ?? "N/A"}</p>
        <p><strong>Year Built:</strong> {d.year_built ?? "N/A"}</p>
        <p><strong>Square Footage:</strong> {d.square_footage ?? "N/A"}</p>
        <p><strong>Gross Expenses:</strong> {d.gross_expenses ? `$${d.gross_expenses.toLocaleString()}` : "N/A"}</p>

        <div>
          <strong>Unit Mix:</strong>
          {Array.isArray(d.unit_mix) && d.unit_mix.length > 0 ? (
            <ul className="list-disc list-inside">
              {d.unit_mix.map((unit, idx) => (
                <li key={idx}>
                  {unit.count} units — {unit.bedrooms} bd / {unit.bathrooms} ba
                </li>
              ))}
            </ul>
          ) : (
            <p>N/A</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
