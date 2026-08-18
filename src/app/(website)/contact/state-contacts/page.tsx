"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaBuilding,
  FaChevronRight,
} from "react-icons/fa";

const stateContacts = [
  {
    img: "/about/president.jpg",
    state: "Telangana",
    organization: "Adhyaksha",
    president: "Sri Raman Rao",
    secretary: "Sri Prasad",
    phone: "+91 98765 43210",
    email: "ap@aryavysyamahasabha.org",
    location: "Vijayawada, Andhra Pradesh",
  },
  {
    img: "/about/vice-president.jpg",
    state: "Telangana",
    organization: "president",
    president: "Sri Srinivas",
    secretary: "Sri Rajesh",
    phone: "+91 98765 43211",
    email: "telangana@aryavysyamahasabha.org",
    location: "Hyderabad, Telangana",
  },
  {
    img: "/about/secretary.jpg",
    state: "Telangana",
    organization: "organization secretary",
    president: "Sri Prasad",
    secretary: "Sri Mahesh",
    phone: "+91 98765 43212",
    email: "telangana@aryavysyamahasabha.org",
    location: "Bengaluru, Telangana",
  },
  {
    img: "/about/treasurer.jpg",
    state: "Telangana",
    organization: "general secretary",
    president: "Sri Rajesh",
    secretary: "Sri Kumar",
    phone: "+91 98765 43213",
    email: "telangana@aryavysyamahasabha.org",
    location: "Chennai, Telangana",
  },
  {
    img: "/about/treasurer.jpg",
    state: "Telangana",
    organization: "Media secretary",
    president: "Sri Rajesh",
    secretary: "Sri Kumar",
    phone: "+91 98765 43213",
    email: "telangana@aryavysyamahasabha.org",
    location: "Chennai, Telangana",
  },
];

export default function StateContactsPage() {
  return (
    <main className="min-h-screen bg-slate-50">

  

      {/* =====================================================
          STATE CONTACTS
      ====================================================== */}

      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-6">

          {/* Section Heading */}

          <div className="mb-12 text-center">

            

            <h2 className="mt-3 font-serif text-3xl font-bold text-[#800018]">
              State-wise  & Contacts
            </h2>

             
          </div>

          {/* =================================================
              CONTACT CARDS
          ================================================= */}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {stateContacts.map((contact, index) => (

              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

{/* Image */}
<div className="relative h-75 w-full overflow-hidden bg-white">

  <Image
    src={contact.img}
    alt={contact.president}
    width={600}
    height={450}
    className="block h-auto w-full object-contain"
  />

  {/* State Badge */}
  <div className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#800018] shadow-lg">
    {contact.state}
  </div>

</div>

                {/* Content */}

                <div className="p-6">

                  {/* Organization */}

                  <h3 className="text-lg font-bold leading-6 text-gray-800 transition group-hover:text-[#800018]">
                    {contact.organization}
                  </h3>

                  {/* Divider */}

                  <div className="my-4 h-px bg-gray-100" />

                  {/* President */}

                  <div className="flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#a00018]">
                      <FaUsers />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        President
                      </p>

                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {contact.president}
                      </p>
                    </div>

                  </div>

                  {/* Secretary */}

                  <div className="mt-4 flex items-start gap-3">

                    
 

                  </div>

                  {/* Location */}

                  <div className="mt-4 flex items-start gap-3">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#a00018]">
                      <FaMapMarkerAlt />
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Location
                      </p>

                      <p className="mt-1 text-sm font-medium text-gray-700">
                        {contact.location}
                      </p>
                    </div>

                  </div>

                  {/* Contact */}

                  <div className="mt-5 border-t border-gray-100 pt-5">

                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition hover:bg-red-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#a00018] text-white">
                        <FaPhoneAlt className="text-sm" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-400">
                          Phone
                        </p>

                        <p className="text-sm font-bold text-gray-700">
                          {contact.phone}
                        </p>
                      </div>

                    </a>

                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3 transition hover:bg-red-50"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#800018] text-white">
                        <FaEnvelope className="text-sm" />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs font-semibold text-gray-400">
                          Email
                        </p>

                        <p className="truncate text-sm font-bold text-gray-700">
                          {contact.email}
                        </p>

                      </div>

                    </a>

                  </div>

                  
                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

     

    </main>
  );
}