import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import CTAButton from "@/components/ui/CTAButton";
import MagicBento from "./MagicBento";
import { featureCards } from "@/lib/data";

export default function Features() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-normal tracking-widest text-ember-100">
            PURPOSEFUL{" "}
            <span className="font-semibold text-ember-100">DESIGN</span>,
            SCALABLE{" "}
            <span className="font-semibold text-ember-100">SOFTWARE</span>.
            <br />
            YOUR <span className="font-semibold text-ember-100">BUSINESS</span>.
            YOUR <span className="font-semibold text-ember-100">BRAND</span>.
          </h2>
          <p className="mt-5 text-xs tracking-widest font-normal text-ember-100/40">
            EXPLORE OFFERINGS POWERED BY EMBER.
          </p>
        </div>
        <MagicBento
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={300}
          particleCount={12}
          glowColor="255, 127, 0"
        />
        {/* <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featureCards.map((f) => (
            <Card key={f.title} className="overflow-hidden p-0">
              <div className="relative h-40">
                <Image
                  src={f.img}
                  alt={f.title}
                  fill
                  className="object-cover opacity-70"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-neutral-400 text-sm">{f.sub}</p>
                <CTAButton href={f.cta.href} className="mt-4 text-sm">
                  {f.cta.label}
                </CTAButton>
              </div>
            </Card>
          ))}
        </div> */}
      </Container>
    </section>
  );
}
