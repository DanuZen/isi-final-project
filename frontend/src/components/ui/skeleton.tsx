import React from "react";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`}
      {...props}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="flex flex-col h-screen overflow-hidden viewport-shell bg-[#FAFAFA]">
      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-[#1A1A1A] hidden md:flex flex-col justify-between p-5 shrink-0 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl bg-neutral-800" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24 bg-neutral-800" />
                <Skeleton className="h-3 w-16 bg-neutral-800" />
              </div>
            </div>
            <div className="space-y-2 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-xl bg-neutral-800/60" />
              ))}
            </div>
          </div>
          <Skeleton className="h-12 w-full rounded-xl bg-neutral-800/80" />
        </div>

        {/* Main Content Area Skeleton */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Header Skeleton */}
          <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <Skeleton className="h-5 w-48 bg-slate-200" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-xl bg-slate-200" />
              <Skeleton className="w-9 h-9 rounded-full bg-slate-200" />
            </div>
          </div>

          {/* Body Content Skeleton */}
          <main className="flex-1 p-5 md:p-6 space-y-5 overflow-hidden flex flex-col min-h-0">
            
            {/* Banner Skeleton */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 space-y-3 shrink-0">
              <Skeleton className="h-5 w-36 bg-neutral-800" />
              <Skeleton className="h-7 w-80 bg-neutral-800" />
              <Skeleton className="h-4 w-96 bg-neutral-800/70" />
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-20 bg-slate-200" />
                    <Skeleton className="w-8 h-8 rounded-xl bg-slate-200" />
                  </div>
                  <Skeleton className="h-7 w-16 bg-slate-200" />
                  <Skeleton className="h-3 w-28 bg-slate-200" />
                </div>
              ))}
            </div>

            {/* Content Table & Side Card Skeleton */}
            <div className="flex gap-4 flex-1 min-h-0">
              <div className="bg-white rounded-2xl border border-slate-200 p-5 flex-1 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <Skeleton className="h-5 w-40 bg-slate-200" />
                  <Skeleton className="h-8 w-48 rounded-xl bg-slate-200" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-100" />
                  ))}
                </div>
              </div>
              <div className="w-80 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 hidden lg:block">
                <Skeleton className="h-5 w-32 bg-slate-200" />
                <Skeleton className="h-20 w-full rounded-xl bg-slate-100" />
                <Skeleton className="h-28 w-full rounded-xl bg-slate-100" />
                <Skeleton className="h-10 w-full rounded-xl bg-slate-200" />
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
