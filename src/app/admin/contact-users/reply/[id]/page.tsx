"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import {
  FaArrowLeft,
  FaPaperPlane,
  FaUser,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const messagesData = [
  {
    id: 1,
    name: "Ramesh Kumar",
    email: "ramesh@gmail.com",
    mobile: "9876543210",
    subject: "Profile enquiry",
    message: "I need more details about this profile.",
    date: "05 Aug 2026",
    status: "New",
  },
  {
    id: 2,
    name: "Lakshmi Devi",
    email: "lakshmi@gmail.com",
    mobile: "9123456780",
    subject: "Membership issue",
    message: "Payment completed but membership not activated.",
    date: "04 Aug 2026",
    status: "Replied",
  },
  {
    id: 3,
    name: "Suresh Rao",
    email: "suresh@gmail.com",
    mobile: "9988776655",
    subject: "Account support",
    message: "Unable to login into my account.",
    date: "03 Aug 2026",
    status: "Closed",
  },
  {
    id: 4,
    name: "Anitha Reddy",
    email: "anitha@gmail.com",
    mobile: "9001234567",
    subject: "Profile verification",
    message: "I would like to know the verification process.",
    date: "02 Aug 2026",
    status: "New",
  },
  {
    id: 5,
    name: "Vijay Kumar",
    email: "vijay@gmail.com",
    mobile: "9555678901",
    subject: "Payment enquiry",
    message: "Please help me with my membership payment.",
    date: "01 Aug 2026",
    status: "Replied",
  },
  {
    id: 6,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    mobile: "9887766554",
    subject: "Profile enquiry",
    message: "I want to know more information about the profile.",
    date: "31 Jul 2026",
    status: "New",
  },
  {
    id: 7,
    name: "Rajesh Kumar",
    email: "rajesh@gmail.com",
    mobile: "9776655443",
    subject: "Membership enquiry",
    message: "Please explain the premium membership benefits.",
    date: "30 Jul 2026",
    status: "Replied",
  },
  {
    id: 8,
    name: "Swathi Reddy",
    email: "swathi@gmail.com",
    mobile: "9665544332",
    subject: "Account issue",
    message: "I am unable to update my profile information.",
    date: "29 Jul 2026",
    status: "New",
  },
  {
    id: 9,
    name: "Mahesh Rao",
    email: "mahesh@gmail.com",
    mobile: "9554433221",
    subject: "Payment issue",
    message: "My payment was deducted but the plan is not active.",
    date: "28 Jul 2026",
    status: "Closed",
  },
  {
    id: 10,
    name: "Deepika Devi",
    email: "deepika@gmail.com",
    mobile: "9443322110",
    subject: "Verification enquiry",
    message: "How long does profile verification take?",
    date: "27 Jul 2026",
    status: "New",
  },
  {
    id: 11,
    name: "Srinivas Kumar",
    email: "srinivas@gmail.com",
    mobile: "9332211009",
    subject: "Login support",
    message: "I forgot my password and cannot login.",
    date: "26 Jul 2026",
    status: "Replied",
  },
  {
    id: 12,
    name: "Kavya Reddy",
    email: "kavya@gmail.com",
    mobile: "9221100998",
    subject: "Profile update",
    message: "Please help me update my profile details.",
    date: "25 Jul 2026",
    status: "New",
  },
];

