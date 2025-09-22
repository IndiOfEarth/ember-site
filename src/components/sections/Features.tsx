"use client";

import React, { useRef, useMemo, useState } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import Container from "@/components/ui/Container";
import { packages } from "@/lib/data";

/**
 * Apple-esque — refined
 * Changes:
 * - Mega "PACKAGES" heading higher contrast (whiter, stronger presence)
 * - Redesigned row headers for each line (elegant, accented, more distinctive)
 * - Added tasteful orange highlights across the section
 * - Removed the curtain-wipe glow from cards
 */

export default function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="features" className="relative">
        <HeroBlock />
        <ProductMatrix />
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------
 * 1) HERO — quiet confidence
 * --------------------------------------------------------- */
function HeroBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-60%", "120%"]);

  return (
    <div
      ref={ref}
      className="relative h-[92svh] min-h-[640px] w-full overflow-clip"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/emberheroimage.png"
      >
        {/* <source src="/video/background-video2.mp4" type="video/mp4" /> */}
      </video>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0.82))]" />
      {/* Fine grain */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('/textures/noise.png')] mix-blend-soft-light" />

      {/* Gentle aurora (very subtle, slow) */}
      <motion.div
        aria-hidden
        animate={{ x: ["-10%", "20%", "-10%"], y: ["5%", "-3%", "5%"] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-12%] top-[16%] w-[42rem] h-[42rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(236,204,153,0.20),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        animate={{ x: ["10%", "-8%", "10%"], y: ["-2%", "4%", "-2%"] }}
        transition={{ duration: 58, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[-14%] bottom-[10%] w-[46rem] h-[46rem] rounded-full blur-3xl bg-[radial-gradient(circle_at_70%_70%,rgba(147,197,253,0.18),transparent_60%)]"
      />

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 h-full w-full flex items-center"
      >
        <Container>
          <div className="px-6">
            <AnimatedHeadline
              lines={["Products & brands", "that feel inevitable"]}
              emphasisIndex={1}
              className="leading-[1.04] tracking-[-0.02em] text-white text-[clamp(2.6rem,5.6vw,5.8rem)] font-semibold max-w-[20ch]"
            />
            {/* understated progress line (now with a soft orange note) */}
            <motion.div
              aria-hidden
              style={{ backgroundPositionX: lineX }}
              className="mt-6 h-[2px] w-40 sm:w-64 bg-[linear-gradient(90deg,transparent,rgba(255,145,77,0.55),white,rgba(147,197,253,0.5),transparent)] bg-[length:200%_100%]"
            />
            <p className="mt-6 max-w-[56ch] text-white/80 text-[15px] sm:text-base">
              Design, web, and product systems engineered for desire and
              performance.
            </p>
            <div className="mt-8">
              <PrimaryCTA>Discover our capabilities</PrimaryCTA>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
}

function AnimatedHeadline({
  lines,
  className,
  emphasisIndex,
}: {
  lines: string[];
  className?: string;
  emphasisIndex?: number;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 96%", "start 66%"],
  });
  const progress = scrollYProgress;
  // const progress = useSpring(scrollYProgress, {
  //   stiffness: 120,
  //   damping: 18,
  //   mass: 0.4,
  // });

  return (
    <h1 ref={containerRef} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => {
        const y = useTransform(progress, [0, 1], [18, 0]);
        const o = useTransform(progress, [0, 1], [0, 1]);
        return (
          <span key={i} className="block overflow-hidden">
            <motion.span
              style={{ y, opacity: o }}
              className={[
                i === emphasisIndex ? "italic font-serif" : "",
                "inline-block",
              ].join(" ")}
            >
              {line}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

/* ---------------------------------------------------------
 * 2) PRODUCT MATRIX — calm materiality
 * --------------------------------------------------------- */
function ProductMatrix() {
  const order: Array<keyof typeof packages> = useMemo(
    () => ["retainers", "branding", "webapp"],
    []
  );

  const accents: Record<keyof typeof packages, string> = {
    branding: "from-amber-200/0 via-amber-200/16 to-amber-200/0",
    webapp: "from-blue-200/0 via-blue-200/14 to-blue-200/0",
    retainers: "from-orange-300/0 via-orange-300/20 to-orange-300/0",
  };

  const prices: Record<string, number | undefined> = {
    "Starter Retainer": 299,
    "Growth Retainer": 599,
    "Scale Retainer": 799,
  };

  return (
    <section className="relative py-28">
      {/* Background mega-heading — higher contrast */}
      <div className="pointer-events-none absolute inset-x-0 top-10 text-center select-none">
        <motion.h2
          initial={{ opacity: 0.16, y: 8 }}
          whileInView={{ opacity: 0.22, y: 0 }}
          viewport={{ once: true, margin: "-20% 0% -10% 0%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-semibold tracking-tight text-white [text-shadow:0_0_70px_rgba(0,0,0,0.7)] text-[min(22vw,12rem)] leading-none"
          aria-hidden
        >
          PACKAGES
        </motion.h2>
      </div>

      <Container>
        {order.map((key, rowIndex) => (
          <div
            key={key}
            className={`relative ${rowIndex > 0 ? "mt-20" : "mt-12"}`}
          >
            {/* Redesigned Row header card */}
            <RowHeader accentClass={accents[key]} title={packages[key].line} />

            {/* 3-card row */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-8">
              {packages[key].tiers.map((t, i) => (
                <TierCard
                  key={`${key}-${t.name}`}
                  tier={t}
                  delay={i * 0.06 + rowIndex * 0.04}
                  price={prices[t.name]}
                />
              ))}
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

/* --- Elegant row header --------------------------------------------------- */
function RowHeader({
  title,
  accentClass,
}: {
  title: string;
  accentClass: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0% -15% 0%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[28px] [clip-path:inset(0_round_28px)] bg-white/[0.045] ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      {/* soft gradient wash */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${accentClass}`}
        aria-hidden
      />

      {/* left accent bar with orange note */}
      <div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-400/80 via-orange-300/60 to-orange-500/80"
      />

      <div className="relative p-5 md:p-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* subtle emblem */}
          <div className="h-8 w-8 rounded-full ring-1 ring-white/20 bg-[radial-gradient(circle_at_40%_40%,rgba(255,145,77,0.25),rgba(255,255,255,0.06))]" />
          <div>
            <div className="text-[11px] tracking-[0.26em] uppercase text-white/70">
              Collection
            </div>
            <h3 className="mt-1 text-white text-[clamp(1.1rem,1.8vw,1.35rem)] font-semibold leading-tight">
              {title}
            </h3>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs">
          <span className="flex items-center gap-2 text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400/80" />
            <span>Curated for momentum</span>
          </span>
          <span className="h-px w-8 bg-white/20" />
          <span className="text-white/60">Precision. Clarity. Speed.</span>
        </div>
      </div>
    </motion.div>
  );
}

/* --- Card (refined) ------------------------------------------------------ */
function TierCard({
  tier,
  delay,
  price,
}: {
  tier: { name: string; items: readonly string[]; description?: string };
  delay: number;
  price?: number;
}) {
  const featured = /Growth|Flame|Build|Scale Retainer|Growth Retainer/i.test(
    tier.name
  );
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [0, 1], [2.5, -2.5]);
  const rotateY = useTransform(mx, [0, 1], [-2.5, 2.5]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x);
    my.set(y);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-15% 0% -15% 0%" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className="group relative"
      role="region"
      aria-label={tier.name}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={onMouseMove}
        className="relative overflow-hidden rounded-[32px] [clip-path:inset(0_round_32px)] bg-white/[0.04] backdrop-blur-2xl ring-1 ring-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_28px_72px_-28px_rgba(0,0,0,0.7)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Removed curtain wipe glow */}

        {/* Featured subtle rim */}
        {featured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/10"
          />
        )}

        {/* Cursor spotlight (subtle) */}
        <CursorSpotlight active={hovered} mx={mx} my={my} />

        {/* Fine inner vignette + faint grain */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_36px_72px_rgba(0,0,0,0.6)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[url('/textures/noise.png')] mix-blend-soft-light" />

        <div className="relative p-8 md:p-9">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-white text-[clamp(1.3rem,1.8vw,1.6rem)] font-semibold tracking-tight">
              {tier.name}
            </h4>
            {featured && (
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400/90" />
                <span>Recommended</span>
              </div>
            )}
          </div>

          {/* ⬇️ Optional description (shows only when provided) */}
          {tier.description && (
            <p className="mt-1 text-white/75 text-[14px] leading-relaxed line-clamp-2">
              {tier.description}
            </p>
          )}

          <p className="mt-9 text-white/75 text-[15px]">What’s inside:</p>
          <ul className="mt-5 space-y-2 text-white/75">
            {tier.items.map((it) => (
              <li key={it} className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-400/80"
                  aria-hidden
                />
                <span className="text-sm">{it}</span>
              </li>
            ))}
          </ul>

          {typeof price === "number" && (
            <div className="mt-6 text-white/90">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                From
              </div>
              <div className="text-3xl md:text-4xl font-semibold">
                ${price}
                <span className="ml-2 text-sm font-normal text-orange-300/80">
                  /mo
                </span>
              </div>
            </div>
          )}

          <div className="mt-7">
            <button className="group/cta relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black bg-white/95 ring-1 ring-black/5 shadow-[0_10px_26px_rgba(255,255,255,0.14)] hover:shadow-[0_14px_36px_rgba(255,255,255,0.22)] hover:-translate-y-0.5 transition-all duration-500">
              <span>Discover {tier.name}</span>
              <span aria-hidden>↗</span>
              {/* subtle orange focus ring on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent group-hover/cta:ring-orange-300/60 transition-[box-shadow,ring] duration-500"
              />
            </button>
          </div>
        </div>

        {/* bottom sheen with orange tint (subtle) */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute inset-x-12 bottom-[-3rem] h-24 rounded-[999px] bg-[radial-gradient(closest-side,rgba(255,145,77,0.18),transparent_70%)] blur-2xl"
        />
      </motion.div>
    </motion.article>
  );
}

function CursorSpotlight({
  active,
  mx,
  my,
}: {
  active: boolean;
  mx: any;
  my: any;
}) {
  const x = useTransform(mx, [0, 1], ["0%", "100%"]);
  const y = useTransform(my, [0, 1], ["0%", "100%"]);
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            style={{ left: x, top: y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.14),rgba(255,255,255,0.04)_55%,transparent_70%)] blur-xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------
 * CTA
 * --------------------------------------------------------- */
function PrimaryCTA({ children }: { children: React.ReactNode }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_28px_rgba(255,145,77,0.35)] transition-all duration-500">
      {children}
      <span aria-hidden>↗</span>
    </button>
  );
}
