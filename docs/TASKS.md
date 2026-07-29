# Tasks — SIPETA UPI YPTK Development Roadmap

Breakdown status pengembangan frontend UI/UX dan rencana integrasi backend.

---

## Fase 0 — Fondasi UI & Design System (Selesai ✓)

- [x] Initialisasi project Next.js 14 App Router + Tailwind CSS
- [x] Import Design System & Brand Identity UPI YPTK Padang (`#C62828` Deep Crimson Red, `#F59E0B` Amber Gold, Plus Jakarta Sans, IBM Plex Mono)
- [x] Centered Logo Emblem **UPI YPTK Padang** & **SIPETA** di Sidebar Header
- [x] Responsive Collapsible Sidebar dengan Toggle Button `Sidebar Navigasi` di Header Bar
- [x] Standardisasi **Fit-Viewport Layout Architecture (`100dvh`)** di seluruh rute halaman
- [x] Implementasi **Clean Internal Card Scroll (`scrollbar-none`)**
- [x] Zero empty space layout — *Flush Bottom Baseline Alignment* di semua halaman 2-kolom

---

## Fase 1 — Portal Mahasiswa (Selesai ✓)

- [x] Dashboard (`/`): 4-Stage Stepper TA + Widget Kalender Interaktif
- [x] Usulan Judul (`/proposal`): Form proposal + simulator Cek Kemiripan (Similarity) realtime
- [x] Pilih Pembimbing (`/pembimbing`): Tabel dosen, pilih Pembimbing I & II, timeline alur verifikasi
- [x] Log Bimbingan (`/bimbingan`): Thread chat-style + modal Catat Log + modal Perubahan Judul
- [x] Jadwal Seminar (`/seminar`): Detail ruang 302, daftar penguji, upload revisi sempro
- [x] Ujian Sidang (`/sidang`): Detail majelis penguji aula FIK, upload naskah final hardcover
- [x] Clearing Nilai (`/clearing`): Verifikasi SKS, IPK, bebas tunggakan & dokumen prasyarat TA
- [x] Repositori Judul (`/list-judul`): Search realtime, filter bidang kajian (RPL, AI, Jaringan)
- [x] Kalender TA (`/kalender`): Kalender interaktif bulan/minggu/hari + event badges
- [x] Halaman Login (`/login`): Multi-role selector, form dark mode branding UPI YPTK
- [x] Halaman Profil (`/profil`): Banner akademik, stats grid, data akademik, progres TA timeline
- [x] Halaman Akun (`/akun`): Info pribadi, keamanan & ubah kata sandi, status akun

## Fase 1B — Portal Dosen Pembimbing (Selesai ✓)

- [x] Dashboard Dosen (`/dosen/dashboard`): Kuota bimbingan, daftar mahasiswa aktif, ACC seminar, permohonan pembimbing masuk

---

## Fase 1C — Portal 6 Role Tambahan (Next Sprint)

### Dosen Penguji
- [ ] Dashboard Penguji (`/penguji/dashboard`)
  - Welcome Banner: nama dosen, badge "Dosen Penguji", jumlah jadwal aktif
  - Stats Grid (3): Jadwal Seminar | Ujian Sidang Aktif | Lembar Revisi Pending
  - Tabel Jadwal Pengujian: nama mahasiswa, judul, tanggal, ruangan, status nilai
  - Panel Input Nilai: form skor seminar & sidang per mahasiswa
  - Sidebar Nav khusus: Dashboard, Jadwal Pengujian, Input Nilai, Lembar Revisi

### Admin Prodi FIK
- [ ] Dashboard Admin Prodi (`/admin-prodi/dashboard`)
  - Welcome Banner: nama admin, total mahasiswa TA aktif, badge "Admin Prodi FIK"
  - Stats Grid (4): Mahasiswa TA Aktif | Menunggu Aktivasi Akun | Sidang Bulan Ini | Proposal Pending
  - Tabel Mahasiswa TA: NIM, nama, judul, Pembimbing I/II, tahap, status — search & filter
  - Panel Permohonan Pembimbing: list pengajuan pending → Approve / Tolak
  - Panel Jadwal Seminar/Sidang: input & kelola jadwal (tanggal, ruangan, majelis penguji)
  - Panel Aktivasi Akun: mahasiswa clearing luring → aktifkan akun SIPETA
  - Sidebar Nav: Dashboard, Manajemen Mahasiswa, Aktivasi Akun, Jadwal, Repositori

