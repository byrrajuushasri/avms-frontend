"use client";

import Link from "next/link";
import { useEffect, useState, type SyntheticEvent } from "react";

import {
  FaHeart,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
  FaUser,
  FaRulerVertical,
} from "react-icons/fa";

interface Profile {
  id: number;
  member_id: string;
  name: string;
  date_of_birth?: string | null;
  height?: string | null;
  education?: string | null;
  occupation?: string | null;
  address?: string | null;
  photo?: string | null;
  profile_photo?: string | null;
  status?: string | null;
  membership?: string | null;

  createdAt?: string | null;
  created_at?: string | null;
  registeredAt?: string | null;
  registered_at?: string | null;
  registration_date?: string | null;

  [key: string]: unknown;
}

export default function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // =========================================================
  // TOGGLE FAVOURITE
  // =========================================================
  const toggleLike = (id: string) => {
    setLikedProfiles((prev) =>
      prev.includes(id)
        ? prev.filter((profileId) => profileId !== id)
        : [...prev, id]
    );
  };

  // =========================================================
  // GET REGISTRATION TIME
  // =========================================================
  const getRegistrationTime = (profile: Profile): number => {
    const date =
      profile.createdAt ||
      profile.created_at ||
      profile.registeredAt ||
      profile.registered_at ||
      profile.registration_date;

    if (!date) return 0;

    const timestamp = new Date(date).getTime();

    return Number.isNaN(timestamp) ? 0 : timestamp;
  };

  // =========================================================
  // FETCH PROFILES
  // ONLY LATEST 4 WILL BE DISPLAYED
  // =========================================================
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/matrimonial-users`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch profiles (${response.status})`
          );
        }

        const data = await response.json();

        // =====================================================
        // NORMALIZE API RESPONSE
        // =====================================================
        let list: Profile[] = [];

        if (Array.isArray(data)) {
          list = data;
        } else if (Array.isArray(data?.data)) {
          list = data.data;
        } else if (Array.isArray(data?.members)) {
          list = data.members;
        } else if (Array.isArray(data?.results)) {
          list = data.results;
        }

        // =====================================================
        // GET ONLY LATEST 4 PROFILES
        //
        // 1. Latest registration date first
        // 2. If registration dates are same/missing,
        //    higher database ID comes first
        // 3. Finally take ONLY 4
        // =====================================================
        const latestFour = [...list]
          .sort((a, b) => {
            const dateDifference =
              getRegistrationTime(b) -
              getRegistrationTime(a);

            if (dateDifference !== 0) {
              return dateDifference;
            }

            return Number(b.id || 0) -
              Number(a.id || 0);
          })
          .slice(0, 4);

        // IMPORTANT:
        // Only these 4 profiles are stored in state.
        setProfiles(latestFour);
      } catch (err) {
        console.error(
          "Featured Profiles API Error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load profiles."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [API_BASE_URL]);

  // =========================================================
  // CALCULATE AGE
  // =========================================================
  const calculateAge = (
    dob?: string | null
  ): number | null => {
    if (!dob) return null;

    const birthDate = new Date(dob);

    if (
      Number.isNaN(birthDate.getTime()) ||
      birthDate.getFullYear() < 1900
    ) {
      return null;
    }

    const today = new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const month =
      today.getMonth() -
      birthDate.getMonth();

    if (
      month < 0 ||
      (month === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 0 || age > 100) {
      return null;
    }

    return age;
  };

  // =========================================================
  // BUILD PROFILE PHOTO URL
  // =========================================================
  const getPhotoUrl = (
    profile: Profile
  ): string => {
    const photo =
      profile.photo ||
      profile.profile_photo;

    if (!photo || !String(photo).trim()) {
      return "/images/default-profile.jpg";
    }

    const photoString = String(photo).trim();

    if (
      photoString.startsWith("http://") ||
      photoString.startsWith("https://")
    ) {
      return photoString;
    }

    if (photoString.startsWith("/")) {
      return `${API_BASE_URL}${photoString}`;
    }

    if (photoString.startsWith("uploads/")) {
      return `${API_BASE_URL}/${photoString}`;
    }

    return `${API_BASE_URL}/uploads/matrimonial/${photoString}`;
  };

  // =========================================================
  // IMAGE ERROR FALLBACK
  // =========================================================
  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement>
  ) => {
    const image = event.currentTarget;

    if (
      image.src.includes(
        "/images/default-profile.jpg"
      )
    ) {
      return;
    }

    image.src = "/images/default-profile.jpg";
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <section className="bg-gradient-to-b from-white to-rose-50/40 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="text-sm font-semibold text-[#8B1E3F]">
              Featured Members
            </span>

            <h2 className="mt-3 text-2xl font-semibold text-[#8B1E3F]">
              Meet Our Featured Profiles
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow"
              >
                <div className="h-72 bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-32 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-4/5 rounded bg-gray-200" />
                  <div className="h-10 w-full rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================
  if (error) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================
  return (
    <section className="bg-gradient-to-b from-white to-rose-50/40 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">

          <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-[#8B1E3F]">
            <FaHeart className="text-rose-500" />
            Featured Members
          </span>

          <h2 className="mt-4 text-2xl font-semibold text-[#8B1E3F] sm:text-3xl">
            Meet Our Featured Profiles
          </h2>

          <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
            Discover Arya Vysya bride and groom profiles
            looking for a meaningful and lifelong relationship.
          </p>
        </div>

        {/* No profiles */}
        {profiles.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-gray-500">
              No profiles available.
            </p>
          </div>
        )}

        {/* ===================================================
            LATEST 4 PROFILES
        ==================================================== */}
        {profiles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {profiles.map((profile) => {
              const age = calculateAge(
                profile.date_of_birth
              );

              const photoUrl =
                getPhotoUrl(profile);

              const isLiked =
                likedProfiles.includes(
                  profile.member_id
                );

              return (
                <div
                  key={profile.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Profile image */}
                  <div className="relative h-72 overflow-hidden bg-gray-100">

                    <img
                      src={photoUrl}
                      alt={
                        profile.name ||
                        "Profile"
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={handleImageError}
                    />

                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                    {/* Status */}
                    <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-600 shadow">
                      <FaCheckCircle />

                      {profile.status ===
                      "Approved"
                        ? "Verified"
                        : "Profile"}
                    </div>

                    {/* Favourite */}
                    <button
                      type="button"
                      aria-label={
                        isLiked
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      onClick={() =>
                        toggleLike(
                          profile.member_id
                        )
                      }
                      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition-all duration-200 hover:scale-110"
                    >
                      <FaHeart
                        className={`text-sm transition-colors ${
                          isLiked
                            ? "text-rose-600"
                            : "text-gray-400"
                        }`}
                      />
                    </button>

                    {/* Member ID */}
                    <span className="absolute bottom-4 left-4 text-xs font-medium tracking-wide text-white">
                      {profile.member_id}
                    </span>
                  </div>

                  {/* Profile details */}
                  <div className="p-5">

                    <div className="flex items-center gap-2">

                      <h3 className="truncate text-xl font-bold text-gray-800">
                        {profile.name ||
                          "Member"}
                      </h3>

                      {profile.status ===
                        "Approved" && (
                        <FaCheckCircle className="shrink-0 text-sm text-green-500" />
                      )}
                    </div>

                    {/* Age + Height */}
                    {(age !== null ||
                      profile.height) && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">

                        {age !== null && (
                          <div className="flex items-center gap-2">

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                              <FaUser className="text-xs" />
                            </span>

                            <span className="text-sm text-gray-600">
                              {age} Years
                            </span>

                          </div>
                        )}

                        {profile.height && (
                          <div className="flex items-center gap-2">

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                              <FaRulerVertical className="text-xs" />
                            </span>

                            <span className="text-sm text-gray-600">
                              {profile.height}
                            </span>

                          </div>
                        )}

                      </div>
                    )}

                    {/* Education / Occupation / Location */}
                    <div className="mt-4 space-y-2.5">

                      {profile.education && (
                        <div className="flex items-center gap-3 text-sm text-gray-600">

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <FaGraduationCap />
                          </span>

                          <span className="truncate">
                            {profile.education}
                          </span>

                        </div>
                      )}

                      {profile.occupation && (
                        <div className="flex items-center gap-3 text-sm text-gray-600">

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <FaBriefcase />
                          </span>

                          <span className="truncate">
                            {profile.occupation}
                          </span>

                        </div>
                      )}

                      {profile.address && (
                        <div className="flex items-center gap-3 text-sm text-gray-600">

                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                            <FaMapMarkerAlt />
                          </span>

                          <span className="truncate">
                            {profile.address.replace(
                              /\n/g,
                              ", "
                            )}
                          </span>

                        </div>
                      )}

                    </div>

                    {/* View profile */}
                    <Link
                      href={`/profile/${profile.id}`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#800018] py-3 text-sm font-semibold text-white transition hover:bg-[#800018]"
                    >
                      View Profile
                      <FaArrowRight className="text-xs" />
                    </Link>

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* View all */}
        <div className="mt-12 flex justify-center">

          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-xl border-2 bg-[#800018] bg-white px-7 py-3 font-semibold text-[#800018] shadow-sm transition-all duration-300 hover:bg-[#800018] hover:text-white hover:shadow-lg"
          >
            View All Profiles
            <FaArrowRight className="text-sm" />
          </Link>

        </div>

      </div>
    </section>
  );
}

