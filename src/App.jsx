import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PilihTempat from "./pages/PilihTempat";
import MenuUMKM from "./pages/MenuUMKM";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider, useCart } from "./context/CartContext";

function RequireCart({ children }) {
  const { count } = useCart();
  return count === 0 ? <Navigate to="/menu" replace /> : children;
}

function AppInner() {
  const location = useLocation();

  // DEV: selalu tampilkan popup
  // PROD: tampil sekali (pakai localStorage)
  const [showPilihTempat, setShowPilihTempat] = useState(() => {
    try {
      if (import.meta.env.DEV) return true;                 // <-- perubahan utama
      return !localStorage.getItem("pilihTempatSeen");
    } catch {
      return true;
    }
  });

  const closePilihTempat = () => {
    try { localStorage.setItem("pilihTempatSeen", "1"); } catch {}
    setShowPilihTempat(false);
  };

  // Otomatis tutup modal saat pindah halaman
  useEffect(() => {
    if (location.pathname !== "/" && showPilihTempat) {
      closePilihTempat();
    }
  }, [location.pathname, showPilihTempat]); // tambahkan showPilihTempat di deps

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">
      <Navbar />

      {/* Offset untuk sticky navbar */}
      <main className="flex-1 pt-16 md:pt-20">
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
      </main>

      <Footer />

      {/* Modal tampil hanya di halaman "/" */}
      {location.pathname === "/" && showPilihTempat && (
        <PilihTempat onClose={closePilihTempat} asModal />
      )}
    </div>
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
