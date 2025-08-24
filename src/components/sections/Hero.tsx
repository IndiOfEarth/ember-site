import Image from "next/image";
import Container from "@/components/ui/Container";
import CTAButton from "@/components/ui/CTAButton";
import { copy } from "@/lib/copy";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-screen flex items-center"
    >
      <Image
        src="/images/emberheroimage.png"
        alt="ember hero"
        fill
        priority
        className="object-cover opacity-100 -z-10"
      />
      <div className="absolute inset-0 opacity-30 -z-10" />

      <Container className="text-center">
        {/* <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
          <span className="w-2 h-2 rounded-full bg-ember-900 animate-pulse" />
          {copy.brand.tagline}
        </div> */}

        <h1 className="mt-6 text-3xl md:text-2xl text-ember-100 tracking-wider font-normal">
          {copy.hero.title}
        </h1>

        <h1 className="mt-2 text-3xl md:text-7xl text-ember-100 tracking-normal font-brand">
          ember.{" "}
        </h1>

        <p className="mt-4 text-xs font-bold tracking-widest text-neutral-300 max-w-3xl mx-auto">
          FOR THOSE WHO DEMAND THE EXTRAORDINARY.
        </p>

        <div className="mt-10 flex justify-center">
          <CTAButton href={copy.hero.cta.href} size="sm" variant="primary">
            {copy.hero.cta.label}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}
