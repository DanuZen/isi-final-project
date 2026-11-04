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
  message = "PT MBOIS - Final Project",
  subMessage = "Platform Pembelajaran & Evaluasi Terintegrasi",
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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-[#070e1d] via-[#0b1b38] to-[#07132a] text-white transition-opacity duration-500 overflow-hidden ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Soft Ambient Glow Halo */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.45)_0%,transparent_70%)] animate-pulse-glow" />

      {/* Grid Mesh Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main Splash Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-sm mx-auto space-y-6">
        
        {/* Floating Logo with Blue Glow */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_20px_40px_rgba(29,78,216,0.7)] animate-float-slow">
          <Image
            src="/mbois_white.png"
            alt="Logo PT MBOIS"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Branding Typography */}
        <div className="space-y-1.5 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-wider text-white leading-none">
            PT MBOIS
          </h1>
          <p className="text-[10px] sm:text-[11px] font-bold text-blue-400 uppercase tracking-[0.25em] font-display">
            FINAL PROJECT
          </p>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-full space-y-2.5 pt-2">
          {/* Progress track */}
          <div className="w-48 sm:w-56 h-1.5 mx-auto bg-white/10 rounded-full overflow-hidden backdrop-blur-xs border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-white rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Messages */}
          <div className="space-y-0.5">
            <p className="text-xs font-semibold text-slate-200 font-display">
              {message}
            </p>
            <p className="text-[10.5px] text-blue-200/80 font-medium">
              {subMessage}
            </p>
          </div>
        </div>

      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 z-10 text-[10px] text-slate-400 font-display tracking-widest uppercase">
        PT MBOIS — FINAL PROJECT · 2026
      </div>
    </div>
  );
}
