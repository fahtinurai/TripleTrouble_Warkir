import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PilihTempat({ onClose, asModal = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!asModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asModal, onClose]);

  const handleSelect = (type) => {
  localStorage.setItem("orderType", type);

  if (asModal) onClose?.();

  if (!user) {
    navigate("/login");
  } else {
    navigate("/menu");
  }
};


  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-md text-center relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          ×
        </button>

        <h1 className="text-3xl font-extrabold mb-3 text-gray-800">Pilih Tempat</h1>
        <p className="text-gray-600 mb-8">Silakan pilih tempat sebelum memesan:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => handleSelect("dine-in")}
            className="group bg-white border-2 border-[#3DA3B0] text-[#3DA3B0] w-full h-[140px] rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-center items-center hover:bg-[#3DA3B0] hover:shadow-xl hover:scale-[1.05]"
          >
            <span className="text-2xl font-bold group-hover:text-white">Dine In</span>
            <span className="text-base text-gray-500 mt-2 group-hover:text-white/90">Makan di tempat</span>
          </button>

          <button
            onClick={() => handleSelect("takeaway")}
            className="group bg-white border-2 border-[#3DA3B0] text-[#3DA3B0] w-full h-[140px] rounded-2xl shadow-lg transition-all duration-300 flex flex-col justify-center items-center hover:bg-[#3DA3B0] hover:shadow-xl hover:scale-[1.05]"
          >
            <span className="text-2xl font-bold group-hover:text-white">Take Away</span>
            <span className="text-base text-gray-500 mt-2 group-hover:text-white/90">Bawa pulang</span>
          </button>
        </div>
      </div>
    </div>
  );
}
