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
  FaEllipsisV,
  FaMapMarkerAlt,
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

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

const LOCATIONS_API = `${BACKEND_URL}/locations`;
const EXECUTIVE_API = `${BACKEND_URL}/executive-bodies`;

/* =========================================================
   STATES
========================================================= */

const STATES = ["Telangana"];

/* =========================================================
   TELANGANA DISTRICTS
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
   HELPERS
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

function getList(data: any): OptionItem[] {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.data)) return data.data;

  if (Array.isArray(data?.mandals)) return data.mandals;

  if (Array.isArray(data?.sanghams)) return data.sanghams;

  if (Array.isArray(data?.items)) return data.items;

  return [];
}

/* =========================================================
   PAGE
========================================================= */

export default function ExecutiveBodiesPage() {
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
     THREE DOT MENU
  ======================================================= */

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  /* =======================================================
     FORM
  ======================================================= */

  const [formData, setFormData] = useState(emptyForm);

  /* =======================================================
     LOCATIONS
  ======================================================= */

  const [districts, setDistricts] = useState<OptionItem[]>([]);
  const [mandals, setMandals] = useState<OptionItem[]>([]);
  const [sanghams, setSanghams] = useState<OptionItem[]>([]);

  const [loadingMandals, setLoadingMandals] = useState(false);
  const [loadingSanghams, setLoadingSanghams] = useState(false);

  /* =======================================================
     CLOSE 3 DOT MENU ON OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenMenuId(null);
    };

    if (openMenuId !== null) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  /* =======================================================
     FETCH BODIES
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
     FETCH DISTRICTS
  ======================================================= */

  const fetchDistricts = async () => {
    try {
      const response = await fetch(`${LOCATIONS_API}/districts`, {
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
            : data?.message || "Failed to fetch districts",
        );
      }

      setDistricts(getList(data));
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
        throw new Error(
          `District "${districtName}" not found in locations API`,
        );
      }

      const response = await fetch(
        `${LOCATIONS_API}/districts/${district.id}/mandals`,
        {
          method: "GET",
          cache: "no-store",
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
            : data?.message || "Failed to fetch mandals",
        );
      }

      setMandals(getList(data));
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
        throw new Error(`Mandal "${mandalName}" not found`);
      }

      const response = await fetch(
        `${LOCATIONS_API}/mandals/${mandal.id}/sanghams`,
        {
          method: "GET",
          cache: "no-store",
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
            : data?.message || "Failed to fetch sanghams",
        );
      }

      setSanghams(getList(data));
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
     LOCATION EFFECTS
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
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
      setSanghams([]);

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
      setSanghams([]);

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
      setSanghams([]);

      return;
    }

    if (name === "mandal") {
      setFormData((prev) => ({
        ...prev,
        mandal: value,
        sangham: "",
      }));

      setSanghams([]);

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =======================================================
     ADD
  ======================================================= */

  const openAddForm = () => {
    setOpenMenuId(null);
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

  const handleEdit = async (body: ExecutiveBody) => {
    setOpenMenuId(null);

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
      (body.executive_body === "Mandal Body" ||
        body.executive_body === "Sangham Body")
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
     SUBMIT
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
      setError("Please select District and Mandal");
      return;
    }

    if (
      formData.executive_body === "Sangham Body" &&
      (!formData.district ||
        !formData.mandal ||
        !formData.sangham)
    ) {
      setError("Please select District, Mandal and Sangham");
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

      const url =
        editingId !== null
          ? `${EXECUTIVE_API}/${editingId}`
          : EXECUTIVE_API;

      const method =
        editingId !== null ? "PUT" : "POST";

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
            : data?.message || "Failed to save executive body",
        );
      }

      await fetchBodies();

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);

      setMandals([]);
      setSanghams([]);
    } catch (err) {
      console.error("Executive body save error:", err);

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
            : data?.message || "Failed to delete executive body",
        );
      }

      setBodies((prev) =>
        prev.filter((body) => body.id !== deleteId),
      );

      setDeleteId(null);
    } catch (err) {
      console.error("Executive body delete error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete executive body",
      );
    }
  };

  /* =======================================================
     DATE
  ======================================================= */

  const formatDate = (date: string) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =======================================================
     LOCATION
  ======================================================= */

  const getLocationText = (body: ExecutiveBody) => {
    if (body.executive_body === "State Body") {
      return body.state || "";
    }

    if (body.executive_body === "District Body") {
      return [body.state, body.district]
        .filter(Boolean)
        .join(" • ");
    }

    if (body.executive_body === "Mandal Body") {
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
     BODY BADGE
  ======================================================= */

  const getBodyBadge = (body: string) => {
    switch (body) {
      case "State Body":
        return "bg-purple-50 text-purple-700";

      case "District Body":
        return "bg-blue-50 text-blue-700";

      case "Mandal Body":
        return "bg-emerald-50 text-emerald-700";

      case "Sangham Body":
        return "bg-orange-50 text-orange-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f7f7f8] p-4 md:p-6 lg:p-8">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8B1E3F] text-xl text-white shadow-sm">
            <FaBuilding />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Executive Bodies
              </h1>

              <span className="rounded-full bg-[#f8eef2] px-3 py-1 text-xs font-semibold text-[#8B1E3F]">
                {bodies.length} Total
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Manage State, District, Mandal and Sangham executive bodies
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#741832]"
        >
          <FaPlus />
          Add Executive Body
        </button>

      </div>

      {/* ===================================================
          ERROR
      =================================================== */}

      {error && (
        <div className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">

          <span>{error}</span>

          <button
            type="button"
            onClick={() => setError("")}
            className="text-red-400 hover:text-red-700"
          >
            <FaTimes />
          </button>

        </div>
      )}

      {/* ===================================================
          TABLE
      =================================================== */}

      {loading ? (

        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#8B1E3F]" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading Executive Bodies...
          </p>

        </div>

      ) : bodies.length === 0 ? (

        <div className="rounded-2xl border border-gray-100 bg-white p-16 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 text-2xl text-gray-300">
            <FaBuilding />
          </div>

          <h3 className="mt-5 font-semibold text-gray-900">
            No Executive Bodies
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Add your first executive body to get started.
          </p>

          <button
            type="button"
            onClick={openAddForm}
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#8B1E3F] px-4 text-sm font-semibold text-white hover:bg-[#741832]"
          >
            <FaPlus />
            Add Executive Body
          </button>

        </div>

      ) : (

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="flex flex-col gap-2 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-semibold text-gray-900">
                Executive Body List
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                View and manage all executive bodies
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-500">
              {bodies.length} records
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="min-w-[1050px] w-full text-left">

              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70">

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Executive Body
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Title
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Location
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Formation Date
                  </th>

                  <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Description
                  </th>

                  <th className="w-20 px-5 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {bodies.map((body) => (

                  <tr
                    key={body.id}
                    className="group border-b border-gray-100 transition hover:bg-[#fffafb]"
                  >

                    {/* BODY */}

                    <td className="px-5 py-5">

                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${getBodyBadge(
                          body.executive_body,
                        )}`}
                      >
                        {body.executive_body}
                      </span>

                    </td>

                    {/* TITLE */}

                    <td className="px-5 py-5">

                      <div className="max-w-[230px]">

                        <p className="truncate text-sm font-semibold text-gray-900">
                          {body.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          ID #{body.id}
                        </p>

                      </div>

                    </td>

                    {/* LOCATION */}

                    <td className="px-5 py-5">

                      <div className="flex max-w-[260px] items-start gap-2">

                        <FaMapMarkerAlt className="mt-0.5 shrink-0 text-xs text-[#8B1E3F]" />

                        <span className="text-sm leading-5 text-gray-600">
                          {getLocationText(body) || "—"}
                        </span>

                      </div>

                    </td>

                    {/* DATE */}

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-2 whitespace-nowrap">

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f8eef2] text-xs text-[#8B1E3F]">
                          <FaCalendarAlt />
                        </div>

                        <span className="text-sm font-medium text-gray-600">
                          {formatDate(body.formation_date)}
                        </span>

                      </div>

                    </td>

                    {/* DESCRIPTION */}

                    <td className="px-5 py-5">

                      <p className="line-clamp-2 max-w-[300px] text-sm leading-5 text-gray-500">
                        {body.description || "—"}
                      </p>

                    </td>

                    {/* ACTIONS */}

                    <td className="relative px-5 py-5 text-right">

                      <button
                        type="button"
                        title="More actions"
                        onClick={(e) => {
                          e.stopPropagation();

                          setOpenMenuId((prev) =>
                            prev === body.id
                              ? null
                              : body.id,
                          );
                        }}
                        className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                          openMenuId === body.id
                            ? "bg-[#f8eef2] text-[#8B1E3F]"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                      >
                        <FaEllipsisV />
                      </button>

                      {/* 3 DOT MENU */}

                      {openMenuId === body.id && (

                        <div
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          className="absolute right-5 top-14 z-50 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl"
                        >

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(body)
                            }
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-yellow-50 hover:text-yellow-700"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
                              <FaEdit />
                            </span>

                            Edit Body
                          </button>

                          <div className="my-1 border-t border-gray-100" />

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              setDeleteId(body.id);
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                              <FaTrash />
                            </span>

                            Delete Body
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}

      {/* ===================================================
          ADD / EDIT MODAL
      =================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="max-h-[94vh] w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f8eef2] text-[#8B1E3F]">
                  <FaBuilding />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    {editingId !== null
                      ? "Edit Executive Body"
                      : "Add Executive Body"}
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-500">
                    Enter executive body information
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => {
                  if (!saving) {
                    setShowForm(false);
                    setError("");
                  }
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <FaTimes />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="max-h-[calc(94vh-90px)] space-y-5 overflow-y-auto p-6"
            >

              {/* EXECUTIVE BODY */}

              <div>

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

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                </div>

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

                  <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                </div>

              </div>

              {/* DISTRICT */}

              {(formData.executive_body === "District Body" ||
                formData.executive_body === "Mandal Body" ||
                formData.executive_body === "Sangham Body") && (

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
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 disabled:bg-gray-100"
                    >

                      <option value="">
                        {!formData.state
                          ? "Select State First"
                          : "Select District"}
                      </option>

                      {formData.state === "Telangana" &&
                        (districts.length > 0
                          ? districts.map(
                              (district, index) => {
                                const name =
                                  getItemName(
                                    district,
                                  );

                                if (!name) return null;

                                return (
                                  <option
                                    key={
                                      district.id ??
                                      `${name}-${index}`
                                    }
                                    value={name}
                                  >
                                    {name}
                                  </option>
                                );
                              },
                            )
                          : TELANGANA_DISTRICTS.map(
                              (district) => (
                                <option
                                  key={district}
                                  value={district}
                                >
                                  {district}
                                </option>
                              ),
                            ))}

                    </select>

                    <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                  </div>

                  {formData.state === "Telangana" && (
                    <p className="mt-1.5 text-xs text-gray-400">
                      {districts.length ||
                        TELANGANA_DISTRICTS.length}{" "}
                      Telangana districts available
                    </p>
                  )}

                </div>
              )}

              {/* MANDAL */}

              {(formData.executive_body === "Mandal Body" ||
                formData.executive_body === "Sangham Body") && (

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
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 disabled:bg-gray-100"
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
                        (mandal, index) => {
                          const name =
                            getItemName(mandal);

                          if (!name) return null;

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

              {formData.executive_body === "Sangham Body" && (

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
                      className="h-12 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10 disabled:bg-gray-100"
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
                        (sangham, index) => {
                          const name =
                            getItemName(
                              sangham,
                            );

                          if (!name) return null;

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
                  placeholder="Enter executive body title"
                  className="h-12 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
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
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
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
                  placeholder="Enter executive body description"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#8B1E3F] focus:ring-2 focus:ring-[#8B1E3F]/10"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row">

                <button
                  type="button"
                  onClick={() => {
                    if (!saving) {
                      setShowForm(false);
                      setError("");
                    }
                  }}
                  disabled={saving}
                  className="h-11 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#8B1E3F] text-sm font-semibold text-white shadow-sm transition hover:bg-[#741832] disabled:cursor-not-allowed disabled:opacity-60"
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

      {/* ===================================================
          DELETE MODAL
      =================================================== */}

      {deleteId !== null && (

        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* TOP */}

            <div className="p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <FaTrash />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-gray-900">
                    Delete Executive Body?
                  </h2>

                  <p className="mt-1.5 text-sm leading-5 text-gray-500">
                    Are you sure you want to delete this executive body?
                    This action cannot be undone.
                  </p>

                </div>

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3 border-t border-gray-100 bg-gray-50/70 p-5">

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="h-11 flex-1 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-semibold text-white transition hover:bg-red-700"
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