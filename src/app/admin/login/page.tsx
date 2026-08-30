"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaEnvelope,
  FaLock,
  FaHeart,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!formData.login.trim()) {
      setError("Please enter your email or mobile number.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"; 

      const response = await fetch(
        `${BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: formData.login.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Invalid email/mobile or password"
        );
      }

      /* =====================================================
         JWT TOKEN
      ===================================================== */

      if (!data.access_token) {
        throw new Error("Login token was not received.");
      }

      /* =====================================================
         SAVE TOKEN
      ===================================================== */

      localStorage.setItem(
        "adminToken",
        data.access_token
      );

      localStorage.setItem(
        "token",
        data.access_token
      );

      /* =====================================================
         SAVE USER
      ===================================================== */

      if (data.user) {
        localStorage.setItem(
          "admin",
          JSON.stringify(data.user)
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      /* =====================================================
         ROLE
      ===================================================== */

      const role = data.user?.role;

      console.log("LOGIN ROLE:", role);

      /* =====================================================
         ROLE BASED REDIRECT
      ===================================================== */

      if (
        role === "super_admin" ||
        role === "state_admin" ||
        role === "district_admin" ||
        role === "mandal_admin" ||
        role === "sangam_admin"
      ) {
        router.replace("/admin/dashboard");
      } else {
        setError(
          "You are not authorized to access the admin panel."
        );

        localStorage.removeItem("adminToken");
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
      }
    } catch (err: any) {
      console.error("LOGIN ERROR:", err);

      setError(
        err?.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* Background */}

      <div className="absolute -left-52 top-24 h-[500px] w-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 h-[520px] w-[520px] rounded-full bg-rose-200/40 blur-[120px]" />

      {/* Hearts */}

      <FaHeart className="absolute left-10 top-52 text-7xl text-pink-300 opacity-20" />

      <FaHeart className="absolute right-24 top-36 text-5xl text-pink-300 opacity-20" />

      {/* Main */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div
          className="
            w-full
            max-w-md
            rounded-[30px]
            border
            border-pink-100
            bg-white/95
            p-10
            shadow-[0_20px_60px_rgba(233,30,99,0.15)]
            backdrop-blur-md
          "
        >

          {/* Logo */}

          <div className="mb-8 text-center">

            <div
              className="
                mx-auto
                mb-4
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-gradient-to-r
                from-[#d81b60]
                to-[#f06292]
                text-3xl
                text-white
              "
            >
              <FaHeart />
            </div>

            <h1 className="text-2xl font-bold text-[#8B1E3F]">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Welcome back! Please login to continue
            </p>

          </div>

          {/* Error */}

          {error && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email / Mobile */}

            <div>

              <label className="text-sm font-medium text-gray-600">
                Email / Mobile
              </label>

              <div
                className="
                  mt-2
                  flex
                  h-12
                  items-center
                  rounded-xl
                  border
                  border-[#f2d9df]
                  px-4
                  focus-within:ring-2
                  focus-within:ring-pink-100
                "
              >

                <FaEnvelope className="mr-3 text-rose-500" />

                <input
                  value={formData.login}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      login: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="Enter email or mobile"
                  className="w-full outline-none text-sm"
                  autoComplete="username"
                  disabled={loading}
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <div className="flex justify-between">

                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-rose-500 hover:text-rose-700"
                >
                  Forgot?
                </Link>

              </div>

              <div
                className="
                  mt-2
                  flex
                  h-12
                  items-center
                  rounded-xl
                  border
                  border-[#f2d9df]
                  px-4
                "
              >

                <FaLock className="mr-3 text-rose-500" />

                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter password"
                  className="w-full outline-none text-sm"
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="ml-2"
                  disabled={loading}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-500" />
                  ) : (
                    <FaEye className="text-gray-500" />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                className="accent-rose-600"
              />

              <span className="text-sm text-gray-600">
                Remember me
              </span>

            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="
                h-12
                w-full
                rounded-xl
                bg-gradient-to-r
                from-[#d81b60]
                to-[#f06292]
                font-semibold
                text-white
                shadow-lg
                transition
                hover:scale-[1.02]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}

