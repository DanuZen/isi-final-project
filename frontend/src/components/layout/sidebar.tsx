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
  X,
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
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* ── 1. Mobile Drawer View (< md) ── */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            onClick={onToggle}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-[9998] animate-fade-in-scale cursor-pointer"
          />
          {/* Mobile Slide-Over Drawer */}
          <aside className="fixed inset-y-0 left-0 w-[270px] bg-[#1A1A1A] text-white flex flex-col z-[9999] shadow-2xl overflow-hidden border-r border-[#333333]">
            {/* Header with emblem logo and close button */}
            <div className="flex items-center justify-between p-4 border-b border-[#333333] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 relative shrink-0">
                  <Image
                    src="/upiyptk_emblem.webp"
                    alt="Emblem UPI YPTK"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="font-black text-lg tracking-wider font-display text-white leading-none">
                    SIPETA
                  </h1>
                  <p className="text-[8px] font-bold text-[#C62828] font-display tracking-widest uppercase mt-0.5 leading-none">
                    UPI YPTK PADANG
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
              <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#888888] font-display">
                Menu Utama
              </div>
              {items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onToggle}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#C62828] text-white shadow-md font-extrabold"
                        : "text-[#B0B0B0] hover:bg-[#252525] hover:text-white"
                    }`}
                  >
                    <span className={isActive ? "text-white" : "text-[#888888]"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* ── 2. Desktop Permanent/Collapsible Sidebar (md:flex) ── */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 shrink-0 bg-[#1A1A1A] text-white border-r border-[#333333] transition-all duration-300 z-30 overflow-hidden ${
          isOpen ? "w-[260px]" : "w-[64px]"
        }`}
      >
        {/* Brand Header — click to toggle */}
        <button
          onClick={onToggle}
          title={isOpen ? "Perkecil sidebar" : "Perbesar sidebar"}
          className={`flex items-center transition-all duration-300 shrink-0 w-full hover:brightness-110 active:scale-95 cursor-pointer py-5 ${
            isOpen ? "px-5 gap-3.5 justify-center" : "px-2 justify-center"
          }`}
        >
          {/* Emblem Logo */}
          <div
            className={`relative flex items-center justify-center shrink-0 filter drop-shadow-md transition-all duration-300 ${
              isOpen ? "w-11 h-11" : "w-8 h-8"
            }`}
          >
            <Image
              src="/upiyptk_emblem.webp"
              alt="Emblem UPI YPTK"
              width={44}
              height={44}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Text — only when expanded */}
          {isOpen && (
            <div className="flex flex-col text-left min-w-0">
              <h1 className="font-black text-xl tracking-wider font-display text-white leading-none">
                SIPETA
              </h1>
              <p className="text-[9px] font-bold text-[#C62828] font-display tracking-widest uppercase mt-1 leading-none">
                UPI YPTK PADANG
              </p>
            </div>
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
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
                  <span
                    className={
                      isActive ? "text-white" : "text-[#888888] group-hover:text-white"
                    }
                  >
                    {item.icon}
                  </span>
                  {isOpen && <span>{item.label}</span>}
                </div>

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
    </>
  );
};
