"use client";

import React from "react";
import { Bell, ChevronDown, PanelLeft } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userNim?: string;
  userRole?: string;
  prodiName?: string;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Danu Zen",
  userNim = "20101152630045",
  userRole = "Mahasiswa",
  prodiName = "Teknik Informatika",
  onToggleSidebar,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/90 border-b border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
      {/* Signature UPI YPTK Red & Gold Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />

      <div className="h-15 px-6 flex items-center justify-between">
        {/* Toggle Sidebar Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 hover:bg-[#C62828] hover:text-white hover:border-[#C62828] transition-all flex items-center gap-2 font-bold text-xs active:scale-95 shadow-xs"
            title="Buka / Tutup Sidebar Navigasi"
          >
            <PanelLeft className="w-4 h-4 text-[#C62828] group-hover:text-white" />
            <span className="font-display">Sidebar Navigasi</span>
          </button>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 relative transition-all active:scale-95">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C62828] rounded-full ring-2 ring-white animate-pulse" />
          </button>

          <div className="h-5 w-px bg-slate-200" />

          {/* User Info Pill */}
          <div className="flex items-center gap-3 cursor-pointer group py-1 px-2 rounded-xl hover:bg-slate-100/70 transition-all">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C62828] to-[#990000] text-white font-extrabold text-xs flex items-center justify-center shadow-sm shadow-[#C62828]/20 border border-white">
              DZ
            </div>
            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-slate-800 leading-tight group-hover:text-[#C62828] transition-colors">
                  {userName}
                </p>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#C62828]/10 text-[#C62828] border border-[#C62828]/20">
                  {userRole}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono-data leading-tight mt-0.5">
                NIM: {userNim} • {prodiName}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
};
