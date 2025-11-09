export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-r from-[#338595] via-[#2e7a85] to-[#246a75] text-white w-full overflow-hidden">
      {/* Gelombang atas sebagai pemisah lembut */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg
          className="relative block w-full h-10 text-white opacity-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39 56.44c58-10.79 114.74-30.85 172-41.89 86-16.67 172-22.54 258 1.6 
            70.67 19.49 141.33 57.82 211.33 66.86 
            66 8.53 132-11.43 198-28.6V120H0V16.81
            c86 12.37 172 27.58 258 32.57 
            63.09 3.73 126.18-2.77 189.39 7.06z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      {/* Isi Footer */}
      <div className="container mx-auto px-8 pt-16 pb-10 text-center relative z-10 max-w-screen-2xl">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide text-white drop-shadow-sm">
          Warkir — Temukan UMKM Terbaik di Sekitarmu 💚
        </h3>

        <p className="text-sm md:text-base text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
          Dukung UMKM lokal untuk tumbuh dan dikenal lebih luas!  
          Setiap pembelianmu bantu roda ekonomi masyarakat berputar 🌿
        </p>

        {/* Navigasi footer */}
        <nav className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium">
          <a href="#" className="hover:text-yellow-200 transition duration-300">Tentang Kami</a>
          <a href="#" className="hover:text-yellow-200 transition duration-300">Kontak</a>
          <a href="#" className="hover:text-yellow-200 transition duration-300">Bantuan</a>
          <a href="#" className="hover:text-yellow-200 transition duration-300">Kebijakan Privasi</a>
        </nav>

        {/* Ikon Sosial */}
        <div className="flex justify-center gap-8 mb-6">
          <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Instagram">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Facebook">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Twitter">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
        </div>

        <p className="text-xs md:text-sm text-teal-100">
          © {new Date().getFullYear()} <span className="font-semibold">Warkir.com</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
