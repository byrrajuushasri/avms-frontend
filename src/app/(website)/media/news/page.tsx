"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaFire,
  FaNewspaper,
  FaUsers,
  FaUniversity,
  FaTimes,
  FaBullhorn,
  FaSyncAlt,
  FaImage,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type NewsCategory =
  | "State News"
  | "District News"
  | "Mandal News"
  | "Sangam News";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  category: NewsCategory;
  location?: string | null;
  date: string;
  mediaType?: string;
  mediaUrl: string;
  featured?: boolean;
  status?: "Active" | "Inactive";
  createdAt?: string;
  updatedAt?: string;
};

/* =========================================================
   API
========================================================= */

const API_URL = "http://localhost:5000/news";

const BACKEND_URL = "http://localhost:5000";

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  {
    name: "All News",
    icon: <FaNewspaper />,
  },
  {
    name: "State News",
    icon: <FaBullhorn />,
  },
  {
    name: "District News",
    icon: <FaMapMarkerAlt />,
  },
  {
    name: "Mandal News",
    icon: <FaUniversity />,
  },
  {
    name: "Sangam News",
    icon: <FaUsers />,
  },
];

/* =========================================================
   HELPERS
========================================================= */

/*
  Convert backend image path into browser URL.

  Examples:

  /uploads/news/image.jpg
  ->
  http://localhost:5000/uploads/news/image.jpg

  uploads/news/image.jpg
  ->
  http://localhost:5000/uploads/news/image.jpg

  http://localhost:5000/uploads/news/image.jpg
  ->
  same URL
*/

const getMediaUrl = (url?: string | null) => {
  if (!url) return "";

  const cleanUrl = String(url).trim();

  if (!cleanUrl) return "";

  if (
    cleanUrl.startsWith("http://") ||
    cleanUrl.startsWith("https://") ||
    cleanUrl.startsWith("blob:")
  ) {
    return cleanUrl;
  }

  if (cleanUrl.startsWith("/")) {
    return `${BACKEND_URL}${cleanUrl}`;
  }

  return `${BACKEND_URL}/${cleanUrl}`;
};

/* =========================================================
   FORMAT DATE
========================================================= */

