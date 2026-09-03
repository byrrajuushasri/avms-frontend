"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Eye,
  Download,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Calendar,
  CreditCard,
  Building2,
  Users,
  ShieldCheck,
  Printer,
} from "lucide-react";

// =========================================================
// CONFIG
// =========================================================

/**
 * Production backend:
 * https://avms-backend-production.up.railway.app
 *
 * Vercel Environment Variable:
 * NEXT_PUBLIC_BACKEND_URL
 *
 * Recommended value:
 * https://avms-backend-production.up.railway.app
 *
 * We also support NEXT_PUBLIC_API_URL for compatibility.
 */
const API_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

const MEMBERS_API = `${API_URL}/membership-register`;

const ROWS_PER_PAGE = 10;

// =========================================================
// TYPES
// =========================================================

interface Member {
  id?: number | string;
  member_id?: string;

  full_name?: string;
  name?: string;

  mobile?: string;
  phone?: string;

  email?: string;

  gender?: string;
  dob?: string;
  date_of_birth?: string;

  photo?: string;
  profile_photo?: string;

  occupation?: string;

  district?: string;
  mandal?: string;
  sangham?: string;

  executive_body?: string;
  designation?: string;

  status?: string;

  mahashaba_payment_status?: string;
  mahashaba_payment_method?: string;
  mahashaba_amount?: number | string;
  mahashaba_payment_date?: string;

  sangam_payment_status?: string;
  sangam_payment_method?: string;
  sangam_amount?: number | string;
  sangam_payment_date?: string;

  created_at?: string;
  updated_at?: string;

  [key: string]: unknown;
}

// =========================================================
// HELPERS
// =========================================================

const getValue = (
  member: Member,
  keys: string[],
  fallback = "-"
): string => {
  for (const key of keys) {
    const value = member[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value);
    }
  }

  return fallback;
};

// =========================================================
// DATE FORMAT
// =========================================================

const formatDate = (value?: unknown): string => {
  if (!value) return "-";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =========================================================
// AMOUNT FORMAT
// =========================================================

const formatAmount = (value?: unknown): string => {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return "-";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return String(value);
  }

  return `₹${number.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

// =========================================================
// PHOTO URL
// =========================================================

const getPhotoUrl = (member: Member): string | null => {
  const photo = getValue(
    member,
    ["photo", "profile_photo"],
    ""
  );

  if (!photo) {
    return null;
  }

  // Already a complete URL
  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://")
  ) {
    return photo;
  }

  // Backend relative URL
  if (photo.startsWith("/")) {
    return `${API_URL}${photo}`;
  }

  // Relative filename/path
  return `${API_URL}/${photo}`;
};

// =========================================================
// DOWNLOAD CARD HTML
// =========================================================

const createDownloadCard = (member: Member): string => {
  const name = getValue(member, ["full_name", "name"]);

  const memberId = getValue(member, [
    "member_id",
    "id",
  ]);

  const mobile = getValue(member, [
    "mobile",
    "phone",
  ]);

  const email = getValue(member, ["email"]);

  const gender = getValue(member, ["gender"]);

  const dob = formatDate(
    getValue(
      member,
      ["dob", "date_of_birth"],
      ""
    )
  );

  const occupation = getValue(
    member,
    ["occupation"]
  );

  const district = getValue(
    member,
    ["district"]
  );

  const mandal = getValue(
    member,
    ["mandal"]
  );

  const sangham = getValue(
    member,
    ["sangham"]
  );

  const executiveBody = getValue(
    member,
    ["executive_body"]
  );

  const designation = getValue(
    member,
    ["designation"]
  );

  const status = getValue(
    member,
    ["status"]
  );

  const photoUrl = getPhotoUrl(member);

  const mahashabaStatus = getValue(
    member,
    ["mahashaba_payment_status"]
  );

  const mahashabaMethod = getValue(
    member,
    ["mahashaba_payment_method"]
  );

  const mahashabaAmount = formatAmount(
    member.mahashaba_amount
  );

  const mahashabaDate = formatDate(
    member.mahashaba_payment_date
  );

  const sangamStatus = getValue(
    member,
    ["sangam_payment_status"]
  );

  const sangamMethod = getValue(
    member,
    ["sangam_payment_method"]
  );

  const sangamAmount = formatAmount(
    member.sangam_amount
  );

  const sangamDate = formatDate(
    member.sangam_payment_date
  );

  return `
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8" />

<title>Membership Details - ${name}</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 30px;
  background: #f3f4f6;
  font-family: Arial, Helvetica, sans-serif;
  color: #222;
}

