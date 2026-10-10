"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function ContactPage() {
  return (
    <main className="bg-[#fff8f8]">

      {/* Hero Section */}

      <section className=" py-10">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-2xl text-rose-600 ">
            Contact Us
          </h1>

          <p className="mt-5 text-lg text-gray-600">
            We'd love to hear from you. Get in touch with our support team.
          </p>

        </div>

      </section>

      {/* Contact Section */}

      <section className="py-5">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl text-rose-600 mb-8">
              Send Us a Message
            </h2>

            <form className="space-y-5">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-rose-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-rose-500"
              />

              <input
                type="text"
                placeholder="Mobile Number"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-rose-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-rose-500"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-rose-500"
              />

              <button
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl font-semibold transition"
              >
                Send Message
              </button>

            </form>

          </div>

          {/* Contact Details */}

          <div>

            <h2 className=" text-2xl text-rose-600 mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-5">

                <div className="bg-rose-100 w-14 h-14 rounded-full flex items-center justify-center text-rose-600 text-xl">
                  <FaPhoneAlt />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Phone
                  </h3>

                  <p className="text-gray-500">
                    +91 92461 19408
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-5">

                <div className="bg-rose-100 w-14 h-14 rounded-full flex items-center justify-center text-rose-600 text-xl">
                  <FaEnvelope />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Email
                  </h3>

                  <p className="text-gray-500">
                   beldaguru@gmail.com
                  </p>

                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-5">

                <div className="bg-rose-100 w-14 h-14 rounded-full flex items-center justify-center text-rose-600 text-xl">
                  <FaMapMarkerAlt />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Office
                  </h3>

                   <p className="font-semibold text-[#800018]">
                  Champapet Aaryavysya Sangam
                </p>

                <p className="font-medium text-gray-700">
                  Parichaya Vedica Vibhagam
                </p>

                <p>
                  BVB Dhamam,
                  17-1-383/N/80/A/60,
                  Brindavan Colony
                </p>

                <p>
                  Vaishali Nagar Post,
                  Saroornagar Mandal,
                  Ranga Reddy Dist.
                </p>

                <p className="font-medium text-gray-700">
                  Aaryavysya Mahasabha Telangana
                  · Hyderabad – 500079
                </p>
                </div>

              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex gap-5">

                <div className="bg-rose-100 w-14 h-14 rounded-full flex items-center justify-center text-rose-600 text-xl">
                  <FaClock />
                </div>

                <div>

                  <h3 className="font-bold text-lg">
                    Working Hours
                  </h3>

                 
                      <p className="mt-1 text-gray-500"> Every Month - First Sunday </p> </div>

                 


              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Google Map Location */}
      <section className="pb-12 pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-rose-600">
              Our Location
            </h2>

            <p className="mt-3 text-gray-600">
              Champapet Aaryavysya Sangam – Parichaya Vedica Vibhagam
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=17.3472834,78.5177906&z=16&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Champapet Aaryavysya Sangam Location"
              className="border-0"
            />
          </div>

          <div className="mt-5 text-center">
            <a
              href="https://www.google.com/maps/place/17%C2%B020'50.2%22N+78%C2%B031'04.1%22E/@17.3472834,78.5152157,831m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d17.3472834!4d78.5177906"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Google Map 

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="rounded-3xl overflow-hidden shadow-xl">

            <iframe
              src="https://www.google.com/maps?q=Hyderabad&output=embed"
              width="100%"
              height="450"
              loading="lazy"
              className="border-0"
            ></iframe>

          </div>

        </div>

      </section>*/}

    </main>
  );
}