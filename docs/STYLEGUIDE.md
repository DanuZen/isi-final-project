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

---

## 4. Mobile Responsiveness Guidelines (Fase 1D)

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
- Logo SIPETA kecil di tengah
- Notif bell + avatar di kanan
- Tidak menampilkan teks role/nama panjang

### 4.4 Bottom Navigation Bar (Mahasiswa)
- Fixed di bawah layar (`fixed bottom-0 left-0 right-0 z-40`)
- 5 tab ikon: 🏠 Dashboard | 📚 Bimbingan | 📅 Sidang | 🗓️ Kalender | 👤 Profil
- Active tab: icon + teks kecil berwarna `#C62828`
- Background: `bg-white border-t border-slate-200`

### 4.5 Grid Adaptasi Mobile
| Komponen | Desktop | Mobile |
|---|---|---|
| Stat Cards | 4-kolom | 2×2 grid |
| Main Layout | 12-kolom (8/4 split) | Stack vertikal (100% lebar) |
| Tabel Data | Full-width | Scroll horizontal (`overflow-x-auto`) |
| Banner Buttons | Row di kanan | Stack bawah banner |

### 4.6 Pola Khusus Mobile
- **Tabel → Card List:** Tabel mahasiswa bimbingan dikonversi menjadi card list vertikal di mobile
- **Filter → Bottom Sheet:** Filter bidang kajian di list-judul tampil sebagai drawer dari bawah
- **Kalender → List Agenda:** Mode default "Hari" di mobile, bukan grid bulan penuh
- **FAB (Floating Action Button):** Tombol aksi utama (catat log, aktivasi akun) sebagai FAB bulat di pojok kanan bawah

---

## 5. Portal Role Design Standards

Setiap portal role (Dosen, Admin Prodi, Admin Fakultas, Dekanat, Super Admin) **wajib** mengikuti standar berikut:

### 5.1 Badge Role Warna
| Role | Badge Color |
|---|---|
| Mahasiswa | `bg-emerald-600` |
| Dosen | `bg-[#C62828]` (merah) |
| Admin Prodi | `bg-blue-700` |
| Admin Fakultas | `bg-indigo-700` |
| Pimpinan / Dekanat | `bg-amber-600` |
| Super Admin | `bg-slate-800` |

### 5.2 Sidebar Nav per Role
- Setiap portal memiliki `NAV_ITEMS` array tersendiri (seperti `DOSEN_NAV_ITEMS` yang sudah ada)
- Sidebar menerima prop `roleName` (contoh: `"PORTAL PENGUJI"`) dan `items`
- Warna sidebar tetap `#1A1A1A` — unified design across all roles

### 5.3 Welcome Banner Standard
Semua portal menggunakan banner standar:
```
bg-[#1A1A1A] rounded-2xl border border-neutral-800 overflow-hidden shadow-sm
  → inner padding p-5 md:p-6
  → bottom accent: h-0.5 bg-gradient-to-r from-[#C62828] via-[#F59E0B] to-[#C62828]
  → badge: solid color per role (lihat 5.1)
  → h1: text-xl md:text-2xl font-black font-display text-white
```

