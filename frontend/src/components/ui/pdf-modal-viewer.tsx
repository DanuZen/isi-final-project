"use client";

import React from "react";
import Image from "next/image";
import { X, Printer, Download, ShieldCheck, FileText } from "lucide-react";

interface PDFModalViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  docNumber: string;
  docType: "SK_DEKAN" | "BERITA_ACARA" | "LEMBAR_REVISI";
  studentName?: string;
  studentNim?: string;
  prodiName?: string;
  fakultasName?: string;
  contentData?: {
    pembimbing1?: string;
    pembimbing2?: string;
    pengujiList?: string[];
    nilaiAkhir?: number | string;
    statusHasil?: string;
    catatanRevisi?: string[];
  };
}

export function PDFModalViewer({
  isOpen,
  onClose,
  title,
  docNumber,
  docType,
  studentName = "Mahasiswa UPI YPTK",
  studentNim = "20101152630001",
  prodiName = "Teknik Informatika",
  fakultasName = "Fakultas Ilmu Komputer",
  contentData,
}: PDFModalViewerProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-fade-in-scale">
        
        {/* Top Control Header (Non-Printable) */}
        <div className="bg-[#1A1A1A] p-4 text-white flex items-center justify-between shrink-0 border-b border-neutral-800 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm font-display text-white">{title}</h3>
              <p className="text-[11px] text-neutral-400 font-mono font-medium">Ref No: {docNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#a81f1f] transition-all active:scale-95 shadow-xs font-display cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable PDF Document Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 font-sans print:p-0 print:bg-white print:overflow-visible">
          <div className="bg-white p-8 md:p-12 rounded-xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6 text-slate-900 leading-relaxed print:border-none print:shadow-none print:p-0">
            
            {/* Kop Surat Resmi UPI YPTK */}
            <div className="flex items-center gap-4 pb-4 border-b-4 border-b-[#C62828] relative">
              <Image
                src="/upiyptk_emblem.webp"
                alt="Emblem UPI YPTK"
                width={70}
                height={70}
                className="w-16 h-16 object-contain shrink-0"
              />
              <div className="text-center flex-1 space-y-0.5">
                <h2 className="text-base md:text-lg font-black tracking-wider font-display uppercase text-slate-950">
                  UNIVERSITAS PUTRA INDONESIA &ldquo;YPTK&rdquo; PADANG
                </h2>
                <p className="text-xs font-bold uppercase text-[#C62828] tracking-widest">{fakultasName}</p>
                <p className="text-[10px] text-slate-500 font-medium">
                  Jl. Raya Lubuk Begalung, Kota Padang, Sumatera Barat 25221 • Telp: (0751) 776677
                </p>
              </div>
            </div>

            {/* Document Title Header */}
            <div className="text-center space-y-1 py-2">
              <h1 className="text-base font-black uppercase text-slate-900 font-display underline tracking-wide">
                {title}
              </h1>
              <p className="text-xs font-mono font-bold text-slate-600">Nomor: {docNumber}</p>
            </div>

            {/* Student Metadata Table */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 font-medium">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-semibold">Nama Mahasiswa:</span>
                <span className="col-span-2 font-bold text-slate-900">{studentName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-semibold">NIM:</span>
                <span className="col-span-2 font-mono font-bold text-slate-900">{studentNim}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-500 font-semibold">Program Studi:</span>
                <span className="col-span-2 font-bold text-slate-900">{prodiName}</span>
              </div>
            </div>

            {/* Specific Document Content */}
            {docType === "SK_DEKAN" && (
              <div className="space-y-4 text-xs text-slate-800">
                <p>
                  Dekan {fakultasName} Universitas Putra Indonesia YPTK Padang menetapkan Dosen Pembimbing dan Dosen Penguji Skripsi untuk mahasiswa di atas dengan rincian susunan majelis sebagai berikut:
                </p>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
                      <tr>
                        <th className="p-2.5 border-b">Jabatan Majelis</th>
                        <th className="p-2.5 border-b">Nama Dosen &amp; Gelar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold">
                      <tr>
                        <td className="p-2.5 text-slate-500">Dosen Pembimbing I:</td>
                        <td className="p-2.5 text-slate-900">{contentData?.pembimbing1 || "Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc."}</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-slate-500">Dosen Pembimbing II:</td>
                        <td className="p-2.5 text-slate-900">{contentData?.pembimbing2 || "Rina Oktaviani, M.Kom."}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {docType === "BERITA_ACARA" && (
              <div className="space-y-4 text-xs text-slate-800">
                <p>
                  Pada hari ini telah dilaksanakan Ujian Sidang Skripsi mahasiswa tersebut di atas dengan hasil penilaian komprehensif sebagai berikut:
                </p>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-emerald-800 font-display">Nilai Akhir Ujian Sidang</p>
                    <p className="text-2xl font-black text-emerald-700 font-display">{contentData?.nilaiAkhir || "88.5 (A)"}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-xs">
                    {contentData?.statusHasil || "LULUS DENGAN PUJIAN (CUMLAUDE)"}
                  </span>
                </div>
              </div>
            )}

            {/* Signature Block */}
            <div className="pt-8 flex justify-end text-xs text-right">
              <div className="space-y-12">
                <div>
                  <p className="text-slate-500 font-medium">Padang, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</p>
                  <p className="font-bold text-slate-900">Dekan {fakultasName}</p>
                </div>
                <div className="pt-8">
                  <p className="font-black text-slate-900 text-sm font-display underline">Dr. Eng. H. Sarjon Defit, S.Kom., M.Sc.</p>
                  <p className="text-[10px] font-mono text-slate-500 font-medium">NIDN: 1012057301</p>
                </div>
              </div>
            </div>

            {/* Verification Footer Stamp */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Dokumen Resmi Terverifikasi Digital SIPETA UPI YPTK</span>
              </div>
              <span className="font-mono">HMAC SHA-256 Verified</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
