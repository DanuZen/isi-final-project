# ISI Universal Design System & Front-End Architecture Guide
**Kode Dokumen:** `STYLEGUIDE-isi.md`  
**Cakupan:** Standar Desain Antarmuka, Sistem Token, & Arsitektur Frontend Lintas Proyek ISI  
**Stack Utama:** Next.js (App Router) + Tailwind CSS + Lucide Icons + TypeScript  
**Status:** Unified Production Standard  

---

## 1. Filosofi & Prinsip Utama Desain

Sistem desain **ISI Universal** dirancang untuk menghasilkan aplikasi web modern, berkecepatan tinggi, dan berestetika premium (*enterprise-grade*) yang konsisten pada seluruh ekosistem produk digital ISI.

### Tiga Pilar Arsitektur:
1. **Zero Interference Rule:** Modifikasi atau adaptasi tampilan smartphone (`< 768px`) **tidak boleh** mengorbankan atau merusak tampilan desktop (`≥ 1024px`). Semua penyesuaian wajib diisolasi menggunakan Tailwind breakpoint modifiers (`md:`, `lg:`).
2. **Dual-Layout Strategy:**
   - **Fit-Viewport Architecture (100dvh):** Digunakan pada halaman operasional, dashboard, tabel data, dan alur kerja cepat agar seluruh UI muat dalam 1 layar tanpa vertical page-scroll luar.
   - **Natural Page Scroll (`min-h-screen pb-16`):** Digunakan pada halaman analitik mendalam, laporan eksekutif, dan dokumentasi panjang.
3. **Flush Bottom Baseline Alignment:** Kontainer kolom kiri dan kanan pada layout multi-kolom wajib sejajar presisi di garis dasar bawah (*zero awkward empty space*).

---

## 2. Skema Warna & Token Desain (Blue & White Palette)

Sistem warna mengusung tema **Royal Blue, Sky Accent, & Clean White/Slate** yang modern dan profesional.

| Kategori Token | Hex Code | Tailwind Utility | Pemakaian |
|---|---|---|---|
| **Primary Signature** | `#2563eb` | `bg-blue-600`, `text-blue-600` | Warna utama identitas, tombol aksi primer, active link pill, border fokus |
| **Primary Deep** | `#1d4ed8` | `bg-blue-700`, `hover:bg-blue-700` | State hover tombol primer, gradient anchor header |
| **Bright Accent** | `#38bdf8` | `bg-sky-400`, `text-sky-400` | Garis aksen laser beam, badge highlight, sub-label aktif |
| **Dark Slate Hero** | `#0f172a` | `bg-slate-900`, `bg-[#0f172a]` | Latar belakang sidebar dark, kartu banner sambutan, header repositori |
| **Canvas Background** | `#f8fafc` | `bg-[#f8fafc]`, `bg-slate-50` | Background utama jendela halaman (canvas) |
| **Card Surface** | `#ffffff` | `bg-white` | Latar kartu konten, formulir input, modal popover |
| **Border & Divider** | `#e2e8f0` | `border-slate-200` | Garis pembatas kartu, container tabel, garis outline |
| **Muted Text** | `#64748b` | `text-slate-500` | Label sekunder, keterangan timestamp, petunjuk input |
| **Heading Text** | `#0f172a` | `text-slate-900` | Judul halaman, angka metrik utama, label tebal |

### Status Badges (Semantic Solid Colors):
- **Success / ACC / Lulus:** `bg-emerald-600 text-white font-bold`
- **Warning / Review / Pending:** `bg-amber-500 text-slate-950 font-bold`
- **Danger / Ditolak / Overdue:** `bg-rose-600 text-white font-bold`
- **Info / Tahap Aktif:** `bg-blue-600 text-white font-bold`

---

## 3. Tipografi (Typography Hierarchy)

