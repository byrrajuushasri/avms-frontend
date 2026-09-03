"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProfileGallery from "@/components/ProfileGallery";
import ProfileInfo from "@/components/ProfileInfo";

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

const DEFAULT_IMAGE = "/images/default-profile.jpg";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // BACKEND URL
  // =========================================================

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  // =========================================================
  // PROFILE ID
  // =========================================================

  const profileId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  // =========================================================
  // IMAGE URL
  // ONLY MATRIMONIAL UPLOADS
  // =========================================================

  const getImageUrl = (
    photo?: string | null
  ): string => {
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

    // /uploads/matrimonial/file.jpg
    if (
      value.startsWith("/uploads/matrimonial/")
    ) {
      return `${API_BASE_URL}${value}`;
    }

    // uploads/matrimonial/file.jpg
    if (
      value.startsWith("uploads/matrimonial/")
    ) {
      return `${API_BASE_URL}/${value}`;
    }

    // /matrimonial/file.jpg
    if (
      value.startsWith("/matrimonial/")
    ) {
      return `${API_BASE_URL}/uploads${value}`;
    }

    // filename only
    return `${API_BASE_URL}/uploads/matrimonial/${value}`;
  };

  // =========================================================
  // GET PROFILE PHOTO
  // =========================================================

  const getProfilePhoto = (
    data: Profile
  ): string | null => {
    const possiblePhoto =
      data.photo ||
      data.profile_photo ||
      data.photo_url ||
      data.image ||
      data.profile_image;

    if (!possiblePhoto) {
      return null;
    }

    return String(possiblePhoto).trim();
  };

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  useEffect(() => {
    if (!profileId) {
      setError("Profile ID not found.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          `${API_BASE_URL}/matrimonial-users/${profileId}`;

        console.log(
          "================================="
        );
        console.log("PROFILE API:", apiUrl);
        console.log(
          "================================="
        );

        const response = await fetch(apiUrl, {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        console.log(
          "Profile API status:",
          response.status
        );

        const responseText =
          await response.text();

        console.log(
          "Profile API response:",
          responseText
        );

        if (!response.ok) {
          throw new Error(
            `API Error ${response.status}`
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

        console.log(
          "Parsed profile:",
          result
        );

        // =====================================================
        // FIND PROFILE OBJECT
        // =====================================================

        let profileData: Profile | null = null;

        if (
          result &&
          typeof result === "object"
        ) {
          const responseObject =
            result as Record<string, unknown>;

          // Direct response
          if (
            "id" in responseObject ||
            "member_id" in responseObject ||
            "full_name" in responseObject ||
            "name" in responseObject
          ) {
            profileData =
              responseObject as Profile;
          }

          // { data: {...} }
          else if (
            responseObject.data &&
            typeof responseObject.data ===
              "object" &&
            !Array.isArray(
              responseObject.data
            )
          ) {
            profileData =
              responseObject.data as Profile;
          }

          // { result: {...} }
          else if (
            responseObject.result &&
            typeof responseObject.result ===
              "object" &&
            !Array.isArray(
              responseObject.result
            )
          ) {
            profileData =
              responseObject.result as Profile;
          }

          // { member: {...} }
          else if (
            responseObject.member &&
            typeof responseObject.member ===
              "object" &&
            !Array.isArray(
              responseObject.member
            )
          ) {
            profileData =
              responseObject.member as Profile;
          }
        }

        if (!profileData) {
          throw new Error(
            "Profile data not found."
          );
        }

        console.log(
          "FINAL PROFILE DATA:",
          profileData
        );

        console.log(
          "PROFILE PHOTO:",
          getProfilePhoto(profileData)
        );

        setProfile(profileData);
      } catch (err) {
        console.error(
          "Failed to fetch profile:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load profile."
        );

        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId, API_BASE_URL]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Image skeleton */}
            <div className="h-[600px] animate-pulse rounded-3xl bg-gray-200" />

            {/* Info skeleton */}
            <div className="animate-pulse">
              <div className="mb-4 h-7 w-32 rounded-full bg-gray-200" />

              <div className="h-10 w-72 rounded bg-gray-200" />

              <div className="mt-3 h-5 w-48 rounded bg-gray-200" />

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-28 rounded-xl bg-gray-100"
                    />
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">

          <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <h1 className="text-2xl font-bold text-red-700">
              Profile Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              {error ||
                "Unable to load this profile."}
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="rounded-lg bg-rose-600 px-5 py-2.5 font-semibold text-white hover:bg-rose-700"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={() =>
                  router.back()
                }
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Go Back
              </button>

            </div>

          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const photo = getProfilePhoto(profile);

  const imageUrl = getImageUrl(photo);

  console.log(
    "FINAL IMAGE URL:",
    imageUrl
  );

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* BACK */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-sm font-medium text-rose-600 hover:text-rose-700"
          >
            ← Back to Profiles
          </button>
        </div>

        {/* PROFILE */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ================================================= */}
          {/* LEFT - PHOTO */}
          {/* ================================================= */}

          <div>
            <ProfileGallery
              images={
                photo
                  ? [photo]
                  : []
              }
            />
          </div>

          {/* ================================================= */}
          {/* RIGHT - DETAILS */}
          {/* ================================================= */}

          <div>
            <ProfileInfo
              profile={profile}
            />
          </div>

        </div>

      </div>

    </main>
  );
}