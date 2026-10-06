import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#800018] text-white mt-20">

      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Arya Vysya Matrimony
          </h2>

          <p className="text-gray-200 leading-7">
            Trusted Arya Vysya Matrimony platform helping families find
            genuine and verified bride & groom profiles across India.
          </p>

          <div className="flex gap-3 mt-6">
            <a
              
              className="w-10 h-10 rounded-full bg-white text-[#7a1233] flex items-center justify-center hover:bg-rose-200"
            >
              <FaFacebookF />
            </a>

            <a
              
              className="w-10 h-10 rounded-full bg-white text-[#7a1233] flex items-center justify-center hover:bg-rose-200"
            >
              <FaInstagram />
            </a>

            <a
              
              className="w-10 h-10 rounded-full bg-white text-[#7a1233] flex items-center justify-center hover:bg-rose-200"
            >
              <FaTwitter />
            </a>

            <a
              
              className="w-10 h-10 rounded-full bg-white text-[#7a1233] flex items-center justify-center hover:bg-rose-200"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
         <ul className="space-y-3 text-gray-200">

  <li>
    <Link href="/" className="hover:text-white transition">
      Home
    </Link>
  </li>

  <li>
    <Link href="/about" className="hover:text-white transition">
      About Us
    </Link>
  </li>

  <li>
    <Link href="/matches" className="hover:text-white transition">
      Search Profiles
    </Link>
  </li>

  <li>
    <Link href="/membership" className="hover:text-white transition">
      Membership
    </Link>
  </li>

  <li>
    <Link href="/success-stories" className="hover:text-white transition">
      Success Stories
    </Link>
  </li>

  <li>
    <Link href="/contact" className="hover:text-white transition">
      Contact Us
    </Link>
  </li>

</ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Our Services
          </h3>

         <ul className="space-y-3 text-gray-200">

  <li>
    <Link href="/register" className="hover:text-white transition">
      Free Registration
    </Link>
  </li>

  <li>
    <Link href="/matches" className="hover:text-white transition">
      Verified Profiles
    </Link>
  </li>

  <li>
    <Link href="/membership" className="hover:text-white transition">
      Premium Membership
    </Link>
  </li>

  
  <li>
    <Link href="/contact" className="hover:text-white transition">
      Customer Support
    </Link>
  </li>

</ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5">
            Contact Us
          </h3>

          <div className="space-y-4 text-gray-200">

            <div className="flex items-center gap-3">
              <FaPhoneAlt />
              <span>+91 92461 19408</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope />
              <span>beldaguru@gmail.com</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1" />
              <span>
                Hyderabad,
                Telangana,
                India
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom */}
     <div className="border-t border-rose-800"> <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-5 text-center"> <p className="text-sm text-gray-300"> © 2026 Arya Vysya Matrimony. All Rights Reserved. </p> </div> </div>

    </footer>
  );
}