const formatDate = (date?: string) => {
  if (!date) return "";

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

/* =========================================================
   PAGE
========================================================= */

export default function StateNewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("All News");

  const [search, setSearch] = useState("");

  const [visibleCount, setVisibleCount] = useState(8);

  const [selectedNews, setSelectedNews] =
    useState<NewsItem | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     FETCH NEWS
  ======================================================= */

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch news. Status: ${response.status}`
        );
      }

      const data = await response.json();

      const newsArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
        ? data.data
        : [];

      /*
        IMPORTANT:

        Only Image news will be shown on client.
      */

      const imageNews = newsArray.filter(
        (item: NewsItem) =>
          String(item.mediaType || "").toLowerCase() ===
          "image"
      );

      setNewsData(imageNews);
    } catch (err) {
      console.error("News API Error:", err);

      setError(
        "News data load కాలేదు. Backend server running ఉందో check చేయండి."
      );

      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchNews();
  }, []);

  /* =======================================================
     FILTER NEWS
  ======================================================= */

  const filteredNews = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return newsData.filter((news) => {
      /*
        Category
      */

      const categoryMatch =
        selectedCategory === "All News" ||
        news.category === selectedCategory;

      /*
        Search
      */

      const searchMatch =
        searchText === "" ||
        news.title
          ?.toLowerCase()
          .includes(searchText) ||
        news.description
          ?.toLowerCase()
          .includes(searchText) ||
        news.location
          ?.toLowerCase()
          .includes(searchText) ||
        news.category
          ?.toLowerCase()
          .includes(searchText);

      /*
        Active only
      */

      const statusMatch =
        !news.status || news.status === "Active";

      return (
        categoryMatch &&
        searchMatch &&
        statusMatch
      );
    });
  }, [
    newsData,
    selectedCategory,
    search,
  ]);

  /* =======================================================
     DISPLAY NEWS
  ======================================================= */

  const displayedNews = filteredNews.slice(
    0,
    visibleCount
  );

  /* =======================================================
     FEATURED NEWS
  ======================================================= */

  const featuredNews = newsData.find(
    (news) =>
      news.featured === true &&
      (!news.status || news.status === "Active")
  );

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All News");
    setVisibleCount(8);
  };

  /* =======================================================
     CHANGE CATEGORY
  ======================================================= */

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(8);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <main className="min-h-screen bg-gray-50">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="bg-white border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              {/* TITLE */}

              <div>

                <div className="flex items-center gap-2 mb-1">

                  <span className="w-2 h-2 rounded-full bg-rose-600" />

                  <span className="text-xs font-semibold uppercase tracking-wide text-rose-600">
                    Media & News
                  </span>

                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Telangana State Arya Vysya Mahasabha
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  Latest community news, events and updates
                </p>

              </div>

              {/* SEARCH */}

              <div className="w-full md:w-80">

                <div className="relative">

                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setVisibleCount(8);
                    }}
                    placeholder="Search news..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-gray-700 outline-none focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setVisibleCount(8);
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-rose-600"
                    >
                      <FaTimes />
                    </button>
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        <section className="bg-white border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            <div className="flex gap-2 overflow-x-auto py-3">

              {categories.map((category) => (

                <button
                  key={category.name}
                  type="button"
                  onClick={() =>
                    changeCategory(category.name)
                  }
                  className={`flex items-center gap-2 whitespace-nowrap px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                    selectedCategory === category.name
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>

              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mb-7 bg-red-50 border border-red-200 rounded-xl p-4">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <p className="text-sm text-red-700">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchNews}
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  <FaSyncAlt />
                  Retry
                </button>

              </div>

            </div>

          )}

          {/* =================================================
              LATEST UPDATES
          ================================================= */}

          {!loading && newsData.length > 0 && (

            <div className="mb-7">

              <div className="flex items-center gap-2 mb-3">

                <FaFire className="text-red-600" />

                <h2 className="text-base font-bold text-gray-900">
                  Latest Updates
                </h2>

              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

                <div className="flex">

                  <div className="bg-red-600 text-white px-4 py-3 flex items-center text-xs font-bold">
                    NEWS
                  </div>

                  <div className="px-4 py-3 text-sm text-gray-700 font-medium">
                    Telangana State Arya Vysya Mahasabha latest
                    community updates and activities.
                  </div>

                </div>

              </div>

            </div>

          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="bg-white border border-gray-200 rounded-2xl py-20 text-center">

              <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin mx-auto" />

              <p className="text-sm text-gray-500 mt-4">
                Loading news...
              </p>

            </div>

          )}

          {/* =================================================
              FEATURED NEWS
          ================================================= */}

          {!loading &&
            selectedCategory === "All News" &&
            search === "" &&
            featuredNews && (

              <section className="mb-9">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Featured News
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Important Mahasabha update
                    </p>

                  </div>

                  <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <FaFire />
                    Latest
                  </span>

                </div>

                <div className="grid md:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

                  {/* MEDIA */}

                  <div className="relative h-60 md:h-72 bg-gray-100">

                    {featuredNews.mediaUrl ? (

                      <Image
                        src={getMediaUrl(
                          featuredNews.mediaUrl
                        )}
                        alt={featuredNews.title}
                        fill
                        unoptimized
                        priority
                        className="object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                        <FaImage className="text-5xl mb-3" />

                        <span className="text-sm">
                          No Image Available
                        </span>

                      </div>

                    )}

                    <div className="absolute top-4 left-4">

                      <span className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                        FEATURED
                      </span>

                    </div>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5 sm:p-7 flex flex-col justify-center">

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">

                      <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md font-semibold">
                        {featuredNews.category}
                      </span>

                      {featuredNews.location && (
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {featuredNews.location}
                        </span>
                      )}

                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {formatDate(
                          featuredNews.date
                        )}
                      </span>

                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                      {featuredNews.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-3 leading-relaxed line-clamp-4">
                      {featuredNews.description}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedNews(featuredNews)
                      }
                      className="inline-flex items-center gap-2 text-rose-600 font-semibold text-sm mt-5 hover:gap-3 transition-all w-fit"
                    >
                      Read More
                      <FaArrowRight className="text-xs" />
                    </button>

                  </div>

                </div>

              </section>

            )}

          {/* =================================================
              NEWS LIST
          ================================================= */}

          {!loading && (

            <section>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                <div>

                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    {selectedCategory === "All News"
                      ? "Latest News"
                      : selectedCategory}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Telangana State Arya Vysya Mahasabha updates
                  </p>

                </div>

                <div className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-2 rounded-lg">
                  {filteredNews.length} News
                </div>

              </div>

              {/* =================================================
                  NEWS GRID
              ================================================= */}

              {displayedNews.length > 0 ? (

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                  {displayedNews.map((news) => (

                    <article
                      key={news.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                      {/* IMAGE */}

                      <div className="relative h-44 overflow-hidden bg-gray-100">

                        {news.mediaUrl ? (

                          <Image
                            src={getMediaUrl(
                              news.mediaUrl
                            )}
                            alt={news.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />

                        ) : (

                          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">

                            <FaImage className="text-4xl mb-2" />

                            <span className="text-xs">
                              No Image
                            </span>

                          </div>

                        )}

                        {/* CATEGORY */}

                        <div className="absolute top-3 left-3">

                          <span className="bg-white/95 text-rose-600 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm">
                            {news.category}
                          </span>

                        </div>

                      </div>

                      {/* CONTENT */}

                      <div className="p-4">

                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5">

                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            {formatDate(news.date)}
                          </span>

                          {news.location && (

                            <span className="flex items-center gap-1 truncate">

                              <FaMapMarkerAlt />

                              {news.location}

                            </span>

                          )}

                        </div>

                        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-rose-600 transition">
                          {news.title}
                        </h3>

                        <p className="text-xs text-gray-500 leading-relaxed mt-2.5 line-clamp-3">
                          {news.description}
                        </p>

                        {/* READ MORE */}

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedNews(news)
                          }
                          className="inline-flex items-center gap-2 text-rose-600 font-semibold text-xs mt-4 hover:gap-3 transition-all"
                        >
                          Read More
                          <FaArrowRight className="text-[10px]" />
                        </button>

                      </div>

                    </article>

                  ))}

                </div>

              ) : (

                /* =================================================
                   NO RESULTS
                ================================================= */

                <div className="bg-white rounded-2xl border border-gray-200 text-center py-16 px-5">

                  <div className="w-14 h-14 mx-auto bg-rose-50 text-rose-600 rounded-full flex items-center justify-center">

                    <FaSearch />

                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mt-4">
                    No News Found
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Try another search or category.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
                  >
                    Clear Filters
                  </button>

                </div>

              )}

              {/* =================================================
                  LOAD MORE
              ================================================= */}

              {visibleCount < filteredNews.length && (

                <div className="text-center mt-8">

                  <button
                    type="button"
                    onClick={() =>
                      setVisibleCount(
                        (prev) => prev + 4
                      )
                    }
                    className="inline-flex items-center gap-2 bg-white border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Load More
                    <FaArrowRight className="text-xs" />
                  </button>

                </div>

              )}

            </section>

          )}

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="border-t border-gray-200 bg-white">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

              <p className="text-xs text-gray-500">
                Telangana State Arya Vysya Mahasabha
              </p>

              <a
                href="/"
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Visit Home
              </a>

            </div>

          </div>

        </div>

      </main>

      {/* =====================================================
          NEWS DETAILS MODAL
      ====================================================== */}

      {selectedNews && (

        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() =>
            setSelectedNews(null)
          }
        >

          <div
            className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">

              <div>

                <p className="text-[11px] font-bold uppercase tracking-wide text-rose-600">
                  {selectedNews.category}
                </p>

                <h2 className="text-lg font-bold text-gray-900 mt-0.5">
                  News Details
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNews(null)
                }
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>

            {/* MODAL IMAGE */}

            <div className="relative w-full bg-black">

              {selectedNews.mediaUrl ? (

                <div className="relative w-full h-64 sm:h-96">

                  <Image
                    src={getMediaUrl(
                      selectedNews.mediaUrl
                    )}
                    alt={selectedNews.title}
                    fill
                    unoptimized
                    className="object-contain"
                  />

                </div>

              ) : (

                <div className="h-64 sm:h-96 flex flex-col items-center justify-center text-gray-400">

                  <FaImage className="text-5xl mb-3" />

                  <span className="text-sm">
                    No Image Available
                  </span>

                </div>

              )}

            </div>

            {/* MODAL CONTENT */}

            <div className="p-5 sm:p-7">

              {/* META */}

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">

                <span className="flex items-center gap-1.5">

                  <FaCalendarAlt className="text-rose-500" />

                  {formatDate(
                    selectedNews.date
                  )}

                </span>

                {selectedNews.location && (

                  <span className="flex items-center gap-1.5">

                    <FaMapMarkerAlt className="text-rose-500" />

                    {selectedNews.location}

                  </span>

                )}

              </div>

              {/* TITLE */}

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {selectedNews.title}
              </h1>

              {/* DESCRIPTION */}

              <div className="mt-5">

                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  News Description
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-7 whitespace-pre-line">
                  {selectedNews.description}
                </p>

              </div>

              {/* CLOSE */}

              <div className="mt-7 pt-5 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() =>
                    setSelectedNews(null)
                  }
                  className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}