- **Font Family Standar:** **Plus Jakarta Sans** (`--font-plus-jakarta`, sans-serif) digunakan untuk seluruh heading, body text, label, maupun angka data.
- **Skala Ukuran Standar:**
  - `text-2xl` / `text-3xl` (font-black): Angka ringkasan statistik (KPI cards).
  - `text-xl` md:`text-2xl` (font-black): Judul utama banner hero.
  - `text-sm` / `text-base` (font-bold): Judul kartu modul, tab header.
  - `text-xs` (font-medium): Teks isi, baris tabel, deskripsi bantuan.
  - `text-[11px]` / `text-[10px]` (font-extrabold uppercase): Kategori badge, label input floating, shorthand sub-header.

---

## 4. Arsitektur Fit-Viewport Layout (100dvh)

Untuk halaman operasional harian, gunakan arsitektur 3-Layer Flex Container yang mengunci viewport pada ketinggian layar perangkat:

```tsx
<div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#f8fafc]">
  <div className="flex flex-1 min-h-0 overflow-hidden">
    {/* 1. Sidebar Navigasi Collapsible */}
    <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} items={NAV_ITEMS} />
    
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      {/* 2. Top Header Bar */}
      <Header className="shrink-0" onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      {/* 3. Main Body Container (Scroll Mandiri di Dalam) */}
      <main className="flex-1 p-4 md:p-6 space-y-4 overflow-hidden flex flex-col min-h-0">
        {/* Banner Hero, Stat Cards, & Konten Utama */}
      </main>
    </div>
  </div>
</div>
```

### Aturan Side Detail Panel (Tanpa Kolom AKSI yang Penuh Sesak):
Pada tabel data master / daftar dokumen:
1. **Hapus kolom AKSI** yang berjejer tombol di setiap baris tabel.
2. Buat kolom samping **Side Detail Panel Card (`w-80 shrink-0 hidden lg:flex flex-col justify-between`)**.
3. Saat pengguna mengklik baris data mana saja, panel samping langsung ter-update secara *live*.
4. Baris aktif ditandai highlight: `bg-blue-50/70 border-l-4 border-l-blue-600`.

---

## 5. Standar Formulir & Floating Notched Outline Input

Input data modern menggunakan pola label mengambang yang memotong garis border atas (*notched outline*), micro-interaction laser beam, dan tombol shortcut seragam.

### Struktur Komponen Input:
```tsx
<div className="relative group">
  <div className="relative rounded-2xl border-2 transition-all duration-300 bg-white border-slate-200 focus-within:border-blue-600 focus-within:shadow-lg focus-within:shadow-blue-500/10">
    
    {/* Floating Notched Label (Memotong Border Atas) */}
    <span className="absolute -top-2.5 left-10 bg-white px-1.5 text-[10px] font-extrabold tracking-wider uppercase transition-colors duration-200 text-slate-500 group-focus-within:text-blue-600 z-10 pointer-events-none">
      Label Input / Kredensial
    </span>

    {/* Input Content Container */}
    <div className="flex items-center px-4 py-3.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center mr-3 transition-colors bg-blue-50 text-blue-600 group-focus-within:bg-blue-600 group-focus-within:text-white">
        <Icon className="w-4 h-4" />
      </div>

      <input
        type="text"
        placeholder="Masukkan data..."
        className="w-full bg-transparent text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none"
      />

      {/* Indikator Validasi / Interaksi */}
      <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-2 shrink-0" />
    </div>

    {/* Animated Bottom Laser Beam Focus Indicator */}
    <div className="absolute -bottom-0.5 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />
  </div>
</div>
```

### Tombol Pintasan Peran (Quick Access Shortcuts):
- Seluruh tombol peran menggunakan skema **1 warna seragam** (`bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-sm`).
- Hindari warna yang berbeda-beda per peran agar UI tetap tenang dan konsisten.

---

## 6. Standar Responsif Mobile & Benchmark Perangkat

### 6.1 Breakpoints:
- **Mobile (< 768px):** Single-column vertical stack, drawer sidebar overlay, bottom navigation bar aktif.
- **Tablet (768px – 1024px):** 2-column grid, compact header, collapsible sidebar.
- **Desktop (≥ 1024px):** Multi-column full layout, side detail panel aktif, expanded sidebar 260px.

