"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
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
   Same field can SELECT or TYPE
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
   SIBLING TYPE
========================================================= */

type Sibling = {
  name: string;
  age: string;
  marital_status: string;
  occupation: string;
};

const emptySibling = (): Sibling => ({
  name: "",
  age: "",
  marital_status: "",
  occupation: "",
});

/* =========================================================
   GOTRAM INPUT
   SELECT OR TYPE IN SAME FIELD
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
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  const datalistId = `${name}-gotram-options`;

  return (
    <div>
      <label className={labelClass}>
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        list={datalistId}
        placeholder="Select / type Gotram"
        autoComplete="off"
        className={inputClass}
      />

      <datalist id={datalistId}>
        {gotramList.map((gotram) => (
          <option
            key={gotram}
            value={gotram}
          />
        ))}
      </datalist>
    </div>
  );
}

/* =========================================================
   EDUCATION INPUT
   SAME FIELD CAN SELECT OR TYPE
========================================================= */

function EducationSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  return (
    <div>
      <label className={labelClass}>
        Education
      </label>

      <input
        type="text"
        name="education"
        value={value}
        onChange={onChange}
        list="education-options"
        placeholder="Select / type Education"
        autoComplete="off"
        className={inputClass}
      />

      <datalist id="education-options">
        {educationList.map((education) => (
          <option
            key={education}
            value={education}
          />
        ))}
      </datalist>
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

  const [verificationMessage, setVerificationMessage] =
    useState("");

  const [verificationError, setVerificationError] =
    useState("");

  const [verificationData, setVerificationData] =
    useState({
      mobile: "",
      full_name: "",
      father_name: "",
    });

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

  const [formData, setFormData] = useState({
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

    /* AREA VOLUNTEER */

    area_volunteer_name: "",
    area_volunteer_contact: "",
    area_volunteer_position: "",
  });

  /* =========================================================
     SIBLINGS
  ========================================================= */

  const [brotherCount, setBrotherCount] =
    useState(0);

  const [sisterCount, setSisterCount] =
    useState(0);

  const [brothers, setBrothers] =
    useState<Sibling[]>([]);

  const [sisters, setSisters] =
    useState<Sibling[]>([]);

  /* =========================================================
     HANDLE VERIFICATION INPUT
  ========================================================= */

  const handleVerificationChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setVerificationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setVerificationError("");
  };

  /* =========================================================
     HANDLE FORM INPUT
  ========================================================= */

  const handleChange = (
    e: ChangeEvent<
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
     BROTHER COUNT
  ========================================================= */

  const handleBrotherCount = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(e.target.value);

    setBrotherCount(count);

    setBrothers((prev) =>
      Array.from(
        { length: count },
        (_, index) =>
          prev[index] || emptySibling()
      )
    );
  };

  /* =========================================================
     SISTER COUNT
  ========================================================= */

  const handleSisterCount = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(e.target.value);

    setSisterCount(count);

    setSisters((prev) =>
      Array.from(
        { length: count },
        (_, index) =>
          prev[index] || emptySibling()
      )
    );
  };

  /* =========================================================
     UPDATE BROTHER
  ========================================================= */

  const updateBrother = (
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    setBrothers((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  /* =========================================================
     UPDATE SISTER
  ========================================================= */

  const updateSister = (
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    setSisters((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return updated;
    });
  };

  /* =========================================================
     CHECK MEMBER - MOBILE ONLY
  ========================================================= */

  const handleCheckMember = async () => {
    if (checkingMember) return;

    const mobile =
      verificationData.mobile
        .replace(/\D/g, "")
        .slice(0, 10);

    if (!mobile) {
      setVerificationError(
        "Please enter your registered Mobile Number."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setVerificationError(
        "Please enter a valid 10-digit Mobile Number."
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
            mobile,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "CHECK MEMBER RESPONSE:",
        data
      );

      if (data.alreadyRegistered) {
        const matrimonialId =
          data.data?.matrimonial_member_id ||
          data.data?.member_id ||
          "";

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

      const verifiedName =
        member.full_name ||
        member.name ||
        "";

      const verifiedFatherName =
        member.father_name ||
        "";

      setMemberVerified(true);

      setMemberId(
        member.member_id || ""
      );

      setVerificationData({
        mobile: verifiedMobile,
        full_name: verifiedName,
        father_name: verifiedFatherName,
      });

      setVerificationMessage(
        "Member verified successfully. You can now complete the Matrimonial form."
      );
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

    /* MEMBERSHIP VERIFICATION */

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
        "Membership Mobile Number is missing. Please verify again."
      );
      return;
    }

    if (!memberId) {
      alert(
        "Membership ID is missing. Please verify your Membership again."
      );
      return;
    }

    /* BASIC VALIDATION */

    if (!formData.profile_category) {
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

    /* EDUCATION */

    if (!formData.education.trim()) {
      alert(
        "Please select or enter Education."
      );
      return;
    }

    /* GOTRAM VALIDATION */

    if (!formData.father_gotram.trim()) {
      alert(
        "Please select or enter Father's Gotram."
      );
      return;
    }

    if (!formData.mother_gotram.trim()) {
      alert(
        "Please select or enter Mother's Gotram."
      );
      return;
    }

    if (!formData.grandmother_gotram.trim()) {
      alert(
        "Please select or enter Grand Mother's Gotram."
      );
      return;
    }

    /* BROTHER VALIDATION */

    for (
      let index = 0;
      index < brothers.length;
      index++
    ) {
      const brother =
        brothers[index];

      if (!brother.name.trim()) {
        alert(
          `Please enter Brother ${index + 1} Name.`
        );
        return;
      }

      if (!brother.age.trim()) {
        alert(
          `Please enter Brother ${index + 1} Age.`
        );
        return;
      }

      if (!brother.marital_status) {
        alert(
          `Please select Brother ${index + 1} Marital Status.`
        );
        return;
      }

      if (!brother.occupation.trim()) {
        alert(
          `Please enter Brother ${index + 1} Occupation.`
        );
        return;
      }
    }

    /* SISTER VALIDATION */

    for (
      let index = 0;
      index < sisters.length;
      index++
    ) {
      const sister =
        sisters[index];

      if (!sister.name.trim()) {
        alert(
          `Please enter Sister ${index + 1} Name.`
        );
        return;
      }

      if (!sister.age.trim()) {
        alert(
          `Please enter Sister ${index + 1} Age.`
        );
        return;
      }

      if (!sister.marital_status) {
        alert(
          `Please select Sister ${index + 1} Marital Status.`
        );
        return;
      }

      if (!sister.occupation.trim()) {
        alert(
          `Please enter Sister ${index + 1} Occupation.`
        );
        return;
      }
    }

    /* CONSENT */

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

      /* MEMBERSHIP */

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
         Selected OR manually typed value
      ===================================================== */

      const fatherGotram =
        formData.father_gotram.trim();

      const motherGotram =
        formData.mother_gotram.trim();

      const grandmotherGotram =
        formData.grandmother_gotram.trim();

      /* =====================================================
         EDUCATION
         Selected OR manually typed value
      ===================================================== */

      const education =
        formData.education.trim();

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
          education,

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

      /* =====================================================
         APPEND NORMAL FIELDS
      ===================================================== */

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
          : brothers
              .map(
                (
                  brother,
                  index
                ) =>
                  `Brother ${
                    index + 1
                  }: Name: ${
                    brother.name
                  }, Age: ${
                    brother.age
                  }, Marital Status: ${
                    brother.marital_status
                  }, Occupation: ${
                    brother.occupation
                  }`
              )
              .join(" | ");

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
          : sisters
              .map(
                (
                  sister,
                  index
                ) =>
                  `Sister ${
                    index + 1
                  }: Name: ${
                    sister.name
                  }, Age: ${
                    sister.age
                  }, Marital Status: ${
                    sister.marital_status
                  }, Occupation: ${
                    sister.occupation
                  }`
              )
              .join(" | ");

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
          education,
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
          router.push("/search");
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

      {/* GREEN TOAST */}

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

      {/* BACKGROUND */}

      <div className="absolute -left-56 top-20 h-[500px] w-[500px] rounded-full bg-pink-200/40 blur-[120px]" />

      <div className="absolute -right-56 bottom-0 h-[500px] w-[500px] rounded-full bg-rose-200/40 blur-[120px]" />

      <FaHeart className="absolute left-10 top-48 text-7xl text-pink-300 opacity-20" />

      <FaHeart className="absolute bottom-24 right-16 text-8xl text-rose-300 opacity-20" />

      {/* MAIN CARD */}

      <div className="relative z-10 flex justify-center px-4 py-10 sm:px-6">

        <div className="w-full max-w-6xl rounded-3xl border border-pink-100 bg-white/95 p-5 shadow-[0_20px_60px_rgba(233,30,99,0.12)] backdrop-blur sm:p-8 lg:p-10">

          {/* HEADER */}

          <div className="mb-8 text-center">

            <h2 className="text-2xl font-bold text-[#8B1E3F] sm:text-3xl">
              Matrimonial Biodata
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Verify your Membership using Mobile Number, then complete your Matrimonial profile
            </p>

          </div>

          {/* MEMBERSHIP VERIFICATION */}

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

              {/* MOBILE */}

              <div>

                <label className={labelClass}>
                  Registered Mobile Number
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={
                    verificationData.mobile
                  }
                  onChange={(e) => {
                    const value =
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

                    setVerificationData(
                      (prev) => ({
                        ...prev,
                        mobile: value,
                      })
                    );

                    setVerificationError("");
                  }}
                  disabled={memberVerified}
                  placeholder="Enter 10-digit Mobile Number"
                  maxLength={10}
                  inputMode="numeric"
                  className={`${inputClass} ${
                    memberVerified
                      ? "cursor-not-allowed bg-gray-100"
                      : ""
                  }`}
                />

              </div>

              {/* VERIFY */}

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

            {memberVerified &&
              memberId && (
                <div className="mt-4 rounded-2xl border border-green-200 bg-white p-4 shadow-sm">

                  <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
                    Verified Membership
                  </p>

                  <p className="mt-2 text-base font-bold text-[#8B1E3F] sm:text-lg">
                    {memberId} |{" "}
                    {verificationData.full_name ||
                      "Member"}{" "}
                    | Father:{" "}
                    {verificationData.father_name ||
                      "Not Available"}
                  </p>

                </div>
              )}

            {verificationMessage && (
              <div className="mt-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {verificationMessage}
              </div>
            )}

          </div>

          {/* MATRIMONIAL FORM */}

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
                        key={
                          nakshatram
                        }
                        value={
                          nakshatram
                        }
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

              {/* =================================================
                  EDUCATION
                  SELECT OR TYPE IN SAME FIELD
              ================================================= */}

              <EducationSelect
                value={formData.education}
                onChange={handleChange}
              />

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

              <div className="md:col-span-2">

                <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-5">

                  <label className={labelClass}>
                    Brother Details
                  </label>

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
                      1 Brother
                    </option>

                    <option value="2">
                      2 Brothers
                    </option>

                    <option value="3">
                      3 Brothers
                    </option>

                  </select>

                  {brothers.length > 0 && (
                    <div className="mt-5 space-y-5">

                      {brothers.map(
                        (
                          brother,
                          index
                        ) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-pink-200 bg-white p-5"
                          >

                            <h4 className="mb-4 font-bold text-[#8B1E3F]">
                              Brother{" "}
                              {index + 1}
                            </h4>

                            <div className="grid gap-4 md:grid-cols-2">

                              <div>

                                <label className={labelClass}>
                                  Name
                                </label>

                                <input
                                  type="text"
                                  value={
                                    brother.name
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateBrother(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Brother Name"
                                  className={inputClass}
                                />

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Age
                                </label>

                                <input
                                  type="number"
                                  min="1"
                                  max="120"
                                  value={
                                    brother.age
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateBrother(
                                      index,
                                      "age",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Age"
                                  className={inputClass}
                                />

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Marital Status
                                </label>

                                <select
                                  value={
                                    brother.marital_status
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateBrother(
                                      index,
                                      "marital_status",
                                      e.target.value
                                    )
                                  }
                                  className={inputClass}
                                >

                                  <option value="">
                                    Select Status
                                  </option>

                                  <option value="Married">
                                    Married
                                  </option>

                                  <option value="Unmarried">
                                    Unmarried
                                  </option>

                                </select>

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Occupation
                                </label>

                                <input
                                  type="text"
                                  value={
                                    brother.occupation
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateBrother(
                                      index,
                                      "occupation",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Occupation"
                                  className={inputClass}
                                />

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </div>

              {/* SISTER DETAILS */}

              <div className="md:col-span-2">

                <div className="rounded-2xl border border-pink-200 bg-pink-50/50 p-5">

                  <label className={labelClass}>
                    Sister Details
                  </label>

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
                      1 Sister
                    </option>

                    <option value="2">
                      2 Sisters
                    </option>

                    <option value="3">
                      3 Sisters
                    </option>

                  </select>

                  {sisters.length > 0 && (
                    <div className="mt-5 space-y-5">

                      {sisters.map(
                        (
                          sister,
                          index
                        ) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-pink-200 bg-white p-5"
                          >

                            <h4 className="mb-4 font-bold text-[#8B1E3F]">
                              Sister{" "}
                              {index + 1}
                            </h4>

                            <div className="grid gap-4 md:grid-cols-2">

                              <div>

                                <label className={labelClass}>
                                  Name
                                </label>

                                <input
                                  type="text"
                                  value={
                                    sister.name
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateSister(
                                      index,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Sister Name"
                                  className={inputClass}
                                />

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Age
                                </label>

                                <input
                                  type="number"
                                  min="1"
                                  max="120"
                                  value={
                                    sister.age
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateSister(
                                      index,
                                      "age",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Age"
                                  className={inputClass}
                                />

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Marital Status
                                </label>

                                <select
                                  value={
                                    sister.marital_status
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateSister(
                                      index,
                                      "marital_status",
                                      e.target.value
                                    )
                                  }
                                  className={inputClass}
                                >

                                  <option value="">
                                    Select Status
                                  </option>

                                  <option value="Married">
                                    Married
                                  </option>

                                  <option value="Unmarried">
                                    Unmarried
                                  </option>

                                </select>

                              </div>

                              <div>

                                <label className={labelClass}>
                                  Occupation
                                </label>

                                <input
                                  type="text"
                                  value={
                                    sister.occupation
                                  }
                                  onChange={(
                                    e
                                  ) =>
                                    updateSister(
                                      index,
                                      "occupation",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Occupation"
                                  className={inputClass}
                                />

                              </div>

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

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

              {/* DECLARATION */}

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
                        </strong>.
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

                        <label className={labelClass}>
                          Name
                        </label>

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

                        <label className={labelClass}>
                          Contact Number
                        </label>

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

                        <label className={labelClass}>
                          Position of that Area
                        </label>

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

                {/* CONSENT */}

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
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-rose-700"
                    />

                    <span className="text-sm font-medium leading-6 text-gray-800 sm:text-base">

                      I/We hereby confirm that I/We have read, understood and accepted the above declaration and agree to provide my/our consent for registration on this matrimonial website.

                      <span className="font-bold text-red-600">
                        {" "}*
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

              {/* SUBMIT */}

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

      {/* TOAST ANIMATION */}

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

