import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; // ikon keranjang React Icons
import WarkirLogo from "../assets/icons/icon_warkir.svg";

export default function Navbar() {
  return (
    <div className="bg-[#3DA3B0] w-full pb-6">
      <nav className="sticky top-0 z-50 w-full bg-[#3DA3B0] text-white">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={WarkirLogo}
              alt="warkir logo"
              className="w-[150px] h-[50px] object-contain"
            />
          </div>

          {/* Menu */}
          <ul className="hidden md:flex items-center gap-12 text-base font-semibold">
            <li>
              <Link to="/" className="hover:underline">
                Beranda
              </Link>
            </li>
            <li>
              <Link to="/tempat" className="hover:underline">
                Pilih Tempat
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:underline">
                Menu UMKM
              </Link>
            </li>
          </ul>

          {/* Keranjang + Login */}
          <div className="flex items-center gap-4">

            {/* Icon keranjang */}
            <Link
              to="/checkout"
              className="flex items-center justify-center text-white hover:opacity-90 transition"
              aria-label="Keranjang"
            >
              <FiShoppingCart className="text-[22px]" />
            </Link>

            {/* Tombol Login */}
            <Link to="/login">
              <button className="bg-[#2C84C8] text-white font-semibold px-5 py-2 rounded-md shadow-md hover:brightness-110 transition">
                Login
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
