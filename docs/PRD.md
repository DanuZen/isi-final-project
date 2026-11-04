# PRD — PT MBOIS Final Project Platform
**Instansi:** PT MBOIS (Divisi Riset, Pengembangan & Program Final Project)  
**Versi:** 2.0 (Pembaruan Rebranding Brand Identity & Desain Sistem Blue & White)  
**Stack:** Next.js (Frontend) + Tailwind CSS + Lucide Icons  
**Status:** Production-Ready Design  

---

## 1. Latar Belakang & Tujuan

**PT MBOIS - Final Project Platform** dirancang untuk **seluruh Civitas dan Anggota Tim PT MBOIS** guna memantau alur perjalanan tugas akhir dan final project mahasiswa/peserta secara visual, terstruktur, transparan, dan realtime.

- **Alur Fokus Tugas Akhir (4 Stage Core Workflow):** Platform berfokus secara ketat pada 4 tahapan aktif Final Project: `Usulan Judul, Similarity & Pengajuan Pembimbing → Bimbingan TA → ACC Seminar → Ujian Sidang Akhir`.
- **Prasyarat Clearing Nilai (Offline / Manual di Kampus):** Pengurusan clearing nilai SKS & IPK dilakukan mahasiswa/peserta secara **langsung / offline** melalui Bagian Akademik / Admin Divisi. Hasil clearing nilai **TIDAK diinput atau diproses di dalam aplikasi**. Setelah mahasiswa menyelesaikan clearing nilai secara luring, Admin akan membuatkan/mengaktifkan akun Final Project mahasiswa.
- **Halaman Dedicated Kalender TA (`/kalender`):** Menyediakan halaman khusus kalender interaktif bulanan/mingguan/harian untuk memantau jadwal bimbingan, seminar proposal, ujian sidang, dan deadline akademik seluruh divisi/fakultas.
- **Repositori & Referensi Judul (`/list-judul`):** Menyediakan pencarian & penelusuran judul Final Project alumni PT MBOIS lengkap dengan filter bidang kajian dan analisis persentase domain.
- **Tata Letak & Estetika Premium:** Brand identity PT MBOIS dengan warna Royal Blue (`#2563eb`), Deep Blue (`#1d4ed8`), Sky Accent (`#38bdf8`), font **Plus Jakarta Sans**, Centered Logo Brand Header, tombol Toggle Sidebar Navigasi, input berlabel floating notched outline, serta *Flush Bottom Baseline Alignment* di seluruh halaman.

---

## 2. Roles & Ringkasan Akses (7 Role System)

| Role | Ringkasan Akses |
|---|---|
| **Mahasiswa / Peserta** | Memperoleh akun dari Admin pasca clearing nilai manual, mengusulkan judul, cek kemiripan (similarity), memilih & mengajukan dosen/mentor pembimbing (Pembimbing I & II), bimbingan rutin, pengajuan perubahan judul, ACC seminar & sidang, serta memantau kalender jadwal. |
| **Dosen / Mentor Pembimbing** | Membimbing mahasiswa, mengonfirmasi pengajuan dosen pembimbing, mereview draft naskah, memberikan catatan & status revisi, approve pengajuan perubahan judul, serta memberikan ACC Seminar & Sidang. |
| **Dosen / Reviewer Penguji** | Menguji seminar proposal & ujian sidang evaluasi, memberikan nilai komprehensif, serta memverifikasi lembar perbaikan/revisi. |
| **Admin Prodi / Divisi** | Membuatkan/mengaktifkan akun mahasiswa pasca verifikasi clearing nilai manual offline, mengonfirmasi pengajuan & assign pembimbing/penguji prodi, mengelola jadwal seminar/sidang, serta verifikasi repositori judul Final Project. |
| **Admin Fakultas / Departemen** | Pengelolaan administrasi data departemen, penerbitan Surat Keputusan (SK) untuk Dosen Pembimbing & Penguji, serta verifikasi 3-kriteria bebas fakultas/yudisium. |
| **Pimpinan / Dekanat** | Akses *Executive Read-Only* ke kalender sidang, grafik komparasi performa, rekapitulasi durasi masa studi, dan laporan kelulusan mahasiswa per angkatan. |
| **Super Admin** | Administrator teknis untuk manajemen akun pengguna, master data divisi/departemen, audit log keamanan, dan konfigurasi parameter sistem. |

---

## 3. Alur Kerja Inti (4-Stage Core TA Workflow)

```
[Prasyarat Luring: Mahasiswa Mengurus Clearing Nilai Langsung (Offline)] 
   ↳ Verifikasi Manual SKS & IPK oleh Admin di Kampus/Divisi
   ↳ Akun Final Project Mahasiswa Dibuatkan & Diaktifkan oleh Admin
      ↓
[Stage 1] Usulan Judul, Cek Similarity & Pengajuan Dosen Pembimbing (/pembimbing)
   ↳ Form Usulan Judul + Fuzzy Similarity Check
   ↳ Pengajuan Dosen Pembimbing Utama & Pendamping oleh Mahasiswa
   ↳ Review & Approval oleh Pembimbing & Admin
      ↓
[Stage 2] Bimbingan Project (Min. 5 Sesi Bimbingan Rutin)
   ↳ Log Bimbingan Thread, Upload Draft Naskah, Feedback Dosen/Mentor
   ↳ [Opsional] Form Pengajuan Perubahan Judul (ACC Pembimbing & Admin)
      ↓
[Stage 3] ACC & Pelaksanaan Seminar Proposal
   ↳ Penjadwalan Seminar di Kalender Interaktif + Upload Revisi Sempro
      ↓
[Stage 4] ACC & Pelaksanaan Ujian Sidang Akhir Final
   ↳ Ujian Komprehensif di Ruang Sidang + Upload Naskah Final & Lembar Bebas Revisi
```