export default function ReplyMessagePage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const message = messagesData.find(
    (item) => item.id === id
  );

  const [reply, setReply] = useState("");

  if (!message) {
    return (
      <div className="min-h-screen bg-gray-50/80 flex items-center justify-center">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">

          <h2 className="text-xl font-semibold text-gray-800">
            Message Not Found
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            The requested contact message does not exist.
          </p>

          <button
            type="button"
            onClick={() => router.push("/admin/contact-users")}
            className="
              mt-5
              px-5
              py-2.5
              rounded-xl
              bg-gray-200
              text-gray-700
              text-sm
              font-semibold
              hover:bg-gray-300
              transition
            "
          >
            Back to Contact Users
          </button>

        </div>

      </div>
    );
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!reply.trim()) {
      alert("Please enter your reply.");
      return;
    }

    console.log({
      messageId: message.id,
      email: message.email,
      reply,
    });

    alert("Reply sent successfully!");

    router.push("/admin/contact-users");
  };

  return (
    <div className="min-h-screen bg-gray-50/80">

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex items-center gap-3 mb-7">

          <button
            type="button"
            onClick={() =>
              router.push("/admin/contact-users")
            }
            className="
              w-10
              h-10
              rounded-xl
              border
              border-gray-200
              bg-white
              flex
              items-center
              justify-center
              text-gray-500
              hover:bg-gray-50
              hover:text-gray-800
              transition
            "
          >
            <FaArrowLeft className="text-sm" />
          </button>

          <div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Reply to User
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Respond to the user's contact enquiry.
            </p>

          </div>

        </div>


        {/* =====================================================
            USER MESSAGE CARD
        ===================================================== */}

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          overflow-hidden
          mb-6
        ">

          {/* CARD HEADER */}

          <div className="
            px-6
            py-5
            border-b
            border-gray-100
            bg-gray-50/50
          ">

            <div className="flex items-center gap-3">

              <div className="
                w-11
                h-11
                rounded-xl
                bg-gray-100
                flex
                items-center
                justify-center
                text-gray-600
                font-semibold
              ">
                {message.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  {message.name}
                </h2>

                <p className="text-xs text-gray-400">
                  User #{message.id}
                </p>

              </div>

            </div>

          </div>


          {/* USER DETAILS */}

          <div className="
            px-6
            py-5
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          ">

            {/* EMAIL */}

            <div className="flex items-center gap-3">

              <div className="
                w-9
                h-9
                rounded-lg
                bg-gray-50
                flex
                items-center
                justify-center
              ">
                <FaEnvelope className="text-gray-400 text-sm" />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Email
                </p>

                <p className="text-sm text-gray-700 font-medium">
                  {message.email}
                </p>

              </div>

            </div>


            {/* MOBILE */}

            <div className="flex items-center gap-3">

              <div className="
                w-9
                h-9
                rounded-lg
                bg-gray-50
                flex
                items-center
                justify-center
              ">
                <FaPhone className="text-gray-400 text-sm" />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Mobile
                </p>

                <p className="text-sm text-gray-700 font-medium">
                  {message.mobile}
                </p>

              </div>

            </div>


            {/* SUBJECT */}

            <div className="flex items-center gap-3">

              <div className="
                w-9
                h-9
                rounded-lg
                bg-gray-50
                flex
                items-center
                justify-center
              ">
                <FaUser className="text-gray-400 text-sm" />
              </div>

              <div>

                <p className="text-xs text-gray-400">
                  Subject
                </p>

                <p className="text-sm text-gray-700 font-medium">
                  {message.subject}
                </p>

              </div>

            </div>

          </div>


          {/* ORIGINAL MESSAGE */}

          <div className="px-6 pb-6">

            <div className="
              rounded-xl
              bg-gray-50/80
              border
              border-gray-100
              p-5
            ">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Original Message
                </p>

                <span className="text-xs text-gray-400">
                  {message.date}
                </span>

              </div>

              <p className="text-sm text-gray-600 leading-6">
                {message.message}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            REPLY FORM
        ===================================================== */}

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            overflow-hidden
          "
        >

          {/* FORM HEADER */}

          <div className="
            px-6
            py-5
            border-b
            border-gray-100
            bg-gray-50/50
          ">

            <h2 className="text-lg font-semibold text-gray-800">
              Write Reply
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Send a response to {message.email}.
            </p>

          </div>


          {/* TEXTAREA */}

          <div className="p-6">

            <label className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            ">
              Reply Message
            </label>

            <textarea
              value={reply}
              onChange={(e) =>
                setReply(e.target.value)
              }
              rows={8}
              placeholder="Write your reply here..."
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-gray-200
                bg-gray-50/50
                text-sm
                text-gray-700
                placeholder:text-gray-400
                outline-none
                resize-none
                focus:bg-white
                focus:border-gray-300
                focus:ring-4
                focus:ring-gray-100
                transition
              "
            />

          </div>


          {/* BUTTONS */}

          <div className="
            px-6
            py-5
            border-t
            border-gray-100
            bg-gray-50/50
            flex
            flex-col-reverse
            sm:flex-row
            justify-end
            gap-3
          ">

            <button
              type="button"
              onClick={() =>
                router.push("/admin/contact-users")
              }
              className="
                w-full
                sm:w-auto
                h-11
                px-6
                rounded-xl
                border
                border-gray-200
                bg-white
                text-gray-600
                text-sm
                font-semibold
                hover:bg-gray-50
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                w-full
                sm:w-auto
                h-11
                px-6
                rounded-xl
                bg-gray-200
                text-gray-700
                text-sm
                font-semibold
                inline-flex
                items-center
                justify-center
                gap-2
                hover:bg-gray-300
                transition
              "
            >
              <FaPaperPlane className="text-xs" />
              Send Reply
            </button>

          </div>

        </form>

      </main>

    </div>
  );
}