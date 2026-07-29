"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Download,
  ArrowRight,
  BookOpen,
  UserCheck,
  AlertCircle,
  Award,
} from "lucide-react";

export default function ClearingNilaiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" />

          <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Clearing SKS &amp; Akademik Disetujui
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Clearing Nilai &amp; Verifikasi Prasyarat Akademik
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Verifikasi kecukupan SKS, IPK kumulatif, dan mata kuliah wajib sebagai syarat resmi mahasiswa UPI YPTK Padang memulai Tugas Akhir.
                  </p>
                </div>

                {/* Right: quick action buttons */}
                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <button className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 transition-all active:scale-95 shadow-xs">
                    <Download className="w-4 h-4 text-neutral-400" />
                    <span>Unduh Surat Clearing (PDF)</span>
                  </button>
                  <Link
                    href="/proposal"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                  >
                    <span>Lanjut Usulan Judul</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Academic Checklist Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-display">
                    Total SKS Lulus
                  </p>
                  <p className="text-lg font-bold text-slate-900 font-mono-data">
                    144 / 144 <span className="text-xs font-bold text-emerald-600">(Min. 138)</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-display">
                    IPK Kumulatif
                  </p>
                  <p className="text-lg font-bold text-slate-900 font-mono-data">
                    3.65 <span className="text-xs font-bold text-emerald-600">(Min. 2.75)</span>
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-display">
                    Bebas Tunggakan
                  </p>
                  <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Lunas &amp; Bebas Pustaka
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-display">
                    Verifikator Prodi
                  </p>
                  <p className="text-xs font-bold text-slate-900 truncate mt-1">
                    Dra. Yulia Rifa, M.Kom.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Layout: Prerequisite Courses Table & Submitted Documents (Flush Bottom Aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column (8/12): Matakuliah Prasyarat TA */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6 h-full">
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 font-display">
                            Mata Kuliah Prasyarat Tugas Akhir
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Mata kuliah metodologi dan keahlian inti yang wajib lulus (minimal nilai C).
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                        Semua Syarat Lulus
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-display border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-4 font-bold">Kode MK</th>
                            <th className="py-3 px-4 font-bold">Nama Mata Kuliah</th>
                            <th className="py-3 px-4 font-bold">SKS</th>
                            <th className="py-3 px-4 font-bold">Nilai</th>
                            <th className="py-3 px-4 font-bold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-mono-data font-bold">TIF-301</td>
                            <td className="py-3 px-4 font-bold text-slate-900">Metodologi Penelitian &amp; Penulisan Ilmiah</td>
                            <td className="py-3 px-4 font-mono-data">3</td>
                            <td className="py-3 px-4 font-bold text-emerald-600">A</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-mono-data font-bold">TIF-304</td>
                            <td className="py-3 px-4 font-bold text-slate-900">Rekayasa Perangkat Lunak Lanjut</td>
                            <td className="py-3 px-4 font-mono-data">3</td>
                            <td className="py-3 px-4 font-bold text-emerald-600">A-</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-mono-data font-bold">TIF-208</td>
                            <td className="py-3 px-4 font-bold text-slate-900">Sistem Basis Data Lanjut</td>
                            <td className="py-3 px-4 font-mono-data">3</td>
                            <td className="py-3 px-4 font-bold text-emerald-600">A</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                              </span>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-mono-data font-bold">TIF-202</td>
                            <td className="py-3 px-4 font-bold text-slate-900">Algoritma &amp; Pemrograman II</td>
                            <td className="py-3 px-4 font-mono-data">4</td>
                            <td className="py-3 px-4 font-bold text-emerald-600">B+</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Verified Documents, SKS Breakdown & Support Card */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6 h-full">
                {/* Card 1: Verified Documents */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Dokumen Persyaratan
                      </h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                      2/2 Valid
                    </span>
                  </div>

                  <ul className="space-y-3">
                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-[#C62828] flex items-center justify-center font-bold shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Transkrip Nilai Akademik Resmi</p>
                          <p className="text-[10px] font-mono-data text-slate-500">PDF • 1.2 MB</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded-full shadow-xs">
                        Terverifikasi
                      </span>
                    </li>

                    <li className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-50 border border-rose-200 text-[#C62828] flex items-center justify-center font-bold shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Surat Bebas SPP &amp; Pustaka</p>
                          <p className="text-[10px] font-mono-data text-slate-500">PDF • 850 KB</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-emerald-600 text-white rounded-full shadow-xs">
                        Terverifikasi
                      </span>
                    </li>
                  </ul>

                  <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start gap-2.5 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <p className="text-slate-800 leading-relaxed text-[11px] font-medium">
                      <strong>Catatan Admin Akademik:</strong> Mahasiswa telah memenuhi seluruh prasyarat SKS dan bebas administrasi keuangan. Akun Tugas Akhir telah diaktifkan secara otomatis.
                    </p>
                  </div>
                </div>

                {/* Card 2: IPK & SKS Distribution Summary */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Ringkasan Kredit SKS Akademik
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="font-medium text-slate-700">Mata Kuliah Wajib (Teori &amp; Praktikum)</span>
                      <span className="font-bold font-mono-data text-slate-900">120 SKS</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="font-medium text-slate-700">Mata Kuliah Pilihan / Konsentrasi</span>
                      <span className="font-bold font-mono-data text-slate-900">18 SKS</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="font-medium text-slate-700">Kuliah Kerja Nyata (KKN) &amp; PKL</span>
                      <span className="font-bold font-mono-data text-slate-900">6 SKS</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: Layanan Bantuan Akademik (Stretches to match bottom baseline) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <UserCheck className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Layanan Bantuan Sekretariat Prodi
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium mt-2">
                      Jika terdapat ketidaksesuaian data transkrip nilai atau SKS yang diakui, silakan hubungi Sekretariat Prodi UPI YPTK Padang.
                    </p>
                  </div>
                  <div className="p-3 bg-[#1A1A1A] text-white rounded-xl text-xs space-y-1">
                    <p className="font-bold text-[#F59E0B]">Sekretariat Prodi UPI YPTK</p>
                    <p className="text-[11px] text-slate-300 font-mono-data">WA Helpdesk: +62 812-6789-0101</p>
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
