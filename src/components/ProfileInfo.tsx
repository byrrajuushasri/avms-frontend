"use client";

import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaRupeeSign,
  FaBirthdayCake,
  FaRulerVertical,
  FaCheckCircle,
  FaPrayingHands,
} from "react-icons/fa";

interface Profile {
  id?: number | string;
  member_id?: string | null;

  name?: string | null;
  full_name?: string | null;

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

interface ProfileInfoProps {
  profile?: Profile | null;
}

export default function ProfileInfo({
  profile,
}: ProfileInfoProps) {
  // =========================================================
  // WAIT FOR PROFILE DATA
  // =========================================================

  if (!profile) {
    return (
      <div className="w-full animate-pulse">

        {/* Header skeleton */}
        <div className="mb-4 flex gap-3">
          <div className="h-7 w-32 rounded-full bg-gray-200" />
          <div className="h-7 w-36 rounded-full bg-gray-200" />
        </div>

        <div className="h-10 w-64 rounded bg-gray-200" />

        <div className="mt-3 h-5 w-40 rounded bg-gray-200" />

        {/* Details skeleton */}
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

        <div className="mt-10">
          <div className="mb-4 h-8 w-48 rounded bg-gray-200" />

          <div className="space-y-3">
            <div className="h-5 w-full rounded bg-gray-100" />
            <div className="h-5 w-4/5 rounded bg-gray-100" />
            <div className="h-5 w-3/5 rounded bg-gray-100" />
          </div>
        </div>

      </div>
    );
  }

  // =========================================================
  // NAME
  // =========================================================

  const name =
    profile.full_name ||
    profile.name ||
    "Profile";

  // =========================================================
  // MEMBER ID
  // =========================================================

  const memberId =
    profile.member_id ||
    (profile.id
      ? `AVM${String(profile.id).padStart(6, "0")}`
      : "AVM");

  // =========================================================
  // AGE
  // =========================================================

  const calculateAge = (
    dob?: string | null
  ): number | null => {
    if (!dob) {
      return null;
    }

    const birthDate = new Date(dob);

    if (
      Number.isNaN(
        birthDate.getTime()
      )
    ) {
      return null;
    }

    const today = new Date();

    let age =
      today.getFullYear() -
      birthDate.getFullYear();

    const monthDifference =
      today.getMonth() -
      birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (
        monthDifference === 0 &&
        today.getDate() <
          birthDate.getDate()
      )
    ) {
      age--;
    }

    if (age < 0 || age > 100) {
      return null;
    }

    return age;
  };

  const age = calculateAge(
    profile.date_of_birth ||
      profile.dob
  );

  // =========================================================
  // PROFESSION
  // =========================================================

  const profession =
    profile.occupation ||
    profile.profession ||
    null;

  // =========================================================
  // INCOME
  // =========================================================

  const income =
    profile.annual_income ||
    profile.income ||
    null;

  // =========================================================
  // LOCATION
  // =========================================================

  const locationParts = [
    profile.city,
    profile.mandal,
    profile.district,
  ].filter(Boolean);

  const location =
    locationParts.length > 0
      ? locationParts.join(", ")
      : profile.address || null;

  // =========================================================
  // ABOUT
  // =========================================================

  const about =
    profile.about_me ||
    profile.about ||
    profile.description ||
    null;

  // =========================================================
  // VERIFIED
  // =========================================================

  const isVerified =
    String(
      profile.status || ""
    ).toLowerCase() ===
    "approved";

  return (
    <div>

      {/* ================================================= */}
      {/* PROFILE ID */}
      {/* ================================================= */}

      <div className="mb-3 flex flex-wrap items-center gap-3">

        <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-semibold text-rose-600">
          ID : {memberId}
        </span>

        {isVerified && (
          <span className="flex items-center gap-1 text-sm font-medium text-green-600">
            <FaCheckCircle />
            Verified Profile
          </span>
        )}

      </div>

      {/* ================================================= */}
      {/* NAME */}
      {/* ================================================= */}

      <h1 className="text-4xl font-bold text-gray-800">
        {name}
      </h1>

      {profession && (
        <p className="mt-2 text-gray-500">
          {profession}
        </p>
      )}

      {/* ================================================= */}
      {/* QUICK DETAILS */}
      {/* ================================================= */}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* AGE */}

