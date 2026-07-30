"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, CalendarDays, Star, FileEdit,
  CheckCircle2, Save, Info, ArrowRight, ShieldCheck, Award
} from "lucide-react";

const NAV = [
  { label: "Dashboard Penguji", href: "/penguji/dashboard", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Jadwal Pengujian", href: "/penguji/jadwal",    icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Input Nilai",      href: "/penguji/nilai",     icon: <Award className="w-4 h-4" /> },
  { label: "Lembar Revisi",    href: "/penguji/revisi",    icon: <FileEdit className="w-4 h-4" /> },
];

const MAHASISWA_NILAI = [
  {
    nim: "20101152630045", nama: "Danu Zen", judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
    jenis: "Seminar", tanggal: "1 Agt 2026",
    komponen: [
      { label: "Penguasaan Materi & Teori", bobot: 30, nilai: 0 },
      { label: "Metodologi & Desain Sistem", bobot: 25, nilai: 0 },
      { label: "Presentasi & Sikap",          bobot: 20, nilai: 0 },
      { label: "Tanya Jawab Majelis",        bobot: 25, nilai: 0 },
    ],
  },
  {
    nim: "20101152630089", nama: "Rafi Andika", judul: "Implementasi ML untuk Deteksi Spam Email",
    jenis: "Sidang", tanggal: "3 Agt 2026",
    komponen: [
      { label: "Penguasaan Materi & Teori",  bobot: 30, nilai: 0 },
      { label: "Hasil & Kontribusi Aplikasi", bobot: 30, nilai: 0 },
      { label: "Presentasi & Sikap",          bobot: 20, nilai: 0 },
      { label: "Tanya Jawab Majelis",        bobot: 20, nilai: 0 },
    ],
  },
];

export default function PengujiNilaiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [nilaiState, setNilaiState] = useState<Record<string, number[]>>(
    Object.fromEntries(MAHASISWA_NILAI.map((m) => [m.nim, m.komponen.map(() => 0)]))
  );
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const getNilaiAkhir = (nim: string, komponen: typeof MAHASISWA_NILAI[0]["komponen"]) => {
    const vals = nilaiState[nim] ?? komponen.map(() => 0);
    return komponen.reduce((sum, k, i) => sum + (vals[i] * k.bobot) / 100, 0);
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} roleName="Dosen Penguji" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <Star className="w-3.5 h-3.5 text-white" /> Penilaian Ujian Dosen Penguji
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Form Penilaian Seminar &amp; Ujian Sidang
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Masukkan skor komponen penilaian seminar proposal dan sidang skripsi secara objektif sesuai rubrik penilaian prodi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/penguji/jadwal"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Lihat Jadwal Pengujian</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Info Note */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                Nilai yang disimpan akan langsung terakumulasi ke dalam Berita Acara Ujian. Pastikan pengisian nilai sudah final sebelum menekan tombol simpan.
              </p>
            </div>

            {/* Form list */}
            <div className="space-y-4 flex-1 min-h-0">
              {MAHASISWA_NILAI.map((mhs) => {
                const vals = nilaiState[mhs.nim] ?? mhs.komponen.map(() => 0);
                const nilaiAkhir = getNilaiAkhir(mhs.nim, mhs.komponen);
                const isSaved = saved[mhs.nim];

                return (
                  <div key={mhs.nim} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-3 flex-wrap bg-slate-50/50">
                      <div>
                        <h3 className="text-base font-black text-slate-900 font-display">{mhs.nama}</h3>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">{mhs.nim}</p>
                        <p className="text-xs text-slate-600 font-medium mt-1">&ldquo;{mhs.judul}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold font-display text-white shadow-2xs ${mhs.jenis === "Sidang" ? "bg-[#C62828]" : "bg-blue-600"}`}>
                          {mhs.jenis}
                        </span>
                        <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-full">{mhs.tanggal}</span>
                      </div>
                    </div>

                    <div className="p-5 space-y-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mhs.komponen.map((k, idx) => (
                          <div key={k.label} className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-slate-800 font-display">{k.label}</label>
                              <span className="text-[10px] font-bold text-slate-400">Bobot {k.bobot}%</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="range" min="0" max="100" step="1"
                                value={vals[idx]}
                                disabled={isSaved}
                                onChange={(e) => {
                                  const newVals = [...vals];
                                  newVals[idx] = Number(e.target.value);
                                  setNilaiState((prev) => ({ ...prev, [mhs.nim]: newVals }));
                                }}
                                className="flex-1 accent-[#C62828]"
                              />
                              <div className="w-12 h-9 rounded-xl border-2 border-slate-200 bg-white flex items-center justify-center font-display">
                                <span className="text-sm font-black text-slate-900">{vals[idx]}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 flex-wrap gap-3">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Kalkulasi Nilai Akhir</p>
                          <p className="text-3xl font-black font-display mt-0.5" style={{ color: nilaiAkhir >= 70 ? "#059669" : nilaiAkhir >= 60 ? "#b45309" : "#C62828" }}>
                            {nilaiAkhir.toFixed(1)}
                          </p>
                        </div>

                        {isSaved ? (
                          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs font-bold">Tersimpan di Sistem</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSaved((prev) => ({ ...prev, [mhs.nim]: true }))}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C62828] text-white text-xs font-bold hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                          >
                            <Save className="w-4 h-4" /> Simpan Nilai Final
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
