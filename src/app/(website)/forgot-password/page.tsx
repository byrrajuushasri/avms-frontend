"use client";

import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaCheckCircle, FaEnvelope, FaLock, FaPaperPlane } from "react-icons/fa";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message;
        throw new Error(message || "Could not send the reset link. Please try again.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not send the reset link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-8 sm:py-12">
      <section className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-xl sm:p-9">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-2xl text-[#8B1E3F] shadow-sm">
          <FaLock />
        </div>

        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Forgot Password?</h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            Enter your registered email address and we'll send you a password reset link.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8">
            <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />
              <input
                id="reset-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                autoComplete="email"
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-rose-100"
              />
            </div>

            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d81b60] via-[#e91e63] to-[#f06292] font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-wait disabled:opacity-60"
            >
              <FaPaperPlane className="text-sm" />
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div role="status" className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-600"><FaCheckCircle /></div>
            <h2 className="mt-4 font-semibold text-gray-800">Check your email</h2>
            <p className="mt-2 break-all text-sm leading-6 text-gray-600">
              If an account exists for <strong>{email}</strong>, you'll receive a password reset link.
            </p>
          </div>
        )}

        <div className="mt-7 flex justify-center border-t border-gray-100 pt-6">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B1E3F] transition hover:text-[#741934] hover:underline">
            <FaArrowLeft className="text-xs" /> Back to Login
          </Link>
        </div>
      </section>
    </main>
  );
}
