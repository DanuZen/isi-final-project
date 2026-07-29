# PRD — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA)
**Instansi:** Fakultas Ilmu Komputer, UPI YPTK Padang  
**Versi:** 1.3 (Penambahan Halaman Dedicated Kalender TA)  
**Stack:** Next.js (Frontend) + Tailwind CSS + Lucide Icons  
**Status:** Production-Ready Design  

---

## 1. Latar Belakang & Tujuan

**SIPETA (Sistem Informasi Perjalanan & Evaluasi Tugas Akhir)** dirancang khusus untuk Fakultas Ilmu Komputer UPI YPTK Padang untuk memantau alur perjalanan tugas akhir mahasiswa secara visual, terstruktur, transparan, dan realtime.

- **Alur Fokus Tugas Akhir (4 Stage Core Workflow):** SIPETA berfokus secara ketat pada 4 tahapan aktif Tugas Akhir: `Usulan Judul, Similarity & Pengajuan Pembimbing → Bimbingan TA → ACC Seminar → Ujian Sidang Skripsi`.
- **Prasyarat Clearing Nilai (Offline / Manual di Kampus):** Pengurusan clearing nilai SKS & IPK dilakukan mahasiswa secara **langsung / offline di kampus** melalui Bagian Akademik / Admin Prodi. Hasil clearing nilai **TIDAK diinput atau diproses di dalam aplikasi SIPETA**. Setelah mahasiswa menyelesaikan clearing nilai secara luring di kampus, Admin Prodi akan membuatkan/mengaktifkan akun SIPETA mahasiswa.
- **Halaman Dedicated Kalender TA (`/kalender`):** Menyediakan halaman khusus kalender interaktif bulanan/mingguan/harian untuk memantau jadwal bimbingan, seminar proposal, ujian sidang, dan deadline akademik FIK.
- **Repositori & Referensi Judul (`/list-judul`):** Menyediakan pencarian & penelusuran judul TA mahasiswa FIK UPI YPTK lengkap dengan filter bidang kajian (RPL, AI, Jaringan) dan analisis persentase domain.
- **Tata Letak & Estetika Premium:** Brand identity UPI YPTK Padang dengan warna Deep Crimson Red (`#C62828`), Amber Gold (`#F59E0B`), font **Plus Jakarta Sans**, Centered Logo Brand Header, tombol Toggle Sidebar Navigasi, serta *Flush Bottom Baseline Alignment* di seluruh halaman.

---

## 2. Roles & Ringkasan Akses (7 Role System)

| Role | Ringkasan Akses |
|---|---|
| **Mahasiswa** | Memperoleh akun dari Admin pasca clearing nilai manual di kampus, mengusulkan judul, cek kemiripan (similarity), memilih & mengajukan dosen pembimbing (Pembimbing I & II), bimbingan rutin, pengajuan perubahan judul, ACC seminar & sidang, serta memantau kalender jadwal. |
| **Dosen Pembimbing** | Membimbing mahasiswa, mengonfirmasi pengajuan dosen pembimbing, mereview draft naskah, memberikan catatan & status revisi, approve pengajuan perubahan judul, serta memberikan ACC Seminar & Sidang. |
| **Dosen Penguji** | Menguji seminar proposal & ujian sidang skripsi, memberikan nilai komprehensif, serta memverifikasi lembar perbaikan/revisi. |
| **Admin Prodi FIK** | Membuatkan/mengaktifkan akun mahasiswa pasca verifikasi clearing nilai manual offline, mengonfirmasi pengajuan & assign pembimbing/penguji prodi, mengelola jadwal seminar/sidang, serta verifikasi repositori judul TA. |
| **Admin Fakultas** | Pengelolaan administrasi data fakultas, penerbitan Surat Keputusan (SK) Dekan untuk Dosen Pembimbing & Penguji, serta verifikasi bebas fakultas/yudisium. |
| **Pimpinan / Dekanat** | Akses *Executive Read-Only* ke kalender sidang, grafik distribusi bidang kajian (RPL, AI, Jaringan), rekapitulasi durasi masa studi, dan laporan kelulusan mahasiswa per angkatan. |
| **Super Admin** | Administrator teknis untuk manajemen akun pengguna, master data fakultas/prodi, audit log keamanan, dan konfigurasi sistem. |

---

## 3. Alur Kerja Inti (4-Stage Core TA Workflow)

```
[Prasyarat Luring: Mahasiswa Mengurus Clearing Nilai Langsung di Kampus (Offline)] 
   ↳ Verifikasi Manual SKS & IPK oleh Admin Prodi di Kampus
   ↳ Akun SIPETA Mahasiswa Dibuatkan & Diaktifkan oleh Admin
      ↓
[Stage 1] Usulan Judul, Cek Similarity & Pengajuan Dosen Pembimbing (/pembimbing)
   ↳ Form Usulan Judul + Fuzzy Similarity Check
   ↳ Pengajuan Dosen Pembimbing Utama & Pendamping oleh Mahasiswa
   ↳ Review & Approval oleh Pembimbing & Admin Prodi
      ↓
[Stage 2] Bimbingan TA (Min. 5 Sesi Bimbingan Rutin)
   ↳ Log Bimbingan Thread, Upload Draft Naskah, Feedback Dosen
   ↳ [Opsional] Form Pengajuan Perubahan Judul (ACC Pembimbing & Prodi)
      ↓
[Stage 3] ACC & Pelaksanaan Seminar Proposal
   ↳ Penjadwalan Seminar di Kalender Interaktif + Upload Revisi Sempro
      ↓
[Stage 4] ACC & Pelaksanaan Ujian Sidang Skripsi Final
   ↳ Ujian Komprehensif di Aula FIK + Upload Naskah Final & Lembar Bebas Revisi
```

