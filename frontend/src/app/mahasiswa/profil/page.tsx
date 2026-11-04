"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { ProfileModal } from "@/components/modals/profile-modal";
import { useRouter } from "next/navigation";

export default function ProfilAkademikPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.push("/mahasiswa/dashboard");
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 md:p-5 overflow-hidden shell-body flex flex-col min-h-0 relative">
            {/* Background Preview Shell */}
            <div className="flex-1 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-xs flex items-center justify-center p-6 text-center">
              <div className="space-y-2 max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2563eb] flex items-center justify-center mx-auto shadow-xs font-bold text-lg">
                  DZ
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 font-display">Profil &amp; Detail Akun Saya</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Pop-up modal profil sedang aktif. Klik di luar atau tombol tutup untuk kembali ke dashboard utama.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-[#2563eb] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#1d4ed8] transition-all cursor-pointer"
                >
                  Buka Modal Profil
                </button>
              </div>
            </div>

            {/* Always Render ProfileModal */}
            <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </main>
        </div>
      </div>
    </div>
  );
}
