"use client";

import { useEffect, useState } from "react";
import {
  FaClock,
  FaHistory,
  FaUserShield,
  FaSignInAlt,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { fetchAdminLogs, type AdminLogEntry } from "@/lib/admin-logs";

const formatDateTime = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getLogBadge = (log: AdminLogEntry) => {
  if (log.action === "login") {
    return {
      label: "Admin Login",
      icon: FaSignInAlt,
      className: "bg-green-100 text-green-700",
    };
  }

  if (log.action === "logout") {
    return {
      label: "Admin Logout",
      icon: FaSignOutAlt,
      className: "bg-amber-100 text-amber-700",
    };
  }

  if (log.action === "registration" && log.module === "membership") {
    return {
      label: "User Registration",
      icon: FaHistory,
      className: "bg-violet-100 text-violet-700",
    };
  }

  if (log.action === "approval" && log.module === "membership") {
    return {
      label: "Membership",
      icon: FaHistory,
      className: "bg-blue-100 text-blue-700",
    };
  }

  if (log.action === "registration" && log.module === "matrimony") {
    return {
      label: "Matrimony",
      icon: FaHistory,
      className: "bg-pink-100 text-pink-700",
    };
  }

  if (log.action === "approval") {
    return {
      label: "Approval",
      icon: FaHistory,
      className: "bg-emerald-100 text-emerald-700",
    };
  }

  if (log.action === "update") {
    return {
      label: "Update",
      icon: FaHistory,
      className: "bg-cyan-100 text-cyan-700",
    };
  }

  if (log.action === "delete") {
    return {
      label: "Delete",
      icon: FaHistory,
      className: "bg-red-100 text-red-700",
    };
  }

  return {
    label: log.module || "Action",
    icon: FaHistory,
    className: "bg-sky-100 text-sky-700",
  };
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLogEntry[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadLogs = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await fetchAdminLogs(page, pageSize);

        if (active) {
          setLogs(result.items);
          setTotal(result.total);
          setTotalPages(result.totalPages);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load admin activity logs."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadLogs();

    return () => {
      active = false;
    };
  }, [page, pageSize]);

  const firstItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastItem = Math.min(page * pageSize, total);
  const firstVisiblePage = Math.max(1, page - 2);
  const lastVisiblePage = Math.min(totalPages, page + 2);

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-pink-600">
            Audit Logs
          </p>
          
        </div>

        <div className="rounded-full border border-pink-100 bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">
          {total} entries
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {error ? (
          <div className="px-6 py-10 text-center text-sm font-medium text-red-700">
            {error}
          </div>
        ) : loading ? (
          <div className="px-6 py-10 text-center text-sm text-gray-500">
            Loading admin activity...
          </div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-600">
              <FaClock className="text-2xl" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                No admin activity yet
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Login and admin actions will appear here once they happen.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {logs.map((log) => {
              const badge = getLogBadge(log);
              const Icon = badge.icon;

              return (
                <div
                  key={log.id}
                  className="flex flex-col gap-4 p-5 md:flex-row md:items-start md:justify-between"
                >
                  <div className="flex items-start gap-4">
                    <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${badge.className}`}>
                      <Icon className="text-sm" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}>
                          {badge.label}
                        </span>
                        <span className="text-sm font-medium text-gray-800">
                          {log.description || badge.label}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <FaUserShield className="text-xs" />
                          {log.user_name || "System"}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                          {log.module}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 md:text-right">
                    {formatDateTime(log.created_at)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!loading && !error && total > 0 && (
        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <label htmlFor="logs-page-size">Rows per page</label>
            <select
              id="logs-page-size"
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value));
                setPage(1);
              }}
              className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-pink-600"
            >
              {[10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>
              Showing {firstItem}–{lastItem} of {total}
            </span>
          </div>

          <nav
            aria-label="Audit log pagination"
            className="flex items-center justify-center gap-1"
          >
            <button
              type="button"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft className="text-xs" />
            </button>

            {firstVisiblePage > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setPage(1)}
                  className="h-9 min-w-9 rounded-lg border border-gray-200 px-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  1
                </button>
                {firstVisiblePage > 2 && (
                  <span className="px-1 text-gray-400" aria-hidden="true">
                    …
                  </span>
                )}
              </>
            )}

            {Array.from(
              { length: lastVisiblePage - firstVisiblePage + 1 },
              (_, index) => firstVisiblePage + index,
            ).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                aria-current={pageNumber === page ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={`h-9 min-w-9 rounded-lg border px-2 text-sm ${
                  pageNumber === page
                    ? "border-pink-600 bg-pink-600 font-semibold text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {lastVisiblePage < totalPages && (
              <>
                {lastVisiblePage < totalPages - 1 && (
                  <span className="px-1 text-gray-400" aria-hidden="true">
                    …
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setPage(totalPages)}
                  className="h-9 min-w-9 rounded-lg border border-gray-200 px-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
