# Panduan Integrasi Backend & Spesifikasi Kontrak API — PT MBOIS Final Project

**PT MBOIS - Final Project Platform**  
PT MBOIS (Seluruh Departemen & Divisi)  
*Versi Dokumen:* 1.0 (Panduan Kontrak API Production-Ready)  
*Tanggal:* 31 Juli 2026  

---

## 1. Ringkasan Eksekutif & Arsitektur Integration Layer

Dokumen ini disusun sebagai **spesifikasi kontrak API resmi (*API Contract & Integration Blueprint*)** untuk pengembang Backend dalam mengintegrasikan antarmuka frontend Next.js App Router Final Project dengan server API & Basis Data PostgreSQL.

### 🛠️ Teknologi & Standar Backend yang Direkomendasikan:
- **Framework Server:** Next.js Route Handlers (`src/app/api/...`) ATAU Node.js Express / NestJS.
- **ORM & Basis Data:** Prisma ORM + PostgreSQL (Skema lengkap mengacu pada [`docs/DATABASE.md`](file:///isi-final-project/docs/DATABASE.md)).
- **Protokol Autentikasi:** HTTP-Only Secure Cookie / Bearer JWT with Role-Based Access Control (RBAC).
- **Format Pertukaran Data:** JSON (UTF-8) dengan standar response yang seragam.

---

## 🔒 2. Standar Format Response JSON API

### 2.1 Success Response Standard
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Data bimbingan berhasil diperbarui",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45
  }
}
```

### 2.2 Error Response Standard
```json
{
  "success": false,
  "statusCode": 400,
  "error": {
    "code": "INVALID_INPUT",
    "message": "File draf naskah wajib berformat PDF dengan ukuran maksimal 5MB",
    "details": [
      { "field": "file", "issue": "File size exceeds 5MB limit" }
    ]
  }
}
```

---

## 🌐 3. Daftar Lengkap Endpoint API per-Modul & Role

### 3.1 Modul Autentikasi & Profil (`/api/v1/auth`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Public | Autentikasi NIM/NIDN/Username & Password. Mengembalikan Token & User Role. |
| `POST` | `/api/v1/auth/logout` | All Roles | Mengapus token sesi / menghapus HTTP-Only Cookie. |
| `GET` | `/api/v1/auth/me` | All Roles | Mengambil data profil pengguna yang sedang login & hak akses role-nya. |
| `PUT` | `/api/v1/auth/password` | All Roles | Mengubah kata sandi pengguna. |

---

### 3.2 Modul Portal Mahasiswa (`/api/v1/mahasiswa`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `POST` | `/api/v1/proposal/submit` | `MAHASISWA` | Mengirimkan draf usulan judul, abstrak, dan mengembalikan skor fuzzy similarity check. |
| `GET` | `/api/v1/pembimbing/list-dosen` | `MAHASISWA` | Mengambil daftar dosen pembimbing yang tersedia beserta sisa kuota bimbingan. |
| `POST` | `/api/v1/pembimbing/request` | `MAHASISWA` | Mengajukan Dosen Pembimbing I & II. |
| `GET` | `/api/v1/bimbingan/logs` | `MAHASISWA`, `DOSEN` | Mengambil riwayat thread log bimbingan rutin mahasiswa. |
| `POST` | `/api/v1/bimbingan/logs` | `MAHASISWA` | Menambahkan catatan log bimbingan baru & upload berkas draf PDF. |
| `GET` | `/api/v1/seminar/status` | `MAHASISWA` | Mengambil jadwal, ruangan, majelis penguji, dan status ACC Seminar Proposal. |
| `POST` | `/api/v1/seminar/revisi` | `MAHASISWA` | Mengunggah draf naskah perbaikan & lembar revisi hasil Seminar Proposal. |
| `GET` | `/api/v1/sidang/status` | `MAHASISWA` | Mengambil jadwal, ruangan, majelis penguji, dan nilai akhir Ujian Sidang Skripsi. |

---

### 3.3 Modul Portal Dosen Pembimbing & Penguji (`/api/v1/dosen` & `/api/v1/penguji`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `GET` | `/api/v1/dosen/pengajuan` | `DOSEN` | Mengambil daftar permohonan bimbingan masuk dari mahasiswa. |
| `POST` | `/api/v1/dosen/pengajuan/respond` | `DOSEN` | Menyetujui (ACC) atau menolak permohonan pembimbing mahasiswa. |
| `POST` | `/api/v1/dosen/bimbingan/feedback` | `DOSEN` | Memberikan masukan catatan bimbingan & mengubah status feedback log. |
| `POST` | `/api/v1/dosen/acc-sempro` | `DOSEN` | Menyetujui (ACC) mahasiswa untuk maju Seminar Proposal (min. 5 sesi bimbingan). |
| `POST` | `/api/v1/dosen/acc-sidang` | `DOSEN` | Menyetujui (ACC) mahasiswa untuk maju Ujian Sidang Skripsi. |
| `GET` | `/api/v1/penguji/jadwal` | `DOSEN` | Mengambil daftar jadwal penugasan sebagai Majelis Dosen Penguji. |
| `POST` | `/api/v1/penguji/nilai` | `DOSEN` | Menginput bobot nilai weighted Seminar Proposal / Ujian Sidang Skripsi. |
| `POST` | `/api/v1/penguji/revisi/verify` | `DOSEN` | Memverifikasi dan menyetujui lembar perbaikan/revisi skripsi mahasiswa. |

---

### 3.4 Modul Portal Admin Program Studi (Prodi) (`/api/v1/admin-prodi`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `POST` | `/api/v1/admin-prodi/aktivasi` | `ADMIN_PRODI` | Memverifikasi clearing luring (110 SKS, IPK ≥ 2.00) & mengaktifkan akun Final Project mahasiswa. |
| `POST` | `/api/v1/admin-prodi/pembimbing/assign` | `ADMIN_PRODI` | Pengesahan penetapan Dosen Pembimbing I & II per-mahasiswa. |
| `POST` | `/api/v1/admin-prodi/jadwal/create` | `ADMIN_PRODI` | Menetapkan jadwal, ruangan, dan majelis Dosen Penguji Seminar Proposal/Sidang. |
| `GET` | `/api/v1/admin-prodi/repositori` | `ADMIN_PRODI` | Pengelolaan repositori judul & dokumen skripsi lulusan prodi. |

---

### 3.5 Modul Portal Admin Fakultas (`/api/v1/admin-fakultas`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `POST` | `/api/v1/admin-fakultas/sk/generate` | `ADMIN_FAKULTAS` | Menerbitkan Surat Keputusan (SK) Dekan per-Fakultas untuk Dosen Pembimbing & Penguji. |
| `GET` | `/api/v1/admin-fakultas/bebas` | `ADMIN_FAKULTAS` | Mengambil daftar pengajuan Bebas Fakultas (Bebas Perpus, Bebas Lab, Bebas SPP). |
| `POST` | `/api/v1/admin-fakultas/bebas/verify` | `ADMIN_FAKULTAS` | Memverifikasi & menyetujui kelengkapan 3-kriteria bebas fakultas mahasiswa. |

---

### 3.6 Modul Portal Dekanat & Super Admin (`/api/v1/dekanat` & `/api/v1/super-admin`)

| Method | Endpoint Path | Akses Role | Deskripsi Fungsi |
|---|---|---|---|
| `GET` | `/api/v1/dekanat/dashboard` | `PIMPINAN` | Mengambil statistik eksekutif aggregate per-fakultas & prodi. |
| `GET` | `/api/v1/dekanat/laporan/export` | `PIMPINAN` | Mengunduh rekapan data kelulusan & masa studi dalam format PDF/Excel. |
| `GET` | `/api/v1/super-admin/users` | `SUPERADMIN` | Pengelolaan akun pengguna multi-role seluruh kampus. |
| `GET` | `/api/v1/super-admin/audit` | `SUPERADMIN` | Menampilkan log audit aktivitas keamanan sistem bersignature HMAC SHA-256. |
| `POST` | `/api/v1/super-admin/master/prodi` | `SUPERADMIN` | Pengelolaan master data Fakultas, Prodi, dan Bidang Kajian Keahlian. |

---

## ⚡ 4. Panduan Eksekusi Integrasi Backend (Step-by-Step Setup)

### Langkah 1: Penyiapan Environment Variable (`.env`)
Buat berkas `.env` di folder utama backend:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/sipeta_db?schema=public"
JWT_SECRET="sipeta_upi_yptk_secret_key_2026_super_secure"
NEXT_PUBLIC_API_URL="http://localhost:3000/api/v1"
```

