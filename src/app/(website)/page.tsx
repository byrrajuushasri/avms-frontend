"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaArrowRight,
  FaUsers,
  FaHeart,
  FaBookOpen,
  FaUniversity,
  FaUtensils,
  FaHandshake,
  FaUserPlus,
  FaShieldAlt,
} from "react-icons/fa";

export default function HomePage() {
  const services = [
    {
      icon: FaUsers,
      title: "STRONG",
      title2: "COMMUNITY",
      description: "Building a united and strong community",
    },
    {
      icon: FaHeart,
      title: "SOCIAL",
      title2: "WELFARE",
      description: "Serving the society with compassion",
    },
    {
      icon: FaBookOpen,
      title: "EDUCATION",
      title2: "SUPPORT",
      description: "Encouraging education and scholarships",
    },
    {
      icon: FaUniversity,
      title: "TEMPLE",
      title2: "SERVICES",
      description: "Preserving traditions and spiritual values",
    },
    {
      icon: FaUtensils,
      title: "ANNADHANAM",
      title2: "& CHARITY",
      description: "Serving food and helping those in need",
    },
    {
      icon: FaHandshake,
      title: "UNITY",
      title2: "& GROWTH",
      description: "Working together for a better tomorrow",
    },
  ];

  const matrimonyFeatures = [
    {
      icon: FaUsers,
      title: "Verified Profiles",
      description: "Genuine and verified member profiles",
    },
    {
      icon: FaHeart,
      title: "Suitable Matches",
      description: "Find compatible life partners",
    },
    {
      icon: FaShieldAlt,
      title: "Privacy & Security",
      description: "Your personal information is protected",
    },
    {
      icon: FaHandshake,
      title: "Family Support",
      description: "Trusted connections between families",
    },
  ];

  const programs = [
    {
      icon: FaUsers,
      title: "Community Meetings",
      description:
        "Regular meetings and gatherings for community development and welfare.",
    },
    {
      icon: FaHeart,
      title: "Social Welfare",
      description:
        "Supporting families and individuals through various welfare activities.",
    },
    {
      icon: FaBookOpen,
      title: "Educational Support",
      description:
        "Encouraging students through educational programs and scholarships.",
    },
    {
      icon: FaUniversity,
      title: "Temple Services",
      description:
        "Supporting temple activities and preserving our spiritual traditions.",
    },
    {
      icon: FaUtensils,
      title: "Annadhanam & Charity",
      description:
        "Providing food and support to people in need through charitable activities.",
    },
    {
      icon: FaHandshake,
      title: "Community Development",
      description:
        "Working together to create better opportunities for future generations.",
    },
  ];

  return (
    <main className="w-full bg-[#fff8e8]">

      {/* =====================================================
          HERO BANNER
      ====================================================== */}

   <section className="relative w-full overflow-hidden">

  {/* =====================================================
      BANNER
  ====================================================== */}
  <div
    className="
      relative
      h-[500px]
      w-full
      sm:h-[520px]
      md:h-[580px]
      lg:h-[600px]
    "
  >

    {/* BACKGROUND IMAGE */}
    <Image
      src="/images/home1-banner.png"
      alt="Aarya Vysya Mahasabha"
      fill
      priority
      sizes="100vw"
      className="
        object-cover
        object-[65%_center]
        sm:object-center
      "
    />

    {/* LEFT OVERLAY */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-r
        from-[#57000f]/90
        via-[#57000f]/55
        to-[#57000f]/10
      "
    />

    {/* MOBILE EXTRA OVERLAY */}
    <div
      className="
        absolute inset-0
        bg-[#57000f]/20
        sm:bg-transparent
      "
    />

    {/* BOTTOM OVERLAY */}
    <div
      className="
        absolute inset-x-0 bottom-0
        h-24
        bg-gradient-to-t
        from-[#57000f]/75
        to-transparent
        sm:h-32
      "
    />

    {/* =====================================================
        HERO CONTENT
    ====================================================== */}
    <div
      className="
        relative z-10
        mx-auto
        flex h-full
        max-w-[1450px]
        items-center
        px-5
        sm:px-7
        md:px-10
        lg:px-16
      "
    >

      <div
        className="
          w-full
          max-w-[760px]
          text-center
          lg:text-left
        "
      >

        {/* =================================================
            TELANGANA STATE
        ================================================== */}
        <div
          className="
            mb-3
            flex
            items-center
            justify-center
            gap-2
            sm:mb-4
            sm:gap-3
            lg:justify-start
          "
        >

          <span
            className="
              hidden
              h-[1px]
              w-10
              bg-[#e8b735]
              sm:block
              md:w-16
            "
          />

          <span
            className="
              font-serif
              text-[11px]
              font-medium
              tracking-[0.14em]
              text-[#f4d06f]
              sm:text-sm
              md:text-base
            "
          >
            TELANGANA STATE
          </span>

          <span
            className="
              hidden
              h-[1px]
              w-10
              bg-[#e8b735]
              sm:block
              md:w-16
            "
          />

        </div>

        {/* =================================================
            MAIN HEADING
        ================================================== */}
        <h2
          className="
            font-serif
            text-[27px]
           
            uppercase
            leading-tight
            tracking-wide
            text-white
            drop-shadow-lg
            sm:text-2xl
            md:text-3xl
            lg:text-4xl
          "
        >
          AARYA VYSYA  MAHASABHA
        
        </h2>

        {/* =================================================
            TOGETHER FOREVER
        ================================================== */}
        <div
          className="
            my-4
            flex
            items-center
            justify-center
            gap-2
            sm:my-5
            sm:gap-3
            lg:justify-start
          "
        >

          <span
            className="
              h-[1px]
              w-8
              bg-[#e8b735]
              sm:w-12
              md:w-20
            "
          />

          <span
            className="
              whitespace-nowrap
              font-serif
              text-[12px]
              text-[#f4d06f]
              sm:text-sm
              md:text-lg
            "
          >
            ❧ Together Forever ❧
          </span>

          <span
            className="
              h-[1px]
              w-8
              bg-[#e8b735]
              sm:w-12
              md:w-20
            "
          />

        </div>

        {/* =================================================
            KEYWORDS
        ================================================== */}
        <div
          className="
            mb-4
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-2
            gap-y-1
            font-serif
            text-[9px]
            font-bold
            tracking-[0.15em]
            text-white
            sm:gap-x-3
            sm:text-xs
            md:text-sm
            lg:justify-start
          "
        >

          <span>UNITY</span>

          <span className="text-[#f4d06f]">|</span>

          <span>SERVICE</span>

          <span className="text-[#f4d06f]">|</span>

          <span>WELFARE</span>

          <span className="text-[#f4d06f]">|</span>

          <span>DEVELOPMENT</span>

        </div>

        {/* =================================================
            DESCRIPTION
        ================================================== */}
        <p
          className="
            mx-auto
            max-w-[600px]
            text-[12px]
            leading-5
            text-white/95
            sm:text-sm
            sm:leading-6
            md:text-base
            md:leading-7
            lg:mx-0
          "
        >
          Dedicated to the unity, welfare, service, development and
          overall progress of the Aarya Vysya community.
        </p>

        {/* =================================================
            BUTTONS
        ================================================== */}
        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            gap-3
            sm:mt-6
            sm:flex-row
            sm:flex-wrap
            sm:gap-4
            lg:justify-start
          "
        >

          {/* KNOW MORE */}
          <Link
            href="/about"
            className="
              group
              flex
              w-[170px]
              items-center
              justify-center
              gap-2
              rounded-sm
              bg-[#f1c84b]
              px-5
              py-2.5
              font-serif
              text-xs
              font-semibold
              text-[#650014]
              shadow-md
              transition
              duration-300
              hover:bg-white
              hover:shadow-lg
              sm:w-auto
              sm:px-6
              sm:py-3
              sm:text-sm
            "
          >
            KNOW MORE

            <FaArrowRight
              className="
                text-[11px]
                transition-transform
                group-hover:translate-x-1
              "
            />
          </Link>

          {/* BECOME MEMBER */}
          <Link
            href="/membership"
            className="
              group
              flex
              w-[170px]
              items-center
              justify-center
              gap-2
              rounded-sm
              border
              border-[#f1c84b]
              bg-[#650014]/40
              px-5
              py-2.5
              font-serif
              text-xs
              font-semibold
              text-white
              backdrop-blur-sm
              transition
              duration-300
              hover:bg-[#f1c84b]
              hover:text-[#650014]
              sm:w-auto
              sm:border-2
              sm:px-6
              sm:py-3
              sm:text-sm
            "
          >
            BECOME A MEMBER

            <FaUserPlus
              className="
                text-[11px]
                transition-transform
                group-hover:scale-110
              "
            />
          </Link>

        </div>

      </div>
    </div>

    {/* =====================================================
        BOTTOM CURVE
    ====================================================== */}
    <div className="absolute bottom-[-1px] left-0 right-0">

      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="
          h-[42px]
          w-full
          sm:h-[55px]
          md:h-[70px]
        "
      >

        <path
          d="
            M0,70
            C280,10 500,100 760,60
            C1050,15 1200,90 1440,45
            L1440,100
            L0,100
            Z
          "
          fill="#fff8e8"
        />

      </svg>

    </div>

  </div>
</section>

      {/* =====================================================
          SERVICES
      ====================================================== */}

      <section className="bg-[#fff8e8]">

        <div className="mx-auto max-w-[1450px] px-4 pb-6 md:px-8">

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

            {services.map((service, index) => {

              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className={`
                    group
                    px-4
                    py-7
                    text-center
                    transition-all
                    duration-300
                    hover:bg-[#fff1c9]

                    ${
                      index !== services.length - 1
                        ? "lg:border-r lg:border-[#d9b86c]"
                        : ""
                    }
                  `}
                >

                  <div className="mb-4 flex justify-center">

                    <Icon className="text-[34px] text-[#7d1020] transition-transform duration-300 group-hover:scale-110 md:text-[40px]" />

                  </div>

                  <h3 className="font-serif text-sm font-semibold leading-tight text-[#6e0d1b] md:text-base">

                    {service.title}

                    <br />

                    {service.title2}

                  </h3>

                  <p className="mx-auto mt-3 max-w-[190px] text-xs leading-5 text-[#4b2727]">

                    {service.description}

                  </p>

                </div>
              );
            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          MATRIMONY
      ====================================================== */}

      <section className="bg-white py-16 md:py-20">

        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-16">

          {/* Heading */}

          <div className="mx-auto max-w-3xl text-center">

            <p className="font-serif text-xs font-semibold tracking-[0.18em] text-[#a67816]">
              AARYA VYSYA MATRIMONY
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#690015] md:text-3xl">
              Find Your Perfect Life Partner
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d9a928]" />

            <p className="mt-5 leading-7 text-[#5c4141]">
              A trusted matrimonial platform created especially for
              Aarya Vysya families. Find genuine profiles and suitable
              life partners while respecting family values and traditions.
            </p>

          </div>


          {/* Matrimony content */}

          <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">

            {/* Image */}

            <div className="relative overflow-hidden rounded-3xl shadow-xl">

              <Image
                src="/about/about-img2.png"
                alt="Aarya Vysya Matrimony"
                width={900}
                height={600}
                className="h-[330px] w-full object-cover md:h-[450px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#690015]/70 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">

                <div className="rounded-xl bg-[#690015]/90 p-5 text-center backdrop-blur-sm">

                  <h3 className="font-serif text-lg font-semibold text-[#f5d36c]">
                    Together Towards a Beautiful Future
                  </h3>

                  <p className="mt-2 text-sm text-white">
                    Connecting families with trust and tradition.
                  </p>

                </div>

              </div>

            </div>


            {/* Content */}

            <div>

              <p className="font-serif text-sm font-bold tracking-[0.2em] text-[#a67816]">
                TRUST • TRADITION • FAMILY
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold text-[#690015]">
                Trusted Matrimony Services
              </h3>

              <div className="mt-4 h-[2px] w-20 bg-[#d9a928]" />

              <p className="mt-5 leading-8 text-[#5c4141]">
                Our matrimonial service helps Aarya Vysya brides and grooms
                connect with suitable life partners while respecting family
                traditions, values and preferences.
              </p>


              {/* Features */}

              <div className="mt-7 grid gap-4 sm:grid-cols-2">

                {matrimonyFeatures.map((item, index) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-xl border border-[#ead8a5] bg-[#fffaf0] p-4 transition hover:-translate-y-1 hover:shadow-md"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#690015] text-xl text-[#f5d36c]">
                        <Icon />
                      </div>

                      <div>

                        <h4 className="font-serif text-sm font-semibold text-[#690015]">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-xs text-[#6b5151]">
                          {item.description}
                        </p>

                      </div>

                    </div>
                  );

                })}

              </div>


              {/* Buttons */}

              <div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/search"
                  className="flex items-center gap-3 rounded-lg bg-[#690015] px-7 py-3.5 font-serif font-bold text-[#f5d36c] transition hover:bg-[#f1c84b] hover:text-[#690015]"
                >
                  <FaUsers />
                  SEARCH PROFILES
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-3 rounded-lg border-2 border-[#690015] px-7 py-3.5 font-serif text-sm font-semibold text-[#690015] transition hover:bg-[#690015] hover:text-white"
                >
                  <FaUserPlus />
                  REGISTER NOW
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          COMMUNITY PROGRAMS
      ====================================================== */}

      <section className="bg-[#fff8e8] py-16 md:py-20">

        <div className="mx-auto max-w-[1450px] px-6 md:px-10 lg:px-16">

          <div className="text-center">

            <p className="font-serif text-xs font-semibold tracking-[0.18em] text-[#a67816]">
              COMMUNITY PROGRAMS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#690015] md:text-3xl">
              Our Activities & Services
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d9a928]" />

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#5c4141]">
              Dedicated activities designed to support our community,
              preserve our traditions and create a better future.
            </p>

          </div>


          {/* Program cards */}

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {programs.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group flex gap-5 rounded-2xl border border-[#ead8a5] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#690015] text-2xl text-[#f5d36c] transition group-hover:bg-[#f1c84b] group-hover:text-[#690015]">
                    <Icon />
                  </div>

                  <div>

                    <h3 className="font-serif text-lg font-semibold text-[#690015]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#5c4141]">
                      {item.description}
                    </p>

                  </div>

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}

      <section className="bg-white py-16 md:py-20">

        <div className="mx-auto max-w-[1200px] px-6">

          <div className="text-center">

            <p className="font-serif text-xs font-semibold tracking-[0.18em] text-[#a67816]">
              WHY CHOOSE US
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#690015] md:text-3xl">
              Trust, Tradition & Service
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-20 bg-[#d9a928]" />

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-2xl bg-[#fff8e8] p-8 text-center shadow-sm">

              <FaShieldAlt className="mx-auto text-4xl text-[#690015]" />

              <h3 className="mt-5 font-serif text-lg font-semibold text-[#690015]">
                Trusted & Secure
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4141]">
                We value privacy, trust and security in every service we provide.
              </p>

            </div>


            <div className="rounded-2xl bg-[#fff8e8] p-8 text-center shadow-sm">

              <FaHeart className="mx-auto text-4xl text-[#690015]" />

              <h3 className="mt-5 font-serif text-lg font-semibold text-[#690015]">
                Family Values
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4141]">
                Respecting our culture, traditions and family values.
              </p>

            </div>


            <div className="rounded-2xl bg-[#fff8e8] p-8 text-center shadow-sm">

              <FaHandshake className="mx-auto text-4xl text-[#690015]" />

              <h3 className="mt-5 font-serif text-lg font-semibold text-[#690015]">
                Community First
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#5c4141]">
                Working together for the welfare and development of our community.
              </p>

            </div>

          </div>

        </div>

      </section>


     

       

    </main>
  );
}