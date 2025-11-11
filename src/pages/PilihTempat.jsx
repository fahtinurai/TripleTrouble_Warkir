import { useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * Props:
 * - onClose: () => void   (wajib saat asModal = true)
 * - asModal: boolean      (true = tampil sebagai popup; false = halaman penuh)
 */
export default function PilihTempat({ onClose, asModal = false }) {
  // Tutup dengan tombol Escape saat modal
  useEffect(() => {
    if (!asModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asModal, onClose]);

  if (!asModal) {
    // Mode HALAMAN BIASA (route /tempat)
    return (
  <div className="bg-white min-h-screen flex items-center justify-center">
    <div className="container mx-auto px-6 min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center text-center py-12">
      <h1 className="text-5xl font-extrabold mb-4 text-gray-800">
        Pilih Tempat
      </h1>
      <p className="text-gray-600 mb-10 text-lg">
        Silakan pilih tempat sebelum memesan
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
          {/*  DINE IN */}
        <Link
          to="/menu"
          state={{ orderType: "dine-in" }}
          className="
            group bg-white border-2 border-[#3DA3B0] text-[#3DA3B0]
            px-6 py-6 rounded-3xl shadow-lg w-full
            transition-all duration-300
            flex flex-col items-center
            hover:bg-[#3DA3B0] hover:border-[#3DA3B0] hover:shadow-xl hover:scale-[1.03]
          "
        >
        <div className="flex items-center gap-2 text-2xl font-bold">
          🍽️
          <span className="transition-colors duration-300 group-hover:text-white">
            Dine In
          </span>
        </div>

        <span className="text-sm font-normal mt-2 text-gray-500 transition-colors duration-300 group-hover:text-white/90">
          Makan di tempat
        </span>
      </Link>


        {/* TAKE AWAY */}
        <Link
          to="/menu"
          state={{ orderType: "takeaway" }}
          className="
            group bg-white border-2 border-[#3DA3B0] text-[#3DA3B0]
            px-6 py-6 rounded-3xl shadow-lg w-full
            transition-all duration-300
            flex flex-col items-center
            hover:bg-[#3DA3B0] hover:border-[#3DA3B0] hover:shadow-xl hover:scale-[1.03]
          "
        >
        <div className="flex items-center gap-2 text-2xl font-bold">
          🛍️
          <span className="transition-colors duration-300 group-hover:text-white">
            Take Away
          </span>
        </div>

        <span className="text-sm font-normal mt-2 text-gray-500 transition-colors duration-300 group-hover:text-white/90">
          Bawa pulang
        </span>
      </Link>

            </div>
          </div>
         </div>
      );
    }

  // Mode MODAL (popup sekali tampil)
  // return (
  //   <div
  //     className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center"
  //     onClick={onClose} // klik overlay = close
  //   >
  //     <div
  //       className="bg-white rounded-2xl shadow-2xl p-8 w-11/12 max-w-md text-center relative animate-fadeIn"
  //       onClick={(e) => e.stopPropagation()} // cegah close saat klik isi modal
  //     >
  //       <button
  //         onClick={onClose}
  //         className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
  //         aria-label="Tutup"
  //       >
  //         ✕
  //       </button>

  //       <h1 className="text-3xl font-extrabold mb-3 text-gray-800">
  //         Pilih Tempat
  //       </h1>
  //       <p className="text-gray-600 mb-8">
  //         Silakan pilih tempat sebelum memesan:
  //       </p>

  //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  //         {/* DINE IN (modal) */}
  //         <Link
  //           to="/menu"
  //           state={{ orderType: "dine-in" }}
  //           onClick={onClose}
  //           className="bg-white border-2 border-purple-400 text-purple-600 px-6 py-5 rounded-2xl shadow-lg hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 transition-all font-semibold flex flex-col items-center"
  //         >
  //           🍽️ Dine In
  //           <span className="text-sm mt-1 text-gray-500">Makan di tempat</span>
  //         </Link>

  //         {/* TAKE AWAY (modal) */}
  //         <Link
  //           to="/menu"
  //           state={{ orderType: "takeaway" }}
  //           onClick={onClose}
  //           className="bg-white border-2 border-blue-400 text-blue-600 px-6 py-5 rounded-2xl shadow-lg hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-400 transition-all font-semibold flex flex-col items-center"
  //         >
  //           🛍️ Take Away
  //           <span className="text-sm mt-1 text-gray-500">Bawa pulang</span>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );
}
