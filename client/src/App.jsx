import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header.jsx';
import { LoginForm } from './components/Login.jsx';
import { SignupForm } from './components/SignUp.jsx';
import HomePage from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import StorePage from './components/Store.jsx';
import AboutPage from './components/About.jsx';
import ContactPage from './components/contact.jsx';
import MyRatings from './components/Rating.jsx';
import MyStorePage from './components/StoreDashbord.jsx';
import StoreRatingsPage from './components/StoreRating.jsx';
import ManageUsersPage from './components/AdminUserManagement.jsx';
import OwnerProfilePage from './components/OwnerProfile.jsx';
import NormalUserProfilePage from './components/NormalUser.jsx';
import AdminProfilePage from './components/AdminProfile.jsx';
import ManageStoresPage from './components/AdminStoreManagement.jsx';
import ReportsDashboardPage from './components/AdminReport.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import axios from 'axios';
import { UserContext } from "./components/Context.jsx";
import AdminDashboard from './components/Admin.jsx';

function App() {
  const { user, resetUserData, setUserData } = useContext(UserContext);
  const [showForm, setShowForm] = useState(null); // 'login', 'signup', or null
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = (data) => {
    setUserData(data);
    setShowForm(null);
  };

  const handleLogout = () => {
    localStorage.setItem('token', '');
    resetUserData();
  };

  const handleSearch = (term) => {
    console.log('Searching for:', term);
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setIsLoading(false);

        const res = await axios.get(
          "http://localhost:5000/api/v1/store_app/is-login",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        handleLogin(res.data.user);
      } catch (err) {
        console.error("Login check error:", err.message, err.response?.data);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-20 text-lg font-medium">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="p-4 bg-gray-100 w-full font-sans">
        <div className="w-full mx-auto">
          <Header
            isLoggedIn={!!user}
            userRole={user?.type || "Guest"}
            handleLogout={handleLogout}
            onSearch={handleSearch}
            onLoginClick={() => setShowForm('login')}
            onSignupClick={() => setShowForm('signup')}
          />

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage onLoginClick={() => setShowForm('login')} onSignupClick={() => setShowForm('signup')} />} />
            <Route path="/stores" element={<StorePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Normal User Routes */}
            <Route
              path="/my-ratings"
              element={
                <ProtectedRoute allowedRoles={['Normal User']}>
                  <MyRatings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-profile"
              element={
                <ProtectedRoute allowedRoles={['Normal User']}>
                  <NormalUserProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Store Owner Routes */}
            <Route
              path="/my-store"
              element={
                <ProtectedRoute allowedRoles={['Store Owner']}>
                  <MyStorePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/store-ratings"
              element={
                <ProtectedRoute allowedRoles={['Store Owner']}>
                  <StoreRatingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/owner-profile"
              element={
                <ProtectedRoute allowedRoles={['Store Owner']}>
                  <OwnerProfilePage />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <ManageUsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/stores"
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <ManageStoresPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <ReportsDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute allowedRoles={['System Administrator']}>
                  <AdminProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {showForm === 'login' && <LoginForm onClose={() => setShowForm(null)} onLogin={handleLogin} />}
          {showForm === 'signup' && <SignupForm onClose={() => setShowForm(null)} onSignup={handleLogin} />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
