
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaRupeeSign,
  FaUserClock,
  FaArrowUp,
  FaArrowRight,
  FaEllipsisV,
  FaSearch,
  FaBell,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Profiles",
    value: "12,540",
    change: "+12.5%",
    description: "vs last month",
    icon: FaUsers,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Verified Profiles",
    value: "9,850",
    change: "+8.2%",
    description: "vs last month",
    icon: FaUserCheck,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Premium Members",
    value: "2,350",
    change: "+15.8%",
    description: "vs last month",
    icon: FaCrown,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    title: "Total Revenue",
    value: "₹8,45,000",
    change: "+18.4%",
    description: "vs last month",
    icon: FaRupeeSign,
    iconBg: "bg-rose-100",
    iconColor: "text-[#8B1E3F]",
  },
];

const users = [
  {
    id: 1,
    name: "Priya Reddy",
    gender: "Female",
    location: "Hyderabad",
    email: "priya@gmail.com",
    joined: "07 Aug 2026",
    status: "Verified",
    membership: "Gold",
  },
  {
    id: 2,
    name: "Kiran Kumar",
    gender: "Male",
    location: "Bangalore",
    email: "kiran@gmail.com",
    joined: "07 Aug 2026",
    status: "Pending",
    membership: "Free",
  },
  {
    id: 3,
    name: "Anusha Rao",
    gender: "Female",
    location: "Vijayawada",
    email: "anusha@gmail.com",
    joined: "06 Aug 2026",
    status: "Verified",
    membership: "Premium",
  },
  {
    id: 4,
    name: "Rahul Varma",
    gender: "Male",
    location: "Hyderabad",
    email: "rahul@gmail.com",
    joined: "06 Aug 2026",
    status: "Verified",
    membership: "Silver",
  },
  {
    id: 5,
    name: "Keerthi Devi",
    gender: "Female",
    location: "Chennai",
    email: "keerthi@gmail.com",
    joined: "05 Aug 2026",
    status: "Pending",
    membership: "Gold",
  },
];

const growthData = [
  { month: "Jan", value: 45 },
  { month: "Feb", value: 60 },
  { month: "Mar", value: 72 },
  { month: "Apr", value: 82 },
  { month: "May", value: 94 },
  { month: "Jun", value: 110 },
];

export default function AdminDashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.location.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const rowsPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentUsers = filteredUsers.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

  return (
    <div className="min-h-screen bg-gray-50/80">



      {/* MAIN CONTENT */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">

        {/* WELCOME */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              happening with your matrimonial platform today.
            </p>
          </div>

          
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>

                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
                      {item.value}
                    </h3>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                        <FaArrowUp />
                        {item.change}
                      </span>

                      <span className="text-xs text-gray-400">
                        {item.description}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center text-lg`}
                  >
                    <Icon />
                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* RECENT REGISTRATIONS */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="p-5 sm:p-6 border-b border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Recent Registrations
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Latest members joined the matrimonial portal
                </p>
              </div>

              <Link
                href="/admin/users"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-700 transition"
              >
                View All
                <FaArrowRight className="text-xs" />
              </Link>

            </div>

          </div>

          {/* MOBILE SEARCH */}
          <div className="md:hidden p-4 border-b border-gray-100">

            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <FaSearch className="text-gray-400 text-sm" />

              <input
                type="text"
                placeholder="Search members..."
                className="bg-transparent outline-none text-sm ml-3 w-full"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px]">

              <thead>
                <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-400">
                  <th className="px-6 py-4 text-left font-semibold">
                    Member
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Member ID
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Location
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Membership
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {currentUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/70 transition"
                  >

                    {/* MEMBER */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}&background=fce7f3&color=8B1E3F&bold=true`}
                          className="w-11 h-11 rounded-xl"
                          alt={user.name}
                        />

                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-gray-400 mt-0.5">
                            {user.email}
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* MEMBER ID */}
                    <td className="px-6 py-4">

                      <span className="text-sm font-semibold text-[#8B1E3F]">
                        AVM{1000 + user.id}
                      </span>

                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-4">

                      <p className="text-sm text-gray-600">
                        {user.location}
                      </p>

                      <p className="text-xs text-gray-400">
                        {user.gender}
                      </p>

                    </td>

                    {/* MEMBERSHIP */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                          user.membership === "Premium"
                            ? "bg-violet-100 text-violet-700"
                            : user.membership === "Gold"
                            ? "bg-amber-100 text-amber-700"
                            : user.membership === "Silver"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {user.membership}
                      </span>

                    </td>

                    {/* JOINED */}
                    <td className="px-6 py-4">

                      <p className="text-sm text-gray-600">
                        {user.joined}
                      </p>

                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          user.status === "Verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {user.status === "Verified" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaClock />
                        )}

                        {user.status}
                      </span>

                    </td>

                    {/* ACTIONS */}
              
{/* ACTIONS */}
<td className="px-6 py-4">
  <div className="flex justify-end">
    <div className="relative group">

      {/* Menu Button */}
      <button
        type="button"
        title="More actions"
        className="
          w-9 h-9
          flex items-center justify-center
          rounded-lg
          border border-gray-200
          bg-white
          text-gray-500
          hover:text-gray-800
          hover:bg-gray-50
          hover:border-gray-300
          transition-all
        "
      >
        <FaEllipsisV className="text-sm" />
      </button>

      {/* Dropdown */}
      <div
        className="
          absolute
          right-0
          top-10
          z-30
          w-36
          bg-white
          border border-gray-100
          rounded-xl
          shadow-xl
          py-1.5
          opacity-0
          invisible
          translate-y-1
          group-hover:opacity-100
          group-hover:visible
          group-hover:translate-y-0
          transition-all
          duration-150
        "
      >

        {/* View */}
        <button
          type="button"
          className="
            w-full
            flex items-center gap-3
            px-4 py-2.5
            text-sm
            text-gray-600
            hover:bg-gray-50
            hover:text-gray-900
            transition
          "
        >
          <FaEye className="text-gray-400 text-xs" />
          View
        </button>

        {/* Edit */}
        <button
          type="button"
          className="
            w-full
            flex items-center gap-3
            px-4 py-2.5
            text-sm
            text-gray-600
            hover:bg-gray-50
            hover:text-gray-900
            transition
          "
        >
          <FaEdit className="text-gray-400 text-xs" />
          Edit
        </button>

        {/* Divider */}
        <div className="my-1 border-t border-gray-100" />

        {/* Delete */}
        <button
          type="button"
          className="
            w-full
            flex items-center gap-3
            px-4 py-2.5
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

    </div>
  </div>
</td>



                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* PAGINATION */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredUsers.length === 0
                  ? 0
                  : indexOfFirstRow + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(indexOfLastRow, filteredUsers.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredUsers.length}
              </span>{" "}
              members
            </p>

            <div className="flex items-center gap-2">

              <button
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Previous
              </button>

              {Array.from(
                { length: Math.max(totalPages, 1) }
              ).map((_, index) => (

                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                    currentPage === index + 1
                      ? "bg-gray-50/80 text-black shadow-md"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>

              ))}

              <button
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, Math.max(totalPages, 1))
                  )
                }
                disabled={
                  currentPage === totalPages || totalPages === 0
                }
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
