"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  UserCheck,
  BookOpen,
  CalendarDays,
  Calendar,
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
    label: "Usulan Judul",
    href: "/proposal",
    icon: <FileSpreadsheet className="w-4 h-4" />,
  },
  {
    label: "Pengajuan Pembimbing",
    href: "/pembimbing",
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    label: "Bimbingan TA",
    href: "/bimbingan",
    icon: <BookOpen className="w-4 h-4" />,
    badge: "Aktif",
  },
  {
    label: "Kalender TA",
    href: "/kalender",
    icon: <CalendarDays className="w-4 h-4" />,
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
    label: "Daftar Judul TA",
    href: "/list-judul",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

interface SidebarProps {
  isOpen?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`w-[260px] bg-[#1A1A1A] text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-[#333333] transition-all duration-300 z-30 ${
        !isOpen ? "-ml-[260px] opacity-0 overflow-hidden" : "ml-0 opacity-100"
      }`}
    >
      {/* Brand Header (Centered Emblem & Title) */}
      <div className="p-5 border-b border-[#333333] bg-gradient-to-b from-[#252525] to-[#1A1A1A] flex flex-col items-center justify-center text-center space-y-2.5">
        {/* Emblem Logo Icon */}
        <div className="w-14 h-14 relative flex items-center justify-center shrink-0 filter drop-shadow-lg">
          <Image
            src="/upiyptk_emblem.webp"
            alt="Emblem UPI YPTK"
            width={56}
            height={56}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Text Container Centered */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-black text-2xl tracking-widest font-display text-white leading-none">
            SIPETA
          </h1>
          <p className="text-[10px] font-extrabold text-[#F59E0B] font-display tracking-widest uppercase mt-1.5 leading-none">
            UPI YPTK PADANG
          </p>
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 relative ${
                isActive
                  ? "bg-gradient-to-r from-[#C62828] to-[#990000] text-white shadow-md shadow-[#C62828]/20"
                  : "text-[#B0B0B0] hover:bg-[#252525] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-white" : "text-[#888888]"}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.badge === "Aktif"
                      ? "bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30"
                      : "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30"
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
          <div className="w-8 h-8 rounded-lg bg-[#252525] p-1 flex items-center justify-center shrink-0 border border-[#333333]">
            <Image
              src="/upiyptk_emblem.webp"
              alt="UPI YPTK Padang"
              width={24}
              height={24}
              className="object-contain w-full h-full"
            />
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
