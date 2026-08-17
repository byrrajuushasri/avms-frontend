"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  FaBars,
  FaCalendarAlt,
  FaCrown,
  FaEnvelope,
  FaHeart,
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignInAlt,
  FaStar,
  FaTimes,
  FaUserPlus,
  FaUsers,
  FaChevronDown,
  FaUniversity,
  FaHandsHelping,
  FaPlaceOfWorship,
  FaUtensils,
  FaImages,
} from "react-icons/fa";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  // Mobile dropdown states
  const [electionOpen, setElectionOpen] = useState(false);
  const [welfareOpen, setWelfareOpen] = useState(false);
  const [templesOpen, setTemplesOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

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

  return (
    <header className="w-full bg-white">

      {/* =====================================================
          TOP RED LINE
      ====================================================== */}
      <div className="h-[3px] bg-[#b00018]" />

      {/* =====================================================
          TOP INFORMATION BAR
      ====================================================== */}
      <div className="border-b border-gray-200 bg-[#fafafa]">
        <div className="mx-auto flex h-[30px] max-w-[1900px] items-center justify-between px-5">

          {/* DATE */}
          <div className="flex items-center gap-2 text-[#800018]">
            <FaCalendarAlt className="text-[13px]" />

            <span className="font-serif text-[13px]">
              {today || "Monday, 17 August 2026"}
            </span>
          </div>

          {/* CENTER BRAND */}
          <div className="hidden lg:block">
            <div className="font-serif text-[17px] font-bold tracking-wide text-[#800018]">
              ❧ Telangana State Aarya Vysya Mahasabha ❧
            </div>
          </div>

          {/* CONTACT */}
          <div className="hidden items-center gap-3 text-[#800018] lg:flex">

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
          LOGO / BRAND SECTION
      ====================================================== */}
      <div className="bg-white">

        <div className="mx-auto flex h-[105px] max-w-[1900px] items-center justify-between px-7">

          {/* =================================================
              LEFT LOGO + BRAND + LOGO2
          ================================================== */}
          <div className="flex items-center">

            {/* LOGO 1 */}
            <Link href="/" className="flex items-center">

              <img
                src="/images/logo.png"
                alt="Aarya Vysya Mahasabha"
                className="h-[78px] w-[100px] object-contain"
              />

            </Link>

            {/* BRAND TEXT */}
            <Link
              href="/"
              className="ml-4"
            >

              <h1 className="font-serif text-[28px] font-semibold leading-none tracking-wide text-[#800018]">
                AARYAVYSYA
              </h1>

              <div className="mt-1.5 flex items-center gap-2">

                <span className="text-[17px] text-[#c58b28]">
                  ❧
                </span>

                <h2 className="font-serif text-[24px] font-medium leading-none text-[#800018]">
                  MAHASABHA
                </h2>

                <span className="text-[17px] text-[#c58b28]">
                  ❧
                </span>

              </div>

              <p className="mt-1.5 pl-1 font-serif text-[14px] tracking-[0.15em] text-[#475569]">
                — Together Forever —
              </p>

            </Link>

            {/* LOGO 2 */}
            <img
              src="/images/logo2.png"
              alt="Aarya Vysya"
              className="ml-5 h-[68px] w-[100px] object-contain"
            />

          </div>

          {/* =================================================
              LOGIN / REGISTER
          ================================================== */}
          <div className="hidden items-center gap-5 md:flex">

            {/* LOGIN */}
            <Link
              href="/login"
              className="
                flex
                h-[42px]
                w-[145px]
                items-center
                justify-center
                gap-2
                rounded-lg
                border-2
                border-[#a00018]
                font-serif
                text-[17px]
                text-[#800018]
                transition
                duration-200
                hover:bg-[#a00018]
                hover:text-white
              "
            >
              <FaSignInAlt className="text-[15px]" />

              <span>Login</span>
            </Link>

            {/* REGISTER */}
            <Link
              href="/register"
              className="
                flex
                h-[42px]
                w-[165px]
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-[#ae001b]
                font-serif
                text-[17px]
                text-white
                shadow-md
                transition
                duration-200
                hover:bg-[#880015]
              "
            >
              <FaUserPlus className="text-[15px]" />

              <span>Register</span>
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-2xl text-[#800018] md:hidden"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}
      <div className="hidden bg-[#b0001b] md:block">

        <nav className="mx-auto flex h-[52px] max-w-[1900px] items-stretch px-3">

          {/* HOME */}
          <Link
            href="/"
            className="
              flex flex-1 items-center justify-center gap-2
              border-r border-[#d32a42]
              px-2
              font-serif text-[15px] font-medium text-white
              transition duration-200
              hover:bg-[#8f0016]
            "
          >
            <FaHome className="text-[18px]" />
            <span>Home</span>
          </Link>

          {/* ABOUT */}
          <Link
            href="/about"
            className="
              flex flex-1 items-center justify-center gap-2
              border-r border-[#d32a42]
              px-2
              font-serif text-[15px] font-medium text-white
              transition duration-200
              hover:bg-[#8f0016]
            "
          >
            <FaInfoCircle className="text-[18px]" />
            <span>About</span>
          </Link>

          {/* MEMBERSHIP DROPDOWN */}
                <div className="group relative flex-1 border-r border-[#d32a42]">

                  <button
                    type="button"
                    className="
                      flex h-full w-full items-center justify-center
                      gap-2 px-2
                      font-serif text-[15px] font-medium text-white
                      transition duration-200
                      hover:bg-[#8f0016]
                    "
                  >
                    <FaCrown className="text-[17px]" />

                    <span>Membership</span>

                    <FaChevronDown className="text-[10px]" />
                  </button>

                  {/* MEMBERSHIP DROPDOWN */}
                  <div
                    className="
                      invisible absolute left-0 top-full z-[100]
                      w-[210px]
                      translate-y-2
                      overflow-hidden
                      rounded-b-md
                      bg-white
                      opacity-0
                      shadow-xl
                      transition-all duration-200
                      group-hover:visible
                      group-hover:translate-y-0
                      group-hover:opacity-100
                    "
                  >

                    {/* DISTRICT */}
                    <Link
                      href="/membership/district"
                      className="
                        block border-b border-gray-200
                        px-5 py-3
                        font-serif text-[14px]
                        text-[#800018]
                        hover:bg-[#f8e8c0]
                      "
                    >
                      District
                    </Link>

                    {/* MANDAL */}
                    <Link
                      href="/membership/mandal"
                      className="
                        block border-b border-gray-200
                        px-5 py-3
                        font-serif text-[14px]
                        text-[#800018]
                        hover:bg-[#f8e8c0]
                      "
                    >
                      Mandal
                    </Link>

                    {/* SANGAM */}
                    <Link
                      href="/membership/sangam"
                      className="
                        block
                        px-5 py-3
                        font-serif text-[14px]
                        text-[#800018]
                        hover:bg-[#f8e8c0]
                      "
                    >
                      Sangam
                    </Link>

                  </div>

                </div>

          {/* =================================================
              ELECTION BODY
          ================================================== */}
          <div className="group relative flex-1 border-r border-[#d32a42]">

            <button
              type="button"
              className="
                flex h-full w-full items-center justify-center
                gap-2 px-2
                font-serif text-[15px] font-medium text-white
                transition duration-200
                hover:bg-[#8f0016]
              "
            >
              <FaUniversity className="text-[17px]" />

              <span>Election Body</span>

              <FaChevronDown className="text-[10px]" />
            </button>

            {/* DROPDOWN */}
            <div
              className="
                invisible absolute left-0 top-full z-[100]
                w-[210px]
                translate-y-2
                overflow-hidden
                rounded-b-md
                bg-white
                opacity-0
                shadow-xl
                transition-all duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >

              <Link
                href="/election-body"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
               District
              </Link>

              <Link
                href="/election-body/president"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Mandal
              </Link>

              <Link
                href="/election-body/committee"
                className="
                  block
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Sangam
              </Link>

            </div>
          </div>

         {/* =================================================
    MATRIMONY DROPDOWN
================================================== */}
<div className="group relative flex-1 border-r border-[#d32a42]">

  <button
    type="button"
    className="
      flex h-full w-full items-center justify-center
      gap-2 px-2
      font-serif text-[15px] font-medium text-white
      transition duration-200
      hover:bg-[#8f0016]
    "
  >
    <FaHeart className="text-[17px]" />

    <span>Matrimony</span>

    <FaChevronDown className="text-[10px]" />
  </button>

  {/* MATRIMONY DROPDOWN */}
  <div
    className="
      invisible absolute left-0 top-full z-[100]
      w-[220px]
      translate-y-2
      overflow-hidden
      rounded-b-md
      bg-white
      opacity-0
      shadow-xl
      transition-all duration-200
      group-hover:visible
      group-hover:translate-y-0
      group-hover:opacity-100
    "
  >

    {/* MATRIMONY HOME */}
    <Link
      href="/matrimony"
      className="
        block border-b border-gray-200
        px-5 py-3
        font-serif text-[14px]
        text-[#800018]
        hover:bg-[#f8e8c0]
      "
    >
      Matrimony Home
    </Link>

    {/* SEARCH PROFILES */}
    <Link
      href="/matrimony/search"
      className="
        block border-b border-gray-200
        px-5 py-3
        font-serif text-[14px]
        text-[#800018]
        hover:bg-[#f8e8c0]
      "
    >
      Search Profiles
    </Link>

    {/* NEW PROFILES */}
    <Link
      href="/matrimony/new-profiles"
      className="
        block border-b border-gray-200
        px-5 py-3
        font-serif text-[14px]
        text-[#800018]
        hover:bg-[#f8e8c0]
      "
    >
      New Profiles
    </Link>

    {/* SUCCESS STORIES */}
    <Link
      href="/matrimony/success-stories"
      className="
        block border-b border-gray-200
        px-5 py-3
        font-serif text-[14px]
        text-[#800018]
        hover:bg-[#f8e8c0]
      "
    >
      Success Stories
    </Link>

    {/* REGISTER */}
    <Link
      href="/register"
      className="
        block
        px-5 py-3
        font-serif text-[14px]
        font-semibold
        text-[#800018]
        hover:bg-[#f8e8c0]
      "
    >
      Register Profile
    </Link>

  </div>

</div>

         {/* =================================================
    WELFARE DROPDOWN
================================================== */}
<div className="group relative flex-1 border-r border-[#d32a42]">

  <button
    type="button"
    className="
      flex h-full w-full items-center justify-center
      gap-2 px-2
      font-serif text-[15px] font-medium text-white
      transition duration-200
      hover:bg-[#8f0016]
    "
  >
    <FaHandsHelping className="text-[17px]" />

    <span>Welfare</span>

    <FaChevronDown className="text-[10px]" />
  </button>

  <div
    className="
      invisible absolute left-0 top-full z-[100]
      w-[230px]
      translate-y-2
      overflow-hidden
      rounded-b-md
      bg-white
      opacity-0
      shadow-xl
      transition-all duration-200
      group-hover:visible
      group-hover:translate-y-0
      group-hover:opacity-100
    "
  >

    <Link
      href="/welfare/health"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Health Welfare
    </Link>

    <Link
      href="/welfare/education"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Education
    </Link>

    <Link
      href="/welfare/employment"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Employment
    </Link>

    <Link
      href="/welfare/women"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Women Welfare
    </Link>

    <Link
      href="/welfare/other"
      className="block px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Other Welfare
    </Link>

  </div>

</div>
          {/* =================================================
              TEMPLES
          ================================================== */}
          <div className="group relative flex-1 border-r border-[#d32a42]">

            <button
              type="button"
              className="
                flex h-full w-full items-center justify-center
                gap-2 px-2
                font-serif text-[15px] font-medium text-white
                transition duration-200
                hover:bg-[#8f0016]
              "
            >
              <FaPlaceOfWorship className="text-[17px]" />

              <span>Temples</span>

              <FaChevronDown className="text-[10px]" />
            </button>

            {/* DROPDOWN */}
            <div
              className="
                invisible absolute left-0 top-full z-[100]
                w-[210px]
                translate-y-2
                overflow-hidden
                rounded-b-md
                bg-white
                opacity-0
                shadow-xl
                transition-all duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >

              <Link
                href="/temples"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                All Temples
              </Link>

              <Link
                href="/temples/list"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Temple List
              </Link>

              <Link
                href="/temples/events"
                className="
                  block
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Temple Events
              </Link>

            </div>
          </div>

         {/* =================================================
    ANNADHANAM DROPDOWN
================================================== */}
<div className="group relative flex-1 border-r border-[#d32a42]">

  <button
    type="button"
    className="
      flex h-full w-full items-center justify-center
      gap-2 px-2
      font-serif text-[15px] font-medium text-white
      transition duration-200
      hover:bg-[#8f0016]
    "
  >
    <FaUtensils className="text-[17px]" />

    <span>Annadhanam</span>

    <FaChevronDown className="text-[10px]" />
  </button>

  <div
    className="
      invisible absolute right-0 top-full z-[100]
      w-[230px]
      translate-y-2
      overflow-hidden
      rounded-b-md
      bg-white
      opacity-0
      shadow-xl
      transition-all duration-200
      group-hover:visible
      group-hover:translate-y-0
      group-hover:opacity-100
    "
  >

    
    <Link
      href="/annadhanam/accommodation"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Accommodation
    </Link>

    <Link
      href="/annadhanam/store"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Store
    </Link>

    <Link
      href="/annadhanam/donors"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Donors
    </Link>

    <Link
      href="/annadhanam/mandal"
      className="block border-b border-gray-200 px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Mandal
    </Link>

    <Link
      href="/annadhanam/sangam"
      className="block px-5 py-3 font-serif text-[14px] text-[#800018] hover:bg-[#f8e8c0]"
    >
      Sangam
    </Link>

  </div>

</div>

          {/* =================================================
              MEDIA
          ================================================== */}
          <div className="group relative flex-1 border-r border-[#d32a42]">

            <button
              type="button"
              className="
                flex h-full w-full items-center justify-center
                gap-2 px-2
                font-serif text-[15px] font-medium text-white
                transition duration-200
                hover:bg-[#8f0016]
              "
            >
              <FaImages className="text-[17px]" />

              <span>Media</span>

              <FaChevronDown className="text-[10px]" />
            </button>

            {/* DROPDOWN */}
            <div
              className="
                invisible absolute right-0 top-full z-[100]
                w-[210px]
                translate-y-2
                overflow-hidden
                rounded-b-md
                bg-white
                opacity-0
                shadow-xl
                transition-all duration-200
                group-hover:visible
                group-hover:translate-y-0
                group-hover:opacity-100
              "
            >

              <Link
                href="/media/photos"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Photos
              </Link>

              <Link
                href="/media/videos"
                className="
                  block border-b border-gray-200
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Videos
              </Link>

              <Link
                href="/media/news"
                className="
                  block
                  px-5 py-3
                  font-serif text-[14px]
                  text-[#800018]
                  hover:bg-[#f8e8c0]
                "
              >
                Events
              </Link>

            </div>
          </div>

          {/* CONTACT */}
          <Link
            href="/contact"
            className="
              flex flex-1 items-center justify-center gap-2
              px-2
              font-serif text-[15px] font-medium text-white
              transition duration-200
              hover:bg-[#8f0016]
            "
          >
            <FaPhoneAlt className="text-[17px]" />
            <span>Contact</span>
          </Link>

        </nav>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {open && (
        <div className="border-t border-gray-200 bg-white shadow-lg md:hidden">

          {/* HOME */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaHome />
            Home
          </Link>

          {/* ABOUT */}
          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaInfoCircle />
            About
          </Link>

          {/* MEMBERSHIP */}
          <Link
            href="/membership"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaCrown />
            Membership
          </Link>

          {/* MOBILE ELECTION */}
          <div className="border-b border-gray-200">

            <button
              type="button"
              onClick={() => setElectionOpen(!electionOpen)}
              className="
                flex w-full items-center justify-between
                px-5 py-3
                font-serif text-base text-[#800018]
              "
            >
              <span className="flex items-center gap-3">
                <FaUniversity />
                Election Body
              </span>

              <FaChevronDown
                className={`transition-transform ${
                  electionOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {electionOpen && (
              <div className="bg-[#faf5e8]">

                <Link
                  href="/election-body"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Election Body
                </Link>

                <Link
                  href="/election-body/president"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  President
                </Link>

                <Link
                  href="/election-body/committee"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Committee Members
                </Link>

              </div>
            )}
          </div>

          {/* MATRIMONY */}
          <Link
            href="/matrimony"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaHeart />
            Matrimony
          </Link>

          {/* MOBILE WELFARE */}
          <div className="border-b border-gray-200">

            <button
              type="button"
              onClick={() => setWelfareOpen(!welfareOpen)}
              className="
                flex w-full items-center justify-between
                px-5 py-3
                font-serif text-base text-[#800018]
              "
            >
              <span className="flex items-center gap-3">
                <FaHandsHelping />
                Welfare
              </span>

              <FaChevronDown
                className={`transition-transform ${
                  welfareOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {welfareOpen && (
              <div className="bg-[#faf5e8]">

                <Link
                  href="/welfare"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Welfare Programs
                </Link>

                <Link
                  href="/welfare/schemes"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Welfare Schemes
                </Link>

                <Link
                  href="/welfare/services"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Welfare Services
                </Link>

              </div>
            )}
          </div>

          {/* MOBILE TEMPLES */}
          <div className="border-b border-gray-200">

            <button
              type="button"
              onClick={() => setTemplesOpen(!templesOpen)}
              className="
                flex w-full items-center justify-between
                px-5 py-3
                font-serif text-base text-[#800018]
              "
            >
              <span className="flex items-center gap-3">
                <FaPlaceOfWorship />
                Temples
              </span>

              <FaChevronDown
                className={`transition-transform ${
                  templesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {templesOpen && (
              <div className="bg-[#faf5e8]">

                <Link
                  href="/temples"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  All Temples
                </Link>

                <Link
                  href="/temples/list"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Temple List
                </Link>

                <Link
                  href="/temples/events"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Temple Events
                </Link>

              </div>
            )}
          </div>

          {/* ANNADHANAM */}
          <Link
            href="/annadhanam"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaUtensils />
            Annadhanam
          </Link>

          {/* MOBILE MEDIA */}
          <div className="border-b border-gray-200">

            <button
              type="button"
              onClick={() => setMediaOpen(!mediaOpen)}
              className="
                flex w-full items-center justify-between
                px-5 py-3
                font-serif text-base text-[#800018]
              "
            >
              <span className="flex items-center gap-3">
                <FaImages />
                Media
              </span>

              <FaChevronDown
                className={`transition-transform ${
                  mediaOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mediaOpen && (
              <div className="bg-[#faf5e8]">

                <Link
                  href="/media/photos"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Photos
                </Link>

                <Link
                  href="/media/videos"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  Videos
                </Link>

                <Link
                  href="/media/news"
                  className="block px-12 py-2.5 text-sm text-[#800018]"
                >
                  News
                </Link>

              </div>
            )}
          </div>

          {/* CONTACT */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              border-b border-gray-200
              px-5 py-3
              font-serif text-base text-[#800018]
            "
          >
            <FaPhoneAlt />
            Contact
          </Link>

          {/* MOBILE LOGIN / REGISTER */}
          <div className="grid grid-cols-2 gap-3 p-3">

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="
                flex items-center justify-center gap-2
                rounded-lg
                border-2 border-[#9e0018]
                py-2.5
                text-sm font-semibold
                text-[#800018]
              "
            >
              <FaSignInAlt />
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="
                flex items-center justify-center gap-2
                rounded-lg
                bg-[#ae001b]
                py-2.5
                text-sm font-semibold
                text-white
              "
            >
              <FaUserPlus />
              Register
            </Link>

          </div>

        </div>
      )}

    </header>
  );
}