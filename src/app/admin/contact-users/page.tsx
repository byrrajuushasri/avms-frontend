"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  FaSearch,
  FaEye,
  FaTrash,
  FaReply,
  FaEdit,
  FaEllipsisV,
  FaEnvelopeOpenText,
  FaTimes,
  FaFilter,
  FaChevronDown,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

/* =========================================================
   CONTACT MESSAGES
========================================================= */

const messagesData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    mobile: "9876543210",
    subject: "Profile enquiry",
    message: "I need more details about this profile.",
    date: "05 Aug 2026",
    status: "New",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@gmail.com",
    mobile: "9123456780",
    subject: "Membership issue",
    message: "Payment completed but membership not activated.",
    date: "04 Aug 2026",
    status: "Replied",
  },
  {
    id: 3,
    name: "Suresh Rao",
    email: "suresh@gmail.com",
    mobile: "9988776655",
    subject: "Account support",
    message: "Unable to login into my account.",
    date: "03 Aug 2026",
    status: "Closed",
  },
  {
    id: 4,
    name: "Anitha Reddy",
    email: "anitha@gmail.com",
    mobile: "9001234567",
    subject: "Profile verification",
    message: "I would like to know the verification process.",
    date: "02 Aug 2026",
    status: "New",
  },
  {
    id: 5,
    name: "Vijay Kumar",
    email: "vijay@gmail.com",
    mobile: "9555678901",
    subject: "Payment enquiry",
    message: "Please help me with my membership payment.",
    date: "01 Aug 2026",
    status: "Replied",
  },
  {
    id: 6,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    mobile: "9887766554",
    subject: "Profile enquiry",
    message: "I want to know more information about the profile.",
    date: "31 Jul 2026",
    status: "New",
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    email: "rajesh@gmail.com",
    mobile: "9776655443",
    subject: "Membership enquiry",
    message: "Please explain the premium membership benefits.",
    date: "30 Jul 2026",
    status: "Replied",
  },
  {
    id: 8,
    name: "Swathi Reddy",
    email: "swathi@gmail.com",
    mobile: "9665544332",
    subject: "Account issue",
    message: "I am unable to update my profile information.",
    date: "29 Jul 2026",
    status: "New",
  },
  {
    id: 9,
    name: "Mahesh Rao",
    email: "mahesh@gmail.com",
    mobile: "9554433221",
    subject: "Payment issue",
    message: "My payment was deducted but the plan is not active.",
    date: "28 Jul 2026",
    status: "Closed",
  },
  {
    id: 10,
    name: "Deepika Devi",
    email: "deepika@gmail.com",
    mobile: "9443322110",
    subject: "Verification enquiry",
    message: "How long does profile verification take?",
    date: "27 Jul 2026",
    status: "New",
  },
  {
    id: 11,
    name: "Srinivas Kumar",
    email: "srinivas@gmail.com",
    mobile: "9332211009",
    subject: "Login support",
    message: "I forgot my password and cannot login.",
    date: "26 Jul 2026",
    status: "Replied",
  },
  {
    id: 12,
    name: "Kavya Reddy",
    email: "kavya@gmail.com",
    mobile: "9221100998",
    subject: "Profile update",
    message: "Please help me update my profile details.",
    date: "25 Jul 2026",
    status: "New",
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ContactUsersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* =========================================================
     ACTION DROPDOWN
  ========================================================= */

  const [openActionId, setOpenActionId] = useState<number | null>(null);

  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  /* =========================================================
     DELETE STATE
  ========================================================= */

  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* =========================================================
     OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        actionMenuRef.current &&
        !actionMenuRef.current.contains(event.target as Node)
      ) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredMessages = messagesData.filter((item) => {
    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue) ||
      item.mobile.includes(searchValue) ||
      item.subject.toLowerCase().includes(searchValue) ||
      item.message.toLowerCase().includes(searchValue);

    const matchesStatus =
      status === "All" || item.status === status;

    return matchesSearch && matchesStatus;
  });

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredMessages.length / rowsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const indexOfLastMessage =
    safeCurrentPage * rowsPerPage;

  const indexOfFirstMessage =
    indexOfLastMessage - rowsPerPage;

  const currentMessages = filteredMessages.slice(
    indexOfFirstMessage,
    indexOfLastMessage
  );

  const startItem =
    filteredMessages.length === 0
      ? 0
      : indexOfFirstMessage + 1;

  const endItem = Math.min(
    indexOfLastMessage,
    filteredMessages.length
  );

  /* =========================================================
     RESET
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setCurrentPage(1);
    setOpenActionId(null);
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
    setOpenActionId(null);
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
    setOpenActionId(null);
  };

  /* =========================================================
     ROWS PER PAGE
  ========================================================= */

  const handleRowsChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
    setOpenActionId(null);
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = () => {
    if (deleteId === null) return;

    console.log("Delete contact user:", deleteId);

    setDeleteId(null);
    setOpenActionId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="mb-7">

          <h2 className="text-2xl sm:text-2xl font-semibold text-gray-900">
            Contact Users
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage and respond to contact messages from users.
          </p>

        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* ===================================================
              SEARCH + FILTER
          =================================================== */}

          <div className="px-5 sm:px-6 py-5 border-b border-gray-100">

            <div className="flex flex-col xl:flex-row xl:items-center gap-4">

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
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  placeholder="Search by name, email, mobile or subject..."
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
                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100
                    transition-all
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => handleSearch("")}
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

              {/* FILTER */}

              <div className="flex flex-col sm:flex-row gap-3">

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
                    value={status}
                    onChange={(e) =>
                      handleStatusChange(e.target.value)
                    }
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
                    "
                  >
                    <option value="All">
                      All Status
                    </option>

                    <option value="New">
                      New
                    </option>

                    <option value="Replied">
                      Replied
                    </option>

                    <option value="Closed">
                      Closed
                    </option>

                  </select>

                  <FaChevronDown
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      text-[10px]
                      pointer-events-none
                    "
                  />

                </div>

                {(search || status !== "All") && (

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
                    "
                  >
                    Reset
                  </button>

                )}

              </div>

            </div>

            {/* RESULT COUNT */}

            <div className="flex items-center justify-between mt-4">

              <p className="text-xs text-gray-400">

                Showing{" "}

                <span className="font-semibold text-gray-600">
                  {filteredMessages.length}
                </span>{" "}

                messages

              </p>

              {(search || status !== "All") && (

                <span className="text-xs text-[#8B1E3F] font-medium">
                  Filters applied
                </span>

              )}

            </div>

          </div>

          {/* ===================================================
              TABLE
          =================================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              {/* HEADER */}

              <thead>

                <tr className="
                  bg-gray-50/80
                  text-xs
                  uppercase
                  tracking-wider
                  text-gray-400
                ">

                  <th className="px-6 py-4 text-left font-semibold">
                    User
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Mobile
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Message
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>

                </tr>

              </thead>

              {/* BODY */}

              <tbody className="divide-y divide-gray-100">

                {currentMessages.length > 0 ? (

                  currentMessages.map((item) => (

                    <tr
                      key={item.id}
                      className="
                        hover:bg-gray-50/70
                        transition-colors
                      "
                    >

                      {/* USER */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          

                          <div className="min-w-0">

                            <p className="
                              font-semibold
                              text-gray-800
                              truncate
                              max-w-[180px]
                            ">
                              {item.name}
                            </p>

                            <p className="
                              text-xs
                              text-gray-400
                              mt-0.5
                              truncate
                              max-w-[180px]
                            ">
                              {item.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* MOBILE */}

                      <td className="px-6 py-4">

                        <span className="
                          text-sm
                          text-gray-600
                          whitespace-nowrap
                        ">
                          {item.mobile}
                        </span>

                      </td>

                      {/* SUBJECT */}

                      <td className="px-6 py-4">

                        <span className="
                          text-sm
                          font-medium
                          text-gray-700
                          whitespace-nowrap
                        ">
                          {item.subject}
                        </span>

                      </td>

                      {/* MESSAGE */}

                      <td className="px-6 py-4">

                        <p className="
                          text-sm
                          text-gray-500
                          max-w-[260px]
                          truncate
                        ">
                          {item.message}
                        </p>

                      </td>

                      {/* DATE */}

                      <td className="px-6 py-4">

                        <span className="
                          text-sm
                          text-gray-600
                          whitespace-nowrap
                        ">
                          {item.date}
                        </span>

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
                              item.status === "New"
                                ? "bg-gray-100 text-gray-700"
                                : item.status === "Replied"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-gray-50 text-gray-500 border border-gray-200"
                            }
                          `}
                        >

                          {item.status === "New" ? (
                            <FaClock className="text-gray-400" />
                          ) : (
                            <FaCheckCircle className="text-gray-400" />
                          )}

                          {item.status}

                        </span>

                      </td>

                      {/* =================================================
                          ACTIONS - MOBILE CLICK FIX
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end">

                          <div
                            ref={
                              openActionId === item.id
                                ? actionMenuRef
                                : null
                            }
                            className="relative"
                          >

                            {/* ACTION BUTTON */}

                            <button
                              type="button"
                              title="More actions"
                              aria-label={`Actions for ${item.name}`}
                              aria-expanded={
                                openActionId === item.id
                              }
                              onClick={() => {
                                setOpenActionId(
                                  openActionId === item.id
                                    ? null
                                    : item.id
                                );
                              }}
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

                            {/* DROPDOWN */}

                            {openActionId === item.id && (

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
 

                                {/* REPLY */}

                                <Link
                                  href={`/admin/contact-users/reply/${item.id}`}
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

                                  <FaReply className="
                                    text-gray-400
                                    text-xs
                                  " />

                                  Reply

                                </Link>
 
 

                                {/* DELETE */}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeleteId(item.id);
                                    setOpenActionId(null);
                                  }}
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
                                    active:bg-red-50
                                    transition
                                  "
                                >

                                  <FaTrash className="
                                    text-gray-400
                                    text-xs
                                  " />

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

                  /* =================================================
                     NO RESULTS
                  ================================================= */

                  <tr>

                    <td
                      colSpan={7}
                      className="px-6 py-16 text-center"
                    >

                      <div className="
                        flex
                        flex-col
                        items-center
                      ">

                        <div className="
                          w-12
                          h-12
                          rounded-xl
                          bg-gray-50
                          flex
                          items-center
                          justify-center
                          mb-3
                        ">

                          <FaEnvelopeOpenText
                            className="text-gray-300"
                          />

                        </div>

                        <p className="
                          text-sm
                          font-semibold
                          text-gray-700
                        ">
                          No messages found
                        </p>

                        <p className="
                          text-xs
                          text-gray-400
                          mt-1
                        ">
                          Try changing your search or filter.
                        </p>

                        {(search || status !== "All") && (

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

                        )}

                      </div>

                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* ===================================================
              PAGINATION
          =================================================== */}

          <div className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-4
            px-6
            py-4
            border-t
            border-gray-100
          ">

            {/* INFO */}

            <p className="text-sm text-gray-500">

              Showing{" "}

              <span className="font-semibold text-gray-700">
                {startItem}
              </span>{" "}

              to{" "}

              <span className="font-semibold text-gray-700">
                {endItem}
              </span>{" "}

              of{" "}

              <span className="font-semibold text-gray-700">
                {filteredMessages.length}
              </span>{" "}

              messages

            </p>

            {/* CONTROLS */}

            <div className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-2
            ">

              {/* ROWS */}

              <select
                value={rowsPerPage}
                onChange={(e) =>
                  handleRowsChange(
                    Number(e.target.value)
                  )
                }
                className="
                  h-9
                  px-3
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  text-xs
                  text-gray-600
                  outline-none
                  cursor-pointer
                "
              >
                <option value={5}>
                  5 / page
                </option>

                <option value={10}>
                  10 / page
                </option>

                <option value={20}>
                  20 / page
                </option>
              </select>

              {/* PREVIOUS */}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                disabled={safeCurrentPage === 1}
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-600
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
                  type="button"
                  key={index}
                  onClick={() =>
                    setCurrentPage(index + 1)
                  }
                  className={`
                    w-9
                    h-9
                    rounded-lg
                    text-sm
                    font-semibold
                    transition

                    ${
                      safeCurrentPage === index + 1
                        ? "bg-gray-100 text-black shadow-sm"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-100"
                    }
                  `}
                >
                  {index + 1}
                </button>

              ))}

              {/* NEXT */}

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(
                      page + 1,
                      Math.max(totalPages, 1)
                    )
                  )
                }
                disabled={
                  totalPages === 0 ||
                  safeCurrentPage === totalPages
                }
                className="
                  px-4
                  py-2
                  rounded-lg
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-600
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
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {deleteId !== null && (

        <div className="
          fixed
          inset-0
          z-[200]
          flex
          items-center
          justify-center
          bg-black/30
          px-4
        ">

          <div className="
            w-full
            max-w-md
            bg-white
            rounded-2xl
            shadow-2xl
            p-6
          ">

            <div className="
              w-12
              h-12
              rounded-xl
              bg-red-50
              flex
              items-center
              justify-center
              mb-4
            ">

              <FaTrash className="text-red-500" />

            </div>

            <h3 className="
              text-lg
              font-semibold
              text-gray-800
            ">
              Delete Message?
            </h3>

            <p className="
              text-sm
              text-gray-500
              mt-2
            ">
              Are you sure you want to delete this contact
              message? This action cannot be undone.
            </p>

            <div className="
              flex
              justify-end
              gap-3
              mt-6
            ">

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  border
                  border-gray-200
                  text-sm
                  font-medium
                  text-gray-600
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-red-500
                  text-white
                  text-sm
                  font-semibold
                  hover:bg-red-600
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}