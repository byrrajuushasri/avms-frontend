
"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import toast, { Toaster } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type DistrictData = {
  mandals: string[];
  sanghams: string[];
};

type Sibling = {
  name: string;
  age: string;
  marital_status: string;
  occupation: string;
};

type FormData = {
  /* BASIC DETAILS */
  full_name: string;
  surname: string;
  mobile: string;
  email: string;
  occupation: string;
  gender: string;
  date_of_birth: string;

  /* LOCATION */
  address: string;
  location: string;
  district: string;
  mandal: string;
  sangham: string;
  location_name: string;
  latitude: string;
  longitude: string;

  /* MATRIMONIAL DETAILS */
  marital_status: string;
  previous_marriage_details: string;

  /* GOTRAM */
  father_gotram: string;
  mother_gotram: string;
  grandmother_gotram: string;

  father_gotram_other: string;
  mother_gotram_other: string;
  grandmother_gotram_other: string;

  /* ASTROLOGY */
  nakshatram: string;
  padham: string;
  rasi: string;

  /* PERSONAL DETAILS */
  color: string;
  height: string;
  education: string;
  annual_income: string;
  property_details: string;
  preferred_requirements: string;

  /* FAMILY */
  brothers: Sibling[];
  sisters: Sibling[];

  /* MEMBERSHIP PAYMENT */
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

  /* BODY */
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

  Adilabad: {
    mandals: [],
    sanghams: [],
  },

  Bhadradri_Kothagudem: {
    mandals: [],
    sanghams: [],
  },

  Hanamkonda: {
    mandals: [],
    sanghams: [],
  },

  Jagtial: {
    mandals: [],
    sanghams: [],
  },

  Jangaon: {
    mandals: [],
    sanghams: [],
  },

  Jayashankar_Bhupalpally: {
    mandals: [],
    sanghams: [],
  },

  Jogulamba_Gadwal: {
    mandals: [],
    sanghams: [],
  },

  Kamareddy: {
    mandals: [],
    sanghams: [],
  },

  Komaram_Bheem_Asifabad: {
    mandals: [],
    sanghams: [],
  },

  Mahabubabad: {
    mandals: [],
    sanghams: [],
  },

  Mancherial: {
    mandals: [],
    sanghams: [],
  },

  Mulugu: {
    mandals: [],
    sanghams: [],
  },

  Nagarkurnool: {
    mandals: [],
    sanghams: [],
  },

  Narayanpet: {
    mandals: [],
    sanghams: [],
  },

  Nirmal: {
    mandals: [],
    sanghams: [],
  },

  Peddapalli: {
    mandals: [],
    sanghams: [],
  },

  Rajanna_Sircilla: {
    mandals: [],
    sanghams: [],
  },

  Suryapet: {
    mandals: [],
    sanghams: [],
  },

  Vikarabad: {
    mandals: [],
    sanghams: [],
  },

  Wanaparthy: {
    mandals: [],
    sanghams: [],
  },

  Yadadri_Bhuvanagiri: {
    mandals: [],
    sanghams: [],
  },
};

/* =========================================================
   DISTRICTS
========================================================= */

const districtList = [
  "Adilabad",
  "Bhadradri_Kothagudem",
  "Hanamkonda",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar_Bhupalpally",
  "Jogulamba_Gadwal",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Komaram_Bheem_Asifabad",
  "Mahabubabad",
  "Mahbubnagar",
  "Mancherial",
  "Medchal_Malkajgiri",
  "Mulugu",
  "Nagarkurnool",
  "Nalgonda",
  "Narayanpet",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna_Sircilla",
  "Rangareddy",
  "Sangareddy",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yadadri_Bhuvanagiri",
];

 

 

 
 

 
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
  "Treasurer",
  "Media",
];

/* =========================================================
   INITIAL SIBLING
========================================================= */

