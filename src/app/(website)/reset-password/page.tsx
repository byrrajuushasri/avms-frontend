"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaLock } from "react-icons/fa";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || params.get("resetToken") || "");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("This reset link is missing its token. Request a new reset link.");
      return;
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message;
        throw new Error(message || "The reset link is invalid or expired. Request a new link.");
      }

      setUpdated(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not update your password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-8 sm:py-12">
      <section className="w-full max-w-md rounded-3xl border border-pink-100 bg-white p-6 shadow-xl sm:p-9">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-2xl text-[#8B1E3F] shadow-sm">
          {updated ? <FaCheckCircle /> : <FaLock />}
        </div>
        <div className="mt-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {updated ? "Password Updated" : "Set a New Password"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {updated
              ? "Your password has been changed. You can now sign in with your new password."
              : "Choose a new password for your matrimonial account."}
          </p>
        </div>

        {updated ? (
          <Link href="/login" className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[#8B1E3F] font-semibold text-white transition hover:bg-[#741934]">
            Go to Login
          </Link>
        ) : !token ? (
          <div className="mt-8 text-center">
            <p role="alert" className="text-sm text-red-600">
              {error || "This reset link is missing its token. Request a new reset link."}
            </p>
            <Link href="/forgot-password" className="mt-4 inline-block text-sm font-semibold text-[#8B1E3F] hover:underline">
              Request a new link
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="new-password" className="mb-2 block text-sm font-semibold text-gray-700">New Password</label>
              <input
                id="new-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-rose-100"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-2 block text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                minLength={6}
                required
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-rose-100"
              />
            </div>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#d81b60] via-[#e91e63] to-[#f06292] font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-wait disabled:opacity-60"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        {!updated && (
          <div className="mt-7 flex justify-center border-t border-gray-100 pt-6">
            <Link href="/login" className="text-sm font-semibold text-[#8B1E3F] hover:underline">Back to Login</Link>
          </div>
        )}
      </section>
    </main>
  );
}
