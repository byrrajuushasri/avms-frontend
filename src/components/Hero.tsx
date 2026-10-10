
"use client";

import Link from "next/link";
import {
  FaHeart,
  FaUsers,
  FaUserPlus,
  FaShieldAlt,
  FaUserCheck,
  FaHandsHelping,
  FaGem,
} from "react-icons/fa";

const matrimonyFeatures = [
  {
    icon: FaUserCheck,
    title: "Verified Profiles",
    description:
      "Connect with genuine Arya Vysya bride and groom profiles.",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy & Security",
    description:
      "Your personal and family details are handled with care.",
  },
  {
    icon: FaUsers,
    title: "Family Values",
    description:
      "Bringing families together with shared values and traditions.",
  },
  {
    icon: FaHandsHelping,
    title: "Easy Connections",
    description:
      "Find suitable life partners with ease and confidence.",
  },
];

export default function Hero() {
  return (
    <main className="bg-white">


{/* HERO SECTION - WHITE BACKGROUND */}
<section className="relative overflow-hidden bg-white py-8 text-[#690015] sm:py-10 lg:py-12">
  <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-4xl text-center">

      {/* Badge */}
      <span className="inline-flex items-center gap-2 rounded-full border border-[#ead8a5] bg-[#fffaf0] px-3 py-1.5 text-xs font-medium text-[#690015] sm:text-sm">
        <FaHeart className="text-[#a67816]" />
        Trusted Arya Vysya Matrimony
      </span>

      {/* Heading */}
      <h1 className="mt-4 font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
        ఆర్య వైశ్య వివాహ
        <span className="mt-1 block text-[#a67816]">
          ఉచిత పరిచయ వేదిక
        </span>
      </h1>

      <div className="mx-auto mt-4 h-[2px] w-16 bg-[#d9a928]" />

      {/* Description */}
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#5c4141] sm:text-base">
        ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక 31-10-2014 నుండి ప్రారంభించబడినది.
      </p>

      {/* Register Button */}
      <div className="mt-5 flex justify-center">
        <Link
          href="/register"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#690015] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a3475b]"
        >
          <FaUserPlus />
          Register Free
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[#ead8a5] pt-5 sm:gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
            90%
          </h2>
          <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
            Brides' Marriages
          </p>
        </div>

        <div className="border-x border-[#ead8a5] px-1">
          <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
            75–80%
          </h2>
          <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
            Grooms' Marriages
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
            143వ
          </h2>
          <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
            Matrimony Meet
          </p>
        </div>
      </div>

    </div>
  </div>
</section>



      {/* MATRIMONY INTRODUCTION SECTION - TEXT ONLY */}
      <section className="bg-white py-14 sm:py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="mx-auto max-w-3xl text-center">

            <p className="font-serif text-xs font-bold tracking-[0.2em] text-[#a67816] sm:text-sm">
              CHAMPAPET AARYA VYSYA SANGHAM
            </p>

            <h2 className="mt-3 font-serif text-2xl font-bold leading-tight text-[#690015] sm:text-3xl md:text-4xl">
              Aarya Vysya Marriage Free Introduction Platform
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d9a928]" />

            <p className="mt-5 text-sm leading-7 text-[#5c4141] sm:text-base">
              A free matrimonial introduction platform created especially
              for Aarya Vysya families. Connect with genuine bride and groom
              profiles and take the first step towards finding a suitable
              life partner while respecting family values and traditions.
            </p>
          </div>

          {/* Matrimony Services - No Image */}
          <div className="mx-auto mt-12 max-w-5xl rounded-2xl border border-[#ead8a5] bg-[#fffaf0] p-5 sm:p-8 md:p-10">

            {/* Family Message */}
            <div className="text-center">
              <FaHeart className="mx-auto text-3xl text-[#a67816]" />

              <h3 className="mt-3 font-serif text-xl font-bold text-[#690015] sm:text-2xl">
                Bringing Families Together
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#5c4141] sm:text-base">
                Trust, tradition and meaningful matrimonial connections.
              </p>
            </div>

            <div className="mx-auto mt-7 h-[2px] w-20 bg-[#d9a928]" />

            {/* Service Description */}
            <div className="mt-7 text-center">
              <p className="font-serif text-xs font-bold tracking-[0.2em] text-[#a67816] sm:text-sm">
                TRUST • TRADITION • FAMILY
              </p>

              <h3 className="mt-3 font-serif text-2xl font-bold text-[#690015] sm:text-3xl">
                Aarya Vysya Matrimony Services
              </h3>

              <div className="mx-auto mt-4 h-[2px] w-20 bg-[#d9a928]" />

              <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-[#5c4141] sm:text-base">
                Our free matrimonial introduction service helps Aarya Vysya
                brides and grooms connect with suitable life partners.
                The platform is designed to bring families together while
                respecting traditional values, family preferences and
                meaningful relationships.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {matrimonyFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex items-start gap-4 rounded-xl border border-[#ead8a5] bg-white p-4 transition duration-300 hover:border-[#d9a928] hover:shadow-md sm:p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#690015] text-lg text-[#f5d36c] transition-colors group-hover:bg-[#d9a928] group-hover:text-[#690015]">
                      <Icon />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#690015] sm:text-base">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs leading-6 text-[#6b5151] sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Registration Button */}
            <div className="mt-9 flex justify-center">
              <Link
                href="/register"
                className="flex min-h-[50px] w-full max-w-xs items-center justify-center gap-3 rounded-lg border-2 border-[#690015] px-6 py-3 font-serif text-sm font-bold text-[#690015] transition duration-300 hover:bg-[#690015] hover:text-white sm:w-auto sm:px-8"
              >
                <FaUserPlus className="text-base" />
                REGISTER NOW
              </Link>
            </div>

            {/* Trust Message */}
            <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[#806d61] sm:text-sm">
              <FaGem className="shrink-0 text-[#b18a43]" />

              <span>
                Free registration • Trust • Tradition • Family values.
              </span>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
