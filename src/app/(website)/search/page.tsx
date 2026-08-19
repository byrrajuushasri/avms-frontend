"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaSearch,
  FaVenusMars,
  FaBirthdayCake,
  FaTimes,
  FaSlidersH,
} from "react-icons/fa";

const matches = [
  {
    id: "AV1001",
    name: "Sowmya",
    age: 25,
    gender: "Female",
    city: "Hyderabad",
    education: "B.Tech",
    profession: "Software Engineer",
    image: "/matches/girl1.jpg",
  },
  {
    id: "AV1002",
    name: "Keerthana",
    age: 24,
    gender: "Female",
    city: "Vijayawada",
    education: "MBA",
    profession: "Bank Officer",
    image: "/matches/girl2.jpg",
  },
  {
    id: "AV1003",
    name: "Harsha",
    age: 28,
    gender: "Male",
    city: "Visakhapatnam",
    education: "M.Tech",
    profession: "Business",
    image: "/matches/groom1.jpg",
  },
  {
    id: "AV1004",
    name: "Anusha",
    age: 26,
    gender: "Female",
    city: "Guntur",
    education: "B.Pharmacy",
    profession: "Pharmacist",
    image: "/matches/girl3.jpg",
  },
  {
    id: "AV1005",
    name: "Rahul",
    age: 29,
    gender: "Male",
    city: "Hyderabad",
    education: "B.Tech",
    profession: "Software Developer",
    image: "/matches/groom1.jpg",
  },
  {
    id: "AV1006",
    name: "Karthik",
    age: 27,
    gender: "Male",
    city: "Vijayawada",
    education: "MBA",
    profession: "Business Executive",
    image: "/matches/groom1.jpg",
  },
  {
    id: "AV1007",
    name: "Karthik",
    age: 27,
    gender: "Male",
    city: "Vijayawada",
    education: "MBA",
    profession: "Business Executive",
    image: "/matches/boy1.jpg",
  },
];

