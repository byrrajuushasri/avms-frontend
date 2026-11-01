"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Cropper, { type Area } from "react-easy-crop";

import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

import type { CountryCode } from "libphonenumber-js";

import toast, { Toaster } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type LocationItem = {
  id: number;
  name: string;
  type?: "district" | "mandal" | "sangham";
  parent_id?: number | null;
};

type FormData = {
  full_name: string;
  surname: string;
  father_name: string;
  mobile: string;
  email: string;
  occupation: string;
  gender: string;
  date_of_birth: string;
  gotram: string;

  is_existing_mahashaba_member: string;
  is_existing_sangam_member: string;

  location: string;
  district: string;
  mandal: string;
  sangham: string;

  executive_body: string;
  designation: string;
};

type ErrorState = Record<string, string>;

const PHOTO_MAX_SIZE = 5 * 1024 * 1024;
const CROPPED_PHOTO_SIZE = 512;

async function createCroppedPhoto(
  imageSource: string,
  cropArea: Area
): Promise<Blob> {
  const image = new Image();
  image.src = imageSource;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = CROPPED_PHOTO_SIZE;
  canvas.height = CROPPED_PHOTO_SIZE;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Your browser could not prepare the cropped photo.");
  }

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    image,
    cropArea.x,
    cropArea.y,
    cropArea.width,
    cropArea.height,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Your browser could not create the cropped photo."));
        }
      },
      "image/jpeg",
      0.9
    );
  });
}



const preferredCountries: CountryCode[] = [
  "IN",
  "US",
  "GB",
  "AE",
  "CA",
  "AU",
  "SG",
  "SA",
  "QA",
  "KW",
  "OM",
];

const countryList: CountryCode[] = [
  ...preferredCountries,
  ...getCountries().filter(
    (country) => !preferredCountries.includes(country)
  ),
];
/* =========================================================
   GOTRAM LIST
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
   EDUCATION LIST
========================================================= */

const educationList = [
  "SSC",
  "Intermediate",
  "ITI",
  "Diploma",
  "B.A",
  "B.Com",
  "B.Sc",
  "B.Tech",
  "B.E",
  "B.Pharmacy",
  "LLB",
  "M.A",
  "M.Com",
  "M.Sc",
  "M.Tech",
  "M.E",
  "M.Pharmacy",
  "MBA",
  "MCA",
  "LLM",
  "MBBS",
  "MD",
  "CA",
  "CMA",
  "Ph.D",
  "Other",
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
  "Member with Matrimony",
  "General Secretary",
  "President",
  "Vice President",
  "Treasurer",
  "Media",
];

/* =========================================================
   INITIAL FORM
========================================================= */

