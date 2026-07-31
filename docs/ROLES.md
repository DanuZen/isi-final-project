# Dokumentasi Role, Hak Akses & Matriks Kewenangan — SIPETA UPI YPTK Padang

**Sistem Informasi Perjalanan & Evaluasi Tugas Akhir (SIPETA)**  
Universitas Putra Indonesia YPTK Padang (Seluruh Fakultas & Pascasarjana)  
*Versi Dokumentasi:* 1.4 (Pembaruan Skala Multi-Fakultas & Multi-Prodi Civitas Akademika)  
*Tanggal:* 31 Juli 2026  

---

## 1. Pendahuluan

Dokumen ini mendefinisikan secara menyeluruh seluruh **Role (Peran)**, **Hak Akses**, **Matriks Kewenangan**, dan **Alur Kerja Interaksi** pengguna dalam aplikasi **SIPETA (Sistem Informasi Perjalanan & Evaluasi Tugas Akhir)** untuk **seluruh Civitas Akademika Universitas Putra Indonesia YPTK Padang**.

Dokumen ini disusun sebagai panduan pengembang (developer), administrator prodi & fakultas, serta dasar acuan dalam penerapan Role-Based Access Control (RBAC).

---

## 2. Ringkasan Role & Hirarki Akses

Dalam sistem SIPETA, pengguna dibagi menjadi **7 Role Utama** (berdasarkan enum `RoleEnum` pada skema basis data Prisma):

| No | Role (`RoleEnum`) | Kategori | Ringkasan Peran & Fokus Utama |
|---|---|---|---|
| 1 | **`MAHASISWA`** | Pengguna Akademik | Mengurus clearing nilai secara luring di kampus, kemudian mengakses aplikasi SIPETA untuk mengusulkan judul, cek kemiripan, memilih dosen pembimbing, mengisi log bimbingan, mengajukan ACC, dan memantau kalender jadwal TA. |
| 2 | **`DOSEN` (Pembimbing)** | Evaluator & Pembimbing | Membimbing mahasiswa, mengonfirmasi pengajuan pembimbing, mereview draft naskah, approve perubahan judul, serta memberikan ACC Seminar & Ujian Sidang. |
| 3 | **`DOSEN` (Penguji)** | Evaluator Ujian | Menguji pelaksanaan Seminar Proposal & Sidang Skripsi, menginput nilai komprehensif, dan memverifikasi perbaikan/revisi. |
| 4 | **`ADMIN_PRODI`** | Pengelola Operasional Prodi | Memverifikasi bukti clearing nilai manual luring dari mahasiswa, mengaktifkan akun SIPETA, mengonfirmasi pengajuan & assign pembimbing/penguji prodi, mengelola jadwal di kalender, serta repositori judul. |
| 5 | **`ADMIN_FAKULTAS`** | Administrator Fakultas | Pengelolaan administrasi data fakultas, penerbitan Surat Keputusan (SK) Dekan untuk Dosen Pembimbing & Penguji per-Fakultas, serta verifikasi 3-kriteria bebas fakultas/yudisium. |
| 6 | **`PIMPINAN`** | Executive Monitoring | Akses *Executive Read-Only* ke kalender sidang, grafik komparasi antar-prodi & fakultas, rekapitulasi masa studi, dan laporan kelulusan angkatan. |
| 7 | **`SUPERADMIN`** | Administrator Teknis | Pengelolaan master data multi-fakultas/prodi, manajemen akun user, audit log keamanan (HMAC SHA-256), dan konfigurasi parameter sistem. |

---

## 3. Rincian Fungsi & Hak Akses Masing-Masing Role

