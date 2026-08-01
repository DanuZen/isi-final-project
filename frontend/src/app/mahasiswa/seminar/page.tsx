"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
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
} from "lucide-react";

import { storeJadwal } from "@/lib/sipeta-store";

export default function SeminarPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

          <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ACC Seminar Proposal Disetujui
                    </span>
                    <span className="text-xs font-mono-data text-[#A0A0A0]">
                      Ref ID: SM-2026-0914
                    </span>
                  </div>
                  <h2 className="text-2xl font-black font-display text-white tracking-wide">
                    Jadwal &amp; Pelaksanaan Seminar Proposal Skripsi
                  </h2>
                  <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                    Informasi alokasi waktu seminar proposal, lokasi ruangan, dewan penguji, dan unggah revisi naskah pasca-seminar.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs">
                    <Download className="w-4 h-4 text-[#A0A0A0]" /> Berita Acara Seminar (PDF)
                  </button>
                  <Link
                    href="/mahasiswa/sidang"
                    className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                  >
                    Lanjut ke Sidang <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid Layout: Schedule & Revision Form (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column (8/12): Schedule Details & Board of Examiners */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6 h-full">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Detail Pelaksanaan Seminar Proposal
                      </h3>
                    </div>
                    {seminarExam ? (
                      <span className="px-3 py-1 text-xs font-extrabold bg-emerald-600 text-white shadow-xs rounded-full">
                        Terjadwal Resmi
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-xs font-extrabold bg-amber-500 text-white shadow-xs rounded-full">
                        Belum Ada Jadwal
                      </span>
                    )}
                  </div>

                  {seminarExam ? (
                    <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Hari &amp; Tanggal</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.hari}, {seminarExam.tglNum}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Waktu Pelaksanaan</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.waktu}</p>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                            <span className="font-bold uppercase tracking-wider text-[10px]">Ruangan Seminar</span>
                          </div>
                          <p className="font-bold text-slate-900">{seminarExam.ruang}</p>
                        </div>
                      </div>

                      {/* Examiners Table */}
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs text-slate-900 font-display flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#C62828]" /> Susunan Dewan Penguji Seminar:
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
                                <td className="py-2.5 px-3 font-bold text-[#C62828]">Ketua Penguji</td>
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
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shadow-xs">
                        <Calendar className="w-7 h-7" />
                      </div>
                      <h4 className="font-extrabold text-base font-display text-slate-900">
                        Belum Ada Jadwal Seminar Proposal
                      </h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-medium">
                        Jadwal pelaksanaan Seminar Proposal beserta susunan dewan penguji akan muncul secara otomatis di sini setelah ditetapkan oleh Sekretariat Admin Prodi.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column (4/12): Post-Seminar Revision Upload */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6 h-full">
                {/* Card 1: Upload Revisi */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-[#C62828]" />
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
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#C62828] file:text-white hover:file:bg-[#B71C1C] cursor-pointer"
                      />

                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center justify-center gap-2 shadow-xs"
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
                        <span>Memakai kemeja putih &amp; Jas Almamater UPI YPTK</span>
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
