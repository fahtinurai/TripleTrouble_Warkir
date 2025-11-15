// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import PilihTempat from "./PilihTempat";
import HomeHero from "../components/HomeHero";

// Import data dari src/data/toko.js
import { populer } from "../data/toko";

export default function Home() {
  // REF utk slider
  const sliderRef = useRef(null);
  const [selectedUMKM, setSelectedUMKM] = useState(null);
  const [showPilihTempat, setShowPilihTempat] = useState(false);

  useEffect(() => {
    const chosen = localStorage.getItem("hasChosenPlace");
    if (!chosen) setShowPilihTempat(true);
  }, []);


  const scrollSlider = (direction) => {
    const container = sliderRef.current;
    if (!container) return;

    const firstCard = container.firstChild;
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width
      : 320;

    container.scrollBy({
      left: direction === "next" ? cardWidth + 16 : -cardWidth - 16,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* For modals */}
       {showPilihTempat && (
        <PilihTempat
          asModal={true}
          onClose={() => setShowPilihTempat(false)}
        />
      )}

      {/* Home Hero */}
      <HomeHero />
      {/* UMKM TERPOPULER SLIDER */}
      <section className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center mb-6 relative">
          <h2 className="text-2xl md:text-3xl font-bold text-teal-800">
            🌟 UMKM Terpopuler
          </h2>
          <p className="text-sm md:text-base text-gray-600 mt-1">
            UMKM dengan rating terbaik dan pesanan terbanyak di minggu ini.
          </p>

          {/* Tombol slider */}
          <div className="absolute right-0 top-0 hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollSlider("prev")}
              className="w-9 h-9 rounded-full border border-teal-300 text-teal-700 flex items-center justify-center hover:bg-teal-50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollSlider("next")}
              className="w-9 h-9 rounded-full bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700"
            >
              ›
            </button>
          </div>
        </div>

        {/* Slider container */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-transparent"
        >
          {populer.map((umkm) => (
            <div
              key={umkm.name}
              className="snap-center flex-shrink-0 w-72 sm:w-80 bg-white rounded-3xl shadow-md
                        border border-teal-100 overflow-hidden hover:shadow-lg hover:-translate-y-1
                        transition-all duration-200 flex flex-col"
            >
              <div className="relative h-40 w-full">
                <img
                  src={umkm.img}
                  alt={umkm.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-teal-600 text-white text-xs px-3 py-1 rounded-full shadow">
                  {umkm.tag}
                </span>
                <span className="absolute top-3 right-3 bg-white/90 text-teal-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  ⭐<span className="font-semibold">{umkm.rating}</span>
                </span>
              </div>

              <div className="flex-1 p-5 flex flex-col items-center text-center justify-between gap-3">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-teal-900 mb-1">
                    {umkm.name}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    UMKM mitra kampus yang selalu ramai pembeli.
                  </p>
                </div>

                <div className="text-gray-800">
                  {/* 🔥 Tombol Popup Menu */}
                  <button
                    onClick={() => setSelectedUMKM(umkm)}
                    className="inline-flex items-center gap-2 bg-teal-600 !text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-teal-700 transition"
                  >
                    Lihat menu
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Minggu Spesial UMKM */}
      <section className="w-full mt-16">
        <div className="relative bg-gradient-to-r from-[#338595] via-[#2e6d7d] to-[#338595] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.svg')] bg-cover"></div>

          <div className="relative z-10 container mx-auto px-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 drop-shadow-lg">
              ✨ Minggu Spesial UMKM
            </h2>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="grid grid-cols-3 text-center gap-6">
                {[
                  { num: 500, label: "UMKM Bergabung" },
                  { num: 12000, label: "Pelanggan Mingguan" },
                  { num: 95, label: "Pelanggan Puas (%)" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 rounded-3xl p-6 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
                  >
                    <h3 className="text-4xl font-extrabold text-yellow-300 mb-2 animate-bounce">
                      {item.num}
                      {item.label.includes("%") ? "" : "+"}
                    </h3>
                    <p className="text-sm font-medium">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:scale-105 transition">
                <img
                  src="/images/Jando.png"
                  alt="Sate Raja Jando"
                  className="w-36 h-36 rounded-full border-4 border-yellow-300 shadow-xl mb-4 object-cover"
                />
                <h3 className="text-2xl font-bold text-yellow-200">
                  🏆 Sate Raja Jando
                </h3>
                <p className="text-sm opacity-90 mt-2">
                  Rating 4.9 ⭐ | 250+ pesanan minggu ini
                </p>
                <p className="mt-3 italic text-white/90 max-w-md">
                  “Kelezatan sate yang bikin nagih dari resep rahasia keluarga!”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 💡 Fun Fact */}
        <div className="relative w-full py-24 overflow-hidden bg-gradient-to-r from-[#338595] via-[#2e7a8b] to-[#3b9aa8]">
          <div className="absolute inset-0 opacity-20 bg-[url('/images/pattern.svg')] bg-cover bg-center"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_60%)]"></div>

          <div className="relative z-10 text-center text-white px-8">
            <h2 className="text-4xl font-extrabold drop-shadow-md mb-8 animate-pulse">
              💡 Fun Fact Minggu Ini
            </h2>
            {(() => {
              const facts = [
                "Seblak Mama Melan viral karena topping keju 5 lapisnya! 🧀🔥",
                "MattchaBoy pakai bubuk matcha asli Kyoto, Jepang 🍵",
                "Kedai Gacor buka 24 jam selama Ramadhan! 🌙",
                "Sari Tebu Murni panen tebu sendiri di kebun keluarga 🌾",
              ];
              const randomFact =
                facts[Math.floor(Math.random() * facts.length)];
              return (
                <p className="max-w-4xl mx-auto text-2xl md:text-3xl font-semibold leading-relaxed text-white/90 animate-[fadeIn_1s_ease-in-out]">
                  “{randomFact}”
                </p>
              );
            })()}
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 500 50"
              preserveAspectRatio="none"
              className="w-full h-16 text-white"
            >
              <path
                d="M0,30 C150,80 350,0 500,50 L500,0 L0,0 Z"
                fill="white"
              ></path>
            </svg>
          </div>
        </div>

        {/* Testimoni */}
        <div className="relative w-full bg-white py-24">
          <div className="absolute top-0 w-full overflow-hidden leading-none rotate-180">
            <svg
              viewBox="0 0 500 50"
              preserveAspectRatio="none"
              className="w-full h-16 text-white"
            >
              <path
                d="M0,30 C150,80 350,0 500,50 L500,0 L0,0 Z"
                fill="#d8f3f0"
              ></path>
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-[#338595] text-center mb-12">
            💬 Apa Kata Pelanggan Kami
          </h2>

          <div className="flex overflow-x-auto gap-10 px-12 pb-6 scrollbar-thin scrollbar-thumb-[#7ec7c1] scrollbar-track-transparent snap-x snap-mandatory justify-center">
            {[
              {
                name: "Rina",
                text: "Sate Raja Jando beneran juara! Bumbunya nempel banget di lidah 😋",
                img: "https://i.pravatar.cc/150?img=32",
              },
              {
                name: "Adit",
                text: "Seblak Mama Melan level 3 aja udah pedesnya mantap parah 🔥",
                img: "https://i.pravatar.cc/150?img=14",
              },
              {
                name: "Maya",
                text: "NgopiCha tempat nongkrong paling cozy, kopinya enak banget! ☕💚",
                img: "https://i.pravatar.cc/150?img=5",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="snap-center relative bg-gradient-to-br from-[#e8f8f7] to-white border border-[#c2e9e5] rounded-[2rem] shadow-xl flex-shrink-0 w-80 sm:w-96 p-8 transition-transform duration-300 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-2xl"
              >
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-4 border-[#338595] shadow-md mb-4 mx-auto object-cover"
                />
                <div className="relative bg-white rounded-2xl p-5 border border-[#d1eeeb] text-gray-700 italic before:content-[''] before:absolute before:-bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0 before:border-l-[10px] before:border-r-[10px] before:border-t-[10px] before:border-l-transparent before:border-r-transparent before:border-t-white">
                  “{t.text}”
                </div>
                <p className="text-[#2e4c55] font-semibold text-sm mt-6">
                  – {t.name}
                </p>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 500 50"
              preserveAspectRatio="none"
              className="w-full h-16 text-white"
            >
              <path
                d="M0,30 C150,80 350,0 500,50 L500,0 L0,0 Z"
                fill="url(#wave)"
              ></path>
              <defs>
                <linearGradient id="wave" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#d8f3f0" />
                  <stop offset="100%" stopColor="#b9e3df" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* 🎉 Banner Promo */}
        <div className="bg-gradient-to-r from-[#338595] via-[#2e7a8b] to-[#3b9aa8] text-white py-3 text-lg font-semibold tracking-wide overflow-hidden">
          <marquee behavior="scroll" direction="left" scrollamount="8">
            🎉 Promo Minggu Ini: Diskon 20% di Kedai Gacor & MattchaBoy • Gratis
            topping di Seblak Mama Melan • Cashback 10% untuk pelanggan baru! 🚀
          </marquee>
        </div>
      </section>

      {/* Popup Menu UMKM */}
      {selectedUMKM && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 relative animate-[fadeIn_0.3s_ease]">
            <button
              onClick={() => setSelectedUMKM(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>

            <div className="text-center p-6 border-b">
              <img
                src={selectedUMKM.img}
                alt={selectedUMKM.name}
                className="w-32 h-32 mx-auto rounded-2xl object-cover mb-3"
              />
              <h2 className="text-xl font-bold text-gray-800">
                {selectedUMKM.name}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedUMKM.tag} • ⭐ {selectedUMKM.rating}
              </p>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Daftar Menu
              </h3>
              <ul className="divide-y divide-gray-200">
                {selectedUMKM.menus.map((item, i) => (
                  <li
                    key={i}
                    className="py-3 flex justify-between text-gray-700"
                  >
                    <span>{item.nama}</span>
                    <span className="font-mono font-semibold text-gray-800">
                      Rp{item.harga.toLocaleString("id-ID")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}
