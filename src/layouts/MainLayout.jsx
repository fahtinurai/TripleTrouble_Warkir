import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TimerReminderCard from "../components/TimerReminderCard";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 relative">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <TimerReminderCard />
      <Footer />
    </div>
  );
};

export default MainLayout;
