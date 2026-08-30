"use client";

import { useEffect, useMemo, useState } from "react";

import {
  FaPhotoVideo,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaImage,
  FaCalendarAlt,
  FaStar,
  FaUpload,
} from "react-icons/fa";

/* =========================================================
   API
========================================================= */

const API_URL = "http://localhost:5000/news";
const BACKEND_URL = "http://localhost:5000";

/* =========================================================
   TYPES
========================================================= */

type NewsStatus = "Active" | "Inactive";

type NewsCategory =
  | "State News"
  | "District News"
  | "Mandal News"
  | "Sangam News";

type MediaItem = {
  id: number;
  title: string;
  description: string;
  category: NewsCategory;
  location?: string | null;
  date: string;
  mediaType: "Image";
  mediaUrl: string;
  featured: boolean;
  status: NewsStatus;
  createdAt?: string;
  updatedAt?: string;
};

type FormDataType = {
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  mediaUrl: string;
  featured: boolean;
  status: NewsStatus;
};

/* =========================================================
   CATEGORIES
========================================================= */

const categories: NewsCategory[] = [
  "State News",
  "District News",
  "Mandal News",
  "Sangam News",
];

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm: FormDataType = {
  title: "",
  description: "",
  category: "",
  location: "",
  date: "",
  mediaUrl: "",
  featured: false,
  status: "Active",
};

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getMediaUrl = (url: string | null | undefined) => {
  if (!url) return "";

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  return `${BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

/* =========================================================
   PAGE
========================================================= */

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [categoryFilter, setCategoryFilter] = useState("All");

  const [formData, setFormData] =
    useState<FormDataType>(emptyForm);

  /* =========================================================
     FILE STATE
  ========================================================= */

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState<string>("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  /* =========================================================
     GET NEWS
  ========================================================= */

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load news. Status: ${response.status}`
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setMedia(data);
      } else {
        setMedia([]);
      }
    } catch (err) {
      console.error("GET /news error:", err);

      setError(
        "News data load avvaledu. NestJS server http://localhost:5000 running lo undho check cheyyandi."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    fetchMedia();
  }, []);

  /* =========================================================
     CLEANUP PREVIEW
  ========================================================= */

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  /* =========================================================
     FORM CHANGE
  ========================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================================
     FEATURED CHANGE
  ========================================================= */

  const handleFeaturedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      featured: e.target.checked,
    }));
  };

  /* =========================================================
     FILE CHANGE
  ========================================================= */

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    /* -------------------------------------------------------
       CHECK IMAGE TYPE
    ------------------------------------------------------- */

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Please select a JPG, PNG, WEBP or GIF image."
      );

      e.target.value = "";
      return;
    }

    /* -------------------------------------------------------
       CHECK FILE SIZE
    ------------------------------------------------------- */

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "Image size should be less than 5 MB."
      );

      e.target.value = "";
      return;
    }

    setError("");

    /* -------------------------------------------------------
       OLD PREVIEW CLEANUP
    ------------------------------------------------------- */

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    /* -------------------------------------------------------
       SET FILE
    ------------------------------------------------------- */

    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(file);

    setPreviewUrl(objectUrl);

    /* -------------------------------------------------------
       CLEAR OLD MEDIA URL
    ------------------------------------------------------- */

    setFormData((prev) => ({
      ...prev,
      mediaUrl: "",
    }));
  };

  /* =========================================================
     REMOVE SELECTED IMAGE
  ========================================================= */

  const removeSelectedImage = () => {
    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(null);
    setPreviewUrl("");

    setFormData((prev) => ({
      ...prev,
      mediaUrl: "",
    }));
  };

  /* =========================================================
     OPEN ADD FORM
  ========================================================= */

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      ...emptyForm,
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    setSelectedFile(null);
    setPreviewUrl("");

    setError("");
    setShowForm(true);
  };

  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {
    if (saving) return;

    if (previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setSelectedFile(null);
    setPreviewUrl("");
    setError("");
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (item: MediaItem) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      description: item.description || "",
      category: item.category || "",
      location: item.location || "",
      date: item.date
        ? String(item.date).split("T")[0]
        : "",
      mediaUrl: item.mediaUrl || "",
      featured: item.featured ?? false,
      status: item.status || "Active",
    });

    setSelectedFile(null);

    if (item.mediaUrl) {
      setPreviewUrl(
        getMediaUrl(item.mediaUrl)
      );
    } else {
      setPreviewUrl("");
    }

    setError("");
    setShowForm(true);
  };

  /* =========================================================
     SAVE / UPDATE
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!formData.title.trim()) {
      setError("Please enter Title.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter Description.");
      return;
    }

    if (!formData.category) {
      setError("Please select Category.");
      return;
    }

    if (!formData.date) {
      setError("Please select Date.");
      return;
    }

    /* -------------------------------------------------------
       IMAGE VALIDATION
    ------------------------------------------------------- */

    if (
      editingId === null &&
      !selectedFile
    ) {
      setError("Please select an image.");
      return;
    }

    try {
      setSaving(true);

      /* =====================================================
         FORMDATA
      ===================================================== */

      const body = new FormData();

      /* -----------------------------------------------------
         TEXT FIELDS
      ----------------------------------------------------- */

      body.append(
        "title",
        formData.title.trim()
      );

      body.append(
        "description",
        formData.description.trim()
      );

      body.append(
        "category",
        formData.category
      );

      body.append(
        "location",
        formData.location.trim()
      );

      body.append(
        "date",
        formData.date
      );

      /* -----------------------------------------------------
         IMPORTANT

         Backend entity expects mediaType.

         Since video is removed, always send Image.
      ----------------------------------------------------- */

      body.append(
        "mediaType",
        "Image"
      );

      body.append(
        "featured",
        String(formData.featured)
      );

      body.append(
        "status",
        formData.status
      );

      /* -----------------------------------------------------
         IMPORTANT

         Backend controller uses:

         FileInterceptor("media")

         Therefore frontend MUST use:

         body.append("media", selectedFile)
      ----------------------------------------------------- */

      if (selectedFile) {
        body.append(
          "media",
          selectedFile
        );
      }

      /* -----------------------------------------------------
         EDIT WITHOUT NEW IMAGE

         Send existing mediaUrl.
      ----------------------------------------------------- */

      if (
        editingId !== null &&
        !selectedFile &&
        formData.mediaUrl
      ) {
        body.append(
          "mediaUrl",
          formData.mediaUrl
        );
      }

      /* =====================================================
         URL
      ===================================================== */

      const url =
        editingId !== null
          ? `${API_URL}/${editingId}`
          : API_URL;

      /* =====================================================
         METHOD
      ===================================================== */

      const method =
        editingId !== null
          ? "PATCH"
          : "POST";

      /* =====================================================
         REQUEST

         DO NOT manually set Content-Type.
         Browser automatically creates multipart boundary.
      ===================================================== */

      const response = await fetch(url, {
        method,
        body,
      });

      /* =====================================================
         RESPONSE
      ===================================================== */

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        let message =
          "Failed to save news.";

        if (
          Array.isArray(data?.message)
        ) {
          message =
            data.message.join(", ");
        } else if (
          data?.message
        ) {
          message = data.message;
        }

        throw new Error(message);
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      await fetchMedia();

      closeForm();

    } catch (err) {
      console.error(
        "Save news error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save news."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = async () => {
    if (deleteId === null) {
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      let data: any = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to delete news."
        );
      }

      setDeleteId(null);

      await fetchMedia();

    } catch (err) {
      console.error(
        "Delete news error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete news."
      );

      setDeleteId(null);
    }
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredMedia = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return media.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.title
          ?.toLowerCase()
          .includes(searchText) ||
        item.description
          ?.toLowerCase()
          .includes(searchText) ||
        item.category
          ?.toLowerCase()
          .includes(searchText) ||
        item.location
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    media,
    search,
    statusFilter,
    categoryFilter,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const featuredCount = media.filter(
    (item) => item.featured
  ).length;

  const activeCount = media.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = media.filter(
    (item) => item.status === "Inactive"
  ).length;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-[#f8eef2] text-[#8B1E3F] flex items-center justify-center">
            <FaPhotoVideo />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Media & News
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage State, District, Mandal and Sangam news
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="h-11 px-5 rounded-xl bg-[#8B1E3F] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#741832] transition"
        >
          <FaPlus />
          Add News
        </button>

      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <p className="text-sm text-gray-500">
            Total News
          </p>

          <h2 className="text-2xl font-bold mt-2 text-gray-900">
            {media.length}
          </h2>

        </div>

        {/* IMAGES */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center gap-2">

            <FaImage className="text-blue-600" />

            <p className="text-sm text-gray-500">
              Images
            </p>

          </div>

          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {media.length}
          </h2>

        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center gap-2">

            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />

            <p className="text-sm text-gray-500">
              Active
            </p>

          </div>

          <h2 className="text-2xl font-bold text-green-600 mt-2">
            {activeCount}
          </h2>

        </div>

        {/* FEATURED */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center gap-2">

            <FaStar className="text-yellow-500" />

            <p className="text-sm text-gray-500">
              Featured
            </p>

          </div>

          <h2 className="text-2xl font-bold text-yellow-600 mt-2">
            {featuredCount}
          </h2>

        </div>

      </div>

      {/* =====================================================
          SEARCH & FILTER
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* SEARCH */}

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search news..."
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#8B1E3F]"
            />

          </div>

          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
          >

            <option value="All">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}

          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-[#8B1E3F]"
          >

            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading && (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

          <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-[#8B1E3F] rounded-full animate-spin" />

          <p className="text-sm text-gray-500 mt-4">
            Loading news...
          </p>

        </div>
      )}

      {/* =====================================================
          MEDIA GRID
      ===================================================== */}

      {!loading &&
        filteredMedia.length > 0 && (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            {filteredMedia.map(
              (item) => (

                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition"
                >

                  {/* IMAGE */}

                  <div className="h-48 bg-gray-100 relative overflow-hidden">

                    {item.mediaUrl ? (

                      <img
                        src={getMediaUrl(
                          item.mediaUrl
                        )}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="w-full h-full flex items-center justify-center text-gray-300">

                        <FaImage className="text-5xl" />

                      </div>

                    )}

                    {/* CATEGORY */}

                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-[#8B1E3F] shadow-sm">

                      {item.category}

                    </span>

                    {/* STATUS */}

                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status ===
                        "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >

                      {item.status}

                    </span>

                  </div>

                  {/* CONTENT */}

                  <div className="p-5">

                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">

                      <span className="flex items-center gap-1">

                        <FaImage />

                        Image

                      </span>

                      {item.date && (
                        <span className="flex items-center gap-1">

                          <FaCalendarAlt />

                          {item.date}

                        </span>
                      )}

                    </div>

                    <h2 className="font-bold text-gray-900 text-lg line-clamp-2">
                      {item.title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-3 leading-6">
                      {item.description}
                    </p>

                    {item.location && (
                      <p className="text-xs text-gray-400 mt-2">
                        Location:{" "}
                        {item.location}
                      </p>
                    )}

                    {item.featured && (
                      <div className="flex items-center gap-1 text-xs font-semibold text-yellow-600 mt-3">

                        <FaStar />

                        Featured News

                      </div>
                    )}

                    {/* ACTIONS */}

                    <div className="flex gap-2 mt-5 pt-4 border-t border-gray-100">

                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="flex-1 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center gap-2 text-sm font-semibold hover:bg-yellow-50 hover:text-yellow-600"
                      >

                        <FaEdit />

                        Edit

                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setDeleteId(
                            item.id
                          )
                        }
                        className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-red-50 hover:text-red-600"
                      >

                        <FaTrash />

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>
        )}

      {/* =====================================================
          EMPTY
      ===================================================== */}

      {!loading &&
        filteredMedia.length === 0 && (

          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">

            <FaPhotoVideo className="mx-auto text-4xl text-gray-300" />

            <h3 className="font-semibold text-gray-800 mt-4">
              No news found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>
        )}

      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">

            {/* HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-[#f8eef2] text-[#8B1E3F] flex items-center justify-center">

                  <FaPhotoVideo />

                </div>

                <div>

                  <h2 className="font-bold text-gray-900">

                    {editingId !== null
                      ? "Edit News"
                      : "Add News"}

                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Add news and image details
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50"
              >

                <FaTimes />

              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* CATEGORY */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleChange
                  }
                  required
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white outline-none text-sm focus:border-[#8B1E3F]"
                >

                  <option value="">
                    Select Category
                  </option>

                  <option value="State News">
                    State News
                  </option>

                  <option value="District News">
                    District News
                  </option>

                  <option value="Mandal News">
                    Mandal News
                  </option>

                  <option value="Sangam News">
                    Sangam News
                  </option>

                </select>

              </div>

              {/* TITLE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  required
                  maxLength={255}
                  placeholder="Enter news title"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#8B1E3F]"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                  required
                  rows={4}
                  placeholder="Enter news description"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-sm resize-none focus:border-[#8B1E3F]"
                />

              </div>

              {/* LOCATION */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={
                    formData.location
                  }
                  onChange={
                    handleChange
                  }
                  maxLength={150}
                  placeholder="Example: Hyderabad"
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#8B1E3F]"
                />

              </div>

              {/* DATE */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date *
                </label>

                <div className="relative">

                  <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                  <input
                    type="date"
                    name="date"
                    value={
                      formData.date
                    }
                    onChange={
                      handleChange
                    }
                    required
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 outline-none text-sm focus:border-[#8B1E3F]"
                  />

                </div>

              </div>

              {/* =================================================
                  IMAGE UPLOAD
              ================================================= */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Image *
                </label>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4">

                  <label className="cursor-pointer block">

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={
                        handleFileChange
                      }
                      className="hidden"
                    />

                    {!previewUrl ? (

                      <div className="h-40 flex flex-col items-center justify-center text-gray-400 hover:text-[#8B1E3F] transition">

                        <FaUpload className="text-3xl mb-3" />

                        <p className="text-sm font-semibold">
                          Click to upload image
                        </p>

                        <p className="text-xs mt-1">
                          JPG, PNG, WEBP or GIF
                        </p>

                        <p className="text-xs mt-1">
                          Maximum 5 MB
                        </p>

                      </div>

                    ) : (

                      <div className="relative">

                        <img
                          src={
                            previewUrl
                          }
                          alt="Preview"
                          className="w-full h-56 object-cover rounded-xl"
                        />

                        <div className="absolute bottom-3 left-3 right-3 bg-black/60 text-white rounded-lg px-3 py-2 text-xs">

                          {selectedFile
                            ? selectedFile.name
                            : "Current image"}

                        </div>

                      </div>

                    )}

                  </label>

                  {previewUrl && (

                    <button
                      type="button"
                      onClick={
                        removeSelectedImage
                      }
                      className="mt-3 w-full h-10 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
                    >

                      Remove Image

                    </button>

                  )}

                </div>

                <p className="text-xs text-gray-400 mt-2">

                  {editingId !== null
                    ? "Select a new image only if you want to replace the current image."
                    : "Select the image you want to upload."}

                </p>

              </div>

              {/* FEATURED */}

              <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">

                <div>

                  <p className="text-sm font-semibold text-gray-700">
                    Featured News
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Show this news as featured
                  </p>

                </div>

                <label className="relative inline-flex items-center cursor-pointer">

                  <input
                    type="checkbox"
                    checked={
                      formData.featured
                    }
                    onChange={
                      handleFeaturedChange
                    }
                    className="sr-only peer"
                  />

                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8B1E3F] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />

                </label>

              </div>

              {/* STATUS */}

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={
                    formData.status
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white outline-none text-sm"
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                </select>

              </div>

              {/* FORM ERROR */}

              {error && (

                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">

                  {error}

                </div>

              )}

              {/* BUTTONS */}

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">

                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 disabled:opacity-50"
                >

                  Cancel

                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 h-11 rounded-xl bg-[#8B1E3F] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#741832] disabled:opacity-60"
                >

                  {saving ? (

                    <>

                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                      Saving...

                    </>

                  ) : (

                    <>

                      <FaSave />

                      {editingId !== null
                        ? "Update News"
                        : "Save News"}

                    </>

                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteId !== null && (

        <div className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

            <h2 className="text-lg font-bold text-gray-900">
              Delete News?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this news item?
            </p>

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="flex-1 h-11 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDelete
                }
                className="flex-1 h-11 rounded-xl bg-red-600 text-white font-semibold text-sm hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}