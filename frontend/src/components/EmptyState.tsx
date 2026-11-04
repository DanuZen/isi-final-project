"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`py-12 px-4 text-center my-auto flex-1 flex flex-col items-center justify-center space-y-3 font-display ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/80 text-[#2563eb] flex items-center justify-center shadow-2xs shrink-0">
        <Icon className="w-7 h-7 text-[#2563eb]" />
      </div>
      <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-tight">
        {title}
      </h4>
      {description && (
        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
