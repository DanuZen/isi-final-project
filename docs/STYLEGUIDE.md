# Styleguide — PT MBOIS Final Project Design System

## 0. Arah Desain & Identitas Visual

Aplikasi **PT MBOIS - Final Project** memadukan identitas resmi perusahaan **PT MBOIS** dengan estetika UI modern berkelas tinggi.

- **Signature Element:** **Progress Perjalanan Proyek Akhir (4-Stage Stepper)** — visual horizontal yang memadukan 4 tahapan inti: `Usulan Judul & Review → Bimbingan Project → ACC & Jadwal Seminar → Sidang Akhir / Evaluasi`.
- **Identity Palette:** Royal Blue (`#2563eb`), Deep Blue (`#1d4ed8`), Sky Accent (`#38bdf8`), Emerald Success (`#10b981`), Dark Slate (`#0f172a`), Clean White (`#ffffff`), serta Clean Slate Background (`#f8fafc`).
- **Typography Modern:** Font **Plus Jakarta Sans** untuk Display, Heading, Body text, kode dokumen, dan data statistik.

---

## 1. Skema Warna (Color Tokens)

| Token | Hex / Class | Pemakaian |
|---|---|---|
| `brand-blue` | `#2563eb` / `#1d4ed8` | Warna utama signature PT MBOIS, active link pill, tombol primary gradient |
| `brand-accent` | `#38bdf8` / `#3b82f6` | Warna aksen, highlight badge aktif, indikator fokus, gradient accent |
| `dark-hero` | `#0f172a` / `#1e293b` | Background sidebar dark, hero card banner, header repositori |
| `success-green` | `#10b981` / `emerald-600` | Status disetujui, lulus, terverifikasi final |
| `bg-main` | `#f8fafc` | Background halaman utama |
| `card-surface` | `#ffffff` | Card surface, panel widget, container form |
| `border-slate` | `#e2e8f0` / `slate-200` | Border tipis container & pembatas antar section |

---

## 2. Tipografi (Typography System)

| Peran | Font Family | Alasan & Usage |
|---|---|---|
| **Display / Headings** | `Plus Jakarta Sans` (Bold/Black) | Modern, tajam, profesional, keterbacaan tinggi di seluruh breakpoint. |
| **Body UI Text** | `Plus Jakarta Sans` (Medium/Semibold) | Teks narasi, instruksi, dan label interface. |
| **Data / Numbers** | `Plus Jakarta Sans` / `font-mono-data` | NIM / ID, tanggal, kode dokumen, skor similarity, nilai evaluasi. |

---

## 3. Komponen Utama Interface

### 3.1 Sidebar Navigasi Collapsible
- **Centered Brand Header:** Logo resmi **PT MBOIS** (`/mbois_white.png`) dan label sub-header **FINAL PROJECT** diposisikan presisi di **tengah secara vertikal & horizontal**.
- **Active Menu Pill:** Aksen biru signature (`bg-blue-600 text-white shadow-md shadow-blue-900/30`) dengan kontras tajam.
- **Collapsible Animation:** Mendukung animasi buka-tutup (*300ms transition*) dari tombol toggle di Header.

### 3.2 Header Bar dengan Toggle Sidebar
- **Clean Navigation:** Header bar bebas clutter dengan status breadcrumb / greeting kontekstual.
- **Toggle Button `Sidebar Navigasi`:** Terletak di pojok kiri atas Header untuk membuka/menutup sidebar.
- **Top Accent Line:** Garis aksen biru & langit signature (`from-blue-700 via-sky-400 to-blue-600`).
- **Brand Identity:** Logo biru transparan (`/mbois_blue.png`) dengan tipografi `PT MBOIS` dan sub-label `FINAL PROJECT`.

### 3.3 Form Fields & Floating Notched Outline
- **Floating Notched Label:** Label input teks melayang di atas garis batas (*top border cut-out*) dengan latar belakang putih solid (`bg-white px-1.5 -top-2.5 left-10`).
- **Laser Beam Focus Effect:** Garis gradien animasi di bagian bawah input saat state aktif/terfokus.
- **Icon Prefix & Validation Indicator:** Ikon kategori di sebelah kiri dengan status centang validasi di sisi kanan.
- **Uniform Quick Access Shortcuts:** Seluruh tombol pintasan peran (Quick Access Role) menggunakan warna biru seragam `bg-blue-600` yang kohesif.

