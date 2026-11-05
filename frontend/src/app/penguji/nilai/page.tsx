"use client";

import React, { useState } from "react";
import {
  Sidebar,
  DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { PageBanner, bannerPrimaryBtn, bannerSecondaryBtn } from "@/components/layout/page-banner";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  Star,
  FileEdit,
  CheckCircle2,
  Save,
  Info,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Search,
  Filter,
  Sparkles,
  X,
  UserCheck,
  ChevronDown,
  Check,
} from "lucide-react";

interface KomponenNilai {
  label: string;
  bobot: number;
}

interface MahasiswaNilaiItem {
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  jenis: "Seminar" | "Sidang";
  tanggal: string;
  ruang: string;
  komponen: KomponenNilai[];
}

const MAHASISWA_NILAI: MahasiswaNilaiItem[] = [
  {
    nim: "20101152630045", nama: "Danu Zen", prodi: "Teknik Informatika",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web Berbasis Real-Time Data",
    jenis: "Seminar", tanggal: "1 Agt 2026", ruang: "Ruang 302",
    komponen: [
      { label: "Penguasaan Materi & Teori", bobot: 30 },
      { label: "Metodologi & Desain Sistem", bobot: 25 },
      { label: "Presentasi & Sikap",          bobot: 20 },
      { label: "Tanya Jawab Majelis",        bobot: 25 },
    ],
  },
  {
    nim: "20101152630089", nama: "Rafi Andika", prodi: "Teknik Informatika",
    judul: "Implementasi Machine Learning untuk Deteksi Spam Email Menggunakan Naive Bayes",
    jenis: "Sidang", tanggal: "3 Agt 2026", ruang: "Aula FIK",
    komponen: [
      { label: "Penguasaan Materi & Teori",  bobot: 30 },
      { label: "Hasil & Kontribusi Aplikasi", bobot: 30 },
      { label: "Presentasi & Sikap",          bobot: 20 },
      { label: "Tanya Jawab Majelis",        bobot: 20 },
    ],
  },
  {
    nim: "20101152630101", nama: "Siti Rahayu", prodi: "Sistem Informasi",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer Menggunakan Dijkstra",
    jenis: "Seminar", tanggal: "5 Agt 2026", ruang: "Ruang Dosen FIK",
    komponen: [
      { label: "Penguasaan Materi & Teori", bobot: 30 },
      { label: "Metodologi & Desain Sistem", bobot: 25 },
      { label: "Presentasi & Sikap",          bobot: 20 },
      { label: "Tanya Jawab Majelis",        bobot: 25 },
    ],
  },
  {
    nim: "20101152630022", nama: "Budi Prasetyo", prodi: "Teknik Informatika",
    judul: "Pengembangan Aplikasi Mobile Absensi Mahasiswa Berbasis Geolocation",
    jenis: "Sidang", tanggal: "8 Agt 2026", ruang: "Aula FIK",
    komponen: [
      { label: "Penguasaan Materi & Teori",  bobot: 30 },
      { label: "Hasil & Kontribusi Aplikasi", bobot: 30 },
      { label: "Presentasi & Sikap",          bobot: 20 },
      { label: "Tanya Jawab Majelis",        bobot: 20 },
    ],
  },
];