.card {
  width: 100%;
  max-width: 850px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #d1d5db;
}

.header {
  padding: 24px;
  border-bottom: 2px solid #800018;
  text-align: center;
}

.header h1 {
  margin: 0 0 6px;
  font-size: 25px;
  color: #800018;
}

.header p {
  margin: 0;
  color: #555;
  font-size: 14px;
}

.member-header {
  display: flex;
  gap: 20px;
  padding: 24px;
  border-bottom: 1px solid #ddd;
}

.photo {
  width: 130px;
  height: 160px;
  border: 1px solid #ccc;
  object-fit: cover;
  background: #f5f5f5;
}

.photo-placeholder {
  width: 130px;
  height: 160px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  background: #f5f5f5;
  font-size: 14px;
}

.member-name {
  flex: 1;
}

.member-name h2 {
  margin: 0 0 12px;
  font-size: 24px;
  color: #222;
}

.member-id {
  display: inline-block;
  border: 1px solid #800018;
  padding: 6px 12px;
  color: #800018;
  font-weight: bold;
  font-size: 13px;
}

.section {
  padding: 20px 24px;
  border-bottom: 1px solid #ddd;
}

.section-title {
  margin: 0 0 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ccc;
  color: #800018;
  font-size: 17px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 30px;
}

.item {
  display: flex;
  padding: 7px 0;
}

.label {
  width: 150px;
  color: #666;
  font-size: 13px;
}

.value {
  flex: 1;
  color: #222;
  font-size: 14px;
  font-weight: 500;
}

.footer {
  padding: 18px 24px;
  text-align: center;
  color: #777;
  font-size: 12px;
}

@media print {

  body {
    padding: 0;
    background: #fff;
  }

  .card {
    border: none;
  }

}

@media(max-width: 600px) {

  body {
    padding: 10px;
  }

  .member-header {
    flex-direction: column;
  }

  .grid {
    grid-template-columns: 1fr;
  }

}

</style>

</head>

<body>

<div class="card">

  <div class="header">

    <h1>ARYA VYSYA MAHASABHA</h1>

    <p>
      Membership Details
    </p>

  </div>

  <div class="member-header">

    ${
      photoUrl
        ? `<img
            class="photo"
            src="${photoUrl}"
            alt="${name}"
          />`
        : `<div class="photo-placeholder">
            No Photo
          </div>`
    }

    <div class="member-name">

      <h2>
        ${name}
      </h2>

      <span class="member-id">
        Member ID: ${memberId}
      </span>

    </div>

  </div>

  <div class="section">

    <h3 class="section-title">
      Personal Details
    </h3>

    <div class="grid">

      <div class="item">
        <div class="label">
          Full Name
        </div>
        <div class="value">
          ${name}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Gender
        </div>
        <div class="value">
          ${gender}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Date of Birth
        </div>
        <div class="value">
          ${dob}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Mobile
        </div>
        <div class="value">
          ${mobile}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Email
        </div>
        <div class="value">
          ${email}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Occupation
        </div>
        <div class="value">
          ${occupation}
        </div>
      </div>

    </div>

  </div>

  <div class="section">

    <h3 class="section-title">
      Location Details
    </h3>

    <div class="grid">

      <div class="item">
        <div class="label">
          District
        </div>
        <div class="value">
          ${district}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Mandal
        </div>
        <div class="value">
          ${mandal}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Sangham
        </div>
        <div class="value">
          ${sangham}
        </div>
      </div>

    </div>

  </div>

  <div class="section">

    <h3 class="section-title">
      Executive Body
    </h3>

    <div class="grid">

      <div class="item">
        <div class="label">
          Executive Body
        </div>
        <div class="value">
          ${executiveBody}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Designation
        </div>
        <div class="value">
          ${designation}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Status
        </div>
        <div class="value">
          ${status}
        </div>
      </div>

    </div>

  </div>

  <div class="section">

    <h3 class="section-title">
      Mahashaba Payment
    </h3>

    <div class="grid">

      <div class="item">
        <div class="label">
          Status
        </div>
        <div class="value">
          ${mahashabaStatus}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Payment Method
        </div>
        <div class="value">
          ${mahashabaMethod}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Amount
        </div>
        <div class="value">
          ${mahashabaAmount}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Payment Date
        </div>
        <div class="value">
          ${mahashabaDate}
        </div>
      </div>

    </div>

  </div>

  <div class="section">

    <h3 class="section-title">
      Sangam Payment
    </h3>

    <div class="grid">

      <div class="item">
        <div class="label">
          Status
        </div>
        <div class="value">
          ${sangamStatus}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Payment Method
        </div>
        <div class="value">
          ${sangamMethod}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Amount
        </div>
        <div class="value">
          ${sangamAmount}
        </div>
      </div>

      <div class="item">
        <div class="label">
          Payment Date
        </div>
        <div class="value">
          ${sangamDate}
        </div>
      </div>

    </div>

  </div>

  <div class="footer">
    Arya Vysya Mahasabha Membership
  </div>

