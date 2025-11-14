import React from "react";

export default function AboutUs() {
  return (
    <div className="w-full bg-white">
      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-28">
        {/* Visi */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#3DA3B0] mb-4">Visi Kami</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Menjadi platform pemesanan makanan UMKM kampus yang cepat, mudah,
            dan dipercaya, sambil membantu ribuan pelaku UMKM tumbuh lebih
            besar setiap harinya.
          </p>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#3DA3B0] mb-3">
              Mendukung UMKM
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Setiap pesananmu membantu UMKM kampus berkembang, memperluas
              promosi, dan menjaga roda ekonomi kreatif tetap berputar.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#3DA3B0] mb-3">
              Kemudahan Akses
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Cari, pesan, dan nikmati makanan favoritmu hanya dalam beberapa
              klik lebih cepat dan lebih praktis.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-3xl p-8 text-center border border-gray-100 hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-[#3DA3B0] mb-3">
              Kualitas Terbaik
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Kami bekerjasama dengan UMKM terpercaya untuk menyajikan produk
              terbaik dengan rasa yang juara.
            </p>
          </div>
        </div>

        {/* Cerita Warkir */}
        <div className="mt-28 text-center">
          <h2 className="text-4xl font-bold text-[#3DA3B0] mb-6">
            Cerita di Balik Warkir
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Warkir lahir dari keresahan mahasiswa yang ingin memesan makanan
            UMKM kampus dengan lebih cepat tanpa harus antre atau berjalan jauh.
            Dari sebuah ide sederhana, Warkir kini bercita-cita untuk
            menjadi platform yang mempertemukan ratusan UMKM dengan ribuan
            pelanggan setiap harinya.
          </p>
        </div>
        {/* Team Section */}
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-38">
        <h2 className="text-4xl font-bold text-[#3DA3B0] text-center mb-12">
            Orang di Balik Warkir
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
             {
                name: "Adhe Fathian",
                role: "Ketua",
                img: "https://i.pravatar.cc/300?img=15",
            },
            {
                name: "Muhammad Yaumil Ramadhani",
                role: "Anggota",
                img: "https://i.pravatar.cc/300?img=56",
            },
            {
                name: "Funny Tio",
                role: "Anggota",
                img: "https://i.pravatar.cc/300?img=32",
            },
            ].map((person, i) => (
            <div
                key={i}
                className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl p-8 flex flex-col items-center text-center border border-gray-100 hover:-translate-y-2"
            >
                <img
                src={person.img}
                alt={person.name}
                className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-[#3DA3B0]/30 shadow"
                />

                <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
                <p className="text-[#3DA3B0] text-sm font-semibold mt-1">
                {person.role}
                </p>

                <p className="text-gray-600 text-sm mt-3">
                Berkontribusi membangun Warkir dengan passion, kreativitas, dan
                dedikasi untuk mendukung UMKM kampus.
                </p>
            </div>
            ))}
        </div>
        </div>
      </div>
    </div>
  );
}
