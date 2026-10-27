
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
  FaSignInAlt,
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
  { label: "Membership", href: "/membership", icon: FaCrown },
  {
    label: "Matrimony Registration",
    href: "/register",
    icon: FaUsers,
  },
  { label: "Contact", href: "/contact", icon: FaEnvelope },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
    icon: FaEnvelope,
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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
          level === 0 ? "left-0 top-full" : "left-full top-0"
        } z-[100] min-w-[220px] overflow-visible rounded-b-lg border border-[#eadbb9] bg-white py-1 shadow-xl`}
      >
        {items.map((child) => {
          const hasChildren = !!child.children?.length;

          return (
            <div key={child.label} className="group/sub relative">
              {hasChildren ? (
                <>
                  <div className="flex cursor-pointer items-center justify-between px-5 py-2.5 text-sm text-gray-700 transition hover:bg-[#fff8e9] hover:text-[#800018]">
                    <span>{child.label}</span>
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
                  className="block border-b border-gray-50 px-5 py-2.5 text-sm text-gray-700 transition last:border-0 hover:bg-[#fff8e9] hover:pl-6 hover:text-[#800018]"
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
                  className="flex min-h-10 w-full items-center justify-between border-t border-[#f0e6d3] px-5 py-2.5 text-left text-sm font-medium text-[#800018] transition hover:bg-[#fff1d6]"
                >
                  <span className="flex items-center gap-3">
                    <FaChevronRight
                      className={`text-[9px] transition-transform ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                    {child.label}
                  </span>

                  <FaChevronDown
                    className={`text-[10px] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={child.href || "/"}
                  onClick={closeMobile}
                  className="flex min-h-10 items-center gap-3 border-t border-[#f0e6d3] px-7 py-2.5 text-sm text-[#800018] transition hover:bg-[#fff1d6]"
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

  return (
    <header className="relative z-50 w-full overflow-visible font-serif">
      {/* TOP MAROON BORDER */}
      <div className="h-[3px] bg-[#800018]" />

      {/* TRADITIONAL HEADER DECORATION */}
      <div className="border-b border-[#f1eadf] bg-white px-3 py-0.5">
        <div className="mx-auto grid max-w-[1500px] grid-cols-3 items-center text-center text-[#800018]">
          <div className="justify-self-start whitespace-nowrap text-[9px] font-semibold sm:text-[10px]">
            అవిఘ్నమస్తు
          </div>

          <div className="justify-self-center whitespace-nowrap text-[9px] font-semibold sm:text-[10px]">
            హరి ఓం
          </div>

          <div className="justify-self-end whitespace-nowrap text-[9px] font-semibold sm:text-[10px]">
            కళ్యాణమస్తు
          </div>
        </div>
      </div>

      {/* LOGOS + ADDRESS */}
      <div className="relative border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1500px] px-3 py-1 sm:px-6 sm:py-2">
          {/* DESKTOP HEADER */}
          <div className="hidden grid-cols-[90px_1fr_90px] items-center gap-3 md:grid lg:grid-cols-[110px_1fr_110px] lg:gap-5">
            {/* LEFT LOGO */}
            <div className="flex justify-start">
              <img
                src="/images/logo1.jpg"
                alt="Aarya Vysya Logo"
                className="h-auto w-[65px] object-contain lg:w-[75px]"
              />
            </div>

            {/* CENTER LOGO + ADDRESS */}
            <div className="flex items-center justify-center gap-4 lg:gap-6">
              <Link
                href="/"
                className="flex shrink-0 items-center justify-center"
              >
                <img
                  src="/images/logo.png"
                  alt="Aarya Vysya Matrimony"
                  className="h-auto w-[180px] object-contain lg:w-[220px] xl:w-[250px]"
                />
              </Link>

              <div className="max-w-[420px] border-l border-gray-200 pl-4 text-left text-[9px] leading-[1.4] text-gray-600 lg:text-[11px]">
                <p className="font-semibold text-[#800018]">
                  చంపాపేట్ ఆర్యవైశ్య సంఘం
                </p>
                <p className="font-medium text-gray-700">
                  పరిచయ వేదిక విభాగం
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
            </div>

            {/* RIGHT LOGO */}
            <div className="flex justify-end">
              <img
                src="/images/vinayaka.jpg"
                alt="Aarya Vysya Mahasabha"
                className="h-auto w-[65px] object-contain lg:w-[85px]"
              />
            </div>
          </div>

          {/* MOBILE HEADER */}
          <div className="md:hidden">
            <div className="grid grid-cols-[36px_minmax(0,1fr)_36px_36px] items-center gap-1 px-1 xs:grid-cols-[42px_minmax(0,1fr)_42px_42px] xs:gap-1.5 sm:grid-cols-[50px_minmax(0,1fr)_50px_44px] sm:gap-2 sm:px-2">
              {/* VASAVI AMMAVARU */}
              <div className="flex justify-start">
                <img
                  src="/images/logo1.jpg"
                  alt="Vasavi Ammavaru"
                  className="h-auto w-[34px] object-contain xs:w-[40px] sm:w-[48px]"
                />
              </div>

              {/* CENTER LOGO */}
              <Link
                href="/"
                className="flex min-w-0 items-center justify-center"
              >
                <img
                  src="/images/logo.png"
                  alt="Aarya Vysya Matrimony"
                  className="h-auto w-[125px] max-w-full object-contain xs:w-[140px] sm:w-[165px]"
                />
              </Link>

              {/* GANESH */}
              <div className="flex justify-end">
                <img
                  src="/images/vinayaka.jpg"
                  alt="Lord Ganesh"
                  className="h-auto w-[34px] object-contain xs:w-[40px] sm:w-[48px]"
                />
              </div>

              {/* MOBILE MENU TOGGLE */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen((prev) => !prev);
                    setExpanded(new Set());
                  }}
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  aria-controls="mobile-navigation"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#eadbb9] bg-white text-base text-[#800018] shadow-sm transition hover:bg-[#fff5e5] focus:outline-none focus:ring-2 focus:ring-[#d9b76e] xs:h-10 xs:w-10 sm:h-11 sm:w-11"
                >
                  {mobileOpen ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            </div>

            {/* MOBILE ADDRESS */}
            <div className="mx-auto mt-1 max-w-[360px] border-t border-gray-200 px-2 pt-1.5 text-center text-[8px] leading-[1.25] text-gray-600 xs:text-[8.5px] sm:max-w-[500px] sm:text-[10px]">
              <p className="font-semibold text-[#800018]">
                చంపాపేట్ ఆర్యవైశ్య సంఘం
              </p>
              <p className="font-medium text-gray-700">
                పరిచయ వేదిక విభాగం
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
          </div>
        </div>

      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden border-b border-[#a34b59] bg-[#800018] md:block">
        <div className="mx-auto flex min-h-[42px] max-w-[1500px] items-stretch justify-center px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = !!item.children?.length;

            return (
              <div key={item.label} className="group relative flex">
                {hasChildren ? (
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex min-h-[42px] items-center justify-center gap-2 border-r border-white/15 px-5 text-[13px] font-medium text-white transition hover:bg-[#650014] focus:bg-[#650014] xl:px-7 xl:text-sm"
                  >
                    {Icon && <Icon className="text-sm" />}
                    {item.label}
                    <FaChevronDown className="text-[9px] transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                ) : (
                  <Link
                    href={item.href || "/"}
                    className="flex min-h-[42px] items-center justify-center gap-2 border-r border-white/15 px-5 text-[13px] font-medium text-white transition hover:bg-[#650014] xl:px-7 xl:text-sm"
                  >
                    {Icon && <Icon className="text-sm" />}
                    {item.label}
                  </Link>
                )}

                {hasChildren && (
                  <div className="invisible absolute left-0 top-full z-[100] opacity-0 transition duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <DesktopDropdown items={item.children!} />
                  </div>
                )}
              </div>
            );
          })}

          {/* DESKTOP LOGIN BUTTON */}
          <Link
            href="/login"
            className="my-1 ml-3 flex items-center justify-center gap-2 rounded-md border border-[#e7c875] bg-[#d9b76e] px-5 text-sm font-bold text-[#650014] shadow-sm transition hover:bg-[#f0d99c] focus:outline-none focus:ring-2 focus:ring-white"
          >
            <FaSignInAlt />
            Login
          </Link>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-[100] max-h-[calc(100vh-70px)] overflow-y-auto overscroll-contain border-t border-[#eadbb9] bg-white shadow-2xl md:hidden"
        >
          <div>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasChildren = !!item.children?.length;
              const isOpen = expanded.has(item.label);

              return (
                <div key={item.label} className="border-b border-[#f0e8dc]">
                  {hasChildren ? (
                    <button
                      type="button"
                      onClick={() => toggle(item.label)}
                      className="flex min-h-[44px] w-full items-center justify-between px-5 py-2.5 text-left text-sm font-semibold text-[#800018] transition hover:bg-[#fff7e8]"
                    >
                      <span className="flex items-center gap-3">
                        {Icon && <Icon className="w-[18px]" />}
                        {item.label}
                      </span>
                      <FaChevronDown
                        className={`text-xs transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href || "/"}
                      onClick={closeMobile}
                      className="flex min-h-[44px] items-center gap-3 px-5 py-2.5 text-sm font-semibold text-[#800018] transition hover:bg-[#fff7e8]"
                    >
                      {Icon && <Icon className="w-[18px]" />}
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

            {/* MOBILE LOGIN BUTTON */}
            <div className="border-b border-[#f0e8dc] p-3">
              <Link
                href="/login"
                onClick={closeMobile}
                className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#e7c875] bg-[#d9b76e] px-5 py-3 text-sm font-bold text-[#650014] shadow-sm transition hover:bg-[#f0d99c]"
              >
                <FaSignInAlt />
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
