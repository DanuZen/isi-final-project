"use client";

import React, { useState } from "react";
import { Sidebar, DOSEN_NAV_ITEMS } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { EmptyState } from "@/components/EmptyState";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserCheck, CalendarDays,
  CheckCircle2, XCircle, Clock, ArrowRight,
  ShieldCheck, AlertCircle, Sparkles, X, History as HistoryIcon, FileText
} from "lucide-react";

interface PengajuanItem {
  nim: string;
  nama: string;
  prodi: string;
  judul: string;
  bidang: string;
  tgl: string;
  pembimbing2: string;
  alasan: string;
}

const INITIAL_PENGAJUAN: Array<PengajuanItem> = [];
const INITIAL_RIWAYAT: Array<{ nim: string; nama: string; judul: string; tgl: string; aksi: string }> = [];

import { storePembimbing } from "@/lib/sipeta-store";
import { useToast } from "@/components/ui/toast";

export default function DosenPengajuanPage() {
  const { showToast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMobileTab, setActiveMobileTab] = useState<"permohonan" | "detail" | "riwayat">("permohonan");
  const [pengajuanList, setPengajuanList] = useState<Array<PengajuanItem>>([]);
  const [selectedNim, setSelectedNim] = useState<string>("");
  const [riwayatList, setRiwayatList] = useState<Array<{ nim: string; nama: string; judul: string; tgl: string; aksi: string }>>([]);

  const syncData = React.useCallback(() => {
    const stored = storePembimbing.getAll();
    const pending = stored
      .filter((s) => s.status === "MENUNGGU")
      .map((s) => ({
        id: s.id,
        nim: s.studentNim,
        nama: s.studentNama,
        prodi: s.prodi,
        judul: s.judul,
        bidang: s.bidang,
        tgl: s.tgl,
        pembimbing2: "Dosen Pendamping Prodi",
        alasan: s.alasan,
      }));

    const history = stored
      .filter((s) => s.status !== "MENUNGGU")
      .map((s) => ({
        nim: s.studentNim,
        nama: s.studentNama,
        judul: s.judul,
        tgl: s.tgl,
        aksi: s.status === "DITERIMA" ? "Diterima" : "Ditolak",
      }));

    setPengajuanList(pending);
    setRiwayatList(history);
    if (pending.length > 0 && !selectedNim) {
      setSelectedNim(pending[0].nim);
    }
  }, [selectedNim]);

  React.useEffect(() => {
    syncData();
    window.addEventListener("storage_sipeta", syncData);
    return () => window.removeEventListener("storage_sipeta", syncData);
  }, [syncData]);

  const selectedMhs = pengajuanList.find((p) => p.nim === selectedNim) || pengajuanList[0];

  const handleDecision = (item: PengajuanItem & { id?: string }, status: "Diterima" | "Ditolak") => {
    if (item.id) {
      storePembimbing.updateStatus(item.id, status === "Diterima" ? "DITERIMA" : "DITOLAK");
    }

    const remaining = pengajuanList.filter((p) => p.nim !== item.nim);
    setPengajuanList(remaining);
    
    if (remaining.length > 0) {
      setSelectedNim(remaining[0].nim);
    }

    if (status === "Diterima") {
      showToast("Permohonan Disetujui!", `Permohonan ${item.nama} (${item.nim}) berhasil DITERIMA sebagai mahasiswa bimbingan!`, "success");
    } else {
      showToast("Permohonan Ditolak", `Permohonan ${item.nama} (${item.nim}) telah DITOLAK.`, "warning");
    }
  };

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={DOSEN_NAV_ITEMS} roleName="Dosen" />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Dr. Sarjon Defit" userNim="NIDN: 1012057301" userRole="Dosen Pembimbing" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0 relative">
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#ffd01d] text-slate-950 shadow-xs">
                      <UserCheck className="w-3.5 h-3.5 text-slate-950" /> {pengajuanList.length} Permohonan Pembimbing Menunggu Tinjauan
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Permohonan Pembimbing Masuk
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Tinjau rincian proposal, topik skripsi, serta alasan mahasiswa memilih Anda sebagai Dosen Pembimbing I.
                  </p>
                </div>

                <div className="hidden md:flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/dosen/bimbingan"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40 transition-all active:scale-95 cursor-pointer"
                  >
                    <span>Lihat Mahasiswa Bimbingan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Mobile Segmented Control Switcher (<1024px) ── */}
            <div className="flex lg:hidden items-center p-1 bg-slate-200/70 rounded-xl shrink-0 gap-1 border border-slate-200/60 font-display">
              <button
                onClick={() => setActiveMobileTab("permohonan")}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap px-2.5 ${
                  activeMobileTab === "permohonan"
                    ? "bg-white text-[#C62828] shadow-xs font-black ring-1 ring-black/5"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Masuk ({pengajuanList.length})</span>
              </button>
              <button
                onClick={() => setActiveMobileTab("detail")}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap px-2.5 ${
                  activeMobileTab === "detail"
                    ? "bg-white text-[#C62828] shadow-xs font-black ring-1 ring-black/5"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Detail</span>
              </button>
              <button
                onClick={() => setActiveMobileTab("riwayat")}
                className={`flex-1 py-2 text-[11px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap px-2.5 ${
                  activeMobileTab === "riwayat"
                    ? "bg-white text-[#C62828] shadow-xs font-black ring-1 ring-black/5"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <HistoryIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">Riwayat ({riwayatList.length})</span>
              </button>
            </div>

            {/* ── Split 2-Column Layout (6/12 & 6/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 overflow-hidden">
              
              {/* ── LEFT COLUMN (6/12): List Permohonan & Riwayat ── */}
              <div className={`lg:col-span-6 flex-col gap-4 min-h-0 overflow-hidden ${
                activeMobileTab === "detail" ? "hidden lg:flex" : "flex flex-1 h-full"
              }`}>
                
                {/* Pending Requests List Card */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden w-full h-full ${
                  activeMobileTab === "permohonan" ? "flex" : "hidden lg:flex"
                }`}>
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <UserCheck className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Permohonan Masuk</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Klik permohonan untuk pratinjau detail</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#ffd01d] text-slate-950 shadow-2xs font-display">
                      {pengajuanList.length} Menunggu
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-2.5 flex flex-col justify-center">
                    {pengajuanList.length === 0 ? (
                      <div className="my-auto">
                        <EmptyState
                          icon={CheckCircle2}
                          title="Semua Permohonan Telah Ditinjau"
                          description="Belum ada permohonan pembimbing baru yang menunggu keputusan."
                        />
                      </div>
                    ) : (
                      pengajuanList.map((p) => {
                        const isSelected = selectedMhs && selectedMhs.nim === p.nim;

                        return (
                          <div
                            key={p.nim}
                            onClick={() => {
                              setSelectedNim(p.nim);
                              setActiveMobileTab("detail");
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                              isSelected
                                ? "bg-slate-50 border-slate-300 shadow-2xs"
                                : "bg-white border-slate-200/80 hover:bg-slate-50/60 hover:border-slate-300"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#C62828] to-[#991B1B] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs font-display">
                                  {p.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                                </div>
                                <div>
                                  <p className="text-sm font-black text-slate-900 font-display">{p.nama}</p>
                                  <p className="text-[10.5px] text-slate-500 font-mono font-medium">{p.nim} · {p.prodi}</p>
                                </div>
                              </div>

                              <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#ffd01d] text-slate-950 shadow-2xs shrink-0 font-display">
                                {p.bidang}
                              </span>
                            </div>

                            <p className="text-xs text-slate-700 font-medium truncate">
                              &ldquo;{p.judul}&rdquo;
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* History Card (Equal Height & Spacious) */}
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 flex flex-col min-h-0 overflow-hidden w-full h-full ${
                  activeMobileTab === "riwayat" ? "flex" : "hidden lg:flex"
                }`}>
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                        <HistoryIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h2 className="font-bold text-sm text-slate-900 font-display">Riwayat Keputusan</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Histori pengajuan yang telah disetujui / ditolak</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 shadow-2xs font-display">
                      {riwayatList.length} Aksi
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto scrollbar-none p-4 space-y-2 flex flex-col justify-center">
                    {riwayatList.length === 0 ? (
                      <div className="my-auto">
                        <EmptyState
                          icon={HistoryIcon}
                          title="Belum Ada Riwayat Keputusan"
                          description="Histori permohonan yang Anda terima atau tolak akan tercatat otomatis di sini."
                        />
                      </div>
                    ) : (
                      riwayatList.map((r, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs font-bold ${
                            r.aksi === "Diterima" ? "bg-[#ffd01d] text-slate-950" : "bg-[#C62828] text-white"
                          }`}>
                            {r.aksi === "Diterima"
                              ? <CheckCircle2 className="w-4 h-4 text-slate-950" />
                              : <XCircle className="w-4 h-4 text-white" />
                            }
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-slate-900 font-display">{r.nama} <span className="font-mono text-slate-400 text-[10px] font-normal">({r.nim})</span></p>
                            <p className="text-[11px] text-slate-500 truncate font-medium">&ldquo;{r.judul}&rdquo;</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full font-display shadow-2xs ${
                              r.aksi === "Diterima" ? "bg-emerald-600 text-white" : "bg-[#C62828] text-white"
                            }`}>
                              {r.aksi}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN (6/12): Detail & Decision Panel Card ── */}
              <div className={`lg:col-span-6 flex-col bg-white rounded-2xl border border-slate-200 shadow-xs min-h-0 overflow-hidden w-full h-full ${
                activeMobileTab === "detail" ? "flex flex-1" : "hidden lg:flex"
              }`}>
                {/* Header Card Detail */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">Detail &amp; Verifikasi Permohonan</h2>
                      <p className="text-[10px] text-slate-400 font-medium">Tinjau proposal &amp; keputusan dosen</p>
                    </div>
                  </div>

                  {selectedMhs && (
                    <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white font-mono shadow-2xs">
                      {selectedMhs.nim}
                    </span>
                  )}
                </div>

                {/* Content Area Detail */}
                {selectedMhs ? (
                  <div className="flex-1 overflow-y-auto scrollbar-none p-5 space-y-4">
                    {/* Student Profile Header Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-rose-50/20 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#C62828] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md font-display">
                          {selectedMhs.nama.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <h3 className="text-base font-black text-slate-900 font-display leading-tight">
                            {selectedMhs.nama}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">{selectedMhs.prodi}</p>
                          <p className="text-[10.5px] font-mono text-slate-400 font-medium">NIM: {selectedMhs.nim}</p>
                        </div>
                      </div>
                    </div>

                    {/* Judul & Topik Proposal Box */}
                    <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2.5 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-display">Judul Proposed Skripsi</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold bg-[#ffd01d] text-slate-950 shadow-2xs font-display">
                          {selectedMhs.bidang}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed font-display">
                        &ldquo;{selectedMhs.judul}&rdquo;
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-500">
                        <div>
                          <span className="block text-[9px] text-slate-400 font-bold uppercase font-display">Calon Pembimbing II</span>
                          <strong className="text-slate-800">{selectedMhs.pembimbing2}</strong>
                        </div>
                        <div>
                          <span className="block text-[9px] text-slate-400 font-bold uppercase font-display">Tgl Pengajuan</span>
                          <strong className="text-slate-800">{selectedMhs.tgl}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Alasan / Catatan Pengajuan Box */}
                    <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
                      <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider font-display">
                        Pesan &amp; Alasan Memilih Pembimbing
                      </span>
                      <p className="text-xs text-amber-950 italic font-medium leading-relaxed">
                        &ldquo;{selectedMhs.alasan}&rdquo;
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-4 my-auto">
                    <EmptyState
                      icon={CheckCircle2}
                      title="Semua Permohonan Telah Ditinjau"
                      description="Tidak ada permohonan pembimbing yang memerlukan verifikasi."
                    />
                  </div>
                )}

                {/* Bottom Action Panel */}
                {selectedMhs && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/80 shrink-0 space-y-2">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => handleDecision(selectedMhs, "Diterima")}
                        className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 font-display"
                      >
                        <CheckCircle2 className="w-4 h-4 text-white" /> Terima Mahasiswa Bimbingan
                      </button>
                      <button
                        onClick={() => handleDecision(selectedMhs, "Ditolak")}
                        className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-95 font-display"
                      >
                        <XCircle className="w-4 h-4 text-slate-700" /> Tolak
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
