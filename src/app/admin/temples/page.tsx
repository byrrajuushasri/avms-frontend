"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FaPlaceOfWorship,
  FaEllipsisV,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const TEMPLES_API = `${API_URL}/temples`;

/* =========================================================
   TYPE
========================================================= */

interface Temple {
  id: number;

  name: string;

  area: string | null;

  district: string | null;

  address: string | null;

  phone: string | null;

  timings: string | null;

  description: string | null;

  mapUrl: string | null;

  created_at?: string;

  updated_at?: string;
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminTemplesPage() {
  const [temples, setTemples] = useState<Temple[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const [selectedArea, setSelectedArea] =
    useState("All Areas");

  const [currentPage, setCurrentPage] = useState(1);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const rowsPerPage = 5;

  /* =========================================================
     GET TEMPLES
  ========================================================= */

  useEffect(() => {
    fetchTemples();
  }, []);

  const fetchTemples = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(TEMPLES_API, {
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
                `Failed to fetch temples: ${response.status}`,
        );
      }

      /*
       * Supports both:
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

      setTemples(list);
    } catch (err) {
      console.error("Error fetching temples:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load temples. Please check the backend server.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    const values = temples
      .map((temple) => temple.district?.trim())
      .filter(Boolean) as string[];

    return [
      "All Districts",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [temples]);

  /* =========================================================
     AREAS
  ========================================================= */

  const areas = useMemo(() => {
    const values = temples
      .map((temple) => temple.area?.trim())
      .filter(Boolean) as string[];

    return [
      "All Areas",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [temples]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredTemples = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return temples.filter((temple) => {
      const districtMatch =
        selectedDistrict === "All Districts" ||
        temple.district === selectedDistrict;

      const areaMatch =
        selectedArea === "All Areas" ||
        temple.area === selectedArea;

      if (!searchValue) {
        return districtMatch && areaMatch;
      }

      const searchText = `
        ${temple.name || ""}
        ${temple.area || ""}
        ${temple.district || ""}
        ${temple.address || ""}
        ${temple.phone || ""}
        ${temple.description || ""}
      `.toLowerCase();

      const searchMatch =
        searchText.includes(searchValue);

      return (
        districtMatch &&
        areaMatch &&
        searchMatch
      );
    });
  }, [
    temples,
    search,
    selectedDistrict,
    selectedArea,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredTemples.length / rowsPerPage,
  );

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentTemples =
    filteredTemples.slice(
      indexOfFirstRow,
      indexOfLastRow,
    );

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setSelectedDistrict("All Districts");
    setSelectedArea("All Areas");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     SEARCH CHANGE
  ========================================================= */

  const handleSearch = (
    value: string,
  ) => {
    setSearch(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const handleDistrictChange = (
    value: string,
  ) => {
    setSelectedDistrict(value);

    /*
     * Reset area when district changes.
     * This prevents an old area filter
     * from hiding the new district results.
     */

    setSelectedArea("All Areas");

    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     AREA CHANGE
  ========================================================= */

  const handleAreaChange = (
    value: string,
  ) => {
    setSelectedArea(value);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (
    id: number,
    name: string,
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${name}"?`,
      );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `${TEMPLES_API}/${id}`,
        {
          method: "DELETE",
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
                "Failed to delete temple",
        );
      }

      setTemples((current) =>
        current.filter(
          (temple) =>
            temple.id !== id,
        ),
      );

      setOpenMenuId(null);

      /*
       * If current page becomes empty,
       * move to previous page.
       */

      if (
        currentTemples.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (page) => page - 1,
        );
      }
    } catch (err) {
      console.error(
        "Delete temple error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete temple.",
      );

      setOpenMenuId(null);
    }
  };

  /* =========================================================
     MENU
  ========================================================= */

  const toggleMenu = (
    id: number,
  ) => {
    setOpenMenuId((current) =>
      current === id
        ? null
        : id,
    );
  };

  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (
    date?: string,
  ) => {
    if (!date) return "-";

    const parsedDate =
      new Date(date);

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
                <FaPlaceOfWorship />
              </div>

              <div>

                <h2 className="text-2xl font-semibold text-gray-900">
                  Temple Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage Vasavi Ammavari temples and
                  their details.
                </p>

              </div>

            </div>

          </div>

          {/* ADD TEMPLE */}

          <Link
            href="/admin/temples/add"
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

            Add Temple
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
                lg:grid-cols-[1fr_210px_210px_auto]
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
                  placeholder="
                    Search temple, area, district or phone...
                  "
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

              {/* AREA */}

              <select
                value={selectedArea}
                onChange={(e) =>
                  handleAreaChange(
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

                {areas.map(
                  (area) => (
                    <option
                      key={area}
                      value={area}
                    >
                      {area}
                    </option>
                  ),
                )}

              </select>

              {/* RESET */}

              {(search ||
                selectedDistrict !==
                  "All Districts" ||
                selectedArea !==
                  "All Areas") && (
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
                  {filteredTemples.length}
                </span>{" "}

                temple
                {filteredTemples.length !==
                1
                  ? "s"
                  : ""}

              </p>

              <div className="flex flex-wrap gap-2">

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

                {selectedArea !==
                  "All Areas" && (
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
                    Area:{" "}
                    {selectedArea}
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
                onClick={fetchTemples}
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

            <table className="w-full min-w-[1250px]">

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
                    Temple
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Area
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    District
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Timings
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
                      colSpan={7}
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
                          Loading temples...
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : currentTemples.length >
                  0 ? (

                  currentTemples.map(
                    (temple) => (
                      <tr
                        key={temple.id}
                        className="
                          transition-colors
                          hover:bg-gray-50/70
                        "
                      >

                        {/* TEMPLE */}

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
                              <FaPlaceOfWorship />
                            </div>

                            <div className="min-w-0">

                              <p
                                className="
                                  max-w-[300px]
                                  truncate
                                  font-semibold
                                  text-gray-800
                                "
                              >
                                {temple.name ||
                                  "-"}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                ID #
                                {temple.id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* AREA */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <FaMapMarkerAlt className="text-xs text-gray-400" />

                            <span className="text-sm text-gray-600">
                              {temple.area ||
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
                            {temple.district ||
                              "-"}
                          </span>

                        </td>

                        {/* PHONE */}

                        <td className="px-6 py-4">

                          {temple.phone ? (
                            <div className="flex items-center gap-2">

                              <FaPhoneAlt className="text-xs text-gray-400" />

                              <span className="whitespace-nowrap text-sm text-gray-600">
                                {temple.phone}
                              </span>

                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              -
                            </span>
                          )}

                        </td>

                        {/* TIMINGS */}

                        <td className="px-6 py-4">

                          {temple.timings ? (
                            <div className="flex max-w-[220px] items-start gap-2">

                              <FaClock className="mt-1 shrink-0 text-xs text-gray-400" />

                              <span className="text-sm leading-5 text-gray-600">
                                {temple.timings}
                              </span>

                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              -
                            </span>
                          )}

                        </td>

                        {/* CREATE DATE */}

                        <td className="px-6 py-4">

                          <div className="flex flex-col">

                            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                              {formatDate(
                                temple.created_at,
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
                                  temple.name
                                }`}
                                aria-expanded={
                                  openMenuId ===
                                  temple.id
                                }
                                onClick={() =>
                                  toggleMenu(
                                    temple.id,
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
                                temple.id && (
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
                                    href={`/admin/temples/edit/${temple.id}`}
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
                                        temple.id,
                                        temple.name,
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
                      colSpan={7}
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
                          <FaPlaceOfWorship className="text-gray-300" />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          No temples found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Try changing the search
                          or filters.
                        </p>

                        {(search ||
                          selectedDistrict !==
                            "All Districts" ||
                          selectedArea !==
                            "All Areas") && (
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
                {filteredTemples.length ===
                0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}

              to{" "}

              <span className="font-semibold text-gray-700">
                {Math.min(
                  indexOfLastRow,
                  filteredTemples.length,
                )}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-700">
                {filteredTemples.length}
              </span>{" "}

              temples

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
                    currentPage ===
                    1
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

                        setOpenMenuId(
                          null,
                        );
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