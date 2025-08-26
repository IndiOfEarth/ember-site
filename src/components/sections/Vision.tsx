import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { visionCards } from "@/lib/data";

export default function Vision() {
  return (
    <section id="vision" className="py-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-widest text-ember-900">
            OUR VISION?
            <br />
            <span className="font-normal text-ember-100">
              TO ELEVATE DIGITAL EXPERIENCES.
            </span>
          </h2>
          <p className="mt-3 text-xs tracking-widest font-normal text-ember-100/40">
            SEE WHAT MAKES EMBER DIFFERENT TO OTHERS
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visionCards.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="py-18 text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-white/10 grid place-items-center">
                <Icon className="w-7 h-7 text-ember-400" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="mt-8 text-ember-100/76 text-xs font-medium tracking-wider leading-relaxed uppercase">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
