# Workflow & Alur Kerja Detail — SIMTA-Next

Dokumen ini menjelaskan alur kerja (*end-to-end workflow*) dan diagram interaksi (*sequence & flowchart*) untuk setiap tahapan dalam **SIMTA-Next**.

---

## 1. Peta Alur Kerja Utama (Overview Flowchart)

```mermaid
flowchart TD
    A[Clearing Nilai SKS] -->|Lulus Clearing| B[Aktivasi Akun Mahasiswa]
    B --> C[Usulan Judul Proposal]
    C -->|Review Prodi| D{Disetujui?}
    D -->|Revisi/Tolak| C
    D -->|Disetujui| E[Pilih & Assign Pembimbing]
    E --> F[Log Bimbingan Berulang]
    F -->|Opsional: Pengajuan Perubahan Judul| G[Approval Perubahan Judul]
    G --> F
    F --> H[Pengajuan & ACC Seminar]
    H --> I[Pelaksanaan Seminar Proposal/Hasil]
    I --> J[Revisi Pasca Seminar]
    J -->|Disetujui Pembimbing| K[Bimbingan Lanjutan Draft Akhir]
    K --> L[Pengajuan & ACC Ujian Akhir]
    L --> M[Pelaksanaan Ujian Sidang Skripsi]
    M --> N[Revisi Pasca Ujian]
    N -->|Disetujui Pembimbing & Penguji| O[Verifikasi Bebas Revisi]
    O --> P[Status Tamat / Yudisium]
```

---

## 2. Alur Kerja Detail Per Tahap

### 2.1 Tahap 1: Clearing Nilai & Aktivasi Akun

Mahasiswa hanya bisa mendaftar atau mengaktifkan akun Tugas Akhir setelah verifikasi prasyarat akademik (SKS minimum & IPK).

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor P as Admin Prodi
    participant S as Sistem SIMTA
    
    M->>S: Input NIM & Pengajuan Clearing Nilai
    P->>S: Verifikasi Transkrip Nilai & Syarat SKS
    alt Nilai Belum Memenuhi
        P-->>S: Reject Clearing (Beri Catatan SKS/Mata Kuliah)
        S-->>M: Notifikasi Clearing Ditolak (Belum Cukup SKS)
    else Nilai Memenuhi (Clearing ACC)
        P-->>S: Approve Clearing Nilai
        S-->>M: Kirim Link Aktivasi & OTP WhatsApp
        M->>S: Verifikasi OTP WA & Set Password Akun
        S-->>M: Status Akun Aktif (Lanjut Tahap Usulan Judul)
    end
```

---

### 2.2 Tahap 2: Usulan Judul Proposal & Penetapan Pembimbing

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor P as Admin Prodi
    actor D as Dosen Pembimbing
    participant S as Sistem SIMTA

    M->>S: Form Usulan Judul (Judul, Abstrak, Bidang, Upload File)
    S->>S: Auto Check Fuzzy Match Kemiripan Judul
    S-->>M: Tampilkan Skor Kemiripan (%)
    M->>S: Confirm Submit Proposal
    P->>S: Review Kelayakan Proposal & Bidang
    alt Proposal Perlu Revisi
        P-->>S: Reject / Minta Revisi Proposal
        S-->>M: Notifikasi Revisi Proposal Judul
    else Proposal Disetujui
        P-->>S: Approve Proposal Judul
        M->>S: Pilih Dosen Pembimbing (sesuai kuota & bidang)
        P->>S: Konfirmasi Assign Dosen Pembimbing
        S-->>D: Notifikasi Mahasiswa Bimbingan Baru
    end
```

---

### 2.3 Tahap 3: Log Bimbingan & Pengajuan Perubahan Judul

Selama masa bimbingan, mahasiswa melakukan pencatatan log secara berkala. Jika dalam prosesnya diperlukan penyesuaian judul yang signifikan, fitur pengajuan perubahan judul dapat digunakan.

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    participant S as Sistem SIMTA

    loop Sesi Bimbingan Rutin
        M->>S: Upload Progress / Draft Naskah & Catatan
        D->>S: Beri Feedback / Anotasi Catatan Bimbingan
        S-->>M: Notifikasi Feedback Bimbingan
    end

    opt Pengajuan Perubahan Judul (Jika Diperlukan)
        M->>S: Form Pengajuan Perubahan Judul (Judul Baru & Alasan)
        D->>S: Review & Persetujuan Dosen Pembimbing
        P->>S: Konfirmasi Approval Perubahan Judul oleh Prodi
        S-->>M: Judul Resmi Ter-update di Sistem
    end
