"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

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
  FaMapMarkerAlt,
  FaSyncAlt,
  FaEllipsisV,
  FaNewspaper,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

// =========================================================
// API
// =========================================================

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://avms-backend-production.up.railway.app";

const NEWS_API = `${BACKEND_URL}/news`;

// =========================================================
// TYPES
// =========================================================

type NewsStatus = "Active" | "Inactive";

type NewsCategory =
  | "State News"
  | "District News"
  | "Mandal News"
  | "Sangam News";

interface MediaItem {
  id: number;
  title: string;
  description?: string | null;
  category: NewsCategory;
  location?: string | null;
  date: string;
  mediaType?: string | null;
  mediaUrl?: string | null;
  featured: boolean;
  status: NewsStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface FormDataType {
  title: string;
  description: string;
  category: NewsCategory;
  location: string;
  date: string;
  mediaUrl: string;
  featured: boolean;
  status: NewsStatus;
}

interface MenuPosition {
  top: number;
  left: number;
}

// =========================================================
// CONSTANTS
// =========================================================

const categories: NewsCategory[] = [
  "State News",
  "District News",
  "Mandal News",
  "Sangam News",
];

const emptyForm: FormDataType = {
  title: "",
  description: "",
  category: "State News",
  location: "",
  date: new Date().toISOString().split("T")[0],
  mediaUrl: "",
  featured: false,
  status: "Active",
};

// =========================================================
// PAGE
// =========================================================

export default function MediaPage() {
  // =======================================================
  // DATA STATES
  // =======================================================

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // =======================================================
  // FORM STATES
  // =======================================================

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<FormDataType>(emptyForm);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [previewUrl, setPreviewUrl] =
    useState("");

  const [error, setError] = useState("");

  // =======================================================
  // FILTER STATES
  // =======================================================

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<"All" | NewsStatus>("All");

  const [categoryFilter, setCategoryFilter] =
    useState<"All" | NewsCategory>("All");

  // =======================================================
  // PAGINATION
  // =======================================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const [rowsPerPage, setRowsPerPage] =
    useState(10);

  // =======================================================
  // ACTION MENU
  // =======================================================

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  const [selectedActionItem, setSelectedActionItem] =
    useState<MediaItem | null>(null);

  const [menuPosition, setMenuPosition] =
    useState<MenuPosition>({
      top: 0,
      left: 0,
    });

  const actionButtonRefs =
    useRef<Record<number, HTMLButtonElement | null>>(
      {}
    );

  // =======================================================
  // GET IMAGE URL
  // =======================================================

  const getMediaUrl = (
    url?: string | null
  ) => {
    if (!url) return "";

    if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("blob:")
    ) {
      return url;
    }

    return `${BACKEND_URL}${
      url.startsWith("/") ? "" : "/"
    }${url}`;
  };

  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (date?: string) => {
    if (!date) return "-";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =======================================================
  // FETCH NEWS
  // =======================================================

  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(NEWS_API, {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch news (${response.status})`
        );
      }

      const result = await response.json();

      const list = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
        ? result.data
        : [];

      setMedia(list);
    } catch (err) {
      console.error(
        "Fetch media error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load news"
      );
    } finally {
      setLoading(false);
    }
  };

  // =======================================================
  // INITIAL LOAD
  // =======================================================

  useEffect(() => {
    fetchMedia();
  }, []);

  // =======================================================
  // CLOSE ACTION MENU ON ESC
  // =======================================================

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpenMenuId(null);
        setSelectedActionItem(null);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  // =======================================================
  // CLOSE ACTION MENU WHEN SCROLLING
  // =======================================================

  useEffect(() => {
    const closeOnScroll = () => {
      if (openMenuId !== null) {
        setOpenMenuId(null);
        setSelectedActionItem(null);
      }
    };

    window.addEventListener(
      "scroll",
      closeOnScroll,
      true
    );

    return () => {
      window.removeEventListener(
        "scroll",
        closeOnScroll,
        true
      );
    };
  }, [openMenuId]);

  // =======================================================
  // FILTERED DATA
  // =======================================================

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const searchText =
        search.trim().toLowerCase();

      const matchesSearch =
        !searchText ||
        item.title
          ?.toLowerCase()
          .includes(searchText) ||
        item.description
          ?.toLowerCase()
          .includes(searchText) ||
        item.location
          ?.toLowerCase()
          .includes(searchText) ||
        item.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

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

  // =======================================================
  // RESET PAGE WHEN FILTER CHANGES
  // =======================================================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    categoryFilter,
    rowsPerPage,
  ]);

  // =======================================================
  // PAGINATION CALCULATIONS
  // =======================================================

  const totalItems = filteredMedia.length;

  const totalPages = Math.max(
    1,
    Math.ceil(
      totalItems / rowsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    rowsPerPage;

  const endIndex = Math.min(
    startIndex + rowsPerPage,
    totalItems
  );

  const paginatedMedia =
    filteredMedia.slice(
      startIndex,
      endIndex
    );

  // =======================================================
  // STATS
  // =======================================================

  const totalCount = media.length;

  const activeCount = media.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveCount = media.filter(
    (item) => item.status === "Inactive"
  ).length;

  const featuredCount = media.filter(
    (item) => item.featured
  ).length;

  // =======================================================
  // PAGE NUMBERS
  // =======================================================

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    if (totalPages <= 7) {
      for (
        let i = 1;
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 4) {
      pages.push(-1);
    }

    const start = Math.max(
      2,
      safeCurrentPage - 1
    );

    const end = Math.min(
      totalPages - 1,
      safeCurrentPage + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      safeCurrentPage <
      totalPages - 3
    ) {
      pages.push(-1);
    }

    pages.push(totalPages);

    return pages;
  }, [
    totalPages,
    safeCurrentPage,
  ]);

  // =======================================================
  // OPEN ADD FORM
  // =======================================================

  const handleAdd = () => {
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

  // =======================================================
  // OPEN EDIT FORM
  // =======================================================

  const handleEdit = (
    item: MediaItem
  ) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      description:
        item.description || "",
      category:
        item.category || "State News",
      location:
        item.location || "",
      date: item.date
        ? item.date.split("T")[0]
        : new Date()
            .toISOString()
            .split("T")[0],
      mediaUrl:
        item.mediaUrl || "",
      featured:
        Boolean(item.featured),
      status:
        item.status || "Active",
    });

    setSelectedFile(null);

    setPreviewUrl(
      item.mediaUrl
        ? getMediaUrl(
            item.mediaUrl
          )
        : ""
    );

    setError("");
    setShowForm(true);
  };

  // =======================================================
  // FORM CHANGE
  // =======================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =======================================================
  // FILE CHANGE
  // =======================================================

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Only JPG, PNG, WEBP and GIF images are allowed."
      );
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 10 MB."
      );
      return;
    }

    setError("");
    setSelectedFile(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreviewUrl(objectUrl);
  };

  // =======================================================
  // REMOVE IMAGE
  // =======================================================

  const removeSelectedImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");

    setFormData((prev) => ({
      ...prev,
      mediaUrl: "",
    }));
  };

  // =======================================================
  // SUBMIT
  // =======================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError(
        "Please enter news title."
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const body = new FormData();

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

      body.append(
        "mediaType",
        "Image"
      );

      body.append(
        "featured",
        String(
          formData.featured
        )
      );

      body.append(
        "status",
        formData.status
      );

      if (selectedFile) {
        body.append(
          "media",
          selectedFile
        );
      } else if (
        editingId &&
        formData.mediaUrl
      ) {
        body.append(
          "mediaUrl",
          formData.mediaUrl
        );
      }

      const url = editingId
        ? `${NEWS_API}/${editingId}`
        : NEWS_API;

      const response =
        await fetch(url, {
          method: editingId
            ? "PATCH"
            : "POST",
          body,
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Failed to ${
              editingId
                ? "update"
                : "create"
            } news`
        );
      }

      setShowForm(false);
      setEditingId(null);
      setSelectedFile(null);
      setPreviewUrl("");
      setFormData(emptyForm);

      await fetchMedia();
    } catch (err) {
      console.error(
        "Save news error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save news"
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // DELETE
  // =======================================================

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setSaving(true);
      setError("");

      const response =
        await fetch(
          `${NEWS_API}/${deleteId}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to delete news"
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
          : "Failed to delete news"
      );
    } finally {
      setSaving(false);
    }
  };

  // =======================================================
  // OPEN ACTION MENU
  // =======================================================

  const handleActionMenu = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: MediaItem
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const button =
      e.currentTarget;

    const rect =
      button.getBoundingClientRect();

    const menuWidth = 230;
    const menuHeight = 155;
    const padding = 12;

    let left =
      rect.right -
      menuWidth;

    let top =
      rect.bottom + 8;

    // Right boundary
    if (
      left + menuWidth >
      window.innerWidth -
        padding
    ) {
      left =
        window.innerWidth -
        menuWidth -
        padding;
    }

    // Left boundary
    if (left < padding) {
      left = padding;
    }

    // Bottom boundary
    if (
      top + menuHeight >
      window.innerHeight -
        padding
    ) {
      top =
        rect.top -
        menuHeight -
        8;
    }

    // Top boundary
    if (top < padding) {
      top = padding;
    }

    setMenuPosition({
      top,
      left,
    });

    setSelectedActionItem(item);

    setOpenMenuId(
      openMenuId === item.id
        ? null
        : item.id
    );
  };

  // =======================================================
  // CLOSE ACTION MENU
  // =======================================================

  const closeActionMenu = () => {
    setOpenMenuId(null);
    setSelectedActionItem(null);
  };

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-12 h-12 border-4 border-[#8B1E3F]/20 border-t-[#8B1E3F] rounded-full animate-spin" />

          <p className="text-sm font-semibold text-gray-500">
            Loading Media & News...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 sm:p-6 lg:p-8">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-2xl bg-[#8B1E3F] text-white flex items-center justify-center shadow-lg shadow-[#8B1E3F]/20">
            <FaPhotoVideo className="text-xl" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Media & News
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage news, media and announcements
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={fetchMedia}
            className="h-11 px-4 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-[#8B1E3F] hover:border-[#8B1E3F]/30 flex items-center gap-2 font-semibold text-sm transition shadow-sm"
          >
            <FaSyncAlt />
            Refresh
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className="h-11 px-5 rounded-xl bg-[#8B1E3F] hover:bg-[#721732] text-white flex items-center gap-2 font-semibold text-sm transition shadow-lg shadow-[#8B1E3F]/20"
          >
            <FaPlus />
            Add News
          </button>

        </div>

      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && !showForm && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* ===================================================
          STATS
      =================================================== */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

        {/* TOTAL */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Total News
              </p>

              <p className="text-2xl font-bold text-gray-800 mt-2">
                {totalCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FaNewspaper />
            </div>

          </div>

        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Active
              </p>

              <p className="text-2xl font-bold text-green-600 mt-2">
                {activeCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <FaEye />
            </div>

          </div>

        </div>

        {/* INACTIVE */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Inactive
              </p>

              <p className="text-2xl font-bold text-red-600 mt-2">
                {inactiveCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <FaTimes />
            </div>

          </div>

        </div>

        {/* FEATURED */}

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Featured
              </p>

              <p className="text-2xl font-bold text-amber-500 mt-2">
                {featuredCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <FaStar />
            </div>

          </div>

        </div>

      </div>

      {/* ===================================================
          FILTERS
      =================================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* SEARCH */}

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search news..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/10 focus:border-[#8B1E3F] text-sm"
            />

          </div>

          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value as
                  | "All"
                  | NewsCategory
              )
            }
            className="h-11 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8B1E3F] text-sm text-gray-600"
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
                e.target.value as
                  | "All"
                  | NewsStatus
              )
            }
            className="h-11 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8B1E3F] text-sm text-gray-600"
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

      {/* ===================================================
          TABLE
      =================================================== */}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* TABLE HEADER */}

        <div className="px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="font-bold text-gray-800">
              News List
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {totalItems} result
              {totalItems !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

          {/* ROWS PER PAGE */}

          <div className="flex items-center gap-2">

            <span className="text-xs text-gray-400">
              Rows:
            </span>

            <select
              value={rowsPerPage}
              onChange={(e) =>
                setRowsPerPage(
                  Number(
                    e.target.value
                  )
                )
              }
              className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 focus:outline-none focus:border-[#8B1E3F]"
            >
              <option value={5}>
                5
              </option>

              <option value={10}>
                10
              </option>

              <option value={20}>
                20
              </option>

              <option value={50}>
                50
              </option>
            </select>

          </div>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px]">

            <thead>

              <tr className="bg-gray-50 border-b border-gray-100">

                <th className="px-5 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  News Details
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Location
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Published Date
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Featured
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {paginatedMedia.length === 0 ? (

                <tr>

                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-16 h-16 rounded-2xl bg-gray-50 text-gray-300 flex items-center justify-center mb-4">
                        <FaNewspaper className="text-2xl" />
                      </div>

                      <p className="font-semibold text-gray-500">
                        No news found
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Try changing your search or filters
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                paginatedMedia.map(
                  (item) => {

                    const imageUrl =
                      getMediaUrl(
                        item.mediaUrl
                      );

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-[#fffafb] transition"
                      >

                        {/* NEWS */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 flex-shrink-0">

                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={
                                    item.title
                                  }
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                  <FaImage />
                                </div>
                              )}

                            </div>

                            <div className="min-w-0">

                              <p className="font-bold text-gray-800 text-sm truncate max-w-[330px]">
                                {item.title}
                              </p>

                              <p className="text-xs text-gray-400 mt-1 truncate max-w-[330px]">
                                {item.description ||
                                  "No description"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td className="px-5 py-4">

                          <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#8B1E3F]/5 text-[#8B1E3F] text-xs font-semibold whitespace-nowrap">
                            {item.category}
                          </span>

                        </td>

                        {/* LOCATION */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2 text-sm text-gray-600">

                            <FaMapMarkerAlt className="text-gray-400 text-xs" />

                            <span>
                              {item.location ||
                                "-"}
                            </span>

                          </div>

                        </td>

                        {/* DATE */}

                        <td className="px-5 py-4">

                          <div className="flex items-center gap-2 text-sm text-gray-600 whitespace-nowrap">

                            <FaCalendarAlt className="text-gray-400 text-xs" />

                            {formatDate(
                              item.date
                            )}

                          </div>

                        </td>

                        {/* FEATURED */}

                        <td className="px-5 py-4 text-center">

                          {item.featured ? (

                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-50 text-amber-500">
                              <FaStar />
                            </span>

                          ) : (

                            <span className="text-gray-300">
                              —
                            </span>

                          )}

                        </td>

                        {/* STATUS */}

                        <td className="px-5 py-4 text-center">

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                              item.status ===
                              "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-600"
                            }`}
                          >

                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                item.status ===
                                "Active"
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />

                            {item.status}

                          </span>

                        </td>

                        {/* ACTION */}

                        <td className="px-5 py-4 text-right">

                          <button
                            ref={(element) => {
                              actionButtonRefs.current[
                                item.id
                              ] =
                                element;
                            }}
                            type="button"
                            onClick={(e) =>
                              handleActionMenu(
                                e,
                                item
                              )
                            }
                            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition ${
                              openMenuId ===
                              item.id
                                ? "bg-[#8B1E3F] text-white border-[#8B1E3F] shadow-md"
                                : "bg-white text-gray-500 border-gray-200 hover:border-[#8B1E3F]/30 hover:text-[#8B1E3F] hover:bg-[#fff8fa]"
                            }`}
                            title="More actions"
                          >
                            <FaEllipsisV className="text-sm" />
                          </button>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalItems > 0 && (

          <div className="px-5 py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* SHOWING */}

            <div className="text-xs text-gray-500">

              Showing{" "}

              <span className="font-bold text-gray-700">
                {startIndex + 1}
              </span>

              {" "}to{" "}

              <span className="font-bold text-gray-700">
                {endIndex}
              </span>

              {" "}of{" "}

              <span className="font-bold text-gray-700">
                {totalItems}
              </span>

            </div>

            {/* PAGINATION BUTTONS */}

            <div className="flex items-center gap-1">

              {/* PREVIOUS */}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  1
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        1,
                        prev - 1
                      )
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:border-[#8B1E3F]/30 hover:text-[#8B1E3F] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* PAGE NUMBERS */}

              {pageNumbers.map(
                (page, index) => {

                  if (page === -1) {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition ${
                        safeCurrentPage ===
                        page
                          ? "bg-[#8B1E3F] text-white shadow-md"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-[#8B1E3F]/30 hover:text-[#8B1E3F]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* NEXT */}

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        totalPages,
                        prev + 1
                      )
                  )
                }
                className="w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-500 flex items-center justify-center hover:border-[#8B1E3F]/30 hover:text-[#8B1E3F] disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <FaChevronRight className="text-xs" />
              </button>

            </div>

          </div>

        )}

      </div>

      {/* ===================================================
          ACTION MENU PORTAL
          THIS IS OUTSIDE TABLE
      =================================================== */}

      {openMenuId !== null &&
        selectedActionItem &&
        typeof document !==
          "undefined" &&
        createPortal(

          <div
            className="fixed z-[999999] w-[230px] bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden"
            style={{
              top:
                menuPosition.top,
              left:
                menuPosition.left,
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            onMouseDown={(e) =>
              e.stopPropagation()
            }
          >

            {/* MENU HEADER */}

            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">

              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                News Actions
              </p>

              <p className="text-xs text-gray-600 truncate mt-1 font-semibold">
                {
                  selectedActionItem.title
                }
              </p>

            </div>

            {/* EDIT */}

            <button
              type="button"
              onMouseDown={(e) =>
                e.stopPropagation()
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const item =
                  selectedActionItem;

                closeActionMenu();

                handleEdit(item);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-blue-50 transition"
            >

              <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <FaEdit className="text-sm" />
              </span>

              <span>
                <span className="block font-semibold text-sm text-gray-700">
                  Edit News
                </span>

                <span className="block text-[10px] text-gray-400 mt-0.5">
                  Update news details
                </span>
              </span>

            </button>

            {/* DELETE */}

            <button
              type="button"
              onMouseDown={(e) =>
                e.stopPropagation()
              }
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const id =
                  selectedActionItem.id;

                closeActionMenu();

                setDeleteId(id);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-red-50 transition border-t border-gray-50"
            >

              <span className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <FaTrash className="text-sm" />
              </span>

              <span>
                <span className="block font-semibold text-sm text-red-600">
                  Delete News
                </span>

                <span className="block text-[10px] text-red-400 mt-0.5">
                  Permanently remove
                </span>
              </span>

            </button>

          </div>,

          document.body
        )}

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  {editingId
                    ? "Edit News"
                    : "Add News"}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  {editingId
                    ? "Update news information"
                    : "Create a new news item"}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >

              <div className="p-6 space-y-5">

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                    {error}
                  </div>
                )}

                {/* TITLE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    News Title
                    <span className="text-red-500">
                      {" "}*
                    </span>
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
                    placeholder="Enter news title"
                    className="w-full h-12 px-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/10 focus:border-[#8B1E3F] text-sm"
                    required
                  />

                </div>

                {/* DESCRIPTION */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={
                      formData.description
                    }
                    onChange={
                      handleChange
                    }
                    rows={4}
                    placeholder="Enter news description"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1E3F]/10 focus:border-[#8B1E3F] text-sm resize-none"
                  />

                </div>

                {/* CATEGORY + LOCATION */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleChange
                      }
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8B1E3F] text-sm"
                    >

                      {categories.map(
                        (category) => (
                          <option
                            key={
                              category
                            }
                            value={
                              category
                            }
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location
                    </label>

                    <div className="relative">

                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                      <input
                        type="text"
                        name="location"
                        value={
                          formData.location
                        }
                        onChange={
                          handleChange
                        }
                        placeholder="Hyderabad / Telangana"
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#8B1E3F] text-sm"
                      />

                    </div>

                  </div>

                </div>

                {/* DATE + STATUS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>

                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Published Date
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
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#8B1E3F] text-sm"
                      />

                    </div>

                  </div>

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
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8B1E3F] text-sm"
                    >

                      <option value="Active">
                        Active
                      </option>

                      <option value="Inactive">
                        Inactive
                      </option>

                    </select>

                  </div>

                </div>

                {/* FEATURED */}

                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 cursor-pointer hover:bg-[#fffafb] transition">

                  <input
                    type="checkbox"
                    checked={
                      formData.featured
                    }
                    onChange={(e) =>
                      setFormData(
                        (prev) => ({
                          ...prev,
                          featured:
                            e.target
                              .checked,
                        })
                      )
                    }
                    className="w-4 h-4 accent-[#8B1E3F]"
                  />

                  <span className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <FaStar />
                  </span>

                  <span>

                    <span className="block font-semibold text-sm text-gray-700">
                      Featured News
                    </span>

                    <span className="block text-xs text-gray-400 mt-0.5">
                      Highlight this news item
                    </span>

                  </span>

                </label>

                {/* IMAGE */}

                <div>

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    News Image
                  </label>

                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-5">

                    {previewUrl ? (

                      <div className="relative">

                        <img
                          src={
                            previewUrl
                          }
                          alt="Preview"
                          className="w-full h-56 object-cover rounded-xl"
                        />

                        <button
                          type="button"
                          onClick={
                            removeSelectedImage
                          }
                          className="absolute top-3 right-3 w-9 h-9 rounded-xl bg-white/95 text-red-500 shadow-lg flex items-center justify-center hover:bg-red-50 transition"
                          title="Remove image"
                        >
                          <FaTrash className="text-xs" />
                        </button>

                      </div>

                    ) : (

                      <label className="cursor-pointer block">

                        <div className="flex flex-col items-center justify-center py-8">

                          <div className="w-14 h-14 rounded-2xl bg-[#8B1E3F]/5 text-[#8B1E3F] flex items-center justify-center mb-3">
                            <FaUpload />
                          </div>

                          <p className="font-semibold text-sm text-gray-700">
                            Upload News Image
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            JPG, PNG, WEBP or GIF · Max 10MB
                          </p>

                        </div>

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          onChange={
                            handleFileChange
                          }
                          className="hidden"
                        />

                      </label>

                    )}

                  </div>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="h-11 px-5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 font-semibold text-sm transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="h-11 px-6 rounded-xl bg-[#8B1E3F] hover:bg-[#721732] disabled:opacity-60 text-white font-semibold text-sm flex items-center gap-2 transition"
                >

                  {saving ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingId
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

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteId !== null && (

        <div className="fixed inset-0 z-[11000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">

            <div className="flex items-start gap-4">

              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                <FaTrash />
              </div>

              <div>

                <h3 className="text-lg font-bold text-gray-800">
                  Delete News?
                </h3>

                <p className="text-sm text-gray-500 mt-1 leading-6">
                  Are you sure you want to permanently
                  delete this news item? This action
                  cannot be undone.
                </p>

              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                disabled={saving}
                className="h-11 px-5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 font-semibold text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={saving}
                className="h-11 px-5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold text-sm flex items-center gap-2"
              >

                {saving ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}