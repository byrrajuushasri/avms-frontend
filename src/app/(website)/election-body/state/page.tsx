"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUserPlus,
  FaUsers,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

/* =====================================================
   API
===================================================== */

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

export default function StateBodyPage() {
  const [stateBodies, setStateBodies] = useState<
    ExecutiveBody[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     FETCH STATE BODY
  ===================================================== */

  useEffect(() => {
    fetchStateBodies();
  }, []);

  const fetchStateBodies = async () => {
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
                "Failed to fetch State Body",
        );
      }

      const list: ExecutiveBody[] = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      /* ONLY STATE BODY */

      const filtered = list.filter(
        (item: ExecutiveBody) =>
          item.executive_body
            ?.trim()
            .toLowerCase() === "state body",
      );

      setStateBodies(filtered);
    } catch (err) {
      console.error(
        "State Body GET error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load State Body",
      );
    } finally {
      setLoading(false);
    }
  };

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

          <div className="border-l-4 border-[#8B1E3F] px-6 py-7 md:px-8">

            <div className="flex items-start gap-4">

              {/* ICON */}

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f8eef2] text-[#8B1E3F]">
                <FaBuilding className="text-2xl" />
              </div>

              {/* TITLE */}

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B1E3F]">
                  Executive Body
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900 md:text-3xl">
                  State Body
                </h1>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
                  The State Body represents the organization
                  at the state level and coordinates
                  activities across districts and local
                  bodies for the development of the community.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">

            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />

            <p className="text-sm font-medium text-red-700">
              {error}
            </p>

          </div>
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center shadow-sm">

            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Loading State Body...
            </p>

          </div>

        ) : (

          <>

            {/* =================================================
                STATE BODY SECTION HEADER
            ================================================= */}

            {stateBodies.length > 0 && (

              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8B1E3F] text-white shadow-sm">
                    <FaBuilding />
                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-gray-900">
                      State Body Details
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      Official State Executive Body information
                    </p>

                  </div>

                </div>

                <div className="self-start rounded-full bg-[#f8eef2] px-4 py-2 text-xs font-bold text-[#8B1E3F] sm:self-auto">
                  {stateBodies.length}{" "}
                  {stateBodies.length === 1
                    ? "Record"
                    : "Records"}
                </div>

              </div>

            )}

            {/* =================================================
                STATE BODY RECORDS
            ================================================= */}

            {stateBodies.length > 0 ? (

              <div className="grid gap-6 lg:grid-cols-2">

                {stateBodies.map((body) => (

                  <div
                    key={body.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d8b8c3] hover:shadow-lg"
                  >

                    {/* =================================================
                        CARD HEADER
                    ================================================= */}

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

                    {/* =================================================
                        CARD CONTENT
                    ================================================= */}

                    <div className="px-6 py-5">

                      {/* LOCATION */}

                      <div className="flex gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                          <FaMapMarkerAlt />
                        </div>

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Location
                          </p>

                          <p className="mt-1 text-sm font-semibold text-gray-800">
                            {body.state || "Telangana"}
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
                              {body.description ||
                                "No description available."}
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
                 NO RECORD
              ================================================= */

              <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-14 text-center shadow-sm">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">

                  <FaBuilding className="text-2xl text-gray-400" />

                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-800">
                  State Body Not Available
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                  No State Body has been added from the
                  Admin Executive Bodies section yet.
                </p>

              </div>

            )}

          

          </>

        )}

      </div>
    </main>
  );
}