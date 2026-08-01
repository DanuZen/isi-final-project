"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/toast";
import { storeProposal, storePembimbing, storeBimbingan, storeJadwal } from "@/lib/sipeta-store";
import {
  User,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  Edit3,
  CheckCircle2,
  KeyRound,
  X,
  Save,
  Clock,
  Copy,
  Check,
  Hash,
  BarChart2,
  Layers,
  Building2,
  BookOpen,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  IdCard,
  UserCheck,
  Award,
  Database,
  School,
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"AKADEMIK" | "TIMELINE" | "SANDI">("AKADEMIK");

  // User Profile Data
  const [userData, setUserData] = useState({
    nama: "Danu Zen",
    nim: "20101152630045",
    email: "danuzen@student.upiyptk.ac.id",
    telepon: "+62 812-3456-7890",
    alamat: "Jl. Lubuk Begalung No. 45, Kota Padang, Sumatera Barat",
    tanggalBergabung: "1 September 2020",
    fakultas: "Fakultas Ilmu Komputer (FILKOM)",
    prodi: "Teknik Informatika (S1)",
    angkatan: "2020",
    ipk: "3.65",
    sks: "144",
    semester: "12",
  });

  const [isEditContactOpen, setIsEditContactOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Edit Form Fields
  const [editForm, setEditForm] = useState({
    telepon: userData.telepon,
    alamat: userData.alamat,
    email: userData.email,
  });

  // Password Form Fields
  const [passForm, setPassForm] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });

  // Dynamic Timeline State connected to LocalStorage State Engine
  const [timelineData, setTimelineData] = useState<Array<{
    step: number;
    title: string;
    date: string;
    desc: string;
    status: "COMPLETED" | "IN_PROGRESS" | "PENDING";
  }>>([]);

  const syncTimeline = useCallback(() => {
    const prop = storeProposal.get();
    const pemList = storePembimbing.getAll();
    const pem = pemList[0];
    const bmbList = storeBimbingan.getAll();
    const jdwList = storeJadwal.getAll();

    const semproExam = jdwList.find((j) => j.jenis === "Seminar");
    const sidangExam = jdwList.find((j) => j.jenis === "Sidang");

    setTimelineData([
      {
        step: 1,
        title: "Pengajuan & Approval Proposal Judul",
        date: prop ? "12 Januari 2026" : "Belum Mengajukan",
        desc: prop ? `Proposal judul "${prop.judul}" telah disetujui.` : "Silakan ajukan usulan judul proposal di portal proposal.",
        status: prop ? "COMPLETED" : "IN_PROGRESS",
      },
      {
        step: 2,
        title: "Pengesahan Dosen Pembimbing",
        date: pem?.status === "DITERIMA" ? "15 Januari 2026" : (pem ? "Menunggu ACC Dosen" : "Belum Dipilih"),
        desc: pem?.status === "DITERIMA" ? `SK Pembimbing disahkan (${pem.dosenNama}).` : (pem ? `Pengajuan pembimbing ke ${pem.dosenNama} sedang diproses.` : "Pilih dosen pembimbing di menu pembimbing."),
        status: pem?.status === "DITERIMA" ? "COMPLETED" : (prop ? "IN_PROGRESS" : "PENDING"),
      },
      {
        step: 3,
        title: "Proses Bimbingan Tugas Akhir",
        date: bmbList.length > 0 ? `${bmbList.length} Sesi Bimbingan Logged` : "Sedang Berlangsung",
        desc: bmbList.length > 0 ? `${bmbList.length} sesi bimbingan telah dicatat bersama dosen pembimbing.` : "Catat log bimbingan naskah Bab 1 - 4 dengan Dosen Pembimbing.",
        status: bmbList.length >= 6 ? "COMPLETED" : (pem?.status === "DITERIMA" ? "IN_PROGRESS" : "PENDING"),
      },
      {
        step: 4,
        title: "Pelaksanaan Seminar Proposal (Sempro)",
        date: semproExam ? `${semproExam.hari}, ${semproExam.tglNum}` : "Menunggu Penjadwalan",
        desc: semproExam ? `Ujian Sempro di ${semproExam.ruang} (${semproExam.waktu}).` : "Jadwal seminar proposal akan diterbitkan oleh Sekretariat Admin Prodi.",
        status: semproExam ? "COMPLETED" : (bmbList.length > 0 ? "IN_PROGRESS" : "PENDING"),
      },
      {
        step: 5,
        title: "Ujian Sidang Skripsi (Final)",
        date: sidangExam ? `${sidangExam.hari}, ${sidangExam.tglNum}` : "Menunggu Penjadwalan",
        desc: sidangExam ? `Ujian Sidang di ${sidangExam.ruang} (${sidangExam.waktu}).` : "Jadwal Ujian Sidang Skripsi final akan diterbitkan oleh Sekretariat Admin Prodi.",
        status: sidangExam ? "COMPLETED" : "PENDING",
      },
    ]);
  }, []);

  useEffect(() => {
    if (isOpen) {
      syncTimeline();
    }
  }, [isOpen, syncTimeline]);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    showToast(`Berhasil menyalin ${label} ke clipboard!`, "info");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData((prev) => ({
      ...prev,
      email: editForm.email,
      telepon: editForm.telepon,
      alamat: editForm.alamat,
    }));
    setIsEditContactOpen(false);
    showToast("Profil data kontak berhasil diperbarui!", "success");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passForm.currentPass || !passForm.newPass || !passForm.confirmPass) {
      showToast("Harap isi seluruh bidang kata sandi!", "error");
      return;
    }
    if (passForm.newPass !== passForm.confirmPass) {
      showToast("Konfirmasi kata sandi baru tidak cocok!", "warning");
      return;
    }
    setPassForm({ currentPass: "", newPass: "", confirmPass: "" });
    showToast("Kata sandi akun berhasil diperbarui secara aman!", "success");
  };

  const stats = [
    {
      label: "Total SKS Lulus",
      value: `${userData.sks} SKS`,
      sub: "100% Bebas SKS",
      progress: 100,
      icon: <Hash className="w-3.5 h-3.5 text-white" />,
      badgeBg: "bg-[#C62828]",
    },
    {
      label: "Indeks Prestasi",
      value: `${userData.ipk} / 4.00`,
      sub: "Cum Laude",
      progress: 91,
      icon: <BarChart2 className="w-3.5 h-3.5 text-white" />,
      badgeBg: "bg-[#C62828]",
    },
    {
      label: "Masa Studi",
      value: `Semester ${userData.semester}`,
      sub: `Angkatan ${userData.angkatan}`,
      progress: 85,
      icon: <Clock className="w-3.5 h-3.5 text-white" />,
      badgeBg: "bg-amber-600",
    },
    {
      label: "Status TA",
      value: "Bimbingan Aktif",
      sub: "Sesi Logged",
      progress: 60,
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-white" />,
      badgeBg: "bg-emerald-600",
    },
  ];

  const profileAndAkademikInfo = [
    { label: "Nama Lengkap Mahasiswa", value: userData.nama, icon: <User className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "NIM Mahasiswa", value: userData.nim, icon: <IdCard className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Email Akademik", value: userData.email, icon: <Mail className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Tahun Angkatan", value: `Angkatan ${userData.angkatan}`, icon: <Calendar className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Program Studi", value: userData.prodi, icon: <GraduationCap className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Fakultas", value: userData.fakultas, icon: <Building2 className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Jenjang Studi", value: "Strata 1 (S1)", icon: <Award className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Status Akademik", value: `Semester ${userData.semester} (Aktif TA)`, icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Dosen Pembimbing Utama", value: "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.", icon: <UserCheck className="w-3.5 h-3.5 text-[#C62828]" /> },
    { label: "Dosen Wali Akademik", value: "Dr. Jasmir, S.Kom., M.Kom.", icon: <UserCheck className="w-3.5 h-3.5 text-[#C62828]" /> },
  ];

  const completedStepsCount = timelineData.filter((t) => t.status === "COMPLETED").length;
  const progressPct = Math.round((completedStepsCount / 5) * 100);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] h-[670px] animate-in fade-in zoom-in-95 duration-150">
        {/* Header Banner */}
        <div className="bg-[#1A1A1A] text-white p-4 md:p-5 shrink-0 relative overflow-hidden">
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C62828] via-[#B71C1C] to-[#8B0000] text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md border border-white/20 font-display">
                DZ
              </div>
              <div className="space-y-0.5">
                <h2 className="text-base md:text-lg font-black font-display tracking-wide">{userData.nama}</h2>
                <p className="text-[11px] text-neutral-400 font-medium">{userData.prodi} • {userData.fakultas}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-600 text-white shadow-xs font-display">
                <CheckCircle2 className="w-3.5 h-3.5" /> Mahasiswa Aktif TA
              </span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828]" />
        </div>

        {/* Modal Inner Navigation Tabs */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2 shrink-0 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("AKADEMIK")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "AKADEMIK"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Data Akademik &amp; Profil</span>
          </button>

          <button
            onClick={() => setActiveTab("TIMELINE")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "TIMELINE"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Timeline Skripsi ({completedStepsCount}/5)</span>
          </button>

          <button
            onClick={() => setActiveTab("SANDI")}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "SANDI"
                ? "bg-[#C62828] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Ubah Kata Sandi</span>
          </button>
        </div>

        {/* Modal Body Content (FIXED HEIGHT 470px Across All Tabs) */}
        <div className="p-4 md:p-5 flex-1 min-h-0 overflow-y-auto scrollbar-none">
          {/* TAB 1: AKADEMIK & PROFIL */}
          {activeTab === "AKADEMIK" && (
            <div className="h-full flex flex-col animate-in fade-in duration-150">
              {/* Data Akademik & Kontak Card */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full min-h-0">
                <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Data Terdaftar Pangkalan Data UPI YPTK
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Informasi resmi identitas &amp; akademik terverifikasi kampus
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditContactOpen(!isEditContactOpen)}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-[#C62828] hover:text-white text-slate-700 text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>{isEditContactOpen ? "Batal Edit" : "Edit Kontak"}</span>
                  </button>
                </div>

                {isEditContactOpen ? (
                  <form onSubmit={handleSaveProfile} className="p-3 space-y-2 text-xs bg-rose-50/20 border-b border-slate-100 shrink-0">
                    <div className="space-y-0.5">
                      <label className="font-bold text-slate-700 text-[9px] uppercase">Email Kontak</label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:border-[#C62828] bg-white text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-0.5">
                      <label className="font-bold text-slate-700 text-[9px] uppercase">Alamat Domisili</label>
                      <textarea
                        rows={2}
                        value={editForm.alamat}
                        onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
                        className="w-full p-2 rounded-lg border border-slate-300 font-semibold focus:outline-none focus:border-[#C62828] resize-none bg-white text-xs"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#C62828] text-white rounded-lg text-xs font-bold shadow-xs hover:bg-[#B71C1C] flex items-center gap-1 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" /> Simpan Kontak
                      </button>
                    </div>
                  </form>
                ) : null}

                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 overflow-y-auto scrollbar-none flex-1 min-h-0">
                  {profileAndAkademikInfo.map((item) => (
                    <div key={item.label} className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/80 space-y-0.5">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider font-display">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold text-slate-900 leading-snug">{item.value}</p>
                        {item.label === "NIM Mahasiswa" && (
                          <button
                            onClick={() => handleCopy(userData.nim, "NIM Mahasiswa")}
                            className="px-2 py-0.5 rounded-md bg-slate-200 hover:bg-[#C62828] hover:text-white text-slate-700 text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1 shrink-0"
                          >
                            {copiedField === "NIM Mahasiswa" ? (
                              <Check className="w-3 h-3 text-emerald-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{copiedField === "NIM Mahasiswa" ? "Tersalin!" : "Salin NIM"}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="sm:col-span-2 p-2 bg-slate-50/80 rounded-lg border border-slate-200/80 space-y-0.5">
                    <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider font-display">
                      <MapPin className="w-3.5 h-3.5 text-[#C62828]" />
                      <span>Alamat Domisili Lengkap</span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 leading-snug">{userData.alamat}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TIMELINE SKRIPSI */}
          {activeTab === "TIMELINE" && (
            <div className="h-full flex flex-col justify-between animate-in fade-in duration-150">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full justify-between">
                <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Progres Tahapan Skripsi (5 Langkah)
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Status alur skripsi disinkronkan langsung dengan akun aktif Anda
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs shrink-0">
                    {completedStepsCount}/5 Tahap Terpenuhi
                  </span>
                </div>

                <div className="p-4 overflow-y-auto scrollbar-none flex-1 min-h-0">
                  <div className="relative pl-10 space-y-3.5 my-auto py-1 before:absolute before:left-[13px] before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                    {timelineData.map((step) => {
                      const isCompleted = step.status === "COMPLETED";
                      const isInProgress = step.status === "IN_PROGRESS";

                      return (
                        <div key={step.step} className="relative flex items-start gap-3">
                          <div
                            className={`absolute -left-10 top-2 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all shrink-0 z-10 ${
                              isCompleted
                                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                                : isInProgress
                                ? "bg-[#C62828] border-[#C62828] text-white animate-pulse shadow-md ring-4 ring-rose-100"
                                : "bg-white border-slate-300 text-slate-400 font-bold"
                            }`}
                          >
                            {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.step}
                          </div>

                          <div className="flex-1 bg-slate-50/80 hover:bg-slate-100/70 p-3 rounded-xl border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-xs font-extrabold font-display ${
                                    isCompleted ? "text-slate-900" : isInProgress ? "text-[#C62828]" : "text-slate-700"
                                  }`}
                                >
                                  {step.title}
                                </h4>
                                <span className="text-[10px] font-bold text-slate-400 font-mono-data">({step.date})</span>
                              </div>
                              <p className="text-[11px] text-slate-500 font-medium leading-tight">{step.desc}</p>
                            </div>

                            <div className="shrink-0">
                              {isCompleted && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs">
                                  ✓ Selesai
                                </span>
                              )}
                              {isInProgress && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#C62828] text-white shadow-xs animate-pulse">
                                  ● Tahap Aktif
                                </span>
                              )}
                              {!isCompleted && !isInProgress && (
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                                  Belum Dimulai
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: UBAH SANDI */}
          {activeTab === "SANDI" && (
            <div className="h-full flex flex-col justify-between animate-in fade-in duration-150">
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col h-full justify-between">
                <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Keamanan Kata Sandi Akun
                      </h3>
                      <p className="text-[10px] text-slate-500 font-medium">
                        Perbarui kata sandi secara berkala untuk menjaga keamanan akun
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-600 text-white shadow-xs shrink-0">
                    Enkripsi Aktif
                  </span>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs max-w-md mx-auto my-auto w-full py-4">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Kata Sandi Saat Ini</label>
                    <input
                      type="password"
                      value={passForm.currentPass}
                      onChange={(e) => setPassForm({ ...passForm, currentPass: e.target.value })}
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-[#C62828] text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Kata Sandi Baru</label>
                    <input
                      type="password"
                      value={passForm.newPass}
                      onChange={(e) => setPassForm({ ...passForm, newPass: e.target.value })}
                      placeholder="Minimal 8 karakter"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-[#C62828] text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 uppercase text-[10px]">Konfirmasi Kata Sandi Baru</label>
                    <input
                      type="password"
                      value={passForm.confirmPass}
                      onChange={(e) => setPassForm({ ...passForm, confirmPass: e.target.value })}
                      placeholder="Ulangi kata sandi baru"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold focus:outline-none focus:border-[#C62828] text-xs"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#C62828] hover:bg-[#B71C1C] text-white font-bold rounded-xl shadow-md shadow-[#C62828]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Perbarui Kata Sandi Akun</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
