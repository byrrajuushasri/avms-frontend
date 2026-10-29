"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft, FaEdit, FaUser } from "react-icons/fa";
import { getStorageImageUrl } from "@/lib/storage-image-url";

interface Member {
  id: number;
  member_id?: string | null;
  avs_id?: string | null;
  full_name?: string | null;
  mobile?: string | null;
  email?: string | null;
  occupation?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  photo?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
  state_body?: string | null;
  executive_body?: string | null;
  designation?: string | null;
  role?: string | null;
  status?: string | null;
  is_existing_mahashaba_member?: string | null;
  is_existing_sangam_member?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/+$/, "");

function formatDate(value: string | null | undefined) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value: string | null | undefined) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string | number | null | undefined;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 break-words text-sm text-gray-900">
        {value === null || value === undefined || value === "" ? "-" : value}
      </dd>
    </div>
  );
}

export default function ViewMemberPage() {
  const params = useParams<{ id: string }>();
  const memberId = params.id;
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!memberId) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const response = await fetch(
          `${BACKEND_URL}/membership-register/${memberId}`,
          {
            method: "GET",
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            cache: "no-store",
          },
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Failed to load member.");
        }

        const data = result?.data ?? result?.member ?? result;
        if (!data || typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Member details were not returned by the server.");
        }

        setMember(data as Member);
      } catch (err) {
        console.error("Fetch member details error:", err);
        setError(
          err instanceof Error ? err.message : "Unable to load member details.",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchMember();
  }, [memberId]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">Loading member details...</p>
      </main>
    );
  }

  if (error || !member) {
    return (
      <main className="min-h-[60vh] bg-gray-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/admin/membership"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B1E3F]"
          >
            <FaArrowLeft />
            Back to Members
          </Link>
          <div className="mt-5 rounded-xl border border-red-200 bg-white p-6 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Unable to load member
            </h1>
            <p className="mt-2 text-sm text-red-600">
              {error || "Member details could not be found."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const photoUrl = getStorageImageUrl(member.photo, BACKEND_URL);

  return (
    <main className="min-h-screen bg-gray-50 px-3 py-5 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/admin/membership"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#8B1E3F]"
            >
              <FaArrowLeft />
              Back to Members
            </Link>
            <h1 className="mt-3 text-2xl font-semibold text-gray-900">
              Member Details
            </h1>
          </div>
          <Link
            href={`/admin/membership/edit/${member.id}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#8B1E3F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#741934]"
          >
            <FaEdit />
            Edit Member
          </Link>
        </div>

        <section className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={member.full_name || "Member"}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <FaUser className="text-2xl text-gray-400" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="break-words text-xl font-semibold text-gray-900">
                {member.full_name || "Member"}
              </h2>
              <p className="mt-1 text-sm text-[#8B1E3F]">
                {member.member_id || member.avs_id || "Member ID unavailable"}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                {member.status || "Status unavailable"}
              </span>
            </div>
          </div>

          <div className="grid gap-6 py-5 md:grid-cols-2">
            <section>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Personal Information
              </h3>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Detail label="Member ID" value={member.member_id} />
                <Detail label="AVS ID" value={member.avs_id} />
                <Detail label="Mobile" value={member.mobile} />
                <Detail label="Email" value={member.email} />
                <Detail label="Gender" value={member.gender} />
                <Detail
                  label="Date of Birth"
                  value={formatDate(member.date_of_birth)}
                />
                <Detail label="Occupation" value={member.occupation} />
                <Detail label="Role" value={member.role} />
              </dl>
            </section>

            <section>
              <h3 className="mb-4 text-sm font-semibold text-gray-900">
                Membership & Location
              </h3>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Detail
                  label="Existing Mahasabha Member"
                  value={member.is_existing_mahashaba_member}
                />
                <Detail
                  label="Existing Sangam Member"
                  value={member.is_existing_sangam_member}
                />
                <Detail label="State Body" value={member.state_body} />
                <Detail label="District" value={member.district} />
                <Detail label="Mandal" value={member.mandal} />
                <Detail label="Sangham" value={member.sangham} />
                <Detail label="Executive Body" value={member.executive_body} />
                <Detail label="Designation" value={member.designation} />
              </dl>
            </section>
          </div>

          <dl className="mt-5 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
            <Detail label="Created At" value={formatDateTime(member.created_at)} />
            <Detail label="Last Updated" value={formatDate(member.updated_at)} />
          </dl>
        </section>
      </div>
    </main>
  );
}
