import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import PilihTempat from "./pages/PilihTempat";
import MenuUMKM from "./pages/MenuUMKM";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import SuccessPage from "./pages/SuccessPage";
import TimerPage from "./pages/TimerPage";

import { CartProvider, useCart } from "./context/CartContext";
import { TimerProvider } from "./context/TimerContext";
import { AuthProvider } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AboutUs from "./pages/AboutUs";

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function RequireCart({ children }) {
  const { count } = useCart();
  return count === 0 ? <Navigate to="/menu" replace /> : children;
}

function AuthLayoutRoutes() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

function MainLayoutRoutes() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

function AppInner() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showPilihTempat, setShowPilihTempat] = useState(() => {
    try {
      if (import.meta.env.DEV) return true;
      return !localStorage.getItem("pilihTempatSeen");
    } catch {
      return true;
    }
  });

  const closePilihTempat = () => {
    try {
      localStorage.setItem("pilihTempatSeen", "1");
    } catch {
      console.warn("Gagal menyimpan ke localStorage");
    }
    setShowPilihTempat(false);
  };

  useEffect(() => {
    if (location.pathname !== "/" && showPilihTempat) {
      closePilihTempat();
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route element={<AuthLayoutRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Route>

        <Route element={<MainLayoutRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/tempat"
            element={
              <RequireAuth>
                <PilihTempat onClose={closePilihTempat} asModal={false} />
              </RequireAuth>
            }
          />
          <Route
            path="/menu"
            element={
              <RequireAuth>
                <MenuUMKM />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <RequireCart>
                  <Checkout />
                </RequireCart>
              </RequireAuth>
            }
          />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Route>
      </Routes>

      {isHome && showPilihTempat && (
        <PilihTempat onClose={closePilihTempat} asModal />
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <CartProvider>
          <TimerProvider>
            <AppInner />
          </TimerProvider>
        </CartProvider>
      </Router>
    </AuthProvider>
  );
}