### Langkah 2: Migrasi Skema Basis Data (Prisma ORM)
Jalankan migrasi tabel PostgreSQL menggunakan Prisma CLI:
```bash
npx prisma migrate dev --name init_sipeta_multi_faculty
```

### Langkah 3: Seeding Master Data 6 Fakultas & 14 Prodi PT MBOIS
Eksekusi script seeder untuk memasukkan master data fakultas & prodi ([`academic.ts`](file:///@/constants/academic.ts)):
```bash
npx prisma db seed
```

### Langkah 4: Menghubungkan Frontend API Service Layer
Pada berkas helper API Frontend ([`frontend/src/services/api.ts`](file:///isi-final-project/frontend/src/services/api.ts)), hubungkan fungsi `fetch` ke `process.env.NEXT_PUBLIC_API_URL`.

---

## ✅ 5. Garansi Pencegahan Error Integrasi (Zero Integration Disruption)

Dengan mengikuti kontrak API ini:
1. **Tidak Ada Mismatch Tipe Data:** Seluruh tipe data JSON dijamin cocok dengan tipe TypeScript di Frontend.
2. **Keamanan RBAC Terjamin:** Middleware authorization backend menolak akses ilegal jika role pengguna tidak memiliki wewenang pada endpoint terkait.
3. **Penyimpanan Berkas Terstruktur:** File PDF draf naskah, SK Dekan, dan Lembar Revisi disimpan dengan struktur penamaan unik `[NIM]_[TIPO_DOKUMEN]_[TIMESTAMP].pdf`.
