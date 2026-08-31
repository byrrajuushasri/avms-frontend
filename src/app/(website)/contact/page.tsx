"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUsers,
  FaSyncAlt,
  FaTimes,
} from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type ExecutiveDesignation =
  | "President"
  | "Vice President"
  | "General Secretary"
  | "Joint Secretary";

type ExecutiveMember = {
  id?: number | string;
  member_id?: string;

  full_name?: string;
  name?: string;
  member_name?: string;

  mobile?: string;
  phone?: string;
  mobile_number?: string;

  email?: string;

  photo?: string | null;
  image?: string | null;
  profile_photo?: string | null;

  designation?: string | null;
  designation_name?: string | null;
  post?: string | null;
  position?: string | null;

  executive_body?: string | null;
  executiveBody?: string | null;
  body_type?: string | null;
  bodyType?: string | null;

  body?: string | null;
  category?: string | null;

  state?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangam?: string | null;

  location?: string | null;
  address?: string | null;

  status?: string | null;

  [key: string]: any;
};

/* =========================================================
   API
========================================================= */

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

const MEMBERS_API =
  `${BACKEND_URL}/membership-register/public/executives`;
/* =========================================================
   ALLOWED DESIGNATIONS
========================================================= */

const ALLOWED_DESIGNATIONS: ExecutiveDesignation[] = [
  "President",
  "Vice President",
  "General Secretary",
  "Joint Secretary",
];

/* =========================================================
   BODY FILTERS
========================================================= */

const bodyFilters = [
  "State",
  "District",
  "Mandal",
  "Sangam",
];

/* =========================================================
   DESIGNATION FILTERS
========================================================= */

const designationFilters = [
  "All",
  ...ALLOWED_DESIGNATIONS,
];

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (value?: any) => {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
};

/* =========================================================
   DESIGNATION NORMALIZER
========================================================= */

const getDesignation = (
  member: ExecutiveMember,
): ExecutiveDesignation | null => {
  const raw = normalizeText(
    member.designation ??
      member.designation_name ??
      member.post ??
      member.position,
  );

  if (
    raw === "president" ||
    raw.includes("president") &&
    !raw.includes("vice")
  ) {
    return "President";
  }

  if (
    raw === "vice president" ||
    raw === "vicepresident"
  ) {
    return "Vice President";
  }

  if (
    raw === "general secretary" ||
    raw === "generalsecretary"
  ) {
    return "General Secretary";
  }

  if (
    raw === "joint secretary" ||
    raw === "jointsecretary"
  ) {
    return "Joint Secretary";
  }

  return null;
};

/* =========================================================
   EXECUTIVE BODY NORMALIZER
========================================================= */

const getExecutiveBody = (
  member: ExecutiveMember,
) => {
  return normalizeText(
    member.executive_body ??
      member.executiveBody ??
      member.body_type ??
      member.bodyType ??
      member.body ??
      member.category,
  );
};

/* =========================================================
   BODY NORMALIZER
========================================================= */

const getBodyType = (
  member: ExecutiveMember,
) => {
  const body = getExecutiveBody(member);

  if (
    body === "state" ||
    body === "state body" ||
    body.startsWith("state ")
  ) {
    return "State";
  }

  if (
    body === "district" ||
    body === "dist" ||
    body === "district body" ||
    body === "dist body" ||
    body.startsWith("district ") ||
    body.startsWith("dist ")
  ) {
    return "District";
  }

  if (
    body === "mandal" ||
    body === "mandal body" ||
    body.startsWith("mandal ")
  ) {
    return "Mandal";
  }

  if (
    body === "sangam" ||
    body === "sangam body" ||
    body.startsWith("sangam ")
  ) {
    return "Sangam";
  }

  return "";
};

/* =========================================================
   CHECK EXECUTIVE BODY
========================================================= */

const isExecutiveBody = (
  member: ExecutiveMember,
) => {
  return Boolean(getBodyType(member));
};

/* =========================================================
   PHOTO URL
========================================================= */

