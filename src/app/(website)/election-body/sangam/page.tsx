"use client";

import Link from "next/link";
import { FaUserPlus, FaUsers } from "react-icons/fa";

export default function DistrictBodyPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Intro */}
        <div className="mb-10 border-b border-gray-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
            Executive Body
          </p>

          <p className="mt-3 max-w-3xl text-gray-600 leading-7">
            The Sangam Body represents the organization at the district
            level. Members are responsible for coordinating activities,
            supporting mandal and local bodies, and contributing to the
            development of the community.
          </p>
           <p className="mt-3 max-w-3xl text-gray-600 leading-7">
            The Sangam Body represents the organization at the district
            level. Members are responsible for coordinating activities,
            supporting mandal and local bodies, and contributing to the
            development of the community.
          </p>
        </div>

        {/* Options */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* New Members */}
          <Link
            href=""
            className="group flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-400 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200">
              <FaUserPlus className="text-xl text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                New Members
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Add and register new members to the Sangam Body.
              </p>
            </div>
          </Link>

          {/* Existing Members */}
          <Link
            href=" "
            className="group flex items-center gap-5 rounded-xl border border-gray-200 bg-white p-6 transition hover:border-gray-400 hover:shadow-sm"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200">
              <FaUsers className="text-xl text-gray-700" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Existing Members
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                View and manage members currently associated with the Sangam
                Body.
              </p>
            </div>
          </Link>

        </div>
      </div>
    </main>
  );
}