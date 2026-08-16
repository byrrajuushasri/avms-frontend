"use client";

import { useState } from "react";
import {
  FaCrown,
  FaGem,
  FaHeart,
} from "react-icons/fa";

const plans = [
  {
    title: "Basic",
    price: "₹999",
    duration: "/3 Months",
    icon: <FaHeart className="text-5xl text-rose-600" />,
    button: "bg-rose-600",
    features: [
      "Send 50 Interests",
      "View Contact Details",
      "Chat with Members",
      "Verified Badge",
    ],
  },
  {
    title: "Gold",
    price: "₹1,999",
    duration: "/6 Months",
    icon: <FaCrown className="text-5xl text-yellow-500" />,
    button: "bg-yellow-500",
    popular: true,
    features: [
      "Unlimited Interests",
      "Unlimited Chats",
      "View Contact Details",
      "WhatsApp Access",
      "Priority Listing",
      "Profile Boost",
    ],
  },
  {
    title: "Platinum",
    price: "₹2,999",
    duration: "/12 Months",
    icon: <FaGem className="text-5xl text-purple-600" />,
    button: "bg-purple-600",
    features: [
      "Everything in Gold",
      "Relationship Manager",
      "Horoscope Matching",
      "Video Calling",
      "Premium Support",
      "Profile Highlight",
    ],
  },
];

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    gender: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/membership-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Registration failed"
        );
      }

      console.log("Registration successful:", data);

      setMessage("Membership registration successful! 🎉");

      setFormData({
        full_name: "",
        mobile: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (err) {
      console.error("Registration Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-8">

          <div className="flex justify-center mb-8">
            <img
              src="/images/membership-img.jpg"
              alt="Membership"
              className="w-full max-w-sm rounded-2xl shadow-2xl border-4 border-white object-cover"
            />
          </div>

          <h1 className="text-2xl text-rose-600 text-center leading-tight">
            Welcome to <br />
            <span className="text-rose-600">
              Arya Vysya Sangham
            </span>
          </h1>

          <p className="mt-5 text-center text-black text-lg">
            Join our trusted community.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">

          <div className="text-center mb-8">
            <h2 className="text-2xl text-rose-600 font-semibold">
              Register Membership
            </h2>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-5 rounded-xl bg-green-100 border border-green-300 text-green-700 px-4 py-3 text-sm">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-100 border border-red-300 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Full Name */}
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none"
            />

            {/* Mobile */}
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              maxLength={20}
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none"
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none"
            />

            {/* Gender */}
            <div className="grid grid-cols-2 gap-4">

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border border-gray-300 px-3 focus:ring-2 focus:ring-rose-500 outline-none"
              >
                <option value="">
                  Gender
                </option>
                <option value="Male">
                  Male
                </option>
                <option value="Female">
                  Female
                </option>
              </select>

              {/* Date UI only */}
              <input
                type="date"
                className="h-12 rounded-xl border border-gray-300 px-3 focus:ring-2 focus:ring-rose-500 outline-none"
              />

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-12 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
            >
              {loading
                ? "Registering..."
                : "Register Now"}
            </button>

          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t"></div>

            <span className="px-3 text-gray-400 text-sm">
              OR
            </span>

            <div className="flex-1 border-t"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              className="border rounded-xl h-12 hover:bg-gray-50"
            >
              Google
            </button>

            <button
              type="button"
              className="border rounded-xl h-12 hover:bg-gray-50"
            >
              Facebook
            </button>

          </div>

          <p className="text-center text-sm mt-8 text-gray-600">
            Already have an account?

            <a
              href="/login"
              className="text-rose-600 font-semibold ml-2"
            >
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}