
"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type DistrictData = {
  mandals: string[];
  sanghams: string[];
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
  location: string;
  district: string;
  mandal: string;
  sangham: string;

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

type Sibling = {
  name: string;
  age: string;
  marital_status: string;
  occupation: string;
};

/* =========================================================
   TELANGANA DISTRICT DATA
========================================================= */

const telanganaData: Record<string, DistrictData> = {
  Adilabad: {
    mandals: [
      "Adilabad",
      "Bela",
      "Bheempur",
      "Boath",
      "Gudihathnur",
      "Ichoda",
      "Indervelly",
      "Jainad",
      "Mavala",
      "Narnoor",
      "Neradigonda",
      "Sirikonda",
      "Talamadugu",
      "Tamsi",
      "Utnoor",
    ],
    sanghams: [],
  },

  Bhadradri_Kothagudem: {
    mandals: [
      "Aswaraopeta",
      "Burgampahad",
      "Chandrugonda",
      "Chunchupally",
      "Dummugudem",
      "Gundala",
      "Kothagudem",
      "Manuguru",
      "Mulakalapally",
      "Palvancha",
      "Sujathanagar",
      "Tekulapalle",
      "Yellandu",
    ],
    sanghams: [],
  },

  Hanamkonda: {
    mandals: [
      "Hanamkonda",
      "Hasanparthy",
      "Kazipet",
      "Khila Warangal",
      "Nadikuda",
      "Parkal",
      "Shayampet",
    ],
    sanghams: [],
  },

  Hyderabad: {
    mandals: [
      "Amberpet",
      "Asifnagar",
      "Bahadurpura",
      "Bandlaguda",
      "Charminar",
      "Golconda",
      "Himayatnagar",
      "Khairatabad",
      "Musheerabad",
      "Nampally",
      "Saidabad",
      "Secunderabad",
    ],
    sanghams: [],
  },

  Jagtial: {
    mandals: [
      "Beerpur",
      "Buggaram",
      "Dharmapuri",
      "Gollapalli",
      "Ibrahimpatnam",
      "Jagitial",
      "Kathlapur",
      "Korutla",
      "Mallapur",
      "Mallial",
      "Medipalli",
      "Metpalli",
      "Pegadapalli",
      "Raikal",
      "Sarangapur",
      "Velgatur",
    ],
    sanghams: [],
  },

  Jangaon: {
    mandals: [
      "Bachannapet",
      "Devaruppula",
      "Ghanpur",
      "Jangaon",
      "Kodakandla",
      "Lingalaghanpur",
      "Narmetta",
      "Palakurthi",
      "Raghunathpalle",
      "Station Ghanpur",
      "Zaffergadh",
    ],
    sanghams: [],
  },

  Jayashankar_Bhupalpally: {
    mandals: [
      "Bhupalpally",
      "Chityal",
      "Ghanpur Mulug",
      "Kataram",
      "Mahadevpur",
      "Malharrao",
      "Mogullapalle",
      "Palimela",
      "Regonda",
      "Tekumatla",
    ],
    sanghams: [],
  },

  Jogulamba_Gadwal: {
    mandals: [
      "Alampur",
      "Dharur",
      "Gadwal",
      "Ghattu",
      "Ieeja",
      "Itikyal",
      "Kaloor Timmanadoddi",
      "Maldakal",
      "Manopad",
      "Rajoli",
      "Undavelly",
      "Waddepally",
    ],
    sanghams: [],
  },

  Kamareddy: {
    mandals: [
      "Banswada",
      "Bhiknoor",
      "Bichkunda",
      "Bibipet",
      "Domakonda",
      "Gandhari",
      "Jukkal",
      "Kamareddy",
      "Lingampet",
      "Machareddy",
      "Madnur",
      "Nagireddypet",
      "Nizamsagar",
      "Pedda Kodapgal",
      "Rajampet",
      "Ramareddy",
      "Tadwai",
      "Yellareddy",
    ],
    sanghams: [],
  },

  Karimnagar: {
    mandals: [
      "Chigurumamidi",
      "Choppadandi",
      "Gangadhara",
      "Ganneruvaram",
      "Huzurabad",
      "Jammikunta",
      "Karimnagar",
      "Keshavapatnam",
      "Manakondur",
      "Ramadugu",
      "Shankarapatnam",
      "Thimmapur",
      "Veenavanka",
    ],
    sanghams: [],
  },

  Khammam: {
    mandals: [
      "Bonakal",
      "Chinthakani",
      "Enkoor",
      "Kallur",
      "Khammam Rural",
      "Khammam Urban",
      "Konijerla",
      "Kusumanchi",
      "Madhira",
      "Mudigonda",
      "Nelakondapalle",
      "Penuballi",
      "Raghunathapalem",
      "Sathupalli",
      "Singareddypalem",
      "Thallada",
      "Vemsoor",
      "Wyra",
      "Yerrupalem",
    ],
    sanghams: [],
  },

  Komaram_Bheem_Asifabad: {
    mandals: [
      "Asifabad",
      "Bejjur",
      "Chintalamanepally",
      "Dahegaon",
      "Jainoor",
      "Kagaznagar",
      "Kerameri",
      "Koutala",
      "Lingapur",
      "Rebbena",
      "Sirpur",
      "Sirpur U",
      "Tiryani",
      "Wankidi",
    ],
    sanghams: [],
  },

  Mahabubabad: {
    mandals: [
      "Bayyaram",
      "Chinnagudur",
      "Danthalapalle",
      "Dornakal",
      "Garla",
      "Gudur",
      "Kesamudram",
      "Kuravi",
      "Mahabubabad",
      "Maripeda",
      "Narsimhulapet",
      "Nellikudur",
      "Peddavangara",
      "Thorrur",
    ],
    sanghams: [],
  },

  Mahbubnagar: {
    mandals: [
      "Addakal",
      "Balanagar",
      "Bhoothpur",
      "Chinna Chintakunta",
      "Devarakadra",
      "Gandeed",
      "Hanwada",
      "Jadcherla",
      "Koilkonda",
      "Mahbubnagar",
      "Midjil",
      "Moosapet",
      "Nawabpet",
    ],
    sanghams: [],
  },

  Mancherial: {
    mandals: [
      "Bellampalle",
      "Bheemaram",
      "Bheemini",
      "Chennur",
      "Dandepally",
      "Hajipur",
      "Jaipur",
      "Jannaram",
      "Kannepalli",
      "Kasipet",
      "Kotapalle",
      "Luxettipet",
      "Mancherial",
      "Mandamarri",
      "Naspur",
      "Vemanpalle",
    ],
    sanghams: [],
  },

  Medchal_Malkajgiri: {
    mandals: [
      "Alwal",
      "Bachupally",
      "Dundigal",
      "Ghatkesar",
      "Kapra",
      "Keesara",
      "Kukatpally",
      "Medchal",
      "Malkajgiri",
      "Quthbullapur",
      "Shamirpet",
      "Uppal",
    ],
    sanghams: [],
  },

  Mulugu: {
    mandals: [
      "Eturnagaram",
      "Govindaraopet",
      "Kannaigudem",
      "Mangapet",
      "Mulugu",
      "Tadvai",
      "Venkatapur",
      "Venkatapuram",
      "Wazeed",
    ],
    sanghams: [],
  },

  Nagarkurnool: {
    mandals: [
      "Achampet",
      "Amrabad",
      "Bijinepally",
      "Charakonda",
      "Kalwakurthy",
      "Kodair",
      "Lingal",
      "Nagarkurnool",
      "Padara",
      "Peddakothapally",
      "Pentlavelli",
      "Telkapalle",
      "Tadoor",
      "Uppununthala",
      "Vangoor",
      "Veldanda",
      "Thimmajipet",
    ],
    sanghams: [],
  },

  Nalgonda: {
    mandals: [
      "Chandur",
      "Chityal",
      "Choutuppal",
      "Damaracherla",
      "Devarakonda",
      "Kattangur",
      "Kethepalle",
      "Marriguda",
      "Miryalaguda",
      "Munugode",
      "Nakrekal",
      "Nalgonda",
      "Nampally",
      "Narketpally",
      "Nidamanur",
      "Peddavoora",
      "Shaligouraram",
      "Tipparthi",
      "Vemulapally",
    ],
    sanghams: [],
  },

  Narayanpet: {
    mandals: [
      "Damaragidda",
      "Dhanwada",
      "Kosgi",
      "Krishna",
      "Maddur",
      "Maganoor",
      "Makthal",
      "Marikal",
      "Narayanpet",
      "Narwa",
      "Utkoor",
    ],
    sanghams: [],
  },

  Nirmal: {
    mandals: [
      "Basar",
      "Bhainsa",
      "Dilawarpur",
      "Kaddam Peddur",
      "Khanapur",
      "Kubeer",
      "Kuntala",
      "Laxmanchanda",
      "Lokeshwaram",
      "Mamada",
      "Mudhole",
      "Narsapur",
      "Nirmal",
      "Sarangapur",
      "Soan",
      "Tanoor",
    ],
    sanghams: [],
  },

  Nizamabad: {
    mandals: [
      "Armoor",
      "Balkonda",
      "Bheemgal",
      "Bodhan",
      "Dichpally",
      "Jakranpally",
      "Kammarpalle",
      "Kotgiri",
      "Makloor",
      "Mendora",
      "Mortad",
      "Mugpal",
      "Nandipet",
      "Navipet",
      "Nizamabad",
      "Ranjal",
      "Rudrur",
      "Sirikonda",
      "Varni",
      "Yergatla",
    ],
    sanghams: [],
  },

  Peddapalli: {
    mandals: [
      "Anthargaon",
      "Dharmaram",
      "Eligaid",
      "Julapalli",
      "Kamanpur",
      "Manthani",
      "Odela",
      "Peddapalli",
      "Ramagiri",
      "Ramagundam",
      "Sultanabad",
      "Srirampur",
    ],
    sanghams: [],
  },

  Rajanna_Sircilla: {
    mandals: [
      "Boinpally",
      "Chandurthi",
      "Ellanthakunta",
      "Gambhiraopet",
      "Illanthakunta",
      "Konaraopet",
      "Mustabad",
      "Rudrangi",
      "Sircilla",
      "Thangallapalli",
      "Vemulawada",
      "Yellareddypet",
    ],
    sanghams: [],
  },

  Rangareddy: {
    mandals: [
      "Abdullapurmet",
      "Chevella",
      "Farooqnagar",
      "Gandipet",
      "Hayathnagar",
      "Ibrahimpatnam",
      "Kandukur",
      "Maheshwaram",
      "Manchal",
      "Moinabad",
      "Rajendranagar",
      "Saroornagar",
      "Serilingampally",
      "Shabad",
      "Shamshabad",
      "Shankarpalle",
      "Yacharam",
    ],
    sanghams: [],
  },

  Sangareddy: {
    mandals: [
      "Ameenpur",
      "Andole",
      "Gummadidala",
      "Hathnoora",
      "Jharasangam",
      "Jinnaram",
      "Kandi",
      "Kangti",
      "Kohir",
      "Manoor",
      "Munipally",
      "Narayankhed",
      "Nyalkal",
      "Patancheru",
      "Pulkal",
      "Raikode",
      "Ramchandrapuram",
      "Sadasivpet",
      "Sangareddy",
      "Sirgapur",
      "Vatpally",
      "Zaheerabad",
    ],
    sanghams: [],
  },

  Suryapet: {
    mandals: [
      "Atmakur",
      "Chilkur",
      "Chivvemla",
      "Garidepally",
      "Huzurnagar",
      "Jajireddygudem",
      "Kodad",
      "Mattampally",
      "Mella Cheruvu",
      "Mothey",
      "Munagala",
      "Nadigudem",
      "Nagaram",
      "Nereducherla",
      "Nuthankal",
      "Palakeedu",
      "Penpahad",
      "Suryapet",
      "Thirumalagiri",
    ],
    sanghams: [],
  },

  Vikarabad: {
    mandals: [
      "Bantwaram",
      "Basheerabad",
      "Bomraspet",
      "Dharur",
      "Doma",
      "Doulatabad",
      "Kodangal",
      "Kotepally",
      "Kulkacharla",
      "Marpalle",
      "Mominpet",
      "Nawabpet",
      "Pargi",
      "Peddemul",
      "Tandur",
      "Vikarabad",
      "Yelal",
    ],
    sanghams: [],
  },

  Wanaparthy: {
    mandals: [
      "Amarchinta",
      "Atmakur",
      "Chinnambavi",
      "Ghanpur",
      "Gopalpet",
      "Kothakota",
      "Madanapur",
      "Pangal",
      "Pebbair",
      "Peddamandadi",
      "Revally",
      "Srirangapur",
      "Wanaparthy",
    ],
    sanghams: [],
  },

  Warangal: {
    mandals: [
      "Atmakur",
      "Chennaraopet",
      "Duggondi",
      "Geesugonda",
      "Ghanpur",
      "Khanapur",
      "Nallabelly",
      "Narsampet",
      "Nekkonda",
      "Parvathagiri",
      "Rayaparthy",
      "Sangem",
      "Wardhannapet",
      "Warangal",
    ],
    sanghams: [],
  },

  Yadadri_Bhuvanagiri: {
    mandals: [
      "Addaguduru",
      "Alair",
      "Atmakur",
      "Bhongir",
      "Bommalaramaram",
      "Motakondur",
      "Mothkur",
      "Pochampally",
      "Rajapet",
      "Ramannapeta",
      "Turkapally",
      "Valigonda",
      "Yadagirigutta",
    ],
    sanghams: [],
  },

  Siddipet: {
    mandals: [
      "Akkannapet",
      "Bejjanki",
      "Cherial",
      "Chinnakodur",
      "Dubbak",
      "Gajwel",
      "Husnabad",
      "Jagdevpur",
      "Koheda",
      "Komuravelli",
      "Kondapak",
      "Maddur",
      "Markook",
      "Mulugu",
      "Nangnoor",
      "Raipole",
      "Siddipet",
      "Thoguta",
      "Wargal",
    ],
    sanghams: [],
  },

  Jangaon_2: {
    mandals: [],
    sanghams: [],
  },

  Kamareddy_2: {
    mandals: [],
    sanghams: [],
  },
};