### Admin Fakultas
- [ ] Dashboard Admin Fakultas (`/admin-fakultas/dashboard`)
  - Welcome Banner: nama admin, badge "Admin Fakultas FIK"
  - Stats Grid (3): SK Pending Terbit | SK Diterbitkan Bulan Ini | Mahasiswa Bebas Fakultas
  - Tabel SK Dekan: list SK pembimbing/penguji pending → Generate & Download PDF SK
  - Panel Bebas Fakultas: verifikasi & input status bebas fakultas mahasiswa
  - Sidebar Nav: Dashboard, Penerbitan SK, Bebas Fakultas, Arsip Dokumen

### Pimpinan / Dekanat *(Executive Read-Only)*
- [ ] Dashboard Dekanat (`/dekanat/dashboard`)
  - Welcome Banner: nama pimpinan, badge "Pimpinan / Dekanat FIK"
  - Stats Grid (4): Total Mahasiswa TA | Selesai Tahun Ini | Rata-rata Durasi Studi | Tingkat Kelulusan %
  - Grafik Distribusi Bidang Kajian: donut chart RPL vs AI vs Jaringan (SVG inline)
  - Tabel Rekapitulasi Kelulusan: per angkatan 2019–2024 — jumlah lulus, rata-rata IPK
  - Mini Kalender Sidang Bulan Ini: read-only event view
  - Sidebar Nav: Dashboard Eksekutif, Statistik TA, Kalender Sidang, Laporan

### Super Admin *(Teknis)*
- [ ] Dashboard Super Admin (`/super-admin/dashboard`)
  - Welcome Banner: nama super admin, badge "Super Admin Sistem"
  - Stats Grid (4): Total User | Role Distribution | Login Hari Ini | Error Log 24 Jam
  - Tabel Manajemen User: semua akun + role + status → Edit / Nonaktifkan
  - Panel Audit Log: log login & perubahan data dengan timestamp
  - Panel Konfigurasi Sistem: toggle maintenance mode, batas kuota dosen, tahun akademik aktif
  - Sidebar Nav: Dashboard, Manajemen User, Audit Log, Konfigurasi, Master Data

### Update Login Page
- [ ] Update `/login` — tambah 5 role ke selector (Dosen Penguji, Admin Prodi, Admin Fakultas, Pimpinan, Super Admin) dengan route masing-masing

---

## Fase 1D — Mobile Responsive UI

> Semua halaman perlu dioptimasi untuk layar mobile (< 768px).

### Komponen Global
- [ ] **Sidebar Mobile:** Overlay drawer dari kiri (bukan collapsible column)
- [ ] **Header Mobile:** Hamburger icon kiri, notif bell + avatar kanan
- [ ] **Bottom Navigation Bar:** Tab bar 5 ikon fixed bottom untuk mahasiswa (Home, Bimbingan, Jadwal, Kalender, Profil)

### Halaman Mahasiswa Mobile
- [ ] `/` Dashboard: stepper vertikal, kalender → list agenda, stat cards 2-col
- [ ] `/proposal`: form full-width, similarity checker accordion
- [ ] `/pembimbing`: tabel scroll horizontal, card pembimbing terpilih full-width
- [ ] `/bimbingan`: thread full-width, FAB (Floating Action Button) catat log
- [ ] `/seminar` & `/sidang`: detail jadwal vertikal, upload full-width
- [ ] `/clearing`: metrics 2×2, tabel scroll horizontal
- [ ] `/list-judul`: filter → bottom sheet drawer, search sticky top
- [ ] `/kalender`: default mode "Hari" di mobile, switcher kompak

### Halaman Portal Role Mobile
- [ ] `/dosen/dashboard`: kartu mahasiswa stack vertikal, ACC button full-width
- [ ] `/penguji/dashboard`: jadwal list vertikal, nilai input accordion
- [ ] `/admin-prodi/dashboard`: tabel → card list, FAB aktivasi akun
- [ ] `/admin-fakultas/dashboard`: SK list vertikal, panel accordion
- [ ] `/dekanat/dashboard`: grafik responsive SVG auto-resize, tabel scroll
- [ ] `/super-admin/dashboard`: user table → card list mobile

