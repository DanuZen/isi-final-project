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
    label: "Pengajuan Proposal",
    href: "/proposal",
    icon: <FileSpreadsheet className="w-4 h-4" />,
  },
  {
    label: "Pilih Pembimbing",
    href: "/pembimbing",
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    label: "Bimbingan TA",
    href: "/bimbingan",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: "Jadwal & Ujian Sidang",
    href: "/sidang",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    label: "Kalender TA",
    href: "/kalender",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    label: "Daftar Judul TA",
    href: "/list-judul",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: NavItem[];
  roleName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  items = NAV_ITEMS,
  roleName = "UPI YPTK PADANG",
}) => {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-[#1A1A1A] text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-[#333333] transition-all duration-300 z-30 overflow-hidden ${
        isOpen ? "w-[260px]" : "w-[64px]"
      }`}
    >
      {/* Brand Header — click to toggle */}
      <button
        onClick={onToggle}
        title={isOpen ? "Perkecil sidebar" : "Perbesar sidebar"}
        className={`border-b border-[#333333] bg-gradient-to-b from-[#252525] to-[#1A1A1A] flex items-center transition-all duration-300 shrink-0 w-full hover:brightness-110 active:scale-95 cursor-pointer ${
          isOpen
            ? "p-5 flex-col justify-center text-center space-y-2.5"
            : "p-3 justify-center"
        }`}
      >
        {/* Emblem Logo */}
        <div
          className={`relative flex items-center justify-center shrink-0 filter drop-shadow-lg transition-all duration-300 ${
            isOpen ? "w-14 h-14" : "w-9 h-9"
          }`}
        >
          <Image
            src="/upiyptk_emblem.webp"
            alt="Emblem UPI YPTK"
            width={56}
            height={56}
            className="object-contain w-full h-full"
            priority
          />
        </div>

        {/* Text — only when expanded */}
        {isOpen && (
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="font-black text-2xl tracking-widest font-display text-white leading-none">
              SIPETA
            </h1>
            <p className="text-[10px] font-extrabold text-[#F59E0B] font-display tracking-widest uppercase mt-1.5 leading-none">
              {roleName}
            </p>
          </div>
        )}
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {/* Section label — only when expanded */}
        {isOpen && (
          <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#888888] font-display">
            Menu Utama
          </div>
        )}

        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={!isOpen ? item.label : undefined}
              className={`flex items-center rounded-xl text-xs font-semibold transition-all duration-200 relative group ${
                isOpen
                  ? "justify-between px-3.5 py-2.5"
                  : "justify-center px-0 py-2.5 mx-auto w-10 h-10"
              } ${
                isActive
                  ? "bg-[#C62828] text-white shadow-xs font-bold"
                  : "text-[#B0B0B0] hover:bg-[#252525] hover:text-white"
              }`}
            >
              <div
                className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}
              >
                <span className={isActive ? "text-white" : "text-[#888888] group-hover:text-white"}>
                  {item.icon}
                </span>
                {isOpen && <span>{item.label}</span>}
              </div>

              {/* Badge — only when expanded */}
              {isOpen && item.badge && (
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

              {/* Tooltip on collapsed */}
              {!isOpen && (
                <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-[#333333] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
