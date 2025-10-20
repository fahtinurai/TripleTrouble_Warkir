export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="container mx-auto px-6 py-8 text-center">
        <p className="font-medium text-lg">© {new Date().getFullYear()} Warkir.com. All rights reserved.</p>
        <nav className="flex justify-center gap-6 mt-3 text-sm" aria-label="Footer">
          <a href="#" className="hover:text-yellow-200 transition">Tentang Kami</a>
          <a href="#" className="hover:text-yellow-200 transition">Kontak</a>
          <a href="#" className="hover:text-yellow-200 transition">Bantuan</a>
        </nav>
      </div>
    </footer>
  );
}
