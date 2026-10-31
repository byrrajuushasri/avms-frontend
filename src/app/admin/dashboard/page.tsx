"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  FaUsers,
  FaUserCheck,
  FaCrown,
  FaMale,
  FaFemale,
  FaArrowRight,
  FaSearch,
  FaCheckCircle,
  FaClock,
  FaSyncAlt,
  FaUser,
} from "react-icons/fa";
import { getStorageImageUrl } from "@/lib/storage-image-url";

/* =========================================================
   TYPES
========================================================= */

type Member = {
  id?: number | string;
  member_id?: string;

  full_name?: string;
  name?: string;
  member_name?: string;

  mobile?: string;
  phone?: string;

  email?: string;

  gender?: string;
  occupation?: string;
  date_of_birth?: string;
  location?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
  state?: string | null;

  executive_body?: string;
  designation?: string;

  status?: string;

  role?: string;

  photo?: string | null;
  image?: string | null;
  profile_photo?: string | null;

  membership?: string;
  membership_type?: string;
  plan?: string;

  mahashaba_payment_status?: string;
  mahashaba_payment_method?: string | null;
  mahashaba_amount_paid?: number | string | null;

  sangam_payment_status?: string;
  sangam_payment_method?: string | null;
  sangam_amount_paid?: number | string | null;

  created_at?: string;
  updated_at?: string;

  [key: string]: any;
};

/* =========================================================
   USER TYPE
========================================================= */

type LoggedInUser = {
  id?: number | string;
  member_id?: string;
  full_name?: string;
  name?: string;
  email?: string;

  role?: string;

  sangham?: string;
  sangam?: string;

  district?: string;
  mandal?: string;
  location?: string | null;

  [key: string]: any;
};

/* =========================================================
   API
========================================================= */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:5000";

/* =========================================================
   HELPERS
========================================================= */

const normalizeText = (value: any) => {
  return String(value ?? "")
    .trim()
    .toLowerCase();
};

/* =========================================================
   MEMBER NAME
========================================================= */

const getMemberName = (member: Member) => {
  return (
    member.full_name ??
    member.name ??
    member.member_name ??
    "Member"
  );
};

/* =========================================================
   EMAIL
========================================================= */

const getEmail = (member: Member) => {
  return member.email ?? "";
};

/* =========================================================
   MOBILE
========================================================= */

const getMobile = (member: Member) => {
  return (
    member.mobile ??
    member.phone ??
    ""
  );
};

/* =========================================================
   MEMBER ID
========================================================= */

const getMemberId = (
  member: Member,
  index: number,
) => {
  if (member.member_id) {
    return member.member_id;
  }

  if (member.id !== undefined) {
    return `TVM${String(member.id).padStart(5, "0")}`;
  }

  return `TVM${String(index + 1).padStart(5, "0")}`;
};

/* =========================================================
   LOCATION
========================================================= */

const getLocation = (member: Member) => {
  // =====================================================
  // FIRST PRIORITY: members.location
  // =====================================================

  if (
    member.location &&
    String(member.location).trim() !== ""
  ) {
    return String(member.location).trim();
  }

  // =====================================================
  // FALLBACK: LOCATION DETAILS
  // =====================================================

  const parts = [
    member.sangham,
    member.mandal,
    member.district,
    member.state,
  ]
    .map((value) =>
      String(value ?? "").trim(),
    )
    .filter(Boolean);

  if (parts.length > 0) {
    return parts.join(", ");
  }

  return "—";
};

/* =========================================================
   STATUS
========================================================= */

const getStatus = (member: Member) => {
  return String(
    member.status ?? "Pending",
  ).trim();
};

/* =========================================================
   VERIFIED
========================================================= */

const isVerified = (member: Member) => {
  const status = normalizeText(
    member.status,
  );

  return (
    status === "active" ||
    status === "verified" ||
    status === "approved"
  );
};

/* =========================================================
   MEMBERSHIP
========================================================= */

const getMembership = (member: Member) => {
  if (
    member.membership &&
    String(member.membership).trim()
  ) {
    return member.membership;
  }

  if (
    member.membership_type &&
    String(member.membership_type).trim()
  ) {
    return member.membership_type;
  }

  if (
    member.plan &&
    String(member.plan).trim()
  ) {
    return member.plan;
  }

  /*
    Your current DB has:
    mahashaba_payment_status = Free / Paid
    sangam_payment_status = Free / Paid

    So display membership based on those fields.
  */

  const mahashaba = normalizeText(
    member.mahashaba_payment_status,
  );

  const sangam = normalizeText(
    member.sangam_payment_status,
  );

  if (
    mahashaba === "paid" ||
    sangam === "paid"
  ) {
    return "Paid";
  }

  return "Free";
};

