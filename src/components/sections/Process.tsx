import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import { processSlides } from "@/lib/data";

export default function Process() {
  return (
    <section id="process" className="py-24">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Every Business is Different, We Power Your Vision
          </h2>
          <p className="mt-2 text-ember-500 font-semibold">
            CREATION by ember.
          </p>
          <p className="mt-3 text-neutral-400">
            Our creative process is one of continuous growth and improvement.
            Get an insight into how we work.
          </p>
        </div>
        <div className="mt-10">
          <Carousel items={processSlides} />
        </div>
      </Container>
    </section>
  );
}
