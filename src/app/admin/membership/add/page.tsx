"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = {
  full_name: string;
  mobile: string;
  email: string;
  password: string;
  location: string;
  gender: string;
  create_date: string;
  status: string;
};

type FormErrors = {
  full_name?: string;
  mobile?: string;
  email?: string;
  password?: string;
  location?: string;
  gender?: string;
  create_date?: string;
};

export default function AddMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    location: "",
    gender: "",
    create_date: "",
    status: "Active",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error while user is typing/selecting
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Please enter full name";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter mobile number";
    } else if (!/^[0-9]{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter email address";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Please enter password";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please enter location";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    if (!formData.create_date) {
      newErrors.create_date = "Please select create date";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields");
      return false;
    }

    return true;
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

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
            full_name: formData.full_name.trim(),
            mobile: formData.mobile.trim(),
            email: formData.email.trim(),
            password: formData.password,
            gender: formData.gender,
          }),
        }
      );

      const data = await response.json();

      console.log("Membership response:", data);

      if (!response.ok) {
        if (Array.isArray(data.message)) {
          toast.error(data.message.join(", "));
        } else {
          toast.error(
            data.message || "Failed to add member"
          );
        }

        return;
      }

      toast.success("Member added successfully!");

      setTimeout(() => {
        router.push("/admin/membership");
      }, 1000);
    } catch (error) {
      console.error("Membership Error:", error);

      toast.error(
        "Failed to add member. Please check backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-900">
            Add Membership Member
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new membership member profile.
          </p>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-sm
          "
        >
          {/* ===================================================
              FORM FIELDS
          =================================================== */}

          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              {/* FULL NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter Full Name"
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 placeholder:text-gray-400
                    outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.full_name
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.full_name && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* MOBILE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Mobile Number{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(
                      /\D/g,
                      ""
                    );

                    setFormData((prev) => ({
                      ...prev,
                      mobile: value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      mobile: "",
                    }));
                  }}
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 placeholder:text-gray-400
                    outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.mobile
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.mobile && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email Address"
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 placeholder:text-gray-400
                    outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.email && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 placeholder:text-gray-400
                    outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.password && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Location{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Location"
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 placeholder:text-gray-400
                    outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.location
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.location && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* GENDER */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Gender{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.gender
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
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

                {errors.gender && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.gender}
                  </p>
                )}
              </div>

              {/* CREATE DATE */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Create Date{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="date"
                  name="create_date"
                  value={formData.create_date}
                  onChange={handleChange}
                  className={`
                    h-11 w-full rounded-xl border
                    bg-gray-50/50 px-4 text-sm
                    text-gray-700 outline-none transition
                    focus:bg-white focus:ring-4
                    ${
                      errors.create_date
                        ? "border-red-500 focus:border-red-500 focus:ring-red-50"
                        : "border-gray-200 focus:border-gray-300 focus:ring-gray-100"
                    }
                  `}
                />

                {errors.create_date && (
                  <p className="mt-1.5 text-xs font-medium text-red-500">
                    {errors.create_date}
                  </p>
                )}
              </div>

              {/* STATUS */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    h-11 w-full rounded-xl border
                    border-gray-200 bg-gray-50/50
                    px-4 text-sm text-gray-700
                    outline-none transition
                    focus:border-gray-300
                    focus:bg-white
                    focus:ring-4 focus:ring-gray-100
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
              flex flex-col-reverse items-center
              justify-end gap-3
              border-t border-gray-100
              bg-gray-50/50
              px-6 py-5
              sm:flex-row
            "
          >
            {/* CANCEL */}
            <button
              type="button"
              onClick={() =>
                router.push("/admin/membership")
              }
              disabled={loading}
              className="
                h-11 w-full rounded-xl
                border border-gray-200
                bg-white px-6
                text-sm font-semibold text-gray-600
                transition
                hover:border-gray-300
                hover:bg-gray-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>

            {/* SAVE */}
            <button
              type="submit"
              disabled={loading}
              className="
                h-11 w-full rounded-xl
                bg-[#8B1E3F]
                px-6
                text-sm font-semibold text-white
                transition
                hover:bg-[#741832]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              {loading ? "Saving..." : "Save Member"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}