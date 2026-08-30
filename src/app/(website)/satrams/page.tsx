"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBuilding,
  FaCheckCircle,
  FaChevronDown,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaUtensils,
  FaUsers,
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

type Satram = {
  id: number;
  name: string;
  state: string;
  district: string;
  mandal: string;
  sangam: string;
  place: string;
  address: string;
  contact: string;
  description?: string;
  map_url?: string;
  annadanam: boolean;
  accommodation: boolean;
};

/* =========================================================
   PAGE
========================================================= */

export default function StateSatramsPage() {
  /* =========================================================
     API STATE
  ========================================================= */

  const [satramData, setSatramData] = useState<Satram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FILTER STATE
  ========================================================= */

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

  const itemsPerPage = 8;

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

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to fetch Satrams (${response.status})`
        );
      }

      /*
       * Supports both:
       *
       * [
       *   { id: 1, name: "..." }
       * ]
       *
       * and:
       *
       * {
       *   data: [
       *     { id: 1, name: "..." }
       *   ]
       * }
       */

      const result = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      const formattedData: Satram[] = result.map(
        (item: any) => ({
          id: Number(item.id),

          name: item.name ?? "",

          state: item.state ?? "",

          district: item.district ?? "",

          mandal: item.mandal ?? "",

          sangam: item.sangam ?? "",

          place: item.place ?? "",

          address: item.address ?? "",

          contact: item.contact ?? "",

          description:
            item.description ?? "",

          map_url:
            item.map_url ??
            item.mapUrl ??
            "",

          annadanam:
            item.annadanam === true ||
            item.annadanam === 1 ||
            item.annadanam === "1",

          accommodation:
            item.accommodation === true ||
            item.accommodation === 1 ||
            item.accommodation === "1",
        })
      );

      setSatramData(formattedData);
    } catch (err) {
      console.error(
        "Fetch Satrams Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load Satrams."
      );

      setSatramData([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DROPDOWN DATA
  ========================================================= */

  const states = useMemo(() => {
    return [
      "All States",
      ...Array.from(
        new Set(
          satramData
            .map((item) => item.state)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [satramData]);

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    let data = satramData;

    if (selectedState !== "All States") {
      data = data.filter(
        (item) => item.state === selectedState
      );
    }

    return [
      "All Districts",
      ...Array.from(
        new Set(
          data
            .map((item) => item.district)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [satramData, selectedState]);

  /* =========================================================
     MANDALS
  ========================================================= */

  const mandals = useMemo(() => {
    let data = satramData;

    if (selectedState !== "All States") {
      data = data.filter(
        (item) => item.state === selectedState
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (item) =>
          item.district === selectedDistrict
      );
    }

    return [
      "All Mandals",
      ...Array.from(
        new Set(
          data
            .map((item) => item.mandal)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [
    satramData,
    selectedState,
    selectedDistrict,
  ]);

  /* =========================================================
     SANGAMS
  ========================================================= */

  const sangams = useMemo(() => {
    let data = satramData;

    if (selectedState !== "All States") {
      data = data.filter(
        (item) => item.state === selectedState
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (item) =>
          item.district === selectedDistrict
      );
    }

    if (selectedMandal !== "All Mandals") {
      data = data.filter(
        (item) =>
          item.mandal === selectedMandal
      );
    }

    return [
      "All Sangams",
      ...Array.from(
        new Set(
          data
            .map((item) => item.sangam)
            .filter(Boolean)
        )
      ).sort(),
    ];
  }, [
    satramData,
    selectedState,
    selectedDistrict,
    selectedMandal,
  ]);

  /* =========================================================
     FILTER DATA
  ========================================================= */

  const filteredSatrams = useMemo(() => {
    const keyword = search
      .toLowerCase()
      .trim();

    return satramData.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.name
          .toLowerCase()
          .includes(keyword) ||
        item.state
          .toLowerCase()
          .includes(keyword) ||
        item.district
          .toLowerCase()
          .includes(keyword) ||
        item.mandal
          .toLowerCase()
          .includes(keyword) ||
        item.sangam
          .toLowerCase()
          .includes(keyword) ||
        item.place
          .toLowerCase()
          .includes(keyword) ||
        item.address
          .toLowerCase()
          .includes(keyword);

      const matchesState =
        selectedState === "All States" ||
        item.state === selectedState;

      const matchesDistrict =
        selectedDistrict ===
          "All Districts" ||
        item.district ===
          selectedDistrict;

      const matchesMandal =
        selectedMandal === "All Mandals" ||
        item.mandal === selectedMandal;

      const matchesSangam =
        selectedSangam === "All Sangams" ||
        item.sangam === selectedSangam;

      return (
        matchesSearch &&
        matchesState &&
        matchesDistrict &&
        matchesMandal &&
        matchesSangam
      );
    });
  }, [
    satramData,
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
    filteredSatrams.length / itemsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const startIndex =
    (safeCurrentPage - 1) *
    itemsPerPage;

  const paginatedSatrams =
    filteredSatrams.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* =========================================================
     RESET PAGE
  ========================================================= */

  const resetPage = () => {
    setCurrentPage(1);
  };

  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setSelectedState("All States");
    setSelectedDistrict("All Districts");
    setSelectedMandal("All Mandals");
    setSelectedSangam("All Sangams");
    setCurrentPage(1);
  };

  /* =========================================================
     STATE CHANGE
  ========================================================= */

  const handleStateChange = (
    value: string
  ) => {
    setSelectedState(value);
    setSelectedDistrict("All Districts");
    setSelectedMandal("All Mandals");
    setSelectedSangam("All Sangams");
    resetPage();
  };

  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const handleDistrictChange = (
    value: string
  ) => {
    setSelectedDistrict(value);
    setSelectedMandal("All Mandals");
    setSelectedSangam("All Sangams");
    resetPage();
  };

  /* =========================================================
     MANDAL CHANGE
  ========================================================= */

  const handleMandalChange = (
    value: string
  ) => {
    setSelectedMandal(value);
    setSelectedSangam("All Sangams");
    resetPage();
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const stateCount = new Set(
    satramData
      .map((item) => item.state)
      .filter(Boolean)
  ).size;

  const districtCount = new Set(
    satramData
      .map((item) => item.district)
      .filter(Boolean)
  ).size;

  const sangamCount = new Set(
    satramData
      .map((item) => item.sangam)
      .filter(Boolean)
  ).size;

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="flex min-h-screen items-center justify-center">
          <div className="text-center">

            <div
              className="
                mx-auto
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-rose-600
              "
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading Satrams...
            </p>

          </div>
        </section>
      </main>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* Heading */}

          <div className="max-w-4xl">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">

              <FaUtensils className="text-rose-600" />

              Arya Vysya Annadana Satrams

            </div>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg">
              Explore Arya Vysya Annadana Satrams
              across different states, districts,
              mandals and Sangams in one place.
            </p>

          </div>

          {/* Statistics */}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">

            {/* Satrams */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                  <FaBuilding />
                </div>

                <div>

                  <p className="text-xl font-extrabold text-slate-900">
                    {satramData.length}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    Satrams
                  </p>

                </div>

              </div>

            </div>

            {/* States */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <p className="text-xl font-extrabold text-slate-900">
                    {stateCount}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    States
                  </p>

                </div>

              </div>

            </div>

            {/* Districts */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <p className="text-xl font-extrabold text-slate-900">
                    {districtCount}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    Districts
                  </p>

                </div>

              </div>

            </div>

            {/* Sangams */}

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-md">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FaUsers />
                </div>

                <div>

                  <p className="text-xl font-extrabold text-slate-900">
                    {sangamCount}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    Sangams
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* API ERROR */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}

            <button
              type="button"
              onClick={fetchSatrams}
              className="ml-3 font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Search + Filters */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          {/* Search */}

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              placeholder="Search Satram, place, district, mandal or Sangam..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
            />

          </div>

          {/* Filters */}

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <FilterSelect
              label="State"
              value={selectedState}
              options={states}
              onChange={handleStateChange}
            />

            <FilterSelect
              label="District"
              value={selectedDistrict}
              options={districts}
              onChange={handleDistrictChange}
            />

            <FilterSelect
              label="Mandal"
              value={selectedMandal}
              options={mandals}
              onChange={handleMandalChange}
            />

            <FilterSelect
              label="Sangam"
              value={selectedSangam}
              options={sangams}
              onChange={(value) => {
                setSelectedSangam(value);
                resetPage();
              }}
            />

          </div>

          {/* Filter footer */}

          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-600">

              Showing{" "}

              <span className="font-bold text-rose-700">
                {filteredSatrams.length}
              </span>{" "}

              Satrams

            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="w-fit rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
            >
              Clear All Filters
            </button>

          </div>

        </div>

        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="mt-7">

          {paginatedSatrams.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-600">

                <FaSearch className="text-2xl" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-800">
                No Satrams Found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filter
                selections.
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-lg bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Reset Filters
              </button>

            </div>

          ) : (

            <>

              {/* Results header */}

              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-rose-600">
                    Satram Directory
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Annadana Satrams
                  </h2>

                </div>

                <p className="text-sm text-slate-500">
                  Page {safeCurrentPage} of{" "}
                  {Math.max(totalPages, 1)}
                </p>

              </div>

              {/* Cards */}

              <div className="grid gap-5 lg:grid-cols-2">

                {paginatedSatrams.map(
                  (satram) => (
                    <SatramCard
                      key={satram.id}
                      satram={satram}
                    />
                  )
                )}

              </div>

              {/* Pagination */}

              {totalPages > 1 && (

                <div className="mt-8 flex items-center justify-center gap-2">

                  <button
                    type="button"
                    disabled={
                      safeCurrentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            page - 1,
                            1
                          )
                      )
                    }
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  <div className="hidden items-center gap-1 sm:flex">

                    {Array.from(
                      {
                        length: totalPages,
                      },
                      (_, index) =>
                        index + 1
                    ).map((page) => (

                      <button
                        type="button"
                        key={page}
                        onClick={() =>
                          setCurrentPage(
                            page
                          )
                        }
                        className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${
                          safeCurrentPage ===
                          page
                            ? "bg-rose-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                        }`}
                      >
                        {page}
                      </button>

                    ))}

                  </div>

                  <button
                    type="button"
                    disabled={
                      safeCurrentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            page + 1,
                            totalPages
                          )
                      )
                    }
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <FaArrowRight />
                  </button>

                </div>

              )}

            </>

          )}

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <div className="relative">

        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-rose-500 focus:bg-white focus:ring-2 focus:ring-rose-100"
        >

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>

        <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400" />

      </div>

    </div>
  );
}

