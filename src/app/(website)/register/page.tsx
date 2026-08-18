"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

/* =========================
   STATIC DATA (module scope so it's usable both inside
   handleSubmit and inside the JSX below)
========================= */

const telanganaData = {
  Hyderabad: {
    mandals: [
      "Amberpet",
      "Asifnagar",
      "Bahadurpura",
      "Charminar",
      "Khairatabad",
      "Nampally",
      "Secunderabad",
      "Shaikpet",
      "Musheerabad",
    ],
    sanghams: [
      "Hyderabad Arya Vysya Sangham",
      "Secunderabad Arya Vysya Sangham",
      "Charminar Arya Vysya Sangham",
    ],
  },

  Rangareddy: {
    mandals: [
      "Rajendranagar",
      "Serilingampally",
      "Shamshabad",
      "Maheshwaram",
      "Ibrahimpatnam",
      "Hayathnagar",
    ],
    sanghams: [
      "Rangareddy Arya Vysya Sangham",
      "Shamshabad Arya Vysya Sangham",
      "Rajendranagar Arya Vysya Sangham",
    ],
  },

  Medchal_Malkajgiri: {
    mandals: [
      "Medchal",
      "Malkajgiri",
      "Keesara",
      "Kapra",
      "Quthbullapur",
      "Shamirpet",
    ],
    sanghams: [
      "Medchal Arya Vysya Sangham",
      "Malkajgiri Arya Vysya Sangham",
      "Keesara Arya Vysya Sangham",
    ],
  },

  Sangareddy: {
    mandals: [
      "Sangareddy",
      "Patancheru",
      "Ameenpur",
      "Zaheerabad",
      "Jinnaram",
      "Narayankhed",
    ],
    sanghams: [
      "Sangareddy Arya Vysya Sangham",
      "Patancheru Arya Vysya Sangham",
      "Zaheerabad Arya Vysya Sangham",
    ],
  },

  Warangal: {
    mandals: [
      "Hanamkonda",
      "Kazipet",
      "Warangal",
      "Atmakur",
      "Dharmasagar",
      "Parkal",
    ],
    sanghams: [
      "Warangal Arya Vysya Sangham",
      "Hanamkonda Arya Vysya Sangham",
      "Kazipet Arya Vysya Sangham",
    ],
  },

  Karimnagar: {
    mandals: [
      "Karimnagar",
      "Manakondur",
      "Huzurabad",
      "Choppadandi",
      "Gangadhara",
      "Veenavanka",
    ],
    sanghams: [
      "Karimnagar Arya Vysya Sangham",
      "Huzurabad Arya Vysya Sangham",
      "Manakondur Arya Vysya Sangham",
    ],
  },

  Nizamabad: {
    mandals: [
      "Nizamabad",
      "Bodhan",
      "Armoor",
      "Balkonda",
      "Dichpally",
      "Navipet",
    ],
    sanghams: [
      "Nizamabad Arya Vysya Sangham",
      "Bodhan Arya Vysya Sangham",
      "Armoor Arya Vysya Sangham",
    ],
  },

  Khammam: {
    mandals: [
      "Khammam",
      "Madhira",
      "Wyra",
      "Kusumanchi",
      "Kallur",
      "Sathupalli",
    ],
    sanghams: [
      "Khammam Arya Vysya Sangham",
      "Madhira Arya Vysya Sangham",
      "Sathupalli Arya Vysya Sangham",
    ],
  },

  Nalgonda: {
    mandals: [
      "Nalgonda",
      "Miryalaguda",
      "Devarakonda",
      "Chandur",
      "Nakrekal",
      "Munugode",
    ],
    sanghams: [
      "Nalgonda Arya Vysya Sangham",
      "Miryalaguda Arya Vysya Sangham",
      "Devarakonda Arya Vysya Sangham",
    ],
  },

  Mahbubnagar: {
    mandals: [
      "Mahbubnagar",
      "Jadcherla",
      "Bhoothpur",
      "Devarkadra",
      "Narayanpet",
      "Makthal",
    ],
    sanghams: [
      "Mahbubnagar Arya Vysya Sangham",
      "Jadcherla Arya Vysya Sangham",
      "Narayanpet Arya Vysya Sangham",
    ],
  },
} as const;

