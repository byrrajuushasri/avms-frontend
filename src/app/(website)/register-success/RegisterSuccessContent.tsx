"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const matrimonialId = searchParams.get("matrimonialId") || "";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/search");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
        {/* Success Icon */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-green-700">
          Registration Successful
        </h1>

        {/* Message */}
        <p className="mb-5 text-gray-600">
          Your matrimonial registration has been successfully completed.
        </p>

        {/* Matrimonial ID */}
        {matrimonialId && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Your Matrimonial ID
            </p>

            <p className="mt-1 text-xl font-bold text-[#800018]">
              {matrimonialId}
            </p>
          </div>
        )}

        {/* Redirect Message */}
        <p className="text-sm text-gray-500">
          You will be redirected to the search page in a few seconds...
        </p>

        {/* Button */}
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="mt-6 w-full rounded-lg bg-[#800018] px-5 py-3 font-semibold text-white transition hover:bg-[#650013]"
        >
          Go to Home
        </button>
      </div>
    </main>
  );
}