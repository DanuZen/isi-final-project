"use client";

import React from "react";
import { Check, Lock, FileText, BookOpen, FileCheck, GraduationCap } from "lucide-react";

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
  if (status === "selesai") return <Check className="w-3.5 h-3.5 text-white stroke-[3]" />;
  if (status === "terkunci") return <Lock className="w-3 h-3 text-slate-400" />;

  switch (key) {
    case "proposal":
      return <FileText className="w-3.5 h-3.5 text-white" />;
    case "bimbingan":
      return <BookOpen className="w-3.5 h-3.5 text-white" />;
    case "seminar":
      return <FileCheck className="w-3.5 h-3.5 text-white" />;
    case "ujian":
      return <GraduationCap className="w-3.5 h-3.5 text-white" />;
    default:
      return <BookOpen className="w-3.5 h-3.5 text-white" />;
  }
};

export const TaStepper: React.FC<TaStepperProps> = ({
  steps = DEFAULT_STEPS,
  onStepClick,
}) => {
  const activeStep = steps.find((s) => s.status === "aktif");
  const activeIndex = steps.findIndex((s) => s.status === "aktif");

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-3.5 sm:p-5 shadow-xs">
      
      {/* ── Desktop Header ── */}
      <div className="hidden md:block text-center mb-5">
        <h3 className="text-sm font-bold text-slate-900 font-display">
          Progres Perjalanan Tugas Akhir
        </h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Tahap Aktif:{" "}
          <strong className="text-[#C62828]">
            {activeStep ? activeStep.title : "Selesai"}
          </strong>
        </p>
      </div>

      {/* ── Mobile Header (Sleek Compact Bar for <768px) ── */}
      <div className="md:hidden flex items-center justify-between gap-2 mb-2.5">
        <h3 className="text-xs font-extrabold text-slate-900 font-display">
          Progres Tugas Akhir
        </h3>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#C62828] border border-rose-200 font-display shrink-0">
          Tahap {activeIndex + 1}/{steps.length}: {activeStep ? activeStep.title : "Selesai"}
        </span>
      </div>

      {/* ── Desktop Stepper (Horizontal 4-Column Flow) ── */}
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
                    ? "bg-[#C62828] text-white font-bold shadow-md ring-4 ring-rose-100 scale-105"
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
                      ? "text-[#C62828] font-display"
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

      {/* ── Mobile Stepper (Sleek Thin 4-Segment Progress Bar + Compact 2x2 Grid) ── */}
      <div className="md:hidden space-y-2.5">
        {/* Thin 4-Segment Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5">
          {steps.map((step, idx) => {
            const isCompleted = step.status === "selesai";
            const isActive = step.status === "aktif";

            return (
              <div
                key={step.id}
                className={`h-1.5 rounded-full transition-all ${
                  isCompleted
                    ? "bg-emerald-600"
                    : isActive
                    ? "bg-[#C62828]"
                    : "bg-slate-200"
                }`}
              />
            );
          })}
        </div>

        {/* Compact 2x2 Grid Pills */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          {steps.map((step) => {
            const isCompleted = step.status === "selesai";
            const isActive = step.status === "aktif";

            return (
              <div
                key={step.id}
                className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                  isCompleted
                    ? "bg-emerald-50/70 border-emerald-200 text-emerald-950"
                    : isActive
                    ? "bg-rose-50/70 border-rose-200 text-slate-900 shadow-2xs"
                    : "bg-slate-50/80 border-slate-200 text-slate-400"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted
                      ? "bg-emerald-600 text-white"
                      : isActive
                      ? "bg-[#C62828] text-white"
                      : "bg-slate-200 text-slate-400"
                  }`}
                >
                  {getStepIcon(step.key, step.status)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`text-[11px] font-bold truncate leading-tight font-display ${
                    isCompleted ? "text-emerald-900" : isActive ? "text-[#C62828]" : "text-slate-500"
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-[9.5px] text-slate-400 truncate leading-tight mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