```

---

### 2.4 Tahap 4: ACC Seminar, Pelaksanaan, & Revisi Pasca-Seminar

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    actor G as Dosen Penguji
    participant S as Sistem SIMTA

    M->>S: Ajukan Permohonan ACC Seminar Proposal/Hasil
    D->>S: Verifikasi Kelayakan & Klik "ACC Seminar"
    P->>S: Jadwalkan Tanggal, Waktu, Ruang & Assign Penguji
    S-->>M: Notifikasi Jadwal Seminar & Ruangan
    S-->>G: Notifikasi Tugas Menguji Seminar

    note over M,G: Pelaksanaan Seminar Proposal / Hasil
    G->>S: Input Nilai & Catatan Revisi Seminar
    M->>S: Unggah Berkas Naskah Perbaikan & Lembar Pengesahan
    D->>S: Verifikasi & Approve Revisi Seminar
    S-->>M: Status Tahap Seminar Selesai
```

---

### 2.5 Tahap 5: ACC Ujian Akhir, Ujian Sidang, & Revisi Pasca-Ujian

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor D as Dosen Pembimbing
    actor P as Admin Prodi
    actor G as Dosen Penguji
    participant S as Sistem SIMTA

    M->>S: Ajukan Permohonan ACC Ujian Sidang Skripsi
    S->>S: Auto Checklist Syarat (Min. Bimbingan & Lulus Seminar)
    D->>S: Klik "ACC Ujian Akhir"
    P->>S: Jadwalkan Ujian Sidang & Penguji Akhir
    
    note over M,G: Pelaksanaan Ujian Sidang Akhir Skripsi
    G->>S: Input Nilai Sidang Akhir & Catatan Perbaikan
    M->>S: Upload Naskah Final & Lembar Bebas Revisi
    D->>S: Approve Bebas Revisi Pembimbing
    G->>S: Approve Bebas Revisi Penguji
    S-->>M: Status Sidang Akhir Selesai & Bebas Revisi
```

---

### 2.6 Tahap 6: Verifikasi Akhir & Status Tamat (Yudisium)

```mermaid
sequenceDiagram
    autonumber
    actor M as Mahasiswa
    actor P as Admin Prodi
    participant S as Sistem SIMTA

    M->>S: Unggah Dokumen Kelengkapan Wisuda / Hardbound
    P->>S: Verifikasi Kelengkapan Berkas Bebas Pustaka & Revisi
    P->>S: Set Status Mahasiswa "TAMAT / YUDISIUM"
    S-->>M: Notifikasi Selamat & Unduh Lembar Pengesahan Kelulusan
```

---

## 3. Matriks Penguncian Akses (State Lock Rules)

Untuk mencegah lompatan alur kerja, setiap modul mengunci aksi tertentu berdasarkan status aktif mahasiswa:

| Status Aktif Mahasiswa | Aksi Terbuka (*Enabled*) | Aksi Terkunci (*Disabled*) |
|---|---|---|
| **Belum Clearing** | Pengajuan clearing nilai SKS | Usulan judul, pilih pembimbing, bimbingan, sidang |
| **Clearing ACC** | Usulan judul proposal | Bimbingan, ACC Seminar, ACC Ujian |
| **Usulan Judul (Review)** | Lihat status proposal | Edit judul (kecuali minta revisi), bimbingan |
| **Bimbingan Aktif** | Log bimbingan, Pengajuan Perubahan Judul | Pengajuan Ujian Akhir (sebelum ACC Seminar) |
| **ACC Seminar** | Lihat jadwal seminar, upload naskah seminar | Pengajuan Ujian Sidang Akhir |
| **Revisi Seminar** | Upload perbaikan naskah seminar | ACC Ujian Akhir (sebelum revisi di-approve) |
| **ACC Ujian Akhir** | Lihat jadwal sidang, upload berkas sidang | Upload berkas wisuda / yudisium |
| **Revisi Ujian Akhir** | Upload naskah final & bukti bebas revisi | Pengubahan data TA |
| **Tamat / Yudisium** | Download lembar pengesahan & sertifikat | Semua form input (Read-only) |
