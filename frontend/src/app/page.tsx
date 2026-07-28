"use client";

import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TaStepper } from "@/components/ui/ta-stepper";
import {
  FileText,
  CheckCircle2,
  Clock,
  UserCheck,
  PlusCircle,
  FileEdit,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Page Body */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-[#1A1A1A] via-[#252525] to-[#1A1A1A] rounded-2xl border border-[#333333] p-6 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-extrabold bg-[#2F8F5B] text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Akun Terverifikasi Akademik
                  </span>
                  <span className="text-xs font-mono-data text-[#A0A0A0]">
                    SKS: 144 / 144 • IPK: 3.65
                  </span>
                </div>
                <h2 className="text-2xl font-black font-display text-white tracking-wide">
                  Selamat Datang, Danu Zen 👋
                </h2>
                <p className="text-xs text-[#CCCCCC] max-w-2xl leading-relaxed">
                  Progres Tugas Akhir Anda saat ini berada pada tahap{" "}
                  <strong className="text-[#F59E0B]">Bimbingan Aktif</strong> dengan Dosen Pembimbing Utama &amp; Pendamping.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button className="px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-[#C62828] to-[#990000] text-white hover:from-[#B71C1C] hover:to-[#880000] transition-all shadow-md shadow-[#C62828]/20 flex items-center gap-2 active:scale-95">
                  <PlusCircle className="w-4 h-4" /> Catat Log Bimbingan
                </button>
                <button className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-[#2A2A2A] border border-[#444444] text-white hover:bg-[#333333] transition-all flex items-center gap-1.5 shadow-xs">
                  <FileEdit className="w-4 h-4 text-[#A0A0A0]" /> Ajukan Perubahan Judul
                </button>
              </div>
            </div>
          </div>

          {/* Stepper Perjalanan TA (Signature Component) */}
          <TaStepper />

          {/* Grid Layout: Active Title Card & Quick Stats (Flush Bottom Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (2 Cols): Active Judul TA & Log Thread & Calendar */}
            <div className="lg:col-span-2 flex flex-col justify-between space-y-6">
              {/* Active Judul Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#C62828]/10 text-[#C62828] flex items-center justify-center font-bold">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">
                      Judul Tugas Akhir Disetujui
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Status: Disetujui Prodi
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 leading-snug font-display">
                    &quot;Rancang Bangun Sistem Informasi Perjalanan &amp; Evaluasi Tugas Akhir (SIPETA) Berbasis Web di UPI YPTK Padang&quot;
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                    <strong className="text-slate-800">Abstrak Singkat:</strong> Penelitian ini bertujuan untuk mengoptimalkan proses pemantauan tugas akhir mahasiswa secara visual, terintegrasi notifikasi WhatsApp, serta meningkatkan transparansi alur bimbingan hingga yudisium.
                  </p>
                </div>

                {/* Metadata & Pembimbing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-[#C62828] uppercase tracking-wider font-display">
                      Pembimbing Utama (I)
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500 font-medium">
                      NIDN: 1012057301 • Kuota Terisi: 6/8
                    </p>
                  </div>

                  <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 space-y-1">
                    <p className="text-[10px] font-bold text-[#F59E0B] uppercase tracking-wider font-display">
                      Pembimbing Pendamping (II)
                    </p>
                    <p className="text-xs font-bold text-slate-900">
                      Dr. Jasmir, S.Kom., M.Kom.
                    </p>
                    <p className="text-[11px] font-mono-data text-slate-500 font-medium">
                      NIDN: 1024088002 • Kuota Terisi: 5/8
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Schedule Calendar Widget (Jadwal Bimbingan, Seminar & Sidang) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                {/* Calendar Header & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#C62828] flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Kalender Jadwal TA &amp; Sidang
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">Agustus 2026 • 4 Agenda Terjadwal</p>
                    </div>
                  </div>

                  {/* Calendar View Switcher & Month Controls */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
                      <button className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white text-slate-800 shadow-xs">
                        Bulan
                      </button>
                      <button className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800">
                        Minggu
                      </button>
                      <button className="px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-800">
                        Hari
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors font-bold">
                        &lt;
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-slate-800 font-mono-data">
                        Ags 2026
                      </span>
                      <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors font-bold">
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>

                {/* Event Legend Badges */}
                <div className="flex items-center gap-3 text-[11px] font-bold pt-1">
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Bimbingan (2)
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Seminar Proposal (1)
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> Sidang Skripsi (1)
                  </span>
                </div>

                {/* Calendar Grid Table */}
                <div className="overflow-x-auto border border-slate-200/80 rounded-xl">
                  <div className="min-w-[600px]">
                    {/* Days Header */}
                    <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200/80 text-center py-2 text-xs font-bold text-slate-600 font-display">
                      <div>Minggu</div>
                      <div>Senin</div>
                      <div>Selasa</div>
                      <div>Rabu</div>
                      <div>Kamis</div>
                      <div>Jumat</div>
                      <div>Sabtu</div>
                    </div>

                    {/* Date Grid Cells (August 2026) */}
                    <div className="grid grid-cols-7 divide-x divide-y divide-slate-200/60 text-xs">
                      {/* Empty cells for prior month padding (July 26-31) */}
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">26</div>
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">27</div>
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">28</div>
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">29</div>
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">30</div>
                      <div className="p-2 min-h-[70px] bg-slate-50/40 text-slate-300 font-mono-data">31</div>

                      {/* Aug 1 */}
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">1</div>

                      {/* Aug 2 - 8 */}
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">2</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">3</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">4</div>
                      <div className="p-2 min-h-[70px] bg-amber-50/40 font-mono-data font-bold text-slate-900 border border-amber-200/80 rounded-lg m-0.5">
                        <span>5</span>
                        <div className="mt-1 p-1 bg-amber-500 text-white rounded text-[10px] leading-tight font-sans font-bold shadow-xs">
                          09:00 • Bimbingan
                        </div>
                      </div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">6</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">7</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">8</div>

                      {/* Aug 9 - 15 */}
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">9</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">10</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">11</div>
                      <div className="p-2 min-h-[70px] bg-amber-50/40 font-mono-data font-bold text-slate-900 border border-amber-200/80 rounded-lg m-0.5">
                        <span>12</span>
                        <div className="mt-1 p-1 bg-amber-500 text-white rounded text-[10px] leading-tight font-sans font-bold shadow-xs">
                          10:30 • Review Bab 5
                        </div>
                      </div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">13</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">14</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">15</div>

                      {/* Aug 16 - 22 */}
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">16</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">17</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">18</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">19</div>
                      <div className="p-2 min-h-[70px] bg-blue-50/50 font-mono-data font-bold text-slate-900 border border-blue-200/80 rounded-lg m-0.5">
                        <span>20</span>
                        <div className="mt-1 p-1 bg-blue-600 text-white rounded text-[10px] leading-tight font-sans font-bold shadow-xs">
                          09:00 • Sempro
                        </div>
                      </div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">21</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">22</div>

                      {/* Aug 23 - 29 */}
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">23</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">24</div>
                      <div className="p-2 min-h-[70px] bg-emerald-50/50 font-mono-data font-bold text-slate-900 border border-emerald-300 rounded-lg m-0.5">
                        <span>25</span>
                        <div className="mt-1 p-1 bg-emerald-600 text-white rounded text-[10px] leading-tight font-sans font-bold shadow-xs">
                          13:00 • Sidang
                        </div>
                      </div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">26</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">27</div>
                      <div className="p-2 min-h-[70px] bg-white font-mono-data font-bold text-slate-700">28</div>
                      <div className="p-2 min-h-[70px] bg-rose-50/40 font-mono-data font-bold text-[#C62828] border border-[#C62828]/40 rounded-lg m-0.5">
                        <span className="flex items-center justify-between">
                          29
                          <span className="text-[9px] font-bold bg-[#C62828] text-white px-1 rounded">Hari Ini</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Status Cards & Info Requirements */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
              {/* Syarat ACC Seminar Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="font-bold text-sm text-slate-900 font-display border-b border-slate-100 pb-2">
                  Syarat Kelayakan ACC Seminar
                </h3>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Clearing SKS &amp; IPK</p>
                      <p className="text-[11px] text-slate-500 font-medium">Terpenuhi (144 SKS • IPK 3.65)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Minimal 5 Sesi Bimbingan</p>
                      <p className="text-[11px] text-emerald-600 font-bold">Terpenuhi (5 / 5 Sesi Recorded)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs opacity-75">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">Persetujuan (ACC) Pembimbing</p>
                      <p className="text-[11px] text-amber-600 font-bold">Menunggu Klik ACC Dosen</p>
                    </div>
                  </li>
                </ul>

                <button
                  disabled
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed text-center"
                >
                  Ajukan ACC Seminar (Terkunci)
                </button>
              </div>

              {/* Quick Info Contact Card (Stretches to match bottom baseline) */}
              <div className="bg-gradient-to-br from-[#1A1A1A] via-[#252525] to-[#1A1A1A] text-white rounded-2xl p-5 shadow-lg space-y-3 border-t-4 border-t-[#F59E0B] flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#F59E0B]" />
                    <h4 className="font-bold text-sm font-display text-white">
                      Admin Prodi Teknik Informatika
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2 font-medium">
                    Perlu bantuan seputar kuota dosen atau jadwal ruang sidang? Silakan hubungi Sekretariat Prodi Informatika UPI YPTK.
                  </p>
                </div>
                <div className="pt-2 text-xs font-mono-data text-[#F59E0B] font-bold border-t border-white/10 flex items-center justify-between">
                  <span>WA Center Prodi:</span>
                  <span>+62 812-6789-0101</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
