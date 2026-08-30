"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaHeart,
  FaCheckCircle,
  FaLock,
  FaTimes,
} from "react-icons/fa";

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
  {
    value: "Mesha",
    label: "Mesha (Aries)",
  },
  {
    value: "Vrishabha",
    label: "Vrishabha (Taurus)",
  },
  {
    value: "Mithuna",
    label: "Mithuna (Gemini)",
  },
  {
    value: "Karka",
    label: "Karka (Cancer)",
  },
  {
    value: "Simha",
    label: "Simha (Leo)",
  },
  {
    value: "Kanya",
    label: "Kanya (Virgo)",
  },
  {
    value: "Tula",
    label: "Tula (Libra)",
  },
  {
    value: "Vrischika",
    label: "Vrischika (Scorpio)",
  },
  {
    value: "Dhanu",
    label: "Dhanu (Sagittarius)",
  },
  {
    value: "Makara",
    label: "Makara (Capricorn)",
  },
  {
    value: "Kumbha",
    label: "Kumbha (Aquarius)",
  },
  {
    value: "Meena",
    label: "Meena (Pisces)",
  },
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
   PARENT OCCUPATION
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
   COMMON CLASSES
========================================================= */

const inputClass =
  "mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";

const textareaClass =
  "mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300";

const labelClass =
  "text-sm font-medium text-gray-700";

