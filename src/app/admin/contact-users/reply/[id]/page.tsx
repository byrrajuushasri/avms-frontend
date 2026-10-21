"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaUser,
} from "react-icons/fa";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  mobile: string | null;
  subject: string;
  message: string;
  status: string;
};

const API_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://avms-backend-production.up.railway.app"
).replace(/\/+$/, "");

export default function ReplyMessagePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMessage = async () => {
      try {
        if (!Number.isInteger(id) || id <= 0) {
          throw new Error("Invalid contact message.");
        }

        const token =
          localStorage.getItem("adminToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("access_token");
        if (!token) {
          throw new Error("Admin session not found. Please sign in again.");
        }
        const response = await fetch(`${API_URL}/contact-messages/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          cache: "no-store",
        });
        const result = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error("Admin session expired. Please sign in again.");
        }
        if (response.status === 403) {
          throw new Error(
            "Your account does not have permission to view contact messages.",
          );
        }
        if (!response.ok) {
          throw new Error(result?.message || "Unable to load message.");
        }

        setMessage(result);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load message.",
        );
      } finally {
        setLoading(false);
      }
    };

    void loadMessage();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reply.trim()) {
      setError("Please enter your reply.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token") ||
        localStorage.getItem("access_token");
      if (!token) {
        throw new Error("Admin session not found. Please sign in again.");
      }
      const response = await fetch(
        `${API_URL}/contact-messages/${id}/reply`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ reply }),
        },
      );
      const result = await response.json().catch(() => ({}));

      if (response.status === 401) {
        throw new Error("Admin session expired. Please sign in again.");
      }
      if (response.status === 403) {
        throw new Error(
          "Your account does not have permission to send contact replies.",
        );
      }
      if (!response.ok) {
        throw new Error(result?.message || "Unable to send reply.");
      }

      window.alert("Reply emailed successfully.");
      router.push("/admin/contact-users");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to send reply.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/80 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-7 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/contact-users")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            aria-label="Back to contact messages"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Reply to User
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Respond to the user&apos;s contact enquiry.
            </p>
          </div>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-4 rounded-xl bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{error}</p>
            {error.includes("session") && (
              <button
                type="button"
                onClick={() => router.push("/admin/login")}
                className="mt-2 font-semibold underline"
              >
                Go to admin login
              </button>
            )}
          </div>
        )}

        {loading ? (
          <p className="rounded-2xl bg-white p-8 text-sm text-gray-500">
            Loading message...
          </p>
        ) : message ? (
          <>
            <section className="mb-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 font-semibold text-gray-600">
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
                    <p className="text-xs text-gray-400">Message #{message.id}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 px-6 py-5 md:grid-cols-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400" />
                  <span className="text-sm text-gray-700">{message.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {message.mobile || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-400" />
                  <span className="text-sm text-gray-700">{message.subject}</span>
                </div>
              </div>
              <div className="border-t border-gray-100 px-6 py-5">
                <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                  User Message
                </p>
                <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                  {message.message}
                </p>
              </div>
            </section>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <label
                htmlFor="reply"
                className="mb-3 block text-sm font-semibold text-gray-700"
              >
                Your Reply
              </label>
              <textarea
                id="reply"
                rows={7}
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                maxLength={10000}
                required
                placeholder="Write your reply here..."
                className="w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#8B1E3F]"
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#8B1E3F] px-5 py-3 text-sm font-semibold text-white hover:bg-[#741934] disabled:opacity-60"
                >
                  <FaPaperPlane />
                  {submitting ? "Sending..." : "Send Reply"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className="rounded-2xl bg-white p-8 text-sm text-gray-500">
            Contact message not found.
          </p>
        )}
      </div>
    </main>
  );
}
