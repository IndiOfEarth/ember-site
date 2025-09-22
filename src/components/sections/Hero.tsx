// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import type { MotionProps } from "framer-motion";
// import React, { useEffect, useMemo, useState } from "react";

// /** Reusable motion helper */
// const fade = (delay = 0): MotionProps => ({
//   initial: { opacity: 0, y: 10, filter: "blur(2px)" } as const,
//   animate: { opacity: 1, y: 0, filter: "blur(0px)" } as const,
//   transition: {
//     duration: 0.6,
//     ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
//     delay,
//   },
// });

// export default function Hero() {
//   const [y, setY] = useState(0);

//   // Respect reduced motion
//   const prefersReduced = useMemo(() => {
//     if (typeof window === "undefined" || !window.matchMedia) return false;
//     return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//   }, []);

//   useEffect(() => {
//     if (prefersReduced) return;

//     let raf = 0;
//     const onScroll = () => {
//       if (raf) return;
//       raf = window.requestAnimationFrame(() => {
//         // Parallax factor: tune between 0.08–0.18 for taste
//         const factor = 0.12;
//         setY(window.scrollY * factor);
//         raf = 0;
//       });
//     };
//     onScroll(); // initialize
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       if (raf) cancelAnimationFrame(raf);
//     };
//   }, [prefersReduced]);

//   return (
//     <section
//       id="hero"
//       aria-label="Ember hero"
//       className="relative isolate min-h-svh overflow-hidden"
//     >
//       {/* Parallax layer */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-20 will-change-transform"
//         style={{
//           transform: prefersReduced ? undefined : `translate3d(0, ${y}px, 0)`,
//         }}
//       >
//         <Image
//           src="/images/emberheroimage.png"
//           alt=""
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover"
//         />
//       </div>

//       {/* Cinematic scrims for legibility */}
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_40%,rgba(0,0,0,0.35),transparent)]"
//       />
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-transparent to-black/70"
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
//       />

//       {/* Content */}
//       <div className="relative mx-auto grid min-h-svh w-full max-w-7xl grid-rows-[1fr_auto] gap-6 px-6 pb-10 pt-28 md:px-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:pt-32">
//         {/* Left column (copy) */}
//         <div className="lg:col-span-7">
//           <motion.h2
//             {...fade(0.05)}
//             className="text-[11px] md:text-xs font-semibold tracking-[0.35em] text-neutral-200/90 uppercase"
//           >
//             Empowering Ideas, Powered by
//           </motion.h2>

//           <motion.h1
//             {...fade(0.12)}
//             className="mt-3 text-5xl md:text-8xl leading-[0.95] font-brand font-normal text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
//           >
//             ember.<span className="align-top"></span>
//           </motion.h1>

//           <motion.p
//             {...fade(0.2)}
//             className="mt-5 max-w-xl text-[11px] md:text-xs font-bold tracking-[0.28em] text-neutral-100/90 uppercase"
//           >
//             For Those Who Demand The Extraordinary.
//           </motion.p>

//           {/* CTAs */}
//           <motion.div
//             {...fade(0.28)}
//             className="mt-8 flex flex-wrap items-center gap-3"
//           >
//             <a
//               href="/contact"
//               className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-black hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition"
//               aria-label="Start a project with Ember"
//             >
//               Start a project
//             </a>
//             <a
//               href="#work"
//               className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 backdrop-blur-md transition"
//               aria-label="See selected work"
//             >
//               See work
//             </a>
//           </motion.div>
//         </div>