        {age !== null && (
          <div className="rounded-xl bg-gray-50 p-4">

            <FaBirthdayCake className="mb-2 text-xl text-rose-600" />

            <p className="text-sm text-gray-500">
              Age
            </p>

            <h3 className="font-semibold text-gray-800">
              {age} Years
            </h3>

          </div>
        )}

        {/* HEIGHT */}

        {profile.height && (
          <div className="rounded-xl bg-gray-50 p-4">

            <FaRulerVertical className="mb-2 text-xl text-rose-600" />

            <p className="text-sm text-gray-500">
              Height
            </p>

            <h3 className="font-semibold text-gray-800">
              {profile.height}
            </h3>

          </div>
        )}

        {/* EDUCATION */}

        {profile.education && (
          <div className="rounded-xl bg-gray-50 p-4">

            <FaGraduationCap className="mb-2 text-xl text-rose-600" />

            <p className="text-sm text-gray-500">
              Education
            </p>

            <h3 className="font-semibold text-gray-800">
              {profile.education}
            </h3>

          </div>
        )}

        {/* PROFESSION */}

        {profession && (
          <div className="rounded-xl bg-gray-50 p-4">

            <FaBriefcase className="mb-2 text-xl text-rose-600" />

            <p className="text-sm text-gray-500">
              Profession
            </p>

            <h3 className="font-semibold text-gray-800">
              {profession}
            </h3>

          </div>
        )}

        {/* INCOME */}

        {income !== null &&
          income !== undefined &&
          String(income).trim() !== "" && (
            <div className="rounded-xl bg-gray-50 p-4">

              <FaRupeeSign className="mb-2 text-xl text-rose-600" />

              <p className="text-sm text-gray-500">
                Annual Income
              </p>

              <h3 className="font-semibold text-gray-800">
                {String(income).startsWith("₹")
                  ? String(income)
                  : `₹${income}`}
              </h3>

            </div>
          )}

        {/* LOCATION */}

        {location && (
          <div className="rounded-xl bg-gray-50 p-4">

            <FaMapMarkerAlt className="mb-2 text-xl text-rose-600" />

            <p className="text-sm text-gray-500">
              Location
            </p>

            <h3 className="font-semibold text-gray-800">
              {location}
            </h3>

          </div>
        )}

      </div>

      {/* ================================================= */}
      {/* PERSONAL DETAILS */}
      {/* ================================================= */}

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold text-gray-800">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 gap-y-4 text-gray-600 sm:grid-cols-2">

          {profile.religion && (
            <p>
              <span className="font-semibold text-gray-800">
                Religion :
              </span>{" "}
              {profile.religion}
            </p>
          )}

          {profile.caste && (
            <p>
              <span className="font-semibold text-gray-800">
                Caste :
              </span>{" "}
              {profile.caste}
            </p>
          )}

          {profile.gotram && (
            <p>
              <span className="font-semibold text-gray-800">
                Gotram :
              </span>{" "}
              {profile.gotram}
            </p>
          )}

          {profile.mother_tongue && (
            <p>
              <span className="font-semibold text-gray-800">
                Mother Tongue :
              </span>{" "}
              {profile.mother_tongue}
            </p>
          )}

          {profile.marital_status && (
            <p>
              <span className="font-semibold text-gray-800">
                Marital Status :
              </span>{" "}
              {profile.marital_status}
            </p>
          )}

          {profile.physical_status && (
            <p>
              <span className="font-semibold text-gray-800">
                Physical Status :
              </span>{" "}
              {profile.physical_status}
            </p>
          )}

          {profile.gender && (
            <p>
              <span className="font-semibold text-gray-800">
                Gender :
              </span>{" "}
              {profile.gender}
            </p>
          )}

          {profile.sangham && (
            <p>
              <span className="font-semibold text-gray-800">
                Sangham :
              </span>{" "}
              {profile.sangham}
            </p>
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* ABOUT ME */}
      {/* ================================================= */}

      {about && (
        <div className="mt-10">

          <div className="mb-4 flex items-center gap-3">

            <FaPrayingHands className="text-xl text-rose-600" />

            <h2 className="text-2xl font-bold text-gray-800">
              About Me
            </h2>

          </div>

          <p className="leading-8 text-gray-600">
            {about}
          </p>

        </div>
      )}

    </div>
  );
}