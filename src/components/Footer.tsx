import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#800018] text-[#fffaf0]">
      {/* =====================================================
          TOP GOLD LINE
      ====================================================== */}
      <div className="h-[4px] bg-[#d4a72c]" />

      {/* =====================================================
          FOOTER MAIN
      ====================================================== */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">

        {/* =====================================================
            ABOUT
        ====================================================== */}
        <div>
          <h2 className="mb-4 font-serif text-2xl font-bold tracking-wide text-[#f1d27a]">
            AARYA VYSYA
            <br />
            MAHASABHA
          </h2>

          <p className="leading-7 text-[#f8e8c8]">
            Telangana State Aarya Vysya Mahasabha is dedicated to the
            unity, welfare, development and overall progress of the
            Aarya Vysya community.
          </p>

          <p className="mt-3 leading-7 text-[#f8e8c8]">
            Together we work for community welfare, education, service,
            cultural activities and social development.
          </p>

          {/* SOCIAL MEDIA */}
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018] transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018] transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018] transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018] transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* =====================================================
            QUICK LINKS
        ====================================================== */}
        <div>
          <h3 className="mb-5 border-b border-[#b98b25] pb-2 font-serif text-xl font-semibold text-[#f1d27a]">
            Quick Links
          </h3>

          <ul className="space-y-3">
            {[
              { label: "Home", href: "/" },
              { label: "About Us", href: "/about" },
              { label: "Membership", href: "/membership" },
              { label: "Executive Bodies", href: "/executive-bodies" },
              { label: "Matrimony", href: "/matrimony" },
              { label: "Welfare", href: "/welfare" },
              { label: "Temples", href: "/temples" },
              { label: "Annadhanam", href: "/annadhanam" },
              { label: "Media", href: "/media" },
              { label: "Contact Us", href: "/contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-[#f8e8c8] transition hover:text-[#f1d27a]"
                >
                  <FaChevronRight className="text-[9px] transition-transform group-hover:translate-x-1" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =====================================================
            COMMUNITY SERVICES
        ====================================================== */}
        <div>
          <h3 className="mb-5 border-b border-[#b98b25] pb-2 font-serif text-xl font-semibold text-[#f1d27a]">
            Community Services
          </h3>

          <ul className="space-y-3">
            {[
              {
                label: "Community Welfare",
                href: "/welfare",
              },
              {
                label: "Education & Scholarships",
                href: "/education",
              },
              {
                label: "Annadhanam",
                href: "/annadhanam",
              },
              {
                label: "Temple Services",
                href: "/temples",
              },
              {
                label: "Matrimony Services",
                href: "/matrimony",
              },
              {
                label: "Community Membership",
                href: "/membership",
              },
              {
                label: "Community Media",
                href: "/media",
              },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center gap-2 text-[#f8e8c8] transition hover:text-[#f1d27a]"
                >
                  <FaChevronRight className="text-[9px] transition-transform group-hover:translate-x-1" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* =====================================================
            CONTACT
        ====================================================== */}
        <div>
          <h3 className="mb-5 border-b border-[#b98b25] pb-2 font-serif text-xl font-semibold text-[#f1d27a]">
            Contact Us
          </h3>

          <div className="space-y-6 text-[#f8e8c8]">

            {/* PHONE */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018]">
                <FaPhoneAlt className="text-sm" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Phone
                </p>

                <a
                  href="tel:+919876543210"
                  className="mt-1 block transition hover:text-[#f1d27a]"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018]">
                <FaEnvelope className="text-sm" />
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-white">
                  Email
                </p>

                <a
                  href="mailto:info@aryavysyamatrimony.com"
                  className="mt-1 block break-all transition hover:text-[#f1d27a]"
                >
                  info@aryavysyamatrimony.com
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1d27a] text-[#800018]">
                <FaMapMarkerAlt className="text-sm" />
              </div>

              <div>
                <p className="font-semibold text-white">
                  Address
                </p>

                <p className="mt-1 leading-6">
                  Hyderabad,
                  <br />
                  Telangana,
                  <br />
                  India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          DECORATIVE DIVIDER
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-px bg-[#a87d20]" />
      </div>

      {/* =====================================================
          COMMUNITY TAGLINE
      ====================================================== */}
      <div>
        <div className="mx-auto max-w-7xl px-6 py-6 text-center">
          <p className="font-serif text-lg tracking-[0.25em] text-[#f1d27a] sm:text-xl">
            ❧ TOGETHER FOREVER ❧
          </p>

          <p className="mt-2 text-sm text-[#f8e8c8]">
            Unity • Service • Welfare • Development
          </p>
        </div>
      </div>

      {/* =====================================================
          COPYRIGHT
      ====================================================== */}
      <div className="border-t border-[#a87d20] bg-[#6d0015]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 text-center md:flex-row md:px-6 md:text-left">

          <p className="text-sm text-[#ead9b5]">
            © {new Date().getFullYear()} Aarya Vysya Mahasabha.
            All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#ead9b5]">
            <Link
              href="/privacy-policy"
              className="transition hover:text-[#f1d27a]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="transition hover:text-[#f1d27a]"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/refund-policy"
              className="transition hover:text-[#f1d27a]"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}