</div>

</body>
</html>
`;
};

// =========================================================
// MAIN COMPONENT
// =========================================================

export default function MembershipDetailsPage() {
  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [downloadingId, setDownloadingId] =
    useState<string | number | null>(null);

  const modalRef =
    useRef<HTMLDivElement | null>(null);

  // =======================================================
  // FETCH MEMBERS
  // =======================================================

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      console.log(
        "================================="
      );

      console.log(
        "MEMBERS API:",
        MEMBERS_API
      );

      console.log(
        "================================="
      );

      const response = await fetch(
        MEMBERS_API,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch members (${response.status})`
        );
      }

      const data = await response.json();

      console.log(
        "Members API response:",
        data
      );

      let memberList: Member[] = [];

      // API returns array
      if (Array.isArray(data)) {
        memberList = data;
      }

      // { data: [] }
      else if (Array.isArray(data?.data)) {
        memberList = data.data;
      }

      // { members: [] }
      else if (Array.isArray(data?.members)) {
        memberList = data.members;
      }

      // { results: [] }
      else if (Array.isArray(data?.results)) {
        memberList = data.results;
      }

      // { items: [] }
      else if (Array.isArray(data?.items)) {
        memberList = data.items;
      }

      // { result: [] }
      else if (Array.isArray(data?.result)) {
        memberList = data.result;
      }

      setMembers(memberList);

    } catch (err) {

      console.error(
        "Members API error:",
        err
      );

      setMembers([]);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load members."
      );

    } finally {

      setLoading(false);

    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // =======================================================
  // SEARCH
  // =======================================================

  const filteredMembers = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return members;
    }

    return members.filter(
      (member) => {

        const values = [

          member.member_id,

          member.full_name,

          member.name,

          member.mobile,

          member.phone,

          member.email,

          member.gender,

          member.occupation,

          member.district,

          member.mandal,

          member.sangham,

          member.executive_body,

          member.designation,

          member.status,

        ];

        return values.some(
          (value) =>
            String(value ?? "")
              .toLowerCase()
              .includes(keyword)
        );
      }
    );

  }, [members, search]);

  // =======================================================
  // PAGINATION
  // =======================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredMembers.length /
        ROWS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    ROWS_PER_PAGE;

  const paginatedMembers =
    filteredMembers.slice(
      startIndex,
      startIndex + ROWS_PER_PAGE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // =======================================================
  // MODAL
  // =======================================================

  useEffect(() => {

    if (!selectedMember) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {

      if (event.key === "Escape") {
        setSelectedMember(null);
      }

    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow =
      "hidden";

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        "";
    };

  }, [selectedMember]);

  // =======================================================
  // DOWNLOAD
  // =======================================================

  const downloadMemberCard = async (
    member: Member
  ) => {

    const id =
      member.member_id ??
      member.id ??
      member.full_name ??
      Math.random();

    try {

      setDownloadingId(id);

      const html =
        createDownloadCard(member);

      const blob = new Blob(
        [html],
        {
          type:
            "text/html;charset=utf-8",
        }
      );

      const url =
        URL.createObjectURL(blob);

      const anchor =
        document.createElement("a");

      anchor.href = url;

      anchor.download =
        `membership-${String(
          member.member_id ??
            member.id ??
            member.full_name ??
            "member"
        ).replace(/\s+/g, "-")}.html`;

      document.body.appendChild(
        anchor
      );

      anchor.click();

      anchor.remove();

      URL.revokeObjectURL(url);

    } catch (err) {

      console.error(
        "Download error:",
        err
      );

    } finally {

      setTimeout(() => {
        setDownloadingId(null);
      }, 500);

    }
  };

  // =======================================================
  // PRINT
  // =======================================================

  const printMemberCard = (
    member: Member
  ) => {

    const html =
      createDownloadCard(member);

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=900,height=800"
      );

    if (!printWindow) {
      return;
    }

    printWindow.document.open();

    printWindow.document.write(
      html
    );

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {

      printWindow.print();

    }, 500);
  };

  // =======================================================
  // UI HELPERS
  // =======================================================

  const getMemberName = (
    member: Member
  ) =>
    getValue(
      member,
      ["full_name", "name"]
    );

  const getMemberId = (
    member: Member
  ) =>
    getValue(
      member,
      ["member_id", "id"]
    );

  const getMobile = (
    member: Member
  ) =>
    getValue(
      member,
      ["mobile", "phone"]
    );

  const getStatus = (
    member: Member
  ) =>
    getValue(
      member,
      ["status"],
      "Active"
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <div className="border-b border-gray-200 bg-white">

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Membership Details
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View and download registered member details
              </p>

            </div>

            <div className="text-sm text-gray-500">

              Total Members:{" "}

              <span className="font-semibold text-gray-900">
                {members.length}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* SEARCH */}

        <div className="mb-5 rounded-lg border border-gray-200 bg-white p-4">

          <div className="relative max-w-md">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search name, member ID, mobile, email..."
              className="w-full rounded-md border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-300"
            />

          </div>

        </div>

        {/* ERROR */}

        {error && (

          <div className="mb-5 rounded-md border border-red-200 bg-white px-4 py-3 text-sm text-red-700">

            {error}

            <button
              onClick={fetchMembers}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>

          </div>

        )}

        {/* LOADING */}

        {loading ? (

          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-700" />

            <p className="text-sm text-gray-500">
              Loading members...
            </p>

          </div>

        ) : filteredMembers.length === 0 ? (

          <div className="rounded-lg border border-gray-200 bg-white py-16 text-center">

            <Users
              size={42}
              className="mx-auto mb-3 text-gray-300"
            />

            <h3 className="font-semibold text-gray-700">
              No members found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search.
            </p>

          </div>

        ) : (

          <>

            {/* ================================================= */}
            {/* DESKTOP TABLE */}
            {/* ================================================= */}

            <div className="hidden overflow-hidden rounded-lg border border-gray-200 bg-white md:block">

              <div className="overflow-x-auto">

                <table className="w-full min-w-[950px] border-collapse">

                  <thead>

                    <tr className="border-b border-gray-200 bg-gray-50">

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Member
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Contact
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Location
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Designation
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Status
                      </th>

                      <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Actions
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {paginatedMembers.map(
                      (
                        member,
                        index
                      ) => {

                        const id =
                          member.member_id ??
                          member.id ??
                          `${startIndex}-${index}`;

                        const photo =
                          getPhotoUrl(
                            member
                          );

                        return (

                          <tr
                            key={String(id)}
                            className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                          >

                            {/* MEMBER */}

                            <td className="px-4 py-4">

                              <div className="flex items-center gap-3">

                                {photo ? (

                                  <img
                                    src={photo}
                                    alt={getMemberName(
                                      member
                                    )}
                                    className="h-12 w-12 rounded-md border border-gray-200 object-cover"
                                    onError={(
                                      event
                                    ) => {
                                      event.currentTarget.style.display =
                                        "none";
                                    }}
                                  />

                                ) : (

                                  <div className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50">

                                    <User
                                      size={22}
                                      className="text-gray-400"
                                    />

                                  </div>

                                )}

                                <div>

                                  <p className="font-semibold text-gray-900">

                                    {getMemberName(
                                      member
                                    )}

                                  </p>

                                  <p className="mt-1 text-xs text-gray-500">

                                    ID:{" "}

                                    {getMemberId(
                                      member
                                    )}

                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* CONTACT */}

                            <td className="px-4 py-4">

                              <p className="text-sm text-gray-800">
                                {getMobile(
                                  member
                                )}
                              </p>

                              <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500">

                                {getValue(
                                  member,
                                  ["email"]
                                )}

                              </p>

                            </td>

                            {/* LOCATION */}

                            <td className="px-4 py-4">

                              <p className="text-sm text-gray-800">

                                {getValue(
                                  member,
                                  ["district"]
                                )}

                              </p>

                              <p className="mt-1 text-xs text-gray-500">

                                {getValue(
                                  member,
                                  ["mandal"]
                                )}

                              </p>

                            </td>

                            {/* DESIGNATION */}

                            <td className="px-4 py-4">

                              <p className="text-sm text-gray-800">

                                {getValue(
                                  member,
                                  ["designation"]
                                )}

                              </p>

                              <p className="mt-1 text-xs text-gray-500">

                                {getValue(
                                  member,
                                  ["executive_body"]
                                )}

                              </p>

                            </td>

                            {/* STATUS */}

                            <td className="px-4 py-4">

                              <span className="inline-flex rounded-md border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-700">

                                {getStatus(
                                  member
                                )}

                              </span>

                            </td>

                            {/* ACTIONS */}

                            <td className="px-4 py-4">

                              <div className="flex justify-end gap-2">

                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedMember(
                                      member
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                                >

                                  <Eye size={15} />

                                  View

                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    downloadMemberCard(
                                      member
                                    )
                                  }
                                  disabled={
                                    downloadingId ===
                                    id
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-xs font-medium text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
                                >

                                  <Download
                                    size={15}
                                  />

                                  {downloadingId ===
                                  id
                                    ? "Downloading..."
                                    : "Download"}

                                </button>

                              </div>

                            </td>

                          </tr>

                        );
                      }
                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* ================================================= */}
            {/* MOBILE CARDS */}
            {/* ================================================= */}

            <div className="space-y-4 md:hidden">

              {paginatedMembers.map(
                (
                  member,
                  index
                ) => {

                  const id =
                    member.member_id ??
                    member.id ??
                    `${startIndex}-${index}`;

                  const photo =
                    getPhotoUrl(
                      member
                    );

                  return (

                    <div
                      key={String(id)}
                      className="rounded-lg border border-gray-200 bg-white p-4"
                    >

                      <div className="flex gap-3">

                        {photo ? (

                          <img
                            src={photo}
                            alt={getMemberName(
                              member
                            )}
                            className="h-16 w-16 rounded-md border border-gray-200 object-cover"
                            onError={(
                              event
                            ) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50">

                            <User
                              size={25}
                              className="text-gray-400"
                            />

                          </div>

                        )}

                        <div className="min-w-0 flex-1">

                          <h3 className="truncate font-semibold text-gray-900">

                            {getMemberName(
                              member
                            )}

                          </h3>

                          <p className="mt-1 text-xs text-gray-500">

                            ID:{" "}

                            {getMemberId(
                              member
                            )}

                          </p>

                          <p className="mt-1 text-sm text-gray-700">

                            {getMobile(
                              member
                            )}

                          </p>

                        </div>

                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">

                        <div>

                          <p className="text-xs text-gray-400">
                            District
                          </p>

                          <p className="mt-1 text-sm text-gray-700">

                            {getValue(
                              member,
                              ["district"]
                            )}

                          </p>

                        </div>

                        <div>

                          <p className="text-xs text-gray-400">
                            Designation
                          </p>

                          <p className="mt-1 text-sm text-gray-700">

                            {getValue(
                              member,
                              ["designation"]
                            )}

                          </p>

                        </div>

                      </div>

                      <div className="mt-4 flex gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedMember(
                              member
                            )
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700"
                        >

                          <Eye size={16} />

                          View

                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            downloadMemberCard(
                              member
                            )
                          }
                          disabled={
                            downloadingId === id
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-800 px-3 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                        >

                          <Download size={16} />

                          {downloadingId === id
                            ? "Downloading..."
                            : "Download"}

                        </button>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

            {/* ================================================= */}
            {/* PAGINATION */}
            {/* ================================================= */}

            <div className="mt-5 flex flex-col gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-sm text-gray-500">

                Showing{" "}

                <span className="font-medium text-gray-800">

                  {filteredMembers.length === 0
                    ? 0
                    : startIndex + 1}

                </span>{" "}

                to{" "}

                <span className="font-medium text-gray-800">

                  {Math.min(
                    startIndex +
                      ROWS_PER_PAGE,
                    filteredMembers.length
                  )}

                </span>{" "}

                of{" "}

                <span className="font-medium text-gray-800">

                  {filteredMembers.length}

                </span>

              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={
                    safeCurrentPage <= 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          1,
                          page - 1
                        )
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  <ChevronLeft size={16} />

                  Previous

                </button>

                <span className="px-2 text-sm text-gray-600">

                  {safeCurrentPage} /{" "}
                  {totalPages}

                </span>

                <button
                  type="button"
                  disabled={
                    safeCurrentPage >=
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          totalPages,
                          page + 1
                        )
                    )
                  }
                  className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  Next

                  <ChevronRight size={16} />

                </button>

              </div>

            </div>

          </>

        )}

      </main>

      {/* ===================================================== */}
      {/* MEMBER DETAILS MODAL */}
      {/* ===================================================== */}

      {selectedMember && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onMouseDown={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              setSelectedMember(
                null
              );

            }

          }}
        >

          <div
            ref={modalRef}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl"
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">

              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Member Details
                </h2>

                <p className="mt-1 text-xs text-gray-500">

                  {getMemberId(
                    selectedMember
                  )}

                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(
                    null
                  )
                }
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >

                <X size={20} />

              </button>

            </div>

            {/* MODAL CONTENT */}

            <div className="max-h-[calc(92vh-140px)] overflow-y-auto">

              {/* MEMBER TOP */}

              <div className="border-b border-gray-200 p-5">

                <div className="flex flex-col gap-5 sm:flex-row">

                  {getPhotoUrl(
                    selectedMember
                  ) ? (

                    <img
                      src={
                        getPhotoUrl(
                          selectedMember
                        ) as string
                      }
                      alt={getMemberName(
                        selectedMember
                      )}
                      className="h-32 w-28 rounded-md border border-gray-200 object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display =
                          "none";
                      }}
                    />

                  ) : (

                    <div className="flex h-32 w-28 items-center justify-center rounded-md border border-gray-200 bg-gray-50">

                      <User
                        size={38}
                        className="text-gray-400"
                      />

                    </div>

                  )}

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold text-gray-900">

                      {getMemberName(
                        selectedMember
                      )}

                    </h3>

                    <p className="mt-2 text-sm text-gray-500">

                      Member ID:{" "}

                      <span className="font-semibold text-gray-800">

                        {getMemberId(
                          selectedMember
                        )}

                      </span>

                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">

                        {getStatus(
                          selectedMember
                        )}

                      </span>

                      {getValue(
                        selectedMember,
                        ["designation"],
                        ""
                      ) !== "" && (

                        <span className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-700">

                          {getValue(
                            selectedMember,
                            ["designation"]
                          )}

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              </div>

              {/* PERSONAL */}

              <div className="border-b border-gray-200 p-5">

                <div className="mb-4 flex items-center gap-2">

                  <User
                    size={18}
                    className="text-gray-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Personal Details
                  </h3>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <DetailItem
                    icon={<User size={16} />}
                    label="Full Name"
                    value={getMemberName(
                      selectedMember
                    )}
                  />

                  <DetailItem
                    icon={<User size={16} />}
                    label="Gender"
                    value={getValue(
                      selectedMember,
                      ["gender"]
                    )}
                  />

                  <DetailItem
                    icon={<Calendar size={16} />}
                    label="Date of Birth"
                    value={formatDate(
                      getValue(
                        selectedMember,
                        [
                          "dob",
                          "date_of_birth",
                        ],
                        ""
                      )
                    )}
                  />

                  <DetailItem
                    icon={<Phone size={16} />}
                    label="Mobile"
                    value={getMobile(
                      selectedMember
                    )}
                  />

                  <DetailItem
                    icon={<Mail size={16} />}
                    label="Email"
                    value={getValue(
                      selectedMember,
                      ["email"]
                    )}
                  />

                  <DetailItem
                    icon={
                      <Briefcase
                        size={16}
                      />
                    }
                    label="Occupation"
                    value={getValue(
                      selectedMember,
                      ["occupation"]
                    )}
                  />

                </div>

              </div>

              {/* LOCATION */}

              <div className="border-b border-gray-200 p-5">

                <div className="mb-4 flex items-center gap-2">

                  <MapPin
                    size={18}
                    className="text-gray-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Location Details
                  </h3>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <DetailItem
                    icon={
                      <MapPin size={16} />
                    }
                    label="District"
                    value={getValue(
                      selectedMember,
                      ["district"]
                    )}
                  />

                  <DetailItem
                    icon={
                      <MapPin size={16} />
                    }
                    label="Mandal"
                    value={getValue(
                      selectedMember,
                      ["mandal"]
                    )}
                  />

                  <DetailItem
                    icon={
                      <Building2
                        size={16}
                      />
                    }
                    label="Sangham"
                    value={getValue(
                      selectedMember,
                      ["sangham"]
                    )}
                  />

                </div>

              </div>

              {/* EXECUTIVE BODY */}

              <div className="border-b border-gray-200 p-5">

                <div className="mb-4 flex items-center gap-2">

                  <ShieldCheck
                    size={18}
                    className="text-gray-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Executive Body
                  </h3>

                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  <DetailItem
                    icon={
                      <Building2
                        size={16}
                      />
                    }
                    label="Executive Body"
                    value={getValue(
                      selectedMember,
                      ["executive_body"]
                    )}
                  />

                  <DetailItem
                    icon={
                      <ShieldCheck
                        size={16}
                      />
                    }
                    label="Designation"
                    value={getValue(
                      selectedMember,
                      ["designation"]
                    )}
                  />

                  <DetailItem
                    icon={
                      <ShieldCheck
                        size={16}
                      />
                    }
                    label="Status"
                    value={getStatus(
                      selectedMember
                    )}
                  />

                </div>

              </div>

              {/* PAYMENTS */}

              <div className="p-5">

                <div className="mb-4 flex items-center gap-2">

                  <CreditCard
                    size={18}
                    className="text-gray-600"
                  />

                  <h3 className="font-semibold text-gray-900">
                    Payment Details
                  </h3>

                </div>

                <div className="grid gap-5 lg:grid-cols-2">

                  {/* MAHASHABA */}

                  <div className="rounded-md border border-gray-200 p-4">

                    <h4 className="mb-4 font-semibold text-gray-800">
                      Mahashaba Payment
                    </h4>

                    <div className="space-y-3">

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Status"
                        value={getValue(
                          selectedMember,
                          [
                            "mahashaba_payment_status",
                          ]
                        )}
                      />

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Method"
                        value={getValue(
                          selectedMember,
                          [
                            "mahashaba_payment_method",
                          ]
                        )}
                      />

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Amount"
                        value={formatAmount(
                          selectedMember
                            .mahashaba_amount
                        )}
                      />

                      <DetailItem
                        icon={
                          <Calendar
                            size={16}
                          />
                        }
                        label="Payment Date"
                        value={formatDate(
                          selectedMember
                            .mahashaba_payment_date
                        )}
                      />

                    </div>

                  </div>

                  {/* SANGAM */}

                  <div className="rounded-md border border-gray-200 p-4">

                    <h4 className="mb-4 font-semibold text-gray-800">
                      Sangam Payment
                    </h4>

                    <div className="space-y-3">

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Status"
                        value={getValue(
                          selectedMember,
                          [
                            "sangam_payment_status",
                          ]
                        )}
                      />

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Method"
                        value={getValue(
                          selectedMember,
                          [
                            "sangam_payment_method",
                          ]
                        )}
                      />

                      <DetailItem
                        icon={
                          <CreditCard
                            size={16}
                          />
                        }
                        label="Amount"
                        value={formatAmount(
                          selectedMember
                            .sangam_amount
                        )}
                      />

                      <DetailItem
                        icon={
                          <Calendar
                            size={16}
                          />
                        }
                        label="Payment Date"
                        value={formatDate(
                          selectedMember
                            .sangam_payment_date
                        )}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* MODAL FOOTER */}

            <div className="flex flex-col gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  printMemberCard(
                    selectedMember
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >

                <Printer size={16} />

                Print

              </button>

              <button
                type="button"
                onClick={() =>
                  downloadMemberCard(
                    selectedMember
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900"
              >

                <Download size={16} />

                Download Card

              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(
                    null
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >

                <X size={16} />

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

// =========================================================
// DETAIL ITEM
// =========================================================

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (

    <div className="flex gap-3">

      <div className="mt-0.5 shrink-0 text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-800">
          {value || "-"}
        </p>

      </div>

    </div>

  );
}

