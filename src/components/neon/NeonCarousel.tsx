"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import s from "./Neon.module.css";

type Item = { id: string | number; title: string; body?: string };

type Props = {
  items: Item[];
  gap?: number; // px between cards
  pulse?: boolean; // neon pulse on active card
};

const REPEATS = 60; // long reel

export default function NeonCarousel({ items, gap = 24, pulse = true }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(0); // index in 0..items.length-1
  const [cardW, setCardW] = useState(320);
  const [vpW, setVpW] = useState(0);

  // mouse-drag state
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startLeftRef = useRef(0);
  const movedRef = useRef(false);

  const period = items.length;
  const startBlock = Math.floor(REPEATS / 2); // start in the middle
  const initialK = startBlock * Math.max(1, period);

  // Big reel: [items] repeated
  const reel = useMemo(() => {
    if (!period) return [] as Item[];
    const out: Item[] = [];
    for (let r = 0; r < REPEATS; r++) out.push(...items);
    return out;
  }, [items, period]);

  // Measure viewport + first card width
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const roVp = new ResizeObserver(() => setVpW(vp.clientWidth));
    roVp.observe(vp);
    setVpW(vp.clientWidth);

    const first = vp.querySelector<HTMLElement>("article[data-crsl-item]");
    if (first) {
      const roCard = new ResizeObserver(() => {
        const rect = first.getBoundingClientRect();
        if (rect.width > 0) setCardW(rect.width);
      });
      roCard.observe(first);
      const rect = first.getBoundingClientRect();
      if (rect.width > 0) setCardW(rect.width);

      return () => {
        roCard.disconnect();
        roVp.disconnect();
      };
    }

    return () => roVp.disconnect();
  }, [reel.length]);

  const stride = cardW + gap;
  const gutter = Math.max(0, (vpW - cardW) / 2);

  // Place to middle block on mount/resize (no animation)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !stride || !period) return;
    el.scrollLeft = initialK * stride;
  }, [stride, period]);

  // Track extended index & normalize rarely near ends; set active
  const currentKRef = useRef(initialK);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || !stride || !period) return;

    let frame = 0;
    const leftGuard = period * 2;
    const rightGuard = period * (REPEATS - 2);

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let k = Math.round(el.scrollLeft / stride);

        // rare off-screen normalization (no visual change)
        if (k < leftGuard) {
          k += period * Math.ceil(REPEATS / 2);
          el.scrollLeft = k * stride;
        } else if (k > rightGuard) {
          k -= period * Math.ceil(REPEATS / 2);
          el.scrollLeft = k * stride;
        }

        currentKRef.current = k;
        const realIdx = period ? k % period : 0;
        setActive((prev) => (prev === realIdx ? prev : realIdx));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // init
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, [stride, period]);

  // Styles
  const trackStyle = useMemo(
    () => ({
      gap: `${gap}px`,
      paddingInline: `${gutter}px`, // gutters let first/last center in any block
    }),
    [gap, gutter]
  );

  const widthCSS = "clamp(240px, 80vw, 360px)";
  const itemStyle = useMemo(
    () => ({
      width: widthCSS,
      scrollSnapAlign: "center" as const,
      scrollSnapStop: "always" as const,
    }),
    [widthCSS]
  );

  // Dots/controls: go to a REAL slide i using the nearest block
  // Replace your goTo with this "nearest occurrence" version
  const goTo = (i: number) => {
    const el = viewportRef.current;
    if (!el || !stride || !period) return;

    // Where are we now, in fractional "k" space?
    const kNow = el.scrollLeft / stride; // don't round — fractional is better
    const block = Math.round(kNow / period);

    // Three candidate occurrences of slide i: previous, current, next block
    const kCandidates = [
      (block - 1) * period + i,
      block * period + i,
      (block + 1) * period + i,
    ];

    // Choose the nearest by distance in k-space
    let kTarget = kCandidates[0];
    let bestDist = Math.abs(kCandidates[0] - kNow);
    for (let c = 1; c < kCandidates.length; c++) {
      const d = Math.abs(kCandidates[c] - kNow);
      if (d < bestDist) {
        bestDist = d;
        kTarget = kCandidates[c];
      }
    }

    el.scrollTo({ left: kTarget * stride, behavior: "smooth" });
  };

  // SNAP FIX: helper to snap to the nearest center
  const snapToNearest = () => {
    const el = viewportRef.current;
    if (!el || !stride) return;
    const k = Math.round(el.scrollLeft / stride);
    el.scrollTo({ left: k * stride, behavior: "smooth" });
  };

  // --- Mouse drag (grab to scroll) ---
  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return; // left button only
    const el = viewportRef.current;
    if (!el) return;
    isDownRef.current = true;
    movedRef.current = false;
    startXRef.current = e.clientX;
    startLeftRef.current = el.scrollLeft;

    // SNAP FIX: disable snap while dragging & switch to instant scrolling
    el.classList.add(s.dragging);
    el.classList.add(s.snapOff);
    el.style.scrollBehavior = "auto";
  };

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isDownRef.current) return;
    const el = viewportRef.current;
    if (!el) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = startLeftRef.current - dx; // drag left -> scroll right
    if (Math.abs(dx) > 3) movedRef.current = true;
  };

  const onMouseUpOrLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;

    const el = viewportRef.current;
    if (!el) return;

    // SNAP FIX: re-enable snap, restore smooth, then snap to closest slide
    el.classList.remove(s.dragging);
    el.classList.remove(s.snapOff);
    el.style.scrollBehavior = "smooth";

    // Only snap if there was actual dragging (optional)
    if (movedRef.current) {
      snapToNearest();
      movedRef.current = false;
    }
  };

  const onClickCapture: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Suppress accidental clicks after a drag
    if (movedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      movedRef.current = false;
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      className={`${s.wrapper} relative py-8 md:py-12 select-none isolate`}
      data-carousel
    >
      {/* heading (optional)
      <header className="mb-6 text-left">
        <p className="text-sm text-orange-400/80 mb-1">CREATION by ember.</p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white">
          Every Business Is Different —<br /> We Power Your Vision.
        </h2>
      </header> */}

      {/* viewport */}
      <div
        ref={viewportRef}
        className={`relative overflow-x-auto overflow-y-visible pt-8 md:pt-12 pb-12 no-scrollbar w-full ${s.viewport}`}
        style={{
          scrollBehavior: "smooth",
          scrollPaddingLeft: `${gutter}px`,
          scrollPaddingRight: `${gutter}px`,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUpOrLeave}
        onMouseLeave={onMouseUpOrLeave}
        onClickCapture={onClickCapture}
      >
        {/* track */}
        <div
          className="flex items-stretch"
          style={trackStyle}
          role="listbox"
          aria-live="polite"
        >
          {reel.map((it, k) => {
            const realIdx = period ? k % period : 0;
            const isActive = realIdx === active;

            return (
              <article
                key={`rep-${Math.floor(k / period)}-${String(
                  it.id
                )}-${realIdx}`}
                data-crsl-item
                role="option"
                aria-selected={isActive}
                className="shrink-0"
                style={itemStyle}
              >
                <div
                  className={`${s.card} h-80 p-6 text-white bg-black/40 backdrop-blur-sm`}
                  data-pulse={isActive && pulse ? "true" : "false"}
                  style={{ ["--active" as any]: isActive ? 1 : 0 }}
                >
                  <h3 className="text-xl font-semibold mb-3">{it.title}</h3>
                  {it.body && (
                    <p className="text-sm leading-relaxed text-white/75 whitespace-pre-line">
                      {it.body}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* runway glow */}
        <div className={s.runway} aria-hidden />
      </div>

      {/* dots for the real items only */}
      <div className="mt-3 flex gap-2 justify-center">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 w-6 rounded-full ${
              i === active ? "bg-orange-400" : "bg-white/20 hover:bg-white/30"
            }`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
