"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaChevronDown,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

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
   API
===================================================== */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";



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
   DATE FORMAT
===================================================== */

const formatDate = (date: string) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* =====================================================
   PAGE
===================================================== */

export default function DistrictBodyPage() {
  const [bodies, setBodies] = useState<ExecutiveBody[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDistrict, setSelectedDistrict] =
    useState("");

  const [search, setSearch] = useState("");

  /* =====================================================
     FETCH DISTRICT EXECUTIVE BODIES
  ===================================================== */

  useEffect(() => {
    const fetchDistrictBodies = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(BACKEND_URL + "/executive-bodies", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            Array.isArray(data?.message)
              ? data.message.join(", ")
              : data?.message ||
                  "Failed to fetch District Bodies",
          );
        }

        const list: ExecutiveBody[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];

        /* ONLY DISTRICT BODY */

        const districtBodies = list.filter(
          (item) =>
            item.executive_body === "District Body",
        );

        setBodies(districtBodies);
      } catch (err) {
        console.error(
          "District Bodies GET error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load District Bodies",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDistrictBodies();
  }, []);

  /* =====================================================
     SEARCH + DISTRICT FILTER
  ===================================================== */

  const filteredBodies = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase();

    return bodies.filter((body) => {
      const matchesDistrict =
        !selectedDistrict ||
        body.district?.trim().toLowerCase() ===
          selectedDistrict.trim().toLowerCase();

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
        body.description
          ?.toLowerCase()
          .includes(searchText);

      return (
        matchesDistrict &&
        matchesSearch
      );
    });
  }, [
    bodies,
    selectedDistrict,
    search,
  ]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-l-4 border-[#8B1E3F] px-6 py-6 md:px-8">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                <FaBuilding className="text-xl" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#8B1E3F]">
                  Executive Body
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                  District Body
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                  View District Executive Bodies across all
                  33 Telangana districts. Select a district
                  or search to find specific executive bodies.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex items-center justify-between">

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Find District Body
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Filter by district or search by title and description.
              </p>
            </div>

            <div className="hidden rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-bold text-[#8B1E3F] sm:block">
              33 Districts
            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {/* DISTRICT */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
                Select District
              </label>

              <div className="relative">

                <select
                  value={selectedDistrict}
                  onChange={(e) =>
                    setSelectedDistrict(e.target.value)
                  }
                  className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-10 text-sm font-medium text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-[#8B1E3F]/10"
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
            </div>

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-500">
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
                  placeholder="Search title, district, description..."
                  className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#8B1E3F] focus:bg-white focus:ring-4 focus:ring-[#8B1E3F]/10"
                />

              </div>
            </div>

          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-14 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

            <p className="mt-4 text-sm font-medium text-gray-500">
              Loading District Bodies...
            </p>

          </div>

        ) : (

          <>

            {/* =================================================
                RESULT HEADER
            ================================================= */}

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-gray-900">
                  District Executive Bodies
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-bold text-[#8B1E3F]">
                    {filteredBodies.length}
                  </span>{" "}
                  District Body
                  {filteredBodies.length !== 1
                    ? " Records"
                    : " Record"}
                </p>

              </div>

            </div>

            {/* =================================================
                RESULTS
            ================================================= */}

            {filteredBodies.length > 0 ? (

              <div className="grid gap-6 lg:grid-cols-2">

                {filteredBodies.map((body) => (

                  <div
                    key={body.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9b6c2] hover:shadow-lg"
                  >

                    {/* CARD TOP */}

                    <div className="border-b border-gray-100 bg-gradient-to-r from-[#fff9fb] to-white px-6 py-5">

                      <div className="flex items-start justify-between gap-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#8B1E3F] text-white shadow-sm">
                            <FaBuilding />
                          </div>

                          <div>

                            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                              Executive Body
                            </p>

                            <span className="mt-1 inline-flex rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-bold text-[#8B1E3F]">
                              {body.executive_body}
                            </span>

                          </div>

                        </div>

                        <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-gray-500">
                          ID: {body.id}
                        </span>

                      </div>

                      {/* TITLE */}

                      <h3 className="mt-5 text-xl font-bold leading-7 text-gray-900">
                        {body.title}
                      </h3>

                    </div>

                    {/* CARD DETAILS */}

                    <div className="px-6 py-5">

                      {/* LOCATION */}

                      <div className="flex gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                          <FaMapMarkerAlt />
                        </div>

                        <div className="min-w-0">

                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Location
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {[body.state, body.district]
                              .filter(Boolean)
                              .join(" • ") || "—"}
                          </p>

                        </div>

                      </div>

                      {/* FORMATION DATE */}

                      <div className="mt-5 flex gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                          <FaCalendarAlt />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Formation Date
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {formatDate(
                              body.formation_date,
                            )}
                          </p>

                        </div>

                      </div>

                      {/* DESCRIPTION */}

                      <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4">

                        <div className="flex gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#8B1E3F] shadow-sm">
                            <FaFileAlt />
                          </div>

                          <div className="min-w-0">

                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              Description
                            </p>

                            <p className="mt-2 text-sm leading-6 text-gray-600">
                              {body.description || "—"}
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              /* =================================================
                 EMPTY
              ================================================= */

              <div className="rounded-2xl border border-gray-200 bg-white p-14 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                  <FaUsers className="text-2xl text-gray-400" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-800">
                  No District Body Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  No District Executive Body matches the
                  selected district or search criteria.
                </p>

              </div>

            )}

          </>

        )}

      </div>
    </main>
  );
}