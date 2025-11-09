import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className="bg-[#3DA3B0] w-full pb-6">
      <nav className="sticky top-0 z-50 w-full bg-[#3DA3B0] text-white">
        <div className="max-w-7xl mx-auto px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <FaCircle className="text-gray-300 text-3xl" />
            <Link to="/" className="text-xl font-bold">
              Warkir.com
            </Link>
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
            <li>
              <Link to="/checkout" className="hover:underline">
                Order
              </Link>
            </li>
          </ul>

          {/* Tombol Login */}
          <Link to="/login">
            <button className="bg-[#2C84C8] text-white font-semibold px-6 py-2 rounded-md shadow-md hover:brightness-110 transition">
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
