import { Link, Navigate } from "react-router-dom";
import { useTimer } from "../context/TimerContext";

export default function TimerPage() {
  const { remainingTime, isActive, formatTime } = useTimer();

  // Anggap waktu habis kalau <= 0 (jaga-jaga kalau sempat minus)
  const isExpired = remainingTime <= 0;

  // Kalau waktu sudah habis → tampilkan pesan habis, jangan redirect
  if (isExpired) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-3xl font-semibold mb-4 text-gray-400">
          Waktu Dine-in Anda Telah Habis
        </h1>
        <p className="text-2xl text-red-500 mt-6 animate-pulse">
          Waktu Anda telah habis!
        </p>
        <Link
          to="/menu"
          className="mt-12 bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
        >
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  // Kalau tidak aktif DAN belum habis → kemungkinan user buka /timer langsung
  // atau bukan dari flow dine-in → kembalikan ke menu
  if (!isActive) {
    return <Navigate to="/menu" replace />;
  }

  // Normal: timer sedang berjalan untuk dine-in
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold mb-4 text-gray-400">
        Sisa Waktu Dine-in Anda
      </h1>

      <div className="font-mono text-9xl font-bold tabular-nums">
        {formatTime(remainingTime)}
      </div>

      <p className="text-lg text-gray-300 mt-6">
        Waktu maksimal makan adalah 30 menit.
      </p>

      <Link
        to="/menu"
        className="mt-12 bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
      >
        Kembali ke Menu
      </Link>
      <p className="text-sm text-gray-500 mt-4">
        (Timer akan tetap berjalan di latar belakang)
      </p>
    </div>
  );
}
