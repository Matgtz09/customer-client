import PropertySummaryCard from "./PropertySummaryCard"; // Import the new summary card
import { Property } from "../types/Property";

const PropertyList = ({ properties }: { properties: Property[] }) => {
  return (
    <div>
      {properties.map((property) => (
        <PropertySummaryCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;