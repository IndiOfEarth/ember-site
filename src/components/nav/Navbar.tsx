// // navbar.tsx
// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { copy } from "@/lib/copy";
// import Container from "@/components/ui/Container";
// import { Flame } from "lucide-react";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     let ticking = false;

//     const update = () => {
//       setScrolled(window.scrollY > 8); // 2px buffer avoids flicker
//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(update);
//         ticking = true;
//       }
//     };

//     // set initial state on mount
//     update();

//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <div
//       className={[
//         "fixed top-0 left-0 right-0 z-50 transition-all",
//         scrolled
//           ? "backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/5"
//           : "bg-transparent border-transparent backdrop-blur-0",
//       ].join(" ")}
//     >
//       <Container className="grid items-center grid-cols-[1fr_auto_1fr] py-8 px-12">
//         <Link href="/" className="justify-self-start flex items-center gap-2">
//           <Flame className="w-5 h-5 text-ember-500" />
//           <span className="font-brand text-2xl lowercase">ember.</span>
//         </Link>

//         <nav className="hidden md:flex items-center gap-8 justify-self-center">
//           {copy.nav.links.map((l) => (
//             <Link
//               key={l.label}
//               href={l.href}
//               className="text-sm text-neutral-300 hover:text-white transition"
//             >
//               {l.label}
//             </Link>
//           ))}
//         </nav>

//         <Link
//           href={copy.nav.network.href}
//           className="justify-self-end text-xs font-medium bg-ember-200 rounded-full inset-shadow-sm inset-shadow-ember-100/25 border border-white/10 px-3.5 py-3 hover:border-ember-500/50 transition"
//         >
//           {copy.nav.network.label}
//         </Link>
//       </Container>
//     </div>
//   );
// }

// Navbar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import Container from "@/components/ui/Container";
import { Flame, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // ReduceMotion helper
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 8);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <div
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-950/55 border-b border-white/10"
          : "bg-transparent border-transparent",
      ].join(" ")}
      role="banner"
    >
      <Container className="flex items-center justify-between py-5 md:py-6 px-6 md:px-10">
        {/* Brand */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-md"
          aria-label="Ember home"
        >
          <span className="relative flex h-6 w-6 items-center justify-center">
            {/* Subtle glowing orb behind flame */}
            <span className="absolute inset-0 rounded-full bg-ember-500/20 blur-md" />
            <Flame className="relative h-5 w-5 text-ember-400 group-hover:text-ember-300 transition-colors" />
          </span>
          <span className="font-brand text-2xl lowercase tracking-tight text-white">
            ember<span className="opacity-90">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {copy.nav.links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="group relative text-sm text-neutral-200/90 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded-sm"
            >
              <span>{l.label}</span>
              {/* Luxury ink underline */}
              <span className="pointer-events-none absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
            </Link>
          ))}

          {/* CTA pill */}
          <Link
            href={copy.nav.network.href}
            className="ml-2 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white/90 hover:bg-white/15 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_8px_24px_rgba(0,0,0,.25)] transition"
          >
            {copy.nav.network.label}
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 backdrop-blur-md"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        aria-hidden={!open}
        className={[
          "md:hidden fixed inset-0 z-40",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={[
            "absolute inset-0 bg-black/40",
            prefersReduced ? "" : open ? "animate-fadeIn" : "opacity-0",
          ].join(" ")}
        />

        {/* Panel */}
        <div
          className={[
            "absolute right-0 top-0 h-full w-[84%] max-w-sm bg-neutral-950/80 backdrop-blur-xl border-l border-white/10 p-6 flex flex-col gap-6",
            prefersReduced
              ? ""
              : open
              ? "animate-slideIn"
              : "translate-x-full opacity-0",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2"
            >
              <Flame className="h-5 w-5 text-ember-400" />
              <span className="font-brand text-xl lowercase text-white">
                ember.
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="mt-2 flex flex-col gap-2">
            {copy.nav.links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-base text-neutral-100/90 hover:text-white hover:bg-white/10 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Link
              href={copy.nav.network.href}
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 hover:bg-white/15 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,.15),0_8px_24px_rgba(0,0,0,.25)] transition"
            >
              {copy.nav.network.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Keyframes (co-located for convenience) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 220ms ease-out both;
        }
        .animate-slideIn {
          animation: slideIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </div>
  );
}
