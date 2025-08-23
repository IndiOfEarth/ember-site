"use client";
import Link from "next/link";
import { copy } from "@/lib/copy";
import Container from "@/components/ui/Container";
import { Flame } from "lucide-react";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-white/5">
      <Container className="flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-ember-500" />
          <span className="font-semibold lowercase">ember</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
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
          className="text-sm rounded-xl border border-white/10 px-3 py-1.5 hover:border-ember-500/50 transition"
        >
          {copy.nav.network.label}
        </Link>
      </Container>
    </div>
  );
}
