"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaFilter,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type ExecutiveMember = {
  id: number;
  full_name: string;
  mobile: string;
  email: string;
  district: string;
  mandal: string;
  sangham: string;
  executive_body: string;
  designation: string;
  status: "Active" | "Inactive";
};

/* =========================================================
   STATIC TEST DATA
========================================================= */

const initialMembers: ExecutiveMember[] = [
  {
    id: 1,
    full_name: "Ramesh Kumar",
    mobile: "9876543210",
    email: "ramesh@example.com",
    district: "Hyderabad",
    mandal: "Amberpet",
    sangham: "Hyderabad Arya Vysya Sangham",
    executive_body: "State Body",
    designation: "President",
    status: "Active",
  },
  {
    id: 2,
    full_name: "Suresh Babu",
    mobile: "9876543211",
    email: "suresh@example.com",
    district: "Rangareddy",
    mandal: "Rajendranagar",
    sangham: "Rangareddy Arya Vysya Sangham",
    executive_body: "District Body",
    designation: "General Secretary",
    status: "Active",
  },
  {
    id: 3,
    full_name: "Prakash Rao",
    mobile: "9876543212",
    email: "prakash@example.com",
    district: "Warangal",
    mandal: "Hanamkonda",
    sangham: "Warangal Arya Vysya Sangham",
    executive_body: "Mandal Body",
    designation: "Vice President",
    status: "Active",
  },
  {
    id: 4,
    full_name: "Venkat Rao",
    mobile: "9876543213",
    email: "venkat@example.com",
    district: "Karimnagar",
    mandal: "Karimnagar",
    sangham: "Karimnagar Arya Vysya Sangham",
    executive_body: "Sangham Body",
    designation: "Joint Secretary",
    status: "Inactive",
  },
  {
    id: 5,
    full_name: "Anil Kumar",
    mobile: "9876543214",
    email: "anil@example.com",
    district: "Nizamabad",
    mandal: "Nizamabad",
    sangham: "Nizamabad Arya Vysya Sangham",
    executive_body: "District Body",
    designation: "Representative",
    status: "Active",
  },
];

/* =========================================================
   EXECUTIVE BODY OPTIONS
========================================================= */

