"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, User, LogOut, GraduationCap } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userNim?: string;
  userRole?: string;
  prodiName?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Danu Zen",
  userNim = "20101152630045",
  userRole = "Mahasiswa",
  prodiName = "Teknik Informatika",
  className = "",
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setOpen(false);
    router.push("/login");
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={`sticky top-0 z-30 shrink-0 bg-white border-b border-slate-200 ${className}`}>
      <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />

      <div className="h-12 px-5 flex items-center justify-end">
        {/* Profile Trigger */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#C62828] to-[#8B0000] text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none">
              DZ
            </div>
            <div className="hidden sm:flex flex-col leading-tight text-left">
              <span className="text-xs font-semibold text-slate-700 group-hover:text-[#C62828] transition-colors">
                {userName}
              </span>
              <span className="text-[10px] text-slate-400">{userRole}</span>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Account Info */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C62828] to-[#8B0000] text-white font-extrabold text-sm flex items-center justify-center shrink-0 select-none shadow-sm">
                    DZ
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                    <p className="text-[11px] text-slate-500 truncate">{userRole} · {prodiName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{userNim}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-1.5 space-y-0.5">
                <Link href="/akun" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Detail Akun
                </Link>
                <Link href="/profil" onClick={() => setOpen(false)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  Profil Akademik
                </Link>
              </div>

              {/* Logout */}
              <div className="p-1.5 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-[#C62828] hover:bg-rose-50 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5 shrink-0" />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