### 3.1 Mahasiswa (`MAHASISWA`)
* **Prasyarat Akses (Offline di Kampus):** Mahasiswa mendatangi langsung Bagian Akademik / Admin Prodi di kampus untuk mengurus verifikasi clearing nilai (SKS & IPK). Proses clearing nilai ini **TIDAK diproses di dalam aplikasi web SIPETA**.
* **Status Akun:** Memperoleh/diaktifkan akun SIPETA oleh Admin Prodi setelah bukti clearing nilai manual diverifikasi di kampus.
* **Fungsi & Fitur Utama di Aplikasi:**
  1. **Usulan Judul & Similarity (`/proposal`):** 
     - Mengisi form proposal judul skripsi, abstrak, dan bidang kajian (RPL, AI/Data Mining, Jaringan).
     - Menjalankan simulator **Cek Kemiripan (Similarity)** realtime (skor < 25% dinyatakan layak).
  2. **Pengajuan Dosen Pembimbing (`/pembimbing`):**
     - Memilih dan mengajukan calon Dosen Pembimbing I (Utama) dan Dosen Pembimbing II (Pendamping) dari katalog dosen.
     - Memantau ketersediaan kuota bimbingan dosen real-time (`6/8 Tersedia`).
  3. **Log Bimbingan TA (`/bimbingan`):**
     - Mengunggah draft naskah PDF & mencatat log sesi bimbingan rutin (minimal 5 sesi terverifikasi).
     - Berinteraksi via thread catatan bimbingan dengan Dosen Pembimbing.
     - Mengajukan form **Perubahan Judul** (jika terjadi perubahan arah penelitian besar).
  4. **Seminar Proposal (`/seminar`):**
     - Mengajukan permintaan ACC Seminar Proposal.
     - Memantau jadwal seminar, ruangan, dan daftar penguji di Kalender Interaktif.
     - Mengunggah naskah revisi pasca seminar.
  5. **Ujian Sidang Skripsi (`/sidang`):**
     - Mengajukan ACC Ujian Sidang Skripsi.
     - Mengunggah naskah final hardcover dan bukti lembar bebas revisi.
  6. **Repositori & Kalender (`/list-judul`, `/`):**
     - Memantau timeline stepper progres 4-Stage TA.
     - Mencari referensi judul TA di repositori resmi FIK.

---

### 3.2 Dosen Pembimbing (`DOSEN` - Pembimbing I & II)
* **Konteks Peran:** Dosen yang ditugaskan sebagai Pembimbing Utama (Posisi 1) atau Pembimbing Pendamping (Posisi 2).
* **Fungsi & Fitur Utama:**
  1. **Dashboard Pembimbing:** Memantau daftar mahasiswa bimbingan aktif beserta progres stepper masing-masing.
  2. **Konfirmasi Usulan Pembimbing:** Mengonfirmasi/menerima usulan mahasiswa yang mengajukan bimbingan.
  3. **Evaluasi Log Bimbingan:** Review draft naskah PDF, memberikan catatan/feedback pada thread, dan mengesahkan (*isApproved*) log bimbingan.
  4. **Approval Perubahan Judul:** Memeriksa dan memberikan persetujuan (*Approved / Rejected*) atas pengajuan perubahan judul dari mahasiswa.
  5. **Persetujuan ACC:** Klik tombol persetujuan **ACC Seminar Proposal** dan **ACC Ujian Sidang Skripsi**.
  6. **Verifikasi Revisi:** Memeriksa naskah perbaikan dan menandatangani/approve lembar pengesahan revisi.

---

### 3.3 Dosen Penguji (`DOSEN` - Tim Majelis Penguji)
* **Konteks Peran:** Dosen yang ditunjuk dalam Tim Penguji Seminar Proposal atau Ujian Sidang Skripsi.
* **Fungsi & Fitur Utama:**
  1. **Dashboard Penguji:** Memantau jadwal pengujian seminar & sidang yang terintegrasi dengan kalender.
  2. **Penilaian Ujian:** Menginput nilai akhir angka/huruf dan catatan perbaikan secara digital saat ujian berlangsung.
  3. **Verifikasi Lembar Perbaikan:** Memeriksa naskah revisi mahasiswa pasca-ujian dan mengubah status kelayakan revisi.

---

