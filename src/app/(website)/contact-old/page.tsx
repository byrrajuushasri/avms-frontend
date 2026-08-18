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

      <section className="py-20">

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
                    +91 98765 43210
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
                    support@aryavysyamatrimony.com
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

                  <p className="text-gray-500">
                    Hyderabad, Telangana, India
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

                  <p className="text-gray-500">
                    Monday - Saturday
                  </p>

                  <p className="text-gray-500">
                    9:00 AM - 6:00 PM
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Google Map */}

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

      </section>

    </main>
  );
}