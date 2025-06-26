import { useEffect, useState } from "react";
import { Property } from "../types/Property";
import PropertyCard from "../components/PropertyCard";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";


export default function PropertyList() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/properties`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setProperties)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Property List</h1>

      <div className="mb-6">
        <Link
          to="/properties/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Add New Property
        </Link>
      </div>

      {loading && <p>Loading properties...</p>}

      {!loading && properties.length === 0 && <p>No properties found.</p>}

      <div className="grid grid-cols-1 gap-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
