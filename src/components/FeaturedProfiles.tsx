"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  [key: string]: unknown;
}

export default function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [likedProfiles, setLikedProfiles] = useState<string[]>([]);

  // =========================================================
  // BACKEND URL
  // =========================================================

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  // Remove trailing slash
  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // =========================================================
  // LIKE
  // =========================================================

  const toggleLike = (id: string) => {
    setLikedProfiles((prev) =>
      prev.includes(id)
        ? prev.filter((profileId) => profileId !== id)
        : [...prev, id]
    );
  };

  // =========================================================
  // FETCH PROFILES
  // =========================================================

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl = `${API_BASE_URL}/matrimonial-users`;

        console.log("=================================");
        console.log("FEATURED PROFILES API:", apiUrl);
        console.log("BACKEND URL:", API_BASE_URL);
        console.log("=================================");

        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
        });

        console.log(
          "Matrimonial API status:",
          response.status
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch profiles (${response.status})`
          );
        }

        const data = await response.json();

        console.log("Matrimonial API response:", data);

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

        console.log("Profiles received:", list);
        console.log("Profiles count:", list.length);

        setProfiles(list.slice(0, 8));
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
    if (!dob) {
      return null;
    }

    const birthDate = new Date(dob);

    if (Number.isNaN(birthDate.getTime())) {
      return null;
    }

    // Ignore invalid old database dates
    if (birthDate.getFullYear() < 1900) {
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
  // PHOTO URL
  // =========================================================

  const getPhotoUrl = (
    profile: Profile
  ): string => {
    const photo =
      profile.photo ||
      profile.profile_photo ||
      null;

    // No photo
    if (!photo) {
      console.log(
        `No photo for ${profile.name}`
      );

      return "/images/default-profile.jpg";
    }

    const photoString = String(photo).trim();

    if (!photoString) {
      return "/images/default-profile.jpg";
    }

    // =======================================================
    // CASE 1
    // Full HTTP URL
    // =======================================================

    if (
      photoString.startsWith("http://") ||
      photoString.startsWith("https://")
    ) {
      return photoString;
    }

    // =======================================================
    // CASE 2
    // Backend absolute path
    //
    // /uploads/matrimonial/photo.jpg
    // =======================================================

    if (photoString.startsWith("/")) {
      const finalUrl =
        `${API_BASE_URL}${photoString}`;

      console.log(
        `Photo URL for ${profile.name}:`,
        finalUrl
      );

      return finalUrl;
    }

    // =======================================================
    // CASE 3
    // uploads/matrimonial/photo.jpg
    // =======================================================

    if (
      photoString.startsWith(
        "uploads/"
      )
    ) {
      const finalUrl =
        `${API_BASE_URL}/${photoString}`;

      console.log(
        `Photo URL for ${profile.name}:`,
        finalUrl
      );

      return finalUrl;
    }

    // =======================================================
    // CASE 4
    // Just filename
    //
    // 1786873911058-401768645.png
    // =======================================================

    const finalUrl =
      `${API_BASE_URL}/uploads/matrimonial/${photoString}`;

    console.log(
      `Photo URL for ${profile.name}:`,
      finalUrl
    );

    return finalUrl;
  };

  // =========================================================
  // IMAGE ERROR HANDLER
  // =========================================================

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const image =
      event.currentTarget;

    console.error(
      "Profile image failed:",
      image.src
    );

    // Prevent infinite onError loop
    if (
      image.src.includes(
        "/images/default-profile.jpg"
      )
    ) {
      return;
    }

    image.src =
      "/images/default-profile.jpg";
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

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mx-auto mb-10 max-w-2xl text-center">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-rose-100
              px-4
              py-2
              text-sm
              font-semibold
              text-[#8B1E3F]
            "
          >

            <FaHeart className="text-rose-500" />

            Featured Members

          </span>

          <h2
            className="
              mt-4
              text-2xl
              font-semibold
              text-[#8B1E3F]
            "
          >
            Meet Our Featured Profiles
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-7
              text-gray-500
              sm:text-base
            "
          >
            Discover Arya Vysya bride and groom profiles
            looking for a meaningful and lifelong relationship.
          </p>

        </div>

        {/* =================================================
            NO DATA
        ================================================= */}

        {profiles.length === 0 && (
          <div
            className="
              rounded-2xl
              bg-white
              p-10
              text-center
              shadow-sm
            "
          >
            <p className="text-gray-500">
              No profiles available.
            </p>
          </div>
        )}

        {/* =================================================
            PROFILE GRID
        ================================================= */}

        {profiles.length > 0 && (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >

            {profiles.map((profile) => {

              const age =
                calculateAge(
                  profile.date_of_birth
                );

              const photoUrl =
                getPhotoUrl(profile);

              return (
                <div
                  key={profile.id}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-100
                    bg-white
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <div
                    className="
                      relative
                      h-72
                      overflow-hidden
                      bg-gray-100
                    "
                  >

                    <img
                      src={photoUrl}
                      alt={
                        profile.name ||
                        "Profile"
                      }
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                      loading="lazy"
                      onError={handleImageError}
                    />

                    {/* IMAGE OVERLAY */}

                    <div
                      className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-24
                        bg-gradient-to-t
                        from-black/70
                        to-transparent
                      "
                    />

                    {/* STATUS */}

                    <div
                      className="
                        absolute
                        left-4
                        top-4
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-white/95
                        px-3
                        py-1.5
                        text-xs
                        font-semibold
                        text-green-600
                        shadow
                      "
                    >

                      <FaCheckCircle />

                      {profile.status === "Approved"
                        ? "Verified"
                        : "Profile"}

                    </div>

                    {/* HEART */}

                    <button
                      type="button"
                      aria-label={
                        likedProfiles.includes(
                          profile.member_id
                        )
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                      onClick={() =>
                        toggleLike(
                          profile.member_id
                        )
                      }
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        bg-white/95
                        shadow-sm
                        transition-all
                        duration-200
                        hover:scale-110
                      "
                    >

                      <FaHeart
                        className={`
                          text-sm
                          transition-colors
                          duration-200
                          ${
                            likedProfiles.includes(
                              profile.member_id
                            )
                              ? "text-rose-600"
                              : "text-gray-400"
                          }
                        `}
                      />

                    </button>

                    {/* MEMBER ID */}

                    <span
                      className="
                        absolute
                        bottom-4
                        left-4
                        text-xs
                        font-medium
                        tracking-wide
                        text-white
                      "
                    >
                      {profile.member_id}
                    </span>

                  </div>

                  {/* =================================================
                      CONTENT
                  ================================================= */}

                  <div className="p-5">

                    {/* NAME */}

                    <div className="flex items-center gap-2">

                      <h3
                        className="
                          truncate
                          text-xl
                          font-bold
                          text-gray-800
                        "
                      >
                        {profile.name}
                      </h3>

                      {profile.status === "Approved" && (
                        <FaCheckCircle
                          className="
                            shrink-0
                            text-sm
                            text-green-500
                          "
                        />
                      )}

                    </div>

                    {/* =================================================
                        AGE + HEIGHT
                    ================================================= */}

                    {(age !== null ||
                      profile.height) && (
                      <div
                        className="
                          mt-3
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >

                        {/* AGE */}

                        {age !== null && (
                          <div className="flex items-center gap-2">

                            <span
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-rose-50
                                text-rose-600
                              "
                            >
                              <FaUser className="text-xs" />
                            </span>

                            <span className="text-sm text-gray-600">
                              {age} Years
                            </span>

                          </div>
                        )}

                        {/* HEIGHT */}

                        {profile.height && (
                          <div className="flex items-center gap-2">

                            <span
                              className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-rose-50
                                text-rose-600
                              "
                            >
                              <FaRulerVertical className="text-xs" />
                            </span>

                            <span className="text-sm text-gray-600">
                              {profile.height}
                            </span>

                          </div>
                        )}

                      </div>
                    )}

                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="mt-4 space-y-2.5">

                      {/* EDUCATION */}

                      {profile.education && (
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-gray-600
                          "
                        >

                          <span
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-rose-50
                              text-rose-600
                            "
                          >
                            <FaGraduationCap />
                          </span>

                          <span className="truncate">
                            {profile.education}
                          </span>

                        </div>
                      )}

                      {/* OCCUPATION */}

                      {profile.occupation && (
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-gray-600
                          "
                        >

                          <span
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-rose-50
                              text-rose-600
                            "
                          >
                            <FaBriefcase />
                          </span>

                          <span className="truncate">
                            {profile.occupation}
                          </span>

                        </div>
                      )}

                      {/* LOCATION */}

                      {profile.address && (
                        <div
                          className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-gray-600
                          "
                        >

                          <span
                            className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-rose-50
                              text-rose-600
                            "
                          >
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

                    {/* =================================================
                        VIEW PROFILE
                    ================================================= */}

                    <Link
                      href={`/profile/${profile.id}`}
                      className="
                        mt-5
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-rose-600
                        py-3
                        text-sm
                        font-semibold
                        text-white
                        transition
                        hover:bg-rose-700
                      "
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

        {/* =================================================
            VIEW ALL
        ================================================= */}

        <div className="mt-12 flex justify-center">

          <Link
            href="/search"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border-2
              border-rose-600
              bg-white
              px-7
              py-3
              font-semibold
              text-rose-600
              shadow-sm
              transition-all
              duration-300
              hover:bg-rose-600
              hover:text-white
              hover:shadow-lg
            "
          >

            View All Profiles

            <FaArrowRight className="text-sm" />

          </Link>

        </div>

      </div>

    </section>
  );
}