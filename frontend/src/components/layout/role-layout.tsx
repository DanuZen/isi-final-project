"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";

import { SplashScreen } from "@/components/ui/splash-screen";
import { ProfileModal } from "@/components/modals/profile-modal";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface RoleLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userName: string;
  userCode: string;   // NIM/NIDN/Username
  userRole: string;
  userUnit: string;   // Prodi / Fakultas / etc.
  accentColor?: string;
}

export function RoleLayout({
  children,
  navItems,
  userName,
  userCode,
  userRole,
  userUnit,
  accentColor = "#C62828",
}: RoleLayoutProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPortalSplash, setShowPortalSplash] = useState(true);
  const dropRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Auto close mobile sidebar on route change
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── 1. Mobile Drawer View (< md) ── */}
        {sidebarOpen && (
          <div className="md:hidden">
            <div
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs z-[9998] animate-fade-in-scale cursor-pointer"
            />
            {/* Full-Page Mobile Drawer from RIGHT */}
            <aside className="fixed inset-0 w-full h-full bg-[#1A1A1A] text-white flex flex-col z-[9999] shadow-2xl overflow-hidden animate-slide-in-right">
              {/* Top Header with emblem logo and close button */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b border-[#333333] shrink-0 bg-[#1A1A1A]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 relative shrink-0">
                    <Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill sizes="36px" className="object-contain" priority />
                  </div>
                  <div>
                    <h1 className="font-black text-lg tracking-wider font-display text-white leading-none">SIPETA</h1>
                    <p className="text-[8.5px] font-bold text-[#C62828] font-display tracking-widest uppercase mt-0.5 leading-none">UPI YPTK PADANG</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full text-neutral-400 hover:text-white hover:bg-white/10 active:bg-white/20 transition-all cursor-pointer shrink-0"
                  title="Tutup Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Middle Section: Mobile Nav Links (Scrollable & Compact) */}
              <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F59E0B] font-display">Menu Utama</div>
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-98 ${
                        active ? "text-white font-extrabold" : "text-[#B0B0B0] hover:bg-[#252525] hover:text-white"
                      }`}
                      style={active ? { background: accentColor + "33", color: "white" } : {}}
                    >
                      <span style={active ? { color: accentColor } : {}}>{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom Footer: User Profile Card (Akun) + Solid Logout Button */}
              <div className="p-3 border-t border-[#333333] bg-[#202020] shrink-0 space-y-2">
                {/* Compact User Profile Card (Akun) */}
                <div className="p-2.5 rounded-xl bg-[#282828] border border-[#3A3A3A] space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C62828] to-[#8B0000] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs border border-white/10 font-display">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate font-display">{userName}</p>
                      <p className="text-[9.5px] text-[#A0A0A0] truncate">{userRole} · {userUnit}</p>
                      <p className="text-[9px] text-[#888888] font-mono mt-0.5 truncate">{userCode}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      setIsProfileOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-black bg-[#F59E0B] text-slate-950 hover:bg-[#D97706] transition-all cursor-pointer shadow-xs active:scale-98 font-display"
                  >
                    <User className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
                    <span>Profil &amp; Detail Akun Saya</span>
                  </button>
                </div>

                {/* Solid Color Logout Button */}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    if (typeof window !== "undefined") {
                      localStorage.removeItem("sipeta_logged_in");
                    }
                    router.push("/login");
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#B71C1C] text-white transition-all cursor-pointer shadow-sm active:scale-98 font-display"
                >
                  <LogOut className="w-3.5 h-3.5 text-white" />
                  <span>Keluar</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* ── 2. Desktop Permanent/Collapsible Sidebar (md:flex) ── */}
        <aside
          className={`hidden md:flex flex-col h-screen sticky top-0 shrink-0 bg-[#1A1A1A] text-white border-r border-[#333333] transition-all duration-300 z-30 overflow-hidden ${
            sidebarOpen ? "w-[260px]" : "w-[64px]"
          }`}
        >
          {/* Logo area */}
          <div className={`flex items-center shrink-0 py-5 ${sidebarOpen ? "px-5 gap-3.5 justify-center" : "justify-center px-2"}`}>
            <div className="w-10 h-10 relative shrink-0">
              <Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="font-black text-xl tracking-wider text-white font-display leading-none">SIPETA</p>
                <p className="text-[9px] font-bold tracking-widest uppercase mt-1 leading-none text-[#C62828] font-display">
                  UPI YPTK PADANG
                </p>
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-3 overflow-y-auto scrollbar-none space-y-0.5 px-2">
            {sidebarOpen && (
              <div className="px-3 pt-1 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-[#F59E0B] font-display">Menu Utama</div>
            )}
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!sidebarOpen ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                    active
                      ? "text-white font-bold"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={active ? { background: accentColor + "22", color: "white" } : {}}
                >
                  {active && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full" style={{ background: accentColor }} />
                  )}
                  <span className={`shrink-0 transition-colors ${active ? "" : "group-hover:text-white"}`} style={active ? { color: accentColor } : {}}>
                    {item.icon}
                  </span>
                  {sidebarOpen && (
                    <span className="text-[12.5px] truncate flex-1">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Toggle button */}
          <div className="px-2 py-3 border-t border-[#2A2A2A] shrink-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-neutral-500 hover:text-white hover:bg-white/5 transition-all"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              {sidebarOpen && <span className="text-xs">Tutup Sidebar</span>}
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

          {/* Header */}
          <header className="sticky top-0 z-30 shrink-0 bg-white border-b border-slate-200">
            <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${accentColor}, #F59E0B, ${accentColor})` }} />
            <div className="h-14 md:h-12 px-4 md:px-5 flex items-center justify-between md:justify-end">
              {/* Mobile Brand (Left side on < md) */}
              <div className="flex items-center gap-2.5 md:hidden">
                <div className="w-8 h-8 relative shrink-0">
                  <Image
                    src="/upiyptk_emblem.webp"
                    alt="Emblem UPI YPTK"
                    fill
                    sizes="32px"
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <h1 className="font-black text-base tracking-wider font-display text-slate-900 leading-none">
                    SIPETA
                  </h1>
                  <p className="text-[7.5px] font-bold text-[#C62828] font-display tracking-widest uppercase mt-0.5 leading-none">
                    UPI YPTK PADANG
                  </p>
                </div>
              </div>

              {/* Mobile Burger Button (Right side on < md) */}
              <div className="md:hidden">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full text-slate-800 hover:text-[#C62828] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shrink-0"
                  title="Buka Navigasi Menu &amp; Profil"
                >
                  <Menu className="w-6 h-6 text-[#C62828]" />
                </button>
              </div>

              {/* Desktop Profile Trigger (Hidden on < md, Visible on ≥ md) */}
              <div ref={dropRef} className="hidden md:block relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all group cursor-pointer"
                >
                  <div
                    className="w-7 h-7 rounded-full text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
                  >
                    {initials}
                  </div>
                  <div className="flex flex-col leading-tight text-left">
                    <span className="text-xs font-semibold text-slate-700 group-hover:text-[#C62828] transition-colors">{userName}</span>
                    <span className="text-[10px] text-slate-400">{userRole}</span>
                  </div>
                  <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full text-white font-extrabold text-sm flex items-center justify-center shrink-0 shadow-sm"
                          style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}
                        >
                          {initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                          <p className="text-[11px] text-slate-500 truncate">{userRole} · {userUnit}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{userCode}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-50 text-left text-xs text-slate-600 font-medium transition-all">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Profil Saya
                      </button>
                      <button
                        onClick={() => { setDropdownOpen(false); router.push("/login"); }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-red-50 text-left text-xs text-red-600 font-medium transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none">
            {children}
          </main>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Portal Splash Transition */}
      {showPortalSplash && (
        <SplashScreen
          isVisible={showPortalSplash}
          message={`Portal ${userRole} — SIPETA`}
          subMessage={`${userName} · ${userUnit}`}
          duration={850}
          onFinish={() => setShowPortalSplash(false)}
        />
      )}
    </div>
  );
}
