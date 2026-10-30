
"use client";

import Image from "next/image";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaHeart,
  FaCalendarAlt,
  FaPray,
  FaStar,
} from "react-icons/fa";

const organizers = [
  {
    name: "విజయనాథ్ ఏడుకుళ్ల",
    role: "అధ్యక్షులు",
    image: "/about/vijayanath.jpg",
    phone: "+91 90320 03181",
    tel: "+919032003181",
    email: "vijayanathedukulla@gmail.com",
  },
  {
    name: "బెల్డ గురుమూర్తి గుప్త",
    role: "నిర్వహకులు మరియు ఉపాధ్యక్షులు",
    additionalRole: "సరూర్‌నగర్ మండల ఆర్య వైశ్య సంఘం",
    image: "/about/beld.jpeg",
    phone: "+91 92461 19408",
    tel: "+919246119408",
    email: "beldaguru@gmail.com",
  },
  {
    name: "ఊరే మధుసూదన్",
    role: "ప్రధాన కార్యదర్శి",
    phone: "+91 98851 91943",
    tel: "+919885191943",
    email: "vooremadhusudan@gmail.com",
  },
  {
    name: "ఊరె రవీందర్ జెటిఆర్ గుప్త",
    role: "గౌరవ అధ్యక్షులు",
    additionalRole:
      "చంపాపేట్ ఆర్యవైశ్య సంఘం చైర్మన్ మరియు ఆర్యవైశ్య మహాసభ సరూర్ నగర్ మండల వివాహ కమిటీ చైర్మన్",
    image: "/about/vooreravinder.jpg",
    phone: "+91 9441090964",
    tel: "+919441090964",
    email: "vooreravinder@gmail.com",
  },
  {
    name: "చిత్తనూరి నరేష్ గుప్త",
    role: "కోశాధికారి",
    image: "/about/naresh.jpeg",
    phone: "+91 98488 330591",
    tel: "+9198488330591",
    email: "nareshchittanur@gmail.com",
  },
];

