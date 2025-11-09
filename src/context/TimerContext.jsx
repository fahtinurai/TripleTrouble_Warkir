import { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext(null);

// hook untuk dipakai di komponen
export const useTimer = () => useContext(TimerContext);

const DEFAULT_TIME = 1800; // 30 menit

export const TimerProvider = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // kalau tidak aktif, jangan buat interval
    if (!isActive) return;
    if (remainingTime <= 0) {
      setIsActive(false);
      return;
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          // waktu habis
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive, remainingTime]);

  const startTimer = () => {
    setRemainingTime(DEFAULT_TIME);
    setIsActive(true);
  };

  const stopTimer = () => {
    setRemainingTime(0);
    setIsActive(false);
  };

  const formatTime = (seconds) => {
    const safe = Math.max(0, seconds);
    const mins = Math.floor(safe / 60);
    const secs = safe % 60;
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const value = {
    remainingTime,
    isActive,
    startTimer,
    stopTimer,
    formatTime,
  };

  return (
    <TimerContext.Provider value={value}>
      {children}
    </TimerContext.Provider>
  );
};
