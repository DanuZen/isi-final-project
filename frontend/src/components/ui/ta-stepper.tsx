"use client";

import React from "react";
import { Check, Lock, FileCheck, FileText, BookOpen, GraduationCap, Award, ShieldCheck } from "lucide-react";

export interface StepItem {
  id: number;
  key: string;
  title: string;
  subtitle: string;
  status: "selesai" | "aktif" | "terkunci";
  completedAt?: string;
}

interface TaStepperProps {
  currentStepKey?: string;
  steps?: StepItem[];
  onStepClick?: (step: StepItem) => void;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    id: 1,
    key: "proposal",
    title: "Usulan Judul",
    subtitle: "Review & Similarity Check",
    status: "selesai",
    completedAt: "28 Mar 2026",
  },
  {
    id: 2,
    key: "bimbingan",
    title: "Bimbingan TA",
    subtitle: "Log Draft & Consultation",
    status: "aktif",
  },
  {
    id: 3,
    key: "seminar",
    title: "Jadwal Seminar",
    subtitle: "Seminar Proposal",
    status: "terkunci",
  },
  {
    id: 4,
    key: "ujian",
    title: "Ujian Sidang",
    subtitle: "Sidang Skripsi Final",
    status: "terkunci",
  },
];

const getStepIcon = (key: string, status: StepItem["status"]) => {
  if (status === "selesai") return <Check className="w-5 h-5 text-white" />;
  if (status === "terkunci") return <Lock className="w-4 h-4 text-[#616161]" />;

  switch (key) {
    case "clearing":
      return <ShieldCheck className="w-5 h-5 text-[#1A1A1A]" />;
    case "proposal":
      return <FileText className="w-5 h-5 text-[#1A1A1A]" />;
    case "bimbingan":
      return <BookOpen className="w-5 h-5 text-[#1A1A1A]" />;
    case "seminar":
      return <FileCheck className="w-5 h-5 text-[#1A1A1A]" />;
    case "ujian":
      return <GraduationCap className="w-5 h-5 text-[#1A1A1A]" />;
    case "tamat":
      return <Award className="w-5 h-5 text-[#1A1A1A]" />;
    default:
      return <BookOpen className="w-5 h-5 text-[#1A1A1A]" />;
  }
};

export const TaStepper: React.FC<TaStepperProps> = ({
  steps = DEFAULT_STEPS,
  onStepClick,
}) => {
  return (
    <div className="w-full bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-[#1A1A1A] font-display">
            Progress Perjalanan Tugas Akhir
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Tahap saat ini: <span className="font-bold text-[#C62828]">2. Bimbingan TA</span>
          </p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
          Tahap 2 dari 4
        </span>
      </div>

      {/* Desktop Stepper (Horizontal) */}
      <div className="hidden lg:flex items-start justify-between relative py-2">
        {/* Connector Line Background */}
        <div className="absolute top-7 left-8 right-8 h-[3px] bg-[#E0E0E0] -z-0" />

        {steps.map((step) => {
          const isCompleted = step.status === "selesai";
          const isActive = step.status === "aktif";
          const isLocked = step.status === "terkunci";

          return (
            <div
              key={step.id}
              onClick={() => !isLocked && onStepClick?.(step)}
              className={`flex flex-col items-center text-center relative z-10 group ${
                isLocked ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                  isCompleted
                    ? "bg-[#2F8F5B] text-white shadow-xs ring-4 ring-[#E3F3EA]"
                    : isActive
                    ? "bg-[#FFC107] text-[#1A1A1A] font-bold shadow-md ring-4 ring-[#FFF8E1] animate-pulse"
                    : "bg-[#FAFAFA] border-2 border-[#E0E0E0] text-[#616161]"
                }`}
              >
                {getStepIcon(step.key, step.status)}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-3 px-1">
                <p
                  className={`text-xs font-semibold leading-tight ${
                    isCompleted
                      ? "text-[#2F8F5B]"
                      : isActive
                      ? "text-[#FF5722] font-bold"
                      : "text-[#616161]"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-[#616161] mt-0.5 leading-tight">
                  {step.subtitle}
                </p>
                {step.completedAt && (
                  <p className="text-[10px] font-mono-data text-[#2F8F5B] mt-1 bg-[#E3F3EA] px-1.5 py-0.5 rounded inline-block">
                    {step.completedAt}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper (Vertical Grid) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {steps.map((step) => {
          const isCompleted = step.status === "selesai";
          const isActive = step.status === "aktif";

          return (
            <div
              key={step.id}
              className={`p-3 rounded-lg border flex items-center gap-3 ${
                isCompleted
                  ? "bg-[#E3F3EA]/50 border-[#2F8F5B]/30 text-[#1A1A1A]"
                  : isActive
                  ? "bg-[#FFF8E1]/70 border-[#FFC107] text-[#1A1A1A]"
                  : "bg-[#FAFAFA] border-[#E0E0E0] text-[#616161]"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? "bg-[#2F8F5B] text-white"
                    : isActive
                    ? "bg-[#FFC107] text-[#1A1A1A]"
                    : "bg-[#E0E0E0] text-[#616161]"
                }`}
              >
                {getStepIcon(step.key, step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold truncate">{step.title}</p>
                  {isCompleted && (
                    <span className="text-[10px] font-mono-data text-[#2F8F5B]">
                      {step.completedAt}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#616161] truncate">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
