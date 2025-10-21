import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Buat Akun</h1>
        <p className="text-gray-500 mt-2 text-base">Gabung dan mulai beli makanan</p>
      </div>

      {/* Form */}
      <form className="space-y-2">
        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="E.g. johndoe123"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="E.g. johndoe@email.com"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* No Handphone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            No Handphone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="E.g. 081234567890"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Konfirmasi Password
          </label>
          <div className="relative mt-2">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ulangi password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              required
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center text-sm text-gray-600">
          <input type="checkbox" className="mr-2 accent-teal-500" required />
          <span>
            Saya setuju dengan{" "}
            <a href="#" className="text-teal-600 font-medium hover:underline">
              Syarat & Ketentuan
            </a>
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition font-semibold text-lg"
        >
          Daftar
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Sudah punya akun?{" "}
        <a href="/login" className="text-teal-600 font-semibold hover:underline">
          Login di sini
        </a>
      </p>
    </>
  );
}

export default Signup;
