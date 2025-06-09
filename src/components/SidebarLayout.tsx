import { Link } from "react-router-dom";
import { useState } from "react";

const SidebarLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md fixed top-0 left-0 right-0 z-40">
        <button onClick={toggleSidebar} className="text-2xl text-gray-700">
          ☰
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Real Estate Platform</h1>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 flex">
          {/* Sidebar Content */}
          <div
            className="w-64 bg-gray-800 text-white p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <button onClick={toggleSidebar} className="text-xl">✖️</button>
            </div>
            <nav>
              <ul className="flex flex-col space-y-4 text-lg">
                <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
                <li><Link to="/properties" onClick={toggleSidebar}>Properties</Link></li>
                <li><Link to="/metrics" onClick={toggleSidebar}>Metrics</Link></li>
                <li><Link to="/properties/upload" onClick={toggleSidebar}>Upload Property</Link></li>
              </ul>
            </nav>
          </div>
          {/* Click Outside to Close */}
          <div className="flex-1 bg-black bg-opacity-40" onClick={toggleSidebar}></div>
        </div>
      )}
    </div>
  );
};

export default SidebarLayout;
