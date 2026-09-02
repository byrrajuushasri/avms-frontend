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
  FaRupeeSign,
  FaRulerVertical,
  FaIdCard,
  FaVenusMars,
} from "react-icons/fa";

/* =========================================================
   BACKEND URL
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================================
   MEMBER INTERFACE
   SAME FIELDS AS MATRIMONIAL REGISTER FORM
========================================================= */

interface Member {
  id: number;

  /* MEMBERSHIP */
  member_id?: string | null;

  mobile?: string | null;
  email?: string | null;

  /* BASIC */
  profile_category?: string | null;

  father_name?: string | null;
  mother_name?: string | null;

  /* GOTRAM */
  father_gotram?: string | null;
  mother_gotram?: string | null;
  grandmother_gotram?: string | null;

  /* HOROSCOPE */
  nakshatram?: string | null;
  padham?: string | number | null;
  rasi?: string | null;

  /* PERSONAL */
  color?: string | null;
  height?: string | null;

  /* EDUCATION */
  education?: string | null;
  annual_income?: string | null;

  /* ADDRESS */
  address?: string | null;

  /* FAMILY */
  father_occupation?: string | null;
  mother_occupation?: string | null;

  brother_details?: string | null;
  sister_details?: string | null;

  property_details?: string | null;

  /* PREFERENCE */
  preferred_requirements?: string | null;

  /* PHOTO */
  photo?: string | null;

  /* STATUS */
  status?: string | null;
  membership?: string | null;

  created_at?: string | null;
  updated_at?: string | null;
}

/* =========================================================
   VIEW PROFILE PAGE
========================================================= */

