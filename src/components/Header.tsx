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
========================================================= */

type MenuItem = {
  label: string;
  href?: string;
  icon?: any;
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

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  const [mobileDropdown, setMobileDropdown] =
    useState<string | null>(null);

  const [desktopDropdown, setDesktopDropdown] =
    useState<string | null>(null);

  /* =========================================================
     DATE
  ========================================================= */

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
     MOBILE
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
     DESKTOP CHILDREN
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
              <div
                key={child.label}
                className="group relative"
              >
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
     MOBILE CHILDREN
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
                  onClick={() =>
                    toggleMobileDropdown(key)
                  }
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
          TOP INFORMATION + LOGIN REGISTER
      ====================================================== */}

      <div className="border-b border-gray-200 bg-[#fafafa]">
        <div
          className="
            mx-auto flex min-h-[34px] sm:min-h-[38px]
            max-w-[1900px]
            items-center justify-between
            gap-2 sm:gap-4 px-3 sm:px-4
          "
        >

          {/* DATE */}

          <div className="flex items-center gap-1.5 sm:gap-2 text-[#800018] min-w-0">
            <FaCalendarAlt className="text-[11px] sm:text-[13px] shrink-0" />

            <span className="font-serif text-[11px] sm:text-[13px] truncate">
              {today || "Monday, 17 August 2026"}
            </span>
          </div>

          {/* PHONE + EMAIL */}

          <div className="hidden items-center gap-4 text-[#800018] lg:flex">

             
            <div className="flex items-center gap-1.5">
              <FaEnvelope className="text-[12px]" />

              <span className="font-serif text-[13px]">
                info@aryavysyamatrimony.com
              </span>
            </div>

          </div>

          {/* LOGIN REGISTER - TOP RIGHT (small screens) */}

          <div className="flex items-center gap-1.5 sm:hidden">

            <Link
              href="/login"
              className="
                flex h-[26px] items-center justify-center gap-1
                rounded-md
                border border-[#800018]
                px-2
                font-serif text-[11px]
                font-semibold
                text-[#800018]
              "
            >
              <FaSignInAlt className="text-[10px]" />
              Login
            </Link>

            <Link
              href="/register"
              className="
                flex h-[26px] items-center justify-center gap-1
                rounded-md
                bg-[#ae001b]
                px-2
                font-serif text-[11px]
                font-semibold
                text-white
              "
            >
              <FaUserPlus className="text-[10px]" />
              Register
            </Link>

          </div>

          {/* LOGIN REGISTER - TOP RIGHT (tablet/desktop) */}

          <div className="hidden items-center gap-2 sm:flex md:flex">

            <Link
              href="/login"
              className="
                flex h-[32px] min-w-[88px]
                items-center justify-center gap-1.5
                rounded-md
                border border-[#800018]
                px-3
                font-serif text-[13px]
                font-semibold
                text-[#800018]
                transition
                hover:bg-[#800018]
                hover:text-white
              "
            >
              <FaSignInAlt className="text-[12px]" />
              Login
            </Link>

            <Link
              href="/register"
              className="
                flex h-[32px] min-w-[100px]
                items-center justify-center gap-1.5
                rounded-md
                bg-[#ae001b]
                px-3
                font-serif text-[13px]
                font-semibold
                text-white
                transition
                hover:bg-[#800018]
              "
            >
              <FaUserPlus className="text-[12px]" />
              Register
            </Link>

          </div>

        </div>
      </div>
{/* =====================================================
    LOGO SECTION - MOBILE + DESKTOP
===================================================== */}

<div className="relative bg-white">

  <div
    className="
      mx-auto
      flex
      min-h-[82px]
      w-full
      max-w-[1900px]
      items-center
      justify-center
      px-2
      py-2

      sm:min-h-[110px]
      sm:px-4
      sm:py-3

      md:min-h-[125px]
    "
  >

    {/* ================================================
        MAIN LOGO CONTENT
    ================================================= */}

    <div
      className="
        flex
        w-full
        items-center
        justify-center

        gap-[6px]

        sm:gap-4
        md:gap-6
        lg:gap-8
      "
    >

      {/* ==============================================
          LEFT LOGO
      =============================================== */}

      <Link
        href="/"
        onClick={closeMobileMenu}
        className="shrink-0"
      >
        <img
          src="/images/logo.png"
          alt="Telangana State Arya Vysya Mahasabha"
          className="
            h-[38px]
            w-[38px]
            object-contain

            sm:h-[72px]
            sm:w-[72px]

            md:h-[88px]
            md:w-[88px]

            lg:h-[100px]
            lg:w-[100px]
          "
        />
      </Link>


      {/* ==============================================
          CENTER CONTENT
      =============================================== */}

      <Link
        href="/"
        onClick={closeMobileMenu}
        className="
          flex
          min-w-0
          max-w-[190px]
          flex-col
          items-center
          justify-center
          text-center

          sm:max-w-[500px]
          md:max-w-[700px]
          lg:max-w-[850px]
        "
      >

        {/* ENGLISH TITLE */}

        <h1
          className="
            font-serif
            text-[8px]
            font-bold
            leading-tight
            text-[#9b1746]

            xs:text-[9px]

            sm:text-[18px]
            md:text-[22px]
            lg:text-[26px]
          "
        >
          Telangana State Arya Vysya Mahasabha
        </h1>


        {/* TELUGU TITLE */}

        <h2
          className="
            mt-[1px]
            font-serif
            text-[7px]
            font-bold
            leading-tight
            text-[#9b1746]

            xs:text-[8px]

            sm:text-[14px]
            md:text-[17px]
            lg:text-[20px]
          "
        >
          తెలంగాణ రాష్ట్ర ఆర్యవైశ్య మహాసభ
        </h2>


        {/* ADDRESS */}

        <p
          className="
            mt-[2px]
            max-w-[185px]
            font-serif
            text-[5px]
            leading-tight
            text-[#64748b]

            xs:text-[5.5px]

            sm:mt-2
            sm:max-w-none
            sm:text-[11px]

            md:text-[13px]

            lg:text-[15px]
          "
        >
          Vysya Bhavan 6-2-648 Chintal Basti Khairatabad 500 004 Hyderabad
          <br />
          Registrar no:363/2015
        </p>

      </Link>


      {/* ==============================================
          RIGHT LOGO
      =============================================== */}

      <Link
        href="/"
        onClick={closeMobileMenu}
        className="shrink-0"
      >
        <img
          src="/images/logo2.jpg"
          alt="Vasavi Ammavaru"
          className="
            h-[38px]
            w-[38px]
            object-contain

            sm:h-[72px]
            sm:w-[72px]

            md:h-[88px]
            md:w-[88px]

            lg:h-[100px]
            lg:w-[100px]
          "
        />
      </Link>

    </div>


    {/* ================================================
        MOBILE MENU BUTTON
    ================================================= */}

    <button
      type="button"
      onClick={() => {
        setOpen(!open);
        setMobileDropdown(null);
      }}
      className="
        absolute
        right-1
        top-1/2
        -translate-y-1/2

        rounded-md
        p-1.5

        text-[16px]
        text-[#800018]

        active:bg-[#fff5df]

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
              max-h-[calc(100vh-100px)] sm:max-h-[calc(100vh-135px)]
              overflow-y-auto
              overscroll-contain
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
                        font-serif text-[15px] sm:text-[16px]
                        font-medium
                        text-[#800018]
                        transition
                        hover:bg-[#fff5df]
                        active:bg-[#fff5df]
                      "
                    >

                      <span className="flex items-center gap-3">

                        {Icon && (
                          <Icon className="w-[18px] shrink-0" />
                        )}

                        <span>{item.label}</span>

                      </span>

                      <FaChevronDown
                        className={`
                          text-[12px] shrink-0
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
                      className={`${mobileLinkClass} text-[15px] sm:text-[16px]`}
                    >

                      {Icon && (
                        <Icon className="w-[18px] shrink-0" />
                      )}

                      <span>{item.label}</span>

                    </Link>
                  )}

                  {hasChildren && isExpanded && (
                    <MobileChildren
                      items={item.children!}
                    />
                  )}

                </div>
              );
            })}

            {/* MOBILE LOGIN REGISTER (tablet width inside menu; phones already
                have login/register in the top bar, so this shows sm and up) */}

            <div className="hidden sm:grid grid-cols-2 gap-3 p-4">

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
