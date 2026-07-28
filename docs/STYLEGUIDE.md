# Styleguide — SIPETA UPI YPTK Padang Design System

## 0. Arah Desain & Identitas Visual

Aplikasi **SIPETA (Sistem Informasi Perjalanan & Evaluasi Tugas Akhir)** memadukan identitas resmi kampus **Fakultas Ilmu Komputer UPI YPTK Padang** dengan estetika UI modern berkelas tinggi.

- **Signature Element:** **Progress Perjalanan Tugas Akhir (4-Stage Stepper)** — visual horizontal yang memadukan 4 tahapan inti: `Usulan Judul & Similarity Check → Bimbingan TA → ACC & Jadwal Seminar → Ujian Sidang Skripsi`.
- **Identity Palette:** Deep Crimson Red (`#C62828`), Amber Gold (`#F59E0B`), Emerald Success (`#2F8F5B`), Dark Hero Charcoal (`#1A1A1A`), serta Clean Slate Background (`#FAFAFA`).
- **Typography Modern:** Font **Plus Jakarta Sans** untuk Display, Heading & Body text, dipadukan dengan **IBM Plex Mono / Font Mono** untuk NIM, kode dokumen, dan data statistik.

---

## 1. Skema Warna (Color Tokens)

| Token | Hex / Class | Pemakaian |
|---|---|---|
| `brand-red` | `#C62828` / `#990000` | Warna utama signature UPI YPTK, active link pill, tombol primary gradient |
| `brand-gold` | `#F59E0B` / `#FFC107` | Warna aksen akademik, highlight badge aktif, warning status, border aksen |
| `dark-hero` | `#1A1A1A` / `#252525` | Background sidebar, dark hero card banner, header repositori |
| `success-green` | `#2F8F5B` / `emerald-600` | Status disetujui, lulus, terverifikasi final |
| `bg-main` | `#FAFAFA` | Background halaman utama |
| `card-surface` | `#FFFFFF` | Card surface, panel widget, container form |
| `border-slate` | `#E0E0E0` / `slate-200` | Border tipis container & pembatas antar section |

---

## 2. Tipografi (Typography System)

| Peran | Font Family | Alasan & Usage |
|---|---|---|
| **Display / Headings** | `Plus Jakarta Sans` (Bold/Black) | Modern, tajam, profesional, keterbacaan tinggi di seluruh breakpoint. |
| **Body UI Text** | `Plus Jakarta Sans` (Medium/Semibold) | Teks narasi, instruksi, dan label interface. |
| **Data / Numbers** | `IBM Plex Mono` / `font-mono-data` | NIM, tanggal, kode dokumen, skor persen similarity, nilai SKS. |

---

## 3. Komponen Utama Interface

### 3.1 Sidebar Navigasi Collapsible
- **Centered Brand Header:** Emblem logo **UPI YPTK Padang** dan judul **SIPETA** diposisikan presisi di **tengah secara vertikal & horizontal**.
- **Active Menu Pill:** Aksen gradient merah signature (`from-[#C62828] to-[#990000]`) dengan shadow halus.
- **Collapsible Animation:** Mendukung animasi buka-tutup (*300ms transition*) dari tombol toggle di Header.

### 3.2 Header Bar dengan Toggle Sidebar
- **No Search Input:** Search bar statis dihapus dari Header agar tampilan tetap bersih.
- **Toggle Button `Sidebar Navigasi`:** Terletak di pojok kiri atas Header untuk membuka/menutup sidebar.
- **Top Accent Line:** Garis aksen merah & emas khas UPI YPTK (`from-[#C62828] via-[#F59E0B] to-[#C62828]`).

### 3.3 Progress Perjalanan TA (4-Stage Stepper)
- 4 Node Utama: `Usulan Judul` → `Bimbingan TA` → `Jadwal Seminar` → `Ujian Sidang`.
- Badges: `Tahap X dari 4` di pojok kanan atas.
- States: `selesai` (checkmark hijau), `aktif` (pulsing amber icon), `terkunci` (lock icon).

### 3.4 Kalender Interaktif TA & Sidang
- Control Switcher View: *Bulan / Minggu / Hari*.
- Event Badges: 🟠 *Bimbingan Rutin*, 🔵 *Seminar Proposal*, 🟢 *Ujian Sidang Skripsi*.
- Highlighting tanggal **"Hari Ini"** dengan badge merah signature.

### 3.5 Flush Bottom Baseline Alignment
- Semua halaman 2-kolom memuat container kanan-kiri yang secara presisi sejajar di garis bawah paling dasar (*Zero awkward empty space*).