//         {/* Right column – optional highlight card (kept, but clean & minimal) */}
//         <motion.aside
//           {...fade(0.22)}
//           className="lg:col-span-5 lg:justify-self-end"
//         >
//           <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
//             <ul className="grid grid-cols-2 gap-3 text-sm text-white/90 md:gap-4">
//               <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
//                 <span className="block text-xs text-white/60 uppercase tracking-widest">
//                   Disciplines
//                 </span>
//                 <span className="mt-1 block font-medium">
//                   Brand · Product · Web
//                 </span>
//               </li>
//               <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
//                 <span className="block text-xs text-white/60 uppercase tracking-widest">
//                   Engagement
//                 </span>
//                 <span className="mt-1 block font-medium">Studio + Venture</span>
//               </li>
//               <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
//                 <span className="block text-xs text-white/60 uppercase tracking-widest">
//                   Timeline
//                 </span>
//                 <span className="mt-1 block font-medium">4–12 weeks</span>
//               </li>
//               <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
//                 <span className="block text-xs text-white/60 uppercase tracking-widest">
//                   Location
//                 </span>
//                 <span className="mt-1 block font-medium">Global / Remote</span>
//               </li>
//             </ul>

//             <a
//               href="/discovery"
//               className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/90 px-4 py-3 text-sm font-medium text-black hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition"
//             >
//               Book a discovery call
//             </a>
//           </div>
//         </motion.aside>
//       </div>

//       {/* Scroll cue */}
//       <motion.a
//         {...fade(0.45)}
//         href="#work"
//         aria-label="Scroll to content"
//         className="group absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-white/70 hover:text-white"
//       >
//         <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
//         <svg
//           className="mt-2 h-5 w-5 animate-bounce"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           aria-hidden="true"
//         >
//           <path d="M10 14a1 1 0 0 1-.7-.3l-6-6a1 1 0 1 1 1.4-1.4L10 11.6l5.3-5.3a1 1 0 0 1 1.4 1.4l-6 6a1 1 0 0 1-.7.3z" />
//         </svg>
//       </motion.a>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import React from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Premium Cinematic Hero for Ember
 * - Full-bleed media (image or video) with parallax and scrims
 * - Per-line headline reveal (fast + intentional)
 * - Luxe glass card with key facts
 * - Magnetic primary CTA + soft secondary CTA
 * - Scroll cue and tasteful grain
 * - Respects reduced motion
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hero"
        aria-label="Ember hero"
        className="relative isolate min-h-svh overflow-hidden"
      >
        <MediaBackdrop />
        <HeroContent />
        <ScrollCue />
      </section>
    </MotionConfig>
  );
}

/* ---------------------------------------------
 * Media backdrop with parallax + scrims + grain
 * --------------------------------------------- */
function MediaBackdrop() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]); // gentle parallax on scroll

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 -z-20">
      {/* Swap to <video> if you prefer */}
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/emberheroimage.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic scrims for legibility */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_30%,rgba(0,0,0,0.35),transparent)]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 opacity-[0.05] bg-[url('/textures/noise.png')] mix-blend-soft-light" />
    </div>
  );
}

/* ---------------------------------------------
 * Foreground content
 * --------------------------------------------- */
function HeroContent() {
  const container = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 98%", "start 68%"],
  });
  // const progress = useSpring(scrollYProgress, {
  //   stiffness: 160,
  //   damping: 18,
  //   mass: 0.35,
  // });
  const progress = scrollYProgress;

  return (
    <div
      ref={container}
      className="relative mx-auto grid min-h-svh w-full max-w-7xl grid-rows-[1fr_auto] gap-6 px-6 pb-12 pt-28 md:px-10 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:pt-32"
    >
      {/* Left column */}
      <div className="lg:col-span-7">
        <Eyebrow text="Brand · Product · Web" />

        <AnimatedHeadline
          lines={[
            <>Empowering ideas,</>,
            <>
              <span className="font-semibold">
                powered by{" "}
                <span className="font-brand font-normal lg:text-8xl">
                  ember
                </span>
                .
              </span>
            </>,
          ]}
          emphasisIndex={undefined}
          ariaLabel="Empowering ideas, powered by Ember."
          className="mt-3 text-3xl md:text-5xl lg:text-6xl leading-[1.02] font-normal text-white max-w-[16ch]"
          progress={progress}
        />

        <motion.p
          style={{
            opacity: useTransform(progress, [0, 1], [0, 1]),
            y: useTransform(progress, [0, 1], [12, 0]),
          }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-5 max-w-xl text-[11px] md:text-xs font-bold tracking-[0.28em] text-neutral-100/90 uppercase"
        >
          For those who demand the extraordinary.
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <MagneticButton
            href="/contact"
            ariaLabel="Start a project with Ember"
          >
            Start a project
          </MagneticButton>
          <GhostButton href="#work" ariaLabel="See selected work">
            See work
          </GhostButton>
        </div>
      </div>

      {/* Right column */}
      <motion.aside
        initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
        className="lg:col-span-5 lg:justify-self-end"
      >
        <GlassCard />
      </motion.aside>
    </div>
  );
}

