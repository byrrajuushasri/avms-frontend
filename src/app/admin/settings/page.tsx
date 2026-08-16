"use client";

import { useState } from "react";
import {
  FaUser,
  FaSave,
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";

export default function SettingsPage() {
  const [name, setName] = useState("Super Admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [mobile, setMobile] = useState("9876543210");
  const [role, setRole] = useState("Super Admin");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Admin profile updated successfully!");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    alert("Password updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        <div className="max-w-6xl mx-auto">

          <div className="mb-7">

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Settings
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage your administrator profile and account settings.
            </p>

          </div>


          {/* =================================================
              MAIN CARD
          ================================================= */}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* =================================================
                CARD HEADER
            ================================================= */}

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">

                  <FaUser className="text-gray-600" />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Admin Profile
                  </h2>

                  <p className="text-sm text-gray-500 mt-0.5">
                    Update your administrator account information.
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                PROFILE SECTION
            ================================================= */}

            <form onSubmit={handleProfileSubmit}>

              <div className="px-6 sm:px-8 py-7">

                {/* PROFILE PHOTO */}

                 


                {/* FORM FIELDS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* ADMIN NAME */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Name
                    </label>

                    <div className="relative">

                      <FaUser className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        text-sm
                      " />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter admin name"
                        className="
                          w-full
                          h-11
                          pl-11
                          pr-4
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <FaEnvelope className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        text-sm
                      " />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="
                          w-full
                          h-11
                          pl-11
                          pr-4
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>

                  </div>


                  {/* MOBILE */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>

                    <div className="relative">

                      <FaPhone className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        text-sm
                      " />

                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter mobile number"
                        className="
                          w-full
                          h-11
                          pl-11
                          pr-4
                          rounded-lg
                          border
                          border-gray-200
                          bg-white
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>

                  </div>


                  {/* ROLE */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>

                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="
                        w-full
                        h-11
                        px-4
                        rounded-lg
                        border
                        border-gray-200
                        bg-gray-50
                        text-sm
                        text-gray-600
                        outline-none
                        cursor-not-allowed
                      "
                      disabled
                    />

                  </div>

                </div>


                {/* SAVE BUTTON */}

                <div className="mt-7 pt-6 border-t border-gray-100">

                   <button
                    type="submit"
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      text-gray-700
                      text-sm
                      font-medium
                      hover:bg-gray-50
                      hover:border-gray-300
                      transition
                    "
                  >

                    <FaLock className="text-xs" />

                    Update Password

                  </button>

                </div>

              </div>

            </form>


            {/* =================================================
                CHANGE PASSWORD
            ================================================= */}

            <div className="border-t border-gray-100">

              <div className="px-6 sm:px-8 py-6">

                <div className="flex items-center gap-3 mb-6">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                  ">

                    <FaLock className="text-gray-600" />

                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-gray-900">
                      Change Password
                    </h2>

                    <p className="text-sm text-gray-500 mt-0.5">
                      Update your administrator login password.
                    </p>

                  </div>

                </div>


                <form onSubmit={handlePasswordSubmit}>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* CURRENT PASSWORD */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>

                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                          setCurrentPassword(e.target.value)
                        }
                        placeholder="Current password"
                        className="
                          w-full
                          h-11
                          px-4
                          rounded-lg
                          border
                          border-gray-200
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>


                    {/* NEW PASSWORD */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>

                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) =>
                          setNewPassword(e.target.value)
                        }
                        placeholder="New password"
                        className="
                          w-full
                          h-11
                          px-4
                          rounded-lg
                          border
                          border-gray-200
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm password"
                        className="
                          w-full
                          h-11
                          px-4
                          rounded-lg
                          border
                          border-gray-200
                          text-sm
                          text-gray-700
                          outline-none
                          transition
                          hover:border-gray-300
                          focus:border-[#8B1E3F]
                          focus:ring-2
                          focus:ring-[#8B1E3F]/10
                        "
                      />

                    </div>

                  </div>


                  {/* PASSWORD BUTTON */}

                  <button
                    type="submit"
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      text-gray-700
                      text-sm
                      font-medium
                      hover:bg-gray-50
                      hover:border-gray-300
                      transition
                    "
                  >

                    <FaLock className="text-xs" />

                    Update Password

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}