"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaUpload,
} from "react-icons/fa";



const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/matrimonial-users`
  : "http://localhost:5000/matrimonial-users";  

export default function AddMatrimonialMemberPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    profileCategory: "",
    surname: "",
    name: "",
    fatherName: "",
    motherName: "",
    gotram: "",
    nakshatram: "",
    padham: "",
    rasi: "",
    dateOfBirth: "",
    color: "",
    height: "",

    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",

    education: "",
    occupation: "",
    salary: "",

    address: "",
    familyDetails: "",
    brotherDetails: "",
    sisterDetails: "",
    propertyDetails: "",
    preferredRequirements: "",

    photo: null as File | null,
  });

  const [loading, setLoading] = useState(false);

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
     HANDLE PHOTO
  ========================================================= */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  /* =========================================================
     SUBMIT
  ========================================================= */
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Password and Confirm Password do not match.");
    return;
  }

  if (!formData.name.trim()) {
    alert("Please enter name.");
    return;
  }

  if (!formData.mobile.trim()) {
    alert("Please enter mobile number.");
    return;
  }

  setLoading(true);

  try {
    // =========================================
    // CREATE FORMDATA
    // =========================================

    const formDataToSend = new FormData();

    formDataToSend.append(
      "profile_category",
      formData.profileCategory
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
      formData.fatherName
    );

    formDataToSend.append(
      "mother_name",
      formData.motherName
    );

    formDataToSend.append(
      "gotram",
      formData.gotram
    );

    formDataToSend.append(
      "nakshatram",
      formData.nakshatram
    );

    // Padham
    if (formData.padham) {
      formDataToSend.append(
        "padham",
        formData.padham
      );
    }

    formDataToSend.append(
      "rasi",
      formData.rasi
    );

    // Date of Birth
    if (formData.dateOfBirth) {
      formDataToSend.append(
        "date_of_birth",
        formData.dateOfBirth
      );
    }

    formDataToSend.append(
      "color",
      formData.color
    );

    formDataToSend.append(
      "height",
      formData.height
    );

    // =========================================
    // ACCOUNT
    // =========================================

    formDataToSend.append(
      "email",
      formData.email
    );

    formDataToSend.append(
      "password",
      formData.password
    );

    formDataToSend.append(
      "mobile",
      formData.mobile
    );

    // =========================================
    // EDUCATION & CAREER
    // =========================================

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
      formData.salary
    );

    // =========================================
    // ADDRESS
    // =========================================

    formDataToSend.append(
      "address",
      formData.address
    );

    // =========================================
    // FAMILY
    // =========================================

    formDataToSend.append(
      "family_details",
      formData.familyDetails
    );

    formDataToSend.append(
      "brother_details",
      formData.brotherDetails
    );

    formDataToSend.append(
      "sister_details",
      formData.sisterDetails
    );

    formDataToSend.append(
      "property_details",
      formData.propertyDetails
    );

    formDataToSend.append(
      "preferred_requirements",
      formData.preferredRequirements
    );

    // =========================================
    // STATUS / MEMBERSHIP
    // =========================================

    formDataToSend.append(
      "status",
      "Pending"
    );

    formDataToSend.append(
      "membership",
      "Free"
    );

    // =========================================
    // PHOTO
    // =========================================

    if (formData.photo) {
      formDataToSend.append(
        "photo",
        formData.photo
      );
    }

    console.log("Sending matrimonial member...");

    // =========================================
    // API REQUEST
    // =========================================

    const response = await fetch(
      `${BACKEND_URL}/matrimonial-users/register`,
      {
        method: "POST",
        body: formDataToSend,
      }
    );

    const result = await response.json();

    console.log(
      "API response:",
      result
    );

    if (!response.ok) {
      throw new Error(
        result?.message ||
          "Failed to add matrimonial member"
      );
    }

    alert(
      "Matrimonial member added successfully!"
    );

    router.push(
      "/admin/matrimony"
    );

    router.refresh();

  } catch (error) {

    console.error(
      "Add matrimonial member error:",
      error
    );

    alert(
      error instanceof Error
        ? error.message
        : "Something went wrong."
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div className="flex items-center gap-3">

            <Link
              href="/admin/matrimony"
              className="
                w-9 h-9
                rounded-lg
                border border-gray-200
                bg-white
                flex
                items-center
                justify-center
                text-gray-500
                hover:bg-gray-50
                transition
              "
            >
              <FaArrowLeft />
            </Link>

            <div>

              <h1 className="text-2xl font-semibold text-gray-900">
                Add Matrimonial Member
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Create a new matrimonial profile.
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* ===================================================
              PERSONAL INFORMATION
          =================================================== */}

          <SectionTitle
            title="Personal Information"
            description="Enter basic profile and personal details."
          />

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <FormSelect
              label="Profile Category"
              name="profileCategory"
              value={formData.profileCategory}
              onChange={handleChange}
              options={[
                "Professional",
                "Non-Technical",
                "Business",
                "General",
              ]}
            />

            <FormInput
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />

            <FormInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Father Name"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
            />

            <FormInput
              label="Mother Name"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
            />

            {/* GOTRAM */}

            <FormSelect
              label="Gotram"
              name="gotram"
              value={formData.gotram}
              onChange={handleChange}
              options={GOTRAMS}
            />

            {/* NAKSHATRAM */}

            <FormSelect
              label="Nakshatram"
              name="nakshatram"
              value={formData.nakshatram}
              onChange={handleChange}
              options={[
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
              ]}
            />

            {/* PADHAM */}

            <FormSelect
              label="Padham"
              name="padham"
              value={formData.padham}
              onChange={handleChange}
              options={[
                "1",
                "2",
                "3",
                "4",
              ]}
            />

            {/* RASI */}

            <FormSelect
              label="Rasi"
              name="rasi"
              value={formData.rasi}
              onChange={handleChange}
              options={[
                "Mesha (Aries)",
                "Vrishabha (Taurus)",
                "Mithuna (Gemini)",
                "Karka (Cancer)",
                "Simha (Leo)",
                "Kanya (Virgo)",
                "Tula (Libra)",
                "Vrischika (Scorpio)",
                "Dhanu (Sagittarius)",
                "Makara (Capricorn)",
                "Kumbha (Aquarius)",
                "Meena (Pisces)",
              ]}
            />

            {/* DATE OF BIRTH */}

            <FormInput
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />

            {/* COLOR */}

            <FormSelect
              label="Color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              options={[
                "Very Fair",
                "Fair",
                "Wheatish",
                "Wheatish Brown",
                "Brown",
                "Dark",
              ]}
            />

            <FormInput
              label="Height"
              name="height"
              placeholder={`Example: 5'6"`}
              value={formData.height}
              onChange={handleChange}
            />

          </div>

          {/* ===================================================
              ACCOUNT INFORMATION
          =================================================== */}

          <SectionTitle
            title="Account Information"
            description="Enter login and contact information."
          />

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <FormInput
              label="Email ID"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <FormInput
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              required
            />

          </div>

          {/* ===================================================
              EDUCATION & CAREER
          =================================================== */}

          <SectionTitle
            title="Education & Career"
            description="Enter education, occupation and income details."
          />

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <FormInput
              label="Education"
              name="education"
              value={formData.education}
              onChange={handleChange}
            />

            <FormInput
              label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />

            <FormInput
              label="Salary / Income"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="Example: ₹6,00,000"
            />

          </div>

          {/* ===================================================
              ADDRESS
          =================================================== */}

          <SectionTitle
            title="Address"
            description="Enter current residential address."
          />

          <div className="p-6">

            <FormTextarea
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
            />

          </div>

          {/* ===================================================
              FAMILY INFORMATION
          =================================================== */}

          <SectionTitle
            title="Family Information"
            description="Enter family and property details."
          />

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

            <FormTextarea
              label="Family Details"
              name="familyDetails"
              value={formData.familyDetails}
              onChange={handleChange}
            />

            <FormTextarea
              label="Brother Details"
              name="brotherDetails"
              value={formData.brotherDetails}
              onChange={handleChange}
            />

            <FormTextarea
              label="Sister Details"
              name="sisterDetails"
              value={formData.sisterDetails}
              onChange={handleChange}
            />

            <FormTextarea
              label="Property Details"
              name="propertyDetails"
              value={formData.propertyDetails}
              onChange={handleChange}
            />

          </div>

          {/* ===================================================
              PREFERRED REQUIREMENTS
          =================================================== */}

          <SectionTitle
            title="Preferred Requirements"
            description="Enter preferred partner requirements."
          />

          <div className="p-6">

            <FormTextarea
              label="Preferred Requirements"
              name="preferredRequirements"
              value={formData.preferredRequirements}
              onChange={handleChange}
              rows={4}
            />

          </div>

          {/* ===================================================
              PHOTO
          =================================================== */}

          <SectionTitle
            title="Profile Photo"
            description="Upload a profile photograph."
          />

          <div className="p-6">

            <label
              className="
                flex
                flex-col
                items-center
                justify-center
                w-full
                h-40
                border-2
                border-dashed
                border-gray-200
                rounded-2xl
                bg-gray-50
                hover:bg-gray-100
                cursor-pointer
                transition
              "
            >

              <FaUpload className="text-gray-400 text-2xl mb-3" />

              <span className="text-sm font-semibold text-gray-600">
                Upload Photo
              </span>

              <span className="text-xs text-gray-400 mt-1">
                JPG, JPEG or PNG
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

            </label>

            {formData.photo && (
              <p className="text-sm text-gray-500 mt-3">
                Selected: {formData.photo.name}
              </p>
            )}

          </div>

          {/* ===================================================
              BUTTONS
          =================================================== */}

          <div
            className="
              px-6
              py-5
              border-t
              border-gray-100
              flex
              flex-col-reverse
              sm:flex-row
              justify-end
              gap-3
            "
          >

            <Link
              href="/admin/matrimony"
              className="
                px-6
                py-2.5
                rounded-xl
                border
                border-gray-200
                text-gray-600
                text-sm
                font-semibold
                text-center
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-2.5
                rounded-xl
                bg-gray-200
                text-gray-600
                text-sm
                font-semibold
                hover:bg-gray-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                transition
              "
            >

              <FaSave />

              {loading
                ? "Saving..."
                : "Add Member"}

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-6 py-5 border-t border-b border-gray-100 bg-gray-50/50">

      <h2 className="text-lg font-semibold text-[#8B1E3F]">
        {title}
      </h2>

      <p className="text-sm text-gray-400 mt-1">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function FormInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          h-11
          px-4
          rounded-xl
          border
          border-gray-200
          bg-white
          text-sm
          text-gray-700
          outline-none
          focus:border-[#8B1E3F]
          focus:ring-2
          focus:ring-[#8B1E3F]/10
          transition
        "
      />

    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  options: string[];
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-11
          px-4
          rounded-xl
          border
          border-gray-200
          bg-white
          text-sm
          text-gray-700
          outline-none
          focus:border-[#8B1E3F]
          focus:ring-2
          focus:ring-[#8B1E3F]/10
          transition
        "
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function FormTextarea({
  label,
  name,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  rows?: number;
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="
          w-full
          px-4
          py-3
          rounded-xl
          border
          border-gray-200
          bg-white
          text-sm
          text-gray-700
          outline-none
          resize-none
          focus:border-[#8B1E3F]
          focus:ring-2
          focus:ring-[#8B1E3F]/10
          transition
        "
      />

    </div>
  );
}

/* =========================================================
   GOTRAM LIST
========================================================= */

const GOTRAMS = [
  "Aathreya",
  "Aswalayana",
  "Agasthya",
  "Bruhadashwah",
  "Bodayanah",
  "Baradwaja",
  "Bargava",
  "Chakrapani",
  "Chamarsanah (Buduruh) (Preethamanaska)",
  "Daalbyah",
  "Durvasah",
  "Devarathah",
  "Devavalkyah (Harivraktha)",
  "Gargyah (Angeerasa)",
  "Gruthsna Madah",
  "Gopakah",
  "Gowthama",
  "Harivalkya",
  "JadaBharatha",
  "Jatukarnah",
  "Jambasudhana",
  "Jarathaarkha",
  "Jaabilih",
  "Jabrih (Babri, Jabreya, Jakhreya, Sandilya)",
  "Jeevanthi (Jaivantihi, Bruhaspathi)",
  "Kanvah",
  "Kandarpa",
  "Kapila",
  "Kapeetha",
  "Kasyapa",
  "Kuthsah",
  "Koundinya",
  "Koushika",
  "Krishna (Karshanah)",
  "Mandapala",
  "Manava (Manu, Mandavya, Muniraja)",
  "Mareechi (Jamadhagni, Akshayah)",
  "Markandeya",
  "Muniraja",
  "Mythreyah",
  "Mounala",
  "Mounjayanah",
  "Moudgalya",
  "Nanaka",
  "Naradah",
  "Netrapadah (Athrith)",
  "Ouchithya (Pishabarba)",
  "Parasparayanah (Gaalavah, Pulasthyah)",
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
  "Yaskah (Jaimini)",
  "Yagnavalkya",
];