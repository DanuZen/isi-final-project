# Tasks — SIPETA UPI YPTK Development Roadmap

Breakdown status pengembangan frontend UI/UX dan rencana integrasi backend.

---

## Fase 0 — Fondasi UI & Design System (Selesai ✓)

- [x] Initialisasi project Next.js 14 App Router + Tailwind CSS
- [x] Import Design System & Brand Identity UPI YPTK Padang (`#C62828` Deep Crimson Red, `#F59E0B` Amber Gold, Plus Jakarta Sans, IBM Plex Mono)
- [x] Centered Logo Emblem **UPI YPTK Padang** & **SIPETA** di Sidebar Header
- [x] Responsive Collapsible Sidebar dengan Toggle Button `Sidebar Navigasi` di Header Bar
- [x] Zero empty space layout — *Flush Bottom Baseline Alignment* di semua halaman 2-kolom

## Fase 1 — Modul Mahasiswa (Selesai ✓)

- [x] Dashboard (`/`): **Progress Perjalanan TA (4-Stage Stepper)** (`Usulan Judul → Bimbingan TA → ACC Seminar → Ujian Sidang`)
- [x] Dashboard (`/`): **Widget Kalender Interaktif TA & Sidang** (*Bulan / Minggu / Hari*, event badges *Bimbingan, Sempro, Sidang*)
- [x] Usulan Judul (`/proposal`): Form proposal + simulator realtime **Cek Kemiripan (Similarity)**
- [x] Log Bimbingan (`/bimbingan`): Thread bimbingan chat-style + modal *Catat Log Bimbingan* + modal *Pengajuan Perubahan Judul*
- [x] Jadwal Seminar (`/seminar`): Detail ruang 302, daftar penguji, dan upload revisi sempro
- [x] Ujian Sidang (`/sidang`): Detail majelis penguji aula FIK & upload naskah final hardcover
- [x] Repositori Judul (`/list-judul`): Halaman **Daftar Judul TA** dengan search realtime, filter bidang kajian (RPL, AI, Jaringan), dan statistik domain

## Fase 2 — Integrasi Backend & API (Rencana Sprint Berikutnya)

- [ ] Setup NestJS backend + PostgreSQL + Prisma ORM
- [ ] Connect JWT authentication & role-based access control (RBAC)
- [ ] Connect API endpoint `POST /api/proposal/similarity-check`
- [ ] Connect API endpoint `GET /api/bimbingan/thread` & `POST /api/bimbingan/log`
- [ ] Connect API endpoint `GET /api/repositori/list-judul` dengan pagination server-side
