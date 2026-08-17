import Image from "next/image";
import Link from "next/link";

import {
  FaHeartbeat,
  FaUserMd,
  FaHandHoldingHeart,
  FaCheckCircle,
  FaArrowRight,
  FaStethoscope,
  FaHospital,
  FaNotesMedical,
} from "react-icons/fa";

export default function HealthWelfarePage() {
  const services = [
    {
      icon: FaUserMd,
      title: "Medical Support",
      description:
        "Assistance and guidance for community members requiring medical care and treatment.",
    },
    {
      icon: FaHeartbeat,
      title: "Health Awareness",
      description:
        "Promoting awareness about preventive healthcare, healthy living and regular checkups.",
    },
    {
      icon: FaHandHoldingHeart,
      title: "Community Care",
      description:
        "Extending care and support to individuals and families facing health-related difficulties.",
    },
  ];

  const initiatives = [
    "Health awareness programs",
    "Medical assistance and guidance",
    "Preventive health awareness",
    "Support for families in need",
    "Community healthcare initiatives",
    "Encouragement of healthy living",
  ];

  return (
    <main className="min-h-screen bg-[#fffaf0] text-[#3d2525]">




      {/* =====================================================
          INTRODUCTION
      ====================================================== */}

      <section className="py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">

            {/* Content */}

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
                Our Commitment
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#650014] md:text-3xl">
                Caring for Our Community
              </h2>

              <div className="mt-4 h-[2px] w-14 bg-[#d7a928]" />

              <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
                Health and well-being are essential to building a strong and
                supportive community. Aarya Vysya Mahasabha is committed to
                encouraging health awareness and extending support to community
                members whenever assistance is needed.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
                Through community initiatives, awareness programs and
                compassionate assistance, we aim to create a healthier and
                more caring environment for individuals and families.
              </p>

            </div>


            {/* Highlight Card */}

            <div className="rounded-2xl border border-[#ead9b5] bg-white p-7 shadow-sm">

              <div className="flex items-start gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff2d2]">
                  <FaHeartbeat className="text-2xl text-[#8a1025]" />
                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9b1730]">
                    Community Health
                  </p>

                  <h3 className="mt-1 font-serif text-xl font-semibold text-[#650014]">
                    Health First
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Encouraging awareness, care and support for healthier
                    community families.
                  </p>

                </div>

              </div>

              <div className="mt-6 border-t border-[#eee0c2] pt-5">

                <div className="flex items-center gap-3 text-sm text-gray-600">

                  <FaCheckCircle className="text-[#9b1730]" />

                  <span>
                    Care with compassion
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HEALTH INITIATIVES
      ====================================================== */}

      <section className="border-y border-[#eee1c5] bg-white py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          {/* Heading */}

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
              What We Do
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#650014] md:text-3xl">
              Health Welfare Initiatives
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Community-focused initiatives designed to encourage health,
              awareness and compassionate support.
            </p>

          </div>


          {/* Cards */}

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            {services.map((service, index) => {

              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="group rounded-xl border border-[#eadfca] bg-[#fffdf8] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#d7a928] hover:shadow-lg"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#690015] transition group-hover:bg-[#8a1025]">

                    <Icon className="text-xl text-[#f1c84b]" />

                  </div>

                  <h3 className="mt-5 font-serif text-lg font-semibold text-[#650014]">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {service.description}
                  </p>

                  <div className="mt-5 h-[2px] w-8 bg-[#d7a928] transition-all duration-300 group-hover:w-14" />

                </div>
              );

            })}

          </div>

        </div>

      </section>


      {/* =====================================================
          OUR APPROACH
      ====================================================== */}

      <section className="py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid gap-8 md:grid-cols-3">

            {/* Card 1 */}

            <div className="rounded-xl bg-[#fff3d7] p-7">

              <FaStethoscope className="text-3xl text-[#8a1025]" />

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#650014]">
                Health Awareness
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Encouraging community members to understand the importance
                of preventive care and healthy habits.
              </p>

            </div>


            {/* Card 2 */}

            <div className="rounded-xl bg-[#fff3d7] p-7">

              <FaHospital className="text-3xl text-[#8a1025]" />

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#650014]">
                Medical Assistance
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Supporting individuals and families who require assistance
                during health-related challenges.
              </p>

            </div>


            {/* Card 3 */}

            <div className="rounded-xl bg-[#fff3d7] p-7">

              <FaNotesMedical className="text-3xl text-[#8a1025]" />

              <h3 className="mt-4 font-serif text-lg font-semibold text-[#650014]">
                Community Care
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Building a caring community where members stand together
                during difficult circumstances.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          INITIATIVES LIST
      ====================================================== */}

      <section className="bg-[#650014] py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-10 md:grid-cols-2">

            {/* Left */}

            <div className="text-white">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                Community Care
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold md:text-3xl">
                Together for Better Health
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">
                A healthy community is built through awareness, compassion
                and collective support. Our welfare activities aim to make
                meaningful contributions to the well-being of community
                families.
              </p>

            </div>


            {/* Right */}

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">

              <div className="grid gap-4 sm:grid-cols-2">

                {initiatives.map((item) => (

                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >

                    <FaCheckCircle className="mt-0.5 shrink-0 text-[#f1c84b]" />

                    <span className="text-sm leading-6 text-white/85">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="bg-[#fff3d7] py-12">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
            Aarya Vysya Mahasabha
          </p>

          <h2 className="mt-2 font-serif text-xl font-semibold text-[#650014] md:text-2xl">
            Together We Can Build a Healthier Community
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Unity, service and compassion help us create a stronger future
            for every member of our community.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">

             
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 rounded-lg border border-[#650014] px-6 py-3 text-sm font-semibold text-[#650014] transition hover:bg-[#650014] hover:text-white"
            >
              Become a Member
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER STRIP
      ====================================================== */}
 
    </main>
  );
}