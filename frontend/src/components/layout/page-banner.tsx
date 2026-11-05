"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, type LucideIcon } from "lucide-react";

export interface BannerStatItem {
  icon?: LucideIcon;
  value: string | number;
  label: string;
}

export interface PageBannerProps {
  /** Teks pill putih di atas judul (contoh: "Panel Tugas Akhir Terintegrasi SIAK") */
  tag?: string;
  tagIcon?: LucideIcon;
  /** Elemen badge tambahan di samping tag (opsional) */
  badge?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Baris statistik ringkas di bawah deskripsi, dipisah garis tipis */
  stats?: BannerStatItem[];
  /** Tombol aksi — tampil di sisi kanan pada desktop */
  actions?: React.ReactNode;
  watermarkSrc?: string;
  className?: string;
}

/**
 * Head card standar setiap halaman (mengikuti design system PT MBOIS Learning Hub):
 * gradient royal blue, pill tag putih, watermark logo transparan, dan stats row opsional.
 */
export const PageBanner: React.FC<PageBannerProps> = ({
  tag,
  tagIcon: TagIcon,
  badge,
  title,
  description,
  stats,
  actions,
  watermarkSrc,
  className = "",
}) => {
  return (
    <div
      className={`bg-gradient-to-r from-[#1e3a8a] via-[#172554] to-[#0f172a] rounded-3xl p-5 md:py-5 md:px-7 text-white shadow-lg relative overflow-hidden shrink-0 font-display border border-blue-900/40 ${className}`}
    >
      {/* Large Transparent PT MBOIS Logo Watermark */}
      <div className="absolute -right-6 md:right-4 top-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 opacity-20 pointer-events-none select-none">
        <Image
          src={watermarkSrc || "/mbois_white.png"}
          alt=""
          fill
          sizes="(max-width: 768px) 192px, 256px"
          className="object-contain"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Content */}
        <div className="space-y-2.5 max-w-3xl min-w-0 flex-1">
          {(tag || badge) && (
            <div className="flex items-center gap-2 flex-wrap">
              {tag && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-blue-600 text-[11px] font-bold shadow-xs select-none">
                  {TagIcon ? (
                    <TagIcon className="w-3.5 h-3.5 text-blue-600" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>{tag}</span>
                </span>
              )}
              {badge}
            </div>
          )}

          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-xs">
            {title}
          </h1>

          {description && (
            <p className="text-xs md:text-sm text-blue-50 font-normal leading-relaxed max-w-2xl">
              {description}
            </p>
          )}

          {stats && stats.length > 0 && (
            <div className="pt-2 flex items-center flex-wrap gap-y-2">
              {stats.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <React.Fragment key={idx}>
                    {idx > 0 && <div className="w-px h-3.5 bg-white/25 mx-3 shrink-0" />}
                    <div className="flex items-center gap-2 text-white select-none">
                      {ItemIcon && <ItemIcon className="w-3.5 h-3.5 text-sky-200 shrink-0" />}
                      <span className="font-extrabold text-xs tracking-tight text-white">
                        {item.value}
                      </span>
                      <span className="text-[11px] font-normal text-blue-100/90 truncate">
                        {item.label}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        {/* Optional Actions (desktop) */}
        {actions && (
          <div className="hidden md:flex flex-wrap items-center gap-2.5 shrink-0 relative z-10">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

/** Kelas tombol aksi yang serasi dengan PageBanner */
export const bannerPrimaryBtn =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 transition-all active:scale-95 shadow-xs font-display cursor-pointer";
export const bannerSecondaryBtn =
  "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 font-display cursor-pointer";

