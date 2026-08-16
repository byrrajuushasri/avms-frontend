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

  created_at: string;
  updated_at: string;
}

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

  const rowsPerPage = 5;

  /* =========================================================
     GET MATRIMONIAL USERS
  ========================================================= */

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/matrimonial-users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status}`
        );
      }

      const data = await response.json();

      console.log("Matrimonial users:", data);

      /*
       * Backend returns array directly
       */
      setUsers(Array.isArray(data) ? data : []);
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
     SEARCH
  ========================================================= */

  const filteredUsers = users.filter((user) => {
    const searchValue = search
      .toLowerCase()
      .trim();

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
  });

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredUsers.length / rowsPerPage
  );

  const indexOfLastRow =
    currentPage * rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow - rowsPerPage;

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
     DELETE
  ========================================================= */

  const handleDelete = (
    id: number,
    name: string
  ) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmed) return;

    console.log(
      "Delete matrimonial member:",
      id
    );

    setOpenMenuId(null);

    // Delete API can be added next.
  };

  /* =========================================================
     MENU TOGGLE
  ========================================================= */

  const toggleMenu = (id: number) => {
    setOpenMenuId((current) =>
      current === id ? null : id
    );
  };

  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (
    date: string | null
  ) => {
    if (!date) return "-";

    const formattedDate =
      new Date(date);

    if (isNaN(formattedDate.getTime())) {
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
      return `http://localhost:5000/uploads/matrimonial/${photo}`;
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=f5f5f5&color=555555&bold=true`;
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

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
              Manage and monitor all registered matrimonial members.
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

          <div className="overflow-x-auto overflow-y-visible">

            <table className="w-full min-w-[1100px]">

              {/* TABLE HEADER */}

              <thead>

                <tr
                  className="
                    bg-gray-50/80
                    text-xs
                    uppercase
                    tracking-wider
                    text-gray-400
                  "
                >

                  <th className="px-6 py-4 text-left font-semibold">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Member ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Email ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Phone Number
                  </th>

                  {/* PROFILE CATEGORY */}

                  <th className="px-6 py-4 text-left font-semibold">
                    Profile Category
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Create Date
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-gray-100">

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (

                  <tr>

                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className="
                            w-10
                            h-10
                            border-4
                            border-gray-200
                            border-t-gray-600
                            rounded-full
                            animate-spin
                          "
                        />

                        <p className="text-sm text-gray-500 mt-4">
                          Loading matrimonial members...
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : currentUsers.length > 0 ? (

                  /* =================================================
                     USERS
                  ================================================= */

                  currentUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        hover:bg-gray-50/70
                        transition-colors
                      "
                    >

                      {/* =================================================
                          NAME
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={getPhotoUrl(
                              user.photo,
                              `${user.name} ${
                                user.surname || ""
                              }`
                            )}
                            alt={user.name}
                            className="
                              w-10
                              h-10
                              rounded-xl
                              object-cover
                              border
                              border-gray-100
                            "
                            onError={(e) => {
                              e.currentTarget.src =
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  user.name
                                )}&background=f5f5f5&color=555555&bold=true`;
                            }}
                          />

                          <div className="min-w-0">

                            <p
                              className="
                                font-semibold
                                text-gray-800
                                truncate
                                max-w-[180px]
                              "
                            >
                              {user.name}{" "}
                              {user.surname || ""}
                            </p>

                            <p className="text-xs text-gray-400 mt-0.5">
                              ID #{user.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* =================================================
                          MEMBER ID
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-medium text-gray-600">
                          {user.member_id || "-"}
                        </span>

                      </td>

                      {/* =================================================
                          EMAIL
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {user.email || "-"}
                        </span>

                      </td>

                      {/* =================================================
                          PHONE
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          {user.mobile || "-"}
                        </span>

                      </td>

                      {/* =================================================
                          PROFILE CATEGORY
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span
                          className="
                            inline-flex
                            items-center
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-semibold
                            bg-gray-50
                            text-gray-600
                          "
                        >
                          {user.profile_category || "-"}
                        </span>

                      </td>

                      {/* =================================================
                          CREATE DATE
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="flex flex-col">

                          <span
                            className="
                              text-sm
                              font-medium
                              text-gray-700
                              whitespace-nowrap
                            "
                          >
                            {formatDate(
                              user.created_at
                            )}
                          </span>

                          <span className="text-xs text-gray-400 mt-0.5">
                            Registered
                          </span>

                        </div>

                      </td>

                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <div className="relative">

                            {/* ACTION BUTTON */}

                            <button
                              type="button"
                              title="More actions"
                              aria-label={`Actions for ${user.name}`}
                              aria-expanded={
                                openMenuId ===
                                user.id
                              }
                              onClick={() =>
                                toggleMenu(
                                  user.id
                                )
                              }
                              className="
                                w-9
                                h-9
                                flex
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                text-gray-500
                                hover:text-gray-800
                                hover:bg-gray-50
                                hover:border-gray-300
                                active:bg-gray-100
                                transition-all
                              "
                            >
                              <FaEllipsisV className="text-sm" />
                            </button>

                            {/* =================================================
                                DROPDOWN
                            ================================================= */}

                            {openMenuId ===
                              user.id && (

                              <div
                                className="
                                  absolute
                                  right-0
                                  top-11
                                  z-50
                                  w-40
                                  bg-white
                                  border
                                  border-gray-100
                                  rounded-xl
                                  shadow-2xl
                                  py-1.5
                                "
                              >

                                {/* VIEW */}

                                <Link
                                  href={`/admin/matrimony/view/${user.id}`}
                                  onClick={() =>
                                    setOpenMenuId(
                                      null
                                    )
                                  }
                                  className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-gray-600
                                    hover:bg-gray-50
                                    hover:text-gray-900
                                    transition
                                  "
                                >

                                  <FaEye className="text-gray-400 text-xs" />

                                  <span>
                                    View
                                  </span>

                                </Link>

                                {/* EDIT */}

                                <Link
                                  href={`/admin/matrimony/edit/${user.id}`}
                                  onClick={() =>
                                    setOpenMenuId(
                                      null
                                    )
                                  }
                                  className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-gray-600
                                    hover:bg-gray-50
                                    hover:text-gray-900
                                    transition
                                  "
                                >

                                  <FaEdit className="text-gray-400 text-xs" />

                                  <span>
                                    Edit
                                  </span>

                                </Link>

                                {/* DIVIDER */}

                                <div className="my-1 border-t border-gray-100" />

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      user.id,
                                      user.name
                                    )
                                  }
                                  className="
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-gray-500
                                    hover:bg-red-50
                                    hover:text-red-600
                                    transition
                                    text-left
                                  "
                                >

                                  <FaTrash className="text-gray-400 text-xs" />

                                  <span>
                                    Delete
                                  </span>

                                </button>

                              </div>
                            )}

                          </div>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  /* =================================================
                     NO RESULTS
                  ================================================= */

                  <tr>

                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className="
                            w-12
                            h-12
                            rounded-xl
                            bg-gray-50
                            flex
                            items-center
                            justify-center
                            mb-3
                          "
                        >
                          <FaUsers className="text-gray-300" />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          No members found
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Try searching with a
                          different name, email or
                          phone number.
                        </p>

                        {search && (
                          <button
                            type="button"
                            onClick={resetSearch}
                            className="
                              mt-4
                              text-xs
                              font-semibold
                              text-[#8B1E3F]
                              hover:underline
                            "
                          >
                            Clear search
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

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
                    currentPage === 1
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
                }).map((_, index) => (

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
                        currentPage ===
                        index + 1
                          ? "bg-gray-100 text-black shadow-sm"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }
                    `}
                  >
                    {index + 1}
                  </button>

                ))}

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
                    currentPage ===
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