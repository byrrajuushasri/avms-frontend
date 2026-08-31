"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaUser,
  FaCamera,
} from "react-icons/fa";

interface Member {
  id: number;
  member_id: string;

  full_name: string;
  mobile: string;
  email: string;
  occupation: string;
  gender: string;
  date_of_birth: string;

  photo: string;

  district: string;
  mandal: string;
  sangham: string;

  executive_body: string;
  designation: string;

  mahashaba_payment_status: string;
  mahashaba_payment_method: string;
  mahashaba_receipt_number: string;
  mahashaba_amount_paid: string;
  mahashaba_payment_date: string;

  sangam_payment_status: string;
  sangam_payment_method: string;
  sangam_receipt_number: string;
  sangam_amount_paid: string;
  sangam_payment_date: string;

  role: string;
  status: string;

  password: string;
  created_at: string;
}

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

export default function EditMemberPage() {
  const params = useParams();
  const router = useRouter();

  const memberId = params.id as string;

  const [member, setMember] = useState<Member>({
    id: 0,
    member_id: "",

    full_name: "",
    mobile: "",
    email: "",
    occupation: "",
    gender: "",
    date_of_birth: "",

    photo: "",

    district: "",
    mandal: "",
    sangham: "",

    executive_body: "",
    designation: "",

    mahashaba_payment_status: "",
    mahashaba_payment_method: "",
    mahashaba_receipt_number: "",
    mahashaba_amount_paid: "",
    mahashaba_payment_date: "",

    sangam_payment_status: "",
    sangam_payment_method: "",
    sangam_receipt_number: "",
    sangam_amount_paid: "",
    sangam_payment_date: "",

    role: "",
    status: "Active",

    password: "",
    created_at: "",
  });

  const [photoFile, setPhotoFile] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================================================
  // PHOTO URL
  // =========================================================

  const getPhotoUrl = (photo: string) => {
    if (!photo) {
      return "";
    }

    if (
      photo.startsWith("http://") ||
      photo.startsWith("https://")
    ) {
      return photo;
    }

    return `${BACKEND_URL}${
      photo.startsWith("/") ? "" : "/"
    }${photo}`;
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDateForInput = (
    value: unknown
  ): string => {
    if (!value) {
      return "";
    }

    const stringValue = String(value);

    if (
      stringValue.length >= 10
    ) {
      return stringValue.substring(0, 10);
    }

    return "";
  };

  // =========================================================
  // GET MEMBER
  // =========================================================

  useEffect(() => {
    if (!memberId) {
      return;
    }

    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

        const response = await fetch(
          `${BACKEND_URL}/membership-register/${memberId}`,
          {
            method: "GET",

            headers: {
              ...(token
                ? {
                    Authorization: `Bearer ${token}`,
                  }
                : {}),
            },

            cache: "no-store",
          }
        );

        const contentType =
          response.headers.get("content-type") || "";

        let data: any = null;

        if (
          contentType.includes(
            "application/json"
          )
        ) {
          data = await response.json();
        } else {
          const text =
            await response.text();

          throw new Error(
            text ||
              "Failed to load member"
          );
        }

        console.log(
          "GET MEMBER STATUS:",
          response.status
        );

        console.log(
          "GET MEMBER RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to load member"
          );
        }

        const photo =
          data?.photo || "";

        setMember({
          id:
            Number(data?.id) || 0,

          member_id:
            data?.member_id || "",

          full_name:
            data?.full_name || "",

          mobile:
            data?.mobile || "",

          email:
            data?.email || "",

          occupation:
            data?.occupation || "",

          gender:
            data?.gender || "",

          date_of_birth:
            formatDateForInput(
              data?.date_of_birth
            ),

          photo,

          district:
            data?.district || "",

          mandal:
            data?.mandal || "",

          sangham:
            data?.sangham || "",

          executive_body:
            data?.executive_body || "",

          designation:
            data?.designation || "",

          // ===================================================
          // MAHASHABA
          // ===================================================

          mahashaba_payment_status:
            data?.mahashaba_payment_status ||
            "",

          mahashaba_payment_method:
            data?.mahashaba_payment_method ||
            "",

          mahashaba_receipt_number:
            data?.mahashaba_receipt_number ||
            "",

          mahashaba_amount_paid:
            data?.mahashaba_amount_paid !==
              null &&
            data?.mahashaba_amount_paid !==
              undefined
              ? String(
                  data.mahashaba_amount_paid
                )
              : "",

          mahashaba_payment_date:
            formatDateForInput(
              data?.mahashaba_payment_date
            ),

          // ===================================================
          // SANGAM
          // ===================================================

          sangam_payment_status:
            data?.sangam_payment_status ||
            "",

          sangam_payment_method:
            data?.sangam_payment_method ||
            "",

          sangam_receipt_number:
            data?.sangam_receipt_number ||
            "",

          sangam_amount_paid:
            data?.sangam_amount_paid !==
              null &&
            data?.sangam_amount_paid !==
              undefined
              ? String(
                  data.sangam_amount_paid
                )
              : "",

          sangam_payment_date:
            formatDateForInput(
              data?.sangam_payment_date
            ),

          role:
            data?.role || "user",

          status:
            data?.status || "Active",

          // Never load old password
          password: "",

          created_at:
            data?.created_at || "",
        });

        if (photo) {
          setPhotoPreview(
            getPhotoUrl(photo)
          );
        }
      } catch (err) {
        console.error(
          "GET MEMBER ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load member details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [memberId]);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // PHOTO CHANGE
  // =========================================================

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Photo size must be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only JPG, JPEG, PNG or WEBP images are allowed."
      );

      e.target.value = "";
      return;
    }

    setError("");

    setPhotoFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  // =========================================================
  // UPDATE MEMBER
  // =========================================================

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (saving) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      if (!token) {
        setError(
          "Login session expired. Please login again."
        );

        return;
      }

      console.log(
        "UPDATING MEMBER ID:",
        memberId
      );

      // =====================================================
      // FORM DATA
      // =====================================================

      const formData =
        new FormData();

      // =====================================================
      // BASIC DETAILS
      // =====================================================

      formData.append(
        "full_name",
        member.full_name.trim()
      );

      formData.append(
        "mobile",
        member.mobile.trim()
      );

      formData.append(
        "email",
        member.email
          .trim()
          .toLowerCase()
      );

      formData.append(
        "occupation",
        member.occupation.trim()
      );

      formData.append(
        "gender",
        member.gender.trim()
      );

      formData.append(
        "date_of_birth",
        member.date_of_birth
      );

      // =====================================================
      // LOCATION
      // =====================================================

      formData.append(
        "district",
        member.district.trim()
      );

      formData.append(
        "mandal",
        member.mandal.trim()
      );

      formData.append(
        "sangham",
        member.sangham.trim()
      );

      // =====================================================
      // EXECUTIVE
      // =====================================================

      formData.append(
        "executive_body",
        member.executive_body.trim()
      );

      formData.append(
        "designation",
        member.designation.trim()
      );

      // =====================================================
      // MAHASHABA
      // =====================================================

      formData.append(
        "mahashaba_payment_status",
        member.mahashaba_payment_status
      );

      formData.append(
        "mahashaba_payment_method",
        member.mahashaba_payment_method
      );

      formData.append(
        "mahashaba_receipt_number",
        member.mahashaba_receipt_number
      );

      formData.append(
        "mahashaba_amount_paid",
        member.mahashaba_amount_paid
      );

      formData.append(
        "mahashaba_payment_date",
        member.mahashaba_payment_date
      );

      // =====================================================
      // SANGAM
      // =====================================================

      formData.append(
        "sangam_payment_status",
        member.sangam_payment_status
      );

      formData.append(
        "sangam_payment_method",
        member.sangam_payment_method
      );

      formData.append(
        "sangam_receipt_number",
        member.sangam_receipt_number
      );

      formData.append(
        "sangam_amount_paid",
        member.sangam_amount_paid
      );

      formData.append(
        "sangam_payment_date",
        member.sangam_payment_date
      );

      // =====================================================
      // ROLE
      // =====================================================

      formData.append(
        "role",
        member.role
      );

      // =====================================================
      // STATUS
      // =====================================================

      formData.append(
        "status",
        member.status
      );

      // =====================================================
      // PASSWORD
      // Only send if user entered a new password
      // =====================================================

      if (
        member.password.trim()
      ) {
        formData.append(
          "password",
          member.password.trim()
        );
      }

      // =====================================================
      // PHOTO
      // =====================================================

      if (photoFile) {
        formData.append(
          "photo",
          photoFile
        );
      }

      // =====================================================
      // DEBUG FORM DATA
      // =====================================================

      console.log(
        "FORM DATA:"
      );

      for (
        const [
          key,
          value,
        ] of formData.entries()
      ) {
        if (
          value instanceof File
        ) {
          console.log(
            key,
            value.name
          );
        } else {
          console.log(
            key,
            value
          );
        }
      }

      // =====================================================
      // API
      // =====================================================

      const response =
        await fetch(
          `${BACKEND_URL}/membership-register/${memberId}`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },

            body: formData,
          }
        );

      // =====================================================
      // SAFE RESPONSE PARSING
      // =====================================================

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let result: any = null;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        result =
          await response.json();
      } else {
        const text =
          await response.text();

        result = {
          message:
            text ||
            "Server returned an invalid response.",
        };
      }

      console.log(
        "UPDATE API STATUS:",
        response.status
      );

      console.log(
        "UPDATE API RESPONSE:",
        result
      );

      // =====================================================
      // ERROR
      // =====================================================

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            result?.message
          )
            ? result.message.join(
                ", "
              )
            : result?.message ||
                "Failed to update member"
        );
      }

      // =====================================================
      // SUCCESS
      // =====================================================

      alert(
        result?.message ||
          "Member updated successfully!"
      );

      router.push(
        "/admin/membership"
      );

      router.refresh();
    } catch (err) {
      console.error(
        "UPDATE MEMBER ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update member."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-sm text-gray-500">
          Loading member details...
        </div>
      </div>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1200px] mx-auto">

        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>

            <div className="flex items-center gap-3 mb-2">

              <Link
                href="/admin/membership"
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition"
              >
                <FaArrowLeft className="text-sm" />
              </Link>

              <h1 className="text-2xl text-gray-900">
                Edit Member
              </h1>

            </div>

            <p className="text-sm text-gray-500 ml-12">
              Update matrimonial member information.
            </p>

          </div>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >

          {/* FORM HEADER */}

          <div className="px-6 py-5 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-[#f8eef2] flex items-center justify-center text-[#8B1E3F]">
                <FaUser />
              </div>

              <div>

                <h2 className="font-semibold text-gray-900">
                  Member Information
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  Member ID:{" "}
                  {member.member_id ||
                    memberId}
                </p>

              </div>

            </div>

          </div>

          <div className="p-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* MEMBER ID */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member ID
                </label>

                <input
                  type="text"
                  value={
                    member.member_id ||
                    memberId
                  }
                  disabled
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 outline-none"
                />
              </div>

              {/* FULL NAME */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={member.full_name}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* MOBILE */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>

                <input
                  type="text"
                  name="mobile"
                  value={member.mobile}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>

                <input
                  type="email"
                  name="email"
                  value={member.email}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* OCCUPATION */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation *
                </label>

                <input
                  type="text"
                  name="occupation"
                  value={member.occupation}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* GENDER */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>

                <select
                  name="gender"
                  value={member.gender}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

              {/* DOB */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={member.date_of_birth}
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* PHOTO */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member Photo
                </label>

                <div className="flex items-center gap-4">

                  <div className="w-20 h-20 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">

                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Member"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaCamera className="text-gray-400 text-xl" />
                    )}

                  </div>

                  <div>

                    <label
                      htmlFor="member-photo"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-50"
                    >
                      <FaCamera />
                      Change Photo
                    </label>

                    <input
                      id="member-photo"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                      onChange={
                        handlePhotoChange
                      }
                      className="hidden"
                    />

                    <p className="text-xs text-gray-400 mt-2">
                      JPG, JPEG, PNG or WEBP only.
                      Maximum size: 5 MB.
                    </p>

                  </div>

                </div>
              </div>

              {/* DISTRICT */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District
                </label>

                <input
                  type="text"
                  name="district"
                  value={member.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* MANDAL */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mandal
                </label>

                <input
                  type="text"
                  name="mandal"
                  value={member.mandal}
                  onChange={handleChange}
                  placeholder="Enter mandal"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* SANGHAM */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sangham
                </label>

                <input
                  type="text"
                  name="sangham"
                  value={member.sangham}
                  onChange={handleChange}
                  placeholder="Enter sangham"
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                />
              </div>

              {/* EXECUTIVE BODY */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Executive Body *
                </label>

                <select
                  name="executive_body"
                  value={
                    member.executive_body
                  }
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                >
                  <option value="">
                    Select Executive Body
                  </option>

                  <option value="State Body">
                    State Body
                  </option>

                  <option value="District Body">
                    District Body
                  </option>

                  <option value="Mandal Body">
                    Mandal Body
                  </option>

                  <option value="Sangham Body">
                    Sangham Body
                  </option>
                </select>
              </div>

              {/* DESIGNATION */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation *
                </label>

                <select
                  name="designation"
                  value={
                    member.designation
                  }
                  onChange={handleChange}
                  required
                  className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                >
                  <option value="">
                    Select Designation
                  </option>

                  <option value="Member">
                    Member
                  </option>

                  <option value="General Secretary">
                    General Secretary
                  </option>

                  <option value="President">
                    President
                  </option>

                  <option value="Vice President">
                    Vice President
                  </option>

                  <option value="Treasurer">
                    Treasurer
                  </option>

                  <option value="Media">
                    Media
                  </option>
                </select>
              </div>

            </div>

            {/* =================================================
                MAHASHABA
            ================================================= */}

            <div className="mt-10">

              <div className="mb-5">

                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Details Of Mahashaba
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Enter payment details if payment has been made.
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* STATUS */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status *
                  </label>

                  <select
                    name="mahashaba_payment_status"
                    value={
                      member.mahashaba_payment_status
                    }
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="">
                      Select Payment Status
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Free">
                      Free
                    </option>
                  </select>
                </div>

                {/* METHOD */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>

                  <select
                    name="mahashaba_payment_method"
                    value={
                      member.mahashaba_payment_method
                    }
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="">
                      Select Payment Method
                    </option>

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Credit/Debit Card">
                      Credit/Debit Card
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                  </select>
                </div>

                {/* RECEIPT */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receipt Number
                  </label>

                  <input
                    type="text"
                    name="mahashaba_receipt_number"
                    value={
                      member.mahashaba_receipt_number
                    }
                    onChange={handleChange}
                    placeholder="Enter receipt number"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                {/* AMOUNT */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>

                  <input
                    type="number"
                    name="mahashaba_amount_paid"
                    value={
                      member.mahashaba_amount_paid
                    }
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                {/* DATE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="mahashaba_payment_date"
                    value={
                      member.mahashaba_payment_date
                    }
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

              </div>
            </div>

            {/* =================================================
                SANGAM
            ================================================= */}

            <div className="mt-10">

              <div className="mb-5">

                <h3 className="text-lg font-semibold text-gray-900">
                  Payment Details Of Sangam
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Enter payment details if payment has been made.
                </p>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* STATUS */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Status *
                  </label>

                  <select
                    name="sangam_payment_status"
                    value={
                      member.sangam_payment_status
                    }
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="">
                      Select Payment Status
                    </option>

                    <option value="Paid">
                      Paid
                    </option>

                    <option value="Free">
                      Free
                    </option>
                  </select>
                </div>

                {/* METHOD */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>

                  <select
                    name="sangam_payment_method"
                    value={
                      member.sangam_payment_method
                    }
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="">
                      Select Payment Method
                    </option>

                    <option value="Cash">
                      Cash
                    </option>

                    <option value="UPI">
                      UPI
                    </option>

                    <option value="Credit/Debit Card">
                      Credit/Debit Card
                    </option>

                    <option value="Bank Transfer">
                      Bank Transfer
                    </option>
                  </select>
                </div>

                {/* RECEIPT */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Receipt Number
                  </label>

                  <input
                    type="text"
                    name="sangam_receipt_number"
                    value={
                      member.sangam_receipt_number
                    }
                    onChange={handleChange}
                    placeholder="Enter receipt number"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                {/* AMOUNT */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount
                  </label>

                  <input
                    type="number"
                    name="sangam_amount_paid"
                    value={
                      member.sangam_amount_paid
                    }
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="Enter amount"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                {/* DATE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="sangam_payment_date"
                    value={
                      member.sangam_payment_date
                    }
                    onChange={handleChange}
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

              </div>
            </div>

            {/* =================================================
                ACCOUNT
            ================================================= */}

            <div className="mt-10">

              <div className="mb-5">

                <h3 className="text-lg font-semibold text-gray-900">
                  Account Details
                </h3>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ROLE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>

                  <select
                    name="role"
                    value={member.role}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="">
                      Select Role
                    </option>

                    <option value="sangam_admin">
                      Sangham Admin
                    </option>

                    <option value="user">
                      Member
                    </option>
                  </select>
                </div>

                {/* STATUS */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>

                  <select
                    name="status"
                    value={member.status}
                    onChange={handleChange}
                    required
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
                  >
                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>
                  </select>
                </div>

                {/* PASSWORD */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={member.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                {/* CREATED DATE */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Created Date
                  </label>

                  <input
                    type="text"
                    value={
                      member.created_at
                        ? new Date(
                            member.created_at
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""
                    }
                    disabled
                    className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-500 outline-none"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* FOOTER */}

          <div className="px-6 py-5 border-t border-gray-100 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">

            <Link
              href="/admin/membership"
              className="px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-semibold text-center hover:bg-gray-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E3F] text-white text-sm font-semibold hover:bg-[#741832] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <FaSave />

              {saving
                ? "Updating..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </main>
    </div>
  );
}