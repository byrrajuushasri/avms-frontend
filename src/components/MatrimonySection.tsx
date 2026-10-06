
"use client";

import Image from "next/image";
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
    description: "Connect with genuine matrimonial profiles.",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy & Security",
    description: "Your personal details are handled with care.",
  },
  {
    icon: FaUsers,
    title: "Family Values",
    description: "Bringing families together with shared traditions.",
  },
  {
    icon: FaHandsHelping,
    title: "Easy Connections",
    description: "Find suitable matches with ease and confidence.",
  },
];

export default function InterestButtons() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1450px] px-5 sm:px-6 md:px-10 lg:px-16">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-xs font-bold tracking-[0.2em] text-[#a67816] sm:text-sm">
            AARYA VYSYA MATRIMONY
          </p>

          <h2 className="mt-3 font-serif text-2xl font-bold text-[#690015] sm:text-3xl md:text-4xl">
            Find Your Perfect Life Partner
          </h2>

          <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d9a928]" />

          <p className="mt-5 text-sm leading-7 text-[#5c4141] sm:text-base">
            A trusted matrimonial platform created especially for
            Aarya Vysya families. Find genuine profiles and suitable
            life partners while respecting family values and traditions.
          </p>
        </div>

        {/* Matrimony Content */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Image */}
          <div className="group relative overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/about/about-img2.png"
              alt="Aarya Vysya Matrimony"
              width={900}
              height={600}
              priority
              className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[400px] md:h-[450px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#690015]/80 via-[#690015]/10 to-transparent" />

            {/* Image Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <div className="rounded-xl border border-[#f5d36c]/40 bg-[#690015]/90 p-4 text-center backdrop-blur-sm sm:p-6">
                <FaHeart className="mx-auto mb-2 text-2xl text-[#f5d36c]" />

                <h3 className="font-serif text-lg font-bold text-[#f5d36c] sm:text-xl">
                  Together Towards a Beautiful Future
                </h3>

                <p className="mt-2 text-xs text-white sm:text-sm">
                  Connecting families with trust and tradition.
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <p className="font-serif text-xs font-bold tracking-[0.2em] text-[#a67816] sm:text-sm">
              TRUST • TRADITION • FAMILY
            </p>

            <h3 className="mt-3 font-serif text-2xl font-bold text-[#690015] sm:text-3xl">
              Trusted Matrimony Services
            </h3>

            <div className="mt-4 h-[2px] w-20 bg-[#d9a928]" />

            <p className="mt-5 text-sm leading-8 text-[#5c4141] sm:text-base">
              Our matrimonial service helps Aarya Vysya brides and
              grooms connect with suitable life partners while
              respecting family traditions, values and preferences.
              We aim to make your search for a life partner simple
              and meaningful.
            </p>

            {/* Features */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {matrimonyFeatures.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group flex items-center gap-3 rounded-xl border border-[#ead8a5] bg-[#fffaf0] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#d9a928] hover:shadow-lg sm:gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#690015] text-lg text-[#f5d36c] transition duration-300 group-hover:bg-[#d9a928] group-hover:text-[#690015] sm:h-12 sm:w-12 sm:text-xl">
                      <Icon />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-serif text-sm font-bold text-[#690015]">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-5 text-[#6b5151]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href=" "
                className="flex min-h-[50px] items-center justify-center gap-3 rounded-lg bg-[#690015] px-6 py-3 font-serif text-sm font-bold text-[#f5d36c] shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#f1c84b] hover:text-[#690015] hover:shadow-lg sm:px-7"
              >
                <FaUsers className="text-base" />
                SEARCH PROFILES
              </Link>

              <Link
                href="/register"
                className="flex min-h-[50px] items-center justify-center gap-3 rounded-lg border-2 border-[#690015] px-6 py-3 font-serif text-sm font-bold text-[#690015] transition duration-300 hover:-translate-y-1 hover:bg-[#690015] hover:text-white sm:px-7"
              >
                <FaUserPlus className="text-base" />
                REGISTER NOW
              </Link>
            </div>

            {/* Small trust text */}
            <div className="mt-6 flex items-center gap-2 text-xs text-[#806d61]">
              <FaGem className="shrink-0 text-[#b18a43]" />
              <span>Tradition, trust and meaningful connections.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}