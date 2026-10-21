
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

/* =========================================================
   TYPE
========================================================= */

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

/* =========================================================
   BACKEND URL
========================================================= */

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

/* =========================================================
   PAGE
========================================================= */

export default function AdminDashboard() {
  const [users, setUsers] = useState<MatrimonialUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [approvingId, setApprovingId] =
    useState<number | null>(null);

  const rowsPerPage = 5;

  /* =========================================================
     GET MATRIMONIAL USERS
  ========================================================= */

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Matrimonial users:", data);

      setUsers(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (error) {
      console.error(
        "Error fetching matrimonial users:",
        error
      );

      setError(
        "Unable to load matrimonial members. Please check the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredUsers = users.filter(
    (user) => {
      const searchValue =
        search.toLowerCase().trim();

      if (!searchValue) {
        return true;
      }

      return (
        (user.name || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.surname || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.member_id || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.email || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.mobile || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.address || "")
          .toLowerCase()
          .includes(searchValue) ||

        (user.profile_category || "")
          .toLowerCase()
          .includes(searchValue)
      );
    }
  );

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredUsers.length /
      rowsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(
          currentPage,
          totalPages
        )
      : 1;

  const indexOfLastRow =
    safeCurrentPage *
    rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow -
    rowsPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstRow,
      indexOfLastRow
    );

  /* =========================================================
     RESET SEARCH
  ========================================================= */

  const resetSearch = () => {
    setSearch("");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  /* =========================================================
     APPROVE MATRIMONIAL PROFILE
  ========================================================= */

  const handleApprove = async (
    id: number,
    name: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to approve ${name}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setApprovingId(id);
      setOpenMenuId(null);
      setError("");

      console.log(
        "Approving matrimonial member:",
        id
      );

      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/${id}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data =
        await response
          .json()
          .catch(() => null);

      console.log(
        "APPROVE RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to approve member (${response.status})`
        );
      }

      /* -----------------------------------------
         UPDATE TABLE WITHOUT REFRESH
      ----------------------------------------- */

      setUsers(
        (previousUsers) =>
          previousUsers.map(
            (user) =>
              user.id === id
                ? {
                    ...user,
                    status:
                      data?.status ||
                      "Approved",
                    approved_at:
                      data?.approved_at ||
                      new Date().toISOString(),
                    expiry_date:
                      data?.expiry_date ||
                      null,
                  }
                : user
          )
      );

      alert(
        "Matrimonial profile approved successfully. Approval email has been sent."
      );
    } catch (error) {
      console.error(
        "Approve member error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to approve matrimonial profile."
      );
    } finally {
      setApprovingId(null);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (
    id: number,
    name: string
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${name}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setOpenMenuId(null);
      setError("");

      console.log(
        "Deleting matrimonial member:",
        id
      );

      const response =
        await fetch(
          `${BACKEND_URL}/matrimonial-users/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response
          .json()
          .catch(() => null);

      console.log(
        "DELETE RESPONSE:",
        data
      );

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            data?.message
          )
            ? data.message.join(
                ", "
              )
            : data?.message ||
                `Failed to delete member (${response.status})`
        );
      }

      /* -----------------------------------------
         REMOVE FROM TABLE
      ----------------------------------------- */

      setUsers(
        (previousUsers) =>
          previousUsers.filter(
            (user) =>
              user.id !== id
          )
      );

      /* -----------------------------------------
         PAGINATION FIX
      ----------------------------------------- */

      setCurrentPage(
        (previousPage) => {
          const remainingCount =
            filteredUsers.length -
            1;

          const newTotalPages =
            Math.ceil(
              remainingCount /
                rowsPerPage
            );

          if (
            newTotalPages === 0
          ) {
            return 1;
          }

          return Math.min(
            previousPage,
            newTotalPages
          );
        }
      );

      alert(
        "Matrimonial profile deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete member error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete matrimonial profile."
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================================================
     MENU TOGGLE
  ========================================================= */

  const toggleMenu = (
    id: number
  ) => {
    setOpenMenuId(
      (current) =>
        current === id
          ? null
          : id
    );
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (
    date: string | null | undefined
  ) => {
    if (!date) {
      return "-";
    }

    const formattedDate =
      new Date(date);

    if (
      isNaN(
        formattedDate.getTime()
      )
    ) {
      return date;
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =========================================================
     PHOTO URL
  ========================================================= */

  const getPhotoUrl = (
    photo: string | null,
    name: string
  ) => {
    if (photo) {
      if (
        photo.startsWith("http://") ||
        photo.startsWith("https://")
      ) {
        return photo;
      }

      return `${BACKEND_URL}/uploads/matrimonial/${photo}`;
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=f5f5f5&color=555555&bold=true`;
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const isPending = (
    status: string
  ) => {
    return (
      !status ||
      status.toLowerCase() ===
        "pending"
    );
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">
      <main
        className="
          px-4
          sm:px-6
          lg:px-8
          py-6
          lg:py-8
          max-w-[1600px]
          mx-auto
        "
      >
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-4
            mb-7
          "
        >
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Matrimonial Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all registered
              matrimonial members.
            </p>
          </div>

          {/* ADD MATRIMONIAL */}

          <Link
            href="/admin/matrimony/add"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[#f8eef2]
              hover:bg-[#f2e4ea]
              text-black
              px-5
              py-3
              rounded-xl
              font-semibold
              shadow-sm
              transition
            "
          >
            <FaPlus />
            Add Matrimonial
          </Link>
        </div>

        {/* ===================================================
            TABLE CARD
        =================================================== */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-visible
          "
        >
          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <div
            className="
              px-5
              sm:px-6
              py-5
              border-b
              border-gray-100
            "
          >
            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                gap-3
              "
            >
              {/* SEARCH */}

              <div className="relative flex-1">
                <FaSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    text-sm
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(
                      e.target.value
                    );
                    setCurrentPage(1);
                    setOpenMenuId(null);
                  }}
                  placeholder="Search by name, member ID, email or phone..."
                  className="
                    w-full
                    h-11
                    pl-11
                    pr-11
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/80
                    text-sm
                    text-gray-700
                    placeholder:text-gray-400
                    outline-none
                    transition-all
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                  "
                />

                {/* CLEAR */}

                {search && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    title="Clear search"
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      w-7
                      h-7
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      text-gray-400
                      hover:bg-gray-100
                      hover:text-gray-700
                      transition
                    "
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}
              </div>

              {/* RESULT COUNT */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  sm:justify-end
                  gap-3
                "
              >
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {filteredUsers.length} members
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={resetSearch}
                    className="
                      text-xs
                      font-semibold
                      text-gray-500
                      hover:text-[#8B1E3F]
                    "
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="px-6 py-4">
              <div
                className="
                  rounded-xl
                  bg-red-50
                  border
                  border-red-100
                  px-4
                  py-3
                  text-sm
                  text-red-600
                "
              >
                {error}
              </div>

              <button
                type="button"
                onClick={fetchUsers}
                className="
                  mt-3
                  px-4
                  py-2
                  rounded-lg
                  bg-gray-100
                  text-sm
                  font-semibold
                  text-gray-700
                  hover:bg-gray-200
                "
              >
                Retry
              </button>
            </div>
          )}

          {/* =================================================
              TABLE
          ================================================= */}

    
{/* =================================================
    COMPACT MATRIMONY TABLE — NO HORIZONTAL SCROLL
================================================= */}

<div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

  {/* TABLE HEADER */}
  <div className="flex flex-col gap-3 border-b border-gray-100 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-800">
        Matrimonial Members
      </h3>
      <p className="mt-1 text-xs text-gray-500">
        {filteredUsers.length} registered profiles
      </p>
    </div>

    <div className="relative w-full sm:max-w-xs">
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
          setOpenMenuId(null);
        }}
        placeholder="Search name, ID, phone..."
        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-8 pr-3 text-xs text-gray-700 outline-none focus:border-[#8B1E3F] focus:bg-white sm:text-sm"
      />
      {search && (
        <button
          type="button"
          onClick={resetSearch}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700"
        >
          <FaTimes className="text-xs" />
        </button>
      )}
    </div>
  </div>

  {/* TABLE: FIXED WIDTH, NO SCROLL */}
  <div className="w-full overflow-hidden">
    <table className="w-full table-fixed border-collapse">
      <colgroup>
        <col className="w-[34%] sm:w-[24%]" />
        <col className="w-[18%] sm:w-[14%]" />
        <col className="hidden md:table-column md:w-[20%]" />
        <col className="w-[20%] sm:w-[16%] md:w-[13%]" />
        <col className="w-[16%] sm:w-[14%]" />
        <col className="w-[12%] sm:w-[12%]" />
      </colgroup>

      <thead>
        <tr className="border-b border-gray-200 bg-gray-50">
          <th className="px-1.5 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
            Name
          </th>
          <th className="px-1 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
            Member ID
          </th>
          <th className="hidden px-2 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wide text-gray-500 md:table-cell">
            Email
          </th>
          <th className="px-1 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
            Phone
          </th>
          <th className="px-1 py-2.5 text-left text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
            Status
          </th>
          <th className="px-1 py-2.5 text-center text-[9px] font-semibold uppercase tracking-wide text-gray-500 sm:px-3 sm:text-[10px]">
            Actions
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <tr
              key={user.id}
              className="transition-colors hover:bg-gray-50"
            >
              {/* NAME */}
              <td className="px-1.5 py-2.5 align-middle sm:px-3 sm:py-3">
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
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "Member")}&background=f5f5f5&color=555555`;
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
              <td className="break-words px-1 py-2.5 text-[9px] leading-tight text-gray-600 sm:px-3 sm:text-xs">
                {user.member_id || "-"}
              </td>

              {/* EMAIL — DESKTOP */}
              <td className="hidden px-2 py-2.5 md:table-cell">
                <p className="break-all text-xs text-gray-600">
                  {user.email || "-"}
                </p>
              </td>

              {/* PHONE */}
              <td className="break-words px-1 py-2.5 text-[10px] leading-tight text-gray-600 sm:px-3 sm:text-xs">
                {user.mobile || "-"}
              </td>

              {/* STATUS */}
              <td className="px-1 py-2.5 sm:px-3">
                <span
                  className={`inline-block max-w-full break-words rounded-full px-1.5 py-1 text-[9px] font-semibold leading-tight sm:px-2 sm:text-[10px] ${
                    !user.status ||
                    user.status.toLowerCase() === "pending"
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
              <td className="px-1 py-2.5 text-center sm:px-3">
                <div className="relative inline-block">
                  <button
                    type="button"
                    title="Member actions"
                    aria-label={`Actions for ${user.name}`}
                    aria-expanded={openMenuId === user.id}
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
                    <div className="absolute right-0 top-8 z-50 w-40 rounded-lg border border-gray-200 bg-white py-1 text-left shadow-xl">
                      {isPending(user.status) && (
                        <button
                          type="button"
                          disabled={approvingId === user.id}
                          onClick={() =>
                            handleApprove(
                              user.id,
                              `${user.name} ${user.surname || ""}`.trim()
                            )
                          }
                          className="flex w-full items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-green-50 disabled:opacity-50"
                        >
                          <FaCheck className="text-green-600" />
                          {approvingId === user.id
                            ? "Approving..."
                            : "Approve"}
                        </button>
                      )}

                      <Link
                        href={`/admin/matrimony/view/${user.id}`}
                        onClick={() => setOpenMenuId(null)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <FaEye className="text-gray-400" />
                        View
                      </Link>

                      <Link
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
                        disabled={deletingId === user.id}
                        onClick={() =>
                          handleDelete(
                            user.id,
                            `${user.name} ${user.surname || ""}`.trim()
                          )
                        }
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

  {/* PAGINATION */}
  <div className="flex flex-col gap-3 border-t border-gray-100 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
    <p className="text-[10px] text-gray-500 sm:text-xs">
      Showing{" "}
      <span className="font-semibold text-gray-700">
        {filteredUsers.length === 0 ? 0 : indexOfFirstRow + 1}
      </span>
      {" - "}
      <span className="font-semibold text-gray-700">
        {Math.min(indexOfLastRow, filteredUsers.length)}
      </span>
      {" of "}
      <span className="font-semibold text-gray-700">
        {filteredUsers.length}
      </span>
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
          className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 sm:text-xs"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === totalPages ||
              Math.abs(page - safeCurrentPage) <= 1
          )
          .map((page, index, pages) => (
            <span key={page} className="flex items-center gap-1">
              {index > 0 && page - pages[index - 1] > 1 && (
                <span className="px-1 text-xs text-gray-400">…</span>
              )}
              <button
                type="button"
                onClick={() => {
                  setCurrentPage(page);
                  setOpenMenuId(null);
                }}
                className={`h-7 min-w-7 rounded-md px-2 text-[10px] font-semibold sm:text-xs ${
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
            setCurrentPage((page) => Math.min(totalPages, page + 1));
            setOpenMenuId(null);
          }}
          className="rounded-md border border-gray-200 px-2.5 py-1.5 text-[10px] text-gray-600 hover:bg-gray-50 disabled:opacity-40 sm:text-xs"
        >
          Next
        </button>
      </div>
    )}
  </div>
</div>


          {/* =================================================
              PAGINATION
          ================================================= */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
              px-6
              py-4
              border-t
              border-gray-100
            "
          >
            {/* PAGINATION INFO */}

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredUsers.length === 0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(
                  indexOfLastRow,
                  filteredUsers.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredUsers.length}
              </span>{" "}
              members
            </p>

            {/* PAGINATION BUTTONS */}

            {totalPages > 0 && (
              <div className="flex items-center gap-2">
                {/* PREVIOUS */}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1
                        )
                    );

                    setOpenMenuId(null);
                  }}
                  disabled={
                    safeCurrentPage === 1
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-gray-200
                    text-sm
                    font-medium
                    hover:bg-gray-50
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Previous
                </button>

                {/* PAGE NUMBERS */}

                {Array.from({
                  length: totalPages,
                }).map(
                  (_, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => {
                        setCurrentPage(
                          index + 1
                        );

                        setOpenMenuId(null);
                      }}
                      className={`
                        w-9
                        h-9
                        rounded-lg
                        text-sm
                        font-semibold
                        transition
                        ${
                          safeCurrentPage ===
                          index + 1
                            ? "bg-gray-100 text-black shadow-sm"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                {/* NEXT */}

                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                    );

                    setOpenMenuId(null);
                  }}
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  className="
                    px-4
                    py-2
                    rounded-lg
                    border
                    border-gray-200
                    text-sm
                    font-medium
                    hover:bg-gray-50
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition
                  "
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

