import React from "react";
import SearchIcon from "../assets/icons/ic_search.svg";
import Background from "../assets/background.svg";

export default function HomeHeader() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-white">

      {/* Content */}
      <div className="text-center px-4 pt-16 pb-32">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#338595] leading-tight">
          Lapar? <span>Warkir-in</span> aja!
        </h1>

        <p className="text-lg md:text-2xl text-[#2e4c55] mt-4">
          Pesan makanan dan minuman favorit dari UMKM kampusmu. <br />
          Cepat, mudah, dan rasanya juara!
        </p>

        {/* Search Bar */}
        <div className="flex items-center justify-center mt-10">
          <div className="flex items-center w-full max-w-2xl bg-white shadow-lg px-6 py-4 rounded-full gap-3">
            <img src={SearchIcon} alt="search" className="w-6 h-6 opacity-80" />
            <input
              type="text"
              placeholder="Cari makanan atau minuman..."
              className="w-full bg-transparent outline-none text-lg text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <img
        src={Background}
        alt="background"
        className="absolute left-0 bottom-[10px] w-full pointer-events-none select-none"
      />
    </div>
  );
}