const getPhotoUrl = (
  member: ExecutiveMember,
) => {
  const photo =
    member.photo ??
    member.image ??
    member.profile_photo ??
    "";

  if (!photo) {
    return "";
  }

  const value = String(photo).trim();

  if (!value) {
    return "";
  }

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${BACKEND_URL}${value}`;
  }

  return `${BACKEND_URL}/${value}`;
};

/* =========================================================
   MEMBER NAME
========================================================= */

const getMemberName = (
  member: ExecutiveMember,
) => {
  return (
    member.full_name ??
    member.name ??
    member.member_name ??
    "Member"
  );
};

/* =========================================================
   PHONE
========================================================= */

const getPhone = (
  member: ExecutiveMember,
) => {
  return (
    member.mobile ??
    member.phone ??
    member.mobile_number ??
    ""
  );
};

/* =========================================================
   EMAIL
========================================================= */

const getEmail = (
  member: ExecutiveMember,
) => {
  return member.email ?? "";
};

/* =========================================================
   BODY DISPLAY NAME
========================================================= */

const getBodyName = (
  member: ExecutiveMember,
) => {
  const body = getBodyType(member);

  if (body) {
    return `${body} Body`;
  }

  return "Executive Body";
};

/* =========================================================
   LOCATION
========================================================= */

const getLocation = (
  member: ExecutiveMember,
) => {
  if (member.location) {
    return member.location;
  }

  if (member.address) {
    return member.address;
  }

  const parts = [
    member.sangam,
    member.mandal,
    member.district,
    member.state,
  ].filter(Boolean);

  return parts.join(", ");
};

/* =========================================================
   STATUS
========================================================= */

const isActiveMember = (
  member: ExecutiveMember,
) => {
  if (!member.status) {
    return true;
  }

  return (
    normalizeText(member.status) === "active"
  );
};

/* =========================================================
   PAGE
========================================================= */

export default function StateContactsPage() {
  const [members, setMembers] = useState<
    ExecutiveMember[]
  >([]);

  const [selectedBody, setSelectedBody] =
    useState("State");

  const [selectedDesignation, setSelectedDesignation] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedMember, setSelectedMember] =
    useState<ExecutiveMember | null>(null);

  /* =======================================================
     FETCH MEMBERS
  ======================================================= */

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        "Executive Members API:",
        MEMBERS_API,
      );

      const response = await fetch(
        MEMBERS_API,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        },
      );

      console.log(
        "Executive API Status:",
        response.status,
        response.statusText,
      );

      if (!response.ok) {
        let errorText = "";

        try {
          errorText = await response.text();
        } catch {
          errorText = "";
        }

        console.error(
          "Executive API Error Response:",
          errorText,
        );

        throw new Error(
          `Failed to fetch members. Status: ${response.status}`,
        );
      }

      const data = await response.json();

      console.log(
        "Executive Members Response:",
        data,
      );

      /*
        Supported responses:

        []

        {
          data: []
        }

        {
          members: []
        }

        {
          items: []
        }
      */

      let memberArray: ExecutiveMember[] = [];

      if (Array.isArray(data)) {
        memberArray = data;
      } else if (
        Array.isArray(data?.data)
      ) {
        memberArray = data.data;
      } else if (
        Array.isArray(data?.members)
      ) {
        memberArray = data.members;
      } else if (
        Array.isArray(data?.items)
      ) {
        memberArray = data.items;
      }

      setMembers(memberArray);
    } catch (err) {
      console.error(
        "Executive Members API Error:",
        err,
      );

      setError(
        "Executive Members data load కాలేదు. Backend server మరియు API endpoint check చేయండి.",
      );

      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchMembers();
  }, []);

  /* =======================================================
     EXECUTIVE MEMBERS
  ======================================================= */

  const executiveMembers = useMemo(() => {
    return members.filter((member) => {
      const designation =
        getDesignation(member);

      return (
        isActiveMember(member) &&
        isExecutiveBody(member) &&
        designation !== null
      );
    });
  }, [members]);

  /* =======================================================
     FILTERED MEMBERS
  ======================================================= */

  const filteredMembers = useMemo(() => {
    return executiveMembers.filter(
      (member) => {
        const designation =
          getDesignation(member);

        const body =
          getBodyType(member);

        /* BODY */

        const bodyMatch =
          selectedBody === "All" ||
          body === selectedBody;

        /* DESIGNATION */

        const designationMatch =
          selectedDesignation === "All" ||
          designation ===
            selectedDesignation;

        return (
          bodyMatch &&
          designationMatch
        );
      },
    );
  }, [
    executiveMembers,
    selectedBody,
    selectedDesignation,
  ]);

  /* =======================================================
     CHANGE BODY
  ======================================================= */

  const changeBody = (
    body: string,
  ) => {
    setSelectedBody(body);
    setSelectedDesignation("All");
  };

  /* =======================================================
     CHANGE DESIGNATION
  ======================================================= */

  const changeDesignation = (
    designation: string,
  ) => {
    setSelectedDesignation(
      designation,
    );
  };

  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSelectedBody("State");
    setSelectedDesignation("All");
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <div className="text-center">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#800018]">
              Executive Body
            </p>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#800018]">
              Executive Members
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500">
              President, Vice President, General
              Secretary and Joint Secretary
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          FILTERS
      ================================================= */}

      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">

          {/* BODY FILTER */}

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3">
              Executive Body
            </p>

            <div className="flex flex-wrap gap-2">

              {bodyFilters.map((body) => (

                <button
                  key={body}
                  type="button"
                  onClick={() =>
                    changeBody(body)
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    selectedBody === body
                      ? "bg-[#800018] text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-[#800018]"
                  }`}
                >
                  {body}
                </button>

              ))}

            </div>

          </div>
 
           

        </div>

      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* ERROR */}

          {error && (

            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <p className="text-sm text-red-700">
                    {error}
                  </p>

                  <p className="mt-1 text-xs text-red-500 break-all">
                    API: {MEMBERS_API}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={fetchMembers}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  <FaSyncAlt />
                  Retry
                </button>

              </div>

            </div>

          )}

          {/* COUNT */}

          {!loading && (

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {selectedBody} Executive Members
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {selectedDesignation ===
                  "All"
                    ? "All Executive Designations"
                    : selectedDesignation}
                </p>

              </div>

              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">

                <FaUsers className="text-[#800018]" />

                <span className="text-sm font-bold text-gray-700">
                  {filteredMembers.length}
                </span>

                <span className="text-sm text-gray-500">
                  Members
                </span>

              </div>

            </div>

          )}

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center">

              <div className="mx-auto h-10 w-10 rounded-full border-4 border-red-100 border-t-[#800018] animate-spin" />

              <p className="mt-4 text-sm text-gray-500">
                Loading Executive Members...
              </p>

            </div>

          )}

          {/* =================================================
              MEMBERS
          ================================================= */}

          {!loading &&
            filteredMembers.length > 0 && (

              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredMembers.map(
                  (member, index) => {

                    const designation =
                      getDesignation(
                        member,
                      );

                    const photo =
                      getPhotoUrl(member);

                    const name =
                      getMemberName(member);

                    const phone =
                      getPhone(member);

                    const email =
                      getEmail(member);

                    const location =
                      getLocation(member);

                    const body =
                      getBodyName(member);

                    return (

                      <article
                        key={
                          member.id ??
                          member.member_id ??
                          index
                        }
                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                      >

                        {/* PHOTO */}

                        <div className="relative h-72 w-full overflow-hidden bg-gray-100">

                          {photo ? (

                            <Image
                              src={photo}
                              alt={name}
                              fill
                              unoptimized
                              className="object-cover transition duration-500 group-hover:scale-105"
                            />

                          ) : (

                            <div className="flex h-full w-full items-center justify-center bg-gray-100">

                              <FaUsers className="text-6xl text-gray-300" />

                            </div>

                          )}

                          {/* BODY */}

                          <div className="absolute top-4 left-4">

                            <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#800018] shadow">
                              {body}
                            </span>

                          </div>

                          {/* DESIGNATION */}

                          {designation && (

                            <div className="absolute bottom-4 left-4 right-4">

                              <span className="inline-block rounded-lg bg-[#800018] px-3 py-2 text-xs font-bold text-white shadow-lg">
                                {designation}
                              </span>

                            </div>

                          )}

                        </div>

                        {/* CONTENT */}

                        <div className="p-5">

                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#800018] transition">
                            {name}
                          </h3>

                          {member.member_id && (

                            <p className="mt-1 text-xs text-gray-400">
                              Member ID:{" "}
                              {member.member_id}
                            </p>

                          )}

                          <div className="my-4 h-px bg-gray-100" />

                          {/* PHONE */}

                          {phone && (

                            <a
                              href={`tel:${String(
                                phone,
                              ).replace(
                                /\s/g,
                                "",
                              )}`}
                              className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 hover:bg-red-50 transition"
                            >

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#a00018] text-white">

                                <FaPhoneAlt className="text-sm" />

                              </div>

                              <div className="min-w-0">

                                <p className="text-xs font-semibold text-gray-400">
                                  Phone
                                </p>

                                <p className="text-sm font-bold text-gray-700 truncate">
                                  {phone}
                                </p>

                              </div>

                            </a>

                          )}

                          {/* EMAIL */}

                          {email && (

                            <a
                              href={`mailto:${email}`}
                              className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-3 hover:bg-red-50 transition"
                            >

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#800018] text-white">

                                <FaEnvelope className="text-sm" />

                              </div>

                              <div className="min-w-0">

                                <p className="text-xs font-semibold text-gray-400">
                                  Email
                                </p>

                                <p className="text-sm font-bold text-gray-700 truncate">
                                  {email}
                                </p>

                              </div>

                            </a>

                          )}

                          {/* LOCATION */}

                          {location && (

                            <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 p-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[#a00018]">

                                <FaMapMarkerAlt className="text-sm" />

                              </div>

                              <div className="min-w-0">

                                <p className="text-xs font-semibold text-gray-400">
                                  Location
                                </p>

                                <p className="mt-1 text-sm font-medium text-gray-700">
                                  {location}
                                </p>

                              </div>

                            </div>

                          )}

                          {/* VIEW */}

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedMember(
                                member,
                              )
                            }
                            className="mt-5 w-full rounded-xl bg-[#800018] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a00018]"
                          >
                            View Details
                          </button>

                        </div>

                      </article>

                    );
                  },
                )}

              </div>

            )}

          {/* =================================================
              NO MEMBERS
          ================================================= */}

          {!loading &&
            filteredMembers.length === 0 && (

              <div className="rounded-2xl border border-gray-200 bg-white px-5 py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[#800018]">

                  <FaUsers className="text-2xl" />

                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  No Executive Members Found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  No active Executive Members
                  are available for the selected
                  body and designation.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#800018] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#a00018]"
                >
                  Reset Filters
                </button>

              </div>

            )}

        </div>

      </section>

      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      {selectedMember && (

        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() =>
            setSelectedMember(null)
          }
        >

          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">

              <div>

                <p className="text-xs font-bold uppercase tracking-wide text-[#800018]">
                  {getDesignation(
                    selectedMember,
                  )}
                </p>

                <h2 className="text-lg font-bold text-gray-900">
                  Member Details
                </h2>

              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(null)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-[#800018]"
              >
                <FaTimes />
              </button>

            </div>

            {/* PHOTO */}

            <div className="relative h-72 w-full bg-gray-100">

              {getPhotoUrl(
                selectedMember,
              ) ? (

                <Image
                  src={getPhotoUrl(
                    selectedMember,
                  )}
                  alt={getMemberName(
                    selectedMember,
                  )}
                  fill
                  unoptimized
                  className="object-cover"
                />

              ) : (

                <div className="flex h-full items-center justify-center">

                  <FaUsers className="text-7xl text-gray-300" />

                </div>

              )}

            </div>

            {/* DETAILS */}

            <div className="p-6">

              <h2 className="text-2xl font-bold text-gray-900">
                {getMemberName(
                  selectedMember,
                )}
              </h2>

              <p className="mt-1 font-semibold text-[#800018]">
                {getDesignation(
                  selectedMember,
                )}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {getBodyName(
                  selectedMember,
                )}
              </p>

              {selectedMember.member_id && (

                <p className="mt-2 text-xs text-gray-400">
                  Member ID:{" "}
                  {selectedMember.member_id}
                </p>

              )}

              {/* PHONE */}

              {getPhone(
                selectedMember,
              ) && (

                <a
                  href={`tel:${getPhone(
                    selectedMember,
                  ).replace(
                    /\s/g,
                    "",
                  )}`}
                  className="mt-5 flex items-center gap-3 rounded-xl bg-gray-50 p-4 hover:bg-red-50"
                >

                  <FaPhoneAlt className="text-[#800018]" />

                  <div>

                    <p className="text-xs text-gray-400">
                      Phone
                    </p>

                    <p className="font-semibold text-gray-700">
                      {getPhone(
                        selectedMember,
                      )}
                    </p>

                  </div>

                </a>

              )}

              {/* EMAIL */}

              {getEmail(
                selectedMember,
              ) && (

                <a
                  href={`mailto:${getEmail(
                    selectedMember,
                  )}`}
                  className="mt-3 flex items-center gap-3 rounded-xl bg-gray-50 p-4 hover:bg-red-50"
                >

                  <FaEnvelope className="text-[#800018]" />

                  <div className="min-w-0">

                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="font-semibold text-gray-700 break-all">
                      {getEmail(
                        selectedMember,
                      )}
                    </p>

                  </div>

                </a>

              )}

              {/* LOCATION */}

              {getLocation(
                selectedMember,
              ) && (

                <div className="mt-3 flex items-start gap-3 rounded-xl bg-gray-50 p-4">

                  <FaMapMarkerAlt className="mt-1 text-[#800018]" />

                  <div>

                    <p className="text-xs text-gray-400">
                      Location
                    </p>

                    <p className="font-semibold text-gray-700">
                      {getLocation(
                        selectedMember,
                      )}
                    </p>

                  </div>

                </div>

              )}

              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(null)
                }
                className="mt-6 w-full rounded-xl bg-[#800018] px-4 py-3 text-sm font-semibold text-white hover:bg-[#a00018]"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </main>
  );
}

