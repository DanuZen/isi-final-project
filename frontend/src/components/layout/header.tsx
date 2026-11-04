"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown, User, LogOut, Menu } from "lucide-react";
import { ProfileModal } from "@/components/modals/profile-modal";

interface HeaderProps {
  userName?: string;
  userNim?: string;
  userRole?: string;
  prodiName?: string;
  className?: string;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Danu Zen",
  userNim = "20101152630045",
  userRole = "Mahasiswa",
  prodiName = "Teknik Informatika",
  className = "",
  onToggleSidebar,
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setOpen(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("mbois_logged_in");
    }
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
    <>
      <header className={`fixed top-0 left-0 right-0 md:relative z-40 shrink-0 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs ${className}`}>
        <div className="h-0.5 bg-gradient-to-r from-blue-700 via-sky-400 to-blue-600" />

        <div className="h-14 md:h-12 px-4 md:px-5 flex items-center justify-between md:justify-end">
          {/* Mobile Brand (Left side on < md) */}
          <div className="flex items-center gap-2.5 md:hidden">
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src="/mbois_blue.png"
                alt="Logo PT MBOIS"
                fill
                sizes="32px"
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="font-black text-base tracking-wider font-display text-slate-900 leading-none">
                PT MBOIS
              </h1>
              <p className="text-[7.5px] font-bold text-blue-600 font-display tracking-widest uppercase mt-0.5 leading-none">
                FINAL PROJECT
              </p>
            </div>
          </div>

          {/* Mobile Burger Button (Right side on < md) */}
          <div className="md:hidden">
            <button
              onClick={onToggleSidebar}
              className="flex items-center justify-center w-10 h-10 rounded-full text-slate-800 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Buka Navigasi Menu &amp; Profil"
            >
              <Menu className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {/* Desktop Profile Trigger (Hidden on < md, Visible on ≥ md) */}
          <div ref={ref} className="hidden md:block relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-all group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white font-bold text-[11px] flex items-center justify-center shrink-0 select-none shadow-2xs">
                DZ
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
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
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 text-white font-extrabold text-sm flex items-center justify-center shrink-0 select-none shadow-sm">
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
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    Profil &amp; Detail Akun Saya
                  </button>
                </div>

                {/* Logout */}
                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors text-left cursor-pointer"
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

      {/* Global Profile Modal */}
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </>
  );
};
