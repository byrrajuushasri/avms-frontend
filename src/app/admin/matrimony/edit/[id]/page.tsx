"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaCheckCircle,
  FaTimes,
  FaUsers,
  FaCamera,
} from "react-icons/fa";

/* =========================================================
   BACKEND
========================================================= */

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

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
   SIBLING TYPE
========================================================= */

type Sibling = {
  name: string;
  age: string;
  marital_status: string;
  occupation: string;
};

/* =========================================================
   PROFILE TYPE
========================================================= */

type Profile = {
  member_id: string;

  profile_category: string;

  father_name: string;
  mother_name: string;

  father_gotram: string;
  mother_gotram: string;
  grandmother_gotram: string;

  nakshatram: string;
  padham: string;
  rasi: string;
  color: string;
  height: string;

  education: string;
  annual_income: string;

  address: string;

  father_occupation: string;
  mother_occupation: string;

  property_details: string;
  preferred_requirements: string;

  area_volunteer_name: string;
  area_volunteer_contact: string;
  area_volunteer_position: string;

  mobile: string;
  email: string;

  consent: boolean;

  photo: string;
};

/* =========================================================
   EMPTY PROFILE
========================================================= */

const emptyProfile: Profile = {
  member_id: "",

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

  property_details: "",
  preferred_requirements: "",

  area_volunteer_name: "",
  area_volunteer_contact: "",
  area_volunteer_position: "",

  mobile: "",
  email: "",

  consent: false,

  photo: "",
};

/* =========================================================
   CLASSES
========================================================= */

const inputClass =
  "mt-2 w-full h-12 border rounded-xl px-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";

const textareaClass =
  "mt-2 w-full border rounded-xl p-4 border-pink-200 outline-none focus:ring-2 focus:ring-pink-300 bg-white";

const labelClass =
  "text-sm font-medium text-gray-700";

/* =========================================================
   PAGE
========================================================= */

