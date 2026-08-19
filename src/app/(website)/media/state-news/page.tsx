"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaFire,
  FaNewspaper,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaUniversity,
  FaTimes,
  FaBullhorn,
  FaPlay,
} from "react-icons/fa";

type NewsItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  featured?: boolean;
};

const newsData: NewsItem[] = [
  {
    id: 1,
    title:
      "Telangana State Arya Vysya Mahasabha Conducts State-Level Meeting",
    description:
      "Members and representatives from different districts participated in the state-level meeting. Community development activities, welfare programmes and future initiatives were discussed.",
    category: "Mahasabha",
    location: "Hyderabad",
    date: "18 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/mahasabha.jpg",
    featured: true,
  },
  {
    id: 2,
    title:
      "Arya Vysya Community Leaders Discuss Education and Youth Development",
    description:
      "Community representatives discussed education, career development and new opportunities for students and youth across Telangana.",
    category: "Community",
    location: "Hyderabad",
    date: "18 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/community.jpg",
  },
  {
    id: 3,
    title:
      "Telangana Arya Vysya Mahasabha Announces New Community Welfare Initiatives",
    description:
      "New welfare-focused programmes are being planned to support community members and families across different districts.",
    category: "Welfare",
    location: "Telangana",
    date: "17 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/welfare.jpg",
  },
  {
    id: 4,
    title:
      "District Representatives Participate in Arya Vysya Community Programme",
    description:
      "Representatives from various districts participated in a community programme and shared their plans for upcoming activities.",
    category: "Districts",
    location: "Warangal",
    date: "17 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/welfare.jpg",
  },
  {
    id: 5,
    title:
      "Educational Support Programme Planned for Arya Vysya Students",
    description:
      "Community organisations discussed educational support and career guidance programmes for students.",
    category: "Education",
    location: "Karimnagar",
    date: "16 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/education.jpg",
  },
  {
    id: 6,
    title:
      "Arya Vysya Youth Meet Focuses on Career and Employment Opportunities",
    description:
      "Young community members participated in discussions about careers, employment, entrepreneurship and leadership opportunities.",
    category: "Youth",
    location: "Hyderabad",
    date: "16 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/youth.jpg",
  },
  {
    id: 7,
    title:
      "Community Welfare Activities Expanded Across Telangana Districts",
    description:
      "Local community organisations continue welfare and social service activities across different districts of Telangana.",
    category: "Welfare",
    location: "Nizamabad",
    date: "15 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/welfare.jpg",
  },
  {
    id: 8,
    title:
      "Arya Vysya Business Community Meeting Held in Hyderabad",
    description:
      "Business representatives discussed entrepreneurship, networking and opportunities for community members.",
    category: "Business",
    location: "Hyderabad",
    date: "15 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/business.jpg",
  },
  {
    id: 9,
    title:
      "District Arya Vysya Associations Strengthen Community Activities",
    description:
      "District-level associations continue to coordinate community programmes and social initiatives.",
    category: "Districts",
    location: "Khammam",
    date: "14 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/district2.jpg",
  },
  {
    id: 10,
    title:
      "Arya Vysya Mahasabha Youth Programme Encourages Community Participation",
    description:
      "The youth programme encourages active participation and leadership among young community members.",
    category: "Youth",
    location: "Hyderabad",
    date: "14 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/youth2.jpg",
  },
  {
    id: 11,
    title:
      "Community Leaders Review Upcoming Social Service Programmes",
    description:
      "Community leaders reviewed upcoming social service activities and plans for community welfare.",
    category: "Mahasabha",
    location: "Hyderabad",
    date: "13 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/business.jpg",
  },
  {
    id: 12,
    title:
      "Arya Vysya Students Participate in Community Education Programme",
    description:
      "Students participated in an education-focused community programme designed to encourage academic development.",
    category: "Education",
    location: "Secunderabad",
    date: "12 Aug 2026",
    mediaType: "image",
    mediaUrl: "/media/youth.jpg",
  },
];

const categories = [
  {
    name: "All News",
    icon: <FaNewspaper />,
  },
  {
    name: "Mahasabha",
    icon: <FaBullhorn />,
  },
  {
    name: "Community",
    icon: <FaUsers />,
  },
  {
    name: "Welfare",
    icon: <FaUniversity />,
  },
  {
    name: "Education",
    icon: <FaGraduationCap />,
  },
  {
    name: "Youth",
    icon: <FaUsers />,
  },
  {
    name: "Business",
    icon: <FaBriefcase />,
  },
  {
    name: "Districts",
    icon: <FaMapMarkerAlt />,
  },
];

