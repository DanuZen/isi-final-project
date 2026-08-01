"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { TaStepper } from "@/components/ui/ta-stepper";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Clock,
  BookOpen,
  CalendarDays,
  ArrowRight,
  PlusCircle,
  FileEdit,
  MessageSquare,
  User2,
} from "lucide-react";

// ─── Mock Data ──────────────────────────────────────────────
const STUDENT = {
  name: "Danu Zen",
  nim: "20101152630045",
  prodi: "Teknik Informatika",
  sks: 144,
  ipk: 3.65,
  tahapAktif: "Usulan Judul",
  tahapIndex: 1,
};

const JUDUL: { text: string; abstrak: string; status: string; bidang: string } | null = null; // Belum ada judul yang diajukan

const PEMBIMBING: { label: string; color: string; nama: string; nidn: string; kuota: string }[] = []; // Belum ada pembimbing

const ACC_CHECKLIST = [
  {
    label: "Clearing SKS & IPK",
    detail: "Terpenuhi — 144 SKS · IPK 3.65",
    done: true,
  },
  {
    label: "Judul Disetujui Prodi",
    detail: "Menunggu — Judul belum diajukan",
    done: false,
  },
  {
    label: "Dosen Pembimbing Ditetapkan",
    detail: "Menunggu — Pilih pembimbing terlebih dahulu",
    done: false,
  },
];

const QUICK_ACTIONS = [
  {
    label: "Ajukan Judul TA",
    href: "/mahasiswa/proposal",
    icon: <FileText className="w-4 h-4" />,
    btnClass: "bg-[#C62828] hover:bg-[#a81f1f] text-white border border-red-500/30 shadow-md shadow-red-950/40",
  },
  {
    label: "Pilih Pembimbing",
    href: "/mahasiswa/pembimbing",
    icon: <User2 className="w-4 h-4" />,
    btnClass: "bg-[#F59E0B] hover:bg-[#d97706] text-slate-950 font-bold border border-amber-400/40 shadow-md shadow-amber-950/20",
  },
  {
    label: "Lihat Kalender TA",
    href: "/mahasiswa/kalender",
    icon: <CalendarDays className="w-4 h-4" />,
    btnClass: "bg-white hover:bg-slate-100 text-slate-900 font-bold border border-slate-200 shadow-md",
  },
];

// ────────────────────────────────────────────────────────────

import { SplashScreen } from "@/components/ui/splash-screen";

