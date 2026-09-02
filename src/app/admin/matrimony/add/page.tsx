"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

/* =========================================================
   BACKEND
========================================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

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
   EDUCATION
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

/* =========================================================
   COLOR
========================================================= */

const colorList = [
  "Very Fair",
  "Fair",
  "Wheatish",
  "Wheatish Brown",
  "Brown",
  "Dark",
];

/* =========================================================
   OCCUPATION
========================================================= */

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

/* =========================================================
   PROFILE CATEGORY
========================================================= */

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
   CLASSES
========================================================= */

const inputClass =
  "mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";

const textareaClass =
  "mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300";

const labelClass =
  "text-sm font-medium text-gray-700";

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData = {
  profile_category: "Professional",

  father_name: "",
  mother_name: "",

  father_gotram: "",
  mother_gotram: "",
  grandmother_gotram: "",

  nakshatram: "",
  padham: "",
  rasi: "",
  color: "",
  height: "",

  education: "",
  annual_income: "",

  address: "",

  father_occupation: "",
  mother_occupation: "",

  brother_details: "",
  sister_details: "",

  property_details: "",
  preferred_requirements: "",

  photo: null as File | null,
};

/* =========================================================
   PAGE
========================================================= */

export default function AddMatrimonialMemberPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  /* =======================================================
     MEMBERSHIP VERIFICATION
  ======================================================= */

  const [verificationData, setVerificationData] = useState({
    mobile: "",
    email: "",
  });

  const [checkingMember, setCheckingMember] =
    useState(false);

  const [memberVerified, setMemberVerified] =
    useState(false);

  const [memberId, setMemberId] = useState("");

  const [memberName, setMemberName] =
    useState("");

  const [verificationMessage, setVerificationMessage] =
    useState("");

  const [verificationError, setVerificationError] =
    useState("");

  /* =======================================================
     FORM
  ======================================================= */

  const [formData, setFormData] =
    useState(initialFormData);

  /* =======================================================
     TOAST
  ======================================================= */

  const [toast, setToast] = useState({
    show: false,
    message: "",
    memberId: "",
  });

  const showToast = (
    message: string,
    matrimonialId = ""
  ) => {
    setToast({
      show: true,
      message,
      memberId: matrimonialId,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        memberId: "",
      });
    }, 4000);
  };

  /* =======================================================
     VERIFICATION CHANGE
  ======================================================= */

  const handleVerificationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setVerificationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setVerificationError("");
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

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

  /* =======================================================
     PHOTO
  ======================================================= */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  /* =======================================================
     CHECK MEMBER
  ======================================================= */

  const handleCheckMember = async () => {
    if (checkingMember) return;

    const mobile =
      verificationData.mobile.trim();

    const email =
      verificationData.email.trim();

    if (!mobile && !email) {
      setVerificationError(
        "Please enter Mobile Number or Email."
      );
      return;
    }

    setCheckingMember(true);
    setVerificationError("");
    setVerificationMessage("");
    setMemberVerified(false);
    setMemberId("");

    try {
      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/check-member`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: mobile || undefined,
            email: email || undefined,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "ADMIN CHECK MEMBER RESPONSE:",
        data
      );

      /* =============================================
         ALREADY REGISTERED
      ============================================= */

      if (data.alreadyRegistered) {
        const matrimonialId =
          data.data?.matrimonial_member_id ||
          "";

        showToast(
          data.message ||
            "This member is already registered in Matrimonial.",
          matrimonialId
        );

        return;
      }

      /* =============================================
         MEMBER NOT FOUND
      ============================================= */

      if (
        !response.ok ||
        !data.success ||
        !data.canRegister
      ) {
        setVerificationError(
          data.message ||
            "Member not found. Please register as a member first."
        );

        return;
      }

      /* =============================================
         VERIFIED
      ============================================= */

      const member = data.data;

      setMemberVerified(true);

      setMemberId(
        member.member_id || ""
      );

      setMemberName(
        member.full_name || ""
      );

      setVerificationData({
        mobile:
          member.mobile || mobile,
        email:
          member.email || email,
      });

      setVerificationMessage(
        "Member verified successfully. You can now create the Matrimonial profile."
      );
    } catch (error) {
      console.error(
        "Admin Check Member Error:",
        error
      );

      setVerificationError(
        "Backend server connection failed. Please check NestJS on port 5000."
      );
    } finally {
      setCheckingMember(false);
    }
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    /* =============================================
       VERIFICATION
    ============================================= */

    if (!memberVerified) {
      alert(
        "Please verify Membership first."
      );
      return;
    }

    if (!memberId) {
      alert(
        "Membership ID is missing."
      );
      return;
    }

    /* =============================================
       VALIDATION
    ============================================= */

    if (!formData.profile_category) {
      alert(
        "Please select Profile Category."
      );
      return;
    }

    if (!formData.father_name.trim()) {
      alert(
        "Please enter Father's Name."
      );
      return;
    }

    if (!formData.mother_name.trim()) {
      alert(
        "Please enter Mother's Name."
      );
      return;
    }

    setLoading(true);

    try {
      const dataToSend = new FormData();

      /* =============================================
         MEMBERSHIP
      ============================================= */

      dataToSend.append(
        "member_id",
        memberId
      );

      dataToSend.append(
        "mobile",
        verificationData.mobile.trim()
      );

      dataToSend.append(
        "email",
        verificationData.email.trim()
      );

      /* =============================================
         MATRIMONIAL FIELDS
      ============================================= */

      const fields = [
        "profile_category",
        "father_name",
        "mother_name",
        "father_gotram",
        "mother_gotram",
        "grandmother_gotram",
        "nakshatram",
        "padham",
        "rasi",
        "color",
        "height",
        "education",
        "annual_income",
        "address",
        "father_occupation",
        "mother_occupation",
        "brother_details",
        "sister_details",
        "property_details",
        "preferred_requirements",
      ] as const;

      fields.forEach((field) => {
        dataToSend.append(
          field,
          formData[field]
        );
      });

      /* =============================================
         PHOTO
      ============================================= */

      if (formData.photo) {
        dataToSend.append(
          "photo",
          formData.photo
        );
      }

      console.log(
        "ADMIN MATRIMONIAL SUBMIT:",
        {
          memberId,
          mobile:
            verificationData.mobile,
          email:
            verificationData.email,
        }
      );

      /* =============================================
         API
      ============================================= */

      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/register`,
        {
          method: "POST",
          body: dataToSend,
        }
      );

      const data = await response.json();

      console.log(
        "ADMIN REGISTER RESPONSE:",
        data
      );

      /* =============================================
         SUCCESS
      ============================================= */

      if (
        response.ok &&
        data.success
      ) {
        const matrimonialId =
          data.data?.member_id ||
          data.data?.matrimonial_member_id ||
          "";

        showToast(
          "Matrimonial profile created successfully.",
          matrimonialId
        );

        setTimeout(() => {
          router.push(
            "/admin/matrimony"
          );
          router.refresh();
        }, 1500);

        return;
      }

      /* =============================================
         ALREADY REGISTERED
      ============================================= */

      if (data.alreadyRegistered) {
        const matrimonialId =
          data.data
            ?.matrimonial_member_id ||
          "";

        showToast(
          data.message ||
            "This member is already registered in Matrimonial.",
          matrimonialId
        );

        return;
      }

      /* =============================================
         ERROR
      ============================================= */

      alert(
        Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message ||
              "Registration failed."
      );
    } catch (error) {
      console.error(
        "Admin Matrimonial Error:",
        error
      );

      alert(
        "Backend server connection failed. Please check NestJS on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* ===================================================
          TOAST
      =================================================== */}

      {toast.show && (
        <div className="fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-md">

          <div className="rounded-2xl border border-green-200 bg-white p-4 shadow-2xl">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaCheckCircle className="text-xl" />
              </div>

              <div className="flex-1">

                <p className="font-bold text-green-700">
                  Success
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {toast.message}
                </p>

                {toast.memberId && (
                  <p className="mt-1 text-sm font-bold text-[#8B1E3F]">
                    Matrimonial ID:{" "}
                    {toast.memberId}
                  </p>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  setToast({
                    show: false,
                    message: "",
                    memberId: "",
                  })
                }
                className="text-gray-400 hover:text-gray-700"
              >
                <FaTimes />
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <Link
              href="/admin/matrimony"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
            >
              <FaArrowLeft />
            </Link>

            <div>

              <h1 className="text-2xl font-bold text-gray-900">
                Add Matrimonial Member
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Verify an existing member and create their matrimonial biodata.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            CARD
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-xl">

          {/* =================================================
              MEMBERSHIP VERIFICATION
          ================================================= */}

          <div className="border-b border-pink-100 bg-pink-50/60 p-6">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#8B1E3F] text-white">
                <FaCheckCircle />
              </div>

              <div>

                <h2 className="font-bold text-[#8B1E3F]">
                  Membership Verification
                </h2>

                <p className="text-xs text-gray-500">
                  Verify the existing membership before creating matrimonial profile.
                </p>

              </div>

            </div>

            <div className="grid gap-5 md:grid-cols-3">

              {/* MOBILE */}

              <div>

                <label className={labelClass}>
                  Registered Mobile
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={
                    verificationData.mobile
                  }
                  onChange={
                    handleVerificationChange
                  }
                  disabled={
                    memberVerified
                  }
                  placeholder="Enter Mobile Number"
                  className={`${inputClass} ${
                    memberVerified
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className={labelClass}>
                  Registered Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    verificationData.email
                  }
                  onChange={
                    handleVerificationChange
                  }
                  disabled={
                    memberVerified
                  }
                  placeholder="Enter Email"
                  className={`${inputClass} ${
                    memberVerified
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                />

              </div>

              {/* BUTTON */}

              <div className="flex items-end">

                {!memberVerified ? (
                  <button
                    type="button"
                    onClick={
                      handleCheckMember
                    }
                    disabled={
                      checkingMember
                    }
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-[#8B1E3F] to-[#d81b60] font-semibold text-white shadow-md hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {checkingMember
                      ? "Checking..."
                      : "Verify Membership"}
                  </button>
                ) : (
                  <div className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-100 font-semibold text-green-700">
                    <FaCheckCircle />
                    Member Verified
                  </div>
                )}

              </div>

            </div>

            {/* MEMBER INFO */}

            {memberVerified && (
              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="grid gap-2 md:grid-cols-3">

                  <div>
                    <span className="text-xs text-gray-500">
                      Member ID
                    </span>

                    <p className="font-bold text-[#8B1E3F]">
                      {memberId}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500">
                      Member Name
                    </span>

                    <p className="font-semibold text-gray-800">
                      {memberName || "-"}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500">
                      Mobile
                    </span>

                    <p className="font-semibold text-gray-800">
                      {verificationData.mobile || "-"}
                    </p>
                  </div>

                </div>

              </div>
            )}

            {verificationError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {verificationError}
              </div>
            )}

            {verificationMessage && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {verificationMessage}
              </div>
            )}

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <div
            className={
              !memberVerified
                ? "pointer-events-none relative opacity-50"
                : ""
            }
          >

            {/* LOCK */}

            {!memberVerified && (
              <div className="absolute inset-0 z-20 flex items-start justify-center pt-20">

                <div className="rounded-2xl border border-pink-200 bg-white px-8 py-6 text-center shadow-xl">

                  <FaCheckCircle className="mx-auto mb-3 text-3xl text-pink-600" />

                  <p className="font-bold text-[#8B1E3F]">
                    Verify Membership First
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    The matrimonial form will open after membership verification.
                  </p>

                </div>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
            >

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              <SectionTitle
                title="Personal Information"
                description="Enter matrimonial biodata and horoscope details."
              />

              <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

                <FormSelect
                  label="Profile Category"
                  name="profile_category"
                  value={
                    formData.profile_category
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    profileCategoryList.map(
                      (item) => ({
                        value: item.value,
                        label: item.label,
                      })
                    )
                  }
                />

                <FormInput
                  label="Father's Name"
                  name="father_name"
                  value={
                    formData.father_name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <FormInput
                  label="Mother's Name"
                  name="mother_name"
                  value={
                    formData.mother_name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <FormSelect
                  label="Father Gotram"
                  name="father_gotram"
                  value={
                    formData.father_gotram
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    gotramList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormSelect
                  label="Mother Gotram"
                  name="mother_gotram"
                  value={
                    formData.mother_gotram
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    gotramList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormSelect
                  label="Grand Mother Gotram"
                  name="grandmother_gotram"
                  value={
                    formData.grandmother_gotram
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    gotramList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormSelect
                  label="Nakshatram"
                  name="nakshatram"
                  value={
                    formData.nakshatram
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    nakshatramList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormSelect
                  label="Nakshatram Padham"
                  name="padham"
                  value={
                    formData.padham
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    {
                      value: "1",
                      label: "1",
                    },
                    {
                      value: "2",
                      label: "2",
                    },
                    {
                      value: "3",
                      label: "3",
                    },
                    {
                      value: "4",
                      label: "4",
                    },
                  ]}
                />

                <FormSelect
                  label="Rasi"
                  name="rasi"
                  value={
                    formData.rasi
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    rasiList
                  }
                />

                <FormSelect
                  label="Color"
                  name="color"
                  value={
                    formData.color
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    colorList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormInput
                  label="Height"
                  name="height"
                  value={
                    formData.height
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: 5.6"
                />

              </div>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <SectionTitle
                title="Education & Career"
                description="Enter education and annual income details."
              />

              <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

                <FormSelect
                  label="Education"
                  name="education"
                  value={
                    formData.education
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    educationList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormInput
                  label="Salary / Annual Income"
                  name="annual_income"
                  value={
                    formData.annual_income
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Example: ₹6,00,000"
                />

              </div>

              {/* =================================================
                  ADDRESS
              ================================================= */}

              <SectionTitle
                title="Address"
                description="Enter current residential address."
              />

              <div className="p-6">

                <FormTextarea
                  label="Address"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                  rows={4}
                />

              </div>

              {/* =================================================
                  FAMILY
              ================================================= */}

              <SectionTitle
                title="Family Information"
                description="Enter parents, siblings and property details."
              />

              <div className="grid gap-6 p-6 md:grid-cols-2">

                <FormSelect
                  label="Father Details"
                  name="father_occupation"
                  value={
                    formData.father_occupation
                  }
                  onChange={
                    handleChange
                  }
                  options={
                    parentOccupationList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    )
                  }
                />

                <FormSelect
                  label="Mother Details"
                  name="mother_occupation"
                  value={
                    formData.mother_occupation
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    {
                      value: "Homemaker",
                      label: "Homemaker",
                    },
                    ...parentOccupationList.map(
                      (item) => ({
                        value: item,
                        label: item,
                      })
                    ),
                  ]}
                />

                <FormSelect
                  label="Brother Details"
                  name="brother_details"
                  value={
                    formData.brother_details
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    {
                      value: "No Brothers",
                      label: "No Brothers",
                    },
                    {
                      value: "1 Brother",
                      label: "1 Brother",
                    },
                    {
                      value: "2 Brothers",
                      label: "2 Brothers",
                    },
                    {
                      value: "3 Brothers",
                      label: "3 Brothers",
                    },
                  ]}
                />

                <FormSelect
                  label="Sister Details"
                  name="sister_details"
                  value={
                    formData.sister_details
                  }
                  onChange={
                    handleChange
                  }
                  options={[
                    {
                      value: "No Sisters",
                      label: "No Sisters",
                    },
                    {
                      value: "1 Sister",
                      label: "1 Sister",
                    },
                    {
                      value: "2 Sisters",
                      label: "2 Sisters",
                    },
                    {
                      value: "3 Sisters",
                      label: "3 Sisters",
                    },
                  ]}
                />

                <FormTextarea
                  label="Property Details"
                  name="property_details"
                  value={
                    formData.property_details
                  }
                  onChange={
                    handleChange
                  }
                  rows={4}
                />

              </div>

              {/* =================================================
                  PREFERRED
              ================================================= */}

              <SectionTitle
                title="Preferred Requirements"
                description="Enter preferred partner requirements."
              />

              <div className="p-6">

                <FormTextarea
                  label="Preferred Requirements"
                  name="preferred_requirements"
                  value={
                    formData.preferred_requirements
                  }
                  onChange={
                    handleChange
                  }
                  rows={5}
                />

              </div>

              {/* =================================================
                  PHOTO
              ================================================= */}

              <SectionTitle
                title="Profile Photo"
                description="Upload the matrimonial profile photograph."
              />

              <div className="p-6">

                <label className="flex h-44 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/40 transition hover:bg-pink-50">

                  <FaUpload className="mb-3 text-3xl text-[#8B1E3F]" />

                  <span className="text-sm font-semibold text-gray-700">
                    Upload Profile Photo
                  </span>

                  <span className="mt-1 text-xs text-gray-400">
                    JPG, JPEG or PNG
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={
                      handlePhotoChange
                    }
                    className="hidden"
                  />

                </label>

                {formData.photo && (
                  <div className="mt-3 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">

                    <span className="font-semibold">
                      Selected:
                    </span>{" "}
                    {formData.photo.name}

                  </div>
                )}

              </div>

              {/* =================================================
                  BUTTONS
              ================================================= */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-6 sm:flex-row sm:justify-end">

                <Link
                  href="/admin/matrimony"
                  className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B1E3F] to-[#d81b60] px-8 text-sm font-semibold text-white shadow-md hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <FaSave />

                  {loading
                    ? "Creating Profile..."
                    : "Create Matrimonial Profile"}

                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

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
    <div className="border-b border-t border-pink-100 bg-pink-50/30 px-6 py-5">

      <h2 className="text-lg font-bold text-[#8B1E3F]">
        {title}
      </h2>

      <p className="mt-1 text-sm text-gray-400">
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

      <label className={labelClass}>
        {label}

        {required && (
          <span className="ml-1 text-red-500">
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
        className={inputClass}
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
  options: {
    value: string;
    label: string;
  }[];
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
          Select {label}
        </option>

        {options.map(
          (option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          )
        )}

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

      <label className={labelClass}>
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={textareaClass}
      />

    </div>
  );
}