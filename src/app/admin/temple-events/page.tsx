"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FaCalendarAlt,
  FaEllipsisV,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaClock,
  FaPlaceOfWorship,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const EVENTS_API = `${BACKEND_URL}/temple-events`;

/* =========================================================
   TYPE
========================================================= */

interface TempleEvent {
  id: number;

  title: string | null;

  temple: string | null;

  area: string | null;

  district: string | null;

  date: string | null;

  time: string | null;

  description: string | null;

  type: string | null;

  status: number | boolean | string | null;

  created_at?: string;

  updated_at?: string;
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminTempleEventsPage() {
  const [events, setEvents] = useState<TempleEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedType, setSelectedType] =
    useState("All Types");

  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const [selectedStatus, setSelectedStatus] =
    useState("All Status");

  const [currentPage, setCurrentPage] = useState(1);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const rowsPerPage = 5;

  /* =========================================================
     GET EVENTS
  ========================================================= */

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(EVENTS_API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to fetch events: ${response.status}`,
        );
      }

      /*
       * Supports:
       *
       * [...]
       *
       * and:
       *
       * { data: [...] }
       */

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setEvents(list);
    } catch (err) {
      console.error("Error fetching temple events:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load temple events. Please check the backend server.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     EVENT TYPES
  ========================================================= */

  const eventTypes = useMemo(() => {
    const values = events
      .map((event) => event.type?.trim())
      .filter(Boolean) as string[];

    return [
      "All Types",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [events]);

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    const values = events
      .map((event) => event.district?.trim())
      .filter(Boolean) as string[];

    return [
      "All Districts",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [events]);

  /* =========================================================
     STATUS HELPER
  ========================================================= */

  const getStatus = (status: TempleEvent["status"]) => {
    if (
      status === 1 ||
      status === true ||
      status === "1" ||
      status === "active" ||
      status === "Active"
    ) {
      return "Active";
    }

    return "Inactive";
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredEvents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return events.filter((event) => {
      const typeMatch =
        selectedType === "All Types" ||
        event.type === selectedType;

      const districtMatch =
        selectedDistrict === "All Districts" ||
        event.district === selectedDistrict;

      const statusMatch =
        selectedStatus === "All Status" ||
        getStatus(event.status) === selectedStatus;

      if (!searchValue) {
        return (
          typeMatch &&
          districtMatch &&
          statusMatch
        );
      }

      const searchText = `
        ${event.title || ""}
        ${event.temple || ""}
        ${event.area || ""}
        ${event.district || ""}
        ${event.date || ""}
        ${event.time || ""}
        ${event.description || ""}
        ${event.type || ""}
      `.toLowerCase();

      const searchMatch =
        searchText.includes(searchValue);

      return (
        typeMatch &&
        districtMatch &&
        statusMatch &&
        searchMatch
      );
    });
  }, [
    events,
    search,
    selectedType,
    selectedDistrict,
    selectedStatus,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredEvents.length / rowsPerPage,
  );

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentEvents =
    filteredEvents.slice(
      indexOfFirstRow,
      indexOfLastRow,
    );

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setSelectedType("All Types");
    setSelectedDistrict("All Districts");
    setSelectedStatus("All Status");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     TYPE CHANGE
  ========================================================= */

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     DELETE EVENT
  ========================================================= */

  const handleDelete = async (
    id: number,
    title: string,
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `${EVENTS_API}/${id}`,
        {
          method: "DELETE",
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
                "Failed to delete event",
        );
      }

      setEvents((current) =>
        current.filter(
          (event) => event.id !== id,
        ),
      );

      setOpenMenuId(null);

      /*
       * If deleting the last item
       * on current page, go back.
       */

      if (
        currentEvents.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (page) => page - 1,
        );
      }
    } catch (err) {
      console.error(
        "Delete event error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete event.",
      );

      setOpenMenuId(null);
    }
  };

  /* =========================================================
     MENU
  ========================================================= */

  const toggleMenu = (id: number) => {
    setOpenMenuId((current) =>
      current === id ? null : id,
    );
  };

  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (date?: string | null) => {
    if (!date) return "-";

    /*
     * For YYYY-MM-DD values, avoid timezone
     * conversion problems.
     */

    const simpleDate =
      /^\d{4}-\d{2}-\d{2}$/.test(date);

    const parsedDate = simpleDate
      ? new Date(`${date}T00:00:00`)
      : new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime(),
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">
      <main
        className="
          mx-auto
          max-w-[1600px]
          px-4
          py-6
          sm:px-6
          lg:px-8
          lg:py-8
        "
      >
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div
          className="
            mb-7
            flex
            flex-col
            justify-between
            gap-4
            sm:flex-row
            sm:items-center
          "
        >
          <div>
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
                <FaCalendarAlt />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  Temple Events Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage Vasavi Ammavari temple events,
                  poojas and devotional programs.
                </p>
              </div>
            </div>
          </div>

          {/* ADD EVENT */}

          <Link
            href="/admin/temple-events/add"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#f8eef2]
              px-5
              py-3
              font-semibold
              text-black
              shadow-sm
              transition
              hover:bg-[#f2e4ea]
            "
          >
            <FaPlus />
            Add Event
          </Link>
        </div>

        {/* ===================================================
            TABLE CARD
        =================================================== */}

        <div
          className="
            overflow-visible
            rounded-2xl
            border
            border-gray-100
            bg-white
            shadow-sm
          "
        >
          {/* =================================================
              SEARCH + FILTERS
          ================================================= */}

          <div
            className="
              border-b
              border-gray-100
              px-5
              py-5
              sm:px-6
            "
          >
            <div
              className="
                grid
                gap-3
                lg:grid-cols-[1fr_190px_190px_160px_auto]
              "
            >
              {/* SEARCH */}

              <div className="relative">
                <FaSearch
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
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearch(
                      e.target.value,
                    )
                  }
                  placeholder="Search event, temple, area, district..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/80
                    pl-11
                    pr-11
                    text-sm
                    text-gray-700
                    outline-none
                    transition-all
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-gray-100
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      handleSearch("")
                    }
                    title="Clear search"
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-7
                      w-7
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-gray-400
                      transition
                      hover:bg-gray-100
                      hover:text-gray-700
                    "
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>

              {/* EVENT TYPE */}

              <select
                value={selectedType}
                onChange={(e) =>
                  handleTypeChange(
                    e.target.value,
                  )
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/80
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
                {eventTypes.map((type) => (
                  <option
                    key={type}
                    value={type}
                  >
                    {type}
                  </option>
                ))}
              </select>

              {/* DISTRICT */}

              <select
                value={selectedDistrict}
                onChange={(e) =>
                  handleDistrictChange(
                    e.target.value,
                  )
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/80
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
                {districts.map(
                  (district) => (
                    <option
                      key={district}
                      value={district}
                    >
                      {district}
                    </option>
                  ),
                )}
              </select>

              {/* STATUS */}

              <select
                value={selectedStatus}
                onChange={(e) =>
                  handleStatusChange(
                    e.target.value,
                  )
                }
                className="
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50/80
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
                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              {/* CLEAR */}

              {(search ||
                selectedType !==
                  "All Types" ||
                selectedDistrict !==
                  "All Districts" ||
                selectedStatus !==
                  "All Status") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    text-sm
                    font-semibold
                    text-gray-600
                    transition
                    hover:bg-gray-50
                    hover:text-gray-900
                  "
                >
                  <FaTimes />
                  Clear
                </button>
              )}
            </div>

            {/* RESULT COUNT */}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-600">
                  {filteredEvents.length}
                </span>{" "}
                event
                {filteredEvents.length !==
                1
                  ? "s"
                  : ""}
              </p>

              <div className="flex flex-wrap gap-2">
                {selectedType !==
                  "All Types" && (
                  <span
                    className="
                      rounded-full
                      bg-gray-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-600
                    "
                  >
                    Type:{" "}
                    {selectedType}
                  </span>
                )}

                {selectedDistrict !==
                  "All Districts" && (
                  <span
                    className="
                      rounded-full
                      bg-gray-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-600
                    "
                  >
                    District:{" "}
                    {selectedDistrict}
                  </span>
                )}

                {selectedStatus !==
                  "All Status" && (
                  <span
                    className="
                      rounded-full
                      bg-gray-50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-gray-600
                    "
                  >
                    Status:{" "}
                    {selectedStatus}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="px-6 py-4">
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

              <button
                type="button"
                onClick={fetchEvents}
                className="
                  mt-3
                  rounded-lg
                  bg-gray-100
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-gray-200
                "
              >
                Retry
              </button>
            </div>
          )}

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto overflow-y-visible">
            <table className="w-full min-w-[1400px]">
              {/* HEADER */}

              <thead>
                <tr
                  className="
                    bg-gray-50/80
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >
                  <th className="px-6 py-4 text-left font-semibold">
                    Event
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Temple
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Area
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    District
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Type
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Create Date
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}

              <tbody className="divide-y divide-gray-100">
                {/* LOADING */}

                {loading ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-4
                            border-gray-200
                            border-t-gray-600
                          "
                        />

                        <p className="mt-4 text-sm text-gray-500">
                          Loading temple events...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : currentEvents.length >
                  0 ? (
                  currentEvents.map(
                    (event) => (
                      <tr
                        key={event.id}
                        className="
                          transition-colors
                          hover:bg-gray-50/70
                        "
                      >
                        {/* EVENT */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-[#f8eef2]
                                text-[#8B1E3F]
                              "
                            >
                              <FaCalendarAlt />
                            </div>

                            <div className="min-w-0">
                              <p
                                className="
                                  max-w-[260px]
                                  truncate
                                  font-semibold
                                  text-gray-800
                                "
                              >
                                {event.title ||
                                  "-"}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                ID #{event.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* TEMPLE */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaPlaceOfWorship className="text-xs text-gray-400" />

                            <span
                              className="
                                max-w-[240px]
                                truncate
                                text-sm
                                text-gray-600
                              "
                              title={
                                event.temple ||
                                ""
                              }
                            >
                              {event.temple ||
                                "-"}
                            </span>
                          </div>
                        </td>

                        {/* AREA */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-xs text-gray-400" />

                            <span className="text-sm text-gray-600">
                              {event.area ||
                                "-"}
                            </span>
                          </div>
                        </td>

                        {/* DISTRICT */}

                        <td className="px-6 py-4">
                          <span
                            className="
                              inline-flex
                              rounded-full
                              bg-gray-50
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-gray-600
                            "
                          >
                            {event.district ||
                              "-"}
                          </span>
                        </td>

                        {/* DATE */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-xs text-gray-400" />

                            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                              {formatDate(
                                event.date,
                              )}
                            </span>
                          </div>
                        </td>

                        {/* TIME */}

                        <td className="px-6 py-4">
                          {event.time ? (
                            <div className="flex items-start gap-2">
                              <FaClock className="mt-1 shrink-0 text-xs text-gray-400" />

                              <span className="max-w-[180px] text-sm leading-5 text-gray-600">
                                {event.time}
                              </span>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              -
                            </span>
                          )}
                        </td>

                        {/* TYPE */}

                        <td className="px-6 py-4">
                          <span
                            className="
                              inline-flex
                              whitespace-nowrap
                              rounded-full
                              bg-[#f8eef2]
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              text-[#8B1E3F]
                            "
                          >
                            {event.type ||
                              "-"}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">
                          {getStatus(
                            event.status,
                          ) ===
                          "Active" ? (
                            <span
                              className="
                                inline-flex
                                rounded-full
                                bg-green-50
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-green-600
                              "
                            >
                              Active
                            </span>
                          ) : (
                            <span
                              className="
                                inline-flex
                                rounded-full
                                bg-gray-100
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-gray-500
                              "
                            >
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* CREATE DATE */}

                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                              {formatDate(
                                event.created_at,
                              )}
                            </span>

                            <span className="mt-0.5 text-xs text-gray-400">
                              Registered
                            </span>
                          </div>
                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">
                          <div className="flex justify-end">
                            <div className="relative">
                              <button
                                type="button"
                                title="More actions"
                                aria-label={`Actions for ${
                                  event.title ||
                                  "event"
                                }`}
                                aria-expanded={
                                  openMenuId ===
                                  event.id
                                }
                                onClick={() =>
                                  toggleMenu(
                                    event.id,
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-lg
                                  border
                                  border-gray-200
                                  bg-white
                                  text-gray-500
                                  transition-all
                                  hover:border-gray-300
                                  hover:bg-gray-50
                                  hover:text-gray-800
                                "
                              >
                                <FaEllipsisV className="text-sm" />
                              </button>

                              {/* DROPDOWN */}

                              {openMenuId ===
                                event.id && (
                                <div
                                  className="
                                    absolute
                                    right-0
                                    top-11
                                    z-50
                                    w-40
                                    rounded-xl
                                    border
                                    border-gray-100
                                    bg-white
                                    py-1.5
                                    shadow-2xl
                                  "
                                >
                                  

                                  {/* EDIT */}

                                  <Link
                                    href={`/admin/temple-events/edit/${event.id}`}
                                    onClick={() =>
                                      setOpenMenuId(
                                        null,
                                      )
                                    }
                                    className="
                                      flex
                                      w-full
                                      items-center
                                      gap-3
                                      px-4
                                      py-2.5
                                      text-sm
                                      text-gray-600
                                      transition
                                      hover:bg-gray-50
                                      hover:text-gray-900
                                    "
                                  >
                                    <FaEdit className="text-xs text-gray-400" />

                                    <span>
                                      Edit
                                    </span>
                                  </Link>

                                  <div className="my-1 border-t border-gray-100" />

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        event.id,
                                        event.title ||
                                          "this event",
                                      )
                                    }
                                    className="
                                      flex
                                      w-full
                                      items-center
                                      gap-3
                                      px-4
                                      py-2.5
                                      text-left
                                      text-sm
                                      text-gray-500
                                      transition
                                      hover:bg-red-50
                                      hover:text-red-600
                                    "
                                  >
                                    <FaTrash className="text-xs text-gray-400" />

                                    <span>
                                      Delete
                                    </span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ),
                  )
                ) : (
                  /* NO RESULTS */

                  <tr>
                    <td
                      colSpan={10}
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className="
                            mb-3
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-gray-50
                          "
                        >
                          <FaCalendarAlt className="text-gray-300" />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          No events found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Try changing the
                          search or filters.
                        </p>

                        {(search ||
                          selectedType !==
                            "All Types" ||
                          selectedDistrict !==
                            "All Districts" ||
                          selectedStatus !==
                            "All Status") && (
                          <button
                            type="button"
                            onClick={
                              resetFilters
                            }
                            className="
                              mt-4
                              text-xs
                              font-semibold
                              text-[#8B1E3F]
                              hover:underline
                            "
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-4
              border-t
              border-gray-100
              px-6
              py-4
              sm:flex-row
            "
          >
            {/* INFO */}

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredEvents.length ===
                0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(
                  indexOfLastRow,
                  filteredEvents.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredEvents.length}
              </span>{" "}
              events
            </p>

            {/* BUTTONS */}

            {totalPages > 0 && (
              <div className="flex items-center gap-2">
                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1,
                        ),
                    );

                    setOpenMenuId(null);
                  }}
                  disabled={
                    currentPage === 1
                  }
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                {Array.from({
                  length: totalPages,
                }).map(
                  (_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setCurrentPage(
                          index + 1,
                        );

                        setOpenMenuId(null);
                      }}
                      className={`
                        h-9
                        w-9
                        rounded-lg
                        text-sm
                        font-semibold
                        transition

                        ${
                          currentPage ===
                          index + 1
                            ? "bg-gray-100 text-black shadow-sm"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  ),
                )}

                {/* NEXT */}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages,
                        ),
                    );

                    setOpenMenuId(null);
                  }}
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  className="
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2
                    text-sm
                    font-medium
                    transition
                    hover:bg-gray-50
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}