import { createContext, useContext, useState, useEffect } from "react";
export const useTimer = () => useContext(TimerContext);

const TimerContext = createContext();

const DEFAULT_TIME = 1800; 

export const TimerProvider = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      clearInterval(interval);
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTime]);

  const startTimer = () => {
    setRemainingTime(DEFAULT_TIME);
    setIsActive(true);
  };

  const stopTimer = () => {
    setRemainingTime(0);
    setIsActive(false);
  };

  // Fungsi helper untuk format MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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