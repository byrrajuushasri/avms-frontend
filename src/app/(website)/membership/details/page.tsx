"use client";

import { useMemo, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCalendarAlt,
  FaCheckCircle,
  FaChevronRight,
  FaCreditCard,
  FaEnvelope,
  FaIdCard,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaSearch,
  FaUserCircle,
  FaVenusMars,
} from "react-icons/fa";

type Member = {
  memberId: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  occupation: string;

  state: string;
  district: string;
  mandal: string;
  sangam: string;

  membershipType: string;
  status: "Active" | "Pending";
  amount: string;
  paymentStatus: "Paid" | "Free";
  paymentMethod: string;
  transactionId: string;
  paymentDate: string;
};

/* =========================================================
   STATIC TEST DATA
   Client Demo Purpose Only
========================================================= */

const testMembers: Member[] = [
  {
    memberId: "AVM10001",
    name: "Ramanaraju",
    email: "ramanaraju@gmail.com",
    phone: "9876543210",
    gender: "Male",
    dob: "15 August 1990",
    occupation: "Business",

    state: "Telangana",
    district: "Hyderabad",
    mandal: "Khairatabad",
    sangam: "Khairatabad Arya Vysya Sangam",

    membershipType: "State Membership",
    status: "Active",
    amount: "₹999",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    transactionId: "UPI100001",
    paymentDate: "18 August 2026",
  },

  {
    memberId: "AVM10002",
    name: "Suresh Kumar",
    email: "suresh@gmail.com",
    phone: "9876501234",
    gender: "Male",
    dob: "12 May 1988",
    occupation: "Software Engineer",

    state: "Telangana",
    district: "Rangareddy",
    mandal: "Serilingampally",
    sangam: "Miyapur Arya Vysya Sangam",

    membershipType: "State Membership",
    status: "Active",
    amount: "₹999",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    transactionId: "UPI100002",
    paymentDate: "17 August 2026",
  },

  {
    memberId: "AVM10003",
    name: "Lakshmi Devi",
    email: "lakshmi@gmail.com",
    phone: "9988776655",
    gender: "Female",
    dob: "20 March 1992",
    occupation: "Teacher",

    state: "Telangana",
    district: "Warangal",
    mandal: "Hanamkonda",
    sangam: "Hanamkonda Arya Vysya Sangam",

    membershipType: "State Membership",
    status: "Active",
    amount: "₹0",
    paymentStatus: "Free",
    paymentMethod: "-",
    transactionId: "-",
    paymentDate: "-",
  },

  {
    memberId: "AVM10004",
    name: "Venkat Rao",
    email: "venkatrao@gmail.com",
    phone: "9966332211",
    gender: "Male",
    dob: "10 January 1985",
    occupation: "Entrepreneur",

    state: "Telangana",
    district: "Nalgonda",
    mandal: "Nalgonda",
    sangam: "Nalgonda Arya Vysya Sangam",

    membershipType: "State Membership",
    status: "Active",
    amount: "₹999",
    paymentStatus: "Paid",
    paymentMethod: "Card",
    transactionId: "CARD100004",
    paymentDate: "16 August 2026",
  },

  {
    memberId: "AVM10005",
    name: "Priya Kumari",
    email: "priya@gmail.com",
    phone: "9955443322",
    gender: "Female",
    dob: "08 September 1995",
    occupation: "Accountant",

    state: "Telangana",
    district: "Karimnagar",
    mandal: "Karimnagar",
    sangam: "Karimnagar Arya Vysya Sangam",

    membershipType: "Sangam Membership",
    status: "Active",
    amount: "₹499",
    paymentStatus: "Paid",
    paymentMethod: "UPI",
    transactionId: "UPI100005",
    paymentDate: "15 August 2026",
  },
];