export default function EditMatrimonialMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [profile, setProfile] =
    useState<Profile>(emptyProfile);

  const [brothers, setBrothers] =
    useState<Sibling[]>([]);

  const [sisters, setSisters] =
    useState<Sibling[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     PHOTO
  ======================================================= */

  const [selectedPhoto, setSelectedPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState("");

  /* =======================================================
     TOAST
  ======================================================= */

  const [toast, setToast] = useState({
    show: false,
    message: "",
  });

  const showToast = (message: string) => {
    setToast({
      show: true,
      message,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
      });
    }, 3500);
  };

  /* =======================================================
     PHOTO URL
  ======================================================= */

  const getPhotoUrl = (photo: string) => {
    if (!photo) {
      return "/images/default-profile.jpg";
    }

    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    if (photo.startsWith("/")) {
      return `${BACKEND_URL}${photo}`;
    }

    return `${BACKEND_URL}/uploads/matrimonial/${photo}`;
  };

  /* =======================================================
     EMPTY SIBLING
  ======================================================= */

  const createEmptySibling = (): Sibling => ({
    name: "",
    age: "",
    marital_status: "",
    occupation: "",
  });

  /* =======================================================
     PARSE SIBLINGS
  ======================================================= */

  const parseSiblings = (
    text: string,
    type: "Brother" | "Sister"
  ): Sibling[] => {
    if (!text) {
      return [];
    }

    if (
      text.trim() === "No Brothers" ||
      text.trim() === "No Sisters"
    ) {
      return [];
    }

    const parts = text
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    const result: Sibling[] = [];

    for (const part of parts) {
      const regex = new RegExp(
        `${type}\\s*\\d+\\s*:\\s*Name:\\s*(.*?),\\s*Age:\\s*(.*?),\\s*Marital Status:\\s*(.*?),\\s*Occupation:\\s*(.*)$`,
        "i"
      );

      const match = part.match(regex);

      if (match) {
        result.push({
          name: match[1]?.trim() || "",
          age: match[2]?.trim() || "",
          marital_status:
            match[3]?.trim() || "",
          occupation:
            match[4]?.trim() || "",
        });
      }
    }

    return result;
  };

  /* =======================================================
     FORMAT SIBLINGS
  ======================================================= */

  const formatSiblings = (
    list: Sibling[],
    type: "Brother" | "Sister"
  ) => {
    if (list.length === 0) {
      return type === "Brother"
        ? "No Brothers"
        : "No Sisters";
    }

    return list
      .map(
        (item, index) =>
          `${type} ${index + 1}: Name: ${
            item.name
          }, Age: ${
            item.age
          }, Marital Status: ${
            item.marital_status
          }, Occupation: ${
            item.occupation
          }`
      )
      .join(" | ");
  };

  /* =======================================================
     FETCH MEMBER
  ======================================================= */

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${BACKEND_URL}/matrimonial-users/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result =
          await response.json();

        console.log(
          "EDIT MEMBER API RESPONSE:",
          result
        );

        if (!response.ok) {
          throw new Error(
            Array.isArray(result?.message)
              ? result.message.join(", ")
              : result?.message ||
                  "Failed to fetch member"
          );
        }

        const member =
          result?.data ?? result;

        if (!member) {
          throw new Error(
            "Member data not found"
          );
        }

        /* =========================================
           DEBUG
        ========================================= */

        console.log(
          "FATHER OCCUPATION:",
          member.father_occupation,
          member.fatherOccupation
        );

        console.log(
          "MOTHER OCCUPATION:",
          member.mother_occupation,
          member.motherOccupation
        );

        console.log(
          "PHOTO:",
          member.photo
        );

        /* =========================================
           SIBLINGS
        ========================================= */

        const parsedBrothers =
          parseSiblings(
            member.brother_details ??
              member.brotherDetails ??
              "",
            "Brother"
          );

        const parsedSisters =
          parseSiblings(
            member.sister_details ??
              member.sisterDetails ??
              "",
            "Sister"
          );

        setBrothers(parsedBrothers);
        setSisters(parsedSisters);

        /* =========================================
           PHOTO
        ========================================= */

        const photo =
          member.photo ?? "";

        /* =========================================
           PROFILE
        ========================================= */

        setProfile({
          member_id: String(
            member.member_id ??
              member.memberId ??
              member.id ??
              ""
          ),

          profile_category:
            member.profile_category ??
            member.profileCategory ??
            "Professional",

          father_name:
            member.father_name ??
            member.fatherName ??
            "",

          mother_name:
            member.mother_name ??
            member.motherName ??
            "",

          father_gotram:
            member.father_gotram ??
            member.fatherGotram ??
            member.gotram ??
            "",

          mother_gotram:
            member.mother_gotram ??
            member.motherGotram ??
            "",

          grandmother_gotram:
            member.grandmother_gotram ??
            member.grandmotherGotram ??
            "",

          nakshatram:
            member.nakshatram ?? "",

          padham:
            member.padham != null
              ? String(member.padham)
              : "",

          rasi:
            member.rasi ?? "",

          color:
            member.color ?? "",

          height:
            member.height != null
              ? String(member.height)
              : "",

          education:
            member.education ?? "",

          annual_income:
            member.annual_income != null
              ? String(member.annual_income)
              : "",

          address:
            member.address ?? "",

          /* =====================================
             IMPORTANT OCCUPATION FIX
          ===================================== */

          father_occupation:
            member.father_occupation ??
            member.fatherOccupation ??
            "",

          mother_occupation:
            member.mother_occupation ??
            member.motherOccupation ??
            "",

          property_details:
            member.property_details ??
            member.propertyDetails ??
            "",

          preferred_requirements:
            member.preferred_requirements ??
            member.preferredRequirements ??
            "",

          /* =====================================
             AREA VOLUNTEER
          ===================================== */

          area_volunteer_name:
            member.preference_name ??
            member.area_volunteer_name ??
            "",

          area_volunteer_contact:
            member.preference_phone ??
            member.area_volunteer_contact ??
            "",

          area_volunteer_position:
            member.preference_area ??
            member.area_volunteer_position ??
            "",

          /* =====================================
             CONTACT
          ===================================== */

          mobile:
            member.mobile ?? "",

          email:
            member.email ?? "",

          /* =====================================
             CONSENT
          ===================================== */

          consent:
            member.consent === true ||
            member.consent === "true" ||
            member.consent === 1 ||
            member.consent === "1",

          /* =====================================
             PHOTO
          ===================================== */

          photo,
        });

        if (photo) {
          setPhotoPreview(
            getPhotoUrl(photo)
          );
        } else {
          setPhotoPreview(
            "/images/default-profile.jpg"
          );
        }
      } catch (err) {
        console.error(
          "Fetch matrimonial member error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load member"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  /* =======================================================
     CHANGE
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     CONSENT
  ======================================================= */

  const handleConsentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile((prev) => ({
      ...prev,
      consent: e.target.checked,
    }));
  };

  /* =======================================================
     PHOTO CHANGE
  ======================================================= */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] || null;

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Please select an image smaller than 5MB."
      );

      e.target.value = "";
      return;
    }

    setSelectedPhoto(file);

    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /* =======================================================
     BROTHER COUNT
  ======================================================= */

  const handleBrotherCount = (
    count: number
  ) => {
    setBrothers((previous) => {
      if (count === 0) {
        return [];
      }

      if (count > previous.length) {
        return [
          ...previous,
          ...Array.from(
            {
              length:
                count -
                previous.length,
            },
            () => createEmptySibling()
          ),
        ];
      }

      return previous.slice(0, count);
    });
  };

  /* =======================================================
     SISTER COUNT
  ======================================================= */

  const handleSisterCount = (
    count: number
  ) => {
    setSisters((previous) => {
      if (count === 0) {
        return [];
      }

      if (count > previous.length) {
        return [
          ...previous,
          ...Array.from(
            {
              length:
                count -
                previous.length,
            },
            () => createEmptySibling()
          ),
        ];
      }

      return previous.slice(0, count);
    });
  };

  /* =======================================================
     BROTHER CHANGE
  ======================================================= */

  const handleBrotherChange = (
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    setBrothers((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  /* =======================================================
     SISTER CHANGE
  ======================================================= */

  const handleSisterChange = (
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    setSisters((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (saving) return;

    /* =========================================
       VALIDATION
    ========================================= */

    if (!profile.profile_category) {
      alert(
        "Please select Profile Category."
      );
      return;
    }

    if (!profile.father_name.trim()) {
      alert(
        "Please enter Father's Name."
      );
      return;
    }

    if (!profile.mother_name.trim()) {
      alert(
        "Please enter Mother's Name."
      );
      return;
    }

    if (!profile.mobile.trim()) {
      alert(
        "Mobile number is missing."
      );
      return;
    }

    /* =========================================
       BROTHER VALIDATION
    ========================================= */

    for (
      let i = 0;
      i < brothers.length;
      i++
    ) {
      const brother =
        brothers[i];

      if (
        !brother.name.trim() ||
        !brother.age.trim() ||
        !brother.marital_status.trim() ||
        !brother.occupation.trim()
      ) {
        alert(
          `Please complete Brother ${
            i + 1
          } details.`
        );

        return;
      }
    }

    /* =========================================
       SISTER VALIDATION
    ========================================= */

    for (
      let i = 0;
      i < sisters.length;
      i++
    ) {
      const sister =
        sisters[i];

      if (
        !sister.name.trim() ||
        !sister.age.trim() ||
        !sister.marital_status.trim() ||
        !sister.occupation.trim()
      ) {
        alert(
          `Please complete Sister ${
            i + 1
          } details.`
        );

        return;
      }
    }

    /* =========================================
       CONSENT
    ========================================= */

    if (!profile.consent) {
      alert(
        "Please confirm the consent before saving."
      );

      return;
    }

    setSaving(true);

    try {
      const formData =
        new FormData();

      /* =========================================
         MEMBERSHIP
      ========================================= */

      formData.append(
        "member_id",
        profile.member_id
      );

      formData.append(
        "mobile",
        profile.mobile.trim()
      );

      formData.append(
        "email",
        profile.email.trim()
      );

      /* =========================================
         PERSONAL
      ========================================= */

      formData.append(
        "profile_category",
        profile.profile_category
      );

      formData.append(
        "father_name",
        profile.father_name
      );

      formData.append(
        "mother_name",
        profile.mother_name
      );

      formData.append(
        "father_gotram",
        profile.father_gotram
      );

      formData.append(
        "mother_gotram",
        profile.mother_gotram
      );

      formData.append(
        "grandmother_gotram",
        profile.grandmother_gotram
      );

      formData.append(
        "nakshatram",
        profile.nakshatram
      );

      formData.append(
        "padham",
        profile.padham
      );

      formData.append(
        "rasi",
        profile.rasi
      );

      formData.append(
        "color",
        profile.color
      );

      formData.append(
        "height",
        profile.height
      );

      /* =========================================
         EDUCATION
      ========================================= */

      formData.append(
        "education",
        profile.education
      );

      formData.append(
        "annual_income",
        profile.annual_income
      );

      /* =========================================
         ADDRESS
      ========================================= */

      formData.append(
        "address",
        profile.address
      );

      /* =========================================
         FAMILY
      ========================================= */

      formData.append(
        "father_occupation",
        profile.father_occupation
      );

      formData.append(
        "mother_occupation",
        profile.mother_occupation
      );

      formData.append(
        "brother_details",
        formatSiblings(
          brothers,
          "Brother"
        )
      );

      formData.append(
        "sister_details",
        formatSiblings(
          sisters,
          "Sister"
        )
      );

      formData.append(
        "property_details",
        profile.property_details
      );

      /* =========================================
         PREFERRED
      ========================================= */

      formData.append(
        "preferred_requirements",
        profile.preferred_requirements
      );

      /* =========================================
         AREA VOLUNTEER
      ========================================= */

      formData.append(
        "area_volunteer_name",
        profile.area_volunteer_name
      );

      formData.append(
        "area_volunteer_contact",
        profile.area_volunteer_contact
      );

      formData.append(
        "area_volunteer_position",
        profile.area_volunteer_position
      );

      /* =========================================
         BACKEND ALIASES
      ========================================= */

      formData.append(
        "preference_name",
        profile.area_volunteer_name
      );

      formData.append(
        "preference_phone",
        profile.area_volunteer_contact
      );

      formData.append(
        "preference_area",
        profile.area_volunteer_position
      );

      /* =========================================
         CONSENT
      ========================================= */

      formData.append(
        "consent",
        profile.consent
          ? "true"
          : "false"
      );

      /* =========================================
         PHOTO
      ========================================= */

      if (selectedPhoto) {
        formData.append(
          "photo",
          selectedPhoto
        );
      }

      /* =========================================
         DEBUG FORM DATA
      ========================================= */

      console.log(
        "========== UPDATE DATA =========="
      );

      console.log(
        "ID:",
        id
      );

      console.log(
        "Member ID:",
        profile.member_id
      );

      console.log(
        "Father Occupation:",
        profile.father_occupation
      );

      console.log(
        "Mother Occupation:",
        profile.mother_occupation
      );

      console.log(
        "Brothers:",
        brothers
      );

      console.log(
        "Sisters:",
        sisters
      );

      console.log(
        "New Photo:",
        selectedPhoto?.name
      );

      console.log(
        "================================="
      );

      /* =========================================
         PUT REQUEST
      ========================================= */

      const response = await fetch(
        `${BACKEND_URL}/matrimonial-users/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const result =
        await response.json();

      console.log(
        "UPDATE RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          Array.isArray(result?.message)
            ? result.message.join(", ")
            : result?.message ||
                "Failed to update member"
        );
      }

      showToast(
        "Matrimonial profile updated successfully."
      );

      setTimeout(() => {
        router.push(
          "/admin/matrimony"
        );

        router.refresh();
      }, 1200);
    } catch (err) {
      console.error(
        "Update matrimonial member error:",
        err
      );

      alert(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef] flex items-center justify-center px-4">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-pink-200 border-t-[#8B1E3F] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading member data...
          </p>

        </div>

      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">

        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-red-200 p-8 text-center shadow-lg">

          <div className="mx-auto w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center">

            <FaTimes className="text-2xl" />

          </div>

          <h2 className="text-xl font-bold text-red-600 mt-4">
            Failed to load member
          </h2>

          <p className="text-sm text-gray-600 mt-3">
            {error}
          </p>

          <p className="text-xs text-gray-400 mt-3 break-all">
            API:{" "}
            {BACKEND_URL}/matrimonial-users/
            {id}
          </p>

          <Link
            href="/admin/matrimony"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold hover:bg-[#721832]"
          >
            <FaArrowLeft />
            Back to Members
          </Link>

        </div>

      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffdfd] via-[#fff7f8] to-[#fdecef]">

      {/* =================================================
          TOAST
      ================================================= */}

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

              </div>

              <button
                type="button"
                onClick={() =>
                  setToast({
                    show: false,
                    message: "",
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

      {/* =================================================
          MAIN
      ================================================= */}

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
                Edit Matrimonial Member
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update matrimonial biodata and profile details.
              </p>

            </div>

          </div>

          <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-[#8B1E3F]">
            Member ID:{" "}
            {profile.member_id || id}
          </div>

        </div>

        {/* =================================================
            CARD
        ================================================= */}

        <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-xl">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <SectionTitle
            title="Personal Information"
            description="Update matrimonial biodata and basic details."
          />

          <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

            <FormSelect
              label="Profile Category"
              name="profile_category"
              value={profile.profile_category}
              onChange={handleChange}
              options={profileCategoryList}
            />

            <FormInput
              label="Father's Name"
              name="father_name"
              value={profile.father_name}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Mother's Name"
              name="mother_name"
              value={profile.mother_name}
              onChange={handleChange}
              required
            />

            <GotramSelect
              label="Father Gotram"
              name="father_gotram"
              value={profile.father_gotram}
              onChange={handleChange}
            />

            <GotramSelect
              label="Mother Gotram"
              name="mother_gotram"
              value={profile.mother_gotram}
              onChange={handleChange}
            />

            <GotramSelect
              label="Grandmother Gotram"
              name="grandmother_gotram"
              value={profile.grandmother_gotram}
              onChange={handleChange}
            />

            <FormSelect
              label="Nakshatram"
              name="nakshatram"
              value={profile.nakshatram}
              onChange={handleChange}
              options={nakshatramList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormSelect
              label="Nakshatram Padham"
              name="padham"
              value={profile.padham}
              onChange={handleChange}
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
              value={profile.rasi}
              onChange={handleChange}
              options={rasiList}
            />

            <FormSelect
              label="Color"
              name="color"
              value={profile.color}
              onChange={handleChange}
              options={colorList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormInput
              label="Height"
              name="height"
              value={profile.height}
              onChange={handleChange}
              placeholder="Example: 5.6"
            />

          </div>

          {/* =================================================
              EDUCATION
          ================================================= */}

          <SectionTitle
            title="Education & Career"
            description="Update education and annual income details."
          />

          <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

            <FormSelect
              label="Education"
              name="education"
              value={profile.education}
              onChange={handleChange}
              options={educationList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormInput
              label="Salary / Annual Income"
              name="annual_income"
              value={profile.annual_income}
              onChange={handleChange}
              placeholder="Example: ₹6,00,000"
            />

          </div>

          {/* =================================================
              ADDRESS
          ================================================= */}

          <SectionTitle
            title="Address"
            description="Update current residential address."
          />

          <div className="p-6">

            <FormTextarea
              label="Address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              rows={4}
            />

          </div>

          {/* =================================================
              FAMILY
          ================================================= */}

          <SectionTitle
            title="Family Information"
            description="Update parents, siblings and property details."
          />

          <div className="grid gap-6 p-6 md:grid-cols-2">

            {/* FATHER OCCUPATION */}

            <FormSelect
              label="Father Occupation"
              name="father_occupation"
              value={profile.father_occupation}
              onChange={handleChange}
              options={parentOccupationList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            {/* MOTHER OCCUPATION */}

            <FormSelect
              label="Mother Occupation"
              name="mother_occupation"
              value={profile.mother_occupation}
              onChange={handleChange}
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

          </div>

          {/* =================================================
              BROTHERS
          ================================================= */}

          <div className="px-6 pb-6">

            <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-5">

              <div className="flex items-center gap-2">

                <FaUsers className="text-[#8B1E3F]" />

                <h3 className="font-bold text-[#8B1E3F]">
                  Brother Details
                </h3>

              </div>

              <div className="mt-4 max-w-xs">

                <label className={labelClass}>
                  Number of Brothers
                </label>

                <select
                  value={brothers.length}
                  onChange={(e) =>
                    handleBrotherCount(
                      Number(e.target.value)
                    )
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

              </div>

              {brothers.map(
                (brother, index) => (
                  <div
                    key={index}
                    className="mt-5 rounded-2xl border border-pink-200 bg-white p-5"
                  >

                    <h4 className="font-semibold text-gray-800">
                      Brother {index + 1}
                    </h4>

                    <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                      <FormInput
                        label="Name"
                        name={`brother_name_${index}`}
                        value={brother.name}
                        onChange={(e) =>
                          handleBrotherChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />

                      <FormInput
                        label="Age"
                        name={`brother_age_${index}`}
                        value={brother.age}
                        onChange={(e) =>
                          handleBrotherChange(
                            index,
                            "age",
                            e.target.value
                          )
                        }
                        required
                      />

                      <FormSelect
                        label="Marital Status"
                        name={`brother_status_${index}`}
                        value={
                          brother.marital_status
                        }
                        onChange={(e) =>
                          handleBrotherChange(
                            index,
                            "marital_status",
                            e.target.value
                          )
                        }
                        options={[
                          {
                            value: "Married",
                            label: "Married",
                          },
                          {
                            value: "Unmarried",
                            label: "Unmarried",
                          },
                          {
                            value: "Divorced",
                            label: "Divorced",
                          },
                          {
                            value: "Widowed",
                            label: "Widowed",
                          },
                        ]}
                      />

                      <FormInput
                        label="Occupation"
                        name={`brother_occupation_${index}`}
                        value={
                          brother.occupation
                        }
                        onChange={(e) =>
                          handleBrotherChange(
                            index,
                            "occupation",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              SISTERS
          ================================================= */}

          <div className="px-6 pb-6">

            <div className="rounded-2xl border border-pink-100 bg-pink-50/30 p-5">

              <div className="flex items-center gap-2">

                <FaUsers className="text-[#8B1E3F]" />

                <h3 className="font-bold text-[#8B1E3F]">
                  Sister Details
                </h3>

              </div>

              <div className="mt-4 max-w-xs">

                <label className={labelClass}>
                  Number of Sisters
                </label>

                <select
                  value={sisters.length}
                  onChange={(e) =>
                    handleSisterCount(
                      Number(e.target.value)
                    )
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

              </div>

              {sisters.map(
                (sister, index) => (
                  <div
                    key={index}
                    className="mt-5 rounded-2xl border border-pink-200 bg-white p-5"
                  >

                    <h4 className="font-semibold text-gray-800">
                      Sister {index + 1}
                    </h4>

                    <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                      <FormInput
                        label="Name"
                        name={`sister_name_${index}`}
                        value={sister.name}
                        onChange={(e) =>
                          handleSisterChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        required
                      />

                      <FormInput
                        label="Age"
                        name={`sister_age_${index}`}
                        value={sister.age}
                        onChange={(e) =>
                          handleSisterChange(
                            index,
                            "age",
                            e.target.value
                          )
                        }
                        required
                      />

                      <FormSelect
                        label="Marital Status"
                        name={`sister_status_${index}`}
                        value={
                          sister.marital_status
                        }
                        onChange={(e) =>
                          handleSisterChange(
                            index,
                            "marital_status",
                            e.target.value
                          )
                        }
                        options={[
                          {
                            value: "Married",
                            label: "Married",
                          },
                          {
                            value: "Unmarried",
                            label: "Unmarried",
                          },
                          {
                            value: "Divorced",
                            label: "Divorced",
                          },
                          {
                            value: "Widowed",
                            label: "Widowed",
                          },
                        ]}
                      />

                      <FormInput
                        label="Occupation"
                        name={`sister_occupation_${index}`}
                        value={
                          sister.occupation
                        }
                        onChange={(e) =>
                          handleSisterChange(
                            index,
                            "occupation",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =================================================
              PROPERTY
          ================================================= */}

          <div className="p-6">

            <FormTextarea
              label="Property Details"
              name="property_details"
              value={profile.property_details}
              onChange={handleChange}
              rows={4}
            />

          </div>

          {/* =================================================
              PREFERRED REQUIREMENTS
          ================================================= */}

          <SectionTitle
            title="Preferred Requirements"
            description="Update preferred partner requirements."
          />

          <div className="p-6">

            <FormTextarea
              label="Preferred Requirements"
              name="preferred_requirements"
              value={
                profile.preferred_requirements
              }
              onChange={handleChange}
              rows={5}
            />

          </div>

          {/* =================================================
              AREA VOLUNTEER
          ================================================= */}

          <SectionTitle
            title="Your Preference Details"
            description="Update area volunteer information."
          />

          <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">

            <FormInput
              label="Your Preference Name"
              name="area_volunteer_name"
              value={
                profile.area_volunteer_name
              }
              onChange={handleChange}
              placeholder="Enter volunteer name"
            />

            <FormInput
              label="Your Preference Contact"
              name="area_volunteer_contact"
              value={
                profile.area_volunteer_contact
              }
              onChange={handleChange}
              placeholder="Enter contact number"
            />

            <FormInput
              label="Your Preference Position"
              name="area_volunteer_position"
              value={
                profile.area_volunteer_position
              }
              onChange={handleChange}
              placeholder="Example: Your Preference"
            />

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}

          <SectionTitle
            title="Contact Information"
            description="Registered membership contact details."
          />

          <div className="grid gap-6 p-6 md:grid-cols-2">

            <FormInput
              label="Registered Mobile"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Registered Email"
              name="email"
              value={profile.email}
              type="email"
              onChange={handleChange}
            />

          </div>

          {/* =================================================
              PROFILE PHOTO
          ================================================= */}

          <SectionTitle
            title="Profile Photo"
            description="View or change the matrimonial profile photograph."
          />

          <div className="p-6">

            <div className="grid gap-6 md:grid-cols-[280px_1fr]">

              {/* PHOTO PREVIEW */}

              <div>

                <div className="relative h-[340px] overflow-hidden rounded-2xl border border-pink-200 bg-gray-100">

                  <img
                    src={
                      photoPreview ||
                      "/images/default-profile.jpg"
                    }
                    alt={
                      profile.member_id ||
                      "Matrimonial Profile"
                    }
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "/images/default-profile.jpg";
                    }}
                  />

                  <div className="absolute left-3 top-3">

                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-green-600 shadow">

                      <FaCheckCircle />

                      Profile Photo

                    </span>

                  </div>

                </div>

              </div>

              {/* PHOTO UPLOAD */}

              <div className="flex items-center">

                <div className="w-full rounded-2xl border-2 border-dashed border-pink-200 bg-pink-50/40 p-8 text-center">

                  <FaCamera className="mx-auto mb-4 text-4xl text-[#8B1E3F]" />

                  <h3 className="text-lg font-bold text-gray-800">
                    Change Profile Photo
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    JPG, JPEG or PNG up to 5MB
                  </p>

                  <label className="mt-6 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B1E3F] to-[#d81b60] px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-xl">

                    <FaUpload />

                    Choose New Photo

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={
                        handlePhotoChange
                      }
                      className="hidden"
                    />

                  </label>

                  {selectedPhoto && (
                    <div className="mx-auto mt-5 max-w-md rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-left">

                      <p className="text-xs font-semibold text-green-700">
                        New photo selected
                      </p>

                      <p className="mt-1 break-all text-xs text-green-600">
                        {selectedPhoto.name}
                      </p>

                    </div>
                  )}

                  {profile.photo &&
                    !selectedPhoto && (
                      <p className="mx-auto mt-5 max-w-lg break-all text-xs text-gray-500">
                        Current photo:{" "}
                        <span className="font-medium">
                          {profile.photo}
                        </span>
                      </p>
                    )}

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CONSENT
          ================================================= */}

          <SectionTitle
            title="Declaration & Consent"
            description="Confirm the matrimonial information provided."
          />

          <div className="p-6">

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-pink-200 bg-pink-50/40 p-5">

              <input
                type="checkbox"
                checked={profile.consent}
                onChange={
                  handleConsentChange
                }
                className="mt-1 h-5 w-5 accent-[#8B1E3F]"
              />

              <span className="text-sm leading-6 text-gray-700">

                I/We confirm that the information
                provided by me/us is true and
                correct, and I/we give my/our
                consent to use this information
                for the purpose of matrimonial
                and community services.

                <span className="ml-1 text-red-500">
                  *
                </span>

              </span>

            </label>

          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-6 sm:flex-row sm:justify-end">

            <Link
              href="/admin/matrimony"
              className="flex h-12 items-center justify-center rounded-xl border border-gray-200 px-7 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8B1E3F] to-[#d81b60] px-8 text-sm font-semibold text-white shadow-md hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              <FaSave />

              {saving
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

/* =========================================================
   GOTRAM SELECT
========================================================= */

function GotramSelect({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}) {
  const datalistId =
    `${name}-gotram-options`;

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
        placeholder="Select Gotram"
        autoComplete="off"
        className={inputClass}
      />

      <datalist id={datalistId}>

        {gotramList.map(
          (gotram) => (
            <option
              key={gotram}
              value={gotram}
            />
          )
        )}

      </datalist>

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