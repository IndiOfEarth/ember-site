import Image from "next/image";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import CTAButton from "@/components/ui/CTAButton";
import { featureCards } from "@/lib/data";

export default function Features() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
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
        </div>
      </Container>
    </section>
  );
}