export default function ExistingMembersPage() {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  const [searched, setSearched] = useState(false);

  /* =========================================================
     SEARCH
  ========================================================= */

  const results = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return [];

    return testMembers.filter((member) => {
      return (
        member.name.toLowerCase().includes(value) ||
        member.email.toLowerCase().includes(value) ||
        member.phone.includes(value) ||
        member.memberId.toLowerCase().includes(value)
      );
    });
  }, [search]);

  const handleSearch = () => {
    setSearched(true);
    setSelectedMember(null);
  };

  const clearSearch = () => {
    setSearch("");
    setSearched(false);
    setSelectedMember(null);
  };

  /* =========================================================
     PARTICULAR MEMBER DETAILS
  ========================================================= */

  if (selectedMember) {
    const member = selectedMember;

    return (
      <main className="min-h-screen bg-gradient-to-br from-[#fff8f0] via-white to-[#fff1f5] px-4 py-8">

        <div className="mx-auto max-w-5xl">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => setSelectedMember(null)}
            className="mb-5 flex items-center gap-2 rounded-lg border border-[#800018] bg-white px-4 py-2 text-sm font-semibold text-[#800018] transition hover:bg-[#fff5df]"
          >
            <FaArrowLeft />
            Back to Members
          </button>

          {/* MEMBER HEADER */}

          <section className="overflow-hidden rounded-3xl bg-white shadow-xl">

            <div className="bg-gradient-to-r from-[#800018] to-[#ae001b] px-6 py-8 text-center text-white">

              <FaUserCircle className="mx-auto mb-3 text-6xl" />

              <h1 className="text-2xl font-bold sm:text-3xl">
                {member.name}
              </h1>

              <p className="mt-1 text-sm text-white/80">
                Telangana State Arya Vysya Mahasabha
              </p>

              <div className="mt-4 inline-flex rounded-full bg-white/15 px-5 py-2 text-sm font-semibold">
                Member ID: {member.memberId}
              </div>

            </div>

            <div className="p-5 sm:p-8">

              {/* STATUS */}

              <div className="mb-7 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-xl text-green-600" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Membership Status
                    </p>

                    <p className="font-bold text-green-700">
                      {member.status}
                    </p>
                  </div>

                </div>

                <span className="rounded-full bg-[#800018] px-4 py-2 text-xs font-semibold text-white">
                  {member.membershipType}
                </span>

              </div>

              {/* PERSONAL DETAILS */}

              <SectionTitle
                icon={<FaIdCard />}
                title="Member Information"
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                <InfoCard
                  icon={<FaUserCircle />}
                  title="Full Name"
                  value={member.name}
                />

                <InfoCard
                  icon={<FaIdCard />}
                  title="Member ID"
                  value={member.memberId}
                />

                <InfoCard
                  icon={<FaPhone />}
                  title="Phone Number"
                  value={member.phone}
                />

                <InfoCard
                  icon={<FaEnvelope />}
                  title="Email Address"
                  value={member.email}
                />

                <InfoCard
                  icon={<FaVenusMars />}
                  title="Gender"
                  value={member.gender}
                />

                <InfoCard
                  icon={<FaCalendarAlt />}
                  title="Date of Birth"
                  value={member.dob}
                />

                <InfoCard
                  icon={<FaBriefcase />}
                  title="Occupation"
                  value={member.occupation}
                />

                <InfoCard
                  icon={<FaIdCard />}
                  title="Membership Type"
                  value={member.membershipType}
                  highlight
                />

              </div>

              {/* LOCATION */}

              <div className="mt-9">

                <SectionTitle
                  icon={<FaMapMarkerAlt />}
                  title="Organization Details"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    title="State"
                    value={member.state}
                  />

                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    title="District"
                    value={member.district}
                  />

                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    title="Mandal"
                    value={member.mandal}
                  />

                  <InfoCard
                    icon={<FaMapMarkerAlt />}
                    title="Sangam"
                    value={member.sangam}
                  />

                </div>

              </div>

              {/* PAYMENT */}

              <div className="mt-9">

                <SectionTitle
                  icon={<FaMoneyBillWave />}
                  title="Membership Payment"
                />

                <div
                  className={`rounded-2xl border p-5 ${
                    member.paymentStatus === "Paid"
                      ? "border-green-200 bg-green-50"
                      : "border-blue-200 bg-blue-50"
                  }`}
                >

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    <InfoCard
                      icon={<FaMoneyBillWave />}
                      title="Payment Status"
                      value={member.paymentStatus}
                      highlight={
                        member.paymentStatus === "Paid"
                      }
                    />

                    <InfoCard
                      icon={<FaMoneyBillWave />}
                      title="Amount"
                      value={member.amount}
                      highlight
                    />

                    <InfoCard
                      icon={<FaCreditCard />}
                      title="Payment Method"
                      value={member.paymentMethod}
                    />

                    <InfoCard
                      icon={<FaIdCard />}
                      title="Transaction ID"
                      value={member.transactionId}
                    />

                    <InfoCard
                      icon={<FaCalendarAlt />}
                      title="Payment Date"
                      value={member.paymentDate}
                    />

                  </div>

                </div>

              </div>

              {/* DEMO NOTE */}

              <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-center text-sm text-yellow-800">
                Demo member data for client presentation
              </div>

            </div>

          </section>

        </div>

      </main>
    );
  }

  /* =========================================================
     SEARCH PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff8f0] via-white to-[#fff1f5] px-4 py-10">

      <div className="mx-auto max-w-5xl">

        {/* TITLE */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#fff0f3]">
            <FaIdCard className="text-3xl text-[#800018]" />
          </div>

          <h1 className="text-3xl font-bold text-[#800018] sm:text-4xl">
            Existing Members
          </h1>

          <p className="mt-2 text-gray-600">
            Search your registered membership details
          </p>

        </div>

        {/* SEARCH BOX */}

        <section className="rounded-3xl border border-[#ead9b5] bg-white p-5 shadow-xl sm:p-7">

          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Search Member
          </label>

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">

              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSearched(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Search by name, email, phone or Member ID"
                className="h-13 w-full rounded-xl border border-gray-300 pl-11 pr-4 text-sm outline-none transition focus:border-[#800018] focus:ring-2 focus:ring-[#800018]/10"
              />

            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#800018] px-8 font-semibold text-white transition hover:bg-[#650014]"
            >
              <FaSearch />
              Search
            </button>

            {searched && (
              <button
                type="button"
                onClick={clearSearch}
                className="h-13 rounded-xl border border-gray-300 px-6 font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Clear
              </button>
            )}

          </div>

          {/* SEARCH EXAMPLES */}

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="text-xs text-gray-500">
              Try:
            </span>

            {[
              "Ramanaraju",
              "suresh@gmail.com",
              "9876543210",
              "AVM10003",
            ].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setSearch(item);
                  setSearched(false);
                }}
                className="rounded-full bg-[#fff5df] px-3 py-1 text-xs font-medium text-[#800018] hover:bg-[#f8edcf]"
              >
                {item}
              </button>
            ))}

          </div>

        </section>

        {/* RESULTS */}

        {searched && (
          <section className="mt-8">

            {results.length === 0 ? (

              <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

                <FaUserCircle className="mx-auto mb-4 text-5xl text-gray-300" />

                <h2 className="text-xl font-bold text-gray-700">
                  Member Not Found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Please check the name, email, phone number
                  or Member ID.
                </p>

              </div>

            ) : (

              <>

                <div className="mb-4 flex items-center justify-between">

                  <h2 className="text-xl font-bold text-gray-800">
                    Search Results
                  </h2>

                  <span className="rounded-full bg-[#fff0f3] px-4 py-2 text-sm font-semibold text-[#800018]">
                    {results.length} Member
                    {results.length > 1 ? "s" : ""}
                  </span>

                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {results.map((member) => (

                    <article
                      key={member.memberId}
                      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                    >

                      <div className="flex gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#fff0f3]">
                          <FaUserCircle className="text-4xl text-[#800018]" />
                        </div>

                        <div className="min-w-0">

                          <h3 className="text-lg font-bold text-gray-800">
                            {member.name}
                          </h3>

                          <p className="mt-1 text-sm font-semibold text-[#800018]">
                            {member.memberId}
                          </p>

                        </div>

                      </div>

                      <div className="mt-5 space-y-2 text-sm text-gray-600">

                        <p className="flex items-center gap-2">
                          <FaPhone className="text-[#800018]" />
                          {member.phone}
                        </p>

                        <p className="flex items-center gap-2 break-all">
                          <FaEnvelope className="text-[#800018]" />
                          {member.email}
                        </p>

                        <p className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-[#800018]" />
                          {member.district}, {member.state}
                        </p>

                      </div>

                      <div className="mt-4 flex items-center justify-between">

                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                          {member.status}
                        </span>

                        <span className="text-xs text-gray-500">
                          {member.membershipType}
                        </span>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedMember(member)
                        }
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#800018] py-3 font-semibold text-white transition hover:bg-[#650014]"
                      >
                        View Member Details
                        <FaChevronRight className="text-xs" />
                      </button>

                    </article>

                  ))}

                </div>

              </>

            )}

          </section>
        )}

        {/* BEFORE SEARCH */}

        {!searched && (

          <div className="mt-8 rounded-2xl border border-[#ead9b5] bg-white p-8 text-center shadow-lg">

            <FaSearch className="mx-auto mb-4 text-4xl text-[#d6b36a]" />

            <h2 className="text-lg font-bold text-gray-700">
              Find Existing Member
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Search using member name, email address,
              mobile number or Member ID.
            </p>

          </div>

        )}

      </div>

    </main>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-gray-800">
      <span className="text-[#800018]">
        {icon}
      </span>

      {title}
    </h2>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon,
  title,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

      <div className="flex items-start gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fff0f3] text-[#800018]">
          {icon}
        </div>

        <div className="min-w-0">

          <p className="mb-1 text-xs text-gray-500">
            {title}
          </p>

          <p
            className={`break-words text-sm ${
              highlight
                ? "font-bold text-[#800018]"
                : "font-medium text-gray-800"
            }`}
          >
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}