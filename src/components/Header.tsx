"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FaBars,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronRight,
  FaEnvelope,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignInAlt,
  FaTimes,
  FaUserPlus,
  FaUsers,
  FaCrown,
  FaHandsHelping,
  FaUniversity,
  FaUtensils,
  FaImages,
  FaUserTie,
} from "react-icons/fa";

/* =========================================================
   MENU TYPE
   Supports unlimited nested menu levels
========================================================= */

type MenuItem = {
  label: string;
  href?: string;
  icon?: any;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  /* HOME */
  {
    label: "Home",
    href: "/",
    icon: FaHome,
  },

  /* ABOUT */
  {
    label: "About Us",
    href: "/about",
    icon: FaInfoCircle,
  },

  /* MEMBERSHIP */
  {
    label: "Membership",
    icon: FaCrown,
    children: [
      {
        label: "State Membership",
        children: [
          {
            label: "New Members",
            href: "/membership",
          },
          {
            label: "Existing Members",
            href: "/membership/details",
          },
        ],
      },
      {
        label: "Sangam Membership",
        children: [
          {
            label: "New Members",
            href: "/membership",
          },
          {
            label: "Existing Members",
            href: "/membership/details",
          },
        ],
      },
    ],
  },

  /* EXECUTIVE BODY */
  {
    label: "Executive Bodies",
    icon: FaUserTie,
    children: [
      {
        label: "State Body",
        href: "/election-body/state",
      },
      {
        label: "District Body",
        href: "/election-body/district",
      },
      {
        label: "Mandal Body",
        href: "/election-body/mandal",
      },
      {
        label: "Sangam Body",
        href: "/election-body/sangam",
      },
    ],
  },

  /* MATRIMONY */
  {
    label: "Matrimony",
    icon: FaUsers,
    children: [
      {
        label: "Matrimony",
        href: "/matrimony",
      },
      {
        label: "Search Profiles",
        href: "/search",
      },
      {
        label: "Success Stories",
        href: "/success-stories",
      },
    ],
  },

  /* WELFARE */
  {
    label: "Welfare",
    icon: FaHandsHelping,
    children: [
      {
        label: "Health",
        href: "/welfare/health",
      },
      {
        label: "Education",
        href: "/welfare/education",
      },
      {
        label: "Employment",
        href: "/welfare/employment",
      },
    ],
  },

  /* TEMPLES */
  {
    label: "Temples",
    href: "/temples",
    icon: FaUniversity,
    children: [
      {
        label: "Temples",
        href: "/temples",
      },
      {
        label: "Temple Events",
        href: "/temples/events",
      },
    ],
  },

  /* SATRAMS */
  {
    label: "Satrams",
    href: "/satrams",
    icon: FaUtensils,
    children: [
      {
        label: "All Satrams",
        href: "/satrams/statesatrams",
      },
    ],
  },

  /* MEDIA */
  {
    label: "Media",
    href: "/media",
    icon: FaImages,
    children: [
      {
        label: "Photos",
        href: "/media/photos",
      },
      {
        label: "Videos",
        href: "/media/videos",
      },
      {
        label: "News",
        href: "/media/news",
      },
    ],
  },

  /* CONTACT */
  {
    label: "Contact",
    href: "/contact",
    icon: FaEnvelope,
    children: [
      {
        label: "State",
        href: "/contact/state-contacts",
      },
      {
        label: "District",
        href: "/contact/dist-contacts",
      },
      {
        label: "Mandal",
        href: "/contact/mandal-contacts",
      },
      {
        label: "Sangam",
        href: "/contact/sangam-contacts",
      },
    ],
  },
];

/* =========================================================
   STYLES
========================================================= */

const desktopLinkClass = `
  flex min-h-[50px] w-full
  items-center justify-center gap-1.5
  border-r border-[#a52a3d]
  px-2
  font-serif text-[14px] font-medium
  text-white
  transition
  hover:bg-[#650014]
`;

