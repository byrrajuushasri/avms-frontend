"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

// =========================================================
// PROFILE INTERFACE
// =========================================================

interface Profile {
  id?: number | string;
  member_id?: string | null;
  name?: string | null;
  full_name?: string | null;

  photo?: string | null;
  profile_photo?: string | null;
  photo_url?: string | null;
  image?: string | null;
  profile_image?: string | null;

  date_of_birth?: string | null;
  dob?: string | null;
  dateOfBirth?: string | null;

  height?: string | null;
  education?: string | null;

  occupation?: string | null;
  profession?: string | null;

  annual_income?: string | number | null;
  income?: string | number | null;

  address?: string | null;
  city?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;

  religion?: string | null;
  caste?: string | null;
  gotram?: string | null;
  mother_tongue?: string | null;
  marital_status?: string | null;
  physical_status?: string | null;

  about?: string | null;
  about_me?: string | null;
  description?: string | null;

  gender?: string | null;
  status?: string | null;

  [key: string]: unknown;
}

// =========================================================
// DISPLAY PROFILE
// =========================================================

interface MatchProfile {
  id: string;
  memberId: string;
  name: string;
  age: number | null;
  gender: string;
  city: string;
  education: string;
  profession: string;
  image: string;
}

// =========================================================
// DEFAULT IMAGE
// =========================================================

const DEFAULT_IMAGE = "/images/default-profile.jpg";

// =========================================================
// PAGE
// =========================================================

