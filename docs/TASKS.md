# Tasks — SIMTA-Next Development Roadmap

Breakdown per fase. Setiap fase diasumsikan bisa jadi 1 sprint (bisa disesuaikan). Checklist bisa langsung dicentang di editor/Github.

---

## Fase 0 — Setup & Fondasi

- [ ] Init monorepo (`apps/web` Next.js, `apps/api` NestJS) — pertimbangkan Turborepo/Nx
- [ ] Setup PostgreSQL + Prisma, buat schema awal (User, Role, Prodi, Fakultas, TahunAkademik)
- [ ] Setup autentikasi: JWT access + refresh token, guard RBAC per role di NestJS
- [ ] Setup Tailwind + shadcn/ui di Next.js, import design tokens dari STYLEGUIDE.md (warna, font)
- [ ] Setup CI dasar (lint + build check di GitHub Actions)
- [ ] Setup environment: docker-compose (db, api, web) untuk dev lokal

## Fase 1 — Auth & Manajemen User (Termasuk Clearing Nilai)

- [ ] Login/logout, refresh token flow
- [ ] Halaman login dengan role auto-redirect ke dashboard masing-masing
- [ ] Admin Prodi: Verifikasi/input status **clearing nilai** (SKS/akademik) untuk aktivasi akun mahasiswa
- [ ] Superadmin: CRUD user (mahasiswa, dosen, admin prodi, admin fakultas, pimpinan)
- [ ] Superadmin: master data Fakultas & Prodi
- [ ] Middleware RBAC di Next.js (redirect kalau akses halaman di luar role)

## Fase 2 — Modul Mahasiswa: Usulan & Perubahan Judul

- [ ] Dashboard mahasiswa dengan **Stepper Perjalanan TA 6 Tahap** (komponen signature)
- [ ] Form pengajuan usulan judul (judul, abstrak, bidang, upload file)
- [ ] Cek kemiripan judul sederhana (fuzzy match ke database judul existing) saat submit
- [ ] Fitur & Form pengajuan **Perubahan Judul** di tengah alur bimbingan (dengan form alasan & persetujuan)
- [ ] Halaman riwayat status proposal/perubahan judul + catatan revisi dari reviewer
- [ ] Empty state & locked state sesuai pola styleguide (bukan teks polos)

## Fase 3 — Modul Mahasiswa: Pembimbing, Bimbingan, & ACC Seminar

- [ ] Halaman pilih pembimbing (list dosen tersedia, filter bidang & kuota)
- [ ] Log pembimbing (riwayat assign/ganti pembimbing)
- [ ] Kartu Log Bimbingan chat-style: catatan mahasiswa, upload draft, feedback dosen
- [ ] Form pengajuan **ACC Seminar** (Seminar Proposal/Hasil) dari Dosen Pembimbing
- [ ] Halaman upload berkas & tracking status **Revisi/Perbaikan Pasca Seminar**
- [ ] Notifikasi in-app (WebSocket) saat dosen memberi feedback / ACC

## Fase 4 — Modul Mahasiswa: ACC Ujian Akhir & Tamat

- [ ] Form pengajuan **ACC Ujian** (Sidang Akhir) dari Dosen Pembimbing
- [ ] Checklist syarat pengajuan ujian otomatis (validasi jumlah bimbingan minimum, kelulusan seminar, dsb.)
- [ ] Kalender jadwal seminar & ujian sidang (bulanan/mingguan) — reuse komponen kalender
- [ ] Halaman upload berkas & tracking status **Revisi/Perbaikan Pasca Ujian**
- [ ] Halaman status akhir **Tamat / Yudisium** + unduh berita acara & lembar pengesahan final

## Fase 5 — Modul Dosen

- [ ] Dashboard dosen: kanban mahasiswa bimbingan (Clearing / Proposal / Bimbingan / ACC Seminar / ACC Ujian / Tamat)
- [ ] Review & approve/reject proposal usulan judul
- [ ] Review & approve/reject pengajuan **perubahan judul**
- [ ] Balas log bimbingan (feedback, berikan **ACC Seminar** & **ACC Ujian**)
- [ ] Verifikasi & approve bukti revisi/perbaikan pasca-seminar dan pasca-ujian
- [ ] Jadwal jadi penguji seminar/sidang + form input nilai & catatan

