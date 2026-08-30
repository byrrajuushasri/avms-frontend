"use client";

import { useEffect, useMemo, useState } from "react";

type Member = {
  id: number;
  member_id: string;

  full_name: string;
  mobile: string;
  email: string;
  occupation: string;

  gender: string;
  date_of_birth: string;

  district: string;
  mandal: string;
  sangham: string;

  mahashaba_payment_status: string;
  mahashaba_payment_method?: string | null;
  mahashaba_receipt_number?: string | null;
  mahashaba_amount_paid?: string | number | null;
  mahashaba_payment_date?: string | null;

  sangam_payment_status: string;
  sangam_payment_method?: string | null;
  sangam_receipt_number?: string | null;
  sangam_amount_paid?: string | number | null;
  sangam_payment_date?: string | null;

  executive_member: string;
  executive_body?: string | null;
  designation?: string | null;

  status: string;
  created_at: string;
};

const API =
  `${process.env.NEXT_PUBLIC_API_URL}/membership-register`;

const ITEMS_PER_PAGE = 5;

export default function MembershipDetailsPage() {
  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [district, setDistrict] = useState("");
  const [mandal, setMandal] = useState("");
  const [sangham, setSangham] = useState("");
  const [gender, setGender] = useState("");
  const [executive, setExecutive] = useState("");

  const [selectedMember, setSelectedMember] =
    useState<Member | null>(null);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const [currentPage, setCurrentPage] = useState(1);

  /* =========================================================
     LOAD MEMBERS
  ========================================================= */

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load members");
        }

        const data = await response.json();

        setMembers(
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : []
        );
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load members"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMembers();
  }, []);

  /* =========================================================
     DISTRICTS
  ========================================================= */

  const districts = useMemo(() => {
    return Array.from(
      new Set(
        members
          .map((m) => m.district)
          .filter(Boolean)
      )
    ).sort();
  }, [members]);

  /* =========================================================
     MANDALS
  ========================================================= */

  const mandals = useMemo(() => {
    return Array.from(
      new Set(
        members
          .filter(
            (m) =>
              !district ||
              m.district === district
          )
          .map((m) => m.mandal)
          .filter(Boolean)
      )
    ).sort();
  }, [members, district]);

  /* =========================================================
     SANGHAMS
  ========================================================= */

  const sanghams = useMemo(() => {
    return Array.from(
      new Set(
        members
          .filter(
            (m) =>
              (!district ||
                m.district === district) &&
              (!mandal ||
                m.mandal === mandal)
          )
          .map((m) => m.sangham)
          .filter(Boolean)
      )
    ).sort();
  }, [members, district, mandal]);

  /* =========================================================
     FILTER MEMBERS
  ========================================================= */

  const filteredMembers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return members.filter((member) => {
      const searchMatch =
        !value ||
        member.full_name
          ?.toLowerCase()
          .includes(value) ||
        member.member_id
          ?.toLowerCase()
          .includes(value) ||
        member.mobile
          ?.toLowerCase()
          .includes(value) ||
        member.email
          ?.toLowerCase()
          .includes(value);

      return (
        searchMatch &&
        (!district ||
          member.district === district) &&
        (!mandal ||
          member.mandal === mandal) &&
        (!sangham ||
          member.sangham === sangham) &&
        (!gender ||
          member.gender === gender) &&
        (!executive ||
          member.executive_member ===
            executive)
      );
    });
  }, [
    members,
    search,
    district,
    mandal,
    sangham,
    gender,
    executive,
  ]);

  /* =========================================================
     TOTAL PAGES
  ========================================================= */

  const totalPages = Math.ceil(
    filteredMembers.length / ITEMS_PER_PAGE
  );

  /* =========================================================
     CURRENT PAGE DATA
  ========================================================= */

  const paginatedMembers = useMemo(() => {
    const startIndex =
      (currentPage - 1) * ITEMS_PER_PAGE;

    const endIndex =
      startIndex + ITEMS_PER_PAGE;

    return filteredMembers.slice(
      startIndex,
      endIndex
    );
  }, [filteredMembers, currentPage]);

  /* =========================================================
     RESET PAGE WHEN FILTER / SEARCH CHANGES
  ========================================================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    district,
    mandal,
    sangham,
    gender,
    executive,
  ]);

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setDistrict("");
    setMandal("");
    setSangham("");
    setGender("");
    setExecutive("");
    setCurrentPage(1);
  };

  /* =========================================================
     DISTRICT CHANGE
  ========================================================= */

  const changeDistrict = (value: string) => {
    setDistrict(value);
    setMandal("");
    setSangham("");
    setCurrentPage(1);
  };

  /* =========================================================
     MANDAL CHANGE
  ========================================================= */

  const changeMandal = (value: string) => {
    setMandal(value);
    setSangham("");
    setCurrentPage(1);
  };

  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  const goToPage = (page: number) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     PAGINATION PAGE NUMBERS
  ========================================================= */

  const pageNumbers = useMemo(() => {
    const pages: number[] = [];

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      pages.push(i);
    }

    return pages;
  }, [totalPages]);

  /* =========================================================
     DISPLAY RANGE
  ========================================================= */

  const startRecord =
    filteredMembers.length === 0
      ? 0
      : (currentPage - 1) *
          ITEMS_PER_PAGE +
        1;

  const endRecord = Math.min(
    currentPage * ITEMS_PER_PAGE,
    filteredMembers.length
  );

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-rose-600 sm:text-3xl">
            Existing Members
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Search registered members by
            name, Member ID, mobile, email,
            district, mandal or sangham.
          </p>
        </div>

        {/* =================================================
            FILTERS
        ================================================= */}

        <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

            {/* SEARCH */}

            <div className="lg:col-span-3">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Search Member
              </label>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Name, Member ID, Mobile or Email"
                className="h-11 w-full rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50"
              />
            </div>

            {/* DISTRICT */}

            <FilterSelect
              label="District"
              value={district}
              onChange={changeDistrict}
            >
              <option value="">
                All Districts
              </option>

              {districts.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item.replaceAll("_", " ")}
                </option>
              ))}
            </FilterSelect>

            {/* MANDAL */}

            <FilterSelect
              label="Mandal"
              value={mandal}
              disabled={!district}
              onChange={changeMandal}
            >
              <option value="">
                All Mandals
              </option>

              {mandals.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </FilterSelect>

            {/* SANGHAM */}

            <FilterSelect
              label="Sangham"
              value={sangham}
              disabled={!mandal}
              onChange={setSangham}
            >
              <option value="">
                All Sanghams
              </option>

              {sanghams.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </FilterSelect>

            {/* GENDER */}

            <FilterSelect
              label="Gender"
              value={gender}
              onChange={setGender}
            >
              <option value="">
                All Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>
            </FilterSelect>

            {/* EXECUTIVE */}

            <FilterSelect
              label="Executive Member"
              value={executive}
              onChange={setExecutive}
            >
              <option value="">
                All Members
              </option>

              <option value="Yes">
                Executive Members
              </option>

              <option value="No">
                Non-Executive Members
              </option>
            </FilterSelect>

            {/* RESET */}

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="h-11 w-full rounded-xl border border-gray-300 bg-white px-5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset Filters
              </button>
            </div>

          </div>
        </div>

        {/* =================================================
            RESULT COUNT
        ================================================= */}

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing{" "}
            <strong>
              {startRecord}
              {filteredMembers.length > 0 &&
                `-${endRecord}`}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredMembers.length}
            </strong>{" "}
            members
          </p>

          <p className="text-sm text-gray-500">
            Page{" "}
            <strong>
              {totalPages === 0
                ? 0
                : currentPage}
            </strong>{" "}
            of{" "}
            <strong>
              {totalPages}
            </strong>
          </p>
        </div>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =================================================
            TABLE
        ================================================= */}

        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
            Loading members...
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="overflow-x-auto">
              <table className="min-w-full">

                <thead className="bg-rose-50">
                  <tr>
                    {[
                      "Member ID",
                      "Member",
                      "Mobile",
                      "District",
                      "Mandal",
                      "Sangham",
                      "Executive",
                      "Action",
                    ].map((title) => (
                      <th
                        key={title}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-600"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">

                  {paginatedMembers.map(
                    (member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50"
                      >

                        {/* MEMBER ID */}

                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-rose-600">
                          {member.member_id}
                        </td>

                        {/* MEMBER */}

                        <td className="px-5 py-4">
                          <div className="font-medium text-gray-900">
                            {member.full_name}
                          </div>

                          <div className="text-xs text-gray-500">
                            {member.email}
                          </div>
                        </td>

                        {/* MOBILE */}

                        <td className="px-5 py-4 text-sm">
                          {member.mobile}
                        </td>

                        {/* DISTRICT */}

                        <td className="px-5 py-4 text-sm">
                          {member.district?.replaceAll(
                            "_",
                            " "
                          )}
                        </td>

                        {/* MANDAL */}

                        <td className="px-5 py-4 text-sm">
                          {member.mandal}
                        </td>

                        {/* SANGHAM */}

                        <td className="px-5 py-4 text-sm">
                          {member.sangham}
                        </td>

                        {/* EXECUTIVE */}

                        <td className="px-5 py-4">

                          {member.executive_member ===
                          "Yes" ? (
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                              Yes
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                              No
                            </span>
                          )}

                        </td>

                        {/* ACTION */}

                        <td className="px-5 py-4">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedMember(
                                member
                              )
                            }
                            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                          >
                            View
                          </button>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>
              </table>
            </div>

            {/* =================================================
                NO MEMBERS
            ================================================= */}

            {filteredMembers.length === 0 && (
              <div className="p-10 text-center text-sm text-gray-500">
                No members found.
              </div>
            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {filteredMembers.length > 0 &&
              totalPages > 1 && (
                <div className="flex flex-col gap-4 border-t border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

                  {/* RECORD INFO */}

                  <div className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      {startRecord}
                    </span>
                    {" - "}
                    <span className="font-semibold text-gray-700">
                      {endRecord}
                    </span>
                    {" of "}
                    <span className="font-semibold text-gray-700">
                      {filteredMembers.length}
                    </span>
                  </div>

                  {/* PAGINATION BUTTONS */}

                  <div className="flex flex-wrap items-center gap-2">

                    {/* PREVIOUS */}

                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage - 1
                        )
                      }
                      disabled={currentPage === 1}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {/* PAGE NUMBERS */}

                    {pageNumbers.map(
                      (page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() =>
                            goToPage(page)
                          }
                          className={`min-w-10 rounded-lg px-3 py-2 text-sm font-semibold ${
                            currentPage ===
                            page
                              ? "bg-rose-600 text-white"
                              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}

                    {/* NEXT */}

                    <button
                      type="button"
                      onClick={() =>
                        goToPage(
                          currentPage + 1
                        )
                      }
                      disabled={
                        currentPage ===
                        totalPages
                      }
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>

                  </div>
                </div>
              )}

          </div>
        )}
      </div>

      {/* =====================================================
          MEMBER DETAILS MODAL
      ===================================================== */}

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">

              <div>
                <h2 className="text-xl font-bold">
                  Member Details
                </h2>

                <p className="text-sm font-semibold text-rose-600">
                  {selectedMember.member_id}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedMember(null)
                }
                className="rounded-lg px-3 py-2 text-xl text-gray-500 hover:bg-gray-100"
              >
                ×
              </button>

            </div>

            {/* DETAILS */}

            <div className="grid grid-cols-1 gap-5 p-6 sm:grid-cols-2">

              <Detail
                label="Full Name"
                value={
                  selectedMember.full_name
                }
              />

              <Detail
                label="Mobile"
                value={
                  selectedMember.mobile
                }
              />

              <Detail
                label="Email"
                value={
                  selectedMember.email
                }
              />

              <Detail
                label="Occupation"
                value={
                  selectedMember.occupation
                }
              />

              <Detail
                label="Gender"
                value={
                  selectedMember.gender
                }
              />

              <Detail
                label="Date of Birth"
                value={
                  selectedMember.date_of_birth
                }
              />

              <Detail
                label="District"
                value={
                  selectedMember.district
                }
              />

              <Detail
                label="Mandal"
                value={
                  selectedMember.mandal
                }
              />

              <Detail
                label="Sangham"
                value={
                  selectedMember.sangham
                }
              />

              <Detail
                label="Mahashaba Payment"
                value={
                  selectedMember.mahashaba_payment_status
                }
              />

              <Detail
                label="Mahashaba Method"
                value={
                  selectedMember.mahashaba_payment_method
                }
              />

              <Detail
                label="Mahashaba Receipt"
                value={
                  selectedMember.mahashaba_receipt_number
                }
              />

              <Detail
                label="Mahashaba Amount"
                value={
                  selectedMember.mahashaba_amount_paid !=
                  null
                    ? String(
                        selectedMember.mahashaba_amount_paid
                      )
                    : "-"
                }
              />

              <Detail
                label="Mahashaba Payment Date"
                value={
                  selectedMember.mahashaba_payment_date
                }
              />

              <Detail
                label="Sangham Payment"
                value={
                  selectedMember.sangam_payment_status
                }
              />

              <Detail
                label="Sangham Method"
                value={
                  selectedMember.sangam_payment_method
                }
              />

              <Detail
                label="Sangham Receipt"
                value={
                  selectedMember.sangam_receipt_number
                }
              />

              <Detail
                label="Sangham Amount"
                value={
                  selectedMember.sangam_amount_paid !=
                  null
                    ? String(
                        selectedMember.sangam_amount_paid
                      )
                    : "-"
                }
              />

              <Detail
                label="Sangham Payment Date"
                value={
                  selectedMember.sangam_payment_date
                }
              />

              <Detail
                label="Executive Member"
                value={
                  selectedMember.executive_member
                }
              />

              {selectedMember.executive_member ===
                "Yes" && (
                <>
                  <Detail
                    label="Executive Body"
                    value={
                      selectedMember.executive_body
                    }
                  />

                  <Detail
                    label="Designation"
                    value={
                      selectedMember.designation
                    }
                  />
                </>
              )}

              <Detail
                label="Status"
                value={
                  selectedMember.status
                }
              />

              <Detail
                label="Registered On"
                value={
                  selectedMember.created_at
                }
              />

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   FILTER SELECT
========================================================= */

function FilterSelect({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-rose-400 disabled:bg-gray-100"
      >
        {children}
      </select>
    </div>
  );
}

/* =========================================================
   DETAIL
========================================================= */

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}

