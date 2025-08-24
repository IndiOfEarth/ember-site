// navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import Container from "@/components/ui/Container";
import { Flame } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setScrolled(window.scrollY > 8); // 2px buffer avoids flicker
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    // set initial state on mount
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all",
        scrolled
          ? "backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/5"
          : "bg-transparent border-transparent backdrop-blur-0",
      ].join(" ")}
    >
      <Container className="grid items-center grid-cols-[1fr_auto_1fr] py-8 px-12">
        <Link href="/" className="justify-self-start flex items-center gap-2">
          <Flame className="w-5 h-5 text-ember-500" />
          <span className="font-brand text-2xl lowercase">ember.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 justify-self-center">
          {copy.nav.links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-neutral-300 hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href={copy.nav.network.href}
          className="justify-self-end text-xs font-medium bg-ember-200 rounded-full inset-shadow-sm inset-shadow-ember-100/25 border border-white/10 px-3.5 py-3 hover:border-ember-500/50 transition"
        >
          {copy.nav.network.label}
        </Link>
      </Container>
    </div>
  );
}
