import Image from "next/image";
import {
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaHandshake,
  FaCheckCircle,
  FaGraduationCap,
  FaHandsHelping,
  FaPrayingHands,
  FaUtensils,
  FaBuilding,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="bg-[#fffaf9]">
 
      {/* =====================================================
          ABOUT SECTION
      ====================================================== */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

          {/* IMAGE */}
          <div>
            <Image
              src="/about/about.png"
              alt="Aarya Vysya Mahasabha"
              width={600}
              height={500}
              className="rounded-3xl shadow-2xl"
            />
          </div>

          {/* CONTENT */}
          <div>

            <span className="font-semibold uppercase tracking-widest text-[#a00018]">
              Who We Are
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#800018]">
              Aarya Vysya Mahasabha
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Aarya Vysya Mahasabha is a community-oriented organization
              dedicated to the unity, welfare, development and overall
              progress of the Aarya Vysya community.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              The Mahasabha works with the objective of bringing community
              members together and providing support through various social,
              educational, cultural, spiritual and welfare activities.
            </p>

            <p className="mt-5 leading-8 text-gray-600">
              We believe that unity, service and cooperation are the
              foundation for building a strong and prosperous community
              for present and future generations.
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl bg-[#fff4df] p-4">
                <FaUsers className="text-2xl text-[#a00018]" />
                <h3 className="mt-2 font-semibold text-[#800018]">
                  Community Unity
                </h3>
              </div>

              <div className="rounded-xl bg-[#fff4df] p-4">
                <FaHandsHelping className="text-2xl text-[#a00018]" />
                <h3 className="mt-2 font-semibold text-[#800018]">
                  Social Welfare
                </h3>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          OUR OBJECTIVES
      ====================================================== */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <span className="font-semibold uppercase tracking-widest text-[#a00018]">
              Our Objectives
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#800018]">
              Working for Community Welfare
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-gray-500">
              Our activities are focused on strengthening the community
              and supporting its members through meaningful service.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: <FaUsers />,
                title: "Community Unity",
                desc: "Promote unity, cooperation and brotherhood among Aarya Vysya community members.",
              },
              {
                icon: <FaGraduationCap />,
                title: "Education",
                desc: "Encourage education and support deserving students and families.",
              },
              {
                icon: <FaHandsHelping />,
                title: "Social Welfare",
                desc: "Support poor and economically weaker families through welfare activities.",
              },
              {
                icon: <FaHeart />,
                title: "Family Welfare",
                desc: "Support families and encourage healthy relationships within the community.",
              },
              {
                icon: <FaPrayingHands />,
                title: "Culture & Spirituality",
                desc: "Preserve traditions, culture, spiritual values and community heritage.",
              },
              {
                icon: <FaUtensils />,
                title: "Annadhanam",
                desc: "Encourage charitable activities and Annadhanam programs for people in need.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-[#fff7f8] p-7 shadow transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#800018] text-2xl text-white">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          OUR MISSION
      ====================================================== */}
      <section className="bg-[#fff7f8] py-16">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <span className="font-semibold uppercase tracking-widest text-[#a00018]">
            Our Mission
          </span>

          <h2 className="mt-3 font-serif text-3xl font-bold text-black md:text-4xl">
            Together for a Stronger Community
          </h2>

          <p className="mt-6 leading-8 text-black/90">
            Our mission is to create a strong and united community by
            connecting people, supporting families, encouraging education
            and employment, preserving our cultural heritage and extending
            help to those in need.
          </p>

          <p className="mt-5 leading-8 text-black/90">
            We strive to provide a platform where community members can
            participate, contribute and work together for the welfare and
            development of society.
          </p>

          <div className="mt-8 text-2xl font-semibold text-[#a00018]">
            Together Forever
          </div>

        </div>

      </section>

      {/* =====================================================
          COMMUNITY SERVICES
      ====================================================== */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <span className="font-semibold uppercase tracking-widest text-[#a00018]">
              Our Services
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#800018]">
              Serving the Community
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                icon: <FaBuilding />,
                title: "Community Development",
              },
              {
                icon: <FaGraduationCap />,
                title: "Education Support",
              },
              {
                icon: <FaPrayingHands />,
                title: "Temple & Spiritual Activities",
              },
              {
                icon: <FaUtensils />,
                title: "Annadhanam & Charity",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white p-7 text-center shadow-lg transition hover:shadow-xl"
              >

                <div className="flex justify-center text-4xl text-[#a00018]">
                  {item.icon}
                </div>

                <h3 className="mt-4 font-semibold text-gray-800">
                  {item.title}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          LEADERSHIP TEAM
      ====================================================== */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <span className="font-semibold uppercase tracking-widest text-[#a00018]">
              Leadership
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#800018]">
              Our Leadership Team
            </h2>

            <p className="mt-3 text-gray-500">
              Meet the dedicated leaders serving the Aarya Vysya community.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {[
              {
                img: "/about/president.jpg",
                name: "Sri Raman Rao",
                role: "President",
              },
              {
                img: "/about/vice-president.jpg",
                name: "Sri Srinivas",
                role: "Vice President",
              },
              {
                img: "/about/secretary.jpg",
                name: "Sri Prasad",
                role: "General Secretary",
              },
              {
                img: "/about/treasurer.jpg",
                name: "Sri Rajesh",
                role: "Treasurer",
              },
            ].map((leader, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-white text-center shadow-lg transition duration-300 hover:shadow-2xl"
              >

                <Image
                  src={leader.img}
                  alt={leader.name}
                  width={350}
                  height={350}
                  className="h-64 w-full object-cover"
                />

                <div className="p-5">

                  <h3 className="text-xl font-bold text-gray-800">
                    {leader.name}
                  </h3>

                  <p className="mt-2 font-semibold text-[#a00018]">
                    {leader.role}
                  </p>

                  <p className="mt-3 text-sm text-gray-500">
                    Serving the Aarya Vysya community with dedication,
                    integrity and commitment.
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">

            <h2 className="font-serif text-3xl font-bold text-[#800018]">
              Why Choose Us
            </h2>

            <p className="mt-3 text-gray-500">
              Dedicated to trust, service and community development.
            </p>

          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {[
              {
                icon: <FaShieldAlt />,
                title: "Trust & Transparency",
                desc: "We work with transparency and commitment towards the community.",
              },
              {
                icon: <FaUsers />,
                title: "Strong Community",
                desc: "Connecting community members through various activities and programs.",
              },
              {
                icon: <FaHeart />,
                title: "Service",
                desc: "Dedicated to helping families and people who need community support.",
              },
              {
                icon: <FaAward />,
                title: "Community Development",
                desc: "Encouraging education, employment, welfare and development.",
              },
              {
                icon: <FaHandshake />,
                title: "Cooperation",
                desc: "Promoting cooperation between District, Mandal and Sangam organizations.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Commitment",
                desc: "Committed to building a better future for the Aarya Vysya community.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-[#fff7f8] p-8 text-center shadow transition hover:shadow-xl"
              >

                <div className="mb-5 flex justify-center text-5xl text-[#a00018]">
                  {item.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          STATISTICS
      ====================================================== */}
      <section className="bg-[#fff4df] py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">

            {[
              ["25,000+", "Registered Members"],
              ["15,000+", "Community Members"],
              ["10,000+", "Families Served"],
              ["24/7", "Community Support"],
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-white p-7 text-center shadow-lg"
              >

                <h2 className="text-3xl font-bold text-[#a00018] md:text-4xl">
                  {item[0]}
                </h2>

                <p className="mt-3 text-gray-500">
                  {item[1]}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL MESSAGE
      ====================================================== */}
      <section className="bg-[#fff7f8] py-12">

        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="font-serif text-3xl font-bold text-black md:text-3xl">
            Together We Serve, Together We Grow
          </h2>

          <p className="mt-4 leading-7 text-black/90">
            Aarya Vysya Mahasabha is committed to unity, service,
            welfare and development of the community.
          </p>

        </div>

      </section>

    </main>
  );
}