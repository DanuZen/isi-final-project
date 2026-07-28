"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Sparkles,
  BookOpen,
  UserCheck,
  ShieldCheck,
} from "lucide-react";

export default function StatusTamatYudisiumPage() {

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Congratulations Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> LULUS &amp; YUDISIUM RESMI
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    No. SK: 891/SK-YUD/FIK/2026
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Selamat! Danu Zen, S.Kom. 🎉
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Anda telah menyelesaikan seluruh rangkaian Perjalanan Tugas Akhir di Program Studi Teknik Informatika, Fakultas Ilmu Komputer UPI YPTK Padang dengan predikat <strong className="text-[#FFC107]">Dengan Pujian (Cum Laude)</strong>.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Unduh Surat Keterangan Lulus (SKL)
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Nilai Akhir Skripsi
                </p>
                <p className="text-lg font-bold text-[#1A1A1A] font-mono-data">
                  88.5 <span className="text-xs font-extrabold text-[#2F8F5B]">(Grade A)</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  IPK Kelulusan Final
                </p>
                <p className="text-lg font-bold text-[#1A1A1A] font-mono-data">
                  3.65 <span className="text-xs font-extrabold text-[#FFC107]">(Cum Laude)</span>
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Total SKS Lulus
                </p>
                <p className="text-lg font-bold text-[#1A1A1A] font-mono-data">
                  144 SKS
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#E0E0E0] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E3F3EA] text-[#2F8F5B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#616161] font-display">
                  Bebas Pustaka &amp; Lab
                </p>
                <p className="text-xs font-bold text-[#2F8F5B] mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi Final
                </p>
              </div>
            </div>
          </div>

          {/* Downloadable Final Graduation Documents Cards */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Berkas Pengesahan Final &amp; Kelulusan Wisuda</span>
              <span className="text-xs font-mono-data text-emerald-600 font-bold">✓ 3 Berkas Siap Diunduh</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-900">Lembar Pengesahan Skripsi (PDF)</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Telah ditandatangani oleh Dosen Pembimbing, Penguji, dan Dekan FIK UPI YPTK.
                </p>
                <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                  <Download className="w-3.5 h-3.5 text-[#C62828]" /> Unduh Berkas Pengesahan
                </button>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-900">Surat Keterangan Lulus (SKL)</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Surat pengantar resmi ijazah &amp; transkrip nilai sementara untuk keperluan melamar kerja.
                </p>
                <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                  <Download className="w-3.5 h-3.5 text-[#C62828]" /> Unduh SKL Resmiah (PDF)
                </button>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/60 space-y-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="font-bold text-xs text-slate-900">Bebas Perpustakaan &amp; Lab</p>
                </div>
                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                  Bukti penyerahan hardcopy jilid luks &amp; CD repositori perpustakaan FIK UPI YPTK.
                </p>
                <button className="w-full py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-xs">
                  <Download className="w-3.5 h-3.5 text-emerald-600" /> Unduh Bukti Bebas
                </button>
              </div>
            </div>
          </div>

          {/* Main Grid: Detailed Score Breakdown & Milestone Completion History (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Score Breakdown & Timeline */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              {/* Card 1: Rincian Penilaian Evaluasi Skripsi */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                      <Award className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Rincian Evaluasi Nilai Ujian Skripsi
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Nilai Akhir: 88.5 (Grade A)
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider font-display border-b border-slate-200/80">
                      <tr>
                        <th className="py-2.5 px-3">Komponen Penilaian</th>
                        <th className="py-2.5 px-3 text-center">Bobot</th>
                        <th className="py-2.5 px-3 text-center">Nilai Angka</th>
                        <th className="py-2.5 px-3 text-center">Grade</th>
                        <th className="py-2.5 px-3 text-right">Nilai Akhir</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800">
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          Draft &amp; Kedalaman Analisis Naskah Skripsi
                        </td>
                        <td className="py-3 px-3 text-center font-mono-data font-semibold text-slate-500">25%</td>
                        <td className="py-3 px-3 text-center font-mono-data font-bold text-slate-900">90.0</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">A</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono-data font-bold text-slate-900">22.50</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          Penguasaan Sistem, Coding &amp; Unsur Inovasi
                        </td>
                        <td className="py-3 px-3 text-center font-mono-data font-semibold text-slate-500">35%</td>
                        <td className="py-3 px-3 text-center font-mono-data font-bold text-slate-900">88.0</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">A</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono-data font-bold text-slate-900">30.80</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          Presentasi &amp; Tanya Jawab Majelis Penguji
                        </td>
                        <td className="py-3 px-3 text-center font-mono-data font-semibold text-slate-500">25%</td>
                        <td className="py-3 px-3 text-center font-mono-data font-bold text-slate-900">87.5</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">A</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono-data font-bold text-slate-900">21.88</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-bold text-slate-900">
                          Kedisiplinan &amp; Kehadiran Bimbingan
                        </td>
                        <td className="py-3 px-3 text-center font-mono-data font-semibold text-slate-500">15%</td>
                        <td className="py-3 px-3 text-center font-mono-data font-bold text-slate-900">90.0</td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">A</span>
                        </td>
                        <td className="py-3 px-3 text-right font-mono-data font-bold text-slate-900">13.50</td>
                      </tr>
                    </tbody>
                    <tfoot className="bg-slate-50 border-t border-slate-200 font-bold">
                      <tr>
                        <td colSpan={4} className="py-3 px-3 text-slate-900 font-display">Total Nilai Terakumulasi Skripsi:</td>
                        <td className="py-3 px-3 text-right font-mono-data text-sm text-[#C62828]">88.5 (Grade A)</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Card 2: Milestone History Perjalanan TA */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Rekam Jejak Milestone Perjalanan Tugas Akhir
                </h3>

                <div className="space-y-4 text-xs relative pl-6 border-l-2 border-emerald-500 ml-3">
                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">15 Januari 2026 • Usulan Judul Disetujui Prodi</p>
                    <p className="text-slate-500 text-[11px]">Judul TA disetujui &amp; bebas dari plagiarisme (&lt; 25% similarity).</p>
                  </div>

                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">28 Maret 2026 • Dosen Pembimbing Resmi Ditetapkan</p>
                    <p className="text-slate-500 text-[11px]">Dr. Eng. H. Sarjon Defit (Pembimbing I) &amp; Dr. Jasmir (Pembimbing II).</p>
                  </div>

                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">24 Juli 2026 • Selesai 5 Sesi Bimbingan Rutin</p>
                    <p className="text-slate-500 text-[11px]">Thread bimbingan Bab 1 s/d Bab 3 disetujui penuh oleh pembimbing.</p>
                  </div>

                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">20 Agustus 2026 • Lulus Ujian Seminar Proposal</p>
                    <p className="text-slate-500 text-[11px]">Presentasi sempro di Ruang 302 FIK diterima dewan penguji.</p>
                  </div>

                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">25 September 2026 • Lulus Ujian Sidang Skripsi (Nilai 88.5)</p>
                    <p className="text-slate-500 text-[11px]">Ujian komprehensif di Aula FIK dinyatakan LULUS Sempurna (Grade A).</p>
                  </div>

                  <div className="relative">
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white absolute -left-[31px] top-0.5 shadow-xs" />
                    <p className="font-bold text-slate-900 text-xs">28 September 2026 • Penetapan SK Yudisium &amp; SKL Terbit</p>
                    <p className="text-slate-500 text-[11px]">No. SK: 891/SK-YUD/FIK/2026 • Resmi menyandang gelar S.Kom.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Wisuda Info & Graduation Instructions (Stretches to match bottom baseline) */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Card 1: Informasi Pendaftaran Wisuda Periode 2026 */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#C62828]" />
                  Informasi Wisuda Ke-78 UPI YPTK
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-200/60 space-y-1">
                    <p className="font-bold text-[#C62828]">Pelaksanaan Wisuda:</p>
                    <p className="font-extrabold text-slate-900 text-sm font-display">Kamis, 15 Oktober 2026</p>
                    <p className="text-[11px] text-slate-600 font-medium">Lokasi: UPI YPTK Convention Center (UCC)</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="font-bold text-slate-800">Batas Akhir Registrasi Wisuda:</p>
                    <p className="text-slate-600 font-mono-data font-semibold">10 Oktober 2026 (Pukul 17:00 WIB)</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="font-bold text-slate-800">Pengambilan Toga &amp; Undangan:</p>
                    <p className="text-slate-600 font-medium">Gedung Rektorat Lantai 2 (Mulai 12 Okt 2026)</p>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all text-center block shadow-md shadow-[#C62828]/20">
                  Daftar Wisuda Online →
                </button>
              </div>

              {/* Card 2: Kontak Sekretariat Yudisium (Stretches to match bottom baseline) */}
              <div className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] text-white rounded-2xl p-5 shadow-lg space-y-3 border-t-4 border-t-[#F59E0B] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#F59E0B]" />
                    <h4 className="font-bold text-sm font-display text-white">
                      Sekretariat Yudisium FIK
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                    Pertanyaan seputar pencetakan Ijazah fisik, Transkrip Asli, atau legalisir berkas wisuda dapat dikonfirmasi ke Sekretariat FIK.
                  </p>
                </div>
                <div className="pt-2 text-xs font-mono-data text-[#F59E0B] font-bold border-t border-white/10 flex items-center justify-between">
                  <span>Layanan Ijazah:</span>
                  <span>+62 812-9900-1122</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
