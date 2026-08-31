"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaHome,
  FaUsers,
  FaCrown,
  FaCog,
  FaHeart,
  FaBuilding,
  FaPhotoVideo,
  FaSignOutAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

/* =========================================================
   MENU + ROLE PERMISSIONS
========================================================= */

const menu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: FaHome,
    roles: [
      "super_admin",
      "state_admin",
      "district_admin",
      "mandal_admin",
      "sangam_admin",
    ],
  },

  

  {
    name: "Members",
    path: "/admin/membership",
    icon: FaCrown,
    roles: [
      "super_admin",
      "state_admin",
    ],
  },

  {
    name: "Matrimony",
    path: "/admin/matrimony",
    icon: FaHeart,
    roles: [
      "super_admin",
      "state_admin",
      "district_admin",
      "mandal_admin",
      "sangam_admin",
    ],
  },

  {
    name: "Executive Bodies",
    path: "/admin/executive-bodies",
    icon: FaBuilding,
    roles: [
      "super_admin",
      "state_admin",
      "district_admin",
      "mandal_admin",
      "sangam_admin",
    ],
  },

  {
    name: "Media",
    path: "/admin/media",
    icon: FaPhotoVideo,
    roles: [
      "super_admin",
      "state_admin",
      "district_admin",
      "mandal_admin",
      "sangam_admin",
    ],
  },

  {
    name: "Temples",
    path: "/admin/temples",
    icon: FaPhotoVideo,
    roles: [
      "super_admin",
      "state_admin",
    ],
  },

  {
    name: "Temples Events",
    path: "/admin/temple-events",
    icon: FaPhotoVideo,
    roles: [
      "super_admin",
      "state_admin",
    ],
  },

  {
    name: "Satrams",
    path: "/admin/satrams",
    icon: FaPhotoVideo,
    roles: [
      "super_admin",
      "state_admin",
    ],
  },

  {
    name: "Settings",
    path: "/admin/settings",
    icon: FaCog,
    roles: [
      "super_admin",
    ],
  },
];

