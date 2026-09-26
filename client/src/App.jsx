import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CategoriesPage from './pages/CategoriesPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ServiceListPage from './pages/ServiceListPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import EntrepreneurListPage from './pages/EntrepreneurListPage';
import EntrepreneurDetailPage from './pages/EntrepreneurDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Customer Pages
import CustomerOverview from './pages/Customer/CustomerOverview';
import CustomerOrders from './pages/Customer/CustomerOrders';
import CustomerRequests from './pages/Customer/CustomerRequests';
import CustomerRecommendations from './pages/Customer/CustomerRecommendations';
import CustomerProfile from './pages/Customer/CustomerProfile';

// Entrepreneur Pages
import EntrepreneurOverview from './pages/Entrepreneur/EntrepreneurOverview';
import EntrepreneurProducts from './pages/Entrepreneur/EntrepreneurProducts';
import EntrepreneurServices from './pages/Entrepreneur/EntrepreneurServices';
import EntrepreneurOrders from './pages/Entrepreneur/EntrepreneurOrders';
import EntrepreneurRequests from './pages/Entrepreneur/EntrepreneurRequests';
import EntrepreneurProfile from './pages/Entrepreneur/EntrepreneurProfile';

// Admin Pages
import AdminOverview from './pages/Admin/AdminOverview';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminEntrepreneurs from './pages/Admin/AdminEntrepreneurs';
import AdminCategories from './pages/Admin/AdminCategories';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminComplaints from './pages/Admin/AdminComplaints';
import AdminAnalytics from './pages/Admin/AdminAnalytics';

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Marketplace Routes ──────────────────────── */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServiceListPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/entrepreneurs" element={<EntrepreneurListPage />} />
          <Route path="/entrepreneurs/:id" element={<EntrepreneurDetailPage />} />
        </Route>

        {/* ── Customer Portal Routes ───────────────────────────── */}
        <Route path="/customer" element={<DashboardLayout role="customer" title="Customer Portal" />}>
          <Route index element={<CustomerOverview />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="requests" element={<CustomerRequests />} />
          <Route path="recommendations" element={<CustomerRecommendations />} />
        </Route>

        {/* ── Entrepreneur Portal Routes ───────────────────────── */}
        <Route path="/entrepreneur" element={<DashboardLayout role="entrepreneur" title="Entrepreneur Studio" />}>
          <Route index element={<EntrepreneurOverview />} />
          <Route path="profile" element={<EntrepreneurProfile />} />
          <Route path="products" element={<EntrepreneurProducts />} />
          <Route path="services" element={<EntrepreneurServices />} />
          <Route path="orders" element={<EntrepreneurOrders />} />
          <Route path="requests" element={<EntrepreneurRequests />} />
        </Route>

        {/* ── Admin Control Center Routes ──────────────────────── */}
        <Route path="/admin" element={<DashboardLayout role="admin" title="Admin Control Center" />}>
          <Route index element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="entrepreneurs" element={<AdminEntrepreneurs />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="analytics" element={<AdminAnalytics />} />
        </Route>

        {/* ── 404 Fallback ────────────────────────────────────── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
