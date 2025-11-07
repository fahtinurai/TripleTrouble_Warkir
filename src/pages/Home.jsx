import { Link } from "react-router-dom";
import HomeHero from "../components/HomeHero";

export default function Home() {
  return (
    <div className="bg-white ">
      {/* HERO */}
      <HomeHero/>

      {/* Kategori */}
      <section className="container mx-auto px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
          🍽️ Jelajahi Kategori
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
          {[
            { emoji: "🍛", label: "Makanan", color: "from-orange-400 to-red-500" },
            { emoji: "🥤", label: "Minuman", color: "from-sky-400 to-blue-500" },
            { emoji: "🍞", label: "Snack",   color: "from-pink-400 to-purple-500" },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl shadow-md bg-gradient-to-r ${item.color} text-white py-10 hover:scale-105 transition-transform`}
            >
              <div className="text-5xl md:text-6xl mb-3 md:mb-4">{item.emoji}</div>
              <p className="text-lg md:text-xl font-semibold">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UMKM Populer */}
      <section className="container mx-auto px-6 pb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-10">
          🌟 UMKM Terpopuler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Warung Nasi Bu Tini", rating: "4.9", img: "https://source.unsplash.com/400x300/?indonesian-food" },
            { name: "Kopi Kenangan WDP",   rating: "4.8", img: "https://source.unsplash.com/400x300/?coffee" },
            { name: "Roti Bakar Pak Didi", rating: "4.7", img: "https://source.unsplash.com/400x300/?toast-bread" },
          ].map((umkm) => (
            <div
              key={umkm.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <img src={umkm.img} alt={umkm.name} className="w-full h-44 object-cover" />
              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-gray-800">{umkm.name}</h3>
                <p className="text-yellow-400 font-semibold">⭐ {umkm.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
