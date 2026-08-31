
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaPlus,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaUser,
  FaEye,
  FaEdit,
  FaTrash,
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
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

const ROWS_OPTIONS = [5, 10, 20, 50];

export default function MembershipPage() {
  const router = useRouter();

  const [members, setMembers] = useState<Member[]>([]);
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [deleteLoading, setDeleteLoading] =
    useState<number | null>(null);

  // =========================================================
  // PHOTO URL
  // =========================================================

  const getPhotoUrl = (photo: string | null) => {
    if (!photo) return "";

    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    return `${BACKEND_URL}${
      photo.startsWith("/") ? "" : "/"
    }${photo}`;
  };

  // =========================================================
  // LOGGED-IN USER
  // =========================================================

  const getLoggedInUser = () => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const userData = localStorage.getItem("user");

      if (!userData) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error(
        "Unable to parse logged-in user:",
        error
      );

      return null;
    }
  };

  // =========================================================
  // FETCH MEMBERS
  // =========================================================

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const loggedInUser = getLoggedInUser();

      console.log(
        "Logged-in User:",
        loggedInUser
      );

      const role = loggedInUser?.role || "";
      const sangham = loggedInUser?.sangham || "";

      const params = new URLSearchParams();

      if (role) {
        params.append("role", role);
      }

      if (sangham) {
        params.append("sangham", sangham);
      }

      const queryString = params.toString();

      const url =
        `${BACKEND_URL}/membership-register` +
        (queryString
          ? `?${queryString}`
          : "");

      console.log(
        "MEMBERS API URL:",
        url
      );

      const response = await fetch(url, {
        method: "GET",

        headers: {
          ...(token
            ? {
                Authorization:
                  `Bearer ${token}`,
              }
            : {}),
        },

        cache: "no-store",
      });

      console.log(
        "GET MEMBERS STATUS:",
        response.status
      );

      if (!response.ok) {
        let message =
          "Failed to load members";

        try {
          const result =
            await response.json();

          message =
            result?.message ||
            message;
        } catch {
          // ignore
        }

        throw new Error(message);
      }

      const result =
        await response.json();

      console.log(
        "Members API Response:",
        result
      );

      let memberList: Member[] = [];

      if (Array.isArray(result)) {
        memberList = result;
      } else if (
        Array.isArray(result?.data)
      ) {
        memberList = result.data;
      } else if (
        Array.isArray(result?.members)
      ) {
        memberList = result.members;
      }

      setMembers(memberList);
      setCurrentPage(1);
    } catch (error) {
      console.error(
        "Fetch members error:",
        error
      );

      setMembers([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load members."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchMembers();
  }, []);

  // =========================================================
  // CLOSE ACTION MENU WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenActionId(null);
    };

    if (openActionId !== null) {
      document.addEventListener(
        "click",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, [openActionId]);

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredMembers = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return members;
    }

    return members.filter((member) => {
      return (
        String(member.member_id || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.full_name || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.mobile || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.email || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.occupation || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.executive_body || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.designation || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.district || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.mandal || "")
          .toLowerCase()
          .includes(keyword) ||

        String(member.sangham || "")
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [members, search]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalItems =
    filteredMembers.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / rowsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    rowsPerPage;

  const endIndex = Math.min(
    startIndex + rowsPerPage,
    totalItems
  );

  const paginatedMembers =
    filteredMembers.slice(
      startIndex,
      endIndex
    );

  // =========================================================
  // SEARCH CHANGE
  // =========================================================

  const handleSearch = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  // =========================================================
  // ROWS CHANGE
  // =========================================================

  const handleRowsChange = (
    value: number
  ) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  // =========================================================
  // DELETE MEMBER
  // =========================================================

  const handleDelete = async (
    id: number,
    name: string
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete "${name}"?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);
      setError("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      const response =
        await fetch(
          `${BACKEND_URL}/membership-register/${id}`,
          {
            method: "DELETE",

            headers: {
              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },
          }
        );

      const result =
        await response
          .json()
          .catch(() => ({}));

      console.log(
        "DELETE STATUS:",
        response.status
      );

      console.log(
        "DELETE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
          "Failed to delete member"
        );
      }

      setMembers((prev) =>
        prev.filter(
          (member) =>
            member.id !== id
        )
      );

      setOpenActionId(null);

      alert(
        "Member deleted successfully."
      );
    } catch (error) {
      console.error(
        "Delete member error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete member."
      );
    } finally {
      setDeleteLoading(null);
    }
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (
    date: string | null | undefined
  ) => {
    if (!date) return "-";

    try {
      return new Date(
        date
      ).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    } catch {
      return date;
    }
  };

  // =========================================================
  // PAGE NUMBERS
  // =========================================================

  const getPageNumbers = () => {
    const pages: number[] = [];

    const maxVisible = 5;

    let start = Math.max(
      1,
      safeCurrentPage -
        Math.floor(
          maxVisible / 2
        )
    );

    let end = Math.min(
      totalPages,
      start + maxVisible - 1
    );

    if (
      end - start + 1 <
      maxVisible
    ) {
      start = Math.max(
        1,
        end - maxVisible + 1
      );
    }

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Loading members...
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Membership
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage all registered members.
            </p>
          </div>

          <Link
            href="/admin/membership/add"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-4
              py-2.5
              rounded-lg
              bg-[#8B1E3F]
              text-white
              text-sm
              font-semibold
              hover:bg-[#741934]
              transition
            "
          >
            <FaPlus className="text-xs" />
            Add Member
          </Link>

        </div>

        {/* ERROR */}

        {error && (
          <div
            className="
              mb-5
              rounded-lg
              border
              border-red-200
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* MAIN CARD */}

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-sm
            overflow-hidden
          "
        >

          {/* TOOLBAR */}

          <div
            className="
              px-5
              py-4
              border-b
              border-gray-200
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Members List
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                {totalItems} member
                {totalItems !== 1
                  ? "s"
                  : ""}
              </p>
            </div>

            {/* SEARCH */}

            <div className="relative w-full md:w-80">

              <FaSearch
                className="
                  absolute
                  left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  text-sm
                "
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  handleSearch(
                    e.target.value
                  )
                }
                placeholder="Search name, email or phone..."
                className="
                  w-full
                  h-10
                  pl-9
                  pr-4
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  text-gray-700
                  outline-none
                  focus:border-[#8B1E3F]
                  focus:ring-2
                  focus:ring-[#8B1E3F]/10
                "
              />

            </div>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1150px]">

              <thead>

                <tr
                  className="
                    bg-gray-50
                    border-b
                    border-gray-200
                  "
                >

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    #
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Member
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Contact
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Occupation
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Executive Body
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Designation
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Gender
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {paginatedMembers.length === 0 ? (

                  <tr>

                    <td
                      colSpan={9}
                      className="px-6 py-16 text-center"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div
                          className="
                            w-14
                            h-14
                            rounded-full
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            mb-3
                          "
                        >
                          <FaUser className="text-gray-400" />
                        </div>

                        <p className="text-sm font-semibold text-gray-700">
                          No members found
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                          Try searching with a
                          different name, email
                          or phone number.
                        </p>

                      </div>

                    </td>

                  </tr>

                ) : (

                  paginatedMembers.map(
                    (
                      member,
                      index
                    ) => {

                      const serial =
                        startIndex +
                        index +
                        1;

                      return (
                        <tr
                          key={member.id}
                          className="
                            hover:bg-gray-50/70
                            transition
                          "
                        >

                          {/* SERIAL */}

                          <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                            {serial}
                          </td>

                          {/* MEMBER */}

                          <td className="px-4 py-3">

                            <div className="flex items-center gap-3">

                              <div
                                className="
                                  w-11
                                  h-11
                                  rounded-full
                                  overflow-hidden
                                  border
                                  border-gray-200
                                  bg-gray-100
                                  flex
                                  items-center
                                  justify-center
                                  shrink-0
                                "
                              >

                                {member.photo ? (

                                  <img
                                    src={getPhotoUrl(
                                      member.photo
                                    )}
                                    alt={
                                      member.full_name
                                    }
                                    className="
                                      w-full
                                      h-full
                                      object-cover
                                    "
                                    onError={(e) => {
                                      e.currentTarget.style.display =
                                        "none";
                                    }}
                                  />

                                ) : (

                                  <FaUser className="text-gray-400" />

                                )}

                              </div>

                              <div className="min-w-0">

                                <p
                                  className="
                                    text-sm
                                    font-semibold
                                    text-gray-800
                                    truncate
                                    max-w-[190px]
                                  "
                                >
                                  {member.full_name || "-"}
                                </p>

                                <p
                                  className="
                                    text-xs
                                    text-[#8B1E3F]
                                    mt-0.5
                                  "
                                >
                                  {member.member_id || "-"}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* CONTACT */}

                          <td className="px-4 py-3">

                            <div>

                              <p className="text-sm text-gray-700 whitespace-nowrap">
                                {member.mobile || "-"}
                              </p>

                              <p
                                className="
                                  text-xs
                                  text-gray-400
                                  mt-0.5
                                  max-w-[210px]
                                  truncate
                                "
                              >
                                {member.email || "-"}
                              </p>

                            </div>

                          </td>

                          {/* OCCUPATION */}

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {member.occupation || "-"}
                          </td>

                          {/* EXECUTIVE BODY */}

                          <td className="px-4 py-3">

                            <span
                              className="
                                inline-flex
                                px-2.5
                                py-1
                                rounded-md
                                bg-gray-100
                                text-xs
                                font-medium
                                text-gray-600
                                whitespace-nowrap
                              "
                            >
                              {member.executive_body || "-"}
                            </span>

                          </td>

                          {/* DESIGNATION */}

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {member.designation || "-"}
                          </td>

                          {/* GENDER */}

                          <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                            {member.gender || "-"}
                          </td>

                          {/* STATUS */}

                          <td className="px-4 py-3">

                            <span
                              className={`
                                inline-flex
                                px-2.5
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                ${
                                  String(
                                    member.status || ""
                                  ).toLowerCase() ===
                                  "active"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                }
                              `}
                            >
                              {member.status || "-"}
                            </span>

                          </td>

                          {/* =================================================
                              ACTIONS - 3 DOT MENU
                          ================================================= */}

                          <td className="px-4 py-3 text-center">

                            <div
                              className="relative inline-block"
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                            >

                              {/* 3 DOT BUTTON */}

                              <button
                                type="button"
                                title="Actions"
                                aria-label={`Actions for ${member.full_name}`}
                                onClick={() =>
                                  setOpenActionId(
                                    openActionId ===
                                      member.id
                                      ? null
                                      : member.id
                                  )
                                }
                                className="
                                  w-9
                                  h-9
                                  flex
                                  items-center
                                  justify-center
                                  rounded-lg
                                  text-gray-500
                                  hover:bg-gray-100
                                  hover:text-[#8B1E3F]
                                  transition
                                "
                              >

                                <span className="text-xl font-bold leading-none">
                                  ⋮
                                </span>

                              </button>

                              {/* DROPDOWN */}

                              {openActionId ===
                                member.id && (

                                <div
                                  className="
                                    absolute
                                    right-0
                                    top-10
                                    z-[100]
                                    w-40
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-xl
                                    shadow-xl
                                    py-1
                                    text-left
                                  "
                                >
 

                                  {/* EDIT */}

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setOpenActionId(null);

                                      router.push(
                                        `/admin/membership/edit/${member.id}`
                                      );
                                    }}
                                    className="
                                      w-full
                                      flex
                                      items-center
                                      gap-3
                                      px-4
                                      py-2.5
                                      text-sm
                                      text-gray-700
                                      hover:bg-gray-50
                                      transition
                                    "
                                  >
                                    <FaEdit className="text-gray-400 text-sm" />
                                    <span>
                                      Edit
                                    </span>
                                  </button>

                                  {/* DELETE */}

                                  <button
                                    type="button"
                                    disabled={
                                      deleteLoading ===
                                      member.id
                                    }
                                    onClick={() => {
                                      setOpenActionId(null);

                                      handleDelete(
                                        member.id,
                                        member.full_name
                                      );
                                    }}
                                    className="
                                      w-full
                                      flex
                                      items-center
                                      gap-3
                                      px-4
                                      py-2.5
                                      text-sm
                                      text-red-600
                                      hover:bg-red-50
                                      transition
                                      disabled:opacity-50
                                      disabled:cursor-not-allowed
                                    "
                                  >

                                    <FaTrash className="text-red-500 text-sm" />

                                    <span>
                                      {deleteLoading ===
                                      member.id
                                        ? "Deleting..."
                                        : "Delete"}
                                    </span>

                                  </button>

                                </div>

                              )}

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                )}

              </tbody>

            </table>

          </div>

          {/* =================================================
              PAGINATION FOOTER
          ================================================= */}

          <div
            className="
              px-5
              py-4
              border-t
              border-gray-200
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-4
            "
          >

            {/* LEFT */}

            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-500
              "
            >

              <span>
                Rows per page
              </span>

              <select
                value={rowsPerPage}
                onChange={(e) =>
                  handleRowsChange(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="
                  h-8
                  px-2
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  text-xs
                  text-gray-600
                  outline-none
                  focus:border-[#8B1E3F]
                "
              >

                {ROWS_OPTIONS.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  )
                )}

              </select>

              <span>
                {totalItems === 0
                  ? "0"
                  : startIndex + 1}
                -
                {endIndex} of{" "}
                {totalItems}
              </span>

            </div>

            {/* RIGHT */}

            <div
              className="
                flex
                items-center
                gap-1
              "
            >

              {/* PREVIOUS */}

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
                className="
                  w-8
                  h-8
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  text-gray-500
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* PAGE NUMBERS */}

              {getPageNumbers().map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                    className={`
                      w-8
                      h-8
                      rounded-md
                      text-xs
                      font-medium
                      transition
                      ${
                        safeCurrentPage ===
                        page
                          ? "bg-[#8B1E3F] text-white"
                          : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }
                    `}
                  >
                    {page}
                  </button>
                )
              )}

              {/* NEXT */}

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
                className="
                  w-8
                  h-8
                  rounded-md
                  border
                  border-gray-200
                  bg-white
                  text-gray-500
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <FaChevronRight className="text-xs" />
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

