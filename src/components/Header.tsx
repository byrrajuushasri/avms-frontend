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
            label: "Members Registration",
            href: "/membership",
          },
          {
            label: "Existing Members",
            href: "/membership/details",
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
        label: "Matrimony Registration",
        href: "/register",
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
    icon: FaImages,
    children: [
      {
        label: "State Body News",
        href: "/media/state-news",
      },
      {
        label: "District Body News",
        href: "/media/district-news",
      },
      {
        label: "Mandal Body News",
        href: "/media/mandal-news",
      },
      {
        label: "Sangam Body News",
        href: "/media/sangam-news",
      },
    ],
  },

  {
    label: "Contact",
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
   DESKTOP LINK STYLE
========================================================= */

const desktopLinkClass = `
  flex
  min-h-[50px]
  w-full
  items-center
  justify-center
  gap-1.5
  border-r
  border-[#a52a3d]
  px-2
  font-serif
  text-[13px]
  font-medium
  text-white
  transition-all
  duration-200
  hover:bg-[#650014]
  xl:text-[14px]
`;

/* =========================================================
   MOBILE LINK STYLE
========================================================= */

const mobileLinkClass = `
  flex
  min-h-[50px]
  items-center
  gap-3
  px-5
  py-3.5
  font-serif
  text-[15px]
  font-medium
  text-[#800018]
  transition-all
  duration-200
  hover:bg-[#fff5df]
  active:bg-[#fff5df]
  sm:text-[16px]
`;

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const [open, setOpen] = useState(false);

  const [today, setToday] = useState("");

  /*
   * IMPORTANT:
   * Using Set allows multiple nested dropdowns
   * to stay open independently.
   */
  const [mobileDropdowns, setMobileDropdowns] =
    useState<Set<string>>(new Set());

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
     MOBILE DROPDOWN TOGGLE
  ========================================================= */

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdowns((current) => {
      const next = new Set(current);

      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

  /* =========================================================
     CLOSE MOBILE MENU
  ========================================================= */

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileDropdowns(new Set());
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
        className={
          level === 0
            ? `
              absolute
              left-0
              top-full
              z-[9999]
              min-w-[235px]
              overflow-visible
              rounded-b-lg
              border
              border-[#ead9b5]
              bg-white
              shadow-2xl
            `
            : `
              absolute
              left-full
              top-0
              z-[10000]
              min-w-[220px]
              overflow-visible
              rounded-lg
              border
              border-[#ead9b5]
              bg-white
              shadow-2xl
            `
        }
      >
        {items.map((child) => {
          const hasChildren =
            !!child.children &&
            child.children.length > 0;

          if (hasChildren) {
            return (
              <div
                key={child.label}
                className="group relative"
              >
                <div
                  className="
                    flex
                    min-h-[42px]
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    gap-5
                    border-b
                    border-gray-100
                    px-4
                    py-2.5
                    text-sm
                    font-semibold
                    text-gray-700
                    transition
                    hover:bg-[#fff7e6]
                    hover:text-[#800018]
                  "
                >
                  <span>{child.label}</span>

                  <FaChevronRight
                    className="
                      shrink-0
                      text-[9px]
                    "
                  />
                </div>

                <div
                  className="
                    invisible
                    absolute
                    left-full
                    top-0
                    z-[10000]
                    opacity-0
                    transition-all
                    duration-150
                    group-hover:visible
                    group-hover:opacity-100
                  "
                >
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
                flex
                min-h-[42px]
                items-center
                border-b
                border-gray-100
                px-4
                py-2.5
                text-sm
                text-gray-700
                transition-all
                duration-150
                hover:bg-[#fff7e6]
                hover:pl-5
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
    parentKey = "",
  }: {
    items: MenuItem[];
    level?: number;
    parentKey?: string;
  }) => {
    return (
      <div
        className={
          level === 0
            ? "bg-[#fffaf0]"
            : "ml-4 border-l-2 border-[#eadfca] bg-[#fffdf7]"
        }
      >
        {items.map((child) => {
          const hasChildren =
            !!child.children &&
            child.children.length > 0;

          /*
           * Unique key for every nested level.
           *
           * Example:
           * Membership
           * Membership/State Membership
           * Membership/State Membership/New Members
           */
          const key = parentKey
            ? `${parentKey}/${child.label}`
            : child.label;

          const isOpen =
            mobileDropdowns.has(key);

          /* =================================================
             CHILD WITH MORE CHILDREN
          ================================================== */

          if (hasChildren) {
            return (
              <div key={key}>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    toggleMobileDropdown(key);
                  }}
                  className="
                    flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-between
                    border-t
                    border-[#eadfca]
                    px-6
                    py-3
                    text-left
                    font-serif
                    text-[14px]
                    font-medium
                    text-[#690015]
                    transition-all
                    duration-200
                    hover:bg-[#f8edcf]
                    active:bg-[#f8edcf]
                    sm:text-[15px]
                  "
                >
                  <span className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  ">
                    <FaChevronRight
                      className={`
                        shrink-0
                        text-[9px]
                        transition-transform
                        duration-200
                        ${
                          isOpen
                            ? "rotate-90"
                            : ""
                        }
                      `}
                    />

                    <span>
                      {child.label}
                    </span>
                  </span>

                  <FaChevronDown
                    className={`
                      shrink-0
                      text-[10px]
                      transition-transform
                      duration-200
                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                </button>

                {/* NESTED CHILD */}

                {isOpen && (
                  <MobileChildren
                    items={child.children!}
                    level={level + 1}
                    parentKey={key}
                  />
                )}
              </div>
            );
          }

          /* =================================================
             FINAL LINK
          ================================================== */

          return (
            <Link
              key={key}
              href={child.href || "#"}
              onClick={closeMobileMenu}
              className="
                flex
                min-h-[46px]
                items-center
                gap-3
                border-t
                border-[#eadfca]
                px-8
                py-3
                font-serif
                text-[14px]
                text-[#690015]
                transition-all
                duration-200
                hover:bg-[#f8edcf]
                active:bg-[#f8edcf]
                sm:text-[15px]
              "
            >
              <FaChevronRight
                className="
                  shrink-0
                  text-[9px]
                "
              />

              <span>
                {child.label}
              </span>
            </Link>
          );
        })}
      </div>
    );
  };

  /* =========================================================
     RETURN
  ========================================================= */

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
            mx-auto
            flex
            min-h-[34px]
            max-w-[1900px]
            items-center
            justify-between
            gap-2
            px-3
            sm:min-h-[38px]
            sm:px-4
          "
        >

          {/* DATE */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-1.5
              text-[#800018]
              sm:gap-2
            "
          >
            <FaCalendarAlt
              className="
                shrink-0
                text-[11px]
                sm:text-[13px]
              "
            />

            <span
              className="
                truncate
                font-serif
                text-[10px]
                sm:text-[13px]
              "
            >
              {today ||
                "Monday, 17 August 2026"}
            </span>
          </div>

          {/* EMAIL */}

          <div
            className="
              hidden
              items-center
              gap-4
              text-[#800018]
              lg:flex
            "
          >
            <div
              className="
                flex
                items-center
                gap-1.5
              "
            >
              <FaEnvelope
                className="text-[12px]"
              />

              <span
                className="
                  font-serif
                  text-[13px]
                "
              >
                info@aryavysyamatrimony.com
              </span>
            </div>
          </div>
 

        

         
        </div>
      </div>

      {/* =====================================================
          LOGO SECTION
      ====================================================== */}

      <div className="relative bg-white">
        <div
          className="
            mx-auto
            flex
            min-h-[76px]
            w-full
            max-w-[1900px]
            items-center
            justify-center
            px-7
            py-2
            sm:min-h-[105px]
            sm:px-10
            sm:py-3
            md:min-h-[125px]
            md:px-4
          "
        >

          {/* LOGOS + CENTER */}

          <div
            className="
              flex
              w-full
              items-center
              justify-center
              gap-[5px]
              sm:gap-4
              md:gap-6
              lg:gap-8
            "
          >

            {/* LEFT LOGO */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="shrink-0"
            >
              <img
                src="/images/logo.png"
                alt="Telangana State Arya Vysya Mahasabha"
                className="
                  h-[36px]
                  w-[36px]
                  object-contain
                  sm:h-[70px]
                  sm:w-[70px]
                  md:h-[88px]
                  md:w-[88px]
                  lg:h-[100px]
                  lg:w-[100px]
                "
              />
            </Link>

            {/* CENTER CONTENT */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="
                flex
                min-w-0
                max-w-[205px]
                flex-col
                items-center
                justify-center
                text-center
                sm:max-w-[500px]
                md:max-w-[700px]
                lg:max-w-[850px]
              "
            >
              <h1
                className="
                  font-serif
                  text-[8px]
                  font-bold
                  leading-tight
                  text-[#9b1746]
                  sm:text-[18px]
                  md:text-[22px]
                  lg:text-[26px]
                "
              >
                Telangana State Arya Vysya Mahasabha
              </h1>

              <h2
                className="
                  mt-[1px]
                  font-serif
                  text-[7px]
                  font-bold
                  leading-tight
                  text-[#9b1746]
                  sm:text-[14px]
                  md:text-[17px]
                  lg:text-[20px]
                "
              >
                తెలంగాణ రాష్ట్ర ఆర్యవైశ్య మహాసభ
              </h2>

              <p
                className="
                  mt-[2px]
                  max-w-[195px]
                  font-serif
                  text-[5px]
                  leading-tight
                  text-[#64748b]
                  sm:mt-2
                  sm:max-w-none
                  sm:text-[11px]
                  md:text-[13px]
                  lg:text-[15px]
                "
              >
                Vysya Bhavan 6-2-648 Chintal Basti
                Khairatabad,Hyderabad 500 004 
                <br />
               Registration no:363/2015
              </p>
            </Link>

            {/* RIGHT LOGO */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="shrink-0"
            >
              <img
                src="/images/logo2.jpg"
                alt="Vasavi Ammavaru"
                className="
                  h-[36px]
                  w-[36px]
                  object-contain
                  sm:h-[70px]
                  sm:w-[70px]
                  md:h-[88px]
                  md:w-[88px]
                  lg:h-[100px]
                  lg:w-[100px]
                "
              />
            </Link>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() => {
              setOpen((current) => !current);
              setMobileDropdowns(new Set());
            }}
            className="
              absolute
              right-1.5
              top-1/2
              flex
              h-9
              w-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-md
              text-[18px]
              text-[#800018]
              transition
              hover:bg-[#fff5df]
              active:bg-[#fff5df]
              md:hidden
            "
            aria-label={
              open
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={open}
          >
            {open ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <div
        className="
          hidden
          bg-[#800018]
          md:block
        "
      >
        <nav
          className="
            mx-auto
            flex
            min-h-[50px]
            max-w-[1900px]
            items-stretch
            px-2
            xl:px-3
          "
        >
          {menuItems.map((item) => {
            const Icon = item.icon;

            const hasChildren =
              !!item.children &&
              item.children.length > 0;

            return (
              <div
                key={item.label}
                className="
                  relative
                  flex-1
                "
                onMouseEnter={() => {
                  if (hasChildren) {
                    setDesktopDropdown(
                      item.label
                    );
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
                    className={
                      desktopLinkClass
                    }
                    aria-haspopup="true"
                    aria-expanded={
                      desktopDropdown ===
                      item.label
                    }
                  >
                    {Icon && (
                      <Icon
                        className="
                          shrink-0
                          text-[15px]
                        "
                      />
                    )}

                    <span>
                      {item.label}
                    </span>

                    <FaChevronDown
                      className="
                        shrink-0
                        text-[9px]
                      "
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={
                      desktopLinkClass
                    }
                  >
                    {Icon && (
                      <Icon
                        className="
                          shrink-0
                          text-[15px]
                        "
                      />
                    )}

                    <span>
                      {item.label}
                    </span>
                  </Link>
                )}

                {hasChildren &&
                  desktopDropdown ===
                    item.label && (
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
            border-t
            border-gray-200
            bg-white
            shadow-xl
            md:hidden
          "
        >
          <div
            className="
              max-h-[calc(100vh-100px)]
              overflow-y-auto
              overscroll-contain
              pb-2
            "
          >
            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren =
                !!item.children &&
                item.children.length > 0;

              const isExpanded =
                mobileDropdowns.has(
                  item.label
                );

              return (
                <div
                  key={item.label}
                  className="
                    border-b
                    border-gray-200
                  "
                >
                  {/* =================================================
                      MAIN MOBILE MENU ITEM
                  ================================================== */}

                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileDropdown(
                          item.label
                        )
                      }
                      className="
                        flex
                        min-h-[52px]
                        w-full
                        items-center
                        justify-between
                        px-5
                        py-3.5
                        text-left
                        font-serif
                        text-[15px]
                        font-medium
                        text-[#800018]
                        transition
                        hover:bg-[#fff5df]
                        active:bg-[#fff5df]
                        sm:text-[16px]
                      "
                    >
                      <span
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                        "
                      >
                        {Icon && (
                          <Icon
                            className="
                              w-[18px]
                              shrink-0
                            "
                          />
                        )}

                        <span>
                          {item.label}
                        </span>
                      </span>

                      <FaChevronDown
                        className={`
                          shrink-0
                          text-[11px]
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
                      onClick={
                        closeMobileMenu
                      }
                      className={
                        mobileLinkClass
                      }
                    >
                      {Icon && (
                        <Icon
                          className="
                            w-[18px]
                            shrink-0
                          "
                        />
                      )}

                      <span>
                        {item.label}
                      </span>
                    </Link>
                  )}

                  {/* =================================================
                      FIRST LEVEL CHILDREN
                  ================================================== */}

                  {hasChildren &&
                    isExpanded && (
                      <MobileChildren
                        items={item.children!}
                        level={0}
                        parentKey={item.label}
                      />
                    )}
                </div>
              );
            })}

            {/* =================================================
                MOBILE LOGIN REGISTER
            ================================================== */}

            <div
              className="
                grid
                grid-cols-2
                gap-3
                p-4
              "
            >
              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border-2
                  border-[#800018]
                  py-3
                  font-serif
                  text-sm
                  font-semibold
                  text-[#800018]
                  transition
                  hover:bg-[#fff5df]
                "
              >
                <FaSignInAlt />

                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMobileMenu}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-[#ae001b]
                  py-3
                  font-serif
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#800018]
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