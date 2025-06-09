import { Route } from "react-router-dom";
import PropertyDetails from "../pages/PropertyDetails";
// import PropertyUpload from "../pages/PropertyUpload";
// import PropertyEdit from "../pages/PropertyEdit";
// import Metrics from "../pages/Metrics";

const PropertyRoutes = () => {
  return (
    <>
      <Route path="/properties/:id" element={<PropertyDetails />} />
      {/* <Route path="/properties/:id/edit" element={<PropertyEdit />} />
      <Route path="/properties/:id/metrics" element={<Metrics />} />
      <Route path="/properties/upload" element={<PropertyUpload />} /> */}
    </>
  );
};

export default PropertyRoutes;