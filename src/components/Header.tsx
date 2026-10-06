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
          const hasChildren =
            !!child.children?.length;

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

          const hasChildren =
            !!child.children?.length;

          const isOpen =
            expanded.has(key);

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
                      transition
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

      <div className="h-[5px] bg-[#800018]" />

      {/* =====================================================
          TRADITIONAL TELUGU MARRIAGE PANDIRI
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#d4af37]
        
        "
      >

        {/* =================================================
            THORANAM
        ================================================== */}

        <div
          className="
            relative
            h-[125px]
            w-full
            overflow-hidden
            sm:h-[140px]
            md:h-[155px]
            lg:h-[170px]
          "
        >

          {/* TOP THORANAM - LEFT */}

          <img
            src="/images/mamidi-thoranam.png"
            alt="Traditional Telugu mango leaf toranam"
            className="
              absolute
              left-0
              top-0
              h-[20px]
              w-[50%]
              object-cover
              object-left-top
              sm:h-[90px]
              md:h-[105px]
              lg:h-[115px]
            "
          />

          {/* TOP THORANAM - RIGHT */}

          <img
            src="/images/mamidi-thoranam.png"
            alt="Traditional Telugu mango leaf toranam"
            className="
              absolute
              right-0
              top-0
              h-[80px]
              w-[50%]
              scale-x-[-1]
              object-cover
              object-right-top
              sm:h-[90px]
              md:h-[105px]
              lg:h-[115px]
            "
          />

          {/* =================================================
              CENTER DECORATIVE GOLD LINE
          ================================================== */}

          <div
            className="
              absolute
              left-1/2
              top-0
              z-20
              h-[5px]
              w-[42%]
              -translate-x-1/2
              bg-[#d4af37]
            "
          />

        </div>

        {/* =================================================
            HANGING FLOWER DECORATION
            LEFT = శ్రీరస్తు
            CENTER = శుభమస్తు
            RIGHT = అవిఘ్నమస్తు
        ================================================== */}

        <div
          className="
            pointer-events-none
          absolute
            left-1
            right-1
             
           
            grid
            grid-cols-3
            items-start
            px-3
            
            
            md:top-[111px]
            md:px-16
            lg:px-24
          "
        >

          {/* =================================================
              LEFT
              శ్రీరస్తు
          ================================================== */}

          <div className="flex flex-col items-center">

            {/* Flower */}

           
            {/* Telugu Blessing */}

            <div
              className="
                mt-1
                rounded-full
                border
                border-[#d4af37]
                bg-[#fffaf0]
                px-2
                py-1
                shadow-sm
                sm:px-4
                sm:py-1.5
                md:px-6
                md:py-1
              "
            >
              <span
                className="
                  whitespace-nowrap
                  text-sm
                 
                  text-[#800018]
                  sm:text-base
                  md:text-sm
                  lg:text-sm
                "
              >
                శ్రీరస్తు
              </span>
            </div>

           
          </div>

          {/* =================================================
              CENTER
              శుభమస్తు
          ================================================== */}

          <div className="flex flex-col items-center">

            {/* Flower */}

            
 
            {/* Telugu Blessing */}

           <div
              className="
                mt-1
                rounded-full
                border
                border-[#d4af37]
                bg-[#fffaf0]
                px-2
                py-1
                shadow-sm
                sm:px-4
                sm:py-1.5
                md:px-6
                md:py-1
              "
            >
              <span
                className="
                  whitespace-nowrap
                  text-sm
                 
                  text-[#800018]
                  sm:text-base
                  md:text-sm
                  lg:text-sm
                "
              >
                శుభమస్తు
              </span>
            </div>

            

          </div>

          {/* =================================================
              RIGHT
              అవిఘ్నమస్తు
          ================================================== */}

          <div className="flex flex-col items-center">

            {/* Flower */}
 
            
            {/* Telugu Blessing */}
 
           <div
              className="
                mt-1
                rounded-full
                border
                border-[#d4af37]
                bg-[#fffaf0]
                px-2
                py-1
                shadow-sm
                sm:px-4
                sm:py-1.5
                md:px-6
                md:py-1
              "
            >
              <span
                className="
                  whitespace-nowrap
                  text-sm
                 
                  text-[#800018]
                  sm:text-base
                  md:text-sm
                  lg:text-sm
                "
              >
                అవిఘ్నమస్తు
              </span>
            </div>

           
          </div>

        </div>

        {/* =================================================
            BOTTOM FLOWER / PANDIRI BORDER
        ================================================== */}

       

      </section>

      {/* =====================================================
          VINAYAKA SHLOKA
      ====================================================== */}

      <div
        className="
          border-b
          border-[#eadfca]
          bg-[#fffdf7]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-4
            py-2
            text-center
            text-[9px]
            font-medium
            leading-[1.7]
            text-[#800018]
            sm:px-6
            sm:text-[10px]
            md:text-[11px]
          "
        >
          <p>
            ముదాకరాత్త మోదకం సదా విముక్తి సాధకమ్
            కళాధరావతంసకం విలాసిలోక రక్షకమ్
          </p>

          <p>
            అనాయకైక నాయకం వినాశితేభ దైత్యకమ్
            నతాశుభాశు నాశకం నమామి తం వినాయకమ్
          </p>
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
            px-4
            py-3
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
                src="/images/logo1.png"
                alt="Aarya Vysya Logo"
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

                <p
                  className="
                    font-semibold
                    text-[#800018]
                  "
                >
                  Champapet Aaryavysya Sangam
                </p>

                <p
                  className="
                    font-medium
                    text-gray-700
                  "
                >
                  Parichaya Vedica Vibhagam
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

                <p
                  className="
                    font-medium
                    text-gray-700
                  "
                >
                  Aaryavysya Mahasabha Telangana
                  · Hyderabad – 500079
                </p>

              </div>

            </div>

            {/* RIGHT LOGO */}

            <div className="flex justify-end">
              <img
                src="/images/logo2.png"
                alt="Aarya Vysya Mahasabha"
                className="
                  h-auto
                  w-[100px]
                  object-contain
                  lg:w-[125px]
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
                grid-cols-[70px_1fr_70px]
                items-center
                gap-2
              "
            >

              {/* LEFT */}

              <div className="flex justify-start">
                <img
                  src="/images/logo1.png"
                  alt="Aarya Vysya Logo"
                  className="
                    h-auto
                    w-[60px]
                    object-contain
                    sm:w-[70px]
                  "
                />
              </div>

              {/* CENTER */}

              <Link
                href="/"
                className="
                  flex
                  items-center
                  justify-center
                "
              >
                <img
                  src="/images/logo.png"
                  alt="Aarya Vysya Matrimony"
                  className="
                    h-auto
                    w-[165px]
                    object-contain
                    sm:w-[190px]
                  "
                />
              </Link>

              {/* RIGHT */}

              <div className="flex justify-end">
                <img
                  src="/images/logo2.png"
                  alt="Aarya Vysya Mahasabha"
                  className="
                    h-auto
                    w-[60px]
                    object-contain
                    sm:w-[70px]
                  "
                />
              </div>

            </div>

            {/* MOBILE ADDRESS */}

            <div
              className="
                mx-auto
                mt-3
                border-t
                border-gray-200
                pt-2
                text-center
                text-[9px]
                leading-[1.6]
                text-gray-600
                sm:text-[10px]
              "
            >

              <p
                className="
                  font-semibold
                  text-[#800018]
                "
              >
                Champapet Aaryavysya Sangam
              </p>

              <p className="font-medium text-gray-700">
                Parichaya Vedica Vibhagam
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
            top-2
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            text-lg
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
            max-h-[calc(100vh-80px)]
            overflow-y-auto
            border-t
            border-[#eadbb9]
            bg-white
            shadow-xl
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

                      <span
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        {Icon && (
                          <Icon className="w-5" />
                        )}

                        {item.label}

                      </span>

                      <FaChevronDown
                        className={`
                          text-xs
                          transition
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

          {/* QUICK REGISTRATION */}

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