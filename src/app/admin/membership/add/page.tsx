"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    location: "",
    gender: "",
    create_date: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/membership-register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: formData.full_name,
            mobile: formData.mobile,
            email: formData.email,
            password: formData.password,
            gender: formData.gender,
          }),
        }
      );

      const data = await response.json();

      console.log("Membership response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add member"
        );
      }

      alert("Member Added Successfully!");

      router.push("/admin/membership");

    } catch (error) {
      console.error("Membership Error:", error);

      alert(
        "Failed to add member. Please check backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">

          <h1 className="text-2xl font-semibold text-gray-900">
            Add Membership Member
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Create a new membership member profile.
          </p>

        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* ===================================================
              FORM FIELDS
          =================================================== */}

          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* =================================================
                  FULL NAME
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Full Name{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  MOBILE
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Mobile Number{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  required
                  maxLength={20}
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Email Address{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Password{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Location{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  GENDER
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Gender{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                >

                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                </select>

              </div>

              {/* =================================================
                  CREATE DATE
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">

                  Create Date{" "}

                  <span className="text-red-500">
                    *
                  </span>

                </label>

                <input
                  type="date"
                  name="create_date"
                  value={formData.create_date}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {/* =================================================
                  STATUS
              ================================================= */}

              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/50
                    text-sm
                    text-gray-700
                    outline-none
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition
                  "
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* ===================================================
              BUTTONS
          =================================================== */}

          <div
            className="
              px-6
              py-5
              border-t
              border-gray-100
              bg-gray-50/50
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              items-center
              gap-3
            "
          >

            {/* CANCEL */}

            <button
              type="button"
              onClick={() =>
                router.push("/admin/membership")
              }
              className="
                w-full
                sm:w-auto
                h-11
                px-6
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-600
                text-sm
                font-semibold
                hover:bg-gray-50
                hover:border-gray-300
                transition
              "
            >
              Cancel
            </button>

            {/* SAVE */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                sm:w-auto
                h-11
                px-6
                rounded-xl
                bg-gray-200
                text-gray-700
                text-sm
                font-semibold
                hover:bg-gray-300
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading
                ? "Saving..."
                : "Save Member"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}