---

## 4. Modul & Fitur Utama Aplikasi

### 4.1 Dashboard Utama (`/mahasiswa/dashboard`)
- **Banner Hero Welcome:** Status verifikasi akademik, SKS, IPK, dan tombol cepat *Pengajuan Pembimbing*, *Catat Log Bimbingan* & *Ajukan Perubahan Judul*.
- **Progress Perjalanan Final Project (4-Stage Stepper):** Stepper horizontal visual dengan badge `Tahap X dari 4` dan tanggal penyelesaian tiap tahap.
- **Informasi Judul Disetujui:** Rincian NIDN, kuota pembimbing I & II.
- **Checklist Syarat ACC & Kontak Help Center PT MBOIS.**

### 4.2 Usulan Judul & Similarity (`/mahasiswa/proposal`)
- Form judul project, abstrak, dan pilihan bidang kajian.
- Tombol simulator **Cek Kemiripan (Similarity)** realtime dengan indikator skor persen & status kelayakan.
- Tautan pengajuan Dosen Pembimbing Utama & Pendamping.

### 4.3 Pengajuan Dosen Pembimbing (`/mahasiswa/pembimbing`)
- Katalog Dosen/Mentor PT MBOIS lengkap dengan NIDN/NIP, jabatan fungsional, bidang keahlian, dan status indikator kuota bimbingan real-time (misal: `6/8`).
- Formulir pengajuan Pembimbing I (Utama) & Pembimbing II (Pendamping) beserta catatan alasan pemilihan.
- Kartu pelacakan status approval pengajuan (Draft → Menunggu Konfirmasi Dosen → Terverifikasi Admin).

### 4.4 Log Bimbingan (`/mahasiswa/bimbingan`)
- Chat-style thread bimbingan antara Mahasiswa dan Dosen Pembimbing.
- Modal **Catat Log Bimbingan Baru** (upload file draft naskah PDF & catatan progres).
- Modal **Pengajuan Perubahan Judul** dengan input judul baru, alasan perubahan, dan alur approval 2 tingkat (Pembimbing & Admin).

### 4.5 Kalender Interaktif (`/mahasiswa/kalender`)
- Halaman dedicated **Kalender Interaktif Final Project & Sidang**.
- Matriks bulanan 35 cell grid dengan penanda tanggal dan chip acara berwarna (*Bimbingan, Sempro, Ujian Sidang, Deadline*).
- Switch mode tampilan (*Bulan, Minggu, Hari*) dan tombol navigasi bulan.
- Drawer/Modal Detail Agenda saat chip diklik (menampilkan waktu, lokasi ruangan, nama peserta & dosen, serta tombol ekspor ke `.ics`).
- Sidebar panel filter per program studi/divisi dan daftar *Agenda Terdekat*.

### 4.6 Jadwal Seminar (`/mahasiswa/seminar`)
- Informasi jadwal seminar proposal, lokasi ruangan, dan daftar dosen penguji.
- Form upload naskah perbaikan pasca seminar & status persetujuan revisi.

### 4.7 Ujian Sidang Akhir (`/mahasiswa/sidang`)
- Informasi jadwal ujian sidang evaluasi final, lokasi aula, dan majelis dewan penguji.
- Form upload naskah final hardcover & lembar pengesahan bebas revisi.

### 4.8 Daftar & Repositori Judul (`/mahasiswa/list-judul`)
- Dark Hero Header: *Repositori Resmi PT MBOIS* dengan statistik total judul terdaftar.
- Fitur Filter & Search Real-Time: pencarian berdasarkan nama, NIM/ID, judul, atau pembimbing, serta filter bidang kajian.
- Widget Distribusi Domain Penelitian & link download pedoman penulisan.

---

## 5. Standardisasi UI & Desain Layout

- **Header Bar:** Menghapus search box statis di header, menyediakan tombol **`Sidebar Navigasi`** di kiri untuk toggle collapse/expand sidebar, logo `/mbois_blue.png`, serta indikator notifikasi & profil.
- **Sidebar Header:** Centered logo resmi **PT MBOIS** (`/mbois_white.png`) dan label **FINAL PROJECT** yang diposisikan presisi di tengah vertikal & horizontal.
- **Notched Outline Floating Input:** Input field di halaman auth dengan label mengambang yang memotong garis border atas, icon prefix, dan tombol shortcut peran seragam biru (`bg-blue-600`).
- **Flush Bottom Baseline Alignment:** Seluruh halaman menggunakan grid yang sejajar secara presisi di garis paling bawah (*Zero empty space*).
