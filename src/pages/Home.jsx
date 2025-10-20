import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-pink-50 to-purple-100 text-gray-800">
      {/* HERO ala GoFood */}
      <section className="container mx-auto px-6 pt-8 md:pt-10">
        <div className="relative rounded-3xl bg-rose-600 text-white overflow-hidden shadow-xl">
          {/* dekorasi bulatan blur */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-rose-500/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-rose-500/50 blur-3xl" />

          <div className="px-6 md:px-10 lg:px-16 py-12 md:py-16 lg:py-20 text-center max-w-4xl mx-auto">
            {/* ikon sendok-garpu */}
            <div className="mx-auto mb-6 md:mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-8 w-8 fill-rose-600"
              >
                <path d="M6 2c-.55 0-1 .45-1 1v5a2 2 0 1 0 2 0V7h1v1a2 2 0 1 0 2 0V3c0-.55-.45-1-1-1s-1 .45-1 1v3H8V3c0-.55-.45-1-1-1zm9.5 0a.5.5 0 0 0-.5.5V7a2 2 0 0 0 1.72 1.98l.28.02V21a1 1 0 1 0 2 0V9a2 2 0 0 0 2-2V2.5a.5.5 0 0 0-1 0V6h-1V2.5a.5.5 0 0 0-1 0V6h-1V2.5a.5.5 0 0 0-.5-.5z" />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Lapar? <span className="tracking-tight">Warkir-in aja</span> 🍽️
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90">
              Pesan makanan dan minuman favorit dari UMKM kampusmu. Cepat,
              mudah, dan rasanya juara!
            </p>

            {/* Form Lokasi */}
            <div className="mt-8 md:mt-10">
              <div className="mx-auto max-w-2xl rounded-2xl bg-white p-4 md:p-5 shadow-2xl ring-1 ring-black/5">
                <form
                  className="flex flex-col sm:flex-row items-stretch gap-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="flex-1 flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 text-rose-600"
                    >
                      <path
                        fill="currentColor"
                        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Masukkan lokasi kamu"
                      className="w-full outline-none text-gray-800 placeholder:text-gray-400"
                    />
                    <select className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm text-gray-700">
                      <option value="">Kampus</option>
                      <option>Kampus A</option>
                      <option>Kampus B</option>
                      <option>Kampus C</option>
                    </select>
                  </div>

                  <Link
                    to="/tempat"
                    className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-700 transition"
                  >
                    Explore
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
