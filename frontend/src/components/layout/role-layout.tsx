"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, User, LogOut, Menu, X } from "lucide-react";

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
  const dropRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const h = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className={`bg-[#1A1A1A] text-white flex flex-col h-screen sticky top-0 shrink-0 border-r border-[#333333] transition-all duration-300 z-30 overflow-hidden ${
            sidebarOpen ? "w-[260px]" : "w-[64px]"
          }`}
        >
          {/* Logo area */}
          <div className={`flex items-center h-[56px] shrink-0 border-b border-[#2A2A2A] ${sidebarOpen ? "px-4 gap-3" : "justify-center px-2"}`}>
            <div className="w-8 h-8 relative shrink-0">
              <Image src="/upiyptk_emblem.webp" alt="UPI YPTK" fill className="object-contain" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <p className="font-black text-sm tracking-wider text-white font-display leading-none">SIPETA</p>
                <p className="text-[8.5px] font-bold tracking-widest uppercase mt-1 leading-none text-[#C62828] font-display">
                  UPI YPTK PADANG
                </p>
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav className="flex-1 py-3 overflow-y-auto scrollbar-none space-y-0.5 px-2">
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
            <div className="h-12 px-5 flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all md:hidden"
              >
                <Menu className="w-4 h-4" />
              </button>
              <div className="flex-1" />

              {/* User dropdown */}
              <div ref={dropRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((v) => !v)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all group"
                >
                  <div
                    className="w-7 h-7 rounded-full text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none"
                    style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}
                  >
                    {initials}
                  </div>
                  <div className="hidden sm:flex flex-col leading-tight text-left">
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
    </div>
  );
}
