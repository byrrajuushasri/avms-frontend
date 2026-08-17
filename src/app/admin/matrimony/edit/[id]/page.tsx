"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  FaArrowLeft,
  FaSave,
  FaUser,
  FaPhone,
  FaGraduationCap,
  FaUsers,
  FaHome,
  FaHeart,
  FaCamera,
  FaImage,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

const API_URL = "http://localhost:5000";

type Profile = {
  memberId: string;
  profileCategory: string;

  surname: string;
  name: string;
  fatherName: string;
  motherName: string;

  gotram: string;
  nakshatram: string;
  padham: string;
  rasi: string;

  dateOfBirth: string;
  color: string;
  height: string;

  email: string;
  mobile: string;

  education: string;
  occupation: string;
  salary: string;

  address: string;

  familyDetails: string;
  brotherDetails: string;
  sisterDetails: string;
  propertyDetails: string;

  preferredRequirements: string;

  status: string;
  membership: string;

  photo: string;
};

const emptyProfile: Profile = {
  memberId: "",
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

  status: "",
  membership: "",

  photo: "",
};

export default function EditMatrimonialMemberPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [profile, setProfile] =
    useState<Profile>(emptyProfile);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // PHOTO
  const [selectedPhoto, setSelectedPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState("");

  // =====================================================
  // PHOTO URL
  // =====================================================

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

    return `${API_URL}/uploads/matrimonial/${photo}`;
  };

  // =====================================================
  // GET MEMBER
  // =====================================================

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/matrimonial-users/${id}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result = await response.json();

        console.log("Member API response:", result);

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to fetch member",
          );
        }

        if (!result) {
          throw new Error(
            "Member data not found",
          );
        }

        const photo =
          result.photo ?? "";

        setProfile({
          memberId: String(
            result.member_id ??
              result.id ??
              "",
          ),

          profileCategory:
            result.profile_category ?? "",

          surname:
            result.surname ?? "",

          name:
            result.name ?? "",

          fatherName:
            result.father_name ?? "",

          motherName:
            result.mother_name ?? "",

          gotram:
            result.gotram ?? "",

          nakshatram:
            result.nakshatram ?? "",

          padham:
            result.padham != null
              ? String(result.padham)
              : "",

          rasi:
            result.rasi ?? "",

          dateOfBirth:
            result.date_of_birth
              ? String(
                  result.date_of_birth,
                ).substring(0, 10)
              : "",

          color:
            result.color ?? "",

          height:
            result.height ?? "",

          email:
            result.email ?? "",

          mobile:
            result.mobile ?? "",

          education:
            result.education ?? "",

          occupation:
            result.occupation ?? "",

          salary:
            result.annual_income ?? "",

          address:
            result.address ?? "",

          familyDetails:
            result.family_details ?? "",

          brotherDetails:
            result.brother_details ?? "",

          sisterDetails:
            result.sister_details ?? "",

          propertyDetails:
            result.property_details ?? "",

          preferredRequirements:
            result.preferred_requirements ?? "",

          status:
            result.status ?? "Pending",

          membership:
            result.membership ?? "Free",

          photo,
        });

        // Existing photo preview
        if (photo) {
          setPhotoPreview(
            getPhotoUrl(photo),
          );
        }
      } catch (error) {
        console.error(
          "Fetch member error:",
          error,
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load member",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PHOTO CHANGE
  // =====================================================

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // File size check - 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Please select an image smaller than 5MB.",
      );

      e.target.value = "";
      return;
    }

    // Image type check
    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image file.",
      );

      e.target.value = "";
      return;
    }

    setSelectedPhoto(file);

    // Preview
    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSave = async () => {
    try {
      if (!profile.name.trim()) {
        alert("Please enter name.");
        return;
      }

      if (!profile.mobile.trim()) {
        alert("Please enter mobile number.");
        return;
      }

      setSaving(true);

      /*
       * IMPORTANT:
       * Do NOT use JSON.stringify here.
       * We are sending multipart/form-data.
       */

      const formData = new FormData();

      formData.append(
        "profile_category",
        profile.profileCategory,
      );

      formData.append(
        "surname",
        profile.surname,
      );

      formData.append(
        "name",
        profile.name,
      );

      formData.append(
        "father_name",
        profile.fatherName,
      );

      formData.append(
        "mother_name",
        profile.motherName,
      );

      formData.append(
        "gotram",
        profile.gotram,
      );

      formData.append(
        "nakshatram",
        profile.nakshatram,
      );

      formData.append(
        "padham",
        profile.padham || "",
      );

      formData.append(
        "rasi",
        profile.rasi,
      );

      formData.append(
        "date_of_birth",
        profile.dateOfBirth || "",
      );

      formData.append(
        "color",
        profile.color,
      );

      formData.append(
        "height",
        profile.height,
      );

      formData.append(
        "email",
        profile.email,
      );

      formData.append(
        "mobile",
        profile.mobile,
      );

      formData.append(
        "education",
        profile.education,
      );

      formData.append(
        "occupation",
        profile.occupation,
      );

      formData.append(
        "annual_income",
        profile.salary,
      );

      formData.append(
        "address",
        profile.address,
      );

      formData.append(
        "family_details",
        profile.familyDetails,
      );

      formData.append(
        "brother_details",
        profile.brotherDetails,
      );

      formData.append(
        "sister_details",
        profile.sisterDetails,
      );

      formData.append(
        "property_details",
        profile.propertyDetails,
      );

      formData.append(
        "preferred_requirements",
        profile.preferredRequirements,
      );

      formData.append(
        "status",
        profile.status || "Pending",
      );

      formData.append(
        "membership",
        profile.membership || "Free",
      );

      // NEW PHOTO
      if (selectedPhoto) {
        formData.append(
          "photo",
          selectedPhoto,
        );
      }

      console.log(
        "Updating matrimonial member...",
      );

      const response = await fetch(
        `${API_URL}/matrimonial-users/${id}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const result =
        await response.json();

      console.log(
        "Update response:",
        result,
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update member",
        );
      }

      alert(
        "Matrimonial member updated successfully!",
      );

      router.push(
        "/admin/matrimony",
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Update error:",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-[#8B1E3F] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-gray-500">
            Loading member data...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-red-200 p-6 md:p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Failed to load member
          </h2>

          <p className="text-sm text-gray-600 mt-3">
            {error}
          </p>

          <p className="text-xs text-gray-400 mt-3 break-all">
            API: {API_URL}/matrimonial-users/
            {id}
          </p>

          <Link
            href="/admin/matrimony"
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold"
          >
            <FaArrowLeft />
            Back to Members
          </Link>
        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

          <div className="flex items-center gap-3">

            <Link
              href="/admin/matrimony"
              className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"
            >
              <FaArrowLeft />
            </Link>

            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Edit Matrimonial Member
              </h1>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Member ID:{" "}
                <span className="font-semibold text-[#8B1E3F]">
                  {profile.memberId || id}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">

            {profile.status && (
              <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold">
                {profile.status}
              </span>
            )}

            {profile.membership && (
              <span className="px-4 py-2 rounded-full bg-pink-50 text-[#8B1E3F] text-xs font-semibold">
                {profile.membership}
              </span>
            )}

          </div>
        </div>

        {/* =================================================
            PHOTO SECTION
        ================================================= */}

        <Section
          icon={<FaCamera />}
          title="Profile Photo"
        >

          <div className="flex flex-col md:flex-row gap-8 items-start">

            {/* PHOTO PREVIEW */}

            <div className="w-full md:w-64">

              <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">

                <img
                  src={
                    photoPreview ||
                    "/images/default-profile.jpg"
                  }
                  alt={
                    profile.name ||
                    "Profile"
                  }
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/default-profile.jpg";
                  }}
                />

                {/* PHOTO LABEL */}

                <div className="absolute left-3 top-3">

                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-green-600 shadow">
                    <FaCheckCircle />
                    Profile Photo
                  </span>

                </div>

              </div>

            </div>

            {/* PHOTO CONTROLS */}

            <div className="flex-1 w-full">

              <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 sm:p-6">

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-11 h-11 rounded-xl bg-pink-50 text-[#8B1E3F] flex items-center justify-center">
                    <FaImage />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gray-800">
                      Change Profile Photo
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      JPG, JPEG or PNG up to 5MB
                    </p>
                  </div>

                </div>

                <label className="cursor-pointer inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold hover:bg-[#721832] transition">

                  <FaCamera />

                  Choose New Photo

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={
                      handlePhotoChange
                    }
                    className="hidden"
                  />

                </label>

                {selectedPhoto && (
                  <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200">

                    <p className="text-xs font-semibold text-green-700">
                      New photo selected
                    </p>

                    <p className="text-xs text-green-600 mt-1 break-all">
                      {selectedPhoto.name}
                    </p>

                  </div>
                )}

                {profile.photo &&
                  !selectedPhoto && (
                    <p className="mt-4 text-xs text-gray-500 break-all">
                      Current photo:{" "}
                      <span className="font-medium">
                        {profile.photo}
                      </span>
                    </p>
                  )}

              </div>

            </div>

          </div>

        </Section>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <Section
          icon={<FaUser />}
          title="Personal Information"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <InputField
              label="Profile Category"
              name="profileCategory"
              value={
                profile.profileCategory
              }
              onChange={handleChange}
            />

            <InputField
              label="Surname"
              name="surname"
              value={profile.surname}
              onChange={handleChange}
            />

            <InputField
              label="Name"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

            <InputField
              label="Father Name"
              name="fatherName"
              value={
                profile.fatherName
              }
              onChange={handleChange}
            />

            <InputField
              label="Mother Name"
              name="motherName"
              value={
                profile.motherName
              }
              onChange={handleChange}
            />

            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              value={
                profile.dateOfBirth
              }
              type="date"
              onChange={handleChange}
            />

            <InputField
              label="Color"
              name="color"
              value={profile.color}
              onChange={handleChange}
            />

            <InputField
              label="Height"
              name="height"
              value={profile.height}
              onChange={handleChange}
            />

          </div>

        </Section>

        {/* =================================================
            HOROSCOPE
        ================================================= */}

        <Section
          icon={<FaHeart />}
          title="Horoscope Details"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <InputField
              label="Gotram"
              name="gotram"
              value={profile.gotram}
              onChange={handleChange}
            />

            <InputField
              label="Nakshatram"
              name="nakshatram"
              value={
                profile.nakshatram
              }
              onChange={handleChange}
            />

            <InputField
              label="Padham"
              name="padham"
              value={profile.padham}
              type="number"
              onChange={handleChange}
            />

            <InputField
              label="Rasi"
              name="rasi"
              value={profile.rasi}
              onChange={handleChange}
            />

          </div>

        </Section>

        {/* =================================================
            CONTACT
        ================================================= */}

        <Section
          icon={<FaPhone />}
          title="Contact Information"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <InputField
              label="Email ID"
              name="email"
              value={profile.email}
              type="email"
              onChange={handleChange}
            />

            <InputField
              label="Mobile Number"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
            />

            <div className="md:col-span-2">

              <TextAreaField
                label="Address"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />

            </div>

          </div>

        </Section>

        {/* =================================================
            EDUCATION
        ================================================= */}

        <Section
          icon={<FaGraduationCap />}
          title="Education & Career"
        >

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <InputField
              label="Education"
              name="education"
              value={
                profile.education
              }
              onChange={handleChange}
            />

            <InputField
              label="Occupation"
              name="occupation"
              value={
                profile.occupation
              }
              onChange={handleChange}
            />

            <InputField
              label="Salary / Income"
              name="salary"
              value={profile.salary}
              onChange={handleChange}
            />

          </div>

        </Section>

        {/* =================================================
            FAMILY
        ================================================= */}

        <Section
          icon={<FaUsers />}
          title="Family Information"
        >

          <div className="space-y-5">

            <TextAreaField
              label="Family Details"
              name="familyDetails"
              value={
                profile.familyDetails
              }
              onChange={handleChange}
            />

            <TextAreaField
              label="Brother Details"
              name="brotherDetails"
              value={
                profile.brotherDetails
              }
              onChange={handleChange}
            />

            <TextAreaField
              label="Sister Details"
              name="sisterDetails"
              value={
                profile.sisterDetails
              }
              onChange={handleChange}
            />

            <TextAreaField
              label="Property Details"
              name="propertyDetails"
              value={
                profile.propertyDetails
              }
              onChange={handleChange}
            />

          </div>

        </Section>

        {/* =================================================
            PREFERRED
        ================================================= */}

        <Section
          icon={<FaHome />}
          title="Preferred Requirements"
        >

          <TextAreaField
            label="Preferred Requirements"
            name="preferredRequirements"
            value={
              profile.preferredRequirements
            }
            onChange={handleChange}
          />

        </Section>

        {/* =================================================
            STATUS / MEMBERSHIP
        ================================================= */}

        <Section
          icon={<FaBriefcase />}
          title="Account Status"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <SelectField
              label="Profile Status"
              name="status"
              value={profile.status}
              onChange={handleChange}
              options={[
                "Pending",
                "Approved",
                "Rejected",
              ]}
            />

            <SelectField
              label="Membership"
              name="membership"
              value={
                profile.membership
              }
              onChange={handleChange}
              options={[
                "Free",
                "Silver",
                "Gold",
                "Platinum",
              ]}
            />

          </div>

        </Section>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 mb-10">

          <Link
            href="/admin/matrimony"
            className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-semibold text-center hover:bg-gray-50"
          >
            Back to Members
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold hover:bg-[#721832] disabled:opacity-50 disabled:cursor-not-allowed"
          >

            <FaSave />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>
    </div>
  );
}

/* =====================================================
   SECTION
===================================================== */

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6 mb-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 shrink-0 rounded-xl bg-pink-50 text-[#8B1E3F] flex items-center justify-center">
          {icon}
        </div>

        <h2 className="text-base sm:text-lg font-bold text-gray-800">
          {title}
        </h2>

      </div>

      {children}

    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function InputField({
  label,
  name,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-gray-500 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-pink-100"
      />

    </div>
  );
}

/* =====================================================
   SELECT
===================================================== */

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-gray-500 mb-2">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-pink-100"
      >

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

/* =====================================================
   TEXTAREA
===================================================== */

function TextAreaField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}) {
  return (
    <div>

      <label className="block text-xs font-semibold text-gray-500 mb-2">
        {label}
      </label>

      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none resize-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-pink-100"
      />

    </div>
  );
}