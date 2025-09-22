"use client";

import React, { useMemo, useRef } from "react";
import Image from "next/image";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Container from "@/components/ui/Container";
import { productCards } from "@/lib/data";

/** ==========================================================
 *  VISION — Cinematic Agency Scroll (Alt Take)
 *
 *  What’s new in this update:
 *  - ✅ Hero: unchanged (you said you like it as-is)
 *  - ✨ StoryPanels: added an in-section intro heading that shows first,
 *    then gracefully fades away as the first panel takes over (fixes the
 *    “blank bit before the section” feeling).
 *  - 🧭 Rails still stay visible.
 *  - 🎞️ CaseReelLux: kept horizontal reel & card aesthetic you like.
 *  - 🧩 New alternate (no horizontal scroll): CaseShowcaseMono — an
 *    Apple‑esque vertical gallery with big imagery and crisp type so you
 *    can A/B which section feels better.
 *
 *  Reduced-motion friendly + pure Framer/Tailwind (no extra deps)
 *  ========================================================== */

// const EASE = [0.22, 1, 0.36, 1] as const;
const VP = { once: true, amount: 0.2 } as const;

export default function Vision() {
  return (
    <MotionConfig reducedMotion="user">
      <section id="vision" className="relative [overflow-x:clip]">
        <HeroBlock />
        {/* <StoryPanels /> */}
        {/* <CaseReelLux /> */}
        {/* Alternate, no-horizontal-scroll take */}
        {/* <CaseShowcaseMono /> */}
        <MetricsCTA />
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------
 * 1) HERO — video, masked headline, spectral shimmer
 * --------------------------------------------------------- */
function HeroBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle scrub as hero exits
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.6]);
  const shimmerX = useTransform(scrollYProgress, [0, 1], ["-120%", "160%"]);

  return (
    <div
      ref={ref}
      className="relative h-[92svh] min-h-[640px] w-full overflow-clip"
    >
      {/* Video background (swap src as needed) */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/emberheroimage.png"
      >
        {/* <source src="/video/background-video.mp4" type="video/mp4" /> */}
      </video>

      {/* Vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_20%,rgba(255,255,255,0.06),rgba(0,0,0,0.82))]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/textures/noise.png')] mix-blend-soft-light" />

      {/* Headline with per-line reveals */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 h-full w-full flex items-center"
      >
        <Container>
          <div className="px-6">
            <AnimatedHeadline
              lines={["We make brands", "feel inevitable"]}
              emphasisIndex={1}
              className="leading-[1.02] tracking-[-0.02em] text-white text-[clamp(2.6rem,5.8vw,6rem)] font-semibold max-w-[17ch]"
            />

            {/* spectral shimmer underline */}
            <motion.div
              aria-hidden
              style={{ backgroundPositionX: shimmerX }}
              className="mt-6 h-[3px] w-48 sm:w-72 bg-[linear-gradient(90deg,transparent,rgba(236,204,153,0.6),white,rgba(147,197,253,0.6),transparent)] bg-[length:200%_100%]"
            />

            <p className="mt-6 max-w-[60ch] text-white/80 text-sm sm:text-base">
              Digital products and brand systems engineered for desire and
              performance.
            </p>

            <div className="mt-8">
              <MagneticCTA>See our approach</MagneticCTA>
            </div>
          </div>
        </Container>
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
 * AnimatedHeadline — per-line reveal on enter
 * --------------------------------------------------------- */
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
  // Trigger earlier & complete faster so the text is fully visible when the hero is in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 98%", "start 68%"],
  });
  // const progress = useSpring(scrollYProgress, {
  //   stiffness: 160,
  //   damping: 18,
  //   mass: 0.35,
  // });
  const progress = scrollYProgress;

  return (
    <h1 ref={containerRef} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            style={{
              y: useTransform(progress, [0, 1], [18, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1]),
            }}
            className={[
              i === emphasisIndex ? "italic font-serif" : "",
              "inline-block",
            ].join(" ")}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
// Tweak to taste: how much longer the LAST panel should linger vs others.
const LAST_PANEL_WEIGHT = 1.7;
const END_PAD_SVH = 20; // small extra pad after the final panel
const RAIL_TAIL_SVH = 48; // keep rails on screen longer after the final panel fades // small extra pad after the final panel

function StoryPanels() {
  const panels = useMemo(
    () => [
      {
        id: "strategy",
        title: "Strategy.",
        body: "With insight as our guide, we define what matters—framing the vision, setting direction, and aligning every decision to move your brand forward.",
        img: "/images/testimage14.jpg",
        tint: "from-emerald-300/0 via-emerald-200/0 to-emerald-200/0",
      },
      {
        id: "design",
        title: "Design.",
        body: "Rooted in clarity, we craft design systems that unify brand and product. Every element considered, refined, and built to feel inevitable.",
        img: "/images/testimage2.jpg",
        tint: "from-blue-300/0 via-blue-200/0 to-blue-200/0",
      },
      {
        id: "build",
        title: "Build.",
        body: "Ideas become real with precision and care. From full-stack platforms to crafted digital details, our builds are engineered to scale beautifully.",
        img: "/images/testimage3.jpg",
        tint: "from-amber-300/0 via-amber-200/0 to-amber-200/0",
      },
      {
        id: "launch",
        title: "Evolve.",
        body: "Launch is the start, not the finish. We measure, learn, and refine—ensuring your brand adapts, grows, and stays ahead.",
        img: "/images/testimage15.jpg",
        tint: "from-pink-300/0 via-pink-200/0 to-pink-200/0",
      },
    ],
    []
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // --- Weighted timeline so the last panel lingers longer ---
  const weights = useMemo(
    () =>
      panels.map((_, i) => (i === panels.length - 1 ? LAST_PANEL_WEIGHT : 1)),
    [panels]
  );
  const totalWeight = useMemo(
    () => weights.reduce((a, b) => a + b, 0),
    [weights]
  );

  // Cumulative fractions [0..1] for each panel's start/end in the scroll timeline
  const ranges = useMemo(() => {
    let acc = 0;
    return panels.map((_, i) => {
      const start = acc / totalWeight;
      acc += weights[i];
      const end = acc / totalWeight;
      return { start, end };
    });
  }, [panels, totalWeight, weights]);

  // Cumulative weights for snapping
  const prefixWeights = useMemo(() => {
    const arr: number[] = [];
    let acc = 0;
    for (let i = 0; i < weights.length; i++) {
      arr.push(acc);
      acc += weights[i];
    }
    return arr; // arr[i] = sum(weights[0..i-1])
  }, [weights]);

  // One full viewport per weight unit + a little breathing room at the end
  const h = totalWeight * 100 + END_PAD_SVH + RAIL_TAIL_SVH; // svh

  // Fractional active index (for rail highlighting)
  const activeIndex = useTransform(scrollYProgress, (v) => {
    for (let i = 0; i < ranges.length; i++) {
      const { start, end } = ranges[i];
      if (v <= end || i === ranges.length - 1) {
        const t = Math.max(
          0,
          Math.min(1, (v - start) / Math.max(1e-6, end - start))
        );
        return i + t; // e.g., 1.3 means in panel #1 leaning to #2
      }
    }
    return 0;
  });

  // Smooth keyboard snapping to a target panel index using the weighted timeline
  const goToIndex = (target: number) => {
    const clamped = Math.min(panels.length - 1, Math.max(0, target));
    const viewportH = window.innerHeight || 800;
    const sectionTop = sectionRef.current?.offsetTop ?? 0;
    const y = sectionTop + viewportH * prefixWeights[clamped];
    window.scrollTo({ top: y + 2, behavior: "smooth" });
  };

  // --- New: Intro overlay that shows before the first panel takes over ---
  const firstStart = ranges[0].start;
  const firstEnd = ranges[0].end;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${h}svh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-[100svh] overflow-clip">
        {/* subtle vignette + grain */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(255,255,255,0.08),rgba(0,0,0,0.9))]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('/textures/noise.png')] mix-blend-soft-light" />

        {/* Left rail — progress dots (stay visible) */}
        <RailLeft panels={panels} activeIndex={activeIndex} />

        {/* Right rail — microcopy (stay visible) */}
        <RailRight />

        {/* Intro overlay that disappears as the first panel engages */}
        <PanelsIntro
          progress={scrollYProgress}
          startF={firstStart}
          endF={firstEnd}
        />

        {/* Stage content */}
        <div className="absolute inset-0 z-0">
          {panels.map((p, i) => (
            <StagePanel
              key={p.id}
              panel={p}
              index={i}
              startF={ranges[i].start}
              endF={ranges[i].end}
              progress={scrollYProgress}
              onSnap={goToIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
 * PanelsIntro — heading that fades away into the first panel
 * --------------------------------------------------------- */
function PanelsIntro({
  progress,
  startF,
  endF,
}: {
  progress: any;
  startF: number;
  endF: number;
}) {
  // Use the first panel's local progress; fade/blur out early
  const local = useTransform(progress, [startF, endF], [0, 1]);
  const opacity = useTransform(local, [0, 0.18], [1, 0]);
  const blur = useTransform(local, [0, 0.18], ["0px", "6px"]);
  const y = useTransform(local, [0, 0.18], [0, -8]);

  return (
    <motion.div
      className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
      style={{ opacity, filter: blur, y }}
      aria-hidden
    >
      <div className="text-center px-6">
        <p className="text-white/60 text-[11px] tracking-[0.26em] uppercase">
          Our method
        </p>
        <h2 className="mt-3 text-white text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-tight">
          Strategy. Design. Build. Evolve.
        </h2>
        <p className="mt-4 max-w-[62ch] mx-auto text-white/70">
          A simple arc. Four stages. One standard—make it feel inevitable.
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------------------------------------------------
 * StagePanel — each full‑screen card
 * --------------------------------------------------------- */
function StagePanel({
  panel,
  index,
  startF,
  endF,
  progress,
  onSnap,
}: {
  panel: {
    id: string;
    title: string;
    body: string;
    img: string;
    tint?: string;
  };
  index: number;
  startF: number;
  endF: number;
  progress: any;
  onSnap: (targetIdx: number) => void;
}) {
  // Local progress for this panel, derived from the weighted global progress
  const local = useTransform(progress, [startF, endF], [0, 1]);
  const opacity = useTransform(local, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);
  const y = useTransform(local, [0, 1], [40, -20]); // gentle vertical drift
  const scale = useTransform(local, [0, 0.5, 1], [1.02, 1, 1.02]);

  // Parallax layers
  const bgY = useTransform(local, [0, 1], ["-2%", "4%"]); // background image
  const glowY = useTransform(local, [0, 1], ["6%", "-6%"]);

  // Keyboard nav: focusable region so users can press ←/→ to snap
  const snapTo = (dir: -1 | 1) => onSnap(index + dir);

  return (
    <motion.section
      aria-label={panel.title}
      className="absolute inset-0"
      style={{ opacity }}
    >
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <Image
          src={panel.img}
          alt=""
          fill
          priority={index === 0}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Color tint + gradient floor */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70 ${
            panel.tint || ""
          }`}
        />
      </motion.div>

      {/* Floating glass card */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[min(940px,92vw)] -translate-x-1/2 -translate-y-1/2"
        style={{ y, scale }}
      >
        <div className="relative rounded-[28px] backdrop-blur-xl bg-white/[0.06] ring-1 ring-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_30px_80px_-20px_rgba(0,0,0,0.5)]">
          {/* subtle edge light */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/10"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.06), 0 0 40px 2px rgba(236,204,153,0.12)",
            }}
          />

          <div className="grid md:grid-cols-12 gap-0">
            {/* Visual side (parallax glow) */}
            <div className="relative md:col-span-6 h-[46svh] md:h-[60svh] overflow-hidden rounded-l-[28px]">
              <motion.div className="absolute inset-0" style={{ y: glowY }}>
                <Image
                  src={panel.img}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 92vw"
                  className="object-cover scale-[1.05] opacity-90"
                />
              </motion.div>
              {/* fixed overlay tint that always matches the card's image height */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              {/* soft highlight sweep */}
              <HighlightSweep />
            </div>

            {/* Copy side */}
            <div className="md:col-span-6 p-7 sm:p-10 flex flex-col justify-center">
              <p className="text-[0.75rem] tracking-[0.26em] uppercase text-white/60">
                Method
              </p>
              <h3 className="mt-3 text-white text-3xl sm:text-4xl font-semibold leading-[1.05] tracking-tight">
                {panel.title}
              </h3>
              <p className="mt-4 text-white/80 text-base sm:text-lg max-w-[48ch]">
                {panel.body}
              </p>

              <div className="mt-8 inline-flex items-center gap-3">
                <button className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black bg-white hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-shadow">
                  Learn more <span aria-hidden>→</span>
                </button>
                <kbd className="text-white/40 text-xs hidden sm:inline">
                  ← / →
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Keyboard navigation capture (focusable, invisible) */}
      <div
        tabIndex={0}
        aria-hidden
        className="absolute inset-0 outline-none"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") snapTo(1);
          if (e.key === "ArrowLeft") snapTo(-1);
        }}
      />
    </motion.section>
  );
}

/* ---------------------------------------------------------
 * Left Rail — progress dots + labels
 * --------------------------------------------------------- */
function RailLeft({
  panels,
  activeIndex,
}: {
  panels: { id: string; title: string }[];
  activeIndex: any;
}) {
  return (
    <div className="pointer-events-none absolute top-0 left-6 sm:left-12 h-full w-28 sm:w-40 z-20 flex items-center justify-center">
      <ul className="flex flex-col gap-4">
        {panels.map((p, i) => {
          const t = useTransform(activeIndex, (v: number) => Math.abs(v - i));
          const s = useTransform(t, [0, 1.5], [1.12, 0.92]); // subtle size change only
          return (
            <motion.li
              key={p.id}
              className="flex items-center gap-3"
              style={{ opacity: 1 }} // stay fully visible
            >
              <motion.span
                className="block h-2.5 w-2.5 rounded-full bg-white"
                style={{ scale: s }}
              />
              <span className="hidden sm:block text-white/70 text-xs max-w-[12ch] leading-tight">
                {p.title}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------
 * Right Rail — section microcopy
 * --------------------------------------------------------- */
function RailRight() {
  return (
    <div className="pointer-events-none absolute top-0 right-6 sm:right-12 h-full w-24 sm:w-32 z-20 flex items-center justify-center">
      <div className="rotate-90 text-white/70 text-[0.72rem] tracking-[0.26em] uppercase">
        Story panels
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
 * HighlightSweep — subtle animated light streak over media
 * --------------------------------------------------------- */
function HighlightSweep() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-40%", "140%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 0.8, 0.8, 0]
  );
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        aria-hidden
        className="absolute -inset-y-16 left-0 w-40 blur-3xl"
        style={{
          x,
          opacity,
          background:
            "linear-gradient(90deg, rgba(236,204,153,0) 0%, rgba(236,204,153,0.6) 50%, rgba(236,204,153,0) 100%)",
        }}
      />
    </div>
  );
}

/* ---------------------------------------------------------
 * 3) CASE REEL — Apple‑esque horizontal reel (kept)
 * --------------------------------------------------------- */
function CaseReelLux() {
  const items = [
    {
      tag: "Brand",
      title: "Brand Identity",
      blurb: "Recognisable, scalable brand systems.",
      img: "/images/card-branding.png",
    },
    {
      tag: "Web",
      title: "Web Design",
      blurb: "Cinematic. Fast. SEO-ready.",
      img: "/images/card-website.png",
    },
    {
      tag: "Product",
      title: "App UX/UI",
      blurb: "Clear flows. Elegant screens.",
      img: "/images/card-experiences.png",
    },
    {
      tag: "Growth",
      title: "Marketing",
      blurb: "Content, social, search that convert.",
      img: "/images/card-social.png",
    },
    {
      tag: "Systems",
      title: "Design Systems",
      blurb: "Tokens. Components. Docs.",
      img: "/images/card-design.png",
    },
    {
      tag: "Care",
      title: "Ongoing Evolution",
      blurb: "Optimise. Ship. Learn.",
      img: "/images/card-evolve.png",
    },
  ];

  const railRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start start", "end start"],
  });

  const cardW = 480;
  const gap = 28;
  // Use a fixed initial value identical on server and first client paint to avoid hydration mismatch.
  const [maxX, setMaxX] = React.useState<number>(0);
  const [scrollH, setScrollH] = React.useState<number>(2200);

  React.useEffect(() => {
    const compute = () => {
      const vw = window.innerWidth;
      const reelW = items.length * (cardW + gap) + 160;
      const nextMaxX = Math.max(0, reelW - vw + 160);
      const nextScrollH = Math.max(1600, nextMaxX + 1100);
      setMaxX(nextMaxX);
      setScrollH(nextScrollH);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [items.length]);

  const x = useTransform(scrollYProgress, [0, 1], [0, -maxX]);
  const xSpring = useSpring(x, { stiffness: 120, damping: 26, mass: 0.7 });

  // ambient light bands gliding across the rail
  const bandX = useTransform(scrollYProgress, [0, 1], ["-30%", "130%"]);
  const bandOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 0.5, 0.5, 0]
  );

  return (
    <section
      ref={railRef}
      suppressHydrationWarning
      className="relative pt-28 sm:pt-36 lg:pt-44"
      style={{ height: scrollH }}
    >
      {/* Section intro */}
      <div className="max-w-4xl mx-auto mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-normal tracking-widest text-ember-100 inline-block leading-tight">
          <span className="block">
            EVERY BUSINESS IS{" "}
            <span className="font-semibold text-ember-100">DIFFERENT</span>,
          </span>
          <span className="block">
            WE <span className="font-semibold text-ember-100">POWER</span>. YOUR{" "}
            <span className="font-semibold text-ember-100">VISION</span>.
          </span>
        </h2>
        <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50">
          EXPLORE CONTENT FROM AROUND THE EMBER NETWORK.
        </p>
      </div>
      <div className="sticky top-24 sm:top-28 h-[84svh]">
        <Container>
          <div className="px-6 flex items-end justify-between">
            <div>
              <p className="text-white/50 text-[11px] tracking-[0.26em] uppercase">
                explore
              </p>
              <h3 className="mt-2 text-ember-900 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-tight">
                Ember Discovery
              </h3>
            </div>
            <span className="text-white/60 text-sm">Scroll</span>
          </div>
        </Container>

        <div className="relative mt-8">
          {/* Ambient bands */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 -skew-x-6"
            style={{ opacity: bandOpacity }}
          >
            <motion.div
              className="absolute top-10 h-24 w-1/3 blur-3xl"
              style={{
                left: bandX,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)",
              }}
            />
            <motion.div
              className="absolute bottom-16 h-24 w-1/4 blur-2xl"
              style={{
                left: bandX,
                background:
                  "linear-gradient(90deg, rgba(236,204,153,0) 0%, rgba(236,204,153,0.25) 50%, rgba(236,204,153,0) 100%)",
              }}
            />
          </motion.div>

          <motion.div
            style={{ x: xSpring }}
            className="flex gap-7 px-6 will-change-transform"
          >
            {items.map((it, i) => (
              <LuxCard key={i} {...it} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LuxCard({
  tag,
  title,
  blurb,
  img,
}: {
  tag: string;
  title: string;
  blurb: string;
  img: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [8, -8]);

  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);
  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setMx(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 1);
    setMy(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 1);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setMx(0);
        setMy(0);
      }}
      whileHover={{ y: -10, rotateX: -my * 2, rotateY: mx * 3 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative w-[480px] shrink-0"
      role="region"
      aria-label={title}
    >
      <div className="relative rounded-[32px] overflow-hidden [clip-path:inset(0_round_32px)] bg-[#0B0B0C]">
        {/* Matte ceramic body + hairline silver / foil edge on hover */}
        <div className="absolute inset-0 rounded-[32px] ring-1 ring-white/8" />
        <div
          className="absolute inset-[-1px] rounded-[33px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(236,204,153,0) 0deg, rgba(236,204,153,0.35) 70deg, rgba(255,255,255,0.35) 110deg, rgba(236,204,153,0.35) 160deg, rgba(236,204,153,0) 360deg)",
          }}
        />

        {/* Media */}
        <div className="relative aspect-[14/10]">
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src={img}
              alt=""
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          </motion.div>

          {/* Minimal badge */}
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
            {tag}
          </div>

          {/* Top-right embossed logo dot */}
          <div
            className="absolute right-5 top-5 h-2 w-2 rounded-full bg-white/30 shadow-[inset_0_-1px_1px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)]"
            aria-hidden
          />
        </div>

        {/* Copy block */}
        <div className="p-7">
          <h4 className="text-white text-[clamp(1.15rem,1.6vw,1.35rem)] font-semibold leading-[1.05] tracking-tight">
            {title}
          </h4>
          <p className="mt-2 text-white/70 text-[0.95rem] leading-snug line-clamp-3">
            {blurb}
          </p>

          {/* Bottom toolbar */}
          <div className="mt-5 flex items-center justify-between">
            <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium transition-[transform,box-shadow] group/btn shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] hover:-translate-y-0.5">
              View reel <span aria-hidden>↗</span>
            </button>
            <div className="text-[11px] text-white/50 tracking-[0.22em] uppercase">
              Ember
            </div>
          </div>
        </div>

        {/* Soft inner vignette + noise for premium materiality */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-40px_80px_rgba(0,0,0,0.5)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('/textures/noise.png')] mix-blend-soft-light" />
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------
 * 3b) ALTERNATE — Apple‑esque vertical gallery (no horizontal scroll)
 *      Big imagery, generous white space, gentle reveals
 * --------------------------------------------------------- */
function CaseShowcaseMono() {
  const items = [
    {
      tag: "Brand",
      title: "Brand Identity",
      blurb: "Recognisable, scalable brand systems.",
      img: "/images/card-branding.png",
    },
    {
      tag: "Web",
      title: "Web Design",
      blurb: "Cinematic. Fast. SEO-ready.",
      img: "/images/card-website.png",
    },
    {
      tag: "Product",
      title: "App UX/UI",
      blurb: "Clear flows. Elegant screens.",
      img: "/images/card-experiences.png",
    },
    {
      tag: "Growth",
      title: "Marketing",
      blurb: "Content, social, search that convert.",
      img: "/images/card-social.png",
    },
    {
      tag: "Systems",
      title: "Design Systems",
      blurb: "Tokens. Components. Docs.",
      img: "/images/card-design.png",
    },
    {
      tag: "Care",
      title: "Ongoing Evolution",
      blurb: "Optimise. Ship. Learn.",
      img: "/images/card-evolve.png",
    },
  ];

  return (
    <section className="relative py-28 sm:py-36">
      <Container>
        <div className="px-6 text-center max-w-4xl mx-auto">
          <p className="text-white/50 text-[11px] tracking-[0.26em] uppercase">
            ember products
          </p>
          {/* <h3 className="mt-2 text-white text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight">
            Product Gallery
          </h3> */}
          <h2 className="text-2xl md:text-3xl font-normal mt-10 tracking-widest text-ember-100 inline-block leading-tight">
            <span className="block">
              PURPOSEFUL{" "}
              <span className="font-semibold text-ember-100">DESIGN</span>,
              SCALABLE{" "}
              <span className="font-semibold text-ember-100">SOFTWARE</span>.
            </span>
            <span className="block">
              YOUR{" "}
              <span className="font-semibold text-ember-100">BUSINESS</span>.
              YOUR <span className="font-semibold text-ember-100">BRAND</span>.
            </span>
          </h2>
          <p className="mt-4 text-white/70">
            Find out how Ember can power your business or idea.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10">
          {items.map((it, i) => (
            <MonoRow key={i} {...it} reverse={i % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function MonoRow({
  tag,
  title,
  blurb,
  img,
  reverse = false,
}: {
  tag: string;
  title: string;
  blurb: string;
  img: string;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const o = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ y, opacity: o }}
      className={[
        "grid md:grid-cols-12 items-center gap-8 lg:gap-12",
        reverse ? "md:[&>*:first-child]:order-2" : "",
      ].join(" ")}
    >
      {/* Visual */}
      <div className="md:col-span-7">
        <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden bg-[#0B0B0C] ring-1 ring-white/10">
          <Image
            src={img}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 92vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        </div>
      </div>

      {/* Copy */}
      <div className="md:col-span-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/90 text-black px-3 py-1 text-[11px] tracking-[0.18em] uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
          {tag}
        </div>
        <h4 className="mt-3 text-white text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold leading-[1.05] tracking-tight">
          {title}
        </h4>
        <p className="mt-2 text-white/70 text-base">{blurb}</p>

        <div className="mt-6">
          <button className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium transition-[transform,box-shadow] shadow-[0_8px_24px_rgba(255,255,255,0.12)] hover:shadow-[0_10px_28px_rgba(255,255,255,0.18)] hover:-translate-y-0.5">
            Learn more <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------
 * 4) METRICS + CTA — kinetic counters + magnetic button
 * --------------------------------------------------------- */
function MetricsCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });

  // Early-stage relevant counters
  const openSlots = useSpring(useTransform(scrollYProgress, [0, 1], [0, 3]), {
    stiffness: 80,
    damping: 12,
    mass: 0.6,
  });
  const capabilities = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 8]),
    { stiffness: 80, damping: 12, mass: 0.6 }
  );
  const previewDays = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 10]),
    { stiffness: 80, damping: 12, mass: 0.6 }
  );

  return (
    <section ref={ref} className="relative py-24 sm:py-32">
      <Container>
        <div className="px-6 grid sm:grid-cols-3 gap-10">
          <Metric label="Open slots (Q4 2025)" value={openSlots} />
          <Metric label="Core capabilities" value={capabilities} />
          <Metric
            label="Days to first design preview"
            value={previewDays}
            suffix="d"
          />
        </div>

        <div className="px-6 mt-12 flex items-center justify-between gap-6 flex-wrap">
          <p className="text-white/70 max-w-[70ch]">
            We’re new—and hungry. Limited engagements, senior-only team, fast
            prototypes. Let’s make something undeniable.
          </p>
          <MagneticCTA>Book a discovery call</MagneticCTA>
        </div>
      </Container>
    </section>
  );
}

function Metric({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: any;
  suffix?: string;
}) {
  // Format animated number cleanly
  const text = useTransform(value, (v: number) => `${Math.round(v)}${suffix}`);
  return (
    <div className="rounded-3xl ring-1 ring-white/10 bg-white/[0.03] p-6">
      <div className="text-white/60 text-xs tracking-[0.26em] uppercase">
        {label}
      </div>
      <motion.div
        className="mt-3 text-4xl sm:text-5xl font-semibold text-white"
        style={{ opacity: 0.95 }}
      >
        {text}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------------------
 * Magnetic CTA — button chases the cursor subtly
 * --------------------------------------------------------- */
function MagneticCTA({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const spring = useSpring(0, { stiffness: 220, damping: 24, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    spring.set(Math.min(1, Math.sqrt(dx * dx + dy * dy)));
    e.currentTarget.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = `translate(0px, 0px)`;
    spring.set(0);
  };

  const glow = useTransform(
    spring,
    [0, 1],
    ["transparent", "rgba(236,204,153,0.35)"]
  );

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-black bg-white hover:shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-shadow"
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.2), 0 0 40px 0 ${glow as any}`,
      }}
    >
      {children}
      <span aria-hidden>→</span>
    </motion.button>
  );
}
