"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaBuilding,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
  FaCalendarAlt,
  FaChevronDown,
  FaEllipsisV,
  FaMapMarkerAlt,
} from "react-icons/fa";

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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const LOCATIONS_API = `${BACKEND_URL}/locations`;
const EXECUTIVE_API = `${BACKEND_URL}/executive-bodies`;

const STATES = ["Telangana"];

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

const bodyOptions = [
  "State Body",
  "District Body",
  "Mandal Body",
  "Sangham Body",
];

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

function getList(data: any): OptionItem[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.mandals)) return data.mandals;
  if (Array.isArray(data?.sanghams)) return data.sanghams;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export default function ExecutiveBodiesPage() {
  const [bodies, setBodies] = useState<ExecutiveBody[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [formData, setFormData] = useState(emptyForm);

  const [districts, setDistricts] = useState<OptionItem[]>([]);
  const [mandals, setMandals] = useState<OptionItem[]>([]);

  const [loadingMandals, setLoadingMandals] = useState(false);

  // =========================================================
  // FETCH EXECUTIVE BODIES
  // =========================================================

  const fetchBodies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(EXECUTIVE_API);

      if (!response.ok) {
        throw new Error("Failed to fetch executive bodies");
      }

      const data = await response.json();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];

      setBodies(list);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load executive bodies");
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FETCH DISTRICTS
  // =========================================================

  const fetchDistricts = async () => {
    try {
      const response = await fetch(`${LOCATIONS_API}/districts`);

      if (!response.ok) {
        throw new Error("Failed to fetch districts");
      }

      const data = await response.json();
      const list = getList(data);

      setDistricts(list);
    } catch (err) {
      console.error("District fetch error:", err);

      // Fallback to Telangana districts
      setDistricts(
        TELANGANA_DISTRICTS.map((name, index) => ({
          id: index + 1,
          name,
        }))
      );
    }
  };

  // =========================================================
  // FETCH MANDALS
  // =========================================================

  const fetchMandals = async (districtName: string) => {
    if (!districtName) {
      setMandals([]);
      return;
    }

    try {
      setLoadingMandals(true);
      setMandals([]);

      const district = districts.find(
        (item) => getItemName(item) === districtName
      );

      if (!district?.id) {
        setMandals([]);
        return;
      }

      const response = await fetch(
        `${LOCATIONS_API}/districts/${district.id}/mandals`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch mandals");
      }

      const data = await response.json();

      setMandals(getList(data));
    } catch (err) {
      console.error("Mandal fetch error:", err);
      setMandals([]);
    } finally {
      setLoadingMandals(false);
    }
  };

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    fetchBodies();
    fetchDistricts();
  }, []);

  // =========================================================
  // LOAD MANDALS WHEN REQUIRED
  // =========================================================

  useEffect(() => {
    if (
      formData.executive_body === "Mandal Body" ||
      formData.executive_body === "Sangham Body"
    ) {
      if (formData.district) {
        fetchMandals(formData.district);
      } else {
        setMandals([]);
      }
    } else {
      setMandals([]);
    }
  }, [
    formData.state,
    formData.district,
    formData.executive_body,
    districts,
  ]);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

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
      return;
    }

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
        mandal: "",
        sangham: "",
      }));

      setMandals([]);
      return;
    }

    if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        mandal: "",
        sangham: "",
      }));

      setMandals([]);
      return;
    }

    if (name === "mandal") {
      setFormData((prev) => ({
        ...prev,
        mandal: value,
        sangham: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // OPEN ADD FORM
  // =========================================================

  const openAddForm = () => {
    setEditingId(null);
    setFormData({
      ...emptyForm,
      state: "Telangana",
    });

    setMandals([]);
    setError("");
    setShowForm(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setMandals([]);
    setError("");
  };

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = async (body: ExecutiveBody) => {
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

    setError("");
    setShowForm(true);

    if (
      (body.executive_body === "Mandal Body" ||
        body.executive_body === "Sangham Body") &&
      body.district
    ) {
      await fetchMandals(body.district);
    }
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!formData.executive_body) {
      return "Please select Executive Body.";
    }

    if (formData.executive_body === "State Body") {
      if (!formData.state) {
        return "Please select State.";
      }
    }

    if (
      formData.executive_body === "District Body" ||
      formData.executive_body === "Mandal Body" ||
      formData.executive_body === "Sangham Body"
    ) {
      if (!formData.state) {
        return "Please select State.";
      }

      if (!formData.district) {
        return "Please select District.";
      }
    }

    if (
      formData.executive_body === "Mandal Body" ||
      formData.executive_body === "Sangham Body"
    ) {
      if (!formData.mandal) {
        return "Please select Mandal.";
      }
    }

    // Sangham is now manually typed
    if (formData.executive_body === "Sangham Body") {
      if (!formData.sangham.trim()) {
        return "Please enter Sangham name.";
      }
    }

    if (!formData.title.trim()) {
      return "Please enter Title.";
    }

    if (!formData.formation_date) {
      return "Please select Formation Date.";
    }

    if (!formData.description.trim()) {
      return "Please enter Description.";
    }

    return "";
  };

  // =========================================================
  // SAVE
  // =========================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        executive_body: formData.executive_body,
        state: formData.state || null,
        district: formData.district || null,
        mandal: formData.mandal || null,

        // Manual Sangham value
        sangham:
          formData.executive_body === "Sangham Body"
            ? formData.sangham.trim()
            : null,

        title: formData.title.trim(),
        formation_date: formData.formation_date,
        description: formData.description.trim(),
      };

      const url = editingId
        ? `${EXECUTIVE_API}/${editingId}`
        : EXECUTIVE_API;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Failed to save executive body"
        );
      }

      await fetchBodies();

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
      setMandals([]);
    } catch (err: any) {
      console.error("Save error:", err);

      setError(
        err?.message || "Something went wrong while saving."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const confirmDelete = async () => {
    if (!deleteId) return;

    try {
      setSaving(true);
      setError("");

      const response = await fetch(
        `${EXECUTIVE_API}/${deleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Failed to delete executive body"
        );
      }

      setDeleteId(null);
      setOpenMenuId(null);

      await fetchBodies();
    } catch (err: any) {
      console.error("Delete error:", err);

      setError(
        err?.message || "Failed to delete executive body."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // LOCATION DISPLAY
  // =========================================================

  const getLocation = (body: ExecutiveBody) => {
    const parts: string[] = [];

    if (body.state) parts.push(body.state);
    if (body.district) parts.push(body.district);
    if (body.mandal) parts.push(body.mandal);

    if (body.executive_body === "Sangham Body" && body.sangham) {
      parts.push(body.sangham);
    }

    return parts.length ? parts.join(" • ") : "Not Available";
  };

  // =========================================================
  // FILTER / COUNTS
  // =========================================================

  const totalBodies = bodies.length;

  const stateBodies = useMemo(
    () =>
      bodies.filter(
        (item) => item.executive_body === "State Body"
      ).length,
    [bodies]
  );

  const districtBodies = useMemo(
    () =>
      bodies.filter(
        (item) => item.executive_body === "District Body"
      ).length,
    [bodies]
  );

  const mandalBodies = useMemo(
    () =>
      bodies.filter(
        (item) => item.executive_body === "Mandal Body"
      ).length,
    [bodies]
  );

  const sanghamBodies = useMemo(
    () =>
      bodies.filter(
        (item) => item.executive_body === "Sangham Body"
      ).length,
    [bodies]
  );

  // =========================================================
  // BODY SELECT HELPER
  // =========================================================

  const showState =
    formData.executive_body === "State Body" ||
    formData.executive_body === "District Body" ||
    formData.executive_body === "Mandal Body" ||
    formData.executive_body === "Sangham Body";

  const showDistrict =
    formData.executive_body === "District Body" ||
    formData.executive_body === "Mandal Body" ||
    formData.executive_body === "Sangham Body";

  const showMandal =
    formData.executive_body === "Mandal Body" ||
    formData.executive_body === "Sangham Body";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8B1E3F] text-white">
                <FaBuilding size={20} />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Executive Bodies
                </h1>

                <p className="text-sm text-gray-500">
                  Manage State, District, Mandal and Sangham bodies
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-5 text-sm font-semibold text-white transition hover:bg-[#751833]"
          >
            <FaPlus size={14} />
            Add Executive Body
          </button>
        </div>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {error && (
          <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="shrink-0 text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* ================================================= */}
        {/* STATISTICS */}
        {/* ================================================= */}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Total
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {totalBodies}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              State
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {stateBodies}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              District
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {districtBodies}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Mandal
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {mandalBodies}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">
              Sangham
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              {sanghamBodies}
            </p>
          </div>
        </div>

        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="font-semibold text-gray-900">
              Executive Body List
            </h2>
          </div>

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-sm text-gray-500">
                Loading executive bodies...
              </div>
            </div>
          ) : bodies.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">
              <FaBuilding
                size={35}
                className="mb-3 text-gray-300"
              />

              <h3 className="font-semibold text-gray-800">
                No Executive Bodies Found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add your first executive body.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Body
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Location
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Title
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Formation Date
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Description
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {bodies.map((body) => (
                    <tr
                      key={body.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-[#8B1E3F]">
                            <FaBuilding size={16} />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {body.executive_body}
                            </p>

                            <p className="text-xs text-gray-400">
                              ID: {body.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex max-w-[300px] items-start gap-2 text-sm text-gray-600">
                          <FaMapMarkerAlt
                            className="mt-0.5 shrink-0 text-gray-400"
                            size={13}
                          />

                          <span>
                            {getLocation(body)}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-sm font-medium text-gray-800">
                          {body.title}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCalendarAlt
                            size={13}
                            className="text-gray-400"
                          />

                          {body.formation_date
                            ? new Date(
                                body.formation_date
                              ).toLocaleDateString("en-IN")
                            : "Not Available"}
                        </div>
                      </td>

                      <td className="max-w-[300px] px-5 py-4">
                        <p className="line-clamp-2 text-sm text-gray-500">
                          {body.description ||
                            "Not Available"}
                        </p>
                      </td>

                      <td className="relative px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === body.id
                                ? null
                                : body.id
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                        >
                          <FaEllipsisV size={14} />
                        </button>

                        {openMenuId === body.id && (
                          <div className="absolute right-5 top-14 z-20 w-36 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 text-left shadow-lg">
                            <button
                              type="button"
                              onClick={() => {
                                handleEdit(body);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              <FaEdit size={13} />
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setDeleteId(body.id);
                                setOpenMenuId(null);
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                              <FaTrash size={13} />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ===================================================== */}
      {/* ADD / EDIT MODAL */}
      {/* ===================================================== */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId
                    ? "Edit Executive Body"
                    : "Add Executive Body"}
                </h2>

                <p className="mt-0.5 text-xs text-gray-500">
                  Enter executive body details below
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed"
              >
                <FaTimes />
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-5 py-5 sm:px-6"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Executive Body */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Executive Body *
                  </label>

                  <div className="relative">
                    <select
                      name="executive_body"
                      value={formData.executive_body}
                      onChange={handleChange}
                      required
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                    >
                      <option value="">
                        Select Executive Body
                      </option>

                      {bodyOptions.map((option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>

                    <FaChevronDown
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={13}
                    />
                  </div>
                </div>

                {/* State */}
                {showState && (
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
                        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                      >
                        <option value="">
                          Select State
                        </option>

                        {STATES.map((state) => (
                          <option
                            key={state}
                            value={state}
                          >
                            {state}
                          </option>
                        ))}
                      </select>

                      <FaChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={13}
                      />
                    </div>
                  </div>
                )}

                {/* District */}
                {showDistrict && (
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
                        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                      >
                        <option value="">
                          Select District
                        </option>

                        {(
                          districts.length
                            ? districts.map((item) =>
                                getItemName(item)
                              )
                            : TELANGANA_DISTRICTS
                        ).map((district) => (
                          <option
                            key={district}
                            value={district}
                          >
                            {district}
                          </option>
                        ))}
                      </select>

                      <FaChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={13}
                      />
                    </div>
                  </div>
                )}

                {/* Mandal */}
                {showMandal && (
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
                        className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
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

                        {mandals.map((mandal) => {
                          const name = getItemName(mandal);

                          return (
                            <option
                              key={String(
                                mandal.id ?? name
                              )}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>

                      <FaChevronDown
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={13}
                      />
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* SANGHAM - MANUAL TEXT INPUT */}
                {/* ================================================= */}

                {formData.executive_body ===
                  "Sangham Body" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Sangham *
                    </label>

                    <input
                      type="text"
                      name="sangham"
                      value={formData.sangham}
                      onChange={handleChange}
                      required
                      disabled={!formData.mandal}
                      placeholder={
                        !formData.mandal
                          ? "Select Mandal First"
                          : "Enter Sangham Name"
                      }
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <p className="mt-1.5 text-xs text-gray-400">
                      Enter Sangham name manually
                    </p>
                  </div>
                )}

                {/* Title */}
                <div
                  className={
                    formData.executive_body ===
                      "Sangham Body"
                      ? ""
                      : "sm:col-span-2"
                  }
                >
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
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                  />
                </div>

                {/* Formation Date */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Formation Date *
                  </label>

                  <div className="relative">
                    <input
                      type="date"
                      name="formation_date"
                      value={formData.formation_date}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
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
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-6 text-sm font-semibold text-white transition hover:bg-[#751833] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaSave size={14} />

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update"
                      : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================== */}
      {/* DELETE CONFIRMATION */}
      {/* ===================================================== */}

      {deleteId !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FaTrash />
            </div>

            <h2 className="mt-4 text-lg font-bold text-gray-900">
              Delete Executive Body?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this executive
              body? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                disabled={saving}
                className="h-11 rounded-xl border border-gray-200 px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={saving}
                className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}