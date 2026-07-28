"use client";

import React from "react";
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
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome & Status Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Clearing SKS &amp; Akademik Disetujui
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    Ref ID: CLR-2026-0892
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Clearing Nilai &amp; Verifikasi Prasyarat Akademik
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Verifikasi kecukupan SKS, IPK kumulatif, dan mata kuliah wajib sebagai syarat resmi memulai Tugas Akhir.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs">
                  <Download className="w-4 h-4 text-[#A0A0A0]" /> Unduh Surat Clearing (PDF)
                </button>
                <Link
                  href="/proposal"
                  className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-1.5"
                >
                  Lanjut Usulan Judul <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Academic Checklist Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Total SKS Lulus
                </p>
                <p className="text-lg font-bold text-[#1A1A1A] font-mono-data">
                  144 / 144 <span className="text-xs font-normal text-[#2F8F5B]">(Min. 138)</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  IPK Kumulatif
                </p>
                <p className="text-lg font-bold text-[#1A1A1A] font-mono-data">
                  3.65 <span className="text-xs font-normal text-[#2F8F5B]">(Min. 2.75)</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Bebas Tunggakan
                </p>
                <p className="text-xs font-bold text-[#2F8F5B] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Lunas &amp; Bebas Pustaka
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8E1] text-[#B78103] flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Verifikator Prodi
                </p>
                <p className="text-xs font-bold text-[#1A1A1A] truncate mt-1">
                  Dra. Yulia Rifa, M.Kom.
                </p>
              </div>
            </div>
          </div>

          {/* Main Layout: Prerequisite Courses Table & Submitted Documents */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols): Matakuliah Prasyarat TA */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
                  <div>
                    <h3 className="font-semibold text-sm text-[#1A1A1A] font-display">
                      Mata Kuliah Prasyarat Tugas Akhir
                    </h3>
                    <p className="text-xs text-[#616161]">
                      Mata kuliah metodologi dan keahlian inti yang wajib lulus (minimal nilai C).
                    </p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E3F3EA] text-[#2F8F5B]">
                    Semua Syarat Lulus
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAFAFA] text-[#616161] uppercase tracking-wider font-display border-b border-[#E0E0E0]">
                      <tr>
                        <th className="py-2.5 px-3">Kode MK</th>
                        <th className="py-2.5 px-3">Nama Mata Kuliah</th>
                        <th className="py-2.5 px-3">SKS</th>
                        <th className="py-2.5 px-3">Nilai</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E0E0E0] text-[#212121]">
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="py-2.5 px-3 font-mono-data font-semibold">TIF-301</td>
                        <td className="py-2.5 px-3 font-medium">Metodologi Penelitian &amp; Penulisan Ilmiah</td>
                        <td className="py-2.5 px-3 font-mono-data">3</td>
                        <td className="py-2.5 px-3 font-bold text-[#2F8F5B]">A</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F8F5B]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="py-2.5 px-3 font-mono-data font-semibold">TIF-304</td>
                        <td className="py-2.5 px-3 font-medium">Rekayasa Perangkat Lunak Lanjut</td>
                        <td className="py-2.5 px-3 font-mono-data">3</td>
                        <td className="py-2.5 px-3 font-bold text-[#2F8F5B]">A-</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F8F5B]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="py-2.5 px-3 font-mono-data font-semibold">TIF-208</td>
                        <td className="py-2.5 px-3 font-medium">Sistem Basis Data Lanjut</td>
                        <td className="py-2.5 px-3 font-mono-data">3</td>
                        <td className="py-2.5 px-3 font-bold text-[#2F8F5B]">A</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F8F5B]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#FAFAFA]">
                        <td className="py-2.5 px-3 font-mono-data font-semibold">TIF-202</td>
                        <td className="py-2.5 px-3 font-medium">Algoritma &amp; Pemrograman II</td>
                        <td className="py-2.5 px-3 font-mono-data">4</td>
                        <td className="py-2.5 px-3 font-bold text-[#2F8F5B]">B+</td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F8F5B]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Lulus
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Verified Documents, SKS Breakdown & Support Card */}
            <div className="space-y-6">
              {/* Card 1: Verified Documents */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2.5 flex items-center justify-between">
                  <span>Dokumen Persyaratan Berhasil Diverifikasi</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    2/2 Valid
                  </span>
                </h3>

                <ul className="space-y-3">
                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Transkrip Nilai Akademik Resmi</p>
                        <p className="text-[10px] font-mono-data text-slate-500">PDF • 1.2 MB</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      Terverifikasi
                    </span>
                  </li>

                  <li className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">Surat Bebas SPP &amp; Pustaka</p>
                        <p className="text-[10px] font-mono-data text-slate-500">PDF • 850 KB</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
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
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Ringkasan Kredit SKS Akademik
                </h3>

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

              {/* Card 3: Layanan Bantuan Akademik */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Layanan Bantuan Sekretariat Prodi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Jika terdapat ketidaksesuaian data transkrip nilai atau SKS yang diakui, silakan hubungi Sekretariat Prodi Teknik Informatika FIK UPI YPTK Padang.
                </p>
                <div className="p-3 bg-[#1A1A1A] text-white rounded-xl text-xs space-y-1">
                  <p className="font-bold text-[#F59E0B]">Sekretariat FIK UPI YPTK</p>
                  <p className="text-[11px] text-slate-300 font-mono-data">WA Helpdesk: +62 812-6789-0101</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