const gotramList = [
  "Aathreya",
  "Aswalayana",
  "Agasthya",
  "Bruhadashwah",
  "Bodayanah",
  "Baradwaja",
  "Bargava",
  "Chakrapani",
  "Chamarsanah",
  "Daalbyah",
  "Durvasah",
  "Devarathah",
  "Devavalkyah",
  "Gargyah",
  "Gruthsna Madah",
  "Gopakah",
  "Gowthama",
  "Harivalkya",
  "JadaBharatha",
  "Jatukarnah",
  "Jambasudhana",
  "Jarathaarkha",
  "Jaabilih",
  "Jabrih",
  "Jeevanthi",
  "Kanvah",
  "Kandarpa",
  "Kapila",
  "Kapeetha",
  "Kasyapa",
  "Kuthsah",
  "Koundinya",
  "Koushika",
  "Krishna",
  "Mandapala",
  "Manava",
  "Mareechi",
  "Markandeya",
  "Muniraja",
  "Mythreyah",
  "Mounala",
  "Mounjayanah",
  "Moudgalya",
  "Nanaka",
  "Naradah",
  "Netrapadah",
  "Ouchithya",
  "Parasparayanah",
  "Pallavah",
  "PavithraPranih",
  "Parasharya",
  "Pingala",
  "Pundareeka",
  "Poothimava",
  "Poundraka",
  "Poulasthya",
  "Pracheena",
  "Prabhatha",
  "RushyaSrunga",
  "Sharabangah",
  "Sharjgaravah",
  "Sandilya",
  "Sreevathsah",
  "Sreedharah",
  "Suklarushi",
  "Sowcheyah",
  "Sownaka",
  "Sathyah",
  "Sanathkumara",
  "Sanadanath",
  "Samvarthaka",
  "Sukanchana",
  "Sutheekshah",
  "Sundarah",
  "Suvarna",
  "Subramanyah",
  // 77 is missing in the list supplied
  "Sowbarna",
  "Sowmyah",
  "Sowvarna",
  "Tharanih",
  "Thittirih",
  "Thrijatah",
  "Thaithrevah",
  "Uthkrushta",
  "Uttamouja",
  "Ugrasena",
  "Vatuka",
  "Vaarathanthu",
  "Varuna",
  "Vasista",
  "Vamadeva",
  "Vasudeva",
  "Vaayuvya",
  "Valmika",
  "Vishwaksenah",
  "Viswamithra",
  "Vishnuvrudha",
  "Virohithyah",
  "Vyana",
  "Yaskah",
  "Yagnavalkya",
];

const nakshatramList = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Moola",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revathi",
];

const rasiList = [
  { value: "Mesha", label: "Mesha (Aries)" },
  { value: "Vrishabha", label: "Vrishabha (Taurus)" },
  { value: "Mithuna", label: "Mithuna (Gemini)" },
  { value: "Karka", label: "Karka (Cancer)" },
  { value: "Simha", label: "Simha (Leo)" },
  { value: "Kanya", label: "Kanya (Virgo)" },
  { value: "Tula", label: "Tula (Libra)" },
  { value: "Vrischika", label: "Vrischika (Scorpio)" },
  { value: "Dhanu", label: "Dhanu (Sagittarius)" },
  { value: "Makara", label: "Makara (Capricorn)" },
  { value: "Kumbha", label: "Kumbha (Aquarius)" },
  { value: "Meena", label: "Meena (Pisces)" },
];

const educationList = [
  "10th",
  "Intermediate",
  "ITI",
  "Diploma",
  "B.A",
  "B.Com",
  "B.Sc",
  "B.Tech",
  "B.E",
  "BBA",
  "BCA",
  "M.A",
  "M.Com",
  "M.Sc",
  "M.Tech",
  "MBA",
  "MCA",
  "Ph.D",
  "Other",
];

const colorList = [
  "Very Fair",
  "Fair",
  "Wheatish",
  "Wheatish Brown",
  "Brown",
  "Dark",
];

const parentOccupationList = [
  "Business",
  "Government Employee",
  "Private Employee",
  "Farmer",
  "Retired",
  "Self Employed",
  "Late",
  "Other",
];

const profileCategoryList = [
  { value: "Professional", label: "Professional" },
  { value: "Non-Technical", label: "Non-Technical" },
  { value: "Business", label: "Business" },
  { value: "Divorced", label: "Divorced" },
  { value: "Handicapped", label: "Physically Handicapped" },
  { value: "Dearth", label: "Dearth" },
  { value: "Uncle", label: "uncle" },
  { value: "General", label: "Others" },
];

const inputClass =
  "mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";
const textareaClass =
  "mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300";
const labelClass = "text-sm font-medium text-gray-700";

