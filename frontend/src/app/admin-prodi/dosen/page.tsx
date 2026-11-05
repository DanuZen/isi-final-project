"use client";
import Link from "next/link";

import React, { useState } from "react";
import {
  Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageBanner, bannerPrimaryBtn, bannerSecondaryBtn } from "@/components/layout/page-banner";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  CalendarDays,
  BookOpen,
  UserCheck,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  Check,
  ArrowLeft,
  Sparkles,
  X,
  Save,
  Edit3,
  Award,
  FileText,
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",   icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",   icon: <Users className="w-4 h-4" /> },
  { label: "Penugasan Dosen",     href: "/admin-prodi/dosen",       icon: <UserCheck className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",    icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",      icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori Judul",    href: "/admin-prodi/repositori",  icon: <BookOpen className="w-4 h-4" /> },
];

interface DosenItem {
  nidn: string;
  nama: string;
  jabatan: string;
  bidang: string;
  isPembimbing: boolean;
  isPenguji: boolean;
  kuotaTerisi: number;
  kuotaMaks: number;
  bimbinganAktif: string[];
}

const INITIAL_DOSEN: DosenItem[] = [
  {
    nidn: "1012057301",
    nama: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.",
    jabatan: "Lektor Kepala",
    bidang: "Software Engineering & Web Systems",
    isPembimbing: true,
    isPenguji: true,
    kuotaTerisi: 6,
    kuotaMaks: 8,
    bimbinganAktif: ["Danu Zen", "Ahmad Fauzi", "Siska Putri", "Rian Hidayat", "Budi Santoso", "Nadia Rahma"],
  },
  {
    nidn: "1012345678",
    nama: "Dr. Ahmad Fauzi, M.T.",
    jabatan: "Lektor Kepala",
    bidang: "Artificial Intelligence & Data Mining",
    isPembimbing: true,
    isPenguji: true,
    kuotaTerisi: 4,
    kuotaMaks: 8,
    bimbinganAktif: ["Siti Rahayu", "Anisa Permatasari", "Rafi Andika", "Budi Prasetyo"],
  },
  {
    nidn: "1018098202",
    nama: "Rina Oktaviani, M.Kom.",
    jabatan: "Lektor",
    bidang: "Database Systems & Information Systems",
    isPembimbing: true,
    isPenguji: false,
    kuotaTerisi: 5,
    kuotaMaks: 8,
    bimbinganAktif: ["Fikri Haikal", "Dewi Lestari", "Muhammad Rizky", "Agus Setiawan", "Tia Ramadhani"],
  },
  {
    nidn: "1025117804",
    nama: "Prof. Dr. Jufriadif Na'am, S.Kom., M.Kom.",
    jabatan: "Guru Besar / Profesor",
    bidang: "Computer Vision & Image Processing",
    isPembimbing: false,
    isPenguji: true,
    kuotaTerisi: 0,
    kuotaMaks: 6,
    bimbinganAktif: [],
  },
  {
    nidn: "1004038501",
    nama: "Dr. Erdisna, S.Kom., M.Kom.",
    jabatan: "Lektor",
    bidang: "Network Security & Cloud Computing",
    isPembimbing: true,
    isPenguji: true,
    kuotaTerisi: 3,
    kuotaMaks: 8,
    bimbinganAktif: ["Bambang Susilo", "Maya Kartika", "Doni Saputra"],
  },
];

