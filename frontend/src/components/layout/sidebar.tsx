"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  BookOpen,
  Calendar,
  Award,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Clearing Nilai",
    href: "/clearing",
    icon: <ShieldCheck className="w-4 h-4" />,
    badge: "ACC",
  },
  {
    label: "Usulan Judul",
    href: "/proposal",
    icon: <FileSpreadsheet className="w-4 h-4" />,
  },
  {
    label: "Bimbingan TA",
    href: "/bimbingan",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "Aktif",
  },
  {
    label: "Jadwal Seminar",
    href: "/seminar",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    label: "Ujian Sidang",
    href: "/sidang",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    label: "Status Tamat",
    href: "/yudisium",
    icon: <Award className="w-4 h-4" />,
  },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-[#1A1A1A] text-white flex flex-col min-h-screen shrink-0 border-r border-[#333333]">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#333333] flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#FF5722] flex items-center justify-center text-white font-bold text-lg shadow-md font-display">
          S
        </div>
        <div>
          <h1 className="font-bold text-sm tracking-wide font-display text-white">
            SIMTA-Next
          </h1>
          <p className="text-[11px] text-[#A0A0A0]">Sistem Tugas Akhir</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#888888] font-display">
          Menu Utama
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                isActive
                  ? "bg-[#2A2A2A] text-white font-semibold shadow-inner"
                  : "text-[#CCCCCC] hover:bg-[#252525] hover:text-white"
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#FF5722] rounded-r-full" />
              )}
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-[#FF5722]" : "text-[#888888]"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    item.badge === "Aktif"
                      ? "bg-[#FFC107] text-[#1A1A1A]"
                      : "bg-[#2F8F5B] text-white"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#333333] bg-[#141414]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D32F2F] flex items-center justify-center text-xs font-bold text-white">
            UPI
          </div>
          <div className="text-xs min-w-0 flex-1">
            <p className="font-semibold truncate text-white">UPI YPTK Padang</p>
            <p className="text-[10px] text-[#A0A0A0] truncate">Fakultas Ilmu Komputer</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
