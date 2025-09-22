import Container from "@/components/ui/Container";
import Carousel from "@/components/ui/Carousel";
import { processSlides } from "@/lib/data";

import NeonCarousel from "../neon/NeonCarousel";

const items = [
  {
    id: 1,
    title: "Build.",
    body: "We bring ideas to life with precision and care...\nFrom refining brand executions to full-stack products.",
  },
  {
    id: 2,
    title: "Design.",
    body: "Rooted in strategic clarity, we craft design systems that unify brand expression and UX. Every element is considered, refined, intuitive.",
  },
  {
    id: 3,
    title: "Strategy.",
    body: "With insight as our guide, we define what we’re building and why it matters — aligning decisions to move your brand forward.",
  },
  {
    id: 4,
    title: "Build.",
    body: "We bring ideas to life with precision and care...\nFrom refining brand executions to full-stack products.",
  },
  {
    id: 5,
    title: "Design.",
    body: "Rooted in strategic clarity, we craft design systems that unify brand expression and UX. Every element is considered, refined, intuitive.",
  },
  {
    id: 6,
    title: "Strategy.",
    body: "With insight as our guide, we define what we’re building and why it matters — aligning decisions to move your brand forward.",
  },
  // add more…
];

export default function Process() {
  return (
    <section id="process" className="py-24">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-normal tracking-widest text-ember-100 inline-block leading-tight uppercase">
            Every Business is{" "}
            <span className="font-semibold text-ember-100">DIFFERENT</span>, We
            Power Your{" "}
            <span className="font-semibold text-ember-100">VISION</span>
          </h2>
          <p className="mt-2 text-ember-500 font-semibold">
            CREATION by ember.
          </p>
          <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50 uppercase">
            Our creative process is one of continuous growth and improvement.
            Get an insight into how we work.
          </p>
        </div>
        <div className="mt-3">{/* <Carousel items={processSlides} /> */}</div>
        <main className="min-h-screen text-white p-6">
          <NeonCarousel items={items} />
        </main>
      </Container>
    </section>
  );
}
