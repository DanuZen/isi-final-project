import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  dark?: boolean;
}

export function Skeleton({ className = "", dark = false, ...props }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer-container rounded-xl animate-pulse ${
        dark ? "bg-neutral-800/80 skeleton-shimmer-dark" : "bg-slate-200/80"
      } ${className}`}
      {...props}
    />
  );
}

export function PageSkeleton() {
  return (
    <div className="flex flex-col h-screen overflow-hidden viewport-shell bg-[#FAFAFA]">
      {/* Top Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-[#C62828] via-[#ffd01d] to-[#C62828] shrink-0 animate-pulse" />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-[#1A1A1A] hidden md:flex flex-col justify-between p-5 shrink-0 space-y-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Skeleton dark className="w-10 h-10 rounded-xl" />
              <div className="space-y-2 flex-1">
                <Skeleton dark className="h-4 w-24" />
                <Skeleton dark className="h-3 w-16" />
              </div>
            </div>
            <div className="space-y-2.5 pt-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton dark key={i} className="h-10 w-full rounded-xl opacity-80" />
              ))}
            </div>
          </div>
          <Skeleton dark className="h-12 w-full rounded-xl" />
        </div>

        {/* Main Content Area Skeleton */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          {/* Header Skeleton */}
          <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center gap-3">
              <Skeleton className="w-8 h-8 rounded-xl" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
          </div>

          {/* Body Content Skeleton */}
          <main className="flex-1 p-5 md:p-6 space-y-5 overflow-hidden flex flex-col min-h-0">
            
            {/* Banner Skeleton */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 space-y-3 shrink-0 relative overflow-hidden">
              <Skeleton dark className="h-5 w-36" />
              <Skeleton dark className="h-7 w-80" />
              <Skeleton dark className="h-4 w-96 opacity-70" />
            </div>

            {/* Stat Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-4.5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="w-8 h-8 rounded-xl" />
                  </div>
                  <Skeleton className="h-7 w-16" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>

            {/* Content Table & Side Card Skeleton */}
            <div className="flex gap-4 flex-1 min-h-0">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 flex-1 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-8 w-48 rounded-xl" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full rounded-xl bg-slate-100/90" />
                  ))}
                </div>
              </div>
              <div className="w-80 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 hidden lg:block">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-20 w-full rounded-xl bg-slate-100/90" />
                <Skeleton className="h-28 w-full rounded-xl bg-slate-100/90" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