export default function MatchesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  // =========================================================
  // BACKEND URL
  // =========================================================

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (photo?: string | null): string => {
    if (!photo) {
      return DEFAULT_IMAGE;
    }

    const value = String(photo).trim();

    if (!value) {
      return DEFAULT_IMAGE;
    }

    // Already full URL
    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    // Starts with /uploads/
    if (value.startsWith("/uploads/")) {
      return `${API_BASE_URL}${value}`;
    }

    // Starts with uploads/
    if (value.startsWith("uploads/")) {
      return `${API_BASE_URL}/${value}`;
    }

    // /matrimonial/file.jpg
    if (value.startsWith("/matrimonial/")) {
      return `${API_BASE_URL}/uploads${value}`;
    }

    // /members/file.jpg
    if (value.startsWith("/members/")) {
      return `${API_BASE_URL}/uploads${value}`;
    }

    // filename only
    return `${API_BASE_URL}/uploads/matrimonial/${value}`;
  };

  // =========================================================
  // GET PROFILE PHOTO
  // =========================================================

  const getProfilePhoto = (
    profile: Profile
  ): string | null => {
    const possiblePhoto =
      profile.photo ??
      profile.profile_photo ??
      profile.photo_url ??
      profile.image ??
      profile.profile_image;

    if (!possiblePhoto) {
      return null;
    }

    const value = String(possiblePhoto).trim();

    return value || null;
  };

  // =========================================================
  // CALCULATE AGE
  // =========================================================

  const calculateAge = (
    dob?: string | null
  ): number | null => {
    if (!dob) {
      return null;
    }

    const birthDate = new Date(dob);

    if (Number.isNaN(birthDate.getTime())) {
      return null;
    }

    const today = new Date();

    let calculatedAge =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    if (
      calculatedAge < 0 ||
      calculatedAge > 100
    ) {
      return null;
    }

    return calculatedAge;
  };

  // =========================================================
  // FETCH PROFILES
  // =========================================================

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          `${API_BASE_URL}/matrimonial-users`;

        console.log("=================================");
        console.log("MATCHES API:", apiUrl);
        console.log("=================================");

        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        console.log(
          "Matches API status:",
          response.status
        );

        const responseText =
          await response.text();

        console.log(
          "Matches API response:",
          responseText
        );

        if (!response.ok) {
          throw new Error(
            `API Error ${response.status}: ${responseText}`
          );
        }

        let result: unknown;

        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid JSON."
          );
        }

        // =====================================================
        // HANDLE DIFFERENT API RESPONSE SHAPES
        // =====================================================

        let profileList: Profile[] = [];

        if (Array.isArray(result)) {
          profileList = result as Profile[];
        } else if (
          result &&
          typeof result === "object"
        ) {
          const responseObject =
            result as Record<string, unknown>;

          if (Array.isArray(responseObject.data)) {
            profileList =
              responseObject.data as Profile[];
          } else if (
            Array.isArray(responseObject.result)
          ) {
            profileList =
              responseObject.result as Profile[];
          } else if (
            Array.isArray(responseObject.members)
          ) {
            profileList =
              responseObject.members as Profile[];
          } else if (
            Array.isArray(responseObject.profiles)
          ) {
            profileList =
              responseObject.profiles as Profile[];
          }
        }

        console.log(
          "TOTAL PROFILES:",
          profileList.length
        );

        console.log(
          "ALL PROFILES:",
          profileList
        );

        // Debug first profile
        if (profileList.length > 0) {
          console.log(
            "FIRST PROFILE:",
            profileList[0]
          );

          console.log(
            "FIRST PROFILE PHOTO:",
            getProfilePhoto(profileList[0])
          );

          console.log(
            "FIRST PROFILE IMAGE URL:",
            getImageUrl(
              getProfilePhoto(profileList[0])
            )
          );
        }

        setProfiles(profileList);
      } catch (err) {
        console.error(
          "Failed to fetch matches:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load profiles."
        );

        setProfiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [API_BASE_URL]);

  // =========================================================
  // CONVERT API DATA
  // =========================================================

  const displayProfiles =
    useMemo<MatchProfile[]>(() => {
      return profiles.map(
        (profile, index) => {
          const databaseId =
            profile.id ??
            index + 1;

          const memberId =
            profile.member_id ??
            `AV${String(databaseId).padStart(5, "0")}`;

          const name =
            profile.full_name ||
            profile.name ||
            "Profile";

          const profileGender =
            profile.gender ||
            "Not specified";

          const calculatedAge =
            calculateAge(
              profile.date_of_birth ||
                profile.dob ||
                profile.dateOfBirth
            );

          const profileCity =
            profile.city ||
            profile.district ||
            profile.mandal ||
            "Location not available";

          const profileEducation =
            profile.education ||
            "Education not available";

          const profileProfession =
            profile.occupation ||
            profile.profession ||
            "Profession not available";

          const photo =
            getProfilePhoto(profile);

          const imageUrl =
            getImageUrl(photo);

          return {
            id: String(databaseId),
            memberId: String(memberId),
            name,
            age: calculatedAge,
            gender: String(profileGender),
            city: String(profileCity),
            education: String(profileEducation),
            profession: String(profileProfession),
            image: imageUrl,
          };
        }
      );
    }, [profiles, API_BASE_URL]);

  // =========================================================
  // FILTER PROFILES
  // =========================================================

  const filteredMatches =
    useMemo(() => {
      return displayProfiles.filter(
        (member) => {
          // GENDER
          const genderMatch =
            gender === "" ||
            member.gender.toLowerCase() ===
              gender.toLowerCase();

          // SEARCH
          const searchValue =
            search.trim().toLowerCase();

          const searchMatch =
            searchValue === "" ||
            member.name
              .toLowerCase()
              .includes(searchValue) ||
            member.memberId
              .toLowerCase()
              .includes(searchValue);

          // AGE
          let ageMatch = true;

          if (age !== "") {
            if (member.age === null) {
              ageMatch = false;
            } else if (age === "21-25") {
              ageMatch =
                member.age >= 21 &&
                member.age <= 25;
            } else if (age === "26-30") {
              ageMatch =
                member.age >= 26 &&
                member.age <= 30;
            } else if (age === "31-35") {
              ageMatch =
                member.age >= 31 &&
                member.age <= 35;
            }
          }

          // CITY
          const cityMatch =
            city === "" ||
            member.city === city;

          return (
            genderMatch &&
            searchMatch &&
            ageMatch &&
            cityMatch
          );
        }
      );
    }, [
      displayProfiles,
      search,
      gender,
      age,
      city,
    ]);

  // =========================================================
  // DYNAMIC CITIES
  // =========================================================

  const cities = useMemo(() => {
    const citySet = new Set<string>();

    displayProfiles.forEach((member) => {
      if (
        member.city &&
        member.city !==
          "Location not available"
      ) {
        citySet.add(member.city);
      }
    });

    return Array.from(citySet).sort();
  }, [displayProfiles]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setGender("");
    setAge("");
    setCity("");
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 text-center">
            <div className="mx-auto h-8 w-56 animate-pulse rounded-full bg-gray-200" />
            <div className="mx-auto mt-5 h-10 w-80 animate-pulse rounded bg-gray-200" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-3xl bg-white shadow-md"
                >
                  <div className="h-72 animate-pulse bg-gray-200" />

                  <div className="space-y-4 p-5">
                    <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-16">
        <div className="mx-auto max-w-xl px-4">
          <div className="rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <FaTimes className="text-2xl text-red-500" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-gray-800">
              Unable to Load Profiles
            </h1>

            <p className="mt-3 text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}

        <div className="mb-10 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">
            <FaHeart />
            Arya Vysya Matrimony
          </span>

          <h1 className="text-2xl text-gray-900 sm:text-3xl">
            Find Your{" "}
            <span className="font-semibold text-rose-600">
              Perfect Match
            </span>{" "}
            ❤️
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover Arya Vysya profiles based on your
            preferred partner details.
          </p>
        </div>

        {/* SEARCH PANEL */}

        <div className="mb-10 rounded-3xl border border-rose-100 bg-white p-5 shadow-xl sm:p-7">

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
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

            {(search ||
              gender ||
              age ||
              city) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
              >
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Name / Member ID
              </label>

              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search profile..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            {/* GENDER */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Looking For
              </label>

              <div className="relative">
                <FaVenusMars className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" />

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">
                    All Profiles
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Male">
                    Male
                  </option>
                </select>
              </div>
            </div>

            {/* AGE */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Age
              </label>

              <div className="relative">
                <FaBirthdayCake className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" />

                <select
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">
                    Any Age
                  </option>

                  <option value="21-25">
                    21 - 25
                  </option>

                  <option value="26-30">
                    26 - 30
                  </option>

                  <option value="31-35">
                    31 - 35
                  </option>
                </select>
              </div>
            </div>

            {/* CITY */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                City
              </label>

              <div className="relative">
                <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-rose-500" />

                <select
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value)
                  }
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">
                    All Cities
                  </option>

                  {cities.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SEARCH BUTTON */}

            <div className="flex items-end">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 py-3 font-semibold text-white shadow-md transition hover:from-rose-700 hover:to-pink-700 hover:shadow-lg"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* RESULTS HEADER */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Matching Profiles
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Profiles matching your preferences
            </p>
          </div>

          <div className="rounded-full border border-rose-100 bg-white px-5 py-2.5 font-semibold text-rose-700 shadow-sm">
            {filteredMatches.length}{" "}
            {filteredMatches.length === 1
              ? "Profile"
              : "Profiles"}
          </div>
        </div>

        {/* CARDS */}

        {filteredMatches.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMatches.map((member) => (
              <div
                key={member.id}
                className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
              >
                {/* IMAGE */}

                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src =
                        DEFAULT_IMAGE;
                    }}
                  />

                  {/* GENDER */}

                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow backdrop-blur-sm">
                    {member.gender}
                  </div>

                  {/* HEART */}

                  <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow backdrop-blur-sm">
                    <FaHeart className="text-lg text-rose-600" />
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900">
                    {member.name}
                  </h3>

                  {member.age !== null && (
                    <p className="mt-1 text-sm text-gray-500">
                      {member.age} Years
                    </p>
                  )}

                  {/* MEMBER ID */}

                  <div className="mt-3">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      ID: {member.memberId}
                    </span>
                  </div>

                  {/* DETAILS */}

                  <div className="mt-5 space-y-3">

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaMapMarkerAlt className="text-rose-600" />
                      </span>

                      <span className="truncate">
                        {member.city}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaGraduationCap className="text-rose-600" />
                      </span>

                      <span className="truncate">
                        {member.education}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaBriefcase className="text-rose-600" />
                      </span>

                      <span className="truncate">
                        {member.profession}
                      </span>
                    </div>
                  </div>

                  {/* VIEW PROFILE ONLY */}

                  <div className="mt-6">
                    <Link
                      href={`/profile/${member.id}`}
                      className="block w-full rounded-xl bg-rose-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-rose-700"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* NO RESULTS */

          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
              <FaSearch className="text-2xl text-rose-500" />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-800">
              No Matching Profiles
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-500">
              We couldn't find profiles matching your selected
              preferences. Try changing your search filters.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}