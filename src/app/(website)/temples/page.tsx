"use client";

import { useMemo, useState } from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaPlaceOfWorship,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

type Temple = {
  id: number;
  name: string;
  area: string;
  district: string;
  address: string;
  phone?: string;
  timings?: string;
  description: string;
  mapUrl: string;
};

const temples: Temple[] = [
  {
    id: 1,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Uppal",
    district: "Hyderabad",
    address:
      "2-4-118/213, Street No. 2, South Swaroop Nagar Colony, Gandinagar, Srinivasa Colony, Uppal, Hyderabad, Telangana 500039",
    phone: "+91 90143 92919",
    timings: "6:00 AM – 11:00 AM | 6:00 PM – 8:00 PM",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple serving devotees and the Arya Vysya community in Uppal.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Uppal+Hyderabad",
  },

  {
    id: 2,
    name: "Kanyaka Parameshwari Temple",
    area: "Kukatpally",
    district: "Hyderabad",
    address:
      "Vasavi Grounds, eSeva Lane, KPHB Phase 3, Kukatpally Housing Board Colony, Hyderabad, Telangana 500072",
    phone: "+91 99666 66408",
    timings: "5:30 AM – 12:00 PM | 5:00 PM – 9:00 PM",
    description:
      "Sri Kanyaka Parameshwari Temple located at Vasavi Grounds in Kukatpally.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Kanyaka+Parameshwari+Temple+Kukatpally+Hyderabad",
  },

  {
    id: 3,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Kothapet",
    district: "Hyderabad",
    address:
      "Maruthi Nagar Road, Ramkrishna Raju Residency, Maruthi Nagar, Kothapet, Hyderabad, Telangana 500060",
    phone: "+91 98491 38716",
    timings: "6:00 AM – 9:00 PM",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple in the Kothapet area of Hyderabad.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Kothapet+Hyderabad",
  },

  {
    id: 4,
    name: "Sri Vasavi Matha Temple",
    area: "Kothapet",
    district: "Hyderabad",
    address:
      "Vasavi Colony, RK Puram Main Road, Green Hills Colony, Kothapet, Hyderabad, Telangana 500102",
    timings: "7:00 AM – 12:00 PM | 5:00 PM – 8:00 PM",
    description:
      "Sri Vasavi Matha Temple located in Vasavi Colony, Kothapet.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Matha+Temple+Kothapet+Hyderabad",
  },

  {
    id: 5,
    name: "Sri Vasavi Kanyakaparameshwari Temple",
    area: "Amberpet",
    district: "Hyderabad",
    address:
      "Venkat Reddy Nagar Lane, New Patel Nagar Road, Chena Reddy Nagar, Amberpet, Hyderabad, Telangana 500013",
    timings: "5:00 AM – 12:00 PM | 5:00 PM – 9:00 PM",
    description:
      "Sri Vasavi Kanyakaparameshwari Temple serving the Amberpet area.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyakaparameshwari+Temple+Amberpet+Hyderabad",
  },

  {
    id: 6,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Malkajgiri",
    district: "Secunderabad",
    address:
      "Raghavendra Theatre Road, Old Malkajgiri, Maruthi Nagar, Malkajgiri, Secunderabad, Telangana 500047",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple associated with the Arya Vysya community in Malkajgiri.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Malkajgiri",
  },

  {
    id: 7,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Adilabad",
    district: "Adilabad",
    address:
      "Ashok Road, Mahalaxmiwada, Adilabad, Telangana 504001",
    timings: "10:30 AM – 8:00 PM",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple located in Adilabad town.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Adilabad+Telangana",
  },

  {
    id: 8,
    name: "Sri Vasavi Kanyakaparameshwari Temple",
    area: "Nizamabad",
    district: "Nizamabad",
    address:
      "Kishan Gunj Road, Kumar Gali, Nizamabad, Telangana 503001",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyakaparameshwari Temple serving devotees in Nizamabad.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyakaparameshwari+Temple+Nizamabad+Telangana",
  },

  {
    id: 9,
    name: "Sri Vasavi Kanyaka Parameshwari Devalayamu",
    area: "Karimnagar",
    district: "Karimnagar",
    address:
      "Saad Lane, Ashoknagar, Karimnagar, Telangana 505001",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyaka Parameshwari Devalayamu located in Ashoknagar, Karimnagar.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Devalayamu+Karimnagar",
  },

  {
    id: 10,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Aswaraopeta",
    district: "Bhadradri Kothagudem",
    address:
      "Aswaraopeta, Telangana 507301",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple serving devotees in Aswaraopeta.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Aswaraopeta+Telangana",
  },

  {
    id: 11,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Devarakonda",
    district: "Nalgonda",
    address:
      "Devarakonda, Telangana 508248",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple serving the Devarakonda area.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Devarakonda+Telangana",
  },

  {
    id: 12,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Nizampet",
    district: "Hyderabad",
    address:
      "Hill County, Nizampet, Hyderabad, Telangana 500090",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyakaparameshwari Ammavaari Temple located in Nizampet.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyakaparameshwari+Ammavaari+Temple+Nizampet+Hyderabad",
  },

  {
    id: 13,
    name: "Sri Vasavi Kanyaka Parameshwari Temple",
    area: "Katedan",
    district: "Hyderabad",
    address:
      "TNGO Colony, Kattedan Road, Mylardevpally, Katedhan, Telangana 500077",
    timings: "Temple timings available locally",
    description:
      "Sri Vasavi Kanyaka Parameshwari Temple serving the Katedan-Shivarampally area.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Temple+Katedan+Telangana",
  },

  {
    id: 14,
    name: "Sri Vasavi Kanyaka Parameshwari Devi Temple",
    area: "Ramachandrapuram",
    district: "Hyderabad",
    address:
      "Kanyaka Parameshwari Temple, 15-27/1, near LIG, Ramachandrapuram, Rythu Bazar, BHEL, Hyderabad, Telangana 502032",
    phone: "+91 98497 90728",
    timings: "6:30 AM – 11:30 AM | 5:30 PM – 8:00 PM",
    description:
      "Sri Vasavi Kanyaka Parameshwari Devi Temple near LIG, Ramachandrapuram.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Devi+Temple+Ramachandrapuram+Hyderabad",
  },

  {
    id: 15,
    name: "Sri Vasavi Kanyaka Parameshwari Charitable Trust Temple",
    area: "Uppal",
    district: "Hyderabad",
    address:
      "Street No. 2, New South Swaroop Colony, Near K.K.R Gardens, Venkateshwara Swamy Temple Road, Uppal, Hyderabad, Telangana",
    phone: "9391026369 / 9533363339",
    timings: "Contact temple office for current timings",
    description:
      "Sri Vasavi Kanyaka Parameshwari Charitable Trust Temple established by Uppal Vysya Sangam.",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sri+Vasavi+Kanyaka+Parameshwari+Charitable+Trust+Temple+Uppal",
  },
];

