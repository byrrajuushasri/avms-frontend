"use client";

import { useState } from "react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <AdminSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      {/* =====================================================
          MAIN CONTENT AREA

          Open     = 288px
          Collapse = 80px
      ===================================================== */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-300
          ease-in-out

          ${
            sidebarCollapsed
              ? "lg:ml-20"
              : "lg:ml-72"
          }
        `}
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <AdminHeader
          setOpen={setSidebarOpen}
        />

        {/* ===================================================
            BODY
        =================================================== */}

        <main className="min-h-[calc(100vh-80px)]">
          {children}
        </main>
      </div>
    </div>
  );
}