export default function DashboardPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("sipeta_logged_in");
    if (!isLoggedIn) {
      router.replace("/login");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <SplashScreen
        message="Memverifikasi Autentikasi Sistem..."
        subMessage="Universitas Putra Indonesia YPTK Padang"
        duration={1000}
      />
    );
  }

  const canAcc = ACC_CHECKLIST.every((c) => c.done);

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#F5F5F7]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-5 md:p-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">

            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                {/* Left: greeting + status */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Akun Terverifikasi Akademik
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Selamat Datang, {STUDENT.name}
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Progres Tugas Akhir Anda saat ini berada pada tahap{" "}
                    <strong className="text-[#F59E0B] font-bold">{STUDENT.tahapAktif}</strong>.
                    Lanjutkan konsultasi rutin untuk memenuhi syarat pengajuan ACC Seminar Proposal.
                  </p>
                </div>

                {/* Right: quick actions */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 shrink-0 w-full sm:w-auto">
                  {QUICK_ACTIONS.map((a) => (
                    <Link
                      key={a.label}
                      href={a.href}
                      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer w-full sm:w-auto ${a.btnClass}`}
                    >
                      {a.icon}
                      <span>{a.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
              {/* Bottom accent bar */}
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* ── TA Stepper ── */}
            <div className="shrink-0">
              <TaStepper />
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">

              {/* LEFT: Judul TA (8/12) */}
              <div className="lg:col-span-8 flex flex-col gap-4 min-h-0">
                {/* Judul Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col flex-1 min-h-0 overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <h2 className="font-bold text-sm text-slate-900 font-display">
                        Judul Tugas Akhir
                      </h2>
                    </div>
                    {JUDUL ? (
                      <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-xs">
                        {JUDUL.status}
                      </span>
                    ) : (
                      <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-xs">
                        Belum Diajukan
                      </span>
                    )}
                  </div>

                  {JUDUL ? (
                    <>
                      {/* Judul & abstrak */}
                      <div className="px-5 py-4 space-y-2 flex-1 overflow-y-auto scrollbar-none">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {JUDUL.bidang}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 leading-snug font-display">
                          &ldquo;{JUDUL.text}&rdquo;
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          <span className="font-bold text-slate-700">Abstrak: </span>
                          {JUDUL.abstrak}
                        </p>
                      </div>

                      {/* Pembimbing grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-5 pb-4 shrink-0">
                        {PEMBIMBING.map((p) => (
                          <div key={p.label} className="bg-slate-50 rounded-xl border border-slate-200 p-3.5 space-y-1">
                            <div className="flex items-center gap-1.5">
                              <User2 className={`w-3 h-3 ${p.color} shrink-0`} />
                              <p className={`text-[10px] font-bold ${p.color} uppercase tracking-wider font-display`}>
                                {p.label}
                              </p>
                            </div>
                            <p className="text-xs font-bold text-slate-900 leading-tight">{p.nama}</p>
                            <p className="text-[10px] text-slate-500">
                              NIDN: {p.nidn} &nbsp;·&nbsp; Kuota: {p.kuota}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    /* Empty state — belum ada judul */
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#C62828] shadow-xs">
                        <FileText className="w-7 h-7 text-[#C62828]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-extrabold text-base font-display text-slate-900">Belum Ada Judul Diajukan</h4>
                        <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-medium">
                          Mulai perjalanan TA Anda dengan mengajukan usulan judul skripsi dan cek kemiripan (similarity).
                        </p>
                      </div>
                      <Link
                        href="/mahasiswa/proposal"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>Ajukan Usulan Judul Sekarang</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT: Checklist ACC + Kontak (4/12) */}
              <div className="lg:col-span-4 flex flex-col gap-4 min-h-0">
                {/* ACC Checklist */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden shrink-0">
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h2 className="font-bold text-sm text-slate-900 font-display">
                      Syarat ACC Seminar
                    </h2>
                  </div>

                  <ul className="divide-y divide-slate-100">
                    {ACC_CHECKLIST.map((item) => (
                      <li key={item.label} className="flex items-start gap-3 px-5 py-3.5">
                        <div className="mt-0.5 shrink-0">
                          {item.done ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-amber-500" />
                          )}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${item.done ? "text-slate-700" : "text-slate-900"}`}>
                            {item.label}
                          </p>
                          <p className={`text-[11px] mt-0.5 font-medium ${item.done ? "text-emerald-600" : "text-amber-600"}`}>
                            {item.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="px-5 py-3 border-t border-slate-100">
                    <button
                      disabled={!canAcc}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        canAcc
                          ? "bg-[#C62828] text-white hover:bg-[#B71C1C] active:scale-95 shadow-xs"
                          : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                      }`}
                    >
                      {canAcc ? "Ajukan ACC Seminar" : "Menunggu Persyaratan..."}
                    </button>
                  </div>
                </div>

                {/* Mini Kalender TA Widget */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex flex-col gap-3 flex-1 min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <CalendarDays className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-slate-900 font-display">Kalender TA & Agenda</h3>
                        <p className="text-[10px] text-slate-400 font-medium">Agustus 2026</p>
                      </div>
                    </div>
                    <Link
                      href="/mahasiswa/kalender"
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#C62828] hover:bg-[#B71C1C] rounded-xl transition-all shadow-xs flex items-center gap-1 active:scale-95"
                    >
                      Buka <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Upcoming Mini Agenda List */}
                  <div className="flex-1 overflow-y-auto scrollbar-none space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-display">
                      Agenda Terdekat
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 truncate">Sesi 5 Bimbingan TA</span>
                        <span className="text-[10px] font-bold text-[#C62828] bg-rose-50 px-1.5 py-0.5 rounded">Besok</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">10:00 WIB · Ruang Dosen FIK 3</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 truncate">Deadline Draft Sempro</span>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">5 Agt</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Upload via Portal SIPETA</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 truncate">Seminar Proposal FIK</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">12 Agt</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">Aula Seminar Lt. 2 FIK</p>
                    </div>
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