/* =========================================================
   TYPES
========================================================= */

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function AdminSidebar({
  open,
  setOpen,
  collapsed,
  setCollapsed,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [loaded, setLoaded] = useState(false);

  /* =========================================================
     GET LOGGED-IN USER
  ========================================================= */

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      /* -----------------------------------------
         No token = logout
      ----------------------------------------- */

      if (!token) {
        router.replace("/admin/login");
        return;
      }

      /* -----------------------------------------
         Get user from localStorage
      ----------------------------------------- */

      if (storedAdmin) {
        const user = JSON.parse(storedAdmin);

        setRole(user?.role || "user");
        setUserName(user?.full_name || "");
      } else {
        router.replace("/admin/login");
        return;
      }

      setLoaded(true);
    } catch (error) {
      console.error("Failed to read logged-in user:", error);

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");

      router.replace("/admin/login");
    }
  }, [router]);

  /* =========================================================
     ROLE BASED MENU
  ========================================================= */

  const visibleMenu = menu.filter((item) =>
    item.roles.includes(role || "")
  );

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    localStorage.removeItem("token");

    setRole(null);
    setUserName("");
    setOpen(false);

    router.replace("/admin/login");
  };

  /* =========================================================
     TOGGLE COLLAPSE
  ========================================================= */

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (!loaded) {
    return null;
  }

  /* =========================================================
     SIDEBAR
  ========================================================= */

  return (
    <>
      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen

          bg-white
          border-r
          border-gray-100

          shadow-[4px_0_20px_rgba(0,0,0,0.03)]

          flex
          flex-col

          transform
          transition-all
          duration-300
          ease-in-out

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }

          ${
            collapsed
              ? "w-20"
              : "w-72"
          }
        `}
      >

        {/* ===================================================
            LOGO
        =================================================== */}

        <div
          className={`
            h-[76px]
            shrink-0

            flex
            items-center

            border-b
            border-gray-100

            transition-all
            duration-300

            ${
              collapsed
                ? "justify-center px-3"
                : "justify-between px-5"
            }
          `}
        >

          <Link
            href="/admin/dashboard"
            onClick={() => setOpen(false)}
            className={`
              flex
              items-center

              ${
                collapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            {/* LOGO ICON */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center

                rounded-xl

                bg-gray-50
                text-gray-900

                font-bold
                text-sm

                shadow-sm
              "
            >
              AV
            </div>

            {/* LOGO TEXT */}

            {!collapsed && (
              <div className="whitespace-nowrap">

                <h1
                  className="
                    text-lg
                    font-bold
                    leading-none
                    text-gray-900
                  "
                >
                  AV Matrimony
                </h1>

                <p
                  className="
                    mt-1
                    text-[10px]
                    uppercase
                    tracking-wide
                    text-gray-400
                  "
                >
                  Admin Panel
                </p>

              </div>
            )}

          </Link>

          {/* MOBILE CLOSE */}

          {!collapsed && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center

                rounded-lg

                text-gray-400

                transition

                hover:bg-gray-50
                hover:text-gray-700

                lg:hidden
              "
            >
              <FaTimes className="text-sm" />
            </button>
          )}

        </div>

        {/* ===================================================
            USER ROLE
        =================================================== */}

        {!collapsed && (
          <div className="px-4 pt-4">

            <div
              className="
                rounded-xl
                border
                border-gray-100
                bg-gray-50
                px-3
                py-3
              "
            >

              <p className="text-xs text-gray-400">
                Logged in as
              </p>

              <p className="mt-1 text-sm font-semibold text-gray-800 truncate">
                {userName || "Administrator"}
              </p>

              <span
                className="
                  inline-flex
                  mt-2
                  rounded-full
                  bg-[#f8eef2]
                  px-2.5
                  py-1
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide
                  text-[#8B1E3F]
                "
              >
                {role?.replace("_", " ")}
              </span>

            </div>

          </div>
        )}

        {/* ===================================================
            NAVIGATION
        =================================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto
            overflow-x-hidden
            px-3
            py-6
          "
        >

          <div className="space-y-1">

            {visibleMenu.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.path ||
                pathname.startsWith(`${item.path}/`);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setOpen(false)}
                  title={
                    collapsed
                      ? item.name
                      : undefined
                  }
                  className={`
                    relative
                    group

                    flex
                    items-center

                    rounded-xl

                    text-sm
                    font-medium

                    transition-all
                    duration-200

                    ${
                      collapsed
                        ? "h-12 justify-center px-2"
                        : "gap-3 px-3 py-3"
                    }

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

                        h-7
                        w-1

                        -translate-y-1/2

                        rounded-r-full

                        bg-[#8B1E3F]
                      "
                    />
                  )}

                  {/* ICON */}

                  <span
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0

                      items-center
                      justify-center

                      rounded-lg

                      transition-all

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

                  {/* NAME */}

                  {!collapsed && (
                    <span className="flex-1 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}

                  {/* ACTIVE DOT */}

                  {!collapsed && active && (
                    <span
                      className="
                        h-1.5
                        w-1.5
                        shrink-0

                        rounded-full

                        bg-[#8B1E3F]
                      "
                    />
                  )}

                </Link>
              );
            })}

            {/* NO ACCESS */}

            {visibleMenu.length === 0 && (
              <div
                className="
                  px-3
                  py-4
                  text-center
                  text-sm
                  text-gray-400
                "
              >
                No menu access
              </div>
            )}

          </div>

        </nav>

        {/* ===================================================
            BOTTOM
        =================================================== */}

        <div
          className="
            shrink-0

            border-t
            border-gray-100

            px-3
            py-4
          "
        >

          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            title={
              collapsed
                ? "Logout"
                : undefined
            }
            className={`
              group

              flex
              w-full
              items-center

              rounded-xl

              text-sm
              font-medium
              text-gray-600

              transition-all
              duration-200

              hover:bg-red-50
              hover:text-red-600

              ${
                collapsed
                  ? "h-12 justify-center px-2"
                  : "gap-3 px-3 py-3"
              }
            `}
          >

            <span
              className="
                flex
                h-9
                w-9
                shrink-0

                items-center
                justify-center

                rounded-lg

                bg-gray-50
                text-gray-400

                transition

                group-hover:bg-red-100
                group-hover:text-red-600
              "
            >
              <FaSignOutAlt className="text-[15px]" />
            </span>

            {!collapsed && (
              <span className="flex-1 text-left">
                Logout
              </span>
            )}

          </button>

          {/* FOOTER */}

          {!collapsed && (
            <div
              className="
                px-3
                py-2

                text-center
                text-[11px]
                text-gray-400
              "
            >
              AV Matrimony Admin
            </div>
          )}

        </div>

        {/* ===================================================
            COLLAPSE BUTTON
        =================================================== */}

        <button
          type="button"
          onClick={handleCollapse}
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          className="
            absolute
            -right-3
            top-[88px]
            z-50

            hidden
            h-7
            w-7

            items-center
            justify-center

            rounded-full

            border
            border-gray-200

            bg-white

            text-gray-500

            shadow-md

            transition-all

            hover:bg-gray-50
            hover:text-gray-900

            lg:flex
          "
        >

          {collapsed ? (
            <FaChevronRight className="text-[10px]" />
          ) : (
            <FaChevronLeft className="text-[10px]" />
          )}

        </button>

      </aside>
    </>
  );
}