/* Reusable gotram <select> so the 102-item list isn't repeated 4x */
function GotramSelect({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <select name={name} value={value} onChange={onChange} className={inputClass}>
        <option value="">Select Gotram</option>
        {gotramList.map((g, i) => (
          <option key={g} value={g}>
            {i + 1}. {g}
          </option>
        ))}
      </select>
    </div>
  );
}

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
    father_gotram: "",
    mother_gotram: "",
    grandmother_gotram: "",
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
    address: "",
    district: "",
    mandal: "",
    sangham: "",
    father_occupation: "",
    mother_occupation: "",
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
     HANDLE DISTRICT CHANGE
     (also resets mandal + sangham since their options depend on district)
  ========================= */

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      district: value,
      mandal: "",
      sangham: "",
    }));
  };

  /* =========================
     HANDLE PHOTO
  ========================= */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      formDataToSend.append("profile_category", formData.profile_category);
      formDataToSend.append("surname", formData.surname);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("father_name", formData.father_name);
      formDataToSend.append("mother_name", formData.mother_name);
      formDataToSend.append("gotram", formData.gotram);
      formDataToSend.append("father_gotram", formData.father_gotram);
      formDataToSend.append("mother_gotram", formData.mother_gotram);
      formDataToSend.append("grandmother_gotram", formData.grandmother_gotram);
      formDataToSend.append("nakshatram", formData.nakshatram);
      formDataToSend.append(
        "padham",
        formData.padham === "" ? "" : String(Number(formData.padham))
      );
      formDataToSend.append("rasi", formData.rasi);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("date_of_birth", formData.date_of_birth);
      formDataToSend.append("height", formData.height);
      formDataToSend.append("education", formData.education);
      formDataToSend.append("occupation", formData.occupation);
      formDataToSend.append("annual_income", formData.annual_income);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("district", formData.district);
      formDataToSend.append("mandal", formData.mandal);
      formDataToSend.append("sangham", formData.sangham);
      formDataToSend.append("father_occupation", formData.father_occupation);
      formDataToSend.append("mother_occupation", formData.mother_occupation);
      formDataToSend.append("family_details", formData.family_details);
      formDataToSend.append("brother_details", formData.brother_details);
      formDataToSend.append("sister_details", formData.sister_details);
      formDataToSend.append("property_details", formData.property_details);
      formDataToSend.append(
        "preferred_requirements",
        formData.preferred_requirements
      );

      // Photo
      if (formData.photo) {
        formDataToSend.append("photo", formData.photo);
      }

      console.log("Sending registration with photo:", formData.photo?.name);

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
        alert(data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        "Backend server connection failed. Please check whether NestJS is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedDistrict =
    formData.district &&
    telanganaData[formData.district as keyof typeof telanganaData];

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
              Matrimonial Biodata
            </h2>
          </div>

          {/* =========================
              FORM
          ========================= */}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
            {/* PROFILE CATEGORY */}

            <div>
              <label className={labelClass}>Profile Category</label>

              <select
                name="profile_category"
                value={formData.profile_category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Category</option>
                {profileCategoryList.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* PHOTO */}

            <div>
              <label className={labelClass}>Upload Photo</label>

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

            {/* DISTRICT */}
            <div>
              <label className={labelClass + " mb-2 block"}>District</label>

              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                required
                className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-rose-500 outline-none bg-white"
              >
                <option value="">Select District</option>

                {Object.keys(telanganaData).map((district) => (
                  <option key={district} value={district}>
                    {district.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* MANDAL */}
            <div>
              <label className={labelClass + " mb-2 block"}>Mandal</label>

              <select
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-rose-500 outline-none bg-white disabled:bg-gray-100"
              >
                <option value="">Select Mandal</option>

                {selectedDistrict &&
                  selectedDistrict.mandals.map((mandal) => (
                    <option key={mandal} value={mandal}>
                      {mandal}
                    </option>
                  ))}
              </select>
            </div>

            {/* SANGHAM */}
            <div>
              <label className={labelClass + " mb-2 block"}>Sangham</label>

              <select
                name="sangham"
                value={formData.sangham}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:ring-2 focus:ring-rose-500 outline-none bg-white disabled:bg-gray-100"
              >
                <option value="">Select Sangham</option>

                {selectedDistrict &&
                  selectedDistrict.sanghams.map((sangham) => (
                    <option key={sangham} value={sangham}>
                      {sangham}
                    </option>
                  ))}
              </select>
            </div>

            {/* SURNAME */}

            <div>
              <label className={labelClass}>Surname</label>

              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                placeholder="Surname"
                className={inputClass}
              />
            </div>

            {/* NAME */}

            <div>
              <label className={labelClass}>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className={inputClass}
              />
            </div>

            {/* FATHER NAME */}

            <div>
              <label className={labelClass}>Father's Name</label>

              <input
                type="text"
                name="father_name"
                value={formData.father_name}
                onChange={handleChange}
                placeholder="Father's Name"
                className={inputClass}
              />
            </div>

            {/* MOTHER NAME */}

            <div>
              <label className={labelClass}>Mother's Name</label>

              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="Mother's Name"
                className={inputClass}
              />
            </div>

            {/* =========================
                GOTRAMS
            ========================= */}
 

            <GotramSelect
              name="father_gotram"
              label="Father Gotram"
              value={formData.father_gotram}
              onChange={handleChange}
            />

            <GotramSelect
              name="mother_gotram"
              label="Mother Gotram"
              value={formData.mother_gotram}
              onChange={handleChange}
            />

            <GotramSelect
              name="grandmother_gotram"
              label="Grand mother Gotram"
              value={formData.grandmother_gotram}
              onChange={handleChange}
            />

            {/* NAKSHATRAM */}

            <div>
              <label className={labelClass}>Nakshatram</label>

              <select
                name="nakshatram"
                value={formData.nakshatram}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Nakshatram</option>
                {nakshatramList.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* PADHAM */}

            <div>
              <label className={labelClass}>Nakshatram Padham</label>

              <select
                name="padham"
                value={formData.padham}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Padham</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* RASI */}

            <div>
              <label className={labelClass}>Rasi</label>

              <select
                name="rasi"
                value={formData.rasi}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Rasi</option>
                {rasiList.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE OF BIRTH */}

            <div>
              <label className={labelClass}>Date of Birth</label>

              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* COLOR */}

            <div>
              <label className={labelClass}>Color</label>

              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Color</option>
                {colorList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* HEIGHT */}

            <div>
              <label className={labelClass}>Height</label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder={`inches 5.6`}
                className={inputClass}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className={labelClass}>Email ID</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" Email ID"
                className={inputClass}
              />
            </div>

            {/* PASSWORD 

            <div>
              <label className={labelClass}>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" Password"
                className={inputClass}
              />
            </div>

           

            <div>
              <label className={labelClass}>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={inputClass}
              />
            </div>*/}

            {/* EDUCATION */}

            <div>
              <label className={labelClass}>Education</label>

              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Education</option>
                {educationList.map((ed) => (
                  <option key={ed} value={ed}>
                    {ed}
                  </option>
                ))}
              </select>
            </div>

            {/* OCCUPATION */}

            <div>
              <label className={labelClass}>Occupation</label>

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className={inputClass}
              />
            </div>

            {/* ANNUAL INCOME */}

            <div>
              <label className={labelClass}>Salary / Income</label>

              <input
                type="text"
                name="annual_income"
                value={formData.annual_income}
                onChange={handleChange}
                placeholder="Annual Income"
                className={inputClass}
              />
            </div>

            {/* MOBILE */}

            <div>
              <label className={labelClass}>Mobile Number</label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                className={inputClass}
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className={labelClass}>Address</label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows={3}
                className={textareaClass}
              />
            </div>

            {/* FATHER OCCUPATION DETAILS */}

            <div>
              <label className={labelClass}>Father Details</label>

              <select
                name="father_occupation"
                value={formData.father_occupation}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Father Details</option>
                {parentOccupationList.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* MOTHER OCCUPATION DETAILS */}

            <div>
              <label className={labelClass}>Mother Details</label>

              <select
                name="mother_occupation"
                value={formData.mother_occupation}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Mother Details</option>
                <option value="Homemaker">Homemaker</option>
                {parentOccupationList.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {/* BROTHER DETAILS */}

            <div>
              <label className={labelClass}>Brother Details</label>

              <select
                name="brother_details"
                value={formData.brother_details}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Brother Details</option>
                <option value="No Brothers">No Brothers</option>
                <option value="1 Brother">1 Brother</option>
                <option value="2 Brothers">2 Brothers</option>
                <option value="3 Brothers">3 Brothers</option>
              </select>
            </div>

            {/* SISTER DETAILS */}

            <div>
              <label className={labelClass}>Sister Details</label>

              <select
                name="sister_details"
                value={formData.sister_details}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Sister Details</option>
                <option value="No Sisters">No Sisters</option>
                <option value="1 Sister">1 Sister</option>
                <option value="2 Sisters">2 Sisters</option>
                <option value="3 Sisters">3 Sisters</option>
              </select>
            </div>

            {/* PROPERTY DETAILS */}

            <div>
              <label className={labelClass}>Property Details</label>

              <textarea
                name="property_details"
                value={formData.property_details}
                onChange={handleChange}
                placeholder="Property Details"
                rows={3}
                className={textareaClass}
              />
            </div>

            {/* PREFERRED REQUIREMENTS */}

            <div>
              <label className={labelClass}>Preferred Requirements</label>

              <textarea
                name="preferred_requirements"
                value={formData.preferred_requirements}
                onChange={handleChange}
                placeholder="Partner Requirements"
                rows={3}
                className={textareaClass}
              />
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
                {loading ? "Creating Profile..." : "Create Profile"}
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
