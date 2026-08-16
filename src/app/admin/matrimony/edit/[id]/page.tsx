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

  // =====================================================
  // GET MEMBER DATA
  // =====================================================

  useEffect(() => {
    if (!id) return;

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "Fetching member:",
          `${API_URL}/matrimonial-users/${id}`,
        );

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

        // =================================================
        // BACKEND snake_case -> FRONTEND camelCase
        // =================================================

        setProfile({
          memberId: String(
            result.member_id ?? result.id ?? "",
          ),

          profileCategory:
            result.profile_category ?? "",

          surname: result.surname ?? "",
          name: result.name ?? "",

          fatherName:
            result.father_name ?? "",

          motherName:
            result.mother_name ?? "",

          gotram: result.gotram ?? "",

          nakshatram:
            result.nakshatram ?? "",

          padham:
            result.padham != null
              ? String(result.padham)
              : "",

          rasi: result.rasi ?? "",

          dateOfBirth:
            result.date_of_birth
              ? String(
                  result.date_of_birth,
                ).substring(0, 10)
              : "",

          color: result.color ?? "",

          height: result.height ?? "",

          email: result.email ?? "",

          mobile: result.mobile ?? "",

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

          status: result.status ?? "",

          membership:
            result.membership ?? "",

          photo: result.photo ?? "",
        });
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
  // HANDLE INPUT
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
  // SAVE / UPDATE
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

      const payload = {
        profile_category:
          profile.profileCategory,

        surname: profile.surname,

        name: profile.name,

        father_name:
          profile.fatherName,

        mother_name:
          profile.motherName,

        gotram:
          profile.gotram,

        nakshatram:
          profile.nakshatram,

        padham:
          profile.padham
            ? Number(profile.padham)
            : null,

        rasi:
          profile.rasi,

        date_of_birth:
          profile.dateOfBirth || null,

        color:
          profile.color,

        height:
          profile.height,

        email:
          profile.email,

        mobile:
          profile.mobile,

        education:
          profile.education,

        occupation:
          profile.occupation,

        annual_income:
          profile.salary,

        address:
          profile.address,

        family_details:
          profile.familyDetails,

        brother_details:
          profile.brotherDetails,

        sister_details:
          profile.sisterDetails,

        property_details:
          profile.propertyDetails,

        preferred_requirements:
          profile.preferredRequirements,

        status:
          profile.status || "Pending",

        membership:
          profile.membership || "Free",
      };

      console.log(
        "Updating member:",
        payload,
      );

      const response = await fetch(
        `${API_URL}/matrimonial-users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-red-200 p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">
            Failed to load member
          </h2>

          <p className="text-sm text-gray-600 mt-3">
            {error}
          </p>

          <p className="text-xs text-gray-400 mt-3">
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">

            <Link
              href="/admin/matrimony"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-gray-100"
            >
              <FaArrowLeft />
            </Link>

            <div>
              <h1 className="text-2xl font-bold text-black">
                Edit Matrimonial Member
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Member ID:{" "}
                <span className="font-semibold text-[#8B1E3F]">
                  {profile.memberId || id}
                </span>
              </p>
            </div>
          </div>

          {/* STATUS */}

          <div className="flex gap-2">

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

        {/* PERSONAL INFORMATION */}

        <Section
          icon={<FaUser />}
          title="Personal Information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <InputField
              label="Profile Category"
              name="profileCategory"
              value={profile.profileCategory}
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
              value={profile.fatherName}
              onChange={handleChange}
            />

            <InputField
              label="Mother Name"
              name="motherName"
              value={profile.motherName}
              onChange={handleChange}
            />

            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              value={profile.dateOfBirth}
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

        {/* HOROSCOPE */}

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
              value={profile.nakshatram}
              onChange={handleChange}
            />

            <InputField
              label="Padham"
              name="padham"
              value={profile.padham}
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

        {/* CONTACT */}

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
              <InputField
                label="Address"
                name="address"
                value={profile.address}
                onChange={handleChange}
              />
            </div>

          </div>
        </Section>

        {/* EDUCATION */}

        <Section
          icon={<FaGraduationCap />}
          title="Education & Career"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <InputField
              label="Education"
              name="education"
              value={profile.education}
              onChange={handleChange}
            />

            <InputField
              label="Occupation"
              name="occupation"
              value={profile.occupation}
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

        {/* FAMILY */}

        <Section
          icon={<FaUsers />}
          title="Family Information"
        >
          <div className="space-y-5">

            <TextAreaField
              label="Family Details"
              name="familyDetails"
              value={profile.familyDetails}
              onChange={handleChange}
            />

            <TextAreaField
              label="Brother Details"
              name="brotherDetails"
              value={profile.brotherDetails}
              onChange={handleChange}
            />

            <TextAreaField
              label="Sister Details"
              name="sisterDetails"
              value={profile.sisterDetails}
              onChange={handleChange}
            />

            <TextAreaField
              label="Property Details"
              name="propertyDetails"
              value={profile.propertyDetails}
              onChange={handleChange}
            />

          </div>
        </Section>

        {/* PREFERRED */}

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

        {/* ACTIONS */}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 mb-8">

          <Link
            href="/admin/matrimony"
            className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-semibold text-center hover:bg-gray-50"
          >
            Back to Members
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold hover:bg-[#721832] disabled:opacity-50"
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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">

      <div className="flex items-center gap-3 mb-6">

        <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#8B1E3F] flex items-center justify-center">
          {icon}
        </div>

        <h2 className="text-lg font-bold text-gray-800">
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