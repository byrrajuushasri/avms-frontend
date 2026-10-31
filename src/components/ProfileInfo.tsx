
"use client";

import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaRupeeSign,
  FaPalette,
  FaCheckCircle,
  FaPrayingHands,
  FaUsers,
  FaGlobe,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

interface Profile {
  id?: number | string;
  member_id?: string | null;
  name?: string | null;
  full_name?: string | null;
  surname?: string | null;
  email?: string | null;
  mobile?: string | null;
  date_of_birth?: string | null;
  dob?: string | null;
  height?: string | null;
  color?: string | null;
  education?: string | null;
  brother_details?: string | null;
  sister_details?: string | null;
  family_status?: string | null;
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
  father_gotram?: string | null;
  mother_gotram?: string | null;
  grandmother_gotram?: string | null;
  mother_tongue?: string | null;
  about?: string | null;
  about_me?: string | null;
  description?: string | null;
  preferred_requirements?: string | null;
  gender?: string | null;
  status?: string | null;
  [key: string]: unknown;
}

interface ProfileInfoProps {
  profile?: Profile | null;
}

export default function ProfileInfo({
  profile,
}: ProfileInfoProps) {
  if (!profile) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-7 w-40 rounded-lg bg-gray-200" />
        <div className="h-9 w-56 rounded-lg bg-gray-200" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-16 rounded-xl bg-gray-100" />
          ))}
        </div>
      </div>
    );
  }

  const nameBase = profile.full_name || profile.name || "Profile";
  const surname = profile.surname?.trim() || "";
  const name =
    surname && !nameBase.toLowerCase().endsWith(surname.toLowerCase())
      ? `${nameBase} ${surname}`
      : nameBase;

  const calculateAge = (dob?: string | null): number | null => {
    if (!dob) return null;

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return null;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 0 && age <= 100 ? age : null;
  };

  const rawDateOfBirth = profile.date_of_birth || profile.dob || null;
  const age = calculateAge(rawDateOfBirth);
  const parsedDateOfBirth = rawDateOfBirth ? new Date(rawDateOfBirth) : null;
  const formattedDateOfBirth =
    parsedDateOfBirth && !Number.isNaN(parsedDateOfBirth.getTime())
      ? parsedDateOfBirth.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : rawDateOfBirth;
  const dateOfBirthAndAge = formattedDateOfBirth
    ? `${formattedDateOfBirth}${age !== null ? ` (${age})` : ""}`
    : age !== null
      ? `${age} Years`
      : null;
  const profession = profile.occupation || profile.profession;
  const income = profile.annual_income ?? profile.income;

  const location =
    [profile.city, profile.mandal, profile.district]
      .filter(Boolean)
      .join(", ") || profile.address;

  const about =
    profile.about_me || profile.about || profile.description;
  const preferredRequirements = profile.preferred_requirements?.trim();
  const email = profile.email?.trim();
  const mobile = profile.mobile?.trim();

  const isVerified =
    String(profile.status || "").toLowerCase() === "approved";

  const details = [
    {
      label: "Gotram",
      value: profile.gotram,
      icon: FaPrayingHands,
    },
    {
      label: "Father Gotram",
      value: profile.father_gotram,
      icon: FaPrayingHands,
    },
    {
      label: "Mother Gotram",
      value: profile.mother_gotram,
      icon: FaPrayingHands,
    },
    {
      label: "Grandmother Gotram",
      value: profile.grandmother_gotram,
      icon: FaPrayingHands,
    },
    { label: "Color", value: profile.color, icon: FaPalette },
    {
      label: "Brother Details",
      value: profile.brother_details,
      icon: FaUsers,
    },
    {
      label: "Sister Details",
      value: profile.sister_details,
      icon: FaUsers,
    },
    {
      label: "Family Status",
      value: profile.family_status,
      icon: FaUsers,
    },
    {
      label: "Profession",
      value: profession,
      icon: FaBriefcase,
    },
    {
      label: "Annual Income",
      value:
        income !== null &&
        income !== undefined &&
        String(income).trim() !== ""
          ? String(income).startsWith("₹")
            ? String(income)
            : `₹${income}`
          : null,
      icon: FaRupeeSign,
    },
    {
      label: "Location",
      value: location,
      icon: FaMapMarkerAlt,
    },
  ].filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      String(item.value).trim() !== ""
  );

  const personalDetails = [
    { label: "Religion", value: profile.religion, icon: FaGlobe },
    { label: "Caste", value: profile.caste, icon: FaUsers },
    {
      label: "Mother Tongue",
      value: profile.mother_tongue,
      icon: FaGlobe,
    },
    { label: "Sangham", value: profile.sangham, icon: FaUsers },
  ].filter(
    (item) =>
      item.value !== null &&
      item.value !== undefined &&
      String(item.value).trim() !== ""
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-[#eadfd9] bg-white shadow-[0_8px_28px_rgba(80,0,24,0.07)]">
      {/* COMPACT PROFILE HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#690015] via-[#800018] to-[#9b344b] px-4 py-4 text-white sm:px-5 sm:py-5">
        <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full border-[20px] border-white/[0.06]" />

        <div className="relative flex flex-wrap items-center gap-2">
          {isVerified && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-green-700">
              <FaCheckCircle />
              Verified
            </span>
          )}
        </div>

        <h1 className="relative mt-3 break-words text-2xl font-bold leading-tight sm:text-3xl">
          {name}
        </h1>

        {profession && (
          <p className="relative mt-1.5 flex items-center gap-2 text-sm text-white/85">
            <FaBriefcase className="shrink-0 text-[#f1d58e]" />
            {profession}
          </p>
        )}

        <div className="relative mt-2 flex flex-wrap gap-2 text-xs text-white/90">
          {dateOfBirthAndAge && (
            <span className="rounded-lg bg-white/10 px-2.5 py-1">
              {dateOfBirthAndAge}
            </span>
          )}
          {profile.height && (
            <span className="rounded-lg bg-white/10 px-2.5 py-1.5">
              {profile.height}
            </span>
          )}
          {profile.education && (
            <span className="rounded-lg bg-white/10 px-2.5 py-1.5">
              {profile.education}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 p-3 sm:p-4">
        {/* PROFILE OVERVIEW */}
        <section>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-[#d9a928]" />
            <div>
              <h2 className="text-lg font-bold text-[#690015]">
                Profile Overview
              </h2>
              <p className="text-[11px] text-gray-500">
                Important profile information
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {details.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="group flex min-w-0 items-center gap-2 rounded-xl border border-[#eee6e0] bg-[#fdfbf9] p-2 transition-colors duration-200 hover:border-[#d9a928] hover:bg-[#fffaf0]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#800018]/[0.07] text-sm text-[#800018] transition-colors group-hover:bg-[#800018] group-hover:text-white">
                  <Icon />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-medium text-gray-500">
                    {label}
                  </p>
                  <p className="mt-0.5 break-words text-sm font-semibold leading-5 text-gray-800">
                    {String(value)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PERSONAL DETAILS */}
        {personalDetails.length > 0 && (
          <section>
            <div className="mb-3 flex items-center gap-2.5">
              <span className="h-6 w-1 rounded-full bg-[#d9a928]" />
              <div>
                <h2 className="text-lg font-bold text-[#690015]">
                  Personal Details
                </h2>
                <p className="text-[11px] text-gray-500">
                  Personal and family background
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#eee6e0]">
              {personalDetails.map(
                ({ label, value, icon: Icon }, index) => (
                  <div
                    key={label}
                    className={`flex items-center justify-between gap-3 px-3 py-1.5 ${
                      index % 2 === 0 ? "bg-[#fdfbf9]" : "bg-white"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2 text-xs text-gray-500 sm:text-sm">
                      <Icon className="shrink-0 text-[#a67816]" />
                      {label}
                    </span>

                    <span className="max-w-[58%] break-words text-right text-xs font-semibold text-gray-800 sm:text-sm">
                      {String(value)}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ABOUT ME */}
        {about && (
          <section className="rounded-xl border border-[#ead7ad] bg-[#fffaf0] p-4">
            <div className="mb-2 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800018] text-sm text-white">
                <FaPrayingHands />
              </div>
              <h2 className="text-lg font-bold text-[#690015]">
                About Me
              </h2>
            </div>

            <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
              {about}
            </p>
          </section>
        )}

        {/* PREFERRED REQUIREMENTS */}
        <section className="rounded-xl border border-[#ead7ad] bg-[#fffaf0] p-4">
          <div className="mb-2 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#800018] text-sm text-white">
              <FaCheckCircle />
            </div>
            <h2 className="text-lg font-bold text-[#690015]">
              Preferred Requirements
            </h2>
          </div>
          <p className="whitespace-pre-line break-words text-sm leading-6 text-gray-600">
            {preferredRequirements || "No preferred requirements provided."}
          </p>
        </section>

        {/* CONTACT DETAILS */}
        <section className="rounded-xl border border-[#ead7ad] bg-gradient-to-br from-[#fffaf0] to-white p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="h-6 w-1 rounded-full bg-[#d9a928]" />
            <div>
              <h2 className="text-lg font-bold text-[#690015]">
                Contact Details
              </h2>
              <p className="text-[11px] text-gray-500">
                Available to the profile owner and accepted connections
              </p>
            </div>
          </div>

          {email || mobile ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-[#eee6e0] bg-white p-3 text-sm font-semibold text-[#800018] hover:bg-[#fffaf0]"
                >
                  <FaEnvelope className="shrink-0" aria-hidden="true" />
                  <span className="break-all">{email}</span>
                </a>
              )}
              {mobile && (
                <a
                  href={`tel:${mobile}`}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-[#eee6e0] bg-white p-3 text-sm font-semibold text-[#800018] hover:bg-[#fffaf0]"
                >
                  <FaPhone className="shrink-0" aria-hidden="true" />
                  <span>{mobile}</span>
                </a>
              )}
            </div>
          ) : (
            <p className="rounded-lg bg-white/80 px-3 py-3 text-sm text-gray-600">
              Contact details are shown after a request is accepted.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
