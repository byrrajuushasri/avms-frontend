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
  FaUser,
  FaHeart,
  FaGraduationCap,
  FaHome,
  FaUsers,
  FaCamera,
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
   TYPE
========================================================= */

type Profile = {
  memberId: string;

  profileCategory: string;

  fatherName: string;
  motherName: string;

  fatherGotram: string;
  motherGotram: string;
  grandmotherGotram: string;

  nakshatram: string;
  padham: string;
  rasi: string;
  color: string;
  height: string;

  education: string;
  annualIncome: string;

  address: string;

  fatherOccupation: string;
  motherOccupation: string;

  brotherDetails: string;
  sisterDetails: string;

  propertyDetails: string;

  preferredRequirements: string;

  mobile: string;
  email: string;

  photo: string;
};

/* =========================================================
   EMPTY PROFILE
========================================================= */

const emptyProfile: Profile = {
  memberId: "",

  profileCategory: "Professional",

  fatherName: "",
  motherName: "",

  fatherGotram: "",
  motherGotram: "",
  grandmotherGotram: "",

  nakshatram: "",
  padham: "",
  rasi: "",
  color: "",
  height: "",

  education: "",
  annualIncome: "",

  address: "",

  fatherOccupation: "",
  motherOccupation: "",

  brotherDetails: "",
  sisterDetails: "",

  propertyDetails: "",

  preferredRequirements: "",

  mobile: "",
  email: "",

  photo: "",
};

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
   PAGE
========================================================= */

