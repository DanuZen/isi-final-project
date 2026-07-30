"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, ClipboardList, Settings, Database,
  Plus, Edit2, ArrowRight
} from "lucide-react";

const NAV = [
  { label: "Dashboard",       href: "/super-admin/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen User",  href: "/super-admin/users",       icon: <Users className="w-4 h-4" /> },
  { label: "Audit Log",       href: "/super-admin/audit",       icon: <ClipboardList className="w-4 h-4" />, badge: "12" },
  { label: "Konfigurasi",     href: "/super-admin/config",      icon: <Settings className="w-4 h-4" /> },
  { label: "Master Data",     href: "/super-admin/master",      icon: <Database className="w-4 h-4" /> },
];

interface MasterProdi {
  kode: string;
  nama: string;
  jenjang: string;
  kaprodi: string;
  totalMhs: number;
}

const PRODI_LIST: MasterProdi[] = [
  { kode: "IF", nama: "Teknik Informatika", jenjang: "S1", kaprodi: "Dr. Ratna Dewi, M.Pd.", totalMhs: 356 },
  { kode: "SI", nama: "Sistem Informasi", jenjang: "S1", kaprodi: "Dr. Suparman, M.Kom.", totalMhs: 280 },
  { kode: "SK", nama: "Sistem Komputer", jenjang: "S1", kaprodi: "Ir. Doni Hendra, M.T.", totalMhs: 142 },
];

export default function SuperAdminMasterPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Super Admin" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Irvan Syahputra, S.T." userNim="SA-001" userRole="Super Admin" prodiName="FIK UPI YPTK" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-600 text-white shadow-xs">
                      <Database className="w-3.5 h-3.5" /> Database Master Reference
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Master Data Akademik &amp; Program Studi
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pengelolaan data induk Program Studi, Fakultas, Jenjang Pendidikan, Ketua Prodi (Ka. Prodi), serta referensi ruang sidang.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs">
                    <Plus className="w-4 h-4" />
                    <span>Tambah Program Studi</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Database className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Program Studi Terdaftar (FIK)</h2>
                </div>
              </div>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {["Kode", "Nama Program Studi", "Jenjang", "Ketua Prodi (Ka. Prodi)", "Jumlah Mhs TA", "Aksi"].map((h) => (
                        <th key={h} className="px-4 py-3.5 text-left font-bold text-slate-500 text-[10.5px] uppercase tracking-wide whitespace-nowrap font-display">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PRODI_LIST.map((p) => (
                      <tr key={p.kode} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-slate-700">{p.kode}</td>
                        <td className="px-4 py-3 font-bold text-slate-900 font-display whitespace-nowrap">{p.nama}</td>
                        <td className="px-4 py-3 font-semibold text-slate-600">{p.jenjang}</td>
                        <td className="px-4 py-3 text-slate-700 font-medium whitespace-nowrap">{p.kaprodi}</td>
                        <td className="px-4 py-3 font-bold text-[#C62828]">{p.totalMhs} Mahasiswa</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
