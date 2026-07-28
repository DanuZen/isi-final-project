"use client";

import React from "react";
import { Bell, Search, ChevronDown } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userNim?: string;
  userRole?: string;
  prodiName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  userName = "Danu Zen",
  userNim = "20101152630045",
  userRole = "Mahasiswa",
  prodiName = "Teknik Informatika",
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#E0E0E0] border-t-2 border-t-[#FF5722] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#616161]" />
          <input
            type="text"
            placeholder="Cari judul TA, nama dosen, atau status..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAFAFA] border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#FF5722] text-[#212121] transition-all"
          />
        </div>
      </div>

      {/* Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-lg text-[#616161] hover:bg-[#FAFAFA] relative transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D32F2F] rounded-full ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-[#E0E0E0]" />

        {/* User Info */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-[#FBE9E7] border border-[#FF5722]/30 flex items-center justify-center text-[#FF5722] font-bold text-xs">
            DZ
          </div>
          <div className="hidden sm:block text-left">
            <div className="flex items-center gap-2">
              <p className="text-xs font-semibold text-[#212121] leading-tight group-hover:text-[#FF5722] transition-colors">
                {userName}
              </p>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FBE9E7] text-[#D32F2F]">
                {userRole}
              </span>
            </div>
            <p className="text-[11px] text-[#616161] font-mono-data leading-tight mt-0.5">
              NIM: {userNim} • {prodiName}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-[#616161] group-hover:text-[#212121] transition-colors" />
        </div>
      </div>
    </header>
  );
};