---

## 4. Modul & Fitur Utama Aplikasi

### 4.1 Dashboard Utama (`/`)
- **Banner Hero Welcome:** Status verifikasi akademik, SKS, IPK, dan tombol cepat *Pengajuan Pembimbing*, *Catat Log Bimbingan* & *Ajukan Perubahan Judul*.
- **Progress Perjalanan TA (4-Stage Stepper):** Stepper horizontal visual dengan badge `Tahap X dari 4` dan tanggal penyelesaian tiap tahap.
- **Informasi Judul Disetujui:** Rincian NIDN, kuota pembimbing I & II.
- **Checklist Syarat ACC & Kontak WA Center Prodi.**

### 4.2 Usulan Judul & Similarity (`/proposal`)
- Form judul skripsi, abstrak, dan pilihan bidang kajian.
- Tombol simulator **Cek Kemiripan (Similarity)** realtime dengan indikator skor persen & status kelayakan.
- Tautan pengajuan Dosen Pembimbing Utama & Pendamping.

### 4.3 Pengajuan Dosen Pembimbing (`/pembimbing`)
- Katalog Dosen FIK UPI YPTK lengkap dengan NIDN, jabatan fungsional, bidang keahlian, dan status indikator kuota bimbingan real-time (misal: `6/8`).
- Formulir pengajuan Pembimbing I (Utama) & Pembimbing II (Pendamping) beserta catatan alasan pemilihan.
- Kartu pelacakan status approval pengajuan (Draft → Menunggu Konfirmasi Dosen → Terverifikasi Prodi).

### 4.4 Log Bimbingan TA (`/bimbingan`)
- Chat-style thread bimbingan antara Mahasiswa dan Dosen Pembimbing.
- Modal **Catat Log Bimbingan Baru** (upload file draft naskah PDF & catatan progres).
- Modal **Pengajuan Perubahan Judul** dengan input judul baru, alasan perubahan, dan alur approval 2 tingkat (Pembimbing & Prodi).

### 4.5 Kalender TA & Sidang (`/kalender`)
- Halaman dedicated **Kalender Interaktif TA & Sidang Skripsi**.
- Matriks bulanan 35 cell grid dengan penanda tanggal dan chip acara berwarna (*Bimbingan, Sempro, Ujian Sidang, Deadline Akademik*).
- Switch mode tampilan (*Bulan, Minggu, Hari*) dan tombol navigasi bulan (`< Agustus 2026 >`).
- Drawer/Modal Detail Agenda saat chip diklik (menampilkan waktu, lokasi ruangan, nama mahasiswa & dosen, serta tombol ekspor ke `.ics`).
- Sidebar panel filter per program studi dan daftar *Agenda Terdekat*.

### 4.6 Jadwal Seminar (`/seminar`)
- Informasi jadwal seminar proposal, lokasi ruangan, dan daftar dosen penguji.
- Form upload naskah perbaikan pasca seminar & status persetujuan revisi.

### 4.7 Ujian Sidang Skripsi (`/sidang`)
- Informasi jadwal ujian sidang skripsi final, lokasi aula, dan majelis dewan penguji.
- Form upload naskah final hardcover & lembar pengesahan bebas revisi.

### 4.8 Daftar & Repositori Judul TA (`/list-judul`)
- Dark Hero Header: *Repositori Resmi FIK* dengan statistik total 111 judul terdaftar.
- Fitur Filter & Search Real-Time: pencarian berdasarkan nama, NIM, judul, atau dosen pembimbing, serta filter bidang kajian (*RPL, AI/Data Mining, Jaringan*).
- Widget Distribusi Domain Penelitian & link download pedoman penulisan skripsi.

---

## 5. Standardisasi UI & Desain Layout

- **Header Bar:** Menghapus search box statis di header, menggantikannya dengan tombol **`Sidebar Navigasi`** di kiri untuk toggle collapse/expand sidebar, serta indikator notifikasi & profil mahasiswa.
- **Sidebar Header:** Centered logo emblem **UPI YPTK Padang** dan judul **SIPETA** yang diposisikan presisi di tengah.
- **Flush Bottom Baseline Alignment:** Seluruh halaman (Dashboard, Usulan, Pembimbing, Bimbingan, Kalender, Seminar, Sidang, List Judul) menggunakan grid 2-kolom atau 4-kolom yang sejajar secara presisi di garis paling bawah (*Zero empty space*).
