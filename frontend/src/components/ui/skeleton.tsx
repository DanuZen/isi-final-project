import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "blue" | "dark" | "pill";
  dark?: boolean;
}

/**
 * Universal Skeleton Loader with continuous shimmer wave.
 * Mendukung varian neutral light, nested card, royal blue (banner & sidebar), dan dark.
 */
export function Skeleton({
  className = "",
  variant = "default",
  dark = false,
  ...props
}: SkeletonProps) {
  const isDark = dark || variant === "dark";
  const isBlue = variant === "blue";
  const isCard = variant === "card";
  const isPill = variant === "pill";

  const variantClass = isBlue
    ? "bg-white/15 skeleton-shimmer-blue"
    : isDark
    ? "bg-slate-800/80 skeleton-shimmer-dark"
    : isCard
    ? "bg-slate-100/90 skeleton-shimmer-card"
    : isPill
    ? "bg-white/80"
    : "bg-slate-200/75";

  return (
    <div
      className={`skeleton-shimmer-container rounded-xl animate-pulse ${variantClass} ${className}`}
      {...props}
    />
  );
}

/**
 * Head Card (PageBanner) Skeleton Loader:
 * Mengikuti arsitektur PageBanner bertema Royal Blue gradient dengan watermark,
 * pill tag putih, judul besar, dan baris statistik terintegrasi.
 */
export function BannerSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gradient-to-r from-[#1e3a8a] via-[#172554] to-[#0f172a] rounded-3xl p-5 md:py-5 md:px-7 border border-blue-900/40 shadow-lg relative overflow-hidden shrink-0 space-y-3 font-display ${className}`}
    >
      {/* Top Pill Tag Skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton variant="pill" className="h-6 w-44 rounded-full shadow-xs" />
        <Skeleton variant="blue" className="h-5 w-28 rounded-full hidden sm:block" />
      </div>

      {/* Title & Description Skeletons */}
      <div className="space-y-2 max-w-2xl">
        <Skeleton variant="blue" className="h-7 w-72 md:w-96 rounded-xl" />
        <Skeleton variant="blue" className="h-3.5 w-full max-w-xl rounded-md opacity-80" />
      </div>

      {/* Integrated Stats Row Skeleton */}
      <div className="pt-2 flex items-center flex-wrap gap-y-2">
        <div className="flex items-center gap-2">
          <Skeleton variant="blue" className="w-3.5 h-3.5 rounded-full" />
          <Skeleton variant="blue" className="h-4 w-16 rounded" />
          <Skeleton variant="blue" className="h-3 w-20 rounded opacity-75" />
        </div>
        <div className="w-px h-3.5 bg-white/20 mx-3 shrink-0" />
        <div className="flex items-center gap-2">
          <Skeleton variant="blue" className="w-3.5 h-3.5 rounded-full" />
          <Skeleton variant="blue" className="h-4 w-16 rounded" />
          <Skeleton variant="blue" className="h-3 w-24 rounded opacity-75" />
        </div>
        <div className="w-px h-3.5 bg-white/20 mx-3 shrink-0 hidden sm:block" />
        <div className="hidden sm:flex items-center gap-2">
          <Skeleton variant="blue" className="w-3.5 h-3.5 rounded-full" />
          <Skeleton variant="blue" className="h-4 w-20 rounded" />
          <Skeleton variant="blue" className="h-3 w-20 rounded opacity-75" />
        </div>
      </div>
    </div>
  );
}

/**
 * Metric Card Skeleton (dengan pastel glow & squircle icon)
 */
export function StatCardSkeleton({
  theme = "blue",
}: {
  theme?: "blue" | "emerald" | "amber" | "purple";
}) {
  const blobColor = {
    blue: "bg-blue-100/60",
    emerald: "bg-emerald-100/60",
    amber: "bg-amber-100/60",
    purple: "bg-purple-100/60",
  }[theme];

  const squircleColor = {
    blue: "bg-blue-600/30",
    emerald: "bg-emerald-600/30",
    amber: "bg-amber-500/30",
    purple: "bg-purple-500/30",
  }[theme];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 relative overflow-hidden flex items-center gap-3.5">
      <div className={`absolute -right-3 -top-3 w-16 h-16 rounded-full ${blobColor} blur-xs pointer-events-none`} />
      <div className={`w-11 h-11 rounded-2xl ${squircleColor} flex items-center justify-center shrink-0 shadow-xs`}>
        <Skeleton variant="card" className="w-5 h-5 rounded-lg opacity-80" />
      </div>
      <div className="space-y-1.5 flex-1 min-w-0">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-3 w-24 rounded" />
      </div>
    </div>
  );
}

