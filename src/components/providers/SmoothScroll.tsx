// app/SmoothScrollProvider.tsx
"use client";
import { PropsWithChildren, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (lenisRef.current) return; // guard StrictMode double-mounts

    const lenis = new Lenis({
      lerp: 0.08, // lower = smoother/laggier, higher = snappier
      smoothWheel: true,
      syncTouch: true,
      wheelEventsTarget: window,
    });
    lenisRef.current = lenis;

    const raf = (t: number) => {
      lenis.raf(t);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return children as any;
}
