"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

import { getStorageImageUrl } from "@/lib/storage-image-url";

import {
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaHeart,
  FaSearch,
  FaBirthdayCake,
  FaTimes,
  FaSlidersH,
  FaCheck,
  FaUser,
  FaStar,
  FaRulerVertical,
} from "react-icons/fa";

interface Profile {
  id?: number | string;
  member_id?: string | null;
  name?: string | null;
  full_name?: string | null;

  photo?: string | null;
  profile_photo?: string | null;
  photo_url?: string | null;
  image?: string | null;
  profile_image?: string | null;

  date_of_birth?: string | null;
  dob?: string | null;
  dateOfBirth?: string | null;

  height?: string | null;
  education?: string | null;
  occupation?: string | null;
  profession?: string | null;

  annual_income?: string | number | null;
  income?: string | number | null;

  address?: string | null;
  city?: string | null;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
  state?: string | null;

  gender?: string | null;
  status?: string | null;

  mother_tongue?: string | null;
  language?: string | null;
  nakshatra?: string | null;
  community?: string | null;
  caste?: string | null;

  [key: string]: unknown;
}

interface MatchProfile {
  id: string;
  memberId: string;
  name: string;
  age: number | null;
  height: string;
  language: string;
  community: string;
  nakshatra: string;
  city: string;
  state: string;
  education: string;
  profession: string;
  gender: string;
  maritalStatus: string;
  image: string;
}

interface MatrimonialSessionUser {
  account_type?: string;
  matrimonial_id?: number | string | null;
}

type InterestRequestStatus = "Pending" | "Accepted" | "Rejected";

interface InterestRequest {
  id: number;
  status: InterestRequestStatus;
  profile: Profile | null;
  created_at?: string;
}

interface InterestRequestCounts {
  likes: number;
  requests: number;
  accepted: number;
  sent: number;
}

const DEFAULT_IMAGE = "/images/default-profile.jpg";
const PROFILES_PER_PAGE = 8;

const EMPTY_REQUEST_COUNTS: InterestRequestCounts = {
  likes: 0,
  requests: 0,
  accepted: 0,
  sent: 0,
};

const normalizeRequestStatus = (status: unknown): InterestRequestStatus => {
  const normalized = String(status || "Pending").toLowerCase();
  if (normalized === "accepted") return "Accepted";
  if (normalized === "rejected") return "Rejected";
  return "Pending";
};

