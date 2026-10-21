
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEllipsisV,
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

interface Member {
  id: number;
  member_id: string;
  full_name: string;
  mobile: string;
  email: string;
  occupation: string;
  gender: string;
  date_of_birth: string;
  photo: string | null;
  district: string | null;
  mandal: string | null;
  sangham: string | null;
  state_body?: string | null;
  executive_body: string;
  designation: string;
  role: string;
  status: string;
  mahashaba_payment_status: string;
  mahashaba_payment_method: string | null;
  mahashaba_receipt_number: string | null;
  mahashaba_amount_paid: string | number | null;
  mahashaba_payment_date: string | null;
  sangam_payment_status: string;
  sangam_payment_method: string | null;
  sangam_receipt_number: string | null;
  sangam_amount_paid: string | number | null;
  sangam_payment_date: string | null;
  created_at: string;
  updated_at: string;
  avs_id?: string | null;
  matrimony_code?: string | null;
  matrimony_authorised?: boolean;
  matrimony_authorised_date?: string | null;
  matrimony_expiry_date?: string | null;
}

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const ROWS_OPTIONS = [5, 10, 20, 50];

export default function MembershipPage() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [approvalLoading, setApprovalLoading] = useState<number | null>(null);

  const [authorizeMember, setAuthorizeMember] = useState<Member | null>(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [authorizeLoading, setAuthorizeLoading] = useState(false);

  // Close the action menu when clicking outside it.
  useEffect(() => {
    if (openActionId === null) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenActionId(null);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openActionId]);

  const getLoggedInUser = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  };

  const getPhotoUrl = (photo: string | null) => {
    if (!photo) return "";

    if (/^https?:\/\//i.test(photo)) return photo;

    return `${BACKEND_URL}${photo.startsWith("/") ? "" : "/"}${photo}`;
  };

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const loggedInUser = getLoggedInUser();
      const params = new URLSearchParams();

      if (loggedInUser?.role) {
        params.append("role", loggedInUser.role);
      }

      if (loggedInUser?.sangham) {
        params.append("sangham", loggedInUser.sangham);
      }

      const queryString = params.toString();
      const url =
        `${BACKEND_URL}/membership-register` +
        (queryString ? `?${queryString}` : "");

      const response = await fetch(url, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result?.message || "Failed to load members");
      }

      const result = await response.json();

      const memberList: Member[] = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.members)
            ? result.members
            : [];

      setMembers(memberList);
      setCurrentPage(1);
      setOpenActionId(null);
    } catch (err) {
      console.error("Fetch members error:", err);
      setMembers([]);
      setError(
        err instanceof Error ? err.message : "Unable to load members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return members;

    return members.filter((member) =>
      [
        member.member_id,
        member.avs_id,
        member.matrimony_code,
        member.full_name,
        member.mobile,
        member.email,
        member.occupation,
        member.executive_body,
        member.designation,
        member.district,
        member.mandal,
        member.sangham,
      ].some((value) =>
        String(value || "").toLowerCase().includes(keyword)
      )
    );
  }, [members, search]);

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, totalItems);

  const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "-";

    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return date;

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      setDeleteLoading(id);
      setOpenActionId(null);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BACKEND_URL}/membership-register/${id}`,
        {
          method: "DELETE",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Failed to delete member");
      }

      setMembers((previous) =>
        previous.filter((member) => member.id !== id)
      );

      // Move back if deleting the last row on the current page.
      const remainingCount = totalItems - 1;
      const remainingPages = Math.max(
        1,
        Math.ceil(remainingCount / rowsPerPage)
      );

      setCurrentPage((page) => Math.min(page, remainingPages));
      window.alert("Member deleted successfully.");
    } catch (err) {
      console.error("Delete member error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete member."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleApproveMembership = async (member: Member) => {
    if (
      !window.confirm(
        `Approve membership for "${member.full_name}"? An approval email will be sent if the email address is available.`,
      )
    ) {
      return;
    }

    try {
      setApprovalLoading(member.id);
      setOpenActionId(null);
      setError("");

      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BACKEND_URL}/membership-register/${member.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ status: "Active" }),
        },
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Failed to approve membership.");
      }

      setMembers((previous) =>
        previous.map((item) =>
          item.id === member.id ? { ...item, status: "Active" } : item,
        ),
      );

      window.alert(
        result?.email_sent
          ? "Membership approved and approval email sent."
          : "Membership approved. No approval email was sent; check the member email and email service configuration.",
      );
    } catch (err) {
      console.error("Approve membership error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to approve membership.",
      );
    } finally {
      setApprovalLoading(null);
    }
  };

  const openMatrimonyAuthorization = (member: Member) => {
    setOpenActionId(null);

    if (member.matrimony_authorised) {
      window.alert(
        `Matrimony already authorised.\n\nCode: ${member.matrimony_code || "-"}`
      );
      return;
    }

    if (String(member.status || "").toLowerCase() !== "active") {
      window.alert("Only Active members can be authorised for matrimony.");
      return;
    }

    setAuthorizeMember(member);
    setExpiryDate("");
    setError("");
  };

  const handleAuthorizeMatrimony = async () => {
    if (!authorizeMember) return;

    if (!expiryDate) {
      window.alert("Please select matrimony expiry date.");
      return;
    }

    const confirmed = window.confirm(
      `Authorize matrimony for "${authorizeMember.full_name}"?\n\n` +
        `Member ID: ${authorizeMember.member_id}\n` +
        `AVS ID: ${authorizeMember.avs_id || "-"}\n` +
        `Expiry Date: ${formatDate(expiryDate)}`
    );

    if (!confirmed) return;

    try {
      setAuthorizeLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BACKEND_URL}/membership/member/${authorizeMember.id}/authorize-matrimony`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ expiryDate }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to authorize matrimony."
        );
      }

      const updatedMember = result?.member;

      setMembers((previous) =>
        previous.map((member) =>
          member.id === authorizeMember.id
            ? {
                ...member,
                ...(updatedMember || {}),
                matrimony_authorised: true,
                matrimony_code:
                  updatedMember?.matrimony_code || member.matrimony_code,
                matrimony_authorised_date:
                  updatedMember?.matrimony_authorised_date ||
                  new Date().toISOString(),
                matrimony_expiry_date:
                  updatedMember?.matrimony_expiry_date || expiryDate,
              }
            : member
        )
      );

      const generatedCode = updatedMember?.matrimony_code || "-";
      const finalExpiry =
        updatedMember?.matrimony_expiry_date || expiryDate;

      setAuthorizeMember(null);
      setExpiryDate("");

      window.alert(
        `Matrimony authorised successfully.\n\n` +
          `Matrimony Code: ${generatedCode}\n` +
          `Expiry Date: ${formatDate(finalExpiry)}`
      );
    } catch (err) {
      console.error("Authorize matrimony error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to authorize matrimony."
      );
    } finally {
      setAuthorizeLoading(false);
    }
  };

  const getPageNumbers = () => {
    const maxVisible = 5;
    let start = Math.max(
      1,
      safeCurrentPage - Math.floor(maxVisible / 2)
    );
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
  };

  return (
    <main className="min-h-screen bg-gray-50/80 px-2 py-4 sm:px-4 lg:px-6 lg:py-6">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* PAGE HEADER */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              Membership
            </h1>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Manage all registered members.
            </p>
          </div>

          <Link
            href="/admin/membership/add"
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-[#8B1E3F] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#741934] sm:self-auto sm:px-4 sm:text-sm"
          >
            <FaPlus className="text-[10px]" />
            Add Member
          </Link>
        </div>

        {error && (
          <div className="mb-4 flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-xs text-red-600 sm:text-sm">
            <p>{error}</p>
            <button
              type="button"
              onClick={() => void fetchMembers()}
              className="self-start font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* TABLE CARD
            IMPORTANT: Do not use overflow-hidden here.
            It clips the absolutely positioned Actions dropdown.
        */}
        <section className="relative w-full rounded-lg border border-gray-200 bg-white shadow-sm sm:rounded-xl">
          {/* TOOLBAR — SINGLE SEARCH */}
          <div className="flex flex-col gap-3 border-b border-gray-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Members List
              </h2>
              <p className="mt-0.5 text-[11px] text-gray-500">
                {totalItems} member{totalItems !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="relative w-full sm:max-w-xs">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                  setOpenActionId(null);
                }}
                placeholder="Search name, AVS ID, phone..."
                className="h-9 w-full rounded-lg border border-gray-200 pl-8 pr-3 text-xs text-gray-700 outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 sm:text-sm"
              />
            </div>
          </div>

          {/* TABLE — VISIBLE OVERFLOW FOR ACTIONS MENU */}
          <div className="relative w-full overflow-visible">
            <table className="w-full table-fixed border-collapse">
              <colgroup>
                <col className="w-[35%] sm:w-[27%]" />
                <col className="w-[17%] sm:w-[14%]" />
                <col className="w-[28%] sm:w-[25%]" />
                <col className="hidden sm:table-column sm:w-[14%]" />
                <col className="w-[12%] sm:w-[10%]" />
                <col className="w-[8%] sm:w-[10%]" />
              </colgroup>

              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-1.5 py-2 text-left text-[10px] font-semibold text-gray-600 sm:px-3 sm:py-3 sm:text-xs">
                    Member
                  </th>
                  <th className="px-1 py-2 text-left text-[10px] font-semibold text-gray-600 sm:px-3 sm:py-3 sm:text-xs">
                    AVS ID
                  </th>
                  <th className="px-1 py-2 text-left text-[10px] font-semibold text-gray-600 sm:px-3 sm:py-3 sm:text-xs">
                    Contact
                  </th>
                  <th className="hidden px-2 py-3 text-left text-xs font-semibold text-gray-600 sm:table-cell">
                    Designation
                  </th>
                  <th className="px-1 py-2 text-left text-[10px] font-semibold text-gray-600 sm:px-3 sm:py-3 sm:text-xs">
                    Status
                  </th>
                  <th className="px-1 py-2 text-center text-[10px] font-semibold text-gray-600 sm:px-3 sm:py-3 sm:text-xs">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-10 text-center text-sm text-gray-500"
                    >
                      Loading members...
                    </td>
                  </tr>
                ) : paginatedMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-3 py-10 text-center">
                      <FaUser className="mx-auto mb-2 text-xl text-gray-300" />
                      <p className="text-sm font-semibold text-gray-700">
                        No members found
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Try another name, AVS ID, email or phone number.
                      </p>
                    </td>
                  </tr>
                ) : (
                  paginatedMembers.map((member) => (
                    <tr
                      key={member.id}
                      className={`relative transition-colors hover:bg-gray-50 ${
                        openActionId === member.id ? "z-20" : "z-0"
                      }`}
                    >
                      {/* MEMBER */}
                      <td className="px-1.5 py-2 align-middle sm:px-3 sm:py-3">
                        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-100 sm:h-9 sm:w-9">
                            {member.photo ? (
                              <img
                                src={getPhotoUrl(member.photo)}
                                alt={member.full_name || "Member"}
                                className="h-full w-full rounded-full object-cover"
                                onError={(event) => {
                                  event.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <FaUser className="text-[10px] text-gray-400 sm:text-sm" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="break-words text-[10px] font-semibold leading-tight text-gray-800 sm:truncate sm:text-xs lg:text-sm">
                              {member.full_name || "-"}
                            </p>
                            <p className="mt-0.5 break-words text-[9px] leading-tight text-[#8B1E3F] sm:text-[10px]">
                              {member.member_id || "-"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* AVS ID */}
                      <td className="break-words px-1 py-2 text-[9px] leading-tight text-gray-700 sm:px-3 sm:py-3 sm:text-xs">
                        {member.avs_id || "-"}
                      </td>

                      {/* CONTACT */}
                      <td className="break-words px-1 py-2 align-middle sm:px-3 sm:py-3">
                        <p className="break-words text-[10px] leading-tight text-gray-700 sm:text-xs">
                          {member.mobile || "-"}
                        </p>
                        <p className="mt-0.5 hidden break-all text-[10px] leading-tight text-gray-400 md:block">
                          {member.email || "-"}
                        </p>
                      </td>

                      {/* DESIGNATION */}
                      <td className="hidden break-words px-2 py-3 text-xs text-gray-600 sm:table-cell">
                        {member.designation || "-"}
                      </td>

                      {/* STATUS */}
                      <td className="px-1 py-2 sm:px-3 sm:py-3">
                        <span
                          className={`inline-block max-w-full break-words rounded-full px-1.5 py-1 text-[9px] font-semibold leading-tight sm:px-2 sm:text-[10px] ${
                            String(member.status || "").toLowerCase() === "active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {member.status || "-"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="relative px-1 py-2 text-center sm:px-3 sm:py-3">
                        <div
                          ref={openActionId === member.id ? menuRef : null}
                          className="relative inline-block"
                        >
                          <button
                            type="button"
                            title="Member actions"
                            aria-label={`Actions for ${member.full_name}`}
                            aria-expanded={openActionId === member.id}
                            aria-haspopup="menu"
                            onClick={() => {
                              setOpenActionId((current) =>
                                current === member.id ? null : member.id
                              );
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#8B1E3F] sm:h-8 sm:w-8"
                          >
                            <FaEllipsisV className="text-xs" />
                          </button>

                          {openActionId === member.id && (
                            <div
                              role="menu"
                              className="absolute right-0 top-full z-[100] mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-xl"
                            >
                              {String(member.status || "")
                                .trim()
                                .toLowerCase() === "pending" && (
                                <button
                                  type="button"
                                  role="menuitem"
                                  disabled={approvalLoading === member.id}
                                  onClick={() => {
                                    void handleApproveMembership(member);
                                  }}
                                  className="flex w-full items-center gap-2 px-3 py-2.5 text-xs font-semibold text-green-700 hover:bg-green-50 disabled:opacity-50"
                                >
                                  <FaCheck className="text-green-600" />
                                  {approvalLoading === member.id
                                    ? "Approving..."
                                    : "Approve Membership"}
                                </button>
                              )}

                              <button
                                type="button"
                                role="menuitem"
                                onClick={() => {
                                  setOpenActionId(null);
                                  router.push(
                                    `/admin/membership/edit/${member.id}`
                                  );
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2.5 text-xs text-gray-700 hover:bg-gray-50"
                              >
                                <FaEdit className="text-gray-400" />
                                Edit
                              </button>

                              <button
                                type="button"
                                role="menuitem"
                                disabled={deleteLoading === member.id}
                                onClick={() => {
                                  void handleDelete(
                                    member.id,
                                    member.full_name
                                  );
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                              >
                                <FaTrash className="text-red-500" />
                                {deleteLoading === member.id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>

                              <div className="my-1 border-t border-gray-100" />

                              <button
                                type="button"
                                role="menuitem"
                                onClick={() =>
                                  openMatrimonyAuthorization(member)
                                }
                                className="w-full px-3 py-2.5 text-left text-xs text-gray-700 hover:bg-gray-50"
                              >
                                {member.matrimony_authorised
                                  ? "Matrimony Authorised"
                                  : "Authorize Matrimony"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* SINGLE PAGINATION */}
          <div className="flex flex-col gap-3 border-t border-gray-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-gray-500 sm:text-xs">
              <label htmlFor="rows-per-page">Rows per page</label>

              <select
                id="rows-per-page"
                value={rowsPerPage}
                onChange={(event) => {
                  setRowsPerPage(Number(event.target.value));
                  setCurrentPage(1);
                  setOpenActionId(null);
                }}
                className="h-7 rounded-md border border-gray-200 bg-white px-1.5 text-xs outline-none focus:border-[#8B1E3F]"
              >
                {ROWS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <span>
                {totalItems === 0 ? 0 : startIndex + 1}-{endIndex} of{" "}
                {totalItems}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safeCurrentPage <= 1}
                onClick={() => {
                  setCurrentPage((page) => Math.max(1, page - 1));
                  setOpenActionId(null);
                }}
                aria-label="Previous page"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>

              {getPageNumbers().map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    setOpenActionId(null);
                  }}
                  aria-current={safeCurrentPage === page ? "page" : undefined}
                  className={`h-7 min-w-7 rounded-md px-1.5 text-[10px] font-medium ${
                    safeCurrentPage === page
                      ? "bg-[#8B1E3F] text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  );
                  setOpenActionId(null);
                }}
                aria-label="Next page"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* MATRIMONY AUTHORISATION MODAL */}
      {authorizeMember && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-3"
          onClick={() => {
            if (!authorizeLoading) {
              setAuthorizeMember(null);
              setExpiryDate("");
            }
          }}
        >
          <div
            className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-gray-200 px-4 py-3 sm:px-5 sm:py-4">
              <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
                Authorize Matrimony
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Authorize this member for the matrimony process.
              </p>
            </div>

            <div className="px-4 py-4 sm:px-5">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-gray-400">Member ID</p>
                    <p className="mt-0.5 break-words text-xs font-semibold text-gray-800">
                      {authorizeMember.member_id || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400">AVS ID</p>
                    <p className="mt-0.5 break-words text-xs font-semibold text-gray-800">
                      {authorizeMember.avs_id || "-"}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="text-[10px] text-gray-400">Name</p>
                    <p className="mt-0.5 break-words text-xs font-semibold text-gray-800">
                      {authorizeMember.full_name || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400">Mobile</p>
                    <p className="mt-0.5 text-xs text-gray-700">
                      {authorizeMember.mobile || "-"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-400">Gender</p>
                    <p className="mt-0.5 text-xs text-gray-700">
                      {authorizeMember.gender || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="matrimony-expiry"
                  className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
                >
                  Matrimony Expiry Date
                </label>

                <input
                  id="matrimony-expiry"
                  type="date"
                  value={expiryDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(event) => setExpiryDate(event.target.value)}
                  className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                />

                <p className="mt-1.5 text-[10px] text-gray-400">
                  The matrimony code will be generated after authorization.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 px-4 py-3 sm:px-5 sm:py-4">
              <button
                type="button"
                disabled={authorizeLoading}
                onClick={() => {
                  setAuthorizeMember(null);
                  setExpiryDate("");
                }}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 sm:px-4 sm:text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={authorizeLoading || !expiryDate}
                onClick={() => void handleAuthorizeMatrimony()}
                className="rounded-lg bg-[#8B1E3F] px-3 py-2 text-xs font-semibold text-white hover:bg-[#741934] disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:text-sm"
              >
                {authorizeLoading ? "Authorising..." : "Confirm Authorisation"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
