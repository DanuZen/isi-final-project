# Tasks & Audit Roadmap — SIPETA UPI YPTK Development

Dokumen ini memuat breakdown status pengembangan frontend UI/UX, daftar seluruh rute halaman per-role, serta checklist verifikasi/audit sub-halaman.

---

## 📊 Summary Status Project

| Modul / Role | Jumlah Rute | Status UI/UX | Status Sub-Halaman |
|---|:---:|:---:|:---:|
| **Fondasi & System Design** | — | ✅ Selesai | ✅ Viewport Shell (`100dvh`) |
| **Halaman Auth (Login)** | 1 Rute | ✅ Selesai | ✅ Form + Dev Quick Login |
| **1. Portal Mahasiswa** | 11 Rute | ✅ Selesai | ✅ 11 Sub-Halaman Lengkap |
| **2. Portal Dosen Pembimbing** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Lengkap |
| **3. Portal Dosen Penguji** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Lengkap |
| **4. Portal Admin Prodi FIK** | 5 Rute | ✅ Selesai | ✅ 5 Sub-Halaman Lengkap |
| **5. Portal Admin Fakultas** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Lengkap |
| **6. Portal Pimpinan / Dekanat** | 4 Rute | ✅ Selesai | ✅ 4 Sub-Halaman Lengkap |
| **7. Portal Super Admin** | 5 Rute | ✅ Selesai | ✅ 5 Sub-Halaman Lengkap |
| **TOTAL KESELURUHAN** | **38 Rute** | **✅ 100% Built** | **✅ Ready For Systematic Audit** |

---

## 🔍 Checklist Audit Sub-Halaman Per Role (Fase 1E — In Progress ⏳)

Checklist verifikasi fungsionalitas visual, keselarasan komponen, interaksi UI, dan kelengkapan data per role:

### 1. Portal Mahasiswa (`/`) — 11 Sub-Halaman
- [ ] `/` — Dashboard (Stepper 4-Stage TA + Kalender Interaktif)
- [ ] `/proposal` — Usulan Judul & Simulator Cek Similarity
- [ ] `/pembimbing` — Pilih Dosen Pembimbing I & II + Status Kuota
- [ ] `/bimbingan` — Thread Log Bimbingan + Modal Catat Log + Perubahan Judul
- [ ] `/seminar` — Jadwal Seminar Proposal, Majelis Penguji, & Upload Revisi
- [ ] `/sidang` — Detail Ujian Sidang Skripsi, Majelis, & Upload Hardcover
- [ ] `/list-judul` — Repositori Judul Skripsi Alumni + Search/Filter
- [ ] `/kalender` — Kalender TA Interaktif (Bulan / Minggu / Hari)
- [ ] `/login` — Login Form Kredensial + Dev Quick Login Drawer
- [ ] `/profil` — Banner Akademik, Stats Grid, & Timeline Progres
- [ ] `/akun` — Keamanan, Ubah Password, & Status Akun

### 2. Portal Dosen Pembimbing (`/dosen`) — 4 Sub-Halaman
- [ ] `/dosen/dashboard` — Dashboard Kuota Bimbingan, ACC Quick Action, & Permohonan
- [ ] `/dosen/bimbingan` — Mahasiswa Bimbingan (Card Grid, Sesi Progress Bar, Action ACC)
- [ ] `/dosen/pengajuan` — Permohonan Pembimbing Masuk (Detail IPK/SKS, Alasan Toggle, Terima/Tolak)
- [ ] `/dosen/kalender` — Jadwal & Sidang (Timeline Date Block, Label Jenis, Presence Button)

### 3. Portal Dosen Penguji (`/penguji`) — 4 Sub-Halaman
- [ ] `/penguji/dashboard` — Dashboard Penguji (Stats Grid 4-Metrik, Tabel Pengujian, Input Nilai Quick)
- [ ] `/penguji/jadwal` — Jadwal Pengujian (Tabel Sempro/Sidang, Date Block Visual, Search & Filter)
- [ ] `/penguji/nilai` — Input Nilai (Form Skor Per Komponen, Range Slider, Weighted Auto Score)
- [ ] `/penguji/revisi` — Lembar Revisi (Catatan Revisi, Review Upload Mahasiswa, ACC Revisi)

