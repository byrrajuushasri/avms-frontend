"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


import {
  FaHome,
  FaUsers,
  FaCrown,
  FaCog,
  FaEnvelope,
  FaHeart,
  FaBuilding,
  FaPhotoVideo,
  FaUserTie,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: FaHome,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: FaUsers,
  },
  {
    name: "Membership",
    path: "/admin/membership",
    icon: FaCrown,
  },
  {
    name: "Contact Users",
    path: "/admin/contact-users",
    icon: FaEnvelope,
  },
  {
    name: "Matrimony",
    path: "/admin/matrimony",
    icon: FaHeart,
  },
  {
    name: "Executive Bodies",
    path: "/admin/executive-bodies",
    icon: FaBuilding,
  },
  {
    name: "Executive Members",
    path: "/admin/executive-members",
    icon: FaUserTie,
  },
  {
    name: "Media",
    path: "/admin/media",
    icon: FaPhotoVideo,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: FaCog,
  },
];

export default function AdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    // Remove login information if stored
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    // Close mobile sidebar
    setOpen(false);

    // Go to login page
    router.push("/admin/login");
  };

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/20
            backdrop-blur-[2px]
            z-40
            lg:hidden
          "
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-gray-100
          shadow-[4px_0_20px_rgba(0,0,0,0.03)]
          flex
          flex-col

          transform
          transition-transform
          duration-300
          ease-in-out

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        {/* ================= LOGO ================= */}

        <div
          className="
            h-[76px]
            px-6
            flex
            items-center
            justify-between
            border-b
            border-gray-100
            shrink-0
          "
        >
          {/* LOGO */}

          <Link
            href="/admin/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            {/* Logo Icon */}

            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-gray-50
                text-gray-900
                flex
                items-center
                justify-center
                font-bold
                text-sm
                shadow-sm
              "
            >
              AV
            </div>

            {/* Logo Text */}

            <div>
              <h1
                className="
                  text-lg
                  font-bold
                  text-gray-900
                  leading-none
                "
              >
                AV Matrimony
              </h1>

              <p
                className="
                  text-[10px]
                  text-gray-400
                  mt-1
                  tracking-wide
                  uppercase
                "
              >
                Admin Panel
              </p>
            </div>
          </Link>

          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="
              lg:hidden
              w-9
              h-9
              rounded-lg
              flex
              items-center
              justify-center
              text-gray-400
              hover:text-gray-700
              hover:bg-gray-50
              transition
            "
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}

        <nav
          className="
            flex-1
            px-4
            py-6
            overflow-y-auto
            scrollbar-thin
          "
        >
          <div className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.path ||
                pathname.startsWith(
                  `${item.path}/`
                );

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  className={`
                    relative
                    group
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    rounded-xl
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          bg-[#f8eef2]
                          text-[#8B1E3F]
                          font-semibold
                        `
                        : `
                          text-gray-600
                          hover:bg-gray-50
                          hover:text-gray-900
                        `
                    }
                  `}
                >
                  {/* ACTIVE INDICATOR */}

                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        -translate-y-1/2
                        w-1
                        h-7
                        rounded-r-full
                        bg-[#8B1E3F]
                      "
                    />
                  )}

                  {/* ICON */}

                  <span
                    className={`
                      w-9
                      h-9
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      transition-all
                      shrink-0

                      ${
                        active
                          ? `
                            bg-white
                            text-[#8B1E3F]
                            shadow-sm
                          `
                          : `
                            text-gray-400
                            group-hover:text-gray-700
                          `
                      }
                    `}
                  >
                    <Icon className="text-[15px]" />
                  </span>

                  {/* MENU NAME */}

                  <span className="flex-1">
                    {item.name}
                  </span>

                  {/* ACTIVE DOT */}

                  {active && (
                    <span
                      className="
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-[#8B1E3F]
                        shrink-0
                      "
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ================= BOTTOM AREA ================= */}

        <div
          className="
            px-4
            py-4
            border-t
            border-gray-100
            shrink-0
            space-y-2
          "
        >
          {/* ================= LOGOUT BUTTON ================= */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-3
              rounded-xl
              text-sm
              font-medium
              text-gray-600
              hover:bg-red-50
              hover:text-red-600
              transition-all
              duration-200
              group
            "
          >
            {/* Logout Icon */}

            <span
              className="
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                bg-gray-50
                text-gray-400
                group-hover:bg-red-100
                group-hover:text-red-600
                transition
              "
            >
              <FaSignOutAlt className="text-[15px]" />
            </span>

            <span className="flex-1 text-left">
              Logout
            </span>
          </button>

          {/* ================= FOOTER ================= */}

          <div
            className="
              px-3
              py-2
              text-[11px]
              text-gray-400
              text-center
            "
          >
            AV Matrimony Admin
          </div>
        </div>
      </aside>
    </>
  );
}