import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <div className="w-full bg-white relative overflow-hidden">

      {/* Soft Background Decorations */}
      <div className="absolute top-10 left-[-80px] w-64 h-64 bg-[#3DA3B0]/10 blur-3xl rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-[-120px] w-72 h-72 bg-[#3DA3B0]/10 blur-3xl rounded-full -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-32">

        {/* VISI KAMI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-bold text-[#3DA3B0] mb-4">Visi Kami</h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Menjadi platform pemesanan makanan UMKM kampus yang cepat, mudah,
            dan terpercaya—serta membantu UMKM berkembang lebih besar setiap hari.
          </p>
        </motion.div>

        {/* 3 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-28">
          {[
            {
              title: "Mendukung UMKM",
              desc: "Setiap pesananmu membantu UMKM kampus berkembang dan meningkatkan ekonomi kreatif.",
            },
            {
              title: "Kemudahan Akses",
              desc: "Pesan makanan favorit hanya dalam beberapa klik—lebih cepat dan praktis.",
            },
            {
              title: "Kualitas Terbaik",
              desc: "Kami bekerja sama dengan UMKM terpercaya untuk menyajikan produk berkualitas.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-white shadow-md rounded-3xl p-8 text-center border border-gray-100
                         hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-semibold text-[#3DA3B0] mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CERITA WARKIR */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-28"
        >
          <h2 className="text-4xl font-bold text-[#3DA3B0] mb-6">
            Cerita di Balik Warkir
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
            Warkir adalah “Warung Pinggir” yang lahir dari keresahan mahasiswa
            yang ingin memesan makanan UMKM kampus tanpa antre panjang atau berjalan jauh.
            <br /><br />
            Dari ide sederhana, kini Warkir menjadi jembatan yang mempertemukan
            ratusan UMKM dengan ribuan pelanggan setiap hari, menjaga kedekatan antara
            mahasiswa dan pelaku UMKM kampus.
          </p>
        </motion.div>

        {/* TEAM SECTION */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#3DA3B0] mb-12">
            TIM PENGEMBANG WARKIR
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {[
              {
                name: "Ade Fathia Nuraini",
                role: "Ketua",
                img: "public/images/ade.jpg",
              },
              {
                name: "Muhammad Yaumil Ramadhani",
                role: "Anggota",
                img: "public/images/yaumil.jpg",
              },
              {
                name: "Funny Tio Tinambunan",
                role: "Anggota",
                img: "public/images/funny.png",
              },
            ].map((person, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="bg-white shadow-md rounded-3xl p-8 flex flex-col items-center
                           border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-[#3DA3B0]/30"
                />

                <h3 className="text-lg font-bold text-gray-800">{person.name}</h3>
                <p className="text-[#3DA3B0] text-sm font-semibold mt-1">{person.role}</p>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Berkontribusi membangun Warkir dengan dedikasi dan semangat
                  untuk mendukung UMKM kampus.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
