
import Image from "next/image";
import {
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaAward,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="bg-[#fffaf9]">
      {/* =====================================================
          ABOUT US
      ====================================================== */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div>
            <Image
              src="/about/about-us.png"
              alt="Aarya Vysya Matrimony"
              width={600}
              height={500}
              priority
              className="w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-[#800018]">
              About Us
            </span>

            <h1 className="mt-3 text-3xl font-bold text-[#800018] sm:text-4xl">
              Aarya Vysya Matrimony
            </h1>

            <div className="mt-4 h-1 w-16 rounded-full bg-[#800018]" />

            <p className="mt-6 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Aarya Vysya Matrimony is a dedicated matrimonial platform
              created to help Arya Vysya families connect with suitable life
              partners while respecting family values, traditions, and
              community relationships.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              Our aim is to provide a simple, trustworthy, and convenient
              platform where brides, grooms, and families can explore
              matrimonial profiles and begin meaningful conversations.
            </p>

            <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
              The platform combines traditional community-based matrimonial
              services with modern online registration and profile search
              facilities.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          PARICHAYA VEDIKA HISTORY
      ====================================================== */}
      <section className="border-y border-[#eadbb9] bg-[#fffaf1] py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-[#800018]">
              చంపాపేట ఆర్య వైశ్య సంఘం
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#800018] sm:text-3xl md:text-4xl">
              ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
            </h2>

            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#800018]" />
          </div>

          <div className="mt-8 rounded-2xl border border-[#eadbb9] bg-white p-6 shadow-sm sm:p-10">
            <p className="text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక ప్రప్రథమంగా తేదీ{" "}
              <span className="font-semibold text-[#800018]">
                28-11-2014
              </span>{" "}
              నుండి ప్రారంభించబడినది.
            </p>

            <p className="mt-5 text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              ఈ వేదిక ద్వారా సుమారు{" "}
              <span className="font-bold text-[#800018]">90% వధువులు</span>{" "}
              మరియు{" "}
              <span className="font-bold text-[#800018]">
                75–80% వరులు
              </span>{" "}
              వివాహ సంపన్నం పొందియున్నారు.
            </p>

            <p className="mt-5 text-center text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
              వివాహం చేసుకున్న వారి కుటుంబ సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో
              స్ఫూర్తి, పట్టుదల. ఈ వేదికను భావి తరాలకు అందించాలని, శ్రీ వాసవి
              కన్యకా పరమేశ్వరి అమ్మవారి అనుగ్రహం ఎల్లప్పుడూ ఉండాలని
              కోరుకుంటున్నాము.
            </p>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <p className="text-lg font-bold text-[#800018]">
                143వ పరిచయ వేదిక
              </p>

              <p className="mt-1 text-sm text-gray-500">
                04-10-2026
              </p>

              <p className="mt-5 text-sm text-gray-700">
                సదా మీ సేవలో
              </p>

              <p className="mt-1 font-semibold text-[#800018]">
                చంపాపేట ఆర్య వైశ్య సంఘం
              </p>

              <p className="mt-1 text-sm text-gray-600">
                నిర్వహకులు – పరిచయ వేదిక విభాగం
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ONLINE REGISTRATION
      ====================================================== */}
      <section className="bg-white py-12 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#800018] sm:text-2xl">
              Matrimonial Services – Online Registration
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Online matrimonial registration facility is available on this
              webpage w.e.f.{" "}
              <span className="font-semibold text-gray-800">
                04-10-2026
              </span>
              .
            </p>

            <a
              href="/register"
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#800018] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#650014]"
            >
              Register Now
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-[#800018]">
              Our Services
            </span>

            <h2 className="mt-2 text-2xl font-bold text-[#800018] sm:text-3xl">
              Why Choose Us
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
              A simple and community-focused matrimonial service designed to
              help Arya Vysya families connect with suitable matches.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[
              {
                icon: <FaShieldAlt />,
                title: "Verified Profiles",
                desc: "Profiles can be reviewed and verified to support a more trustworthy matrimonial experience.",
              },
              {
                icon: <FaUsers />,
                title: "Community Focused",
                desc: "Created with the needs, traditions, and values of Arya Vysya families in mind.",
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
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-[#fffaf9] p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="mb-5 flex justify-center text-4xl text-[#800018]">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-800 sm:text-xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
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
      <section className="bg-[#fffaf1] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-[#800018]">
                2014
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Matrimonial service started
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-[#800018]">
                143వ
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Parichaya Vedika
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadbb9] bg-white p-7 text-center shadow-sm sm:col-span-2 lg:col-span-1">
              <h3 className="text-3xl font-bold text-[#800018]">
                04-10-2026
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Online registration launched
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          AMMA PRAYER
      ====================================================== */}
      <section className="bg-white py-14 sm:py-20">
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

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-7 text-center shadow-sm sm:p-10">
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
    </main>
  );
}

