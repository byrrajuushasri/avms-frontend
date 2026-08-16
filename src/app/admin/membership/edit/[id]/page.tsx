"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaUser,
} from "react-icons/fa";

interface Member {
  full_name: string;
  email: string;
  mobile: string;
  gender: string;
  password: string;
  created_at: string;
}

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();

  const memberId = params.id as string;

  const [member, setMember] = useState<Member>({
    full_name: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    created_at: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // GET MEMBER BY ID
  // =========================
  useEffect(() => {
    if (!memberId) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/membership-register/${memberId}`
        );

        if (!response.ok) {
          throw new Error("Failed to load member");
        }

        const data = await response.json();

        setMember({
          full_name: data.full_name || "",
          email: data.email || "",
          mobile: data.mobile || "",
          gender: data.gender || "",
          password: data.password || "",
          created_at: data.created_at || "",
        });
      } catch (error) {
        console.error("Fetch member error:", error);

        setError("Unable to load member details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE MEMBER
  // =========================
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/membership-register/${memberId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: member.full_name,
            mobile: member.mobile,
            email: member.email,
            password: member.password,
            gender: member.gender,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to update member"
        );
      }

      alert("Member updated successfully!");

      router.push("/admin/membership");
      router.refresh();
    } catch (error) {
      console.error("Update member error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to update member."
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
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Loading member details...
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================
  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1200px] mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>
            <div className="flex items-center gap-3 mb-2">

              <Link
                href="/admin/membership"
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

              <h1 className="text-2xl text-gray-900">
                Edit Member
              </h1>

            </div>

            <p className="text-sm text-gray-500 ml-12">
              Update matrimonial member information.
            </p>
          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="
            mb-5
            px-4
            py-3
            rounded-xl
            border
            border-red-200
            bg-red-50
            text-sm
            text-red-600
          ">
            {error}
          </div>
        )}

        {/* FORM */}
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

          {/* FORM HEADER */}
          <div className="px-6 py-5 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#f8eef2]
                  flex
                  items-center
                  justify-center
                  text-[#8B1E3F]
                "
              >
                <FaUser />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Member Information
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Member ID: {memberId}
                </p>
              </div>

            </div>

          </div>

          {/* FORM BODY */}
          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* MEMBER ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member ID
                </label>

                <input
                  type="text"
                  value={memberId}
                  disabled
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-500
                    outline-none
                  "
                />
              </div>

              {/* NAME */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={member.full_name}
                  onChange={handleChange}
                  placeholder="Enter member name"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2
                    focus:ring-[#8B1E3F]/10
                  "
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID
                </label>

                <input
                  type="email"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2
                    focus:ring-[#8B1E3F]/10
                  "
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={member.mobile}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2
                    focus:ring-[#8B1E3F]/10
                  "
                />
              </div>

              {/* GENDER */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>

                <select
                  name="gender"
                  value={member.gender}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    text-sm
                    outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2
                    focus:ring-[#8B1E3F]/10
                  "
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Male">
                    Male
                  </option>
                </select>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={member.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    outline-none
                    focus:border-[#8B1E3F]
                    focus:ring-2
                    focus:ring-[#8B1E3F]/10
                  "
                />
              </div>

              {/* CREATED DATE */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Created Date
                </label>

                <input
                  type="text"
                  value={
                    member.created_at
                      ? new Date(
                          member.created_at
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : ""
                  }
                  disabled
                  className="
                    w-full
                    h-11
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    text-sm
                    text-gray-500
                    outline-none
                  "
                />
              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div
            className="
              px-6
              py-5
              border-t
              border-gray-100
              flex
              flex-col-reverse
              sm:flex-row
              sm:justify-end
              gap-3
            "
          >

            <Link
              href="/admin/membership"
              className="
                px-5
                py-2.5
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-600
                text-sm
                font-semibold
                text-center
                hover:bg-gray-50
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
                justify-center
                gap-2
                px-5
                py-2.5
                rounded-xl
                bg-gray-200
                text-gray-600
                text-sm
                font-semibold
                hover:bg-gray-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >
              <FaSave />

              {saving
                ? "Updating..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}