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
  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header />

        {/* Page Body */}
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs gap-4 border-l-4 border-l-[#FF5722]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E3F3EA] text-[#2F8F5B] border border-[#2F8F5B]/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Clearing Nilai Disetujui
                </span>
                <span className="text-xs font-mono-data text-[#616161]">
                  SKS: 144 / 144 • IPK: 3.65
                </span>
              </div>
              <h2 className="text-xl font-bold text-[#1A1A1A] font-display">
                Selamat Datang, Danu Zen 👋
              </h2>
              <p className="text-xs text-[#616161] mt-0.5">
                Progres Tugas Akhir Anda saat ini berada pada tahap{" "}
                <strong className="text-[#FF5722]">Bimbingan Aktif</strong> dengan Dosen Pembimbing.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF5722] text-white hover:bg-[#D32F2F] transition-colors shadow-xs flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Catat Log Bimbingan
              </button>
              <button className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E0E0E0] text-[#212121] hover:bg-[#FAFAFA] transition-colors flex items-center gap-1.5">
                <FileEdit className="w-4 h-4 text-[#616161]" /> Ajukan Perubahan Judul
              </button>
            </div>
          </div>

          {/* Stepper Perjalanan TA (Signature Component) */}
          <TaStepper />

          {/* Grid Layout: Active Title Card & Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2 Cols): Active Judul TA & Log Thread */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active Judul Card */}
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#FF5722]" />
                    <h3 className="font-semibold text-sm text-[#1A1A1A] font-display">
                      Judul Tugas Akhir Disetujui
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E3F3EA] text-[#2F8F5B]">
                    Status: Disetujui Prodi
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-[#1A1A1A] leading-snug font-display">
                    &quot;Rancang Bangun Sistem Informasi Manajemen Tugas Akhir Berbasis Web Menggunakan Arsitektur Microservices di UPI YPTK Padang&quot;
                  </h4>
                  <p className="text-xs text-[#616161] mt-2 leading-relaxed">
                    <strong>Abstrak Singkat:</strong> Penelitian ini bertujuan untuk mengoptimalkan proses pemantauan tugas akhir mahasiswa secara visual, terintegrasi notifikasi WhatsApp, serta meningkatkan transparansi alur bimbingan hingga yudisium.
                  </p>
                </div>

                {/* Metadata & Pembimbing Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E0E0E0]">
                  <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#E0E0E0]">
                    <p className="text-[11px] font-semibold text-[#616161] uppercase tracking-wider font-display">
                      Pembimbing Utama (I)
                    </p>
                    <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                      Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.
                    </p>
                    <p className="text-[11px] font-mono-data text-[#616161]">
                      NIDN: 1012057301 • Kuota Terisi: 6/8
                    </p>
                  </div>

                  <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#E0E0E0]">
                    <p className="text-[11px] font-semibold text-[#616161] uppercase tracking-wider font-display">
                      Pembimbing Pendamping (II)
                    </p>
                    <p className="text-xs font-bold text-[#1A1A1A] mt-1">
                      Dr. Jasmir, S.Kom., M.Kom.
                    </p>
                    <p className="text-[11px] font-mono-data text-[#616161]">
                      NIDN: 1024088002 • Kuota Terisi: 5/8
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat-style Bimbingan Log Thread Preview */}
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#E0E0E0] pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#FF5722]" />
                    <h3 className="font-semibold text-sm text-[#1A1A1A] font-display">
                      Log Bimbingan Terakhir (Sesi #5)
                    </h3>
                  </div>
                  <span className="text-xs font-mono-data text-[#616161]">
                    24 Juli 2026, 14:30 WIB
                  </span>
                </div>

                {/* Log Thread Messages */}
                <div className="space-y-3">
                  {/* Student Bubble */}
                  <div className="bg-[#FBE9E7]/60 p-3.5 rounded-lg border border-[#FF5722]/20 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#D32F2F]">
                        Danu Zen (Mahasiswa)
                      </p>
                      <span className="text-[10px] font-mono-data text-[#616161]">
                        Naskah_Bab3_V2.pdf
                      </span>
                    </div>
                    <p className="text-xs text-[#212121]">
                      &quot;Pak, saya telah memperbarui Diagram Sequence dan ERD pada Bab 3 sesuai dengan masukkan pada sesi sebelumnya. Mohon ketersediaan Bapak untuk memeriksa kembali.&quot;
                    </p>
                  </div>

                  {/* Lecturer Bubble */}
                  <div className="bg-[#FFF8E1]/80 p-3.5 rounded-lg border border-[#FFC107]/40 space-y-1 ml-4 border-l-4 border-l-[#FFC107]">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#B78103]">
                        Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc. (Pembimbing I)
                      </p>
                      <span className="text-[10px] font-mono-data text-[#B78103]">
                        Feedback Disetujui
                      </span>
                    </div>
                    <p className="text-xs text-[#212121]">
                      &quot;Diagram sequence Bab 3 sudah rapi dan sesuai alur. Silakan lanjutkan pengerjaan Bab 4 (Implementasi &amp; Pengujian). Persiapkan draf kasar untuk persiapan ACC Seminar.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (1 Col): Status Cards & Info Requirements */}
            <div className="space-y-6">
              {/* Syarat ACC Seminar Card */}
              <div className="bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs space-y-4">
                <h3 className="font-semibold text-sm text-[#1A1A1A] font-display border-b border-[#E0E0E0] pb-2">
                  Syarat Kelayakan ACC Seminar
                </h3>

                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#212121]">Clearing SKS & IPK</p>
                      <p className="text-[11px] text-[#616161]">Terpenuhi (144 SKS)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#2F8F5B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#212121]">Minimal 5 Sesi Bimbingan</p>
                      <p className="text-[11px] text-[#616161]">Terpenuhi (5 / 8 Sesi)</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5 text-xs opacity-75">
                    <Clock className="w-4 h-4 text-[#C77B1E] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#212121]">Persetujuan (ACC) Pembimbing</p>
                      <p className="text-[11px] text-[#C77B1E] font-medium">Menunggu Klik ACC Dosen</p>
                    </div>
                  </li>
                </ul>

                <button
                  disabled
                  className="w-full py-2.5 rounded-lg text-xs font-semibold bg-[#FAFAFA] border border-[#E0E0E0] text-[#616161] cursor-not-allowed text-center"
                >
                  Ajukan ACC Seminar (Terkunci)
                </button>
              </div>

              {/* Quick Info Contact Card */}
              <div className="bg-[#1A1A1A] text-white rounded-xl p-5 shadow-xs space-y-3 border-t-2 border-t-[#FFC107]">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#FFC107]" />
                  <h4 className="font-bold text-sm font-display text-white">
                    Admin Prodi Teknik Informatika
                  </h4>
                </div>
                <p className="text-xs text-[#E0E0E0] leading-relaxed">
                  Perlu bantuan seputar kuota dosen atau jadwal ruang sidang? Silakan hubungi Sekretariat Prodi Informatika.
                </p>
                <div className="pt-2 text-xs font-mono-data text-[#FFC107]">
                  WA Center: +62 812-6789-0101
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
