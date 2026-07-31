"use client";

/**
 * ViewportFitGrid
 * ----------------
 * - Non-mobile (>=768px): grid auto-fit kolom dulu, lalu scale-down jika overflow agar 1 Layar penuh (Fit Viewport).
 * - Mobile (<768px): scale nonaktif, grid 1 kolom, scroll normal.
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const MOBILE_BREAKPOINT_PX = 768;

interface ViewportFitGridProps {
  children: ReactNode;
  minCardWidth?: number;
  minScale?: number;
  gap?: number;
  className?: string;
}

export function ViewportFitGrid({
  children,
  minCardWidth = 240,
  minScale = 0.6,
  gap = 16,
  className = "",
}: ViewportFitGridProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const recalculate = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const mobile = window.innerWidth < MOBILE_BREAKPOINT_PX;
    setIsMobile(mobile);

    if (mobile) {
      setScale(1);
      return;
    }

    const availableWidth = outer.clientWidth;
    const availableHeight = outer.clientHeight;
    const contentWidth = inner.scrollWidth;
    const contentHeight = inner.scrollHeight;

    if (contentWidth === 0 || contentHeight === 0) return;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;
    const nextScale = Math.min(1, scaleX, scaleY);

    setScale(Math.max(minScale, nextScale));
  }, [minScale]);

  useEffect(() => {
    requestAnimationFrame(recalculate);

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(recalculate);
    });
    ro.observe(outer);
    ro.observe(inner);

    window.addEventListener("resize", recalculate);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalculate);
    };
  }, [recalculate]);

  return (
    <div
      ref={outerRef}
      style={
        isMobile
          ? { overflow: "visible", height: "auto", width: "100%" }
          : { overflow: "hidden", height: "100%", width: "100%", position: "relative" }
      }
    >
      <div
        ref={innerRef}
        className={className}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`,
          gap: `${gap}px`,
          transform: isMobile ? "none" : `scale(${scale})`,
          transformOrigin: "top center",
          width: isMobile ? "100%" : `${100 / scale}%`,
          transition: "transform 120ms ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
