"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaRupeeSign,
  FaEllipsisV,
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

/* =========================================================
   DASHBOARD STATS
========================================================= */

const stats = [
  {
    title: "Total Profiles",
    value: "12,540",
    change: "+12.5%",
    description: "vs last month",
    icon: FaUsers,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Verified Profiles",
    value: "9,850",
    change: "+8.2%",
    description: "vs last month",
    icon: FaUserCheck,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Premium Members",
    value: "2,350",
    change: "+15.8%",
    description: "vs last month",
    icon: FaCrown,
    iconBg: "bg-gray-100",
    iconColor: "text-gray-600",
  },
  {
    title: "Total Revenue",
    value: "₹8,45,000",
    change: "+18.4%",
    description: "vs last month",
    icon: FaRupeeSign,
    iconBg: "bg-gray-100",
    iconColor: "text-[#8B1E3F]",
  },
];

/* =========================================================
   MEMBER TYPE
========================================================= */

interface Member {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  gender: string;
  created_at: string;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";


/* =========================================================
   PAGE
========================================================= */

export default function AdminDashboard() {
  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  /* Mobile/Desktop action menu */
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  /* Dropdown fixed position */
  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    right: 20,
  });

  const rowsPerPage = 5;

  /* =========================================================
     FETCH MEMBERS FROM BACKEND
  ========================================================= */

  useEffect(() => {
    fetchMembers();
  }, []);


