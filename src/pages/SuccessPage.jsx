import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTimer } from "../context/TimerContext";

export default function SuccessPage() {
  const navigate = useNavigate();
  const { startTimer } = useTimer();

  useEffect(() => {
    startTimer();
    const timerHandle = setTimeout(() => {
      navigate("/timer");
    }, 3000);
    return () => clearTimeout(timerHandle);
  }, [navigate, startTimer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-5xl font-bold text-green-500 mb-4">🎉</h1>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
          Pesanan Anda Berhasil!
        </h2>
        <p className="text-gray-600 text-lg">
          Pesanan Anda sedang disiapkan.
        </p>
        <p className="text-gray-600 text-lg mt-4 animate-pulse">
          Harap Menunggu.....
        </p>
      </div>
    </div>
  );
}