### 3.4 Progress Perjalanan Project (4-Stage Stepper)
- 4 Node Utama: `Usulan Judul` → `Bimbingan Project` → `Jadwal Seminar` → `Sidang Akhir`.
- Badges: `Tahap X dari 4` di pojok kanan atas.
- States: `selesai` (checkmark hijau), `aktif` (pulsing blue/sky icon), `terkunci` (lock icon).

### 3.5 Kalender Interaktif Project & Sidang
- Control Switcher View: *Bulan / Minggu / Hari*.
- Event Badges: 🔵 *Bimbingan Rutin*, 🔷 *Seminar Review*, 🟢 *Sidang Evaluasi Akhir*.
- Highlighting tanggal **"Hari Ini"** dengan badge biru signature.

### 3.6 Flush Bottom Baseline Alignment
- Semua halaman 2-kolom memuat container kanan-kiri yang secara presisi sejajar di garis bawah paling dasar (*Zero awkward empty space*).

---

## 4. Mobile Responsiveness Guidelines

### 4.1 Breakpoints
| Breakpoint | Lebar | Perilaku |
|---|---|---|
| **Mobile** | < 768px (`md:`) | Sidebar tersembunyi, layout stack vertikal, bottom nav bar |
| **Tablet** | 768–1024px | Sidebar collapsible minimal, grid 2-kolom |
| **Desktop** | ≥ 1024px (`lg:`) | Layout penuh, sidebar expanded 260px |

### 4.2 Sidebar Mobile
- Tampil sebagai **Overlay Drawer** dari kiri (`fixed inset-0 z-50`)
- Backdrop hitam semi-transparan (`bg-black/50`) saat drawer terbuka
- Ditutup via tombol `✕` atau klik backdrop
- **Bukan** collapsible column seperti di desktop

### 4.3 Header Mobile
- Hamburger icon (`Menu` lucide) di pojok kiri — membuka drawer sidebar
- Logo PT MBOIS kecil di tengah
- Notif bell + avatar di kanan
- Tidak menampilkan teks role/nama panjang

### 4.4 Bottom Navigation Bar (Mahasiswa / Peserta)
- Fixed di bawah layar (`fixed bottom-0 left-0 right-0 z-40`)
- 5 tab ikon: 🏠 Dashboard | 📚 Bimbingan | 📅 Sidang | 🗓️ Kalender | 👤 Profil
- Active tab: icon + teks kecil berwarna `#2563eb` (`text-blue-600`)
- Background: `bg-white border-t border-slate-200`

### 4.5 Grid Adaptasi Mobile
| Komponen | Desktop | Mobile |
|---|---|---|
| Stat Cards | 4-kolom | 2×2 grid |
| Main Layout | 12-kolom (8/4 split) | Stack vertikal (100% lebar) |
| Tabel Data | Full-width | Scroll horizontal (`overflow-x-auto`) |
| Banner Buttons | Row di kanan | Stack bawah banner |

---

## 5. Portal Role Design Standards

Setiap portal role (Peserta/Mahasiswa, Mentor/Dosen, Reviewer/Penguji, Admin Prodi, Admin Fakultas, Dekanat/Pimpinan, Super Admin) **wajib** mengikuti standar berikut:

### 5.1 Badge Role Warna
| Role | Badge Color |
|---|---|
| Mahasiswa / Peserta | `bg-emerald-600` |
| Dosen / Mentor | `bg-blue-700` |
| Penguji / Reviewer | `bg-indigo-700` |
| Admin Prodi | `bg-sky-700` |
| Admin Fakultas | `bg-blue-900` |
| Pimpinan / Dekanat | `bg-amber-600` |
| Super Admin | `bg-slate-900` |

### 5.2 Sidebar Nav per Role
- Setiap portal memiliki `NAV_ITEMS` array tersendiri
- Sidebar menerima prop `roleName` dan `items`
- Warna sidebar tetap `#0f172a` — unified clean dark tone across all roles

### 5.3 Welcome Banner Standard
Semua portal menggunakan banner standar:
```
bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-sm
  → inner padding p-5 md:p-6
  → bottom accent: h-0.5 bg-gradient-to-r from-blue-700 via-sky-400 to-blue-600
  → badge: solid color per role (lihat 5.1)
  → h1: text-xl md:text-2xl font-black font-display text-white
```