const emptySibling = (): Sibling => ({
  name: "",
  age: "",
  marital_status: "",
  occupation: "",
});

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData: FormData = {
  full_name: "",
  surname: "",
  mobile: "",
  email: "",
  occupation: "",
  gender: "",
  date_of_birth: "",

  address: "",
  location: "",
  district: "",
  mandal: "",
  sangham: "",
  location_name: "",
   
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

const labelClass =
  "mb-2 block text-sm font-medium text-gray-700";

/* =========================================================
   HELPERS
========================================================= */

const calculateAge = (dob: string) => {
  if (!dob) return 0;

  const birthDate = new Date(dob);
  const today = new Date();

  let age =
    today.getFullYear() -
    birthDate.getFullYear();

  const monthDifference =
    today.getMonth() -
    birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 &&
      today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================================================
   PAGE
========================================================= */

export default function MembershipPage() {
  const [formData, setFormData] =
    useState<FormData>({
      ...initialFormData,
    });

  const [errors, setErrors] =
    useState<ErrorState>({});

  const [loading, setLoading] =
    useState(false);

  /* PHOTO */
  const [photo, setPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string>("");

  /* CONSENT */
  const [consent, setConsent] =
    useState(false);

  /* SIBLING COUNTS */
  const [brotherCount, setBrotherCount] =
    useState(0);

  const [sisterCount, setSisterCount] =
    useState(0);

  /* LOCATION */
  const selectedDistrict =
    formData.district &&
    telanganaData[formData.district]
      ? telanganaData[formData.district]
      : null;

  /* =========================================================
     ERROR HELPERS
  ========================================================= */

  const setFieldError = (
    field: string,
    message: string
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  };

  const clearFieldError = (
    field: string
  ) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[field];
      return updated;
    });
  };

  const getInputClass = (
    field: string
  ) => {
    return `${inputClass} ${
      errors[field]
        ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-100"
        : ""
    }`;
  };

  const ErrorMessage = ({
    field,
  }: {
    field: string;
  }) => {
    if (!errors[field]) return null;

    return (
      <p className="mt-1 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    );
  };

  /* =========================================================
     PHOTO CHANGE
  ========================================================= */

  const handlePhotoChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPhoto(null);
      setPhotoPreview("");
      return;
    }

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

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setPhoto(null);
      setPhotoPreview("");
      e.target.value = "";

      setFieldError(
        "photo",
        "Photo size must be less than 5 MB"
      );

      toast.error(
        "Photo must be less than 5 MB"
      );

      return;
    }

    setPhoto(file);

    setPhotoPreview(
      URL.createObjectURL(file)
    );

    clearFieldError("photo");
  };

  /* =========================================================
     NORMAL CHANGE
  ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    /* MOBILE */
    if (name === "mobile") {
      const onlyNumbers =
        value.replace(/\D/g, "");

      if (onlyNumbers.length > 10) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        mobile: onlyNumbers,
      }));

      if (!onlyNumbers) {
        setFieldError(
          "mobile",
          "Mobile number is required"
        );
      } else if (
        !/^[6-9]\d{9}$/.test(
          onlyNumbers
        )
      ) {
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

      const nameValue =
        value.trim();

      if (!nameValue) {
        setFieldError(
          "full_name",
          "Full name is required"
        );
      } else if (
        nameValue.length < 3
      ) {
        setFieldError(
          "full_name",
          "Minimum 3 characters required"
        );
      } else if (
        !/^[A-Za-z\s.'-]+$/.test(
          nameValue
        )
      ) {
        setFieldError(
          "full_name",
          "Only letters and spaces are allowed"
        );
      } else {
        clearFieldError(
          "full_name"
        );
      }

      return;
    }

    /* SURNAME */
    if (name === "surname") {
      setFormData((prev) => ({
        ...prev,
        surname: value,
      }));

      if (!value.trim()) {
        setFieldError(
          "surname",
          "Surname is required"
        );
      } else {
        clearFieldError(
          "surname"
        );
      }

      return;
    }

    /* EMAIL */
    if (name === "email") {
      setFormData((prev) => ({
        ...prev,
        email: value,
      }));

      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!value.trim()) {
        setFieldError(
          "email",
          "Email address is required"
        );
      } else if (
        !emailRegex.test(value)
      ) {
        setFieldError(
          "email",
          "Enter a valid email address"
        );
      } else {
        clearFieldError("email");
      }

      return;
    }

    /* LOCATION */
    if (name === "location") {
      setFormData((prev) => ({
        ...prev,
        location: value,
      }));

      if (!value.trim()) {
        setFieldError(
          "location",
          "Location is required"
        );
      } else {
        clearFieldError("location");
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

      const age =
        calculateAge(value);

      if (age < 18) {
        setFieldError(
          "date_of_birth",
          "Member must be 18 years or above"
        );
      } else {
        clearFieldError(
          "date_of_birth"
        );
      }

      return;
    }

    /* PAYMENT DATE */
    if (
      name ===
        "mahashaba_payment_date" ||
      name ===
        "sangam_payment_date"
    ) {
      const today =
        getTodayDate();

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
      name ===
        "mahashaba_amount_paid" ||
      name ===
        "sangam_amount_paid"
    ) {
      if (
        value !== "" &&
        Number(value) < 0
      ) {
        setFieldError(
          name,
          "Amount cannot be negative"
        );
      } else if (
        value !== "" &&
        Number(value) <= 0
      ) {
        setFieldError(
          name,
          "Amount must be greater than 0"
        );
      } else {
        clearFieldError(name);
      }
    }

    /* PAYMENT STATUS */
    if (
      name ===
        "mahashaba_payment_status" &&
      value === "Free"
    ) {
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

    if (
      name ===
        "sangam_payment_status" &&
      value === "Free"
    ) {
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      clearFieldError(name);
    }
  };

  /* =========================================================
     DISTRICT
  ========================================================= */

  const handleDistrictChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const district =
      e.target.value;

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
        `District selected: ${district.replaceAll(
          "_",
          " "
        )}`
      );
    }
  };

  /* =========================================================
     MANDAL
  ========================================================= */

  const handleMandalChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const mandal =
      e.target.value;

    setFormData((prev) => ({
      ...prev,
      mandal,
      sangham: "",
    }));

    clearFieldError("mandal");
    clearFieldError("sangham");
  };

  /* =========================================================
     EXECUTIVE BODY
  ========================================================= */

  const handleExecutiveBodyChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const executive_body =
      e.target.value;

    setFormData((prev) => {
      if (
        executive_body ===
        "State Body"
      ) {
        return {
          ...prev,
          executive_body,
          district: "",
          mandal: "",
          sangham: "",
        };
      }

      if (
        executive_body ===
        "District Body"
      ) {
        return {
          ...prev,
          executive_body,
          mandal: "",
          sangham: "",
        };
      }

      if (
        executive_body ===
        "Mandal Body"
      ) {
        return {
          ...prev,
          executive_body,
          sangham: "",
        };
      }

      return {
        ...prev,
        executive_body,
      };
    });

    clearFieldError(
      "executive_body"
    );

    clearFieldError("district");
    clearFieldError("mandal");
    clearFieldError("sangham");

    toast.success(
      `${executive_body} selected`
    );
  };

  /* =========================================================
     BROTHER COUNT
  ========================================================= */

  const handleBrotherCountChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(
      e.target.value
    );

    setBrotherCount(count);

    setFormData((prev) => ({
      ...prev,
      brothers: Array.from(
        { length: count },
        (_, index) =>
          prev.brothers[index] ||
          emptySibling()
      ),
    }));
  };

  /* =========================================================
     SISTER COUNT
  ========================================================= */

  const handleSisterCountChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const count = Number(
      e.target.value
    );

    setSisterCount(count);

    setFormData((prev) => ({
      ...prev,
      sisters: Array.from(
        { length: count },
        (_, index) =>
          prev.sisters[index] ||
          emptySibling()
      ),
    }));
  };

  /* =========================================================
     SIBLING CHANGE
  ========================================================= */

  const handleSiblingChange = (
    type: "brothers" | "sisters",
    index: number,
    field: keyof Sibling,
    value: string
  ) => {
    setFormData((prev) => {
      const updated = [
        ...prev[type],
      ];

      updated[index] = {
        ...updated[index],
        [field]: value,
      };

      return {
        ...prev,
        [type]: updated,
      };
    });
  };

  /* =========================================================
     LOCATION CAPTURE
  ========================================================= */

  const captureLocation = () => {
    if (
      typeof navigator ===
        "undefined" ||
      !navigator.geolocation
    ) {
      toast.error(
        "Location is not supported by this browser"
      );
      return;
    }

    toast.loading(
      "Getting your location...",
      {
        id: "location-loading",
      }
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude =
          position.coords.latitude.toString();

        const longitude =
          position.coords.longitude.toString();

        setFormData((prev) => ({
          ...prev,
          latitude,
          longitude,
        }));

        toast.dismiss(
          "location-loading"
        );

        toast.success(
          "Location captured successfully"
        );
      },
      () => {
        toast.dismiss(
          "location-loading"
        );

        toast.error(
          "Unable to get location. Please allow location access."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = (): boolean => {
    const newErrors: ErrorState =
      {};

    /* FULL NAME */
    const name =
      formData.full_name.trim();

    if (!name) {
      newErrors.full_name =
        "Full name is required";
    } else if (
      name.length < 3
    ) {
      newErrors.full_name =
        "Minimum 3 characters required";
    } else if (
      !/^[A-Za-z\s.'-]+$/.test(name)
    ) {
      newErrors.full_name =
        "Only letters and spaces are allowed";
    }

    /* SURNAME */
    if (
      !formData.surname.trim()
    ) {
      newErrors.surname =
        "Surname is required";
    }

    /* MOBILE */
    if (
      !/^[6-9]\d{9}$/.test(
        formData.mobile
      )
    ) {
      newErrors.mobile =
        "Enter a valid 10-digit Indian mobile number";
    }

    /* EMAIL */
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !formData.email.trim()
    ) {
      newErrors.email =
        "Email address is required";
    } else if (
      !emailRegex.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    /* OCCUPATION */
    if (
      !formData.occupation.trim()
    ) {
      newErrors.occupation =
        "Occupation is required";
    }

    /* LOCATION */
    if (
      !formData.location.trim()
    ) {
      newErrors.location =
        "Location is required";
    }

    /* GENDER */
    if (!formData.gender) {
      newErrors.gender =
        "Please select gender";
    }

    /* DOB */
    if (
      !formData.date_of_birth
    ) {
      newErrors.date_of_birth =
        "Date of birth is required";
    } else if (
      calculateAge(
        formData.date_of_birth
      ) < 18
    ) {
      newErrors.date_of_birth =
        "Member must be 18 years or above";
    }

    /* PHOTO */
    if (!photo) {
      newErrors.photo =
        "Member photo is required";
    }

    
    /* EXECUTIVE BODY */
    if (
      !formData.executive_body
    ) {
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
      ].includes(
        formData.executive_body
      ) &&
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
      ].includes(
        formData.executive_body
      ) &&
      !formData.mandal
    ) {
      newErrors.mandal =
        "Please select Mandal";
    }

    /* SANGHAM */
    if (
      formData.executive_body ===
        "Sangham Body" &&
      !formData.sangham
    ) {
      newErrors.sangham =
        "Please select Sangham";
    }

    /* MAHASHABA STATUS */
    if (
      !formData.mahashaba_payment_status
    ) {
      newErrors.mahashaba_payment_status =
        "Please select Mahashaba payment status";
    }

    /* MAHASHABA PAID */
    if (
      formData.mahashaba_payment_status ===
      "Paid"
    ) {
      if (
        !formData.mahashaba_payment_method
      ) {
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
        Number(
          formData.mahashaba_amount_paid
        ) <= 0
      ) {
        newErrors.mahashaba_amount_paid =
          "Please enter a valid Mahashaba amount";
      }

      if (
        !formData.mahashaba_payment_date
      ) {
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
    if (
      !formData.sangam_payment_status
    ) {
      newErrors.sangam_payment_status =
        "Please select Sangam payment status";
    }

    /* SANGAM PAID */
    if (
      formData.sangam_payment_status ===
      "Paid"
    ) {
      if (
        !formData.sangam_payment_method
      ) {
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
        Number(
          formData.sangam_amount_paid
        ) <= 0
      ) {
        newErrors.sangam_amount_paid =
          "Please enter a valid Sangam amount";
      }

      if (
        !formData.sangam_payment_date
      ) {
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

    /* CONSENT */
    if (!consent) {
      newErrors.consent =
        "Please agree to the declaration before submitting";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length >
      0
    ) {
      toast.error(
        "Please correct the highlighted fields"
      );

      return false;
    }

    return true;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    /*
     * EXTRA SAFETY:
     * Never submit without consent.
     */
    if (!consent) {
      setFieldError(
        "consent",
        "Please agree to the declaration before submitting"
      );

      toast.error(
        "Please agree to the declaration before submitting"
      );

      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    const loadingToast =
      toast.loading(
        "Registering membership..."
      );

    try {
      const executiveBody =
        formData.executive_body?.trim() ||
        "State Body";

      const designation =
        formData.designation?.trim() ||
        "Member";

      const body = new FormData();

      /* BASIC */
      body.append(
        "full_name",
        formData.full_name.trim()
      );

      body.append(
        "surname",
        formData.surname.trim()
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

      /* LOCATION */
      body.append(
        "address",
        formData.address || ""
      );

      body.append(
        "location",
        formData.location.trim()
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

       

  
      

       
      /* MAHASHABA */
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

      /* SANGAM */
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

      /* BODY */
      body.append(
        "executive_body",
        executiveBody
      );

      body.append(
        "designation",
        designation
      );

      /* CONSENT */
      body.append(
        "consent",
        String(consent)
      );

      /* PHOTO */
      if (photo) {
        body.append(
          "photo",
          photo
        );
      }

      console.log(
        "Submitting membership registration..."
      );

      console.log(
        "Photo:",
        photo?.name || "No photo"
      );

      console.log(
        "Consent:",
        consent
      );

      console.log(
        "Location:",
        formData.location
      );

      const apiUrl = (
        process.env
          .NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000"
      ).replace(/\/$/, "");

      const apiEndpoint =
        `${apiUrl}/membership-register`;

      console.log(
        "Membership API:",
        apiEndpoint
      );

      const response =
        await fetch(
          apiEndpoint,
          {
            method: "POST",
            body,
          }
        );

      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      let data: any = null;

      if (
        contentType.includes(
          "application/json"
        )
      ) {
        data =
          await response.json();
      } else {
        const text =
          await response.text();

        data = {
          message: text,
        };
      }

      console.log(
        "Membership API response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          Array.isArray(
            data?.message
          )
            ? data.message.join(
                ", "
              )
            : data?.message ||
                `Registration failed (${response.status})`
        );
      }

      toast.dismiss(
        loadingToast
      );

      const memberId =
        data?.member_id ||
        data?.data?.member_id ||
        "";

      toast.success(
        `Membership registration successful!${
          memberId
            ? ` Member ID: ${memberId}`
            : ""
        }`,
        {
          duration: 6000,
        }
      );

      /* RESET */
      setFormData({
        ...initialFormData,
      });

      setPhoto(null);
      setPhotoPreview("");

      setBrotherCount(0);
      setSisterCount(0);

      setConsent(false);

      setErrors({});
    } catch (err) {
      console.error(
        "MEMBERSHIP REGISTRATION ERROR:",
        err
      );

      toast.dismiss(
        loadingToast
      );

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

  /* =========================================================
     PAYMENT SECTION
  ========================================================= */

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
      formData[statusName] ===
      "Paid";

    return (
      <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mb-5 mt-1 text-xs text-gray-500">
          Enter payment details if payment has been made.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>
              Payment Status *
            </label>

            <select
              name={statusName}
              value={
                formData[
                  statusName
                ]
              }
              onChange={handleChange}
              className={getInputClass(
                statusName
              )}
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

            <ErrorMessage
              field={statusName}
            />
          </div>

          {paid && (
            <>
              <div>
                <label className={labelClass}>
                  Payment Method *
                </label>

                <select
                  name={methodName}
                  value={
                    formData[
                      methodName
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  className={getInputClass(
                    methodName
                  )}
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

                <ErrorMessage
                  field={methodName}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Receipt Number *
                </label>

                <input
                  name={receiptName}
                  value={
                    formData[
                      receiptName
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter Receipt Number"
                  maxLength={50}
                  className={getInputClass(
                    receiptName
                  )}
                />

                <ErrorMessage
                  field={receiptName}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Amount Paid *
                </label>

                <input
                  type="number"
                  min="1"
                  step="0.01"
                  name={amountName}
                  value={
                    formData[
                      amountName
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Enter Amount Paid"
                  className={getInputClass(
                    amountName
                  )}
                />

                <ErrorMessage
                  field={amountName}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Payment Date *
                </label>

                <input
                  type="date"
                  name={dateName}
                  value={
                    formData[
                      dateName
                    ]
                  }
                  onChange={
                    handleChange
                  }
                  max={getTodayDate()}
                  className={getInputClass(
                    dateName
                  )}
                />

                <ErrorMessage
                  field={dateName}
                />
              </div>
            </>
          )}
        </div>
      </section>
    );
  };

  /* =========================================================
     SIBLING ROW
  ========================================================= */

   

  /* =========================================================
     RETURN
  ========================================================= */

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

          <div className="space-y-7 p-5 sm:p-8">

            {/* SERVICE */}

            <section className="rounded-3xl border border-rose-200 bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6 shadow-sm sm:p-8">
              <div className="text-center">
                <div className="mb-2 text-3xl">
                  🙏
                </div>

                <h2 className="text-xl font-bold uppercase tracking-wide text-rose-700 sm:text-2xl">
                  SERVICE IS OUR MOTTO
                </h2>

                <p className="mx-auto mt-4 max-w-4xl text-sm leading-7 text-gray-700 sm:text-base">
                  This matrimonial website is intended to sustain
                  and serve our community for a long time with
                  your wholehearted support. Our aim is to provide
                  safe, accountable and good connectivity for our
                  unmarried youth and married couples and to
                  strengthen the Vysya community.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-green-200 bg-white p-5 text-center shadow-sm">
                  <div className="mb-3 text-3xl">
                    🆓
                  </div>

                  <h3 className="text-base font-bold text-green-700">
                    FREE REGISTRATION
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Registration available for 99 days
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-200 bg-white p-5 text-center shadow-sm">
                  <div className="mb-3 text-3xl">
                    📅
                  </div>

                  <h3 className="text-base font-bold text-blue-700">
                    EXTENSION
                  </h3>

                  <p className="mt-2 text-sm text-gray-600">
                    Can be extended up to 180 days
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-white p-5 text-center shadow-sm">
                  <div className="mb-3 text-3xl">
                    🤝
                  </div>

                  <h3 className="text-base font-bold text-amber-700">
                    COMMUNITY SUPPORT
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    Voluntary three-digit contribution where applicable
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-rose-100 bg-white px-5 py-4 text-center">
                <p className="text-sm font-semibold leading-6 text-rose-700">
                  Registration is offered free for the initial
                  99 days. Extension support up to 180 days may
                  be facilitated through a voluntary contribution.
                </p>
              </div>
            </section>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7"
            >

              {/* MEMBER DETAILS */}

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
                      value={
                        formData.full_name
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter Full Name"
                      minLength={3}
                      maxLength={100}
                      className={getInputClass(
                        "full_name"
                      )}
                    />

                    <ErrorMessage
                      field="full_name"
                    />
                  </div>

                  {/* SURNAME */}

                  <div>
                    <label className={labelClass}>
                      Surname *
                    </label>

                    <input
                      name="surname"
                      value={
                        formData.surname
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter Surname"
                      maxLength={100}
                      className={getInputClass(
                        "surname"
                      )}
                    />

                    <ErrorMessage
                      field="surname"
                    />
                  </div>

                  {/* MOBILE */}

                  <div>
                    <label className={labelClass}>
                      Mobile Number *
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={
                        formData.mobile
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter 10 Digit Mobile Number"
                      inputMode="numeric"
                      maxLength={10}
                      className={getInputClass(
                        "mobile"
                      )}
                    />

                    <ErrorMessage
                      field="mobile"
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label className={labelClass}>
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter Email Address"
                      maxLength={150}
                      className={getInputClass(
                        "email"
                      )}
                    />

                    <ErrorMessage
                      field="email"
                    />
                  </div>

                  {/* GENDER */}

                  <div>
                    <label className={labelClass}>
                      Gender *
                    </label>

                    <select
                      name="gender"
                      value={
                        formData.gender
                      }
                      onChange={
                        handleChange
                      }
                      className={getInputClass(
                        "gender"
                      )}
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

                    <ErrorMessage
                      field="gender"
                    />
                  </div>

                  {/* DOB */}

                  <div>
                    <label className={labelClass}>
                      Date of Birth *
                    </label>

                    <input
                      type="date"
                      name="date_of_birth"
                      value={
                        formData.date_of_birth
                      }
                      onChange={
                        handleChange
                      }
                      max={getTodayDate()}
                      className={getInputClass(
                        "date_of_birth"
                      )}
                    />

                    <ErrorMessage
                      field="date_of_birth"
                    />

                    {formData.date_of_birth &&
                      calculateAge(
                        formData.date_of_birth
                      ) >= 0 && (
                        <p className="mt-1 text-xs text-gray-500">
                          Age:{" "}
                          {calculateAge(
                            formData.date_of_birth
                          )}{" "}
                          years
                        </p>
                      )}
                  </div>

                  {/* OCCUPATION */}

                  <div>
                    <label className={labelClass}>
                      Occupation *
                    </label>

                    <input
                      name="occupation"
                      value={
                        formData.occupation
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter Occupation"
                      maxLength={100}
                      className={getInputClass(
                        "occupation"
                      )}
                    />

                    <ErrorMessage
                      field="occupation"
                    />
                  </div>

                  {/* LOCATION */}

                  <div>
                    <label className={labelClass}>
                      Location *
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={
                        formData.location ?? ""
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter Location"
                      maxLength={100}
                      className={getInputClass(
                        "location"
                      )}
                    />

                    <ErrorMessage
                      field="location"
                    />
                  </div>

                  {/* PHOTO */}

                  <div>
                    <label className={labelClass}>
                      Member Photo *
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row">

                      {/* CAMERA */}

                      <label className="flex cursor-pointer items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">
                        📷 Take Photo

                        <input
                          type="file"
                          name="photo"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          capture="environment"
                          onChange={
                            handlePhotoChange
                          }
                          className="hidden"
                        />
                      </label>

                      {/* GALLERY */}

                      <label className="flex cursor-pointer items-center justify-center rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">
                        🖼️ Choose Photo

                        <input
                          type="file"
                          name="photo"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={
                            handlePhotoChange
                          }
                          className="hidden"
                        />
                      </label>
                    </div>

                    {photoPreview && (
                      <div className="mt-4">
                        <img
                          src={photoPreview}
                          alt="Selected member"
                          className="h-32 w-32 rounded-2xl object-cover border border-rose-200 shadow-sm"
                        />
                      </div>
                    )}

                    <ErrorMessage
                      field="photo"
                    />
                  </div>
                </div>
              </section>

              {/* COMMUNITY MEMBERSHIP DETAILS */}

              <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">

                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Community Membership Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Select the body in which the member is associated.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

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
                      value={
                        formData.executive_body
                      }
                      onChange={
                        handleExecutiveBodyChange
                      }
                      className={getInputClass(
                        "executive_body"
                      )}
                    >
                      <option value="">
                        Select Executive Body
                      </option>

                      {executiveBodies.map(
                        (body) => (
                          <option
                            key={body}
                            value={body}
                          >
                            {body}
                          </option>
                        )
                      )}
                    </select>

                    <ErrorMessage
                      field="executive_body"
                    />
                  </div>

                  {/* DISTRICT */}

                  {[
                    "District Body",
                    "Mandal Body",
                    "Sangham Body",
                  ].includes(
                    formData.executive_body
                  ) && (
                    <div>
                      <label className={labelClass}>
                        District *
                      </label>

                      <select
                        name="district"
                        value={
                          formData.district
                        }
                        onChange={
                          handleDistrictChange
                        }
                        className={getInputClass(
                          "district"
                        )}
                      >
                        <option value="">
                          Select District
                        </option>

                        {districtList.map(
                          (district) => (
                            <option
                              key={district}
                              value={district}
                            >
                              {district.replaceAll(
                                "_",
                                " "
                              )}
                            </option>
                          )
                        )}
                      </select>

                      <ErrorMessage
                        field="district"
                      />
                    </div>
                  )}

                  {/* MANDAL */}

                  {[
                    "Mandal Body",
                    "Sangham Body",
                  ].includes(
                    formData.executive_body
                  ) && (
                    <div>
                      <label className={labelClass}>
                        Mandal *
                      </label>

                      <select
                        name="mandal"
                        value={
                          formData.mandal
                        }
                        onChange={
                          handleMandalChange
                        }
                        disabled={
                          !formData.district ||
                          !selectedDistrict
                        }
                        className={`${getInputClass(
                          "mandal"
                        )} ${
                          !formData.district
                            ? "cursor-not-allowed bg-gray-100"
                            : ""
                        }`}
                      >
                        <option value="">
                          {!formData.district
                            ? "Select District First"
                            : selectedDistrict.mandals.length
                            ? "Select Mandal"
                            : "No Mandals Available"}
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

                      <ErrorMessage
                        field="mandal"
                      />
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
                        value={
                          formData.sangham
                        }
                        onChange={(e) => {
                          const sangham =
                            e.target.value;

                          setFormData(
                            (prev) => ({
                              ...prev,
                              sangham,
                            })
                          );

                          if (sangham) {
                            clearFieldError(
                              "sangham"
                            );
                          }
                        }}
                        disabled={
                          !formData.district ||
                          !formData.mandal ||
                          !selectedDistrict
                        }
                        className={`${getInputClass(
                          "sangham"
                        )} ${
                          !formData.district ||
                          !formData.mandal
                            ? "cursor-not-allowed bg-gray-100"
                            : ""
                        }`}
                      >
                        <option value="">
                          {!formData.district
                            ? "Select District First"
                            : !formData.mandal
                            ? "Select Mandal First"
                            : selectedDistrict.sanghams.length
                            ? "Select Sangham"
                            : "No Sanghams Available"}
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

                      <ErrorMessage
                        field="sangham"
                      />
                    </div>
                  )}

                  {/* DESIGNATION */}

                  <div>
                    <label className={labelClass}>
                      Designation *
                    </label>

                    <select
                      name="designation"
                      value={
                        formData.designation
                      }
                      onChange={
                        handleChange
                      }
                      className={getInputClass(
                        "designation"
                      )}
                    >
                      <option value="">
                        Select Designation
                      </option>

                      {designations.map(
                        (designation) => (
                          <option
                            key={designation}
                            value={
                              designation
                            }
                          >
                            {designation}
                          </option>
                        )
                      )}
                    </select>

                    <ErrorMessage
                      field="designation"
                    />
                  </div>
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

              {/* DECLARATION */}

              <section className="rounded-3xl border border-rose-200 bg-rose-50/50 p-5 sm:p-6">

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-rose-700 sm:text-xl">
                    Declaration & Divine Blessings
                  </h2>
                </div>

                <div className="rounded-2xl border border-rose-100 bg-white p-5">
                  <p className="text-sm leading-7 text-gray-700 sm:text-base">
                    I/We solemnly declare that the
                    information/data provided by me/us in
                    this Matrimonial Biodata is true and
                    correct to the best of my/our knowledge
                    and belief. I/We seek the divine blessings
                    of our Arya Vysya Goddess{" "}
                    <span className="font-bold text-rose-700">
                      Sri Vasavi Kanyaka Parameshwari Ammavaru
                    </span>{" "}
                    for a happy, successful and prosperous
                    matrimonial alliance.
                  </p>
                </div>

                {/* CONSENT CHECKBOX */}

                <div
                  className={`mt-5 rounded-2xl border p-4 transition ${
                    errors.consent
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <label className="flex cursor-pointer items-start gap-3">

                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        const checked =
                          e.target.checked;

                        setConsent(
                          checked
                        );

                        if (checked) {
                          clearFieldError(
                            "consent"
                          );
                        } else {
                          setFieldError(
                            "consent",
                            "Please agree to the declaration before submitting"
                          );
                        }
                      }}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-rose-600"
                    />

                    <span className="text-sm leading-6 text-gray-700">
                      I agree that the information provided by
                      me/us is true and correct, and I give my
                      consent to use this information for the
                      purpose of matrimonial and community
                      services.
                      <span className="ml-1 font-semibold text-rose-600">
                        *
                      </span>
                    </span>
                  </label>

                  <ErrorMessage
                    field="consent"
                  />
                </div>
              </section>

              {/* SUBMIT */}

              <div className="flex flex-col items-center justify-center gap-3 border-t border-gray-100 pt-7">

                <button
                  type="submit"
                  disabled={loading}
                  className={`h-12 w-full rounded-xl px-8 text-sm font-semibold text-white shadow-md transition sm:w-auto sm:min-w-[220px] ${
                    loading
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-rose-600 hover:bg-rose-700 hover:shadow-lg"
                  }`}
                >
                  {loading
                    ? "Registering..."
                    : "Register Now"}
                </button>

                <p className="text-center text-xs text-gray-500">
                  By submitting this registration, you
                  confirm that the information provided is
                  true and correct.
                </p>
              </div>
            </form>

            {/* EXISTING MEMBERS */}

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

