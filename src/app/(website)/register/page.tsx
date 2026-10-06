"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import {
  FaHeart,
  FaCheckCircle,
  FaLock,
  FaTimes,
  FaChevronDown,
  FaSearch,
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
  "Othar",
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

const labelClass = "text-sm font-medium text-gray-700";

/* =========================================================
   REQUIRED LABEL
========================================================= */

function FieldLabel({
  children,
  required = false,
}: {
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label className={labelClass}>
      {children}
      {required && (
        <span className="ml-1 font-bold text-red-600">*</span>
      )}
    </label>
  );
}

/* =========================================================
   SEARCHABLE GOTRAM SELECT
========================================================= */

function GotramSelect({
  name,
  label,
  value,
  onChange,
  required = false,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(value);

  const wrapperRef = useRef<HTMLDivElement>(null);

  /* ---------------------------------------------------------
     Keep search text synced with selected value
  --------------------------------------------------------- */

  useEffect(() => {
    setSearch(value);
  }, [value]);

  /* ---------------------------------------------------------
     Close dropdown when clicked outside
  --------------------------------------------------------- */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ---------------------------------------------------------
     SEARCH
     Only values STARTING WITH typed letters are displayed.
     
     Example:
     s  -> Sreevathsah, Sreedharah, Suklarushi...
     sa -> Sanathkumara, Sanadanath, Samvarthaka...
  --------------------------------------------------------- */

  const searchText = search.trim().toLowerCase();

  const filteredGotram = gotramList.filter((gotram) =>
    gotram.toLowerCase().startsWith(searchText)
  );

  /* ---------------------------------------------------------
     INPUT CHANGE
  --------------------------------------------------------- */

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;

    setSearch(newValue);
    setOpen(true);

    onChange(e);
  };

  /* ---------------------------------------------------------
     SELECT GOTRAM
  --------------------------------------------------------- */

  const handleSelect = (gotram: string) => {
    const syntheticEvent = {
      target: {
        name,
        value: gotram,
      },
    } as ChangeEvent<HTMLInputElement>;

    setSearch(gotram);
    setOpen(false);

    onChange(syntheticEvent);
  };

  return (
    <div
      className="relative"
      ref={wrapperRef}
    >
      <FieldLabel required={required}>
        {label}
      </FieldLabel>

      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-sm text-gray-400" />

        <input
          type="text"
          name={name}
          value={search}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          placeholder="Search Gotram..."
          autoComplete="off"
          required={required}
          className={`${inputClass} pl-10 pr-10`}
        />

        <FaChevronDown
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {open && (
        <div className="absolute left-0 right-0 z-[100] mt-1 max-h-64 overflow-y-auto rounded-xl border border-pink-200 bg-white shadow-xl">
          {filteredGotram.length > 0 ? (
            filteredGotram.map((gotram) => (
              <button
                key={gotram}
                type="button"
                onMouseDown={(e) =>
                  e.preventDefault()
                }
                onClick={() =>
                  handleSelect(gotram)
                }
                className={`block w-full border-b border-gray-100 px-4 py-3 text-left text-sm last:border-b-0 hover:bg-pink-50 ${
                  value === gotram
                    ? "bg-pink-50 font-semibold text-[#8B1E3F]"
                    : "text-gray-700"
                }`}
              >
                {gotram}
              </button>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-sm text-gray-500">
              No Gotram found starting with{" "}
              <strong>
                {search}
              </strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   REGISTER PAGE
========================================================= */

export default function RegisterPage() {
  const router = useRouter();

  /* =========================================================
     BACKEND URL
  ========================================================= */

  const BACKEND_URL = (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] =
    useState(false);

  const [checkingMember, setCheckingMember] =
    useState(false);

  /* =========================================================
     MEMBER VERIFICATION
  ========================================================= */

  const [memberVerified, setMemberVerified] =
    useState(false);

  const [memberId, setMemberId] =
    useState("");

  const [
    verificationMessage,
    setVerificationMessage,
  ] = useState("");

  const [
    verificationError,
    setVerificationError,
  ] = useState("");

  const [verificationData, setVerificationData] =
    useState({
      mobile: "",
    });

  const [
    verificationMember,
    setVerificationMember,
  ] = useState<any>(null);

  /* =========================================================
     CONSENT
  ========================================================= */

  const [consent, setConsent] =
    useState(false);

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
     FORM DATA
  ========================================================= */

  const [formData, setFormData] =
    useState({
      profile_category: "Professional",
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
      area_volunteer_name: "",
      area_volunteer_contact: "",
      area_volunteer_position: "",
    });

  /* =========================================================
     BROTHER / SISTER COUNT
  ========================================================= */

  const [brotherCount, setBrotherCount] =
    useState(0);

  const [sisterCount, setSisterCount] =
    useState(0);

  /* =========================================================
     BROTHER / SISTER MARITAL STATUS
  ========================================================= */

  const [brotherMarried, setBrotherMarried] =
    useState(0);

  const [brotherUnmarried, setBrotherUnmarried] =
    useState(0);

  const [sisterMarried, setSisterMarried] =
    useState(0);

  const [sisterUnmarried, setSisterUnmarried] =
    useState(0);

  /* =========================================================
     HANDLE VERIFICATION INPUT
  ========================================================= */

  const handleVerificationChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    setVerificationData({
      mobile: value,
    });

    setVerificationError("");
  };

  /* =========================================================
     HANDLE FORM INPUT
  ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     BROTHER COUNT
  ========================================================= */

  const handleBrotherCount = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(e.target.value);

    setBrotherCount(count);

    setBrotherMarried(0);
    setBrotherUnmarried(0);
  };

  /* =========================================================
     SISTER COUNT
  ========================================================= */

  const handleSisterCount = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(e.target.value);

    setSisterCount(count);

    setSisterMarried(0);
    setSisterUnmarried(0);
  };

  /* =========================================================
     BROTHER MARRIED
  ========================================================= */

  const handleBrotherMarried = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const married = Number(e.target.value);

    if (married > brotherCount) {
      return;
    }

    setBrotherMarried(married);

    setBrotherUnmarried(
      brotherCount - married
    );
  };

  /* =========================================================
     SISTER MARRIED
  ========================================================= */

  const handleSisterMarried = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const married = Number(e.target.value);

    if (married > sisterCount) {
      return;
    }

    setSisterMarried(married);

    setSisterUnmarried(
      sisterCount - married
    );
  };

  /* =========================================================
     CHECK MEMBER
  ========================================================= */

  const handleCheckMember = async () => {
    if (checkingMember) return;

    const mobile =
      verificationData.mobile.trim();

    if (!mobile) {
      setVerificationError(
        "Please enter your registered Mobile Number."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setVerificationError(
        "Please enter a valid 10-digit Indian Mobile Number."
      );
      return;
    }

    setCheckingMember(true);
    setVerificationError("");
    setVerificationMessage("");
    setMemberVerified(false);
    setMemberId("");
    setVerificationMember(null);

    try {
      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/check-member`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            mobile,
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "CHECK MEMBER RESPONSE:",
        data
      );

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

      const member =
        data.data || {};

      const verifiedMobile =
        member.mobile || mobile;

      setMemberVerified(true);

      setMemberId(
        member.member_id || ""
      );

      setVerificationMember(member);

      setVerificationMessage(
        "Member verified successfully. You can now complete the Matrimonial form."
      );

      setVerificationData({
        mobile: verifiedMobile,
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
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    if (!memberVerified) {
      alert(
        "Please verify your Membership before registering for Matrimonial."
      );
      return;
    }

    const verifiedMobile =
      verificationData.mobile.trim();

    if (!verifiedMobile) {
      alert(
        "Membership verification details are missing. Please verify again."
      );
      return;
    }

    if (!memberId) {
      alert(
        "Membership ID is missing. Please verify your Membership again."
      );
      return;
    }

    /* =====================================================
       REQUIRED VALIDATION
    ===================================================== */

    if (!formData.profile_category.trim()) {
      alert(
        "Please select Profile Category."
      );
      return;
    }

    if (!formData.mother_name.trim()) {
      alert(
        "Please enter Mother's Name."
      );
      return;
    }

    if (!formData.father_gotram.trim()) {
      alert(
        "Please select Father's Gotram."
      );
      return;
    }

    if (!formData.mother_gotram.trim()) {
      alert(
        "Please select Mother's Gotram."
      );
      return;
    }

    if (!formData.grandmother_gotram.trim()) {
      alert(
        "Please select Grand Mother's Gotram."
      );
      return;
    }

    /* =====================================================
       BROTHER VALIDATION
    ===================================================== */

    if (
      brotherMarried +
        brotherUnmarried !==
      brotherCount
    ) {
      alert(
        "Please select the correct Brother Married / Unmarried count."
      );
      return;
    }

    /* =====================================================
       SISTER VALIDATION
    ===================================================== */

    if (
      sisterMarried +
        sisterUnmarried !==
      sisterCount
    ) {
      alert(
        "Please select the correct Sister Married / Unmarried count."
      );
      return;
    }

    /* =====================================================
       CONSENT
    ===================================================== */

    if (!consent) {
      alert(
        "Please read and accept the Declaration & Consent before submitting."
      );
      return;
    }

    setLoading(true);

    try {
      const formDataToSend =
        new FormData();

      /* =====================================================
         MEMBERSHIP
      ===================================================== */

      formDataToSend.append(
        "member_id",
        memberId
      );

      formDataToSend.append(
        "mobile",
        verifiedMobile
      );

      /* =====================================================
         GOTRAM
      ===================================================== */

      const fatherGotram =
        formData.father_gotram.trim();

      const motherGotram =
        formData.mother_gotram.trim();

      const grandmotherGotram =
        formData.grandmother_gotram.trim();

      /* =====================================================
         NORMAL FIELDS
      ===================================================== */

      const normalFields = {
        profile_category:
          formData.profile_category,

        mother_name:
          formData.mother_name,

        father_gotram:
          fatherGotram,

        mother_gotram:
          motherGotram,

        grandmother_gotram:
          grandmotherGotram,

        nakshatram:
          formData.nakshatram,

        padham:
          formData.padham,

        rasi:
          formData.rasi,

        color:
          formData.color,

        height:
          formData.height,

        education:
          formData.education,

        annual_income:
          formData.annual_income,

        address:
          formData.address,

        father_occupation:
          formData.father_occupation,

        mother_occupation:
          formData.mother_occupation,

        property_details:
          formData.property_details,

        preferred_requirements:
          formData.preferred_requirements,
      };

      Object.entries(
        normalFields
      ).forEach(
        ([key, value]) => {
          formDataToSend.append(
            key,
            String(value ?? "")
          );
        }
      );

      /* =====================================================
         BROTHER DETAILS
      ===================================================== */

      const brotherText =
        brotherCount === 0
          ? "No Brothers"
          : `${brotherCount} Brother${
              brotherCount > 1
                ? "s"
                : ""
            } - Married: ${brotherMarried}, Unmarried: ${brotherUnmarried}`;

      formDataToSend.append(
        "brother_details",
        brotherText
      );

      /* =====================================================
         SISTER DETAILS
      ===================================================== */

      const sisterText =
        sisterCount === 0
          ? "No Sisters"
          : `${sisterCount} Sister${
              sisterCount > 1
                ? "s"
                : ""
            } - Married: ${sisterMarried}, Unmarried: ${sisterUnmarried}`;

      formDataToSend.append(
        "sister_details",
        sisterText
      );

      /* =====================================================
         AREA VOLUNTEER
      ===================================================== */

      formDataToSend.append(
        "area_volunteer_name",
        formData.area_volunteer_name.trim()
      );

      formDataToSend.append(
        "area_volunteer_contact",
        formData.area_volunteer_contact.trim()
      );

      formDataToSend.append(
        "area_volunteer_position",
        formData.area_volunteer_position.trim()
      );

      /* =====================================================
         PREFERENCE BACKEND FIELD NAMES
      ===================================================== */

      formDataToSend.append(
        "preference_name",
        formData.area_volunteer_name.trim()
      );

      formDataToSend.append(
        "preference_phone",
        formData.area_volunteer_contact.trim()
      );

      formDataToSend.append(
        "preference_area",
        formData.area_volunteer_position.trim()
      );

      /* =====================================================
         CONSENT
      ===================================================== */

      formDataToSend.append(
        "consent",
        consent ? "true" : "false"
      );

      console.log(
        "Submitting Matrimonial Profile:",
        {
          memberId,
          mobile: verifiedMobile,
          fatherGotram,
          motherGotram,
          grandmotherGotram,
          brotherDetails:
            brotherText,
          sisterDetails:
            sisterText,
          areaVolunteer: {
            name:
              formData.area_volunteer_name,
            contact:
              formData.area_volunteer_contact,
            position:
              formData.area_volunteer_position,
          },
          consent,
        }
      );

      /* =====================================================
         API REQUEST
      ===================================================== */

      const response =
        await fetch(
          `${BACKEND_URL}/matrimonial-users/register`,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

      const data =
        await response.json();

      console.log(
        "REGISTER RESPONSE:",
        data
      );

      /* =====================================================
         SUCCESS
      ===================================================== */

      if (
        response.ok &&
        data.success
      ) {
        const matrimonialId =
          data.data?.member_id ||
          data.data
            ?.matrimonial_member_id ||
          "";

        showGreenToast(
          "Matrimonial registration successfully completed.",
          matrimonialId
        );

        setTimeout(() => {
          router.push("/register-success");
        }, 1800);

        return;
      }

      /* =====================================================
         ALREADY REGISTERED
      ===================================================== */

      if (
        data.alreadyRegistered
      ) {
        const matrimonialId =
          data.data
            ?.matrimonial_member_id ||
          "";

        showGreenToast(
          data.message ||
            "This Member is already registered in Matrimonial.",
          matrimonialId
        );

        return;
      }

      /* =====================================================
         ERROR
      ===================================================== */

      alert(
        Array.isArray(
          data.message
        )
          ? data.message.join(
              ", "
            )
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
              First verify your Membership,
              then complete your Matrimonial
              profile
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
                  Enter your registered Mobile Number
                </p>
              </div>

            </div>

            <div className="grid gap-4 md:grid-cols-2">

              <div>

                <FieldLabel>
                  Registered Mobile
                </FieldLabel>

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
                  maxLength={10}
                  inputMode="numeric"
                  autoComplete="tel"
                  className={`${inputClass} ${
                    memberVerified
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                />

              </div>

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

            {verificationError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {verificationError}
              </div>
            )}

            {verificationMessage && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700">

                <div className="font-medium">
                  {verificationMessage}
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">

                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-500">
                      Member Name
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {verificationMember?.full_name ||
                        "-"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-500">
                      Father Name
                    </p>

                    <p className="mt-1 font-bold text-gray-800">
                      {verificationMember?.father_name ||
                        "-"}
                    </p>
                  </div>

                  <div className="rounded-lg bg-white p-3">
                    <p className="text-xs text-gray-500">
                      Membership ID
                    </p>

                    <p className="mt-1 font-bold text-[#8B1E3F]">
                      {memberId || "-"}
                    </p>
                  </div>

                </div>
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

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 md:grid-cols-2"
            >

              {/* =================================================
                  PROFILE CATEGORY
              ================================================= */}

              <div>

                <FieldLabel required>
                  Profile Category
                </FieldLabel>

                <select
                  name="profile_category"
                  value={
                    formData.profile_category
                  }
                  onChange={handleChange}
                  required
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

              {/* =================================================
                  MOTHER NAME
              ================================================= */}

              <div>

                <FieldLabel required>
                  Mother's Name
                </FieldLabel>

                <input
                  type="text"
                  name="mother_name"
                  value={
                    formData.mother_name
                  }
                  onChange={handleChange}
                  placeholder="Mother's Name"
                  required
                  className={inputClass}
                />

              </div>

              {/* =================================================
                  FATHER GOTRAM
              ================================================= */}

              <GotramSelect
                name="father_gotram"
                label="Father Gotram"
                value={
                  formData.father_gotram
                }
                onChange={handleChange}
                required
              />

              {/* =================================================
                  MOTHER GOTRAM
              ================================================= */}

              <GotramSelect
                name="mother_gotram"
                label="Mother Gotram"
                value={
                  formData.mother_gotram
                }
                onChange={handleChange}
                required
              />

              {/* =================================================
                  GRAND MOTHER GOTRAM
              ================================================= */}

              <GotramSelect
                name="grandmother_gotram"
                label="Grand Mother Gotram"
                value={
                  formData.grandmother_gotram
                }
                onChange={handleChange}
                required
              />

              {/* =================================================
                  NAKSHATRAM
              ================================================= */}

              <div>

                <FieldLabel>
                  Nakshatram
                </FieldLabel>

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

              {/* =================================================
                  PADHAM
              ================================================= */}

              <div>

                <FieldLabel>
                  Nakshatram Padham
                </FieldLabel>

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

              {/* =================================================
                  RASI
              ================================================= */}

              <div>

                <FieldLabel>
                  Rasi
                </FieldLabel>

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

              {/* =================================================
                  COLOR
              ================================================= */}

              <div>

                <FieldLabel>
                  Color
                </FieldLabel>

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

              {/* =================================================
                  HEIGHT
              ================================================= */}

              <div>

                <FieldLabel>
                  Height
                </FieldLabel>

                <input
                  type="text"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  placeholder="Example: 5.6"
                  className={inputClass}
                />

              </div>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <div>

                <FieldLabel>
                  Education
                </FieldLabel>

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

              {/* =================================================
                  SALARY
              ================================================= */}

              <div>

                <FieldLabel>
                  Salary / Income
                </FieldLabel>

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

              {/* =================================================
                  ADDRESS
              ================================================= */}

              <div>

                <FieldLabel>
                  Address
                </FieldLabel>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full Address"
                  rows={3}
                  className={textareaClass}
                />

              </div>

              {/* =================================================
                  FATHER DETAILS
              ================================================= */}

              <div>

                <FieldLabel>
                  Father Details
                </FieldLabel>

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

              {/* =================================================
                  MOTHER DETAILS
              ================================================= */}

              <div>

                <FieldLabel>
                  Mother Details
                </FieldLabel>

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

              {/* =================================================
                  BROTHER DETAILS
              ================================================= */}

              <div className="md:col-span-2">

                <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-5">

                  <h3 className="mb-4 text-lg font-bold text-[#8B1E3F]">
                    Brother Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    {/* NUMBER OF BROTHERS */}

                    <div>

                      <FieldLabel>
                        Number of Brothers
                      </FieldLabel>

                      <select
                        value={
                          brotherCount
                        }
                        onChange={
                          handleBrotherCount
                        }
                        className={inputClass}
                      >
                        <option value="0">
                          No Brothers
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

                        <option value="5">
                          5
                        </option>
                      </select>

                    </div>

                    {/* MARRIED BROTHERS */}

                    {brotherCount > 0 && (
                      <div>

                        <FieldLabel>
                          Married Brothers
                        </FieldLabel>

                        <select
                          value={
                            brotherMarried
                          }
                          onChange={
                            handleBrotherMarried
                          }
                          className={inputClass}
                        >
                          {Array.from(
                            {
                              length:
                                brotherCount +
                                1,
                            },
                            (_, index) => (
                              <option
                                key={
                                  index
                                }
                                value={
                                  index
                                }
                              >
                                {index}
                              </option>
                            )
                          )}
                        </select>

                        <p className="mt-2 text-xs text-gray-500">
                          Unmarried Brothers:{" "}
                          <strong>
                            {
                              brotherUnmarried
                            }
                          </strong>
                        </p>

                      </div>
                    )}

                  </div>

                  {brotherCount > 0 && (
                    <div className="mt-4 rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-gray-700">

                      Total Brothers:{" "}
                      <strong>
                        {brotherCount}
                      </strong>

                      {" • "}

                      Married:{" "}
                      <strong>
                        {brotherMarried}
                      </strong>

                      {" • "}

                      Unmarried:{" "}
                      <strong>
                        {brotherUnmarried}
                      </strong>

                    </div>
                  )}

                </div>

              </div>

              {/* =================================================
                  SISTER DETAILS
              ================================================= */}

              <div className="md:col-span-2">

                <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-5">

                  <h3 className="mb-4 text-lg font-bold text-[#8B1E3F]">
                    Sister Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">

                    {/* NUMBER OF SISTERS */}

                    <div>

                      <FieldLabel>
                        Number of Sisters
                      </FieldLabel>

                      <select
                        value={
                          sisterCount
                        }
                        onChange={
                          handleSisterCount
                        }
                        className={inputClass}
                      >
                        <option value="0">
                          No Sisters
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

                        <option value="5">
                          5
                        </option>
                      </select>

                    </div>

                    {/* MARRIED SISTERS */}

                    {sisterCount > 0 && (
                      <div>

                        <FieldLabel>
                          Married Sisters
                        </FieldLabel>

                        <select
                          value={
                            sisterMarried
                          }
                          onChange={
                            handleSisterMarried
                          }
                          className={inputClass}
                        >
                          {Array.from(
                            {
                              length:
                                sisterCount +
                                1,
                            },
                            (_, index) => (
                              <option
                                key={
                                  index
                                }
                                value={
                                  index
                                }
                              >
                                {index}
                              </option>
                            )
                          )}
                        </select>

                        <p className="mt-2 text-xs text-gray-500">
                          Unmarried Sisters:{" "}
                          <strong>
                            {
                              sisterUnmarried
                            }
                          </strong>
                        </p>

                      </div>
                    )}

                  </div>

                  {sisterCount > 0 && (
                    <div className="mt-4 rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-gray-700">

                      Total Sisters:{" "}
                      <strong>
                        {sisterCount}
                      </strong>

                      {" • "}

                      Married:{" "}
                      <strong>
                        {sisterMarried}
                      </strong>

                      {" • "}

                      Unmarried:{" "}
                      <strong>
                        {sisterUnmarried}
                      </strong>

                    </div>
                  )}

                </div>

              </div>

              {/* =================================================
                  PROPERTY DETAILS
              ================================================= */}

              <div>

                <FieldLabel>
                  Property Details
                </FieldLabel>

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

              {/* =================================================
                  PREFERRED REQUIREMENTS
              ================================================= */}

              <div>

                <FieldLabel>
                  Preferred Requirements
                </FieldLabel>

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

              {/* =================================================
                  DECLARATION & SERVICE
              ================================================= */}

              <div className="mt-5 md:col-span-2">

                <div className="rounded-3xl border border-pink-200 bg-gradient-to-br from-pink-50 via-white to-rose-50 p-5 shadow-sm sm:p-7">

                  {/* SERVICE MOTTO */}

                  <div className="mb-7 text-center">

                    <div className="inline-flex items-center gap-2 rounded-full bg-rose-700 px-6 py-3 text-lg font-bold text-white shadow">

                      <FaHeart className="text-pink-200" />

                      SERVICE IS OUR MOTTO

                    </div>

                  </div>

                  {/* DECLARATION */}

                  <div className="rounded-2xl border border-pink-200 bg-white p-5 sm:p-6">

                    <h3 className="mb-4 text-xl font-bold text-rose-800 sm:text-2xl">
                      Matrimonial Registration – Declaration
                    </h3>

                    <div className="space-y-4 text-sm leading-7 text-gray-700 sm:text-base">

                      <p>
                        I/We solemnly declare that the input data given by us in the matrimonial biodata submitted by us/me are true to the best of our/my knowledge and belief for our/my marriage alliance and will hope the well blessings from our Aarya Vysya Goddess{" "}
                        <strong className="text-rose-700">
                          Shree VASAVI KANYAKA PARAMESHWARI AMMAVARU.
                        </strong>
                      </p>

                      <p>
                        This matrimonial website will hope long live and sustain with your wholehearted and kind support to maintain safety and accountability to all of our unmarried youth community and well-married couples to enhance the Vysya community.
                      </p>

                    </div>

                  </div>

                  {/* SERVICE & REGISTRATION */}

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                    <div className="rounded-2xl border border-pink-200 bg-white p-5">

                      <h4 className="mb-3 text-lg font-bold text-rose-800">
                        SERVICE IS OUR MOTTO
                      </h4>

                      <p className="text-sm leading-7 text-gray-700 sm:text-base">
                        Our service is dedicated to supporting the Arya Vysya community and helping eligible members connect for suitable matrimonial alliances in a safe and responsible environment.
                      </p>

                    </div>

                    <div className="rounded-2xl border border-pink-200 bg-white p-5">

                      <h4 className="mb-3 text-lg font-bold text-rose-800">
                        FREE REGISTRATION
                      </h4>

                      <p className="text-sm leading-7 text-gray-700 sm:text-base">
                        Registration is free and valid for up to{" "}
                        <strong className="text-rose-700">
                          99 days
                        </strong>
                        .
                      </p>

                      <p className="mt-2 text-sm leading-7 text-gray-700 sm:text-base">
                        Registration may be extended by{" "}
                        <strong className="text-rose-700">
                          180 days
                        </strong>{" "}
                        with volunteer contribution in three digits.
                      </p>

                    </div>

                  </div>

                  {/* SAFETY & SUPPORT */}

                  <div className="mt-6 rounded-2xl border border-pink-200 bg-white p-5 sm:p-6">

                    <h4 className="mb-3 text-lg font-bold text-rose-800">
                      Safe, Support & Good Connectivity
                    </h4>

                    <p className="text-sm leading-7 text-gray-700 sm:text-base">
                      We abide by registration formalities and safety measures for the potential growth and sustainability of this website.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                      Please submit the details of any known volunteer/person from your area who can support our community matrimonial services.
                    </p>

                  </div>

                  {/* AREA VOLUNTEER DETAILS */}

                  <div className="mt-6 rounded-2xl border-2 border-rose-200 bg-white p-5 sm:p-6">

                    <div className="mb-2 flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                        <FaHeart className="text-rose-700" />
                      </div>

                      <h4 className="text-xl font-bold text-rose-800 sm:text-2xl">
                        Your Preference Details
                      </h4>

                    </div>

                    <p className="mb-5 text-sm leading-6 text-gray-600 sm:text-base">
                      Please provide the details of any known person from your area who can support and help our community matrimonial services.
                    </p>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                      <div>

                        <FieldLabel>
                          Name
                        </FieldLabel>

                        <input
                          type="text"
                          name="area_volunteer_name"
                          value={
                            formData.area_volunteer_name
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter Name"
                          className={inputClass}
                        />

                      </div>

                      <div>

                        <FieldLabel>
                          Contact Number
                        </FieldLabel>

                        <input
                          type="tel"
                          name="area_volunteer_contact"
                          value={
                            formData.area_volunteer_contact
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="Enter Contact Number"
                          maxLength={10}
                          inputMode="numeric"
                          className={inputClass}
                        />

                      </div>

                      <div>

                        <FieldLabel>
                          Position of that Area
                        </FieldLabel>

                        <input
                          type="text"
                          name="area_volunteer_position"
                          value={
                            formData.area_volunteer_position
                          }
                          onChange={
                            handleChange
                          }
                          placeholder="e.g. Area Volunteer / Sangham Representative"
                          className={inputClass}
                        />

                      </div>

                    </div>

                  </div>

                </div>

                {/* =================================================
                    CONSENT
                ================================================= */}

                <div
                  className={`mt-5 rounded-2xl border-2 p-5 transition ${
                    consent
                      ? "border-green-300 bg-green-50"
                      : "border-rose-300 bg-rose-50"
                  }`}
                >

                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) =>
                        setConsent(
                          e.target.checked
                        )
                      }
                      required
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-rose-700"
                    />

                    <span className="text-sm font-medium leading-6 text-gray-800 sm:text-base">

                      I/We hereby confirm that I/We have read, understood and accepted the above declaration and agree to provide my/our consent for registration on this matrimonial website.

                      <span className="ml-1 font-bold text-red-600">
                        *
                      </span>

                    </span>

                  </label>

                  {!consent ? (
                    <p className="ml-8 mt-3 text-xs text-red-600 sm:text-sm">
                      Please accept the declaration by selecting the tick mark before submitting the registration.
                    </p>
                  ) : (
                    <p className="ml-8 mt-3 flex items-center gap-2 text-xs font-medium text-green-700 sm:text-sm">
                      <FaCheckCircle />
                      Consent accepted successfully.
                    </p>
                  )}

                </div>

              </div>

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <div className="mt-6 flex justify-center md:col-span-2">

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !consent
                  }
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-[#d81b60] via-[#e91e63] to-[#f06292] text-sm font-semibold text-white shadow-md transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-80"
                >

                  {loading
                    ? "Creating Profile..."
                    : !consent
                    ? "Accept Consent to Continue"
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