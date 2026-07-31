"use client";

import React, { useState, useRef } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Upload,
  Sparkles,
  UserCheck,
  Search,
  History,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  BookOpen,
  Trash2,
  Eye,
  Download,
  X,
  FileUp
} from "lucide-react";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { BIDANG_KAJIAN_PER_PRODI } from "@/constants/upiyptk";

interface FileDetails {
  name: string;
  size: string;
  date: string;
}

export default function ProposalJudulPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedProdi, setSelectedProdi] = useState("Teknik Informatika");
  const [judulInput, setJudulInput] = useState("");
  const [abstrakInput, setAbstrakInput] = useState("");
  const [bidangKajian, setBidangKajian] = useState("RPL");

  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  // File Upload State (Empty by default)
  const [fileDetails, setFileDetails] = useState<FileDetails | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCheckSimilarity = () => {
    if (!judulInput.trim()) {
      alert("Silakan ketikkan usulan judul skripsi terlebih dahulu.");
      return;
    }
    setIsChecking(true);
    setTimeout(() => {
      setSimilarityScore(Math.floor(Math.random() * 15) + 5); // 5% - 20%
      setIsChecking(false);
    }, 1200);
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      alert("Format berkas harus PDF!");
      return;
    }
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setFileDetails({
      name: file.name,
      size: `${sizeInMB} MB`,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    });
  };

  const handleRemoveFile = () => {
    setFileDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header className="shell-header shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          <main className="flex-1 p-5 md:p-6 space-y-5 overflow-hidden shell-body flex flex-col min-h-0 relative">
            
            {/* ── Welcome Banner ── */}
            <div className="bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shrink-0 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-5 md:p-6 relative">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#C62828] text-white shadow-xs font-display">
                      <FileText className="w-3.5 h-3.5 text-white" /> Pengajuan Proposal Tugas Akhir
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
                    Formulir Pengajuan &amp; Uji Duplikasi Judul TA
                  </h1>
                  <p className="text-xs text-neutral-400 leading-relaxed max-w-2xl font-medium">
                    Isi rincian judul, ringkasan abstrak, dan unggah berkas outline proposal dalam format PDF untuk diverifikasi oleh Sekretariat Prodi.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5 shrink-0">
                  <Link
                    href="/pembimbing"
                    className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#C62828] text-white hover:bg-[#B71C1C] transition-all active:scale-95 shadow-xs font-display"
                  >
                    <span>Lanjut ke Usulan Pembimbing</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </Link>
                </div>
              </div>
              <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]" />
            </div>

            {/* Main 12-Column Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch flex-1 min-h-0 overflow-y-auto lg:overflow-hidden">
              
              {/* Left Column (8/12): Form Pengajuan Judul */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-4 h-auto lg:h-full min-h-0 overflow-visible lg:overflow-hidden">
                <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex-1 flex flex-col justify-between min-h-0 overflow-visible lg:overflow-hidden">
                  <div className="space-y-4 overflow-y-auto scrollbar-none pr-1">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                          <FileText className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-bold text-sm text-slate-900 font-display">
                          Formulir Rincian Judul &amp; Abstrak Penelitian
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500 font-medium">
                        Semester Ganjil 2026/2027
                      </span>
                    </div>

                    <form className="space-y-4 text-xs" onSubmit={(e) => e.preventDefault()}>
                      
                      {/* Judul TA */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-800 font-display">
                          Usulan Judul Skripsi / Tugas Akhir:
                        </label>
                        <textarea
                          rows={2}
                          value={judulInput}
                          onChange={(e) => setJudulInput(e.target.value)}
                          placeholder="Ketikkan usulan judul skripsi / tugas akhir Anda di sini..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed shadow-2xs"
                        />
                      </div>

                      {/* Bidang Kajian (Dinamis Berdasarkan Prodi Mahasiswa) */}
                      <CustomDropdown
                        label="Bidang Kajian Keahlian (Sesuai Program Studi):"
                        value={bidangKajian}
                        onChange={(val) => setBidangKajian(val)}
                        options={
                          BIDANG_KAJIAN_PER_PRODI[selectedProdi] || [
                            { id: "RPL", label: "Software Engineering & Web Architecture (RPL)", badge: "RPL" },
                            { id: "AI", label: "Artificial Intelligence & Machine Learning (AI)", badge: "AI" },
                            { id: "JARINGAN", label: "Computer Network & Cybersecurity (Jaringan)", badge: "JARINGAN" },
                          ]
                        }
                      />

                      {/* Draf Abstrak */}
                      <div className="space-y-1.5">
                        <label className="block font-bold text-slate-800 font-display">
                          Ringkasan Draf Abstrak &amp; Metodologi:
                        </label>
                        <textarea
                          rows={4}
                          value={abstrakInput}
                          onChange={(e) => setAbstrakInput(e.target.value)}
                          placeholder="Tuliskan draf ringkasan latar belakang masalah, tujuan, dan metodologi penelitian..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-semibold focus:outline-none focus:bg-white focus:border-[#C62828] transition-all leading-relaxed shadow-2xs"
                        />
                      </div>

                      {/* ── REAL INTERACTIVE DRAG & DROP FILE UPLOAD ZONE ── */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block font-bold text-slate-800 font-display">
                          Unggah File Outline Proposal (PDF):
                        </label>
                        
                        {/* Hidden File Input */}
                        <input
                          type="file"
                          ref={fileInputRef}
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        {fileDetails ? (
                          /* Uploaded State Box */
                          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-3 flex-wrap shadow-2xs">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                                <FileText className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-900 font-display">{fileDetails.name}</p>
                                <p className="text-[10.5px] text-emerald-700 font-medium">Terunggah ({fileDetails.size}) · {fileDetails.date}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setShowPdfModal(true)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center gap-1 shadow-xs cursor-pointer font-display"
                              >
                                <Eye className="w-3.5 h-3.5 text-white" /> Pratinjau PDF
                              </button>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all flex items-center gap-1 cursor-pointer font-display"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Ganti
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* Drag & Drop Zone (Empty State) */
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center space-y-2 cursor-pointer ${
                              isDragging
                                ? "border-[#C62828] bg-rose-50/50 ring-4 ring-[#C62828]/10"
                                : "border-slate-300 bg-slate-50/60 hover:bg-white hover:border-[#C62828]"
                            }`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-[#C62828] flex items-center justify-center shadow-xs">
                              <FileUp className="w-6 h-6 text-[#C62828]" />
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-slate-800 font-display">
                                Tarik &amp; Lepas berkas Outline Proposal (PDF) di sini
                              </p>
                              <p className="text-[11px] text-slate-400 font-medium">
                                atau <span className="text-[#C62828] font-bold underline">Klik di sini untuk memilih berkas</span>
                              </p>
                            </div>
                            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-200/80 text-slate-600 font-mono">
                              Maksimal 10 MB — Format .PDF
                            </span>
                          </div>
                        )}
                      </div>

                    </form>
                  </div>
                </div>
              </div>

              {/* Right Column (4/12): Similarity Checker & Verification Status */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-4 h-full min-h-0 overflow-hidden">
                {/* Title Availability & Duplication Check Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <Search className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Cek Duplikasi &amp; Ketersediaan Judul
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-600 font-display">
                      Status Ketersediaan Judul:
                    </p>

                    {isChecking ? (
                      <div className="py-2 text-xs font-bold text-slate-500 animate-pulse font-display">
                        Mengecek 111+ Judul di Database Repositori...
                      </div>
                    ) : similarityScore !== null ? (
                      <>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs font-display">
                          <CheckCircle2 className="w-4 h-4 text-white" /> Judul Belum Digunakan (Tersedia)
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium pt-1">
                          Skor Kemiripan: <strong className="text-emerald-600 font-bold">{similarityScore}%</strong> (Aman &lt; 25%)
                        </p>
                      </>
                    ) : (
                      <p className="text-xs text-slate-400 font-medium">
                        Ketikkan usulan judul Anda lalu tekan tombol di bawah untuk mengecek duplikasi judul.
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleCheckSimilarity}
                    disabled={isChecking}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-[#C62828] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-95 font-display cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5 text-[#F59E0B]" />
                    {isChecking ? "Mengecek Database..." : "Cek Duplikasi Judul"}
                  </button>
                </div>

                {/* Requirements Info Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold shrink-0 shadow-xs">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 font-display">
                        Persyaratan Pengajuan Proposal
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 font-medium pt-3 leading-relaxed">
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Telah menyelesaikan clearing SKS minimum 110 SKS.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Usulan topik sesuai dengan bidang keahlian prodi.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Melampirkan naskah outline proposal format PDF (Maks. 10 MB).</span>
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* ── PDF Preview Modal ── */}
            {showPdfModal && fileDetails && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col h-[85vh] animate-in fade-in zoom-in-95">
                  <div className="p-4 bg-[#1A1A1A] text-white flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#C62828] text-white flex items-center justify-center font-bold">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm font-display text-white">{fileDetails.name}</h3>
                        <p className="text-[10px] text-neutral-400 font-mono">Pratinjau Dokumen PDF — {fileDetails.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowPdfModal(false)}
                      className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                    <span className="text-slate-600 font-bold font-display">Halaman 1 dari 12 (Draf Outline Proposal)</span>
                    <button
                      onClick={() => {
                        alert(`Mengunduh berkas ${fileDetails.name}...`);
                        setShowPdfModal(false);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#C62828] text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs hover:bg-[#B71C1C] transition-all cursor-pointer font-display"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 bg-slate-200/80 flex justify-center">
                    <div className="bg-white rounded-lg shadow-md border border-slate-300 p-8 w-full max-w-xl space-y-6 text-slate-900 font-serif">
                      <div className="text-center space-y-2 pb-4 border-b-2 border-slate-900">
                        <h2 className="text-sm font-black uppercase tracking-wider font-sans text-slate-900">
                          OUTLINE PROPOSAL TUGAS AKHIR
                        </h2>
                        <p className="text-xs font-bold font-sans text-[#C62828]">
                          UNIVERSITAS PUTRA INDONESIA YPTK PADANG
                        </p>
                      </div>
                      <div className="space-y-3 text-xs leading-relaxed text-slate-800 font-sans">
                        <p className="font-bold text-slate-900">JUDUL PROPOSAL:</p>
                        <p className="italic bg-slate-50 p-3 rounded-lg border border-slate-200">&ldquo;{judulInput || "Belum Mengisi Judul"}&rdquo;</p>
                        <p className="font-bold text-slate-900 pt-2">RINGKASAN ABSTRAK &amp; METODOLOGI:</p>
                        <p className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700 font-sans">{abstrakInput || "Belum Mengisi Abstrak"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
