"use client";

import { useMemo, useState } from "react";

import {
  FaPhotoVideo,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaSearch,
  FaImage,
  FaVideo,
} from "react-icons/fa";

type MediaItem = {
  id: number;
  media_type: "Image" | "Video";
  title: string;
  description: string;
  media_url: string;
  status: "Active" | "Inactive";
};

const initialMedia: MediaItem[] = [
  {
    id: 1,
    media_type: "Image",
    title: "State Mahasabha Meeting",
    description:
      "Telangana State Arya Vysya Mahasabha executive meeting.",
    media_url:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    status: "Active",
  },
  {
    id: 2,
    media_type: "Image",
    title: "Community Service Program",
    description:
      "Community members participating in a social service program.",
    media_url:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    status: "Active",
  },
  {
    id: 3,
    media_type: "Video",
    title: "Arya Vysya Community Event",
    description:
      "Highlights from the community event.",
    media_url:
      "https://www.youtube.com/watch?v=example",
    status: "Active",
  },
];

export default function MediaPage() {
  const [media, setMedia] =
    useState<MediaItem[]>(initialMedia);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("All");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [formData, setFormData] = useState({
    media_type: "",
    title: "",
    description: "",
    media_url: "",
    status: "Active",
  });

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     OPEN ADD FORM
  ===================================================== */

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      media_type: "",
      title: "",
      description: "",
      media_url: "",
      status: "Active",
    });

    setShowForm(true);
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (item: MediaItem) => {
    setEditingId(item.id);

    setFormData({
      media_type: item.media_type,
      title: item.title,
      description: item.description,
      media_url: item.media_url,
      status: item.status,
    });

    setShowForm(true);
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.media_type ||
      !formData.title ||
      !formData.description ||
      !formData.media_url
    ) {
      return;
    }

    if (editingId !== null) {
      setMedia((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                media_type:
                  formData.media_type as
                    | "Image"
                    | "Video",
                title: formData.title,
                description:
                  formData.description,
                media_url:
                  formData.media_url,
                status:
                  formData.status as
                    | "Active"
                    | "Inactive",
              }
            : item
        )
      );
    } else {
      const newItem: MediaItem = {
        id:
          media.length > 0
            ? Math.max(
                ...media.map(
                  (item) => item.id
                )
              ) + 1
            : 1,

        media_type:
          formData.media_type as
            | "Image"
            | "Video",

        title: formData.title,

        description:
          formData.description,

        media_url:
          formData.media_url,

        status:
          formData.status as
            | "Active"
            | "Inactive",
      };

      setMedia((prev) => [
        ...prev,
        newItem,
      ]);
    }

    setShowForm(false);
    setEditingId(null);

    setFormData({
      media_type: "",
      title: "",
      description: "",
      media_url: "",
      status: "Active",
    });
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = () => {
    if (deleteId === null) return;

    setMedia((prev) =>
      prev.filter(
        (item) => item.id !== deleteId
      )
    );

    setDeleteId(null);
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        item.title
          .toLowerCase()
          .includes(searchText) ||
        item.description
          .toLowerCase()
          .includes(searchText);

      const matchesType =
        typeFilter === "All" ||
        item.media_type === typeFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return (
        matchesSearch &&
        matchesType &&
        matchesStatus
      );
    });
  }, [
    media,
    search,
    typeFilter,
    statusFilter,
  ]);

  return (
    <div
      className="
        min-h-screen
        bg-gray-50
        p-4
        md:p-6
        lg:p-8
      "
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-4
          mb-6
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-[#f8eef2]
              text-[#8B1E3F]
              flex
              items-center
              justify-center
            "
          >
            <FaPhotoVideo />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                text-gray-900
              "
            >
              Media
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage images and videos
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="
            h-11
            px-5
            rounded-xl
            bg-[#8B1E3F]
            text-white
            font-semibold
            text-sm
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#741832]
            transition
          "
        >
          <FaPlus />
          Add Media
        </button>
      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mb-6
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Total Media
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {media.length}
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Images
          </p>

          <h2 className="text-2xl font-bold text-blue-600 mt-2">
            {
              media.filter(
                (item) =>
                  item.media_type ===
                  "Image"
              ).length
            }
          </h2>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          "
        >
          <p className="text-sm text-gray-500">
            Videos
          </p>

          <h2 className="text-2xl font-bold text-red-600 mt-2">
            {
              media.filter(
                (item) =>
                  item.media_type ===
                  "Video"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* =================================================
          SEARCH & FILTER
      ================================================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-4
          mb-6
        "
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-3
          "
        >
          {/* SEARCH */}

          <div className="relative">
            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-400
                text-sm
              "
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search media..."
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-xl
                border
                border-gray-200
                outline-none
                text-sm
                focus:border-[#8B1E3F]
              "
            />
          </div>

          {/* TYPE */}

          <select
            value={typeFilter}
            onChange={(e) =>
              setTypeFilter(e.target.value)
            }
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              outline-none
            "
          >
            <option value="All">
              All Media
            </option>

            <option value="Image">
              Images
            </option>

            <option value="Video">
              Videos
            </option>
          </select>

          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              w-full
              h-11
              px-4
              rounded-xl
              border
              border-gray-200
              bg-white
              text-sm
              outline-none
            "
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

      {/* =================================================
          MEDIA GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-5
        "
      >
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              overflow-hidden
              hover:shadow-md
              transition
            "
          >
            {/* MEDIA PREVIEW */}

            <div
              className="
                h-48
                bg-gray-100
                relative
                overflow-hidden
              "
            >
              {item.media_type ===
                "Image" ? (
                <img
                  src={item.media_url}
                  alt={item.title}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                    bg-gray-900
                    text-white
                  "
                >
                  <FaVideo className="text-4xl" />
                </div>
              )}

              {/* TYPE */}

              <span
                className="
                  absolute
                  top-3
                  left-3
                  px-3
                  py-1
                  rounded-full
                  bg-white/90
                  backdrop-blur
                  text-xs
                  font-semibold
                  text-gray-700
                "
              >
                {item.media_type}
              </span>

              {/* STATUS */}

              <span
                className={`
                  absolute
                  top-3
                  right-3
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-semibold
                  ${
                    item.status ===
                    "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }
                `}
              >
                {item.status}
              </span>
            </div>

            {/* DETAILS */}

            <div className="p-5">

              <h2
                className="
                  font-bold
                  text-gray-900
                  text-lg
                "
              >
                {item.title}
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  mt-2
                  line-clamp-3
                  leading-6
                "
              >
                {item.description}
              </p>

              {/* ACTIONS */}

              <div
                className="
                  flex
                  gap-2
                  mt-5
                  pt-4
                  border-t
                  border-gray-100
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(item)
                  }
                  className="
                    flex-1
                    h-10
                    rounded-lg
                    bg-gray-50
                    text-gray-600
                    flex
                    items-center
                    justify-center
                    gap-2
                    text-sm
                    font-semibold
                    hover:bg-yellow-50
                    hover:text-yellow-600
                  "
                >
                  <FaEdit />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(item.id)
                  }
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-gray-50
                    text-gray-500
                    flex
                    items-center
                    justify-center
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}

      {filteredMedia.length === 0 && (
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            p-12
            text-center
          "
        >
          <FaPhotoVideo className="mx-auto text-4xl text-gray-300" />

          <h3 className="font-semibold text-gray-800 mt-4">
            No media found
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-xl
              bg-white
              rounded-2xl
              shadow-2xl
              overflow-hidden
              max-h-[90vh]
              overflow-y-auto
            "
          >
            {/* MODAL HEADER */}

            <div
              className="
                px-6
                py-5
                border-b
                border-gray-100
                flex
                items-center
                justify-between
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#f8eef2]
                    text-[#8B1E3F]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <FaPhotoVideo />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    {editingId !== null
                      ? "Edit Media"
                      : "Add Media"}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Add image or video details
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-gray-400
                  hover:bg-gray-50
                "
              >
                <FaTimes />
              </button>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              {/* MEDIA TYPE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Media Type
                </label>

                <select
                  name="media_type"
                  value={formData.media_type}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    outline-none
                    text-sm
                    focus:border-[#8B1E3F]
                  "
                >
                  <option value="">
                    Select Media Type
                  </option>

                  <option value="Image">
                    Image
                  </option>

                  <option value="Video">
                    Video
                  </option>
                </select>
              </div>

              {/* TITLE */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter media title"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    text-sm
                    focus:border-[#8B1E3F]
                  "
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Enter description"
                  className="
                    w-full
                    px-4
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    text-sm
                    resize-none
                    focus:border-[#8B1E3F]
                  "
                />
              </div>

              {/* MEDIA URL */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {formData.media_type ===
                  "Video"
                    ? "Video URL"
                    : "Image URL"}
                </label>

                <input
                  type="url"
                  name="media_url"
                  value={formData.media_url}
                  onChange={handleChange}
                  required
                  placeholder={
                    formData.media_type ===
                    "Video"
                      ? "Enter YouTube / video URL"
                      : "Enter image URL"
                  }
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    text-sm
                    focus:border-[#8B1E3F]
                  "
                />
              </div>

              {/* STATUS */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    outline-none
                    text-sm
                  "
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* BUTTONS */}

              <div
                className="
                  flex
                  flex-col-reverse
                  sm:flex-row
                  gap-3
                  pt-2
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    border
                    border-gray-200
                    text-gray-700
                    font-semibold
                    text-sm
                    hover:bg-gray-50
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="
                    flex-1
                    h-11
                    rounded-xl
                    bg-[#8B1E3F]
                    text-white
                    font-semibold
                    text-sm
                    flex
                    items-center
                    justify-center
                    gap-2
                    hover:bg-[#741832]
                  "
                >
                  <FaSave />

                  {editingId !== null
                    ? "Update Media"
                    : "Save Media"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {deleteId !== null && (
        <div
          className="
            fixed
            inset-0
            z-[110]
            bg-black/40
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
        >
          <div
            className="
              w-full
              max-w-md
              bg-white
              rounded-2xl
              shadow-2xl
              p-6
            "
          >
            <h2 className="text-lg font-bold text-gray-900">
              Delete Media?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this
              media item?
            </p>

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="
                  flex-1
                  h-11
                  rounded-xl
                  border
                  border-gray-200
                  text-gray-700
                  font-semibold
                  text-sm
                  hover:bg-gray-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="
                  flex-1
                  h-11
                  rounded-xl
                  bg-red-600
                  text-white
                  font-semibold
                  text-sm
                  hover:bg-red-700
                "
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