"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  userType: string;
  status: string;
}

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    userType: "User",
    status: "Pending",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET USER BY ID
  // =========================
  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/users/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await response.json();

        setFormData({
          name: user.name || "",
          email: user.email || "",
          password: user.password || "",
          userType: user.userType || "User",
          status: user.status || "Pending",
        });
      } catch (error) {
        console.error("Fetch user error:", error);
        setError("Unable to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE USER
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update user"
        );
      }

      alert("User Updated Successfully!");

      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      console.error("Update user error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update user."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Loading user details...
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <Link
                href="/admin/users"
                className="
                  w-9
                  h-9
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  hover:bg-gray-50
                  hover:text-gray-800
                  transition
                "
              >
                <FaArrowLeft className="text-sm" />
              </Link>

              <h1 className="text-2xl font-semibold text-gray-900">
                Edit User
              </h1>

            </div>

            <p className="text-sm text-gray-500 ml-12">
              Update user account information.
            </p>
          </div>

          <Link
            href="/admin/users"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-gray-500
              hover:text-gray-800
              transition
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to Users
          </Link>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORM CARD */}
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* CARD HEADER */}
          <div
            className="
              px-6
              sm:px-8
              py-5
              border-b
              border-gray-100
              bg-gray-50/50
            "
          >
            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                "
              >
                <FaUser />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  User Information
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  User ID: {id}
                </p>
              </div>

            </div>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >
            <div className="grid md:grid-cols-2 gap-5">

              {/* FULL NAME */}
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
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-sm
                      text-gray-700
                      outline-none
                      focus:border-gray-300
                      focus:ring-4
                      focus:ring-gray-100
                      transition
                    "
                  />
                </div>
              </div>

              {/* EMAIL */}
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
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-sm
                      text-gray-700
                      outline-none
                      focus:border-gray-300
                      focus:ring-4
                      focus:ring-gray-100
                      transition
                    "
                  />
                </div>
              </div>

              {/* PASSWORD */}
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
                    required
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      text-sm
                      text-gray-700
                      outline-none
                      focus:border-gray-300
                      focus:ring-4
                      focus:ring-gray-100
                      transition
                    "
                  />
                </div>
              </div>

              {/* USER TYPE */}
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
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-sm
                      text-gray-700
                      outline-none
                      focus:border-gray-300
                      focus:ring-4
                      focus:ring-gray-100
                      transition
                    "
                  >
                    <option value="User">
                      User
                    </option>

                    <option value="Admin">
                      Admin
                    </option>
                  </select>
                </div>
              </div>

              {/* STATUS */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    mt-2
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    text-gray-700
                    outline-none
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
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

            {/* BUTTONS */}
            <div
              className="
                mt-8
                pt-6
                border-t
                border-gray-100
                flex
                justify-end
                gap-3
              "
            >
              <Link
                href="/admin/users"
                className="
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
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-lg
                  bg-gray-200
                  text-gray-700
                  text-sm
                  font-medium
                  hover:bg-gray-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                <FaSave className="text-sm" />

                {saving
                  ? "Updating..."
                  : "Update User"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}