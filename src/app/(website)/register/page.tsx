"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    profile_category: "",
    surname: "",
    name: "",
    father_name: "",
    mother_name: "",
    gotram: "",
    nakshatram: "",
    padham: "",
    rasi: "",
    color: "",
    date_of_birth: "",
    height: "",
    education: "",
    occupation: "",
    annual_income: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    family_details: "",
    brother_details: "",
    sister_details: "",
    property_details: "",
    preferred_requirements: "",
    photo: null as File | null,
  });

  /* =========================
     HANDLE INPUT CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     HANDLE PHOTO
  ========================= */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
    }
  };

  /* =========================
     SUBMIT
  ========================= */

 const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (loading) return;

  // Password validation
  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Basic validation
  if (!formData.name.trim()) {
    alert("Please enter your name");
    return;
  }

  if (!formData.mobile.trim()) {
    alert("Please enter your mobile number");
    return;
  }

  if (!formData.email.trim()) {
    alert("Please enter your email");
    return;
  }

  if (!formData.password.trim()) {
    alert("Please enter your password");
    return;
  }

  setLoading(true);

  try {
    // Create FormData
    const formDataToSend = new FormData();

    formDataToSend.append(
      "profile_category",
      formData.profile_category
    );

    formDataToSend.append(
      "surname",
      formData.surname
    );

    formDataToSend.append(
      "name",
      formData.name
    );

    formDataToSend.append(
      "father_name",
      formData.father_name
    );

    formDataToSend.append(
      "mother_name",
      formData.mother_name
    );

    formDataToSend.append(
      "gotram",
      formData.gotram
    );

    formDataToSend.append(
      "nakshatram",
      formData.nakshatram
    );

    formDataToSend.append(
      "padham",
      formData.padham === ""
        ? ""
        : String(Number(formData.padham))
    );

    formDataToSend.append(
      "rasi",
      formData.rasi
    );

    formDataToSend.append(
      "color",
      formData.color
    );

    formDataToSend.append(
      "date_of_birth",
      formData.date_of_birth
    );

    formDataToSend.append(
      "height",
      formData.height
    );

    formDataToSend.append(
      "education",
      formData.education
    );

    formDataToSend.append(
      "occupation",
      formData.occupation
    );

    formDataToSend.append(
      "annual_income",
      formData.annual_income
    );

    formDataToSend.append(
      "mobile",
      formData.mobile
    );

    formDataToSend.append(
      "email",
      formData.email
    );

    formDataToSend.append(
      "password",
      formData.password
    );

    formDataToSend.append(
      "address",
      formData.address
    );

    formDataToSend.append(
      "family_details",
      formData.family_details
    );

    formDataToSend.append(
      "brother_details",
      formData.brother_details
    );

    formDataToSend.append(
      "sister_details",
      formData.sister_details
    );

    formDataToSend.append(
      "property_details",
      formData.property_details
    );

    formDataToSend.append(
      "preferred_requirements",
      formData.preferred_requirements
    );

    // Photo
    if (formData.photo) {
      formDataToSend.append(
        "photo",
        formData.photo
      );
    }

    console.log(
      "Sending registration with photo:",
      formData.photo?.name
    );

    const response = await fetch(
      "http://localhost:5000/matrimonial-users/register",
      {
        method: "POST",

        // IMPORTANT:
        // Content-Type manually add చేయకండి.
        // Browser automatically multipart/form-data boundary set చేస్తుంది.

        body: formDataToSend,
      }
    );

    console.log("Status:", response.status);

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok && data.success) {
      alert("Registration Successful!");

      router.push("/login");
    } else {
      alert(
        data.message ||
          "Registration Failed"
      );
    }
  } catch (error) {
    console.error(
      "Registration Error:",
      error
    );

    alert(
      "Backend server connection failed. Please check whether NestJS is running on port 5000."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* =========================
          BACKGROUND
      ========================= */}

      <div className="absolute -left-56 top-20 w-[500px] h-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 w-[500px] h-[500px] rounded-full bg-rose-200/40 blur-[120px]" />

      <FaHeart className="absolute left-10 top-48 text-pink-300 text-7xl opacity-20" />

      <FaHeart className="absolute right-16 bottom-24 text-rose-300 text-8xl opacity-20" />

      {/* =========================
          MAIN CARD
      ========================= */}

      <div className="relative z-10 flex justify-center py-10 px-6">

        <div className="w-full max-w-6xl bg-white/95 backdrop-blur rounded-3xl border border-pink-100 shadow-[0_20px_60px_rgba(233,30,99,0.12)] p-6 sm:p-8 lg:p-10">

          {/* =========================
              HEADER
          ========================= */}

          <div className="text-center mb-8">

            <h2 className="text-2xl sm:text-3xl font-bold text-[#8B1E3F]">
              Create Your Matrimonial Account
            </h2>

            <p className="text-gray-500 mt-2">
              Begin your journey to find your perfect life partner.
            </p>

          </div>

          {/* =========================
              FORM
          ========================= */}

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-5"
          >

            {/* PROFILE CATEGORY */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Profile Category
              </label>

              <select
                name="profile_category"
                value={formData.profile_category}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Professional">
                  Professional
                </option>

                <option value="Non-Technical">
                  Non-Technical
                </option>

                <option value="Business">
                  Business
                </option>

                <option value="General">
                  General
                </option>
              </select>
            </div>

            {/* SURNAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Surname
              </label>

              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Enter Surname"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* FATHER NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Father Name
              </label>

              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                placeholder="Father Name"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* MOTHER NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mother Name
              </label>

              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="Mother Name"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* =========================
                GOTRAM - 102
            ========================= */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Gotram
              </label>

              <select
                name="gotram"
                value={formData.gotram}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Gotram
                </option>

                <option value="Aathreya">1. Aathreya</option>
                <option value="Aswalayana">2. Aswalayana</option>
                <option value="Agasthya">3. Agasthya</option>
                <option value="Bruhadashwah">4. Bruhadashwah</option>
                <option value="Bodayanah">5. Bodayanah</option>
                <option value="Baradwaja">6. Baradwaja</option>
                <option value="Bargava">7. Bargava</option>
                <option value="Chakrapani">8. Chakrapani</option>
                <option value="Chamarsanah">9. Chamarsanah</option>
                <option value="Daalbyah">10. Daalbyah</option>
                <option value="Durvasah">11. Durvasah</option>
                <option value="Devarathah">12. Devarathah</option>
                <option value="Devavalkyah">13. Devavalkyah</option>
                <option value="Gargyah">14. Gargyah</option>
                <option value="Gruthsna Madah">15. Gruthsna Madah</option>
                <option value="Gopakah">16. Gopakah</option>
                <option value="Gowthama">17. Gowthama</option>
                <option value="Harivalkya">18. Harivalkya</option>
                <option value="JadaBharatha">19. JadaBharatha</option>
                <option value="Jatukarnah">20. Jatukarnah</option>
                <option value="Jambasudhana">21. Jambasudhana</option>
                <option value="Jarathaarkha">22. Jarathaarkha</option>
                <option value="Jaabilih">23. Jaabilih</option>
                <option value="Jabrih">24. Jabrih</option>
                <option value="Jeevanthi">25. Jeevanthi</option>
                <option value="Kanvah">26. Kanvah</option>
                <option value="Kandarpa">27. Kandarpa</option>
                <option value="Kapila">28. Kapila</option>
                <option value="Kapeetha">29. Kapeetha</option>
                <option value="Kasyapa">30. Kasyapa</option>
                <option value="Kuthsah">31. Kuthsah</option>
                <option value="Koundinya">32. Koundinya</option>
                <option value="Koushika">33. Koushika</option>
                <option value="Krishna">34. Krishna</option>
                <option value="Mandapala">35. Mandapala</option>
                <option value="Manava">36. Manava</option>
                <option value="Mareechi">37. Mareechi</option>
                <option value="Markandeya">38. Markandeya</option>
                <option value="Muniraja">39. Muniraja</option>
                <option value="Mythreyah">40. Mythreyah</option>
                <option value="Mounala">41. Mounala</option>
                <option value="Mounjayanah">42. Mounjayanah</option>
                <option value="Moudgalya">43. Moudgalya</option>
                <option value="Nanaka">44. Nanaka</option>
                <option value="Naradah">45. Naradah</option>
                <option value="Netrapadah">46. Netrapadah</option>
                <option value="Ouchithya">47. Ouchithya</option>
                <option value="Parasparayanah">48. Parasparayanah</option>
                <option value="Pallavah">49. Pallavah</option>
                <option value="PavithraPranih">50. PavithraPranih</option>
                <option value="Parasharya">51. Parasharya</option>
                <option value="Pingala">52. Pingala</option>
                <option value="Pundareeka">53. Pundareeka</option>
                <option value="Poothimava">54. Poothimava</option>
                <option value="Poundraka">55. Poundraka</option>
                <option value="Poulasthya">56. Poulasthya</option>
                <option value="Pracheena">57. Pracheena</option>
                <option value="Prabhatha">58. Prabhatha</option>
                <option value="RushyaSrunga">59. RushyaSrunga</option>
                <option value="Sharabangah">60. Sharabangah</option>
                <option value="Sharjgaravah">61. Sharjgaravah</option>
                <option value="Sandilya">62. Sandilya</option>
                <option value="Sreevathsah">63. Sreevathsah</option>
                <option value="Sreedharah">64. Sreedharah</option>
                <option value="Suklarushi">65. Suklarushi</option>
                <option value="Sowcheyah">66. Sowcheyah</option>
                <option value="Sownaka">67. Sownaka</option>
                <option value="Sathyah">68. Sathyah</option>
                <option value="Sanathkumara">69. Sanathkumara</option>
                <option value="Sanadanath">70. Sanadanath</option>
                <option value="Samvarthaka">71. Samvarthaka</option>
                <option value="Sukanchana">72. Sukanchana</option>
                <option value="Sutheekshah">73. Sutheekshah</option>
                <option value="Sundarah">74. Sundarah</option>
                <option value="Suvarna">75. Suvarna</option>
                <option value="Subramanyah">76. Subramanyah</option>

                {/* 77 is missing in the list supplied */}
                
                <option value="Sowbarna">78. Sowbarna</option>
                <option value="Sowmyah">79. Sowmyah</option>
                <option value="Sowvarna">80. Sowvarna</option>
                <option value="Tharanih">81. Tharanih</option>
                <option value="Thittirih">82. Thittirih</option>
                <option value="Thrijatah">83. Thrijatah</option>
                <option value="Thaithrevah">84. Thaithrevah</option>
                <option value="Uthkrushta">85. Uthkrushta</option>
                <option value="Uttamouja">86. Uttamouja</option>
                <option value="Ugrasena">87. Ugrasena</option>
                <option value="Vatuka">88. Vatuka</option>
                <option value="Vaarathanthu">89. Vaarathanthu</option>
                <option value="Varuna">90. Varuna</option>
                <option value="Vasista">91. Vasista</option>
                <option value="Vamadeva">92. Vamadeva</option>
                <option value="Vasudeva">93. Vasudeva</option>
                <option value="Vaayuvya">94. Vaayuvya</option>
                <option value="Valmika">95. Valmika</option>
                <option value="Vishwaksenah">96. Vishwaksenah</option>
                <option value="Viswamithra">97. Viswamithra</option>
                <option value="Vishnuvrudha">98. Vishnuvrudha</option>
                <option value="Virohithyah">99. Virohithyah</option>
                <option value="Vyana">100. Vyana</option>
                <option value="Yaskah">101. Yaskah</option>
                <option value="Yagnavalkya">102. Yagnavalkya</option>
              </select>
            </div>

            {/* NAKSHATRAM */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Nakshatram
              </label>

              <select
                name="nakshatram"
                value={formData.nakshatram}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Nakshatram
                </option>

                <option value="Ashwini">Ashwini</option>
                <option value="Bharani">Bharani</option>
                <option value="Krittika">Krittika</option>
                <option value="Rohini">Rohini</option>
                <option value="Mrigashira">Mrigashira</option>
                <option value="Ardra">Ardra</option>
                <option value="Punarvasu">Punarvasu</option>
                <option value="Pushya">Pushya</option>
                <option value="Ashlesha">Ashlesha</option>
                <option value="Magha">Magha</option>
                <option value="Purva Phalguni">
                  Purva Phalguni
                </option>
                <option value="Uttara Phalguni">
                  Uttara Phalguni
                </option>
                <option value="Hasta">Hasta</option>
                <option value="Chitra">Chitra</option>
                <option value="Swati">Swati</option>
                <option value="Vishakha">Vishakha</option>
                <option value="Anuradha">Anuradha</option>
                <option value="Jyeshtha">Jyeshtha</option>
                <option value="Moola">Moola</option>
                <option value="Purva Ashadha">
                  Purva Ashadha
                </option>
                <option value="Uttara Ashadha">
                  Uttara Ashadha
                </option>
                <option value="Shravana">Shravana</option>
                <option value="Dhanishta">Dhanishta</option>
                <option value="Shatabhisha">Shatabhisha</option>
                <option value="Purva Bhadrapada">
                  Purva Bhadrapada
                </option>
                <option value="Uttara Bhadrapada">
                  Uttara Bhadrapada
                </option>
                <option value="Revathi">Revathi</option>
              </select>
            </div>

            {/* PADHAM */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Padham
              </label>

              <select
                name="padham"
                value={formData.padham}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Padham
                </option>

                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* RASI */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Rasi
              </label>

              <select
                name="rasi"
                value={formData.rasi}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Rasi
                </option>

                <option value="Mesha">
                  Mesha (Aries)
                </option>

                <option value="Vrishabha">
                  Vrishabha (Taurus)
                </option>

                <option value="Mithuna">
                  Mithuna (Gemini)
                </option>

                <option value="Karka">
                  Karka (Cancer)
                </option>

                <option value="Simha">
                  Simha (Leo)
                </option>

                <option value="Kanya">
                  Kanya (Virgo)
                </option>

                <option value="Tula">
                  Tula (Libra)
                </option>

                <option value="Vrischika">
                  Vrischika (Scorpio)
                </option>

                <option value="Dhanu">
                  Dhanu (Sagittarius)
                </option>

                <option value="Makara">
                  Makara (Capricorn)
                </option>

                <option value="Kumbha">
                  Kumbha (Aquarius)
                </option>

                <option value="Meena">
                  Meena (Pisces)
                </option>
              </select>
            </div>

            {/* DATE OF BIRTH */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Date of Birth
              </label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* COLOR */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Color
              </label>

              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">
                  Select Color
                </option>

                <option value="Very Fair">
                  Very Fair
                </option>

                <option value="Fair">
                  Fair
                </option>

                <option value="Wheatish">
                  Wheatish
                </option>

                <option value="Wheatish Brown">
                  Wheatish Brown
                </option>

                <option value="Brown">
                  Brown
                </option>

                <option value="Dark">
                  Dark
                </option>
              </select>
            </div>

            {/* HEIGHT */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Height
              </label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder={`Height (Example 5'6")`}
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email ID
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email ID"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* EDUCATION */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Education
              </label>

              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Education"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* OCCUPATION */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Occupation
              </label>

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* ANNUAL INCOME */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Salary / Income
              </label>

              <input
                type="text"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                placeholder="Annual Income"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* MOBILE */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* FAMILY DETAILS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Family Details
              </label>

              <textarea
                name="family_details"
                value={formData.family_details}
                onChange={handleChange}
                placeholder="Family Details"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* BROTHER DETAILS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Brother Details
              </label>

              <textarea
                name="brother_details"
                value={formData.brother_details}
                onChange={handleChange}
                placeholder="Brother Details"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* SISTER DETAILS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Sister Details
              </label>

              <textarea
                name="sister_details"
                value={formData.sister_details}
                onChange={handleChange}
                placeholder="Sister Details"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* PROPERTY DETAILS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Property Details
              </label>

              <textarea
                name="property_details"
                value={formData.property_details}
                onChange={handleChange}
                placeholder="Property Details"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* PREFERRED REQUIREMENTS */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Preferred Requirements
              </label>

              <textarea
                name="preferred_requirements"
                value={formData.preferred_requirements}
                onChange={handleChange}
                placeholder="Partner Requirements"
                rows={3}
                className="mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* PHOTO */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Upload Photo
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 w-full border rounded-xl p-3 border-pink-200"
              />

              {formData.photo && (
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {formData.photo.name}
                </p>
              )}
            </div>

            {/* =========================
                SUBMIT BUTTON
            ========================= */}

            <div className="md:col-span-2 flex justify-center mt-6">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full sm:w-52
                  h-12
                  rounded-xl
                  bg-gradient-to-r
                  from-[#d81b60]
                  via-[#e91e63]
                  to-[#f06292]
                  text-white
                  font-semibold
                  text-sm
                  shadow-md
                  hover:shadow-xl
                  transition
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? "Creating Profile..."
                  : "Create Profile"}
              </button>

            </div>

          </form>

          {/* =========================
              LOGIN
          ========================= */}

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Already have an account?

              <Link
                href="/login"
                className="ml-2 text-rose-600 font-semibold hover:underline"
              >
                Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}