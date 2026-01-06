"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      {/* Left panel */}
      <Sidebar />

      {/* Right content area */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
