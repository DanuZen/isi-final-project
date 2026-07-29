# Workflow & Alur Kerja Detail — SIPETA UPI YPTK Padang

Dokumen ini menjelaskan alur kerja (*end-to-end workflow*) dan diagram interaksi (*sequence & flowchart*) untuk setiap tahapan dalam **SIPETA (Sistem Informasi Perjalanan & Evaluasi Tugas Akhir)**.

---

## 1. Peta Alur Kerja Utama (4 Core TA Workflow)

```mermaid
flowchart TD
    A[Prasyarat Luring: Clearing Nilai SKS Manual di Kampus] -->|Admin Aktifkan Akun| B[Stage 1: Usulan Judul, Similarity Check & Pengajuan Pembimbing]
    B -->|Review & Approve Dosen & Prodi| C[Penetapan Dosen Pembimbing Utama & Pendamping]
    C --> D[Stage 2: Bimbingan TA Rutin - Min. 5 Sesi]
    D -->|Opsional: Pengajuan Perubahan Judul| E[Approval Perubahan Judul oleh Dosen & Prodi]
    E --> D
    D -->|ACC Pembimbing| F[Stage 3: ACC & Pelaksanaan Seminar Proposal]
    F --> G[Upload Naskah Perbaikan & Lembar Pengesahan Sempro]
    G -->|Disetujui Dosen| H[Stage 4: ACC & Ujian Sidang Skripsi Final]
    H --> I[Ujian Komprehensif Dewan Penguji]
    I --> J[Upload Naskah Final Hardcover & Bebas Revisi]
    J --> K[Penyelesaian Perjalanan TA FIK UPI YPTK]
```

---

## 2. Alur Kerja Detail Per Tahap

### 2.1 Prasyarat: Clearing Nilai Manual (Luring / Offline di Kampus)
Pengurusan Clearing Nilai SKS & IPK dilakukan mahasiswa secara **manual/langsung di kampus** dengan mendatangi Bagian Akademik / Admin Prodi.  
* **Proses Offline:** Mahasiswa membawa bukti transkrip nilai ke kampus untuk diverifikasi oleh Admin Prodi.  
* **Tidak Ada di Sistem:** Proses pemeriksaan berkas clearing nilai **TIDAK memiliki form / modul input di dalam aplikasi web SIPETA**.  
* **Aktivasi Akun:** Setelah mahasiswa dinyatakan lulus clearing nilai secara luring, Admin Prodi akan membuatkan/mengaktifkan akun SIPETA mahasiswa agar dapat login dan mengusulkan judul TA.

---

### 2.2 Stage 1: Usulan Judul, Cek Kemiripan & Pengajuan Pembimbing

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    participant S as Sistem SIPETA

    note over M,P: Prasyarat Luring: Mahasiswa Mengurus Clearing Nilai Langsung di Kampus
    P->>S: Buatkan / Aktifkan Akun SIPETA Mahasiswa
    M->>S: Login & Isi Form Usulan Judul (Judul, Abstrak, Bidang Kajian)
    M->>S: Klik "Cek Kemiripan (Similarity)" Realtime
    S->>S: Calculate Fuzzy Match Similarity Score (%)
    S-->>M: Tampilkan Skor Kemiripan (< 25% Layak)
    M->>S: Cari & Pilih Dosen Pembimbing I & II (/pembimbing)
    M->>S: Submit Form Usulan Judul + Pengajuan Pembimbing
    D->>S: Konfirmasi / Approve Pengajuan Bimbingan oleh Dosen
    P->>S: Review & Verifikasi Akhir Penetapan Pembimbing oleh Prodi
    S-->>M: Status Judul Disetujui & Dosen Pembimbing Resmi Ditetapkan
```

---

### 2.3 Stage 2: Log Bimbingan TA & Pengajuan Perubahan Judul

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    participant S as Sistem SIPETA

    loop Minimal 5 Sesi Bimbingan Rutin
        M->>S: Catat Log Bimbingan + Upload Draft Naskah (PDF)
        D->>S: Beri Feedback / Status Revisi Bimbingan
        S-->>M: Thread Catatan Bimbingan Ter-update
    end

    opt Pengajuan Perubahan Judul (Jika Ada Arah Revisi Besar)
        M->>S: Form Perubahan Judul (Judul Baru & Alasan)
        D->>S: ACC / Approve Perubahan Judul oleh Dosen
        P->>S: Konfirmasi Approval Judul Baru oleh Prodi
        S-->>M: Judul TA Ter-update di Seluruh Sistem
    end
```

---

### 2.4 Stage 3: ACC & Pelaksanaan Seminar Proposal

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    actor G as Dosen Penguji
    participant S as Sistem SIPETA

    M->>S: Ajukan ACC Seminar Proposal (Syarat 5 Sesi Bimbingan)
    D->>S: Verifikasi & Klik "ACC Seminar"
    P->>S: Penjadwalan Tanggal, Waktu, Ruangan & Dosen Penguji
    S-->>M: Tampil di Widget Kalender Interaktif TA & Sidang
    
    note over M,G: Pelaksanaan Seminar Proposal di Ruang 302 FIK
    G->>S: Input Nilai & Catatan Perbaikan Seminar
    M->>S: Upload Naskah Perbaikan Pasca Seminar
    D->>S: Approve Lembar Pengesahan Revisi Sempro
```

---

### 2.5 Stage 4: Ujian Sidang Skripsi Final

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    actor G as Dosen Penguji
    participant S as Sistem SIPETA

    M->>S: Ajukan ACC Ujian Sidang Skripsi
    D->>S: Klik "ACC Ujian Sidang Skripsi"
    P->>S: Penjadwalan Ujian Sidang di Aula Utama FIK
    
    note over M,G: Pelaksanaan Ujian Sidang Skripsi Komprehensif
    G->>S: Input Nilai Sidang & Transkrip Evaluasi
    M->>S: Upload Naskah Final Hardcover & Bukti Bebas Revisi
    D->>S: Approve Bebas Revisi Pembimbing & Penguji
    S-->>M: Rangkaian Perjalanan Tugas Akhir Selesai!
```
