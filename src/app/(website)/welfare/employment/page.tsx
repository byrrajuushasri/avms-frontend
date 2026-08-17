import Image from "next/image";
import Link from "next/link";

import {
  FaBriefcase,
  FaUserTie,
  FaSearch,
  FaGraduationCap,
  FaHandshake,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

export default function EmploymentWelfarePage() {
  const initiatives = [
    {
      icon: FaBriefcase,
      title: "Job Opportunities",
      description:
        "Helping community members discover suitable employment opportunities across different sectors.",
    },
    {
      icon: FaUserTie,
      title: "Career Guidance",
      description:
        "Providing guidance and useful information to students, graduates and job seekers.",
    },
    {
      icon: FaSearch,
      title: "Job Search Support",
      description:
        "Connecting job seekers with suitable employment opportunities and career resources.",
    },
    {
      icon: FaGraduationCap,
      title: "Skill Development",
      description:
        "Encouraging professional skills and continuous learning for better career opportunities.",
    },
    {
      icon: FaHandshake,
      title: "Employer Support",
      description:
        "Encouraging connections between employers and qualified members of the community.",
    },
    {
      icon: FaCheckCircle,
      title: "Career Development",
      description:
        "Supporting individuals in building sustainable careers and achieving professional growth.",
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
                Creating Employment Opportunities
              </h2>

              <p className="mt-5 text-sm leading-7 text-gray-600 md:text-base">
                Employment and professional development play an important role
                in building financially independent individuals and stronger
                families.
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-600 md:text-base">
                Our employment welfare initiatives focus on helping community
                members identify suitable career opportunities, improve their
                skills and connect with useful professional resources.
              </p>

            </div>

            {/* RIGHT CARD */}
            <div className="rounded-2xl border border-[#ead9b5] bg-white p-7 shadow-sm">

              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff1cf]">
                  <FaBriefcase className="text-2xl text-[#8b1025]" />
                </div>

                <div>

                  <h3 className="font-serif text-lg font-bold text-[#690015]">
                    Career First
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Encouraging employment, skills and professional growth.
                  </p>

                </div>

              </div>

              <div className="mt-6 h-px bg-[#ead9b5]" />

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div className="rounded-lg bg-[#fffaf0] p-4">
                  <FaSearch className="text-xl text-[#9b1730]" />

                  <p className="mt-2 text-sm font-semibold text-[#690015]">
                    Job Search
                  </p>
                </div>

                <div className="rounded-lg bg-[#fffaf0] p-4">
                  <FaGraduationCap className="text-xl text-[#9b1730]" />

                  <p className="mt-2 text-sm font-semibold text-[#690015]">
                    Skills
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          EMPLOYMENT INITIATIVES
      ====================================================== */}
      <section className="bg-white py-14 md:py-16">

        <div className="mx-auto max-w-6xl px-6">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b1730]">
              Employment Welfare Activities
            </p>

            <h2 className="mt-2 font-serif text-2xl font-bold text-[#690015] md:text-3xl">
              Our Employment Initiatives
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Supporting job seekers and professionals through opportunities,
              guidance, skills and community connections.
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
          CAREER SUPPORT
      ====================================================== */}
      <section className="py-14">

        <div className="mx-auto max-w-6xl px-6">

          <div className="overflow-hidden rounded-2xl bg-[#690015]">

            <div className="grid md:grid-cols-2">

              {/* CONTENT */}
              <div className="p-8 md:p-10">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f1c84b]">
                  Career Support
                </p>

                <h2 className="mt-2 font-serif text-2xl font-bold text-white">
                  Building Better Career Opportunities
                </h2>

                <p className="mt-4 text-sm leading-7 text-white/80">
                  We believe that access to suitable employment and career
                  guidance can help individuals become self-reliant and
                  contribute positively to their families and community.
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

              {/* FOCUS AREAS */}
              <div className="bg-[#7b1025] p-8 md:p-10">

                <h3 className="font-serif text-lg font-bold text-white">
                  Our Focus Areas
                </h3>

                <div className="mt-6 space-y-4">

                  {[
                    "Employment opportunities",
                    "Career guidance and counselling",
                    "Job search assistance",
                    "Skill development programs",
                    "Professional networking",
                    "Employer and job seeker connections",
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
          BOTTOM MESSAGE
      ====================================================== */}
      <section className="border-t border-[#ead9b5] bg-[#fff1d0] py-10">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <FaBriefcase className="mx-auto text-3xl text-[#690015]" />

          <h2 className="mt-3 font-serif text-xl font-bold text-[#690015]">
            Empowering People Through Employment
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Opportunity • Skills • Employment • Growth
          </p>

        </div>

      </section>

    </main>
  );
}