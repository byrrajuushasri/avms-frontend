
"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { getStorageImageUrl } from "@/lib/storage-image-url";
import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaSearch,
  FaBirthdayCake,
  FaTimes,
  FaSlidersH,
} from "react-icons/fa";

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
  gender?: string | null;
  status?: string | null;
  [key: string]: unknown;
}

interface MatchProfile {
  id: string;
  memberId: string;
  name: string;
  age: number | null;
  city: string;
  education: string;
  profession: string;
  image: string;
}

interface MatrimonialSessionUser {
  account_type?: string;
  matrimonial_id?: number | string | null;
}

const DEFAULT_IMAGE = "/images/default-profile.jpg";
const PROFILES_PER_PAGE = 8;

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getStoredUser = () => localStorage.getItem("user");

export default function MatchesPage() {
  const storedUser = useSyncExternalStore(
    subscribeToStorage,
    getStoredUser,
    () => null
  );

  const loggedInUser = useMemo<MatrimonialSessionUser | null>(() => {
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as MatrimonialSessionUser;
    } catch {
      return null;
    }
  }, [storedUser]);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "https://avms-backend-production.up.railway.app";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // IMAGE URL
  const getImageUrl = (photo?: string | null): string => {
    return getStorageImageUrl(photo, API_BASE_URL) || DEFAULT_IMAGE;
  };

  // PROFILE PHOTO
  const getProfilePhoto = (profile: Profile): string | null => {
    const photo =
      profile.photo ||
      profile.profile_photo ||
      profile.photo_url ||
      profile.image ||
      profile.profile_image;

    if (typeof photo !== "string") return null;

    return photo.trim() || null;
  };

  // CALCULATE AGE
  const calculateAge = (dob?: string | null): number | null => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let result = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      result--;
    }

    return result >= 0 && result <= 100 ? result : null;
  };

  // FETCH PROFILES
  useEffect(() => {
    let cancelled = false;

    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Please log in to view matrimonial profiles.");
        }

        const response = await fetch(
          `${API_BASE_URL}/matrimonial-users`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseText = await response.text();

        if (!response.ok) {
          let message = responseText;

          try {
            const parsedError = JSON.parse(responseText);
            message = parsedError.message
              ? Array.isArray(parsedError.message)
                ? parsedError.message.join(", ")
                : parsedError.message
              : responseText;
          } catch {
            // Keep the original response text.
          }

          if (response.status === 401) {
            throw new Error(
              "Your session is invalid or expired. Please log in again."
            );
          }

          throw new Error(`API Error ${response.status}: ${message}`);
        }

        let result: unknown;

        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("The backend returned invalid JSON.");
        }

        let profileList: Profile[] = [];

        if (Array.isArray(result)) {
          profileList = result as Profile[];
        } else if (result && typeof result === "object") {
          const data = result as Record<string, unknown>;

          if (Array.isArray(data.data)) {
            profileList = data.data as Profile[];
          } else if (Array.isArray(data.result)) {
            profileList = data.result as Profile[];
          } else if (Array.isArray(data.members)) {
            profileList = data.members as Profile[];
          } else if (Array.isArray(data.profiles)) {
            profileList = data.profiles as Profile[];
          }
        }

        if (!cancelled) {
          setProfiles(profileList);
        }
      } catch (err) {
        console.error("Failed to fetch matrimonial profiles:", err);

        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load profiles."
          );
          setProfiles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProfiles();

    return () => {
      cancelled = true;
    };
  }, [API_BASE_URL]);

  // CONVERT API DATA FOR DISPLAY
  const displayProfiles = useMemo<MatchProfile[]>(() => {
    return profiles
      .filter((profile) => profile.id !== undefined && profile.id !== null)
      .map((profile) => {
        const databaseId = String(profile.id);

        const memberId =
          profile.member_id || `AV${databaseId.padStart(5, "0")}`;

        const name = profile.full_name || profile.name || "Profile";

        const calculatedAge = calculateAge(
          profile.date_of_birth ||
            profile.dob ||
            profile.dateOfBirth
        );

        const profileCity =
          profile.city ||
          profile.district ||
          profile.mandal ||
          "Location not available";

        const photo = getProfilePhoto(profile);

        return {
          id: databaseId,
          memberId: String(memberId),
          name: String(name),
          age: calculatedAge,
          city: String(profileCity),
          education: String(profile.education || "Education not available"),
          profession: String(
            profile.occupation ||
              profile.profession ||
              "Profession not available"
          ),
          image: getImageUrl(photo),
        };
      });
  }, [profiles, API_BASE_URL]);

  // FILTER PROFILES
  const filteredMatches = useMemo(() => {
    return displayProfiles.filter((member) => {
      const searchValue = search.trim().toLowerCase();

      const searchMatch =
        !searchValue ||
        member.name.toLowerCase().includes(searchValue) ||
        member.memberId.toLowerCase().includes(searchValue);

      let ageMatch = true;

      if (age) {
        if (member.age === null) {
          ageMatch = false;
        } else if (age === "21-25") {
          ageMatch = member.age >= 21 && member.age <= 25;
        } else if (age === "26-30") {
          ageMatch = member.age >= 26 && member.age <= 30;
        } else if (age === "31-35") {
          ageMatch = member.age >= 31 && member.age <= 35;
        }
      }

      const cityMatch = !city || member.city === city;

      return searchMatch && ageMatch && cityMatch;
    });
  }, [displayProfiles, search, age, city]);

  // CITIES
  const cities = useMemo(() => {
    const citySet = new Set<string>();

    displayProfiles.forEach((member) => {
      if (member.city !== "Location not available") {
        citySet.add(member.city);
      }
    });

    return Array.from(citySet).sort();
  }, [displayProfiles]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredMatches.length / PROFILES_PER_PAGE
  );

  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * PROFILES_PER_PAGE,
    currentPage * PROFILES_PER_PAGE
  );

  const clearFilters = () => {
    setSearch("");
    setAge("");
    setCity("");
    setCurrentPage(1);
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 animate-pulse">
            <div className="mx-auto h-8 w-56 rounded bg-gray-200 sm:mx-0" />
            <div className="mt-4 h-5 w-72 rounded bg-gray-100" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="h-36 animate-pulse bg-gray-200" />
                <div className="space-y-4 p-4">
                  <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // ERROR
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FaTimes className="text-xl text-red-500" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Unable to Load Profiles
          </h1>

          <p className="mt-3 break-words text-sm text-gray-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#800018] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012]"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // PAGE
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1.5 text-xs font-semibold text-[#800018]">
              <FaHeart />
              Arya Vysya Matrimony
            </span>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Find Your{" "}
              <span className="text-[#800018]">Perfect Match</span>
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Discover profiles and find your life partner.
            </p>
          </div>

          {loggedInUser?.account_type === "matrimonial" &&
            loggedInUser.matrimonial_id && (
              <Link
                href={`/profile/${loggedInUser.matrimonial_id}`}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#800018] px-5 text-sm font-semibold text-white transition hover:bg-[#600012]"
              >
                Edit My Profile
              </Link>
            )}
        </div>

        {/* SEARCH PANEL */}
        <section className="mb-8 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-[#800018]">
                <FaSlidersH />
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Search Profiles
                </h2>
                <p className="text-xs text-gray-500 sm:text-sm">
                  Find your preferred life partner
                </p>
              </div>
            </div>

            {(search || age || city) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm font-medium text-[#800018] hover:text-rose-900"
              >
                <FaTimes size={12} />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* NAME / MEMBER ID */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                Name / Member ID
              </label>

              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Enter name or ID"
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            {/* AGE */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                Age
              </label>

              <div className="relative">
                <FaBirthdayCake className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#800018]" />
                <select
                  value={age}
                  onChange={(event) => {
                    setAge(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">Any Age</option>
                  <option value="21-25">21 - 25</option>
                  <option value="26-30">26 - 30</option>
                  <option value="31-35">31 - 35</option>
                </select>
              </div>
            </div>

            {/* CITY */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm">
                City
              </label>

              <div className="relative">
                <FaMapMarkerAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#800018]" />
                <select
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">All Cities</option>
                  {cities.map((item) => (
                    <option key={item} value={item}>
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
                onClick={() => setCurrentPage(1)}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#800018] px-4 text-sm font-semibold text-white transition hover:bg-[#600012] active:scale-[0.98]"
              >
                <FaSearch size={13} />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* RESULTS HEADER */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Matching Profiles
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Profiles matching your preferences
            </p>
          </div>

          <div className="w-fit rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-semibold text-[#800018] shadow-sm">
            {filteredMatches.length}{" "}
            {filteredMatches.length === 1 ? "Profile" : "Profiles"}
          </div>
        </div>

        {/* PROFILE CARDS */}
        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedMatches.map((member) => (
              <article
                key={member.id}
                className="group overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* IMAGE: FIXED HEIGHT, FULL PHOTO */}
                <div className="relative h-66 w-full overflow-hidden bg-gray-50">
                  <img
                    src={member.image || DEFAULT_IMAGE}
                    alt={member.name}
                    loading="lazy"
                    className="h-full w-full  object-center"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />

                  {/* FAVORITE DECORATION */}
                  <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm">
                    <FaHeart className="text-sm text-rose-600" />
                  </div>
                </div>

                {/* PROFILE DETAILS */}
                <div className="p-2">
                  <h3 className="truncate text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>

                  {member.age !== null && (
                    <p className="mt-1 text-sm text-gray-500">
                      {member.age} Years
                    </p>
                  )}

                  <div className="mt-1">
                    <span className="inline-block max-w-full truncate rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#800018]">
                      ID: {member.memberId}
                    </span>
                  </div>

                  {/* CITY */}
                  <div className="mt-2 space-y-1">
                    <div className="flex min-w-0 items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaMapMarkerAlt className="text-[#800018]" />
                      </span>
                      <span className="truncate">{member.city}</span>
                    </div>

                    {/* EDUCATION */}
                    <div className="flex min-w-0 items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaGraduationCap className="text-[#800018]" />
                      </span>
                      <span className="truncate">{member.education}</span>
                    </div>

                    {/* PROFESSION */}
                    <div className="flex min-w-0 items-center gap-3 text-sm text-gray-600">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-rose-50">
                        <FaBriefcase className="text-[#800018]" />
                      </span>
                      <span className="truncate">{member.profession}</span>
                    </div>
                  </div>

                  {/* VIEW PROFILE */}
                  <div className="mt-3 border-t border-gray-100 pt-2">
                    <Link
                      href={`/profile/${member.id}`}
                      className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#800018] px-4 text-sm font-semibold text-white transition hover:bg-[#600012] focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                    >
                      View Profile
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* NO RESULTS */
          <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
              <FaSearch className="text-xl text-[#800018]" />
            </div>

            <h3 className="mt-4 text-lg font-bold text-gray-800">
              No Matching Profiles
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              We could not find profiles matching your selected filters.
              Try changing your search criteria.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-lg bg-[#800018] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012]"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <nav
            aria-label="Profile pages"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? "border-[#800018] bg-[#800018] text-white"
                      : "border-rose-200 bg-white text-[#800018] hover:bg-rose-50"
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