const getRequestList = (data: unknown): InterestRequest[] => {
  if (Array.isArray(data)) return data as InterestRequest[];
  if (!data || typeof data !== "object") return [];

  const response = data as Record<string, unknown>;
  const requests = Array.isArray(response.requests)
    ? response.requests
    : Array.isArray(response.data)
      ? response.data
      : [];
  return requests as InterestRequest[];
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://avms-backend-production.up.railway.app";

const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

const getStoredUser = () => {
  return localStorage.getItem("user");
};

export default function MatchesPage() {
  // USER SESSION
  const storedUser = useSyncExternalStore(
    subscribeToStorage,
    getStoredUser,
    () => null
  );

  const loggedInUser = useMemo<MatrimonialSessionUser | null>(() => {
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as MatrimonialSessionUser;
    } catch {
      return null;
    }
  }, [storedUser]);

  // STATES
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [sentRequestStatuses, setSentRequestStatuses] = useState<
    Record<string, InterestRequestStatus>
  >({});

  const [incomingRequests, setIncomingRequests] = useState<
    InterestRequest[]
  >([]);

  const [requestCounts, setRequestCounts] =
    useState<InterestRequestCounts>(EMPTY_REQUEST_COUNTS);

  const [showIncomingRequests, setShowIncomingRequests] = useState(false);

  const [requestsLoading, setRequestsLoading] = useState(false);

  const [requestingProfileId, setRequestingProfileId] = useState<
    string | null
  >(null);

  const [acceptingRequestId, setAcceptingRequestId] = useState<number | null>(
    null
  );

  const [requestError, setRequestError] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  // ACCEPTED PROFILES
  const acceptedProfileIds = useMemo(() => {
    const profileIds = new Set<string>();

    Object.entries(sentRequestStatuses).forEach(([profileId, status]) => {
      if (status === "Accepted") {
        profileIds.add(profileId);
      }
    });

    incomingRequests.forEach((request) => {
      if (request.status === "Accepted" && request.profile?.id != null) {
        profileIds.add(String(request.profile.id));
      }
    });

    return profileIds;
  }, [incomingRequests, sentRequestStatuses]);

  // IMAGE URL
  const getImageUrl = (photo?: string | null): string => {
    return getStorageImageUrl(photo, API_BASE_URL) || DEFAULT_IMAGE;
  };

  // PROFILE PHOTO
  const getProfilePhoto = (profile: Profile): string | null => {
    const photo =
      profile.photo ||
      profile.profile_photo ||
      profile.photo_url ||
      profile.image ||
      profile.profile_image;

    if (typeof photo !== "string") return null;

    return photo.trim() || null;
  };

  // CALCULATE AGE
  const calculateAge = (dob?: string | null): number | null => {
    if (!dob) return null;

    const birthDate = new Date(dob);

    if (Number.isNaN(birthDate.getTime())) return null;

    const today = new Date();

    let result = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      result--;
    }

    return result >= 0 && result <= 100 ? result : null;
  };

  // FETCH PROFILES AND REQUESTS
  useEffect(() => {
    let cancelled = false;

    const fetchProfiles = async () => {
      try {
        setLoading(true);
        setError("");

        setIncomingRequests([]);
        setSentRequestStatuses({});
        setRequestCounts(EMPTY_REQUEST_COUNTS);

        setRequestError("");
        setRequestMessage("");

        const token = localStorage.getItem("access_token");

        if (!token) {
          throw new Error("Please log in to view matrimonial profiles.");
        }

        const response = await fetch(
          `${API_BASE_URL}/matrimonial-users`,
          {
            method: "GET",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseText = await response.text();

        if (!response.ok) {
          let message = responseText;

          try {
            const parsedError = JSON.parse(responseText);

            message = parsedError.message
              ? Array.isArray(parsedError.message)
                ? parsedError.message.join(", ")
                : parsedError.message
              : responseText;
          } catch {
            // Keep original response.
          }

          if (response.status === 401) {
            throw new Error(
              "Your session is invalid or expired. Please log in again."
            );
          }

          throw new Error(`API Error ${response.status}: ${message}`);
        }

        let result: unknown;

        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error("The backend returned invalid JSON.");
        }

        let profileList: Profile[] = [];

        if (Array.isArray(result)) {
          profileList = result as Profile[];
        } else if (result && typeof result === "object") {
          const data = result as Record<string, unknown>;

          if (Array.isArray(data.data)) {
            profileList = data.data as Profile[];
          } else if (Array.isArray(data.result)) {
            profileList = data.result as Profile[];
          } else if (Array.isArray(data.members)) {
            profileList = data.members as Profile[];
          } else if (Array.isArray(data.profiles)) {
            profileList = data.profiles as Profile[];
          }
        }

        if (!cancelled) {
          setProfiles(profileList);
        }

        // FETCH INTEREST REQUESTS
        try {
          if (!cancelled) {
            setRequestsLoading(true);
            setRequestError("");
          }

          const [receivedResponse, sentResponse] = await Promise.all([
            fetch(
              `${API_BASE_URL}/matrimonial-users/requests/received`,
              {
                cache: "no-store",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),

            fetch(`${API_BASE_URL}/matrimonial-users/requests/sent`, {
              cache: "no-store",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          const [receivedData, sentData] = await Promise.all([
            receivedResponse.json(),
            sentResponse.json(),
          ]);

          if (!receivedResponse.ok || !sentResponse.ok) {
            const failedData = !receivedResponse.ok
              ? receivedData
              : sentData;

            const message = Array.isArray(failedData?.message)
              ? failedData.message.join(", ")
              : failedData?.message;

            throw new Error(
              message || "Could not load your interest requests."
            );
          }

          if (!cancelled) {
            const receivedList = getRequestList(receivedData).map((request) => ({
              ...request,
              status: normalizeRequestStatus(request.status),
            }));

            const sentList = getRequestList(sentData).map((request) => ({
              ...request,
              status: normalizeRequestStatus(request.status),
            }));

            const counts = receivedData?.counts;

            setIncomingRequests(receivedList);

            setRequestCounts({
              likes: Number(counts?.likes) || receivedList.length,
              requests: Number(counts?.requests) || 0,
              accepted: Number(counts?.accepted) || 0,
              sent: sentList.length,
            });

            setSentRequestStatuses(
              Object.fromEntries(
                sentList
                  .filter((request) => request.profile?.id != null)
                  .map((request) => [
                    String(request.profile?.id),
                    request.status,
                  ])
              )
            );
          }
        } catch (requestLoadError) {
          console.error(
            "Failed to fetch matrimonial requests:",
            requestLoadError
          );

          if (!cancelled) {
            setRequestError(
              requestLoadError instanceof Error
                ? requestLoadError.message
                : "Could not load your interest requests."
            );
          }
        } finally {
          if (!cancelled) {
            setRequestsLoading(false);
          }
        }
      } catch (err) {
        console.error("Failed to fetch matrimonial profiles:", err);

        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load profiles."
          );

          setProfiles([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProfiles();

    return () => {
      cancelled = true;
    };
  }, [loggedInUser]);

  // SEND INTEREST REQUEST
  const sendInterestRequest = async (profileId: string) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setRequestError("Please log in to send an interest request.");
      return;
    }

    setRequestingProfileId(profileId);
    setRequestError("");
    setRequestMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimonial-users/${encodeURIComponent(
          profileId
        )}/request`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message;

        throw new Error(message || "Could not send your interest request.");
      }

      const status: InterestRequestStatus =
        normalizeRequestStatus(result?.request?.status);

      setSentRequestStatuses((current) => ({
        ...current,
        [profileId]: status,
      }));
      setRequestCounts((current) => ({ ...current, sent: current.sent + 1 }));

      setRequestMessage(
        result?.message || "Interest request sent successfully."
      );
    } catch (sendError) {
      setRequestError(
        sendError instanceof Error
          ? sendError.message
          : "Could not send your interest request."
      );
    } finally {
      setRequestingProfileId(null);
    }
  };

  // ACCEPT INTEREST REQUEST
  const acceptInterestRequest = async (requestId: number) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setRequestError("Please log in to accept an interest request.");
      return;
    }

    setAcceptingRequestId(requestId);
    setRequestError("");
    setRequestMessage("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/matrimonial-users/requests/${requestId}/accept`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message;

        throw new Error(message || "Could not accept this request.");
      }

      setIncomingRequests((current) =>
        current.map((request) =>
          request.id === requestId
            ? { ...request, status: "Accepted" }
            : request
        )
      );

      setRequestCounts((current) => ({
        ...current,
        requests: Math.max(0, current.requests - 1),
        accepted: current.accepted + 1,
      }));

      setRequestMessage("Request accepted. You can now view the profile.");
    } catch (acceptError) {
      setRequestError(
        acceptError instanceof Error
          ? acceptError.message
          : "Could not accept this request."
      );
    } finally {
      setAcceptingRequestId(null);
    }
  };

  // CONVERT API DATA FOR DISPLAY
  const displayProfiles = useMemo<MatchProfile[]>(() => {
    return profiles
      .filter(
        (profile) => profile.id !== undefined && profile.id !== null
      )
      .map((profile) => {
        const databaseId = String(profile.id);

        const memberId =
          profile.member_id || `AV${databaseId.padStart(5, "0")}`;

        const name = profile.full_name || profile.name || "Profile";

        const calculatedAge = calculateAge(
          profile.date_of_birth ||
            profile.dob ||
            profile.dateOfBirth
        );

        const profileCity =
          profile.city ||
          profile.district ||
          profile.mandal ||
          "Location not available";

        const photo = getProfilePhoto(profile);

        return {
          id: databaseId,
          memberId: String(memberId),
          name: String(name),
          age: calculatedAge,

          height: String(profile.height || "Height not available"),

          language: String(
            profile.mother_tongue || profile.language || "Telugu"
          ),

          community: String(
            profile.community || profile.caste || "Arya Vysya"
          ),

          nakshatra: String(profile.nakshatra || ""),

          city: String(profileCity),

          state: String(profile.state || "Telangana"),

          education: String(
            profile.education || "Education not available"
          ),

          profession: String(
            profile.occupation ||
              profile.profession ||
              "Profession not available"
          ),

          gender: String(profile.gender || "Gender not available"),

          maritalStatus: String(profile.status || "Status not available"),

          image: getImageUrl(photo),
        };
      });
  }, [profiles]);

  // FILTER PROFILES
  const filteredMatches = useMemo(() => {
    return displayProfiles.filter((member) => {
      const searchValue = search.trim().toLowerCase();

      const searchMatch =
        !searchValue ||
        member.name.toLowerCase().includes(searchValue) ||
        member.memberId.toLowerCase().includes(searchValue);

      let ageMatch = true;

      if (age) {
        if (member.age === null) {
          ageMatch = false;
        } else if (age === "21-25") {
          ageMatch = member.age >= 21 && member.age <= 25;
        } else if (age === "26-30") {
          ageMatch = member.age >= 26 && member.age <= 30;
        } else if (age === "31-35") {
          ageMatch = member.age >= 31 && member.age <= 35;
        }
      }

      const cityMatch = !city || member.city === city;

      return searchMatch && ageMatch && cityMatch;
    });
  }, [displayProfiles, search, age, city]);

  // CITIES
  const cities = useMemo(() => {
    const citySet = new Set<string>();

    displayProfiles.forEach((member) => {
      if (member.city !== "Location not available") {
        citySet.add(member.city);
      }
    });

    return Array.from(citySet).sort();
  }, [displayProfiles]);

  // PAGINATION
  const totalPages = Math.ceil(
    filteredMatches.length / PROFILES_PER_PAGE
  );

  const paginatedMatches = filteredMatches.slice(
    (currentPage - 1) * PROFILES_PER_PAGE,
    currentPage * PROFILES_PER_PAGE
  );

  // CLEAR FILTERS
  const clearFilters = () => {
    setSearch("");
    setAge("");
    setCity("");
    setCurrentPage(1);
  };

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen bg-[#fffafa] px-4 py-10">
        <div className="mx-auto max-w-6xl animate-pulse space-y-5">
          <div className="mx-auto h-8 w-64 rounded bg-gray-200" />

          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-sm sm:flex-row"
            >
              <div className="h-40 w-40 rounded-xl bg-gray-200" />

              <div className="flex-1 space-y-4">
                <div className="h-5 w-40 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-100" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
                <div className="h-12 w-full rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  // ERROR
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffafa] px-4 py-12">
        <div className="w-full max-w-xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <FaTimes className="text-xl text-red-500" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Unable to Load Profiles
          </h1>

          <p className="mt-3 break-words text-sm text-gray-600">
            {error}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {!loggedInUser && (
              <Link
                href="/login"
                className="rounded-lg bg-[#800018] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012]"
              >
                Log In
              </Link>
            )}

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg border border-rose-200 bg-white px-6 py-2.5 text-sm font-semibold text-[#800018] transition hover:bg-rose-50"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // MAIN PAGE
  return (
    <main className="min-h-screen bg-[#fffafa] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <h2 className="text-left text-lg font-bold text-gray-900 sm:text-xl">
            Find Your <span className="text-[#800018]">Perfect Match</span>
          </h2>
          {loggedInUser && (
            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <button type="button" onClick={() => setShowIncomingRequests(true)} className="rounded-lg bg-amber-50 px-3 py-2 text-center transition hover:bg-amber-100">
                <p className="text-[10px] font-medium text-gray-600">Pending</p>
                <p className="text-sm font-bold text-[#800018]">{requestCounts.requests}</p>
              </button>
              <button type="button" onClick={() => setShowIncomingRequests(true)} className="rounded-lg bg-green-50 px-3 py-2 text-center transition hover:bg-green-100">
                <p className="text-[10px] font-medium text-gray-600">Accepted</p>
                <p className="text-sm font-bold text-green-700">{requestCounts.accepted}</p>
              </button>
              <div className="rounded-lg bg-rose-50 px-3 py-2 text-center">
                <p className="text-[10px] font-medium text-gray-600">Requests sent</p>
                <p className="text-sm font-bold text-[#800018]">{requestCounts.sent}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowIncomingRequests((current) => !current)}
                className="rounded-lg bg-[#800018] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012]"
              >
                {showIncomingRequests ? "Back to Matches" : "View Requests"}
              </button>
            </div>
          )}
        </div>
        {(requestError || requestMessage) && !showIncomingRequests && (
          <p
            role={requestError ? "alert" : "status"}
            className={`mb-4 rounded-lg px-3 py-2 text-sm ${requestError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
          >
            {requestError || requestMessage}
          </p>
        )}


        {/* SEARCH PANEL */}
        <section className="mb-4 rounded-2xl border border-rose-100 bg-white p-3 shadow-sm sm:p-4">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    

            {(search || age || city) && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm font-semibold text-[#800018] hover:text-rose-900"
              >
                <FaTimes />
                Clear Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

            {/* NAME */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Name / Member ID
              </label>

              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Enter name or ID"
                  className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                />
              </div>
            </div>

            {/* AGE */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                Age
              </label>

              <div className="relative">
                <FaBirthdayCake className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#800018]" />

                <select
                  value={age}
                  onChange={(event) => {
                    setAge(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">Any Age</option>
                  <option value="21-25">21 - 25</option>
                  <option value="26-30">26 - 30</option>
                  <option value="31-35">31 - 35</option>
                </select>
              </div>
            </div>

            {/* CITY */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700">
                City
              </label>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#800018]" />

                <select
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:bg-white focus:ring-2 focus:ring-rose-100"
                >
                  <option value="">All Cities</option>

                  {cities.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {showIncomingRequests && (
          <section className="mb-5 rounded-2xl border border-rose-100 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">Requests Received</h2>
            {(requestError || requestMessage) && (
              <p
                role={requestError ? "alert" : "status"}
                className={`mt-3 rounded-lg px-3 py-2 text-sm ${requestError ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
              >
                {requestError || requestMessage}
              </p>
            )}
            {requestsLoading ? (
              <p className="mt-4 text-sm text-gray-500">Loading your requests...</p>
            ) : incomingRequests.length > 0 ? (
              <div className="mt-4 grid gap-3">
                {incomingRequests.map((request) => {
                  const requester = request.profile;
                  const requesterId = requester?.id;
                  const requesterName = requester?.full_name || requester?.name || "Matrimonial profile";

                  return (
                    <article key={request.id} className="flex flex-col gap-3 rounded-xl border border-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{requesterName}</p>
                        <p className="mt-1 text-xs text-gray-500">Request status: {request.status}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {request.status === "Pending" && (
                          <button
                            type="button"
                            disabled={acceptingRequestId === request.id}
                            onClick={() => acceptInterestRequest(request.id)}
                            className="rounded-lg bg-[#800018] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#600012] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {acceptingRequestId === request.id ? "Accepting..." : "Accept"}
                          </button>
                        )}
                        {request.status === "Accepted" && requesterId != null && (
                          <Link href={`/profile/${encodeURIComponent(String(requesterId))}`} className="rounded-lg border border-rose-200 px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-rose-50">
                            View Profile
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <p className="mt-4 rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">You have not received any interest requests yet.</p>
            )}
          </section>
        )}

        {/* PROFILE RESULTS */}
        {!showIncomingRequests && (
          <>
         
            {/* HORIZONTAL PROFILE CARDS */}
            {filteredMatches.length > 0 ? (
              <div className="flex flex-col gap-4">
                {paginatedMatches.map((member) => (
                  <article
                    key={member.id}
                    className="flex w-full flex-col gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-[0_4px_18px_rgba(0,0,0,0.08)] transition hover:shadow-lg sm:flex-row sm:gap-4 sm:p-4"
                  >
                    {/* LEFT PROFILE IMAGE */}
                    <div className="flex shrink-0 flex-col items-center sm:w-[150px]">
                      <div className="relative h-[130px] w-[130px] overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                        <img
                          src={member.image}
                          alt={`${member.name} profile`}
                          width={130}
                          height={130}
                          loading="lazy"
                          className="h-full w-full object-cover object-center"
                          onError={(event) => {
                            const img = event.currentTarget;

                            img.onerror = null;
                            img.src = DEFAULT_IMAGE;
                          }}
                        />


                      </div>

                      {/* STATUS */}
                      <div className="mt-3 flex items-center gap-2 text-xs font-medium text-green-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        Profile Available
                      </div>
                    </div>

                    {/* RIGHT PROFILE DETAILS */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        {/* MEMBER ID */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-[#800018]">
                            ID: {member.memberId}
                          </span>

                          <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            Matrimonial Profile
                          </span>
                        </div>

                        {/* NAME */}
                        <h3 className="mt-2 text-lg font-bold text-gray-900">
                          {member.name}
                        </h3>

                        {/* COMPACT PROFILE DETAILS */}
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs leading-4 text-gray-600">
                          <div className="flex min-w-0 items-center gap-2" title={member.age !== null ? `${member.age} yrs` : "Age not available"}>
                            <FaBirthdayCake className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.age !== null ? `${member.age} yrs` : "Age not available"}</span>
                          </div>
                          <div className="flex min-w-0 items-center gap-2" title={member.height}>
                            <FaRulerVertical className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.height}</span>
                          </div>
                          <div className="flex min-w-0 items-center gap-2" title={member.gender}>
                            <FaUser className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.gender}</span>
                          </div>
                           
                          <div className="flex min-w-0 items-center gap-2" title={member.nakshatra || "Nakshatra not available"}>
                            <FaStar className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.nakshatra || "Nakshatra not available"}</span>
                          </div>
                          <div className="flex min-w-0 items-center gap-2" title={`${member.city}, ${member.state}`}>
                            <FaMapMarkerAlt className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.city}, {member.state}</span>
                          </div>
                          <div className="flex min-w-0 items-center gap-2" title={member.education}>
                            <FaGraduationCap className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.education}</span>
                          </div>
                          <div className="flex min-w-0 items-center gap-2" title={member.profession}>
                            <FaBriefcase className="shrink-0 text-[#a33a50]" />
                            <span className="truncate">{member.profession}</span>
                          </div>
                        </div>

                      </div>

                      {/* BOTTOM ACTION AREA */}
                      
                        <div className="flex flex-wrap justify-end gap-2">
                          {acceptedProfileIds.has(member.id) ? (
                            <Link
                              href={`/profile/${member.id}`}
                              className="flex h-9 items-center justify-center rounded-lg bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-600"
                            >
                              VIEW PROFILE
                            </Link>
                          ) : (
                            <>
                              <button
                                type="button"
                                disabled={
                                  Boolean(
                                    sentRequestStatuses[member.id]
                                  ) ||
                                  requestingProfileId === member.id ||
                                  Number(
                                    loggedInUser?.matrimonial_id
                                  ) === Number(member.id)
                                }
                                onClick={() =>
                                  sendInterestRequest(member.id)
                                }
                                className="flex h-9 items-center justify-center rounded-lg border border-[#800018] px-4 text-xs font-semibold text-[#800018] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                {requestingProfileId === member.id
                                  ? "Sending..."
                                  : sentRequestStatuses[member.id]
                                    ? `Request ${sentRequestStatuses[member.id]}`
                                    : "SEND  REQUEST"}
                              </button>

                            </>
                          )}
                        </div>
                      
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* NO RESULTS */
              <div className="rounded-2xl border border-gray-100 bg-white px-5 py-12 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-50">
                  <FaSearch className="text-xl text-[#800018]" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-gray-800">
                  No Matching Profiles
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  We could not find profiles matching your selected filters.
                  Try changing your search criteria.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#800018] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#600012]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && !showIncomingRequests && (
          <nav
            aria-label="Profile pages"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              disabled={currentPage === 1}
              className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={
                  currentPage === page ? "page" : undefined
                }
                className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${
                  currentPage === page
                    ? "border-[#800018] bg-[#800018] text-white"
                    : "border-rose-200 bg-white text-[#800018] hover:bg-rose-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              disabled={currentPage === totalPages}
              className="rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        )}
      </div>
    </main>
  );
}