export default function StateNewsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("All News");

  const [search, setSearch] = useState("");

  const [visibleCount, setVisibleCount] = useState(8);

  // Same-page news details
  const [selectedNews, setSelectedNews] =
    useState<NewsItem | null>(null);

  const filteredNews = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return newsData.filter((news) => {
      const categoryMatch =
        selectedCategory === "All News" ||
        news.category === selectedCategory;

      const searchMatch =
        searchText === "" ||
        news.title.toLowerCase().includes(searchText) ||
        news.description.toLowerCase().includes(searchText) ||
        news.location.toLowerCase().includes(searchText) ||
        news.category.toLowerCase().includes(searchText);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  const displayedNews = filteredNews.slice(
    0,
    visibleCount
  );

  const featuredNews = newsData.find(
    (news) => news.featured
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All News");
    setVisibleCount(8);
  };

  const changeCategory = (category: string) => {
    setSelectedCategory(category);
    setVisibleCount(8);
  };

  return (
    <>
      <main className="min-h-screen bg-gray-50">

        {/* =====================================================
            SMALL HEADER
        ====================================================== */}

        <section className="bg-white border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

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

              {/* Search */}

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
                      onClick={() => setSearch("")}
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

        {/* =====================================================
            CATEGORY FILTER
        ====================================================== */}

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

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

          {/* ===================================================
              BREAKING NEWS
          ==================================================== */}

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
                  Telangana State Arya Vysya Mahasabha latest community
                  updates and activities.
                </div>

              </div>

            </div>

          </div>

          {/* ===================================================
              FEATURED NEWS
          ==================================================== */}

          {selectedCategory === "All News" &&
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

                  {/* Featured Media */}

                  <div className="relative h-60 md:h-72">

                    {featuredNews.mediaType === "video" ? (
                      <video
                        src={featuredNews.mediaUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={featuredNews.mediaUrl}
                        alt={featuredNews.title}
                        fill
                        className="object-cover"
                      />
                    )}

                    <div className="absolute top-4 left-4">

                      <span className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
                        FEATURED
                      </span>

                    </div>

                  </div>

                  {/* Featured Content */}

                  <div className="p-5 sm:p-7 flex flex-col justify-center">

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mb-3">

                      <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md font-semibold">
                        {featuredNews.category}
                      </span>

                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt />
                        {featuredNews.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <FaCalendarAlt />
                        {featuredNews.date}
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

          {/* ===================================================
              LATEST NEWS
          ==================================================== */}

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

            {/* News Grid */}

            {displayedNews.length > 0 ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                {displayedNews.map((news) => (

                  <article
                    key={news.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                  >

                    {/* Media */}

                    <div className="relative h-44 overflow-hidden bg-gray-100">

                      {news.mediaType === "video" ? (
                        <div className="relative w-full h-full">

                          <video
                            src={news.mediaUrl}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />

                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                            <span className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center">
                              <FaPlay className="ml-1" />
                            </span>

                          </div>

                        </div>
                      ) : (
                        <Image
                          src={news.mediaUrl}
                          alt={news.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                      )}

                      {/* Category */}

                      <div className="absolute top-3 left-3">

                        <span className="bg-white/95 text-rose-600 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm">
                          {news.category}
                        </span>

                      </div>

                    </div>

                    {/* Content */}

                    <div className="p-4">

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-2.5">

                        <span className="flex items-center gap-1">
                          <FaCalendarAlt />
                          {news.date}
                        </span>

                        <span className="flex items-center gap-1 truncate">
                          <FaMapMarkerAlt />
                          {news.location}
                        </span>

                      </div>

                      <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-rose-600 transition">
                        {news.title}
                      </h3>

                      <p className="text-xs text-gray-500 leading-relaxed mt-2.5 line-clamp-3">
                        {news.description}
                      </p>

                      {/* READ MORE - SAME PAGE */}

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

              /* No Results */

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

            {/* Load More */}

            {visibleCount < filteredNews.length && (

              <div className="text-center mt-8">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleCount((prev) => prev + 4)
                  }
                  className="inline-flex items-center gap-2 bg-white border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition"
                >
                  Load More
                  <FaArrowRight className="text-xs" />
                </button>

              </div>

            )}

          </section>

        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

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

      {/* =======================================================
          SAME PAGE NEWS DETAILS MODAL
      ======================================================== */}

      {selectedNews && (

        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() => setSelectedNews(null)}
        >

          <div
            className="bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Header */}

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
                onClick={() => setSelectedNews(null)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-rose-50 text-gray-500 hover:text-rose-600 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>

            {/* Modal Media */}

            <div className="relative w-full bg-black">

              {selectedNews.mediaType === "video" ? (

                <video
                  src={selectedNews.mediaUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[450px] object-contain"
                />

              ) : (

                <div className="relative w-full h-64 sm:h-96">

                  <Image
                    src={selectedNews.mediaUrl}
                    alt={selectedNews.title}
                    fill
                    className="object-cover"
                  />

                </div>

              )}

            </div>

            {/* Modal Content */}

            <div className="p-5 sm:p-7">

              {/* Meta */}

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">

                <span className="flex items-center gap-1.5">
                  <FaCalendarAlt className="text-rose-500" />
                  {selectedNews.date}
                </span>

                <span className="flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-rose-500" />
                  {selectedNews.location}
                </span>

              </div>

              {/* Title */}

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {selectedNews.title}
              </h1>

              {/* Description */}

              <div className="mt-5">

                <h3 className="text-sm font-bold text-gray-900 mb-2">
                  News Description
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-7 whitespace-pre-line">
                  {selectedNews.description}
                </p>

              </div>

              {/* Close */}

              <div className="mt-7 pt-5 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
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