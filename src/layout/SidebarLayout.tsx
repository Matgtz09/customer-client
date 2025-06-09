import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
