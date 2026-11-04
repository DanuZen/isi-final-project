"use client";

import React from "react";
import { Check, Lock, FileText, BookOpen, FileCheck, GraduationCap, Layers } from "lucide-react";

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
    title: "Judul Tugas Akhir",
    subtitle: "Review & Similarity",
    status: "aktif",
  },
  {
    id: 2,
    key: "bimbingan",
    title: "Bimbingan TA",
    subtitle: "Log Draft & Sesi",
    status: "terkunci",
  },
  {
    id: 3,
    key: "seminar",
    title: "Seminar Proposal",
    subtitle: "Jadwal & ACC",
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
  if (status === "selesai") return <Check className="w-4 h-4 text-white stroke-[3]" />;
  if (status === "terkunci") return <Lock className="w-3.5 h-3.5 text-slate-400" />;

  switch (key) {
    case "proposal":
      return <FileText className="w-4 h-4 text-white" />;
    case "bimbingan":
      return <BookOpen className="w-4 h-4 text-white" />;
    case "seminar":
      return <FileCheck className="w-4 h-4 text-white" />;
    case "ujian":
      return <GraduationCap className="w-4 h-4 text-white" />;
    default:
      return <BookOpen className="w-4 h-4 text-white" />;
  }
};

export const TaStepper: React.FC<TaStepperProps> = ({
  steps = DEFAULT_STEPS,
  onStepClick,
}) => {
  const activeStep = steps.find((s) => s.status === "aktif");

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Card Header matching standard layout */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="font-bold text-xs sm:text-sm text-slate-900 font-display">
            Progres Perjalanan Tugas Akhir
          </h2>
        </div>
        <span className="hidden sm:inline-block shrink-0 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#2563eb] text-white shadow-xs font-display">
          Tahap: {activeStep ? activeStep.title : "Selesai"}
        </span>
      </div>

      <div className="p-4 sm:p-5">
        {/* Desktop Stepper (Horizontal) */}
      <div className="hidden md:flex items-start justify-between relative py-2">
        {/* Connector Line Background */}
        <div className="absolute top-6 left-12 right-12 h-0.5 bg-slate-200 -z-0" />

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
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isCompleted
                    ? "bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-50"
                    : isActive
                    ? "bg-[#2563eb] text-white font-bold shadow-md ring-4 ring-blue-100 scale-105"
                    : "bg-slate-100 border border-slate-300 text-slate-400"
                }`}
              >
                {getStepIcon(step.key, step.status)}
              </div>

              {/* Title & Subtitle */}
              <div className="mt-2.5 px-1">
                <p
                  className={`text-xs font-bold leading-tight ${
                    isCompleted
                      ? "text-emerald-700 font-display"
                      : isActive
                      ? "text-[#2563eb] font-display"
                      : "text-slate-500 font-medium"
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight font-medium">
                  {step.subtitle}
                </p>
                {step.completedAt && (
                  <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block">
                    {step.completedAt}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        {steps.map((step) => {
          const isCompleted = step.status === "selesai";
          const isActive = step.status === "aktif";

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border flex items-center gap-3 ${
                isCompleted
                  ? "bg-emerald-50/60 border-emerald-200 text-slate-900"
                  : isActive
                  ? "bg-blue-50/60 border-blue-200 text-slate-900"
                  : "bg-slate-50 border-slate-200 text-slate-500"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted
                    ? "bg-emerald-600 text-white"
                    : isActive
                    ? "bg-[#2563eb] text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {getStepIcon(step.key, step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold truncate">{step.title}</p>
                  {isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-700">
                      {step.completedAt}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 truncate">{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
};