const bodyOptions = [
  "All Bodies",
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

/* =========================================================
   DESIGNATION OPTIONS
========================================================= */

const designationOptions = [
  "All Designations",
  "General Secretary",
  "President",
  "Vice President",
  "Joint Secretary",
  "Representative",
];

/* =========================================================
   PAGE
========================================================= */

export default function ExecutiveMembersPage() {
  const [members, setMembers] =
    useState<ExecutiveMember[]>(initialMembers);

  const [search, setSearch] = useState("");

  const [bodyFilter, setBodyFilter] =
    useState("All Bodies");

  const [designationFilter, setDesignationFilter] =
    useState("All Designations");

  const [statusFilter, setStatusFilter] =
    useState("All Status");

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  /* =======================================================
     FILTER MEMBERS
  ======================================================= */

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        member.full_name
          .toLowerCase()
          .includes(searchValue) ||
        member.mobile
          .toLowerCase()
          .includes(searchValue) ||
        member.email
          .toLowerCase()
          .includes(searchValue) ||
        member.district
          .toLowerCase()
          .includes(searchValue) ||
        member.mandal
          .toLowerCase()
          .includes(searchValue) ||
        member.sangham
          .toLowerCase()
          .includes(searchValue);

      const matchesBody =
        bodyFilter === "All Bodies" ||
        member.executive_body === bodyFilter;

      const matchesDesignation =
        designationFilter ===
          "All Designations" ||
        member.designation ===
          designationFilter;

      const matchesStatus =
        statusFilter === "All Status" ||
        member.status === statusFilter;

      return (
        matchesSearch &&
        matchesBody &&
        matchesDesignation &&
        matchesStatus
      );
    });
  }, [
    members,
    search,
    bodyFilter,
    designationFilter,
    statusFilter,
  ]);

  /* =======================================================
     DELETE MEMBER
  ======================================================= */

  const handleDelete = () => {
    if (deleteId === null) return;

    setMembers((prev) =>
      prev.filter(
        (member) => member.id !== deleteId
      )
    );

    setDeleteId(null);
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");
    setBodyFilter("All Bodies");
    setDesignationFilter(
      "All Designations"
    );
    setStatusFilter("All Status");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
      >
        <div>
          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-[#f8eef2]
                text-[#8B1E3F]
                flex
                items-center
                justify-center
              "
            >
              <FaUserTie />
            </div>

            <div>
              <h1
                className="
                  text-2xl
                  font-bold
                  text-gray-900
                "
              >
                Executive Members
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage executive body members
              </p>
            </div>
          </div>
        </div>

        {/* ADD BUTTON */}

        <Link
          href="/admin/executive-members/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-5
            h-11
            rounded-xl
            bg-[#8B1E3F]
            text-white
            text-sm
            font-semibold
            hover:bg-[#741832]
            transition
            shadow-sm
          "
        >
          <FaPlus />
          Add Executive Member
        </Link>
      </div>

      {/* =================================================
          STAT CARDS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-4
          mb-6
        "
      >
        {/* TOTAL */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Total Members
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-2">
            {members.length}
          </h2>
        </div>

        {/* ACTIVE */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Active Members
          </p>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {
              members.filter(
                (m) => m.status === "Active"
              ).length
            }
          </h2>
        </div>

        {/* STATE */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            State Body
          </p>

          <h2 className="text-2xl font-bold text-[#8B1E3F] mt-2">
            {
              members.filter(
                (m) =>
                  m.executive_body ===
                  "State Body"
              ).length
            }
          </h2>
        </div>

        {/* DISTRICT */}

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            District Body
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {
              members.filter(
                (m) =>
                  m.executive_body ===
                  "District Body"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* =================================================
          FILTER AREA
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-4
          md:p-5
          mb-6
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            mb-4
          "
        >
          <FaFilter className="text-[#8B1E3F]" />

          <h2 className="font-semibold text-gray-800">
            Search & Filters
          </h2>
        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-3
          "
        >
          {/* SEARCH */}

          <div className="relative">
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
                setSearch(e.target.value)
              }
              placeholder="
                Search name, mobile, email, district...
              "
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
                focus:ring-2
                focus:ring-[#8B1E3F]/20
                focus:border-[#8B1E3F]
                text-sm
              "
            />
          </div>

          {/* BODY */}

          <select
            value={bodyFilter}
            onChange={(e) =>
              setBodyFilter(e.target.value)
            }
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              outline-none
              focus:ring-2
              focus:ring-[#8B1E3F]/20
            "
          >
            {bodyOptions.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          {/* DESIGNATION */}

          <select
            value={designationFilter}
            onChange={(e) =>
              setDesignationFilter(
                e.target.value
              )
            }
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              outline-none
              focus:ring-2
              focus:ring-[#8B1E3F]/20
            "
          >
            {designationOptions.map(
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

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              outline-none
              focus:ring-2
              focus:ring-[#8B1E3F]/20
            "
          >
            <option value="All Status">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* FILTER FOOTER */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            mt-4
            pt-4
            border-t
            border-gray-100
          "
        >
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredMembers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-800">
              {members.length}
            </span>{" "}
            members
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              h-9
              px-4
              rounded-lg
              border
              border-gray-200
              text-sm
              text-gray-600
              hover:bg-gray-50
              transition
            "
          >
            <FaTimes className="text-xs" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* =================================================
          DESKTOP TABLE
      ================================================= */}

      <div
        className="
          hidden
          lg:block
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
        "
      >
        <div className="overflow-x-auto">
          <table className="w-full">

            {/* TABLE HEADER */}

            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Member
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Location
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Executive Body
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Designation
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>

              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody className="divide-y divide-gray-100">

              {filteredMembers.map(
                (member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-gray-50/70 transition"
                  >

                    {/* MEMBER */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            bg-[#f8eef2]
                            text-[#8B1E3F]
                            flex
                            items-center
                            justify-center
                            font-semibold
                            text-sm
                            shrink-0
                          "
                        >
                          {member.full_name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.full_name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {member.mobile}
                          </p>

                          <p className="text-xs text-gray-400">
                            {member.email}
                          </p>
                        </div>

                      </div>
                    </td>

                    {/* LOCATION */}

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-gray-800">
                        {member.district}
                      </p>

                      <p className="text-xs text-gray-500">
                        {member.mandal}
                      </p>

                      <p className="text-xs text-gray-400 max-w-[180px] truncate">
                        {member.sangham}
                      </p>
                    </td>

                    {/* BODY */}

                    <td className="px-5 py-4">

                      <span
                        className="
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          bg-[#f8eef2]
                          text-[#8B1E3F]
                          text-xs
                          font-semibold
                        "
                      >
                        {member.executive_body}
                      </span>

                    </td>

                    {/* DESIGNATION */}

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {member.designation}
                      </span>
                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-flex
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold

                          ${
                            member.status ===
                            "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          }
                        `}
                      >
                        {member.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">

                        <Link
                          href={`/admin/executive-members/${member.id}`}
                          title="View"
                          className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            bg-gray-50
                            text-gray-500
                            hover:bg-blue-50
                            hover:text-blue-600
                            transition
                          "
                        >
                          <FaEye className="text-sm" />
                        </Link>

                        <Link
                          href={`/admin/executive-members/${member.id}/edit`}
                          title="Edit"
                          className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            bg-gray-50
                            text-gray-500
                            hover:bg-yellow-50
                            hover:text-yellow-600
                            transition
                          "
                        >
                          <FaEdit className="text-sm" />
                        </Link>

                        <button
                          type="button"
                          title="Delete"
                          onClick={() =>
                            setDeleteId(
                              member.id
                            )
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            bg-gray-50
                            text-gray-500
                            hover:bg-red-50
                            hover:text-red-600
                            transition
                          "
                        >
                          <FaTrash className="text-sm" />
                        </button>

                      </div>
                    </td>

                  </tr>
                )
              )}

            </tbody>
          </table>

          {/* EMPTY */}

          {filteredMembers.length === 0 && (
            <div className="py-16 text-center">

              <div
                className="
                  w-14
                  h-14
                  rounded-full
                  bg-gray-100
                  text-gray-400
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-3
                "
              >
                <FaUserTie />
              </div>

              <h3 className="font-semibold text-gray-800">
                No executive members found
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Try changing your search or filters.
              </p>

            </div>
          )}
        </div>
      </div>

      {/* =================================================
          MOBILE CARDS
      ================================================= */}

      <div className="lg:hidden space-y-4">

        {filteredMembers.map(
          (member) => (
            <div
              key={member.id}
              className="
                bg-white
                rounded-2xl
                border
                border-gray-100
                shadow-sm
                p-4
              "
            >

              {/* MEMBER HEADER */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-[#f8eef2]
                      text-[#8B1E3F]
                      flex
                      items-center
                      justify-center
                      font-semibold
                      shrink-0
                    "
                  >
                    {member.full_name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {member.full_name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {member.mobile}
                    </p>
                  </div>

                </div>

                <span
                  className={`
                    px-2.5
                    py-1
                    rounded-full
                    text-[11px]
                    font-semibold
                    shrink-0

                    ${
                      member.status ===
                      "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  {member.status}
                </span>

              </div>

              {/* DETAILS */}

              <div
                className="
                  grid
                  grid-cols-2
                  gap-4
                  mt-4
                  pt-4
                  border-t
                  border-gray-100
                "
              >

                <div>
                  <p className="text-[11px] text-gray-400 uppercase">
                    Executive Body
                  </p>

                  <p className="text-sm font-semibold text-[#8B1E3F] mt-1">
                    {member.executive_body}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase">
                    Designation
                  </p>

                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {member.designation}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase">
                    District
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {member.district}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase">
                    Mandal
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {member.mandal}
                  </p>
                </div>

              </div>

              {/* ACTIONS */}

              <div
                className="
                  flex
                  items-center
                  gap-2
                  mt-4
                  pt-4
                  border-t
                  border-gray-100
                "
              >

                <Link
                  href={`/admin/executive-members/${member.id}`}
                  className="
                    flex-1
                    h-10
                    rounded-lg
                    bg-gray-50
                    text-gray-600
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    hover:bg-blue-50
                    hover:text-blue-600
                  "
                >
                  <FaEye />
                  View
                </Link>

                <Link
                  href={`/admin/executive-members/${member.id}/edit`}
                  className="
                    flex-1
                    h-10
                    rounded-lg
                    bg-gray-50
                    text-gray-600
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-medium
                    hover:bg-yellow-50
                    hover:text-yellow-600
                  "
                >
                  <FaEdit />
                  Edit
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(member.id)
                  }
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-50
                    text-gray-500
                    flex
                    items-center
                    justify-center
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <FaTrash />
                </button>

              </div>

            </div>
          )
        )}

        {/* MOBILE EMPTY */}

        {filteredMembers.length === 0 && (
          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              p-10
              text-center
            "
          >
            <FaUserTie className="mx-auto text-3xl text-gray-300" />

            <h3 className="font-semibold text-gray-800 mt-3">
              No executive members found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>
          </div>
        )}

      </div>

      {/* =================================================
          DELETE CONFIRMATION MODAL
      ================================================= */}

      {deleteId !== null && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-2xl
              shadow-2xl
              p-6
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-red-50
                  text-red-600
                  flex
                  items-center
                  justify-center
                "
              >
                <FaTrash />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Delete Executive Member?
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="
                  flex-1
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  text-gray-700
                  font-semibold
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-red-600
                  text-white
                  font-semibold
                  hover:bg-red-700
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