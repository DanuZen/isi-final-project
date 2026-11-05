"use client";

import React, { useState } from "react";

import { Sidebar, type NavItem } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SplashScreen } from "@/components/ui/splash-screen";

interface RoleLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userName: string;
  userCode: string;   // NIM/NIDN/Username
  userRole: string;
  userUnit: string;   // Prodi / Fakultas / etc.
  /** @deprecated Warna aksen kini mengikuti tema royal blue global */
  accentColor?: string;
}

/**
 * Shell layout generik per-role. Memakai Sidebar & Header yang sama dengan
 * seluruh halaman agar tampilan konsisten (design system PT MBOIS Learning Hub).
 */
export function RoleLayout({
  children,
  navItems,
  userName,
  userCode,
  userRole,
  userUnit,
}: RoleLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPortalSplash, setShowPortalSplash] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA] font-display text-slate-900">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((v) => !v)}
          items={navItems}
          userName={userName}
          userNim={userCode}
          roleName={userRole}
          prodiName={userUnit}
        />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header
            className="shell-header shrink-0"
            userName={userName}
            userNim={userCode}
            userRole={userRole}
            prodiName={userUnit}
            onToggleSidebar={() => setSidebarOpen((v) => !v)}
          />

          <main className="flex-1 p-4 pt-16 md:px-5 md:pb-5 md:pt-0 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
            {children}
          </main>
        </div>
      </div>

      {showPortalSplash && (
        <SplashScreen
          isVisible={showPortalSplash}
          message={`Portal ${userRole} — PT MBOIS`}
          subMessage={`${userName} · ${userUnit}`}
          duration={850}
          onFinish={() => setShowPortalSplash(false)}
        />
      )}
    </div>
  );
}
