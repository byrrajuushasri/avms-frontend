"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
          alert(data.message.join("\n"));
        } else {
          alert(data.message || "Failed to add user");
        }

        return;
      }

      alert("User Added Successfully!");

      router.push("/admin/users");
    } catch (error) {
      console.error("Error adding user:", error);

      alert(
        "Unable to connect to server. Please make sure NestJS backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl text-gray-900">
            Add User
          </h1>

          <p className="text-gray-500 mt-1">
            Create a new user account
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid md:grid-cols-2 gap-5">

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative mt-2">

                  <FaUser
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter Full Name"
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      focus:ring-2
                      focus:ring-rose-100
                      focus:border-[#8B1E3F]
                      outline-none
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

                  <FaEnvelope
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      focus:ring-2
                      focus:ring-rose-100
                      focus:border-[#8B1E3F]
                      outline-none
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

                  <FaLock
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                    "
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    required
                    minLength={8}
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      focus:ring-2
                      focus:ring-rose-100
                      focus:border-[#8B1E3F]
                      outline-none
                    "
                  />

                </div>
              </div>

              {/* User Type */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  User Type
                </label>

                <div className="relative mt-2">

                  <FaUserTag
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      pointer-events-none
                    "
                  />

                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      focus:ring-2
                      focus:ring-rose-100
                      focus:border-[#8B1E3F]
                      outline-none
                    "
                  >
                    <option value="Admin">
                      Admin
                    </option>

                    <option value="User">
                      User
                    </option>

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
                  className="
                    mt-2
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    focus:ring-2
                    focus:ring-rose-100
                    focus:border-[#8B1E3F]
                    outline-none
                  "
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Suspended">
                    Suspended
                  </option>

                </select>
              </div>

            </div>

            {/* Footer */}
            <div
              className="
                pt-6
                border-t
                border-gray-100
                flex
                justify-end
              "
            >

              <button
                type="submit"
                disabled={loading}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-gray-700
                  text-sm
                  font-medium
                  hover:bg-gray-50
                  hover:border-gray-300
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
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