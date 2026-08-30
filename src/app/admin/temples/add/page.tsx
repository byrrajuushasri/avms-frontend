"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaLink,
  FaImage,
  FaPlaceOfWorship,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const TEMPLE_API = `${API_URL}/temples`;

/* =========================================================
   DISTRICTS
========================================================= */

const districts = [
  "Adilabad",
  "Bhadradri Kothagudem",
  "Hanamkonda",
  "Hyderabad",
  "Jagtial",
  "Jangaon",
  "Jayashankar Bhupalapally",
  "Jogulamba Gadwal",
  "Kamareddy",
  "Karimnagar",
  "Khammam",
  "Komaram Bheem Asifabad",
  "Mahabubabad",
  "Mahabubnagar",
  "Mancherial",
  "Medak",
  "Medchal-Malkajgiri",
  "Mulugu",
  "Nagarkurnool",
  "Nalgonda",
  "Narayanpet",
  "Nirmal",
  "Nizamabad",
  "Peddapalli",
  "Rajanna Sircilla",
  "Rangareddy",
  "Sangareddy",
  "Siddipet",
  "Suryapet",
  "Vikarabad",
  "Wanaparthy",
  "Warangal",
  "Yadadri Bhuvanagiri",
];

/* =========================================================
   FORM TYPE
========================================================= */

interface TempleForm {
  name: string;
  area: string;
  district: string;
  address: string;
  phone: string;
  timings: string;
  description: string;
  map_url: string;
  status: "Active" | "Inactive";
}

/* =========================================================
   PAGE
========================================================= */

