import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { visionCards } from "@/lib/data";

export default function Vision() {
  return (
    <section id="vision" className="py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Our Vision?{" "}
            <span className="text-ember-500">
              To Elevate Digital Experiences
            </span>
          </h2>
          <p className="mt-3 text-neutral-400">
            See what makes ember different to others
          </p>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionCards.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="p-8 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-white/10 grid place-items-center">
                <Icon className="w-7 h-7 text-ember-400" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
