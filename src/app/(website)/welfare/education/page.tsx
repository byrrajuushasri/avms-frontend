import Image from "next/image";
import Link from "next/link";

import {
  FaGraduationCap,
  FaBook,
  FaAward,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function EducationWelfarePage() {
  const initiatives = [
    {
      icon: FaGraduationCap,
      title: "Educational Support",
      description:
        "Supporting deserving students from the community in pursuing their educational goals.",
    },
    {
      icon: FaAward,
      title: "Scholarships",
      description:
        "Encouraging academic excellence through scholarship and financial assistance programs.",
    },
    {
      icon: FaBook,
      title: "Learning Resources",
      description:
        "Helping students access books, study materials and other educational resources.",
    },
    {
      icon: FaUserGraduate,
      title: "Student Development",
      description:
        "Promoting skill development, career awareness and opportunities for young students.",
    },
    {
      icon: FaChalkboardTeacher,
      title: "Educational Guidance",
      description:
        "Providing guidance and encouragement to students and families for better education planning.",
    },
    {
      icon: FaCheckCircle,
      title: "Community Initiatives",
      description:
        "Supporting educational programs that contribute to the long-term development of the community.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#fffaf0]">

     
      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="grid items-center gap-10 md:grid-cols-2">

            {/* LEFT */}
            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
                Our Commitment
              </p>

              <h2 className="mt-2 font-serif text-2xl font-bold text-[#690015] md:text-3xl">
                Education for a Better Future
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
                Education plays an important role in the growth and progress
                of individuals, families and communities. Our education welfare
                initiatives aim to encourage students to pursue their studies
                and achieve their aspirations.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
                Through scholarships, educational assistance, learning
                resources and guidance, we strive to create better
                opportunities for deserving students.
              </p>

            </div>

            {/* RIGHT CARD */}
            <div className="rounded-2xl border border-[#ead9b5] bg-white p-7 shadow-sm">

              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff1cf]">
                  <FaGraduationCap className="text-2xl text-[#8b1025]" />
                </div>

                <div>

                  <h3 className="font-serif text-lg font-bold text-[#690015]">
                    Education First
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Supporting students and encouraging educational growth.
                  </p>

                </div>

              </div>

              <div className="mt-6 h-px bg-[#ead9b5]" />

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-lg bg-[#fffaf0] p-4">
                  <FaBook className="text-xl text-[#9b1730]" />
                  <p className="mt-2 text-sm font-semibold text-[#690015]">
                    Learning
                  </p>
                </div>

                <div className="rounded-lg bg-[#fffaf0] p-4">
                  <FaAward className="text-xl text-[#9b1730]" />
                  <p className="mt-2 text-sm font-semibold text-[#690015]">
                    Scholarships
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          INITIATIVES
      ====================================================== */}
      <section className="bg-white py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
              Education Welfare Activities
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#690015] md:text-3xl">
              Our Education Initiatives
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Creating opportunities for students through educational support,
              scholarships, resources and guidance.
            </p>

          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {initiatives.map((item, index) => {

              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group rounded-xl border border-[#ead9b5] bg-[#fffaf0] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#d6ad45] hover:shadow-md"
                >

                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#690015]">
                    <Icon className="text-xl text-[#f1c84b]" />
                  </div>

                  <h3 className="mt-5 font-serif text-lg font-bold text-[#690015]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          SCHOLARSHIP SECTION
      ====================================================== */}
      <section className="py-14">

        <div className="mx-auto max-w-6xl px-6">

          <div className="overflow-hidden rounded-2xl bg-[#690015]">

            <div className="grid md:grid-cols-2">

              {/* CONTENT */}
              <div className="p-8 md:p-10">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                  Student Support
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                  Encouraging Academic Excellence
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  We believe that every deserving student should have the
                  opportunity to learn, grow and pursue their ambitions.
                  Educational welfare programs can help students overcome
                  financial and other challenges.
                </p>

                <div className="mt-6">

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-md bg-[#f1c84b] px-5 py-2.5 text-sm font-semibold text-[#690015] transition hover:bg-white"
                  >
                    Contact Us
                    <FaArrowRight className="text-xs" />
                  </Link>

                </div>

              </div>

              {/* POINTS */}
              <div className="bg-[#7b1025] p-8 md:p-10">

                <h3 className="font-serif text-lg font-bold text-white">
                  Our Focus Areas
                </h3>

                <div className="mt-6 space-y-4">

                  {[
                    "Scholarship and financial assistance",
                    "Educational resources and study materials",
                    "Student career guidance",
                    "Academic encouragement",
                    "Skill development opportunities",
                    "Community education programs",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >

                      <FaCheckCircle className="mt-0.5 shrink-0 text-[#f1c84b]" />

                      <span className="text-sm leading-6 text-white/90">
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="border-t border-[#ead9b5] bg-[#fff1d0] py-10">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <FaGraduationCap className="mx-auto text-3xl text-[#690015]" />

          <h2 className="mt-3 font-serif text-xl font-bold text-[#690015]">
            Building a Stronger Community Through Education
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Education • Opportunity • Empowerment • Development
          </p>

        </div>

      </section>

    </main>
  );
}