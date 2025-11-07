import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-[#338595] text-white shadow-lg">
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide drop-shadow-sm">
          Warkir.com
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-8 text-base font-medium">
          <li><Link className="hover:text-yellow-300 transition" to="/">Beranda</Link></li>
          <li><Link className="hover:text-yellow-300 transition" to="/tempat">Jenis Order</Link></li>
          <li><Link className="hover:text-yellow-300 transition" to="/menu">Menu UMKM</Link></li>
          <li><Link className="hover:text-yellow-300 transition" to="/checkout">Order</Link></li>
        </ul>

        {/* Action */}
        <div className="hidden md:flex gap-3">
           <Link to="/login">
            <button className="bg-[#207DC5] text-white font-semibold px-4 py-2 rounded-lg transition">
              Masuk
            </button>
          </Link>
          <Link to="/register">
          <button className="border  border-gray-300 text-white font-semibold px-4 py-2 rounded-lg transition">
      Daftar
    </button>
          </Link>
        </div>
      </div>

      {/* Menu mobile */}
      <div className="md:hidden text-center text-sm py-2 bg-white/10 backdrop-blur-sm">
        <Link to="/" className="mx-2 hover:text-yellow-200">Beranda</Link>•
        <Link to="/tempat" className="mx-2 hover:text-yellow-200">Tempat</Link>•
        <Link to="/menu" className="mx-2 hover:text-yellow-200">Menu</Link>•
        <Link to="/checkout" className="mx-2 hover:text-yellow-200">Checkout</Link>
      </div>
    </nav>
  );
}
