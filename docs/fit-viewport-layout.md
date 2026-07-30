# Fit-Viewport Layout & Flexible Scroll Architecture — SIPETA

> **Tujuan:** Halaman tidak bisa di-scroll secara global pada perangkat desktop (100dvh). Grid & Card di dalamnya menyesuaikan tata letak (CSS auto-fit / flex), dan elemen dengan konten panjang menggunakan **Scroll Internal Tanpa Scrollbar Kasar (`scrollbar-none`)** sehingga tidak ada card atau elemen yang terpotong. Mobile tetap di-scroll normal dengan hierarki visual yang baik.

---

## 📌 Kapan Dipakai

- Dashboard, Kanban, Galeri Card, Katalog Dosen, Tabel Repositori, & Kalender Interaktif
- Jumlah card/data **dinamis** (berubah saat runtime)
- Harus fit 1 layar di desktop/tablet (≥768px), mobile boleh scroll normal
- Menjaga header & sidebar tetap terikat di posisinya (fixed layout context)

---

## 🏗️ Struktur Layout 3-Layer Flex

Gunakan tiga lapis container standar pada seluruh halaman SIPETA:

```tsx
<div className="flex flex-col h-auto md:h-dvh md:overflow-hidden viewport-shell bg-[#FAFAFA]">
  <div className="flex flex-1 min-h-0 overflow-hidden">
    <Sidebar isOpen={isSidebarOpen} />
    
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
      <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} className="shell-header shrink-0" />
      
      <main className="flex-1 p-6 space-y-6 overflow-y-auto overflow-x-hidden scrollbar-none shell-body">
        {/* Banner Hero & Content Grid */}
      </main>
    </div>
  </div>
</div>
```

> ⚠️ `main.shell-body` **WAJIB** punya `min-height: 0` dan utilitas `scrollbar-none`. Tanpa ini, flex item tidak bisa overflow dan akan terjadi pemotongan (*clipping*) pada layar beresolusi rendah.

---

## 🎨 Utilitas Scrollbar Modern (`globals.css`)

Untuk memastikan scrolling terasa sehalus aplikasi desktop tanpa indikator *scrollbar* browser yang tebal:

```css
/* Utilitas Menyembunyikan Scrollbar (Clean Scroll) */
.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.scrollbar-none::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

/* Utilitas Scrollbar Tipis Modern */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E1 transparent;
}
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 9999px;
}
```

---

## 💡 Pendekatan Scroll Internal & Card Fleksibel

Jika isi *card* berupa tabel data panjang, katalog dosen, atau kalender:

### 1. Tabel Data Repositori (`/list-judul`)
Tabel dengan 10+ data dibungkus menggunakan internal scroll container agar header card & footer pagination tidak terpotong:
```tsx
<div className="overflow-x-auto overflow-y-auto max-h-[380px] scrollbar-none">
  <table className="w-full text-left text-xs">
    {/* Table rows scroll internal */}
  </table>
</div>
```

### 2. Tumpukan Sidebar Card (`/pembimbing`, `/kalender`)
Tumpukan card di kolom kanan (Form Usulan, Alur Approval, Helpdesk, Agenda Terdekat) dibungkus dengan scroll internal:
```tsx
<div className="lg:col-span-1 flex flex-col justify-between space-y-6 overflow-y-auto scrollbar-none">
  {/* Cards stack */}
</div>
```

### 3. Matriks Kalender (`/kalender`)
Matriks tanggal 5x7 menggunakan tinggi responsif fleksibel (`min-h-[75px] md:min-h-[82px]`) dan chip event dengan scroll internal:
```tsx
<div className="space-y-1 mt-1 overflow-y-auto max-h-[50px] scrollbar-none">
  {/* Event chips */}
</div>
```

---

## 🚀 Status Implementasi Halaman SIPETA

Seluruh 10 rute aplikasi telah 100% mematuhi standar Fit-Viewport Layout & Clean Scroll:

| Rute Halaman | Fit-Viewport Shell | Scroll Internal Card | Status Build |
|---|---|---|---|
| `/` (Dashboard Utama) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/proposal` (Usulan Judul) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/pembimbing` (Usulan Dosen) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/bimbingan` (Bimbingan TA) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/seminar` (Seminar Proposal) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/sidang` (Ujian Sidang) | ✅ Terpasang (`100dvh`) | ✅ Clean Scroll | ✅ Pass |
| `/list-judul` (Daftar Judul TA) | ✅ Terpasang (`100dvh`) | ✅ Scroll Tabel (`380px`) | ✅ Pass |
| `/kalender` (Kalender Akademik) | ✅ Terpasang (`100dvh`) | ✅ Grid & Chip Scroll | ✅ Pass |

---

## 📋 Checklist Verifikasi Desain

- [x] Resize dari 1920px → 768px: kolom grid menyesuaikan secara responsif tanpa overflow.
- [x] Tidak ada elemen atau card yang terpotong di layar 768px, 1024px, 1280px, 1440px, maupun 1920px.
- [x] Penggunaan `.scrollbar-none` menghilangkan garis scrollbar kasar browser.
- [x] `npm run build` sukses tanpa warning/error TypeScript.
