"use client";

import { useState } from "react";

/* =========================
   TELANGANA DATA
========================= */

const telanganaData = {
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
} as const;

/* =========================
   EXECUTIVE BODY OPTIONS
========================= */

const executiveBodies = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

/* =========================
   DESIGNATION OPTIONS
========================= */

const designations = [
  "General Secretary",
  "President",
  "Vice President",
  "Joint Secretary",
  "Representative",
];

/* =========================
   COMMON CLASSES
========================= */

const inputClass =
  "w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition";

const selectClass =
  inputClass + " bg-white";

const labelClass =
  "block text-sm font-medium text-gray-700 mb-2";

/* =========================
   INITIAL FORM DATA
========================= */

const initialFormData = {
  membership_type: "",

  district: "",
  mandal: "",
  sangham: "",

  occupation: "",
  full_name: "",
  mobile: "",
  email: "",
  password: "",

  registration_fee: "",
  payment_method: "",
  transaction_id: "",
  amount_paid: "",
  payment_date: "",

  gender: "",
  date_of_birth: "",

  /* Executive Details */
  executive_member: "",
  executive_body: "",
  designation: "",
};

export default function MembershipPage() {
  const [formData, setFormData] =
    useState(initialFormData);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  /* =========================
     HANDLE NORMAL CHANGE
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     DISTRICT CHANGE
  ========================= */

  const handleDistrictChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      district: value,
      mandal: "",
      sangham: "",
    }));
  };

  /* =========================
     EXECUTIVE MEMBER CHANGE
  ========================= */

  const handleExecutiveMemberChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,

      executive_member: value,

      /*
        When No is selected,
        clear Executive Body and Designation.
      */

      ...(value === "No"
        ? {
            executive_body: "",
            designation: "",
          }
        : {}),
    }));
  };

  /* =========================
     SUBMIT FORM
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const payload: Record<string, string> = {
        ...formData,
      };

      /* =========================
         PAYMENT FIELDS
      ========================= */

      if (
        formData.registration_fee !== "Paid"
      ) {
        delete payload.payment_method;
        delete payload.transaction_id;
        delete payload.amount_paid;
        delete payload.payment_date;
      }

      /* =========================
         EXECUTIVE FIELDS
      ========================= */

      if (
        formData.executive_member !== "Yes"
      ) {
        delete payload.executive_body;
        delete payload.designation;
      }

      /* =========================
         API REQUEST
      ========================= */

      const response = await fetch(
        "http://localhost:5000/membership-register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Registration failed"
        );
      }

      console.log(
        "Registration successful:",
        data
      );

      setMessage(
        "Membership registration successful! 🎉"
      );

      setFormData(initialFormData);
    } catch (err) {
      console.error(
        "Registration Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SELECTED DISTRICT
  ========================= */

  const selectedDistrict =
    formData.district &&
    telanganaData[
      formData.district as keyof typeof telanganaData
    ];

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-rose-50
        via-pink-50
        to-white
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          shadow-2xl
          overflow-hidden
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            px-8
            py-6
            text-center
            border-b
            border-gray-100
          "
        >
          <h1
            className="
              text-2xl
              font-bold
              text-black
            "
          >
            Register Membership
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Complete the membership registration
            form
          </p>
        </div>

        {/* ================= FORM AREA ================= */}

        <div className="p-8">

          {/* ================= SUCCESS MESSAGE ================= */}

          {message && (
            <div
              className="
                mb-5
                rounded-xl
                bg-green-100
                border
                border-green-300
                text-green-700
                px-4
                py-3
                text-sm
              "
            >
              {message}
            </div>
          )}

          {/* ================= ERROR MESSAGE ================= */}

          {error && (
            <div
              className="
                mb-5
                rounded-xl
                bg-red-100
                border
                border-red-300
                text-red-700
                px-4
                py-3
                text-sm
              "
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

             {/* =====================================================
                EXECUTIVE MEMBER
            ====================================================== */}

            <div
              className="
                rounded-2xl
                border
                border-gray-200
                bg-gray-50/50
                p-5
              "
            >
              {/* ================= EXECUTIVE MEMBER ================= */}

              <div>
                <label
                  className="
                    block
                    text-sm
                    font-semibold
                    text-gray-800
                    mb-2
                  "
                >
                  Executive Member
                </label>

                <select
                  name="executive_member"
                  value={
                    formData.executive_member
                  }
                  onChange={
                    handleExecutiveMemberChange
                  }
                  required
                  className={selectClass}
                >
                  <option value="">
                    Select Executive Member
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>
                </select>
              </div>

              {/* =================================================
                  EXECUTIVE DETAILS
              ================================================= */}

              {formData.executive_member ===
                "Yes" && (
                <div
                  className="
                    mt-5
                    pt-5
                    border-t
                    border-gray-200
                    space-y-5
                  "
                >
                  {/* ================= EXECUTIVE BODY ================= */}

                  <div>
                    <label className={labelClass}>
                      Executive Body
                    </label>

                    <select
                      name="executive_body"
                      value={
                        formData.executive_body
                      }
                      onChange={handleChange}
                      required
                      className={selectClass}
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
                  </div>

                  {/* ================= DESIGNATION ================= */}

                  <div>
                    <label className={labelClass}>
                      Designation
                    </label>

                    <select
                      name="designation"
                      value={
                        formData.designation
                      }
                      onChange={handleChange}
                      required
                      className={selectClass}
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
                  </div>
                </div>
              )}
            </div>

            {/* ================= DISTRICT ================= */}

            <div>
              <label className={labelClass}>
                District
              </label>

              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                required
                className={selectClass}
              >
                <option value="">
                  Select District
                </option>

                {Object.keys(
                  telanganaData
                ).map((district) => (
                  <option
                    key={district}
                    value={district}
                  >
                    {district.replaceAll(
                      "_",
                      " "
                    )}
                  </option>
                ))}
              </select>
            </div>

            {/* ================= MANDAL ================= */}

            <div>
              <label className={labelClass}>
                Mandal
              </label>

              <select
                name="mandal"
                value={formData.mandal}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className={
                  selectClass +
                  " disabled:bg-gray-100"
                }
              >
                <option value="">
                  Select Mandal
                </option>

                {selectedDistrict &&
                  selectedDistrict.mandals.map(
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
            </div>

            {/* ================= SANGHAM ================= */}

            <div>
              <label className={labelClass}>
                Sangham
              </label>

              <select
                name="sangham"
                value={formData.sangham}
                onChange={handleChange}
                required
                disabled={!formData.district}
                className={
                  selectClass +
                  " disabled:bg-gray-100"
                }
              >
                <option value="">
                  Select Sangham
                </option>

                {selectedDistrict &&
                  selectedDistrict.sanghams.map(
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
            </div>

            {/* ================= OCCUPATION ================= */}

            <div>
              <label className={labelClass}>
                Occupation
              </label>

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Enter Occupation"
                required
                className={inputClass}
              />
            </div>

            {/* ================= FULL NAME ================= */}

            <div>
              <label className={labelClass}>
                Full Name
              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
                className={inputClass}
              />
            </div>

            {/* ================= MOBILE ================= */}

            <div>
              <label className={labelClass}>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile Number"
                required
                maxLength={20}
                className={inputClass}
              />
            </div>

            {/* ================= EMAIL ================= */}

            <div>
              <label className={labelClass}>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                required
                className={inputClass}
              />
            </div>

            {/* ================= REGISTRATION FEE ================= */}

            <div>
              <label className={labelClass}>
                Registration Fee
              </label>

              <select
                name="registration_fee"
                value={
                  formData.registration_fee
                }
                onChange={handleChange}
                required
                className={selectClass}
              >
                <option value="">
                  Select Registration Fee
                </option>

                <option value="Paid">
                  Paid
                </option>

                <option value="Free">
                  Free
                </option>
              </select>
            </div>

            {/* ================= PAYMENT DETAILS ================= */}

            {formData.registration_fee ===
              "Paid" && (
              <div
                className="
                  space-y-5
                  rounded-xl
                  border
                  border-rose-100
                  bg-rose-50/50
                  p-4
                "
              >
                <h3
                  className="
                    font-semibold
                    text-gray-800
                  "
                >
                  Payment Details
                </h3>

                {/* PAYMENT METHOD */}

                <div>
                  <label className={labelClass}>
                    Payment Method
                  </label>

                  <select
                    name="payment_method"
                    value={
                      formData.payment_method
                    }
                    onChange={handleChange}
                    required
                    className={selectClass}
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
                </div>

                {/* TRANSACTION ID */}

                <div>
                  <label className={labelClass}>
                    Transaction ID
                  </label>

                  <input
                    type="text"
                    name="transaction_id"
                    value={
                      formData.transaction_id
                    }
                    onChange={handleChange}
                    placeholder="Enter Transaction ID"
                    required
                    className={inputClass}
                  />
                </div>

                {/* AMOUNT */}

                <div>
                  <label className={labelClass}>
                    Amount Paid
                  </label>

                  <input
                    type="text"
                    name="amount_paid"
                    value={
                      formData.amount_paid
                    }
                    onChange={handleChange}
                    placeholder="Enter Amount Paid"
                    required
                    className={inputClass}
                  />
                </div>

                {/* PAYMENT DATE */}

                <div>
                  <label className={labelClass}>
                    Payment Date
                  </label>

                  <input
                    type="date"
                    name="payment_date"
                    value={
                      formData.payment_date
                    }
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            {/* ================= GENDER + DOB ================= */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-4
              "
            >
              {/* GENDER */}

              <div>
                <label className={labelClass}>
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className={selectClass}
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

              {/* DATE OF BIRTH */}

              <div>
                <label className={labelClass}>
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="date_of_birth"
                  value={
                    formData.date_of_birth
                  }
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

           

            {/* ================= REGISTER BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                h-12
                rounded-xl
                text-white
                font-semibold
                transition

                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-rose-600 hover:bg-rose-700"
                }
              `}
            >
              {loading
                ? "Registering..."
                : "Register Now"}
            </button>
          </form>

          {/* ================= LOGIN ================= */}

          <p
            className="
              text-center
              text-sm
              mt-8
              text-gray-600
            "
          >
            Already have an account?

            <a
              href="/login"
              className="
                text-rose-600
                font-semibold
                ml-2
              "
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}