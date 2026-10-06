
import Image from "next/image";
import {
  FaHeart,
  FaCalendarAlt,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <main className="overflow-hidden bg-[#fffaf9] text-gray-800">

      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section className="bg-white py-8 sm:py-10">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-2xl border border-[#eadbb9] bg-white p-2 shadow-lg">

              <Image
                src="/about/beld.jpeg"
                alt="Beld Gurumoorthy - Champapet Arya Vysya Sangham"
                width={600}
                height={450}
                priority
                className="h-auto w-full rounded-xl object-cover"
              />

              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/95 p-3 text-center shadow-md">
                <p className="text-xs font-semibold text-[#800018]">
                  Community Service
                </p>

                <h3 className="text-lg font-bold text-[#800018]">
                  Beld Gurumoorthy
                </h3>


                <p className="text-xs text-gray-600">
                  Champapet Arya Vysya Sangham
                </p>

                   <p className="text-xs text-gray-600">
                Phone:  +91 92461 19408
                </p>
              <p className="text-xs text-gray-600">
                Email: beldaguru@gmail.com
                </p>
                   
              </div>

            </div>
          </div>

          {/* CONTENT */}
          <div className="text-center lg:text-left">

            <span className="inline-block rounded-full border border-[#eadbb9] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#800018]">
              About Us
            </span>

            <p className="mt-3 text-sm font-semibold text-[#800018]">
              చంపాపేట ఆర్య వైశ్య సంఘం
            </p>

            <h1 className="mt-2 text-2xl font-extrabold leading-tight text-[#800018] sm:text- xl">
              ఆర్య వైశ్య వివాహ
              
              ఉచిత పరిచయ వేదిక
            </h1>
 

            <div className="mt-5 rounded-2xl border border-[#eadbb9] bg-[#fffaf1] p-5">

              <p className="text-sm leading-7 text-gray-700">
                ఆర్య వైశ్య వివాహ ఉచిత పరిచయ వేదిక
                <span className="font-bold text-[#800018]">
                  {" "}28-11-2014{" "}
                </span>
                నుండి ప్రారంభించబడినది.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-[#800018]">
                    90%
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    వధువుల వివాహాలు
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 text-center shadow-sm">
                  <p className="text-xl font-extrabold text-[#800018]">
                    75–80%
                  </p>

                  <p className="mt-1 text-[11px] text-gray-600">
                    వరుల వివాహాలు
                  </p>
                </div>

              </div>

             
               

            <p className="mt-1 text-xs font-semibold text-[#800018]">
              శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి ప్రార్థన
            </p>

            <div className="mt-5 space-y-1 text-sm leading-7 text-gray-700">

              <p className="font-semibold text-[#800018]">
                విశ్వజనని వాసవి మా హృదయ గీతి అందుకో
              </p>

              <p>
                నిత్య పూజ సత్య సింధు
              </p>

              <p>
                ఆత్మ హారతి అందుకో
              </p>

              <div className="mx-auto my-3 h-px w-12 bg-[#eadbb9]" />

              <p>
                గళం పార గ కలం సాగగా
              </p>

              <p>
                సేవ వీణ య మ్రోగగ
              </p>

              <p>
                సౌహర్ద్రత ఆర్ద్రత నిండగా
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
                భక్తితో నిను గొలుతూము
              </p>

              <p className="font-bold text-[#800018]">
                విశ్వ శాంతికి నిలుతూము
              </p>
 <p className="mt-4 text-sm leading-7 text-gray-700">
                ఈ వేదికను భావి తరాలకు అందించాలని,
                శ్రీ వాసవి కన్యకా పరమేశ్వరి అమ్మవారి
                అనుగ్రహం ఎల్లప్పుడూ ఉండాలని కోరుకుంటున్నాము.</p>
           </div>
            </div>
          </div>

        </div>
      </section>


      {/* =====================================================
          JOURNEY
      ====================================================== */}
      <section className="border-y border-[#eadbb9] bg-[#fffaf1] py-8 sm:py-10">

        <div className="mx-auto max-w-5xl px-4 sm:px-6">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-widest text-[#800018]">
              Our Journey
            </p>

            <h2 className="mt-1 text-2xl font-extrabold text-[#800018]">
              సేవా ప్రయాణం
            </h2>

          </div>


          {/* JOURNEY CARDS */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            {/* 2014 */}
            <div className="rounded-2xl border border-[#eadbb9] bg-white p-5 text-center shadow-sm">

              <FaCalendarAlt className="mx-auto text-xl text-[#800018]" />

              <h3 className="mt-2 text-2xl font-extrabold text-[#800018]">
                2014
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                పరిచయ వేదిక ప్రారంభం
              </p>

              <p className="mt-1 text-[11px] font-semibold text-[#800018]">
                28-11-2014
              </p>

            </div>


            {/* 143 */}
            <div className="rounded-2xl border border-[#eadbb9] bg-white p-5 text-center shadow-sm">

              <FaHeart className="mx-auto text-xl text-[#800018]" />

              <h3 className="mt-2 text-2xl font-extrabold text-[#800018]">
                143వ
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                పరిచయ వేదిక
              </p>

            </div>


            {/* 2026 */}
            <div className="rounded-2xl border border-[#eadbb9] bg-white p-5 text-center shadow-sm">

              <FaCheckCircle className="mx-auto text-xl text-[#800018]" />

              <h3 className="mt-2 text-xl font-extrabold text-[#800018]">
                04-10-2026
              </h3>

              <p className="mt-1 text-xs text-gray-600">
                Online Registration
              </p>

            </div>

          </div>


          
      

        </div>

      </section>

    </main>
  );
}

