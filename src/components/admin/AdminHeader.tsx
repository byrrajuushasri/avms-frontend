"use client";

import {
  FaBars,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

interface AdminHeaderProps {
  setOpen: (open: boolean) => void;
}

export default function AdminHeader({
  setOpen,
}: AdminHeaderProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-20
        items-center
        justify-between
        border-b
        border-pink-100
        bg-white
        px-4
        shadow-sm
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-xl
            text-[#8B1E3F]
            transition
            hover:bg-[#f8eef2]
            lg:hidden
          "
        >
          <FaBars />
        </button>

        {/* WELCOME */}

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-gray-900
              sm:text-lg
            "
          >
            Welcome Admin 👋
          </h2>

          <p
            className="
              mt-0.5
              hidden
              text-xs
              text-gray-400
              sm:block
            "
          >
            Manage your AV Matrimony dashboard
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div className="flex items-center gap-3 sm:gap-6">
        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <button
          type="button"
          aria-label="Notifications"
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-gray-500
            transition
            hover:bg-gray-50
            hover:text-gray-800
          "
        >
          <FaBell className="text-lg sm:text-xl" />

          {/* NOTIFICATION DOT */}

          <span
            className="
              absolute
              right-2.5
              top-2
              h-2
              w-2
              rounded-full
              bg-[#8B1E3F]
              ring-2
              ring-white
            "
          />
        </button>

        {/* =================================================
            ADMIN PROFILE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* PROFILE ICON */}

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#f8eef2]
              text-[#8B1E3F]
              sm:h-11
              sm:w-11
            "
          >
            <FaUserCircle className="text-2xl sm:text-3xl" />
          </div>

          {/* PROFILE TEXT */}

          <div className="hidden md:block">
            <p
              className="
                text-sm
                font-semibold
                text-gray-800
              "
            >
              Admin
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-gray-400
              "
            >
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}