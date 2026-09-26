import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHeader from '../components/dashboard/DashboardHeader';

function DashboardLayout({ role = 'customer', title = 'Dashboard' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const roleNames = {
    customer: 'Customer',
    entrepreneur: 'Entrepreneur',
    admin: 'Admin',
  };

  const roleUserNames = {
    customer: 'Fatima Ahmed',
    entrepreneur: 'Tariq Mehmood',
    admin: 'System Admin',
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <Sidebar
        role={role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        <DashboardHeader
          role={roleNames[role] || 'User'}
          userName={roleUserNames[role] || 'User'}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
