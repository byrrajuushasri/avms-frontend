"use client";

import { useEffect, useState } from "react";

import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaUserPlus,
  FaCheck,
  FaTrash,
} from "react-icons/fa";

interface AdminHeaderProps {
  setOpen: (open: boolean) => void;
}

interface LoggedInUser {
  id?: number;
  member_id?: string;
  full_name?: string;
  email?: string;
  mobile?: string;
  role?: string;
  district?: string | null;
  mandal?: string | null;
  sangham?: string | null;
  sangam?: string | null;
  photo?: string | null;
}

interface Member {
  id?: number;
  member_id?: string;
  full_name?: string;
  name?: string;
  mobile?: string;
  email?: string;
  created_at?: string;
  sangham?: string | null;
  sangam?: string | null;
  district?: string | null;
  mandal?: string | null;
}

interface NotificationItem {
  id: string;
  type: "member";
  title: string;
  message: string;
  memberId?: string;
  createdAt: string;
  read: boolean;
}

export default function AdminHeader({
  setOpen,
}: AdminHeaderProps) {
  const [user, setUser] =
    useState<LoggedInUser | null>(null);

  const [imageError, setImageError] =
    useState(false);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [checkingMembers, setCheckingMembers] =
    useState(false);

  // =====================================================
  // BACKEND URL
  // =====================================================

  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:5000";

  // =====================================================
  // LOAD LOGGED-IN USER
  // =====================================================

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) {
        return;
      }

      const parsedUser =
        JSON.parse(storedUser);

      const loggedInUser =
        parsedUser?.user || parsedUser;

      setUser(loggedInUser);
    } catch (error) {
      console.error(
        "Unable to load admin user:",
        error
      );
    }
  }, []);

  // =====================================================
  // LOAD SAVED NOTIFICATIONS
  // =====================================================

  useEffect(() => {
    try {
      const savedNotifications =
        localStorage.getItem(
          "admin_notifications"
        );

      if (savedNotifications) {
        const parsed =
          JSON.parse(savedNotifications);

        if (Array.isArray(parsed)) {
          setNotifications(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Unable to load notifications:",
        error
      );
    }
  }, []);

  // =====================================================
  // SAVE NOTIFICATIONS
  // =====================================================

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    try {
      localStorage.setItem(
        "admin_notifications",
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error(
        "Unable to save notifications:",
        error
      );
    }
  }, [notifications]);

  // =====================================================
  // ROLE LABEL
  // =====================================================

  const getRoleLabel = (
    role?: string
  ) => {
    switch (role) {
      case "super_admin":
        return "Super Admin";

      case "state_admin":
        return "State Admin";

      case "district_admin":
        return "District Admin";

      case "mandal_admin":
        return "Mandal Admin";

      case "sangam_admin":
        return "Sangham Admin";

      default:
        return "Admin";
    }
  };

  // =====================================================
  // NORMALIZE TEXT
  // =====================================================

  const normalizeText = (
    value: unknown
  ) => {
    return String(value || "")
      .trim()
      .toLowerCase();
  };

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    if (
      typeof window === "undefined"
    ) {
      return null;
    }

    return (
      localStorage.getItem(
        "access_token"
      ) ||
      localStorage.getItem(
        "token"
      ) ||
      localStorage.getItem(
        "adminToken"
      )
    );
  };

  // =====================================================
  // CREATE NOTIFICATION
  // =====================================================

  const createMemberNotification = (
    member: Member
  ) => {
    const memberId =
      member.member_id ||
      String(member.id || "");

    const notificationId =
      `member-${memberId}`;

    setNotifications(
      (previous) => {
        // Already exists
        if (
          previous.some(
            (item) =>
              item.id ===
              notificationId
          )
        ) {
          return previous;
        }

        const memberName =
          member.full_name ||
          member.name ||
          "New Member";

        const newNotification: NotificationItem =
          {
            id: notificationId,
            type: "member",
            title: "New Member Added",
            message: `${memberName} has been added as a new member.`,
            memberId,
            createdAt:
              member.created_at ||
              new Date().toISOString(),
            read: false,
          };

        return [
          newNotification,
          ...previous,
        ].slice(0, 30);
      }
    );
  };

  // =====================================================
  // CHECK MEMBERS
  // =====================================================

  const checkNewMembers =
    async (
      showLoading = false
    ) => {
      if (
        typeof window ===
        "undefined"
      ) {
        return;
      }

      try {
        if (showLoading) {
          setCheckingMembers(true);
        }

        const token =
          getToken();

        const response =
          await fetch(
            `${BACKEND_URL}/membership-register`,
            {
              method: "GET",
              headers: {
                "Content-Type":
                  "application/json",

                ...(token
                  ? {
                      Authorization:
                        `Bearer ${token}`,
                    }
                  : {}),
              },

              cache:
                "no-store",
            }
          );

        if (!response.ok) {
          console.error(
            "Member notification API error:",
            response.status
          );

          return;
        }

        const data =
          await response.json();

        let members: Member[] =
          [];

        if (
          Array.isArray(data)
        ) {
          members = data;
        } else if (
          Array.isArray(
            data?.data
          )
        ) {
          members =
            data.data;
        } else if (
          Array.isArray(
            data?.members
          )
        ) {
          members =
            data.members;
        } else if (
          Array.isArray(
            data?.results
          )
        ) {
          members =
            data.results;
        }

        if (!members.length) {
          return;
        }

        // =================================================
        // FILTER FOR SANGHAM ADMIN
        // =================================================

        const role =
          normalizeText(
            user?.role
          );

        const adminSangham =
          normalizeText(
            user?.sangham ||
              user?.sangam
          );

        if (
          role ===
          "sangam_admin"
        ) {
          members =
            members.filter(
              (member) => {
                const memberSangham =
                  normalizeText(
                    member.sangham ||
                      member.sangam
                  );

                return (
                  memberSangham ===
                  adminSangham
                );
              }
            );
        }

        // =================================================
        // CREATE NOTIFICATIONS
        // =================================================

        members
          .slice(0, 10)
          .forEach(
            (member) => {
              createMemberNotification(
                member
              );
            }
          );
      } catch (error) {
        console.error(
          "Member notification check failed:",
          error
        );
      } finally {
        if (showLoading) {
          setCheckingMembers(false);
        }
      }
    };

  // =====================================================
  // INITIAL MEMBER CHECK
  // =====================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    checkNewMembers(true);

    // ===================================================
    // CHECK EVERY 30 SECONDS
    // ===================================================

    const interval =
      setInterval(() => {
        checkNewMembers();
      }, 30000);

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    user?.id,
    user?.role,
    user?.sangham,
    user?.sangam,
  ]);

  // =====================================================
  // MARK ONE AS READ
  // =====================================================

  const markAsRead = (
    notificationId: string
  ) => {
    setNotifications(
      (previous) =>
        previous.map(
          (notification) =>
            notification.id ===
            notificationId
              ? {
                  ...notification,
                  read: true,
                }
              : notification
        )
    );
  };

  // =====================================================
  // MARK ALL AS READ
  // =====================================================

  const markAllAsRead = () => {
    setNotifications(
      (previous) =>
        previous.map(
          (notification) => ({
            ...notification,
            read: true,
          })
        )
    );
  };

  // =====================================================
  // CLEAR ALL
  // =====================================================

  const clearAllNotifications =
    () => {
      setNotifications([]);
    };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (
    dateString: string
  ) => {
    try {
      const date =
        new Date(
          dateString
        );

      return date.toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute:
            "2-digit",
        }
      );
    } catch {
      return "";
    }
  };

  // =====================================================
  // UNREAD COUNT
  // =====================================================

  const unreadCount =
    notifications.filter(
      (notification) =>
        !notification.read
    ).length;

  // =====================================================
  // ADMIN NAME
  // =====================================================

  const adminName =
    user?.full_name?.trim() ||
    "Admin";

  // =====================================================
  // ROLE
  // =====================================================

  const roleLabel =
    getRoleLabel(
      user?.role
    );

  // =====================================================
  // SANGHAM
  // =====================================================

  const sangham =
    user?.sangham ||
    user?.sangam ||
    "";

  // =====================================================
  // PHOTO URL
  // =====================================================

  const getPhotoUrl = (
    photo?: string | null
  ) => {
    if (!photo) {
      return "";
    }

    if (
      photo.startsWith(
        "http://"
      ) ||
      photo.startsWith(
        "https://"
      )
    ) {
      return photo;
    }

    if (
      photo.startsWith("/")
    ) {
      return `${BACKEND_URL}${photo}`;
    }

    return `${BACKEND_URL}/${photo}`;
  };

  const photoUrl =
    getPhotoUrl(
      user?.photo
    );

  // =====================================================
  // UI
  // =====================================================

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        border-b
        border-pink-100
        bg-white
        px-4
        shadow-sm
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}

        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          aria-label="Open sidebar"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            text-xl
            text-[#8B1E3F]
            transition
            hover:bg-[#f8eef2]
            lg:hidden
          "
        >
          <FaBars />
        </button>

        {/* WELCOME */}

        <div>
          <h2
            className="
              text-base
              font-semibold
              text-gray-900
              sm:text-lg
            "
          >
            Welcome{" "}
            {adminName} 👋
          </h2>

          <p
            className="
              mt-0.5
              hidden
              text-xs
              text-gray-400
              sm:block
            "
          >
            Manage your AV Matrimony dashboard
          </p>
        </div>
      </div>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-6
        "
      >
        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            onClick={() =>
              setNotificationOpen(
                (previous) =>
                  !previous
              )
            }
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              text-gray-500
              transition
              hover:bg-gray-50
              hover:text-gray-800
            "
          >
            <FaBell
              className="
                text-lg
                sm:text-xl
              "
            />

            {/* UNREAD COUNT */}

            {unreadCount >
              0 && (
              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  flex
                  min-h-[20px]
                  min-w-[20px]
                  items-center
                  justify-center
                  rounded-full
                  bg-[#8B1E3F]
                  px-1
                  text-[10px]
                  font-bold
                  text-white
                  ring-2
                  ring-white
                "
              >
                {unreadCount >
                99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </button>

          {/* =================================================
              NOTIFICATION DROPDOWN
          ================================================= */}

          {notificationOpen && (
            <div
              className="
                fixed
                right-3
                top-[76px]
                z-50
                w-[calc(100vw-24px)]
                max-w-[390px]
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-2xl
                sm:absolute
                sm:right-0
                sm:top-14
                sm:w-[390px]
              "
            >
              {/* HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-gray-100
                  px-4
                  py-4
                "
              >
                <div>
                  <h3
                    className="
                      text-sm
                      font-bold
                      text-gray-900
                    "
                  >
                    Notifications
                  </h3>

                  <p
                    className="
                      mt-0.5
                      text-xs
                      text-gray-400
                    "
                  >
                    {unreadCount} unread
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* MARK ALL */}

                  {notifications.length >
                    0 && (
                    <button
                      type="button"
                      onClick={
                        markAllAsRead
                      }
                      className="
                        rounded-lg
                        px-2
                        py-1.5
                        text-xs
                        font-medium
                        text-[#8B1E3F]
                        hover:bg-[#f8eef2]
                      "
                    >
                      Mark all read
                    </button>
                  )}

                  {/* CLEAR */}

                  {notifications.length >
                    0 && (
                    <button
                      type="button"
                      onClick={
                        clearAllNotifications
                      }
                      aria-label="Clear notifications"
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-400
                        hover:bg-red-50
                        hover:text-red-600
                      "
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  )}
                </div>
              </div>

              {/* NOTIFICATION LIST */}

              <div
                className="
                  max-h-[420px]
                  overflow-y-auto
                "
              >
                {notifications.length ===
                0 ? (
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      px-6
                      py-12
                      text-center
                    "
                  >
                    <div
                      className="
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#f8eef2]
                        text-[#8B1E3F]
                      "
                    >
                      <FaBell className="text-xl" />
                    </div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                      "
                    >
                      No notifications
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-gray-400
                      "
                    >
                      New member notifications
                      will appear here.
                    </p>
                  </div>
                ) : (
                  notifications.map(
                    (
                      notification
                    ) => (
                      <div
                        key={
                          notification.id
                        }
                        className={`
                          border-b
                          border-gray-100
                          px-4
                          py-4
                          transition
                          ${
                            notification.read
                              ? "bg-white"
                              : "bg-[#fff8fa]"
                          }
                        `}
                      >
                        <div className="flex gap-3">
                          {/* ICON */}

                          <div
                            className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#f8eef2]
                              text-[#8B1E3F]
                            "
                          >
                            <FaUserPlus />
                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className="
                                  text-sm
                                  font-semibold
                                  text-gray-800
                                "
                              >
                                {
                                  notification.title
                                }
                              </p>

                              {!notification.read && (
                                <span
                                  className="
                                    mt-1
                                    h-2
                                    w-2
                                    shrink-0
                                    rounded-full
                                    bg-[#8B1E3F]
                                  "
                                />
                              )}
                            </div>

                            <p
                              className="
                                mt-1
                                text-xs
                                leading-5
                                text-gray-500
                              "
                            >
                              {
                                notification.message
                              }
                            </p>

                            {notification.memberId && (
                              <p
                                className="
                                  mt-1
                                  text-[11px]
                                  font-medium
                                  text-[#8B1E3F]
                                "
                              >
                                Member ID:{" "}
                                {
                                  notification.memberId
                                }
                              </p>
                            )}

                            <p
                              className="
                                mt-2
                                text-[10px]
                                text-gray-400
                              "
                            >
                              {formatTime(
                                notification.createdAt
                              )}
                            </p>

                            {/* MARK READ */}

                            {!notification.read && (
                              <button
                                type="button"
                                onClick={() =>
                                  markAsRead(
                                    notification.id
                                  )
                                }
                                className="
                                  mt-2
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  rounded-lg
                                  px-2
                                  py-1
                                  text-[11px]
                                  font-medium
                                  text-[#8B1E3F]
                                  hover:bg-[#f8eef2]
                                "
                              >
                                <FaCheck />
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>

              {/* FOOTER */}

              <div
                className="
                  border-t
                  border-gray-100
                  bg-gray-50
                  px-4
                  py-3
                "
              >
                <button
                  type="button"
                  onClick={() =>
                    checkNewMembers(
                      true
                    )
                  }
                  disabled={
                    checkingMembers
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-gray-600
                    transition
                    hover:border-[#8B1E3F]
                    hover:text-[#8B1E3F]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  {checkingMembers
                    ? "Checking..."
                    : "Check for new members"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =================================================
            ADMIN PROFILE
        ================================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
          "
        >
          {/* PROFILE PHOTO */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-[#f8eef2]
              text-[#8B1E3F]
              sm:h-11
              sm:w-11
            "
          >
            {photoUrl &&
            !imageError ? (
              <img
                src={photoUrl}
                alt={adminName}
                className="
                  h-full
                  w-full
                  object-cover
                "
                onError={() =>
                  setImageError(
                    true
                  )
                }
              />
            ) : (
              <FaUserCircle
                className="
                  text-2xl
                  sm:text-3xl
                "
              />
            )}
          </div>

          {/* PROFILE TEXT */}

          <div className="hidden md:block">
            <p
              className="
                max-w-[180px]
                truncate
                text-sm
                font-semibold
                text-gray-800
              "
              title={adminName}
            >
              {adminName}
            </p>

            <p
              className="
                mt-0.5
                text-xs
                text-gray-400
              "
            >
              {roleLabel}
            </p>

            {/* SANGHAM */}

            {user?.role ===
              "sangam_admin" &&
              sangham && (
                <p
                  className="
                    mt-0.5
                    max-w-[180px]
                    truncate
                    text-xs
                    font-medium
                    text-[#8B1E3F]
                  "
                  title={sangham}
                >
                  Sangham:{" "}
                  {sangham}
                </p>
              )}
          </div>
        </div>
      </div>
    </header>
  );
}