const mobileLinkClass = `
  flex items-center gap-3
  px-5 py-3.5
  font-serif text-[16px]
  font-medium text-[#800018]
  transition hover:bg-[#fff5df]
`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  /* Mobile */
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  /* Desktop */
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);

  useEffect(() => {
    const date = new Date();

    setToday(
      date.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  /* =========================================================
     MOBILE TOGGLE
  ========================================================= */

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((current) =>
      current === label ? null : label
    );
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileDropdown(null);
  };

  /* =========================================================
     DESKTOP RECURSIVE MENU
  ========================================================= */

  const DesktopChildren = ({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) => {
    return (
      <div
        className={`
          ${
            level === 0
              ? "absolute left-0 top-full z-[100] min-w-[230px] rounded-b-lg border border-[#ead9b5] bg-white shadow-xl"
              : "ml-3 border-l border-gray-200"
          }
        `}
      >
        {items.map((child) => {
          const hasChildren =
            child.children && child.children.length > 0;

          if (hasChildren) {
            return (
              <div key={child.label} className="group relative">
                <div
                  className="
                    flex items-center justify-between
                    px-4 py-2.5
                    text-sm font-semibold
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  <span>{child.label}</span>

                  <FaChevronRight className="text-[9px]" />
                </div>

                <div className="hidden group-hover:block">
                  <DesktopChildren
                    items={child.children!}
                    level={level + 1}
                  />
                </div>
              </div>
            );
          }

          return (
            <Link
              key={child.label}
              href={child.href || "#"}
              className="
                block px-4 py-2.5
                text-sm text-gray-700
                transition
                hover:bg-gray-100
                hover:text-[#800018]
              "
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    );
  };

  /* =========================================================
     MOBILE RECURSIVE MENU
  ========================================================= */

  const MobileChildren = ({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) => {
    return (
      <div
        className={
          level === 0
            ? "bg-[#fffaf0]"
            : "ml-5 border-l border-[#eadfca]"
        }
      >
        {items.map((child) => {
          const hasChildren =
            child.children && child.children.length > 0;

          const key = `${level}-${child.label}`;

          if (hasChildren) {
            const isOpen = mobileDropdown === key;

            return (
              <div key={key}>
                <button
                  type="button"
                  onClick={() => toggleMobileDropdown(key)}
                  className="
                    flex w-full items-center
                    justify-between
                    border-t border-[#eadfca]
                    px-8 py-3
                    text-left
                    font-serif text-[14px]
                    font-medium
                    text-[#690015]
                    hover:bg-[#f8edcf]
                  "
                >
                  <span className="flex items-center gap-3">
                    <FaChevronRight
                      className={`
                        text-[9px]
                        transition-transform
                        ${isOpen ? "rotate-90" : ""}
                      `}
                    />

                    {child.label}
                  </span>

                  <FaChevronDown
                    className={`
                      text-[10px]
                      transition-transform
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {isOpen && (
                  <MobileChildren
                    items={child.children!}
                    level={level + 1}
                  />
                )}
              </div>
            );
          }

          return (
            <Link
              key={key}
              href={child.href || "#"}
              onClick={closeMobileMenu}
              className="
                flex items-center gap-3
                border-t border-[#eadfca]
                px-8 py-3
                font-serif text-[14px]
                text-[#690015]
                transition
                hover:bg-[#f8edcf]
              "
            >
              <FaChevronRight className="text-[9px]" />

              <span>{child.label}</span>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <header className="w-full bg-white">

      {/* =====================================================
          TOP RED LINE
      ====================================================== */}

      <div className="h-[3px] bg-[#800018]" />

      {/* =====================================================
          TOP INFORMATION
      ====================================================== */}

      <div className="border-b border-gray-200 bg-[#fafafa]">
        <div
          className="
            mx-auto flex h-[32px]
            max-w-[1900px]
            items-center justify-between
            px-4
          "
        >

          {/* DATE */}

          <div className="flex items-center gap-2 text-[#800018]">
            <FaCalendarAlt className="text-[13px]" />

            <span className="font-serif text-[13px]">
              {today || "Monday, 17 August 2026"}
            </span>
          </div>

          {/* PHONE + EMAIL */}

          <div className="hidden items-center gap-4 text-[#800018] lg:flex">

            <div className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-[12px]" />

              <span className="font-serif text-[13px]">
                +91 9246119408
              </span>
            </div>

            <span className="text-gray-400">|</span>

            <div className="flex items-center gap-1.5">
              <FaEnvelope className="text-[12px]" />

              <span className="font-serif text-[13px]">
                info@aryavysyamatrimony.com
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* =====================================================
          LOGO SECTION
      ====================================================== */}

      <div className="bg-white">
        <div
          className="
            mx-auto flex h-[100px]
            max-w-[1900px]
            items-center justify-between
            px-5 md:px-7
          "
        >

          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
          >

            <div className="flex shrink-0 items-center gap-2">

              <img
                src="/images/logo.png"
                alt="Telangana Arya Vysya Mahasabha"
                className="h-[95px] w-[95px] object-contain"
              />

            </div>

            {/* TITLE */}

            <div className="min-w-0">

              <h1
                className="
                  font-serif
                  text-[18px]
                  font-bold
                  leading-tight
                  text-[#9b1746]
                  whitespace-nowrap
                  sm:text-[21px]
                  lg:text-[25px]
                "
              >
                Telangana State Arya Vysya Mahasabha
              </h1>

              <h1
                className="
                  font-serif
                  text-[10px]
                  font-bold
                  leading-tight
                  text-[#9b1746]
                  whitespace-nowrap
                  sm:text-[15px]
                  lg:text-[20px]
                "
              >
                తెలంగాణ రాష్ట్ర ఆర్యవైశ్య మహాసభ
              </h1>

              <p
                className="
                  mt-1
                  text-[20px]
                  text-[#475569]
                  whitespace-nowrap
                  sm:text-[21px]
                  lg:text-[19px]
                "
              >
                Chintal Basti Registrar no:363/2015
              </p>

            </div>

            {/* RIGHT LOGO */}

            <img
              src="/images/logo2.jpg"
              alt="Vasavi Ammavaru"
              className="h-[95px] w-[95px] object-contain"
            />

          </Link>

          {/* =====================================================
              LOGIN REGISTER
          ====================================================== */}

          <div className="hidden items-center gap-4 md:flex">

            <Link
              href="/login"
              className="
                flex h-[40px] w-[125px]
                items-center justify-center gap-2
                rounded-lg
                border-2 border-[#800018]
                font-serif text-[16px]
                text-[#800018]
                transition
                hover:bg-[#800018]
                hover:text-white
              "
            >
              <FaSignInAlt />
              Login
            </Link>

            <Link
              href="/register"
              className="
                flex h-[40px] w-[150px]
                items-center justify-center gap-2
                rounded-lg
                bg-[#ae001b]
                font-serif text-[16px]
                text-white
                transition
                hover:bg-[#800018]
              "
            >
              <FaUserPlus />
              Register
            </Link>

          </div>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => {
              setOpen(!open);
              setMobileDropdown(null);
            }}
            className="
              rounded-lg p-2
              text-2xl text-[#800018]
              md:hidden
            "
            aria-label="Open menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <div className="hidden bg-[#800018] md:block">

        <nav
          className="
            mx-auto flex min-h-[50px]
            max-w-[1900px]
            items-stretch
            px-3
          "
        >

          {menuItems.map((item) => {

            const Icon = item.icon;

            const hasChildren =
              item.children &&
              item.children.length > 0;

            return (
              <div
                key={item.label}
                className="relative flex-1"
                onMouseEnter={() => {
                  if (hasChildren) {
                    setDesktopDropdown(item.label);
                  }
                }}
                onMouseLeave={() => {
                  if (hasChildren) {
                    setDesktopDropdown(null);
                  }
                }}
              >

                {/* MAIN MENU */}

                {hasChildren ? (
                  <button
                    type="button"
                    className={desktopLinkClass}
                  >

                    {Icon && (
                      <Icon className="text-[16px]" />
                    )}

                    <span>{item.label}</span>

                    <FaChevronDown className="text-[10px]" />

                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={desktopLinkClass}
                  >

                    {Icon && (
                      <Icon className="text-[16px]" />
                    )}

                    <span>{item.label}</span>

                  </Link>
                )}

                {/* DESKTOP DROPDOWN */}

                {hasChildren &&
                  desktopDropdown === item.label && (
                    <DesktopChildren
                      items={item.children!}
                    />
                  )}

              </div>
            );
          })}

        </nav>

      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      {open && (
        <div
          className="
            border-t border-gray-200
            bg-white shadow-xl
            md:hidden
          "
        >

          <div
            className="
              max-h-[calc(100vh-135px)]
              overflow-y-auto
            "
          >

            {menuItems.map((item) => {

              const Icon = item.icon;

              const hasChildren =
                item.children &&
                item.children.length > 0;

              const isExpanded =
                mobileDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="border-b border-gray-200"
                >

                  {/* MAIN ITEM */}

                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileDropdown(item.label)
                      }
                      className="
                        flex w-full
                        items-center justify-between
                        px-5 py-3.5
                        text-left
                        font-serif text-[16px]
                        font-medium
                        text-[#800018]
                        transition
                        hover:bg-[#fff5df]
                      "
                    >

                      <span className="flex items-center gap-3">

                        {Icon && (
                          <Icon className="w-[18px]" />
                        )}

                        <span>{item.label}</span>

                      </span>

                      <FaChevronDown
                        className={`
                          text-[12px]
                          transition-transform
                          duration-200
                          ${
                            isExpanded
                              ? "rotate-180"
                              : ""
                          }
                        `}
                      />

                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={closeMobileMenu}
                      className={mobileLinkClass}
                    >

                      {Icon && (
                        <Icon className="w-[18px]" />
                      )}

                      <span>{item.label}</span>

                    </Link>
                  )}

                  {/* MOBILE CHILDREN */}

                  {hasChildren && isExpanded && (
                    <MobileChildren
                      items={item.children!}
                    />
                  )}

                </div>
              );
            })}

            {/* LOGIN REGISTER */}

            <div className="grid grid-cols-2 gap-3 p-4">

              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-lg
                  border-2 border-[#800018]
                  py-3
                  font-serif text-sm
                  font-semibold
                  text-[#800018]
                "
              >
                <FaSignInAlt />
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-lg
                  bg-[#ae001b]
                  py-3
                  font-serif text-sm
                  font-semibold
                  text-white
                "
              >
                <FaUserPlus />
                Register
              </Link>

            </div>

          </div>
        </div>
      )}

    </header>
  );
}