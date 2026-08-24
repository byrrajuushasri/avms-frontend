"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type DistrictData = {
  mandals: string[];
  sanghams: string[];
};

type FormData = {
  full_name: string;
  mobile: string;
  email: string;
  occupation: string;
  gender: string;
  date_of_birth: string;

  district: string;
  mandal: string;
  sangham: string;

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

  executive_body: string;
  designation: string;
};

type ErrorState = Record<string, string>;

/* =========================================================
   TELANGANA DATA
========================================================= */

const telanganaData: Record<string, DistrictData> = {
  Hyderabad: {
    mandals: [
      "Amberpet",
      "Asifnagar",
      "Bahadurpura",
      "Charminar",
      "Khairatabad",
      "Nampally",
      "Secunderabad",
      "Shaikpet",
      "Musheerabad",
    ],
    sanghams: [
      "Hyderabad Arya Vysya Sangham",
      "Secunderabad Arya Vysya Sangham",
      "Charminar Arya Vysya Sangham",
    ],
  },

  Rangareddy: {
    mandals: [
      "Rajendranagar",
      "Serilingampally",
      "Shamshabad",
      "Maheshwaram",
      "Ibrahimpatnam",
      "Hayathnagar",
    ],
    sanghams: [
      "Rangareddy Arya Vysya Sangham",
      "Shamshabad Arya Vysya Sangham",
      "Rajendranagar Arya Vysya Sangham",
    ],
  },

  Medchal_Malkajgiri: {
    mandals: [
      "Medchal",
      "Malkajgiri",
      "Keesara",
      "Kapra",
      "Quthbullapur",
      "Shamirpet",
    ],
    sanghams: [
      "Medchal Arya Vysya Sangham",
      "Malkajgiri Arya Vysya Sangham",
      "Keesara Arya Vysya Sangham",
    ],
  },

  Sangareddy: {
    mandals: [
      "Sangareddy",
      "Patancheru",
      "Ameenpur",
      "Zaheerabad",
      "Jinnaram",
      "Narayankhed",
    ],
    sanghams: [
      "Sangareddy Arya Vysya Sangham",
      "Patancheru Arya Vysya Sangham",
      "Zaheerabad Arya Vysya Sangham",
    ],
  },

  Warangal: {
    mandals: [
      "Hanamkonda",
      "Kazipet",
      "Warangal",
      "Atmakur",
      "Dharmasagar",
      "Parkal",
    ],
    sanghams: [
      "Warangal Arya Vysya Sangham",
      "Hanamkonda Arya Vysya Sangham",
      "Kazipet Arya Vysya Sangham",
    ],
  },

  Karimnagar: {
    mandals: [
      "Karimnagar",
      "Manakondur",
      "Huzurabad",
      "Choppadandi",
      "Gangadhara",
      "Veenavanka",
    ],
    sanghams: [
      "Karimnagar Arya Vysya Sangham",
      "Huzurabad Arya Vysya Sangham",
      "Manakondur Arya Vysya Sangham",
    ],
  },

  Nizamabad: {
    mandals: [
      "Nizamabad",
      "Bodhan",
      "Armoor",
      "Balkonda",
      "Dichpally",
      "Navipet",
    ],
    sanghams: [
      "Nizamabad Arya Vysya Sangham",
      "Bodhan Arya Vysya Sangham",
      "Armoor Arya Vysya Sangham",
    ],
  },

  Khammam: {
    mandals: [
      "Khammam",
      "Madhira",
      "Wyra",
      "Kusumanchi",
      "Kallur",
      "Sathupalli",
    ],
    sanghams: [
      "Khammam Arya Vysya Sangham",
      "Madhira Arya Vysya Sangham",
      "Sathupalli Arya Vysya Sangham",
    ],
  },

  Nalgonda: {
    mandals: [
      "Nalgonda",
      "Miryalaguda",
      "Devarakonda",
      "Chandur",
      "Nakrekal",
      "Munugode",
    ],
    sanghams: [
      "Nalgonda Arya Vysya Sangham",
      "Miryalaguda Arya Vysya Sangham",
      "Devarakonda Arya Vysya Sangham",
    ],
  },

  Mahbubnagar: {
    mandals: [
      "Mahbubnagar",
      "Jadcherla",
      "Bhoothpur",
      "Devarkadra",
      "Narayanpet",
      "Makthal",
    ],
    sanghams: [
      "Mahbubnagar Arya Vysya Sangham",
      "Jadcherla Arya Vysya Sangham",
      "Narayanpet Arya Vysya Sangham",
    ],
  },
};