export default function AddTemplePage() {
  const router = useRouter();

  const [form, setForm] = useState<TempleForm>({
    name: "",
    area: "",
    district: "",
    address: "",
    phone: "",
    timings: "",
    description: "",
    map_url: "",
    status: "Active",
  });

  /* IMAGE */
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (
    field: keyof TempleForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* Validate image */

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    /* 5 MB limit */

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));

    setError("");
    setSuccess("");
  };

  /* =========================================================
     REMOVE IMAGE
  ========================================================= */

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");

    const input =
      document.getElementById(
        "temple-image"
      ) as HTMLInputElement | null;

    if (input) {
      input.value = "";
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* Required validation */

    if (!form.name.trim()) {
      setError("Please enter Temple Name.");
      return;
    }

    if (!form.area.trim()) {
      setError("Please enter Area.");
      return;
    }

    if (!form.district) {
      setError("Please select District.");
      return;
    }

    if (!form.address.trim()) {
      setError("Please enter Temple Address.");
      return;
    }

    try {
      setLoading(true);

      /* =====================================================
         FORM DATA
      ===================================================== */

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "area",
        form.area.trim()
      );

      formData.append(
        "district",
        form.district
      );

      formData.append(
        "address",
        form.address.trim()
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      formData.append(
        "timings",
        form.timings.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "map_url",
        form.map_url.trim()
      );

      formData.append(
        "status",
        form.status
      );

      /* =====================================================
         IMAGE FILE
      ===================================================== */

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      /* =====================================================
         API REQUEST
      ===================================================== */

      const response = await fetch(
        TEMPLE_API,
        {
          method: "POST",
          body: formData,
        }
      );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                `Failed to create temple. Status: ${response.status}`
        );
      }

      console.log(
        "Temple Created:",
        data
      );

      setSuccess(
        "Temple added successfully."
      );

      /* =====================================================
         RESET FORM
      ===================================================== */

      setForm({
        name: "",
        area: "",
        district: "",
        address: "",
        phone: "",
        timings: "",
        description: "",
        map_url: "",
        status: "Active",
      });

      setImageFile(null);
      setImagePreview("");

      const input =
        document.getElementById(
          "temple-image"
        ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      /* =====================================================
         REDIRECT
      ===================================================== */

      setTimeout(() => {
        router.push("/admin/temples");
        router.refresh();
      }, 800);

    } catch (err) {
      console.error(
        "Create Temple Error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to add temple."
      );

    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CANCEL
  ========================================================= */

  const handleCancel = () => {
    router.push("/admin/temples");
  };

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-2 flex items-center gap-2 text-sm text-gray-400">

              <Link
                href="/admin/temples"
                className="transition hover:text-gray-700"
              >
                Temples
              </Link>

              <span>/</span>

              <span className="text-gray-600">
                Add Temple
              </span>

            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Add Temple
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Add a new Vasavi Ammavari Temple to the temple directory.
            </p>

          </div>

          <Link
            href="/admin/temples"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-50
            "
          >
            <FaArrowLeft className="text-xs" />
            Back to Temples
          </Link>

        </div>

        {/* ===================================================
            FORM
        =================================================== */}

        <form onSubmit={handleSubmit}>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* CARD HEADER */}

            <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2]">
                  <FaPlaceOfWorship className="text-xl text-[#8B1E3F]" />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Temple Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Enter the temple details below.
                  </p>

                </div>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="px-5 pt-5 sm:px-7">

                <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                  {error}
                </div>

              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="px-5 pt-5 sm:px-7">

                <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">

                  <FaCheckCircle />

                  {success}

                </div>

              </div>
            )}

            {/* =================================================
                FORM BODY
            ================================================= */}

            <div className="space-y-8 px-5 py-7 sm:px-7">

              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <section>

                <div className="mb-5">

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    Basic Information
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Basic identification and location of the temple.
                  </p>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* NAME */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Temple Name
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">

                      <FaPlaceOfWorship
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-sm
                          text-gray-400
                        "
                      />

                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          handleChange(
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Enter temple name"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          pl-11
                          pr-4
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-gray-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-gray-100
                        "
                      />

                    </div>

                  </div>

                  {/* AREA */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Area
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={form.area}
                      onChange={(e) =>
                        handleChange(
                          "area",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Uppal"
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        px-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    />

                  </div>

                  {/* DISTRICT */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      District
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <select
                      value={form.district}
                      onChange={(e) =>
                        handleChange(
                          "district",
                          e.target.value
                        )
                      }
                      className="
                        h-11
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50/70
                        px-4
                        text-sm
                        text-gray-700
                        outline-none
                        transition
                        focus:border-gray-300
                        focus:bg-white
                        focus:ring-4
                        focus:ring-gray-100
                      "
                    >

                      <option value="">
                        Select District
                      </option>

                      {districts.map(
                        (district) => (
                          <option
                            key={district}
                            value={district}
                          >
                            {district}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                </div>

              </section>

              {/* =================================================
                  ADDRESS
              ================================================= */}

              <section className="border-t border-gray-100 pt-8">

                <div className="mb-5">

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    Address & Contact
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Temple address and contact information.
                  </p>

                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  {/* ADDRESS */}

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Temple Address
                      <span className="ml-1 text-red-500">*</span>
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt
                        className="
                          absolute
                          left-4
                          top-4
                          text-sm
                          text-gray-400
                        "
                      />

                      <textarea
                        value={form.address}
                        onChange={(e) =>
                          handleChange(
                            "address",
                            e.target.value
                          )
                        }
                        rows={4}
                        placeholder="Enter complete temple address"
                        className="
                          w-full
                          resize-none
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          px-4
                          py-3
                          pl-11
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-gray-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-gray-100
                        "
                      />

                    </div>

                  </div>

                  {/* PHONE */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">

                      <FaPhoneAlt
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-xs
                          text-gray-400
                        "
                      />

                      <input
                        type="text"
                        value={form.phone}
                        onChange={(e) =>
                          handleChange(
                            "phone",
                            e.target.value
                          )
                        }
                        placeholder="Enter contact number"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          pl-11
                          pr-4
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-gray-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-gray-100
                        "
                      />

                    </div>

                  </div>

                  {/* TIMINGS */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Temple Timings
                    </label>

                    <div className="relative">

                      <FaClock
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-sm
                          text-gray-400
                        "
                      />

                      <input
                        type="text"
                        value={form.timings}
                        onChange={(e) =>
                          handleChange(
                            "timings",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 6:00 AM – 11:00 AM | 6:00 PM – 8:00 PM"
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          pl-11
                          pr-4
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-gray-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-gray-100
                        "
                      />

                    </div>

                  </div>

                </div>

              </section>

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <section className="border-t border-gray-100 pt-8">

                <div className="mb-5">

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    Temple Details
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Add a short description about the temple.
                  </p>

                </div>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  rows={5}
                  placeholder="Enter temple description..."
                  className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/70
                    px-4
                    py-3
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-gray-300
                    focus:bg-white
                    focus:ring-4
                    focus:ring-gray-100
                  "
                />

              </section>

              {/* =================================================
                  MEDIA & LOCATION
              ================================================= */}

              <section className="border-t border-gray-100 pt-8">

                <div className="mb-5">

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    Media & Location
                  </h3>

                  <p className="mt-1 text-xs text-gray-400">
                    Add Google Maps location and temple image.
                  </p>

                </div>

                <div className="grid gap-5">

                  {/* GOOGLE MAP */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Google Maps URL
                    </label>

                    <div className="relative">

                      <FaLink
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-xs
                          text-gray-400
                        "
                      />

                      <input
                        type="url"
                        value={form.map_url}
                        onChange={(e) =>
                          handleChange(
                            "map_url",
                            e.target.value
                          )
                        }
                        placeholder="https://www.google.com/maps/..."
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-gray-200
                          bg-gray-50/70
                          pl-11
                          pr-4
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-gray-300
                          focus:bg-white
                          focus:ring-4
                          focus:ring-gray-100
                        "
                      />

                    </div>

                  </div>

                  {/* =================================================
                      IMAGE UPLOAD
                  ================================================= */}

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Temple Image
                    </label>

                    <div className="rounded-xl border border-gray-200 bg-gray-50/70 p-5">

                      {!imagePreview ? (
                        <label
                          htmlFor="temple-image"
                          className="
                            flex
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border-2
                            border-dashed
                            border-gray-300
                            bg-white
                            px-6
                            py-10
                            transition
                            hover:border-[#8B1E3F]
                            hover:bg-[#fdf8fa]
                          "
                        >

                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eef2]">

                            <FaImage className="text-2xl text-[#8B1E3F]" />

                          </div>

                          <p className="mt-4 text-sm font-semibold text-gray-700">
                            Click to upload temple image
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            PNG, JPG, JPEG or WEBP • Max 5 MB
                          </p>

                          <span className="mt-4 inline-flex items-center rounded-lg bg-[#8B1E3F] px-5 py-2.5 text-sm font-semibold text-white">
                            Choose Image
                          </span>

                          <input
                            id="temple-image"
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp"
                            onChange={
                              handleImageChange
                            }
                            className="hidden"
                          />

                        </label>
                      ) : (
                        <div>

                          <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">

                            <img
                              src={imagePreview}
                              alt="Temple preview"
                              className="h-72 w-full object-cover"
                            />

                            <button
                              type="button"
                              onClick={removeImage}
                              className="
                                absolute
                                right-3
                                top-3
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-black/70
                                text-white
                                transition
                                hover:bg-red-600
                              "
                              title="Remove image"
                            >
                              <FaTimes />
                            </button>

                          </div>

                          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                            <div>

                              <p className="text-sm font-semibold text-gray-700">
                                {imageFile?.name}
                              </p>

                              <p className="text-xs text-gray-400">
                                {imageFile
                                  ? `${(
                                      imageFile.size /
                                      1024 /
                                      1024
                                    ).toFixed(2)} MB`
                                  : ""}
                              </p>

                            </div>

                            <label
                              htmlFor="temple-image"
                              className="
                                inline-flex
                                cursor-pointer
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                border
                                border-gray-200
                                bg-white
                                px-4
                                py-2
                                text-sm
                                font-semibold
                                text-gray-700
                                hover:bg-gray-50
                              "
                            >

                              <FaImage />

                              Change Image

                            </label>

                            <input
                              id="temple-image"
                              type="file"
                              accept="image/png,image/jpeg,image/jpg,image/webp"
                              onChange={
                                handleImageChange
                              }
                              className="hidden"
                            />

                          </div>

                        </div>
                      )}

                    </div>

                    <p className="mt-2 text-xs text-gray-400">
                      Upload the actual temple photo. The image filename will be stored in the database.
                    </p>

                  </div>

                </div>

              </section>

              {/* =================================================
                  STATUS
              ================================================= */}

              <section className="border-t border-gray-100 pt-8">

                <div className="mb-5">

                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    Status
                  </h3>

                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  {/* ACTIVE */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      border
                      p-4
                      transition
                      ${
                        form.status === "Active"
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={
                        form.status === "Active"
                      }
                      onChange={(e) =>
                        handleChange(
                          "status",
                          e.target.value
                        )
                      }
                      className="h-4 w-4"
                    />

                    <div>

                      <p className="text-sm font-semibold text-gray-800">
                        Active
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Show temple in the public directory.
                      </p>

                    </div>

                  </label>

                  {/* INACTIVE */}

                  <label
                    className={`
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-xl
                      border
                      p-4
                      transition
                      ${
                        form.status === "Inactive"
                          ? "border-gray-300 bg-gray-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={
                        form.status === "Inactive"
                      }
                      onChange={(e) =>
                        handleChange(
                          "status",
                          e.target.value
                        )
                      }
                      className="h-4 w-4"
                    />

                    <div>

                      <p className="text-sm font-semibold text-gray-800">
                        Inactive
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Hide temple from the public directory.
                      </p>

                    </div>

                  </label>

                </div>

              </section>

            </div>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/50 px-5 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-7">

              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-gray-200
                  bg-white
                  px-6
                  text-sm
                  font-semibold
                  text-gray-600
                  transition
                  hover:bg-gray-50
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#8B1E3F]
                  px-7
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#741832]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/40
                        border-t-white
                      "
                    />

                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save Temple
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </main>

    </div>
  );
}