const fetchMembers = async () => {
  try {
    setLoading(true);
    setError("");

    // Get logged-in user
    const userData =
      typeof window !== "undefined"
        ? localStorage.getItem("user")
        : null;

    const loggedInUser = userData
      ? JSON.parse(userData)
      : null;

    console.log("Logged-in User:", loggedInUser);

    // Get token if available
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    const response = await fetch(BACKEND_URL + "/membership-register" , {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",

        ...(token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {}),
      },
    });

    // API error
    if (!response.ok) {
      throw new Error(
        `Failed to fetch members. Status: ${response.status}`,
      );
    }

    const data = await response.json();

    console.log("Members API Response:", data);

    // Support all possible API response formats
    const memberArray = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.members)
      ? data.members
      : [];

    // Always set array
    setMembers(memberArray);

    // Empty result is NOT an API error
    if (memberArray.length === 0) {
      setError("");
    }
  } catch (err) {
    console.error(
      "Dashboard Members API Error:",
      err,
    );

    setMembers([]);

    setError(
      "Members data load కాలేదు. Backend server running ఉందో check చేయండి.",
    );
  } finally {
    setLoading(false);
  }
};
  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredUsers = members.filter((user) => {
    const searchValue = search.toLowerCase().trim();

    return (
      user.full_name
        ?.toLowerCase()
        .includes(searchValue) ||
      user.email
        ?.toLowerCase()
        .includes(searchValue) ||
      user.mobile
        ?.toLowerCase()
        .includes(searchValue) ||
      user.gender
        ?.toLowerCase()
        .includes(searchValue) ||
      String(user.id)
        .toLowerCase()
        .includes(searchValue) ||
      new Date(user.created_at)
        .toLocaleDateString("en-IN")
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

  const currentUsers = filteredUsers.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  /* =========================================================
     RESET SEARCH
  ========================================================= */

  const resetSearch = () => {
    setSearch("");
    setCurrentPage(1);
  };

  /* =========================================================
     ACTION MENU
  ========================================================= */

  const handleActionClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    userId: number
  ) => {
    event.stopPropagation();

    if (openActionId === userId) {
      setOpenActionId(null);
      return;
    }

    const buttonRect =
      event.currentTarget.getBoundingClientRect();

    const menuWidth = 150;

    let rightPosition =
      window.innerWidth - buttonRect.right;

    if (rightPosition < 10) {
      rightPosition = 10;
    }

    if (
      buttonRect.left + buttonRect.width - menuWidth <
      10
    ) {
      rightPosition =
        window.innerWidth - buttonRect.left;
    }

    setMenuPosition({
      top: buttonRect.bottom + 8,
      right: rightPosition,
    });

    setOpenActionId(userId);
  };

  /* =========================================================
     CLOSE ACTION MENU
  ========================================================= */

  const closeActionMenu = () => {
    setOpenActionId(null);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async (userId: number) => {
    const user = members.find(
      (item) => item.id === userId
    );

    if (!user) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.full_name}?`
    );

    if (!confirmed) return;

    /*
      DELETE API not created yet.
      For now only remove from UI.
    */

    setMembers((prev) =>
      prev.filter((item) => item.id !== userId)
    );

    setOpenActionId(null);

    alert(
      `${user.full_name} removed from the table.`
    );
  };

  return (
    <div
      className="min-h-screen bg-gray-50/80"
      onClick={closeActionMenu}
    >
      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl text-gray-900">
              Membership Management
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor all registered matrimonial members.
            </p>
          </div>

          {/* ADD MEMBER */}

          <Link
            href="/admin/membership/add"
            onClick={(e) => e.stopPropagation()}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              bg-[#f8eef2]
              hover:bg-[#f3e5eb]
              text-black
              px-5
              py-3
              rounded-xl
              font-semibold
              shadow-sm
              transition
            "
          >
            <FaPlus className="text-sm" />
            Add Member
          </Link>
        </div>

        {/* ===================================================
            MEMBER TABLE CARD
        =================================================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* =================================================
              SEARCH BAR
          ================================================= */}

          <div className="px-5 sm:px-6 py-5 border-b border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">

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
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    setOpenActionId(null);
                  }}
                  placeholder="Search by member name, email or phone..."
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

                {/* CLEAR SEARCH */}

                {search && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetSearch();
                    }}
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

              <div className="flex items-center justify-between sm:justify-end gap-3">

                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {filteredUsers.length} members
                </span>

                {search && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetSearch();
                    }}
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
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              <thead>
                <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-400">

                  <th className="px-6 py-4 text-left font-semibold">
                    Member Name
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

                  <th className="px-6 py-4 text-left font-semibold">
                    Gender
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Create Date
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {/* LOADING */}

                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <div className="text-sm text-gray-500">
                        Loading members...
                      </div>
                    </td>
                  </tr>
                ) : error ? (

                  /* ERROR */

                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >
                      <p className="text-sm text-red-500">
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={fetchMembers}
                        className="
                          mt-4
                          px-4
                          py-2
                          rounded-lg
                          bg-[#8B1E3F]
                          text-white
                          text-sm
                        "
                      >
                        Retry
                      </button>
                    </td>
                  </tr>

                ) : currentUsers.length > 0 ? (

                  currentUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        hover:bg-gray-50/70
                        transition-colors
                      "
                    >

                      {/* MEMBER NAME */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.full_name
                            )}&background=f5f5f5&color=555555&bold=true`}
                            className="
                              w-10
                              h-10
                              rounded-xl
                              object-cover
                            "
                            alt={user.full_name}
                          />

                          <div className="min-w-0">

                            <p className="font-semibold text-gray-800 truncate">
                              {user.full_name}
                            </p>

                            
                          </div>

                        </div>

                      </td>

                      {/* MEMBER ID */}

                      <td className="px-6 py-4">

                        <span className="text-sm font-semibold text-[#8B1E3F]">
                          AVM{String(user.id).padStart(4, "0")}
                        </span>

                      </td>

                      {/* EMAIL */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600">
                          {user.email}
                        </span>

                      </td>

                      {/* PHONE */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600">
                          {user.mobile}
                        </span>

                      </td>

                      {/* GENDER */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600">
                          {user.gender}
                        </span>

                      </td>

                      {/* CREATE DATE */}

                      <td className="px-6 py-4">

                        <span className="text-sm text-gray-600">
                          {new Date(
                            user.created_at
                          ).toLocaleDateString("en-IN")}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <button
                            type="button"
                            title="More actions"
                            onClick={(event) =>
                              handleActionClick(
                                event,
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
                              touch-manipulation
                            "
                          >
                            <FaEllipsisV className="text-sm" />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  /* NO RESULTS */

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
                          Try searching with a different name,
                          email or phone number.
                        </p>

                        {search && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetSearch();
                            }}
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

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  );
                }}
                disabled={currentPage === 1}
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

              {Array.from({
                length: Math.max(totalPages, 1),
              }).map((_, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setCurrentPage(index + 1);

                    setOpenActionId(null);
                  }}
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    text-sm
                    font-semibold
                    transition

                    ${
                      currentPage === index + 1
                        ? "bg-gray-50/80 text-black shadow-md"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }
                  `}
                >
                  {index + 1}
                </button>

              ))}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();

                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      Math.max(totalPages, 1)
                    )
                  );
                }}
                disabled={
                  currentPage === totalPages ||
                  totalPages === 0
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

          </div>

        </div>

      </main>

      {/* =====================================================
          FIXED ACTION DROPDOWN
      ===================================================== */}

      {openActionId !== null && (

        <div
          className="
            fixed
            z-[9999]
            w-[150px]
            bg-white
            border
            border-gray-100
            rounded-xl
            shadow-2xl
            py-1.5
          "
          style={{
            top: menuPosition.top,
            right: menuPosition.right,
          }}
          onClick={(e) => e.stopPropagation()}
        >

          {/* EDIT */}

          <Link
            href={`/admin/membership/edit/${openActionId}`}
            onClick={() => setOpenActionId(null)}
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

            Edit

          </Link>

          <div className="my-1 border-t border-gray-100" />

          {/* DELETE */}

          <button
            type="button"
            onClick={() =>
              handleDelete(openActionId)
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
            "
          >

            <FaTrash className="text-gray-400 text-xs" />

            Delete

          </button>

        </div>

      )}

    </div>
  );
}