export default function AdminProdiDosenPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [dosenList, setDosenList] = useState<DosenItem[]>(INITIAL_DOSEN);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<string>("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"list" | "detail">("list");
  const [selectedNidn, setSelectedNidn] = useState<string>("1012057301");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = dosenList.filter((d) => {
    const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase()) || d.nidn.includes(search) || d.bidang.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      filterRole === "Semua" ||
      (filterRole === "Pembimbing" && d.isPembimbing) ||
      (filterRole === "Penguji" && d.isPenguji) ||
      (filterRole === "Dual" && d.isPembimbing && d.isPenguji);
    return matchSearch && matchRole;
  });

  const selected = dosenList.find((d) => d.nidn === selectedNidn) || filtered[0] || dosenList[0];

  const handleToggleRole = (nidn: string, roleType: "pembimbing" | "penguji") => {
    setDosenList((prev) =>
      prev.map((d) => {
        if (d.nidn === nidn) {
          const updated = {
            ...d,
            isPembimbing: roleType === "pembimbing" ? !d.isPembimbing : d.isPembimbing,
            isPenguji: roleType === "penguji" ? !d.isPenguji : d.isPenguji,
          };
          const roleLabel = roleType === "pembimbing" ? "Pembimbing" : "Penguji";
          const statusLabel = (roleType === "pembimbing" ? updated.isPembimbing : updated.isPenguji) ? "DIAKTIFKAN" : "DICABUT / NONAKTIF";
          showToast(`Akses ${roleLabel} untuk ${d.nama} telah ${statusLabel}.`);
          return updated;
        }
        return d;
      })
    );
  };

  const handleUpdateKuota = (nidn: string, delta: number) => {
    setDosenList((prev) =>
      prev.map((d) => {
        if (d.nidn === nidn) {
          const newMaks = Math.max(1, Math.min(15, d.kuotaMaks + delta));
          showToast(`Batas kuota bimbingan ${d.nama} diperbarui menjadi ${newMaks} Mahasiswa.`);
          return { ...d, kuotaMaks: newMaks };
        }
        return d;
      })
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Admin Prodi" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ratna Dewi, M.Kom." userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative md:pt-0">
            {/* Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white px-4 py-3 rounded-xl shadow-xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
                <Sparkles className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <p className="text-xs font-bold font-display">{toastMessage}</p>
                <button onClick={() => setToastMessage(null)} className="ml-2 text-neutral-400 hover:text-white cursor-pointer">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── Welcome Banner ── */}
            <PageBanner
              badge={
                <span className="hidden sm:inline-block text-[11px] font-semibold text-blue-100/90">
                  Program Studi Teknik Informatika
                </span>
              }
              title="Penugasan Dosen Pembimbing & Penguji"
              description="Tentukan dan kelola hak penugasan Dosen sebagai Pembimbing I/II dan Dosen Penguji Ujian Sempro & Sidang di lingkungan prodi."
              stats={[
                { icon: Users, value: "24 Dosen", label: "Katalog Prodi" },
                { icon: BookOpen, value: "Kuota Maks. 10", label: "Beban Bimbingan" },
                { icon: ShieldCheck, value: "SK Dekan", label: "Terhubung" },
              ]}
              actions={
                <Link
                  href="/admin-prodi/jadwal"
                  className={bannerPrimaryBtn}
                >
                  <CalendarDays className="w-4 h-4" />
                  <span>Plotting Dewan Penguji</span>
                </Link>
              }
            />

            {/* ── Filter Bar (Single Row Alignment) ── */}
            <div className="flex items-center justify-between gap-2.5 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs shrink-0">
              <div className="relative flex-1 min-w-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari NIDN, nama, bidang..."
                  className="w-full pl-8 pr-3 py-2 text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2563eb] font-display"
                />
              </div>

              {/* Custom Animated Dropdown Filter */}
              <div className="relative shrink-0 font-display">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between gap-2 px-3 py-2 min-w-[125px] rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 transition-all cursor-pointer whitespace-nowrap font-display shadow-2xs"
                >
                  <div className="flex items-center gap-1.5">
                    <Filter className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <span>{filterRole === "Semua" ? "Semua Penugasan" : filterRole}</span>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
                </button>

                {isFilterOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                    <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[160px] space-y-0.5 font-display animate-in fade-in zoom-in-95 duration-150">
                      {[
                        { label: "Semua Penugasan", val: "Semua" },
                        { label: "Hanya Pembimbing", val: "Pembimbing" },
                        { label: "Hanya Penguji", val: "Penguji" },
                        { label: "Pembimbing & Penguji", val: "Dual" },
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          onClick={() => {
                            setFilterRole(opt.val);
                            setIsFilterOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            filterRole === opt.val ? "bg-[#2563eb] text-white" : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {filterRole === opt.val && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Main Split View (Flex-1 List & Fixed 350px Detail Panel) ── */}
            <div className="flex flex-col lg:flex-row gap-4 items-stretch flex-1 min-h-0">
              
              {/* Left Column: Compact List View Dosen (Flex-1) */}
              <div className={`bg-white rounded-2xl border border-slate-200 shadow-2xs min-h-0 overflow-hidden flex-col flex-1 min-w-0 ${
                activeMobileTab === "list" ? "flex" : "hidden lg:flex"
              }`}>
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold shadow-xs">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Daftar Dosen Program Studi</h2>
                  </div>
                  <span className="text-xs font-bold text-slate-500 font-display">
                    {filtered.length} Dosen Terdaftar
                  </span>
                </div>

                {/* Table List View (without AKSI column) */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-2 space-y-2">
                  {filtered.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 space-y-2">
                      <UserCheck className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="text-xs font-bold text-slate-600 font-display">Tidak Ada Dosen Ditemukan</p>
                    </div>
                  ) : (
                    filtered.map((d) => {
                      const isSelected = d.nidn === selected.nidn;
                      return (
                        <div
                          key={d.nidn}
                          onClick={() => {
                            setSelectedNidn(d.nidn);
                            setActiveMobileTab("detail");
                          }}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-slate-50 border-slate-300 shadow-2xs"
                              : "bg-white border-slate-200/80 hover:bg-slate-50/60"
                          }`}
                        >
                          <div className="space-y-1 min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-xs text-slate-900 font-display truncate">{d.nama}</h3>
                              <span className="text-[10px] font-mono text-slate-400 font-semibold">({d.nidn})</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium truncate">{d.jabatan} · {d.bidang}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Role Badges */}
                            {d.isPembimbing && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-[#2563eb] border border-blue-200 flex items-center gap-1 font-display">
                                <UserCheck className="w-3 h-3" /> Pembimbing ({d.kuotaTerisi}/{d.kuotaMaks})
                              </span>
                            )}
                            {d.isPenguji && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1 font-display">
                                <ShieldCheck className="w-3 h-3" /> Penguji
                              </span>
                            )}
                            {!d.isPembimbing && !d.isPenguji && (
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                Nonaktif
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Right Column: Live Side Detail Panel Card (Strict 350px Width Lock on Desktop) */}
              <div className={`w-full lg:w-[350px] lg:min-w-[350px] lg:max-w-[350px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-2xs min-h-0 overflow-hidden p-5 justify-between space-y-4 flex-col ${
                activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
              }`}>
                <div className="space-y-4 overflow-y-auto scrollbar-none">
                  {/* Header Detail */}
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setActiveMobileTab("list")}
                      className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[#2563eb]" />
                      <span>Kembali</span>
                    </button>

                    <div className="hidden lg:block space-y-0.5 min-w-0">
                      <span className="text-[10px] font-bold text-[#2563eb] uppercase tracking-widest font-display">Penugasan Dosen</span>
                      <h2 className="text-sm font-black text-slate-900 font-display leading-tight truncate">{selected.nama}</h2>
                    </div>

                    <span className="text-[10px] sm:text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0 ml-auto">
                      NIDN: {selected.nidn}
                    </span>
                  </div>

                  {/* ── Interactive Role Toggle Switches (Admin Control) ── */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">
                      Kontrol Hak Penugasan Dosen:
                    </span>

                    {/* Toggle Akses Pembimbing */}
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <UserCheck className={`w-4 h-4 ${selected.isPembimbing ? "text-[#2563eb]" : "text-slate-400"}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-800 font-display">Peran Dosen Pembimbing</p>
                          <p className="text-[10px] text-slate-400">Bisa menerima &amp; membimbing TA</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleRole(selected.nidn, "pembimbing")}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                          selected.isPembimbing ? "bg-[#2563eb] justify-end" : "bg-slate-300 justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
                      </button>
                    </div>

                    {/* Toggle Akses Penguji */}
                    <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className={`w-4 h-4 ${selected.isPenguji ? "text-blue-600" : "text-slate-400"}`} />
                        <div>
                          <p className="text-xs font-bold text-slate-800 font-display">Peran Dosen Penguji</p>
                          <p className="text-[10px] text-slate-400">Bisa diplot pada Sempro &amp; Sidang</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleToggleRole(selected.nidn, "penguji")}
                        className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                          selected.isPenguji ? "bg-blue-600 justify-end" : "bg-slate-300 justify-start"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* ── Quota Limit Setting Card ── */}
                  {selected.isPembimbing && (
                    <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-bold text-amber-900 uppercase tracking-wider font-display">
                          Batas Kuota Bimbingan:
                        </span>
                        <span className="text-xs font-black text-amber-900 font-display">
                          {selected.kuotaTerisi} / {selected.kuotaMaks} Mahasiswa
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => handleUpdateKuota(selected.nidn, -1)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-100 transition-all cursor-pointer"
                        >
                          - Kurangi Kuota
                        </button>
                        <button
                          onClick={() => handleUpdateKuota(selected.nidn, 1)}
                          className="flex-1 py-1.5 rounded-lg bg-[#38bdf8] text-slate-950 font-bold text-xs hover:bg-[#D97706] transition-all cursor-pointer shadow-2xs font-display"
                        >
                          + Tambah Kuota
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Active Students List */}
                  {selected.isPembimbing && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display block">
                        Mahasiswa Bimbingan Aktif ({selected.bimbinganAktif.length}):
                      </span>
                      <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-none">
                        {selected.bimbinganAktif.map((m, idx) => (
                          <div key={idx} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
                            <span>{m}</span>
                            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Aktif</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 text-[10.5px] text-slate-400 font-medium text-center leading-tight">
                  Perubahan penugasan berlaku instan pada akun dosen terkait.
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
