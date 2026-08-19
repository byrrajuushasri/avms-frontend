"use client";

import { useState } from "react";

import {
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";

type ExecutiveBody = {
  id: number;
  executive_body: string;
  title: string;
  description: string;
};

const initialBodies: ExecutiveBody[] = [
  {
    id: 1,
    executive_body: "State Body",
    title: "Telangana State Arya Vysya Mahasabha",
    description:
      "State level executive body responsible for coordinating Arya Vysya activities across Telangana.",
  },
  {
    id: 2,
    executive_body: "District Body",
    title: "Hyderabad District Arya Vysya Body",
    description:
      "District level body for managing community activities and coordination.",
  },
  {
    id: 3,
    executive_body: "Mandal Body",
    title: "Amberpet Mandal Body",
    description:
      "Mandal level executive body for local community activities.",
  },
  {
    id: 4,
    executive_body: "Sangham Body",
    title: "Hyderabad Arya Vysya Sangham",
    description:
      "Sangham level body responsible for local member activities and programs.",
  },
];

const bodyOptions = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

export default function ExecutiveBodiesPage() {
  const [bodies, setBodies] =
    useState<ExecutiveBody[]>(initialBodies);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [formData, setFormData] = useState({
    executive_body: "",
    title: "",
    description: "",
  });

  /* =========================
     INPUT CHANGE
  ========================= */

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

  /* =========================
     OPEN ADD FORM
  ========================= */

  const openAddForm = () => {
    setEditingId(null);

    setFormData({
      executive_body: "",
      title: "",
      description: "",
    });

    setShowForm(true);
  };

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (body: ExecutiveBody) => {
    setEditingId(body.id);

    setFormData({
      executive_body: body.executive_body,
      title: body.title,
      description: body.description,
    });

    setShowForm(true);
  };

  /* =========================
     SAVE
  ========================= */

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.executive_body ||
      !formData.title ||
      !formData.description
    ) {
      return;
    }

    if (editingId !== null) {
      setBodies((prev) =>
        prev.map((body) =>
          body.id === editingId
            ? {
                ...body,
                ...formData,
              }
            : body
        )
      );
    } else {
      const newBody: ExecutiveBody = {
        id:
          bodies.length > 0
            ? Math.max(
                ...bodies.map((body) => body.id)
              ) + 1
            : 1,
        ...formData,
      };

      setBodies((prev) => [
        ...prev,
        newBody,
      ]);
    }

    setShowForm(false);
    setEditingId(null);

    setFormData({
      executive_body: "",
      title: "",
      description: "",
    });
  };

  /* =========================
     DELETE
  ========================= */

  const handleDelete = () => {
    if (deleteId === null) return;

    setBodies((prev) =>
      prev.filter(
        (body) => body.id !== deleteId
      )
    );

    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

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
            <FaBuilding />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Executive Bodies
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage State, District, Mandal and Sangham bodies
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
          Add Executive Body
        </button>
      </div>

      {/* ================= BODY CARDS ================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-5
        "
      >
        {bodies.map((body) => (
          <div
            key={body.id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              p-5
              hover:shadow-md
              transition
            "
          >

            {/* BODY TYPE */}

            <div className="flex items-center justify-between">

              <span
                className="
                  inline-flex
                  px-3
                  py-1
                  rounded-full
                  bg-[#f8eef2]
                  text-[#8B1E3F]
                  text-xs
                  font-semibold
                "
              >
                {body.executive_body}
              </span>

              <div className="flex items-center gap-1">

                <button
                  type="button"
                  onClick={() =>
                    handleEdit(body)
                  }
                  title="Edit"
                  className="
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-yellow-50
                    hover:text-yellow-600
                  "
                >
                  <FaEdit />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setDeleteId(body.id)
                  }
                  title="Delete"
                  className="
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:bg-red-50
                    hover:text-red-600
                  "
                >
                  <FaTrash />
                </button>

              </div>

            </div>

            {/* TITLE */}

            <h2
              className="
                text-lg
                font-bold
                text-gray-900
                mt-4
                leading-snug
              "
            >
              {body.title}
            </h2>

            {/* DESCRIPTION */}

            <p
              className="
                text-sm
                text-gray-500
                mt-3
                leading-6
              "
            >
              {body.description}
            </p>

          </div>
        ))}

        {bodies.length === 0 && (
          <div
            className="
              col-span-full
              bg-white
              rounded-2xl
              border
              border-gray-100
              p-12
              text-center
            "
          >
            <FaBuilding className="mx-auto text-3xl text-gray-300" />

            <p className="mt-3 text-gray-500">
              No executive bodies found.
            </p>
          </div>
        )}
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

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
                  <FaBuilding />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">
                    {editingId !== null
                      ? "Edit Executive Body"
                      : "Add Executive Body"}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    Enter executive body details
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
                  hover:text-gray-700
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

              {/* EXECUTIVE BODY */}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Executive Body
                </label>

                <select
                  name="executive_body"
                  value={formData.executive_body}
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
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-[#8B1E3F]/20
                    focus:border-[#8B1E3F]
                  "
                >
                  <option value="">
                    Select Executive Body
                  </option>

                  {bodyOptions.map(
                    (option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    )
                  )}
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
                  placeholder="Enter title"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    border
                    border-gray-200
                    outline-none
                    text-sm
                    focus:ring-2
                    focus:ring-[#8B1E3F]/20
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
                  rows={5}
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
                    focus:ring-2
                    focus:ring-[#8B1E3F]/20
                    focus:border-[#8B1E3F]
                  "
                />
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
                    ? "Update Body"
                    : "Save Body"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

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
              Delete Executive Body?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete this executive
              body?
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