import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50 px-6">
      <div className="w-full max-w-lg bg-white p-10 md:p-14 rounded-2xl shadow-2xl">
        {children}
      </div>
    </div>
  );
}
