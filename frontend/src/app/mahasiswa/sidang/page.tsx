"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  FileCheck,
  Upload,
  ArrowRight,
  Download,
} from "lucide-react";

import { storeJadwal } from "@/lib/sipeta-store";

export default function UjianSidangPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"SEMPRO" | "SIDANG">("SIDANG");
  const [activeMobileTab, setActiveMobileTab] = useState<"jadwal" | "berkas">("jadwal");

  const [naskahFinalFile, setNaskahFinalFile] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [revisiSemproFile, setRevisiSemproFile] = useState<string | null>(null);
  const [isSemproUploaded, setIsSemproUploaded] = useState(false);

  const [jadwalList, setJadwalList] = useState(storeJadwal.getAll());

  React.useEffect(() => {
    const sync = () => setJadwalList(storeJadwal.getAll());
    window.addEventListener("storage_sipeta", sync);
    return () => window.removeEventListener("storage_sipeta", sync);
  }, []);

  const currentExam = jadwalList.find((j) => activeTab === "SEMPRO" ? j.jenis === "Seminar" : j.jenis === "Sidang");

  const handleUploadNaskah = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naskahFinalFile) return;
    setIsUploaded(true);
  };

  const handleUploadSemproRevisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisiSemproFile) return;
    setIsSemproUploaded(true);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto scrollbar-none shell-body flex flex-col min-h-0 relative">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs font-display">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACC Ujian Akademik Disetujui
                    </span>
                  </div>
                  <h1 className="text-base sm:text-lg md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Jadwal &amp; Ujian Akademik Tugas Akhir
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Pusat informasi alokasi ujian Seminar Proposal (Sempro) dan Ujian Sidang Akhir Skripsi mahasiswa UPI YPTK Padang.
                  </p>
                </div>

                {/* Tab Controls */}
                <div className="flex items-center gap-1.5 bg-[#141414] p-1.5 rounded-xl border border-neutral-700 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab("SEMPRO")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-display cursor-pointer ${
                      activeTab === "SEMPRO"
                        ? "bg-[#C62828] text-white shadow-xs font-extrabold"
                        : "text-neutral-400 hover:text-white font-medium"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap">1. Sempro</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("SIDANG")}
                    className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 font-display cursor-pointer ${
                      activeTab === "SIDANG"
                        ? "bg-[#C62828] text-white shadow-xs font-extrabold"
                        : "text-neutral-400 hover:text-white font-medium"
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap">2. Sidang Skripsi</span>
                  </button>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Sleek Mobile Segmented Control Tab Switcher (<1024px) ── */}
            <div className="lg:hidden flex p-1 bg-slate-200/80 rounded-xl shrink-0 gap-1 font-display border border-slate-300/60 shadow-2xs overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveMobileTab("jadwal")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "jadwal"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Jadwal Ujian</span>
              </button>

              <button
                onClick={() => setActiveMobileTab("berkas")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "berkas"
                    ? "bg-white text-[#C62828] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Unggah Berkas</span>
              </button>
            </div>

            {/* Grid Layout: Schedule & Upload (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 lg:overflow-hidden">
              {/* Left Column (8/12): Schedule Details & Board of Examiners */}
              <div className={`lg:col-span-8 flex-col justify-between space-y-4 h-auto lg:h-full min-h-0 overflow-visible lg:overflow-hidden ${activeMobileTab === "jadwal" ? "flex" : "hidden lg:flex"}`}>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        {activeTab === "SEMPRO" ? (
                          <Calendar className="w-4 h-4" />
                        ) : (
                          <GraduationCap className="w-4 h-4" />
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        {activeTab === "SEMPRO"
                          ? "Jadwal Pelaksanaan Seminar Proposal Skripsi (Sempro)"
                          : "Jadwal Pelaksanaan Ujian Sidang Skripsi (Final)"}
                      </h3>
                    </div>
                    {currentExam ? (
                      <span className="hidden sm:inline-block px-3 py-1 text-xs font-bold bg-emerald-600 text-white shadow-xs rounded-full font-display">
                        Terjadwal Resmi
                      </span>
                    ) : (
                      <span className="hidden sm:inline-block px-3 py-1 text-xs font-extrabold bg-amber-500 text-white shadow-xs rounded-full font-display">
                        Belum Ada Jadwal
                      </span>
                    )}
                  </div>

                  {currentExam ? (
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Hari &amp; Tanggal</span>
                          </div>
                          <p className="font-bold text-slate-900">{currentExam.hari}, {currentExam.tglNum}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Pelaksanaan</span>
                          </div>
                          <p className="font-bold text-slate-900">{currentExam.waktu}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Ujian</span>
                          </div>
                          <p className="font-bold text-slate-900">{currentExam.ruang}</p>
                        </div>
                      </div>

                      {/* Examiners Table */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C62828]" /> Susunan Dewan Penguji Ujian:
                        </h4>

                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200">
                              <tr>
                                <th className="py-3 px-4 font-bold">Jabatan Dewan Penguji</th>
                                <th className="py-3 px-4 font-bold">Nama Dosen Penguji</th>
                                <th className="py-3 px-4 font-bold">Status Hadir</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                              <tr>
                                <td className="py-2.5 px-3 font-bold text-[#C62828]">Ketua Dewan Penguji</td>
                                <td className="py-2.5 px-3">Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.</td>
                                <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                              </tr>
                              <tr>
                                <td className="py-2.5 px-3 font-bold text-amber-700">Penguji Utama (I)</td>
                                <td className="py-2.5 px-3">Dr. Jasmir, S.Kom., M.Kom.</td>
                                <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                        {activeTab === "SEMPRO" ? <Calendar className="w-7 h-7" /> : <GraduationCap className="w-7 h-7" />}
                      </div>
                      <h4 className="font-extrabold text-base font-display text-slate-900">
                        Belum Ada Jadwal {activeTab === "SEMPRO" ? "Seminar Proposal" : "Ujian Sidang"}
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                        Jadwal pelaksanaan ujian beserta susunan dewan penguji akan muncul secara otomatis di sini setelah ditetapkan oleh Sekretariat Admin Prodi.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (4/12): Upload Form & Rules */}
              <div className={`lg:col-span-4 flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden ${activeMobileTab === "berkas" ? "flex" : "hidden lg:flex"}`}>
                {/* Card 1: Upload Form */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        {activeTab === "SEMPRO"
                          ? "Upload Draft Proposal Skripsi (PDF)"
                          : "Upload Naskah Skripsi Final (Lengkap)"}
                      </h3>
                    </div>
                  </div>

                  {activeTab === "SEMPRO" ? (
                    isSemproUploaded ? (
                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-800 font-bold">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Berkas Draft Proposal Berhasil Diunggah!
                        </div>
                        <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                          Naskah proposal diterima oleh Dewan Penguji Seminar Proposal.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleUploadSemproRevisi} className="space-y-3.5 text-xs">
                        <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                          Unggah draf proposal skripsi (Bab 1 s/d Bab 3) dalam format PDF untuk Dewan Penguji Sempro.
                        </p>

                        <input
                          type="file"
                          required
                          onChange={(e) => setRevisiSemproFile(e.target.files?.[0]?.name || "Draft_Proposal_Skripsi.pdf")}
                          className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                        />

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                        >
                          <Upload className="w-4 h-4" /> Unggah Draft Proposal
                        </button>
                      </form>
                    )
                  ) : isUploaded ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Naskah Skripsi Final Berhasil Diunggah!
                      </div>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        Naskah komprehensif Bab 1 s/d Bab 5 beserta lampiran kode program telah diterima oleh Majelis Penguji Sidang.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUploadNaskah} className="space-y-3.5 text-xs">
                      <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                        Unggah berkas Naskah Skripsi Final (Bab 1 s/d Bab 5 + Lampiran Kode) dalam format PDF untuk Dewan Penguji.
                      </p>

                      <input
                        type="file"
                        required
                        onChange={(e) => setNaskahFinalFile(e.target.files?.[0]?.name || "Naskah_Skripsi_Final_DanuZen.pdf")}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95"
                      >
                        <Upload className="w-4 h-4" /> Unggah Naskah Skripsi Final
                      </button>
                    </form>
                  )}
                </div>

                {/* Card 2: Rules & Guidelines */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        {activeTab === "SEMPRO" ? "Tata Tertib Presentasi Sempro" : "Prasyarat Ujian Sidang Skripsi"}
                      </h3>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium mt-3">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Memakai kemeja putih &amp; Jas Almamater UPI YPTK</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Hadir 15 menit sebelum alokasi waktu ujian</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Membawa draf naskah 3 rangkap untuk penguji</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