const initialFormData: FormData = {
  full_name: "",
  surname: "",
  father_name: "",
  mobile: "",
  email: "",
  occupation: "",
  gender: "",
  date_of_birth: "",
  gotram: "",

  is_existing_mahashaba_member: "",
  is_existing_sangam_member: "",

  location: "",
  district: "",
  mandal: "",
  sangham: "",

  executive_body: "State Body",
  designation: "",
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

  const birthDate = new Date(`${dob}T00:00:00`);
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
  const [showFemalePhonePopup, setShowFemalePhonePopup] =
    useState(false);

  /* PHOTO */
  const [photo, setPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string>("");

  const [cropImage, setCropImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<Area | null>(null);
  const [savingCrop, setSavingCrop] = useState(false);

  /* LOCATION */
  const [districts, setDistricts] =
    useState<LocationItem[]>([]);

  const [mandals, setMandals] =
    useState<LocationItem[]>([]);

  const [locationLoading, setLocationLoading] =
    useState(false);

  /* GOTRAM SEARCH */
  const [gotramSearch, setGotramSearch] =
    useState("");

  const [showGotramList, setShowGotramList] =
    useState(false);
    const [selectedCountry, setSelectedCountry] =
  useState<CountryCode>("IN");

const [mobileNational, setMobileNational] =
  useState("");

useEffect(() => {
  if (!cropImage) return;
  return () => URL.revokeObjectURL(cropImage);
}, [cropImage]);

useEffect(() => {
  if (!photoPreview) return;
  return () => URL.revokeObjectURL(photoPreview);
}, [photoPreview]);

  /* =========================================================
     API URL
  ========================================================= */

  const apiUrl = (
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  /* =========================================================
     FILTER GOTRAM
  ========================================================= */

  const filteredGotramList =
    gotramList.filter((gotram) =>
      gotram
        .toLowerCase()
        .startsWith(
          gotramSearch.trim().toLowerCase()
        )
    );

  /* =========================================================
     LOAD DISTRICTS
  ========================================================= */

  useEffect(() => {
    const loadDistricts = async () => {
      setLocationLoading(true);

      try {
        const response = await fetch(
          `${apiUrl}/locations/districts`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load districts (${response.status})`
          );
        }

        const result = await response.json();

        const data = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

        setDistricts(data);

        if (data.length === 0) {
          toast.error("No districts available");
        }
      } catch (error) {
        console.error(
          "District loading error:",
          error
        );

        toast.error(
          "Unable to load districts. Please try again."
        );

        setDistricts([]);
      } finally {
        setLocationLoading(false);
      }
    };

    loadDistricts();
  }, [apiUrl]);

  /* =========================================================
     LOAD MANDALS
  ========================================================= */

  useEffect(() => {
    const selectedDistrict =
      districts.find(
        (district) =>
          district.name === formData.district
      );

    if (
      !formData.district ||
      !selectedDistrict?.id
    ) {
      setMandals([]);
      return;
    }

    const loadMandals = async () => {
      setLocationLoading(true);

      try {
        const response = await fetch(
          `${apiUrl}/locations/districts/${selectedDistrict.id}/mandals`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to load mandals (${response.status})`
          );
        }

        const result = await response.json();

        const data = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : [];

        setMandals(data);
      } catch (error) {
        console.error(
          "Mandal loading error:",
          error
        );

        toast.error(
          "Unable to load mandals"
        );

        setMandals([]);
      } finally {
        setLocationLoading(false);
      }
    };

    loadMandals();
  }, [
    apiUrl,
    districts,
    formData.district,
  ]);

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

  const handlePhotoChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setPhoto(null);
      setPhotoPreview("");
      setCropImage(null);

      setFieldError(
        "photo",
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      );

      toast.error(
        "Invalid photo format"
      );

      return;
    }

    if (file.size > PHOTO_MAX_SIZE) {
      setPhoto(null);
      setPhotoPreview("");
      setCropImage(null);

      setFieldError(
        "photo",
        "Photo size must be less than 5 MB"
      );

      toast.error(
        "Photo must be less than 5 MB"
      );

      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = imageUrl;

    try {
      await image.decode();
      if (image.naturalWidth < 256 || image.naturalHeight < 256) {
        URL.revokeObjectURL(imageUrl);
        setFieldError("photo", "Photo must be at least 256 × 256 pixels.");
        toast.error("Choose a higher-resolution photo.");
        return;
      }

      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setCropImage(imageUrl);
    } catch (error) {
      URL.revokeObjectURL(imageUrl);
      console.error("Unable to read selected membership photo:", error);
      setFieldError("photo", "This photo could not be opened. Choose another image.");
      toast.error("Unable to open this photo.");
    }
  };

  const handleCropComplete = async () => {
    if (!cropImage || !croppedAreaPixels || savingCrop) return;

    setSavingCrop(true);
    try {
      const croppedBlob = await createCroppedPhoto(
        cropImage,
        croppedAreaPixels
      );
      const croppedFile = new File([croppedBlob], "member-photo.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      setPhoto(croppedFile);
      setPhotoPreview(URL.createObjectURL(croppedFile));
      setCropImage(null);
      clearFieldError("photo");
    } catch (error) {
      console.error("Unable to crop membership photo:", error);
      setFieldError(
        "photo",
        error instanceof Error
          ? error.message
          : "Unable to crop this photo. Please try another image."
      );
      toast.error("Unable to crop this photo.");
    } finally {
      setSavingCrop(false);
    }
  };

  /* =========================================================
     NORMAL CHANGE
  ========================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

  

if (name === "mobile") {
  const onlyNumbers = value.replace(/\D/g, "");
  const maxDigits = selectedCountry === "IN" ? 10 : 15;

  if (onlyNumbers.length > maxDigits) {
    return;
  }

  setMobileNational(onlyNumbers);

  if (!onlyNumbers) {
    setFormData((prev) => ({
      ...prev,
      mobile: "",
    }));

    setFieldError("mobile", "Mobile number is required");
    return;
  }

  const parsedNumber = parsePhoneNumberFromString(
    onlyNumbers,
    selectedCountry
  );

  if (!parsedNumber?.isValid()) {
    setFormData((prev) => ({
      ...prev,
      mobile: "",
    }));

    setFieldError(
      "mobile",
      selectedCountry === "IN"
        ? "Please enter a valid 10-digit Indian mobile number"
        : "Enter a valid mobile number for the selected country"
    );

    return;
  }

  setFormData((prev) => ({
    ...prev,
    mobile: parsedNumber.number,
  }));

  clearFieldError("mobile");
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
      } else if (
        !/^[A-Za-z\s.'-]+$/.test(
          value.trim()
        )
      ) {
        setFieldError(
          "surname",
          "Only letters and spaces are allowed"
        );
      } else {
        clearFieldError("surname");
      }

      return;
    }

    /* FATHER NAME */
    if (name === "father_name") {
      setFormData((prev) => ({
        ...prev,
        father_name: value,
      }));

      if (!value.trim()) {
        setFieldError(
          "father_name",
          "Father name is required"
        );
      } else if (
        !/^[A-Za-z\s.'-]+$/.test(
          value.trim()
        )
      ) {
        setFieldError(
          "father_name",
          "Only letters and spaces are allowed"
        );
      } else {
        clearFieldError(
          "father_name"
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
        !emailRegex.test(
          value.trim()
        )
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

    /* OCCUPATION */
    if (name === "occupation") {
      setFormData((prev) => ({
        ...prev,
        occupation: value,
      }));

      if (!value.trim()) {
        setFieldError(
          "occupation",
          "Occupation is required"
        );
      } else {
        clearFieldError("occupation");
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

      if (value > getTodayDate()) {
        setFieldError(
          "date_of_birth",
          "Date of birth cannot be in the future"
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

    /* EXISTING MEMBERS */
    if (
      name ===
        "is_existing_mahashaba_member" ||
      name ===
        "is_existing_sangam_member"
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (!value) {
        setFieldError(
          name,
          "Please select Yes or No"
        );
      } else {
        clearFieldError(name);
      }

      return;
    }

    /* GENDER */
    if (name === "gender") {
      setFormData((prev) => ({
        ...prev,
        gender: value,
      }));

      if (!value) {
        setFieldError(
          "gender",
          "Please select gender"
        );
      } else {
        clearFieldError("gender");
      }

      return;
    }

    /* DESIGNATION */
    if (name === "designation") {
      setFormData((prev) => ({
        ...prev,
        designation: value,
      }));

      if (!value) {
        setFieldError(
          "designation",
          "Please select Designation"
        );
      } else {
        clearFieldError(
          "designation"
        );
      }

      return;
    }

    /* DEFAULT */
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value.trim()) {
      clearFieldError(name);
    }
  };

  /* =========================================================
     GOTRAM SEARCH CHANGE
  ========================================================= */

 const handleGotramSearch = (
  e: ChangeEvent<HTMLInputElement>
) => {
  const value = e.target.value;

  setGotramSearch(value);

  // Keep typed Gotram in form data,
  // including custom Gotram names.
  setFormData((prev) => ({
    ...prev,
    gotram: value,
  }));

  setShowGotramList(true);

  if (!value.trim()) {
    setFieldError("gotram", "Gotram is required");
  } else {
    clearFieldError("gotram");
  }
};

  /* =========================================================
     SELECT GOTRAM
  ========================================================= */

  const handleGotramSelect = (
    gotram: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      gotram,
    }));

    setGotramSearch(gotram);
    setShowGotramList(false);
    clearFieldError("gotram");
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

    setMandals([]);

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
     SANGHAM
  ========================================================= */

  const handleSanghamChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const sangham =
      e.target.value;

    setFormData((prev) => ({
      ...prev,
      sangham,
    }));

    if (sangham.trim()) {
      clearFieldError("sangham");
    } else {
      setFieldError(
        "sangham",
        "Please enter Sangham"
      );
    }
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

    if (
      executive_body ===
      "State Body"
    ) {
      setMandals([]);
    }

    clearFieldError(
      "executive_body"
    );

    clearFieldError("district");
    clearFieldError("mandal");
    clearFieldError("sangham");

    if (executive_body) {
      toast.success(
        `${executive_body} selected`
      );
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = (): boolean => {
    const newErrors: ErrorState =
      {};

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

    const surname =
      formData.surname.trim();

    if (!surname) {
      newErrors.surname =
        "Surname is required";
    } else if (
      !/^[A-Za-z\s.'-]+$/.test(
        surname
      )
    ) {
      newErrors.surname =
        "Only letters and spaces are allowed";
    }

    const fatherName =
      formData.father_name.trim();

    if (!fatherName) {
      newErrors.father_name =
        "Father name is required";
    } else if (
      !/^[A-Za-z\s.'-]+$/.test(
        fatherName
      )
    ) {
      newErrors.father_name =
        "Only letters and spaces are allowed";
    }

  const parsedMobile = parsePhoneNumberFromString(
  formData.mobile
);

if (!formData.mobile) {
  newErrors.mobile = "Mobile number is required";
} else if (!parsedMobile?.isValid()) {
  newErrors.mobile = "Please enter a valid mobile number";
} else if (
  selectedCountry === "IN" &&
  mobileNational.length !== 10
) {
  newErrors.mobile = "Please enter exactly 10 digits";
}

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
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

    if (
      !formData.occupation.trim()
    ) {
      newErrors.occupation =
        "Occupation is required";
    }

    if (
      !formData.location.trim()
    ) {
      newErrors.location =
        "Location is required";
    }

    if (!formData.gotram.trim()) {
      newErrors.gotram =
        "Gotram is required";
    }

    if (!formData.gender) {
      newErrors.gender =
        "Please select gender";
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth =
        "Date of birth is required";
    } else if (
      formData.date_of_birth >
      getTodayDate()
    ) {
      newErrors.date_of_birth =
        "Date of birth cannot be in the future";
    } else if (
      calculateAge(
        formData.date_of_birth
      ) < 18
    ) {
      newErrors.date_of_birth =
        "Member must be 18 years or above";
    }

    if (!photo) {
      newErrors.photo =
        "Member photo is required";
    }

    if (
      !formData.is_existing_mahashaba_member
    ) {
      newErrors.is_existing_mahashaba_member =
        "Please select Yes or No";
    }

    if (
      !formData.is_existing_sangam_member
    ) {
      newErrors.is_existing_sangam_member =
        "Please select Yes or No";
    }

    if (!formData.executive_body) {
      newErrors.executive_body =
        "Please select Executive Body";
    }

    if (!formData.designation) {
      newErrors.designation =
        "Please select Designation";
    }

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

    if (
      formData.executive_body ===
        "Sangham Body" &&
      !formData.sangham.trim()
    ) {
      newErrors.sangham =
        "Please enter Sangham";
    }

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length > 0
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

      const body =
        new FormData();

      body.append(
        "full_name",
        formData.full_name.trim()
      );

      body.append(
        "surname",
        formData.surname.trim()
      );

      body.append(
        "father_name",
        formData.father_name.trim()
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
        "gotram",
        formData.gotram.trim()
      );

      body.append(
        "is_existing_mahashaba_member",
        formData.is_existing_mahashaba_member
      );

      body.append(
        "is_existing_sangam_member",
        formData.is_existing_sangam_member
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
        formData.sangham.trim()
      );

      body.append(
        "executive_body",
        executiveBody
      );

      body.append(
        "designation",
        designation
      );

      if (photo) {
        body.append(
          "photo",
          photo
        );
      }

      const apiEndpoint =
        `${apiUrl}/membership-register`;

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

      setFormData({
        ...initialFormData,
      });
setSelectedCountry("IN");
setMobileNational("");

      setGotramSearch("");
      setShowGotramList(false);

      setPhoto(null);
      setPhotoPreview("");

      setErrors({});
      setMandals([]);

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

      {cropImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-6">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="membership-photo-crop-title"
            className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6"
          >
            <h2
              id="membership-photo-crop-title"
              className="text-lg font-bold text-gray-900"
            >
              Crop your member photo
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Drag and zoom to frame your photo. It will be saved as a square
              512 × 512 image.
            </p>

            <div className="relative mt-4 h-[min(60vh,24rem)] overflow-hidden rounded-xl bg-gray-900">
              <Cropper
                image={cropImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                minZoom={1}
                maxZoom={3}
                cropShape="rect"
                showGrid
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, areaPixels) =>
                  setCroppedAreaPixels(areaPixels)
                }
              />
            </div>

            <div className="mt-4 flex items-center gap-3 text-sm text-gray-700">
              <span className="shrink-0 font-medium">Zoom</span>
              <button
                type="button"
                aria-label="Zoom out"
                title="Zoom out"
                disabled={savingCrop || zoom <= 1}
                onClick={() =>
                  setZoom((current) =>
                    Math.max(1, Number((current - 0.1).toFixed(2)))
                  )
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-lg font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                -
              </button>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(event) => setZoom(Number(event.target.value))}
                className="w-full accent-rose-600"
              />
              <span className="w-12 shrink-0 text-center text-xs text-gray-500">
                {zoom.toFixed(1)}x
              </span>
              <button
                type="button"
                aria-label="Zoom in"
                title="Zoom in"
                disabled={savingCrop || zoom >= 3}
                onClick={() =>
                  setZoom((current) =>
                    Math.min(3, Number((current + 0.1).toFixed(2)))
                  )
                }
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-lg font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={savingCrop}
                onClick={() => setCropImage(null)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingCrop || !croppedAreaPixels}
                onClick={() => void handleCropComplete()}
                className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingCrop ? "Cropping..." : "Use This Photo"}
              </button>
            </div>
          </section>
        </div>
      )}

      {showFemalePhonePopup && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowFemalePhonePopup(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="female-phone-notice-title"
            className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-bold text-red-600">
              !
            </div>
            <h2
              id="female-phone-notice-title"
              className="mt-4 text-center text-lg font-bold text-gray-900"
            >
              Important phone number notice
            </h2>
            <p className="mt-2 text-center text-sm leading-6 text-red-600">
              Female candidates must enter a parent&apos;s phone number only.
              Their own phone number is not allowed.
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => setShowFemalePhonePopup(false)}
              className="mt-5 w-full rounded-xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
            >
              Confirm
            </button>
          </section>
        </div>
      )}

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

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-7"
            >

              {/* =================================================
                  MEMBER DETAILS
              ================================================== */}

              <section>

                <div className="mb-5">

                  <h2 className="text-lg font-semibold text-gray-900">
                    Member Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Please enter the member&apos;s basic details.
                  </p>

                </div>


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
                      minLength={3}
                      maxLength={100}
                      className={getInputClass(
                        "full_name"
                      )}
                    />

                    <ErrorMessage field="full_name" />
                  </div>


                  {/* SURNAME */}
                  <div>
                    <label className={labelClass}>
                      Surname *
                    </label>

                    <input
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Enter Surname"
                      maxLength={100}
                      className={getInputClass(
                        "surname"
                      )}
                    />

                    <ErrorMessage field="surname" />
                  </div>


                  {/* FATHER NAME */}
                  <div>
                    <label className={labelClass}>
                      Father Name *
                    </label>

                    <input
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      placeholder="Enter Father Name"
                      maxLength={100}
                      className={getInputClass(
                        "father_name"
                      )}
                    />

                    <ErrorMessage field="father_name" />
                  </div>


{/* INTERNATIONAL MOBILE */}
<div className="w-full min-w-0">
  <label className={labelClass}>
    Mobile Number *
  </label>

  <div className="mt-1 flex w-full min-w-0 items-stretch gap-2">
    {/* Country Code */}
    <div className="w-[125px] shrink-0 sm:w-[150px]">
      <select
        value={selectedCountry}
        aria-label="Country calling code"
        onChange={(e) => {
          const country = e.target.value as CountryCode;

          setSelectedCountry(country);

          const parsedNumber = mobileNational
            ? parsePhoneNumberFromString(mobileNational, country)
            : undefined;

          const internationalNumber = mobileNational
            ? parsedNumber?.number ??
              `+${getCountryCallingCode(country)}${mobileNational}`
            : "";

          setFormData((prev) => ({
            ...prev,
            mobile: internationalNumber,
          }));

          if (!mobileNational) {
            clearFieldError("mobile");
          } else if (!parsedNumber?.isValid()) {
            setFieldError(
              "mobile",
              "Enter a valid mobile number for the selected country"
            );
          } else {
            clearFieldError("mobile");
          }
        }}
        className={`${getInputClass("mobile")} h-11 w-full min-w-0 cursor-pointer px-2 text-sm`}
      >
        {countryList.map((country) => (
          <option key={country} value={country}>
            {country} (+{getCountryCallingCode(country)})
          </option>
        ))}
      </select>
    </div>

    {/* Phone Number */}
    <div className="min-w-0 flex-1">
      <input
  type="tel"
  name="mobile"
  value={mobileNational}
  onChange={handleChange}
  placeholder={
    selectedCountry === "IN"
      ? "Enter 10-digit mobile number"
      : "Enter phone number"
  }
  autoComplete="tel-national"
  inputMode="numeric"
  maxLength={selectedCountry === "IN" ? 10 : 15}
  className={`${getInputClass("mobile")} h-11 w-full min-w-0 px-3`}
/>
    </div>
  </div>

  <p className="mt-1 text-xs text-gray-500">
    Calling code: +{getCountryCallingCode(selectedCountry)}
  </p>

  {formData.gender === "Female" && (
    <p className="mt-2 text-sm font-semibold text-red-600">
      Female candidates must enter a parent&apos;s phone number only. Their own
      phone number is not allowed.
    </p>
  )}

  <ErrorMessage field="mobile" />
</div>     



                  {/* GENDER */}
                  <div>
                    <label className={labelClass}>
                      Gender *
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={(event) => {
                        handleChange(event);
                        if (event.target.value === "Female") {
                          setShowFemalePhonePopup(true);
                        }
                      }}
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

                      <option value="Transgender">
                        Transgender
                      </option>
                    </select>

                    <ErrorMessage field="gender" />
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
                      maxLength={150}
                      className={getInputClass(
                        "email"
                      )}
                    />

                    <ErrorMessage field="email" />
                  </div>




                  {/* =================================================
                      SIMPLE DATE PICKER
                  ================================================== */}
                  <div>
                    <label className={labelClass}>
                      Date of Birth *
                    </label>

                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      max={getTodayDate()}
                      className={getInputClass(
                        "date_of_birth"
                      )}
                    />

                    <ErrorMessage field="date_of_birth" />

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
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Enter Occupation"
                      maxLength={100}
                      className={getInputClass(
                        "occupation"
                      )}
                    />

                    <ErrorMessage field="occupation" />
                  </div>


                  {/* =================================================
                      SEARCHABLE GOTRAM
                  ================================================== */}
            {/* SEARCHABLE GOTRAM */}
                  <div className="relative">
                    <label className={labelClass}>
                      Gotram *
                    </label>

                    <input
                      type="text"
                      name="gotram"
                      value={gotramSearch}
                      onChange={handleGotramSearch}
                      onFocus={() => setShowGotramList(true)}
                      onBlur={() => setShowGotramList(false)}
                      placeholder="Type Gotram..."
                      autoComplete="off"
                      maxLength={100}
                      className={getInputClass("gotram")}
                    />

                    {/* SHOW MATCHING GOTRAMS ONLY */}
                    {showGotramList && filteredGotramList.length > 0 && (
                      <div className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg">
                        {filteredGotramList.map((gotram) => (
                          <button
                            type="button"
                            key={gotram}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleGotramSelect(gotram);
                            }}
                            className="block w-full border-b border-gray-100 px-4 py-2.5 text-left text-sm text-gray-700 transition hover:bg-rose-50 hover:text-rose-700 last:border-b-0"
                          >
                            {gotram}
                          </button>
                        ))}
                      </div>
                    )}

                    <ErrorMessage field="gotram" />
                  </div>


                  {/* LOCATION */}
                  <div>
                    <label className={labelClass}>
                      Location *
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter Location"
                      maxLength={100}
                      className={getInputClass(
                        "location"
                      )}
                    />

                    <ErrorMessage field="location" />
                  </div>


                  {/* PHOTO */}
                  <div>

                    <label className={labelClass}>
                      Member Photo *
                    </label>

                    <label className="flex cursor-pointer items-center justify-center rounded-xl border border-rose-200 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50">

                      🖼️ Choose Photo

                      <input
                        type="file"
                        name="photo"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />

                    </label>

                    <p className="mt-2 text-xs text-gray-500">
                      JPG, PNG or WebP; up to 5 MB and at least 256 × 256
                      pixels. Your final photo is cropped to 512 × 512.
                    </p>

                    {photoPreview && (
                      <div className="mt-4">
                        <img
                          src={photoPreview}
                          alt="Cropped member photo preview"
                          className="h-40 w-40 rounded-2xl border border-rose-200 object-cover shadow-sm"
                        />
                      </div>
                    )}

                    <ErrorMessage field="photo" />

                  </div>


                  {/* EXISTING MAHASHABA MEMBER */}
                  <div>

                    <label className={labelClass}>
                      Are you an existing Mahashaba member? *
                    </label>

                    <select
                      name="is_existing_mahashaba_member"
                      value={
                        formData.is_existing_mahashaba_member
                      }
                      onChange={handleChange}
                      className={getInputClass(
                        "is_existing_mahashaba_member"
                      )}
                    >
                      <option value="">
                        Select
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>
                    </select>

                    <ErrorMessage
                      field="is_existing_mahashaba_member"
                    />

                  </div>


                  {/* EXISTING SANGAM MEMBER */}
                  <div>

                    <label className={labelClass}>
                      Are you an existing Sangam member? *
                    </label>

                    <select
                      name="is_existing_sangam_member"
                      value={
                        formData.is_existing_sangam_member
                      }
                      onChange={handleChange}
                      className={getInputClass(
                        "is_existing_sangam_member"
                      )}
                    >
                      <option value="">
                        Select
                      </option>

                      <option value="Yes">
                        Yes
                      </option>

                      <option value="No">
                        No
                      </option>
                    </select>

                    <ErrorMessage
                      field="is_existing_sangam_member"
                    />

                  </div>
 {/* DESIGNATION */}
                  <div>

                    <label className={labelClass}>
                      Position Details *
                    </label>

                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
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
                            value={designation}
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


              {/* =================================================
                  COMMUNITY MEMBERSHIP DETAILS
              ================================================== */}

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
                      value={formData.executive_body}
                      onChange={handleExecutiveBodyChange}
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
                        value={formData.district}
                        onChange={handleDistrictChange}
                        disabled={
                          locationLoading &&
                          districts.length === 0
                        }
                        className={getInputClass(
                          "district"
                        )}
                      >
                        <option value="">
                          {locationLoading
                            ? "Loading Districts..."
                            : "Select District"}
                        </option>

                        {districts.map(
                          (district) => (
                            <option
                              key={district.id}
                              value={district.name}
                            >
                              {district.name.replaceAll(
                                "_",
                                " "
                              )}
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
                  ].includes(
                    formData.executive_body
                  ) && (
                    <div>

                      <label className={labelClass}>
                        Mandal *
                      </label>

                      <select
                        name="mandal"
                        value={formData.mandal}
                        onChange={handleMandalChange}
                        disabled={
                          !formData.district ||
                          mandals.length === 0
                        }
                        className={`${getInputClass(
                          "mandal"
                        )} ${
                          !formData.district ||
                          mandals.length === 0
                            ? "cursor-not-allowed bg-gray-100"
                            : ""
                        }`}
                      >
                        <option value="">
                          {!formData.district
                            ? "Select District First"
                            : locationLoading
                            ? "Loading Mandals..."
                            : mandals.length
                            ? "Select Mandal"
                            : "No Mandals Available"}
                        </option>

                        {mandals.map(
                          (mandal) => (
                            <option
                              key={mandal.id}
                              value={mandal.name}
                            >
                              {mandal.name}
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

                      <input
                        type="text"
                        name="sangham"
                        value={formData.sangham}
                        onChange={handleSanghamChange}
                        placeholder="Enter Sangham Name"
                        maxLength={150}
                        disabled={
                          !formData.district ||
                          !formData.mandal
                        }
                        className={`${getInputClass(
                          "sangham"
                        )} ${
                          !formData.district ||
                          !formData.mandal
                            ? "cursor-not-allowed bg-gray-100"
                            : ""
                        }`}
                      />

                      <ErrorMessage field="sangham" />

                    </div>
                  )}


                 
                </div>

              </section>


              {/* =================================================
                  SUBMIT
              ================================================== */}

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

          </div>
        </div>
      </div>
    </>
  );
}
