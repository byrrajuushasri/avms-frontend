"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useParams, useRouter } from "next/navigation";

import ProfileGallery from "@/components/ProfileGallery";
import ProfileInfo from "@/components/ProfileInfo";
import { getStorageImageUrl } from "@/lib/storage-image-url";

interface Profile {
  id?: number | string;
  member_id?: string | null;

  name?: string | null;
  full_name?: string | null;
  surname?: string | null;
  email?: string | null;
  mobile?: string | null;

  photo?: string | null;
  profile_photo?: string | null;
  photo_url?: string | null;
  image?: string | null;
  profile_image?: string | null;

  date_of_birth?: string | null;
  dob?: string | null;

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

  religion?: string | null;
  caste?: string | null;
  gotram?: string | null;
  mother_tongue?: string | null;
  marital_status?: string | null;
  physical_status?: string | null;

  about?: string | null;
  about_me?: string | null;
  description?: string | null;

  gender?: string | null;
  status?: string | null;

  [key: string]: unknown;
}

interface MatrimonialSessionUser {
  account_type?: string;
  matrimonial_id?: number | string | null;
}

const getSurnameFromRecord = (value: unknown, depth = 0): string => {
  if (depth > 4 || !value || typeof value !== "object") return "";
  if (Array.isArray(value)) {
    return value.map((item) => getSurnameFromRecord(item, depth + 1)).find(Boolean) || "";
  }

  const record = value as Record<string, unknown>;
  if (typeof record.surname === "string" && record.surname.trim()) {
    return record.surname.trim();
  }

  return [record.data, record.member, record.membership, record.profile]
    .map((nested) => getSurnameFromRecord(nested, depth + 1))
    .find(Boolean) || "";
};

const editableProfileFields: Array<{
  key: string;
  label: string;
  multiline?: boolean;
}> = [
  { key: "profile_category", label: "Profile Category" },
  { key: "marital_status", label: "Marital Status" },
  { key: "number_of_children", label: "Number of Children" },
  { key: "previous_marriage_conditions", label: "Previous Marriage Conditions", multiline: true },
  { key: "physical_status", label: "Physical Status" },
  { key: "family_status", label: "Family Status" },
  { key: "additional_details", label: "Additional Details", multiline: true },
  { key: "father_name", label: "Father's Name" },
  { key: "mother_name", label: "Mother's Name" },
  { key: "father_gotram", label: "Father Gotram" },
  { key: "mother_gotram", label: "Mother Gotram" },
  { key: "grandmother_gotram", label: "Grandmother Gotram" },
  { key: "nakshatram", label: "Nakshatram" },
  { key: "padham", label: "Padham" },
  { key: "rasi", label: "Rasi" },
  { key: "color", label: "Color" },
  { key: "height", label: "Height" },
  { key: "education", label: "Education" },
  { key: "annual_income", label: "Annual Income" },
  { key: "address", label: "Address", multiline: true },
  { key: "father_occupation", label: "Father's Occupation" },
  { key: "mother_occupation", label: "Mother's Occupation" },
  { key: "family_details", label: "Family Details", multiline: true },
  { key: "brother_details", label: "Brother Details", multiline: true },
  { key: "sister_details", label: "Sister Details", multiline: true },
  { key: "property_details", label: "Property Details", multiline: true },
  { key: "preferred_requirements", label: "Preferred Requirements", multiline: true },
  { key: "preference_name", label: "Area Volunteer Name" },
  { key: "preference_phone", label: "Area Volunteer Contact" },
  { key: "preference_area", label: "Area Volunteer Position" },
];

const profileFieldGroups = [
  {
    title: "Personal & Marital Details",
    description: "Basic profile category and marital information.",
    fields: [
      "profile_category",
      "marital_status",
      "number_of_children",
      "previous_marriage_conditions",
      "physical_status",
      "family_status",
      "additional_details",
    ],
  },
  {
    title: "Family Information",
    description: "Family names, occupations, and household details.",
    fields: [
      "father_name",
      "mother_name",
      "father_occupation",
      "mother_occupation",
      "family_details",
      "brother_details",
      "sister_details",
      "property_details",
      "address",
    ],
  },
  {
    title: "Education & Horoscope",
    description: "Education, physical details, and horoscope information.",
    fields: [
      "education",
      "annual_income",
      "height",
      "color",
      "father_gotram",
      "mother_gotram",
      "grandmother_gotram",
      "nakshatram",
      "padham",
      "rasi",
    ],
  },
  {
    title: "Partner Preferences",
    description: "Describe the qualities and details you are looking for.",
    fields: ["preferred_requirements"],
  },
  {
    title: "Area Volunteer",
    description: "Contact details for your area volunteer.",
    fields: [
      "preference_name",
      "preference_phone",
      "preference_area",
    ],
  },
];

