"use client";

import { useEffect, useState } from "react";

import {
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type ExecutiveBody = {
  id: number;
  executive_body: string;

  state?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;

  title: string;
  formation_date: string;
  description: string;

  created_at?: string;
  updated_at?: string;
};

type OptionItem = {
  id?: number | string;
  name?: string;
  title?: string;
  district_name?: string;
  mandal_name?: string;
  sangham_name?: string;
  state_name?: string;
};

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const LOCATIONS_API = `${API_URL}/locations`;
const EXECUTIVE_API = `${API_URL}/executive-bodies`;

/* =========================================================
   STATES
========================================================= */

const STATES = ["Telangana"];

/* =========================================================
   TELANGANA ALL 33 DISTRICTS
========================================================= */

const TELANGANA_DISTRICTS = [
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
   BODY OPTIONS
========================================================= */

const bodyOptions = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

/* =========================================================
   EMPTY FORM
========================================================= */

const emptyForm = {
  executive_body: "",
  state: "",
  district: "",
  mandal: "",
  sangham: "",
  title: "",
  formation_date: "",
  description: "",
};

/* =========================================================
   HELPER
========================================================= */

function getItemName(item: OptionItem): string {
  return (
    item.name ||
    item.title ||
    item.district_name ||
    item.mandal_name ||
    item.sangham_name ||
    item.state_name ||
    ""
  );
}

/* =========================================================
   NORMALIZE API RESPONSE
========================================================= */

function getList(data: any): OptionItem[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.mandals)) {
    return data.mandals;
  }

  if (Array.isArray(data?.sanghams)) {
    return data.sanghams;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  return [];
}

/* =========================================================
   PAGE
========================================================= */

export default function ExecutiveBodiesPage() {
  /* =======================================================
     EXECUTIVE BODIES
  ======================================================= */

  const [bodies, setBodies] = useState<ExecutiveBody[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* =======================================================
     MODALS
  ======================================================= */

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  /* =======================================================
     FORM
  ======================================================= */

  const [formData, setFormData] = useState(emptyForm);

  /* =======================================================
     DISTRICT / MANDAL / SANGHAM
  ======================================================= */

  const [districts, setDistricts] = useState<OptionItem[]>([]);
  const [mandals, setMandals] = useState<OptionItem[]>([]);
  const [sanghams, setSanghams] = useState<OptionItem[]>([]);

  const [loadingMandals, setLoadingMandals] = useState(false);
  const [loadingSanghams, setLoadingSanghams] = useState(false);

  /* =======================================================
     FETCH EXECUTIVE BODIES
  ======================================================= */

  const fetchBodies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(EXECUTIVE_API, {
        method: "GET",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || "Failed to fetch executive bodies",
        );
      }

      setBodies(Array.isArray(data) ? data : getList(data));
    } catch (err) {
      console.error("Executive bodies GET error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load executive bodies",
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchBodies();
    fetchDistricts();
  }, []);

  /* =======================================================
     FETCH DISTRICTS FROM LOCATIONS API
  ======================================================= */

  const fetchDistricts = async () => {
    try {
      const url = `${LOCATIONS_API}/districts`;
      console.log("DISTRICTS API:", url);

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || `Failed to fetch districts (${response.status})`,
        );
      }

      const list = getList(data);
      console.log("DISTRICTS LIST:", list);
      setDistricts(list);
    } catch (err) {
      console.error("Districts GET error:", err);
      setDistricts([]);
      setError(
        err instanceof Error ? err.message : "Failed to fetch districts",
      );
    }
  };

  /* =======================================================
     FETCH MANDALS
  ======================================================= */

  const fetchMandals = async (districtName: string) => {
    if (!districtName) {
      setMandals([]);
      setSanghams([]);
      return;
    }

    try {
      setLoadingMandals(true);
      setMandals([]);
      setSanghams([]);

      const district = districts.find(
        (item) =>
          getItemName(item).trim().toLowerCase() ===
          districtName.trim().toLowerCase(),
      );

      if (!district?.id) {
        throw new Error(`District "${districtName}" not found in locations API`);
      }

      const url = `${LOCATIONS_API}/districts/${district.id}/mandals`;

      console.log("MANDALS API:", url);
      console.log("DISTRICT:", districtName);
      console.log("DISTRICT ID:", district.id);

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      console.log("MANDALS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || `Failed to fetch mandals (${response.status})`,
        );
      }

      const list = getList(data);
      console.log("MANDALS LIST:", list);
      setMandals(list);
    } catch (err) {
      console.error("Mandals GET error:", err);
      setMandals([]);
      setError(
        err instanceof Error ? err.message : "Failed to fetch mandals",
      );
    } finally {
      setLoadingMandals(false);
    }
  };

  /* =======================================================
     FETCH SANGHAMS
  ======================================================= */

  const fetchSanghams = async (mandalName: string) => {
    if (!mandalName) {
      setSanghams([]);
      return;
    }

    try {
      setLoadingSanghams(true);
      setSanghams([]);

      const mandal = mandals.find(
        (item) =>
          getItemName(item).trim().toLowerCase() ===
          mandalName.trim().toLowerCase(),
      );

      if (!mandal?.id) {
        throw new Error(`Mandal "${mandalName}" not found in locations API`);
      }

      const url = `${LOCATIONS_API}/mandals/${mandal.id}/sanghams`;

      console.log("SANGHAMS API:", url);
      console.log("MANDAL:", mandalName);
      console.log("MANDAL ID:", mandal.id);

      const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
      });

      const text = await response.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      console.log("SANGHAMS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || `Failed to fetch sanghams (${response.status})`,
        );
      }

      const list = getList(data);
      console.log("SANGHAMS LIST:", list);
      setSanghams(list);
    } catch (err) {
      console.error("Sanghams GET error:", err);
      setSanghams([]);
      setError(
        err instanceof Error ? err.message : "Failed to fetch sanghams",
      );
    } finally {
      setLoadingSanghams(false);
    }
  };

  /* =======================================================
     DISTRICT CHANGE → FETCH MANDALS
  ======================================================= */

  useEffect(() => {
    if (
      !formData.state ||
      !formData.district ||
      !(
        formData.executive_body === "Mandal Body" ||
        formData.executive_body === "Sangham Body"
      )
    ) {
      setMandals([]);
      return;
    }

    fetchMandals(formData.district);
  }, [
    formData.state,
    formData.district,
    formData.executive_body,
    districts,
  ]);

  /* =======================================================
     MANDAL CHANGE → FETCH SANGHAMS
  ======================================================= */

  useEffect(() => {
    if (
      !formData.state ||
      !formData.district ||
      !formData.mandal ||
      formData.executive_body !== "Sangham Body"
    ) {
      setSanghams([]);
      return;
    }

    fetchSanghams(formData.mandal);
  }, [
    formData.state,
    formData.district,
    formData.mandal,
    formData.executive_body,
    mandals,
  ]);

  /* =======================================================
     INPUT CHANGE
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    /* EXECUTIVE BODY */

    if (name === "executive_body") {
      setFormData((prev) => ({
        ...prev,
        executive_body: value,
        state: "",
        district: "",
        mandal: "",
        sangham: "",
      }));

      setMandals([]);
      setSanghams([]);

      return;
    }

    /* STATE */

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
        mandal: "",
        sangham: "",
      }));

      setMandals([]);
      setSanghams([]);

      return;
    }

    /* DISTRICT */

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        mandal: "",
        sangham: "",
      }));

      setMandals([]);
      setSanghams([]);

      return;
    }

    /* MANDAL */

    if (name === "mandal") {
      setFormData((prev) => ({
        ...prev,
        mandal: value,
        sangham: "",
      }));

      setSanghams([]);

      return;
    }

    /* OTHER */

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     OPEN ADD FORM
  ======================================================= */

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);

    setMandals([]);
    setSanghams([]);

    setError("");
    setShowForm(true);
  };

  /* =======================================================
     EDIT
  ======================================================= */

  const handleEdit = async (
    body: ExecutiveBody,
  ) => {
    setEditingId(body.id);

    setFormData({
      executive_body: body.executive_body || "",
      state: body.state || "",
      district: body.district || "",
      mandal: body.mandal || "",
      sangham: body.sangham || "",
      title: body.title || "",
      formation_date: body.formation_date
        ? body.formation_date.substring(0, 10)
        : "",
      description: body.description || "",
    });

    setMandals([]);
    setSanghams([]);

    setError("");
    setShowForm(true);

    if (
      body.state &&
      body.district &&
      (
        body.executive_body === "Mandal Body" ||
        body.executive_body === "Sangham Body"
      )
    ) {
      await fetchMandals(body.district);
    }

    if (
      body.state &&
      body.district &&
      body.mandal &&
      body.executive_body === "Sangham Body"
    ) {
      await fetchSanghams(body.mandal);
    }
  };

  /* =======================================================
     SAVE
  ======================================================= */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    setError("");

    if (!formData.executive_body) {
      setError("Please select Executive Body");
      return;
    }

    if (!formData.state) {
      setError("Please select State");
      return;
    }

    if (
      formData.executive_body === "District Body" &&
      !formData.district
    ) {
      setError("Please select District");
      return;
    }

    if (
      formData.executive_body === "Mandal Body" &&
      (!formData.district || !formData.mandal)
    ) {
      setError(
        "Please select District and Mandal",
      );
      return;
    }

    if (
      formData.executive_body === "Sangham Body" &&
      (
        !formData.district ||
        !formData.mandal ||
        !formData.sangham
      )
    ) {
      setError(
        "Please select District, Mandal and Sangham",
      );
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter Title");
      return;
    }

    if (!formData.formation_date) {
      setError("Please select Formation Date");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter Description");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        executive_body: formData.executive_body,
        state: formData.state || null,
        district: formData.district || null,
        mandal: formData.mandal || null,
        sangham: formData.sangham || null,
        title: formData.title.trim(),
        formation_date: formData.formation_date,
        description: formData.description.trim(),
      };

      console.log("SAVE PAYLOAD:", payload);

      const url =
        editingId !== null
          ? `${EXECUTIVE_API}/${editingId}`
          : EXECUTIVE_API;

      const method =
        editingId !== null
          ? "PUT"
          : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text();

      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                "Failed to save executive body",
        );
      }

      await fetchBodies();

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);

      setMandals([]);
      setSanghams([]);
    } catch (err) {
      console.error(
        "Executive body save error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to save executive body",
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const handleDelete = async () => {
    if (deleteId === null) return;

    try {
      setError("");

      const response = await fetch(
        `${EXECUTIVE_API}/${deleteId}`,
        {
          method: "DELETE",
        },
      );

      const text = await response.text();

      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message ||
                "Failed to delete executive body",
        );
      }

      setBodies((prev) =>
        prev.filter(
          (body) => body.id !== deleteId,
        ),
      );

      setDeleteId(null);
    } catch (err) {
      console.error(
        "Executive body delete error:",
        err,
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete executive body",
      );
    }
  };

  /* =======================================================
     DATE FORMAT
  ======================================================= */

  const formatDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime(),
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  /* =======================================================
     LOCATION TEXT
  ======================================================= */

  const getLocationText = (
    body: ExecutiveBody,
  ) => {
    if (
      body.executive_body ===
      "State Body"
    ) {
      return body.state || "";
    }

    if (
      body.executive_body ===
      "District Body"
    ) {
      return [
        body.state,
        body.district,
      ]
        .filter(Boolean)
        .join(" • ");
    }

    if (
      body.executive_body ===
      "Mandal Body"
    ) {
      return [
        body.state,
        body.district,
        body.mandal,
      ]
        .filter(Boolean)
        .join(" • ");
    }

    return [
      body.state,
      body.district,
      body.mandal,
      body.sangham,
    ]
      .filter(Boolean)
      .join(" • ");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
            <FaBuilding />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Executive Bodies
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage State, District, Mandal and Sangham bodies
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-5 text-sm font-semibold text-white transition hover:bg-[#741832]"
        >
          <FaPlus />
          Add Executive Body
        </button>

      </div>

      {/* ERROR */}

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* LIST — TABLE */}

      {loading ? (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

          <p className="mt-4 text-sm text-gray-500">
            Loading Executive Bodies...
          </p>

        </div>
      ) : bodies.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">

          <FaBuilding className="mx-auto text-3xl text-gray-300" />

          <p className="mt-3 text-gray-500">
            No executive bodies found.
          </p>

        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="min-w-full divide-y divide-gray-100 text-left text-sm">

              <thead className="bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Executive Body
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Location
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Formation Date
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {bodies.map((body) => (
                  <tr key={body.id} className="hover:bg-gray-50">

                    <td className="whitespace-nowrap px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-semibold text-[#8B1E3F]">
                        {body.executive_body}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-900">
                      {body.title}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {getLocationText(body) || "—"}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                      <span className="inline-flex items-center gap-2">
                        <FaCalendarAlt className="text-[#8B1E3F]" />
                        {formatDate(body.formation_date)}
                      </span>
                    </td>

                    <td className="max-w-xs px-5 py-4 text-gray-500">
                      <span className="line-clamp-2">
                        {body.description}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">

                        <button
                          type="button"
                          onClick={() => handleEdit(body)}
                          title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteId(body.id)}
                          title="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>
      )}

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaBuilding />
                </div>

                <div>

                  <h2 className="font-bold text-gray-900">
                    {editingId !== null
                      ? "Edit Executive Body"
                      : "Add Executive Body"}
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Enter executive body details
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-700"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* EXECUTIVE BODY */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Executive Body *
                </label>

                <select
                  name="executive_body"
                  value={formData.executive_body}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20"
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
                    ),
                  )}

                </select>

              </div>

              {/* STATE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  State *
                </label>

                <div className="relative">

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20"
                  >

                    <option value="">
                      Select State
                    </option>

                    {STATES.map(
                      (state) => (
                        <option
                          key={state}
                          value={state}
                        >
                          {state}
                        </option>
                      ),
                    )}

                  </select>

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                </div>

              </div>

              {/* DISTRICT */}

              {(
                formData.executive_body ===
                  "District Body" ||
                formData.executive_body ===
                  "Mandal Body" ||
                formData.executive_body ===
                  "Sangham Body"
              ) && (

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    District *
                  </label>

                  <div className="relative">

                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      disabled={!formData.state}
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 disabled:bg-gray-100"
                    >

                      <option value="">
                        {!formData.state
                          ? "Select State First"
                          : "Select District"}
                      </option>

                      {formData.state === "Telangana" &&
                        (districts.length > 0
                          ? districts.map((district, index) => {
                              const name = getItemName(district);
                              if (!name) return null;

                              return (
                                <option
                                  key={district.id ?? `${name}-${index}`}
                                  value={name}
                                >
                                  {name}
                                </option>
                              );
                            })
                          : TELANGANA_DISTRICTS.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            )))}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  </div>

                  {formData.state ===
                    "Telangana" && (
                    <p className="mt-1 text-xs text-gray-400">
                      {districts.length || TELANGANA_DISTRICTS.length} Telangana districts available
                    </p>
                  )}

                </div>
              )}

              {/* MANDAL */}

              {(
                formData.executive_body ===
                  "Mandal Body" ||
                formData.executive_body ===
                  "Sangham Body"
              ) && (

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Mandal *
                  </label>

                  <div className="relative">

                    <select
                      name="mandal"
                      value={formData.mandal}
                      onChange={handleChange}
                      required
                      disabled={
                        !formData.district ||
                        loadingMandals
                      }
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 disabled:bg-gray-100"
                    >

                      <option value="">
                        {loadingMandals
                          ? "Loading Mandals..."
                          : !formData.district
                            ? "Select District First"
                            : mandals.length === 0
                              ? "No Mandals Found"
                              : "Select Mandal"}
                      </option>

                      {mandals.map(
                        (
                          mandal,
                          index,
                        ) => {

                          const name =
                            getItemName(
                              mandal,
                            );

                          if (!name) {
                            return null;
                          }

                          return (
                            <option
                              key={
                                mandal.id ??
                                `${name}-${index}`
                              }
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        },
                      )}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  </div>

                </div>
              )}

              {/* SANGHAM */}

              {formData.executive_body ===
                "Sangham Body" && (

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Sangham *
                  </label>

                  <div className="relative">

                    <select
                      name="sangham"
                      value={formData.sangham}
                      onChange={handleChange}
                      required
                      disabled={
                        !formData.mandal ||
                        loadingSanghams
                      }
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20 disabled:bg-gray-100"
                    >

                      <option value="">
                        {loadingSanghams
                          ? "Loading Sanghams..."
                          : !formData.mandal
                            ? "Select Mandal First"
                            : sanghams.length === 0
                              ? "No Sanghams Found"
                              : "Select Sangham"}
                      </option>

                      {sanghams.map(
                        (
                          sangham,
                          index,
                        ) => {

                          const name =
                            getItemName(
                              sangham,
                            );

                          if (!name) {
                            return null;
                          }

                          return (
                            <option
                              key={
                                sangham.id ??
                                `${name}-${index}`
                              }
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        },
                      )}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  </div>

                </div>
              )}

              {/* TITLE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter title"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20"
                />

              </div>

              {/* FORMATION DATE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Formation Date *
                </label>

                <div className="relative">

                  <FaCalendarAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#8B1E3F]" />

                  <input
                    type="date"
                    name="formation_date"
                    value={formData.formation_date}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20"
                  />

                </div>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Enter description"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/20"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  disabled={saving}
                  className="h-11 flex-1 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] text-sm font-semibold text-white hover:bg-[#741832] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <FaSave />

                  {saving
                    ? "Saving..."
                    : editingId !== null
                      ? "Update Body"
                      : "Save Body"}

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

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="text-lg font-bold text-gray-900">
              Delete Executive Body?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this executive body?
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setDeleteId(null)
                }
                className="h-11 flex-1 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
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