/* =========================================================
   PREMIUM
========================================================= */

const isPremium = (member: Member) => {
  const membership = normalizeText(
    getMembership(member),
  );

  return (
    membership === "premium" ||
    membership === "gold" ||
    membership === "platinum"
  );
};

/* =========================================================
   JOINED DATE
========================================================= */

const getJoinedDate = (member: Member) => {
  if (!member.created_at) {
    return "—";
  }

  const date = new Date(
    member.created_at,
  );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );
};

/* =========================================================
   PHOTO URL
========================================================= */

const getPhotoUrl = (
  photo?: string | null,
) => {
  return getStorageImageUrl(photo, BACKEND_URL) || "";
};

/* =========================================================
   PAGE
========================================================= */

export default function AdminDashboard() {
  const [members, setMembers] =
    useState<Member[]>([]);

  const [matrimonyProfiles, setMatrimonyProfiles] =
    useState<Member[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [currentDateTime, setCurrentDateTime] =
    useState<Date | null>(null);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loggedInUser, setLoggedInUser] =
    useState<LoggedInUser | null>(null);

  useEffect(() => {
    const updateDateTime = () => setCurrentDateTime(new Date());
    updateDateTime();

    const intervalId = window.setInterval(updateDateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  /* =======================================================
     GET LOGGED IN USER
  ======================================================= */

  const getLoggedInUser = () => {
    try {
      if (
        typeof window === "undefined"
      ) {
        return null;
      }

      const userData =
        localStorage.getItem("user");

      console.log(
        "LOCAL STORAGE USER:",
        userData,
      );

      if (!userData) {
        return null;
      }

      const parsed =
        JSON.parse(userData);

      /*
        Support different localStorage formats:
        
        {
          role: "super_admin"
        }

        OR

        {
          user: {
            role: "super_admin"
          }
        }
      */

      const user =
        parsed?.user ?? parsed;

      console.log(
        "PARSED LOGGED-IN USER:",
        user,
      );

      return user;
    } catch (error) {
      console.error(
        "USER PARSE ERROR:",
        error,
      );

      return null;
    }
  };

  /* =======================================================
     FETCH MEMBERS
  ======================================================= */

  const fetchMembers =
    useCallback(async () => {
      try {
        setLoading(true);
        setError("");

        const user =
          getLoggedInUser();

        setLoggedInUser(user);

        console.log(
          "=================================",
        );

        console.log(
          "LOGGED-IN USER:",
          user,
        );

        const role =
          user?.role ??
          "";

        const sangham =
          user?.sangham ??
          user?.sangam ??
          "";

        console.log(
          "FRONTEND ROLE:",
          role,
        );

        console.log(
          "FRONTEND SANGHAM:",
          sangham,
        );

        /*
          Build API URL
        */

        const params =
          new URLSearchParams();

        if (role) {
          params.set(
            "role",
            role,
          );
        }

        /*
          Sangam admin should receive
          sangham filter.
        */

        if (
          role === "sangam_admin" &&
          sangham
        ) {
          params.set(
            "sangham",
            sangham,
          );
        }

        const queryString =
          params.toString();

        const apiUrl =
          `${BACKEND_URL}/membership-register${
            queryString
              ? `?${queryString}`
              : ""
          }`;

        console.log(
          "FINAL MEMBERS API URL:",
          apiUrl,
        );

        /* =================================================
           TOKEN
        ================================================= */

        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("adminToken") ||
              localStorage.getItem("token") ||
              localStorage.getItem("access_token")
            : null;

        /* =================================================
           FETCH
        ================================================= */

        const response =
          await fetch(apiUrl, {
            method: "GET",

            cache: "no-store",

            headers: {
              Accept:
                "application/json",

              ...(token
                ? {
                    Authorization:
                      `Bearer ${token}`,
                  }
                : {}),
            },
          });

        console.log(
          "MEMBERS API STATUS:",
          response.status,
        );

        if (!response.ok) {
          const errorText =
            await response.text();

          console.error(
            "API ERROR RESPONSE:",
            errorText,
          );

          throw new Error(
            `Members API failed: ${response.status}`,
          );
        }

        const data =
          await response.json();

        console.log(
          "MEMBERS API RAW DATA:",
          data,
        );

        /* =================================================
           NORMALIZE RESPONSE
        ================================================= */

        let memberArray: Member[] =
          [];

        if (
          Array.isArray(data)
        ) {
          memberArray = data;
        } else if (
          Array.isArray(data?.data)
        ) {
          memberArray =
            data.data;
        } else if (
          Array.isArray(
            data?.members,
          )
        ) {
          memberArray =
            data.members;
        } else if (
          Array.isArray(
            data?.results,
          )
        ) {
          memberArray =
            data.results;
        }

        console.log(
          "FINAL MEMBER ARRAY:",
          memberArray,
        );

        console.log(
          "TOTAL MEMBERS FROM API:",
          memberArray.length,
        );

        setMembers(
          memberArray,
        );

        // Resolve profiles missing from the list endpoint (which can be gender-filtered).
        try {
          const matrimonyResponse = await fetch(
            `${BACKEND_URL}/matrimonial-users`,
            {
              method: "GET",
              cache: "no-store",
              headers: {
                Accept: "application/json",
                ...(token
                  ? { Authorization: `Bearer ${token}` }
                  : {}),
              },
            },
          );

          if (!matrimonyResponse.ok) {
            throw new Error(`Matrimony API failed: ${matrimonyResponse.status}`);
          }

          const matrimonyData = await matrimonyResponse.json();
          const profileArray: Member[] = Array.isArray(matrimonyData)
            ? matrimonyData
            : Array.isArray(matrimonyData?.data)
              ? matrimonyData.data
              : Array.isArray(matrimonyData?.profiles)
                ? matrimonyData.profiles
                : [];

          const listedMemberIds = new Set(
            profileArray
              .map((profile) => String(profile.member_id ?? ""))
              .filter(Boolean),
          );
          const missingMemberIds = Array.from(
            new Set(
              memberArray
                .map((member) => String(member.member_id ?? ""))
                .filter((memberId) => memberId && !listedMemberIds.has(memberId)),
            ),
          );
          const resolvedProfiles: Member[] = [...profileArray];

          for (let index = 0; index < missingMemberIds.length; index += 8) {
            const batch = missingMemberIds.slice(index, index + 8);
            const batchProfiles = await Promise.all(
              batch.map(async (memberId) => {
                try {
                  const profileResponse = await fetch(
                    `${BACKEND_URL}/matrimonial-users/${encodeURIComponent(memberId)}`,
                    {
                      cache: "no-store",
                      headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : {},
                    },
                  );
                  if (!profileResponse.ok) return null;

                  const profileData = await profileResponse.json();
                  const profile = profileData?.data ?? profileData;
                  return profile && typeof profile === "object"
                    ? { ...profile, member_id: profile.member_id ?? memberId }
                    : null;
                } catch {
                  return null;
                }
              }),
            );
            resolvedProfiles.push(
              ...batchProfiles.filter((profile): profile is Member => Boolean(profile)),
            );
          }

          const membershipById = new Map(
            memberArray
              .filter((member) => member.member_id)
              .map((member) => [String(member.member_id), member]),
          );
          const uniqueProfiles = new Map<string, Member>();
          resolvedProfiles.forEach((profile) => {
            const memberId = String(profile.member_id ?? "");
            const member = membershipById.get(memberId);
            const key = memberId || String(profile.id ?? "");
            uniqueProfiles.set(key, {
              ...profile,
              gender: profile.gender || member?.gender,
            });
          });

          setMatrimonyProfiles(Array.from(uniqueProfiles.values()));
        } catch (matrimonyError) {
          console.error("DASHBOARD MATRIMONY PROFILES ERROR:", matrimonyError);
          setMatrimonyProfiles([]);
        }

        if (
          memberArray.length === 0
        ) {
          setError(
            "API connected successfully, but no members were returned.",
          );
        }
      } catch (err) {
        console.error(
          "DASHBOARD MEMBERS ERROR:",
          err,
        );

        setMembers([]);

        setError(
          "Members data load కాలేదు. Backend API మరియు localStorage user role check చేయండి.",
        );
      } finally {
        setLoading(false);
      }
    }, []);

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  /* =======================================================
     STATISTICS
  ======================================================= */

  const totalProfiles =
    members.length;

  const verifiedProfiles =
    members.filter(
      isVerified,
    ).length;

  const pendingProfiles = members.filter(
    (member) => normalizeText(member.status) === "pending",
  ).length;

  const matrimonyRegistrationCount = matrimonyProfiles.length;
  const maleMatrimonyCount = matrimonyProfiles.filter(
    (profile) => normalizeText(profile.gender) === "male",
  ).length;
  const femaleMatrimonyCount = matrimonyProfiles.filter(
    (profile) => normalizeText(profile.gender) === "female",
  ).length;

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredUsers =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      if (!searchValue) {
        return members;
      }

      return members.filter(
        (member) => {
          const name =
            getMemberName(
              member,
            ).toLowerCase();

          const email =
            getEmail(
              member,
            ).toLowerCase();

          const mobile =
            getMobile(
              member,
            ).toLowerCase();

          const location =
            getLocation(
              member,
            ).toLowerCase();

          const memberId =
            String(
              member.member_id ??
                "",
            ).toLowerCase();

          const gender =
            String(
              member.gender ??
                "",
            ).toLowerCase();

          const role =
            String(
              member.role ??
                "",
            ).toLowerCase();

          return (
            name.includes(
              searchValue,
            ) ||
            email.includes(
              searchValue,
            ) ||
            mobile.includes(
              searchValue,
            ) ||
            location.includes(
              searchValue,
            ) ||
            memberId.includes(
              searchValue,
            ) ||
            gender.includes(
              searchValue,
            ) ||
            role.includes(
              searchValue,
            )
          );
        },
      );
    }, [members, search]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const rowsPerPage = 5;

  const totalPages =
    Math.ceil(
      filteredUsers.length /
        rowsPerPage,
    );

  const safeTotalPages =
    Math.max(
      totalPages,
      1,
    );

  const indexOfLastRow =
    currentPage *
    rowsPerPage;

  const indexOfFirstRow =
    indexOfLastRow -
    rowsPerPage;

  const currentUsers =
    filteredUsers.slice(
      indexOfFirstRow,
      indexOfLastRow,
    );

  /* =======================================================
     RESET PAGE ON SEARCH
  ======================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* =======================================================
     KEEP PAGE VALID
  ======================================================= */

  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage >
        totalPages
    ) {
      setCurrentPage(
        totalPages,
      );
    }

    if (
      totalPages === 0 &&
      currentPage !== 1
    ) {
      setCurrentPage(1);
    }
  }, [
    totalPages,
    currentPage,
  ]);

  /* =======================================================
     STATS
  ======================================================= */

  const stats = [
    {
      title:
        "Total Profiles",
      value:
        totalProfiles.toLocaleString(),
      icon: FaUsers,
      iconBg:
        "bg-violet-100",
      iconColor:
        "text-violet-600",
    },

    {
      title:
        "Verified Profiles",
      value:
        verifiedProfiles.toLocaleString(),
      icon:
        FaUserCheck,
      iconBg:
        "bg-emerald-100",
      iconColor:
        "text-emerald-600",
    },

    {
      title: "Pending Profiles",
      value: pendingProfiles.toLocaleString(),
      icon: FaClock,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },

    {
      title:
        "Matrimony",
      value:
        matrimonyRegistrationCount.toLocaleString(),
      icon:
        FaCrown,
      iconBg:
        "bg-amber-100",
      iconColor:
        "text-amber-600",
    },
    {
      title: "Male Profiles",
      value: maleMatrimonyCount.toLocaleString(),
      icon: FaMale,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
    },
    {
      title: "Female Profiles",
      value: femaleMatrimonyCount.toLocaleString(),
      icon: FaFemale,
      iconBg: "bg-pink-100",
      iconColor: "text-pink-700",
    },
  ];

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-1">
              Overview of your Membership platform.
            </p>

            {loggedInUser?.role && (
              <p className="text-xs text-gray-400 mt-2">
                Logged in as:{" "}
                <span className="font-semibold text-[#8B1E3F]">
                  {loggedInUser.role}
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentDateTime && (
              <div
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-600"
                aria-live="off"
              >
                <FaClock className="text-[#8B1E3F]" aria-hidden="true" />
                <time dateTime={currentDateTime.toISOString()}>
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "medium",
                    timeZone: "Asia/Kolkata",
                  }).format(currentDateTime)}
                </time>
              </div>
            )}

            <button
              type="button"
              onClick={fetchMembers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>

        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <p className="text-sm text-red-700">
                {error}
              </p>

              <button
                type="button"
                onClick={
                  fetchMembers
                }
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                <FaSyncAlt />
                Retry
              </button>

            </div>

          </div>
        )}

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">

          {stats.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={
                    item.title
                  }
                  className="group bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                >

                  <div className="flex items-center justify-between gap-3">

                    <div>

                      <p className="text-xs sm:text-sm font-medium text-gray-500">
                        {
                          item.title
                        }
                      </p>

                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                        {loading
                          ? "..."
                          : item.value}
                      </h3>

                    </div>

                    <div
                      className={`w-9 h-9 shrink-0 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center text-sm`}
                    >
                      <Icon />
                    </div>

                  </div>

                </div>
              );
            },
          )}

        </div>

        {/* =================================================
            RECENT REGISTRATIONS
        ================================================= */}

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* HEADER */}

          <div className="p-5 sm:p-6 border-b border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>

                <h3 className="text-lg font-bold text-gray-900">
                  Recent Registrations
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Latest members joined the portal
                </p>

              </div>

              <Link
                href="/admin/membership"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-700 transition"
              >
                View All

                <FaArrowRight className="text-xs" />
              </Link>

            </div>

          </div>

          {/* SEARCH */}

          <div className="p-4 sm:p-5 border-b border-gray-100">

            <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 max-w-md">

              <FaSearch className="text-gray-400 text-sm" />

              <input
                type="text"
                placeholder="Search members..."
                className="bg-transparent outline-none text-sm ml-3 w-full"
                value={
                  search
                }
                onChange={(
                  e,
                ) =>
                  setSearch(
                    e.target
                      .value,
                  )
                }
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch(
                      "",
                    )
                  }
                  className="text-xs text-gray-400 hover:text-gray-700"
                >
                  Clear
                </button>
              )}

            </div>

          </div>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="py-16 text-center">

              <div className="mx-auto h-10 w-10 rounded-full border-4 border-gray-200 border-t-[#8B1E3F] animate-spin" />

              <p className="mt-4 text-sm text-gray-500">
                Loading members...
              </p>

            </div>
          )}

          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            filteredUsers.length ===
              0 && (
              <div className="py-16 text-center">

                <div className="mx-auto w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">

                  <FaUsers className="text-gray-400 text-xl" />

                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-800">
                  No Members Found
                </h3>

                <p className="mt-1 text-sm text-gray-400">
                  {search
                    ? "No members match your search."
                    : "No registered members available."}
                </p>

              </div>
            )}

          {/* =================================================
              TABLE
          ================================================= */}

          {!loading &&
            filteredUsers.length >
              0 && (
              <>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[1200px]">

                    <thead>

                      <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-400">

                        <th className="px-6 py-4 text-left font-semibold">
                          Member
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                          Member ID
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                          Mobile
                        </th>
                        <th className="px-6 py-4 text-left font-semibold">
                          Gender
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                          Membership
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                          Joined
                        </th>

                        <th className="px-6 py-4 text-left font-semibold">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {currentUsers.map(
                        (
                          user,
                          index,
                        ) => {

                          const name =
                            getMemberName(
                              user,
                            );

                          const email =
                            getEmail(
                              user,
                            );

                          const mobile =
                            getMobile(
                              user,
                            );

                          const memberId =
                            getMemberId(
                              user,
                              indexOfFirstRow +
                                index,
                            );

                          const location =
                            getLocation(
                              user,
                            );

                          const membership =
                            getMembership(
                              user,
                            );

                          const status =
                            getStatus(
                              user,
                            );

                          const joined =
                            getJoinedDate(
                              user,
                            );

                          const photo =
                            getPhotoUrl(
                              user.photo ??
                                user.image ??
                                user.profile_photo,
                            );

                          const verified =
                            isVerified(
                              user,
                            );

                          const userKey =
                            user.id ??
                            user.member_id ??
                            index;

                          return (
                            <tr
                              key={
                                userKey
                              }
                              className="hover:bg-gray-50/70 transition"
                            >

                              {/* MEMBER */}

                              <td className="px-6 py-4">

                                <div className="flex items-center gap-3">

                                  {photo ? (
                                    <img
                                      src={
                                        photo
                                      }
                                      alt={
                                        name
                                      }
                                      className="w-11 h-11 rounded-full object-cover border border-gray-200"
                                      onError={(
                                        e,
                                      ) => {
                                        e.currentTarget.style.display =
                                          "none";
                                      }}
                                    />
                                  ) : (
                                    <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                      <FaUser className="text-gray-400" />
                                    </div>
                                  )}

                                  <div>

                                    <p className="font-semibold text-gray-800">
                                      {
                                        name
                                      }
                                    </p>

                                    <p className="text-xs text-gray-400 mt-0.5">
                                      {
                                        email
                                      }
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* MEMBER ID */}

                              <td className="px-6 py-4">

                                <span className="text-sm font-semibold text-[#8B1E3F]">
                                  {
                                    memberId
                                  }
                                </span>

                              </td>

                              {/* MOBILE */}

                              <td className="px-6 py-4">

                                <p className="text-sm text-gray-600">
                                  {
                                    mobile ||
                                    "—"
                                  }
                                </p>

                              </td>

                              {/* LOCATION */}

                              <td className="px-6 py-4">

                               

                                {user.gender && (
                                  <p className="text-xs text-gray-400 mt-1">
                                    {
                                      user.gender
                                    }
                                  </p>
                                )}

                              </td>

                              {/* MEMBERSHIP */}

                              <td className="px-6 py-4">

                                <span
                                  className={`inline-flex px-3 py-1 rounded-lg text-xs font-semibold ${
                                    normalizeText(
                                      membership,
                                    ) ===
                                    "paid"
                                      ? "bg-emerald-100 text-emerald-700"
                                      : normalizeText(
                                            membership,
                                          ) ===
                                          "premium"
                                        ? "bg-violet-100 text-violet-700"
                                        : normalizeText(
                                              membership,
                                            ) ===
                                            "gold"
                                          ? "bg-amber-100 text-amber-700"
                                          : "bg-blue-50 text-blue-600"
                                  }`}
                                >
                                  {
                                    membership
                                  }
                                </span>

                              </td>

                              {/* JOINED */}

                              <td className="px-6 py-4">

                                <p className="text-sm text-gray-600">
                                  {
                                    joined
                                  }
                                </p>

                              </td>

                              {/* STATUS */}

                              <td className="px-6 py-4">

                                <span
                                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                                    verified
                                      ? "bg-emerald-50 text-emerald-700"
                                      : normalizeText(
                                            status,
                                          ) ===
                                          "rejected"
                                        ? "bg-red-50 text-red-700"
                                        : "bg-amber-50 text-amber-700"
                                  }`}
                                >

                                  {verified ? (
                                    <FaCheckCircle />
                                  ) : (
                                    <FaClock />
                                  )}

                                  {
                                    status
                                  }

                                </span>

                              </td>

                            </tr>
                          );
                        },
                      )}

                    </tbody>

                  </table>

                </div>

                {/* =================================================
                    PAGINATION
                ================================================= */}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-100">

                  <p className="text-sm text-gray-500">

                    Showing{" "}

                    <span className="font-semibold text-gray-700">
                      {
                        indexOfFirstRow +
                        1
                      }
                    </span>

                    {" "}to{" "}

                    <span className="font-semibold text-gray-700">
                      {Math.min(
                        indexOfLastRow,
                        filteredUsers.length,
                      )}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-gray-700">
                      {
                        filteredUsers.length
                      }
                    </span>

                    {" "}members

                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (
                            page,
                          ) =>
                            Math.max(
                              page -
                                1,
                              1,
                            ),
                        )
                      }
                      disabled={
                        currentPage ===
                        1
                      }
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Previous
                    </button>

                    {Array.from(
                      {
                        length:
                          safeTotalPages,
                      },
                    ).map(
                      (
                        _,
                        index,
                      ) => (
                        <button
                          key={
                            index
                          }
                          type="button"
                          onClick={() =>
                            setCurrentPage(
                              index +
                                1,
                            )
                          }
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition ${
                            currentPage ===
                            index +
                              1
                              ? "bg-[#8B1E3F] text-white shadow-md"
                              : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {
                            index +
                            1
                          }
                        </button>
                      ),
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage(
                          (
                            page,
                          ) =>
                            Math.min(
                              page +
                                1,
                              safeTotalPages,
                            ),
                        )
                      }
                      disabled={
                        currentPage ===
                          safeTotalPages ||
                        totalPages ===
                          0
                      }
                      className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Next
                    </button>

                  </div>

                </div>

              </>
            )}

        </div>

      </main>

    </div>
  );
}