/* =========================================================
   EXECUTIVE BODY
========================================================= */

const executiveBodies = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

/* =========================================================
   DESIGNATIONS
========================================================= */

const designations = [
  "Member",
  "General Secretary",
  "President",
  "Vice President",
  "Joint Secretary",
  "Media",
];

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData: FormData = {
  full_name: "",
  mobile: "",
  email: "",
  occupation: "",
  gender: "",
  date_of_birth: "",

  district: "",
  mandal: "",
  sangham: "",

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

  executive_body: "State Body",
  designation: "Member",
};

/* =========================================================
   STYLES
========================================================= */

const inputClass =
  "w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 placeholder:text-gray-400 outline-none transition focus:border-rose-400 focus:ring-4 focus:ring-rose-50";

const labelClass = "mb-2 block text-sm font-medium text-gray-700";

/* =========================================================
   HELPERS
========================================================= */

const calculateAge = (dob: string) => {
  if (!dob) return 0;

  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   PAGE
========================================================= */

export default function MembershipPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<ErrorState>({});

  const [loading, setLoading] = useState(false);

  /* PHOTO */

  const [photo, setPhoto] = useState<File | null>(null);

  const [photoPreview, setPhotoPreview] = useState<string>("");

  /* =======================================================
     SELECTED DISTRICT
  ======================================================= */

  const selectedDistrict =
    formData.district && telanganaData[formData.district]
      ? telanganaData[formData.district]
      : null;

  /* =======================================================
     ERROR HELPERS
  ======================================================= */

  const setFieldError = (field: string, message: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearFieldError = (field: string) => {
    setErrors((prev) => {
      const updated = { ...prev };

      delete updated[field];

      return updated;
    });
  };

  const getInputClass = (field: string) => {
    return `${inputClass} ${
      errors[field]
        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : ""
    }`;
  };

  const ErrorMessage = ({ field }: { field: string }) => {
    if (!errors[field]) {
      return null;
    }

    return (
      <p className="mt-1 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    );
  };

  /* =======================================================
     PHOTO CHANGE
  ======================================================= */

  const handlePhotoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPhoto(null);
      setPhotoPreview("");
      clearFieldError("photo");
      return;
    }

    /* FILE TYPE */

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setPhoto(null);
      setPhotoPreview("");

      e.target.value = "";

      setFieldError(
        "photo",
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      );

      toast.error("Invalid photo format");

      return;
    }

    /* FILE SIZE - 5 MB */

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setPhoto(null);
      setPhotoPreview("");

      e.target.value = "";

      setFieldError(
        "photo",
        "Photo size must be less than 5 MB"
      );

      toast.error("Photo must be less than 5 MB");

      return;
    }

    setPhoto(file);

    setPhotoPreview(URL.createObjectURL(file));

    clearFieldError("photo");
  };

  /* =======================================================
     NORMAL CHANGE
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    /* MOBILE */

    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, "");

      if (onlyNumbers.length > 10) {
        setFieldError(
          "mobile",
          "Mobile number must contain only 10 digits"
        );

        return;
      }

      setFormData((prev) => ({
        ...prev,
        mobile: onlyNumbers,
      }));

      if (!onlyNumbers) {
        setFieldError("mobile", "Mobile number is required");
      } else if (!/^[6-9]\d{9}$/.test(onlyNumbers)) {
        setFieldError(
          "mobile",
          "Enter a valid 10-digit Indian mobile number"
        );
      } else {
        clearFieldError("mobile");
      }

      return;
    }

    /* FULL NAME */

    if (name === "full_name") {
      setFormData((prev) => ({
        ...prev,
        full_name: value,
      }));

      const nameValue = value.trim();

      if (!nameValue) {
        setFieldError("full_name", "Full name is required");
      } else if (nameValue.length < 3) {
        setFieldError(
          "full_name",
          "Minimum 3 characters required"
        );
      } else if (!/^[A-Za-z\s.'-]+$/.test(nameValue)) {
        setFieldError(
          "full_name",
          "Only letters and spaces are allowed"
        );
      } else {
        clearFieldError("full_name");
      }

      return;
    }

    /* EMAIL */

    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        email: value,
      }));

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setFieldError(
          "email",
          "Email address is required"
        );
      } else if (!emailRegex.test(value)) {
        setFieldError(
          "email",
          "Enter a valid email address"
        );
      } else {
        clearFieldError("email");
      }

      return;
    }

    /* DOB */

    if (name === "date_of_birth") {
      setFormData((prev) => ({
        ...prev,
        date_of_birth: value,
      }));

      if (!value) {
        setFieldError(
          "date_of_birth",
          "Date of birth is required"
        );

        return;
      }

      const age = calculateAge(value);

      if (age < 18) {
        setFieldError(
          "date_of_birth",
          "Member must be 18 years or above"
        );
      } else {
        clearFieldError("date_of_birth");
      }

      return;
    }

    /* PAYMENT DATE */

    if (
      name === "mahashaba_payment_date" ||
      name === "sangam_payment_date"
    ) {
      const today = getTodayDate();

      if (value > today) {
        setFieldError(
          name,
          "Payment date cannot be in the future"
        );

        return;
      }

      clearFieldError(name);
    }

    /* AMOUNT */

    if (
      name === "mahashaba_amount_paid" ||
      name === "sangam_amount_paid"
    ) {
      if (value !== "" && Number(value) < 0) {
        setFieldError(
          name,
          "Amount cannot be negative"
        );
      } else if (value !== "" && Number(value) <= 0) {
        setFieldError(
          name,
          "Amount must be greater than 0"
        );
      } else {
        clearFieldError(name);
      }
    }

    /* MAHASHABA STATUS */

    if (
      name === "mahashaba_payment_status" &&
      value
    ) {
      clearFieldError(
        "mahashaba_payment_status"
      );

      if (value === "Free") {
        clearFieldError(
          "mahashaba_payment_method"
        );

        clearFieldError(
          "mahashaba_receipt_number"
        );

        clearFieldError(
          "mahashaba_amount_paid"
        );

        clearFieldError(
          "mahashaba_payment_date"
        );
      }
    }

    /* SANGAM STATUS */

    if (
      name === "sangam_payment_status" &&
      value
    ) {
      clearFieldError(
        "sangam_payment_status"
      );

      if (value === "Free") {
        clearFieldError(
          "sangam_payment_method"
        );

        clearFieldError(
          "sangam_receipt_number"
        );

        clearFieldError(
          "sangam_amount_paid"
        );

        clearFieldError(
          "sangam_payment_date"
        );
      }
    }

    /* NORMAL */

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      clearFieldError(name);
    }
  };

  /* =======================================================
     DISTRICT CHANGE
  ======================================================= */

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const district = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district,
      mandal: "",
      sangham: "",
    }));

    clearFieldError("district");
    clearFieldError("mandal");
    clearFieldError("sangham");

    if (district) {
      toast.success(
        `District selected: ${district.replaceAll("_", " ")}`
      );
    }
  };

  /* =======================================================
     MANDAL CHANGE
  ======================================================= */

  const handleMandalChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const mandal = e.target.value;

    setFormData((prev) => ({
      ...prev,
      mandal,
      sangham: "",
    }));

    clearFieldError("mandal");
    clearFieldError("sangham");
  };

  /* =======================================================
     EXECUTIVE BODY CHANGE
  ======================================================= */

  const handleExecutiveBodyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const executive_body = e.target.value;

    setFormData((prev) => {
      if (executive_body === "State Body") {
        return {
          ...prev,
          executive_body,
          district: "",
          mandal: "",
          sangham: "",
        };
      }

      if (executive_body === "District Body") {
        return {
          ...prev,
          executive_body,
          mandal: "",
          sangham: "",
        };
      }

      if (executive_body === "Mandal Body") {
        return {
          ...prev,
          executive_body,
          sangham: "",
        };
      }

      if (executive_body === "Sangham Body") {
        return {
          ...prev,
          executive_body,
        };
      }

      return {
        ...prev,
        executive_body: "State Body",
        district: "",
        mandal: "",
        sangham: "",
      };
    });

    clearFieldError("executive_body");
    clearFieldError("district");
    clearFieldError("mandal");
    clearFieldError("sangham");

    if (executive_body) {
      toast.success(`${executive_body} selected`);
    }
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};

    /* FULL NAME */

    const name = formData.full_name.trim();

    if (!name) {
      newErrors.full_name = "Full name is required";
    } else if (name.length < 3) {
      newErrors.full_name = "Minimum 3 characters required";
    } else if (!/^[A-Za-z\s.'-]+$/.test(name)) {
      newErrors.full_name =
        "Only letters and spaces are allowed";
    }

    /* MOBILE */

    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number";
    }

    /* EMAIL */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    /* OCCUPATION */

    if (!formData.occupation.trim()) {
      newErrors.occupation = "Occupation is required";
    }

    /* GENDER */

    if (!formData.gender) {
      newErrors.gender = "Please select gender";
    }

    /* DOB */

    if (!formData.date_of_birth) {
      newErrors.date_of_birth =
        "Date of birth is required";
    } else if (
      calculateAge(formData.date_of_birth) < 18
    ) {
      newErrors.date_of_birth =
        "Member must be 18 years or above";
    }

    /* PHOTO */

    if (!photo) {
      newErrors.photo = "Member photo is required";
    }

    /* EXECUTIVE BODY */

    if (!formData.executive_body) {
      newErrors.executive_body =
        "Please select Executive Body";
    }

    /* DESIGNATION */

    if (!formData.designation) {
      newErrors.designation =
        "Please select Designation";
    }

    /* DISTRICT */

    if (
      [
        "District Body",
        "Mandal Body",
        "Sangham Body",
      ].includes(formData.executive_body) &&
      !formData.district
    ) {
      newErrors.district =
        "Please select District";
    }

    /* MANDAL */

    if (
      [
        "Mandal Body",
        "Sangham Body",
      ].includes(formData.executive_body) &&
      !formData.mandal
    ) {
      newErrors.mandal =
        "Please select Mandal";
    }

    /* SANGHAM */

    if (
      formData.executive_body === "Sangham Body" &&
      !formData.sangham
    ) {
      newErrors.sangham =
        "Please select Sangham";
    }

    /* MAHASHABA STATUS */

    if (!formData.mahashaba_payment_status) {
      newErrors.mahashaba_payment_status =
        "Please select Mahashaba payment status";
    }

    /* MAHASHABA PAID */

    if (
      formData.mahashaba_payment_status === "Paid"
    ) {
      if (!formData.mahashaba_payment_method) {
        newErrors.mahashaba_payment_method =
          "Please select Mahashaba payment method";
      }

      if (
        !formData.mahashaba_receipt_number.trim()
      ) {
        newErrors.mahashaba_receipt_number =
          "Please enter Mahashaba receipt number";
      }

      if (
        !formData.mahashaba_amount_paid ||
        Number(formData.mahashaba_amount_paid) <= 0
      ) {
        newErrors.mahashaba_amount_paid =
          "Please enter a valid Mahashaba amount";
      }

      if (!formData.mahashaba_payment_date) {
        newErrors.mahashaba_payment_date =
          "Please select Mahashaba payment date";
      } else if (
        formData.mahashaba_payment_date >
        getTodayDate()
      ) {
        newErrors.mahashaba_payment_date =
          "Payment date cannot be in the future";
      }
    }

    /* SANGAM STATUS */

    if (!formData.sangam_payment_status) {
      newErrors.sangam_payment_status =
        "Please select Sangam payment status";
    }

    /* SANGAM PAID */

    if (
      formData.sangam_payment_status === "Paid"
    ) {
      if (!formData.sangam_payment_method) {
        newErrors.sangam_payment_method =
          "Please select Sangam payment method";
      }

      if (
        !formData.sangam_receipt_number.trim()
      ) {
        newErrors.sangam_receipt_number =
          "Please enter Sangam receipt number";
      }

      if (
        !formData.sangam_amount_paid ||
        Number(formData.sangam_amount_paid) <= 0
      ) {
        newErrors.sangam_amount_paid =
          "Please enter a valid Sangam amount";
      }

      if (!formData.sangam_payment_date) {
        newErrors.sangam_payment_date =
          "Please select Sangam payment date";
      } else if (
        formData.sangam_payment_date >
        getTodayDate()
      ) {
        newErrors.sangam_payment_date =
          "Payment date cannot be in the future";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error(
        "Please correct the highlighted fields"
      );

      return false;
    }

    return true;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (loading) return;

  if (!validateForm()) return;

  setLoading(true);

  const loadingToast = toast.loading(
    "Registering membership..."
  );

  try {
    const executiveBody =
      formData.executive_body?.trim() || "State Body";

    const designation =
      formData.designation?.trim() || "Member";

    /*
     * IMPORTANT
     * We are uploading a photo, so use FormData.
     * Do NOT manually set Content-Type.
     */

    const body = new FormData();

    body.append(
      "full_name",
      formData.full_name.trim()
    );

    body.append(
      "mobile",
      formData.mobile.trim()
    );

    body.append(
      "email",
      formData.email.trim()
    );

    body.append(
      "occupation",
      formData.occupation.trim()
    );

    body.append(
      "gender",
      formData.gender
    );

    body.append(
      "date_of_birth",
      formData.date_of_birth
    );

    body.append(
      "district",
      formData.district || ""
    );

    body.append(
      "mandal",
      formData.mandal || ""
    );

    body.append(
      "sangham",
      formData.sangham || ""
    );

    body.append(
      "mahashaba_payment_status",
      formData.mahashaba_payment_status
    );

    body.append(
      "mahashaba_payment_method",
      formData.mahashaba_payment_method || ""
    );

    body.append(
      "mahashaba_receipt_number",
      formData.mahashaba_receipt_number || ""
    );

    body.append(
      "mahashaba_amount_paid",
      formData.mahashaba_amount_paid || ""
    );

    body.append(
      "mahashaba_payment_date",
      formData.mahashaba_payment_date || ""
    );

    body.append(
      "sangam_payment_status",
      formData.sangam_payment_status
    );

    body.append(
      "sangam_payment_method",
      formData.sangam_payment_method || ""
    );

    body.append(
      "sangam_receipt_number",
      formData.sangam_receipt_number || ""
    );

    body.append(
      "sangam_amount_paid",
      formData.sangam_amount_paid || ""
    );

    body.append(
      "sangam_payment_date",
      formData.sangam_payment_date || ""
    );

    body.append(
      "executive_body",
      executiveBody
    );

    body.append(
      "designation",
      designation
    );

    /*
     * PHOTO
     */
    if (photo) {
      body.append("photo", photo);
    }

    console.log(
      "Submitting membership registration..."
    );

    console.log(
      "Photo:",
      photo?.name || "No photo"
    );

    /*
     * API URL
     *
     * .env.local:
     *
     * NEXT_PUBLIC_API_URL=http://localhost:5000
     *
     * If env variable is not available,
     * localhost:5000 will be used.
     */

    const apiUrl = (
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000"
    ).replace(/\/$/, "");

    const apiEndpoint =
      `${apiUrl}/membership-register`;

    console.log(
      "Membership API:",
      apiEndpoint
    );

    /*
     * SEND REQUEST
     */
    const response = await fetch(
      apiEndpoint,
      {
        method: "POST",
        body,
      }
    );

    /*
     * READ RESPONSE SAFELY
     */
    const contentType =
      response.headers.get("content-type") || "";

    let data: any = null;

    if (
      contentType.includes("application/json")
    ) {
      data = await response.json();
    } else {
      const text = await response.text();

      data = {
        message: text,
      };
    }

    console.log(
      "Membership API response:",
      data
    );

    /*
     * ERROR
     */
    if (!response.ok) {
      throw new Error(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message ||
              `Registration failed (${response.status})`
      );
    }

    /*
     * SUCCESS
     */
    toast.dismiss(loadingToast);

    toast.success(
      `Membership registration successful!${
        data?.member_id
          ? ` Member ID: ${data.member_id}`
          : data?.data?.member_id
          ? ` Member ID: ${data.data.member_id}`
          : ""
      }`,
      {
        duration: 6000,
      }
    );

    /*
     * RESET FORM
     */
    setFormData({
      ...initialFormData,
    });

    setPhoto(null);
    setPhotoPreview("");
    setErrors({});

  } catch (err) {
    console.error(
      "MEMBERSHIP REGISTRATION ERROR:",
      err
    );

    toast.dismiss(loadingToast);

    toast.error(
      err instanceof Error
        ? err.message
        : "Registration failed. Please try again.",
      {
        duration: 6000,
      }
    );

  } finally {
    setLoading(false);
  }
};
  /* =======================================================
     PAYMENT SECTION
  ======================================================= */

  const renderPaymentSection = (
    title: string,

    statusName:
      | "mahashaba_payment_status"
      | "sangam_payment_status",

    methodName:
      | "mahashaba_payment_method"
      | "sangam_payment_method",

    receiptName:
      | "mahashaba_receipt_number"
      | "sangam_receipt_number",

    amountName:
      | "mahashaba_amount_paid"
      | "sangam_amount_paid",

    dateName:
      | "mahashaba_payment_date"
      | "sangam_payment_date"
  ) => {
    const paid =
      formData[statusName] === "Paid";

    return (
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 mb-5 text-xs text-gray-500">
          Enter payment details if payment has been made.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* PAYMENT STATUS */}

          <div>
            <label className={labelClass}>
              Payment Status *
            </label>

            <select
              name={statusName}
              value={formData[statusName]}
              onChange={handleChange}
              required
              className={getInputClass(statusName)}
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

            <ErrorMessage field={statusName} />
          </div>

          {paid && (
            <>
              {/* PAYMENT METHOD */}

              <div>
                <label className={labelClass}>
                  Payment Method *
                </label>

                <select
                  name={methodName}
                  value={formData[methodName]}
                  onChange={handleChange}
                  required
                  className={getInputClass(methodName)}
                >
                  <option value="">
                    Select Payment Method
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Credit/Debit Card">
                    Credit/Debit Card
                  </option>

                  <option value="Net Banking">
                    Net Banking
                  </option>

                  <option value="Cash">
                    Cash
                  </option>
                </select>

                <ErrorMessage field={methodName} />
              </div>

              {/* RECEIPT */}

              <div>
                <label className={labelClass}>
                  Receipt Number *
                </label>

                <input
                  name={receiptName}
                  value={formData[receiptName]}
                  onChange={handleChange}
                  placeholder="Enter Receipt Number"
                  required
                  maxLength={50}
                  className={getInputClass(receiptName)}
                />

                <ErrorMessage field={receiptName} />
              </div>

              {/* AMOUNT */}

              <div>
                <label className={labelClass}>
                  Amount Paid *
                </label>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  name={amountName}
                  value={formData[amountName]}
                  onChange={handleChange}
                  placeholder="Enter Amount Paid"
                  required
                  className={getInputClass(amountName)}
                />

                <ErrorMessage field={amountName} />
              </div>

              {/* PAYMENT DATE */}

              <div>
                <label className={labelClass}>
                  Payment Date *
                </label>

                <input
                  type="date"
                  name={dateName}
                  value={formData[dateName]}
                  onChange={handleChange}
                  required
                  max={getTodayDate()}
                  className={getInputClass(dateName)}
                />

                <ErrorMessage field={dateName} />
              </div>
            </>
          )}
        </div>
      </section>
    );
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,

          style: {
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "500",
          },

          success: {
            duration: 5000,
          },

          error: {
            duration: 5000,
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* HEADER */}

          <div className="border-b border-gray-100 px-6 py-7 text-center sm:px-8">
            <h1 className="text-2xl font-bold text-rose-600 sm:text-3xl">
              Membership Registration
            </h1>

            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Complete the membership registration form
            </p>

            <div className="mt-4 inline-flex rounded-full border border-rose-200 bg-rose-50 px-5 py-2">
              <span className="text-sm font-semibold text-rose-700">
                Eligibility: 18 Years & Above — Male & Female
              </span>
            </div>
          </div>

          {/* FORM */}

          <div className="p-5 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="space-y-7"
            >

              {/* =================================================
                  MEMBER DETAILS
              ================================================= */}

              <section>
                <h2 className="mb-5 text-lg font-semibold text-gray-900">
                  Member Details
                </h2>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {/* FULL NAME */}

                  <div>
                    <label className={labelClass}>
                      Full Name *
                    </label>

                    <input
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Enter Full Name"
                      required
                      minLength={3}
                      maxLength={100}
                      className={getInputClass("full_name")}
                    />

                    <ErrorMessage field="full_name" />
                  </div>

                  {/* MOBILE */}

                  <div>
                    <label className={labelClass}>
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter 10 Digit Mobile Number"
                      required
                      inputMode="numeric"
                      maxLength={10}
                      className={getInputClass("mobile")}
                    />

                    <ErrorMessage field="mobile" />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className={labelClass}>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email Address"
                      required
                      maxLength={150}
                      className={getInputClass("email")}
                    />

                    <ErrorMessage field="email" />
                  </div>

                  {/* OCCUPATION */}

                  <div>
                    <label className={labelClass}>
                      Occupation *
                    </label>

                    <input
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Enter Occupation"
                      required
                      maxLength={100}
                      className={getInputClass("occupation")}
                    />

                    <ErrorMessage field="occupation" />
                  </div>

                  {/* GENDER */}

                  <div>
                    <label className={labelClass}>
                      Gender *
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={getInputClass("gender")}
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

                    <ErrorMessage field="gender" />
                  </div>

                  {/* DOB */}

                  <div>
                    <label className={labelClass}>
                      Date of Birth *
                    </label>

                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                      max={getTodayDate()}
                      className={getInputClass("date_of_birth")}
                    />

                    <ErrorMessage field="date_of_birth" />

                    {formData.date_of_birth &&
                      calculateAge(formData.date_of_birth) >= 0 && (
                        <p className="mt-1 text-xs text-gray-500">
                          Age:{" "}
                          {calculateAge(
                            formData.date_of_birth
                          )}{" "}
                          years
                        </p>
                      )}
                  </div>

                  {/* =================================================
                      PHOTO
                  ================================================= */}

                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      Member Photo *
                    </label>

                    <div className="rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/40 p-5">

                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* PREVIEW */}

                        <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white">
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Member photo preview"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-center text-xs text-gray-400">
                              <div className="mb-1 text-3xl">
                                📷
                              </div>
                              No Photo
                            </div>
                          )}
                        </div>

                        {/* INPUT */}

                        <div className="flex-1">
                          <input
                            type="file"
                            name="photo"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handlePhotoChange}
                            className="block w-full cursor-pointer rounded-xl border border-gray-200 bg-white text-sm text-gray-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-rose-600 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-rose-700"
                          />

                          <p className="mt-2 text-xs text-gray-500">
                            JPG, JPEG, PNG or WEBP only. Maximum
                            size: 5 MB.
                          </p>

                          {photo && (
                            <p className="mt-2 text-xs font-medium text-green-600">
                              Selected: {photo.name}
                            </p>
                          )}

                          <ErrorMessage field="photo" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* STATE BODY */}

                  <div>
                    <label className={labelClass}>
                      State Body
                    </label>

                    <input
                      type="text"
                      value="Telangana State Arya Vysya Mahasabha"
                      readOnly
                      className={`${inputClass} cursor-not-allowed bg-gray-100`}
                    />
                  </div>

                  {/* EXECUTIVE BODY */}

                  <div>
                    <label className={labelClass}>
                      Executive Body *
                    </label>

                    <select
                      name="executive_body"
                      value={formData.executive_body}
                      onChange={handleExecutiveBodyChange}
                      required
                      className={getInputClass("executive_body")}
                    >
                      <option value="">
                        Select Executive Body
                      </option>

                      {executiveBodies.map((body) => (
                        <option
                          key={body}
                          value={body}
                        >
                          {body}
                        </option>
                      ))}
                    </select>

                    <ErrorMessage field="executive_body" />
                  </div>

                  {/* DESIGNATION */}

                  <div>
                    <label className={labelClass}>
                      Designation *
                    </label>

                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className={getInputClass("designation")}
                    >
                      <option value="">
                        Select Designation
                      </option>

                      {designations.map((designation) => (
                        <option
                          key={designation}
                          value={designation}
                        >
                          {designation}
                        </option>
                      ))}
                    </select>

                    <ErrorMessage field="designation" />
                  </div>

                  {/* DISTRICT */}

                  {[
                    "District Body",
                    "Mandal Body",
                    "Sangham Body",
                  ].includes(formData.executive_body) && (
                    <div>
                      <label className={labelClass}>
                        District *
                      </label>

                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleDistrictChange}
                        required
                        className={getInputClass("district")}
                      >
                        <option value="">
                          Select District
                        </option>

                        {Object.keys(telanganaData).map(
                          (district) => (
                            <option
                              key={district}
                              value={district}
                            >
                              {district.replaceAll("_", " ")}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage field="district" />
                    </div>
                  )}

                  {/* MANDAL */}

                  {[
                    "Mandal Body",
                    "Sangham Body",
                  ].includes(formData.executive_body) && (
                    <div>
                      <label className={labelClass}>
                        Mandal *
                      </label>

                      <select
                        name="mandal"
                        value={formData.mandal}
                        onChange={handleMandalChange}
                        required
                        disabled={!formData.district}
                        className={getInputClass("mandal")}
                      >
                        <option value="">
                          Select Mandal
                        </option>

                        {selectedDistrict?.mandals.map(
                          (mandal) => (
                            <option
                              key={mandal}
                              value={mandal}
                            >
                              {mandal}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage field="mandal" />
                    </div>
                  )}

                  {/* SANGHAM */}

                  {formData.executive_body ===
                    "Sangham Body" && (
                    <div>
                      <label className={labelClass}>
                        Sangham *
                      </label>

                      <select
                        name="sangham"
                        value={formData.sangham}
                        onChange={handleChange}
                        required
                        disabled={!formData.mandal}
                        className={getInputClass("sangham")}
                      >
                        <option value="">
                          Select Sangham
                        </option>

                        {selectedDistrict?.sanghams.map(
                          (sangham) => (
                            <option
                              key={sangham}
                              value={sangham}
                            >
                              {sangham}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage field="sangham" />
                    </div>
                  )}
                </div>
              </section>

              {/* MAHASHABA PAYMENT */}

              {renderPaymentSection(
                "Payment Details Of Mahashaba",
                "mahashaba_payment_status",
                "mahashaba_payment_method",
                "mahashaba_receipt_number",
                "mahashaba_amount_paid",
                "mahashaba_payment_date"
              )}

              {/* SANGAM PAYMENT */}

              {renderPaymentSection(
                "Payment Details Of Sangam",
                "sangam_payment_status",
                "sangam_payment_method",
                "sangam_receipt_number",
                "sangam_amount_paid",
                "sangam_payment_date"
              )}

              {/* SUBMIT */}

              <div className="flex justify-end border-t border-gray-100 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`h-11 rounded-xl px-7 text-sm font-semibold text-white shadow-sm transition ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  {loading
                    ? "Registering..."
                    : "Register Now"}
                </button>
              </div>
            </form>

            {/* EXISTING MEMBER */}

            <p className="mt-7 text-center text-sm text-gray-600">
              Already registered?

              <a
                href="/membership/details"
                className="ml-2 font-semibold text-rose-600 hover:text-rose-700"
              >
                Existing Members
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}