"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileSpreadsheet,
  UserCheck,
  BookOpen,
  CalendarDays,
  GraduationCap,
  ShieldCheck,
  X,
  User,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { ProfileModal } from "@/components/modals/profile-modal";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  category?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/mahasiswa/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
  },
  {
    label: "Pengajuan Proposal",
    href: "/mahasiswa/proposal",
    icon: <FileSpreadsheet className="w-4 h-4" />,
  },
  {
    label: "Pilih Pembimbing",
    href: "/mahasiswa/pembimbing",
    icon: <UserCheck className="w-4 h-4" />,
  },
  {
    label: "Bimbingan TA",
    href: "/mahasiswa/bimbingan",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    label: "Jadwal & Ujian Sidang",
    href: "/mahasiswa/sidang",
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    label: "Kalender TA",
    href: "/mahasiswa/kalender",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    label: "Daftar Judul TA",
    href: "/mahasiswa/list-judul",
    icon: <ShieldCheck className="w-4 h-4" />,
  },
];

export const DOSEN_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard Dosen",
    href: "/dosen/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    category: "Menu Utama",
  },
  {
    label: "Mahasiswa Bimbingan",
    href: "/dosen/bimbingan",
    icon: <UserCheck className="w-4 h-4" />,
    category: "Tugas Pembimbing",
  },
  {
    label: "Permohonan Bimbingan",
    href: "/dosen/pengajuan",
    icon: <BookOpen className="w-4 h-4" />,
    category: "Tugas Pembimbing",
  },
  {
    label: "Jadwal Pengujian",
    href: "/penguji/jadwal",
    icon: <CalendarDays className="w-4 h-4" />,
    category: "Tugas Penguji",
  },
  {
    label: "Input Nilai Ujian",
    href: "/penguji/nilai",
    icon: <GraduationCap className="w-4 h-4" />,
    category: "Tugas Penguji",
  },
  {
    label: "Verifikasi Revisi",
    href: "/penguji/revisi",
    icon: <ShieldCheck className="w-4 h-4" />,
    category: "Tugas Penguji",
  },
];

