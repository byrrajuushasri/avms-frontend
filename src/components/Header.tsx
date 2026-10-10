
"use client";

import Link from "next/link";
import { useState } from "react";
import type { IconType } from "react-icons";

import {
  FaBars,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set()
  );

  /* =======================================================
     TOGGLE MOBILE MENU
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

  /* =========================================================
     DESKTOP DROPDOWN
  ========================================================= */

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
          ${
            level === 0
              ? "left-0 top-full"
              : "left-full top-0"
          }
          z-[100]
          min-w-[230px]
          overflow-visible
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

  /* =========================================================
     MOBILE CHILDREN
  ========================================================= */

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
        className={
          level === 0
            ? "bg-[#fffaf1]"
            : "ml-4 border-l-2 border-[#e8d6ad] bg-white"
        }
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
                    px-5
                    py-3
                    text-left
                    text-sm
                    font-medium
                    text-[#800018]
                    transition
                    hover:bg-[#fff1d6]
                    active:bg-[#fff1d6]
                  "
                >
                  <span className="flex items-center gap-3">
                    <FaChevronRight
                      className={`
                        text-[9px]
                        transition-transform
                        ${
                          isOpen
                            ? "rotate-90"
                            : ""
                        }
                      `}
                    />

                    {child.label}
                  </span>

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
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
                    px-7
                    py-3
                    text-sm
                    text-[#800018]
                    transition
                    hover:bg-[#fff1d6]
                    active:bg-[#fff1d6]
                  "
                >
                  <FaChevronRight className="text-[8px]" />

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

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <header
      className="
        relative
        z-50
        w-full
        overflow-visible
        font-serif
      "
    >
      {/* =====================================================
          TOP MAROON BORDER
      ====================================================== */}

      <div className="h-[4px] bg-[#800018]" />

      {/* =====================================================
          TRADITIONAL HEADER DECORATION
      ====================================================== */}

<div
  className="
    border-b
    border-[#f1eadf]
    bg-white
    px-3
    py-1
  "
>
  <div
    className="
      mx-auto
      grid
      max-w-[1500px]
      grid-cols-3
      items-center
      text-center
      text-[#800018]
    "
  >
    {/* LEFT - KALYANAMASTU */}

    <div
      className="
        justify-self-start
        whitespace-nowrap
        text-[9px]
        font-semibold
        sm:text-[11px]
      "
    >
      కళ్యాణమస్తు
    </div>

    {/* CENTER - HARI OM */}

    <div
      className="
        justify-self-center
        whitespace-nowrap
        text-[9px]
        font-semibold
        sm:text-[11px]
      "
    >
      హరి ఓం
    </div>

    {/* RIGHT - AVIGHNAMASTU */}

    <div
      className="
        justify-self-end
        whitespace-nowrap
        text-[9px]
        font-semibold
        sm:text-[11px]
      "
    >
      అవిఘ్నమస్తు
    </div>
  </div>
</div>


      {/* =====================================================
          LOGO + ADDRESS
      ====================================================== */}

      <div
        className="
          relative
          border-b
          border-gray-100
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-3
            py-2
            sm:px-6
            sm:py-4
          "
        >
          {/* =================================================
              DESKTOP
          ================================================= */}

          <div
            className="
              hidden
              grid-cols-[130px_1fr_130px]
              items-center
              gap-6
              md:grid
              lg:grid-cols-[150px_1fr_150px]
              lg:gap-10
            "
          >
            {/* LEFT LOGO */}

            <div className="flex justify-start">
              <img
                src="/images/vinayaka.jpg"
                alt="Aarya Vysya Mahasabha"
                className="
                  h-auto
                  w-[100px]
                  object-contain
                  lg:w-[125px]
                "
              />
            </div>

            {/* CENTER */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-8
                lg:gap-12
              "
            >
              {/* MAIN LOGO */}

              <Link
                href="/"
                className="
                  flex
                  shrink-0
                  items-center
                  justify-center
                "
              >
                <img
                  src="/images/logo.png"
                  alt="Aarya Vysya Matrimony"
                  className="
                    h-auto
                    w-[210px]
                    object-contain
                    lg:w-[270px]
                    xl:w-[310px]
                  "
                />
              </Link>

              {/* ADDRESS */}

              <div
                className="
                  max-w-[470px]
                  border-l
                  border-gray-200
                  pl-6
                  text-left
                  text-[10px]
                  leading-[1.7]
                  text-gray-600
                  lg:text-xs
                "
              >
                <p className="font-semibold text-[#800018]">
                  చంపాపేట్ ఆర్యవైశ్య సంఘం
                </p>

                <p className="font-medium text-gray-700">
                  పరిచయ వేదిక విభాగం
                </p>

                <p>
                  BVB Dhamam,
                  17-1-383/N/80/A/60,
                  Brindavan Colony
                </p>

                <p>
                  Vaishali Nagar Post,
                  Saroornagar Mandal,
                  Ranga Reddy Dist.
                </p>

                <p className="font-medium text-gray-700">
                  Aaryavysya Mahasabha Telangana
                  · Hyderabad – 500079
                </p>
              </div>
            </div>

            {/* RIGHT LOGO */}

            <div className="flex justify-end">
              <img
                src="/images/logo1.jpg"
                alt="Aarya Vysya Logo"
                className="
                  h-auto
                  w-[100px]
                  object-contain
                  lg:w-[85px]
                "
              />
            </div>
          </div>

          {/* =================================================
              MOBILE
          ================================================= */}

          <div className="md:hidden">
            {/* MOBILE LOGOS */}

            <div
              className="
                grid
                grid-cols-[52px_1fr_52px]
                items-center
                gap-1
                px-8
                xs:grid-cols-[60px_1fr_60px]
                xs:px-7
                sm:grid-cols-[72px_1fr_72px]
                sm:px-5
              "
            >
              {/* LEFT LOGO */}

              <div className="flex justify-start">
               <img
                  src="/images/vinayaka.jpg"
                  alt="Aarya Vysya Mahasabha"
                  className="
                    h-auto
                    w-[48px]
                    object-contain
                    xs:w-[54px]
                    sm:w-[66px]
                  "
                />
              </div>

              {/* CENTER LOGO */}

              <Link
                href="/"
                className="
                  flex
                  min-w-0
                  items-center
                  justify-center
                "
              >
                <img
                  src="/images/logo.png"
                  alt="Aarya Vysya Matrimony"
                  className="
                    h-auto
                    w-[145px]
                    max-w-full
                    object-contain
                    xs:w-[160px]
                    sm:w-[190px]
                  "
                />
              </Link>

              {/* RIGHT LOGO */}

              <div className="flex justify-end">
               <img
                  src="/images/logo1.jpg"
                  alt="Aarya Vysya Logo"
                  className="
                    h-auto
                    w-[48px]
                    object-contain
                    xs:w-[54px]
                    sm:w-[66px]
                  "
                />  
              </div>
            </div>

            {/* MOBILE ADDRESS */}

            <div
              className="
                mx-auto
                mt-2
                max-w-[360px]
                border-t
                border-gray-200
                px-2
                pt-2
                text-center
                text-[8px]
                leading-[1.45]
                text-gray-600
                xs:text-[8.5px]
                sm:max-w-[500px]
                sm:text-[10px]
              "
            >
              <p className="font-semibold text-[#800018]">
                చంపాపేట్ ఆర్యవైశ్య సంఘం

              </p>

              <p className="font-medium text-gray-700">
                పరిచయ వేదిక విభాగం
              </p>

              <p>
                BVB Dhamam, 17-1-383/N/80/A/60,
                Brindavan Colony
              </p>

              <p>
                Vaishali Nagar Post, Saroornagar Mandal,
                Ranga Reddy Dist.
              </p>

              <p className="font-medium text-gray-700">
                Aaryavysya Mahasabha Telangana · Hyderabad – 500079
              </p>
            </div>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}

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
            right-2
            top-10
            z-[120]
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            border
            border-[#eadbb9]
            bg-white
            text-lg
            text-[#800018]
            shadow-sm
            transition
            hover:bg-[#fff5e5]
            active:bg-[#fff5e5]
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

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}

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

            const hasChildren =
              !!item.children?.length;

            return (
              <div
                key={item.label}
                className="
                  group
                  relative
                  flex
                "
              >
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
                        transition-transform
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

                {/* DESKTOP DROPDOWN */}

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

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}

      {mobileOpen && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-[100]
            max-h-[calc(100vh-70px)]
            overflow-y-auto
            overscroll-contain
            border-t
            border-[#eadbb9]
            bg-white
            shadow-2xl
            md:hidden
          "
        >
          <div>
            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren =
                !!item.children?.length;

              const isOpen =
                expanded.has(item.label);

              return (
                <div
                  key={item.label}
                  className="
                    border-b
                    border-[#f0e8dc]
                  "
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggle(item.label)
                      }
                      className="
                        flex
                        min-h-[52px]
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
                        active:bg-[#fff1d6]
                      "
                    >
                      <span
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >
                        {Icon && (
                          <Icon className="w-[18px]" />
                        )}

                        {item.label}
                      </span>

                      <FaChevronDown
                        className={`
                          text-xs
                          transition-transform
                          ${
                            isOpen
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={closeMobile}
                      className="
                        flex
                        min-h-[52px]
                        items-center
                        gap-3
                        px-5
                        py-3
                        text-[15px]
                        font-semibold
                        text-[#800018]
                        transition
                        hover:bg-[#fff7e8]
                        active:bg-[#fff1d6]
                      "
                    >
                      {Icon && (
                        <Icon className="w-[18px]" />
                      )}

                      {item.label}
                    </Link>
                  )}

                  {/* MOBILE SUBMENU */}

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
              QUICK REGISTRATION
          ================================================== */}

          <div className="p-4">
            <Link
              href="/register"
              onClick={closeMobile}
              className="
                flex
                min-h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#800018]
                px-4
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition
                hover:bg-[#610013]
                active:bg-[#610013]
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

