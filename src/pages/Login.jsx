import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeUser = {
      name: "warkir user",
      email: "warkir@gmail.com",
      password: "password123",
    };

    login(fakeUser); // simpan ke session & global state
    navigate("/");
  }

  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Login</h1>
        <p className="text-gray-500 mt-2 text-base">Selamat Datang di Warkir</p>
      </div>

      {/* Google Login */}
      <button className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
        <FcGoogle className="text-2xl mr-2" />
        <span className="text-gray-700 font-medium">Login dengan Google</span>
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-gray-400 text-sm">or Login with Email</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
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

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-600">
            <input type="checkbox" className="mr-2 accent-teal-500" />
            Remember Me
          </label>
          <a href="#" className="text-teal-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition font-semibold text-lg"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Anda belum terdaftar?{" "}
        <a href="/register" className="text-teal-600 font-semibold hover:underline">
          Buat Akun
        </a>
      </p>
    </>
  );
}

export default Login;
