# Tasks & Audit Roadmap — SIPETA UPI YPTK Development

Dokumen ini memuat breakdown status pengembangan frontend UI/UX, daftar seluruh rute halaman per-role, standar desain UI/UX terverifikasi, serta checklist audit sub-halaman yang telah 100% diselesaikan.

---

## 📊 Summary Status Project

| Modul / Role | Jumlah Rute | Status UI/UX | Status Sub-Halaman |
|---|:---:|:---:|:---:|
| **Fondasi & System Design** | — | ✅ Selesai | ✅ Viewport Shell (`100dvh`) |
| **Halaman Auth (Login)** | 1 Rute | ✅ Selesai | ✅ Form + Dev Quick Login Drawer |
| **1. Portal Mahasiswa** | 11 Rute | ✅ Selesai | ✅ 11 Sub-Halaman Selesai & Terverifikasi |
| **2. Portal Dosen Pembimbing** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **3. Portal Dosen Penguji** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **4. Portal Admin Prodi FIK** | 5 Rute | ✅ Selesai | ✅ 5 Sub-Halaman Selesai & Terverifikasi |
| **5. Portal Admin Fakultas** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **6. Portal Pimpinan / Dekanat** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Selesai & Terverifikasi |
| **7. Portal Super Admin** | 5 Rute | ✅ Selesai | ✅ 5 Sub-Halaman Selesai & Terverifikasi |
| **TOTAL KESELURUHAN** | **38 Rute** | **✅ 100% Built** | **✅ 100% Audited & Polished** |

---

## 🎨 Standar Desain UI/UX & Pola Komponen (Design Pattern Guidelines)

Seluruh 38 rute di 7 role telah diselaraskan dengan standar berikut:

1. **Warna Red Signature (`#C62828` / `bg-[#C62828]`)**:
   - Digunakan sebagai warna aksen utama, tombol primer, badge role penting, dan border aktif.
2. **Warna Kartu Statistik Kuning Emas Amber Warm (`#D97706` / `bg-amber-500`)**:
   - Digunakan secara seragam untuk seluruh ikon kartu statistik antrean/pending di dashboard (`/dekanat/dashboard`, `/super-admin/dashboard`, `/admin-prodi/dashboard`, `/admin-fakultas/dashboard`).
3. **Tanpa Warna Ungu (No Purple Allowed)**:
   - Dilarang menggunakan warna ungu (`#7C3AED`) di mana pun. Indikator Seminar Proposal menggunakan warna Teal (`#0D9488`).
4. **Pola Tabel Ringkas + Kartu Panel Detail Samping (Compact List + Side Detail Panel Card)**:
   - Kolom `AKSI` yang memakan tempat dihapus dari tabel utama.
   - Mengklik baris tabel akan mengupdate secara *live* kartu panel detail di sebelah kanan (`w-80 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between p-5`).
   - Baris tabel yang dipilih ditandai dengan highlight `bg-rose-50/70 border-l-4 border-l-[#C62828]`.
5. **Layout Fit to Viewport 100% vs Natural Page Scroll**:
   - *Fit to Viewport (`viewport-shell bg-[#FAFAFA]`)*: Diterapkan pada rute berorientasi tabel list & manajemen cepat agar tidak ada vertical scrolling di layar utama.
   - *Natural Page Scroll (`min-h-screen pb-16`)*: Diterapkan pada halaman analitik/statistik kaya data seperti `/dekanat/statistik` agar kartu dan grafik dapat mengembang secara alami.
6. **Tidak Ada Badge Redundan**:
   - Penghapusan badge "Menunggu Verifikasi" pada antrean yang sudah didedikasikan khusus untuk barang yang butuh verifikasi.

---

## 🔍 Checklist Audit Sub-Halaman Per Role (Fase 1E — 100% COMPLETED ✅)

### 1. Portal Mahasiswa (`/`) — 11 Sub-Halaman (SELESAI ✅)
- [x] `/` — Dashboard (Stepper 4-Stage TA + Kalender Interaktif)
- [x] `/proposal` — Usulan Judul & Simulator Cek Similarity
- [x] `/pembimbing` — Pilih Dosen Pembimbing I & II + Status Kuota
- [x] `/bimbingan` — Thread Log Bimbingan + Modal Catat Log + Perubahan Judul
- [x] `/seminar` — Jadwal Seminar Proposal, Majelis Penguji, & Upload Revisi
- [x] `/sidang` — Detail Ujian Sidang Skripsi, Majelis, & Upload Hardcover
- [x] `/list-judul` — Repositori Judul Skripsi Alumni + Search/Filter
- [x] `/kalender` — Kalender TA Interaktif (Bulan / Minggu / Hari)
- [x] `/login` — Login Form Kredensial + Dev Quick Login Drawer
- [x] `/profil` — Banner Akademik, Stats Grid, & Timeline Progres
- [x] `/akun` — Keamanan, Ubah Password, & Status Akun

### 2. Portal Dosen Pembimbing (`/dosen`) — 4 Sub-Halaman (SELESAI ✅)
- [x] `/dosen/dashboard` — Dashboard Kuota Bimbingan, ACC Quick Action, & Permohonan
- [x] `/dosen/bimbingan` — Mahasiswa Bimbingan (Card Grid, Sesi Progress Bar, Action ACC)
- [x] `/dosen/pengajuan` — Permohonan Pembimbing Masuk (Detail IPK/SKS, Alasan Toggle, Terima/Tolak)
- [x] `/dosen/kalender` — Jadwal & Sidang (Timeline Date Block, Label Jenis, Presence Button)

### 3. Portal Dosen Penguji (`/penguji`) — 4 Sub-Halaman (SELESAI ✅)
- [x] `/penguji/dashboard` — Dashboard Penguji (Stats Grid 4-Metrik, Tabel Pengujian, Input Nilai Quick)
- [x] `/penguji/jadwal` — Jadwal Pengujian (Tabel Sempro/Sidang, Date Block Visual, Search & Filter)
- [x] `/penguji/nilai` — Input Nilai (Form Skor Per Komponen, Range Slider, Weighted Auto Score)
- [x] `/penguji/revisi` — Lembar Revisi (Catatan Revisi, Review Upload Mahasiswa, ACC Revisi)

### 4. Portal Admin Prodi FIK (`/admin-prodi`) — 5 Sub-Halaman (SELESAI ✅)
- [x] `/admin-prodi/dashboard` — Dashboard Prodi (Stats Grid Amber `#D97706`, Tabel Mahasiswa TA, Aktivasi Quick Panel)
- [x] `/admin-prodi/mahasiswa` — Manajemen Mahasiswa TA (Tabel List Ringkas, Filter Tahap, Live Side Panel Detail)
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

## 📱 Roadmap Selanjutnya (Future Development)

- [ ] **Fase 2 — Integrasi Backend & API**
  - Setup NestJS / Express + PostgreSQL + Prisma ORM
  - JWT Authentication + RBAC 7 Role Guard
  - Endpoints REST API per modul
- [ ] **Fase 3 — Fitur Realtime & Export**
  - WebSocket (Socket.io) notifikasi realtime
  - PDF Generator Server-side (SK Dekan, Laporan Eksekutif, Berita Acara)
- [ ] **Fase 4 — Production & Deployment**