// Full Page Skeleton:
// Ditampilkan di seluruh loading route (app/loading.tsx).
// 100% konsisten dengan warna dan layout:
// - Sidebar Royal Blue gradient (#1e3a8a to #0f172a)
// - Header Pro Minimalist (#FAFAFA dengan pill search & circular buttons)
// - Head Card Royal Blue gradient PageBanner
// - 4 Stat Cards grid
// - Split content container
export function PageSkeleton() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden viewport-shell bg-[#FAFAFA] font-display text-slate-900">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* ── 1. Desktop Royal Blue Sidebar Skeleton ── */}
        <aside className="w-[72px] md:w-[264px] bg-gradient-to-b from-[#1e3a8a] via-[#172554] to-[#0f172a] border-r border-blue-900/40 p-3 pt-7 pb-4 hidden md:flex flex-col justify-between shrink-0 font-display transition-all duration-300">
          <div className="space-y-5">
            {/* Logo & Brand Center Header */}
            <div className="flex flex-col items-center justify-center text-center">
              <Skeleton variant="blue" className="w-14 h-14 rounded-2xl mb-2.5 shadow-md border border-white/10" />
              <Skeleton variant="blue" className="h-4 w-28 rounded-md mb-1" />
              <Skeleton variant="blue" className="h-2.5 w-20 rounded opacity-60" />
            </div>

            {/* Menu Section */}
            <div className="space-y-1.5 pt-2">
              <div className="px-3 pb-1">
                <Skeleton variant="blue" className="h-2.5 w-12 rounded opacity-50" />
              </div>

              {/* Active Menu Item with left indicator bar */}
              <div className="h-11 rounded-xl bg-blue-600/70 border border-blue-400/30 flex items-center justify-between px-3.5 relative overflow-hidden shadow-md shadow-blue-950/40">
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-r-full shadow-xs" />
                <div className="flex items-center gap-3.5 pl-1 min-w-0 flex-1">
                  <Skeleton variant="blue" className="w-5 h-5 rounded-lg shrink-0 bg-white/40" />
                  <Skeleton variant="blue" className="h-3.5 w-28 rounded bg-white/40" />
                </div>
              </div>

              {/* Inactive Nav Items */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-11 rounded-xl bg-white/5 hover:bg-white/10 flex items-center gap-3.5 px-3.5 transition-colors"
                >
                  <Skeleton variant="blue" className="w-5 h-5 rounded-lg shrink-0 opacity-70" />
                  <Skeleton variant="blue" className="h-3.5 flex-1 rounded opacity-70" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Logout Button Skeleton */}
          <div className="pt-2">
            <div className="h-11 rounded-xl bg-rose-600/35 border border-rose-500/25 flex items-center justify-center gap-2.5 px-4 shadow-sm">
              <Skeleton variant="blue" className="w-4 h-4 rounded-md bg-white/40" />
              <Skeleton variant="blue" className="h-3.5 w-14 rounded bg-white/40" />
            </div>
          </div>
        </aside>

        {/* ── 2. Main Content Area ── */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Header Skeleton (Pill search, circle icons, profile chip) */}
          <header className="shrink-0 px-4 md:px-6 py-3.5 flex items-center justify-between gap-3 md:gap-5 bg-[#FAFAFA] border-b border-slate-200/70 md:border-b-0">
            {/* Search Pill */}
            <div className="flex-1 max-w-xl">
              <div className="h-10 rounded-full bg-white border border-slate-200/90 shadow-2xs px-4 flex items-center gap-2.5">
                <Skeleton className="w-4 h-4 rounded-full opacity-60" />
                <Skeleton className="h-3.5 w-40 rounded" />
              </div>
            </div>

            {/* Right Buttons + Profile */}
            <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center">
                <Skeleton className="w-4 h-4 rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center justify-center relative">
                <Skeleton className="w-4 h-4 rounded-full" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-400" />
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />

              <div className="flex items-center gap-2.5 pl-1 py-1">
                <div className="w-9 h-9 rounded-full bg-blue-600/40 border-2 border-white shadow-2xs flex items-center justify-center">
                  <Skeleton variant="blue" className="w-4 h-3 rounded" />
                </div>
                <div className="hidden sm:flex flex-col gap-1 text-left">
                  <Skeleton className="h-3.5 w-20 rounded" />
                  <Skeleton className="h-2.5 w-14 rounded" />
                </div>
              </div>
            </div>
          </header>

          {/* Body Content Container */}
          <main className="flex-1 px-3.5 md:px-6 pb-3.5 md:pb-6 space-y-4 overflow-y-auto overflow-x-hidden scrollbar-none shell-body flex flex-col min-h-0">
            
            {/* ── A. Royal Blue Head Card (PageBanner) Skeleton ── */}
            <BannerSkeleton />

            {/* ── B. 4 Stat Cards Grid Skeleton ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4 shrink-0">
              <StatCardSkeleton theme="blue" />
              <StatCardSkeleton theme="emerald" />
              <StatCardSkeleton theme="amber" />
              <StatCardSkeleton theme="purple" />
            </div>

            {/* ── C. Content Split Skeleton (7/12 & 5/12) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0 items-stretch">
              
              {/* Left Column Card Skeleton */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 flex flex-col justify-between space-y-4 min-h-0">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Skeleton className="w-4 h-4 rounded-md" />
                    </div>
                    <Skeleton className="h-4 w-44 rounded-md" />
                  </div>
                  <Skeleton variant="pill" className="h-6 w-24 rounded-full" />
                </div>

                <div className="space-y-3 flex-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Skeleton className="w-9 h-9 rounded-xl bg-slate-200/70 shrink-0" />
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <Skeleton className="h-3.5 w-3/4 rounded" />
                          <Skeleton className="h-2.5 w-1/2 rounded" />
                        </div>
                      </div>
                      <Skeleton className="h-7 w-20 rounded-lg shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Card Skeleton */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 flex flex-col justify-between min-h-0">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <Skeleton className="h-4 w-32 rounded-md" />
                  <Skeleton className="h-4 w-12 rounded" />
                </div>

                <div className="space-y-3 flex-1">
                  <Skeleton variant="card" className="h-24 w-full rounded-2xl" />
                  <Skeleton variant="card" className="h-28 w-full rounded-2xl" />
                </div>

                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