export default function EditMatrimonialMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [profile, setProfile] =
    useState<Profile>(emptyProfile);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

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
     GET MEMBER
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

        const result = await response.json();

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

        /*
         * Some APIs return:
         * { data: {...} }
         * and some directly return {...}
         */
        const member =
          result?.data ?? result;

        if (!member) {
          throw new Error(
            "Member data not found"
          );
        }

        const photo =
          member.photo ?? "";

        setProfile({
          memberId: String(
            member.member_id ??
              member.id ??
              ""
          ),

          profileCategory:
            member.profile_category ??
            "Professional",

          fatherName:
            member.father_name ?? "",

          motherName:
            member.mother_name ?? "",

          fatherGotram:
            member.father_gotram ??
            member.gotram ??
            "",

          motherGotram:
            member.mother_gotram ?? "",

          grandmotherGotram:
            member.grandmother_gotram ?? "",

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

          annualIncome:
            member.annual_income != null
              ? String(member.annual_income)
              : "",

          address:
            member.address ?? "",

          fatherOccupation:
            member.father_occupation ?? "",

          motherOccupation:
            member.mother_occupation ?? "",

          brotherDetails:
            member.brother_details ?? "",

          sisterDetails:
            member.sister_details ?? "",

          propertyDetails:
            member.property_details ?? "",

          preferredRequirements:
            member.preferred_requirements ??
            "",

          mobile:
            member.mobile ?? "",

          email:
            member.email ?? "",

          photo,
        });

        if (photo) {
          setPhotoPreview(
            getPhotoUrl(photo)
          );
        }
      } catch (error) {
        console.error(
          "Fetch matrimonial member error:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
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
     PHOTO CHANGE
  ======================================================= */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0] || null;

    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Please select an image smaller than 5MB."
      );

      e.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file."
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
     SAVE
  ======================================================= */

  const handleSave = async () => {
    if (saving) return;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (!profile.profileCategory) {
      alert(
        "Please select Profile Category."
      );
      return;
    }

    if (!profile.fatherName.trim()) {
      alert(
        "Please enter Father's Name."
      );
      return;
    }

    if (!profile.motherName.trim()) {
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

    setSaving(true);

    try {
      const formData = new FormData();

      /* ===================================================
         MEMBERSHIP / CONTACT
      =================================================== */

      formData.append(
        "member_id",
        profile.memberId
      );

      formData.append(
        "mobile",
        profile.mobile.trim()
      );

      formData.append(
        "email",
        profile.email.trim()
      );

      /* ===================================================
         PERSONAL INFORMATION
      =================================================== */

      formData.append(
        "profile_category",
        profile.profileCategory
      );

      formData.append(
        "father_name",
        profile.fatherName
      );

      formData.append(
        "mother_name",
        profile.motherName
      );

      formData.append(
        "father_gotram",
        profile.fatherGotram
      );

      formData.append(
        "mother_gotram",
        profile.motherGotram
      );

      formData.append(
        "grandmother_gotram",
        profile.grandmotherGotram
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

      /* ===================================================
         EDUCATION
      =================================================== */

      formData.append(
        "education",
        profile.education
      );

      formData.append(
        "annual_income",
        profile.annualIncome
      );

      /* ===================================================
         ADDRESS
      =================================================== */

      formData.append(
        "address",
        profile.address
      );

      /* ===================================================
         FAMILY
      =================================================== */

      formData.append(
        "father_occupation",
        profile.fatherOccupation
      );

      formData.append(
        "mother_occupation",
        profile.motherOccupation
      );

      formData.append(
        "brother_details",
        profile.brotherDetails
      );

      formData.append(
        "sister_details",
        profile.sisterDetails
      );

      formData.append(
        "property_details",
        profile.propertyDetails
      );

      /* ===================================================
         PREFERRED
      =================================================== */

      formData.append(
        "preferred_requirements",
        profile.preferredRequirements
      );

      /* ===================================================
         PHOTO
      =================================================== */

      if (selectedPhoto) {
        formData.append(
          "photo",
          selectedPhoto
        );
      }

      console.log(
        "UPDATING MATRIMONIAL MEMBER:",
        {
          id,
          memberId: profile.memberId,
        }
      );

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
        "UPDATE MEMBER RESPONSE:",
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
    } catch (error) {
      console.error(
        "Update matrimonial member error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
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
            API: {BACKEND_URL}/matrimonial-users/
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
                Edit Matrimonial Member
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update matrimonial biodata and profile details.
              </p>

            </div>

          </div>

          <div className="rounded-full bg-pink-50 px-4 py-2 text-sm font-bold text-[#8B1E3F]">
            Member ID: {profile.memberId || id}
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
              name="profileCategory"
              value={profile.profileCategory}
              onChange={handleChange}
              options={profileCategoryList}
            />

            <FormInput
              label="Father's Name"
              name="fatherName"
              value={profile.fatherName}
              onChange={handleChange}
              required
            />

            <FormInput
              label="Mother's Name"
              name="motherName"
              value={profile.motherName}
              onChange={handleChange}
              required
            />

            <FormSelect
              label="Father Gotram"
              name="fatherGotram"
              value={profile.fatherGotram}
              onChange={handleChange}
              options={gotramList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormSelect
              label="Mother Gotram"
              name="motherGotram"
              value={profile.motherGotram}
              onChange={handleChange}
              options={gotramList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormSelect
              label="Grand Mother Gotram"
              name="grandmotherGotram"
              value={profile.grandmotherGotram}
              onChange={handleChange}
              options={gotramList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
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
              name="annualIncome"
              value={profile.annualIncome}
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

            <FormSelect
              label="Father Details"
              name="fatherOccupation"
              value={profile.fatherOccupation}
              onChange={handleChange}
              options={parentOccupationList.map(
                (item) => ({
                  value: item,
                  label: item,
                })
              )}
            />

            <FormSelect
              label="Mother Details"
              name="motherOccupation"
              value={profile.motherOccupation}
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

            <FormSelect
              label="Brother Details"
              name="brotherDetails"
              value={profile.brotherDetails}
              onChange={handleChange}
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
              name="sisterDetails"
              value={profile.sisterDetails}
              onChange={handleChange}
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

            <div className="md:col-span-2">

              <FormTextarea
                label="Property Details"
                name="propertyDetails"
                value={profile.propertyDetails}
                onChange={handleChange}
                rows={4}
              />

            </div>

          </div>

          {/* =================================================
              PREFERRED
          ================================================= */}

          <SectionTitle
            title="Preferred Requirements"
            description="Update preferred partner requirements."
          />

          <div className="p-6">

            <FormTextarea
              label="Preferred Requirements"
              name="preferredRequirements"
              value={profile.preferredRequirements}
              onChange={handleChange}
              rows={5}
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
              PHOTO
          ================================================= */}

          <SectionTitle
            title="Profile Photo"
            description="Change the matrimonial profile photograph."
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
                      profile.memberId ||
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

