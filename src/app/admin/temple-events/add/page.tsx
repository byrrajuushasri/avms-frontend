"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPlaceOfWorship,
  FaSave,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const EVENTS_API = `${BACKEND_URL}/temple-events`;

/* =========================================================
   PAGE
========================================================= */

export default function AddTempleEventPage() {
  const router = useRouter();

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [formData, setFormData] = useState({
    title: "",
    temple: "",
    area: "",
    district: "",
    date: "",
    time: "",
    description: "",
    type: "Special Pooja",
    status: true,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    /* Basic validation */

    if (!formData.title.trim()) {
      setError("Please enter event title.");
      return;
    }

    if (!formData.temple.trim()) {
      setError("Please enter temple name.");
      return;
    }

    if (!formData.area.trim()) {
      setError("Please enter area.");
      return;
    }

    if (!formData.district.trim()) {
      setError("Please enter district.");
      return;
    }

    if (!formData.date) {
      setError("Please select event date.");
      return;
    }

    if (!formData.time.trim()) {
      setError("Please enter event time.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter event description.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(EVENTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          temple: formData.temple.trim(),
          area: formData.area.trim(),
          district: formData.district.trim(),
          date: formData.date,
          time: formData.time.trim(),
          description: formData.description.trim(),
          type: formData.type,
          status: formData.status,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to create event. Status: ${response.status}`,
        );
      }

      /* Success */

      router.push("/admin/temple-events");
      router.refresh();
    } catch (err) {
      console.error("Create temple event error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to create temple event.",
      );
    } finally {
      setSaving(false);
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

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#f8eef2]
                text-[#8B1E3F]
              "
            >
              <FaPlaceOfWorship />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add Temple Event
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Add a new Vasavi Ammavari temple event.
              </p>
            </div>

          </div>

          <Link
            href="/admin/temple-events"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-600
              shadow-sm
              transition
              hover:bg-gray-50
              hover:text-gray-900
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to Events
          </Link>

        </div>

        {/* ===================================================
            FORM CARD
        =================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* FORM HEADER */}

            <div className="border-b border-gray-100 px-6 py-5">
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaCalendarAlt />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Event Information
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Enter the temple event details below.
                  </p>
                </div>

              </div>
            </div>

            {/* ERROR */}

            {error && (
              <div className="px-6 pt-5">
                <div
                  className="
                    rounded-xl
                    border
                    border-red-100
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-600
                  "
                >
                  {error}
                </div>
              </div>
            )}

            {/* FORM BODY */}

            <div className="px-6 py-6">

              <div className="grid gap-6 md:grid-cols-2">

                {/* =================================================
                    EVENT TITLE
                ================================================== */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Title <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Vasavi Ammavari Jayanthi"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      text-sm
                      text-gray-700
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-gray-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-gray-100
                    "
                  />

                </div>

                {/* =================================================
                    TEMPLE
                ================================================== */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="temple"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Temple Name <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <FaPlaceOfWorship
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-gray-400
                      "
                    />

                    <input
                      id="temple"
                      name="temple"
                      type="text"
                      value={formData.temple}
                      onChange={handleChange}
                      placeholder="e.g. Sri Vasavi Kanyaka Parameshwari Temple"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        pl-11
                        pr-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    AREA
                ================================================== */}

                <div>

                  <label
                    htmlFor="area"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Area <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <FaMapMarkerAlt
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-gray-400
                      "
                    />

                    <input
                      id="area"
                      name="area"
                      type="text"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. Kukatpally"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        pl-11
                        pr-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    DISTRICT
                ================================================== */}

                <div>

                  <label
                    htmlFor="district"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    District <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="district"
                    name="district"
                    type="text"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Hyderabad"
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      text-sm
                      text-gray-700
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-gray-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-gray-100
                    "
                  />

                </div>

                {/* =================================================
                    DATE
                ================================================== */}

                <div>

                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <FaCalendarAlt
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-gray-400
                      "
                    />

                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        pl-11
                        pr-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    TIME
                ================================================== */}

                <div>

                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Time <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">

                    <FaClock
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-sm
                        text-gray-400
                      "
                    />

                    <input
                      id="time"
                      name="time"
                      type="text"
                      value={formData.time}
                      onChange={handleChange}
                      placeholder="e.g. 6:00 AM – 9:00 PM"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        pl-11
                        pr-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    />

                  </div>

                </div>

                {/* =================================================
                    EVENT TYPE
                ================================================== */}

                <div>

                  <label
                    htmlFor="type"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Type
                  </label>

                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      text-sm
                      text-gray-600
                      outline-none
                      transition
                      focus:border-gray-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-gray-100
                    "
                  >
                    <option value="Special Pooja">
                      Special Pooja
                    </option>

                    <option value="Abhishekam">
                      Abhishekam
                    </option>

                    <option value="Pooja">
                      Pooja
                    </option>

                    <option value="Festival">
                      Festival
                    </option>

                    <option value="Devotional">
                      Devotional
                    </option>

                    <option value="Bhajan">
                      Bhajan
                    </option>

                    <option value="Community">
                      Community
                    </option>
                  </select>

                </div>

                {/* =================================================
                    STATUS
                ================================================== */}

                <div>

                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status ? "1" : "0"}
                    onChange={(e) =>
                      setFormData((current) => ({
                        ...current,
                        status: e.target.value === "1",
                      }))
                    }
                    className="
                      h-11
                      w-full
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      text-sm
                      text-gray-600
                      outline-none
                      transition
                      focus:border-gray-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-gray-100
                    "
                  >
                    <option value="1">
                      Active
                    </option>

                    <option value="0">
                      Inactive
                    </option>
                  </select>

                </div>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Description{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Enter event description..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50/70
                      px-4
                      py-3
                      text-sm
                      leading-6
                      text-gray-700
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-gray-300
                      focus:bg-white
                      focus:ring-4
                      focus:ring-gray-100
                    "
                  />

                </div>

              </div>

            </div>

            {/* =================================================
                FOOTER
            ================================================== */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-gray-100
                bg-gray-50/50
                px-6
                py-5
                sm:flex-row
                sm:justify-end
              "
            >

              <Link
                href="/admin/temple-events"
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-gray-600
                  transition
                  hover:bg-gray-50
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#8B1E3F]
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#751833]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {saving ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="text-xs" />
                    Save Event
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </main>
    </div>
  );
}