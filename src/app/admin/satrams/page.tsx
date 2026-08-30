"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  FaUtensils,
  FaEllipsisV,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUsers,
  FaCheckCircle,
  FaBed,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const SATRAMS_API = `${API_URL}/satrams`;

/* =========================================================
   TYPE
========================================================= */

interface Satram {
  id: number;

  name: string;

  state: string | null;
  district: string | null;
  mandal: string | null;
  sangam: string | null;
  place: string | null;
  address: string | null;

  description: string | null;
  map_url: string | null;

  contact: string | null;

  annadanam: boolean;
  accommodation: boolean;

  created_at?: string;
  updated_at?: string;
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminSatramsPage() {
  const [satrams, setSatrams] = useState<Satram[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [selectedState, setSelectedState] =
    useState("All States");

  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");

  const [selectedMandal, setSelectedMandal] =
    useState("All Mandals");

  const [selectedSangam, setSelectedSangam] =
    useState("All Sangams");

  const [currentPage, setCurrentPage] = useState(1);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const rowsPerPage = 5;

  /* =========================================================
     GET SATRAMS
  ========================================================= */

  useEffect(() => {
    fetchSatrams();
  }, []);

  const fetchSatrams = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(SATRAMS_API, {
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
                `Failed to fetch satrams: ${response.status}`,
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

      setSatrams(list);
    } catch (err) {
      console.error(
        "Error fetching satrams:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load satrams. Please check the backend server.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     STATES
  ========================================================= */

  const states = useMemo(() => {
    const values = satrams
      .map((satram) => satram.state?.trim())
      .filter(Boolean) as string[];

    return [
      "All States",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [satrams]);

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    let data = satrams;

    if (selectedState !== "All States") {
      data = data.filter(
        (satram) =>
          satram.state === selectedState,
      );
    }

    const values = data
      .map((satram) => satram.district?.trim())
      .filter(Boolean) as string[];

    return [
      "All Districts",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [satrams, selectedState]);

  /* =========================================================
     MANDALS
  ========================================================= */

  const mandals = useMemo(() => {
    let data = satrams;

    if (selectedState !== "All States") {
      data = data.filter(
        (satram) =>
          satram.state === selectedState,
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (satram) =>
          satram.district ===
          selectedDistrict,
      );
    }

    const values = data
      .map((satram) => satram.mandal?.trim())
      .filter(Boolean) as string[];

    return [
      "All Mandals",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [
    satrams,
    selectedState,
    selectedDistrict,
  ]);

  /* =========================================================
     SANGAMS
  ========================================================= */

  const sangams = useMemo(() => {
    let data = satrams;

    if (selectedState !== "All States") {
      data = data.filter(
        (satram) =>
          satram.state === selectedState,
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (satram) =>
          satram.district ===
          selectedDistrict,
      );
    }

    if (selectedMandal !== "All Mandals") {
      data = data.filter(
        (satram) =>
          satram.mandal === selectedMandal,
      );
    }

    const values = data
      .map((satram) => satram.sangam?.trim())
      .filter(Boolean) as string[];

    return [
      "All Sangams",
      ...Array.from(new Set(values)).sort(),
    ];
  }, [
    satrams,
    selectedState,
    selectedDistrict,
    selectedMandal,
  ]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredSatrams = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return satrams.filter((satram) => {
      const stateMatch =
        selectedState === "All States" ||
        satram.state === selectedState;

      const districtMatch =
        selectedDistrict === "All Districts" ||
        satram.district === selectedDistrict;

      const mandalMatch =
        selectedMandal === "All Mandals" ||
        satram.mandal === selectedMandal;

      const sangamMatch =
        selectedSangam === "All Sangams" ||
        satram.sangam === selectedSangam;

      if (!searchValue) {
        return (
          stateMatch &&
          districtMatch &&
          mandalMatch &&
          sangamMatch
        );
      }

     const searchText = `
  ${satram.name || ""}
  ${satram.state || ""}
  ${satram.district || ""}
  ${satram.mandal || ""}
  ${satram.sangam || ""}
  ${satram.place || ""}
  ${satram.address || ""}
  ${satram.description || ""}
  ${satram.map_url || ""}
  ${satram.contact || ""}
`.toLowerCase();

      const searchMatch =
        searchText.includes(searchValue);

      return (
        stateMatch &&
        districtMatch &&
        mandalMatch &&
        sangamMatch &&
        searchMatch
      );
    });
  }, [
    satrams,
    search,
    selectedState,
    selectedDistrict,
    selectedMandal,
    selectedSangam,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredSatrams.length / rowsPerPage,
  );

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

  const currentSatrams =
    filteredSatrams.slice(
      indexOfFirstRow,
      indexOfLastRow,
    );

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");

    setSelectedState("All States");

    setSelectedDistrict("All Districts");

    setSelectedMandal("All Mandals");

    setSelectedSangam("All Sangams");

    setCurrentPage(1);

    setOpenMenuId(null);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (
    value: string,
  ) => {
    setSearch(value);

    setCurrentPage(1);

    setOpenMenuId(null);
  };

  /* =========================================================
     STATE CHANGE
  ========================================================= */

  const handleStateChange = (
    value: string,
  ) => {
    setSelectedState(value);

    setSelectedDistrict(
      "All Districts",
    );

    setSelectedMandal(
      "All Mandals",
    );

    setSelectedSangam(
      "All Sangams",
    );

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

    setSelectedMandal(
      "All Mandals",
    );

    setSelectedSangam(
      "All Sangams",
    );

    setCurrentPage(1);

    setOpenMenuId(null);
  };

  /* =========================================================
     MANDAL CHANGE
  ========================================================= */

  const handleMandalChange = (
    value: string,
  ) => {
    setSelectedMandal(value);

    setSelectedSangam(
      "All Sangams",
    );

    setCurrentPage(1);

    setOpenMenuId(null);
  };

  /* =========================================================
     SANGAM CHANGE
  ========================================================= */

  const handleSangamChange = (
    value: string,
  ) => {
    setSelectedSangam(value);

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
        `${SATRAMS_API}/${id}`,
        {
          method: "DELETE",
        },
      );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                "Failed to delete satram",
        );
      }

      setSatrams((current) =>
        current.filter(
          (satram) =>
            satram.id !== id,
        ),
      );

      setOpenMenuId(null);

      /*
       * If current page becomes empty,
       * move to previous page.
       */

      if (
        currentSatrams.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage(
          (page) => page - 1,
        );
      }
    } catch (err) {
      console.error(
        "Delete satram error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete satram.",
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
                <FaUtensils />
              </div>

              <div>

                <h2 className="text-2xl font-semibold text-gray-900">
                  Satram Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage Arya Vysya Annadana
                  Satrams and their details.
                </p>

              </div>

            </div>

          </div>

          {/* ADD SATRAM */}

          <Link
            href="/admin/satrams/add"
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

            Add Satram
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
                lg:grid-cols-[1fr_180px_180px_180px_180px_auto]
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
                    Search satram, place, district, mandal or Sangam...
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

              {/* STATE */}

              <select
                value={selectedState}
                onChange={(e) =>
                  handleStateChange(
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

                {states.map(
                  (state) => (
                    <option
                      key={state}
                      value={state}
                    >
                      {state}
                    </option>
                  ),
                )}

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

              {/* MANDAL */}

              <select
                value={selectedMandal}
                onChange={(e) =>
                  handleMandalChange(
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

                {mandals.map(
                  (mandal) => (
                    <option
                      key={mandal}
                      value={mandal}
                    >
                      {mandal}
                    </option>
                  ),
                )}

              </select>

              {/* SANGAM */}

              <select
                value={selectedSangam}
                onChange={(e) =>
                  handleSangamChange(
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

                {sangams.map(
                  (sangam) => (
                    <option
                      key={sangam}
                      value={sangam}
                    >
                      {sangam}
                    </option>
                  ),
                )}

              </select>

              {/* RESET */}

              {(search ||
                selectedState !==
                  "All States" ||
                selectedDistrict !==
                  "All Districts" ||
                selectedMandal !==
                  "All Mandals" ||
                selectedSangam !==
                  "All Sangams") && (
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
                  {filteredSatrams.length}
                </span>{" "}

                satram
                {filteredSatrams.length !==
                1
                  ? "s"
                  : ""}

              </p>

              <div className="flex flex-wrap gap-2">

                {selectedState !==
                  "All States" && (
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
                    State:{" "}
                    {selectedState}
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

                {selectedMandal !==
                  "All Mandals" && (
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
                    Mandal:{" "}
                    {selectedMandal}
                  </span>
                )}

                {selectedSangam !==
                  "All Sangams" && (
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
                    Sangam:{" "}
                    {selectedSangam}
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
                onClick={fetchSatrams}
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

            <table className="w-full min-w-[1500px]">

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
                    Satram
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    State
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    District
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Mandal
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Sangam
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Place
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Contact
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Services
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
                          Loading satrams...
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : currentSatrams.length >
                  0 ? (

                  currentSatrams.map(
                    (satram) => (
                      <tr
                        key={satram.id}
                        className="
                          transition-colors
                          hover:bg-gray-50/70
                        "
                      >

                        {/* SATRAM */}

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
                              <FaUtensils />
                            </div>

                            <div className="min-w-0">

                              <p
                                className="
                                  max-w-[320px]
                                  truncate
                                  font-semibold
                                  text-gray-800
                                "
                              >
                                {satram.name ||
                                  "-"}
                              </p>

                              <p className="mt-0.5 text-xs text-gray-400">
                                ID #
                                {satram.id}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* STATE */}

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
                            {satram.state ||
                              "-"}
                          </span>

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
                            {satram.district ||
                              "-"}
                          </span>

                        </td>

                        {/* MANDAL */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <FaMapMarkerAlt className="text-xs text-gray-400" />

                            <span className="text-sm text-gray-600">
                              {satram.mandal ||
                                "-"}
                            </span>

                          </div>

                        </td>

                        {/* SANGAM */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <FaUsers className="text-xs text-gray-400" />

                            <span className="max-w-[230px] truncate text-sm text-gray-600">
                              {satram.sangam ||
                                "-"}
                            </span>

                          </div>

                        </td>

                        {/* PLACE */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-2">

                            <FaMapMarkerAlt className="text-xs text-gray-400" />

                            <span className="text-sm text-gray-600">
                              {satram.place ||
                                "-"}
                            </span>

                          </div>

                        </td>

                        {/* CONTACT */}

                        <td className="px-6 py-4">

                          {satram.contact ? (
                            <div className="flex items-center gap-2">

                              <FaPhoneAlt className="text-xs text-gray-400" />

                              <span className="whitespace-nowrap text-sm text-gray-600">
                                {satram.contact}
                              </span>

                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">
                              -
                            </span>
                          )}

                        </td>

                        {/* SERVICES */}

                        <td className="px-6 py-4">

                          <div className="flex flex-col gap-1.5">

                            {satram.annadanam && (
                              <span
                                className="
                                  inline-flex
                                  w-fit
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-green-50
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-green-700
                                "
                              >
                                <FaCheckCircle />

                                Annadanam
                              </span>
                            )}

                            {satram.accommodation && (
                              <span
                                className="
                                  inline-flex
                                  w-fit
                                  items-center
                                  gap-1.5
                                  rounded-full
                                  bg-blue-50
                                  px-2.5
                                  py-1
                                  text-xs
                                  font-semibold
                                  text-blue-700
                                "
                              >
                                <FaBed />

                                Accommodation
                              </span>
                            )}

                            {!satram.annadanam &&
                              !satram.accommodation && (
                                <span className="text-sm text-gray-400">
                                  -
                                </span>
                              )}

                          </div>

                        </td>

                        {/* CREATE DATE */}

                        <td className="px-6 py-4">

                          <div className="flex flex-col">

                            <span className="whitespace-nowrap text-sm font-medium text-gray-700">
                              {formatDate(
                                satram.created_at,
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
                                aria-label={`Actions for ${satram.name}`}
                                aria-expanded={
                                  openMenuId ===
                                  satram.id
                                }
                                onClick={() =>
                                  toggleMenu(
                                    satram.id,
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
                                satram.id && (
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
                                    href={`/admin/satrams/edit/${satram.id}`}
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
                                        satram.id,
                                        satram.name,
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
                          <FaUtensils className="text-gray-300" />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          No satrams found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Try changing the search
                          or filters.
                        </p>

                        {(search ||
                          selectedState !==
                            "All States" ||
                          selectedDistrict !==
                            "All Districts" ||
                          selectedMandal !==
                            "All Mandals" ||
                          selectedSangam !==
                            "All Sangams") && (
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
                {filteredSatrams.length ===
                0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}

              to{" "}

              <span className="font-semibold text-gray-700">
                {Math.min(
                  indexOfLastRow,
                  filteredSatrams.length,
                )}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-700">
                {filteredSatrams.length}
              </span>{" "}

              satrams

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