const areas = [
  "All Areas",
  ...Array.from(
    new Set(temples.map((temple) => temple.area))
  ).sort(),
];

export default function TemplesPage() {
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [search, setSearch] = useState("");

  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      const areaMatch =
        selectedArea === "All Areas" ||
        temple.area === selectedArea;

      const searchText = `
        ${temple.name}
        ${temple.area}
        ${temple.district}
        ${temple.address}
      `.toLowerCase();

      const searchMatch = searchText.includes(
        search.toLowerCase()
      );

      return areaMatch && searchMatch;
    });
  }, [selectedArea, search]);

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#3d2525]">

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">

            {/* Introduction */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
                Sacred Places
              </p>

              <h1 className="mt-2 font-serif text-3xl font-semibold text-[#650014] md:text-4xl">
                Vasavi Ammavari Temples
              </h1>

              <div className="mt-4 h-[2px] w-14 bg-[#d7a928]" />

              <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                Explore Vasavi Kanyaka Parameshwari temples and
                sacred places associated with the Arya Vysya
                community across Telangana.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
                Select an area from the list to view temple
                information, address, contact details, timings
                and location.
              </p>

            </div>


            {/* Highlight */}

            <div className="rounded-2xl border border-[#ead9b5] bg-white p-7 shadow-sm">

              <div className="flex items-start gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2d2]">
                  <FaPlaceOfWorship className="text-2xl text-[#8a1025]" />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                    Temple Directory
                  </p>

                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#650014]">
                    Sacred Heritage
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    A simple directory to help devotees find
                    Vasavi Ammavari temples and their locations.
                  </p>

                </div>

              </div>

              <div className="mt-6 border-t border-[#eee0c2] pt-5">

                <div className="flex items-center gap-3 text-sm text-gray-600">

                  <FaCheckCircle className="text-[#9b1730]" />

                  <span>
                    Serving devotees with faith and devotion
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TEMPLE DIRECTORY
      ====================================================== */}

      <section className="border-y border-[#eee1c5] bg-white py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          {/* Heading */}

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
              Temple Directory
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#650014] md:text-3xl">
              Find a Temple
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Search temples by name, area or district and
              explore their available details.
            </p>

          </div>


          {/* Search */}

          <div className="mx-auto mt-10 max-w-3xl">

            <div className="flex items-center gap-3 rounded-xl border border-[#eadfca] bg-[#fffdf8] px-5 py-4 shadow-sm">

              <FaSearch className="text-[#9b1730]" />

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


          {/* Main Directory */}

          <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">

            {/* Sidebar */}

            <aside className="h-fit rounded-xl border border-[#eadfca] bg-[#fffdf8]">

              <div className="border-b border-[#eadfca] px-5 py-4">

                <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                  Locations
                </p>

                <h3 className="mt-1 font-serif text-lg font-semibold text-[#650014]">
                  Areas
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Select an area
                </p>

              </div>


              <div className="max-h-[620px] overflow-y-auto p-3">

                {areas.map((area) => {

                  const count =
                    area === "All Areas"
                      ? temples.length
                      : temples.filter(
                          (temple) =>
                            temple.area === area
                        ).length;

                  const active =
                    selectedArea === area;

                  return (

                    <button
                      key={area}
                      onClick={() =>
                        setSelectedArea(area)
                      }
                      className={`mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-sm transition ${
                        active
                          ? "bg-[#650014] font-semibold text-white"
                          : "text-gray-600 hover:bg-[#fff3d7] hover:text-[#650014]"
                      }`}
                    >

                      <span>
                        {area}
                      </span>

                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
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


            {/* Temple Results */}

            <div>

              {/* Result Header */}

              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#9b1730]">
                    Temples
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold text-[#650014]">
                    {selectedArea}
                  </h2>

                </div>

                <div className="rounded-full bg-[#fff3d7] px-4 py-2 text-sm font-medium text-[#650014]">
                  {filteredTemples.length}{" "}
                  {filteredTemples.length === 1
                    ? "Temple"
                    : "Temples"}
                </div>

              </div>


              {/* Temple Cards */}

              <div className="space-y-6">

                {filteredTemples.map((temple) => (

                  <article
                    key={temple.id}
                    className="group overflow-hidden rounded-2xl border border-[#eadfca] bg-[#fffdf8] transition-all duration-300 hover:-translate-y-1 hover:border-[#d7a928] hover:shadow-lg"
                  >

                    <div className="p-6 md:p-7">

                      {/* Card Header */}

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#690015]">

                          <FaPlaceOfWorship className="text-xl text-[#f1c84b]" />

                        </div>

                        <div className="min-w-0 flex-1">

                          <h3 className="font-serif text-xl font-semibold text-[#650014]">
                            {temple.name}
                          </h3>

                          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">

                            <FaMapMarkerAlt className="text-[#9b1730]" />

                            <span>
                              {temple.area}
                            </span>

                            <span className="text-gray-300">
                              •
                            </span>

                            <span>
                              {temple.district}
                            </span>

                          </div>

                        </div>

                      </div>


                      {/* Description */}

                      <p className="mt-5 text-sm leading-7 text-gray-600">
                        {temple.description}
                      </p>


                      {/* Details */}

                      <div className="mt-6 grid gap-5 border-t border-[#eee0c2] pt-6 md:grid-cols-2">

                        {/* Address */}

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                            Address
                          </p>

                          <div className="mt-2 flex items-start gap-3">

                            <FaMapMarkerAlt className="mt-1 shrink-0 text-sm text-[#8a1025]" />

                            <p className="text-sm leading-6 text-gray-600">
                              {temple.address}
                            </p>

                          </div>

                        </div>


                        {/* Timings */}

                        {temple.timings && (

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                              Temple Timings
                            </p>

                            <div className="mt-2 flex items-start gap-3">

                              <FaClock className="mt-1 shrink-0 text-sm text-[#8a1025]" />

                              <p className="text-sm leading-6 text-gray-600">
                                {temple.timings}
                              </p>

                            </div>

                          </div>

                        )}

                      </div>


                      {/* Phone */}

                      {temple.phone && (

                        <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#fff3d7] px-4 py-3">

                          <FaPhoneAlt className="text-sm text-[#8a1025]" />

                          <div>

                            <p className="text-xs font-semibold uppercase tracking-wide text-[#9b1730]">
                              Contact
                            </p>

                            <p className="mt-0.5 text-sm font-medium text-[#650014]">
                              {temple.phone}
                            </p>

                          </div>

                        </div>

                      )}


                      {/* Bottom */}

                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#eee0c2] pt-5">

                        <div className="flex items-center gap-2 text-sm text-gray-500">

                          <FaCheckCircle className="text-[#9b1730]" />

                          <span>
                            Temple information
                          </span>

                        </div>


                        <a
                          href={temple.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#650014] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8a1025]"
                        >

                          <FaMapMarkerAlt />

                          View Location

                        </a>

                      </div>

                    </div>

                  </article>

                ))}

              </div>


              {/* Empty State */}

              {filteredTemples.length === 0 && (

                <div className="rounded-2xl border border-[#eadfca] bg-[#fffdf8] px-6 py-16 text-center">

                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3d7]">

                    <FaPlaceOfWorship className="text-2xl text-[#9b1730]" />

                  </div>

                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#650014]">
                    No Temples Found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Please try another area or search term.
                  </p>

                  <button
                    onClick={() => {
                      setSelectedArea("All Areas");
                      setSearch("");
                    }}
                    className="mt-5 rounded-lg border border-[#650014] px-5 py-2.5 text-sm font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
                  >
                    View All Temples
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMMUNITY SECTION
      ====================================================== */}

      <section className="bg-[#650014] py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-10 md:grid-cols-2">

            {/* Left */}

            <div className="text-white">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                Sacred Heritage
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                Preserving Our Spiritual Heritage
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                Vasavi Ammavari temples hold an important place
                in the spiritual and cultural life of the Arya Vysya
                community. This directory helps devotees discover
                temples and connect with their local community.
              </p>

            </div>


            {/* Right */}

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">

              <div className="grid gap-4 sm:grid-cols-2">

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
                    className="flex items-start gap-3"
                  >

                    <FaCheckCircle className="mt-0.5 shrink-0 text-[#f1c84b]" />

                    <span className="text-sm leading-6 text-white/85">
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
          FOOTER CTA
      ====================================================== */}

      <section className="bg-[#fff3d7] py-12">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
            Aarya Vysya Mahasabha
          </p>

          <h2 className="mt-2 font-serif text-xl font-semibold text-[#650014] md:text-2xl">
            Our Temples, Our Heritage
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Together, let us preserve our sacred places,
            traditions and spiritual heritage for future generations.
          </p>

        </div>

      </section>

    </main>
  );
}