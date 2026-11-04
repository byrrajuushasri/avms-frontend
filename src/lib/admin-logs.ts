export type AdminLogEntry = {
  id: number;
  user_id: number | null;
  user_name: string | null;
  action: string;
  module: string;
  description: string | null;
  ip_address: string | null;
  created_at: string;
};

type AdminLogsResponse = {
  items: AdminLogEntry[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const getAdminToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return (
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("access_token")
  );
};

const getErrorMessage = (data: unknown, fallback: string) => {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof data.message === "string"
  ) {
    return data.message;
  }

  return fallback;
};

export async function fetchAdminLogs(
  page: number,
  limit: number,
): Promise<AdminLogsResponse> {
  const token = getAdminToken();

  if (!token) {
    throw new Error("Your admin session has expired. Please sign in again.");
  }

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  const response = await fetch(
    `${BACKEND_URL}/activity-logs?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    },
  );
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Unable to load admin activity logs."));
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("items" in data) ||
    !Array.isArray(data.items) ||
    !("page" in data) ||
    typeof data.page !== "number" ||
    !("limit" in data) ||
    typeof data.limit !== "number" ||
    !("total" in data) ||
    typeof data.total !== "number" ||
    !("totalPages" in data) ||
    typeof data.totalPages !== "number"
  ) {
    throw new Error("The activity logs response from the server is invalid.");
  }

  return data as AdminLogsResponse;
}

export async function recordAdminLogout(): Promise<void> {
  const token = getAdminToken();

  if (!token) {
    return;
  }

  const response = await fetch(`${BACKEND_URL}/activity-logs/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(getErrorMessage(data, "Unable to record admin logout."));
  }
}
