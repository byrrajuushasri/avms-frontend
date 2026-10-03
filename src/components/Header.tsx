
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
  FaHandsHelping,
  FaUniversity,
  FaUtensils,
  FaImages,
  FaUserTie,
  FaTimes,
  FaUserPlus,
} from "react-icons/fa";

type MenuItem = {
  label: string;
  href?: string;
  icon?: IconType;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "About Us", href: "/about", icon: FaInfoCircle },
  {
    label: "Membership",
    icon: FaCrown,
    children: [
      { label: "Members Registration", href: "/membership" },
      { label: "Existing Members", href: "/membership/details" },
    ],
  },
  {
    label: "Matrimony",
    icon: FaUsers,
    children: [
   
      { label: "Matrimony Registration", href: "/register" },
      { label: "Search Profiles", href: "/search" },
      { label: "Success Stories", href: "/success-stories" },
    ],
  },
  { label: "Contact", href: "/contact", icon: FaEnvelope },
];

const maroon = "#800018";

export default function Header() {
  const [today, setToday] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const closeMobile = () => {
    setMobileOpen(false);
    setExpanded(new Set());
  };

  function DesktopDropdown({
    items,
    level = 0,
  }: {
    items: MenuItem[];
    level?: number;
  }) {
    return (
      <div
        className={`absolute ${
          level === 0
            ? "left-0 top-full"
            : "left-full top-0"
        } z-[100] min-w-[230px] rounded-b-lg border border-[#eadbb9] bg-white py-2 shadow-xl`}
      >
        {items.map((child) => {
          const hasChildren = !!child.children?.length;

          return (
            <div key={child.label} className="group/sub relative">
              {hasChildren ? (
                <>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-3 text-sm text-gray-700 transition hover:bg-[#fff8e9] hover:text-[#800018]">
                    {child.label}
                    <FaChevronRight className="text-[10px]" />
                  </div>
                  <div className="invisible absolute left-full top-0 z-[110] opacity-0 transition group-hover/sub:visible group-hover/sub:opacity-100 group-focus-within/sub:visible group-focus-within/sub:opacity-100">
                    <DesktopDropdown
                      items={child.children!}
                      level={level + 1}
                    />
                  </div>
                </>
              ) : (
                <Link
                  href={child.href || "/"}
                  className="block border-b border-gray-50 px-5 py-3 text-sm text-gray-700 transition last:border-0 hover:bg-[#fff8e9] hover:pl-6 hover:text-[#800018]"
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
        className={`${
          level === 0
            ? "bg-[#fffaf1]"
            : "ml-4 border-l-2 border-[#e8d6ad] bg-white"
        }`}
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
                  className="flex min-h-12 w-full items-center justify-between border-t border-[#f0e6d3] px-6 py-3 text-left text-sm font-medium text-[#800018] hover:bg-[#fff1d6]"
                >
                  <span className="flex items-center gap-3">
                    <FaChevronRight
                      className={`text-[10px] transition ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                    {child.label}
                  </span>
                  <FaChevronDown
                    className={`text-[10px] transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={child.href || "/"}
                  onClick={closeMobile}
                  className="flex min-h-12 items-center gap-3 border-t border-[#f0e6d3] px-8 py-3 text-sm text-[#800018] hover:bg-[#fff1d6]"
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

  return (
    <header className="relative z-50 w-full bg-white font-serif">
      {/* Top accent */}
      <div className="h-1 bg-[#800018]" />

      {/* Top information bar */}
      <div className="border-b border-[#eee8df] bg-[#faf8f4]">
        <div className="mx-auto flex min-h-9 max-w-[1500px] items-center justify-between gap-2 px-4">
          <div className="flex min-w-0 items-center gap-2 text-[11px] text-[#800018] sm:text-xs">
            <FaCalendarAlt className="shrink-0" />
            <span className="truncate">
              {today || "Aarya Vysya Matrimony"}
            </span>
          </div>
          <a
            href="mailto:noreply@aaryavysyamahasabha.com"
            className="hidden items-center gap-2 text-xs text-[#800018] transition hover:text-[#b18a43] sm:flex"
          >
            <FaEnvelope />
            noreply@aaryavysyamahasabha.com
          </a>
        </div>
      </div>

      {/* Main brand section */}
      <div className="bg-white">
        <div className="relative mx-auto flex min-h-[92px] max-w-[1500px] items-center justify-center px-14 py-3 sm:min-h-[112px] md:px-6">
          <Link
            href="/"
            onClick={closeMobile}
            className="flex flex-col items-center text-center"
          >
            
            <h1 className="text-xl font-bold leading-tight text-[#800018] sm:text-3xl md:text-4xl">
              Aarya Vysya Matrimony
            </h1>
            
          </Link>

          <Link
            href="/register"
            className="absolute right-5 hidden items-center gap-2 rounded-md bg-[#800018] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#610013] md:flex"
          >
            <FaUserPlus />
            Register
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((prev) => !prev);
              setExpanded(new Set());
            }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-md text-xl text-[#800018] transition hover:bg-[#fff5e5] md:hidden"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden border-y border-[#a34b59] bg-[#800018] md:block">
        <div className="mx-auto flex min-h-[52px] max-w-[1500px] items-stretch justify-center px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;

            return (
              <div
                key={item.label}
                className="group relative flex"
              >
                {hasChildren ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex min-h-[52px] items-center justify-center gap-2 border-r border-white/15 px-5 text-[13px] font-medium text-white transition hover:bg-[#650014] focus:bg-[#650014] xl:px-7 xl:text-sm"
                  >
                    {Icon && <Icon className="text-sm" />}
                    {item.label}
                    <FaChevronDown className="text-[9px] transition group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="flex min-h-[52px] items-center justify-center gap-2 border-r border-white/15 px-5 text-[13px] font-medium text-white transition hover:bg-[#650014] xl:px-7 xl:text-sm"
                  >
                    {Icon && <Icon className="text-sm" />}
                    {item.label}
                  </Link>
                )}

                {hasChildren && (
                  <div className="invisible absolute left-0 top-full z-[100] pt-0 opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <DesktopDropdown items={item.children!} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full z-[100] max-h-[calc(100vh-80px)] overflow-y-auto border-t border-[#eadbb9] bg-white shadow-xl md:hidden">
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
                      className="flex min-h-[54px] w-full items-center justify-between px-5 py-3 text-left text-[15px] font-semibold text-[#800018] transition hover:bg-[#fff7e8]"
                    >
                      <span className="flex items-center gap-3">
                        {Icon && <Icon className="w-5" />}
                        {item.label}
                      </span>
                      <FaChevronDown
                        className={`text-xs transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={closeMobile}
                      className="flex min-h-[54px] items-center gap-3 px-5 py-3 text-[15px] font-semibold text-[#800018] transition hover:bg-[#fff7e8]"
                    >
                      {Icon && <Icon className="w-5" />}
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

          <div className="p-4">
            <Link
              href="/register"
              onClick={closeMobile}
              className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#800018] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#610013]"
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