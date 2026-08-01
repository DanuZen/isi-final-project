"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  isVisible?: boolean;
  message?: string;
  subMessage?: string;
  duration?: number;
  onFinish?: () => void;
}

export function SplashScreen({
  isVisible = true,
  message = "SIPETA UPI YPTK PADANG",
  subMessage = "Sistem Informasi Perjalanan & Evaluasi Tugas Akhir",
  duration = 1400,
  onFinish,
}: SplashScreenProps) {
  const [show, setShow] = useState(isVisible);
  const [fade, setFade] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setFade(true);
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }

    setShow(true);
    setFade(false);

    // Progress animation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        setFade(true);
        setTimeout(() => {
          setShow(false);
          if (onFinish) onFinish();
        }, 400);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isVisible, duration, onFinish]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#0B0F19] via-[#160A10] to-[#0A0508] text-white transition-opacity duration-500 overflow-hidden ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft Ambient Glow Halo */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(198,40,40,0.55)_0%,transparent_70%)] animate-pulse-glow" />

      {/* Grid Mesh Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Splash Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto space-y-6">
        
        {/* Floating 3D Emblem with Glow */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_20px_40px_rgba(198,40,40,0.7)] animate-float-slow">
          <Image
            src="/upiyptk_emblem.webp"
            alt="3D Emblem UPI YPTK"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Branding Typography */}
        <div className="space-y-1.5 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-wider text-white leading-none">
            SIPETA
          </h1>
          <p className="text-[10px] sm:text-[11px] font-bold text-[#C62828] uppercase tracking-[0.25em] font-display">
            UPI YPTK PADANG
          </p>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-full space-y-2.5 pt-2">
          {/* Progress track */}
          <div className="w-48 sm:w-56 h-1.5 mx-auto bg-white/10 rounded-full overflow-hidden backdrop-blur-xs border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-[#C62828] via-[#FF5722] to-[#ffd01d] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Messages */}
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-300 font-display">
              {message}
            </p>
            <p className="text-[10.5px] text-slate-400 font-medium">
              {subMessage}
            </p>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 z-10 text-[10px] text-slate-400 font-display tracking-widest uppercase">
        Fakultas Ilmu Komputer · 2026
      </div>
    </div>
  );
}
