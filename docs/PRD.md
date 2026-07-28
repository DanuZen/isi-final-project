# PRD — Sistem Informasi Manajemen Tugas Akhir (SIMTA-Next)
**Versi:** 0.1 (Draft)
**Stack:** Next.js (frontend) + NestJS (backend) + PostgreSQL
**Status:** Perencanaan awal

---

## 1. Latar Belakang & Tujuan

SIMTA existing (UNP) sudah punya alur kerja yang solid — proposal → pilih pembimbing → bimbingan → sidang — tapi eksekusinya punya beberapa kelemahan:

- Mahasiswa tidak memiliki kejelasan status apakah sudah **clearing nilai** (verifikasi SKS) untuk memulai TA.
- Tidak ada progress tracker visual, mahasiswa harus menebak posisi mereka di alur.
- Tidak ada notifikasi real-time saat dosen approve/comment.
- Tidak ada fitur formal untuk pengajuan **perubahan judul** di tengah alur bimbingan.
- Alur kelayakan **ACC Seminar** dan **ACC Ujian Akhir** kurang transparan.
- UI generik, banyak halaman kosong tanpa panduan aksi selanjutnya.
- Tidak ada dashboard analitik untuk pimpinan/fakultas.
- Role terbatas (mahasiswa/dosen/admin), tidak ada jenjang admin prodi vs fakultas vs superadmin.

**Tujuan produk ini:** membangun ulang sistem manajemen tugas akhir yang mempertahankan alur kerja yang sudah terbukti, tapi dengan pengalaman pengguna yang jauh lebih baik, pelacakan terstruktur dari clearing nilai hingga tamat, notifikasi real-time, dan pelaporan yang berjenjang sesuai struktur organisasi kampus.

---

## 2. Roles & Ringkasan Akses

| Role | Ringkasan |
|---|---|
| **Mahasiswa** | Memperoleh akun pasca clearing nilai, mengusulkan judul, memilih pembimbing, mencatat bimbingan, mengajukan perubahan judul, mengurus ACC seminar & ACC ujian, melengkapi revisi/perbaikan hingga tamat |
| **Dosen** | Membimbing/menguji mahasiswa, review proposal & perubahan judul, memberi feedback bimbingan, memberi ACC seminar & ACC ujian, menilai sidang |
| **Admin Prodi** | Verifikasi clearing nilai mahasiswa, mengelola data mahasiswa & dosen di prodi, approve proposal & perubahan judul, atur jadwal seminar & ujian, assign pembimbing/penguji |
| **Admin Fakultas** | Rekap lintas prodi dalam satu fakultas, kelola SK pembimbing/penguji, atur kalender sidang fakultas |
| **Superadmin** | Kelola seluruh sistem: user, role, prodi/fakultas master data, konfigurasi global, audit log |
| **Pimpinan** | Akses read-only ke dashboard analitik & laporan (tingkat universitas/fakultas), tanpa hak edit |

---

## 3. Alur Kerja Inti (State Machine)

```
Clearing Nilai (Verifikasi Akademik SKS)
   → Akun TA Aktif
      → Usulan Judul Proposal
         → [Admin Prodi Review] → Ditolak (revisi) / Disetujui
            → Pilih Pembimbing → [Admin Prodi Assign/Konfirmasi]
               → Bimbingan (berulang: log bimbingan, upload draft, feedback dosen)
                  ├── [Opsional] Pengajuan Perubahan Judul → [ACC Dosen & Admin Prodi]
                  → ACC Seminar → [Admin Prodi Jadwalkan] → Seminar Proposal/Hasil
                     → Perbaikan / Revisi Pasca Seminar → Disetujui Dosen
                        → Bimbingan Lanjutan (Draft Akhir)
                           → ACC Ujian → [Admin Prodi Jadwalkan] → Ujian Sidang Akhir
                              → Perbaikan / Revisi Pasca Ujian → Disetujui Dosen & Penguji
                                 → Tamat (Yudisium)
```

Setiap tahap **mengunci** tahap berikutnya sampai syarat terpenuhi — pola ini dipertahankan dari sistem lama karena efektif mencegah mahasiswa "meloncat" alur. Yang ditambahkan: **indikator visual (stepper 6 tahap)** di setiap halaman supaya user tahu posisi & syarat lanjutan tanpa harus menebak dari pesan error teks.

---

## 4. Fitur per Role

### 4.1 Mahasiswa
- Status Aktivasi: Cek status clearing nilai & aktivasi akun TA
- Dashboard: stepper progress TA (6 tahap), kalender jadwal seminar/sidang, notifikasi terbaru
- Pengajuan usulan judul (judul, abstrak, file, bidang kajian) + cek kemiripan judul otomatis
- Form pengajuan **Perubahan Judul** (jika ada arah revisi besar dari pembimbing, beserta alasan & alur persetujuan)
- Riwayat status proposal & perubahan judul (revisi, catatan reviewer)
- Pilih pembimbing (dari daftar dosen tersedia sesuai kuota & bidang)
- Log bimbingan: chat-style thread per sesi, upload draft, terima anotasi/feedback
- Pengajuan & Status **ACC Seminar** (Seminar Proposal/Hasil) + upload naskah seminar
- Halaman Revisi/Perbaikan Pasca Seminar (upload bukti perbaikan & lembar pengesahan)
- Pengajuan & Status **ACC Ujian** (Ujian Sidang Akhir) + cek kelengkapan syarat otomatis (checklist)
- Halaman Revisi/Perbaikan Pasca Ujian (upload naskah final & bukti bebas revisi) sampai dinyatakan **Tamat**
- Profil & verifikasi nomor HP (OTP WhatsApp)
- Notifikasi real-time (in-app + WhatsApp/email)