### 3.4 Admin Prodi FIK (`ADMIN_PRODI`)
* **Konteks Peran:** Pengelola administrasi akademik Tugas Akhir di tingkat Program Studi (Teknik Informatika, Sistem Informasi, dll.).
* **Fungsi & Fitur Utama:**
  1. **Aktivasi Akun (Pasca Clearing Luring):** Memeriksa bukti fisik clearing nilai dari mahasiswa yang mengurus langsung ke kampus, lalu mengaktifkan akun SIPETA mahasiswa.
  2. **Penetapan & Verifikasi Pembimbing/Penguji:** Memvalidasi pengajuan pembimbing dari mahasiswa, assign Dosen Pembimbing I & II, serta menetapkan Dosen Penguji Sempro & Sidang.
  3. **Penjadwalan Interaktif:** Mengatur tanggal, waktu, dan ruangan (*misal: Ruang 302 FIK, Aula Utama*) untuk seminar & sidang yang otomatis masuk ke Kalender Interaktif.
  4. **Konfirmasi Final Judul:** Memberikan approval tingkat Prodi untuk perubahan judul TA.
  5. **Manajemen Repositori Judul:** Mengunci naskah final ke repositori resmi FIK (`/list-judul`).

---

### 3.5 Admin Fakultas (`ADMIN_FAKULTAS`)
* **Konteks Peran:** Staf Administrasi dan Tata Usaha di tingkat Fakultas Ilmu Komputer UPI YPTK Padang.
* **Fungsi & Fitur Utama:**
  1. **Penerbitan Surat Keputusan (SK) Dekan:** Mengunggah dan menerbitkan dokumen resmi SK Dekan tentang penetapan Dosen Pembimbing & Dewan Penguji.
  2. **Verifikasi Bebas Fakultas:** Memverifikasi dokumen bebas laboratorium, perpustakaan fakultas, dan administrasi keuangan tingkat fakultas.
  3. **Pengelolaan Master Data Fakultas:** Memperbarui data dosen tingkat fakultas, pengumuman resmi dekanat, serta templat pedoman skripsi.
  4. **Monitoring Lintas Prodi:** Memantau distribusi dan rekapitulasi data TA di seluruh program studi di bawah FIK.

---

### 3.6 Pimpinan (`PIMPINAN`)
* **Konteks Peran:** Dekan, Wakil Dekan, dan Ketua Lembaga Penjaminan Mutu di lingkungan FIK UPI YPTK Padang.
* **Fungsi & Fitur Utama:**
  1. **Executive Dashboard:** Akses *Executive Read-Only* ke seluruh indikator kinerja utama TA mahasiswa.
  2. **Monitoring Kalender Sidang:** Melihat kalender jadwal seminar proposal dan sidang skripsi harian/mingguan/bulanan.
  3. **Analisis Statistik Domain Penelitian:** Memantau persentase tren topik penelitian (RPL, AI/Data Mining, Jaringan & Infrastruktur).
  4. **Evaluasi Durasi Masa Studi:** Memantau rata-rata lama bimbingan TA, rasio beban bimbingan dosen, serta laporan kelulusan mahasiswa per angkatan.

---

### 3.7 Super Admin (`SUPERADMIN`)
* **Konteks Peran:** Tim IT / Technical Administrator System Information.
* **Fungsi & Fitur Utama:**
  1. **User Management:** Manajemen akun pengguna (Create, Read, Update, Delete, Reset Password).
  2. **Master Data Management:** Pengelolaan data Fakultas, Program Studi, Kode Matakuliah, dan Tahun Akademik.
  3. **Audit Log & Security:** Memantau `AuditLog` aktivitas sistem, log error, dan performa database PostgreSQL/Prisma.

---

## 4. Matriks Kewenangan (RBAC)

| Fitur/Aksi | Mahasiswa | Pembimbing | Penguji | Admin Prodi | Admin Fakultas | Pimpinan | SuperAdmin |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Clearing Nilai SKS/IPK** | *Urus Luring di Kampus* | - | - | *Aktifkan Akun Pasca Verifikasi Offline* | - | - | Full |
| **Usulan Judul & Similarity** | Submit & Cek | - | - | Review & Approve | Read | Read | Full |
| **Pengajuan & Assign Pembimbing**| Select & Submit | Confirm | - | Assign / Verify | Terbitkan SK | Read | Full |
| **Log Bimbingan TA** | Create / Write | Feedback & Approve | - | Read | Read | Read | Full |
| **Form Perubahan Judul** | Submit | Review & Approve | - | Final Approval | Read | Read | Full |
| **Penjadwalan Sempro/Sidang**| View Kalender | View Kalender | View Kalender | Create & Schedule | View Kalender | Read | Full |
| **Penilaian Sempro / Sidang** | View Nilai | - | Input Nilai & Catatan | View Nilai | View Nilai | Read | Full |
| **Penerbitan SK Dekan / Bebas Fak.**| View | - | - | Request | Create & Publish | Read | Read | Full |
| **Executive Reports & Analytics** | - | - | - | Read | Read | Full Analytics | Full |
| **Audit Log & System Config** | - | - | - | - | - | - | Full |

