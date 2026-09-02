"use client";

import { useEffect, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSave,
} from "react-icons/fa";

interface LoggedInUser {
  id?: number;
  member_id?: string;
  full_name?: string;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  role?: string;
  user_role?: string;
  profile_photo?: string;
  photo?: string;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
}

export default function SettingsPage() {
  const [user, setUser] =
    useState<LoggedInUser | null>(null);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [mobile, setMobile] =
    useState("");

  const [role, setRole] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [
    savingProfile,
    setSavingProfile,
  ] = useState(false);

  const [
    savingPassword,
    setSavingPassword,
  ] = useState(false);

  const [
    profileMessage,
    setProfileMessage,
  ] = useState("");

  const [
    profileError,
    setProfileError,
  ] = useState("");

  const [
    passwordMessage,
    setPasswordMessage,
  ] = useState("");

  const [
    passwordError,
    setPasswordError,
  ] = useState("");

  /* =========================================================
     API URL

     Same backend as Login
  ========================================================= */

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  /* =========================================================
     SET USER DATA
  ========================================================= */

  const applyUserData = (
    userData: LoggedInUser
  ) => {
    setUser(userData);

    setName(
      userData.full_name ||
        userData.name ||
        ""
    );

    setEmail(
      userData.email || ""
    );

    setMobile(
      userData.mobile ||
        userData.phone ||
        ""
    );

    setRole(
      userData.role ||
        userData.user_role ||
        ""
    );
  };

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        /* ===================================================
           GET STORED USER
        =================================================== */

        const storedUser =
          localStorage.getItem("user");

        const token =
          localStorage.getItem(
            "access_token"
          );

        console.log(
          "SETTINGS API URL:",
          API_URL
        );

        console.log(
          "SETTINGS TOKEN EXISTS:",
          !!token
        );

        /* ===================================================
           FIRST USE LOCAL STORAGE USER
        =================================================== */

        if (storedUser) {
          try {
            const parsedUser: LoggedInUser =
              JSON.parse(storedUser);

            console.log(
              "SETTINGS STORED USER:",
              parsedUser
            );

            applyUserData(
              parsedUser
            );
          } catch (error) {
            console.error(
              "Invalid stored user:",
              error
            );
          }
        }

        /* ===================================================
           NO TOKEN

           Stored user can still be displayed.
        =================================================== */

        if (!token) {
          console.warn(
            "No access_token found."
          );

          return;
        }

        /* ===================================================
           AUTH ME
        =================================================== */

        const response = await fetch(
          `${API_URL}/auth/me`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",
            },

            cache: "no-store",
          }
        );

        const data =
          await response.json();

        console.log(
          "AUTH ME STATUS:",
          response.status
        );

        console.log(
          "AUTH ME RESPONSE:",
          data
        );

        /* ===================================================
           401

           Keep localStorage user.
        =================================================== */

        if (
          response.status === 401
        ) {
          console.error(
            "AUTH ME UNAUTHORIZED:",
            data
          );

          /*
           * Do not immediately delete token.
           * We need to debug backend JWT validation.
           */

          return;
        }

        /* ===================================================
           OTHER ERROR
        =================================================== */

        if (!response.ok) {
          throw new Error(
            Array.isArray(
              data?.message
            )
              ? data.message.join(
                  ", "
                )
              : data?.message ||
                  "Failed to load profile."
          );
        }

        /* ===================================================
           SERVER USER
        =================================================== */

        const latestUser:
          LoggedInUser = data;

        applyUserData(
          latestUser
        );

        /* ===================================================
           UPDATE LOCAL STORAGE
        =================================================== */

        localStorage.setItem(
          "user",
          JSON.stringify(
            latestUser
          )
        );
      } catch (error) {
        console.error(
          "Failed to load user:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================================================
     UPDATE LOCAL STORAGE
  ========================================================= */

  const updateLocalStorageUser = (
    updatedData: Partial<LoggedInUser>
  ) => {
    try {
      const storedUser =
        localStorage.getItem(
          "user"
        );

      const currentUser:
        LoggedInUser =
        storedUser
          ? JSON.parse(
              storedUser
            )
          : user || {};

      const updatedUser:
        LoggedInUser = {
        ...currentUser,
        ...updatedData,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(
          updatedUser
        )
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          updatedUser
        )
      );

      setUser(
        updatedUser
      );
    } catch (error) {
      console.error(
        "Failed to update localStorage:",
        error
      );
    }
  };

  /* =========================================================
     PROFILE UPDATE
  ========================================================= */

  const handleProfileSubmit =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      setProfileMessage("");
      setProfileError("");

      if (!user?.id) {
        setProfileError(
          "Logged-in user ID was not found."
        );
        return;
      }

      if (!name.trim()) {
        setProfileError(
          "Please enter admin name."
        );
        return;
      }

      if (!email.trim()) {
        setProfileError(
          "Please enter email address."
        );
        return;
      }

      if (!mobile.trim()) {
        setProfileError(
          "Please enter mobile number."
        );
        return;
      }

      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setProfileError(
          "Login session expired. Please login again."
        );
        return;
      }

      try {
        setSavingProfile(
          true
        );

        /*
         * IMPORTANT:
         * This route must exist in your Users/Membership
         * controller.
         */

        const response =
          await fetch(
            `${API_URL}/users/${user.id}`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                full_name:
                  name.trim(),

                email:
                  email.trim(),

                mobile:
                  mobile.trim(),
              }),
            }
          );

        const data =
          await response.json();

        console.log(
          "PROFILE UPDATE STATUS:",
          response.status
        );

        console.log(
          "PROFILE UPDATE RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            Array.isArray(
              data?.message
            )
              ? data.message.join(
                  ", "
                )
              : data?.message ||
                  "Failed to update profile."
          );
        }

        updateLocalStorageUser(
          {
            full_name:
              name.trim(),

            name:
              name.trim(),

            email:
              email.trim(),

            mobile:
              mobile.trim(),

            phone:
              mobile.trim(),
          }
        );

        setProfileMessage(
          "Admin profile updated successfully."
        );
      } catch (error: any) {
        console.error(
          "Profile update error:",
          error
        );

        setProfileError(
          error?.message ||
            "Failed to update profile."
        );
      } finally {
        setSavingProfile(
          false
        );
      }
    };

  /* =========================================================
     CHANGE PASSWORD
  ========================================================= */

  const handlePasswordSubmit =
    async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      setPasswordMessage("");
      setPasswordError("");

      if (!user?.id) {
        setPasswordError(
          "Logged-in user was not found."
        );
        return;
      }

      if (!currentPassword) {
        setPasswordError(
          "Please enter current password."
        );
        return;
      }

      if (!newPassword) {
        setPasswordError(
          "Please enter new password."
        );
        return;
      }

      if (
        newPassword.length < 6
      ) {
        setPasswordError(
          "New password must contain at least 6 characters."
        );
        return;
      }

      if (!confirmPassword) {
        setPasswordError(
          "Please confirm your new password."
        );
        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setPasswordError(
          "New password and confirm password do not match."
        );
        return;
      }

      if (
        currentPassword ===
        newPassword
      ) {
        setPasswordError(
          "New password must be different from current password."
        );
        return;
      }

      /* =====================================================
         TOKEN
      ===================================================== */

      const token =
        localStorage.getItem(
          "access_token"
        );

      if (!token) {
        setPasswordError(
          "Login session expired. Please login again."
        );
        return;
      }

      try {
        setSavingPassword(
          true
        );

        console.log(
          "CHANGE PASSWORD API:",
          `${API_URL}/auth/change-password`
        );

        console.log(
          "CHANGE PASSWORD TOKEN EXISTS:",
          !!token
        );

        /* ===================================================
           CORRECT BACKEND ROUTE
        =================================================== */

        const response =
          await fetch(
            `${API_URL}/auth/change-password`,
            {
              method: "PATCH",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify({
                currentPassword,
                newPassword,
              }),
            }
          );

        const data =
          await response.json();

        console.log(
          "CHANGE PASSWORD STATUS:",
          response.status
        );

        console.log(
          "CHANGE PASSWORD RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            Array.isArray(
              data?.message
            )
              ? data.message.join(
                  ", "
                )
              : data?.message ||
                  "Failed to update password."
          );
        }

        /* ===================================================
           CLEAR PASSWORD FIELDS
        =================================================== */

        setCurrentPassword(
          ""
        );

        setNewPassword(
          ""
        );

        setConfirmPassword(
          ""
        );

        setPasswordMessage(
          data?.message ||
            "Password updated successfully."
        );
      } catch (error: any) {
        console.error(
          "Password update error:",
          error
        );

        setPasswordError(
          error?.message ||
            "Failed to update password."
        );
      } finally {
        setSavingPassword(
          false
        );
      }
    };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="flex flex-col items-center gap-3">

          <div
            className="
              w-8
              h-8
              border-2
              border-gray-200
              border-t-[#8B1E3F]
              rounded-full
              animate-spin
            "
          />

          <div className="text-sm text-gray-500">
            Loading settings...
          </div>

        </div>

      </div>
    );
  }

  /* =========================================================
     USER NOT FOUND
  ========================================================= */

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

        <div
          className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            shadow-sm
            p-8
            text-center
            max-w-md
            w-full
          "
        >

          <div
            className="
              w-14
              h-14
              mx-auto
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
            "
          >
            <FaUser className="text-gray-500 text-xl" />
          </div>

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            User Not Found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Please login again to access your administrator settings.
          </p>

        </div>

      </div>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">

        <div className="max-w-6xl mx-auto">

          {/* =================================================
              HEADER
          ================================================= */}

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

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              shadow-sm
              overflow-hidden
            "
          >

            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div className="px-6 sm:px-8 py-6 border-b border-gray-100">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gray-100
                    flex
                    items-center
                    justify-center
                  "
                >
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
                PROFILE FORM
            ================================================= */}

            <form
              onSubmit={
                handleProfileSubmit
              }
            >

              <div className="px-6 sm:px-8 py-7">

                {profileMessage && (
                  <div
                    className="
                      mb-5
                      rounded-lg
                      border
                      border-green-200
                      bg-green-50
                      px-4
                      py-3
                      text-sm
                      text-green-700
                    "
                  >
                    {profileMessage}
                  </div>
                )}

                {profileError && (
                  <div
                    className="
                      mb-5
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      text-red-700
                    "
                  >
                    {profileError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Name */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Admin Name
                    </label>

                    <div className="relative">

                      <FaUser
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          text-sm
                        "
                      />

                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(
                            e.target.value
                          );

                          setProfileMessage(
                            ""
                          );

                          setProfileError(
                            ""
                          );
                        }}
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

                  {/* Email */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>

                    <div className="relative">

                      <FaEnvelope
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          text-sm
                        "
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(
                            e.target.value
                          );

                          setProfileMessage(
                            ""
                          );

                          setProfileError(
                            ""
                          );
                        }}
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

                  {/* Mobile */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>

                    <div className="relative">

                      <FaPhone
                        className="
                          absolute
                          left-4
                          top-1/2
                          -translate-y-1/2
                          text-gray-400
                          text-sm
                        "
                      />

                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => {
                          setMobile(
                            e.target.value
                          );

                          setProfileMessage(
                            ""
                          );

                          setProfileError(
                            ""
                          );
                        }}
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

                  {/* Role */}

                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>

                    <input
                      type="text"
                      value={role}
                      disabled
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
                    />

                  </div>

                </div>

                {/* Save */}

                <div className="mt-7 pt-6 border-t border-gray-100">

                  <button
                    type="submit"
                    disabled={
                      savingProfile
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-[#8B1E3F]
                      text-white
                      text-sm
                      font-medium
                      hover:bg-[#751936]
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >

                    <FaSave className="text-xs" />

                    {savingProfile
                      ? "Saving..."
                      : "Save Profile"}

                  </button>

                </div>

              </div>

            </form>

            {/* =================================================
                PASSWORD SECTION
            ================================================= */}

            <div className="border-t border-gray-100">

              <div className="px-6 sm:px-8 py-6">

                <div className="flex items-center gap-3 mb-6">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-gray-100
                      flex
                      items-center
                      justify-center
                    "
                  >
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

                {/* Success */}

                {passwordMessage && (
                  <div
                    className="
                      mb-5
                      rounded-lg
                      border
                      border-green-200
                      bg-green-50
                      px-4
                      py-3
                      text-sm
                      text-green-700
                    "
                  >
                    {passwordMessage}
                  </div>
                )}

                {/* Error */}

                {passwordError && (
                  <div
                    className="
                      mb-5
                      rounded-lg
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-sm
                      text-red-700
                    "
                  >
                    {passwordError}
                  </div>
                )}

                <form
                  onSubmit={
                    handlePasswordSubmit
                  }
                >

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    {/* Current */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>

                      <input
                        type="password"
                        value={
                          currentPassword
                        }
                        onChange={(e) => {
                          setCurrentPassword(
                            e.target.value
                          );

                          setPasswordMessage(
                            ""
                          );

                          setPasswordError(
                            ""
                          );
                        }}
                        placeholder="Current password"
                        autoComplete="current-password"
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

                    {/* New */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>

                      <input
                        type="password"
                        value={
                          newPassword
                        }
                        onChange={(e) => {
                          setNewPassword(
                            e.target.value
                          );

                          setPasswordMessage(
                            ""
                          );

                          setPasswordError(
                            ""
                          );
                        }}
                        placeholder="New password"
                        autoComplete="new-password"
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

                    {/* Confirm */}

                    <div>

                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>

                      <input
                        type="password"
                        value={
                          confirmPassword
                        }
                        onChange={(e) => {
                          setConfirmPassword(
                            e.target.value
                          );

                          setPasswordMessage(
                            ""
                          );

                          setPasswordError(
                            ""
                          );
                        }}
                        placeholder="Confirm password"
                        autoComplete="new-password"
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

                  {/* Update */}

                  <button
                    type="submit"
                    disabled={
                      savingPassword
                    }
                    className="
                      mt-6
                      inline-flex
                      items-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-[#8B1E3F]
                      text-white
                      text-sm
                      font-medium
                      hover:bg-[#751936]
                      transition
                      disabled:opacity-60
                      disabled:cursor-not-allowed
                    "
                  >

                    <FaLock className="text-xs" />

                    {savingPassword
                      ? "Updating..."
                      : "Update Password"}

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