export const ADMIN_PRODI_NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard Prodi",
    href: "/admin-prodi/dashboard",
    icon: <LayoutDashboard className="w-4 h-4" />,
    category: "Menu Utama",
  },
  {
    label: "Kelola Mahasiswa",
    href: "/admin-prodi/mahasiswa",
    icon: <UserCheck className="w-4 h-4" />,
    category: "Master Data",
  },
  {
    label: "Kelola Dosen & Kuota",
    href: "/admin-prodi/dosen",
    icon: <BookOpen className="w-4 h-4" />,
    category: "Master Data",
  },
  {
    label: "Plotting & Jadwal Sidang",
    href: "/admin-prodi/jadwal",
    icon: <CalendarDays className="w-4 h-4" />,
    category: "Akademik & Ujian",
  },
  {
    label: "Repositori Skripsi",
    href: "/admin-prodi/repositori",
    icon: <ShieldCheck className="w-4 h-4" />,
    category: "Arsip & Dokumen",
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  items?: NavItem[];
  userName?: string;
  userNim?: string;
  roleName?: string;
  prodiName?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  items = NAV_ITEMS,
  userName = "Danu Zen",
  userNim = "20101152630045",
  roleName = "Mahasiswa",
  prodiName = "Teknik Informatika",
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Auto close mobile drawer on route change
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && isOpen) {
      onToggle?.();
    }
  }, [pathname]);

  const handleLogout = () => {
    onToggle?.();
    if (typeof window !== "undefined") {
      localStorage.removeItem("mbois_logged_in");
    }
    router.push("/login");
  };

  return (
    <>
      {/* ── 1. Mobile Drawer View (< md) - Muncul dari KANAN ── */}
      {isOpen && (
        <div className="md:hidden">
          {/* Backdrop */}
          <div
            onClick={onToggle}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs z-[9998] animate-fade-in-scale cursor-pointer"
          />
          {/* Full-Page Mobile Drawer from RIGHT */}
          <aside className="fixed inset-0 w-full h-full bg-[#0f172a] text-white flex flex-col z-[9999] shadow-2xl overflow-hidden animate-slide-in-right">
            {/* Top Header with emblem logo and close button */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b border-slate-800 shrink-0 bg-[#0f172a]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 relative shrink-0">
                  <Image
                    src="/mbois_white.png"
                    alt="Logo PT MBOIS"
                    fill
                    sizes="36px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="font-black text-lg tracking-wider font-display text-white leading-none">
                    PT MBOIS
                  </h1>
                  <p className="text-[8.5px] font-bold text-blue-400 font-display tracking-widest uppercase mt-0.5 leading-none">
                    FINAL PROJECT
                  </p>
                </div>
              </div>
              <button
                onClick={onToggle}
                className="w-10 h-10 flex items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer shrink-0"
                title="Tutup Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Middle Section: Mobile Nav Links (Scrollable & Compact) */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {items.map((item, idx) => {
                const showCategory =
                  item.category
                    ? idx === 0 || items[idx - 1].category !== item.category
                    : idx === 0;
                const categoryLabel = item.category || "Menu Utama";
                const isActive = pathname === item.href;

                return (
                  <React.Fragment key={item.href}>
                    {showCategory && (
                      <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 font-display">
                        {categoryLabel}
                      </div>
                    )}
                    <Link
                      onClick={onToggle}
                      href={item.href}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-extrabold"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </React.Fragment>
                );
              })}
            </nav>

            {/* Bottom Footer: Clickable User Profile Card (Akun) + Solid Logout Button */}
            <div className="p-3 border-t border-slate-800 bg-[#0b1329] shrink-0 space-y-2">
              {/* Entire Card Clickable to open Profile Modal */}
              <button
                onClick={() => {
                  onToggle?.();
                  setIsProfileModalOpen(true);
                }}
                className="w-full p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 active:bg-slate-700 border border-slate-700/60 hover:border-slate-600 transition-all cursor-pointer flex items-center justify-between gap-2.5 text-left group shadow-xs"
                title="Klik untuk membuka Profil & Detail Akun Saya"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-white/20 font-display group-hover:scale-105 transition-transform">
                    DZ
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate font-display group-hover:text-blue-300 transition-colors">{userName}</p>
                    <p className="text-[9.5px] text-slate-400 truncate">{roleName} · {prodiName}</p>
                    <p className="text-[9px] text-slate-500 font-mono mt-0.5 truncate">{userNim}</p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors shrink-0" />
              </button>

              {/* Solid Color Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all cursor-pointer shadow-md shadow-blue-900/30 active:scale-98 font-display"
              >
                <LogOut className="w-3.5 h-3.5 text-white" />
                <span>Keluar</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Global Profile Modal triggered from Mobile Sidebar */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />

      {/* ── 2. Desktop Permanent/Collapsible Sidebar (md:flex) ── */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 shrink-0 bg-[#0f172a] text-white border-r border-slate-800 transition-all duration-300 z-30 overflow-hidden ${
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
              src="/mbois_white.png"
              alt="Logo PT MBOIS"
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
                PT MBOIS
              </h1>
              <p className="text-[9px] font-bold text-blue-400 font-display tracking-widest uppercase mt-1 leading-none">
                FINAL PROJECT
              </p>
            </div>
          )}
        </button>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {items.map((item, idx) => {
            const showCategory =
              item.category
                ? idx === 0 || items[idx - 1].category !== item.category
                : idx === 0;
            const categoryLabel = item.category || "Menu Utama";
            const isActive = pathname === item.href;

            return (
              <React.Fragment key={item.href}>
                {isOpen && showCategory && (
                  <div className="px-3 pt-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-400 font-display">
                    {categoryLabel}
                  </div>
                )}
                <Link
                  href={item.href}
                  title={!isOpen ? item.label : undefined}
                  className={`flex items-center rounded-xl text-xs font-semibold transition-all duration-200 relative group ${
                    isOpen
                      ? "justify-between px-3.5 py-2.5"
                      : "justify-center px-0 py-2.5 mx-auto w-10 h-10"
                  } ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/30 font-bold"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <div
                    className={`flex items-center ${isOpen ? "gap-3" : "justify-center"}`}
                  >
                    <span
                      className={
                        isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                      }
                    >
                      {item.icon}
                    </span>
                    {isOpen && <span>{item.label}</span>}
                  </div>

                  {/* Tooltip on collapsed */}
                  {!isOpen && (
                    <span className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 shadow-lg">
                      {item.label}
                    </span>
                  )}
                </Link>
              </React.Fragment>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
