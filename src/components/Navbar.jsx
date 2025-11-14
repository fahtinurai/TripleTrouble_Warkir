import { Link } from "react-router-dom";
import { FiShoppingCart, FiChevronDown, FiLogOut } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import WarkirLogo from "../assets/icons/icon_warkir.svg";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik luar area
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#3DA3B0] w-full pb-6">
      <nav className="sticky top-0 z-50 w-full bg-[#3DA3B0] text-white">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/">
              <img
              src={WarkirLogo}
              alt="warkir logo"
              className="w-[150px] h-[50px] object-contain"
            />
            </Link>
          </div>

          {/* Menu center */}
          <ul className="hidden md:flex items-center gap-12 text-base font-semibold">
            <li>
              <Link to="/" className="hover:underline">
                Beranda
              </Link>
            </li>

            {/* ✅ Hanya tampil kalau user BELUM login */}
            {/* {!user && (
              <li>
                <Link to="/tempat" className="hover:underline">
                  Pilih Tempat
                </Link>
              </li>
            )} */}
            <li>
              <Link to="/menu" className="hover:underline">
                Menu UMKM
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
          </ul>

          {/* Right section */}
          <div className="flex items-center gap-4">

            {/* Icon keranjang */}
            <Link
              to="/checkout"
              className="flex items-center justify-center text-white hover:opacity-90 transition"
              aria-label="Keranjang"
            >
              <FiShoppingCart className="text-[22px]" />
            </Link>

            {/* Jika belum login → tombol Login */}
            {!user && (
              <Link to="/login">
                <button className="bg-[#2C84C8] text-white font-semibold px-5 py-2 rounded-md shadow-md hover:brightness-110 transition">
                  Login
                </button>
              </Link>
            )}

            {/* Jika sudah login → Avatar + Dropdown */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  className="flex items-center gap-2 hover:opacity-90 transition"
                >
                  <img
                    src={user.photo || "https://i.pravatar.cc/150?img=5"}
                    alt="profile"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  />
                  <FiChevronDown
                    className={`transition-transform ${
                      openMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {openMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden animate-fadeIn z-50">
                    <div className="px-4 py-4 border-b border-gray-200">
                      <p className="font-semibold text-gray-900 text-lg">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-600 font-semibold hover:bg-red-50 transition"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}