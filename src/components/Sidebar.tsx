import { Link } from "react-router-dom";
import { useState } from "react";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Overlay Style) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={toggleSidebar}>
          <div
            className="absolute top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <button onClick={toggleSidebar} className="text-2xl">✖️</button>
            </div>
            <nav>
              <ul className="flex flex-col space-y-4">
                <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/properties" onClick={toggleSidebar}>Properties</Link></li>
                <li><Link to="/metrics" onClick={toggleSidebar}>Metrics</Link></li>
                <li><Link to="/properties/upload" onClick={toggleSidebar}>Upload Property</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white px-6 py-4 shadow sticky top-0 z-30">
          <button onClick={toggleSidebar} className="text-2xl">☰</button>
          <h1 className="text-xl font-semibold">Real Estate Platform</h1>
        </header>
      </div>
    </div>
  );
};

export default SidebarLayout;
