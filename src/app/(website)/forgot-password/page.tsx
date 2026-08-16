"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaLock,
  FaEnvelope,
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    // Demo only
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 flex items-center justify-center px-4 py-8 sm:py-12">

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-md">

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-3xl
            border
            border-pink-100
            shadow-xl
            p-6
            sm:p-9
          "
        >

          {/* ICON */}
          <div className="flex justify-center mb-6">

            <div
              className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-br
                from-rose-50
                to-pink-100
                text-[#8B1E3F]
                flex
                items-center
                justify-center
                shadow-sm
              "
            >
              <FaLock className="text-2xl" />
            </div>

          </div>

          {/* TITLE */}
          <div className="text-center">

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Forgot Password?
            </h1>

            <p className="text-sm text-gray-500 mt-3 leading-6">
              Don't worry! Enter your registered email address
              and we'll help you reset your password.
            </p>

          </div>

          {/* FORM / SUCCESS */}
          {!submitted ? (

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              {/* EMAIL */}
              <div>

                <label
                  htmlFor="email"
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  "
                >
                  Email Address
                </label>

                <div className="relative">

                  <FaEnvelope
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      text-sm
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      text-sm
                      text-gray-700
                      placeholder:text-gray-400
                      outline-none
                      transition-all
                      focus:bg-white
                      focus:border-[#8B1E3F]
                      focus:ring-4
                      focus:ring-rose-100
                    "
                  />

                </div>

              </div>

              {/* SEND BUTTON */}
              <button
                type="submit"
                className="
                  w-full
                  h-12
                  mt-6
                  rounded-xl
                  bg-gradient-to-r
                  from-[#d81b60]
                  via-[#e91e63]
                  to-[#f06292]
                  text-white
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  shadow-lg
                  hover:shadow-xl
                  hover:scale-[1.01]
                  active:scale-[0.99]
                  transition-all
                  duration-300
                "
              >
                <FaPaperPlane className="text-sm" />
                <span>Send Reset Link</span>
              </button>

            </form>

          ) : (

            /* SUCCESS MESSAGE */
            <div className="mt-8">

              <div
                className="
                  rounded-2xl
                  bg-green-50
                  border
                  border-green-100
                  p-5
                  text-center
                "
              >

                {/* SUCCESS ICON */}
                <div
                  className="
                    w-12
                    h-12
                    mx-auto
                    rounded-full
                    bg-green-100
                    text-green-600
                    flex
                    items-center
                    justify-center
                    text-xl
                    font-bold
                  "
                >
                  ✓
                </div>

                <h2
                  className="
                    mt-4
                    font-semibold
                    text-gray-800
                  "
                >
                  Reset Link Sent
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-gray-500
                    leading-6
                  "
                >
                  If an account exists with{" "}

                  <span className="font-semibold text-gray-700 break-all">
                    {email}
                  </span>

                  , you will receive password reset instructions.
                </p>

              </div>

              {/* TRY ANOTHER EMAIL */}
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="
                  w-full
                  mt-4
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  text-sm
                  font-semibold
                  text-gray-600
                  hover:bg-gray-50
                  hover:border-gray-300
                  transition
                "
              >
                Try Another Email
              </button>

            </div>

          )}

          {/* BACK TO LOGIN */}
          <div
            className="
              flex
              justify-center
              mt-7
              pt-6
              border-t
              border-gray-100
            "
          >

            <Link
              href="/login"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#8B1E3F]
                hover:text-[#741934]
                hover:underline
                transition
              "
            >
              <FaArrowLeft className="text-xs" />
              Back to Login
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}