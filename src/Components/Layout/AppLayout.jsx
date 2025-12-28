import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { HiOutlineMenu } from "react-icons/hi";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0B0D10] via-[#0E1016] to-black text-gray-200">
      <div className="md:hidden flex items-center justify-between px-4 h-14 border-b border-[#23283A]">
        <span className="font-['Playfair_Display'] text-lg">HireFlow</span>
        <button onClick={() => setSidebarOpen(true)}>
          <HiOutlineMenu className="text-2xl" />
        </button>
      </div>

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64">
              <Sidebar />
            </div>
            <div
              className="flex-1 bg-black/60"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <main className="flex-1 px-4 md:px-8 py-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