/* =========================================================
   GOTRAM SELECT
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

        {gotramList.map((gotram) => (
          <option
            key={gotram}
            value={gotram}
          >
             {gotram}
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

  const [loading, setLoading] =
    useState(false);

  const [checkingMember, setCheckingMember] =
    useState(false);

  const [memberVerified, setMemberVerified] =
    useState(false);

  const [memberId, setMemberId] =
    useState("");

  const [verificationMessage, setVerificationMessage] =
    useState("");

  const [verificationError, setVerificationError] =
    useState("");

  /* =========================================================
     TOAST
  ========================================================= */

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    memberId?: string;
  }>({
    show: false,
    message: "",
    memberId: "",
  });

  /* =========================================================
     SHOW GREEN TOAST
  ========================================================= */

  const showGreenToast = (
    message: string,
    matrimonialId?: string
  ) => {
    setToast({
      show: true,
      message,
      memberId: matrimonialId || "",
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        memberId: "",
      });
    }, 4000);
  };

  /* =========================================================
     MEMBERSHIP VERIFICATION DATA
  ========================================================= */

  const [verificationData, setVerificationData] =
    useState({
      mobile: "",
      email: "",
    });

  /* =========================================================
     MATRIMONIAL FORM DATA
  ========================================================= */

  const [formData, setFormData] = useState({
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
  });

  /* =========================================================
     HANDLE VERIFICATION INPUT
  ========================================================= */

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

  /* =========================================================
     HANDLE MATRIMONIAL INPUT
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
     CHECK MEMBER
  ========================================================= */

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
        "http://localhost:5000/matrimonial-users/check-member",
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
        "CHECK MEMBER RESPONSE:",
        data
      );

      /* =========================================
         ALREADY MATRIMONIAL REGISTERED
      ========================================= */

      if (data.alreadyRegistered) {
        const matrimonialId =
          data.data
            ?.matrimonial_member_id || "";

        showGreenToast(
          data.message ||
            "This Member is already registered in Matrimonial.",
          matrimonialId
        );

        return;
      }

      /* =========================================
         MEMBER NOT FOUND
      ========================================= */

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

      /* =========================================
         MEMBER VERIFIED
      ========================================= */

      const member = data.data;

      const verifiedMobile =
        member.mobile || mobile;

      const verifiedEmail =
        member.email || email;

      setMemberVerified(true);

      setMemberId(
        member.member_id || ""
      );

      setVerificationMessage(
        "Member verified successfully. You can now complete the Matrimonial form."
      );

      setVerificationData({
        mobile: verifiedMobile,
        email: verifiedEmail,
      });
    } catch (error) {
      console.error(
        "Check Member Error:",
        error
      );

      setVerificationError(
        "Backend server connection failed. Please check whether NestJS is running on port 5000."
      );
    } finally {
      setCheckingMember(false);
    }
  };

  /* =========================================================
     SUBMIT MATRIMONIAL PROFILE
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    /* =========================================
       MEMBERSHIP VERIFICATION REQUIRED
    ========================================= */

    if (!memberVerified) {
      alert(
        "Please verify your Membership before registering for Matrimonial."
      );
      return;
    }

    /* =========================================
       VERIFIED MEMBER DETAILS
    ========================================= */

    const verifiedMobile =
      verificationData.mobile.trim();

    const verifiedEmail =
      verificationData.email.trim();

    if (!verifiedMobile && !verifiedEmail) {
      alert(
        "Membership verification details are missing. Please verify your Membership again."
      );
      return;
    }

    if (!memberId) {
      alert(
        "Membership ID is missing. Please verify your Membership again."
      );
      return;
    }

    /* =========================================
       BASIC VALIDATION
    ========================================= */

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
      const formDataToSend =
        new FormData();

      /* =========================================
         MEMBERSHIP DATA
      ========================================= */

      formDataToSend.append(
        "member_id",
        memberId
      );

      formDataToSend.append(
        "mobile",
        verifiedMobile
      );

      formDataToSend.append(
        "email",
        verifiedEmail
      );

      /* =========================================
         MATRIMONIAL FIELDS
      ========================================= */

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
        formDataToSend.append(
          field,
          formData[field]
        );
      });

      console.log(
        "Submitting Matrimonial Profile:",
        {
          memberId,
          mobile: verifiedMobile,
          email: verifiedEmail,
          matrimonialFields: formData,
        }
      );

      /* =========================================
         REGISTER API
      ========================================= */

      const response = await fetch(
        "http://localhost:5000/matrimonial-users/register",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();

      console.log(
        "REGISTER RESPONSE:",
        data
      );

      /* =========================================
         SUCCESS
      ========================================= */

      if (
        response.ok &&
        data.success
      ) {
        const matrimonialId =
          data.data?.member_id ||
          data.data?.matrimonial_member_id ||
          "";

        /* =========================================
           GREEN SUCCESS TOAST
        ========================================= */

        showGreenToast(
          "Matrimonial registration successfully completed.",
          matrimonialId
        );

        /* =========================================
           REDIRECT AFTER TOAST
        ========================================= */

        setTimeout(() => {
          router.push("/search");
        }, 1800);

        return;
      }

      /* =========================================
         ALREADY REGISTERED
      ========================================= */

      if (data.alreadyRegistered) {
        const matrimonialId =
          data.data
            ?.matrimonial_member_id || "";

        /* =========================================
           GREEN ALREADY REGISTERED TOAST
        ========================================= */

        showGreenToast(
          data.message ||
            "This Member is already registered in Matrimonial.",
          matrimonialId
        );

        return;
      }

      /* =========================================
         VALIDATION / SERVER ERROR
      ========================================= */

      alert(
        Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message ||
              "Registration Failed"
      );
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
     UI
  ========================================================= */

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* =====================================================
          GREEN TOAST
      ===================================================== */}

      {toast.show && (
        <div className="fixed right-5 top-5 z-[9999] w-[calc(100%-40px)] max-w-md animate-[slideIn_0.3s_ease-out]">

          <div className="rounded-2xl border border-green-200 bg-white p-4 shadow-2xl">

            <div className="flex items-start gap-3">

              {/* CHECK ICON */}

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                <FaCheckCircle className="text-xl" />
              </div>

              {/* MESSAGE */}

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

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setToast({
                    show: false,
                    message: "",
                    memberId: "",
                  })
                }
                className="text-gray-400 transition hover:text-gray-700"
              >
                <FaTimes />
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="absolute -left-56 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 h-[500px] w-[500px] rounded-full bg-rose-200/40 blur-[120px]" />

      <FaHeart className="absolute left-10 top-48 text-7xl text-pink-300 opacity-20" />

      <FaHeart className="absolute bottom-24 right-16 text-8xl text-rose-300 opacity-20" />

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="relative z-10 flex justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-6xl rounded-3xl border border-pink-100 bg-white/95 p-5 shadow-[0_20px_60px_rgba(233,30,99,0.12)] backdrop-blur sm:p-8 lg:p-10">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="mb-8 text-center">

            <h2 className="text-2xl font-bold text-[#8B1E3F] sm:text-3xl">
              Matrimonial Biodata
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              First verify your Membership, then complete your Matrimonial profile
            </p>

          </div>

          {/* =================================================
              MEMBERSHIP VERIFICATION
          ================================================= */}

          <div className="mb-10 rounded-2xl border border-pink-200 bg-pink-50/60 p-5">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-white">
                <FaCheckCircle />
              </div>

              <div>

                <h3 className="font-bold text-[#8B1E3F]">
                  Membership Verification
                </h3>

                <p className="text-xs text-gray-500">
                  Enter your registered Mobile Number or Email
                </p>

              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-3">

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

              {/* VERIFY BUTTON */}

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
                    className="h-12 w-full rounded-xl bg-gradient-to-r from-[#8B1E3F] to-[#d81b60] font-semibold text-white shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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

            {/* ERROR */}

            {verificationError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {verificationError}
              </div>
            )}

            {/* SUCCESS */}

            {verificationMessage && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">

                <div>
                  {verificationMessage}
                </div>

                {memberId && (
                  <div className="mt-1 font-bold">
                    Membership ID: {memberId}
                  </div>
                )}

              </div>
            )}

          </div>

          {/* =================================================
              MATRIMONIAL FORM
          ================================================= */}

          <div
            className={
              !memberVerified
                ? "pointer-events-none relative opacity-50"
                : "relative"
            }
          >

            {/* LOCK MESSAGE */}

            {!memberVerified && (
              <div className="absolute inset-0 z-20 flex items-start justify-center pt-20">

                <div className="rounded-2xl border border-pink-200 bg-white px-6 py-5 text-center shadow-xl">

                  <FaLock className="mx-auto mb-3 text-2xl text-pink-600" />

                  <p className="font-semibold text-[#8B1E3F]">
                    Please verify Membership first
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    The Matrimonial form will open after Member verification.
                  </p>

                </div>

              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

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
                  value={
                    formData.profile_category
                  }
                  onChange={handleChange}
                  className={inputClass}
                >

                  <option value="">
                    Select Category
                  </option>

                  {profileCategoryList.map(
                    (category) => (
                      <option
                        key={
                          category.value
                        }
                        value={
                          category.value
                        }
                      >
                        {category.label}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* FATHER NAME */}

              <div>

                <label className={labelClass}>
                  Father's Name
                </label>

                <input
                  type="text"
                  name="father_name"
                  value={
                    formData.father_name
                  }
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
                  value={
                    formData.mother_name
                  }
                  onChange={handleChange}
                  placeholder="Mother's Name"
                  className={inputClass}
                />

              </div>

              {/* FATHER GOTRAM */}

              <GotramSelect
                name="father_gotram"
                label="Father Gotram"
                value={
                  formData.father_gotram
                }
                onChange={handleChange}
              />

              {/* MOTHER GOTRAM */}

              <GotramSelect
                name="mother_gotram"
                label="Mother Gotram"
                value={
                  formData.mother_gotram
                }
                onChange={handleChange}
              />

              {/* GRAND MOTHER GOTRAM */}

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
                  value={
                    formData.nakshatram
                  }
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

                  {rasiList.map(
                    (rasi) => (
                      <option
                        key={rasi.value}
                        value={rasi.value}
                      >
                        {rasi.label}
                      </option>
                    )
                  )}

                </select>

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

                  {colorList.map(
                    (color) => (
                      <option
                        key={color}
                        value={color}
                      >
                        {color}
                      </option>
                    )
                  )}

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

              {/* EDUCATION */}

              <div>

                <label className={labelClass}>
                  Education
                </label>

                <select
                  name="education"
                  value={
                    formData.education
                  }
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

              {/* SALARY */}

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
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#d81b60] via-[#e91e63] to-[#f06292] text-sm font-semibold text-white shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-72"
                >
                  {loading
                    ? "Creating Profile..."
                    : "Create Matrimonial Profile"}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

      {/* =====================================================
          TOAST ANIMATION
      ===================================================== */}

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

    </section>
  );
}