/* =========================================================
   DISTRICT LIST
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
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yadadri_Bhuvanagiri",
];

/* =========================================================
   EXECUTIVE BODY / DESIGNATION
========================================================= */

const executiveBodies = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

const designations = [
  "Member",
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
  mobile: "",
  email: "",
  occupation: "",
  gender: "",
  date_of_birth: "",

  location: "",
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
   COMPONENT
========================================================= */

export default function MembershipPage() {
  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const [consent, setConsent] = useState(false);

  const [photo, setPhoto] =
    useState<File | null>(null);

  const [photoPreview, setPhotoPreview] =
    useState<string>("");

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [mahashabaCount, setMahashabaCount] =
    useState(0);

  const [sangamCount, setSangamCount] =
    useState(0);

  /* =======================================================
     SELECTED DISTRICT
  ======================================================= */

  const selectedDistrict: DistrictData =
    formData.district &&
    telanganaData[formData.district]
      ? telanganaData[formData.district]
      : {
          mandals: [],
          sanghams: [],
        };

  /* =======================================================
     INPUT CLASS
  ======================================================= */

  const getInputClass = (
    field: string
  ) => {
    return `w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
      errors[field]
        ? "border-red-500 bg-red-50 focus:ring-2 focus:ring-red-200"
        : "border-gray-300 bg-white focus:border-[#800018] focus:ring-2 focus:ring-[#800018]/20"
    }`;
  };

  /* =======================================================
     ERROR MESSAGE
  ======================================================= */

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

  /* =======================================================
     HANDLE INPUT
  ======================================================= */

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* =======================================================
     DISTRICT CHANGE
  ======================================================= */

  const handleDistrictChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const district = e.target.value;

    setFormData((prev) => ({
      ...prev,
      district,
      mandal: "",
      sangham: "",
    }));

    setErrors((prev) => ({
      ...prev,
      district: "",
      mandal: "",
      sangham: "",
    }));
  };

  /* =======================================================
     MANDAL CHANGE
  ======================================================= */

  const handleMandalChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      mandal: e.target.value,
      sangham: "",
    }));

    setErrors((prev) => ({
      ...prev,
      mandal: "",
      sangham: "",
    }));
  };

  /* =======================================================
     PHOTO
  ======================================================= */

  const handlePhotoChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo size must be below 5 MB.");
      return;
    }

    setPhoto(file);

    const previewUrl =
      URL.createObjectURL(file);

    setPhotoPreview(previewUrl);

    setErrors((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  /* =======================================================
     AGE VALIDATION
  ======================================================= */

  const calculateAge = (
    dob: string
  ): number => {
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
        today.getDate() <
          birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validateForm = () => {
    const newErrors: Record<
      string,
      string
    > = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name =
        "Please enter full name.";
    }

    if (!formData.surname.trim()) {
      newErrors.surname =
        "Please enter surname.";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile =
        "Please enter mobile number.";
    } else if (
      !/^[6-9]\d{9}$/.test(
        formData.mobile.trim()
      )
    ) {
      newErrors.mobile =
        "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Please enter email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (!formData.occupation.trim()) {
      newErrors.occupation =
        "Please enter occupation.";
    }

    if (!formData.gender) {
      newErrors.gender =
        "Please select gender.";
    }

    if (!formData.date_of_birth) {
      newErrors.date_of_birth =
        "Please select date of birth.";
    } else if (
      calculateAge(
        formData.date_of_birth
      ) < 18
    ) {
      newErrors.date_of_birth =
        "Member must be at least 18 years old.";
    }

    if (!formData.location.trim()) {
      newErrors.location =
        "Please enter location.";
    }

    if (!formData.district) {
      newErrors.district =
        "Please select district.";
    }

    if (
      selectedDistrict.mandals.length > 0 &&
      !formData.mandal
    ) {
      newErrors.mandal =
        "Please select mandal.";
    }

    if (
      selectedDistrict.sanghams.length > 0 &&
      !formData.sangham
    ) {
      newErrors.sangham =
        "Please select sangham.";
    }

    if (!formData.executive_body) {
      newErrors.executive_body =
        "Please select executive body.";
    }

    if (!formData.designation) {
      newErrors.designation =
        "Please select designation.";
    }

    if (!photo) {
      newErrors.photo =
        "Please upload member photo.";
    }

    /* MAHASHABA */

    if (
      !formData.mahashaba_payment_status
    ) {
      newErrors.mahashaba_payment_status =
        "Please select payment status.";
    }

    if (
      formData.mahashaba_payment_status ===
      "Paid"
    ) {
      if (
        !formData.mahashaba_payment_method
      ) {
        newErrors.mahashaba_payment_method =
          "Please select payment method.";
      }

      if (
        !formData.mahashaba_receipt_number.trim()
      ) {
        newErrors.mahashaba_receipt_number =
          "Please enter receipt number.";
      }

      if (
        !formData.mahashaba_amount_paid
      ) {
        newErrors.mahashaba_amount_paid =
          "Please enter amount paid.";
      }

      if (
        !formData.mahashaba_payment_date
      ) {
        newErrors.mahashaba_payment_date =
          "Please select payment date.";
      }
    }

    /* SANGAM */

    if (
      !formData.sangam_payment_status
    ) {
      newErrors.sangam_payment_status =
        "Please select payment status.";
    }

    if (
      formData.sangam_payment_status ===
      "Paid"
    ) {
      if (
        !formData.sangam_payment_method
      ) {
        newErrors.sangam_payment_method =
          "Please select payment method.";
      }

      if (
        !formData.sangam_receipt_number.trim()
      ) {
        newErrors.sangam_receipt_number =
          "Please enter receipt number.";
      }

      if (
        !formData.sangam_amount_paid
      ) {
        newErrors.sangam_amount_paid =
          "Please enter amount paid.";
      }

      if (
        !formData.sangam_payment_date
      ) {
        newErrors.sangam_payment_date =
          "Please select payment date.";
      }
    }

    if (!consent) {
      newErrors.consent =
        "Please agree to the declaration.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  /* =======================================================
     PAYMENT SECTION
  ======================================================= */

  const renderPaymentSection = (
    title: string,
    prefix:
      | "mahashaba"
      | "sangam"
  ) => {
    const isMahashaba =
      prefix === "mahashaba";

    const statusField =
      isMahashaba
        ? "mahashaba_payment_status"
        : "sangam_payment_status";

    const methodField =
      isMahashaba
        ? "mahashaba_payment_method"
        : "sangam_payment_method";

    const receiptField =
      isMahashaba
        ? "mahashaba_receipt_number"
        : "sangam_receipt_number";

    const amountField =
      isMahashaba
        ? "mahashaba_amount_paid"
        : "sangam_amount_paid";

    const dateField =
      isMahashaba
        ? "mahashaba_payment_date"
        : "sangam_payment_date";

    const statusValue =
      formData[statusField];

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#800018]">
            {title}
          </h3>

          <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-[#800018]">
            {isMahashaba
              ? "Membership"
              : "Sangam"}
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* STATUS */}

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Payment Status *
            </label>

            <select
              name={statusField}
              value={formData[statusField]}
              onChange={handleChange}
              className={getInputClass(
                statusField
              )}
            >
              <option value="">
                Select Status
              </option>
              <option value="Paid">
                Paid
              </option>
              <option value="Pending">
                Pending
              </option>
              <option value="Not Paid">
                Not Paid
              </option>
            </select>

            <ErrorMessage
              field={statusField}
            />
          </div>

          {/* CONDITIONAL DETAILS */}

          {statusValue === "Paid" && (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Payment Method *
                </label>

                <select
                  name={methodField}
                  value={formData[methodField]}
                  onChange={handleChange}
                  className={getInputClass(
                    methodField
                  )}
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
                  <option value="Cheque">
                    Cheque
                  </option>
                </select>

                <ErrorMessage
                  field={methodField}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Receipt Number *
                </label>

                <input
                  type="text"
                  name={receiptField}
                  value={formData[receiptField]}
                  onChange={handleChange}
                  placeholder="Enter receipt number"
                  className={getInputClass(
                    receiptField
                  )}
                />

                <ErrorMessage
                  field={receiptField}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Amount Paid *
                </label>

                <input
                  type="number"
                  min="0"
                  name={amountField}
                  value={formData[amountField]}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  className={getInputClass(
                    amountField
                  )}
                />

                <ErrorMessage
                  field={amountField}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Payment Date *
                </label>

                <input
                  type="date"
                  name={dateField}
                  value={formData[dateField]}
                  onChange={handleChange}
                  className={getInputClass(
                    dateField
                  )}
                />

                <ErrorMessage
                  field={dateField}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error(
        "Please correct the highlighted fields."
      );
      return;
    }

    if (!photo) {
      toast.error(
        "Please upload member photo."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const body = new window.FormData();

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

      body.append(
        "location",
        formData.location.trim()
      );

      body.append(
        "district",
        formData.district
      );

      body.append(
        "mandal",
        formData.mandal
      );

      body.append(
        "sangham",
        formData.sangham
      );

      body.append(
        "mahashaba_payment_status",
        formData.mahashaba_payment_status
      );

      body.append(
        "mahashaba_payment_method",
        formData.mahashaba_payment_method
      );

      body.append(
        "mahashaba_receipt_number",
        formData.mahashaba_receipt_number
      );

      body.append(
        "mahashaba_amount_paid",
        formData.mahashaba_amount_paid
      );

      body.append(
        "mahashaba_payment_date",
        formData.mahashaba_payment_date
      );

      body.append(
        "sangam_payment_status",
        formData.sangam_payment_status
      );

      body.append(
        "sangam_payment_method",
        formData.sangam_payment_method
      );

      body.append(
        "sangam_receipt_number",
        formData.sangam_receipt_number
      );

      body.append(
        "sangam_amount_paid",
        formData.sangam_amount_paid
      );

      body.append(
        "sangam_payment_date",
        formData.sangam_payment_date
      );

      body.append(
        "executive_body",
        formData.executive_body
      );

      body.append(
        "designation",
        formData.designation
      );

      body.append(
        "consent",
        String(consent)
      );

      body.append(
        "photo",
        photo
      );

      const apiUrl = (
        process.env.NEXT_PUBLIC_BACKEND_URL ||
        "http://localhost:5000"
      ).replace(/\/$/, "");

      const apiEndpoint =
        `${apiUrl}/membership-register`;

      console.log(
        "MEMBERSHIP API:",
        apiEndpoint
      );

      const response = await fetch(
        apiEndpoint,
        {
          method: "POST",
          body,
        }
      );

      let result: any = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok) {
        const message =
          result?.message ||
          "Registration failed. Please try again.";

        throw new Error(
          Array.isArray(message)
            ? message.join(", ")
            : message
        );
      }

      toast.success(
        result?.message ||
          "Membership registration submitted successfully!"
      );

      /* RESET */

      setFormData(initialFormData);
      setPhoto(null);
      setPhotoPreview("");
      setConsent(false);
      setMahashabaCount(0);
      setSangamCount(0);
      setErrors({});

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "MEMBERSHIP REGISTER ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      {/* ===================================================
          TOP BANNER
      =================================================== */}

      <section className="border-b border-pink-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-bold tracking-[0.25em] text-[#800018]">
            SERVICE IS OUR MOTTO
          </p>

          <h1 className="font-serif text-3xl font-bold text-[#800018] sm:text-4xl">
            Arya Vysya Membership Registration
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-gray-600 sm:text-base">
            Register as a member and become part of our
            community service initiatives.
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <span className="rounded-full bg-[#800018] px-4 py-2 text-xs font-semibold text-white">
              FREE REGISTRATION – 99 DAYS
            </span>

            <span className="rounded-full border border-[#800018] px-4 py-2 text-xs font-semibold text-[#800018]">
              EXTENSION UP TO 180 DAYS
            </span>

            <span className="rounded-full bg-pink-100 px-4 py-2 text-xs font-semibold text-[#800018]">
              COMMUNITY SUPPORT
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================
          FORM
      =================================================== */}

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-8"
        >
          {/* =================================================
              MEMBER DETAILS
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#800018]">
                Member Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Please enter the member's basic information.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* FULL NAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name *
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={getInputClass(
                    "full_name"
                  )}
                />

                <ErrorMessage field="full_name" />
              </div>

              {/* SURNAME */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Surname *
                </label>

                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Enter surname"
                  className={getInputClass(
                    "surname"
                  )}
                />

                <ErrorMessage field="surname" />
              </div>

              {/* MOBILE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={getInputClass(
                    "mobile"
                  )}
                />

                <ErrorMessage field="mobile" />
              </div>

              {/* EMAIL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email *
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className={getInputClass(
                    "email"
                  )}
                />

                <ErrorMessage field="email" />
              </div>

              {/* OCCUPATION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Occupation *
                </label>

                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Enter occupation"
                  className={getInputClass(
                    "occupation"
                  )}
                />

                <ErrorMessage
                  field="occupation"
                />
              </div>

              {/* GENDER */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Gender *
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
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
                  <option value="Other">
                    Other
                  </option>
                </select>

                <ErrorMessage field="gender" />
              </div>

              {/* DOB */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Date of Birth *
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className={getInputClass(
                    "date_of_birth"
                  )}
                />

                {formData.date_of_birth && (
                  <p className="mt-1 text-xs text-gray-500">
                    Age:{" "}
                    {calculateAge(
                      formData.date_of_birth
                    )}{" "}
                    years
                  </p>
                )}

                <ErrorMessage
                  field="date_of_birth"
                />
              </div>

              {/* LOCATION */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Village / Town / City"
                  className={getInputClass(
                    "location"
                  )}
                />

                <ErrorMessage field="location" />
              </div>
            </div>
          </section>

          {/* =================================================
              PHOTO
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#800018]">
                Member Photo
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload a clear passport-size photo.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Member preview"
                  className="h-36 w-36 rounded-xl border-4 border-pink-100 object-cover shadow"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-center text-xs text-gray-400">
                  Photo Preview
                </div>
              )}

              <div className="w-full max-w-md">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Upload Photo *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm"
                />

                <p className="mt-2 text-xs text-gray-500">
                  JPG, JPEG, PNG. Maximum size 5 MB.
                </p>

                <ErrorMessage field="photo" />
              </div>
            </div>
          </section>

          {/* =================================================
              COMMUNITY LOCATION
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#800018]">
                Community Membership Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select your district, mandal and sangham.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {/* DISTRICT */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  District *
                </label>

                <select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
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
                        {district.replace(
                          /_/g,
                          " "
                        )}
                      </option>
                    )
                  )}
                </select>

                <ErrorMessage field="district" />
              </div>

              {/* MANDAL */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Mandal
                </label>

                <select
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleMandalChange}
                  disabled={
                    !formData.district ||
                    selectedDistrict.mandals
                      .length === 0
                  }
                  className={`${getInputClass(
                    "mandal"
                  )} disabled:cursor-not-allowed disabled:bg-gray-100`}
                >
                  <option value="">
                    {selectedDistrict.mandals
                      .length > 0
                      ? "Select Mandal"
                      : "Mandal not available"}
                  </option>

                  {selectedDistrict.mandals.map(
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

              {/* SANGHAM */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Sangham
                </label>

                <select
                  name="sangham"
                  value={formData.sangham}
                  onChange={handleChange}
                  disabled={
                    !formData.district ||
                    selectedDistrict.sanghams
                      .length === 0
                  }
                  className={`${getInputClass(
                    "sangham"
                  )} disabled:cursor-not-allowed disabled:bg-gray-100`}
                >
                  <option value="">
                    {selectedDistrict.sanghams
                      .length > 0
                      ? "Select Sangham"
                      : "Sangham not available"}
                  </option>

                  {selectedDistrict.sanghams.map(
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
            </div>
          </section>

          {/* =================================================
              EXECUTIVE BODY
          ================================================= */}

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 border-b border-gray-100 pb-4">
              <h2 className="font-serif text-2xl font-bold text-[#800018]">
                Executive Body
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Executive Body *
                </label>

                <select
                  name="executive_body"
                  value={formData.executive_body}
                  onChange={handleChange}
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

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Designation *
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
              MAHASHABA PAYMENT
          ================================================= */}

          {renderPaymentSection(
            "Mahashaba Payment Details",
            "mahashaba"
          )}

          {/* =================================================
              SANGAM PAYMENT
          ================================================= */}

          {renderPaymentSection(
            "Sangam Payment Details",
            "sangam"
          )}

          {/* =================================================
              DECLARATION
          ================================================= */}

          <section className="rounded-2xl border border-[#800018]/20 bg-pink-50 p-5 shadow-sm sm:p-7">
            <h2 className="font-serif text-2xl font-bold text-[#800018]">
              Declaration & Divine Blessings
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-700">
              I/We solemnly declare that the
              information/data provided by me/us
              in this Matrimonial Biodata is true
              and correct to the best of my/our
              knowledge and belief. I/We seek the
              divine blessings of our Arya Vysya
              Goddess{" "}
              <strong>
                Sri Vasavi Kanyaka Parameshwari
                Ammavaru
              </strong>{" "}
              for a happy, successful and
              prosperous matrimonial alliance.
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(
                      e.target.checked
                    );

                    if (e.target.checked) {
                      setErrors((prev) => ({
                        ...prev,
                        consent: "",
                      }));
                    }
                  }}
                  className="mt-1 h-5 w-5 accent-[#800018]"
                />

                <span className="text-sm leading-6 text-gray-700">
                  I agree that the information
                  provided by me/us is true and
                  correct, and I give my consent to
                  use this information for the
                  purpose of matrimonial and
                  community services.
                  <strong className="ml-1 text-red-600">
                    *
                  </strong>
                </span>
              </label>

              <ErrorMessage field="consent" />
            </div>
          </section>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <div className="flex flex-col items-center gap-4 pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md rounded-xl bg-[#800018] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#650014] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting Registration..."
                : "Submit Membership Registration"}
            </button>

            <Link
              href="/membership/details"
              className="text-sm font-semibold text-[#800018] underline underline-offset-4 hover:text-[#650014]"
            >
              Already a Member? View Member Details
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

