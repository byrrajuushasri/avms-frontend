"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUtensils,
  FaBed,
  FaSave,
  FaMapMarkedAlt,
  FaAlignLeft,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const SATRAMS_API = `${API_URL}/satrams`;

/* =========================================================
   PAGE
========================================================= */

export default function AddSatramPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [form, setForm] = useState({
    name: "",
    state: "",
    district: "",
    mandal: "",
    sangam: "",
    place: "",
    address: "",
    contact: "",
    annadanam: true,
    accommodation: true,
    description: "",
    mapUrl: "",
  });

  /* =========================================================
     CHANGE HANDLER
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     BOOLEAN CHANGE
  ========================================================= */

  const handleCheckboxChange = (
    name: "annadanam" | "accommodation"
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!form.name.trim()) {
      setError("Please enter Satram name.");
      return;
    }

    if (!form.state.trim()) {
      setError("Please enter State.");
      return;
    }

    if (!form.district.trim()) {
      setError("Please enter District.");
      return;
    }

    if (!form.mandal.trim()) {
      setError("Please enter Mandal.");
      return;
    }

    if (!form.sangam.trim()) {
      setError("Please enter Sangam.");
      return;
    }

    if (!form.place.trim()) {
      setError("Please enter Place.");
      return;
    }

    try {
      setLoading(true);

      /* ===================================================
         POST SATRAM
      =================================================== */

      const response = await fetch(SATRAMS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: form.name.trim(),
          state: form.state.trim(),
          district: form.district.trim(),
          mandal: form.mandal.trim(),
          sangam: form.sangam.trim(),
          place: form.place.trim(),

          address: form.address.trim() || null,
          contact: form.contact.trim() || null,

          annadanam: form.annadanam,
          accommodation: form.accommodation,

          description: form.description.trim() || null,
          mapUrl: form.mapUrl.trim() || null,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to create Satram (${response.status})`
        );
      }

      setSuccess("Satram created successfully.");

      setTimeout(() => {
        router.push("/admin/satrams");
      }, 700);
    } catch (err) {
      console.error("Create Satram Error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create Satram."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <Link
              href="/admin/satrams"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition hover:bg-gray-50 hover:text-gray-900"
              title="Back"
            >
              <FaArrowLeft />
            </Link>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
              <FaBuilding />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add Satram
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add a new Arya Vysya Annadana Satram.
              </p>
            </div>

          </div>

          <Link
            href="/admin/satrams"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
          >
            <FaArrowLeft />
            Back to Satrams
          </Link>

        </div>

        {/* ===================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ===================================================
            SUCCESS
        =================================================== */}

        {success && (
          <div className="mb-5 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* ===================================================
            FORM
        =================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* =================================================
                BASIC INFORMATION
            ================================================= */}

            <div className="border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaBuilding />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Satram Information
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Enter the basic details of the Satram.
                  </p>
                </div>

              </div>

            </div>

            <div className="grid gap-6 px-6 py-6 md:grid-cols-2">

              {/* =================================================
                  NAME
              ================================================= */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Satram Name{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Satram name"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  STATE
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  State{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  DISTRICT
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  District{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="Enter District"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  MANDAL
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mandal{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="mandal"
                  value={form.mandal}
                  onChange={handleChange}
                  placeholder="Enter Mandal"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  SANGAM
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sangam{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="sangam"
                  value={form.sangam}
                  onChange={handleChange}
                  placeholder="Enter Sangam"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  PLACE
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Place{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  <input
                    type="text"
                    name="place"
                    value={form.place}
                    onChange={handleChange}
                    placeholder="Enter Place"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />

                </div>

              </div>

              {/* =================================================
                  CONTACT
              ================================================= */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Contact Number
                </label>

                <div className="relative">

                  <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  <input
                    type="tel"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    placeholder="Enter contact number"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />

                </div>

              </div>

              {/* =================================================
                  ADDRESS
              ================================================= */}

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Address
                </label>

                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Enter complete Satram address"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="md:col-span-2">

                <div className="mb-2 flex items-center gap-2">

                  <FaAlignLeft className="text-xs text-gray-400" />

                  <label className="text-sm font-semibold text-gray-700">
                    Description
                  </label>

                </div>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter Satram description"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

              </div>

              {/* =================================================
                  GOOGLE MAP URL
              ================================================= */}

              <div className="md:col-span-2">

                <div className="mb-2 flex items-center gap-2">

                  <FaMapMarkedAlt className="text-xs text-gray-400" />

                  <label className="text-sm font-semibold text-gray-700">
                    Google Maps URL
                  </label>

                </div>

                <input
                  type="url"
                  name="mapUrl"
                  value={form.mapUrl}
                  onChange={handleChange}
                  placeholder="https://maps.google.com/..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
                />

                <p className="mt-1.5 text-xs text-gray-400">
                  Paste the Google Maps location link for this Satram.
                </p>

              </div>

            </div>

            {/* =================================================
                SERVICES
            ================================================= */}

            <div className="border-t border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaUtensils />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Facilities & Services
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Select the facilities available at this Satram.
                  </p>
                </div>

              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {/* =================================================
                    ANNADANAM
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleCheckboxChange("annadanam")
                  }
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    form.annadanam
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      form.annadanam
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FaUtensils />
                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-semibold text-gray-800">
                      Annadanam Available
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Food / Annadanam service available
                    </p>

                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      form.annadanam
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {form.annadanam && (
                      <span className="flex h-full items-center justify-center text-[10px] text-white">
                        ✓
                      </span>
                    )}
                  </div>

                </button>

                {/* =================================================
                    ACCOMMODATION
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleCheckboxChange("accommodation")
                  }
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    form.accommodation
                      ? "border-blue-200 bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
                >

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      form.accommodation
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <FaBed />
                  </div>

                  <div className="flex-1">

                    <p className="text-sm font-semibold text-gray-800">
                      Accommodation
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Accommodation facility available
                    </p>

                  </div>

                  <div
                    className={`h-5 w-5 rounded-full border-2 ${
                      form.accommodation
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {form.accommodation && (
                      <span className="flex h-full items-center justify-center text-[10px] text-white">
                        ✓
                      </span>
                    )}
                  </div>

                </button>

              </div>

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-end">

              <Link
                href="/admin/satrams"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-7 text-sm font-semibold text-white shadow-sm transition hover:bg-[#741832] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaSave />

                {loading
                  ? "Saving..."
                  : "Save Satram"}
              </button>

            </div>

          </div>

        </form>

      </main>
    </div>
  );
}