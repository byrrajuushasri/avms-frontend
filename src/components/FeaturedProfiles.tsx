"use client";

import Link from "next/link";
import {
  FaHeart,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const profiles = [
  {
    id: "AVM1001",
    name: "Priya",
    age: 24,
    height: "5'4\"",
    education: "M.Tech",
    profession: "Software Engineer",
    location: "Hyderabad",
    image: "/images/bride1.jpg",
  },
  {
    id: "AVM1002",
    name: "Harsha",
    age: 28,
    height: "5'9\"",
    education: "MBA",
    profession: "Business",
    location: "Vijayawada",
    image: "/images/bride2.jpg",
  },
  {
    id: "AVM1003",
    name: "Sowmya",
    age: 25,
    height: "5'5\"",
    education: "B.Tech",
    profession: "Doctor",
    location: "Visakhapatnam",
    image: "/images/bride1.jpg",
  },
  {
    id: "AVM1004",
    name: "Karthik",
    age: 29,
    height: "5'10\"",
    education: "MS",
    profession: "Engineer",
    location: "Bangalore",
    image: "/images/bride3.jpg",
  },
  {
    id: "AVM1005",
    name: "Lakshmi",
    age: 23,
    height: "5'3\"",
    education: "MCA",
    profession: "Designer",
    location: "Guntur",
    image: "/images/bride1.jpg",
  },
  {
    id: "AVM1006",
    name: "Rahul",
    age: 30,
    height: "5'11\"",
    education: "CA",
    profession: "Chartered Accountant",
    location: "Hyderabad",
    image: "/images/bride3.jpg",
  },
  {
    id: "AVM1007",
    name: "Divya",
    age: 26,
    height: "5'4\"",
    education: "BDS",
    profession: "Dentist",
    location: "Rajahmundry",
    image: "/images/groom1.jpg",
  },
  {
    id: "AVM1008",
    name: "Sai",
    age: 27,
    height: "5'8\"",
    education: "M.Sc",
    profession: "Manager",
    location: "Tirupati",
    image: "/images/groom2.jpg",
  },
];

export default function FeaturedProfiles() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50/40">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-[#8B1E3F] text-sm font-semibold">
            <FaHeart className="text-rose-500" />
            Featured Members
          </span>

         <h2 className="text-center text-2xl  text-[#8B1E3F] mb-8">
            Meet Our Featured Profiles
          </h2>

          <p className="mt-4 text-gray-500 text-sm sm:text-base leading-7">
            Discover verified Arya Vysya bride and groom profiles
            looking for a meaningful and lifelong relationship.
          </p>

        </div>

        {/* PROFILE GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="
                group
                bg-white
                rounded-2xl
                overflow-hidden
                border border-gray-100
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              {/* IMAGE */}
              <div className="relative h-72 overflow-hidden bg-gray-100">

                <img
                  src={profile.image}
                  alt={profile.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-500
                  "
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                {/* VERIFIED */}
                <div className="
                  absolute
                  top-4
                  left-4
                  inline-flex
                  items-center
                  gap-1.5
                  bg-white/95
                  backdrop-blur-sm
                  text-green-600
                  px-3
                  py-1.5
                  rounded-full
                  text-xs
                  font-semibold
                  shadow-sm
                ">
                  <FaCheckCircle />
                  Verified
                </div>

                {/* HEART */}
                <button
                  type="button"
                  aria-label={`Like ${profile.name}`}
                  className="
                    absolute
                    top-4
                    right-4
                    w-9
                    h-9
                    rounded-full
                    bg-white/95
                    flex
                    items-center
                    justify-center
                    text-gray-500
                    hover:text-rose-600
                    hover:scale-105
                    transition
                    shadow-sm
                  "
                >
                  <FaHeart className="text-sm" />
                </button>

                {/* MEMBER ID */}
                <span className="
                  absolute
                  bottom-4
                  left-4
                  text-white
                  text-xs
                  font-medium
                  tracking-wide
                ">
                  {profile.id}
                </span>

              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* NAME */}
                <div className="flex items-center gap-2">

                  <h3 className="text-xl font-bold text-gray-800">
                    {profile.name}
                  </h3>

                  <FaCheckCircle className="text-green-500 text-sm" />

                </div>

                {/* AGE / HEIGHT */}
                <p className="mt-2 text-sm text-gray-500">
                  {profile.age} Years
                  <span className="mx-2 text-gray-300">•</span>
                  {profile.height}
                </p>

                {/* DETAILS */}
                <div className="mt-4 space-y-2.5">

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="
                      w-8
                      h-8
                      rounded-lg
                      bg-rose-50
                      flex
                      items-center
                      justify-center
                      text-rose-600
                    ">
                      <FaGraduationCap />
                    </span>

                    <span className="truncate">
                      {profile.education}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="
                      w-8
                      h-8
                      rounded-lg
                      bg-rose-50
                      flex
                      items-center
                      justify-center
                      text-rose-600
                    ">
                      <FaBriefcase />
                    </span>

                    <span className="truncate">
                      {profile.profession}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="
                      w-8
                      h-8
                      rounded-lg
                      bg-rose-50
                      flex
                      items-center
                      justify-center
                      text-rose-600
                    ">
                      <FaMapMarkerAlt />
                    </span>

                    <span className="truncate">
                      {profile.location}
                    </span>
                  </div>

                </div>

                {/* VIEW PROFILE */}
                <Link
                  href={`/profile/${profile.id}`}
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    w-full
                    py-3
                    rounded-xl
                     bg-rose-600 hover: bg-rose-700
                    text-white
                    text-sm
                    font-semibold
                    
                    transition
                  "
                >
                  View Profile
                  <FaArrowRight className="text-xs" />
                </Link>

              </div>

            </div>
          ))}

        </div>

        {/* VIEW ALL */}
        <div className="flex justify-center mt-12">

  <Link
    href="/matches"
    className="
      inline-flex
      items-center
      gap-2
      px-7
      py-3
      rounded-xl
      border-2
      border-rose-600
      text-rose-600
      font-semibold
      bg-white
      hover:bg-rose-600
      hover:text-white
      hover:border-rose-600
      transition-all
      duration-300
      shadow-sm
      hover:shadow-lg
    "
  >
    View All Profiles
    <FaArrowRight className="text-sm" />
  </Link>

</div>
      </div>
    </section>
  );
}