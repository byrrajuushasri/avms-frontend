"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaPrayingHands,
  FaBriefcase,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
  FaCamera,
  FaFemale,
  FaMale,
} from "react-icons/fa";

/* =========================================================
   BACKEND URL
========================================================= */

const API_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

/* =========================================================
   MEMBER INTERFACE
   ALL MATRIMONIAL REGISTER FIELDS
========================================================= */

interface Member {
  id: number;

  /* =======================================================
     MEMBERSHIP
  ======================================================= */

  member_id?: string | null;
  mobile?: string | null;
  email?: string | null;

  /* =======================================================
     BASIC
  ======================================================= */

  profile_category?: string | null;

  father_name?: string | null;
  mother_name?: string | null;

  /* =======================================================
     GOTRAM
  ======================================================= */

  father_gotram?: string | null;
  mother_gotram?: string | null;
  grandmother_gotram?: string | null;

  /* =======================================================
     HOROSCOPE
  ======================================================= */

  nakshatram?: string | null;
  padham?: string | number | null;
  rasi?: string | null;

  /* =======================================================
     PERSONAL
  ======================================================= */

  color?: string | null;
  height?: string | null;

  /* =======================================================
     EDUCATION
  ======================================================= */

  education?: string | null;
  annual_income?: string | null;

  /* =======================================================
     ADDRESS
  ======================================================= */

  address?: string | null;

  /* =======================================================
     FAMILY
  ======================================================= */

  father_occupation?: string | null;
  mother_occupation?: string | null;

  fatherOccupation?: string | null;
  motherOccupation?: string | null;

  brother_details?: string | null;
  sister_details?: string | null;

  brotherDetails?: string | null;
  sisterDetails?: string | null;

  property_details?: string | null;
  propertyDetails?: string | null;

  /* =======================================================
     PREFERENCES
  ======================================================= */

  preferred_requirements?: string | null;
  preferredRequirements?: string | null;

  /* =======================================================
     AREA VOLUNTEER / PREFERENCE ALIASES
  ======================================================= */

  area_volunteer_name?: string | null;
  area_volunteer_contact?: string | null;
  area_volunteer_position?: string | null;

  preference_name?: string | null;
  preference_phone?: string | null;
  preference_area?: string | null;

  areaVolunteerName?: string | null;
  areaVolunteerContact?: string | null;
  areaVolunteerPosition?: string | null;

  /* =======================================================
     PHOTO
  ======================================================= */

  photo?: string | null;

  /* =======================================================
     CONSENT
  ======================================================= */

  consent?: boolean | string | number | null;

  /* =======================================================
     STATUS
  ======================================================= */

  status?: string | null;
  membership?: string | null;

  created_at?: string | null;
  updated_at?: string | null;
}

/* =========================================================
   PAGE
========================================================= */