## Fase 6 — Modul Admin Prodi

- [ ] Modul verifikasi **clearing nilai** & pembuatan/aktivasi akun mahasiswa
- [ ] Kelola data mahasiswa & dosen prodi (import Excel + manual)
- [ ] Review tahap awal usulan judul & persetujuan perubahan judul
- [ ] Assign/konfirmasi pembimbing & penguji dengan validasi kuota
- [ ] Kelola jadwal & ruang seminar serta ujian sidang (deteksi bentrok otomatis)
- [ ] Verifikasi kelengkapan berkas bebas revisi sebelum mahasiswa dinyatakan **Tamat**
- [ ] Laporan progress mahasiswa per angkatan (tabel + export)

## Fase 7 — Modul Admin Fakultas

- [ ] Rekap lintas prodi (agregat status TA se-fakultas)
- [ ] Generate SK pembimbing/penguji (template PDF otomatis)
- [ ] Kalender sidang tingkat fakultas (gabungan semua prodi, deteksi bentrok dosen/ruang)
- [ ] Laporan tingkat fakultas (durasi rata-rata tiap tahap, tingkat kelulusan)

## Fase 8 — Modul Superadmin (Lanjutan)

- [ ] Konfigurasi global (kuota bimbingan default, template dokumen, aturan alur/state machine)
- [ ] Audit log seluruh aktivitas (siapa approve/reject/edit apa, kapan)
- [ ] Manajemen integrasi (WhatsApp gateway untuk OTP & notifikasi, SMTP email)

## Fase 9 — Modul Pimpinan (Dashboard Analitik)

- [ ] Dashboard read-only: distribusi mahasiswa per 6 tahap TA
- [ ] Grafik rata-rata durasi tiap tahap (clearing→judul→bimbingan→seminar→ujian→tamat)
- [ ] Grafik tingkat kelulusan sidang & beban bimbingan per dosen
- [ ] Filter per fakultas/prodi/angkatan + export laporan (PDF/Excel)

## Fase 10 — Notifikasi & Realtime

- [ ] WebSocket Gateway di NestJS untuk notifikasi in-app
- [ ] Integrasi WhatsApp Business API (OTP nomor HP, notifikasi status penting)
- [ ] Integrasi email fallback (Nodemailer) untuk notifikasi non-urgent
- [ ] Halaman/dropdown notifikasi dengan mark-as-read

## Fase 11 — Polish, Testing, Deployment

- [ ] Audit aksesibilitas (kontras, focus ring, keyboard nav) sesuai STYLEGUIDE.md
- [ ] Responsive check penuh di 375px/768px/1024px
- [ ] Unit test modul kritikal (auth, state machine alur TA) di NestJS
- [ ] E2E test alur utama (clearing → usulan judul → bimbingan → seminar → ujian → tamat) dengan Playwright
- [ ] Setup deployment (Docker + reverse proxy, backup DB harian)
- [ ] Dokumentasi API (Swagger/OpenAPI dari NestJS)

---

## Prioritas Jika Waktu Terbatas (MVP Minimum)

Kalau perlu MVP tercepat untuk demo/testing awal, urutan prioritas:

1. Fase 0 (setup) → Fase 1 (clearing nilai & auth) → Fase 2 (usulan judul) → Fase 3 (bimbingan & ACC seminar) → Fase 4 (ACC ujian & tamat)
2. Fase 5 (dosen) — tanpa modul dosen, mahasiswa tidak bisa dapat ACC & maju tahap
3. Fase 6 (admin prodi) — verifikasi clearing nilai, assign pembimbing, & approve proposal/jadwal
4. Fase 10 (notifikasi in-app saja dulu, WhatsApp/email bisa menyusul)
5. Fase 7, 8, 9 (fakultas/superadmin/pimpinan) bisa jadi rilis v1.1 setelah alur inti mahasiswa-dosen-prodi teruji
