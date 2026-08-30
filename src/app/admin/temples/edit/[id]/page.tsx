"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaArrowLeft,
  FaSave,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaPlaceOfWorship,
  FaCheckCircle,
  FaImage,
  FaUpload,
  FaTimes,
} from "react-icons/fa";

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

interface TempleForm {
  name: string;
  area: string;
  district: string;
  address: string;
  phone: string;
  timings: string;
  description: string;
  map_url: string;
  image: string;
  status: boolean;
}

const initialForm: TempleForm = {
  name: "",
  area: "",
  district: "",
  address: "",
  phone: "",
  timings: "",
  description: "",
  map_url: "",
  image: "",
  status: true,
};

export default function EditTemplePage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [form, setForm] =
    useState<TempleForm>(initialForm);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string>("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================================
     GET TEMPLE
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    fetchTemple();
  }, [id]);

  const fetchTemple = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/temples/${id}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                "Failed to load temple",
        );
      }

      setForm({
        name: data?.name || "",
        area: data?.area || "",
        district: data?.district || "",
        address: data?.address || "",
        phone: data?.phone || "",
        timings: data?.timings || "",
        description:
          data?.description || "",
        map_url:
          data?.map_url ||
          data?.mapUrl ||
          "",
        image: data?.image || "",
        status:
          data?.status !== undefined
            ? Boolean(data.status)
            : true,
      });

      // Existing image preview
      if (data?.image) {
        setPreviewUrl(
          `${API_URL}/uploads/temples/${data.image}`,
        );
      }
    } catch (err) {
      console.error(
        "Temple GET error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load temple",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Validate image
    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image file.",
      );
      return;
    }

    // 5 MB
    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size must be less than 5 MB.",
      );
      return;
    }

    setSelectedFile(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    setError("");
    setSuccess("");
  };

  /* =========================================================
     REMOVE NEW IMAGE
  ========================================================= */

  const removeSelectedImage = () => {
    setSelectedFile(null);

    if (form.image) {
      setPreviewUrl(
        `${API_URL}/uploads/temples/${form.image}`,
      );
    } else {
      setPreviewUrl("");
    }
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError(
        "Please enter Temple Name.",
      );
      return;
    }

    if (!form.area.trim()) {
      setError("Please enter Area.");
      return;
    }

    if (!form.district.trim()) {
      setError(
        "Please enter District.",
      );
      return;
    }

    if (!form.address.trim()) {
      setError(
        "Please enter Address.",
      );
      return;
    }

    if (!form.map_url.trim()) {
      setError(
        "Please enter Google Maps URL.",
      );
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim(),
      );

      formData.append(
        "area",
        form.area.trim(),
      );

      formData.append(
        "district",
        form.district.trim(),
      );

      formData.append(
        "address",
        form.address.trim(),
      );

      formData.append(
        "phone",
        form.phone.trim(),
      );

      formData.append(
        "timings",
        form.timings.trim(),
      );

      formData.append(
        "description",
        form.description.trim(),
      );

      formData.append(
        "map_url",
        form.map_url.trim(),
      );

      formData.append(
        "status",
        String(form.status),
      );

      // Only send image when user selects a new one
      if (selectedFile) {
        formData.append(
          "image",
          selectedFile,
        );
      }

      const response = await fetch(
        `${API_URL}/temples/${id}`,
        {
          method: "PATCH",
          body: formData,
        },
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                "Failed to update temple",
        );
      }

      setSuccess(
        "Temple updated successfully.",
      );

      setTimeout(() => {
        router.push(
          "/admin/temples",
        );
      }, 1000);
    } catch (err) {
      console.error(
        "Temple UPDATE error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update temple",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#650014]" />

            <p className="mt-4 text-sm text-gray-500">
              Loading temple details...
            </p>

          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

      <div className="mx-auto max-w-5xl">

        {/* HEADER */}

        <div className="mb-6">

          <Link
            href="/admin/temples"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#650014]"
          >
            <FaArrowLeft className="text-xs" />
            Back to Temples
          </Link>

          <div className="mt-5 flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f8eef2] text-[#650014]">
              <FaPlaceOfWorship className="text-xl" />
            </div>

            <div>

              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Temple
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update temple information,
                location, contact details
                and temple image.
              </p>

            </div>

          </div>

        </div>

        {/* ALERT */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <FaCheckCircle />
            {success}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

              <h2 className="text-lg font-semibold text-gray-900">
                Temple Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update the details displayed
                on the temple directory.
              </p>

            </div>

            <div className="space-y-8 p-5 sm:p-7">

              {/* BASIC DETAILS */}

              <section>

                <div className="mb-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#650014]">
                    Basic Details
                  </h3>

                  <div className="mt-2 h-px bg-gray-100" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Temple Name
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Sri Vasavi Kanyaka Parameshwari Temple"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none transition focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Area
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="Uppal"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      District
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      placeholder="Hyderabad"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                </div>

              </section>

              {/* LOCATION */}

              <section>

                <div className="mb-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#650014]">
                    Location Details
                  </h3>

                  <div className="mt-2 h-px bg-gray-100" />
                </div>

                <div className="space-y-5">

                  <div>

                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaMapMarkerAlt className="text-[#650014]" />
                      Address
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter complete temple address"
                      className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Google Maps URL
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="url"
                      name="map_url"
                      value={form.map_url}
                      onChange={handleChange}
                      placeholder="https://www.google.com/maps/..."
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                </div>

              </section>

              {/* CONTACT */}

              <section>

                <div className="mb-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#650014]">
                    Contact & Timings
                  </h3>

                  <div className="mt-2 h-px bg-gray-100" />
                </div>

                <div className="grid gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaPhoneAlt className="text-[#650014]" />
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                  <div>

                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <FaClock className="text-[#650014]" />
                      Temple Timings
                    </label>

                    <input
                      type="text"
                      name="timings"
                      value={form.timings}
                      onChange={handleChange}
                      placeholder="6:00 AM – 11:00 AM | 6:00 PM – 8:00 PM"
                      className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                    />

                  </div>

                </div>

              </section>

              {/* DESCRIPTION */}

              <section>

                <div className="mb-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[#650014]">
                    Description
                  </h3>

                  <div className="mt-2 h-px bg-gray-100" />
                </div>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter temple description..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 outline-none focus:border-[#650014] focus:bg-white focus:ring-4 focus:ring-[#650014]/5"
                />

              </section>

              {/* =================================================
                  PROFESSIONAL IMAGE SECTION
              ================================================= */}

              <section>

                <div className="mb-5">

                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#650014]">
                    <FaImage />
                    Temple Image
                  </h3>

                  <div className="mt-2 h-px bg-gray-100" />

                </div>

                <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">

                  {/* IMAGE PREVIEW */}

                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                    {previewUrl ? (
                      <div className="relative h-[280px]">

                        <img
                          src={previewUrl}
                          alt={
                            form.name ||
                            "Temple image"
                          }
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display =
                              "none";
                          }}
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-14">

                          <p className="text-sm font-semibold text-white">
                            {selectedFile
                              ? selectedFile.name
                              : form.image}
                          </p>

                          <p className="mt-1 text-xs text-white/75">
                            {selectedFile
                              ? "New image selected"
                              : "Current temple image"}
                          </p>

                        </div>

                        {selectedFile && (
                          <button
                            type="button"
                            onClick={
                              removeSelectedImage
                            }
                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-600"
                            title="Remove selected image"
                          >
                            <FaTimes />
                          </button>
                        )}

                      </div>
                    ) : (
                      <div className="flex h-[280px] flex-col items-center justify-center">

                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eef2]">

                          <FaImage className="text-2xl text-[#650014]" />

                        </div>

                        <p className="mt-4 text-sm font-semibold text-gray-700">
                          No image available
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Upload a temple image
                        </p>

                      </div>
                    )}

                  </div>

                  {/* UPLOAD */}

                  <div className="flex flex-col justify-center">

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">

                        <FaUpload className="text-xl text-[#650014]" />

                      </div>

                      <h4 className="mt-4 text-sm font-semibold text-gray-800">
                        Change Temple Image
                      </h4>

                      <p className="mt-2 text-xs leading-5 text-gray-500">
                        JPG, JPEG, PNG or WEBP
                        <br />
                        Maximum size 5 MB
                      </p>

                      <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#650014] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8a1025]">

                        <FaUpload />

                        Choose Image

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={
                            handleImageChange
                          }
                          className="hidden"
                        />

                      </label>

                      {selectedFile && (
                        <div className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">

                          ✓ New image ready
                          to upload

                        </div>
                      )}

                    </div>

                    {!selectedFile &&
                      form.image && (
                        <p className="mt-3 break-all text-center text-xs text-gray-400">
                          Current file:{" "}
                          {form.image}
                        </p>
                      )}

                  </div>

                </div>

              </section>

              {/* STATUS */}

              <section>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <label className="flex cursor-pointer items-center justify-between gap-4">

                    <div>

                      <p className="text-sm font-semibold text-gray-800">
                        Temple Status
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Active temples will be
                        visible in the public
                        temple directory.
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          status:
                            !prev.status,
                        }))
                      }
                      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                        form.status
                          ? "bg-[#650014]"
                          : "bg-gray-300"
                      }`}
                    >

                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
                          form.status
                            ? "left-6"
                            : "left-1"
                        }`}
                      />

                    </button>

                  </label>

                  <div className="mt-3 flex items-center gap-2 text-xs font-medium">

                    <span
                      className={`h-2 w-2 rounded-full ${
                        form.status
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />

                    {form.status
                      ? "Active"
                      : "Inactive"}

                  </div>

                </div>

              </section>

            </div>

            {/* FOOTER */}

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50/60 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <Link
                href="/admin/temples"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#650014] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8a1025] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Update Temple
                  </>
                )}

              </button>

            </div>

          </div>

        </form>

      </div>

    </main>
  );
}