export default function ViewProfilePage() {
  const params = useParams();

  const id = params?.id;

  const [member, setMember] = useState<Member | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     FETCH MEMBER
  ======================================================= */

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/matrimonial-users/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result = await response.json();

        console.log(
          "VIEW MATRIMONIAL MEMBER API RESPONSE:",
          result
        );

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch member"
          );
        }

        /*
         * API may return:
         *
         * { data: {...} }
         *
         * OR
         *
         * {...}
         */

        const memberData =
          result?.data ?? result;

        setMember(memberData);
      } catch (err) {
        console.error(
          "Fetch matrimonial member error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load member"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-12
              h-12
              border-4
              border-gray-200
              border-t-[#8B1E3F]
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="text-sm text-gray-500 mt-4">
            Loading member profile...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">

          <Link
            href="/admin/matrimony"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-500
              hover:text-[#8B1E3F]
            "
          >
            <FaArrowLeft />
            Back to Members
          </Link>

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-red-100
              p-8
              mt-6
              text-center
              shadow-sm
            "
          >
            <h1 className="text-xl font-semibold text-gray-800">
              Member Not Found
            </h1>

            <p className="text-sm text-red-500 mt-2">
              {error ||
                "Unable to load member information."}
            </p>
          </div>

        </div>
      </div>
    );
  }

  /* =======================================================
     HELPER VALUES
  ======================================================= */

  const fatherOccupation =
    member.father_occupation ??
    member.fatherOccupation ??
    "";

  const motherOccupation =
    member.mother_occupation ??
    member.motherOccupation ??
    "";

  const brotherDetails =
    member.brother_details ??
    member.brotherDetails ??
    "";

  const sisterDetails =
    member.sister_details ??
    member.sisterDetails ??
    "";

  const propertyDetails =
    member.property_details ??
    member.propertyDetails ??
    "";

  const preferredRequirements =
    member.preferred_requirements ??
    member.preferredRequirements ??
    "";

  const volunteerName =
    member.area_volunteer_name ??
    member.preference_name ??
    member.areaVolunteerName ??
    "";

  const volunteerContact =
    member.area_volunteer_contact ??
    member.preference_phone ??
    member.areaVolunteerContact ??
    "";

  const volunteerPosition =
    member.area_volunteer_position ??
    member.preference_area ??
    member.areaVolunteerPosition ??
    "";

  /* =======================================================
     PHOTO URL
  ======================================================= */

  const getPhotoUrl = (
    photo: string | null | undefined
  ) => {
    if (!photo) return null;

    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    if (photo.startsWith("/")) {
      return `${API_URL}${photo}`;
    }

    return `${API_URL}/uploads/matrimonial/${photo}`;
  };

  const photoUrl = getPhotoUrl(member.photo);

  /* =======================================================
     PADHAM
  ======================================================= */

  const formattedPadham =
    member.padham !== null &&
    member.padham !== undefined &&
    member.padham !== ""
      ? String(member.padham)
      : "—";

  /* =======================================================
     CONSENT
  ======================================================= */

  const consentValue =
    member.consent === true ||
    member.consent === 1 ||
    member.consent === "1" ||
    member.consent === "true";

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">

          <Link
            href="/admin/matrimony"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-gray-500
              hover:text-[#8B1E3F]
              mb-3
            "
          >
            <FaArrowLeft />
            Back to Members
          </Link>

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >

            <div>

              <h1 className="text-2xl md:text-3xl font-bold text-black">
                View Matrimonial Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Complete matrimonial member information
              </p>

            </div>

            <div className="flex flex-wrap gap-2">

              <span
                className={`
                  px-4
                  py-2
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    member.status === "Approved"
                      ? "bg-green-50 text-green-700"
                      : member.status === "Rejected"
                      ? "bg-red-50 text-red-700"
                      : "bg-yellow-50 text-yellow-700"
                  }
                `}
              >
                {member.status || "Pending"}
              </span>

              <span
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-pink-50
                  text-[#8B1E3F]
                  text-xs
                  font-semibold
                "
              >
                {member.membership || "Free"}
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            PROFILE HEADER
        ================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-pink-100
            shadow-sm
            p-6
            md:p-8
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              md:items-start
              gap-6
            "
          >

            {/* PHOTO */}

            <div
              className="
                w-36
                h-36
                rounded-2xl
                bg-pink-50
                overflow-hidden
                flex
                items-center
                justify-center
                text-[#8B1E3F]
                text-4xl
                font-bold
                flex-shrink-0
                border
                border-pink-100
              "
            >

              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Matrimonial Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-5xl text-[#8B1E3F]" />
              )}

            </div>

            {/* BASIC DETAILS */}

            <div className="flex-1 text-center md:text-left">

              <div className="flex flex-col md:flex-row md:items-center gap-2">

                <h2 className="text-2xl font-bold text-gray-800">
                  Matrimonial Profile
                </h2>

              </div>

              <p className="text-sm font-semibold text-[#8B1E3F] mt-1">
                Membership ID:{" "}
                {member.member_id || member.id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {member.profile_category || "—"}
              </p>

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  lg:grid-cols-4
                  gap-4
                  mt-6
                "
              >

                <MiniInfo
                  icon={<FaIdCard />}
                  title="Membership ID"
                  value={
                    member.member_id ||
                    String(member.id)
                  }
                />

                <MiniInfo
                  icon={<FaPhone />}
                  title="Mobile"
                  value={
                    member.mobile || "—"
                  }
                />

                <MiniInfo
                  icon={<FaEnvelope />}
                  title="Email"
                  value={
                    member.email || "—"
                  }
                />

                <MiniInfo
                  icon={<FaUser />}
                  title="Category"
                  value={
                    member.profile_category ||
                    "—"
                  }
                />

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <Section
          title="Personal Information"
          icon={<FaUser />}
        >

          <InfoGrid>

            <Info
              label="Profile Category"
              value={member.profile_category}
            />

            <Info
              label="Father's Name"
              value={member.father_name}
            />

            <Info
              label="Mother's Name"
              value={member.mother_name}
            />

            <Info
              label="Color"
              value={member.color}
            />

            <Info
              label="Height"
              value={member.height}
            />

            <Info
              label="Mobile Number"
              value={member.mobile}
            />

            <Info
              label="Email Address"
              value={member.email}
            />

          </InfoGrid>

        </Section>

        {/* =================================================
            GOTRAM & HOROSCOPE
        ================================================= */}

        <Section
          title="Gotram & Horoscope Information"
          icon={<FaPrayingHands />}
        >

          <InfoGrid>

            <Info
              label="Father Gotram"
              value={member.father_gotram}
            />

            <Info
              label="Mother Gotram"
              value={member.mother_gotram}
            />

            <Info
              label="Grand Mother Gotram"
              value={
                member.grandmother_gotram
              }
            />

            <Info
              label="Nakshatram"
              value={member.nakshatram}
            />

            <Info
              label="Nakshatram Padham"
              value={formattedPadham}
            />

            <Info
              label="Rasi"
              value={member.rasi}
            />

          </InfoGrid>

        </Section>

        {/* =================================================
            EDUCATION & INCOME
        ================================================= */}

        <Section
          title="Education & Income"
          icon={<FaGraduationCap />}
        >

          <InfoGrid>

            <Info
              label="Education"
              value={member.education}
            />

            <Info
              label="Annual Income"
              value={member.annual_income}
            />

            <Info
              label="Height"
              value={member.height}
            />

          </InfoGrid>

        </Section>

        {/* =================================================
            FAMILY INFORMATION
        ================================================= */}

        <Section
          title="Family Information"
          icon={<FaUsers />}
        >

          <InfoGrid>

            <Info
              label="Father's Name"
              value={member.father_name}
            />

            <Info
              label="Father's Occupation"
              value={fatherOccupation}
            />

            <Info
              label="Mother's Name"
              value={member.mother_name}
            />

            <Info
              label="Mother's Occupation"
              value={motherOccupation}
            />

          </InfoGrid>

          {/* BROTHERS */}

          <div className="mt-7">

            <DetailBox
              icon={<FaMale />}
              title="Brother Details"
              value={brotherDetails}
            />

          </div>

          {/* SISTERS */}

          <div className="mt-5">

            <DetailBox
              icon={<FaFemale />}
              title="Sister Details"
              value={sisterDetails}
            />

          </div>

          {/* PROPERTY */}

          <div className="mt-5">

            <DetailBox
              icon={<FaBriefcase />}
              title="Property Details"
              value={propertyDetails}
            />

          </div>

        </Section>

        {/* =================================================
            ADDRESS
        ================================================= */}

        <Section
          title="Address Information"
          icon={<FaMapMarkerAlt />}
        >

          <div
            className="
              bg-gray-50
              rounded-xl
              p-5
              border
              border-gray-100
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-gray-400
                font-semibold
                mb-2
              "
            >
              Full Address
            </p>

            <p
              className="
                text-sm
                text-gray-700
                leading-7
                whitespace-pre-wrap
                break-words
              "
            >
              {member.address || "—"}
            </p>

          </div>

        </Section>

        {/* =================================================
            PREFERRED REQUIREMENTS
        ================================================= */}

        <Section
          title="Preferred Requirements"
          icon={<FaHeart />}
        >

          <div
            className="
              bg-pink-50/50
              rounded-xl
              p-5
              border
              border-pink-100
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-[#8B1E3F]
                font-semibold
                mb-2
              "
            >
              Partner Preferences
            </p>

            <p
              className="
                text-sm
                text-gray-700
                leading-7
                whitespace-pre-wrap
                break-words
              "
            >
              {preferredRequirements || "—"}
            </p>

          </div>

        </Section>

        {/* =================================================
            AREA VOLUNTEER
        ================================================= */}

        <Section
          title="Area Volunteer Information"
          icon={<FaUsers />}
        >

          <InfoGrid>

            <Info
              label="Volunteer Name"
              value={volunteerName}
            />

            <Info
              label="Volunteer Contact"
              value={volunteerContact}
            />

            <Info
              label="Volunteer Position / Area"
              value={volunteerPosition}
            />

          </InfoGrid>

        </Section>

        {/* =================================================
            PROPERTY DETAILS
        ================================================= */}

        <Section
          title="Property Details"
          icon={<FaBriefcase />}
        >

          <div
            className="
              bg-gray-50
              rounded-xl
              p-5
              border
              border-gray-100
            "
          >

            <p
              className="
                text-xs
                uppercase
                tracking-wide
                text-gray-400
                font-semibold
                mb-2
              "
            >
              Property Information
            </p>

            <p
              className="
                text-sm
                text-gray-700
                leading-7
                whitespace-pre-wrap
                break-words
              "
            >
              {propertyDetails || "—"}
            </p>

          </div>

        </Section>

        {/* =================================================
            PROFILE PHOTO
        ================================================= */}

        <Section
          title="Profile Photo"
          icon={<FaCamera />}
        >

          <div className="flex justify-center">

            {photoUrl ? (
              <div className="text-center">

                <img
                  src={photoUrl}
                  alt="Matrimonial Profile"
                  className="
                    max-w-md
                    w-full
                    max-h-[600px]
                    object-contain
                    rounded-2xl
                    border
                    border-pink-100
                    shadow-sm
                  "
                />

                <p className="text-xs text-gray-400 mt-3">
                  Profile Photo
                </p>

              </div>
            ) : (
              <div
                className="
                  w-64
                  h-64
                  rounded-2xl
                  bg-pink-50
                  border
                  border-pink-100
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-[#8B1E3F]
                "
              >

                <FaUser className="text-6xl mb-3" />

                <p className="text-sm text-gray-500">
                  No profile photo
                </p>

              </div>
            )}

          </div>

        </Section>

        {/* =================================================
            CONSENT
        ================================================= */}

        <Section
          title="Declaration & Consent"
          icon={
            consentValue ? (
              <FaCheckCircle />
            ) : (
              <FaTimesCircle />
            )
          }
        >

          <div
            className={`
              rounded-xl
              p-5
              border
              ${
                consentValue
                  ? "bg-green-50 border-green-100"
                  : "bg-red-50 border-red-100"
              }
            `}
          >

            <div className="flex items-start gap-4">

              <div className="pt-1">

                {consentValue ? (
                  <FaCheckCircle className="text-green-600 text-xl" />
                ) : (
                  <FaTimesCircle className="text-red-500 text-xl" />
                )}

              </div>

              <div>

                <p
                  className={`
                    text-sm
                    font-semibold
                    ${
                      consentValue
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  `}
                >
                  {consentValue
                    ? "Consent Given"
                    : "Consent Not Given"}
                </p>

                <p className="text-sm text-gray-600 leading-6 mt-2">
                  I/We agree that the information
                  provided by me/us is true and
                  correct, and I/we give consent
                  to use this information for the
                  purpose of matrimonial and
                  community services.
                </p>

              </div>

            </div>

          </div>

        </Section>

        {/* =================================================
            REGISTRATION INFORMATION
        ================================================= */}

        <Section
          title="Registration Information"
          icon={<FaIdCard />}
        >

          <InfoGrid>

            <Info
              label="Database ID"
              value={
                member.id
                  ? String(member.id)
                  : undefined
              }
            />

            <Info
              label="Membership ID"
              value={member.member_id}
            />

            <Info
              label="Status"
              value={member.status}
            />

            <Info
              label="Membership"
              value={member.membership}
            />

            <Info
              label="Mobile"
              value={member.mobile}
            />

            <Info
              label="Email"
              value={member.email}
            />

            <Info
              label="Created At"
              value={
                member.created_at
                  ? new Date(
                      member.created_at
                    ).toLocaleString("en-IN")
                  : undefined
              }
            />

            <Info
              label="Updated At"
              value={
                member.updated_at
                  ? new Date(
                      member.updated_at
                    ).toLocaleString("en-IN")
                  : undefined
              }
            />

          </InfoGrid>

        </Section>

        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <div className="flex justify-end mt-6 mb-8">

          <Link
            href="/admin/matrimony"
            className="
              inline-flex
              items-center
              gap-2
              px-6
              py-3
              rounded-xl
              bg-[#f8eef2]
              text-gray-600
              text-sm
              font-semibold
              hover:bg-[#f1e3e9]
              transition
            "
          >
            <FaArrowLeft />
            Back to Members
          </Link>

        </div>

      </div>

    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-pink-100
        shadow-sm
        mt-6
      "
    >

      <div
        className="
          px-6
          py-4
          border-b
          border-gray-100
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            w-9
            h-9
            rounded-lg
            bg-pink-50
            flex
            items-center
            justify-center
            text-[#8B1E3F]
          "
        >
          {icon}
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>

      </div>

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}

/* =========================================================
   GRID
========================================================= */

function InfoGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {children}
    </div>
  );
}

/* =========================================================
   INFO
========================================================= */

function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>

      <p
        className="
          text-xs
          uppercase
          tracking-wide
          text-gray-400
          font-semibold
          mb-1
        "
      >
        {label}
      </p>

      <p
        className="
          text-sm
          font-medium
          text-gray-700
          whitespace-pre-wrap
          break-words
        "
      >
        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "—"}
      </p>

    </div>
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value?: string | null;
}) {
  return (
    <div
      className="
        bg-gray-50
        rounded-xl
        border
        border-gray-100
        p-5
      "
    >

      <div className="flex items-center gap-3 mb-3">

        <div
          className="
            w-9
            h-9
            rounded-lg
            bg-white
            border
            border-pink-100
            flex
            items-center
            justify-center
            text-[#8B1E3F]
          "
        >
          {icon}
        </div>

        <p
          className="
            text-xs
            uppercase
            tracking-wide
            text-gray-400
            font-semibold
          "
        >
          {title}
        </p>

      </div>

      <p
        className="
          text-sm
          text-gray-700
          leading-7
          whitespace-pre-wrap
          break-words
        "
      >
        {value || "—"}
      </p>

    </div>
  );
}

/* =========================================================
   MINI INFO
========================================================= */

function MiniInfo({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
          w-9
          h-9
          rounded-lg
          bg-gray-50
          flex
          items-center
          justify-center
          text-gray-400
          flex-shrink-0
        "
      >
        {icon}
      </div>

      <div className="min-w-0">

        <p
          className="
            text-[11px]
            uppercase
            tracking-wide
            text-gray-400
            font-semibold
          "
        >
          {title}
        </p>

        <p className="text-sm text-gray-700 truncate">
          {value}
        </p>

      </div>

    </div>
  );
}