### 4.2 Dosen
- Dashboard: daftar mahasiswa bimbingan (kanban: Clearing / Proposal / Bimbingan / ACC Seminar / ACC Ujian / Tamat)
- Review & approve/reject proposal usulan judul
- Review & approve/reject pengajuan **perubahan judul** mahasiswa bimbingan
- Kelola sesi bimbingan: beri feedback, berikan **ACC Seminar** & **ACC Ujian**
- Review & verifikasi lembar revisi/perbaikan pasca seminar & pasca ujian
- Jadwal jadi penguji seminar & sidang akhir, beri nilai & catatan
- Riwayat bimbingan per mahasiswa (log lengkap)

### 4.3 Admin Prodi
- Verifikasi & input status **clearing nilai** mahasiswa untuk pembuatan/aktivasi akun TA
- Kelola data mahasiswa & dosen di prodi
- Review tahap awal usulan judul & persetujuan perubahan judul
- Assign/konfirmasi pembimbing & penguji (cek kuota otomatis)
- Kelola jadwal & ruang seminar serta ujian sidang tingkat prodi
- Verifikasi kelengkapan revisi akhir mahasiswa sebelum dinyatakan tamat
- Laporan progress TA mahasiswa per angkatan

### 4.4 Admin Fakultas
- Rekap lintas prodi dalam fakultas
- Kelola SK pembimbing/penguji (generate dokumen)
- Kalender sidang tingkat fakultas (hindari bentrok ruang/dosen)
- Laporan tingkat fakultas (rata-rata masa studi TA, tingkat kelulusan sidang, dsb.)

### 4.5 Superadmin
- Kelola user & role (CRUD, reset password, nonaktifkan akun)
- Kelola master data (fakultas, prodi, tahun akademik, kategori TA)
- Konfigurasi global (kuota bimbingan per dosen, template dokumen, aturan alur)
- Audit log seluruh aktivitas sistem
- Kelola integrasi (WhatsApp gateway, email, SSO kampus jika ada)

### 4.6 Pimpinan
- Dashboard analitik read-only: jumlah mahasiswa per tahap, rata-rata durasi tiap tahap, tingkat kelulusan sidang, beban bimbingan dosen
- Filter per fakultas/prodi/angkatan
- Export laporan (PDF/Excel)

---

## 5. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| **Notifikasi** | Real-time (WebSocket/SSE) + fallback email/WhatsApp |
| **Keamanan** | JWT + refresh token, role-based access control (RBAC), audit log, rate limiting |
| **Performa** | Halaman list (mis. daftar judul TA) harus mendukung pagination server-side untuk >10rb baris |
| **Responsif** | Mobile-first, minimal breakpoint 375px, 768px, 1024px |
| **Aksesibilitas** | Kontras warna WCAG AA, navigasi keyboard, aria-label pada komponen interaktif |
| **Ketersediaan** | Uptime target 99.5%, backup harian database |
| **Skalabilitas** | Backend modular (NestJS modules per domain: auth, proposal, bimbingan, sidang, user, notifikasi) |

---

## 6. Arsitektur Teknis (Ringkasan)

- **Frontend:** Next.js (App Router), React Query/SWR untuk data fetching, Tailwind CSS, shadcn/ui sebagai basis komponen
- **Backend:** NestJS (modular per domain), REST API (+ pertimbangan WebSocket Gateway untuk notifikasi real-time)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** JWT access + refresh token, RBAC guard per endpoint
- **File Storage:** S3-compatible object storage (dokumen proposal, draft, berkas sidang)
- **Notifikasi:** WebSocket (in-app) + WhatsApp Business API / email (Nodemailer)
- **Deployment:** Docker Compose (dev), CI/CD sederhana (GitHub Actions)

---

## 7. Metrik Keberhasilan

- Rata-rata waktu penyelesaian tiap tahap TA menurun dibanding sistem lama
- Tingkat komplain "tidak tahu status TA saya" mendekati nol
- Waktu admin prodi memproses approval berkurang (berkat auto-checklist)
- Adopsi role pimpinan: minimal 1x akses dashboard per minggu oleh masing-masing pimpinan fakultas

---

## 8. Di Luar Cakupan (v1)

- Deteksi plagiarisme otomatis (integrasi Turnitin dsb.) — fase berikutnya
- Publikasi otomatis ke jurnal terindeks — fase berikutnya
- Integrasi SSO dengan portal akademik utama kampus — dibahas terpisah

---

## 9. Pertanyaan Terbuka

- Apakah butuh integrasi dengan sistem akademik existing (SIAKAD) untuk data mahasiswa/dosen, atau data di-input manual?
- Apakah kuota bimbingan per dosen perlu dibatasi otomatis oleh sistem?
- Apakah publikasi jurnal (menggantikan skripsi, sesuai kebijakan baru UNP) perlu dimodelkan sebagai jenis TA terpisah di v1?