/* =========================================================
   SATRAM CARD
========================================================= */

function SatramCard({
  satram,
}: {
  satram: Satram;
}) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Top */}

      <div className="border-b border-slate-100 bg-gradient-to-r from-rose-50 to-orange-50 p-5">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-600 text-xl text-white shadow-sm">
            <FaUtensils />
          </div>

          <div className="min-w-0 flex-1">

            <h3 className="text-lg font-bold leading-6 text-slate-900 transition group-hover:text-rose-700">
              {satram.name}
            </h3>

            <div className="mt-2 flex flex-wrap gap-2">

              {satram.state && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
                  {satram.state}
                </span>
              )}

              {satram.district && (
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  {satram.district}
                </span>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Details */}

      <div className="p-5">

        <div className="grid gap-4 sm:grid-cols-2">

          <DetailItem
            icon={<FaMapMarkerAlt />}
            label="Place"
            value={satram.place || "-"}
          />

          <DetailItem
            icon={<FaMapMarkerAlt />}
            label="Mandal"
            value={satram.mandal || "-"}
          />

          <DetailItem
            icon={<FaUsers />}
            label="Sangam"
            value={satram.sangam || "-"}
          />

          <DetailItem
            icon={<FaPhoneAlt />}
            label="Contact"
            value={satram.contact || "-"}
          />

        </div>

        {/* Address */}

        {satram.address && (
          <div className="mt-4 rounded-xl bg-slate-50 p-3.5">

            <div className="flex gap-3">

              <FaMapMarkerAlt className="mt-1 shrink-0 text-rose-500" />

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Address
                </p>

                <p className="mt-1 text-sm leading-5 text-slate-700">
                  {satram.address}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Description */}

        {satram.description && (
          <div className="mt-4 rounded-xl border border-slate-100 bg-white p-3.5">

            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              Description
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              {satram.description}
            </p>

          </div>
        )}

        {/* Services */}

        <div className="mt-4 flex flex-wrap gap-2">

          {satram.annadanam && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
              <FaCheckCircle />
              Annadanam Available
            </span>
          )}

          {satram.accommodation && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
              <FaCheckCircle />
              Accommodation
            </span>
          )}

        </div>

        {/* Footer */}

        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs text-slate-400">
              District
            </p>

            <p className="text-sm font-bold text-slate-700">
              {satram.district || "-"}
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {/* MAP */}

            {satram.map_url && (
              <a
                href={satram.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <FaMapMarkerAlt />
                View Map
              </a>
            )}

            {/* CALL */}

            {satram.contact &&
              satram.contact !== "-" && (
                <a
                  href={`tel:${satram.contact}`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
                >
                  <FaPhoneAlt />
                  Call Satram
                </a>
              )}

          </div>

        </div>

      </div>

    </article>
  );
}

/* =========================================================
   DETAIL ITEM
========================================================= */

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-sm text-rose-600">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-semibold text-slate-700">
          {value}
        </p>

      </div>

    </div>
  );
}