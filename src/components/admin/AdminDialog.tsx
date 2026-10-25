"use client";

import { useEffect } from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

export type AdminDialogTone =
  | "info"
  | "success"
  | "error"
  | "danger";

export interface AdminDialogOptions {
  title: string;
  message: string;
  tone?: AdminDialogTone;
  confirmLabel?: string;
  busy?: boolean;
  onConfirm?: () => void;
}

interface AdminDialogProps extends AdminDialogOptions {
  onClose: () => void;
}

const toneStyles: Record<
  AdminDialogTone,
  { icon: typeof FaInfoCircle; color: string; button: string }
> = {
  info: {
    icon: FaInfoCircle,
    color: "bg-blue-50 text-blue-600",
    button: "bg-[#8B1E3F] hover:bg-[#741934]",
  },
  success: {
    icon: FaCheckCircle,
    color: "bg-green-50 text-green-600",
    button: "bg-[#8B1E3F] hover:bg-[#741934]",
  },
  error: {
    icon: FaExclamationTriangle,
    color: "bg-red-50 text-red-600",
    button: "bg-[#8B1E3F] hover:bg-[#741934]",
  },
  danger: {
    icon: FaTrash,
    color: "bg-red-50 text-red-600",
    button: "bg-red-600 hover:bg-red-700",
  },
};

export default function AdminDialog({
  title,
  message,
  tone = "info",
  confirmLabel = "Confirm",
  busy = false,
  onClose,
  onConfirm,
}: AdminDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [busy, onClose]);

  const styles = toneStyles[tone];
  const Icon = styles.icon;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !busy) onClose();
      }}
    >
      <section
        role={onConfirm ? "alertdialog" : "dialog"}
        aria-modal="true"
        aria-labelledby="admin-dialog-title"
        aria-describedby="admin-dialog-message"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${styles.color}`}
          >
            <Icon className="text-lg" />
          </div>

          <div className="min-w-0 flex-1">
            <h2
              id="admin-dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
            <p
              id="admin-dialog-message"
              className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600"
            >
              {message}
            </p>
          </div>

          {!busy && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {onConfirm && (
            <button
              type="button"
              disabled={busy}
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            disabled={busy}
            onClick={onConfirm || onClose}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60 ${styles.button}`}
          >
            {busy ? "Please wait..." : onConfirm ? confirmLabel : "OK"}
          </button>
        </div>
      </section>
    </div>
  );
}
