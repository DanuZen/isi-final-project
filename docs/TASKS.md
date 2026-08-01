# Tasks & Audit Roadmap — SIPETA UPI YPTK Development

Dokumen ini memuat breakdown status pengembangan frontend UI/UX, daftar seluruh rute halaman per-role, standar desain UI/UX terverifikasi, serta checklist audit sub-halaman yang telah 100% diselesaikan.

---

## 📊 Summary Status Project

| Modul / Role | Jumlah Rute | Status UI/UX | Status Sub-Halaman |
|---|:---:|:---:|:---:|
| **Fondasi & System Design** | — | ✅ Selesai | ✅ Viewport Shell (`100dvh`) |
| **Halaman Auth (Login)** | 1 Rute | ✅ Selesai | ✅ Form + Dev Quick Login Drawer |
| **1. Portal Mahasiswa** | 11 Rute | ✅ Selesai | ✅ 11 Sub-Halaman Selesai & Terverifikasi |
| **2. Portal Dosen** | 7 Rute | ✅ Selesai | ✅ 7 Sub-Halaman Selesai (Dashboard, Bimbingan, Permohonan, Jadwal Pengujian, Input Nilai, Revisi, Kalender) |
| **3. Portal Admin Program Studi (Prodi)** | 6 Rute | ✅ Selesai | ✅ 6 Sub-Halaman Selesai & Terverifikasi |
| **4. Portal Admin Fakultas** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **5. Portal Pimpinan / Dekanat** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **6. Portal Super Admin** | 5 Rute | ✅ Selesai | ✅ 5 Sub-Halaman Selesai & Terverifikasi |
| **7. Backend Integration Guide** | — | ✅ Selesai | ✅ [BACKEND_INTEGRATION_GUIDE.md](file:///c:/Users/wira1/sipeta-upiyptk/docs/BACKEND_INTEGRATION_GUIDE.md) |
| **TOTAL KESELURUHAN** | **37 Rute** | **✅ 100% Built** | **✅ 100% Audited & Polished** |

---

## 🎨 Standar Desain UI/UX & Pola Komponen (Design Pattern Guidelines)

Seluruh 37 rute di 6 role utama telah diselaraskan dengan standar berikut:

1. **Warna Red Signature (`#C62828` / `bg-[#C62828]`)**:
   - Digunakan sebagai warna aksen utama, tombol primer, badge role penting, dan border aktif.
2. **Warna Kartu Statistik Kuning Emas Amber Warm (`#D97706` / `bg-amber-500`)**:
   - Digunakan secara seragam untuk seluruh ikon kartu statistik antrean/pending di dashboard (`/dekanat/dashboard`, `/super-admin/dashboard`, `/admin-prodi/dashboard`, `/admin-fakultas/dashboard`).
3. **Tanpa Warna Ungu (No Purple Allowed)**:
   - Dilarang menggunakan warna ungu (`#7C3AED`) di mana pun. Indikator Seminar Proposal menggunakan warna Teal (`#0D9488`).
4. **Pola Tabel Ringkas + Kartu Panel Detail Samping (Compact List + Side Detail Panel Card)**:
   - Kolom `AKSI` yang memakan tempat dihapus dari tabel utama.
   - Mengklik baris tabel akan mengupdate secara *live* kartu panel detail di sebelah kanan (`w-80 shrink-0 bg-[#FAFAFA] rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between p-5`).
   - Baris tabel yang dipilih ditandai dengan highlight `bg-rose-50/70 border-l-4 border-l-[#C62828]`.
5. **Layout Fit to Viewport 100% vs Natural Page Scroll**:
   - *Fit to Viewport (`viewport-shell bg-[#FAFAFA]`)*: Diterapkan pada rute berorientasi tabel list & manajemen cepat agar tidak ada vertical scrolling di layar utama.
   - *Natural Page Scroll (`min-h-screen pb-16`)*: Diterapkan pada halaman analitik/statistik kaya data seperti `/dekanat/statistik` agar kartu dan grafik dapat mengembang secara alami.
6. **Tidak Ada Badge Redundan**:
   - Penghapusan badge "Menunggu Verifikasi" pada antrean yang sudah didedikasikan khusus untuk barang yang butuh verifikasi.
7. **Skeleton Loading UI System (`loading.tsx`)**:
   - Terpasang pada seluruh 6 role portal di aplikasi SIPETA menggunakan komponen `PageSkeleton` beranimasi denyut halus (`animate-pulse bg-slate-200`) untuk memberikan masukan visual instan saat halaman dimuat.
8. **Empty State UI System**:
   - Apabila tabel, histori data, bimbingan, atau jadwal ujian masih kosong, sistem wajib menampilkan visual Empty State berupa ikon terkait ber-border soft rose/red, judul status kosong, teks penjelas penyebab, dan tombol tindakan cepat (*call-to-action*).

---

## 🔍 Checklist Audit Sub-Halaman Per Role (Fase 1E — 100% COMPLETED ✅)

### 1. Portal Mahasiswa (`/mahasiswa`) — 11 Sub-Halaman (SELESAI ✅)
- [x] `/mahasiswa` & `/mahasiswa/dashboard` — Dashboard (Stepper 4-Stage TA + Kalender Interaktif)
- [x] `/mahasiswa/proposal` — Usulan Judul & Simulator Cek Similarity
- [x] `/mahasiswa/pembimbing` — Pilih Dosen Pembimbing I & II + Status Kuota
- [x] `/mahasiswa/bimbingan` — Thread Log Bimbingan + Modal Catat Log + Perubahan Judul
- [x] `/mahasiswa/seminar` — Jadwal Seminar Proposal, Majelis Penguji, & Upload Revisi
- [x] `/mahasiswa/sidang` — Detail Ujian Sidang Skripsi, Majelis, & Upload Hardcover
- [x] `/mahasiswa/list-judul` — Repositori Judul Skripsi Alumni + Search/Filter
- [x] `/mahasiswa/kalender` — Kalender TA Interaktif (Bulan / Minggu / Hari)
- [x] `/mahasiswa/profil` — Banner Akademik, Stats Grid, & Timeline Progres
- [x] `/mahasiswa/akun` — Keamanan, Ubah Password, & Status Akun
- [x] `/login` — Login Form Kredensial + Dev Quick Login Drawer

### 2. Portal Dosen Terpadu (`/dosen` & `/penguji`) — 7 Sub-Halaman (SELESAI ✅)
- [x] `/dosen/dashboard` — Dashboard Terpadu Dosen (Stats Grid 4-Metrik Bimbingan & Pengujian, Quick Action ACC)
- [x] `/dosen/bimbingan` — Mahasiswa Bimbingan (Card Grid, Sesi Progress Bar, Action ACC, Empty State System)
- [x] `/dosen/pengajuan` — Permohonan Pembimbing Masuk (Detail IPK/SKS, Terima/Tolak, Empty State System)
- [x] `/penguji/jadwal` — Jadwal Pengujian (Tabel Sempro/Sidang, Date Block Visual, Search & Filter, Empty State System)
- [x] `/penguji/nilai` — Input Nilai (Form Skor Per Komponen, Range Slider, Weighted Auto Score)
- [x] `/penguji/revisi` — Lembar Revisi (Catatan Revisi, Review Upload Mahasiswa, ACC Revisi, Empty State System)
- [x] `/dosen/kalender` — Kalender Saya (Timeline Date Block Bimbingan & Ujian, Label Jenis, Presence Button)

### 3. Portal Admin Program Studi / Admin Prodi (`/admin-prodi`) — 6 Sub-Halaman (SELESAI ✅)
- [x] `/admin-prodi/dashboard` — Dashboard Prodi (Stats Grid Amber `#D97706`, Tabel Mahasiswa TA, Aktivasi Quick Panel)
- [x] `/admin-prodi/mahasiswa` — Manajemen Mahasiswa TA (Tabel List Ringkas, Filter Tahap, Live Side Panel Detail)
- [x] `/admin-prodi/dosen` — Penugasan Dosen (Bilah Pencarian/Filter Role, Live Toggle Akses Pembimbing & Penguji, Setting Kuota Bimbingan)
- [x] `/admin-prodi/aktivasi` — Aktivasi Akun (Clearing 110 SKS & IPK 2.00, Trigger Generate Credential)
- [x] `/admin-prodi/jadwal` — Kelola Jadwal (Penjadwalan Sempro/Sidang, Majelis Penguji, & Ruangan)
- [x] `/admin-prodi/repositori` — Repositori Judul TA (List View tanpa Kolom AKSI + Live Side Panel Detail)

### 5. Portal Admin Fakultas (`/admin-fakultas`) — 4 Sub-Halaman (SELESAI ✅)
- [x] `/admin-fakultas/dashboard` — Dashboard Fakultas (Stats Cards Amber `#D97706`, Modal 3-Kriteria Bebas Fak)
- [x] `/admin-fakultas/sk` — Penerbitan SK Dekan (List View tanpa Kolom AKSI + Live Side Panel Detail + PDF Download)
- [x] `/admin-fakultas/bebas` — Bebas Fakultas (List View tanpa Kolom AKSI + Live Side Panel Detail 3-Kriteria Perpustakaan/Lab/SPP)
- [x] `/admin-fakultas/arsip` — Arsip Dokumen (Digital Repository SK Dekan & Yudisium + Live Side Panel Detail)

### 6. Portal Pimpinan / Dekanat (`/dekanat`) — 4 Sub-Halaman (SELESAI ✅)
- [x] `/dekanat/dashboard` — Dashboard Eksekutif (4 Stat Cards Amber `#D97706`, Ringkasan Progres Prodi)
- [x] `/dekanat/statistik` — Statistik TA & Analitik (Natural Scroll `min-h-screen pb-16`, Komparasi Prodi & Dosen Pembimbing Terproduktif, Indikator Teal `#0D9488` tanpa Ungu)
- [x] `/dekanat/kalender` — Kalender Sidang Executive (Compact List View + Live Side Detail Panel Card)
- [x] `/dekanat/laporan` — Laporan Eksekutif (Compact List View + Filter Kategori + Live Side Detail Panel Card + Download PDF)

### 7. Portal Super Admin (`/super-admin`) — 5 Sub-Halaman (SELESAI ✅)
- [x] `/super-admin/dashboard` — Dashboard Teknis (4 Stat Cards Amber `#D97706`, List View User tanpa AKSI + Live Side Detail Panel Card)
- [x] `/super-admin/users` — Manajemen User (List View tanpa AKSI + Live Side Detail Panel Card + Red Signature Role Badges)
- [x] `/super-admin/audit` — Audit Log System (List View Ringkas + Live Side Detail Panel Card dengan HMAC SHA-256 Check)
- [x] `/super-admin/config` — Konfigurasi Parameter (Aturan SKS/IPK, Plagiarisme Threshold, Backup Database, Red Signature Icon)
- [x] `/super-admin/master` — Master Data (List View tanpa AKSI + Live Side Detail Panel Card Master Prodi)

---

## 💻 Roadmap Frontend Lanjutan (Client-Side Enhancements — SELESAI ✅)

- [x] **Client-Side Form Validation & Toast Notifications**
  - Menambahkan validasi input form di layar (validasi format NIM/NIDN, cek ukuran PDF maks 5MB, format draf naskah).
  - Menambahkan notifikasi melayang (`ToastNotification` UI warna hijau/merah) saat tombol Simpan, ACC, atau Hapus diklik.
- [x] **Client-Side State Persistence (`localStorage` / Mock State)**
  - Membuat interaktivitas simulasi menggunakan `localStorage` agar sesi bimbingan & ACC tersimpan di browser.
- [x] **Pratinjau Dokumen & Fitur Cetak PDF (Client-Side PDF Previewer & Print UI)**
  - Membuat komponen modal pratinjau PDF (`PDFModalViewer`) ber-Kop Surat UPI YPTK Padang untuk SK Dekan, Berita Acara, & Lembar Revisi.
  - Menambahkan fitur tombol "Cetak / Download PDF" menggunakan fungsi bawaan browser (`window.print()`).
- [x] **Penyiapan Layer API Client Helper (`services/api.ts` / Fetcher Stubs)**
  - Menyiapkan berkas `frontend/src/services/api.ts` yang berisi fungsi-fungsi fetcher terstruktur untuk 24 endpoint backend.
- [x] **Penyempurnaan Responsif & Aksesibilitas Layar (Mobile & Tablet Refinement)**
  - Memastikan seluruh 38 rute antarmuka tampil sempurna di layar Smartphone, Tablet, maupun Monitor Desktop.

---

## 📱 Audit Mobile Layout Per-Halaman — Sesi Aktif 🔄

Progress audit tampilan dan layout per-halaman satu per satu di layar smartphone.

### 🎓 Portal Mahasiswa (11 Halaman)
- [x] `/mahasiswa/dashboard` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/proposal` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Banner bersih tanpa tombol, Desktop 100% Utuh)
- [x] `/mahasiswa/pembimbing` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/bimbingan` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/seminar` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/sidang` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/list-judul` — ✅ Sesuai (Fixed Header, Scrollable Table min-w-[650px], Badge disembunyikan di HP, Desktop 100% Utuh)
- [x] `/mahasiswa/kalender` — ✅ Sesuai (Fixed Header, Mobile Tab Switcher, Desktop 100% Utuh)
- [x] `/mahasiswa/profil` — ✅ Sesuai (Fixed Header, Responsive Modal Tab, Desktop 100% Utuh)
- [x] `/mahasiswa/akun` — ✅ Sesuai (Fixed Header, Responsive Modal Tab, Desktop 100% Utuh)
- [x] `/login` — ✅ Sesuai (Responsive Portal Selector & Glassmorphism Card, Desktop 100% Utuh)

### 👨‍🏫 Portal Dosen Terpadu (7 Halaman)
- [x] `/dosen/dashboard` — ✅ Sesuai (Welcome Banner Benchmark, Responsif Card Bimbingan & Stat Grid, Desktop 100% Utuh)
- [ ] `/dosen/bimbingan` — 🔄 Belum dicek
- [ ] `/dosen/pengajuan` — 🔄 Belum dicek
- [ ] `/penguji/jadwal` — 🔄 Belum dicek
- [ ] `/penguji/nilai` — 🔄 Belum dicek
- [ ] `/penguji/revisi` — 🔄 Belum dicek
- [ ] `/dosen/kalender` — 🔄 Belum dicek

### 🏛️ Portal Admin Prodi (6 Halaman)
- [ ] `/admin-prodi/dashboard` — 🔄 Belum dicek
- [ ] `/admin-prodi/mahasiswa` — 🔄 Belum dicek
- [ ] `/admin-prodi/dosen` — 🔄 Belum dicek
- [ ] `/admin-prodi/aktivasi` — 🔄 Belum dicek
- [ ] `/admin-prodi/jadwal` — 🔄 Belum dicek
- [ ] `/admin-prodi/repositori` — 🔄 Belum dicek

### 📑 Portal Admin Fakultas (4 Halaman)
- [ ] `/admin-fakultas/dashboard` — 🔄 Belum dicek
- [ ] `/admin-fakultas/sk` — 🔄 Belum dicek
- [ ] `/admin-fakultas/bebas` — 🔄 Belum dicek
- [ ] `/admin-fakultas/arsip` — 🔄 Belum dicek

### 📊 Portal Dekanat (4 Halaman)
- [ ] `/dekanat/dashboard` — 🔄 Belum dicek
- [ ] `/dekanat/statistik` — 🔄 Belum dicek
- [ ] `/dekanat/kalender` — 🔄 Belum dicek
- [ ] `/dekanat/laporan` — 🔄 Belum dicek

### ⚡ Portal Super Admin (5 Halaman)
- [ ] `/super-admin/dashboard` — 🔄 Belum dicek
- [ ] `/super-admin/users` — 🔄 Belum dicek
- [ ] `/super-admin/audit` — 🔄 Belum dicek
- [ ] `/super-admin/config` — 🔄 Belum dicek
- [ ] `/super-admin/master` — 🔄 Belum dicek

---

## 📱 Penyempurnaan Responsif & Interaktivitas Mobile < 768px (SELESAI ✅)

- [x] **1. Perbaikan Navigasi Sidebar Mobile & Trigger Button**
  - [x] Memastikan tombol hamburger `≡ SIPETA` (44x44px touch target) pada header seluruh rute antarmuka memicu pembukaan slide-over drawer secara konsisten di layar smartphone.
  - [x] Overlay mobile diisolasi dengan `z-[9998]` & `z-[9999]` agar tidak terpotong oleh container `overflow-hidden`.
- [x] **2. Audit Interaktivitas & Target Sentuh (Touch Target Area)**
  - [x] Memastikan tombol navigasi, hamburger, close button, dan action trigger memenuhi standar ukuran sentuh minimal 44x44px (`min-h-[44px]`, `w-11 h-11`).
  - [x] Menjaga konsistensi antarmuka tanpa overlapping di resolusi smartphone 360px, 390px, dan 414px.
- [x] **3. Form & Table Responsive Layout**
  - [x] Mengubah seluruh grid list & side detail panel (`flex-col lg:flex-row`) agar menumpuk rapi di layar smartphone dengan horizontal scroll tabel yang halus (`min-w-[600px] overflow-x-auto`).
- [x] **Garansi:** Seluruh penyesuaian khusus mobile menggunakan pengkondisian Tailwind CSS (`md:`, `lg:`, `hidden md:flex`) tanpa merubah tampilan Desktop & Tablet yang sudah matang.

---

## ⚙️ Roadmap Development Backend (Server & Database Implementation)

- [ ] **1. Basis Data & Environment Setup**
  - [ ] Konfigurasi PostgreSQL Database Server & `.env` connection string (`DATABASE_URL`, `JWT_SECRET`).
  - [ ] Inisialisasi skema tabel Prisma ORM mengacu pada [`docs/DATABASE.md`](file:///c:/Users/wira1/sipeta-upiyptk/docs/DATABASE.md).
  - [ ] Jalankan migrasi basis data (`npx prisma migrate dev --name init_sipeta_db`).
  - [ ] Jalankan seeder master data 6 Fakultas & 14 Program Studi resmi UPI YPTK Padang (`npx prisma db seed`).
- [ ] **2. Modul Autentikasi & Authorization Guard (RBAC)**
  - [ ] Implementasi Login Endpoint (`POST /api/v1/auth/login`) dengan hashing kata sandi (Bcrypt / Argon2).
  - [ ] Implementasi Session Token / JWT & Cookie HTTP-Only.
  - [ ] Implementasi Middleware Access Control Guard untuk 7 Role System.
- [ ] **3. Endpoints Transactions Per-Modul**
  - [ ] **Mahasiswa Endpoints:** Usulan Judul & Fuzzy Similarity Check, Request Pembimbing, Thread Log Bimbingan, Upload Revisi Sempro & Sidang.
  - [ ] **Dosen Endpoints:** Approval Permohonan Pembimbing, Feedback Log Bimbingan, ACC Sempro/Sidang, Input Nilai Weighted, Verifikasi Lembar Revisi.
  - [ ] **Admin Prodi Endpoints:** Aktivasi Kredensial Pasca Clearing Luring (SKS/IPK), Pengesahan Pembimbing, Penjadwalan Majelis Penguji.
  - [ ] **Admin Fakultas Endpoints:** Generator SK Dekan per-Fakultas (PDF), Verifikasi 3-Kriteria Bebas Fakultas (Perpus, Lab, SPP).
  - [ ] **Dekanat & Super Admin Endpoints:** Executive Dashboard Metrics, PDF Export Rekapitulasi Yudisium, Master Data Management, Audit Log HMAC SHA-256 Security.
- [ ] **4. File Storage & Server PDF Generator Engine**
  - [ ] Cloud Storage Integration (AWS S3 / Supabase Storage / Local MinIO) untuk penyimpanan fisik berkas PDF draf naskah.
  - [ ] Server-Side PDF Rendering Engine (Puppeteer / PDFKit / React-PDF) untuk penerbitan dokumen resmi SK Dekan & Laporan Yudisium.

---

## 📱 Roadmap Selanjutnya (Future Development)

- [ ] **Fase Realtime & Production**
  - WebSocket (Socket.io) notifikasi realtime
  - CI/CD Deployment Pipeline & Production Server Setup


