"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
   SATRAM DATA
   Replace this sample data with your API data later.
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
  annadanam: boolean;
  accommodation: boolean;
};

const satramData: Satram[] = [
  {
    id: 1,
    name: "Akhila Bharatha Kanipaka Kshetra Arya Vysya Nityannapurna Satram",
    state: "Andhra Pradesh",
    district: "Chittoor",
    mandal: "Iral",
    sangam: "Kanipakam Arya Vysya Sangam",
    place: "Kanipakam",
    address: "Near Sri Varasiddi Vinayaka Swamy Temple, Kanipakam",
    contact: "08573-281212",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 2,
    name: "Sri Swayambu Varasiddi Vinayaka Swamy Kshetra Arya Vysya Vasavi Nityannadana Satram",
    state: "Andhra Pradesh",
    district: "Chittoor",
    mandal: "Iral",
    sangam: "Kanipakam Vasavi Sangam",
    place: "Kanipakam",
    address: "Temple Road, Kanipakam",
    contact: "08573-281484",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 3,
    name: "Vasavi Nivas Arya Vysya Nityanna Satram",
    state: "Andhra Pradesh",
    district: "Sri Sathya Sai",
    mandal: "Puttaparthi",
    sangam: "Puttaparthi Arya Vysya Sangam",
    place: "Puttaparthi",
    address: "Near Sri Sathya Sai Temple, Puttaparthi",
    contact: "08555-287240",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 4,
    name: "Arya Vysya Nitya Anna Satram",
    state: "Andhra Pradesh",
    district: "Kurnool",
    mandal: "Mantralayam",
    sangam: "Mantralayam Arya Vysya Sangam",
    place: "Mantralayam",
    address: "Near Sri Raghavendra Swamy Temple, Mantralayam",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 5,
    name: "Akhila Bharatha Srisaila Kshetra Arya Vysya Nithya Annapurna Satram",
    state: "Andhra Pradesh",
    district: "Nandyal",
    mandal: "Srisailam",
    sangam: "Srisaila Arya Vysya Sangam",
    place: "Srisailam",
    address: "Near Srisailam Bus Stand, Srisailam",
    contact: "9490197035",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 6,
    name: "Sri Durga Malleswara Vasavi Arya Vysya Sathram",
    state: "Andhra Pradesh",
    district: "NTR",
    mandal: "Vijayawada",
    sangam: "Vijayawada Arya Vysya Sangam",
    place: "Vijayawada",
    address: "Durga Agraharam, Vijayawada",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 7,
    name: "Srimath Ahobilam Aryavysya Satram",
    state: "Andhra Pradesh",
    district: "Nandyal",
    mandal: "Ahobilam",
    sangam: "Ahobilam Arya Vysya Sangam",
    place: "Diguva Ahobilam",
    address: "Diguva Ahobilam, Nandyal District",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 8,
    name: "Simhachalam Arya Vysya Satram",
    state: "Andhra Pradesh",
    district: "Visakhapatnam",
    mandal: "Visakhapatnam",
    sangam: "Simhachalam Arya Vysya Sangam",
    place: "Simhachalam",
    address: "Near Simhachalam Temple, Visakhapatnam",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 9,
    name: "Sri Kasi Annapurna Vasavi Arya Vysya Satram",
    state: "Telangana",
    district: "Hyderabad",
    mandal: "Himayatnagar",
    sangam: "Hyderabad Arya Vysya Sangam",
    place: "Hyderabad",
    address: "Near TTD Devasthanam, Himayatnagar, Hyderabad",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 10,
    name: "Arya Vysya Satram",
    state: "Telangana",
    district: "Rajanna Sircilla",
    mandal: "Vemulawada",
    sangam: "Vemulawada Arya Vysya Sangam",
    place: "Vemulawada",
    address: "Near Raja Rajeshwara Swamy Temple, Vemulawada",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 11,
    name: "Arya Vysya Satram",
    state: "Telangana",
    district: "Yadadri Bhuvanagiri",
    mandal: "Yadagirigutta",
    sangam: "Yadagirigutta Arya Vysya Sangam",
    place: "Yadagirigutta",
    address: "Near Yadadri Temple, Yadagirigutta",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 12,
    name: "Arya Vysya Satram",
    state: "Karnataka",
    district: "Vijayanagara",
    mandal: "Hospet",
    sangam: "Hampi Arya Vysya Sangam",
    place: "Hampi",
    address: "Near Virupaksha Temple, Hampi",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 13,
    name: "Arya Vysya Satram",
    state: "Karnataka",
    district: "Raichur",
    mandal: "Mantralayam",
    sangam: "Mantralayam Arya Vysya Sangam",
    place: "Mantralayam",
    address: "Mantralayam, Raichur District",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 14,
    name: "Sri Sai Annapurna Arya Vysya Nityannadana Satram Trust",
    state: "Maharashtra",
    district: "Ahmednagar",
    mandal: "Shirdi",
    sangam: "Shirdi Arya Vysya Sangam",
    place: "Shirdi",
    address: "Near Shirdi Sai Baba Temple, Shirdi",
    contact: "02423-255809",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 15,
    name: "Sri Kasi Annapurna Vasavi Arya Vysya Vruddhaashramam & Nityanna Satram",
    state: "Maharashtra",
    district: "Ahmednagar",
    mandal: "Shirdi",
    sangam: "Shirdi Arya Vysya Sangam",
    place: "Shirdi",
    address: "Shirdi, Maharashtra",
    contact: "9822893791",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 16,
    name: "Arya Vysya Satram",
    state: "Tamil Nadu",
    district: "Kancheepuram",
    mandal: "Kanchipuram",
    sangam: "Kanchipuram Arya Vysya Sangam",
    place: "Kanchipuram",
    address: "Near Kamakshi Amman Temple, Kanchipuram",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 17,
    name: "Arya Vysya Vasavi Nityanna Satram",
    state: "Tamil Nadu",
    district: "Ramanathapuram",
    mandal: "Rameshwaram",
    sangam: "Rameshwaram Arya Vysya Sangam",
    place: "Rameshwaram",
    address: "Near Old Market Street, Rameshwaram",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 18,
    name: "Arya Vysya Satram",
    state: "Odisha",
    district: "Puri",
    mandal: "Puri",
    sangam: "Puri Arya Vysya Sangam",
    place: "Puri",
    address: "Near Jagannath Temple, Puri",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 19,
    name: "Sri Kasi Annapurna Vasavi Arya Vysya Nityanna Satram",
    state: "Uttar Pradesh",
    district: "Varanasi",
    mandal: "Varanasi",
    sangam: "Kasi Arya Vysya Sangam",
    place: "Varanasi",
    address: "Ramapura Luxa Road, Varanasi",
    contact: "-",
    annadanam: true,
    accommodation: true,
  },
  {
    id: 20,
    name: "Sri Kasi Annapurna Vasavi Arya Vysya Satram",
    state: "Uttarakhand",
    district: "Haridwar",
    mandal: "Haridwar",
    sangam: "Haridwar Arya Vysya Sangam",
    place: "Haridwar",
    address: "Bhupatwala, Haridwar",
    contact: "9870971944",
    annadanam: true,
    accommodation: true,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function StateSatramsPage() {
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedDistrict, setSelectedDistrict] =
    useState("All Districts");
  const [selectedMandal, setSelectedMandal] =
    useState("All Mandals");
  const [selectedSangam, setSelectedSangam] =
    useState("All Sangams");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  /* =========================================================
     DROPDOWN DATA
  ========================================================= */

  const states = useMemo(() => {
    return [
      "All States",
      ...Array.from(
        new Set(satramData.map((item) => item.state))
      ).sort(),
    ];
  }, []);

  const districts = useMemo(() => {
    const data =
      selectedState === "All States"
        ? satramData
        : satramData.filter(
            (item) => item.state === selectedState
          );

    return [
      "All Districts",
      ...Array.from(
        new Set(data.map((item) => item.district))
      ).sort(),
    ];
  }, [selectedState]);

  const mandals = useMemo(() => {
    let data = satramData;

    if (selectedState !== "All States") {
      data = data.filter(
        (item) => item.state === selectedState
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (item) => item.district === selectedDistrict
      );
    }

    return [
      "All Mandals",
      ...Array.from(
        new Set(data.map((item) => item.mandal))
      ).sort(),
    ];
  }, [selectedState, selectedDistrict]);

  const sangams = useMemo(() => {
    let data = satramData;

    if (selectedState !== "All States") {
      data = data.filter(
        (item) => item.state === selectedState
      );
    }

    if (selectedDistrict !== "All Districts") {
      data = data.filter(
        (item) => item.district === selectedDistrict
      );
    }

    if (selectedMandal !== "All Mandals") {
      data = data.filter(
        (item) => item.mandal === selectedMandal
      );
    }

    return [
      "All Sangams",
      ...Array.from(
        new Set(data.map((item) => item.sangam))
      ).sort(),
    ];
  }, [
    selectedState,
    selectedDistrict,
    selectedMandal,
  ]);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredSatrams = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    return satramData.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.state.toLowerCase().includes(keyword) ||
        item.district.toLowerCase().includes(keyword) ||
        item.mandal.toLowerCase().includes(keyword) ||
        item.sangam.toLowerCase().includes(keyword) ||
        item.place.toLowerCase().includes(keyword);

      const matchesState =
        selectedState === "All States" ||
        item.state === selectedState;

      const matchesDistrict =
        selectedDistrict === "All Districts" ||
        item.district === selectedDistrict;

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

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const paginatedSatrams = filteredSatrams.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const resetPage = () => {
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedState("All States");
    setSelectedDistrict("All Districts");
    setSelectedMandal("All Mandals");
    setSelectedSangam("All Sangams");
    setCurrentPage(1);
  };

  /* =========================================================
     SELECT HANDLERS
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

  const handleDistrictChange = (
    value: string
  ) => {
    setSelectedDistrict(value);
    setSelectedMandal("All Mandals");
    setSelectedSangam("All Sangams");
    resetPage();
  };

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
    satramData.map((item) => item.state)
  ).size;

  const districtCount = new Set(
    satramData.map((item) => item.district)
  ).size;

  const sangamCount = new Set(
    satramData.map((item) => item.sangam)
  ).size;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ===================================================== */}
<section className="relative overflow-hidden border-b border-slate-200 bg-white">
  <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

    {/* Back Button */}
    <Link
      href="/Satrams"
      className="mb-7 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
    >
      <FaArrowLeft className="text-xs" />
      Back to Satrams
    </Link>

    {/* Heading */}
    <div className="max-w-4xl">

      {/* Small Label */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-100 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700">
        <FaUtensils className="text-rose-600" />
        Arya Vysya Annadana Satrams
      </div>

      
      {/* Description */}
      <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg">
        Explore Arya Vysya Annadana Satrams across
        different states, districts, mandals and
        Sangams in one place.
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
                  Page {currentPage} of{" "}
                  {Math.max(totalPages, 1)}
                </p>

              </div>

              {/* Cards */}

              <div className="grid gap-5 lg:grid-cols-2">

                {paginatedSatrams.map((satram) => (

                  <SatramCard
                    key={satram.id}
                    satram={satram}
                  />

                ))}

              </div>

              {/* Pagination */}

              {totalPages > 1 && (

                <div className="mt-8 flex items-center justify-center gap-2">

                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(page - 1, 1)
                      )
                    }
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaArrowLeft />
                    Previous
                  </button>

                  <div className="hidden items-center gap-1 sm:flex">

                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    ).map((page) => (

                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`h-10 min-w-10 rounded-lg px-3 text-sm font-bold transition ${
                          currentPage === page
                            ? "bg-rose-600 text-white shadow-sm"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-rose-50 hover:text-rose-700"
                        }`}
                      >
                        {page}
                      </button>

                    ))}

                  </div>

                  <button
                    disabled={
                      currentPage === totalPages
                    }
                    onClick={() =>
                      setCurrentPage((page) =>
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
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-yellow-200">
          {icon}
        </div>

        <div>
          <p className="text-2xl font-extrabold text-white">
            {value}
          </p>

          <p className="text-xs font-medium text-white/75">
            {label}
          </p>
        </div>

      </div>

    </div>
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

              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
                {satram.state}
              </span>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                {satram.district}
              </span>

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
            value={satram.place}
          />

          <DetailItem
            icon={<FaMapMarkerAlt />}
            label="Mandal"
            value={satram.mandal}
          />

          <DetailItem
            icon={<FaUsers />}
            label="Sangam"
            value={satram.sangam}
          />

          <DetailItem
            icon={<FaPhoneAlt />}
            label="Contact"
            value={satram.contact}
          />

        </div>

        {/* Address */}

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
              {satram.district}
            </p>

          </div>

          {satram.contact !== "-" && (
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
