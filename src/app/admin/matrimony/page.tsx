
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaEllipsisV,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCheck,
} from "react-icons/fa";
import { getStorageImageUrl } from "@/lib/storage-image-url";
import AdminDialog, {
  type AdminDialogOptions,
} from "@/components/admin/AdminDialog";

interface MatrimonialUser {
  id: number;
  member_id: string | null;
  profile_category: string | null;
  surname: string | null;
  name: string;
  father_name: string | null;
  mother_name: string | null;
  gotram: string | null;
  nakshatram: string | null;
  padham: number | null;
  rasi: string | null;
  color: string | null;
  date_of_birth: string | null;
  height: string | null;
  education: string | null;
  occupation: string | null;
  annual_income: string | null;
  mobile: string | null;
  email: string | null;
  address: string | null;
  family_details?: string | null;
  brother_details?: string | null;
  sister_details?: string | null;
  property_details?: string | null;
  preferred_requirements?: string | null;
  photo: string | null;
  status: string;
  membership: string;
  approved_at?: string | null;
  expiry_date?: string | null;
  created_at: string;
  updated_at: string;
}

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

const getAdminToken = () =>
  localStorage.getItem("adminToken") ||
  localStorage.getItem("token") ||
  localStorage.getItem("access_token");

export default function AdminDashboard() {
  const [users, setUsers] = useState<MatrimonialUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [approvingId, setApprovingId] = useState<number | null>(null);
  const [dialog, setDialog] = useState<AdminDialogOptions | null>(null);

  const rowsPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getAdminToken();
      const authHeaders = token
        ? { Authorization: `Bearer ${token}` }
        : undefined;

      const getAllProfilesByMemberId = async (
        memberIds: string[]
      ): Promise<MatrimonialUser[]> => {
        const profiles: MatrimonialUser[] = [];

        for (let index = 0; index < memberIds.length; index += 8) {
          const batch = memberIds.slice(index, index + 8);
          const results = await Promise.all(
            batch.map(async (memberId) => {
              try {
                const [profileResponse, memberResponse] = await Promise.all([
                  fetch(
                    `${BACKEND_URL}/matrimonial-users/${encodeURIComponent(memberId)}`,
                    { cache: "no-store" }
                  ),
                  fetch(
                    `${BACKEND_URL}/membership/member/${encodeURIComponent(memberId)}`,
                    { cache: "no-store" }
                  ),
                ]);

                if (!profileResponse.ok) return null;

                const profile = await profileResponse.json();
                const member = memberResponse.ok
                  ? await memberResponse.json()
                  : null;

                if (!profile || typeof profile !== "object") return null;

                const matrimonialProfile = profile as MatrimonialUser;
                return {
                  ...matrimonialProfile,
                  email:
                    matrimonialProfile.email ||
                    (typeof member?.email === "string" ? member.email : null),
                  mobile:
                    matrimonialProfile.mobile ||
                    (typeof member?.mobile === "string" ? member.mobile : null),
                };
              } catch {
                return null;
              }
            })
          );

          profiles.push(
            ...results.filter(
              (profile): profile is MatrimonialUser => Boolean(profile)
            )
          );
        }

        return profiles;
      };

      const response = await fetch(`${BACKEND_URL}/matrimonial-users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
        cache: "no-store",
      });

      let profiles: MatrimonialUser[] = [];

      if (response.ok) {
        const data = await response.json();
        profiles = Array.isArray(data) ? data : [];
      }

      // The listings API filters profiles by the signed-in user's gender.
      // For admins, resolve all member profiles separately so both genders
      // are available in the admin panel.
      try {
        const memberParams = new URLSearchParams();
        const storedUser = JSON.parse(localStorage.getItem("user") || "null") as
          | { role?: string; sangham?: string }
          | null;

        if (storedUser?.role) memberParams.set("role", storedUser.role);
        if (storedUser?.sangham) memberParams.set("sangham", storedUser.sangham);

        const membersResponse = await fetch(
          `${BACKEND_URL}/membership-register${
            memberParams.size ? `?${memberParams}` : ""
          }`,
          {
            method: "GET",
            headers: authHeaders,
            cache: "no-store",
          }
        );

        if (membersResponse.ok) {
          const members = await membersResponse.json();
          if (Array.isArray(members)) {
            const memberDetailsById = new Map(
              members.map(
                (member: {
                  member_id?: string;
                  email?: string | null;
                  mobile?: string | null;
                }) => [
                  member.member_id,
                  {
                    email: member.email || null,
                    mobile: member.mobile || null,
                  },
                ]
              )
            );

            profiles = profiles.map((profile) => {
              const memberDetails = profile.member_id
                ? memberDetailsById.get(profile.member_id)
                : undefined;

              return {
                ...profile,
                email: profile.email || memberDetails?.email || null,
                mobile: profile.mobile || memberDetails?.mobile || null,
              };
            });

            const listedIds = new Set(
              profiles
                .map((profile) => profile.member_id)
                .filter((memberId): memberId is string => Boolean(memberId))
            );
            const missingMemberIds = members
              .map((member: { member_id?: string }) => member.member_id)
              .filter(
                (memberId): memberId is string =>
                  typeof memberId === "string" &&
                  memberId.length > 0 &&
                  !listedIds.has(memberId)
              );

            profiles = [
              ...profiles,
              ...(await getAllProfilesByMemberId(missingMemberIds)),
            ];
          }
        }
      } catch (profileLookupError) {
        console.warn(
          "Unable to load every profile for admin:",
          profileLookupError
        );
      }

      const profilesById = new Map(
        profiles.map((profile) => [profile.member_id || profile.id, profile])
      );

      setUsers(Array.from(profilesById.values()));
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching matrimonial users:", err);
      setError(
        "Unable to load matrimonial members. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void fetchUsers();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const searchValue = search.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    if (!searchValue) return true;

    return [
      user.name,
      user.surname,
      user.member_id,
      user.email,
      user.mobile,
      user.address,
      user.profile_category,
    ].some((value) =>
      (value || "").toLowerCase().includes(searchValue)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const indexOfFirstRow = (safeCurrentPage - 1) * rowsPerPage;
  const indexOfLastRow = Math.min(
    indexOfFirstRow + rowsPerPage,
    filteredUsers.length
  );

  const currentUsers = filteredUsers.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  const resetSearch = () => {
    setSearch("");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleApprove = async (id: number) => {
    try {
      setApprovingId(id);
      setOpenMenuId(null);
      setError("");

      const token = getAdminToken();
      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || `Failed to approve member (${response.status})`
        );
      }

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                status: data?.status || "Approved",
                approved_at: data?.approved_at || new Date().toISOString(),
                expiry_date: data?.expiry_date ?? user.expiry_date,
              }
            : user
        )
      );

      setDialog({
        title: "Profile approved",
        message:
          "Matrimonial profile approved successfully. Please verify the approval email in your backend.",
        tone: "success",
      });
    } catch (err) {
      console.error("Approve member error:", err);
      setDialog({
        title: "Unable to approve profile",
        message:
          err instanceof Error
            ? err.message
            : "Failed to approve matrimonial profile.",
        tone: "error",
      });
    } finally {
      setApprovingId(null);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    try {
      setDeletingId(id);
      setOpenMenuId(null);
      setError("");

      const token = getAdminToken();
      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/${id}`,
        {
          method: "DELETE",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || `Failed to delete member (${response.status})`
        );
      }

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
      );

      // Keep the current page valid after deletion.
      const remainingCount = filteredUsers.length - 1;
      const newTotalPages = Math.ceil(remainingCount / rowsPerPage);

      setCurrentPage((page) =>
        Math.max(1, Math.min(page, newTotalPages || 1))
      );

      setDialog({
        title: "Profile deleted",
        message: `${name}'s matrimonial profile was deleted successfully.`,
        tone: "success",
      });
    } catch (err) {
      console.error("Delete member error:", err);
      setDialog({
        title: "Unable to delete profile",
        message:
          err instanceof Error
            ? err.message
            : "Failed to delete matrimonial profile.",
        tone: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId((current) => (current === id ? null : id));
  };

  const formatDate = (date: string | null | undefined) => {
    if (!date) return "-";

    const formattedDate = new Date(date);

    if (Number.isNaN(formattedDate.getTime())) return date;

    return formattedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getPhotoUrl = (photo: string | null, name: string) => {
    const photoUrl = getStorageImageUrl(photo, BACKEND_URL);

    if (photoUrl) return photoUrl;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "Member"
    )}&background=f5f5f5&color=555555&bold=true`;
  };

  const isPending = (status: string) =>
    !status || status.toLowerCase() === "pending";

  return (
    <main className="mx-auto min-h-screen max-w-[1600px] bg-gray-50/80 px-3 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* PAGE HEADER */}
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Matrimonial Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and monitor all registered matrimonial members.
          </p>
        </div>

        <Link
          href="/admin/matrimony/add"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f8eef2] px-5 py-3 font-semibold text-gray-900 shadow-sm transition hover:bg-[#f2e4ea]"
        >
          <FaPlus />
          Add Matrimonial
        </Link>
      </div>

      {/* MAIN CARD: KEEP OVERFLOW VISIBLE */}
      <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* SINGLE SEARCH BAR */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              placeholder="Search name, member ID, email or phone..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-11 pr-10 text-sm text-gray-700 outline-none transition focus:border-gray-300 focus:bg-white focus:ring-4 focus:ring-gray-100"
            />

            {search && (
              <button
                type="button"
                onClick={resetSearch}
                title="Clear search"
                aria-label="Clear search"
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>

          <span className="text-xs text-gray-500 sm:text-right">
            {filteredUsers.length} members
          </span>
        </div>

        {/* ERROR */}
        {error && (
          <div className="px-4 py-4 sm:px-6">
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
            <button
              type="button"
              onClick={() => void fetchUsers()}
              className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
            >
              Retry
            </button>
          </div>
        )}

        {/* TABLE: NO overflow-hidden ON THIS WRAPPER */}
        <div className="w-full overflow-visible">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[30%] sm:w-[22%]" />
              <col className="w-[14%] sm:w-[12%]" />
              <col className="w-[22%] sm:w-[24%]" />
              <col className="w-[16%] sm:w-[16%]" />
              <col className="w-[12%] sm:w-[12%]" />
              <col className="w-[6%] sm:w-[14%]" />
            </colgroup>

            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-1.5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Name
                </th>
                <th className="px-1 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Member ID
                </th>
                <th className="px-1 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Email
                </th>
                <th className="px-1 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Phone
                </th>
                <th className="px-1 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Status
                </th>
                <th className="px-1 py-3 text-center text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-3 py-12 text-center text-sm text-gray-500">
                    Loading matrimonial members...
                  </td>
                </tr>
              ) : currentUsers.length > 0 ? (
                currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`transition-colors hover:bg-gray-50 ${
                      openMenuId === user.id ? "relative z-20" : "relative z-0"
                    }`}
                  >
                    {/* NAME */}
                    <td className="px-1.5 py-3 align-middle sm:px-3">
                      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
                        <img
                          src={getPhotoUrl(
                            user.photo,
                            `${user.name} ${user.surname || ""}`
                          )}
                          alt={user.name}
                          className="h-7 w-7 shrink-0 rounded-full border border-gray-200 object-cover sm:h-9 sm:w-9"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                user.name || "Member"
                              )}&background=f5f5f5&color=555555`;
                          }}
                        />
                        <div className="min-w-0">
                          <p className="break-words text-[10px] font-semibold leading-tight text-gray-800 sm:text-xs">
                            {user.name} {user.surname || ""}
                          </p>
                          <p className="mt-1 text-[9px] text-gray-400 sm:text-[10px]">
                            #{user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* MEMBER ID */}
                    <td className="break-words px-1 py-3 text-[9px] leading-tight text-gray-600 sm:px-3 sm:text-xs">
                      {user.member_id || "-"}
                    </td>

                    {/* EMAIL */}
                    <td className="px-1 py-3 sm:px-3">
                      {user.email ? (
                        <a
                          href={`mailto:${user.email}`}
                          className="block break-all text-[9px] leading-tight text-gray-600 hover:text-[#8B1E3F] sm:text-xs"
                        >
                          {user.email}
                        </a>
                      ) : (
                        <span className="text-[9px] text-gray-400 sm:text-xs">-</span>
                      )}
                    </td>

                    {/* PHONE */}
                    <td className="break-words px-1 py-3 sm:px-3">
                      {user.mobile ? (
                        <a
                          href={`tel:${user.mobile}`}
                          className="text-[9px] leading-tight text-gray-600 hover:text-[#8B1E3F] sm:text-xs"
                        >
                          {user.mobile}
                        </a>
                      ) : (
                        <span className="text-[9px] text-gray-400 sm:text-xs">-</span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-1 py-3 sm:px-3">
                      <span
                        className={`inline-block max-w-full break-words rounded-full px-1.5 py-1 text-[9px] font-semibold leading-tight sm:px-2 sm:text-[10px] ${
                          isPending(user.status)
                            ? "bg-amber-50 text-amber-700"
                            : user.status.toLowerCase() === "approved"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status || "Pending"}
                      </span>

                      {user.expiry_date && (
                        <p className="mt-1 text-[9px] text-gray-400">
                          {formatDate(user.expiry_date)}
                        </p>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="relative px-1 py-3 text-center sm:px-3">
                      <div className="relative inline-block">
                        <button
                          type="button"
                          title="Member actions"
                          aria-label={`Actions for ${user.name}`}
                          aria-expanded={openMenuId === user.id}
                          aria-haspopup="menu"
                          onClick={() => toggleMenu(user.id)}
                          disabled={
                            deletingId === user.id ||
                            approvingId === user.id
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-[#8B1E3F] disabled:opacity-50 sm:h-8 sm:w-8"
                        >
                          <FaEllipsisV className="text-xs" />
                        </button>

                        {openMenuId === user.id && (
                          <div
                            role="menu"
                            className="absolute right-0 top-full z-[100] mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-xl"
                          >
                            {isPending(user.status) && (
                              <button
                                type="button"
                                role="menuitem"
                                disabled={approvingId === user.id}
                                onClick={() => {
                                  const name =
                                    `${user.name} ${user.surname || ""}`.trim();
                                  setOpenMenuId(null);
                                  setDialog({
                                    title: "Approve matrimonial profile",
                                    message: `Approve the matrimonial profile for ${name}?`,
                                    confirmLabel: "Approve",
                                    onConfirm: () => {
                                      setDialog(null);
                                      void handleApprove(user.id);
                                    },
                                  });
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-green-50 disabled:opacity-50"
                              >
                                <FaCheck className="text-green-600" />
                                {approvingId === user.id
                                  ? "Approving..."
                                  : "Approve"}
                              </button>
                            )}

                            <Link
                              role="menuitem"
                              href={`/admin/matrimony/view/${user.id}`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                            >
                              <FaEye className="text-gray-400" />
                              View
                            </Link>

                            <Link
                              role="menuitem"
                              href={`/admin/matrimony/edit/${user.id}`}
                              onClick={() => setOpenMenuId(null)}
                              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit className="text-gray-400" />
                              Edit
                            </Link>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              type="button"
                              role="menuitem"
                              disabled={deletingId === user.id}
                              onClick={() => {
                                const name =
                                  `${user.name} ${user.surname || ""}`.trim();
                                setOpenMenuId(null);
                                setDialog({
                                  title: "Delete matrimonial profile?",
                                  message:
                                    `Delete ${name}'s profile? This action cannot be undone.`,
                                  tone: "danger",
                                  confirmLabel: "Delete",
                                  onConfirm: () => {
                                    setDialog(null);
                                    void handleDelete(user.id, name);
                                  },
                                });
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              <FaTrash />
                              {deletingId === user.id
                                ? "Deleting..."
                                : "Delete"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-3 py-12 text-center">
                    <FaUsers className="mx-auto mb-3 text-2xl text-gray-300" />
                    <p className="text-sm font-semibold text-gray-700">
                      No members found
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Try another name, member ID, email or phone.
                    </p>
                    {search && (
                      <button
                        type="button"
                        onClick={resetSearch}
                        className="mt-3 text-xs font-semibold text-[#8B1E3F] hover:underline"
                      >
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* SINGLE PAGINATION */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <p className="text-[10px] text-gray-500 sm:text-xs">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredUsers.length === 0 ? 0 : indexOfFirstRow + 1}
            </span>
            {" - "}
            <span className="font-semibold text-gray-700">
              {indexOfLastRow}
            </span>
            {" of "}
            <span className="font-semibold text-gray-700">
              {filteredUsers.length}
            </span>{" "}
            members
          </p>

          {totalPages > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                disabled={safeCurrentPage <= 1}
                onClick={() => {
                  setCurrentPage((page) => Math.max(1, page - 1));
                  setOpenMenuId(null);
                }}
                className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - safeCurrentPage) <= 1
                )
                .map((page, index, pages) => (
                  <span key={page} className="flex items-center gap-1">
                    {index > 0 && page - pages[index - 1] > 1 && (
                      <span className="px-1 text-xs text-gray-400">
                        …
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        setOpenMenuId(null);
                      }}
                      className={`h-7 min-w-7 rounded-md px-2 text-[10px] font-semibold transition sm:text-xs ${
                        safeCurrentPage === page
                          ? "bg-[#8B1E3F] text-white"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                ))}

              <button
                type="button"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => {
                  setCurrentPage((page) =>
                    Math.min(totalPages, page + 1)
                  );
                  setOpenMenuId(null);
                }}
                className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
      {dialog && (
        <AdminDialog
          {...dialog}
          busy={dialog.busy || deletingId !== null || approvingId !== null}
          onClose={() => setDialog(null)}
        />
      )}
    </main>  
  );
}