export default function PengujiNilaiPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedNim, setSelectedNim] = useState<string>("20101152630045");
  const [search, setSearch] = useState("");
  const [filterJenis, setFilterJenis] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<"list" | "form">("list");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scores state: Record<nim, number[]>
  const [nilaiState, setNilaiState] = useState<Record<string, number[]>>({
    "20101152630045": [85, 80, 90, 85],
    "20101152630089": [88, 85, 92, 88],
    "20101152630101": [0, 0, 0, 0],
    "20101152630022": [0, 0, 0, 0],
  });

  // Catatan penguji state
  const [catatanState, setCatatanState] = useState<Record<string, string>>({
    "20101152630045": "Perjelas arsitektur database di bab 3 dan lampirkan sertifikat pengujian sistem.",
    "20101152630089": "Tambahkan confusion matrix pada hasil analisis klasifikasi spam.",
  });

  // Saved state
  const [saved, setSaved] = useState<Record<string, boolean>>({
    "20101152630045": true,
    "20101152630089": true,
  });

  const selectedMhs = MAHASISWA_NILAI.find((m) => m.nim === selectedNim) || MAHASISWA_NILAI[0];

  const filteredMhs = MAHASISWA_NILAI.filter((m) => {
    const matchSearch = m.nama.toLowerCase().includes(search.toLowerCase()) || m.nim.includes(search);
    const matchFilter = filterJenis === "Semua" || m.jenis === filterJenis;
    return matchSearch && matchFilter;
  });

  const getNilaiAkhir = (nim: string, komponen: KomponenNilai[]) => {
    const vals = nilaiState[nim] ?? komponen.map(() => 0);
    return komponen.reduce((sum, k, i) => sum + ((vals[i] || 0) * k.bobot) / 100, 0);
  };

  const getHurufMutu = (skor: number) => {
    if (skor >= 85) return { grade: "A", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (skor >= 80) return { grade: "A-", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (skor >= 75) return { grade: "B+", color: "text-blue-600", bg: "bg-blue-100" };
    if (skor >= 70) return { grade: "B", color: "text-blue-600", bg: "bg-blue-100" };
    if (skor >= 65) return { grade: "B-", color: "text-amber-600", bg: "bg-amber-100" };
    if (skor >= 60) return { grade: "C+", color: "text-amber-600", bg: "bg-amber-100" };
    return { grade: "E", color: "text-red-600", bg: "bg-red-100" };
  };

  const handleSaveScore = (nim: string, nama: string) => {
    setSaved((prev) => ({ ...prev, [nim]: true }));
    setToastMessage(`Nilai pengujian ${nama} berhasil DISIMPAN dan dikunci!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Ahmad Fauzi, M.T." userNim="NIDN: 1012345678" userRole="Dosen Penguji" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

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
              title="Input Nilai Ujian Sidang & Seminar"
              description="Pengisian nilai komponen ujian sidang dan seminar proposal secara digital berbasis rubrik penilaian standar universitas."
              stats={[
                { icon: Award, value: "Rubrik OBE", label: "Skala 0-100" },
                { icon: CheckCircle2, value: "Kalkulasi Otomatis", label: "Bobot Nilai" },
                { icon: ShieldCheck, value: "Tanda Tangan Digital", label: "Berita Acara" },
              ]}
              actions={
                <Link
                  href="/penguji/revisi"
                  className={bannerPrimaryBtn}
                >
                  <span>Verifikasi Revisi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              }
            />

            {/* ── Split 2-Column Layout (5/12 & 7/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* ── LEFT COLUMN (5/12): Student Teruji List Card Container ── */}
              <div className={`lg:col-span-5 flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden ${
                activeMobileTab === "list" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Header + Search + Filter */}
                <div className="p-4 border-b border-slate-100 space-y-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Mahasiswa Teruji</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Pilih mahasiswa untuk menginput nilai</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1 min-w-0">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text" placeholder="Cari nama / NIM..."
                        value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-[11px] bg-slate-50 focus:outline-none focus:border-[#2563eb] transition-all font-medium"
                      />
                    </div>

                    {/* Custom Animated Dropdown Filter */}
                    <div className="relative shrink-0 font-display">
                      <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className="flex items-center justify-between gap-2.5 px-4 py-2 min-w-[125px] rounded-xl border border-slate-200 text-xs bg-slate-50 hover:bg-slate-100 font-bold text-slate-700 transition-all cursor-pointer whitespace-nowrap font-display shadow-2xs"
                      >
                        <div className="flex items-center gap-2">
                          <Filter className="w-3.5 h-3.5 text-[#2563eb]" />
                          <span>{filterJenis}</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      {isFilterOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                          <div className="absolute right-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 min-w-[130px] space-y-0.5 font-display animate-in fade-in zoom-in-95 duration-150">
                            {["Semua", "Seminar", "Sidang"].map((f) => (
                              <button
                                key={f}
                                onClick={() => {
                                  setFilterJenis(f);
                                  setIsFilterOpen(false);
                                }}
                                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                                  filterJenis === f ? "bg-[#2563eb] text-white" : "text-slate-700 hover:bg-slate-100"
                                }`}
                              >
                                <span>{f}</span>
                                {filterJenis === f && <Check className="w-3.5 h-3.5 text-white" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Scrollable Student List */}
                <div className="flex-1 overflow-y-auto scrollbar-none p-3 space-y-2.5 flex flex-col">
                  {filteredMhs.length === 0 ? (
                    <EmptyState
                      icon={UserCheck}
                      title="Tidak Ada Mahasiswa Ditemukan"
                      description="Gunakan pencarian nama atau NIM untuk menemukan mahasiswa pengujian."
                    />
                  ) : (
                    filteredMhs.map((m) => {
                      const isSelected = selectedMhs && selectedMhs.nim === m.nim;
                      const isSavedMhs = saved[m.nim];
                      const skor = getNilaiAkhir(m.nim, m.komponen);

                      return (
                        <div
                          key={m.nim}
                          onClick={() => {
                            setSelectedNim(m.nim);
                            setActiveMobileTab("form");
                          }}
                          className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50/60 hover:border-slate-300 transition-all cursor-pointer space-y-2"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#991B1B] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs font-display">
                                {m.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-black text-slate-900 font-display truncate">{m.nama}</p>
                                <p className="text-[10px] text-slate-500 font-mono font-medium">{m.nim}</p>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold shadow-2xs font-display text-white shrink-0 ${
                              m.jenis === "Sidang" ? "bg-[#2563eb]" : "bg-blue-600"
                            }`}>
                              {m.jenis}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-600 font-medium truncate">&ldquo;{m.judul}&rdquo;</p>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[10px]">
                            <span className="text-slate-400 font-medium">{m.tanggal} · {m.ruang}</span>
                            {isSavedMhs ? (
                              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md font-display flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Nilai: {skor.toFixed(1)}
                              </span>
                            ) : (
                              <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md font-display">
                                Belum Dinilai
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* ── RIGHT COLUMN (7/12): Form Rubrik Penilaian Card Container ── */}
              <div className={`lg:col-span-7 flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden ${
                activeMobileTab === "form" ? "flex" : "hidden lg:flex"
              }`}>
                {/* Card Header Detail */}
                <div className="p-3.5 sm:p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50 gap-2">
                  {/* Mobile Back Button (ONLY on Mobile) */}
                  <button
                    onClick={() => setActiveMobileTab("list")}
                    className="lg:hidden p-1.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 text-xs font-bold font-display shadow-2xs active:scale-95"
                    title="Kembali ke Daftar Mahasiswa"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-[#2563eb]" />
                    <span>Kembali</span>
                  </button>

                  {/* Desktop Title & Icon (Hidden on Mobile) */}
                  <div className="hidden lg:flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-bold text-sm text-slate-900 font-display">Form Rubrik Penilaian Ujian</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Input angka skor 0 - 100 per komponen rubrik</p>
                    </div>
                  </div>

                  {/* NIM Badge (Always on Right) */}
                  {selectedMhs && (
                    <span className="text-[10px] sm:text-[10.5px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700 shrink-0">
                      {selectedMhs.nim}
                    </span>
                  )}
                </div>

                {/* Content Area Detail */}
                {selectedMhs ? (
                  <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
                    {/* Student Info Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-rose-50/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9.5px] font-bold shadow-2xs font-display text-white ${
                          selectedMhs.jenis === "Sidang" ? "bg-[#2563eb]" : "bg-blue-600"
                        }`}>
                          {selectedMhs.jenis} Tugas Akhir
                        </span>
                        <span className="text-xs font-bold text-slate-700 font-display">{selectedMhs.tanggal} ({selectedMhs.ruang})</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 font-display leading-tight">{selectedMhs.nama}</h3>
                      <p className="text-xs text-slate-500 font-medium">{selectedMhs.prodi} · NIM: <span className="font-mono">{selectedMhs.nim}</span></p>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed font-display pt-1 border-t border-slate-200/60">
                        &ldquo;{selectedMhs.judul}&rdquo;
                      </p>
                    </div>

                    {/* Rubrik Form Inputs */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Komponen Penilaian Rubrik</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedMhs.komponen.map((k, idx) => {
                          const currentVals = nilaiState[selectedMhs.nim] ?? selectedMhs.komponen.map(() => 0);
                          const val = currentVals[idx] || 0;
                          const isSavedCur = saved[selectedMhs.nim];

                          return (
                            <div key={k.label} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 space-y-2 shadow-2xs">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-800 font-display">{k.label}</label>
                                <span className="text-[9.5px] font-bold text-slate-900 bg-slate-200 px-2 py-0.5 rounded-md font-mono">
                                  Bobot {k.bobot}%
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <input
                                  type="range" min="0" max="100" step="1"
                                  value={val}
                                  disabled={isSavedCur}
                                  onChange={(e) => {
                                    const next = [...currentVals];
                                    next[idx] = Number(e.target.value);
                                    setNilaiState((prev) => ({ ...prev, [selectedMhs.nim]: next }));
                                  }}
                                  className="flex-1 accent-[#2563eb] cursor-pointer"
                                />

                                <input
                                  type="number" min="0" max="100"
                                  value={val}
                                  disabled={isSavedCur}
                                  onChange={(e) => {
                                    const next = [...currentVals];
                                    next[idx] = Math.min(100, Math.max(0, Number(e.target.value)));
                                    setNilaiState((prev) => ({ ...prev, [selectedMhs.nim]: next }));
                                  }}
                                  className="w-14 h-9 rounded-xl border-2 border-slate-200 bg-white text-center font-black text-sm text-slate-900 focus:outline-none focus:border-[#2563eb] font-display"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Catatan / Masukan Field */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Catatan Revisi</span>
                      <textarea
                        rows={2}
                        disabled={saved[selectedMhs.nim]}
                        placeholder="Catatan atau masukan revisi penguji..."
                        value={catatanState[selectedMhs.nim] || ""}
                        onChange={(e) => setCatatanState((prev) => ({ ...prev, [selectedMhs.nim]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 font-medium focus:outline-none focus:border-[#2563eb] transition-all resize-none shadow-2xs"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-2">
                    <Award className="w-8 h-8 text-slate-300" />
                    <p className="text-xs font-bold text-slate-700 font-display">Pilih mahasiswa untuk menginput nilai</p>
                  </div>
                )}

                {/* Score Summary & Action Panel */}
                {selectedMhs && (() => {
                  const finalScore = getNilaiAkhir(selectedMhs.nim, selectedMhs.komponen);
                  const mutu = getHurufMutu(finalScore);
                  const isSavedMhs = saved[selectedMhs.nim];

                  return (
                    <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0">
                      <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs gap-3">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display truncate">Kalkulasi Skor Akhir</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xl sm:text-2xl font-black font-display text-slate-900">{finalScore.toFixed(1)}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md font-display shrink-0 ${mutu.bg} ${mutu.color}`}>
                              Grade: {mutu.grade}
                            </span>
                          </div>
                        </div>

                        {isSavedMhs ? (
                          <div className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 text-white shadow-2xs font-display shrink-0 whitespace-nowrap">
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                            <span className="text-xs font-bold">Simpan</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSaveScore(selectedMhs.nim, selectedMhs.nama)}
                            className="px-4 py-2.5 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-bold transition-all active:scale-95 shadow-xs flex items-center gap-1.5 font-display cursor-pointer shrink-0 whitespace-nowrap"
                          >
                            <Save className="w-4 h-4 text-white shrink-0" />
                            <span>Simpan</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
