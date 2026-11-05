"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Mail,
  Bell,
  Menu,
  User,
  LogOut,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  PlayCircle,
  ExternalLink,
} from "lucide-react";
import { ProfileModal } from "@/components/modals/profile-modal";

interface HeaderProps {
  userName?: string;
  userNim?: string;
  userRole?: string;
  prodiName?: string;
  className?: string;
  searchPlaceholder?: string;
  onToggleSidebar?: () => void;
  onOpenProfileModal?: () => void;
}

interface MessageItem {
  id: number | string;
  sender: string;
  role: string;
  avatar: string;
  snippet: string;
  time: string;
  unread: boolean;
  href?: string;
}

interface NotificationItem {
  id: number | string;
  title: string;
  desc: string;
  time: string;
  type: "deadline" | "quiz" | "grade" | "success" | "info" | "warning";
  href: string;
  unread: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Danu Zen",
  userNim = "20101152630045",
  userRole = "Mahasiswa",
  prodiName = "Teknik Informatika",
  className = "",
  searchPlaceholder = "Search your course....",
  onToggleSidebar,
  onOpenProfileModal,
}) => {
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState<"mail" | "notif" | "profile" | null>(null);
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const rightControlsRef = useRef<HTMLDivElement>(null);

  // Mock initial interactive messages
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 1,
      sender: "Dr. Agariadne Dwinggo Samala, M.T.",
      role: "Pembimbing Utama",
      avatar: "AD",
      snippet: "Draf Bab 3 sudah saya review. Lengkapi diagram sequence dan use case sebelum bimbingan besok.",
      time: "15 mnt lalu",
      unread: true,
      href: "/mahasiswa/bimbingan",
    },
    {
      id: 2,
      sender: "Dr. Eng. Irfan Maulana, M.Sc.",
      role: "Dosen Penguji",
      avatar: "IM",
      snippet: "Catatan perbaikan proposal telah saya verifikasi. Silakan unduh berita acara pengesahan.",
      time: "2 jam lalu",
      unread: true,
      href: "/mahasiswa/seminar",
    },
    {
      id: 3,
      sender: "Sekretariat Prodi TI (Hafizah, M.Kom.)",
      role: "Admin Prodi",
      avatar: "HF",
      snippet: "Pemberitahuan: Batas akhir unggah berkas pendaftaran sidang gelombang 2 ditutup Jumat pukul 16:00.",
      time: "Kemarin",
      unread: false,
      href: "/mahasiswa/dashboard",
    },
  ]);

  // Mock initial interactive notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      title: "Batas Pengumpulan Berkas Sidang",
      desc: "Naskah final Tugas Akhir & persetujuan pembimbing harus diunggah sebelum 23:59 WIB.",
      time: "Sisa 6 jam",
      type: "deadline",
      href: "/mahasiswa/sidang",
      unread: true,
    },
    {
      id: 2,
      title: "Jadwal Seminar Proposal Ditetapkan",
      desc: "Seminar Proposal dijadwalkan pada 14 September 2026, Ruang Sidang 302 FIK.",
      time: "Hari ini",
      type: "quiz",
      href: "/mahasiswa/seminar",
      unread: true,
    },
    {
      id: 3,
      title: "Bimbingan Bab 2 Diverifikasi",
      desc: "Logbook bimbingan Bab 2 telah disetujui & diparaf digital oleh Pembimbing I.",
      time: "3 jam lalu",
      type: "grade",
      href: "/mahasiswa/bimbingan",
      unread: false,
    },
  ]);

  const unreadMessagesCount = messages.filter((m) => m.unread).length;
  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  const toggleDropdown = (type: "mail" | "notif" | "profile") => {
    if (activeDropdown === type) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(type);
      if (type === "mail" || type === "notif") {
        setIsLoadingDropdown(true);
        setTimeout(() => {
          setIsLoadingDropdown(false);
        }, 220);
      }
    }
  };

  const handleMarkAllMessagesRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })));
  };

  const handleMarkAllNotifsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLogout = () => {
    setActiveDropdown(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_logged_in");
      localStorage.removeItem("mbois_logged_in");
    }
    router.push("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        rightControlsRef.current &&
        !rightControlsRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = userName
    .replace(/^(Dr|Prof|Ir)\.?\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      <header
        className={`shrink-0 px-4 md:px-6 py-3.5 flex items-center justify-between gap-3 md:gap-5 bg-[#FAFAFA] font-display z-20 ${className}`}
      >
        {/* ── Left Side: Mobile Burger + Search Bar ── */}
        <div className="flex items-center gap-3 flex-1 min-w-0 max-w-xl">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={onToggleSidebar}
            className="md:hidden w-10 h-10 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-700 hover:text-blue-600 active:scale-95 transition-all shadow-2xs shrink-0 cursor-pointer"
            title="Buka Navigasi"
          >
            <Menu className="w-5 h-5 text-blue-600" />
          </button>

          {/* Search Pill Input */}
          <div className="relative flex-1 min-w-0">
            <div className="relative flex items-center bg-white border border-slate-200/90 rounded-full px-4 py-2.5 shadow-2xs focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100/80 transition-all">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden w-full font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600 shrink-0 ml-1.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Side: Circular Message + Notification Bell + Divider + User Profile ── */}
        <div ref={rightControlsRef} className="flex items-center gap-2.5 md:gap-3 shrink-0">
          {/* ── 1. Circular Mail/Inbox Icon & Dropdown ── */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("mail")}
              className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer relative group ${
                activeDropdown === "mail"
                  ? "border-blue-600 ring-2 ring-blue-100 text-blue-600"
                  : "border-slate-200/90 text-slate-700 hover:text-blue-600 hover:border-blue-300"
              }`}
              title="Pesan Masuk"
            >
              <Mail className="w-4 h-4 transition-colors" />
              {unreadMessagesCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
              )}
            </button>

            {/* Mail Dropdown Popup */}
            {activeDropdown === "mail" && (
              <div className="absolute right-[-80px] sm:right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 animate-scale-up font-display">
                {/* Dropdown Header */}
                <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Kotak Pesan</span>
                    {unreadMessagesCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-600 text-white shadow-2xs">
                        {unreadMessagesCount} Baru
                      </span>
                    )}
                  </div>
                  {unreadMessagesCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllMessagesRead}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Tandai Dibaca
                    </button>
                  )}
                </div>

                {/* Message Items List */}
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto scrollbar-none">
                  {isLoadingDropdown ? (
                    <div className="p-3.5 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-3 p-1 animate-pulse">
                          <div className="w-8 h-8 rounded-full bg-slate-200/80 shrink-0 mt-0.5" />
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="h-3 bg-slate-200 rounded-md w-3/5" />
                              <div className="h-2 bg-slate-200/70 rounded-md w-1/5" />
                            </div>
                            <div className="h-2 bg-slate-200/80 rounded-md w-2/5" />
                            <div className="h-2 bg-slate-200/60 rounded-md w-4/5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Tidak ada pesan masuk.
                    </div>
                  ) : (
                    messages.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setMessages((prev) =>
                            prev.map((m) =>
                              m.id === item.id ? { ...m, unread: false } : m
                            )
                          );
                          if (item.href) {
                            setActiveDropdown(null);
                            router.push(item.href);
                          }
                        }}
                        className={`p-3 sm:p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                          item.unread ? "bg-blue-50/25" : ""
                        }`}
                      >
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 border border-blue-200/60 mt-0.5">
                          {item.avatar}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {item.sender}
                            </p>
                            <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-[10px] text-blue-600 font-semibold truncate">
                            {item.role}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.snippet}
                          </p>
                        </div>

                        {/* Unread indicator */}
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-2" />
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Dropdown Footer */}
                <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 text-center">
                  <Link
                    href="/mahasiswa/bimbingan"
                    onClick={() => setActiveDropdown(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Buka Lembar Bimbingan</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ── 2. Circular Notification Bell & Dropdown ── */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown("notif")}
              className={`w-10 h-10 rounded-full bg-white border flex items-center justify-center shadow-2xs active:scale-95 transition-all cursor-pointer relative group ${
                activeDropdown === "notif"
                  ? "border-blue-600 ring-2 ring-blue-100 text-blue-600"
                  : "border-slate-200/90 text-slate-700 hover:text-blue-600 hover:border-blue-300"
              }`}
              title="Notifikasi"
            >
              <Bell className="w-4 h-4 transition-colors" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Notification Dropdown Popup */}
            {activeDropdown === "notif" && (
              <div className="absolute right-[-40px] sm:right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 animate-scale-up font-display">
                {/* Dropdown Header */}
                <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">Notifikasi</span>
                    {unreadNotifsCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-600 text-white shadow-2xs">
                        {unreadNotifsCount} Baru
                      </span>
                    )}
                  </div>
                  {unreadNotifsCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllNotifsRead}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                    >
                      Tandai Semua Dibaca
                    </button>
                  )}
                </div>

                {/* Notification Items List */}
                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto scrollbar-none">
                  {isLoadingDropdown ? (
                    <div className="p-3.5 space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-start gap-3 p-1 animate-pulse">
                          <div className="w-8 h-8 rounded-full bg-slate-200/80 shrink-0 mt-0.5" />
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="h-3 bg-slate-200 rounded-md w-1/2" />
                              <div className="h-2 bg-slate-200/70 rounded-md w-1/5" />
                            </div>
                            <div className="h-2 bg-slate-200/70 rounded-md w-4/5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Tidak ada notifikasi baru.
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setNotifications((prev) =>
                            prev.map((n) =>
                              n.id === item.id ? { ...n, unread: false } : n
                            )
                          );
                          setActiveDropdown(null);
                        }}
                        className={`p-3 sm:p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors block ${
                          item.unread ? "bg-rose-50/25" : ""
                        }`}
                      >
                        {/* Icon */}
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                            item.type === "deadline"
                              ? "bg-rose-100 text-rose-600"
                              : item.type === "quiz"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {item.type === "deadline" ? (
                            <Clock className="w-4 h-4" />
                          ) : item.type === "quiz" ? (
                            <PlayCircle className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 space-y-0.5">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </p>
                            <span
                              className={`text-[10px] font-bold shrink-0 ${
                                item.type === "deadline"
                                  ? "text-rose-600"
                                  : "text-slate-400"
                              }`}
                            >
                              {item.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {/* Unread indicator */}
                        {item.unread && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2" />
                        )}
                      </Link>
                    ))
                  )}
                </div>

                {/* Dropdown Footer */}
                <div className="p-2.5 border-t border-slate-100 bg-slate-50/50 text-center">
                  <Link
                    href="/mahasiswa/dashboard"
                    onClick={() => setActiveDropdown(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                  >
                    <span>Lihat Semua Aktivitas Dashboard</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider Line */}
          <div className="h-6 w-px bg-slate-200/90 mx-1 hidden sm:block" />

          {/* ── 3. User Profile Chip & Dropdown ── */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                if (onOpenProfileModal) {
                  onOpenProfileModal();
                } else {
                  toggleDropdown("profile");
                }
              }}
              className="flex items-center gap-2.5 pl-1 py-1 rounded-full hover:bg-white/80 transition-all cursor-pointer group"
              title="Profil Pengguna"
            >
              {/* Avatar DZ */}
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-2xs border-2 border-white shrink-0 group-hover:scale-105 transition-transform">
                {initials}
              </div>

              {/* Name */}
              <div className="hidden sm:flex items-center gap-1.5 text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {userName}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                    activeDropdown === "profile" ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Profile Dropdown Popup */}
            {activeDropdown === "profile" && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden z-50 animate-scale-up font-display">
                <div className="p-4 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {userName}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {userRole} • {prodiName || userNim}
                      </p>
                      <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Status: Aktif
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2 space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDropdown(null);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Profil & Detail Akun Saya</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-rose-600" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Profile Modal */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
};
