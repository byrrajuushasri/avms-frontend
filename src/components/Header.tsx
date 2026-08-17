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

type MenuItem = {
  label: string;
  href?: string;
  icon?: any;
  children?: {
    label: string;
    href: string;
  }[];
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  // Mobile dropdown states
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  // Desktop dropdown
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
          label: "District",
          href: "/membership/district",
        },
        {
          label: "Mandal",
          href: "/membership/mandal",
        },
        {
          label: "Sangam",
          href: "/membership/sangam",
        },
      ],
    },

    {
      label: "Election Body",
      icon: FaUserTie,
      children: [
        {
          label: "State Committee",
          href: "/election-body/state",
        },
        {
          label: "District Committee",
          href: "/election-body/district",
        },
        {
          label: "Mandal Committee",
          href: "/election-body/mandal",
        },
      ],
    },

    {
      label: "Matrimony",
      icon: FaUsers,
      children: [
        {
          label: "Matrimony Home",
          href: "/matrimony",
        },
        
        {
          label: "Search Profiles",
          href: "/search",
        },
        
        {
          label: "Success Stories",
          href: "/matrimony/success-stories",
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

    // TEMPLES DROPDOWN
    {
      href: "/temples",
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
        {
          label: "Temple Services",
          href: "/temples/services",
        },
      ],
    },

    // ANNADHANAM DROPDOWN
    {
      href: "/annadhanam",
      label: "Annadhanam",
      icon: FaUtensils,
      children: [
        {
          label: "Annadhanam",
          href: "/annadhanam",
        },
        {
          label: "Upcoming Programs",
          href: "/annadhanam/programs",
        },
        {
          label: "Donate",
          href: "/annadhanam/donate",
        },
      ],
    },

    // MEDIA DROPDOWN
    {
      href: "/media",
      label: "Media",
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
      icon: FaPhoneAlt,
    },
  ];

  const toggleMobileDropdown = (label: string) => {
    setMobileDropdown((current) =>
      current === label ? null : label
    );
  };

  const closeMobileMenu = () => {
    setOpen(false);
    setMobileDropdown(null);
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
        <div className="mx-auto flex h-[32px] max-w-[1900px] items-center justify-between px-4">

          {/* DATE */}
          <div className="flex items-center gap-2 text-[#800018]">
            <FaCalendarAlt className="text-[13px]" />

            <span className="font-serif text-[13px]">
              {today || "Monday, 17 August 2026"}
            </span>
          </div>

          {/* CENTER */}
          <div className="hidden lg:block">
            <div className="font-serif text-[17px] font-bold tracking-wide text-[#800018]">
              ❧ Telangana State Aarya Vysya Mahasabha ❧
            </div>
          </div>

          {/* PHONE + EMAIL */}
          <div className="hidden items-center gap-4 text-[#800018] lg:flex">

            <div className="flex items-center gap-1.5">
              <FaPhoneAlt className="text-[12px]" />
              <span className="font-serif text-[13px]">
                +91 98765 43210
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
        <div className="mx-auto flex h-[100px] max-w-[1900px] items-center justify-between px-5 md:px-7">

          {/* LOGOS */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={closeMobileMenu}
          >

            <img
              src="/images/logo.png"
              alt="Aarya Vysya Mahasabha"
              className="h-[72px] w-[90px] object-contain"
            />

            <div>
              <h1 className="font-serif text-[25px] font-semibold leading-none tracking-wide text-[#800018]">
                AARYAVYSYA
              </h1>

              <div className="mt-1 flex items-center gap-2">

                <span className="text-[15px] text-[#c58b28]">
                  ❧
                </span>

                <h2 className="font-serif text-[21px] font-medium leading-none text-[#800018]">
                  MAHASABHA
                </h2>

                <span className="text-[15px] text-[#c58b28]">
                  ❧
                </span>

              </div>

              <p className="mt-1 pl-1 font-serif text-[12px] tracking-[0.12em] text-[#475569]">
                — Together Forever —
              </p>
            </div>

            <img
              src="/images/logo2.jpg"
              alt="Aarya Vysya Mahasabha"
              className="hidden h-[72px] w-[90px] object-contain sm:block"
            />

          </Link>

          {/* LOGIN REGISTER */}
          <div className="hidden items-center gap-4 md:flex">

            <Link
              href="/login"
              className="flex h-[40px] w-[125px] items-center justify-center gap-2 rounded-lg border-2 border-[#800018] font-serif text-[16px] text-[#800018] transition hover:bg-[#800018] hover:text-white"
            >
              <FaSignInAlt />
              Login
            </Link>

            <Link
              href="/register"
              className="flex h-[40px] w-[150px] items-center justify-center gap-2 rounded-lg bg-[#ae001b] font-serif text-[16px] text-white transition hover:bg-[#800018]"
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
            className="rounded-lg p-2 text-2xl text-[#800018] md:hidden"
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

        <nav className="mx-auto flex min-h-[50px] max-w-[1900px] items-stretch px-3">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const hasChildren =
              item.children && item.children.length > 0;

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
                    className="
                      flex min-h-[50px] w-full
                      items-center justify-center gap-1.5
                      border-r border-[#a52a3d]
                      px-2
                      font-serif text-[14px] font-medium
                      text-white
                      transition
                      hover:bg-[#650014]
                    "
                  >
                    {Icon && <Icon className="text-[16px]" />}

                    <span>{item.label}</span>

                    <FaChevronDown className="text-[10px]" />
                  </button>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className="
                      flex min-h-[50px] w-full
                      items-center justify-center gap-1.5
                      border-r border-[#a52a3d]
                      px-2
                      font-serif text-[14px] font-medium
                      text-white
                      transition
                      hover:bg-[#650014]
                    "
                  >
                    {Icon && <Icon className="text-[16px]" />}

                    <span>{item.label}</span>
                  </Link>
                )}

                {/* DESKTOP DROPDOWN */}
                {hasChildren &&
                  desktopDropdown === item.label && (
                    <div className="absolute left-0 top-full z-[100] min-w-[210px] overflow-hidden rounded-b-lg border border-[#ead9b5] bg-white shadow-xl">

                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="
                            flex items-center gap-2
                            border-b border-gray-100
                            px-4 py-3
                            font-serif text-[14px]
                            text-[#690015]
                            transition
                            hover:bg-[#fff3d1]
                            hover:text-[#800018]
                          "
                        >
                          <FaChevronRight className="text-[9px]" />
                          {child.label}
                        </Link>
                      ))}

                    </div>
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
        <div className="border-t border-gray-200 bg-white shadow-xl md:hidden">

          <div className="max-h-[calc(100vh-135px)] overflow-y-auto">

            {menuItems.map((item) => {
              const Icon = item.icon;

              const hasChildren =
                item.children && item.children.length > 0;

              const isExpanded =
                mobileDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="border-b border-gray-200"
                >

                  {/* MOBILE MAIN ITEM */}
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
                        className={`text-[12px] transition-transform duration-200 ${
                          isExpanded
                            ? "rotate-180"
                            : ""
                        }`}
                      />

                    </button>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={closeMobileMenu}
                      className="
                        flex items-center gap-3
                        px-5 py-3.5
                        font-serif text-[16px]
                        font-medium
                        text-[#800018]
                        transition
                        hover:bg-[#fff5df]
                      "
                    >
                      {Icon && (
                        <Icon className="w-[18px]" />
                      )}

                      <span>{item.label}</span>
                    </Link>
                  )}

                  {/* MOBILE DROPDOWN */}
                  {hasChildren && isExpanded && (
                    <div className="bg-[#fffaf0]">

                      {item.children?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMobileMenu}
                          className="
                            flex items-center gap-3
                            border-t border-[#eadfca]
                            px-12 py-3
                            font-serif text-[14px]
                            text-[#690015]
                            transition
                            hover:bg-[#f8edcf]
                          "
                        >
                          <FaChevronRight className="text-[9px]" />

                          <span>{child.label}</span>
                        </Link>
                      ))}

                    </div>
                  )}

                </div>
              );
            })}

            {/* MOBILE LOGIN / REGISTER */}
            <div className="grid grid-cols-2 gap-3 p-4">

              <Link
                href="/login"
                onClick={closeMobileMenu}
                className="
                  flex items-center justify-center
                  gap-2 rounded-lg
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
                  flex items-center justify-center
                  gap-2 rounded-lg
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