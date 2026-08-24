"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaSave,
} from "react-icons/fa";

export default function AddUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "Admin",
    status: "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        if (Array.isArray(data.message)) {
          toast.error(data.message.join("\n"));
        } else {
          toast.error(data.message || "Failed to add user");
        }

        return;
      }

      toast.success("User added successfully!");

      setTimeout(() => {
        router.push("/admin/users");
      }, 1000);
    } catch (error) {
      console.error("Error adding user:", error);

      toast.error(
        "Unable to connect to server. Please make sure NestJS backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add User
          </h1>

          <p className="mt-1 text-gray-500">
            Create a new user account
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid gap-5 md:grid-cols-2">

              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative mt-2">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl border border-gray-200
                      bg-white pl-11 pr-4 outline-none
                      focus:border-[#8B1E3F]
                      focus:ring-2 focus:ring-rose-100
                      disabled:cursor-not-allowed disabled:bg-gray-50
                    "
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl border border-gray-200
                      bg-white pl-11 pr-4 outline-none
                      focus:border-[#8B1E3F]
                      focus:ring-2 focus:ring-rose-100
                      disabled:cursor-not-allowed disabled:bg-gray-50
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <div className="relative mt-2">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                    minLength={8}
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl border border-gray-200
                      bg-white pl-11 pr-4 outline-none
                      focus:border-[#8B1E3F]
                      focus:ring-2 focus:ring-rose-100
                      disabled:cursor-not-allowed disabled:bg-gray-50
                    "
                  />
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  Password must be at least 8 characters.
                </p>
              </div>

              {/* User Type */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  User Type
                </label>

                <div className="relative mt-2">
                  <FaUserTag className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="
                      h-12 w-full rounded-xl border border-gray-200
                      bg-white pl-11 pr-4 outline-none
                      focus:border-[#8B1E3F]
                      focus:ring-2 focus:ring-rose-100
                      disabled:cursor-not-allowed disabled:bg-gray-50
                    "
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="
                    mt-2 h-12 w-full rounded-xl border border-gray-200
                    bg-white px-4 outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2 focus:ring-rose-100
                    disabled:cursor-not-allowed disabled:bg-gray-50
                  "
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-gray-100 pt-6">

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-2 inline-flex items-center gap-2 rounded-lg
                  bg-[#8B1E3F] px-5 py-2.5
                  text-sm font-medium text-white
                  transition hover:bg-[#741832]
                  disabled:cursor-not-allowed disabled:opacity-50
                "
              >
                <FaSave className="text-sm" />

                {loading ? "Saving..." : "Save User"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}