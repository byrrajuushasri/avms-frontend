"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaUserPlus,
  FaUsers,
  FaBuilding,
  FaSearch,
  FaChevronDown,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const EXECUTIVE_API = `${BACKEND_URL}/executive-bodies`;

/* =====================================================
   TYPE
===================================================== */

type ExecutiveBody = {
  id: number;
  executive_body: string;
  state?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
  title: string;
  formation_date: string;
  description: string;
};

/* =====================================================
   TELANGANA 33 DISTRICTS
===================================================== */

const TELANGANA_DISTRICTS = [
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hanamkonda",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar Bhupalapally",
  "Jogulamba Gadwal",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Komaram Bheem Asifabad",
  "Mahabubabad",
  "Mahabubnagar",
  "Mancherial",
  "Medak",
  "Medchal-Malkajgiri",
  "Mulugu",
  "Nagarkurnool",
  "Nalgonda",
  "Narayanpet",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna Sircilla",
  "Rangareddy",
  "Sangareddy",
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yadadri Bhuvanagiri",
];

/* =====================================================
   PAGE
===================================================== */

export default function SangamBodyPage() {
  const [bodies, setBodies] = useState<ExecutiveBody[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [selectedMandal, setSelectedMandal] =
    useState("");

  const [search, setSearch] = useState("");

  /* =====================================================
     FETCH EXECUTIVE BODIES
  ===================================================== */

  useEffect(() => {
    const fetchSangamBodies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(EXECUTIVE_API, {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            Array.isArray(data?.message)
              ? data.message.join(", ")
              : data?.message ||
                  "Failed to fetch Sangam Bodies",
          );
        }

        const list: ExecutiveBody[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];

        /*
          Accept BOTH:

          Sangam Body
          Sangham Body
        */

        const sangamBodies = list.filter((item) => {
          const bodyType = item.executive_body
            ?.trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

          return (
            bodyType === "sangam body" ||
            bodyType === "sangham body"
          );
        });

        setBodies(sangamBodies);
      } catch (err) {
        console.error(
          "Sangam Body GET error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load Sangam Bodies",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSangamBodies();
  }, []);

  /* =====================================================
     MANDALS BASED ON SELECTED DISTRICT
  ===================================================== */

  const mandals = useMemo(() => {
    if (!selectedDistrict) {
      return [];
    }

    const uniqueMandals = new Set<string>();

    bodies.forEach((body) => {
      const bodyDistrict =
        body.district?.trim().toLowerCase();

      const selected =
        selectedDistrict.trim().toLowerCase();

      if (bodyDistrict === selected) {
        const mandal = body.mandal?.trim();

        if (mandal) {
          uniqueMandals.add(mandal);
        }
      }
    });

    return Array.from(uniqueMandals).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [bodies, selectedDistrict]);

  /* =====================================================
     FILTER RESULTS
  ===================================================== */

  const filteredBodies = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return bodies.filter((body) => {
      const bodyDistrict =
        body.district?.trim().toLowerCase();

      const bodyMandal =
        body.mandal?.trim().toLowerCase();

      const selectedDistrictText =
        selectedDistrict.trim().toLowerCase();

      const selectedMandalText =
        selectedMandal.trim().toLowerCase();

      const matchesDistrict =
        !selectedDistrict ||
        bodyDistrict === selectedDistrictText;

      const matchesMandal =
        !selectedMandal ||
        bodyMandal === selectedMandalText;

      const matchesSearch =
        !searchText ||
        body.executive_body
          ?.toLowerCase()
          .includes(searchText) ||
        body.title
          ?.toLowerCase()
          .includes(searchText) ||
        body.state
          ?.toLowerCase()
          .includes(searchText) ||
        body.district
          ?.toLowerCase()
          .includes(searchText) ||
        body.mandal
          ?.toLowerCase()
          .includes(searchText) ||
        body.sangham
          ?.toLowerCase()
          .includes(searchText) ||
        body.description
          ?.toLowerCase()
          .includes(searchText);

      return (
        matchesDistrict &&
        matchesMandal &&
        matchesSearch
      );
    });
  }, [
    bodies,
    selectedDistrict,
    selectedMandal,
    search,
  ]);

  /* =====================================================
     DISTRICT CHANGE
  ===================================================== */

  const handleDistrictChange = (
    value: string,
  ) => {
    setSelectedDistrict(value);

    // Reset mandal
    setSelectedMandal("");
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
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

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSelectedDistrict("");
    setSelectedMandal("");
    setSearch("");
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8 sm:py-12">

      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="h-1.5 bg-[#8B1E3F]" />

          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaBuilding className="text-2xl" />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B1E3F]">
                    Executive Body
                  </p>

                  <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                    Sangam Body
                  </h1>

                </div>

              </div>

              <div className="rounded-xl bg-gray-50 px-5 py-3 text-center">

                <p className="text-xs font-medium text-gray-500">
                  Total Records
                </p>

                <p className="mt-1 text-xl font-bold text-[#8B1E3F]">
                  {bodies.length}
                </p>

              </div>

            </div>

            <div className="mt-6 border-t border-gray-100 pt-5">

              <p className="max-w-4xl text-sm leading-7 text-gray-600 sm:text-base">
                The Sangam Body represents the organization
                at the community level. Members are responsible
                for coordinating activities, supporting the
                community, and contributing to the development
                and welfare of the Arya Vysya community.
              </p>

            </div>

          </div>
        </div>

        {/* =================================================
            SEARCH & FILTER
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">

            <h2 className="text-lg font-bold text-gray-900">
              Search & Filter
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a district to view the available
              Sangam mandals.
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            {/* DISTRICT */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select District
              </label>

              <div className="relative">

                <select
                  value={selectedDistrict}
                  onChange={(e) =>
                    handleDistrictChange(
                      e.target.value,
                    )
                  }
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-[#8B1E3F]/10"
                >

                  <option value="">
                    All Districts
                  </option>

                  {TELANGANA_DISTRICTS.map(
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

                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                33 Telangana Districts
              </p>

            </div>

            {/* MANDAL */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Select Mandal
              </label>

              <div className="relative">

                <select
                  value={selectedMandal}
                  onChange={(e) =>
                    setSelectedMandal(
                      e.target.value,
                    )
                  }
                  disabled={!selectedDistrict}
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-[#8B1E3F]/10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                >

                  <option value="">
                    {selectedDistrict
                      ? mandals.length > 0
                        ? "All Mandals"
                        : "No Mandals Available"
                      : "Select District First"}
                  </option>

                  {mandals.map((mandal) => (
                    <option
                      key={mandal}
                      value={mandal}
                    >
                      {mandal}
                    </option>
                  ))}

                </select>

                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

              </div>

              <p className="mt-1.5 text-xs text-gray-400">
                {selectedDistrict
                  ? `${mandals.length} Mandal${
                      mandals.length !== 1
                        ? "s"
                        : ""
                    } available`
                  : "Select district first"}
              </p>

            </div>

            {/* SEARCH */}

            <div>

              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Search
              </label>

              <div className="relative">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search title, mandal, sangham..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-[#8B1E3F]/10"
                />

              </div>

            </div>

          </div>

          {/* ACTIVE FILTERS */}

          {(selectedDistrict ||
            selectedMandal ||
            search) && (

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">

              <span className="text-xs font-semibold text-gray-500">
                Active Filters:
              </span>

              {selectedDistrict && (
                <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-semibold text-[#8B1E3F]">
                  District: {selectedDistrict}
                </span>
              )}

              {selectedMandal && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  Mandal: {selectedMandal}
                </span>
              )}

              {search && (
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                  Search: {search}
                </span>
              )}

              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto text-xs font-semibold text-[#8B1E3F] hover:underline"
              >
                Clear All
              </button>

            </div>
          )}

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (

          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {error}
          </div>

        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">

            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Loading Sangam Bodies...
            </p>

          </div>

        ) : (

          <>

            {/* =================================================
                RESULT HEADER
            ================================================= */}

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Sangam Body Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-[#8B1E3F]">
                    {filteredBodies.length}
                  </span>{" "}
                  record
                  {filteredBodies.length !== 1
                    ? "s"
                    : ""}
                </p>

              </div>

            </div>

            {/* =================================================
                RESULTS
            ================================================= */}

            {filteredBodies.length > 0 ? (

              <div className="grid gap-5 md:grid-cols-2">

                {filteredBodies.map((body) => (

                  <div
                    key={body.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#d8b9c5] hover:shadow-lg"
                  >

                    {/* TOP BORDER */}

                    <div className="h-1 bg-[#8B1E3F]" />

                    <div className="p-6">

                      {/* BODY TYPE + ID */}

                      <div className="flex items-center justify-between gap-3">

                        <span className="inline-flex rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-bold text-[#8B1E3F]">
                          {body.executive_body}
                        </span>

                        <span className="text-xs font-medium text-gray-400">
                          #{body.id}
                        </span>

                      </div>

                      {/* TITLE */}

                      <h3 className="mt-4 text-xl font-bold leading-snug text-gray-900">
                        {body.title}
                      </h3>

                      {/* LOCATION GRID */}

                      <div className="mt-5 grid gap-3 sm:grid-cols-2">

                        {/* STATE */}

                        {body.state && (

                          <div className="rounded-xl bg-gray-50 p-3">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                              State
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {body.state}
                            </p>

                          </div>

                        )}

                        {/* DISTRICT */}

                        {body.district && (

                          <div className="rounded-xl bg-gray-50 p-3">

                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <FaMapMarkerAlt className="text-[#8B1E3F]" />
                              District
                            </div>

                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {body.district}
                            </p>

                          </div>

                        )}

                        {/* MANDAL */}

                        {body.mandal && (

                          <div className="rounded-xl bg-gray-50 p-3">

                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <FaMapMarkerAlt className="text-[#8B1E3F]" />
                              Mandal
                            </div>

                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {body.mandal}
                            </p>

                          </div>

                        )}

                        {/* SANGHAM */}

                        {body.sangham && (

                          <div className="rounded-xl bg-gray-50 p-3">

                            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                              <FaBuilding className="text-[#8B1E3F]" />
                              Sangham
                            </div>

                            <p className="mt-1 text-sm font-semibold text-gray-800">
                              {body.sangham}
                            </p>

                          </div>

                        )}

                      </div>

                      {/* FORMATION DATE */}

                      {body.formation_date && (

                        <div className="mt-3 rounded-xl bg-gray-50 p-3">

                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-400">

                            <FaCalendarAlt className="text-[#8B1E3F]" />

                            Formation Date

                          </div>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formatDate(
                              body.formation_date,
                            )}
                          </p>

                        </div>

                      )}

                      {/* DESCRIPTION */}

                      {body.description && (

                        <div className="mt-5 border-t border-gray-100 pt-5">

                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Description
                          </p>

                          <p className="mt-2 text-sm leading-7 text-gray-600">
                            {body.description}
                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              /* =================================================
                 NO RESULTS
              ================================================= */

              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
                  <FaUsers className="text-3xl text-gray-300" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-800">
                  No Sangam Body Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  No Sangam Body records match your
                  selected district, mandal, or search.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl bg-[#8B1E3F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#741832]"
                >
                  Clear Filters
                </button>

              </div>

            )}

             
          </>

        )}

      </div>
    </main>
  );
}