---

## 5. Rationale & Justifikasi Desain 7 Role System

Arsitektur **7 Role System** pada SIPETA didesain berdasarkan analisis tata kelola akademik nyata di Fakultas Ilmu Komputer (FIK) UPI YPTK Padang. Berikut adalah justifikasi teknis dan operasionalnya:

### 5.1 Hirarki Visual RBAC 7 Role
```
SIPETA RBAC Hierarchy
 ├── 1. SUPERADMIN       (Technical System Administrator & Security Audit)
 ├── 2. PIMPINAN         (Executive Analytical Monitoring & Decision Making)
 ├── 3. ADMIN_FAKULTAS   (SK Dekan & Verifikasi Bebas Fakultas)
 ├── 4. ADMIN_PRODI      (Aktivasi Akun, Assign Pembimbing/Penguji, Penjadwalan)
 ├── 5. DOSEN (Pembimbing) (Review Draft PDF, Log Bimbingan Thread, ACC Ujian)
 ├── 6. DOSEN (Penguji)    (Penilaian Ujian Sempro/Sidang, Revisi Check)
 └── 7. MAHASISWA        (Usulan Judul, Cek Similarity, Pilih Pembimbing, Bimbingan)
```

### 5.2 Pemisahan Tugas Operasional vs Kebijakan (*Separation of Concerns*)
1. **`ADMIN_PRODI` vs `ADMIN_FAKULTAS`:**  
   Pemisahan ini mencegah penumpukan beban kerja pada satu bagian administrasi. Admin Prodi fokus pada teknis akademik prodi (penjadwalan sidang, kuota bimbingan, verifikasi usulan pembimbing), sedangkan Admin Fakultas fokus pada surat-menyurat resmi fakultas (penerbitan SK Dekan & bebas fakultas).
2. **`PIMPINAN` (Executive Analytics):**  
   Dekan/Wakil Dekan tidak dibebani pekerjaan input data (*data entry*), melainkan fokus pada pemantauan indikator kinerja utama (*KPI*), statistik tren riset (RPL/AI/Jaringan), dan evaluasi durasi masa studi mahasiswa.

### 5.3 Konteks Dosen Dual-Role & Rekomendasi UI Toggle Switch
Di basis data Prisma, peran Dosen direpresentasikan sebagai enum `DOSEN`. Namun di tingkat aplikasi, Dosen dapat bertindak sebagai **Pembimbing** atau **Penguji** secara kontekstual:
* **Rekomendasi UI:** Dashboard Dosen menyediakan tombol **Toggle Switch Mode** di Header Navigasi:  
  `[ 📘 Mode Mahasiswa Bimbingan ]` | `[ 📝 Mode Jadwal Pengujian ]`

### 5.4 Efisiensi Alur Mahasiswa
Dengan mengeluarkan *Clearing Nilai* ke proses luring (offline di kampus), mahasiswa tidak perlu mengunggah berkas transkrip nilai secara berulang di aplikasi. Begitu diaktifkan oleh Admin Prodi, mahasiswa dapat langsung fokus pada 4 tahap aktif TA tanpa hambatan birokrasi online yang redundan.

### 5.5 Keamanan IT & Audit Logs (`SUPERADMIN`)
Peran `SUPERADMIN` memisahkan fungsi pemeliharaan teknis sistem (reset password, pengelolaan master data fakultas/prodi, audit security logs) dari peran operasional akademik harian.

---

## 6. Penutup & Langkah Selanjutnya

Dokumen ini menjadi acuan resmi pengembangan backend API authorization (RBAC - Role-Based Access Control) dan perancangan UI/UX Dashboard tiap role pada SIPETA UPI YPTK Padang.
