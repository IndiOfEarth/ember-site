import Image from "next/image";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { copy } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="relative isolate">
      {/* background image (replace with your asset) */}
      <Image
        src="/images/emberheroimage.png"
        alt="ember hero"
        fill
        priority
        className="object-cover opacity-40 -z-10"
      />
      <div className="absolute inset-0 grid-overlay opacity-30 -z-10" />

      <Container className="pt-28 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-ember-500 animate-pulse" />
          {copy.brand.tagline}
        </div>
        <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight">
          {copy.hero.title}
        </h1>
        <p className="mt-4 text-lg text-neutral-300 max-w-3xl mx-auto">
          For those who demand the extraordinary.
        </p>
        <div className="mt-10 flex justify-center">
          <CTAButton href={copy.hero.cta.href}>{copy.hero.cta.label}</CTAButton>
        </div>
      </Container>
    </section>
  );
}
