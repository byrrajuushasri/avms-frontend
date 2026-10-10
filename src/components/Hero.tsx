
"use client";

import Link from "next/link";
import {
  FaHeart,
  FaUsers,
  FaUserPlus,
  FaShieldAlt,
  FaUserCheck,
  FaHandsHelping,
  FaGem,
} from "react-icons/fa";

const matrimonyFeatures = [
  {
    icon: FaUserCheck,
    title: "Verified Profiles",
    description:
      "Connect with genuine Arya Vysya bride and groom profiles.",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy & Security",
    description:
      "Your personal and family details are handled with care.",
  },
  {
    icon: FaUsers,
    title: "Family Values",
    description:
      "Bringing families together with shared values and traditions.",
  },
  {
    icon: FaHandsHelping,
    title: "Easy Connections",
    description:
      "Find suitable life partners with ease and confidence.",
  },
];

export default function Hero() {
  return (
    <main className="bg-white">
      {/* HERO SECTION - WHITE BACKGROUND */}
      <section className="relative overflow-hidden bg-white py-8 text-[#690015] sm:py-10 lg:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
           

            {/* Heading */}
            <h1 className="mt-4 font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-2xl">
              
              <span className="mt-1 block text-[#a67816]">
               ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
              </span>
            </h1>

            <div className="mx-auto mt-4 h-[2px] w-16 bg-[#d9a928]" />

               
          </div>
        </div>
      </section>

      
      {/* ORGANIZER & SERVICE GOAL SECTION */}
      <section className="bg-white  ">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#ead8a5] bg-white p-5 sm:p-8">
            {/* Organizer Details */}
            <div className="grid items-center gap-6 sm:grid-cols-[220px_1fr] sm:gap-8">
              <div className="mx-auto w-full max-w-[220px]">
                <img
                  src="/about/beld.jpeg"
                  alt="బెల్డ గురుమూర్తి గుప్త"
                  className="h-auto max-h-[280px] w-full rounded-xl border border-[#ead8a5] object-cover"
                />
              </div>

              <div className="text-center sm:text-left">
                 

                <h2 className="mt-3 font-serif text-xl font-bold text-[#690015] sm:text-2xl">
                  బెల్డ గురుమూర్తి గుప్త
                </h2>

                <p className="mt-2 text-sm font-semibold text-[#5c4141] sm:text-base">
                  చంపాపేట ఆర్య వైశ్య సంఘం
                </p>

                <p className="mt-1 text-sm text-[#5c4141]">
                  పరిచయ వేదిక విభాగం
                </p>

                <div className="mx-auto mt-4 h-[2px] w-16 bg-[#d9a928] sm:mx-0" />

                <div className="mt-4 space-y-2 text-sm text-[#5c4141] sm:text-base">
                  <p>
                    <span className="font-semibold text-[#690015]">
                      Phone:
                    </span>{" "}
                    <a
                      href="tel:+919246119408"
                      className="transition hover:text-[#a67816]"
                    >
                      +91 92461 19408
                    </a>
                  </p>

                  <p>
                    <span className="font-semibold text-[#690015]">
                      Email:
                    </span>{" "}
                    <a
                      href="mailto:beldaguru@gmail.com"
                      className="break-all transition hover:text-[#a67816]"
                    >
                      beldaguru@gmail.com
                    </a>
                  </p>

                  <p>
                    <span className="font-semibold text-[#690015]">
                      Location:
                    </span>{" "}
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>

            {/* Service Goal */}
            <div className="mt-8 border-t border-[#ead8a5] pt-7">

              <h3 className="text-center font-serif text-xl font-bold text-[#690015] sm:text-2xl">
                మా సేవా లక్ష్యం
              </h3>
 <div className="mt-7 grid grid-cols-3 gap-2 border-t border-[#ead8a5] pt-5 sm:gap-6">
              <div>
                <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
                  90%
                </h2>
                <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
                  Brides&apos; Marriages
                </p>
              </div>

              <div className="border-x border-[#ead8a5] px-1">
                <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
                  75–80%
                </h2>
                <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
                  Grooms&apos; Marriages
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#a67816] sm:text-2xl">
                  143వ
                </h2>
                <p className="mt-1 text-[11px] text-[#5c4141] sm:text-sm">
                  Matrimony Meet
                </p>
              </div>
            </div>
              <div className="mx-auto mt-3 h-[2px] w-16 bg-[#d9a928]" />

              <p className="mt-5 text-justify text-sm leading-8 text-[#5c4141] sm:text-base">
                ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక ప్రప్రథమంగా తేదీ
                30-11-2014 నుండి ప్రారంభించబడినది. 90 శాతం వధువులు,
                75–80 శాతం వరులు వివాహ సంపన్నత పొందియున్నారు. వివాహం
                చేసుకున్న వారి కుటుంబ సభ్యుల ఆశీర్వాద బలం మాకు ఎంతో
                స్ఫూర్తి, పట్టుదలను అందిస్తున్నాయి.
              </p>

              <p className="mt-4 text-justify text-sm leading-8 text-[#5c4141] sm:text-base">
                ఈ వేదిక 143వది 4-10-2026న జరిగినది. మరిన్ని వేదికలు
                భావి తరాలకు అందాలని, శ్రీ వాసవి కన్యకా పరమేశ్వరి
                అమ్మవారి అనుగ్రహం ఉండాలని ఆకాంక్షిస్తూ ఈ సేవా
                కార్యక్రమాన్ని కొనసాగిస్తున్నాము.
              </p>
            </div>

            {/* Organizer Closing */}
            <div className="mt-7 border-t border-[#ead8a5] pt-6 text-center">
              <p className="font-serif text-sm text-[#5c4141] sm:text-base">
                సదా మీ సేవలో
              </p>

              <p className="mt-2 font-serif text-lg font-bold text-[#690015]">
                నిర్వాహకులు
              </p>

              <p className="mt-1 font-serif text-base font-semibold text-[#690015]">
                బెల్డ గురుమూర్తి గుప్త
              </p>

              <p className="mt-1 text-sm text-[#5c4141]">
                చంపాపేట ఆర్య వైశ్య సంఘం
              </p>

              <p className="mt-1 text-sm text-[#5c4141]">
                పరిచయ వేదిక విభాగం
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
