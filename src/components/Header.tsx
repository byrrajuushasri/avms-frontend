
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";

import {
  FaBars,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaCrown,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";

type MenuItem = {
  label: string;
  href?: string;
  icon?: IconType;
  children?: MenuItem[];
};

/* =========================================================
   MENU ITEMS
========================================================= */

const menuItems: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },

  {
    label: "About Us",
    href: "/about",
    icon: FaInfoCircle,
  },

  {
    label: "Membership",
    icon: FaCrown,
    children: [
      {
        label: "Members Registration",
        href: "/membership",
      },
       
    ],
  },

  {
    label: "Matrimony",
    icon: FaUsers,
    children: [
      {
        label: "Matrimony Registration",
        href: "/register",
      },
    ],
  },

  {
    label: "Contact",
    href: "/contact",
    icon: FaEnvelope,
  },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [today, setToday] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  /* =======================================================
     TODAY'S DATE
  ======================================================= */

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  /* =======================================================
     MOBILE DROPDOWN TOGGLE
  ======================================================= */

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  const closeMobile = () => {
    setMobileOpen(false);
    setExpanded(new Set());
  };

  /* =======================================================
     DESKTOP DROPDOWN
  ======================================================= */

  function DesktopDropdown({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) {
    return (
      <div
        className={`
          absolute
          ${level === 0 ? "left-0 top-full" : "left-full top-0"}
          z-[100]
          min-w-[230px]
          overflow-hidden
          rounded-b-lg
          border
          border-[#eadbb9]
          bg-white
          py-1
          shadow-xl
        `}
      >
        {items.map((child) => {
          const hasChildren = !!child.children?.length;

          return (
            <div
              key={child.label}
              className="group/sub relative"
            >
              {hasChildren ? (
                <>
                  <div
                    className="
                      flex
                      cursor-pointer
                      items-center
                      justify-between
                      px-5
                      py-3
                      text-sm
                      text-gray-700
                      transition
                      hover:bg-[#fff8e9]
                      hover:text-[#800018]
                    "
                  >
                    <span>{child.label}</span>

                    <FaChevronRight className="text-[10px]" />
                  </div>

                  <div
                    className="
                      invisible
                      absolute
                      left-full
                      top-0
                      z-[110]
                      opacity-0
                      transition
                      group-hover/sub:visible
                      group-hover/sub:opacity-100
                      group-focus-within/sub:visible
                      group-focus-within/sub:opacity-100
                    "
                  >
                    <DesktopDropdown
                      items={child.children!}
                      level={level + 1}
                    />
                  </div>
                </>
              ) : (
                <Link
                  href={child.href || "/"}
                  className="
                    block
                    border-b
                    border-gray-50
                    px-5
                    py-3
                    text-sm
                    text-gray-700
                    transition
                    last:border-0
                    hover:bg-[#fff8e9]
                    hover:pl-6
                    hover:text-[#800018]
                  "
                >
                  {child.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* =======================================================
     MOBILE CHILDREN
  ======================================================= */

  function MobileChildren({
    items,
    parentKey,
    level = 0,
  }: {
    items: MenuItem[];
    parentKey: string;
    level?: number;
  }) {
    return (
      <div
        className={`
          ${
            level === 0
              ? "bg-[#fffaf1]"
              : "ml-4 border-l-2 border-[#e8d6ad] bg-white"
          }
        `}
      >
        {items.map((child) => {
          const key = `${parentKey}/${child.label}`;
          const hasChildren = !!child.children?.length;
          const isOpen = expanded.has(key);

          return (
            <div key={key}>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggle(key)}
                  className="
                    flex
                    min-h-12
                    w-full
                    items-center
                    justify-between
                    border-t
                    border-[#f0e6d3]
                    px-6
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-[#800018]
                    transition
                    hover:bg-[#fff1d6]
                  "
                >
                  <span className="flex items-center gap-3">
                    <FaChevronRight
                      className={`
                        text-[10px]
                        transition
                        ${isOpen ? "rotate-90" : ""}
                      `}
                    />

                    {child.label}
                  </span>

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>
              ) : (
                <Link
                  href={child.href || "/"}
                  onClick={closeMobile}
                  className="
                    flex
                    min-h-12
                    items-center
                    gap-3
                    border-t
                    border-[#f0e6d3]
                    px-8
                    py-3
                    text-sm
                    text-[#800018]
                    transition
                    hover:bg-[#fff1d6]
                  "
                >
                  <FaChevronRight className="text-[9px]" />

                  {child.label}
                </Link>
              )}

              {hasChildren && isOpen && (
                <MobileChildren
                  items={child.children!}
                  parentKey={key}
                  level={level + 1}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  /* =======================================================
     HEADER UI
  ======================================================= */

  return (
    <header className="relative z-50 w-full bg-white font-serif">

      {/* ===================================================
          TOP ACCENT
      =================================================== */}

      <div className="h-1 bg-[#800018]" />

      {/* ===================================================
          TOP INFORMATION BAR
      =================================================== */}

      <div className="border-b border-gray-200/70 bg-white/75 backdrop-blur-sm">
        <div
          className="
            mx-auto
            flex
            min-h-8
            max-w-[1500px]
            items-center
            justify-between
            gap-2
            px-4
            sm:px-6
          "
        >
          {/* DATE */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
              text-[10px]
              text-[#800018]
              sm:text-xs
            "
          >
            <FaCalendarAlt className="shrink-0" />

            <span className="truncate">
              {today || "Aarya Vysya Matrimony"}
            </span>
          </div>

          {/* EMAIL */}

          <a
            href="mailto:noreply@aaryavysyamahasabha.com"
            className="
              hidden
              items-center
              gap-2
              text-xs
              text-gray-600
              transition
              hover:text-[#800018]
              sm:flex
            "
          >
            <FaEnvelope />

            noreply@aaryavysyamahasabha.com
          </a>
        </div>
      </div>

      {/* ===================================================
          MAIN BRAND SECTION
      =================================================== */}

      <div
        className="
          border-b
          border-gray-100
          bg-white/85
          backdrop-blur-md
        "
      >
        <div
          className="
            relative
            mx-auto
            flex
            max-w-[1500px]
            flex-col
            items-center
            justify-center
            gap-2
            px-4
            py-3
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-6
            sm:px-6
          "
        >

          {/* =================================================
              LEFT - LOGO
          ================================================= */}

          <Link
            href="/"
            onClick={closeMobile}
            className="
              flex
              shrink-0
              items-center
              justify-center
            "
          >
            <img
              src="/images/logo.png"
              alt="Aarya Vysya Matrimony Logo"
              className="
                h-auto
                w-[180px]
                shrink-0
                object-contain
                sm:w-[210px]
                md:w-[240px]
                lg:w-[270px]
              "
            />
          </Link>

          {/* =================================================
              RIGHT - DESKTOP ADDRESS
          ================================================= */}

          <div
            className="
              hidden
              max-w-[520px]
              text-right
              text-[10px]
              leading-[1.55]
              text-gray-600
              sm:block
              md:text-xs
            "
          >
            <p className="mb-0.5 text-sm font-semibold text-[#800018] md:text-base">
              Champapet Aaryavysya Sangam
            </p>

            <p className="font-medium text-gray-700">
              Parichaya Vedica Vibhagam
            </p>

            <p>
              BVB Dhamam, 17-1-383/N/80/A/60, Brindavan Colony
            </p>

            <p>
              Vaishali Nagar Post, Saroornagar Mandal, Ranga Reddy Dist.
            </p>

            <p className="font-medium text-gray-700">
              Aaryavysya Mahasabha Telangana · Hyderabad – 500079
            </p>
          </div>

          {/* =================================================
              MOBILE ADDRESS
          ================================================= */}

          <div
            className="
              block
              w-full
              max-w-[420px]
              border-t
              border-gray-200
              pt-2
              text-center
              text-[9px]
              leading-[1.45]
              text-gray-600
              sm:hidden
            "
          >
            <p className="text-[12px] font-semibold text-[#800018]">
              Champapet Aaryavysya Sangam
            </p>

            <p className="font-medium text-gray-700">
              Parichaya Vedica Vibhagam
            </p>

            <p>
              BVB Dhamam, 17-1-383/N/80/A/60, Brindavan Colony
            </p>

            <p>
              Vaishali Nagar Post, Saroornagar Mandal, Ranga Reddy Dist.
            </p>

            <p className="font-medium text-gray-700">
              Aaryavysya Mahasabha Telangana · Hyderabad – 500079
            </p>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen((prev) => !prev);
              setExpanded(new Set());
            }}
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            className="
              absolute
              right-3
              top-3
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-md
              text-xl
              text-[#800018]
              transition
              hover:bg-[#fff5e5]
              md:hidden
            "
          >
            {mobileOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* ===================================================
          DESKTOP NAVIGATION
      =================================================== */}

      <nav
        className="
          hidden
          border-b
          border-[#a34b59]
          bg-[#800018]
          md:block
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[48px]
            max-w-[1500px]
            items-stretch
            justify-center
            px-3
          "
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;

            return (
              <div
                key={item.label}
                className="group relative flex"
              >
                {/* MENU */}

                {hasChildren ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="
                      flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      border-r
                      border-white/15
                      px-5
                      text-[13px]
                      font-medium
                      text-white
                      transition
                      hover:bg-[#650014]
                      focus:bg-[#650014]
                      xl:px-7
                      xl:text-sm
                    "
                  >
                    {Icon && (
                      <Icon className="text-sm" />
                    )}

                    {item.label}

                    <FaChevronDown
                      className="
                        text-[9px]
                        transition
                        group-hover:rotate-180
                        group-focus-within:rotate-180
                      "
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="
                      flex
                      min-h-[48px]
                      items-center
                      justify-center
                      gap-2
                      border-r
                      border-white/15
                      px-5
                      text-[13px]
                      font-medium
                      text-white
                      transition
                      hover:bg-[#650014]
                      xl:px-7
                      xl:text-sm
                    "
                  >
                    {Icon && (
                      <Icon className="text-sm" />
                    )}

                    {item.label}
                  </Link>
                )}

                {/* DROPDOWN */}

                {hasChildren && (
                  <div
                    className="
                      invisible
                      absolute
                      left-0
                      top-full
                      z-[100]
                      opacity-0
                      transition
                      duration-150
                      group-hover:visible
                      group-hover:opacity-100
                      group-focus-within:visible
                      group-focus-within:opacity-100
                    "
                  >
                    <DesktopDropdown
                      items={item.children!}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ===================================================
          MOBILE NAVIGATION
      =================================================== */}

      {mobileOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-[100]
            max-h-[calc(100vh-80px)]
            overflow-y-auto
            border-t
            border-[#eadbb9]
            bg-white
            shadow-xl
            md:hidden
          "
        >

          {/* MOBILE MENU ITEMS */}

          <div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = !!item.children?.length;
              const isOpen = expanded.has(item.label);

              return (
                <div
                  key={item.label}
                  className="border-b border-[#f0e8dc]"
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => toggle(item.label)}
                      className="
                        flex
                        min-h-[54px]
                        w-full
                        items-center
                        justify-between
                        px-5
                        py-3
                        text-left
                        text-[15px]
                        font-semibold
                        text-[#800018]
                        transition
                        hover:bg-[#fff7e8]
                      "
                    >
                      <span className="flex items-center gap-3">
                        {Icon && (
                          <Icon className="w-5" />
                        )}

                        {item.label}
                      </span>

                      <FaChevronDown
                        className={`
                          text-xs
                          transition
                          ${isOpen ? "rotate-180" : ""}
                        `}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={closeMobile}
                      className="
                        flex
                        min-h-[54px]
                        items-center
                        gap-3
                        px-5
                        py-3
                        text-[15px]
                        font-semibold
                        text-[#800018]
                        transition
                        hover:bg-[#fff7e8]
                      "
                    >
                      {Icon && (
                        <Icon className="w-5" />
                      )}

                      {item.label}
                    </Link>
                  )}

                  {hasChildren && isOpen && (
                    <MobileChildren
                      items={item.children!}
                      parentKey={item.label}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* =================================================
              MOBILE REGISTRATION BUTTON
          ================================================== */}

          <div className="p-4">
            <Link
              href="/register"
              onClick={closeMobile}
              className="
                flex
                min-h-12
                items-center
                justify-center
                gap-2
                rounded-md
                bg-[#800018]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#610013]
              "
            >
              <FaUserPlus />

              Matrimony Registration
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

