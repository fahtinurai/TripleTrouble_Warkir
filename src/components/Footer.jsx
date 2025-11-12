export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white">
      {/* ===== BAGIAN HIJAU PUDAR (KOSONG) + WAVE TRANSISI ===== */}
      <div className="relative bg-[#C7ECEE]">
        {/* Bagian kosong hijau muda untuk transisi halus */}
        <div className="h-6" />  {/* Tinggi kecil supaya ada ruang lembut */}

        {/* Wave halus nyatu ke footer hijau tua */}
        <div className="w-full overflow-hidden leading-none">
          <svg
            className="w-full h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,90 480,10 720,60 C960,110 1200,30 1440,80 L1440,100 L0,100 Z"
              fill="#2E7A85"
            />
          </svg>
        </div>
      </div>

      {/* ===== FOOTER GRADIENT ===== */}
      <div className="relative bg-gradient-to-r from-[#338595] via-[#2e7a85] to-[#246a75] pt-16 pb-10 text-center z-[2]">
        <div className="container mx-auto px-8 max-w-screen-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-wide drop-shadow-sm">
            Warkir — Temukan UMKM Terbaik di Sekitarmu 💚
          </h3>

          <p className="text-sm md:text-base text-teal-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Dukung UMKM lokal untuk tumbuh dan dikenal lebih luas!  
            Setiap pembelianmu bantu roda ekonomi masyarakat berputar 🌿
          </p>

          <nav className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-medium">
            <a href="#" className="hover:text-yellow-200 transition duration-300">Tentang Kami</a>
            <a href="#" className="hover:text-yellow-200 transition duration-300">Kontak</a>
            <a href="#" className="hover:text-yellow-200 transition duration-300">Bantuan</a>
            <a href="#" className="hover:text-yellow-200 transition duration-300">Kebijakan Privasi</a>
          </nav>

          <div className="flex justify-center gap-8 mb-6">
            <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Instagram">
              <i className="fab fa-instagram text-2xl" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Facebook">
              <i className="fab fa-facebook text-2xl" />
            </a>
            <a href="#" className="hover:scale-110 transition-transform duration-300" aria-label="Twitter">
              <i className="fab fa-twitter text-2xl" />
            </a>
          </div>

          <p className="text-xs md:text-sm text-teal-100">
            © {new Date().getFullYear()} <span className="font-semibold">Warkir.com</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