### Halaman Auth & Profil Mobile
- [ ] `/login`: full-screen dark form, role selector 2×2 grid
- [ ] `/profil` & `/akun`: stats 2×2, info list vertikal

---

## Fase 2 — Integrasi Backend & API

### 2.1 Infrastruktur Backend
- [ ] Setup **NestJS** backend + **PostgreSQL** + **Prisma ORM**
- [ ] Konfigurasi environment variables (`.env`) dev & production
- [ ] Setup **Docker Compose** (PostgreSQL + NestJS + Redis)
- [ ] Setup **Swagger / OpenAPI** dokumentasi endpoint otomatis

### 2.2 Autentikasi & Otorisasi
- [ ] Implementasi **JWT authentication** (access token + refresh token)
- [ ] **RBAC** 7 role sesuai `RoleEnum` di Prisma schema
- [ ] Next.js middleware guard + NestJS guards per route
- [ ] Login endpoint `POST /api/auth/login` + auto-redirect per role

### 2.3 Modul Mahasiswa
- [ ] `POST /api/proposal/submit` | `POST /api/proposal/similarity-check`
- [ ] `GET /api/proposal/status/:nim` | `PATCH /api/proposal/approve/:id`
- [ ] `GET /api/bimbingan/thread/:nim` | `POST /api/bimbingan/log`
- [ ] `PATCH /api/bimbingan/log/:id/approve` | Upload lampiran → Supabase Storage
- [ ] `GET /api/dosen/list` | `POST /api/pembimbing/pilih`
- [ ] `GET /api/seminar/jadwal/:nim` | `POST /api/seminar/upload-revisi`
- [ ] `GET /api/sidang/jadwal/:nim` | `POST /api/sidang/upload-naskah`

### 2.4 Modul Admin Prodi
- [ ] `POST /api/admin-prodi/aktivasi-akun`
- [ ] `PATCH /api/admin-prodi/assign-pembimbing`
- [ ] `POST /api/admin-prodi/jadwal-seminar` | `POST /api/admin-prodi/jadwal-sidang`

### 2.5 Modul Admin Fakultas
- [ ] `POST /api/admin-fakultas/terbitkan-sk`
- [ ] `PATCH /api/admin-fakultas/bebas-fakultas/:nim`

### 2.6 Modul Pimpinan & Super Admin
- [ ] `GET /api/pimpinan/statistik-ta`
- [ ] `GET /api/super-admin/users` | `PATCH /api/super-admin/users/:id`
- [ ] `GET /api/super-admin/audit-log`

### 2.7 Repositori & Kalender
- [ ] `GET /api/repositori/list-judul` (pagination + filter per role)
- [ ] `GET /api/kalender/events` (event per bulan per role)

---

## Fase 3 — Fitur Lanjutan & Pengalaman Pengguna

### 3.1 Notifikasi Real-time
- [ ] Setup **WebSocket (Socket.io)** untuk notifikasi bimbingan & approval
- [ ] In-app notification bell di Header Bar
- [ ] Email notification via **Nodemailer / Resend**
- [ ] Push notification PWA untuk jadwal sidang & bimbingan

### 3.2 Laporan & Ekspor Data
- [ ] Ekspor laporan progress TA ke **PDF** (per mahasiswa / per angkatan)
- [ ] Ekspor jadwal seminar & sidang ke **Excel / CSV**
- [ ] Generate **SK Dekan** otomatis (SK Pembimbing & SK Penguji)

### 3.3 Peningkatan UI/UX
- [ ] Dark mode toggle di Header Bar
- [ ] Skeleton loading state semua halaman async
- [ ] Progressive Web App (PWA) — offline support & installable
- [ ] Animasi page transition antar rute

---

## Fase 4 — Production & Deployment

- [ ] Setup **CI/CD pipeline** (GitHub Actions: lint → test → build → deploy)
- [ ] Deploy frontend → **Vercel**
- [ ] Deploy backend NestJS → **Railway / Render / VPS**
- [ ] Setup **PostgreSQL managed** (Supabase / Railway)
- [ ] Konfigurasi domain & SSL (`sipeta.upiyptk.ac.id`)
- [ ] Load testing & Lighthouse score ≥ 90
- [ ] Security audit: OWASP Top 10, rate limiting, input sanitasi
