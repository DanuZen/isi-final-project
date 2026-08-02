"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  LayoutDashboard, Users, UserPlus, CalendarDays, BookOpen,
  Plus, MapPin, Clock, User, ArrowRight, Search, Calendar as CalendarIcon,
  CheckCircle2, XCircle, Trash2, Edit3, X, Check
} from "lucide-react";

const NAV = [
  { label: "Dashboard",           href: "/admin-prodi/dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Manajemen Mahasiswa", href: "/admin-prodi/mahasiswa",  icon: <Users className="w-4 h-4" /> },
  { label: "Aktivasi Akun",       href: "/admin-prodi/aktivasi",   icon: <UserPlus className="w-4 h-4" /> },
  { label: "Jadwal Seminar",      href: "/admin-prodi/jadwal",     icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Repositori",          href: "/admin-prodi/repositori", icon: <BookOpen className="w-4 h-4" /> },
];

interface JadwalItem {
  id: string;
  nim: string;
  nama: string;
  judul: string;
  jenis: "Seminar Proposal" | "Ujian Sidang";
  tanggal: string;
  jam: string;
  ruangan: string;
  penguji1: string;
  penguji2: string;
  pembimbing: string;
  status: "Terjadwal" | "Selesai";
}

const INITIAL_JADWAL: JadwalItem[] = [
  {
    id: "JDW-01", nim: "20101152630045", nama: "Danu Zen",
    judul: "Sistem Informasi Manajemen Gudang Berbasis Web",
    jenis: "Seminar Proposal", tanggal: "1 Agt 2026", jam: "09:00 - 10:30 WIB",
    ruangan: "Ruang 302", penguji1: "Dr. Ahmad Fauzi, M.T.", penguji2: "Prof. Budi Santoso, Ph.D",
    pembimbing: "Dr. Sarjon Defit", status: "Terjadwal"
  },
  {
    id: "JDW-02", nim: "20101152630089", nama: "Rafi Andika",
    judul: "Implementasi ML untuk Deteksi Spam Email",
    jenis: "Ujian Sidang", tanggal: "3 Agt 2026", jam: "10:00 - 11:30 WIB",
    ruangan: "Aula FIK Lt. 2", penguji1: "Dr. Ahmad Fauzi, M.T.", penguji2: "Sari Indah, M.T.",
    pembimbing: "Dr. Sarjon Defit", status: "Terjadwal"
  },
  {
    id: "JDW-03", nim: "20101152630101", nama: "Siti Rahayu",
    judul: "Optimisasi Algoritma Routing Jaringan Komputer",
    jenis: "Seminar Proposal", tanggal: "5 Agt 2026", jam: "13:00 - 14:30 WIB",
    ruangan: "Ruang 302", penguji1: "Dr. Hendra Saputra, M.T.", penguji2: "Iwan, M.Kom.",
    pembimbing: "Prof. Budi Santoso, Ph.D", status: "Terjadwal"
  },
];

export default function AdminProdiJadwalPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [jadwalList, setJadwalList] = useState<JadwalItem[]>(INITIAL_JADWAL);
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<JadwalItem | null>(null);

  // Form State
  const [formNim, setFormNim] = useState("");
  const [formNama, setFormNama] = useState("");
  const [formJudul, setFormJudul] = useState("");
  const [formJenis, setFormJenis] = useState<"Seminar Proposal" | "Ujian Sidang">("Seminar Proposal");
  const [formTanggal, setFormTanggal] = useState("10 Agt 2026");
  const [formJam, setFormJam] = useState("09:00 - 10:30 WIB");
  const [formRuangan, setFormRuangan] = useState("Ruang 302");
  const [formPembimbing, setFormPembimbing] = useState("Dr. Sarjon Defit");
  const [formPenguji1, setFormPenguji1] = useState("Dr. Ahmad Fauzi, M.T.");
  const [formPenguji2, setFormPenguji2] = useState("Prof. Budi Santoso, Ph.D");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditItem(null);
    setFormNim("20101152630300");
    setFormNama("");
    setFormJudul("");
    setFormJenis("Seminar Proposal");
    setFormTanggal("10 Agt 2026");
    setFormJam("09:00 - 10:30 WIB");
    setFormRuangan("Ruang 302");
    setFormPembimbing("Dr. Sarjon Defit");
    setFormPenguji1("Dr. Ahmad Fauzi, M.T.");
    setFormPenguji2("Prof. Budi Santoso, Ph.D");
    setShowModal(true);
  };

  const handleOpenEditModal = (item: JadwalItem) => {
    setEditItem(item);
    setFormNim(item.nim);
    setFormNama(item.nama);
    setFormJudul(item.judul);
    setFormJenis(item.jenis);
    setFormTanggal(item.tanggal);
    setFormJam(item.jam);
    setFormRuangan(item.ruangan);
    setFormPembimbing(item.pembimbing);
    setFormPenguji1(item.penguji1);
    setFormPenguji2(item.penguji2);
    setShowModal(true);
  };

  const handleDeleteJadwal = (id: string, nama: string) => {
    setJadwalList((prev) => prev.filter((j) => j.id !== id));
    showToast(`Jadwal seminar ${nama} berhasil dihapus dari antrean.`);
  };

  const handleSaveJadwal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formNama || !formNim || !formJudul) return;

    if (editItem) {
      setJadwalList((prev) =>
        prev.map((j) =>
          j.id === editItem.id
            ? {
                ...j,
                nim: formNim,
                nama: formNama,
                judul: formJudul,
                jenis: formJenis,
                tanggal: formTanggal,
                jam: formJam,
                ruangan: formRuangan,
                pembimbing: formPembimbing,
                penguji1: formPenguji1,
                penguji2: formPenguji2,
              }
            : j
        )
      );
      showToast(`Jadwal seminar ${formNama} berhasil diperbarui!`);
    } else {
      const newId = `JDW-0${jadwalList.length + 1}`;
      const newItem: JadwalItem = {
        id: newId,
        nim: formNim,
        nama: formNama,
        judul: formJudul,
        jenis: formJenis,
        tanggal: formTanggal,
        jam: formJam,
        ruangan: formRuangan,
        pembimbing: formPembimbing,
        penguji1: formPenguji1,
        penguji2: formPenguji2,
        status: "Terjadwal",
      };
      setJadwalList([newItem, ...jadwalList]);
      showToast(`Jadwal seminar baru untuk ${formNama} berhasil dibuat!`);
    }

    setShowModal(false);
  };

  const filtered = jadwalList.filter(
    (j) =>
      j.nama.toLowerCase().includes(search.toLowerCase()) ||
      j.nim.includes(search) ||
      j.judul.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" userName="Hafizah, S.Kom., M.Kom." userNim="NIP: 198504122010122001" userRole="Admin Prodi" prodiName="Teknik Informatika" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-4 pt-16 md:p-6 space-y-4 overflow-hidden shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#C62828] text-white font-display shadow-xs max-w-full truncate">
                      <CalendarDays className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="truncate">Penjadwalan Majelis Penguji FIK</span>
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Penjadwalan Seminar Proposal &amp; Ujian Sidang
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Atur jadwal waktu, ruangan seminar/sidang, serta penugasan Majelis Dosen Penguji I &amp; II untuk seluruh mahasiswa prodi.
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={handleOpenAddModal}
                    title="Buat Jadwal Baru"
                    className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display cursor-pointer flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4 text-white shrink-0" />
                    <span>Buat Jadwal Baru</span>
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
            </div>

            {/* ── Main Card Table ── */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs font-bold">
                    <CalendarDays className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">Jadwal Terdaftar (Agustus 2026)</h2>
                    <p className="text-[10px] text-slate-400 font-medium">{filtered.length} Sesi Terjadwal</p>
                  </div>
                </div>
                
                {/* 1-Row Controls: Search Input */}
                <div className="relative flex-1 sm:w-64 max-w-xs min-w-0">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari Mahasiswa / Judul..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] w-full transition-all font-display"
                  />
                </div>
              </div>

              {/* List Sesi Jadwal */}
              <div className="divide-y divide-slate-100 overflow-y-auto flex-1 scrollbar-none">
                {filtered.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 space-y-2">
                    <CalendarDays className="w-10 h-10 mx-auto text-slate-300" />
                    <p className="text-xs font-bold text-slate-600 font-display">Tidak ada jadwal ditemukan</p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors">
                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white shadow-2xs font-display ${item.jenis === "Ujian Sidang" ? "bg-[#C62828]" : "bg-amber-600"}`}>
                            {item.jenis}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 font-semibold">{item.id}</span>
                        </div>
                        <h3 className="text-sm font-black text-slate-900 font-display truncate">
                          {item.nama} <span className="font-mono text-xs text-slate-400 font-medium">({item.nim})</span>
                        </h3>
                        <p className="text-xs text-slate-600 font-medium break-words leading-relaxed">&ldquo;{item.judul}&rdquo;</p>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-[11px] text-slate-500 pt-1 font-display">
                          <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400 shrink-0" /> Pembimbing: <strong className="text-slate-700">{item.pembimbing}</strong></span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400 shrink-0" /> Penguji I: <strong className="text-slate-700">{item.penguji1}</strong></span>
                          <span className="flex items-center gap-1"><User className="w-3 h-3 text-slate-400 shrink-0" /> Penguji II: <strong className="text-slate-700">{item.penguji2}</strong></span>
                        </div>
                      </div>

                      <div className="flex flex-col md:items-end gap-2.5 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                        <div className="flex items-center gap-3 text-xs text-slate-700 font-bold font-display">
                          <span className="flex items-center gap-1"><CalendarIcon className="w-3.5 h-3.5 text-[#C62828]" /> {item.tanggal}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {item.jam}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold font-display">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {item.ruangan}
                        </div>
                        
                        {/* Interactive Action Buttons */}
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold border border-slate-200 text-slate-700 hover:border-[#C62828] hover:text-[#C62828] transition-all bg-white shadow-2xs flex items-center gap-1.5 cursor-pointer font-display active:scale-95"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-slate-500 hover:text-[#C62828]" />
                            <span>Edit Jadwal</span>
                          </button>
                          <button
                            onClick={() => handleDeleteJadwal(item.id, item.nama)}
                            title="Hapus Jadwal"
                            className="p-1.5 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition-all cursor-pointer active:scale-95 shadow-2xs"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ── MODAL ADD / EDIT JADWAL SEMINAR ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200 my-8">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
                  <CalendarDays className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display text-white">
                    {editItem ? "Edit Jadwal Seminar / Sidang" : "Buat Jadwal Seminar Baru"}
                  </h3>
                  <p className="text-[10.5px] text-slate-400 font-medium">Penugasan Waktu, Ruangan &amp; Majelis Penguji</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJadwal} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">NIM Mahasiswa <span className="text-[#C62828]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 20101152630045"
                    value={formNim}
                    onChange={(e) => setFormNim(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-mono transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Nama Mahasiswa <span className="text-[#C62828]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Danu Zen"
                    value={formNama}
                    onChange={(e) => setFormNama(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">Judul Penelitian / TA <span className="text-[#C62828]">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="Judul penelitian mahasiswa..."
                  value={formJudul}
                  onChange={(e) => setFormJudul(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Jenis Seminar <span className="text-[#C62828]">*</span></label>
                  <select
                    value={formJenis}
                    onChange={(e) => setFormJenis(e.target.value as "Seminar Proposal" | "Ujian Sidang")}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  >
                    <option value="Seminar Proposal">Seminar Proposal</option>
                    <option value="Ujian Sidang">Ujian Sidang</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Tanggal Pelaksanaan <span className="text-[#C62828]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 10 Agt 2026"
                    value={formTanggal}
                    onChange={(e) => setFormTanggal(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Waktu / Jam <span className="text-[#C62828]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 09:00 - 10:30 WIB"
                    value={formJam}
                    onChange={(e) => setFormJam(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Ruangan / Tempat <span className="text-[#C62828]">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ruang 302 / Aula FIK"
                    value={formRuangan}
                    onChange={(e) => setFormRuangan(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 font-display">Dosen Pembimbing</label>
                <input
                  type="text"
                  placeholder="Contoh: Dr. Sarjon Defit"
                  value={formPembimbing}
                  onChange={(e) => setFormPembimbing(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Dosen Penguji I</label>
                  <input
                    type="text"
                    placeholder="Contoh: Dr. Ahmad Fauzi, M.T."
                    value={formPenguji1}
                    onChange={(e) => setFormPenguji1(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 font-display">Dosen Penguji II</label>
                  <input
                    type="text"
                    placeholder="Contoh: Prof. Budi Santoso, Ph.D"
                    value={formPenguji2}
                    onChange={(e) => setFormPenguji2(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:border-[#C62828] font-display transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all font-display cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all flex items-center gap-1.5 shadow-xs font-display cursor-pointer active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>{editItem ? "Simpan Perubahan" : "Buat Jadwal Baru"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <p className="text-xs font-bold font-display leading-tight">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white cursor-pointer p-1">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