export default function MatchesPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const filteredMatches = useMemo(() => {
    return matches.filter((member) => {
      /*
       * Gender matching:
       * Female selected -> Male profiles
       * Male selected   -> Female profiles
       */
      let genderMatch = true;

      if (gender === "Female") {
        genderMatch = member.gender === "Male";
      }

      if (gender === "Male") {
        genderMatch = member.gender === "Female";
      }

      const searchMatch =
        search.trim() === "" ||
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.id.toLowerCase().includes(search.toLowerCase());

      let ageMatch = true;

      if (age === "21-25") {
        ageMatch = member.age >= 21 && member.age <= 25;
      }

      if (age === "26-30") {
        ageMatch = member.age >= 26 && member.age <= 30;
      }

      if (age === "31-35") {
        ageMatch = member.age >= 31 && member.age <= 35;
      }

      const cityMatch =
        city === "" || member.city === city;

      return (
        genderMatch &&
        searchMatch &&
        ageMatch &&
        cityMatch
      );
    });
  }, [search, gender, age, city]);

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setAge("");
    setCity("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <FaHeart />
            Arya Vysya Matrimony
          </span>

          <h1 className="text-1xl sm:text-2xl md:text-2xl   text-gray-900">
            Find Your{" "}
            <span className="text-rose-600">
              Perfect Match
            </span>{" "}
            ❤️
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Discover verified Arya Vysya profiles based on your
            preferred partner details.
          </p>
        </div>

        {/* ================= SEARCH PANEL ================= */}
        <div className="bg-white rounded-3xl shadow-xl border border-rose-100 p-5 sm:p-7 mb-10">

          {/* Search Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

            <div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <FaSlidersH />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Search Profiles
                  </h2>

                  <p className="text-sm text-gray-500">
                    Choose your partner preferences
                  </p>
                </div>
              </div>
            </div>

            {(search || gender || age || city) && (
              <button
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
              >
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>

          {/* Search Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

            {/* Name / ID */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name / Member ID
              </label>

              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search profile..."
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-gray-700 outline-none transition focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Looking For
              </label>

              <div className="relative">
                <FaVenusMars className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full appearance-none border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-gray-700 outline-none transition focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="Female">
                    Female
                  </option>
                  <option value="Male">
                    Male
                  </option>
                </select>
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age
              </label>

              <div className="relative">
                <FaBirthdayCake className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" />

                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full appearance-none border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-gray-700 outline-none transition focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 cursor-pointer"
                >
                  <option value="">Any Age</option>
                  <option value="21-25">21 - 25</option>
                  <option value="26-30">26 - 30</option>
                  <option value="31-35">31 - 35</option>
                </select>
              </div>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none" />

                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full appearance-none border border-gray-200 bg-gray-50 rounded-xl pl-11 pr-4 py-3 text-gray-700 outline-none transition focus:bg-white focus:border-rose-400 focus:ring-2 focus:ring-rose-100 cursor-pointer"
                >
                  <option value="">All Cities</option>
                  <option value="Hyderabad">
                    Hyderabad
                  </option>
                  <option value="Vijayawada">
                    Vijayawada
                  </option>
                  <option value="Visakhapatnam">
                    Visakhapatnam
                  </option>
                  <option value="Guntur">
                    Guntur
                  </option>
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="button"
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>

          {/* Gender Info */}
          {gender && (
            <div className="mt-5 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-sm text-rose-700">
              {gender === "Female" ? (
                <>
                  Showing <strong>Male</strong> profiles because you
                  selected <strong>Female</strong>.
                </>
              ) : (
                <>
                  Showing <strong>Female</strong> profiles because you
                  selected <strong>Male</strong>.
                </>
              )}
            </div>
          )}
        </div>

        {/* ================= RESULTS HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-7">

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Matching Profiles
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Profiles matching your preferences
            </p>
          </div>

          <div className="bg-white border border-rose-100 shadow-sm text-rose-700 px-5 py-2.5 rounded-full font-semibold">
            {filteredMatches.length}{" "}
            {filteredMatches.length === 1
              ? "Profile"
              : "Profiles"}
          </div>
        </div>

        {/* ================= CARDS ================= */}
        {filteredMatches.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredMatches.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300"
              >

                {/* Image */}
                <div className="relative overflow-hidden">

                  <Image
                    src={member.image}
                    alt={member.name}
                    width={500}
                    height={500}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />

                  {/* Gender Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow">
                    {member.gender}
                  </div>

                  {/* Heart */}
                  <button
                    type="button"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow hover:bg-rose-50 transition"
                  >
                    <FaHeart className="text-rose-600 text-lg" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {member.name}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {member.age} Years
                      </p>
                    </div>

                  </div>

                  {/* Member ID */}
                  <div className="mt-3">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                      ID: {member.id}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-rose-600" />
                      </span>
                      {member.city}
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                        <FaGraduationCap className="text-rose-600" />
                      </span>
                      {member.education}
                    </div>

                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <span className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                        <FaBriefcase className="text-rose-600" />
                      </span>
                      {member.profession}
                    </div>

                  </div>

                  {/* Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <Link
                      href={`/profile/${member.id}`}
                      className="bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-semibold text-sm text-center transition"
                    >
                      View Profile
                    </Link>

                    <button
                      type="button"
                      className="border border-rose-600 text-rose-600 hover:bg-rose-50 py-2.5 rounded-xl font-semibold text-sm transition"
                    >
                      Interest
                    </button>

                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (
          /* ================= NO RESULTS ================= */
          <div className="bg-white rounded-3xl border border-gray-100 shadow-md py-16 px-6 text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 flex items-center justify-center">
              <FaSearch className="text-rose-500 text-2xl" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mt-5">
              No Matching Profiles
            </h3>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              We couldn't find profiles matching your selected
              preferences. Try changing your search filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>
    </main>
  );
}