### 6.2 Mobile Bottom Navigation Bar:
- Fixed di dasar layar perangkat mobile (`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200`).
- Terdiri dari 4–5 tab inti aplikasi.
- Tab aktif: `text-blue-600 font-bold` + indikator ikon aktif.
- Berikan padding bawah pada kontainer halaman utama (`pb-20 md:pb-0`) agar konten tidak tertutup bar navigasi.

### 6.3 Transformasi Tabel ke Card List:
- Pada layar mobile (`< 768px`), sembunyikan tabel lebar (`hidden md:table`) dan gantikan dengan **Vertical Card List** (`block md:hidden`).
- Setiap baris data dirender sebagai kartu terisolasi dengan status badge di pojok kanan atas dan informasi penting diatur vertikal.

### 6.4 Standar Touch Target:
- Seluruh tombol interaktif, icon button, dan tab navigasi wajib memiliki ukuran sentuh minimal **44 × 44 px** untuk menjamin kenyamanan navigasi jari.

---

## 7. Komponen Standar Siap Pakai

### 7.1 Welcome Hero Command Center Banner
Banner sambutan gelap dengan aksen garis gradasi signature:
```tsx
<div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-sm shrink-0">
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 md:p-6 relative">
    <div className="space-y-1.5 flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-xs font-display">
          <Sparkles className="w-3.5 h-3.5" /> Portal Aktif
        </span>
      </div>
      <h1 className="text-xl md:text-2xl font-black font-display text-white tracking-wide leading-tight">
        Judul Halaman
      </h1>
      <p className="text-xs text-slate-400 leading-relaxed max-w-2xl font-medium">
        Penjelasan ringkas operasional dan alur kerja utama halaman ini.
      </p>
    </div>
    
    <div className="hidden md:flex items-center gap-2.5 shrink-0">
      {/* Tombol Aksi Primer / CTA */}
    </div>
  </div>
  
  {/* Bottom Accent Line */}
  <div className="h-0.5 bg-gradient-to-r from-blue-700 via-sky-400 to-blue-600" />
</div>
```

### 7.2 KPI & Stat Cards (2 Kolom Mobile, 4 Kolom Desktop)
```tsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 shrink-0">
  {stats.map((s) => (
    <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 flex items-center justify-between">
      <div className="space-y-1 min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-display">{s.label}</p>
        <p className="text-2xl sm:text-3xl font-black font-display text-slate-900">{s.value}</p>
        <p className="text-[10px] text-slate-400 font-medium truncate">{s.desc}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
        <s.icon className="w-5 h-5" />
      </div>
    </div>
  ))}
</div>
```

### 7.3 Empty State UI (`EmptyState.tsx`)
Ditampilkan saat data 0:
- Menggunakan ikon kontekstual berlatar soft blue (`bg-blue-50 text-blue-600 p-3 rounded-2xl`).
- Judul status ringkas dan teks penjelas penyebab.
- Tombol tindakan utama (CTA) untuk memicu aksi pembuatan data baru.

### 7.4 Skeleton Loading (`PageSkeleton.tsx`)
- Menggunakan animasi denyut halus (`animate-pulse bg-slate-200 rounded-2xl`).
- Struktur skeleton mencerminkan bentuk banner, 4 kartu statistik, dan container tabel utama untuk menghilangkan efek pergeseran tata letak (*layout shift*).

---

## 8. Panduan Integrasi Antar-Proyek ISI

Ketika menginisialisasi project baru di bawah standar ISI:
1. Pastikan file `globals.css` memuat konfigurasi CSS token, font `Plus Jakarta Sans`, dan utilitas `.scrollbar-none`.
2. Terapkan komponen dasar: `header.tsx`, `sidebar.tsx`, `EmptyState.tsx`, dan `PageSkeleton.tsx`.
3. Patuhi aturan palet warna biru-putih (`#2563eb`, `#38bdf8`, `#0f172a`, `#ffffff`, `#f8fafc`).
4. Pastikan form input mengadopsi format *notched outline* dengan micro-interaction bottom line.
