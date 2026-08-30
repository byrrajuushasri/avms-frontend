"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const EVENTS_API = `${API_URL}/temple-events`;

/* =========================================================
   TYPE
========================================================= */

interface TempleEvent {
  id: number;
  title: string;
  temple: string;
  area: string | null;
  district: string | null;
  date: string;
  time: string | null;
  description: string | null;
  type: string;
  status: boolean | number;
  created_at?: string;
  updated_at?: string;
}

/* =========================================================
   FORM TYPE
========================================================= */

interface EventForm {
  title: string;
  temple: string;
  area: string;
  district: string;
  date: string;
  time: string;
  description: string;
  type: string;
  status: boolean;
}

/* =========================================================
   PAGE
========================================================= */

export default function EditTempleEventPage() {
  const router = useRouter();
  const params = useParams();

  const id = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  /* =========================================================
     STATE
  ========================================================= */

  const [formData, setFormData] = useState<EventForm>({
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     GET EVENT
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${EVENTS_API}/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      const data = await response.json().catch(
        () => null,
      );

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to fetch event. Status: ${response.status}`,
        );
      }

      /*
       * Supports:
       *
       * {
       *   id: 1,
       *   title: "..."
       * }
       *
       * and:
       *
       * {
       *   data: {
       *     id: 1,
       *     title: "..."
       *   }
       * }
       */

      const event: TempleEvent =
        data?.data && !Array.isArray(data.data)
          ? data.data
          : data;

      if (!event || !event.id) {
        throw new Error(
          "Event details not found.",
        );
      }

      setFormData({
        title: event.title || "",
        temple: event.temple || "",
        area: event.area || "",
        district: event.district || "",
        date: formatDateForInput(event.date),
        time: event.time || "",
        description: event.description || "",
        type: event.type || "Special Pooja",
        status:
          event.status === true ||
          event.status === 1 ||
          event.status === "1",
      });
    } catch (err) {
      console.error(
        "Fetch temple event error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load event details.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDateForInput = (
    value?: string,
  ) => {
    if (!value) return "";

    /*
     * If backend already returns:
     * 2026-05-30
     */
    if (
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      return value;
    }

    const date = new Date(value);

    if (
      Number.isNaN(date.getTime())
    ) {
      return "";
    }

    /*
     * Avoid timezone shifting.
     */
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0");
    const day = String(
      date.getDate(),
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================================
     UPDATE EVENT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* Validation */

    if (!formData.title.trim()) {
      setError(
        "Please enter event title.",
      );
      return;
    }

    if (!formData.temple.trim()) {
      setError(
        "Please enter temple name.",
      );
      return;
    }

    if (!formData.area.trim()) {
      setError(
        "Please enter area.",
      );
      return;
    }

    if (!formData.district.trim()) {
      setError(
        "Please enter district.",
      );
      return;
    }

    if (!formData.date) {
      setError(
        "Please select event date.",
      );
      return;
    }

    if (!formData.time.trim()) {
      setError(
        "Please enter event time.",
      );
      return;
    }

    if (!formData.description.trim()) {
      setError(
        "Please enter event description.",
      );
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${EVENTS_API}/${id}`,
        {
          method: "PUT",
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
            description:
              formData.description.trim(),
            type: formData.type,
            status: formData.status,
          }),
        },
      );

      const data = await response
        .json()
        .catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to update event. Status: ${response.status}`,
        );
      }

      setSuccess(
        "Temple event updated successfully.",
      );

      /*
       * Go back to event management
       * after successful update.
       */
      setTimeout(() => {
        router.push(
          "/admin/temple-events",
        );
        router.refresh();
      }, 700);
    } catch (err) {
      console.error(
        "Update temple event error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update temple event.",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/80">
        <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex min-h-[500px] items-center justify-center">

            <div className="flex flex-col items-center">

              <div
                className="
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-gray-200
                  border-t-[#8B1E3F]
                "
              />

              <p className="mt-4 text-sm text-gray-500">
                Loading event details...
              </p>

            </div>

          </div>

        </main>
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            mb-7
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

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
                Edit Temple Event
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update Vasavi Ammavari temple event details.
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
            FORM
        =================================================== */}

        <form onSubmit={handleSubmit}>

          <div
            className="
              overflow-hidden
              rounded-2xl
              border
              border-gray-100
              bg-white
              shadow-sm
            "
          >

            {/* =================================================
                FORM HEADER
            ================================================== */}

            <div className="border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#f8eef2]
                    text-[#8B1E3F]
                  "
                >
                  <FaCalendarAlt />
                </div>

                <div>

                  <h2 className="font-semibold text-gray-900">
                    Event Information
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Update the event information below.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                ERROR / SUCCESS
            ================================================== */}

            {(error || success) && (
              <div className="px-6 pt-5">

                {error && (
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
                )}

                {success && (
                  <div
                    className="
                      rounded-xl
                      border
                      border-green-100
                      bg-green-50
                      px-4
                      py-3
                      text-sm
                      text-green-600
                    "
                  >
                    {success}
                  </div>
                )}

              </div>
            )}

            {/* =================================================
                FORM BODY
            ================================================== */}

            <div className="px-6 py-6">

              <div className="grid gap-6 md:grid-cols-2">

                {/* EVENT TITLE */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Title{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* TEMPLE */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="temple"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Temple Name{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* AREA */}

                <div>

                  <label
                    htmlFor="area"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Area{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* DISTRICT */}

                <div>

                  <label
                    htmlFor="district"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    District{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* DATE */}

                <div>

                  <label
                    htmlFor="date"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Date{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* TIME */}

                <div>

                  <label
                    htmlFor="time"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Event Time{" "}
                    <span className="text-red-500">
                      *
                    </span>
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

                {/* TYPE */}

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

                {/* STATUS */}

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
                    value={
                      formData.status
                        ? "1"
                        : "0"
                    }
                    onChange={(e) =>
                      setFormData(
                        (current) => ({
                          ...current,
                          status:
                            e.target.value ===
                            "1",
                        }),
                      )
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

                {/* DESCRIPTION */}

                <div className="md:col-span-2">

                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Description{" "}
                    <span className="text-red-500">
                      *
                    </span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={
                      formData.description
                    }
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

                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave className="text-xs" />
                    Update Event
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