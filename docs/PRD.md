# PRD — Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA)
**Instansi:** Fakultas Ilmu Komputer, UPI YPTK Padang  
**Versi:** 1.0 (Production-Ready Design)  
**Stack:** Next.js (Frontend) + Tailwind CSS + Lucide Icons  
**Status:** UI/UX & Flow Refinement Complete  

---

## 1. Latar Belakang & Tujuan

**SIPETA (Sistem Informasi Perjalanan & Evaluasi Tugas Akhir)** dirancang khusus untuk Fakultas Ilmu Komputer UPI YPTK Padang untuk memantau alur perjalanan tugas akhir mahasiswa secara visual, terstruktur, transparan, dan realtime.

- **Alur Fokus Tugas Akhir (4 Stage Core Workflow):** SIPETA berfokus secara ketat pada 4 tahapan aktif Tugas Akhir: `Usulan Judul & Similarity → Bimbingan TA → ACC Seminar → Ujian Sidang Skripsi`.
- **Clearing Nilai (Prasyarat Akademik):** Mahasiswa mengajukan clearing nilai ke Admin Prodi. Setelah diverifikasi, Admin akan membuatkan/mengaktifkan akun SIPETA. Fitur clearing tidak berada di dalam alur aktif mahasiswa agar tampilan tetap fokus pada progres TA.
- **Repositori & Referensi Judul (`/list-judul`):** Menyediakan pencarian & penelusuran judul TA mahasiswa FIK UPI YPTK lengkap dengan filter bidang kajian (RPL, AI, Jaringan) dan analisis persentase domain.
- **Kalender Interaktif TA & Sidang:** Widget kalender interaktif pada Dashboard dengan color-coded badges (*Bimbingan Rutin, Seminar Proposal, Ujian Sidang*) dan control view mode (*Bulan, Minggu, Hari*).
- **Tata Letak & Estetika Premium:** Brand identity UPI YPTK Padang dengan warna Deep Crimson Red (`#C62828`), Amber Gold (`#F59E0B`), font **Plus Jakarta Sans**, Centered Logo Brand Header, tombol Toggle Sidebar Navigasi, serta *Flush Bottom Baseline Alignment* di seluruh halaman.

---

## 2. Roles & Ringkasan Akses

| Role | Ringkasan Akses |
|---|---|
| **Mahasiswa** | Memperoleh akun dari Admin pasca clearing nilai, mengusulkan judul, cek kemiripan (similarity), bimbingan rutin, pengajuan perubahan judul, ACC seminar & sidang, serta memantau kalender jadwal. |
| **Dosen Pembimbing** | Membimbing mahasiswa, mereview draft naskah, memberikan catatan & status revisi, approve pengajuan perubahan judul, serta memberikan ACC Seminar & Sidang. |
| **Dosen Penguji** | Menguji seminar proposal & ujian sidang skripsi, memberikan nilai komprehensif, serta memverifikasi lembar perbaikan/revisi. |
| **Admin Prodi FIK** | Membuatkan/mengaktifkan akun mahasiswa pasca clearing nilai, assign pembimbing & penguji, mengelola jadwal seminar/sidang, serta verifikasi repositori judul TA. |
| **Pimpinan / Dekanat** | Akses read-only ke kalender sidang, distribusi statistik domain penelitian, serta laporan kelulusan mahasiswa per angkatan. |

---

## 3. Alur Kerja Inti (4-Stage Core TA Workflow)

```
[Prasyarat: Clearing Nilai di Admin Prodi] 
   ↳ Akun SIPETA Dibuat & Aktif
      ↓
[Stage 1] Usulan Judul & Similarity Check
   ↳ Review & Approval Judul oleh Prodi + Cek Kemiripan Fuzzy/Similarity Score
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
- **Banner Hero Welcome:** Status verifikasi akademik, SKS, IPK, dan tombol cepat *Catat Log Bimbingan* & *Ajukan Perubahan Judul*.
- **Progress Perjalanan TA (4-Stage Stepper):** Stepper horizontal visual dengan badge `Tahap X dari 4` dan tanggal penyelesaian tiap tahap.
- **Informasi Judul Disetujui:** Rincian NIDN, kuota pembimbing I & II.
- **Widget Kalender Jadwal TA & Sidang:** Mode *Bulan / Minggu / Hari*, tombol navigasi bulan, serta badge acara berwarna (*Bimbingan, Sempro, Ujian Sidang*).
- **Checklist Syarat ACC & Kontak WA Center Prodi.**

### 4.2 Usulan Judul & Similarity (`/proposal`)
- Form judul skripsi, abstrak, dan pilihan bidang kajian.
- Tombol simulator **Cek Kemiripan (Similarity)** realtime dengan indikator skor persen & status kelayakan.
- Kartu penetapan Dosen Pembimbing Utama & Pendamping beserta status kuota bimbingan.

### 4.3 Log Bimbingan TA (`/bimbingan`)
- Chat-style thread bimbingan antara Mahasiswa dan Dosen Pembimbing.
- Modal **Catat Log Bimbingan Baru** (upload file draft naskah PDF & catatan progres).
- Modal **Pengajuan Perubahan Judul** dengan input judul baru, alasan perubahan, dan alur approval 2 tingkat (Pembimbing & Prodi).

### 4.4 Jadwal Seminar (`/seminar`)
- Informasi jadwal seminar proposal, lokasi ruangan, dan daftar dosen penguji.
- Form upload naskah perbaikan pasca seminar & status persetujuan revisi.

### 4.5 Ujian Sidang Skripsi (`/sidang`)
- Informasi jadwal ujian sidang skripsi final, lokasi aula, dan majelis dewan penguji.
- Form upload naskah final hardcover & lembar pengesahan bebas revisi.

### 4.6 Daftar & Repositori Judul TA (`/list-judul`)
- Dark Hero Header: *Repositori Resmi FIK* dengan statistik total 111 judul terdaftar.
- Fitur Filter & Search Real-Time: pencarian berdasarkan nama, NIM, judul, atau dosen pembimbing, serta filter bidang kajian (*RPL, AI/Data Mining, Jaringan*).
- Widget Distribusi Domain Penelitian & link download pedoman penulisan skripsi.

---

## 5. Standardisasi UI & Desain Layout

- **Header Bar:** Menghapus search box statis di header, menggantikannya dengan tombol **`Sidebar Navigasi`** di kiri untuk toggle collapse/expand sidebar, serta indikator notifikasi & profil mahasiswa.
- **Sidebar Header:** Centered logo emblem **UPI YPTK Padang** dan judul **SIPETA** yang diposisikan presisi di tengah.
- **Flush Bottom Baseline Alignment:** Seluruh halaman (Dashboard, Usulan, Bimbingan, Seminar, Sidang, List Judul) menggunakan grid 2-kolom yang sejajar secara presisi di garis paling bawah (*Zero empty space*).
