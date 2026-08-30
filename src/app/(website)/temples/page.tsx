"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaPlaceOfWorship,
  FaClock,
  FaCheckCircle,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const TEMPLES_API = `${BACKEND_URL}/temples`;

/* =========================================================
   PAGINATION
========================================================= */

const ITEMS_PER_PAGE = 3;

/* =========================================================
   TYPE
========================================================= */

type Temple = {
  id: number;
  name: string;
  area: string;
  district: string;
  address: string;
  phone?: string | null;
  timings?: string | null;
  description?: string | null;
  image?: string | null;

  mapUrl?: string | null;
  map_url?: string | null;
  googleMapUrl?: string | null;
  google_map_url?: string | null;

  created_at?: string | null;
  updated_at?: string | null;

  status?: boolean | number | string;
};

/* =========================================================
   PAGE
========================================================= */

export default function TemplesPage() {
  const [temples, setTemples] = useState<Temple[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedArea, setSelectedArea] =
    useState("All Areas");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

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

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      const normalizedTemples: Temple[] = list.map(
        (temple: any) => ({
          id: Number(temple.id),

          name: temple.name ?? "",

          area: temple.area ?? "",

          district: temple.district ?? "",

          address: temple.address ?? "",

          phone: temple.phone ?? null,

          timings: temple.timings ?? null,

          description:
            temple.description ?? "",

          image:
            temple.image ?? null,

          mapUrl:
            temple.mapUrl ??
            temple.map_url ??
            temple.googleMapUrl ??
            temple.google_map_url ??
            null,

          created_at:
            temple.created_at ??
            temple.createdAt ??
            null,

          updated_at:
            temple.updated_at ??
            temple.updatedAt ??
            null,

          status:
            temple.status ??
            true,
        }),
      );

      console.log(
        "Temples API Response:",
        data,
      );

      console.log(
        "Normalized Temples:",
        normalizedTemples,
      );

      setTemples(normalizedTemples);
    } catch (err) {
      console.error(
        "Error fetching temples:",
        err,
      );

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
     AREAS
  ========================================================= */

  const areas = useMemo(() => {
    const values = temples
      .map((temple) =>
        temple.area?.trim(),
      )
      .filter(Boolean);

    return [
      "All Areas",
      ...Array.from(
        new Set(values),
      ).sort(),
    ];
  }, [temples]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredTemples = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return temples.filter((temple) => {
      const areaMatch =
        selectedArea === "All Areas" ||
        temple.area === selectedArea;

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
        areaMatch &&
        searchMatch
      );
    });
  }, [
    temples,
    selectedArea,
    search,
  ]);

  /* =========================================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedArea]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredTemples.length /
      ITEMS_PER_PAGE,
  );

  const paginatedTemples = useMemo(() => {
    const startIndex =
      (currentPage - 1) *
      ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return filteredTemples.slice(
      startIndex,
      endIndex,
    );
  }, [
    filteredTemples,
    currentPage,
  ]);

  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  const goToPage = (
    page: number,
  ) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (
    date?: string | null,
  ) => {
    if (!date) return null;

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
     IMAGE URL
  ========================================================= */

  const getImageUrl = (
    image?: string | null,
  ) => {
    if (!image) return null;

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    return `${BACKEND_URL}/uploads/temples/${image}`;
  };

  /* =========================================================
     GOOGLE MAP URL
  ========================================================= */

  const getMapUrl = (
    temple: Temple,
  ) => {
    const backendMapUrl =
      temple.mapUrl ||
      temple.map_url ||
      temple.googleMapUrl ||
      temple.google_map_url;

    if (backendMapUrl) {
      return backendMapUrl;
    }

    const query = [
      temple.name,
      temple.area,
      temple.district,
      temple.address,
    ]
      .filter(Boolean)
      .join(", ");

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      query,
    )}`;
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#3d2525]">

    


      {/* =====================================================
          DIRECTORY
      ===================================================== */}

      <section className="border-y border-[#eee1c5] bg-white py-10 md:py-12">

        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {/* TITLE */}

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9b1730]">
              Temple Directory
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold text-[#650014] md:text-3xl">
              Find a Temple
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Search temples by name, area or district
              and explore their available details.
            </p>

          </div>


          {/* SEARCH */}

          <div className="mx-auto mt-7 max-w-3xl">

            <div className="flex items-center gap-3 rounded-xl border border-[#eadfca] bg-[#fffdf8] px-4 py-3 shadow-sm transition focus-within:border-[#9b1730] focus-within:ring-4 focus-within:ring-[#9b1730]/10">

              <FaSearch className="shrink-0 text-[#9b1730]" />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search temple, area or district..."
                className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />

            </div>

          </div>


          {/* MAIN */}

          <div className="mt-8 grid gap-6 lg:grid-cols-[210px_1fr]">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="h-fit overflow-hidden rounded-xl border border-[#eadfca] bg-[#fffdf8] shadow-sm">

              <div className="border-b border-[#eadfca] bg-[#fffaf0] px-4 py-4">

                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b1730]">
                  Locations
                </p>

                <h3 className="mt-1 font-serif text-base font-semibold text-[#650014]">
                  Areas
                </h3>

                <p className="mt-1 text-[11px] text-gray-500">
                  Select an area
                </p>

              </div>

              <div className="max-h-[500px] overflow-y-auto p-2">

                {areas.map((area) => {

                  const count =
                    area === "All Areas"
                      ? temples.length
                      : temples.filter(
                          (temple) =>
                            temple.area === area,
                        ).length;

                  const active =
                    selectedArea === area;

                  return (

                    <button
                      key={area}
                      type="button"
                      onClick={() => {
                        setSelectedArea(area);
                        setCurrentPage(1);
                      }}
                      className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition ${
                        active
                          ? "bg-[#650014] font-semibold text-white shadow-sm"
                          : "text-gray-600 hover:bg-[#fff3d7] hover:text-[#650014]"
                      }`}
                    >

                      <span>
                        {area}
                      </span>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] ${
                          active
                            ? "bg-white/15 text-[#f1c84b]"
                            : "bg-[#fff3d7] text-[#9b1730]"
                        }`}
                      >
                        {count}
                      </span>

                    </button>

                  );
                })}

              </div>

            </aside>


            {/* =================================================
                RESULTS
            ================================================= */}

            <div>

              {/* RESULTS HEADER */}

              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">

                <div>

                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#9b1730]">
                    Temples
                  </p>

                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#650014]">
                    {selectedArea}
                  </h2>

                </div>

                <div className="rounded-full bg-[#fff3d7] px-3 py-1.5 text-xs font-medium text-[#650014]">
                  {filteredTemples.length}{" "}
                  {filteredTemples.length === 1
                    ? "Temple"
                    : "Temples"}
                </div>

              </div>


              {/* =================================================
                  LOADING
              ================================================= */}

              {loading && (

                <div className="rounded-xl border border-[#eadfca] bg-[#fffdf8] px-6 py-14 text-center">

                  <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#eadfca] border-t-[#650014]" />

                  <p className="mt-4 text-sm text-gray-500">
                    Loading temples...
                  </p>

                </div>

              )}


              {/* =================================================
                  ERROR
              ================================================= */}

              {!loading && error && (

                <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center">

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white">

                    <FaPlaceOfWorship className="text-lg text-red-400" />

                  </div>

                  <h3 className="mt-4 font-serif text-lg font-semibold text-red-700">
                    Unable to Load Temples
                  </h3>

                  <p className="mt-2 text-xs text-red-500">
                    {error}
                  </p>

                  <button
                    type="button"
                    onClick={fetchTemples}
                    className="mt-4 rounded-lg bg-[#650014] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#8a1025]"
                  >
                    Try Again
                  </button>

                </div>

              )}


              {/* =================================================
                  TEMPLE CARDS - 3 PER ROW
              ================================================= */}

              {!loading &&
                !error &&
                paginatedTemples.length > 0 && (

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {paginatedTemples.map(
                      (temple) => {

                        const imageUrl =
                          getImageUrl(
                            temple.image,
                          );

                        return (

                          <article
                            key={temple.id}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eadfca] bg-[#fffdf8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d7a928] hover:shadow-[0_12px_30px_rgba(101,0,20,0.12)]"
                          >

                            {/* =================================================
                                IMAGE
                            ================================================= */}

                            <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-[#650014] to-[#9b1730]">

                              {imageUrl ? (

                                <img
                                  src={imageUrl}
                                  alt={temple.name}
                                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                  onError={(e) => {
                                    console.error(
                                      "Temple image failed:",
                                      imageUrl,
                                    );

                                    e.currentTarget.style.display =
                                      "none";
                                  }}
                                />

                              ) : (

                                <div className="flex h-full w-full items-center justify-center">

                                  <div className="text-center text-white/80">

                                    <FaImage className="mx-auto text-4xl" />

                                    <p className="mt-2 text-xs">
                                      Temple Image
                                    </p>

                                  </div>

                                </div>

                              )}


                              {/* OVERLAY */}

                              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />


                              {/* BADGE */}

                              <div className="absolute left-3 top-3">

                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#650014] shadow-md">

                                  <FaPlaceOfWorship />

                                  Vasavi Temple

                                </span>

                              </div>


                              {/* IMAGE TITLE */}

                              <div className="absolute bottom-0 left-0 right-0 p-4">

                                <h3 className="line-clamp-2 font-serif text-lg font-semibold leading-6 text-white drop-shadow-md">

                                  {temple.name}

                                </h3>

                                <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-white/90">

                                  <FaMapMarkerAlt className="text-[#f1c84b]" />

                                  <span>
                                    {temple.area}
                                  </span>

                                  {temple.district && (
                                    <>
                                      <span className="text-white/50">
                                        •
                                      </span>

                                      <span>
                                        {temple.district}
                                      </span>
                                    </>
                                  )}

                                </div>

                              </div>

                            </div>


                            {/* =================================================
                                CARD CONTENT
                            ================================================= */}

                            <div className="flex flex-1 flex-col p-4">

                              {/* DESCRIPTION */}

                              {temple.description && (

                                <p className="line-clamp-3 text-xs leading-5 text-gray-600">

                                  {temple.description}

                                </p>

                              )}


                              {/* DETAILS */}

                              <div className="mt-4 space-y-3 border-t border-[#eee0c2] pt-4">


                                {/* ADDRESS */}

                                <div>

                                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9b1730]">
                                    Address
                                  </p>

                                  <div className="mt-1 flex items-start gap-2">

                                    <FaMapMarkerAlt className="mt-1 shrink-0 text-[11px] text-[#8a1025]" />

                                    <p className="line-clamp-2 text-xs leading-5 text-gray-600">
                                      {temple.address || "-"}
                                    </p>

                                  </div>

                                </div>


                                {/* TIMINGS */}

                                {temple.timings && (

                                  <div>

                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9b1730]">
                                      Temple Timings
                                    </p>

                                    <div className="mt-1 flex items-start gap-2">

                                      <FaClock className="mt-1 shrink-0 text-[11px] text-[#8a1025]" />

                                      <p className="line-clamp-2 text-xs leading-5 text-gray-600">
                                        {temple.timings}
                                      </p>

                                    </div>

                                  </div>

                                )}

                              </div>


                              {/* PHONE */}

                              {temple.phone && (

                                <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-[#fff3d7] px-3 py-2.5">

                                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">

                                    <FaPhoneAlt className="text-[11px] text-[#8a1025]" />

                                  </div>

                                  <div>

                                    <p className="text-[9px] font-semibold uppercase tracking-wide text-[#9b1730]">
                                      Contact
                                    </p>

                                    <p className="text-xs font-semibold text-[#650014]">
                                      {temple.phone}
                                    </p>

                                  </div>

                                </div>

                              )}


                              {/* DATE */}

                              {temple.created_at && (

                                <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">

                                  <FaCheckCircle className="text-[#9b1730]" />

                                  <span>

                                    Added on{" "}

                                    <span className="font-medium text-[#650014]">

                                      {formatDate(
                                        temple.created_at,
                                      )}

                                    </span>

                                  </span>

                                </div>

                              )}


                              {/* BOTTOM BUTTON */}

                              <div className="mt-auto pt-4">

                                <div className="border-t border-[#eee0c2] pt-4">

                                  <a
                                    href={getMapUrl(
                                      temple,
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#650014] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#8a1025] hover:shadow-md"
                                  >

                                    <FaMapMarkerAlt />

                                    View Location

                                  </a>

                                </div>

                              </div>

                            </div>

                          </article>

                        );
                      },
                    )}

                  </div>

                )}


              {/* =================================================
                  EMPTY
              ================================================= */}

              {!loading &&
                !error &&
                filteredTemples.length === 0 && (

                  <div className="rounded-xl border border-[#eadfca] bg-[#fffdf8] px-6 py-14 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3d7]">

                      <FaPlaceOfWorship className="text-xl text-[#9b1730]" />

                    </div>

                    <h3 className="mt-4 font-serif text-lg font-semibold text-[#650014]">
                      No Temples Found
                    </h3>

                    <p className="mt-2 text-xs text-gray-500">
                      Please try another area or search term.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedArea(
                          "All Areas",
                        );

                        setSearch("");

                        setCurrentPage(1);
                      }}
                      className="mt-4 rounded-lg border border-[#650014] px-4 py-2 text-xs font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
                    >
                      View All Temples
                    </button>

                  </div>

                )}


              {/* =================================================
                  PAGINATION
              ================================================= */}

              {!loading &&
                !error &&
                filteredTemples.length > 0 &&
                totalPages > 1 && (

                  <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-[#eee0c2] pt-6 sm:flex-row">

                    {/* RESULT INFO */}

                    <p className="text-xs text-gray-500">

                      Showing{" "}

                      <span className="font-semibold text-[#650014]">
                        {(currentPage - 1) *
                          ITEMS_PER_PAGE +
                          1}
                      </span>

                      {" "}–{" "}

                      <span className="font-semibold text-[#650014]">
                        {Math.min(
                          currentPage *
                            ITEMS_PER_PAGE,
                          filteredTemples.length,
                        )}
                      </span>

                      {" "}of{" "}

                      <span className="font-semibold text-[#650014]">
                        {filteredTemples.length}
                      </span>

                      {" "}Temples

                    </p>


                    {/* PAGINATION BUTTONS */}

                    <div className="flex items-center gap-1.5">

                      {/* PREVIOUS */}

                      <button
                        type="button"
                        disabled={
                          currentPage === 1
                        }
                        onClick={() =>
                          goToPage(
                            currentPage - 1,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfca] bg-white text-xs text-[#650014] transition hover:bg-[#fff3d7] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaChevronLeft />
                      </button>


                      {/* PAGE NUMBERS */}

                      {Array.from(
                        {
                          length: totalPages,
                        },
                        (_, index) =>
                          index + 1,
                      ).map(
                        (page) => (

                          <button
                            key={page}
                            type="button"
                            onClick={() =>
                              goToPage(
                                page,
                              )
                            }
                            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${
                              currentPage ===
                              page
                                ? "bg-[#650014] text-white shadow-sm"
                                : "border border-[#eadfca] bg-white text-[#650014] hover:bg-[#fff3d7]"
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
                          goToPage(
                            currentPage + 1,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadfca] bg-white text-xs text-[#650014] transition hover:bg-[#fff3d7] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <FaChevronRight />
                      </button>

                    </div>

                  </div>

                )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMMUNITY
      ===================================================== */}

      <section className="bg-[#650014] py-10 md:py-12">

        <div className="mx-auto max-w-7xl px-5 md:px-8">

          <div className="grid items-center gap-8 md:grid-cols-2">

            <div className="text-white">

              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                Sacred Heritage
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold md:text-3xl">
                Preserving Our Spiritual Heritage
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
                Vasavi Ammavari temples hold an
                important place in the spiritual and
                cultural life of the Arya Vysya
                community.
              </p>

            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">

              <div className="grid gap-3 sm:grid-cols-2">

                {[
                  "Temple locations",
                  "Address information",
                  "Temple timings",
                  "Contact details",
                  "Google Maps location",
                  "Community heritage",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-start gap-2"
                  >

                    <FaCheckCircle className="mt-0.5 shrink-0 text-[#f1c84b]" />

                    <span className="text-xs leading-5 text-white/85">
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
      ===================================================== */}

      <section className="bg-[#fff3d7] py-9">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
            Aarya Vysya Mahasabha
          </p>

          <h2 className="mt-1 font-serif text-xl font-semibold text-[#650014] md:text-2xl">
            Our Temples, Our Heritage
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-gray-600">
            Together, let us preserve our sacred places,
            traditions and spiritual heritage for future
            generations.
          </p>

        </div>

      </section>

    </main>
  );
}