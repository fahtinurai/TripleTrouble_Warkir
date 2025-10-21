import { Link } from "react-router-dom";
import { useTimer } from "../context/TimerContext";


export default function TimerReminderCard() {
  const { remainingTime, isActive, formatTime } = useTimer();
  if (!isActive || remainingTime <= 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link 
        to="/timer" 
        className="block bg-white p-4 rounded-xl shadow-2xl transition hover:scale-105 w-64"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">Sisa Waktu Dine-in</span>
          <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full animate-pulse">
            LIVE
          </span>
        </div>
        <div className="text-4xl font-mono font-bold text-gray-900 text-center">
          {formatTime(remainingTime)}
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          Klik untuk melihat layar penuh
        </p>
      </Link>
    </div>
  );
}