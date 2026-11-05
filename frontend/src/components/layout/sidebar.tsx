"use client";

import React from "react";
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
  LogOut,
} from "lucide-react";

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

/** Ikon nav di-render seragam 20px (w-5 h-5) mengikuti design system Learning Hub */
const ICON_SIZE = "[&>svg]:w-5 [&>svg]:h-5";

/** Label kategori — tanpa kategori maka seluruh item berada di bawah "MENU" */
const getCategoryLabel = (item: NavItem) =>
  (item.category || "Menu").toUpperCase();

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = true,
  onToggle,
  items = NAV_ITEMS,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  // Auto close mobile drawer on route change
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && isOpen) {
      onToggle?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mbois_logged_in");
    }
    router.push("/login");
  };

  const shouldShowCategory = (idx: number) =>
    idx === 0 || getCategoryLabel(items[idx - 1]) !== getCategoryLabel(items[idx]);

  return (
    <>
      {/* ── 1. Mobile Drawer View (< md) — Royal Blue Gradient Theme ── */}
      {isOpen && (
        <div className="md:hidden">
          <div
            onClick={onToggle}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9998] transition-opacity cursor-pointer"
          />
          <aside className="fixed inset-y-0 left-0 w-[290px] max-w-[85vw] bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#0f172a] text-white flex flex-col z-[9999] shadow-2xl overflow-hidden font-display border-r border-blue-900/40 animate-slide-in-right">
            {/* Header: Centered Large White Logo, uppercase PT MBOIS */}
            <div className="relative pt-7 pb-3 px-4 shrink-0 flex flex-col items-center text-center">
              <button
                onClick={onToggle}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-all cursor-pointer shrink-0 absolute right-3 top-3"
                title="Tutup Menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 relative shrink-0 mb-2 drop-shadow-md">
                <Image
                  src="/mbois_white.png"
                  alt="Logo PT MBOIS"
                  fill
                  sizes="56px"
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="font-black text-xl tracking-wider font-display text-white leading-tight uppercase drop-shadow-xs">
                PT MBOIS
              </h1>
              <p className="text-[10px] font-extrabold text-sky-300 font-display tracking-[0.22em] uppercase mt-1 leading-none drop-shadow-2xs">
                FINAL PROJECT
              </p>
            </div>

            {/* Nav links scrollable */}
            <div className="flex-1 p-3.5 space-y-4 overflow-y-auto scrollbar-none flex flex-col justify-between">
              <nav className="space-y-1.5">
                {items.map((item, idx) => {
                  const isActive = pathname === item.href;

                  return (
                    <React.Fragment key={item.href}>
                      {shouldShowCategory(idx) && (
                        <div
                          className={`px-3 pb-1 text-xs font-bold uppercase tracking-wider text-blue-200/60 font-display ${
                            idx === 0 ? "pt-1" : "pt-3"
                          }`}
                        >
                          {getCategoryLabel(item)}
                        </div>
                      )}
                      <Link
                        onClick={onToggle}
                        href={item.href}
                        className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm transition-all active:scale-98 relative ${
                          isActive
                            ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-950/60 border border-blue-400/30"
                            : "text-blue-100/80 hover:bg-white/10 hover:text-white font-medium"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                        )}
                        <div className="flex items-center gap-3.5 pl-1 min-w-0">
                          <span
                            className={`shrink-0 ${ICON_SIZE} ${
                              isActive ? "text-white" : "text-blue-200/70"
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="text-[13.5px] truncate">{item.label}</span>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                })}
              </nav>

              {/* Mobile: Button Keluar (Logout) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-sm text-center transition-all duration-200 shadow-md shadow-rose-950/40 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Keluar</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ── 2. Desktop Permanent/Collapsible Sidebar — Royal Blue Gradient Theme ── */}
      <aside
        className={`hidden md:flex flex-col h-dvh sticky top-0 shrink-0 bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#0f172a] text-white border-r border-blue-900/40 transition-[width] duration-300 ease-[cubic-bezier(0.2,0,0,1)] z-30 overflow-hidden font-display will-change-[width] ${
          isOpen ? "w-[264px]" : "w-[72px]"
        }`}
      >
        {/* ── A. Brand Header — click to toggle/collapse sidebar ── */}
        <div className="pt-7 pb-3 px-3 bg-transparent shrink-0">
          <button
            type="button"
            onClick={onToggle}
            title={isOpen ? "Perkecil sidebar" : "Perbesar sidebar"}
            className="w-full flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer active:scale-98"
          >
            <div
              className={`relative shrink-0 group-hover:scale-105 transition-all duration-300 drop-shadow-md ${
                isOpen ? "w-14 h-14 mb-2" : "w-10 h-10 mb-0"
              }`}
            >
              <Image
                src="/mbois_white.png"
                alt="Logo PT MBOIS"
                fill
                sizes={isOpen ? "56px" : "40px"}
                className="object-contain"
                priority
              />
            </div>

            <div
              className={`flex flex-col items-center text-center min-w-0 transition-all duration-300 ease-[cubic-bezier(0.2,0,0,1)] overflow-hidden whitespace-nowrap ${
                isOpen
                  ? "opacity-100 max-h-16 translate-y-0"
                  : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <h1 className="font-black text-xl tracking-wider text-white leading-tight group-hover:text-sky-300 transition-colors uppercase drop-shadow-xs">
                PT MBOIS
              </h1>
              <p className="text-[10px] font-extrabold text-sky-300 tracking-[0.22em] uppercase leading-none mt-1 drop-shadow-2xs">
                FINAL PROJECT
              </p>
            </div>
          </button>
        </div>

        {/* ── B. Main Navigation Menu ── */}
        <div className="flex-1 px-3 py-3 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none flex flex-col justify-between">
          <nav className="space-y-1.5">
            {items.map((item, idx) => {
              const isActive = pathname === item.href;

              const categoryHeader = isOpen && shouldShowCategory(idx) && (
                <div
                  className={`px-3.5 pb-1.5 text-xs font-bold uppercase tracking-wider text-blue-200/60 font-display overflow-hidden whitespace-nowrap animate-fade-in-up ${
                    idx === 0 ? "pt-1" : "pt-3"
                  }`}
                >
                  {getCategoryLabel(item)}
                </div>
              );

              if (!isOpen) {
                // ── Collapsed Mode: Centered Squircle + Floating Tooltip ──
                return (
                  <React.Fragment key={item.href}>
                    {categoryHeader}
                    <Link
                      href={item.href}
                      className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center transition-all duration-200 relative group active:scale-95 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-950/70 border border-blue-400/40 font-bold"
                          : "text-blue-200/70 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`shrink-0 transition-transform duration-200 ${ICON_SIZE} ${
                          isActive ? "text-white scale-105" : "group-hover:scale-110"
                        }`}
                      >
                        {item.icon}
                      </span>

                      <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-slate-900/95 text-white text-xs font-semibold whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-150 z-50 shadow-2xl border border-slate-700/80">
                        {item.label}
                      </span>
                    </Link>
                  </React.Fragment>
                );
              }

              // ── Expanded Mode: Full Width Label + Left White Accent Bar ──
              return (
                <React.Fragment key={item.href}>
                  {categoryHeader}
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 relative group active:scale-[0.98] ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-950/60 border border-blue-400/30"
                        : "text-blue-100/80 hover:bg-white/10 hover:text-white font-medium"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                    )}

                    <div className="flex items-center gap-3.5 pl-1 min-w-0">
                      <span
                        className={`shrink-0 transition-all duration-200 ${ICON_SIZE} ${
                          isActive
                            ? "text-white"
                            : "text-blue-200/70 group-hover:text-white group-hover:scale-105"
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate text-[13.5px]">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="ml-2 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </React.Fragment>
              );
            })}
          </nav>

          {/* ── C. Bottom: Button Keluar (Logout) ── */}
          <div className="pt-2">
            {isOpen ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-bold text-sm text-center transition-all duration-200 shadow-md shadow-rose-950/40 cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Keluar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                title="Keluar"
                className="w-11 h-11 mx-auto rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-all cursor-pointer shadow-md group relative active:scale-95"
              >
                <LogOut className="w-5 h-5" />
                <span className="absolute left-full ml-3.5 px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-semibold whitespace-nowrap opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none transition-all duration-150 z-50 shadow-xl">
                  Keluar
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
