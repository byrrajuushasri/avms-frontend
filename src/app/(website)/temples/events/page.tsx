"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaPlaceOfWorship,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
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

type TempleEvent = {
  id: number;
  title: string;
  temple: string;
  area: string;
  district: string;
  date: string;
  time: string;
  description: string;
  type: string;
  created_at?: string | null;
  updated_at?: string | null;
};

/* =========================================================
   PAGE SIZE
========================================================= */

const EVENTS_PER_PAGE = 3;

/* =========================================================
   PAGE
========================================================= */

export default function TempleEventsPage() {
  const [events, setEvents] = useState<TempleEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedType, setSelectedType] =
    useState("All Events");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  /* =======================================================
     GET EVENTS
  ======================================================= */

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

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      const normalizedEvents: TempleEvent[] =
        list.map((event: any) => ({
          id: Number(event.id),

          title: event.title ?? "",

          temple: event.temple ?? "",

          area: event.area ?? "",

          district: event.district ?? "",

          date: event.date ?? "",

          time: event.time ?? "",

          description:
            event.description ?? "",

          type: event.type ?? "",

          created_at:
            event.created_at ??
            event.createdAt ??
            null,

          updated_at:
            event.updated_at ??
            event.updatedAt ??
            null,
        }));

      console.log(
        "Temple Events API Response:",
        data,
      );

      console.log(
        "Normalized Temple Events:",
        normalizedEvents,
      );

      setEvents(normalizedEvents);
    } catch (err) {
      console.error(
        "Error fetching temple events:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load temple events. Please check the backend server.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     EVENT TYPES
  ======================================================= */

  const eventTypes = useMemo(() => {
    const values = events
      .map((event) =>
        event.type?.trim(),
      )
      .filter(Boolean);

    return [
      "All Events",
      ...Array.from(
        new Set(values),
      ).sort(),
    ];
  }, [events]);

  /* =======================================================
     FILTER EVENTS
  ======================================================= */

  const filteredEvents = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return events.filter((event) => {
      const typeMatch =
        selectedType === "All Events" ||
        event.type === selectedType;

      const searchText = `
        ${event.title}
        ${event.temple}
        ${event.area}
        ${event.district}
        ${event.type}
        ${event.description}
        ${event.time}
      `.toLowerCase();

      const searchMatch =
        searchText.includes(searchValue);

      return (
        typeMatch &&
        searchMatch
      );
    });
  }, [
    events,
    selectedType,
    search,
  ]);

  /* =======================================================
     RESET PAGE WHEN FILTER / SEARCH CHANGES
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedType,
    search,
  ]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.ceil(
    filteredEvents.length /
      EVENTS_PER_PAGE,
  );

  const paginatedEvents = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      EVENTS_PER_PAGE;

    const endIndex =
      startIndex +
      EVENTS_PER_PAGE;

    return filteredEvents.slice(
      startIndex,
      endIndex,
    );
  }, [
    filteredEvents,
    currentPage,
  ]);

  /* =======================================================
     SAFE PAGE
  ======================================================= */

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /* =======================================================
     DATE FORMAT
  ======================================================= */

  const formatDate = (
    date?: string | null,
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

  /* =======================================================
     PAGE NUMBERS
  ======================================================= */

  const pageNumbers = useMemo(() => {
    if (totalPages <= 1) {
      return [];
    }

    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }, [totalPages]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#3d2525]">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="border-b border-[#ead9b5] bg-white py-12 md:py-14">
        <div className="mx-auto max-w-6xl px-6">

          <div className="flex items-start gap-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2d2]">
              <FaPlaceOfWorship className="text-2xl text-[#8a1025]" />
            </div>

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
                Temple Activities
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#650014] md:text-4xl">
                Vasavi Ammavari Temple Events
              </h1>

              <div className="mt-4 h-[2px] w-14 bg-[#d7a928]" />

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                View upcoming religious, devotional and community events
                conducted at Vasavi Kanyaka Parameshwari temples.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">

            {/* =================================================
                SIDEBAR
            ================================================== */}

            <aside className="h-fit rounded-xl border border-[#ead9b5] bg-white">

              <div className="border-b border-[#eee0c2] px-5 py-5">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                  Event Categories
                </p>

                <h2 className="mt-1 font-serif text-lg font-semibold text-[#650014]">
                  Events
                </h2>

              </div>

              <div className="p-3">

                {eventTypes.map((type) => {

                  const count =
                    type === "All Events"
                      ? events.length
                      : events.filter(
                          (event) =>
                            event.type === type,
                        ).length;

                  const active =
                    selectedType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setSelectedType(type)
                      }
                      className={`mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                        active
                          ? "bg-[#fff3d7] font-semibold text-[#650014]"
                          : "text-gray-600 hover:bg-[#fffaf0]"
                      }`}
                    >

                      <span>
                        {type}
                      </span>

                      <span
                        className={`text-xs ${
                          active
                            ? "text-[#9b1730]"
                            : "text-gray-400"
                        }`}
                      >
                        {count}
                      </span>

                    </button>
                  );
                })}

              </div>

              {/* INFORMATION CARD */}

              <div className="m-3 rounded-lg bg-[#650014] p-5 text-white">

                <FaCheckCircle className="text-xl text-[#f1c84b]" />

                <h3 className="mt-3 font-serif text-base font-semibold">
                  Devotional Activities
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/75">
                  Participate in temple poojas, festivals and community
                  devotional programs.
                </p>

              </div>

            </aside>

            {/* =================================================
                EVENTS CONTENT
            ================================================== */}

            <section>

              {/* SEARCH */}

              <div className="mb-8 flex items-center gap-3 rounded-xl border border-[#ead9b5] bg-white px-4 py-3">

                <FaSearch className="text-[#9b1730]" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value,
                    )
                  }
                  placeholder="Search event, temple, area or district..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

              {/* HEADING */}

              <div className="mb-7 flex flex-wrap items-end justify-between gap-4">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
                    Upcoming Programs
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#650014]">
                    {selectedType}
                  </h2>

                </div>

                <p className="text-sm text-gray-500">
                  {filteredEvents.length}{" "}
                  event
                  {filteredEvents.length !==
                  1
                    ? "s"
                    : ""}
                </p>

              </div>

              {/* =================================================
                  LOADING
              ================================================== */}

              {loading && (
                <div className="rounded-xl border border-[#ead9b5] bg-white px-6 py-16 text-center">

                  <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#eadfca] border-t-[#650014]" />

                  <p className="mt-5 text-sm text-gray-500">
                    Loading temple events...
                  </p>

                </div>
              )}

              {/* =================================================
                  ERROR
              ================================================== */}

              {!loading && error && (
                <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-12 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white">

                    <FaCalendarAlt className="text-xl text-red-400" />

                  </div>

                  <h3 className="mt-4 font-serif text-xl font-semibold text-red-700">
                    Unable to Load Events
                  </h3>

                  <p className="mt-2 text-sm text-red-500">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={fetchEvents}
                    className="mt-5 rounded-lg bg-[#650014] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8a1025]"
                  >
                    Try Again
                  </button>

                </div>
              )}

              {/* =================================================
                  EVENT CARDS
              ================================================== */}

              {!loading &&
                !error &&
                paginatedEvents.length >
                  0 && (
                  <div className="space-y-5">

                    {paginatedEvents.map(
                      (event) => (
                        <article
                          key={event.id}
                          className="group rounded-xl border border-[#eadfca] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7a928] hover:shadow-lg"
                        >

                          <div className="grid gap-6 md:grid-cols-[100px_1fr_auto] md:items-center">

                            {/* DATE */}

                            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-[#650014] text-white">

                              <FaCalendarAlt className="text-lg text-[#f1c84b]" />

                              <span className="mt-2 text-center text-xs font-semibold leading-4">
                                {formatDate(
                                  event.date,
                                )}
                              </span>

                            </div>

                            {/* DETAILS */}

                            <div>

                              <div className="flex flex-wrap items-center gap-3">

                                <span className="rounded-full bg-[#fff3d7] px-3 py-1 text-xs font-semibold text-[#8a1025]">
                                  {event.type ||
                                    "Event"}
                                </span>

                              </div>

                              <h3 className="mt-3 font-serif text-xl font-semibold text-[#650014]">
                                {event.title}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-gray-600">
                                {event.description}
                              </p>

                              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">

                                {/* TEMPLE */}

                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                  <FaPlaceOfWorship className="shrink-0 text-[#9b1730]" />

                                  <span>
                                    {event.temple ||
                                      "-"}
                                  </span>

                                </div>

                                {/* LOCATION */}

                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                  <FaMapMarkerAlt className="shrink-0 text-[#9b1730]" />

                                  <span>
                                    {event.area ||
                                      "-"}
                                    {event.district
                                      ? `, ${event.district}`
                                      : ""}
                                  </span>

                                </div>

                                {/* TIME */}

                                <div className="flex items-center gap-2 text-sm text-gray-500">

                                  <FaClock className="shrink-0 text-[#9b1730]" />

                                  <span>
                                    {event.time ||
                                      "-"}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* ACTION */}
 

                          </div>

                        </article>
                      ),
                    )}

                  </div>
                )}

              {/* =================================================
                  EMPTY
              ================================================== */}

              {!loading &&
                !error &&
                filteredEvents.length ===
                  0 && (
                  <div className="rounded-xl border border-[#ead9b5] bg-white px-6 py-16 text-center">

                    <FaCalendarAlt className="mx-auto text-4xl text-[#d7a928]" />

                    <h3 className="mt-4 font-serif text-xl font-semibold text-[#650014]">
                      No Events Found
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Try another event category or search term.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedType(
                          "All Events",
                        );
                        setSearch("");
                        setCurrentPage(1);
                      }}
                      className="mt-5 rounded-lg border border-[#650014] px-5 py-2.5 text-sm font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
                    >
                      View All Events
                    </button>

                  </div>
                )}

              {/* =================================================
                  PAGINATION
              ================================================== */}

              {!loading &&
                !error &&
                totalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">

                    {/* PREVIOUS */}

                    <button
                      type="button"
                      disabled={
                        currentPage === 1
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.max(
                              1,
                              page - 1,
                            ),
                        )
                      }
                      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition ${
                        currentPage === 1
                          ? "cursor-not-allowed border-gray-200 text-gray-300"
                          : "border-[#650014] text-[#650014] hover:bg-[#650014] hover:text-white"
                      }`}
                    >
                      <FaChevronLeft className="text-xs" />

                      Previous
                    </button>

                    {/* PAGE NUMBERS */}

                    {pageNumbers.map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              page,
                            )
                          }
                          className={`flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition ${
                            currentPage ===
                            page
                              ? "border-[#650014] bg-[#650014] text-white"
                              : "border-[#ead9b5] bg-white text-[#650014] hover:border-[#650014]"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    {/* NEXT */}

                    <button
                      type="button"
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) =>
                            Math.min(
                              totalPages,
                              page + 1,
                            ),
                        )
                      }
                      className={`inline-flex h-10 items-center gap-2 rounded-lg border px-4 text-sm font-semibold transition ${
                        currentPage ===
                        totalPages
                          ? "cursor-not-allowed border-gray-200 text-gray-300"
                          : "border-[#650014] text-[#650014] hover:bg-[#650014] hover:text-white"
                      }`}
                    >
                      Next

                      <FaChevronRight className="text-xs" />

                    </button>

                  </div>
                )}

              {/* PAGINATION INFO */}

              {!loading &&
                !error &&
                filteredEvents.length >
                  0 &&
                totalPages > 1 && (
                  <div className="mt-4 text-center text-xs text-gray-500">

                    Showing{" "}
                    <span className="font-semibold text-[#650014]">
                      {(currentPage - 1) *
                        EVENTS_PER_PAGE +
                        1}
                    </span>{" "}
                    -
                    <span className="font-semibold text-[#650014]">
                      {" "}
                      {Math.min(
                        currentPage *
                          EVENTS_PER_PAGE,
                        filteredEvents.length,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-[#650014]">
                      {filteredEvents.length}
                    </span>{" "}
                    events

                  </div>
                )}

            </section>

          </div>

        </div>
      </section>

      {/* =====================================================
          COMMUNITY SECTION
      ====================================================== */}

      <section className="bg-[#650014] py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div className="text-white">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                Devotion & Community
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                Together in Devotion
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                Temple events bring devotees and community members together
                through prayer, service, cultural activities and traditional
                celebrations.
              </p>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">

              <div className="grid gap-4 sm:grid-cols-2">

                {[
                  "Special Poojas",
                  "Abhishekam",
                  "Kumkum Archana",
                  "Festival Celebrations",
                  "Bhajan Programs",
                  "Community Activities",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <FaCheckCircle className="shrink-0 text-[#f1c84b]" />

                    <span className="text-sm text-white/85">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#fff3d7] py-12">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
            Vasavi Ammavari Temples
          </p>

          <h2 className="mt-2 font-serif text-xl font-semibold text-[#650014] md:text-2xl">
            Visit a Temple and Participate in Devotional Activities
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Explore temples across Telangana and take part in upcoming
            religious and community programs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

            <Link
              href="/temples"
              className="inline-flex items-center gap-2 rounded-lg border border-[#650014] px-6 py-3 text-sm font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
            >
              View Temples

              <FaArrowRight className="text-xs" />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}