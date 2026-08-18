"use client";

import Image from "next/image";
import {
  FaEye,
  FaBullseye,
  FaUsers,
  FaHandsHelping,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="bg-white">

      {/* =====================================================
          ABOUT US
      ====================================================== */}
      <section className="py-16 lg:py-20">

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-3xl">
            <Image
              src="/about/about.png"
              alt="Aarya Vysya Mahasabha"
              width={700}
              height={550}
              priority
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          {/* CONTENT */}
          <div>
 
            <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-[#800018] sm:text-4xl">
              Aarya Vysya Mahasabha
            </h1>

            <div className="mt-6 space-y-5 text-[16px] leading-8 text-gray-600">

              <p>
                Aarya Vysya Mahasabha is a community-oriented organization
                committed to the unity, welfare and development of the
                Aarya Vysya community.
              </p>

              <p>
                Our organization provides a common platform for community
                members to connect, support one another and participate in
                social, educational, cultural, spiritual and welfare
                activities.
              </p>

              <p>
                We believe that unity, service and cooperation are the
                foundation of a strong and prosperous community. Through
                collective efforts, we work towards creating opportunities
                and supporting the needs of our community members.
              </p>

            </div>

            
          </div>

        </div>

      </section>


      {/* =====================================================
          VISION & MISSION
      ====================================================== */}
      <section className="border-t border-gray-100 bg-[#fffaf9] py-16 lg:py-20">

        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mb-12 text-center">

            

            <h2 className="mt-3 font-serif text-2xl   text-[#800018] sm:text-2xl">
              Vision & Mission
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-500">
              Working together for the welfare, unity and progress
              of the Aarya Vysya community.
            </p>

          </div>


          {/* Vision & Mission Cards */}
          <div className="grid gap-8 md:grid-cols-2">

            {/* VISION */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f3] text-3xl text-[#800018]">
                <FaEye />
              </div>

              <span className="mt-6 block text-sm font-semibold uppercase tracking-widest text-[#a00018]">
                Our Vision
              </span>

              

              <p className="mt-5 leading-8 text-gray-600">
                Our vision is to build a strong, united and prosperous
                Aarya Vysya community where every member has opportunities
                to grow, contribute and live with dignity.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                We aim to preserve our values, culture and traditions while
                encouraging education, employment, social responsibility
                and community development for future generations.
              </p>

            </div>


            {/* MISSION */}
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4df] text-3xl text-[#a00018]">
                <FaBullseye />
              </div>

              <span className="mt-6 block text-sm font-semibold uppercase tracking-widest text-[#a00018]">
                Our Mission
              </span>

             
              <p className="mt-5 leading-8 text-gray-600">
                Our mission is to connect community members and create a
                platform for cooperation, service and mutual support.
              </p>

              <p className="mt-4 leading-8 text-gray-600">
                We work towards supporting families, encouraging education
                and employment, promoting cultural values and extending
                assistance to people in need through meaningful community
                initiatives.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}