export default function ViewProfilePage() {
  const params = useParams();

  const id = params?.id;

  const [member, setMember] =
    useState<Member | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =========================================================
     FETCH MEMBER
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        /*
         * IMPORTANT:
         * API_URL = http://localhost:5000
         *
         * API:
         * GET /matrimonial-users/:id
         */

        const response = await fetch(
          `${API_URL}/matrimonial-users/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result = await response.json();

        console.log(
          "View member API response:",
          result
        );

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch member"
          );
        }

        /*
         * Some APIs return:
         * { data: {...} }
         *
         * Others return:
         * {...}
         */

        const memberData =
          result?.data || result;

        setMember(memberData);
      } catch (error) {
        console.error(
          "Fetch member error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load member"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#8B1E3F] rounded-full animate-spin mx-auto" />

          <p className="text-sm text-gray-500 mt-4">
            Loading member profile...
          </p>
        </div>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error || !member) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">

          <Link
            href="/admin/matrimony"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B1E3F]"
          >
            <FaArrowLeft />
            Back to Members
          </Link>

          <div className="bg-white rounded-2xl border border-red-100 p-8 mt-6 text-center">

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

  /* =========================================================
     PHOTO URL
  ========================================================= */

  const photoUrl = member.photo
    ? member.photo.startsWith("http")
      ? member.photo
      : `${API_URL}${
          member.photo.startsWith("/")
            ? member.photo
            : `/uploads/matrimonial/${member.photo}`
        }`
    : null;

  /* =========================================================
     PADHAM
  ========================================================= */

  const formattedPadham =
    member.padham !== null &&
    member.padham !== undefined &&
    member.padham !== ""
      ? String(member.padham)
      : "—";

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6">

          <Link
            href="/admin/matrimony"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8B1E3F] mb-3"
          >
            <FaArrowLeft />
            Back to Members
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

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
                className={`px-4 py-2 rounded-full text-xs font-semibold ${
                  member.status === "Approved"
                    ? "bg-green-50 text-green-700"
                    : member.status === "Rejected"
                    ? "bg-red-50 text-red-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {member.status || "Pending"}
              </span>

              <span className="px-4 py-2 rounded-full bg-pink-50 text-[#8B1E3F] text-xs font-semibold">
                {member.membership || "Free"}
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            PROFILE HEADER CARD
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* PROFILE IMAGE */}

            <div className="w-32 h-32 rounded-2xl bg-pink-50 overflow-hidden flex items-center justify-center text-[#8B1E3F] text-4xl font-bold flex-shrink-0 border border-pink-100">

              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {(member.father_name || "M")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

            </div>

            {/* BASIC DETAILS */}

            <div className="flex-1 text-center md:text-left">

              <h2 className="text-2xl font-bold text-gray-800">
                Matrimonial Profile
              </h2>

              <p className="text-sm font-semibold text-[#8B1E3F] mt-1">
                Membership ID:{" "}
                {member.member_id ||
                  member.id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {member.profile_category ||
                  "—"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

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

        {/* =====================================================
            PERSONAL INFORMATION
        ===================================================== */}

        <Section
          title="Personal Information"
          icon={<FaUser />}
        >

          <InfoGrid>

            <Info
              label="Profile Category"
              value={
                member.profile_category
              }
            />

            <Info
              label="Father's Name"
              value={
                member.father_name
              }
            />

            <Info
              label="Mother's Name"
              value={
                member.mother_name
              }
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
              label="Mobile"
              value={member.mobile}
            />

            <Info
              label="Email"
              value={member.email}
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            GOTRAM & HOROSCOPE
        ===================================================== */}

        <Section
          title="Gotram & Horoscope Information"
          icon={<FaPrayingHands />}
        >

          <InfoGrid>

            <Info
              label="Father Gotram"
              value={
                member.father_gotram
              }
            />

            <Info
              label="Mother Gotram"
              value={
                member.mother_gotram
              }
            />

            <Info
              label="Grand Mother Gotram"
              value={
                member.grandmother_gotram
              }
            />

            <Info
              label="Nakshatram"
              value={
                member.nakshatram
              }
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

        {/* =====================================================
            EDUCATION & INCOME
        ===================================================== */}

        <Section
          title="Education & Income"
          icon={<FaGraduationCap />}
        >

          <InfoGrid>

            <Info
              label="Education"
              value={
                member.education
              }
            />

            <Info
              label="Annual Income"
              value={
                member.annual_income
              }
            />

            <Info
              label="Height"
              value={
                member.height
              }
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            FAMILY INFORMATION
        ===================================================== */}

        <Section
          title="Family Information"
          icon={<FaUsers />}
        >

          <InfoGrid>

            <Info
              label="Father's Details"
              value={
                member.father_occupation
              }
            />

            <Info
              label="Mother's Details"
              value={
                member.mother_occupation
              }
            />

            <Info
              label="Brother Details"
              value={
                member.brother_details
              }
            />

            <Info
              label="Sister Details"
              value={
                member.sister_details
              }
            />

            <Info
              label="Property Details"
              value={
                member.property_details
              }
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            CONTACT / ADDRESS
        ===================================================== */}

        <Section
          title="Contact Information"
          icon={<FaMapMarkerAlt />}
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Info
              label="Mobile Number"
              value={
                member.mobile
              }
            />

            <Info
              label="Email Address"
              value={
                member.email
              }
            />

            <div className="md:col-span-2">

              <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">
                Address
              </p>

              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">

                <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap">
                  {member.address ||
                    "—"}
                </p>

              </div>

            </div>

          </div>

        </Section>

        {/* =====================================================
            PREFERRED REQUIREMENTS
        ===================================================== */}

        <Section
          title="Preferred Requirements"
          icon={<FaHeart />}
        >

          <div className="bg-pink-50/50 rounded-xl p-5 border border-pink-100">

            <p className="text-sm text-gray-700 leading-7 whitespace-pre-wrap">

              {member.preferred_requirements ||
                "—"}

            </p>

          </div>

        </Section>

        {/* =====================================================
            PROPERTY DETAILS
        ===================================================== */}

        <Section
          title="Property Details"
          icon={<FaBriefcase />}
        >

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">

            <p className="text-sm text-gray-700 leading-7 whitespace-pre-wrap">

              {member.property_details ||
                "—"}

            </p>

          </div>

        </Section>

        {/* =====================================================
            PROFILE PHOTO
        ===================================================== */}

        {photoUrl && (
          <Section
            title="Profile Photo"
            icon={<FaUser />}
          >

            <div className="flex justify-center">

              <img
                src={photoUrl}
                alt="Matrimonial Profile"
                className="max-w-md w-full max-h-[600px] object-contain rounded-2xl border border-pink-100 shadow-sm"
              />

            </div>

          </Section>
        )}

        {/* =====================================================
            REGISTRATION STATUS
        ===================================================== */}

        <Section
          title="Registration Information"
          icon={<FaIdCard />}
        >

          <InfoGrid>

            <Info
              label="Membership ID"
              value={
                member.member_id
              }
            />

            <Info
              label="Status"
              value={
                member.status
              }
            />

            <Info
              label="Membership"
              value={
                member.membership
              }
            />

            <Info
              label="Created At"
              value={
                member.created_at
                  ? new Date(
                      member.created_at
                    ).toLocaleString(
                      "en-IN"
                    )
                  : undefined
              }
            />

            <Info
              label="Updated At"
              value={
                member.updated_at
                  ? new Date(
                      member.updated_at
                    ).toLocaleString(
                      "en-IN"
                    )
                  : undefined
              }
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            BACK BUTTON
        ===================================================== */}

        <div className="flex justify-end mt-6">

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
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm mt-6">

      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">

        <div className="w-9 h-9 rounded-lg bg-pink-50 flex items-center justify-center text-[#8B1E3F]">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-1">
        {label}
      </p>

      <p className="text-sm font-medium text-gray-700 whitespace-pre-wrap break-words">
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

      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
          {title}
        </p>

        <p className="text-sm text-gray-700 truncate">
          {value}
        </p>

      </div>

    </div>
  );
}