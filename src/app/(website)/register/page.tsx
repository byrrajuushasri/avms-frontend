"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

/* =========================================================
   TELANGANA DISTRICT DATA
========================================================= */

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

/* =========================================================
   GOTRAM
========================================================= */

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

/* =========================================================
   NAKSHATRAM
========================================================= */

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

/* =========================================================
   RASI
========================================================= */

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

/* =========================================================
   OTHER LISTS
========================================================= */

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
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "Non-Technical",
    label: "Non-Technical",
  },
  {
    value: "Business",
    label: "Business",
  },
  {
    value: "Divorced",
    label: "Divorced",
  },
  {
    value: "Handicapped",
    label: "Physically Handicapped",
  },
  {
    value: "Dearth",
    label: "Dearth",
  },
  {
    value: "Uncle",
    label: "Uncle",
  },
  {
    value: "General",
    label: "Others",
  },
];

/* =========================================================
   COMMON CLASSES
========================================================= */

const inputClass =
  "mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";

const textareaClass =
  "mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300";

const labelClass =
  "text-sm font-medium text-gray-700";

/* =========================================================
   GOTRAM SELECT COMPONENT
========================================================= */

function GotramSelect({
  name,
  label,
  value,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}) {
  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className={inputClass}
      >
        <option value="">
          Select Gotram
        </option>

        {gotramList.map((g, i) => (
          <option key={g} value={g}>
            {i + 1}. {g}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   REGISTER PAGE
========================================================= */

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

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      district: value,
      mandal: "",
      sangham: "",
    }));
  };

  /* =========================================================
     PHOTO
  ========================================================= */

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

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    /* BASIC VALIDATION */

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

    setLoading(true);

    try {
      /* =====================================================
         CREATE FORMDATA
      ===================================================== */

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
        "father_gotram",
        formData.father_gotram
      );

      formDataToSend.append(
        "mother_gotram",
        formData.mother_gotram
      );

      formDataToSend.append(
        "grandmother_gotram",
        formData.grandmother_gotram
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
        "address",
        formData.address
      );

      formDataToSend.append(
        "district",
        formData.district
      );

      formDataToSend.append(
        "mandal",
        formData.mandal
      );

      formDataToSend.append(
        "sangham",
        formData.sangham
      );

      formDataToSend.append(
        "father_occupation",
        formData.father_occupation
      );

      formDataToSend.append(
        "mother_occupation",
        formData.mother_occupation
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

      /* PHOTO */

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

      /* =====================================================
         API
      ===================================================== */

      const response = await fetch(
        "http://localhost:5000/matrimonial-users/register",
        {
          method: "POST",

          // Do NOT manually set Content-Type.
          // Browser automatically creates multipart boundary.

          body: formDataToSend,
        }
      );

      console.log(
        "Status:",
        response.status
      );

      const data = await response.json();

      console.log(
        "Response:",
        data
      );

      /* =====================================================
         SUCCESS
      ===================================================== */

      if (
        response.ok &&
        data.success
      ) {
        alert(
          "Registration Successful!"
        );

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

  /* =========================================================
     SELECTED DISTRICT
  ========================================================= */

  const selectedDistrict =
    formData.district &&
    telanganaData[
      formData.district as keyof typeof telanganaData
    ];

  /* =========================================================
     UI
  ========================================================= */

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* BACKGROUND */}

      <div className="absolute -left-56 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 h-[500px] w-[500px] rounded-full bg-rose-200/40 blur-[120px]" />

      <FaHeart className="absolute left-10 top-48 text-7xl text-pink-300 opacity-20" />

      <FaHeart className="absolute bottom-24 right-16 text-8xl text-rose-300 opacity-20" />

      {/* MAIN CARD */}

      <div className="relative z-10 flex justify-center px-6 py-10">

        <div className="w-full max-w-6xl rounded-3xl border border-pink-100 bg-white/95 p-6 shadow-[0_20px_60px_rgba(233,30,99,0.12)] backdrop-blur sm:p-8 lg:p-10">

          {/* HEADER */}

          <div className="mb-8 text-center">

            <h2 className="text-2xl font-bold text-[#8B1E3F] sm:text-3xl">
              Matrimonial Biodata
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Please provide your details carefully
            </p>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 md:grid-cols-2"
          >

            {/* PROFILE CATEGORY */}

            <div>
              <label className={labelClass}>
                Profile Category
              </label>

              <select
                name="profile_category"
                value={formData.profile_category}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Category
                </option>

                {profileCategoryList.map(
                  (category) => (
                    <option
                      key={category.value}
                      value={category.value}
                    >
                      {category.label}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* PHOTO */}

            <div>
              <label className={labelClass}>
                Upload Photo
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 w-full rounded-xl border border-pink-200 p-3"
              />

              {formData.photo && (
                <p className="mt-2 text-xs text-gray-500">
                  Selected:{" "}
                  {formData.photo.name}
                </p>
              )}
            </div>

            {/* DISTRICT */}

            <div>
              <label className={labelClass}>
                District
              </label>

              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                required
                className={inputClass}
              >
                <option value="">
                  Select District
                </option>

                {Object.keys(
                  telanganaData
                ).map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {district.replaceAll(
                      "_",
                      " "
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* MANDAL */}

            <div>
              <label className={labelClass}>
                Mandal
              </label>

              <select
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className={`${inputClass} disabled:bg-gray-100`}
              >
                <option value="">
                  Select Mandal
                </option>

                {selectedDistrict &&
                  selectedDistrict.mandals.map(
                    (mandal) => (
                      <option
                        key={mandal}
                        value={mandal}
                      >
                        {mandal}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* SANGHAM */}

            <div>
              <label className={labelClass}>
                Sangham
              </label>

              <select
                name="sangham"
                value={formData.sangham}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className={`${inputClass} disabled:bg-gray-100`}
              >
                <option value="">
                  Select Sangham
                </option>

                {selectedDistrict &&
                  selectedDistrict.sanghams.map(
                    (sangham) => (
                      <option
                        key={sangham}
                        value={sangham}
                      >
                        {sangham}
                      </option>
                    )
                  )}
              </select>
            </div>

            {/* SURNAME */}

            <div>
              <label className={labelClass}>
                Surname
              </label>

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
              <label className={labelClass}>
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className={inputClass}
              />
            </div>

            {/* FATHER NAME */}

            <div>
              <label className={labelClass}>
                Father's Name
              </label>

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
              <label className={labelClass}>
                Mother's Name
              </label>

              <input
                type="text"
                name="mother_name"
                value={formData.mother_name}
                onChange={handleChange}
                placeholder="Mother's Name"
                className={inputClass}
              />
            </div>

            {/* FATHER GOTRAM */}

            <GotramSelect
              name="father_gotram"
              label="Father Gotram"
              value={formData.father_gotram}
              onChange={handleChange}
            />

            {/* MOTHER GOTRAM */}

            <GotramSelect
              name="mother_gotram"
              label="Mother Gotram"
              value={formData.mother_gotram}
              onChange={handleChange}
            />

            {/* GRANDMOTHER GOTRAM */}

            <GotramSelect
              name="grandmother_gotram"
              label="Grand Mother Gotram"
              value={
                formData.grandmother_gotram
              }
              onChange={handleChange}
            />

            {/* NAKSHATRAM */}

            <div>
              <label className={labelClass}>
                Nakshatram
              </label>

              <select
                name="nakshatram"
                value={formData.nakshatram}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Nakshatram
                </option>

                {nakshatramList.map(
                  (nakshatram) => (
                    <option
                      key={nakshatram}
                      value={nakshatram}
                    >
                      {nakshatram}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* PADHAM */}

            <div>
              <label className={labelClass}>
                Nakshatram Padham
              </label>

              <select
                name="padham"
                value={formData.padham}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Padham
                </option>

                <option value="1">
                  1
                </option>

                <option value="2">
                  2
                </option>

                <option value="3">
                  3
                </option>

                <option value="4">
                  4
                </option>
              </select>
            </div>

            {/* RASI */}

            <div>
              <label className={labelClass}>
                Rasi
              </label>

              <select
                name="rasi"
                value={formData.rasi}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Rasi
                </option>

                {rasiList.map((rasi) => (
                  <option
                    key={rasi.value}
                    value={rasi.value}
                  >
                    {rasi.label}
                  </option>
                ))}
              </select>
            </div>

            {/* DATE OF BIRTH */}

            <div>
              <label className={labelClass}>
                Date of Birth
              </label>

              <input
                type="date"
                name="date_of_birth"
                value={
                  formData.date_of_birth
                }
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {/* COLOR */}

            <div>
              <label className={labelClass}>
                Color
              </label>

              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Color
                </option>

                {colorList.map((color) => (
                  <option
                    key={color}
                    value={color}
                  >
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* HEIGHT */}

            <div>
              <label className={labelClass}>
                Height
              </label>

              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Example: 5.6"
                className={inputClass}
              />
            </div>

            {/* EMAIL */}

            <div>
              <label className={labelClass}>
                Email ID
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                required
                className={inputClass}
              />
            </div>

            {/* EDUCATION */}

            <div>
              <label className={labelClass}>
                Education
              </label>

              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Education
                </option>

                {educationList.map(
                  (education) => (
                    <option
                      key={education}
                      value={education}
                    >
                      {education}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* OCCUPATION */}

            <div>
              <label className={labelClass}>
                Occupation
              </label>

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
              <label className={labelClass}>
                Salary / Income
              </label>

              <input
                type="text"
                name="annual_income"
                value={
                  formData.annual_income
                }
                onChange={handleChange}
                placeholder="Annual Income"
                className={inputClass}
              />
            </div>

            {/* MOBILE */}

            <div>
              <label className={labelClass}>
                Mobile Number
              </label>

              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Number"
                required
                className={inputClass}
              />
            </div>

            {/* ADDRESS */}

            <div>
              <label className={labelClass}>
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows={3}
                className={textareaClass}
              />
            </div>

            {/* FATHER DETAILS */}

            <div>
              <label className={labelClass}>
                Father Details
              </label>

              <select
                name="father_occupation"
                value={
                  formData.father_occupation
                }
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Father Details
                </option>

                {parentOccupationList.map(
                  (occupation) => (
                    <option
                      key={occupation}
                      value={occupation}
                    >
                      {occupation}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* MOTHER DETAILS */}

            <div>
              <label className={labelClass}>
                Mother Details
              </label>

              <select
                name="mother_occupation"
                value={
                  formData.mother_occupation
                }
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Mother Details
                </option>

                <option value="Homemaker">
                  Homemaker
                </option>

                {parentOccupationList.map(
                  (occupation) => (
                    <option
                      key={occupation}
                      value={occupation}
                    >
                      {occupation}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* BROTHER DETAILS */}

            <div>
              <label className={labelClass}>
                Brother Details
              </label>

              <select
                name="brother_details"
                value={
                  formData.brother_details
                }
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Brother Details
                </option>

                <option value="No Brothers">
                  No Brothers
                </option>

                <option value="1 Brother">
                  1 Brother
                </option>

                <option value="2 Brothers">
                  2 Brothers
                </option>

                <option value="3 Brothers">
                  3 Brothers
                </option>
              </select>
            </div>

            {/* SISTER DETAILS */}

            <div>
              <label className={labelClass}>
                Sister Details
              </label>

              <select
                name="sister_details"
                value={
                  formData.sister_details
                }
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Sister Details
                </option>

                <option value="No Sisters">
                  No Sisters
                </option>

                <option value="1 Sister">
                  1 Sister
                </option>

                <option value="2 Sisters">
                  2 Sisters
                </option>

                <option value="3 Sisters">
                  3 Sisters
                </option>
              </select>
            </div>

            {/* PROPERTY DETAILS */}

            <div>
              <label className={labelClass}>
                Property Details
              </label>

              <textarea
                name="property_details"
                value={
                  formData.property_details
                }
                onChange={handleChange}
                placeholder="Property Details"
                rows={3}
                className={textareaClass}
              />
            </div>

            {/* PREFERRED REQUIREMENTS */}

            <div>
              <label className={labelClass}>
                Preferred Requirements
              </label>

              <textarea
                name="preferred_requirements"
                value={
                  formData.preferred_requirements
                }
                onChange={handleChange}
                placeholder="Partner Requirements"
                rows={3}
                className={textareaClass}
              />
            </div>

            {/* SUBMIT */}

            <div className="mt-6 flex justify-center md:col-span-2">

              <button
                type="submit"
                disabled={loading}
                className="
                  h-12
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-[#d81b60]
                  via-[#e91e63]
                  to-[#f06292]
                  text-sm
                  font-semibold
                  text-white
                  shadow-md
                  transition
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-52
                "
              >
                {loading
                  ? "Creating Profile..."
                  : "Create Profile"}
              </button>

            </div>

          </form>

          {/* LOGIN */}

          <div className="mt-8 text-center">

            <p className="text-gray-600">

              Already have an account?

              <Link
                href="/login"
                className="ml-2 font-semibold text-rose-600 hover:underline"
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