const DEFAULT_IMAGE = "/images/default-profile.jpg";

const subscribeToStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getStoredUser = () => localStorage.getItem("user");

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const storedUser = useSyncExternalStore(
    subscribeToStorage,
    getStoredUser,
    () => null
  );
  const sessionUser = useMemo<MatrimonialSessionUser | null>(() => {
    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as MatrimonialSessionUser;
    } catch (parseError) {
      console.error("Failed to read logged-in user:", parseError);
      return null;
    }
  }, [storedUser]);
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] =
    useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState("");

  // =========================================================
  // BACKEND URL
  // =========================================================

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const API_BASE_URL = BACKEND_URL.replace(/\/+$/, "");

  const canEditProfile =
    sessionUser?.account_type === "matrimonial" &&
    Number(sessionUser.matrimonial_id) === Number(profile?.id);

  const startEditing = () => {
    if (!profile) {
      return;
    }

    const values: Record<string, string> = {};
    for (const field of editableProfileFields) {
      const value = profile[field.key];
      values[field.key] =
        typeof value === "string" || typeof value === "number"
          ? String(value)
          : "";
    }

    setEditValues(values);
    setSelectedPhoto(null);
    setNewPassword("");
    setSaveError("");
    setSaveMessage("");
    setIsEditing(true);
  };

  const handleProfileSave = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSaveError("");
    setSaveMessage("");

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken || !canEditProfile || !profileId) {
      setSaveError("Please log in to edit your own profile.");
      return;
    }

    if (newPassword && newPassword.trim().length < 6) {
      setSaveError("Password must contain at least 6 characters.");
      return;
    }

    const formData = new FormData();
    for (const field of editableProfileFields) {
      formData.append(field.key, editValues[field.key] ?? "");
    }
    if (newPassword) {
      formData.append("password", newPassword);
    }
    if (selectedPhoto) {
      formData.append("photo", selectedPhoto);
    }

    try {
      setSaving(true);
      const response = await fetch(
        `${API_BASE_URL}/matrimonial-users/${profileId}/my-profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
      const result = await response.json();

      if (!response.ok) {
        const message = Array.isArray(result?.message)
          ? result.message.join(", ")
          : result?.message || "Failed to update your profile.";
        throw new Error(message);
      }

      if (!result?.data) {
        throw new Error("Updated profile details were not returned.");
      }

      setProfile((currentProfile) => ({
        ...currentProfile,
        ...result.data,
      }));
      setIsEditing(false);
      setSaveMessage("Your profile was updated successfully.");
    } catch (saveError) {
      setSaveError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // PROFILE ID
  // =========================================================

  const profileId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  // =========================================================
  // IMAGE URL
  // ONLY MATRIMONIAL UPLOADS
  // =========================================================

  const getImageUrl = (
    photo?: string | null
  ): string => {
    return getStorageImageUrl(photo, API_BASE_URL) || DEFAULT_IMAGE;
  };

  // =========================================================
  // GET PROFILE PHOTO
  // =========================================================

  const getProfilePhoto = (
    data: Profile
  ): string | null => {
    const possiblePhoto =
      data.photo ||
      data.profile_photo ||
      data.photo_url ||
      data.image ||
      data.profile_image;

    if (!possiblePhoto) {
      return null;
    }

    return String(possiblePhoto).trim();
  };

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  useEffect(() => {
    if (!profileId) {
      setError("Profile ID not found.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const apiUrl =
          `${API_BASE_URL}/matrimonial-users/${profileId}`;

       const accessToken = localStorage.getItem("access_token");

const response = await fetch(apiUrl, {
  method: "GET",
  cache: "no-store",
  headers: {
    Accept: "application/json",
    ...(accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : {}),
  },
});
        const responseText =
          await response.text();

        if (!response.ok) {
          let message = `Could not load profile (${response.status}).`;
          try {
            const errorResult = JSON.parse(responseText);
            const apiMessage = Array.isArray(errorResult?.message)
              ? errorResult.message.join(", ")
              : errorResult?.message;
            if (typeof apiMessage === "string" && apiMessage.trim()) {
              message = apiMessage;
            }
          } catch {
            // Keep the status-based message if the response is not JSON.
          }

          if (response.status === 403) {
            message =
              "You can view this profile after the owner accepts your interest request.";
          }

          throw new Error(message);
        }

        let result: unknown;

        try {
          result = JSON.parse(responseText);
        } catch {
          throw new Error(
            "Backend returned invalid JSON."
          );
        }

        // =====================================================
        // FIND PROFILE OBJECT
        // =====================================================

        let profileData: Profile | null = null;

        if (
          result &&
          typeof result === "object"
        ) {
          const responseObject =
            result as Record<string, unknown>;

          // Direct response
          if (
            "id" in responseObject ||
            "member_id" in responseObject ||
            "full_name" in responseObject ||
            "name" in responseObject
          ) {
            profileData =
              responseObject as Profile;
          }

          // { data: {...} }
          else if (
            responseObject.data &&
            typeof responseObject.data ===
              "object" &&
            !Array.isArray(
              responseObject.data
            )
          ) {
            profileData =
              responseObject.data as Profile;
          }

          // { result: {...} }
          else if (
            responseObject.result &&
            typeof responseObject.result ===
              "object" &&
            !Array.isArray(
              responseObject.result
            )
          ) {
            profileData =
              responseObject.result as Profile;
          }

          // { member: {...} }
          else if (
            responseObject.member &&
            typeof responseObject.member ===
              "object" &&
            !Array.isArray(
              responseObject.member
            )
          ) {
            profileData =
              responseObject.member as Profile;
          }
        }

        if (!profileData) {
          throw new Error(
            "Profile data not found."
          );
        }

        if (!getSurnameFromRecord(profileData) && profileData.member_id) {
          let membershipSurname = "";

          try {
            const memberResponse = await fetch(
              `${API_BASE_URL}/membership/member/${encodeURIComponent(profileData.member_id)}`,
              { cache: "no-store", headers: { Accept: "application/json" } }
            );
            if (memberResponse.ok) {
              membershipSurname = getSurnameFromRecord(await memberResponse.json());
            }
          } catch {
            // Try the membership list below if the single-member lookup fails.
          }

          if (!membershipSurname) {
            try {
              const token = localStorage.getItem("access_token");
              const membersResponse = await fetch(
                `${API_BASE_URL}/membership-register`,
                {
                  cache: "no-store",
                  headers: {
                    Accept: "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                  },
                }
              );
              if (membersResponse.ok) {
                const membersResult = await membersResponse.json();
                const members = Array.isArray(membersResult)
                  ? membersResult
                  : Array.isArray(membersResult?.data)
                    ? membersResult.data
                    : [];
                const matchingMember = members.find(
                  (member: Record<string, unknown>) =>
                    String(member.member_id || "").trim().toLowerCase() ===
                    profileData?.member_id?.trim().toLowerCase()
                );
                membershipSurname = getSurnameFromRecord(matchingMember);
              }
            } catch {
              // Keep the profile usable even if membership data is unavailable.
            }
          }

          if (membershipSurname) {
            profileData = { ...profileData, surname: membershipSurname };
          }
        }

        setProfile(profileData);
      } catch (err) {
        console.error(
          "Failed to fetch profile:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load profile."
        );

        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId, API_BASE_URL]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 pt-4 pb-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Image skeleton */}
            <div className="h-[600px] animate-pulse rounded-3xl bg-gray-200" />

            {/* Info skeleton */}
            <div className="animate-pulse">
              <div className="mb-4 h-7 w-32 rounded-full bg-gray-200" />

              <div className="h-10 w-72 rounded bg-gray-200" />

              <div className="mt-3 h-5 w-48 rounded bg-gray-200" />

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map(
                  (item) => (
                    <div
                      key={item}
                      className="h-28 rounded-xl bg-gray-100"
                    />
                  )
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !profile) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">

          <div className="w-full rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <h1 className="text-2xl font-bold text-red-700">
              Profile Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              {error ||
                "Unable to load this profile."}
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="rounded-lg bg-[#800018] px-5 py-2.5 font-semibold text-white hover:bg-[#600012]"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={() =>
                  router.back()
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Go Back
              </button>

            </div>

          </div>

        </div>
      </main>
    );
  }

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const photo = getProfilePhoto(profile);

  const imageUrl = getImageUrl(photo);

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-white">

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* PROFILE ACTIONS */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-xs font-medium text-rose-600 hover:text-rose-700"
          >
            ? Back to Profiles
          </button>

          {canEditProfile && (
            isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setSaveError("");
                }}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel Editing
              </button>
            ) : (
              <button
                type="button"
                onClick={startEditing}
                className="rounded-lg bg-[#800018] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#600012]"
              >
                Edit My Profile
              </button>
            )
          )}
        </div>

        {saveMessage && (
          <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {saveMessage}
          </p>
        )}

        {isEditing ? (
          <form
            onSubmit={handleProfileSave}
            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-rose-100 bg-white shadow-xl shadow-rose-100/50"
          >
            <div className="border-b border-rose-100 bg-gradient-to-r from-rose-50 to-white px-5 py-6 sm:px-8">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-600">
                Matrimonial Profile
              </p>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                Edit Your Profile
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Keep your information up to date. Changes are saved to your profile.
              </p>
            </div>

            <div className="space-y-6 p-4 sm:p-8">
              <section className="rounded-2xl border border-rose-100 bg-rose-50/50 p-4 sm:p-6">
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Photo & Account
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile photo or set a new password.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="flex flex-col gap-4 rounded-xl bg-white p-4 sm:flex-row sm:items-center">
                    <Image
                      src={imageUrl}
                      alt="Current profile"
                      width={96}
                      height={96}
                      unoptimized
                      className="h-24 w-24 rounded-xl border border-gray-200 object-cover"
                    />
                    <label className="min-w-0 flex-1 text-sm font-medium text-gray-700">
                      Update profile photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          if (file && file.size > 5 * 1024 * 1024) {
                            setSaveError("Profile photo must be 5 MB or smaller.");
                            event.target.value = "";
                            setSelectedPhoto(null);
                            return;
                          }
                          setSaveError("");
                          setSelectedPhoto(file);
                        }}
                        className="mt-2 block w-full rounded-lg border border-gray-200 bg-white p-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-rose-100 file:px-3 file:py-2 file:font-semibold file:text-rose-700"
                      />
                      <span className="mt-2 block text-xs font-normal text-gray-500">
                        JPG or PNG, up to 5 MB. Leave empty to keep the current photo.
                      </span>
                      {selectedPhoto && (
                        <span className="mt-1 block truncate text-xs font-medium text-rose-700">
                          Selected: {selectedPhoto.name}
                        </span>
                      )}
                    </label>
                  </div>

                  <label className="rounded-xl bg-white p-4 text-sm font-medium text-gray-700">
                    Change password
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      minLength={6}
                      autoComplete="new-password"
                      placeholder="Leave empty to keep current password"
                      className="mt-2 h-11 w-full rounded-lg border border-gray-200 px-3 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                    />
                    <span className="mt-2 block text-xs font-normal text-gray-500">
                      Use at least 6 characters. Your password is kept private.
                    </span>
                  </label>
                </div>
              </section>

              {profileFieldGroups.map((group) => (
                <section
                  key={group.title}
                  className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6"
                >
                  <div className="mb-5 border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {group.description}
                    </p>
                  </div>

                  <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
                    {group.fields.map((key) => {
                      const field = editableProfileFields.find(
                        (item) => item.key === key
                      );

                      if (!field) {
                        return null;
                      }

                      const inputClass =
                        "mt-2 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-rose-400 focus:ring-2 focus:ring-rose-100";

                      return (
                        <label
                          key={field.key}
                          className={`block text-sm font-medium text-gray-700 ${
                            field.multiline ? "sm:col-span-2" : ""
                          }`}
                        >
                          {field.label}
                          {field.multiline ? (
                            <textarea
                              value={editValues[field.key] ?? ""}
                              onChange={(event) =>
                                setEditValues((current) => ({
                                  ...current,
                                  [field.key]: event.target.value,
                                }))
                              }
                              rows={4}
                              className={`${inputClass} resize-y`}
                            />
                          ) : (
                            <input
                              type="text"
                              value={editValues[field.key] ?? ""}
                              onChange={(event) =>
                                setEditValues((current) => ({
                                  ...current,
                                  [field.key]: event.target.value,
                                }))
                              }
                              className={inputClass}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </section>
              ))}

              {saveError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {saveError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSaveError("");
                  }}
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-rose-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving changes..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <ProfileGallery images={photo ? [photo] : []} />
            </div>
            <div>
              <ProfileInfo profile={profile} />
            </div>
          </div>
        )}

      </div>

    </main>
  );
}