### 4. Portal Admin Prodi FIK (`/admin-prodi`) — 5 Sub-Halaman
- [ ] `/admin-prodi/dashboard` — Dashboard Prodi (Stats Grid, Tabel Mahasiswa TA, Aktivasi Quick Panel)
- [ ] `/admin-prodi/mahasiswa` — Manajemen Mahasiswa TA (Tabel Master, Filter Tahap, Side Panel Detail)
- [ ] `/admin-prodi/aktivasi` — Aktivasi Akun (Antrean Clearing Luring, Trigger Generate Credential)
- [ ] `/admin-prodi/jadwal` — Kelola Jadwal (Penjadwalan Sempro/Sidang, Majelis Penguji, & Ruangan)
- [ ] `/admin-prodi/repositori` — Repositori Judul TA (Database Judul Approved + Filter Bidang Kajian)

### 5. Portal Admin Fakultas (`/admin-fakultas`) — 4 Sub-Halaman
- [ ] `/admin-fakultas/dashboard` — Dashboard Fakultas (Stats SK & Bebas Fak, Tabel SK Dekan, Quick Action)
- [ ] `/admin-fakultas/sk` — Penerbitan SK Dekan (Tabel SK Pembimbing/Penguji, Generate & Download PDF)
- [ ] `/admin-fakultas/bebas` — Bebas Fakultas (Verifikasi Bebas Pustaka, Bebas Lab, & Bebas SPP)
- [ ] `/admin-fakultas/arsip` — Arsip Dokumen (Digital Repository SK Dekan, Yudisium, & Pedoman TA)

### 6. Portal Pimpinan / Dekanat (`/dekanat`) — 4 Sub-Halaman
- [ ] `/dekanat/dashboard` — Dashboard Eksekutif (Stats Trend, SVG Donut Chart Bidang, Rekap Angkatan)
- [ ] `/dekanat/statistik` — Statistik TA & Analitik (IPK Kelulusan, Ketepatan Waktu, Publikasi Jurnal)
- [ ] `/dekanat/kalender` — Kalender Sidang Executive (Read-only Agenda Seminar & Sidang Skripsi)
- [ ] `/dekanat/laporan` — Laporan Eksekutif (Pusat Unduh Dokumen PDF Rekapitulasi & Yudisium)

### 7. Portal Super Admin (`/super-admin`) — 5 Sub-Halaman
- [ ] `/super-admin/dashboard` — Dashboard Teknis (Stats User & Logs, Quick Access User & Config)
- [ ] `/super-admin/users` — Manajemen User (Tabel Akun, Edit Role, Status Access, Reset Password)
- [ ] `/super-admin/audit` — Audit Log System (Log Activity Realtime, IP Address, Event Types)
- [ ] `/super-admin/config` — Konfigurasi Parameter (Toggle Maintenance Mode, Kuota, Similarity Limit)
- [ ] `/super-admin/master` — Master Data (Pengelolaan Referensi Prodi, Jenjang, & Ka. Prodi)

---

## 📱 Fase Selanjutnya (Roadmap Masa Depan)

- [ ] **Fase 1D — Mobile Responsive UI (< 768px)**
  - Sidebar mobile overlay drawer
  - Bottom navigation bar 5-tab untuk mahasiswa
  - Card & table stack responsive layout
- [ ] **Fase 2 — Integrasi Backend & API**
  - Setup NestJS + PostgreSQL + Prisma ORM
  - JWT Authentication + RBAC 7 Role Guard
  - Endpoints REST API per modul
- [ ] **Fase 3 — Fitur Realtime & Export**
  - WebSocket (Socket.io) notifikasi realtime
  - PDF Generator (SK Dekan, Laporan Eksekutif, Berita Acara)
- [ ] **Fase 4 — Production & Deployment**
