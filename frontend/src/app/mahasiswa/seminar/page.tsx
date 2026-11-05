"use client";

import React, { useState } from "react";
import {
  Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageBanner,
  bannerPrimaryBtn,
  bannerSecondaryBtn } from "@/components/layout/page-banner";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  FileCheck,
  Upload,
  ArrowRight,
  Download,
  FileText,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { storeJadwal } from "@/lib/final-project-store";

export default function SeminarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<"detail" | "revisi">("detail");
  const [revisiFile, setRevisiFile] = useState<string | null>(null);
  const [revisiSubmitted, setRevisiSubmitted] = useState(false);

  const [jadwalList, setJadwalList] = useState(storeJadwal.getAll());

  React.useEffect(() => {
    const sync = () => setJadwalList(storeJadwal.getAll());
    window.addEventListener("storage_sipeta", sync);
    return () => window.removeEventListener("storage_sipeta", sync);
  }, []);

  const seminarExam = jadwalList.find((j) => j.jenis === "Seminar");

  const handleUploadRevisi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisiFile) return;
    setRevisiSubmitted(true);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto scrollbar-none shell-body flex flex-col min-h-0 relative md:pt-0">
            {/* ── Welcome Banner ── */}
            <PageBanner
              badge={
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs font-display">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ACC Seminar Proposal Disetujui
                </span>
              }
              title="Jadwal & Pelaksanaan Seminar Proposal Skripsi"
              description="Informasi alokasi waktu seminar proposal, lokasi ruangan, dewan penguji, dan unggah revisi naskah pasca-seminar."
              stats={[
                { icon: FileText, value: "Proposal Ter-ACC", label: "Syarat Terpenuhi" },
                { icon: CalendarDays, value: "Jadwal Sempro", label: "SIAK Terintegrasi" },
                { icon: ShieldCheck, value: "Ref ID", label: "SM-2026-0914" },
              ]}
              actions={
                <>
                  <button className={bannerSecondaryBtn}>
                    <Download className="w-4 h-4" />
                    <span>Berita Acara Seminar (PDF)</span>
                  </button>
                  <Link
                    href="/mahasiswa/sidang"
                    className={bannerPrimaryBtn}
                  >
                    <span>Lanjut ke Sidang</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              }
            />

            {/* ── Sleek Mobile Segmented Control Tab Switcher (<1024px) ── */}
            <div className="lg:hidden flex p-1 bg-slate-200/80 rounded-xl shrink-0 gap-1 font-display border border-slate-300/60 shadow-2xs overflow-x-auto scrollbar-none whitespace-nowrap">
              <button
                onClick={() => setActiveMobileTab("detail")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "detail"
                    ? "bg-white text-[#2563eb] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Detail Seminar</span>
              </button>

              <button
                onClick={() => setActiveMobileTab("revisi")}
                className={`flex-1 min-w-[130px] py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                  activeMobileTab === "revisi"
                    ? "bg-white text-[#2563eb] shadow-xs font-extrabold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Unggah Revisi</span>
              </button>
            </div>

            {/* Grid Layout: Schedule & Revision Form (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 lg:overflow-hidden">
              {/* Left Column (8/12): Schedule Details & Board of Examiners */}
              <div className={`lg:col-span-8 flex-col justify-between space-y-4 h-auto lg:h-full min-h-0 overflow-visible lg:overflow-hidden ${activeMobileTab === "detail" ? "flex" : "hidden lg:flex"}`}>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Detail Pelaksanaan Seminar Proposal
                      </h3>
                    </div>
                    {seminarExam ? (
                      <span className="hidden sm:inline-block px-3 py-1 text-xs font-extrabold bg-emerald-600 text-white shadow-xs rounded-full font-display">
                        Terjadwal Resmi
                      </span>
                    ) : (
                      <span className="hidden sm:inline-block px-3 py-1 text-xs font-extrabold bg-amber-500 text-white shadow-xs rounded-full font-display">
                        Belum Ada Jadwal
                      </span>
                    )}
                  </div>

                  {seminarExam ? (
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Hari &amp; Tanggal</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.hari}, {seminarExam.tglNum}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-[#2563eb]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Pelaksanaan</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.waktu}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#2563eb]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Seminar</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.ruang}</p>
                        </div>
                      </div>

                      {/* Examiners Table */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#2563eb]" /> Susunan Dewan Penguji Seminar:
                        </h4>

                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200">
                              <tr>
                                <th className="py-3 px-4 font-bold">Jabatan Penguji</th>
                                <th className="py-3 px-4 font-bold">Nama Dosen Penguji</th>
                                <th className="py-3 px-4 font-bold">Status Hadir</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                              <tr>
                                <td className="py-2.5 px-3 font-bold text-[#2563eb]">Ketua Penguji</td>
                                <td className="py-2.5 px-3">Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.</td>
                                <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                              </tr>
                              <tr>
                                <td className="py-2.5 px-3 font-bold text-amber-700">Penguji Utama</td>
                                <td className="py-2.5 px-3">Dr. Yanto, S.Kom., M.Kom.</td>
                                <td className="py-2.5 px-3 text-emerald-600 font-bold">✓ Konfirmasi Hadir</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <EmptyState
                      icon={Calendar}
                      title="Belum Ada Jadwal Seminar Proposal"
                      description="Jadwal pelaksanaan Seminar Proposal beserta susunan dewan penguji akan muncul secara otomatis di sini setelah ditetapkan oleh Sekretariat Admin Prodi."
                      className="min-h-[320px]"
                    />
                  )}
                </div>
              </div>

              {/* Right Column (4/12): Post-Seminar Revision Upload */}
              <div className={`lg:col-span-4 flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden ${activeMobileTab === "revisi" ? "flex" : "hidden lg:flex"}`}>
                {/* Card 1: Upload Revisi */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#2563eb]" />
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Upload Revisi Pasca-Seminar
                      </h3>
                    </div>
                  </div>

                  {revisiSubmitted ? (
                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B]" /> Berkas Revisi Berhasil Diunggah!
                      </div>
                      <p className="text-slate-800 text-[11px] font-medium leading-relaxed">
                        Berkas naskah revisi proposal telah diterima oleh Ketua Penguji &amp; Sekretariat Prodi. Anda diizinkan melanjutkan ke persiapan Sidang Skripsi.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleUploadRevisi} className="space-y-3.5 text-xs">
                      <p className="text-slate-600 leading-relaxed text-[11px] font-medium">
                        Unggah lembar perbaikan revisi yang telah ditandatangani oleh Dosen Penguji (maksimal 14 hari kerja setelah seminar).
                      </p>

                      <input
                        type="file"
                        required
                        onChange={(e) => setRevisiFile(e.target.files?.[0]?.name || "Naskah_Revisi_Sempro.pdf")}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#2563eb] file:text-white hover:file:bg-[#1d4ed8] cursor-pointer"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all flex items-center justify-center gap-2 shadow-xs"
                      >
                        <Upload className="w-4 h-4" /> Unggah Lembar Revisi Final
                      </button>
                    </form>
                  )}
                </div>

                {/* Card 2: Tata Tertib Seminar (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-3">
                      Tata Tertib Presentasi Seminar
                    </h3>

                    <ul className="space-y-2.5 text-xs text-slate-600 font-medium mt-3">
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Memakai kemeja putih &amp; Jas Almamater PT MBOIS</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Hadir 15 menit sebelum alokasi waktu ujian</span>
                      </li>
                      <li className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0" />
                        <span>Membawa draf proposal 3 rangkap untuk penguji</span>
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
