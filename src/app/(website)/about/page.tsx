import Image from "next/image";
import {
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaHandshake,
  FaCheckCircle,
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

export default function AboutPage() {
  const services = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Profiles",
      desc: "Profiles can be reviewed and verified to support a more trustworthy matrimonial experience.",
    },
    {
      icon: <FaUsers />,
      title: "Community Focused",
      desc: "Created with the needs, traditions and values of Arya Vysya families in mind.",
    },
    {
      icon: <FaHeart />,
      title: "Meaningful Matches",
      desc: "Helping families discover suitable bride and groom profiles for meaningful relationships.",
    },
    {
      icon: <FaAward />,
      title: "Dedicated Service",
      desc: "A community-oriented service with a focus on supporting families and members.",
    },
    {
      icon: <FaHandshake />,
      title: "Family Support",
      desc: "Designed to make the matrimonial search easier and more convenient for families.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Privacy Focused",
      desc: "We aim to provide a secure platform while respecting member privacy and personal information.",
    },
  ];

  return (
    <main className="overflow-hidden bg-[#fffaf9] text-gray-800">

      {/* =====================================================
          HERO / ABOUT US
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fffaf9] via-white to-[#fff4f1] py-14 sm:py-20 lg:py-24">

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#800018]/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#d8b56b]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">

          {/* =================================================
              IMAGE
          ================================================== */}
          <div className="relative">

            <div className="absolute -inset-3 rounded-[2rem] border border-[#eadbb9] bg-white/60" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#eadbb9] bg-white p-2 shadow-2xl">

              <Image
                src="/about/beld.jpeg"
                alt="Beld Gurumoorthy - Champapet Arya Vysya Sangham"
                width={700}
                height={600}
                priority
                className="h-auto w-full rounded-[1.5rem] object-cover"
              />

              {/* Person name */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/50 bg-white/95 p-4 text-center shadow-lg backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#800018]">
                  Community Service
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#800018] sm:text-2xl">
                  Beld Gurumoorthy
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  Champapet Arya Vysya Sangham
                </p>
              </div>
            </div>

            {/* Small badge */}
            <div className="absolute -bottom-5 -right-2 flex items-center gap-2 rounded-2xl border border-[#eadbb9] bg-white px-4 py-3 shadow-xl sm:-right-5">
              <FaStar className="text-[#800018]" />

              <div>
                <p className="text-xs text-gray-500">
                  Serving the Community
                </p>
                <p className="text-sm font-bold text-[#800018]">
                  Since 2014
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              CONTENT
          ================================================== */}
          <div>

            <div className="text-center lg:text-left">

              <span className="inline-flex items-center rounded-full border border-[#eadbb9] bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#800018] shadow-sm">
                About Us
              </span>

              <p className="mt-5 text-sm font-semibold tracking-wide text-[#800018] sm:text-base">
                చంపాపేట ఆర్య వైశ్య సంఘం
              </p>

              <h1 className="mt-2 text-xl   leading-tight text-[#800018] sm:text-4xl lg:text-3xl">
                ఆర్య వైశ్య వివాహ
                 
                ఉచిత పరిచయ వేదిక
              </h1>

              <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
                <span className="h-1 w-12 rounded-full bg-[#800018]" />
                <span className="h-1 w-3 rounded-full bg-[#d8b56b]" />
                <span className="h-1 w-2 rounded-full bg-[#800018]" />
              </div>
            </div>

            {/* Main story */}
            <div className="mt-8 rounded-3xl border border-[#eadbb9] bg-white p-6 shadow-lg sm:p-8">

              <div className="space-y-5 text-center lg:text-left">

                <p className="text-sm leading-7 text-gray-700 sm:text-base sm:leading-5">
                  ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
                  <span className="font-semibold text-[#800018]">
                    {" "}ప్రప్రథమంగా{" "}
                  </span>
                  తేదీ{" "}
                  <span className="font-bold text-[#800018]">
                    28-11-2014
                  </span>{" "}
                  నుండి ప్రారంభించబడినది.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">

                  <div className="rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-5 text-center">
                    <p className="text-3xl font-extrabold text-[#800018]">
                      90%
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      వధువులు వివాహ సంపన్నం పొందియున్నారు
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-5 text-center">
                    <p className="text-3xl font-extrabold text-[#800018]">
                      75–80%
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-600">
                      వరులు వివాహ సంపన్నం పొందియున్నారు
                    </p>
                  </div>

                </div>

                <p className="text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
                  వివాహం చేసుకున్న వారి కుటుంబ సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో
                  స్ఫూర్తి, పట్టుదల. ఈ వేదికను భావి తరాలకు అందించాలని,
                  శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి అనుగ్రహం ఎల్లప్పుడూ
                  ఉండాలని కోరుకుంటున్నాము.
                </p>

              </div>

              {/* Event information */}
              <div className="mt-8 border-t border-gray-100 pt-7 text-center">

                <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-[#800018] px-5 py-2 text-sm font-bold text-white">
                  <FaCalendarAlt />
                  04-10-2026
                </div>

                <p className="mt-5 text-2xl font-extrabold text-[#800018] sm:text-3xl">
                  143వ పరిచయ వేదిక
                </p>

                <p className="mt-3 text-sm font-medium text-gray-600">
                  సదా మీ సేవలో
                </p>

                <p className="mt-1 text-base font-bold text-[#800018]">
                  చంపాపేట ఆర్య వైశ్య సంఘం
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  నిర్వాహకులు – పరిచయ వేదిక విభాగం
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          JOURNEY / HISTORY
      ====================================================== */}
      <section className="border-y border-[#eadbb9] bg-[#fffaf1] py-14 sm:py-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <div className="text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800018]">
              Our Journey
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-[#800018] sm:text-3xl">
              సేవా ప్రయాణం
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              ఆర్య వైశ్య కుటుంబాలకు అనుకూలమైన వివాహ పరిచయాలను అందించాలనే
              సేవా భావంతో ప్రారంభమైన మా ప్రయాణం.
            </p>
          </div>

          <div className="relative mt-12">

            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#d8c59f] md:block" />

            <div className="grid gap-8 md:grid-cols-3">

              {/* 2014 */}
              <div className="relative rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#800018] text-xl font-bold text-white shadow-lg">
                  1
                </div>

                <p className="mt-5 text-3xl font-extrabold text-[#800018]">
                  2014
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-800">
                  పరిచయ వేదిక ప్రారంభం
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  28-11-2014 నుండి ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
                  సేవలు ప్రారంభించబడినవి.
                </p>

              </div>

              {/* 143 */}
              <div className="relative rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#800018] text-xl font-bold text-white shadow-lg">
                  2
                </div>

                <p className="mt-5 text-3xl font-extrabold text-[#800018]">
                  143వ
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-800">
                  పరిచయ వేదిక
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  04-10-2026 నాటికి 143వ పరిచయ వేదికను నిర్వహించుకుంటున్న
                  సేవా ప్రయాణం.
                </p>

              </div>

              {/* Online */}
              <div className="relative rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#800018] text-xl font-bold text-white shadow-lg">
                  3
                </div>

                <p className="mt-5 text-3xl font-extrabold text-[#800018]">
                  04-10-2026
                </p>

                <h3 className="mt-2 text-lg font-bold text-gray-800">
                  Online Registration
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  వెబ్ పేజీ ద్వారా matrimonial services online registration
                  facility అందుబాటులోకి వచ్చింది.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          ONLINE REGISTRATION
      ====================================================== */}
      <section className="bg-white py-14 sm:py-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#800018] p-7 text-white shadow-2xl sm:p-10 lg:p-12">

            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">

              <div>

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  Matrimonial Services
                </span>

                <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                  Online Registration
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
                  Matrimonial services online registration facilities are
                  available on the web page w.e.f.
                  <span className="font-bold text-white">
                    {" "}04-10-2026
                  </span>
                  .
                </p>

              </div>

              <a
                href="/register"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-white px-7 py-3 text-sm font-bold text-[#800018] shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#fffaf1]"
              >
                Register Now
                <FaArrowRight />
              </a>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-[#fffaf9] py-14 sm:py-20">

        <div className="mx-auto max-w-7xl px-4 sm:px-6">

          <div className="text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800018]">
              Our Services
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-[#800018] sm:text-3xl">
              Why Choose Us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
              A simple and community-focused matrimonial service designed to
              help Arya Vysya families connect with suitable matches.
            </p>

          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

            {services.map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl sm:p-8"
              >

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4f1] text-3xl text-[#800018] transition duration-300 group-hover:bg-[#800018] group-hover:text-white">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {item.desc}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          SERVICE HIGHLIGHTS
      ====================================================== */}
      <section className="border-y border-[#eadbb9] bg-[#fffaf1] py-14 sm:py-20">

        <div className="mx-auto max-w-6xl px-4 sm:px-6">

          <div className="grid gap-6 sm:grid-cols-3">

            <div className="group rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4f1] text-xl text-[#800018] group-hover:bg-[#800018] group-hover:text-white">
                <FaCalendarAlt />
              </div>

              <h3 className="mt-5 text-3xl font-extrabold text-[#800018]">
                2014
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                Matrimonial service started
              </p>

            </div>

            <div className="group rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4f1] text-xl text-[#800018] group-hover:bg-[#800018] group-hover:text-white">
                <FaHeart />
              </div>

              <h3 className="mt-5 text-3xl font-extrabold text-[#800018]">
                143వ
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                Parichaya Vedika
              </p>

            </div>

            <div className="group rounded-3xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff4f1] text-xl text-[#800018] group-hover:bg-[#800018] group-hover:text-white">
                <FaCheckCircle />
              </div>

              <h3 className="mt-5 text-2xl font-extrabold text-[#800018]">
                04-10-2026
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                Online registration launched
              </p>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          AMMA PRAYER
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-14 sm:py-20">

        <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-[#800018]/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[#d8b56b]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">

          <div className="text-center">

            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#800018]">
              Prayer
            </span>

            <p className="mt-3 text-sm font-semibold tracking-wide text-[#800018]">
              శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ప్రార్థన
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#800018] sm:text-4xl">
              అమ్మ ప్రార్థన
            </h2>

            <div className="mx-auto mt-5 flex items-center justify-center gap-2">
              <span className="h-1 w-12 rounded-full bg-[#800018]" />
              <span className="h-1 w-3 rounded-full bg-[#d8b56b]" />
              <span className="h-1 w-2 rounded-full bg-[#800018]" />
            </div>

          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-[#eadbb9] bg-[#fffaf1] shadow-xl">

            {/* Prayer header */}
            <div className="bg-[#800018] px-6 py-5 text-center text-white sm:px-10">

              <FaHeart className="mx-auto text-2xl" />

              <p className="mt-2 text-sm font-semibold tracking-wide">
                శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారికి అంకితం
              </p>

            </div>

            <div className="p-7 text-center sm:p-10">

              {/* First verse */}
              <div className="space-y-1 text-sm leading-8 text-gray-700 sm:text-base sm:leading-9">

                <p className="font-semibold text-[#800018]">
                  విశ్వజనని వాసవి మా హృదయ గీతి అందుకో
                </p>

                <p>
                  నిత్య పూజ సత్య సింధు
                </p>

                <p>
                  ఆత్మ హారతి అందుకో
                </p>

              </div>

              <div className="mx-auto my-8 h-px w-28 bg-[#d8c59f]" />

              {/* Second verse */}
              <div className="space-y-1 text-sm leading-8 text-gray-700 sm:text-base sm:leading-9">

                <p>
                  గళం పారగా కలం సాగగా
                </p>

                <p>
                  సేవ వీణ మ్రోగగా
                </p>

                <p>
                  సౌహార్ద్రత ఆర్ద్రత నిండగా
                </p>

                <p>
                  స్నేహ దీపం వెలుగగా
                </p>

                <p>
                  సహకార బంధము నిలువగా
                </p>

                <p>
                  ప్రగతి పుష్పము విరియగా
                </p>

                <p>
                  భక్తితో నిను కొలుతూము
                </p>

                <p className="pt-2 font-bold text-[#800018]">
                  విశ్వ శాంతికి నిలుతూము
                </p>

              </div>

              {/* Bottom decoration */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-[#d8c59f]" />
                <FaHeart className="text-[#800018]" />
                <span className="h-px w-10 bg-[#d8c59f]" />
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          FINAL COMMUNITY MESSAGE
      ====================================================== */}
      <section className="bg-[#800018] py-12 text-white sm:py-14">

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

          <FaHandshake className="mx-auto text-3xl text-white/90" />

          <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
            సదా మీ సేవలో
          </h2>

          <p className="mt-3 text-sm text-white/80 sm:text-base">
            చంపాపేట ఆర్య వైశ్య సంఘం
          </p>

          <p className="mt-1 text-sm text-white/70">
            నిర్వాహకులు – పరిచయ వేదిక విభాగం
          </p>

        </div>
      </section>

    </main>
  );
}