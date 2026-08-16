
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FaHome,
  FaUsers,
  FaCrown,
  FaCog,
  FaEnvelope,
  FaHeart,
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
        <div className="h-[76px] px-6 flex items-center justify-between border-b border-gray-100">

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >

            {/* Logo Icon */}
            <div
              className="
                w-10
                h-10
                rounded-xl
               bg-gray-50/80
                text-black
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
              <h1 className="text-lg font-bold text-gray-900 leading-none">
                AV Matrimony
              </h1>

              <p className="text-[10px] text-gray-400 mt-1 tracking-wide uppercase">
                Admin Panel
              </p>
            </div>

          </Link>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
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
            <FaTimes />
          </button>

        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">

          {/* Section Label */}
          

          <div className="space-y-1">

            {menu.map((item) => {

              const Icon = item.icon;

              /*
                Supports nested routes as well.
                Example:
                /admin/membership/add
                will keep Membership active.
              */
              const active =
                pathname === item.path ||
                pathname.startsWith(`${item.path}/`);

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
                          hover:bg-gray-50/80
                          hover:text-gray-900
                        `
                    }
                  `}
                >

                  {/* Active Indicator */}
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
                        bg-gray-50/80
                      "
                    />
                  )}

                  {/* Icon */}
                  <span
                    className={`
                      w-9
                      h-9
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      transition-all

                      ${
                        active
                          ? "bg-white text-[#8B1E3F] shadow-sm"
                          : "text-gray-400 group-hover:text-gray-700"
                      }
                    `}
                  >
                    <Icon className="text-[15px]" />
                  </span>

                  {/* Menu Name */}
                  <span className="flex-1">
                    {item.name}
                  </span>

                  {/* Active Dot */}
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E3F]" />
                  )}

                </Link>
              );
            })}

          </div>

        </nav>

      

      </aside>
    </>
  );
}