"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaHeart,
  FaQuoteLeft,
  FaRing,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

const successStories = [
  {
    id: 1,
    bride: "Sravani",
    groom: "Karthik",
    marriageDate: "12 June 2025",
    location: "Hyderabad",
    image: "/images/couple12.jpg",
    story:
      "We found each other through Arya Vysya Matrimony. Our families connected immediately and everything happened beautifully with the blessings of our elders.",
  },
  {
    id: 2,
    bride: "Keerthana",
    groom: "Sai Kiran",
    marriageDate: "24 August 2025",
    location: "Vijayawada",
    image: "/images/couple11.jpg",
    story:
      "We are very happy to have found our life partners through Arya Vysya Matrimony. The platform made our search simple, comfortable and trustworthy.",
  },
  {
    id: 3,
    bride: "Harika",
    groom: "Vamshi",
    marriageDate: "18 October 2025",
    location: "Visakhapatnam",
    image: "/images/couple1.jpg",
    story:
      "Our families were looking for a suitable match with similar values. Arya Vysya Matrimony helped us meet and begin a wonderful journey together.",
  },
  {
    id: 4,
    bride: "Pooja",
    groom: "Rohit",
    marriageDate: "7 December 2025",
    location: "Bengaluru",
    image: "/images/couple12.jpg",
    story:
      "From the first conversation to our wedding day, everything felt special. We are thankful to Arya Vysya Matrimony for bringing us together.",
  },
  {
    id: 5,
    bride: "Divya",
    groom: "Praveen",
    marriageDate: "15 January 2026",
    location: "Hyderabad",
    image: "/images/couple11.jpg",
    story:
      "We wanted a match who understood our family values and traditions. We found exactly that through Arya Vysya Matrimony.",
  },
  {
    id: 6,
    bride: "Anusha",
    groom: "Naveen",
    marriageDate: "22 February 2026",
    location: "Chennai",
    image: "/images/couple1.jpg",
    story:
      "Our journey started with a simple profile connection and turned into a beautiful relationship. We are grateful for this wonderful platform.",
  },
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#fffaf7]">

    
 

      {/* =====================================================
          SUCCESS STORIES
      ===================================================== */}

      <section className="bg-[#fffaf7] py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-[#fdf0d5] px-5 py-2 text-sm font-semibold text-[#8b651e]">
              <FaHeart />
              Happy Couples
            </span>

            <h2 className="mt-4 text-3xl font-bold text-[#7f1020] sm:text-4xl">
              Our Beautiful Success Stories
            </h2>

          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {successStories.map((couple) => (
              <article
                key={couple.id}
                className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* IMAGE */}

                <div className="relative h-72 w-full overflow-hidden bg-gray-100">

                  <Image
                    src={couple.image}
                    alt={`${couple.bride} and ${couple.groom}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">

                    <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-[#7f1020] shadow">
                      <FaHeart className="text-[#c21f3a]" />
                      Happily Married
                    </div>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div className="flex items-center justify-center gap-3">

                    <h3 className="text-xl font-bold text-[#7f1020]">
                      {couple.bride}
                    </h3>

                    <FaHeart className="text-[#c21f3a]" />

                    <h3 className="text-xl font-bold text-[#7f1020]">
                      {couple.groom}
                    </h3>

                  </div>

                  {/* Stars */}

                  <div className="mt-3 flex justify-center gap-1 text-[#e4ae28]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>

                  {/* Date */}

                  <div className="mt-5 flex flex-wrap justify-center gap-3 text-sm text-gray-500">

                    <span className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#a11d30]" />
                      {couple.marriageDate}
                    </span>

                    <span className="text-gray-300">
                      |
                    </span>

                    <span>
                      {couple.location}
                    </span>

                  </div>

                  {/* Quote */}

                  <div className="relative mt-6 border-t border-gray-100 pt-6">

                    <FaQuoteLeft className="absolute left-0 top-6 text-2xl text-[#ead7a4]" />

                    <p className="pl-8 text-sm leading-7 text-gray-600">
                      {couple.story}
                    </p>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="bg-[#7f1020] py-14">

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="grid gap-8 text-center sm:grid-cols-3">

            <div>
              <div className="text-4xl font-bold text-[#f5c84c]">
                1000+
              </div>

              <p className="mt-2 text-white/90">
                Happy Families
              </p>
            </div>

            <div className="border-white/20 sm:border-x">
              <div className="text-4xl font-bold text-[#f5c84c]">
                500+
              </div>

              <p className="mt-2 text-white/90">
                Successful Matches
              </p>
            </div>

            <div>
              <div className="text-4xl font-bold text-[#f5c84c]">
                100%
              </div>

              <p className="mt-2 text-white/90">
                Trusted Connections
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fdf0d5]">
            <FaHeart className="text-3xl text-[#a11d30]" />
          </div>

          <h2 className="mt-6 text-3xl font-bold text-[#7f1020] sm:text-4xl">
            Your Beautiful Story Could Be Next
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-600">
            Begin your journey today and find a life partner who shares your
            values, traditions and dreams.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#9f1d2e] px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#7f1020] hover:shadow-lg"
            >
              Register Now
              <FaArrowRight />
            </Link>

            <Link
              href="/search"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#9f1d2e] px-7 py-3.5 font-semibold text-[#9f1d2e] transition hover:bg-[#9f1d2e] hover:text-white"
            >
              Find Your Match
              <FaArrowRight />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}