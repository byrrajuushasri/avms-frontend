"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaPrayingHands,
} from "react-icons/fa";


const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/matrimonial-users`
  : "http://localhost:5000/matrimonial-users";

interface Member {
  id: number;
  member_id?: string | null;

  profile_category?: string;
  surname?: string;
  name?: string;

  father_name?: string;
  mother_name?: string;

  gotram?: string;
  nakshatram?: string;
  padham?: number | null;
  rasi?: string;

  date_of_birth?: string | null;
  color?: string;
  height?: string;

  email?: string;
  mobile?: string;

  education?: string;
  occupation?: string;
  annual_income?: string;

  address?: string;

  family_details?: string;
  brother_details?: string;
  sister_details?: string;
  property_details?: string;

  preferred_requirements?: string;

  photo?: string | null;

  status?: string;
  membership?: string;

  created_at?: string;
  updated_at?: string;
}

export default function ViewProfilePage() {
  const params = useParams();

  const id = params?.id;

  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH MEMBER
  // =========================================================

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

        console.log("View member API response:", result);

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch member"
          );
        }

        setMember(result);
      } catch (error) {
        console.error("Fetch member error:", error);

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

  // =========================================================
  // LOADING
  // =========================================================

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

  // =========================================================
  // ERROR
  // =========================================================

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
              {error || "Unable to load member information."}
            </p>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================
  // PHOTO URL
  // =========================================================

  const photoUrl = member.photo
    ? member.photo.startsWith("http")
      ? member.photo
      : `${API_URL}/uploads/matrimonial/${member.photo}`
    : null;

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formattedDate = member.date_of_birth
    ? new Date(member.date_of_birth).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : "—";

  // =========================================================
  // PAGE
  // =========================================================

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
                View Member Profile
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Complete matrimonial member information
              </p>

            </div>

            <div className="flex gap-2">

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
            PROFILE CARD
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-8">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

            {/* =================================================
                PROFILE IMAGE
            ================================================= */}

            <div className="w-28 h-28 rounded-2xl bg-pink-50 overflow-hidden flex items-center justify-center text-[#8B1E3F] text-3xl font-bold flex-shrink-0">

              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={`${member.surname || ""} ${member.name || ""}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {(member.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}

            </div>

            {/* =================================================
                BASIC DETAILS
            ================================================= */}

            <div className="flex-1 text-center md:text-left">

              <h2 className="text-2xl font-bold text-gray-800">
                {member.surname || ""}{" "}
                {member.name || "Unknown"}
              </h2>

              <p className="text-sm font-semibold text-[#8B1E3F] mt-1">
                Member ID:{" "}
                {member.member_id || member.id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                {member.profile_category || "—"}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                <MiniInfo
                  icon={<FaEnvelope />}
                  title="Email"
                  value={member.email || "—"}
                />

                <MiniInfo
                  icon={<FaPhone />}
                  title="Mobile"
                  value={member.mobile || "—"}
                />

                <MiniInfo
                  icon={<FaCalendarAlt />}
                  title="Date of Birth"
                  value={formattedDate}
                />

                <MiniInfo
                  icon={<FaMapMarkerAlt />}
                  title="Location"
                  value={member.address || "—"}
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
              label="Surname"
              value={member.surname}
            />

            <Info
              label="Name"
              value={member.name}
            />

            <Info
              label="Father Name"
              value={member.father_name}
            />

            <Info
              label="Mother Name"
              value={member.mother_name}
            />

            <Info
              label="Date of Birth"
              value={formattedDate}
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
              label="Profile Category"
              value={member.profile_category}
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            HOROSCOPE
        ===================================================== */}

        <Section
          title="Horoscope Information"
          icon={<FaPrayingHands />}
        >

          <InfoGrid>

            <Info
              label="Gotram"
              value={member.gotram}
            />

            <Info
              label="Nakshatram"
              value={member.nakshatram}
            />

            <Info
              label="Padham"
              value={
                member.padham !== null &&
                member.padham !== undefined
                  ? String(member.padham)
                  : "—"
              }
            />

            <Info
              label="Rasi"
              value={member.rasi}
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            EDUCATION & CAREER
        ===================================================== */}

        <Section
          title="Education & Career"
          icon={<FaGraduationCap />}
        >

          <InfoGrid>

            <Info
              label="Education"
              value={member.education}
            />

            <Info
              label="Occupation"
              value={member.occupation}
            />

            <Info
              label="Salary / Income"
              value={member.annual_income}
            />

            <Info
              label="Mobile Number"
              value={member.mobile}
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            FAMILY
        ===================================================== */}

        <Section
          title="Family Information"
          icon={<FaUsers />}
        >

          <InfoGrid>

            <Info
              label="Family Details"
              value={member.family_details}
            />

            <Info
              label="Brother Details"
              value={member.brother_details}
            />

            <Info
              label="Sister Details"
              value={member.sister_details}
            />

            <Info
              label="Property Details"
              value={member.property_details}
            />

          </InfoGrid>

        </Section>

        {/* =====================================================
            ADDRESS
        ===================================================== */}

        <Section
          title="Contact Information"
          icon={<FaMapMarkerAlt />}
        >

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-2">
              Address
            </p>

            <p className="text-sm text-gray-700">
              {member.address || "—"}
            </p>

          </div>

        </Section>

        {/* =====================================================
            PREFERRED REQUIREMENTS
        ===================================================== */}

        <Section
          title="Preferred Requirements"
          icon={<FaHeart />}
        >

          <div className="bg-pink-50/50 rounded-xl p-5">

            <p className="text-sm text-gray-700 leading-6">
              {member.preferred_requirements || "—"}
            </p>

          </div>

        </Section>

        {/* =====================================================
            PHOTO
        ===================================================== */}

        {photoUrl && (
          <Section
            title="Profile Photo"
            icon={<FaUser />}
          >

            <div className="flex justify-center">

              <img
                src={photoUrl}
                alt="Profile"
                className="max-w-sm w-full max-h-[500px] object-contain rounded-2xl border border-gray-100 shadow-sm"
              />

            </div>

          </Section>
        )}

        {/* =====================================================
            BOTTOM
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

      <p className="text-sm font-medium text-gray-700">
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

      <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
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