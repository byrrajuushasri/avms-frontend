"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaPlaceOfWorship,
  FaCheckCircle,
} from "react-icons/fa";

type TempleEvent = {
  id: number;
  title: string;
  temple: string;
  area: string;
  district: string;
  date: string;
  displayDate: string;
  time: string;
  description: string;
  type: string;
};

const events: TempleEvent[] = [
  {
    id: 1,
    title: "Vasavi Ammavari Jayanthi",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Penugonda",
    district: "West Godavari",
    date: "2026-05-30",
    displayDate: "30 May 2026",
    time: "6:00 AM – 9:00 PM",
    description:
      "Special prayers, Abhishekam, Kumkum Archana and devotional programs in honour of Sri Vasavi Kanyaka Parameshwari Ammavaru.",
    type: "Special Pooja",
  },
  {
    id: 2,
    title: "Vasavi Ammavari Special Abhishekam",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Uppal",
    district: "Hyderabad",
    date: "2026-06-05",
    displayDate: "5 June 2026",
    time: "6:00 AM – 10:00 AM",
    description:
      "Special Abhishekam and devotional prayers for devotees with traditional temple rituals.",
    type: "Abhishekam",
  },
  {
    id: 3,
    title: "Kumkum Archana",
    temple: "Kanyaka Parameshwari Temple",
    area: "Kukatpally",
    district: "Hyderabad",
    date: "2026-06-12",
    displayDate: "12 June 2026",
    time: "5:30 PM – 8:30 PM",
    description:
      "Devotees can participate in the special Kumkum Archana and receive the blessings of Vasavi Ammavaru.",
    type: "Pooja",
  },
  {
    id: 4,
    title: "Ammavari Kalyanotsavam",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Kothapet",
    district: "Hyderabad",
    date: "2026-06-20",
    displayDate: "20 June 2026",
    time: "8:00 AM – 12:30 PM",
    description:
      "A special devotional celebration with traditional rituals and community participation.",
    type: "Festival",
  },
  {
    id: 5,
    title: "Vasavi Ammavari Deepotsavam",
    temple: "Sri Vasavi Matha Temple",
    area: "Kothapet",
    district: "Hyderabad",
    date: "2026-07-10",
    displayDate: "10 July 2026",
    time: "6:00 PM – 9:00 PM",
    description:
      "An evening devotional program featuring Deepa Seva and special prayers.",
    type: "Devotional",
  },
  {
    id: 6,
    title: "Community Bhajan Program",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Nizamabad",
    district: "Nizamabad",
    date: "2026-07-18",
    displayDate: "18 July 2026",
    time: "6:00 PM – 8:30 PM",
    description:
      "A community devotional gathering with Bhajans and spiritual activities.",
    type: "Bhajan",
  },
  {
    id: 7,
    title: "Ammavari Special Pooja",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Karimnagar",
    district: "Karimnagar",
    date: "2026-08-05",
    displayDate: "5 August 2026",
    time: "7:00 AM – 11:00 AM",
    description:
      "Special pooja and devotional activities dedicated to Sri Vasavi Kanyaka Parameshwari Ammavaru.",
    type: "Special Pooja",
  },
  {
    id: 8,
    title: "Vasavi Ammavari Navaratri Celebrations",
    temple: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Adilabad",
    district: "Adilabad",
    date: "2026-09-20",
    displayDate: "20 September 2026",
    time: "6:00 AM – 9:00 PM",
    description:
      "Special Navaratri celebrations with daily poojas, devotional programs and community participation.",
    type: "Festival",
  },
];

const eventTypes = [
  "All Events",
  ...Array.from(new Set(events.map((event) => event.type))).sort(),
];

export default function TempleEventsPage() {
  const [selectedType, setSelectedType] = useState("All Events");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const typeMatch =
        selectedType === "All Events" || event.type === selectedType;

      const searchText = `
        ${event.title}
        ${event.temple}
        ${event.area}
        ${event.district}
        ${event.type}
      `.toLowerCase();

      const searchMatch = searchText.includes(search.toLowerCase());

      return typeMatch && searchMatch;
    });
  }, [selectedType, search]);

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
                          (event) => event.type === type
                        ).length;

                  return (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                        selectedType === type
                          ? "bg-[#fff3d7] font-semibold text-[#650014]"
                          : "text-gray-600 hover:bg-[#fffaf0]"
                      }`}
                    >
                      <span>{type}</span>

                      <span
                        className={`text-xs ${
                          selectedType === type
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

              {/* Small information card */}

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

              {/* Search */}

              <div className="mb-8 flex items-center gap-3 rounded-xl border border-[#ead9b5] bg-white px-4 py-3">

                <FaSearch className="text-[#9b1730]" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search event, temple, area or district..."
                  className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                />

              </div>

              {/* Heading */}

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
                  {filteredEvents.length} event
                  {filteredEvents.length !== 1 ? "s" : ""}
                </p>

              </div>

              {/* Event Cards */}

              <div className="space-y-5">

                {filteredEvents.map((event) => (
                  <article
                    key={event.id}
                    className="group rounded-xl border border-[#eadfca] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7a928] hover:shadow-lg"
                  >

                    <div className="grid gap-6 md:grid-cols-[100px_1fr_auto] md:items-center">

                      {/* Date */}

                      <div className="flex h-24 w-24 flex-col items-center justify-center rounded-xl bg-[#650014] text-white">

                        <FaCalendarAlt className="text-lg text-[#f1c84b]" />

                        <span className="mt-2 text-center text-xs font-semibold leading-4">
                          {event.displayDate}
                        </span>

                      </div>

                      {/* Details */}

                      <div>

                        <div className="flex flex-wrap items-center gap-3">

                          <span className="rounded-full bg-[#fff3d7] px-3 py-1 text-xs font-semibold text-[#8a1025]">
                            {event.type}
                          </span>

                        </div>

                        <h3 className="mt-3 font-serif text-xl font-semibold text-[#650014]">
                          {event.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {event.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaPlaceOfWorship className="text-[#9b1730]" />
                            {event.temple}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaMapMarkerAlt className="text-[#9b1730]" />
                            {event.area}, {event.district}
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <FaClock className="text-[#9b1730]" />
                            {event.time}
                          </div>

                        </div>

                      </div>

                      {/* Action */}

                      <div className="md:self-center">

                        <Link
                          href={`/temples/events/${event.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#650014] px-5 py-2.5 text-sm font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
                        >
                          View Details
                          <FaArrowRight className="text-xs" />
                        </Link>

                      </div>

                    </div>

                  </article>
                ))}

              </div>

              {/* Empty */}

              {filteredEvents.length === 0 && (
                <div className="rounded-xl border border-[#ead9b5] bg-white px-6 py-16 text-center">

                  <FaCalendarAlt className="mx-auto text-4xl text-[#d7a928]" />

                  <h3 className="mt-4 font-serif text-xl font-semibold text-[#650014]">
                    No Events Found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Try another event category or search term.
                  </p>

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