"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaRupeeSign,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaEdit,
  FaTrash,
  FaFilter,
  FaTimes,
  FaEllipsisV,
} from "react-icons/fa";

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  userType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

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
   PAGE
========================================================= */

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [openActionId, setOpenActionId] =
    useState<number | null>(null);

  /* =======================================================
     GET USERS
  ======================================================= */

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/users"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        console.log("Users API Response:", data);

        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);

        setError(
          "Unable to load users. Please make sure the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  /* =======================================================
     SEARCH + STATUS FILTER
  ======================================================= */

  const filteredUsers = users.filter((user) => {
    const searchValue = search
      .toLowerCase()
      .trim();

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(searchValue) ||
      user.email
        .toLowerCase()
        .includes(searchValue) ||
      user.userType
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "All" ||
      user.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* =======================================================
     PAGINATION
  ======================================================= */

  const rowsPerPage = 5;

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

  /* =======================================================
     RESET FILTERS
  ======================================================= */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setCurrentPage(1);
    setOpenActionId(null);
  };

  /* =======================================================
     DELETE USER
  ======================================================= */

  const handleDelete = async (
    userId: number,
    userName: string
  ) => {
    setOpenActionId(null);

    const confirmed = window.confirm(
      `Are you sure you want to delete ${userName}?`
    );

    if (!confirmed) {
      return;
    }

    /*
      DELETE API will be connected next.

      Example:

      await fetch(
        `http://localhost:5000/users/${userId}`,
        {
          method: "DELETE",
        }
      );
    */

    alert(
      `${userName} delete API will be connected next.`
    );
  };

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

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            justify-between
            gap-4
            mb-6
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-semibold
                text-gray-900
              "
            >
              User Management
            </h2>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Manage, verify and monitor users.
            </p>

          </div>

          <Link
            href="/admin/users/add"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-11
              px-5
              rounded-xl
              bg-[#f8eef2]
              hover:bg-[#f3e4e9]
              text-gray-800
              text-sm
              font-semibold
              shadow-sm
              transition-all
            "
          >
            <FaPlus className="text-xs" />

            Add User
          </Link>

        </div>

        {/* =================================================
            USER TABLE CARD
        ================================================= */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* =================================================
              SEARCH + FILTER
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
                xl:flex-row
                xl:items-center
                gap-4
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
                  placeholder="Search by name, email or user type..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    setOpenActionId(null);
                  }}
                  className="
                    w-full
                    h-11
                    pl-11
                    pr-10
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

                {search && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setCurrentPage(1);
                    }}
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
                    "
                  >
                    <FaTimes className="text-xs" />
                  </button>
                )}

              </div>

              {/* FILTER AREA */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >

                {/* STATUS */}

                <div className="relative">

                  <FaFilter
                    className="
                      absolute
                      left-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      text-xs
                      pointer-events-none
                    "
                  />

                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                      setOpenActionId(null);
                    }}
                    className="
                      appearance-none
                      h-11
                      w-full
                      sm:w-40
                      pl-9
                      pr-9
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-sm
                      text-gray-600
                      outline-none
                      cursor-pointer
                      hover:bg-gray-50
                      focus:border-gray-300
                      transition
                    "
                  >

                    <option value="All">
                      All Status
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Active">
                      Active
                    </option>

                    <option value="Suspended">
                      Suspended
                    </option>

                  </select>

                </div>

                {/* RESET */}

                {(search ||
                  statusFilter !== "All") && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-gray-200
                      bg-white
                      text-sm
                      font-medium
                      text-gray-500
                      hover:bg-gray-50
                      hover:text-gray-800
                      transition
                    "
                  >
                    Reset
                  </button>
                )}

              </div>

            </div>

            {/* RESULT COUNT */}

            <div
              className="
                flex
                items-center
                justify-between
                mt-4
              "
            >

              <p
                className="
                  text-xs
                  text-gray-400
                "
              >
                Showing{" "}

                <span
                  className="
                    font-semibold
                    text-gray-600
                  "
                >
                  {filteredUsers.length}
                </span>{" "}

                users
              </p>

              {(search ||
                statusFilter !== "All") && (
                <span
                  className="
                    text-xs
                    text-[#8B1E3F]
                    font-medium
                  "
                >
                  Filters applied
                </span>
              )}

            </div>

          </div>

          {/* =================================================
              TABLE
          ================================================= */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

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
                    User Name
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    User ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    User Type
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Created
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody className="divide-y divide-gray-100">

                {/* LOADING */}

                {loading ? (
                  <tr>

                    <td
                      colSpan={6}
                      className="
                        px-6
                        py-16
                        text-center
                      "
                    >

                      <div className="flex flex-col items-center">

                        <div
                          className="
                            w-8
                            h-8
                            border-2
                            border-gray-200
                            border-t-[#8B1E3F]
                            rounded-full
                            animate-spin
                          "
                        />

                        <p
                          className="
                            mt-3
                            text-sm
                            text-gray-500
                          "
                        >
                          Loading users...
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : error ? (

                  /* ERROR */

                  <tr>

                    <td
                      colSpan={6}
                      className="
                        px-6
                        py-16
                        text-center
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-red-500
                        "
                      >
                        {error}
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          window.location.reload();
                        }}
                        className="
                          mt-3
                          text-xs
                          font-semibold
                          text-[#8B1E3F]
                          hover:underline
                        "
                      >
                        Try Again
                      </button>

                    </td>

                  </tr>

                ) : currentUsers.length > 0 ? (

                  /* USERS */

                  currentUsers.map((user) => (

                    <tr
                      key={user.id}
                      className="
                        hover:bg-gray-50/70
                        transition
                      "
                    >

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            items-center
                            gap-3
                          "
                        >

                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=f5f5f5&color=444444&bold=true`}
                            className="
                              w-11
                              h-11
                              rounded-xl
                            "
                            alt={user.name}
                          />

                          <div>

                            <p
                              className="
                                font-semibold
                                text-gray-800
                              "
                            >
                              {user.name}
                            </p>

                            <p
                              className="
                                text-xs
                                text-gray-400
                                mt-0.5
                              "
                            >
                              {user.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* USER ID */}

                      <td className="px-6 py-4">

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-gray-700
                          "
                        >
                          USR{1000 + user.id}
                        </span>

                      </td>

                      {/* USER TYPE */}

                      <td className="px-6 py-4">

                        <span
                          className="
                            inline-flex
                            px-3
                            py-1
                            rounded-lg
                            bg-gray-50
                            border
                            border-gray-100
                            text-xs
                            font-medium
                            text-gray-600
                          "
                        >
                          {user.userType}
                        </span>

                      </td>

                      {/* CREATED */}

                      <td className="px-6 py-4">

                        <p
                          className="
                            text-sm
                            text-gray-600
                          "
                        >
                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "-"}
                        </p>

                      </td>

                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            px-3
                            py-1.5
                            rounded-full
                            text-xs
                            font-semibold

                            ${
                              user.status === "Active"
                                ? "bg-gray-100 text-gray-700"
                                : user.status === "Pending"
                                ? "bg-gray-50 text-gray-500 border border-gray-200"
                                : "bg-red-50 text-red-500 border border-red-100"
                            }
                          `}
                        >

                          {user.status === "Active" ? (
                            <FaCheckCircle className="text-gray-500" />
                          ) : (
                            <FaClock className="text-gray-400" />
                          )}

                          {user.status}

                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <div className="relative">

                            {/* ACTION BUTTON */}

                            <button
                              type="button"
                              title="More actions"
                              onClick={() =>
                                setOpenActionId(
                                  openActionId === user.id
                                    ? null
                                    : user.id
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

                            {/* ACTION DROPDOWN */}

                            {openActionId === user.id && (

                              <div
                                className="
                                  absolute
                                  right-0
                                  top-11
                                  z-[100]
                                  w-40
                                  bg-white
                                  border
                                  border-gray-100
                                  rounded-xl
                                  shadow-xl
                                  py-1.5
                                "
                              >

                                {/* EDIT */}

                                <Link
                                  href={`/admin/users/edit/${user.id}`}
                                  onClick={() =>
                                    setOpenActionId(null)
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

                                  <FaEdit
                                    className="
                                      text-gray-400
                                      text-xs
                                    "
                                  />

                                  Edit

                                </Link>

                                {/* DIVIDER */}

                                <div
                                  className="
                                    my-1
                                    border-t
                                    border-gray-100
                                  "
                                />

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
                                  "
                                >

                                  <FaTrash
                                    className="
                                      text-gray-400
                                      text-xs
                                    "
                                  />

                                  Delete

                                </button>

                              </div>

                            )}

                          </div>

                        </div>

                      </td>

                    </tr>

                  ))

                ) : (

                  /* NO USERS */

                  <tr>

                    <td
                      colSpan={6}
                      className="
                        px-6
                        py-16
                        text-center
                      "
                    >

                      <div
                        className="
                          flex
                          flex-col
                          items-center
                        "
                      >

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

                          <FaUsers
                            className="
                              text-gray-300
                            "
                          />

                        </div>

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-gray-700
                          "
                        >
                          No users found
                        </p>

                        <p
                          className="
                            text-xs
                            text-gray-400
                            mt-1
                          "
                        >
                          Try changing your search or filter.
                        </p>

                        <button
                          type="button"
                          onClick={resetFilters}
                          className="
                            mt-4
                            text-xs
                            font-semibold
                            text-[#8B1E3F]
                            hover:underline
                          "
                        >
                          Clear filters
                        </button>

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

            <p
              className="
                text-sm
                text-gray-500
              "
            >

              Showing{" "}

              <span
                className="
                  font-semibold
                  text-gray-700
                "
              >
                {filteredUsers.length === 0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}

              to{" "}

              <span
                className="
                  font-semibold
                  text-gray-700
                "
              >
                {Math.min(
                  indexOfLastRow,
                  filteredUsers.length
                )}
              </span>{" "}

              of{" "}

              <span
                className="
                  font-semibold
                  text-gray-700
                "
              >
                {filteredUsers.length}
              </span>{" "}

              users

            </p>

            {/* PAGINATION BUTTONS */}

            <div
              className="
                flex
                items-center
                gap-2
                flex-wrap
                justify-center
              "
            >

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  );

                  setOpenActionId(null);
                }}
                disabled={
                  currentPage === 1 ||
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
                Previous
              </button>

              {/* PAGE NUMBERS */}

              {Array.from({
                length: Math.max(totalPages, 1),
              }).map((_, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() => {
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

              {/* NEXT */}

              <button
                type="button"
                onClick={() => {
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      Math.max(totalPages, 1)
                    )
                  );

                  setOpenActionId(null);
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

    </div>
  );
}