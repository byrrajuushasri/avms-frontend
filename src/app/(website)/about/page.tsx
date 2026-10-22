
"use client";

import {
  FaCalendarAlt,
  FaUsers,
  FaLaptop,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaArrowRight,
  FaQuoteLeft,
} from "react-icons/fa";

const maroon = "#800018";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#faf8f6] text-gray-700">
      {/* PAGE HEADER */}
      <header className="border-b border-[#eadbdc] bg-white px-3 py-5 sm:px-6 sm:py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 sm:gap-5">
          <h1 className="text-right text-[8px] font-extrabold leading-5 text-[#800018] sm:text-lg md:text-sm">
            చంపాపేట ఆర్య వైశ్య సంఘం
          </h1>

          <img
            src="/images/kalasam.png"
            alt="పూర్ణకలశం"
            className="h-10 w-10 shrink-0 object-contain sm:h-10 sm:w-10"
          />

          <p className="text-left text-[8px] font-bold leading-5 text-gray-700 sm:text-lg md:text-sm">
            ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
          </p>
        </div>

         
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
         

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ORGANIZER PROFILE */}
          <section className="overflow-hidden rounded-3xl border border-[#eadfe0] bg-white shadow-sm lg:col-span-7">
            <div className="h-2 bg-gradient-to-r from-[#800018] via-[#a64b5a] to-[#d5ad53]" />

            <div className="p-5 sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="shrink-0 rounded-2xl border border-[#e8d4d6] bg-[#faf5f4] p-2">
                  <img
                    src="/about/beld.jpeg"
                    alt="బెల్డ గురుమూర్తి గుప్త"
                    className="h-52 w-44 rounded-xl object-cover object-top sm:h-56 sm:w-44"
                  />
                </div>

                <div className="min-w-0 flex-1 text-center sm:pt-2 sm:text-left">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b28a35]">
                    మా సేవా నిర్వాహకులు
                  </p>

                  <h3 className="mt-2 text-xl font-extrabold leading-relaxed text-[#800018] sm:text-xl">
                    బెల్డ గురుమూర్తి గుప్త
                  </h3>

                  <p className="mt-2 inline-flex rounded-full bg-[#f8eeee] px-4 py-1.5 text-sm font-bold text-[#800018]">
                    నిర్వాహకులు మరియు ఉపాధ్యక్షులు
                  </p>

                  <div className="mt-6 space-y-4 text-left text-sm">
                    <a
                      href="tel:+919246119408"
                      className="flex items-start gap-3 rounded-xl bg-[#faf8f6] p-3 transition hover:bg-[#f7eded]"
                    >
                      <FaPhoneAlt className="mt-1 shrink-0 text-[#800018]" />
                      <span>
                        <span className="block text-xs text-gray-500">
                          ఫోన్ నంబర్
                        </span>
                        <span className="mt-1 block font-semibold text-gray-800">
                          +91 92461 19408
                        </span>
                      </span>
                    </a>

                    <a
                      href="mailto:beldaguru@gmail.com"
                      className="flex items-start gap-3 rounded-xl bg-[#faf8f6] p-3 transition hover:bg-[#f7eded]"
                    >
                      <FaEnvelope className="mt-1 shrink-0 text-[#800018]" />
                      <span className="min-w-0">
                        <span className="block text-xs text-gray-500">
                          ఇమెయిల్
                        </span>
                        <span className="mt-1 block break-all font-semibold text-gray-800">
                          beldaguru@gmail.com
                        </span>
                      </span>
                    </a>

                    <div className="flex items-start gap-3 rounded-xl bg-[#faf8f6] p-3">
                      <FaMapMarkerAlt className="mt-1 shrink-0 text-[#800018]" />
                      <span>
                        <span className="block text-xs text-gray-500">
                          ప్రదేశం
                        </span>
                        <span className="mt-1 block font-semibold text-gray-800">
                          Hyderabad, Telangana, India
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-8 h-px bg-gradient-to-r from-transparent via-[#dfc7c9] to-transparent" />

              {/* SERVICE MISSION */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#800018]/10">
                    <FaHeart className="text-[#800018]" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#800018] sm:text-2xl">
                    మా సేవా లక్ష్యం
                  </h3>
                </div>

                <div className="space-y-4 text-sm leading-8 text-gray-600 sm:text-base">
                  <p>
                    ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక ప్రప్రథమంగా
                    తేదీ 30-11-2014 నుండి ప్రారంభించబడినది. 90 శాతం
                    వధువులు, 75–80 శాతం వరులు వివాహ సంపన్నత
                    పొందియున్నారు. వివాహం చేసుకున్న వారి కుటుంబ
                    సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో స్ఫూర్తి,
                    పట్టుదలను అందిస్తున్నాయి.
                  </p>

                  <p>
                    ఈ వేదిక 143వది 4-10-2026న జరిగినది. మరిన్ని
                    వేదికలు భావి తరాలకు అందాలని, శ్రీ వాసవి కన్యకా
                    పరమేశ్వరి అమ్మవారి అనుగ్రహం ఉండాలని ఆకాంక్షిస్తూ
                    ఈ సేవా కార్యక్రమాన్ని కొనసాగిస్తున్నాము.
                  </p>
                </div>
              </div>

              {/* SIGNATURE */}
              <div className="mt-7 rounded-2xl border border-[#eadbdc] bg-[#fcf8f7] p-5 text-center">
                <FaQuoteLeft className="mx-auto text-lg text-[#c5a45a]" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  సదా మీ సేవలో
                </p>
                <p className="mt-2 text-xl font-extrabold text-[#800018]">
                  బెల్డ గురుమూర్తి గుప్త
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-700">
                  చంపాపేట ఆర్య వైశ్య సంఘం
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  పరిచయ వేదిక విభాగం
                </p>
              </div>
            </div>
          </section>

          {/* SUCCESS & PRAYER */}
          <div className="space-y-6 lg:col-span-5">
            <section className="rounded-3xl border border-[#eadfe0] bg-white p-5 shadow-sm sm:p-7">
              <p className="text-center text-xs font-bold uppercase tracking-[0.18em] text-[#b28a35]">
                మా సేవా విజయాలు
              </p>

              <h3 className="mt-2 text-center text-xl font-extrabold text-[#800018] sem:text-xl">
                ఆనందకరమైన కుటుంబ బంధాలు
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#eadbdc] bg-[#fcf8f7] p-4 text-center">
                  <p className="text-3xl font-extrabold text-[#800018] sm:text-xl">
                    90%
                  </p>
                  <div className="mx-auto my-3 h-1 w-10 rounded-full bg-[#d5ad53]" />
                  <p className="text-sm font-semibold leading-6 text-gray-700">
                    వధువుల వివాహాలు
                  </p>
                </div>

                <div className="rounded-2xl border border-[#eadbdc] bg-[#fcf8f7] p-4 text-center">
                  <p className="text-3xl font-extrabold text-[#800018] sm:text-xl">
                    75–80%
                  </p>
                  <div className="mx-auto my-3 h-1 w-10 rounded-full bg-[#d5ad53]" />
                  <p className="text-sm font-semibold leading-6 text-gray-700">
                    వరుడులు వివాహాలు
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#800018] p-4 text-white">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <FaUsers className="text-xl text-[#f0d58f]" />
                </div>
                <div>
                  <p className="font-bold">143వ పరిచయ వేదిక</p>
                  <p className="mt-1 text-sm text-white/80">
                    04 అక్టోబర్ 2026
                  </p>
                </div>
              </div>
            </section>

            {/* PRAYER */}
            <section className="relative overflow-hidden rounded-3xl border border-[#eadbdc] bg-white p-5 shadow-sm sm:p-7">
              <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#f7eeee]" />

              <div className="relative">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#e7d4a5] bg-[#fffaf0]">
                  <img
                    src="/images/kalasam.png"
                    alt="పూర్ణకలశం"
                    className="h-11 w-11 object-contain"
                  />
                </div>

                <h3 className="mt-4 text-center text-lg font-extrabold leading-8 text-[#800018] sm:text-xl">
                  శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ప్రార్థన
                </h3>

                <div className="mx-auto my-4 h-1 w-16 rounded-full bg-[#d5ad53]" />

                <div className="space-y-2 text-center text-sm leading-7 text-gray-700 sm:text-base">
                  <p>విశ్వజనని వాసవి మా హృదయ గీతి అందుకో</p>
                  <p>నిత్య పూజ సత్య సింధు</p>
                  <p>ఆత్మ హారతి అందుకో</p>
                  <p>గళం పార గ కలం సాగగా</p>
                  <p>సేవ వీణ య మ్రోగగ</p>
                  <p>సౌహార్ద్రత ఆర్ద్రత నిండగా</p>
                  <p>స్నేహ దీపం వెలుగగా</p>
                  <p>సహకార బంధము నిలువగా</p>
                  <p>ప్రగతి పుష్పము విరియగా</p>
                  <p>భక్తితో నిను గొలుతూము</p>
                  <p>విశ్వ శాంతికి నిలుతూము</p>
                </div>

                <p className="mt-5 rounded-xl bg-[#faf6f2] p-4 text-center text-sm leading-7 text-gray-600">
                  ఈ వేదికను భావి తరాలకు అందించాలని, శ్రీ వాసవి
                  కన్యకా పరమేశ్వరి అమ్మవారి అనుగ్రహం ఎల్లప్పుడూ
                  ఉండాలని కోరుకుంటున్నాము.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* JOURNEY TIMELINE */}
        <section className="mt-8 rounded-3xl border border-[#eadfe0] bg-white p-5 shadow-sm sm:mt-10 sm:p-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b28a35]">
              Our Journey
            </p>
            <h2 className="mt-2 text-xl font-extrabold text-[#800018] sm:text-xl">
              మా సేవా ప్రయాణం
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-500">
              సమాజ సేవతో ప్రారంభమైన మా ప్రయాణం, కుటుంబాల మధ్య
              సంతోషకరమైన బంధాలను పెంపొందించే దిశగా కొనసాగుతోంది.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* 2014 */}
            <JourneyCard
              icon={<FaCalendarAlt />}
              title="2014"
              subtitle="పరిచయ వేదిక ప్రారంభం"
              detail="28-11-2014"
            />

            {/* 143rd */}
            <JourneyCard
              icon={<FaUsers />}
              title="143వ"
              subtitle="పరిచయ వేదిక"
              detail="04-10-2026"
            />

            {/* ONLINE */}
            <JourneyCard
              icon={<FaLaptop />}
              title="Online"
              subtitle="Online Registration"
              detail="సులభమైన నమోదు ప్రక్రియ"
            />
          </div>

          {/* CALL TO ACTION */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-[#800018] p-5 text-center sm:flex-row sm:px-7 sm:text-left">
            <div>
              <h3 className="text-lg font-bold text-white">
                మీ కుటుంబానికి సరైన పరిచయం కోసం
              </h3>
              <p className="mt-1 text-sm leading-6 text-white/75">
                ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదికలో నమోదు చేసుకోండి.
              </p>
            </div>

            <a
              href="/register"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e7c77b] px-5 py-3 text-sm font-bold text-[#4d0010] transition hover:bg-white"
            >
              నమోదు చేసుకోండి
              <FaArrowRight />
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

function JourneyCard({
  icon,
  title,
  subtitle,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  detail: string;
}) {
  return (
    <div className="group rounded-2xl border border-[#eadfe0] bg-white p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#c9a55b] hover:shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#800018]/10 text-2xl text-[#800018] transition duration-300 group-hover:bg-[#800018] group-hover:text-white">
        {icon}
      </div>

      <p className="mt-4 text-2xl font-extrabold text-[#800018]">
        {title}
      </p>

      <p className="mt-2 font-bold text-gray-800">{subtitle}</p>

      <div className="mx-auto my-4 h-1 w-10 rounded-full bg-[#d5ad53]" />

      <p className="text-sm text-gray-500">{detail}</p>
    </div>
  );
}
