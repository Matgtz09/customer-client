import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PropertyDetails from "../pages/PropertyDetails";
import CreateProperty from "../pages/CreateProperty";
import EditProperty from "../pages/EditProperty";
import MetricsDashboard from "../pages/Metrics/MetricsDashboard";
import SidebarLayout from "../layout/SidebarLayout";
import PropertyList from "../pages/PropertyList";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<Home />} />
        <Route path="properties/new" element={<CreateProperty />} />
        <Route path="properties/:id" element={<PropertyDetails />} />
        <Route path="properties/:id/edit" element={<EditProperty />} />
        <Route path="metrics" element={<MetricsDashboard />} />
        <Route path="properties" element={<PropertyList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
