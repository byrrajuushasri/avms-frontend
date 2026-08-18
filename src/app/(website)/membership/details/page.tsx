"use client";

import {
  FaDownload,
  FaUserCircle,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
  FaVenusMars,
  FaCalendarAlt,
  FaCrown,
  FaMoneyBillWave,
  FaCreditCard,
  FaHashtag,
  FaCheckCircle,
} from "react-icons/fa";

export default function MemberDetails() {
  // Demo member data
  const member = {
    member_id: "AV10001",
    full_name: "Ramanaraju",
    mobile: "9876543210",
    email: "demo@gmail.com",
    gender: "Male",
    date_of_birth: "15-08-1990",
    occupation: "Business",
    membership_type: "Annual Membership",

    district: "Hyderabad",
    mandal: "Amberpet",
    sangham: "Hyderabad Arya Vysya Sangham",

    registration_fee: "Paid",
    amount_paid: "₹999",
    payment_method: "UPI",
    transaction_id: "UPI123456789",
    payment_date: "18-08-2026",
  };

  const handleDownloadCard = () => {
    window.print();
  };

  const handleDownloadReceipt = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto">

        

        {/* ================= MEMBERSHIP CARD ================= */}
        <div
          id="membership-card"
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100"
        >
 

          {/* ================= MEMBER INFORMATION ================= */}
          <div className="p-6 sm:p-8">

            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
              <FaIdCard className="text-rose-600" />
              Member Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* NAME */}
              <InfoCard
                icon={<FaUserCircle />}
                label="Full Name"
                value={member.full_name}
              />
              {/* MEMBER ID */}
              <InfoCard
                icon={<FaIdCard />}
                label="Member ID"
                value={member.member_id}
              />

              {/* MOBILE */}
              <InfoCard
                icon={<FaPhone />}
                label="Mobile Number"
                value={member.mobile}
              />

              {/* EMAIL */}
              <InfoCard
                icon={<FaEnvelope />}
                label="Email Address"
                value={member.email}
              />

              {/* GENDER */}
              <InfoCard
                icon={<FaVenusMars />}
                label="Gender"
                value={member.gender}
              />

              {/* DOB */}
              <InfoCard
                icon={<FaCalendarAlt />}
                label="Date of Birth"
                value={member.date_of_birth}
              />

              {/* OCCUPATION */}
              <InfoCard
                icon={<FaBriefcase />}
                label="Occupation"
                value={member.occupation}
              />

              {/* MEMBERSHIP */}
              <InfoCard
                icon={<FaCrown />}
                label="Membership Type"
                value={member.membership_type}
                valueClass="text-rose-600 font-bold"
              />

            </div>

            {/* ================= LOCATION ================= */}
            <div className="mt-8">

              <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                <FaMapMarkerAlt className="text-rose-600" />
                Sangham Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="District"
                  value={member.district}
                />

                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Mandal"
                  value={member.mandal}
                />

                <InfoCard
                  icon={<FaMapMarkerAlt />}
                  label="Sangham"
                  value={member.sangham}
                />

              </div>

            </div>

            {/* ================= PAYMENT DETAILS ================= */}
            {member.registration_fee === "Paid" && (
              <div className="mt-8">

                <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2">
                  <FaMoneyBillWave className="text-green-600" />
                  Payment Details
                </h3>

                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

                  {/* PAID STATUS */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-green-200">

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FaCheckCircle className="text-green-600 text-xl" />
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Payment Status
                        </p>

                        <p className="font-bold text-green-600">
                          Paid Successfully
                        </p>
                      </div>
                    </div>

                    <p className="text-2xl font-bold text-green-700">
                      {member.amount_paid}
                    </p>

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <InfoCard
                      icon={<FaCreditCard />}
                      label="Payment Method"
                      value={member.payment_method}
                      white
                    />

                    <InfoCard
                      icon={<FaHashtag />}
                      label="Transaction ID"
                      value={member.transaction_id}
                      white
                    />

                    <InfoCard
                      icon={<FaCalendarAlt />}
                      label="Payment Date"
                      value={member.payment_date}
                      white
                    />

                    <InfoCard
                      icon={<FaMoneyBillWave />}
                      label="Amount Paid"
                      value={member.amount_paid}
                      valueClass="text-green-600 font-bold"
                      white
                    />

                  </div>

                </div>
              </div>
            )}

            {/* ================= FREE MEMBERSHIP ================= */}
            {member.registration_fee === "Free" && (
              <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">

                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 text-2xl" />

                  <div>
                    <p className="font-bold text-blue-700">
                      Free Membership
                    </p>

                    <p className="text-sm text-gray-600">
                      No registration fee was charged.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* ================= ACTION BUTTONS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">

              <button
                onClick={handleDownloadCard}
                className="h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-md"
              >
                <FaDownload />
                Download Member Card
              </button>

              <button
                onClick={handleDownloadReceipt}
                className="h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition shadow-md"
              >
                <FaDownload />
                Download Receipt
              </button>

            </div>

            {/* ================= FOOTER ================= */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200">

              <p className="text-sm text-gray-500">
                Thank you for becoming a member.
              </p>

              <p className="text-sm font-semibold text-rose-600 mt-1">
                Arya Vysya Membership
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}


/* =====================================================
   REUSABLE INFO CARD
===================================================== */

function InfoCard({
  icon,
  label,
  value,
  valueClass = "text-gray-800",
  white = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
  white?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        white
          ? "bg-white border-green-100"
          : "bg-gray-50 border-gray-100"
      }`}
    >
      <div className="flex items-start gap-3">

        <div className="w-9 h-9 rounded-lg bg-rose-100 flex items-center justify-center flex-shrink-0">
          <span className="text-rose-600">
            {icon}
          </span>
        </div>

        <div className="min-w-0">

          <p className="text-xs text-gray-500 mb-1">
            {label}
          </p>

          <p className={`text-sm break-words ${valueClass}`}>
            {value}
          </p>

        </div>

      </div>
    </div>
  );
}