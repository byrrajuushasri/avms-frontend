"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaCrown,
  FaPhoneAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menus = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
    {
      name: "Matches",
      path: "/matches",
      icon: <FaUsers />,
    },
    {
      name: "Membership",
      path: "/membership",
      icon: <FaCrown />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <FaPhoneAlt />,
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">

      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-5">

        <div className="flex justify-between items-center h-20">

          {/* LOGO */}

          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >

            <div>
              <h2 className="text-2xl sm:text-2xl font-bold text-rose-700">
                Arya Vysya Matrimonial
              </h2>

              
            </div>

          </Link>

          {/* DESKTOP MENU */}

          <nav className="hidden lg:flex items-center gap-8">

            {menus.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="
                  font-medium
                  text-gray-700
                  hover:text-rose-600
                  transition-all
                  duration-300
                "
              >
                {item.name}
              </Link>
            ))}

          </nav>

          {/* DESKTOP BUTTONS */}

          <div className="hidden lg:flex items-center gap-3">

            <Link
              href="/login"
              className="
                border
                border-rose-600
                text-rose-600
                px-5
                py-2.5
                rounded-xl
                font-medium
                hover:bg-rose-600
                hover:text-white
                transition-all
                duration-300
              "
            >
              Login
            </Link>

            <Link
              href="/register"
              className="
                bg-rose-600
                text-white
                px-5
                py-2.5
                rounded-xl
                font-medium
                hover:bg-rose-700
                shadow-sm
                hover:shadow-md
                transition-all
                duration-300
              "
            >
              Matrimonial Register
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="
              lg:hidden
              w-11
              h-11
              flex
              items-center
              justify-center
              rounded-xl
              bg-rose-50
              text-rose-700
              hover:bg-rose-100
              transition-all
            "
          >
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {menuOpen && (

        <div className="lg:hidden border-t border-gray-100 bg-white">

          <div className="px-4 py-5">

            {/* MOBILE MENU CARD */}

            <div
              className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                overflow-hidden
                shadow-sm
              "
            >

              {/* MENU ITEMS */}

              <div className="p-2">

                {menus.map((item, index) => (

                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={closeMenu}
                    className="
                      flex
                      items-center
                      gap-4
                      px-4
                      py-3.5
                      rounded-xl
                      text-gray-700
                      hover:bg-white
                      hover:text-rose-600
                      hover:shadow-sm
                      transition-all
                      duration-200
                    "
                  >

                    {/* ICON */}

                    <span
                      className="
                        w-9
                        h-9
                        flex
                        items-center
                        justify-center
                        rounded-lg
                        bg-rose-50
                        text-rose-600
                        text-sm
                      "
                    >
                      {item.icon}
                    </span>

                    {/* NAME */}

                    <span className="font-medium text-sm">
                      {item.name}
                    </span>

                  </Link>

                ))}

              </div>

              {/* DIVIDER */}

              <div className="border-t border-gray-200 mx-4" />

              {/* MOBILE ACTIONS */}

              <div className="p-4 space-y-3">

                {/* LOGIN */}

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    py-3
                    rounded-xl
                    border
                    border-rose-600
                    text-rose-600
                    font-semibold
                    text-sm
                    hover:bg-rose-600
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <FaSignInAlt className="text-sm" />
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    py-3
                    rounded-xl
                    bg-rose-600
                    text-white
                    font-semibold
                    text-sm
                    hover:bg-rose-700
                    shadow-sm
                    hover:shadow-md
                    transition-all
                    duration-300
                  "
                >
                  <FaUserPlus className="text-sm" />
                  Matrimonial Register
                </Link>

              </div>

            </div>

            {/* MOBILE FOOTER TEXT */}

             

          </div>

        </div>

      )}

    </header>
  );
}