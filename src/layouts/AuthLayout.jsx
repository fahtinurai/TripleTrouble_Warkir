import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative">
      {/* Tombol Back ke halaman utama */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-800 transition"
      >
        <FiArrowLeft className="text-2xl mr-1" />
        <span className="font-medium text-base">Kembali</span>
      </button>

      {/* Kontainer Utama */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        {children}
      </div>
    </div>
  );
}
