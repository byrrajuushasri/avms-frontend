import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">

        {/* =====================================================
            ABOUT / COMPANY
        ====================================================== */}
        <div>

          <h2 className="mb-4 font-serif text-2xl font-bold tracking-wide text-[#f1d27a]">
            AARYA VYSYA MAHASABHA
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
              className="flex h-10 w-10 items-center justify-center rounded-full
              bg-[#f1d27a] text-[#800018]
              transition duration-200
              hover:bg-white hover:text-[#800018]"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full
              bg-[#f1d27a] text-[#800018]
              transition duration-200
              hover:bg-white hover:text-[#800018]"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full
              bg-[#f1d27a] text-[#800018]
              transition duration-200
              hover:bg-white hover:text-[#800018]"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full
              bg-[#f1d27a] text-[#800018]
              transition duration-200
              hover:bg-white hover:text-[#800018]"
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

          <ul className="space-y-3 text-[#f8e8c8]">

            <li>
              <Link
                href="/"
                className="transition hover:text-[#f1d27a]"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition hover:text-[#f1d27a]"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/membership"
                className="transition hover:text-[#f1d27a]"
              >
                Membership
              </Link>
            </li>

            <li>
              <Link
                href="/election-body"
                className="transition hover:text-[#f1d27a]"
              >
                Election Body
              </Link>
            </li>

            <li>
              <Link
                href="/matrimony"
                className="transition hover:text-[#f1d27a]"
              >
                Matrimony
              </Link>
            </li>

            <li>
              <Link
                href="/welfare"
                className="transition hover:text-[#f1d27a]"
              >
                Welfare
              </Link>
            </li>

            <li>
              <Link
                href="/temples"
                className="transition hover:text-[#f1d27a]"
              >
                Temples
              </Link>
            </li>

            <li>
              <Link
                href="/annadhanam"
                className="transition hover:text-[#f1d27a]"
              >
                Annadhanam
              </Link>
            </li>

            <li>
              <Link
                href="/media"
                className="transition hover:text-[#f1d27a]"
              >
                Media
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition hover:text-[#f1d27a]"
              >
                Contact Us
              </Link>
            </li>

          </ul>
        </div>

        {/* =====================================================
            COMMUNITY SERVICES
        ====================================================== */}
        <div>

          <h3 className="mb-5 border-b border-[#b98b25] pb-2 font-serif text-xl font-semibold text-[#f1d27a]">
            Community Services
          </h3>

          <ul className="space-y-3 text-[#f8e8c8]">

            <li>
              <Link
                href="/welfare"
                className="transition hover:text-[#f1d27a]"
              >
                Community Welfare
              </Link>
            </li>

            <li>
              <Link
                href="/education"
                className="transition hover:text-[#f1d27a]"
              >
                Education & Scholarships
              </Link>
            </li>

            <li>
              <Link
                href="/annadhanam"
                className="transition hover:text-[#f1d27a]"
              >
                Annadhanam
              </Link>
            </li>

            <li>
              <Link
                href="/temples"
                className="transition hover:text-[#f1d27a]"
              >
                Temple Services
              </Link>
            </li>

            <li>
              <Link
                href="/matrimony"
                className="transition hover:text-[#f1d27a]"
              >
                Matrimony Services
              </Link>
            </li>

            <li>
              <Link
                href="/membership"
                className="transition hover:text-[#f1d27a]"
              >
                Community Membership
              </Link>
            </li>

            <li>
              <Link
                href="/media"
                className="transition hover:text-[#f1d27a]"
              >
                Community Media
              </Link>
            </li>

          </ul>
        </div>

        {/* =====================================================
            CONTACT
        ====================================================== */}
        <div>

          <h3 className="mb-5 border-b border-[#b98b25] pb-2 font-serif text-xl font-semibold text-[#f1d27a]">
            Contact Us
          </h3>

          <div className="space-y-5 text-[#f8e8c8]">

            {/* PHONE */}
            <div className="flex items-start gap-3">

              <FaPhoneAlt className="mt-1 text-[#f1d27a]" />

              <div>
                <p className="font-semibold text-white">
                  Phone
                </p>

                <p className="mt-1">
                  +91 98765 43210
                </p>
              </div>

            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-3">

              <FaEnvelope className="mt-1 text-[#f1d27a]" />

              <div>
                <p className="font-semibold text-white">
                  Email
                </p>

                <p className="mt-1 break-all">
                  info@aryavysyamatrimony.com
                </p>
              </div>

            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-3">

              <FaMapMarkerAlt className="mt-1 text-[#f1d27a]" />

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
          COMMUNITY TAGLINE
      ====================================================== */}
      <div className="border-t border-[#a87d20]">

        <div className="mx-auto max-w-7xl px-6 py-5 text-center">

          <p className="font-serif text-lg tracking-widest text-[#f1d27a]">
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

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 md:flex-row">

          <p className="text-sm text-[#ead9b5]">
            © 2026 Aarya Vysya Mahasabha. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-[#ead9b5]">

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