function Eyebrow({ text }: { text: string }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
      className="text-[11px] md:text-xs font-semibold tracking-[0.35em] text-neutral-200/90 uppercase"
    >
      {text}
    </motion.h2>
  );
}

/* ---------------------------------------------
 * Per-line headline reveal
 * --------------------------------------------- */
function AnimatedHeadline({
  lines,
  className,
  emphasisIndex,
  progress,
  ariaLabel,
}: {
  lines: React.ReactNode[]; // allow strings AND JSX
  className?: string;
  emphasisIndex?: number;
  progress: any;
  ariaLabel?: string;
}) {
  // If lines include JSX, provide ariaLabel explicitly (we already pass it in usage)
  const label = ariaLabel;
  return (
    <h1 className={className} aria-label={label}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            style={{
              y: useTransform(progress, [0, 1], [18, 0]),
              opacity: useTransform(progress, [0, 1], [0, 1]),
            }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
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

/* ---------------------------------------------
 * Luxe glass facts card
 * --------------------------------------------- */
function GlassCard() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
      <ul className="grid grid-cols-2 gap-3 text-sm text-white/90 md:gap-4">
        <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <span className="block text-xs text-white/60 uppercase tracking-widest">
            Disciplines
          </span>
          <span className="mt-1 block font-medium">Brand · Product · Web</span>
        </li>
        <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <span className="block text-xs text-white/60 uppercase tracking-widest">
            Engagement
          </span>
          <span className="mt-1 block font-medium">Studio + Venture</span>
        </li>
        <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <span className="block text-xs text-white/60 uppercase tracking-widest">
            Timeline
          </span>
          <span className="mt-1 block font-medium">4–12 weeks</span>
        </li>
        <li className="rounded-2xl border border-white/10 bg-black/30 p-4">
          <span className="block text-xs text-white/60 uppercase tracking-widest">
            Location
          </span>
          <span className="mt-1 block font-medium">Global / Remote</span>
        </li>
      </ul>

      <div className="mt-4">
        <MagneticButton href="/discovery" ariaLabel="Book a discovery call">
          Book a discovery call
        </MagneticButton>
      </div>
    </div>
  );
}

/* ---------------------------------------------
 * CTAs
 * --------------------------------------------- */
function MagneticButton({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const [mx, setMx] = React.useState(0);
  const [my, setMy] = React.useState(0);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setMx(dx);
    setMy(dy);
  };

  return (
    <a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setMx(0);
        setMy(0);
      }}
      className="relative inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-medium text-black transition"
      style={{
        transform: `translate(${mx * 6}px, ${my * 6}px)`,
        boxShadow: `0 0 0 1px rgba(255,255,255,0.2), 0 10px 40px -10px rgba(255,255,255,0.5)`,
      }}
    >
      {children}
    </a>
  );
}

function GhostButton({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 backdrop-blur-md transition"
    >
      {children}
    </a>
  );
}

/* ---------------------------------------------
 * Scroll cue
 * --------------------------------------------- */
function ScrollCue() {
  return (
    <motion.a
      initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
      href="#work"
      aria-label="Scroll to content"
      className="group absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex flex-col items-center text-white/70 hover:text-white"
    >
      <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
      <svg
        className="mt-2 h-5 w-5 animate-bounce"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 14a1 1 0 0 1-.7-.3l-6-6a1 1 0 1 1 1.4-1.4L10 11.6l5.3-5.3a1 1 0 0 1 1.4 1.4l-6 6a1 1 0 0 1-.7.3z" />
      </svg>
    </motion.a>
  );
}
