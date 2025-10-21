import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PilihTempat from "./pages/PilihTempat";
import MenuUMKM from "./pages/MenuUMKM";
import Checkout from "./pages/Checkout";
import { CartProvider, useCart } from "./context/CartContext";
import Login from "./pages/Login";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import Signup from "./pages/signup";

function RequireCart({ children }) {
  const { count } = useCart();
  return count === 0 ? <Navigate to="/menu" replace /> : children;
}

function AppInner() {
  const location = useLocation();

  const [showPilihTempat, setShowPilihTempat] = useState(() => {
    try {
      if (import.meta.env.DEV) return true;
      return !localStorage.getItem("pilihTempatSeen");
    } catch {
      return true;
    }
  });

  const closePilihTempat = () => {
    try { localStorage.setItem("pilihTempatSeen", "1"); } catch { /* empty */ }
    setShowPilihTempat(false);
  };

  useEffect(() => {
    if (location.pathname !== "/" && showPilihTempat) {
      closePilihTempat();
    }
  }, [location.pathname, showPilihTempat]);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";


  return (
    <>
      {isAuthPage ? (
        <AuthLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
          </Routes>
        </AuthLayout>
      ) : (
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/tempat"
              element={<PilihTempat onClose={closePilihTempat} asModal={false} />}
            />
            <Route path="/menu" element={<MenuUMKM />} />
            <Route
              path="/checkout"
              element={
                <RequireCart>
                  <Checkout />
                </RequireCart>
              }
            />
          </Routes>

          {/* Modal tampil hanya di halaman "/" */}
          {location.pathname === "/" && showPilihTempat && (
            <PilihTempat onClose={closePilihTempat} asModal />
          )}
        </MainLayout>
      )}
    </>
  );
}


export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppInner />
      </CartProvider>
    </Router>
  );
}
