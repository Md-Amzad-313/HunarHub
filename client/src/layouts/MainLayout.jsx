/**
 * MainLayout.jsx
 * Primary layout wrapper that includes the Navbar and Footer.
 * All public pages are rendered through this layout via <Outlet />.
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
