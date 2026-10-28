"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaHeart,
} from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://avms-backend-production.up.railway.app";

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!login.trim() || !password) {
      setError("Enter your email or mobile number and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Unable to log in. Check your credentials.";
        throw new Error(message);
      }

      if (!data?.access_token || !data?.user) {
        throw new Error("Login information was not received from the server.");
      }

      if (data.user.account_type !== "matrimonial") {
        throw new Error(
          "Use the password you created for your matrimonial profile to log in here."
        );
      }

      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      router.replace("/search");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* Background Blur */}
      <div className="absolute -left-52 top-24 w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[120px]" />
      <div className="absolute -right-56 bottom-0 w-[520px] h-[520px] rounded-full bg-rose-200/40 blur-[120px]" />
      <div className="absolute right-24 top-16 w-60 h-60 rounded-full bg-pink-100/60 blur-[90px]" />
      <div className="absolute left-20 bottom-20 w-48 h-48 rounded-full bg-rose-100/70 blur-[70px]" />

      {/* Floating Hearts */}
      <FaHeart className="absolute left-10 top-52 text-pink-300 text-7xl opacity-20 rotate-12" />
      <FaHeart className="absolute right-24 top-36 text-pink-300 text-5xl opacity-20" />
      <FaHeart className="absolute right-24 bottom-28 text-rose-300 text-8xl opacity-20" />
      <FaHeart className="absolute left-1/2 bottom-20 text-pink-200 text-6xl opacity-20" />

     
      {/* Login Card */}
      <div className="relative z-10 flex items-center justify-center px-6 py-10">

        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-[30px] border border-pink-100 shadow-[0_20px_60px_rgba(233,30,99,0.12)] p-10">

          {/* Heading */}

          <div className="text-center">

          <h2 className="text-2xl  text-[#8B1E3F]">
              Welcome Back!
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your journey
            </p>

          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Email */}

            <div>

              <label className="text-sm font-medium text-gray-600">
                Email / Mobile Number
              </label>

              <div className="mt-2 flex items-center h-12 px-4 rounded-xl border border-[#f2d9df] bg-white focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all">

                <FaEnvelope className="text-rose-500 mr-3" />

                <input
                  type="text"
                  value={login}
                  onChange={(event) => setLogin(event.target.value)}
                  placeholder="Enter your email or mobile number"
                  autoComplete="username"
                  required
                  className="w-full outline-none text-sm"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <div className="flex justify-between mb-2">

                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-rose-500 hover:underline"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="flex items-center h-12 px-4 rounded-xl border border-[#f2d9df] bg-white focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-pink-100 transition-all">

                <FaLock className="text-rose-500 mr-3" />

                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  className="w-full outline-none text-sm"
                />

              </div>

            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Remember */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2 text-sm text-gray-600">

                <input
                  type="checkbox"
                  className="accent-rose-600"
                />

                Remember Me

              </label>

            </div>

            {/* Login */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#d81b60] via-[#e91e63] to-[#f06292] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}

            <div className="flex items-center gap-3">

              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-gray-400 text-sm">
                or continue with
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>

            </div>

            {/* Social */}

            <div className="flex justify-center">
  <button
    type="button"
    className="
      h-10
      w-50
      rounded-xl
      border
      border-pink-100
      hover:bg-pink-50
      flex
      items-center
      justify-center
      transition
    "
  >
    <FaGoogle className="text-red-500 text-xl" />
  </button>
</div>

            {/* Register */}

            <p className="text-center text-sm text-gray-600">

              Don't have an account?

              <Link
                href="/register"
                className="ml-1 font-semibold text-rose-600 hover:underline"
              >
                Register Now
              </Link>

            </p>

          </form>

        </div>

      </div>

    </section>
  );
}