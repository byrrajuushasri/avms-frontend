"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "Is registration on Arya Vysya Matrimony free?",
    answer:
      "Yes. Registration is completely free. You can create your profile, upload photos, and browse verified bride and groom profiles.",
  },
  {
    question: "How do I search for a suitable match?",
    answer:
      "Use our advanced search filters like age, education, profession, location, and more to find the perfect life partner.",
  },
  {
    question: "Are all profiles verified?",
    answer:
      "Yes. Every profile goes through a verification process using mobile number, email, and manual review to maintain authenticity.",
  },
  {
    question: "How can I contact another member?",
    answer:
      "Premium members can send unlimited interests, view contact details, and communicate securely through the platform.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. Your privacy is our priority. Your personal information is protected with secure privacy settings and encryption.",
  },
  {
    question: "Can I upgrade my membership later?",
    answer:
      "Yes. You can upgrade to Silver, Gold, or Premium membership anytime to unlock additional features.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <span className="text-rose-600 font-semibold uppercase tracking-widest">
            FAQs
          </span>

          <h2 className="text-2xl  text-[#8B1E3F]">
            Frequently Asked Questions
          </h2>

          <p className="text-gray-500 mt-4 text-lg">
            Find answers to the most commonly asked questions about our
            matrimonial services.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">

          {faqData.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transition hover:shadow-lg"
            >

              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {item.question}
                </span>

                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  {active === index ? <FaMinus /> : <FaPlus />}
                </div>
              </button>

              {active === index && (
                <div className="px-6 pb-6 text-gray-600 leading-8 border-t border-gray-100">
                  <p className="pt-5">{item.answer}</p>
                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}