
import Link from "next/link";

import Hero from "@/components/Hero";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import MatrimonySection from "@/components/MatrimonySection";
import SuccessStories from "@/components/SuccessStories";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}
      <Hero />

      {/* =====================================================
          143rd PARICHAYA VEDIKA / MATRIMONY HISTORY
      ====================================================== */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-2 text-sm font-semibold tracking-wide text-[#800018] sm:text-base">
              చంపాపేట ఆర్య వైశ్య సంఘం
            </p>

            <h2 className="text-2xl font-bold text-[#800018] sm:text-3xl md:text-4xl">
              ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#800018]" />
          </div>

          <div className="mx-auto mt-8 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక ప్రప్రథమంగా తేదీ
              <span className="font-semibold text-[#800018]">
                {" "}
                28-11-2014
              </span>{" "}
              నుండి ప్రారంభించబడినది.
            </p>

            <p className="mt-4 text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              ఈ వేదిక ద్వారా సుమారు
              <span className="font-bold text-[#800018]">
                {" "}
                90% వధువులు
              </span>{" "}
              మరియు
              <span className="font-bold text-[#800018]">
                {" "}
                75–80% వరులు
              </span>{" "}
              వివాహ సంపన్నం పొందియున్నారు.
            </p>

            <p className="mt-4 text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              వివాహం చేసుకున్న వారి కుటుంబ సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో
              స్ఫూర్తి, పట్టుదల. ఈ పరిచయ వేదికను భావి తరాలకు అందించాలని,
              శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి అనుగ్రహం ఎల్లప్పుడూ
              ఉండాలని కోరుకుంటున్నాము.
            </p>

            <div className="mt-7 border-t border-gray-100 pt-5 text-center">
              <p className="text-sm font-semibold text-[#800018] sm:text-base">
                143వ పరిచయ వేదిక
              </p>

              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                04-10-2026
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-700 sm:text-base">
                సదా మీ సేవలో
              </p>

              <p className="mt-1 font-semibold text-[#800018]">
                చంపాపేట ఆర్య వైశ్య సంఘం
              </p>

              <p className="text-sm text-gray-600">
                నిర్వహకులు – పరిచయ వేదిక విభాగం
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ONLINE REGISTRATION ANNOUNCEMENT
      ====================================================== */}
      <section className="border-y border-[#eadbb9] bg-[#fffaf1] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-[#eadbb9] bg-white px-5 py-6 shadow-sm sm:flex-row sm:px-8">
            <div className="text-center sm:text-left">
              <p className="text-lg font-bold text-[#800018] sm:text-xl">
                Matrimonial Services – Online Registration
              </p>

              <p className="mt-1 text-sm leading-6 text-gray-600 sm:text-base">
                Online matrimonial registration facility is available on this
                webpage
                <span className="font-semibold text-gray-800">
                  {" "}
                  w.e.f. 04-10-2026
                </span>
                .
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#800018] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#650014] focus:outline-none focus:ring-2 focus:ring-[#800018] focus:ring-offset-2"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          LATEST 4 MATRIMONY PROFILES
      ====================================================== */}
   

      {/* =====================================================
          MATRIMONY SECTION
      ====================================================== */}
      <MatrimonySection />

      {/* =====================================================
          AMMA PRAYER
      ====================================================== */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-[#800018]">
              శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ప్రార్థన
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#800018] sm:text-3xl md:text-4xl">
              అమ్మ ప్రార్థన
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#800018]" />
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-6 text-center shadow-sm sm:p-10">
            <div className="space-y-1 text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              <p className="font-semibold text-[#800018]">
                విశ్వజనని వాసవి మా హృదయ గీతి అందుకో
              </p>

              <p>నిత్య పూజ సత్య సింధు</p>

              <p>ఆత్మ హారతి అందుకో</p>
            </div>

            <div className="mx-auto my-7 h-px w-24 bg-[#d8c59f]" />

            <div className="space-y-1 text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              <p>గళం పారగా కలం సాగగా</p>
              <p>సేవ వీణ మ్రోగగా</p>
              <p>సౌహార్ద్రత ఆర్ద్రత నిండగా</p>
              <p>స్నేహ దీపం వెలుగగా</p>
              <p>సహకార బంధము నిలువగా</p>
              <p>ప్రగతి పుష్పము విరియగా</p>
              <p>భక్తితో నిను కొలుతూము</p>
              <p className="font-semibold text-[#800018]">
                విశ్వ శాంతికి నిలుతూము
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SUCCESS STORIES
      ====================================================== */}
      <SuccessStories />

      {/* =====================================================
          FAQ
      ====================================================== */}
      <FAQ />
    </>
  );
}