function OrganizerCard({
  person,
}: {
  person: (typeof organizers)[number];
}) {
  const isFirstOrganizer =
    person.name === "విజయనాథ్ ఏడుకుళ్ల";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#eadcb8] bg-white shadow-[0_4px_18px_rgba(105,0,21,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#c5a04a] hover:shadow-[0_12px_28px_rgba(105,0,21,0.12)] sm:flex-row">

      {/* Organizer Profile Image */}
      {person.image && (
        <div className="flex shrink-0 items-center justify-center p-3 sm:p-0">
          <Image
            src={person.image}
            alt={`${person.name} - AVMS organizer`}
            width={208}
            height={240}
            quality={75}
            sizes="(max-width: 639px) 176px, (max-width: 1023px) 192px, 208px"
            loading={isFirstOrganizer ? "eager" : "lazy"}
            fetchPriority={isFirstOrganizer ? "high" : "auto"}
            className="h-48 w-44 rounded-xl border-2 border-[#eadcb8] object-cover shadow-md sm:h-56 sm:w-48 lg:h-60 lg:w-52"
          />
        </div>
      )}

      {/* Organizer Information */}
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-5">
        <div>
          <h3 className="text-center font-serif text-lg font-bold leading-relaxed text-[#690015] sm:text-left sm:text-xl">
            {person.name}
          </h3>

          <p className="mt-1 text-center text-sm font-semibold text-[#a67816] sm:text-left">
            {person.role}
          </p>

          {person.additionalRole && (
            <p className="mt-1 text-center text-sm text-[#725454] sm:text-left">
              {person.additionalRole}
            </p>
          )}

          <div className="mx-auto mt-3 h-[2px] w-12 rounded-full bg-[#d9a928] sm:mx-0" />
        </div>

        <div className="mt-4 space-y-3 text-sm text-[#604b4b]">
          <a
            href={`tel:${person.tel}`}
            className="flex min-w-0 items-start gap-3 rounded-lg transition-colors hover:text-[#a67816]"
          >
            <FaPhoneAlt className="mt-1 shrink-0 text-[#a67816]" />
            <span className="break-words">{person.phone}</span>
          </a>

          <a
            href={`mailto:${person.email}`}
            className="flex min-w-0 items-start gap-3 transition-colors hover:text-[#a67816]"
          >
            <FaEnvelope className="mt-1 shrink-0 text-[#a67816]" />
            <span className="break-all">{person.email}</span>
          </a>

          <p className="flex items-start gap-3">
            <FaMapMarkerAlt className="mt-1 shrink-0 text-[#a67816]" />
            <span>Champapet, Hyderabad</span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Hero() {
  return (
    <main className="overflow-hidden bg-white text-[#604b4b]">

      {/* Scrolling Announcement */}
      <div className="overflow-hidden border-y border-rose-100 bg-rose-50 py-2">
        <div className="marquee-track">
          <div className="marquee-content">
            <span>
              ✨ నూతన వధూవరులందరికీ శ్రీ పరాభవ నామ సంవత్సర దసరా శుభాకాంక్షలు 🙏
              &nbsp; | &nbsp;
              ఆర్య వైశ్య సమాజం కోసం ఉచిత ఆన్‌లైన్ వివాహ పరిచయ వేదిక
              &nbsp; | &nbsp;
              శ్రీ పరాభవ నామ సంవత్సర ఆశ్వీజ శుద్ధ విజయ దశమి సందర్భంగా ప్రారంభం అయినది
              — తేదీ: 20-10-2026
              &nbsp; | &nbsp;
              వధూవరులిరువురూ ఈ ఆన్‌లైన్ ఉచిత వివాహ పరిచయ సదవకాశాన్ని వినియోగించుకొని
              వివాహము సంపన్నం చేసుకోవాలని కోరుతున్నాము.
              &nbsp; | &nbsp; ✨
            </span>

            <span aria-hidden="true">
              &nbsp;&nbsp;&nbsp; ✨ నూతన వధూవరులందరికీ శ్రీ పరాభవ నామ సంవత్సర దసరా శుభాకాంక్షలు 🙏
              &nbsp; | &nbsp;
              ఆర్య వైశ్య సమాజం కోసం ఉచిత ఆన్‌లైన్ వివాహ పరిచయ వేదిక
              &nbsp; | &nbsp;
              శ్రీ పరాభవ నామ సంవత్సర ఆశ్వీజ శుద్ధ విజయ దశమి సందర్భంగా ప్రారంభం అయినది
              — తేదీ: 20-10-2026
              &nbsp; | &nbsp;
              వధూవరులిరువురూ ఈ ఆన్‌లైన్ ఉచిత వివాహ పరిచయ సదవకాశాన్ని వినియోగించుకొని
              వివాహము సంపన్నం చేసుకోవాలని కోరుతున్నాము.
              &nbsp; | &nbsp; ✨
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: smooth-marquee 35s linear infinite;
          will-change: transform;
        }

        .marquee-content {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          white-space: nowrap;
          color: #800018;
          font-size: 14px;
          font-weight: 600;
        }

        .marquee-content > span {
          flex-shrink: 0;
        }

        @keyframes smooth-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (min-width: 640px) {
          .marquee-content {
            font-size: 16px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>

      {/* Hero Heading */}
      <section className="relative bg-gradient-to-b from-[#fffaf0] via-white to-white px-3 pb-5 pt-5 sm:px-5 sm:pb-7 sm:pt-6">

        <div className="mx-auto max-w-5xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#a67816] sm:text-xs">
            Champapet Arya Vysya Sangham
          </p>

          <h1 className="mx-auto mt-2 max-w-4xl font-serif text-lg font-bold leading-relaxed text-[#690015] sm:text-xl">
            ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
          </h1>

          <div className="mx-auto mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-9 bg-[#d9a928] sm:w-14" />
            <FaStar className="text-xs text-[#a67816]" />
            <span className="h-px w-9 bg-[#d9a928] sm:w-14" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl">

          {/* Organizers */}
          <div className="mb-5 text-center sm:mb-6">
            <h2 className="mt-1 font-serif text-xl font-bold text-[#690015] sm:text-2xl">
              మా నిర్వాహక బృందం
            </h2>

            <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#d9a928]" />
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 xl:gap-5">
            {organizers.map((person) => (
              <OrganizerCard
                key={person.name}
                person={person}
              />
            ))}
          </div>

          {/* Service Goal */}
          <section className="mt-7 overflow-hidden rounded-2xl border border-[#eadcb8] bg-gradient-to-br from-[#fffaf0] via-white to-[#fff6f6] sm:mt-9">

            <div className="px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

              {/* Section Heading */}
              <div className="text-center">
                <h2 className="font-serif text-xl font-bold text-[#690015] sm:text-2xl">
                  మా సేవా లక్ష్యం
                </h2>

                <p className="mt-1 text-xs text-[#725454] sm:text-sm">
                  సేవే మా లక్ష్యం — కుటుంబాల సంతోషమే మా స్ఫూర్తి
                </p>

                <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#d9a928]" />
              </div>

              {/* Statistics */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">

                <div className="rounded-xl border border-[#eadcb8] bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md sm:p-4">
                  <FaHeart className="mx-auto text-lg text-[#a67816]" />

                  <p className="mt-2 text-2xl font-bold text-[#690015] sm:text-3xl">
                    90%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#725454] sm:text-sm">
                    Brides&apos; Marriages
                  </p>
                </div>

                <div className="rounded-xl border border-[#eadcb8] bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md sm:p-4">
                  <FaUsers className="mx-auto text-lg text-[#a67816]" />

                  <p className="mt-2 text-2xl font-bold text-[#690015] sm:text-3xl">
                    75–80%
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#725454] sm:text-sm">
                    Grooms&apos; Marriages
                  </p>
                </div>

                <div className="rounded-xl border border-[#eadcb8] bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md sm:p-4">
                  <FaCalendarAlt className="mx-auto text-lg text-[#a67816]" />

                  <p className="mt-2 text-2xl font-bold text-[#690015] sm:text-3xl">
                    143వ
                  </p>

                  <p className="mt-1 text-xs font-semibold text-[#725454] sm:text-sm">
                    Matrimony Meet
                  </p>
                </div>

              </div>

              {/* Service History */}
              <div className="mt-5 rounded-xl border border-[#eadcb8] bg-white p-4 sm:p-5">

                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff4d9] text-sm text-[#a67816]">
                    <FaCalendarAlt />
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#690015] sm:text-lg">
                    మా సేవా ప్రయాణం
                  </h3>
                </div>

                <p className="mt-3 text-justify text-xs leading-7 text-[#604b4b] sm:text-sm sm:leading-7">
                  ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక ప్రప్రథమంగా తేదీ
                  30-11-2014 నుండి ప్రారంభించబడినది. 90 శాతం వధువులు,
                  75–80 శాతం వరులు వివాహ సంపన్నత పొందియున్నారు. వివాహం
                  చేసుకున్న వారి కుటుంబ సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో
                  స్ఫూర్తి, పట్టుదలను అందిస్తున్నాయి.
                </p>

                <p className="mt-3 text-justify text-xs leading-7 text-[#604b4b] sm:text-sm sm:leading-7">
                  ఈ వేదిక 143వది 4-10-2026న జరిగినది. మరిన్ని వేదికలు
                  భావి తరాలకు అందాలని, శ్రీ వాసవి కన్యకా పరమేశ్వరి
                  అమ్మవారి అనుగ్రహం ఉండాలని ఆకాంక్షిస్తూ ఈ సేవా
                  కార్యక్రమాన్ని కొనసాగిస్తున్నాము.
                </p>

                <div className="mt-4 flex items-start gap-2 rounded-lg bg-[#fffaf0] p-3">
                  <FaPray className="mt-1 shrink-0 text-base text-[#a67816]" />

                  <p className="text-xs leading-6 text-[#604b4b] sm:text-sm sm:leading-7">
                    శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ఆశీస్సులతో
                    ఈ సేవా కార్యక్రమం మరిన్ని కుటుంబాలకు చేరాలని
                    మనస్ఫూర్తిగా ఆకాంక్షిస్తున్నాము.
                  </p>
                </div>

              </div>

              {/* Closing */}
              <div className="mt-6 border-t border-[#eadcb8] pt-5 text-center">

                <p className="font-serif text-xs text-[#725454] sm:text-sm">
                  సదా మీ సేవలో
                </p>

                <h3 className="mt-1 font-serif text-lg font-bold text-[#690015] sm:text-xl">
                  నిర్వాహకులు
                </h3>

                <p className="mt-1 font-serif text-base font-semibold text-[#a67816] sm:text-lg">
                  బెల్డ గురుమూర్తి గుప్త
                </p>

                <div className="mx-auto mt-3 h-px w-14 bg-[#d9a928]" />

                <p className="mt-3 text-xs font-semibold text-[#604b4b] sm:text-sm">
                  చంపాపేట ఆర్య వైశ్య సంఘం
                </p>

                <p className="mt-1 text-xs text-[#725454] sm:text-sm">
                  పరిచయ వేదిక విభాగం
                </p>

              </div>

            </div>
          </section>

        </div>
      </section>
    </main>
  );
}
