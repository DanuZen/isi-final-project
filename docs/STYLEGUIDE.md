# Styleguide — SIMTA-Next Design System

## 0. Arah Desain

Ini aplikasi administrasi akademik, bukan landing page marketing. Prioritas: **kejelasan status, kepercayaan, dan kecepatan baca data** — dipakai berulang setiap hari oleh 6 role berbeda, banyak yang membuka lewat HP di sela kelas/rapat.

Signature element aplikasi ini: **Stepper Perjalanan TA** — visual horizontal (atau vertikal di mobile) yang selalu menunjukkan posisi mahasiswa di 6 tahap: `Clearing Nilai → Usulan Judul → Bimbingan → ACC Seminar → ACC Ujian → Tamat`. Ini elemen yang paling sering dilihat semua role (mahasiswa lihat progress sendiri, dosen lihat progress tiap bimbingannya, admin/pimpinan lihat agregatnya) — jadi ini yang dipoles paling detail, elemen lain dibuat tenang di sekitarnya.

Dihindari secara sadar: kombinasi cream + terracotta (#D97757) yang jadi ciri khas UI AI generik, dan tema hitam-neon. Dipilih palet institusional yang terasa "kampus negeri yang serius tapi modern", bukan startup.

---

## 1. Warna

| Token | Hex | Pemakaian |
|---|---|---|
| `primary-900` | `#1A1A1A` | Sidebar background, teks utama pada elemen terang |
| `primary-700` | `#D32F2F` | Header aksen/border, tombol primary hover |
| `primary-500` | `#FF5722` | Header topbar, tombol primary, link aktif, ikon aktif |
| `primary-100` | `#FBE9E7` | Background hover ringan, badge info |
| `accent-500` | `#FFC107` | Aksen "pencapaian akademik" — highlight stepper aktif, badge penting, tombol CTA sekunder |
| `accent-100` | `#FFF8E1` | Background badge accent |
| `success-500` | `#2F8F5B` | Status disetujui/lulus/ACC |
| `success-100` | `#E3F3EA` | Background badge sukses |
| `warning-500` | `#C77B1E` | Status revisi/perbaikan/menunggu approval |
| `warning-100` | `#FBEEDD` | Background badge warning |
| `danger-500` | `#C6403C` | Status ditolak/error/perlu tindakan kritis |
| `danger-100` | `#FBE7E6` | Background badge danger |
| `neutral-900` | `#212121` | Teks utama |
| `neutral-600` | `#616161` | Teks sekunder, label |
| `neutral-300` | `#E0E0E0` | Border, divider |
| `neutral-100` | `#FAFAFA` | Background halaman |
| `white` | `#FFFFFF` | Card, surface, teks pada header/topbar |

**Prinsip:** warna status (success/warning/danger) **hanya** dipakai untuk badge/indikator status TA — tidak untuk dekorasi. `accent-500` (emas/amber) dipakai hemat, khusus elemen yang menandai pencapaian/progress supaya terasa spesial saat dipakai.

---

## 2. Tipografi

| Peran | Font | Alasan |
|---|---|---|
| **Display/Heading** | `Sora` (600/700) | Geometris, tegas, terasa institusional-modern tanpa kaku seperti Times/serif tradisional kampus |
| **Body/UI** | `Inter` (400/500) | Keterbacaan tinggi di ukuran kecil, standar untuk UI padat data |
| **Data/Mono** | `IBM Plex Mono` (400/500) | Khusus NIM, tanggal, kode dokumen, angka statistik — supaya angka mudah di-scan dan tidak "menyatu" dengan teks naratif |

### Skala Tipe

| Nama | Ukuran / Line-height | Pemakaian |
|---|---|---|
| `display-lg` | 32px / 40px, Sora 700 | Judul halaman utama (jarang dipakai) |
| `heading-lg` | 24px / 32px, Sora 600 | Judul section (mis. "Bimbingan Tugas Akhir") |
| `heading-md` | 18px / 26px, Sora 600 | Judul card |
| `body-md` | 15px / 22px, Inter 400 | Teks umum |
| `body-sm` | 13px / 20px, Inter 400 | Caption, metadata |
| `data-md` | 14px / 20px, Plex Mono 500 | NIM, tanggal, angka |
| `label` | 12px / 16px, Inter 600, uppercase, tracking 0.04em | Label field, eyebrow |

---

## 3. Spacing & Layout

- Skala spacing: `4, 8, 12, 16, 24, 32, 48, 64` (px) — dipakai konsisten untuk padding/margin/gap
- Grid konten utama: max-width `1280px`, padding horizontal `24px` (mobile) / `32px` (desktop)
- Sidebar: fixed `260px` (desktop), collapse jadi bottom-nav/drawer di mobile (<768px)
- Card: border-radius `12px`, border `1px solid neutral-300`, shadow tipis (`0 1px 3px rgba(15,42,63,0.08)`)
- Breakpoints: `mobile <768px`, `tablet 768–1023px`, `desktop ≥1024px`

---

## 4. Komponen Kunci

### 4.1 Stepper Perjalanan TA (signature element)
- Horizontal di desktop, vertikal-compact di mobile
- 6 Node Utama: `Clearing Nilai` → `Usulan Judul` → `Bimbingan` → `ACC Seminar` → `ACC Ujian` → `Tamat`
- Tiap node: lingkaran ikon + label tahap + tanggal/waktu kelulusan tahap
- State: `selesai` (isi `success-500`, checkmark), `aktif` (isi `accent-500`, pulsing ring halus), `terkunci` (outline `neutral-300`, ikon gembok, label abu-abu)
- Klik node yang sudah lewat → buka riwayat/detail tahap itu (bukan dead-end)

### 4.2 Status Badge
- Pill kecil, radius penuh, padding `4px 10px`, `label` typography
- Warna sesuai token status (`Disetujui/Lulus/ACC` = success, `Menunggu ACC/Revisi` = warning, `Ditolak/Dibatalkan` = danger, `Pengajuan Perubahan Judul` = info-primary)
- Selalu disertai teks, tidak hanya warna (aksesibilitas)

### 4.3 Empty State
- Tidak lagi sekadar teks "Belum Ada Data" polos
- Pola: ikon garis besar + judul singkat + 1 kalimat penjelasan + CTA jika ada aksi yang bisa dilakukan
- Untuk state "terkunci" (mis. halaman Bimbingan sebelum pembimbing di-set): tampilkan mini-stepper yang menunjukkan syarat apa yang belum terpenuhi, dengan link langsung ke tahap itu — bukan cuma pesan teks

### 4.4 Tabel Data (mis. List Judul TA)
- Header sticky saat scroll
- Search + filter multi-kolom (prodi, tahun, status, pembimbing) di atas tabel
- Pagination server-side, indikator jumlah total data
- Baris punya hover state halus (`neutral-100`)

### 4.5 Kartu Log Bimbingan (chat-style)
- Bukan tabel — thread vertikal per sesi bimbingan
- Bubble kiri = catatan mahasiswa/upload, bubble kanan = feedback dosen
- Attachment preview thumbnail (bukan sekadar nama file)
- Timestamp pakai `data-md` style

### 4.6 Navigasi
- Sidebar dengan ikon + label, section aktif ditandai bar `accent-500` di kiri (bukan background block penuh — lebih tenang)
- Top bar: nama user, role badge, notifikasi (bell icon dengan dot indicator real-time), avatar dropdown

### 4.7 Tombol
- Primary: solid `primary-500`, teks putih, radius `8px`
- Secondary: outline `neutral-300`, teks `neutral-900`
- Destructive: solid `danger-500`, dipakai hemat (mis. tolak proposal)
- Semua tombol pakai active-voice label: "Ajukan Proposal", "Setujui", bukan "Submit"/"OK"

---

## 5. Prinsip Penulisan UI

- Sudut pandang pengguna: "Pembimbing Anda" bukan "User Pembimbing"
- Error jelas & actionable: "Nomor HP belum terverifikasi. Kirim kode verifikasi untuk melanjutkan." — bukan "Error 403"
- Nama aksi konsisten dari tombol → notifikasi → riwayat: tombol "Ajukan Sidang" → notifikasi "Pengajuan sidang terkirim" → log "Sidang diajukan"
- Sentence case untuk semua label UI, bukan Title Case atau UPPERCASE (kecuali `label` component yang memang uppercase by design untuk eyebrow)

---

## 6. Aksesibilitas & Kualitas Dasar

- Kontras teks minimal WCAG AA (4.5:1 body text)
- Semua elemen interaktif punya visible focus ring (`2px accent-500` offset 2px)
- Status tidak pernah hanya mengandalkan warna — selalu ada ikon/teks pendamping
- `prefers-reduced-motion` dihormati — animasi stepper/notifikasi jadi instan tanpa transisi jika diaktifkan
- Responsif penuh sampai 375px, sidebar → bottom nav 5 ikon utama di mobile
