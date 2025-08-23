import Container from "@/components/ui/Container";

export default function SectionBreak() {
  return (
    <section className="py-20">
      <Container className="text-center">
        <div className="inline-flex items-center gap-3">
          <div className="h-0.5 w-10 bg-ember-500" />
          <span className="uppercase tracking-widest text-xs text-neutral-400">
            powered by ember.
          </span>
          <div className="h-0.5 w-10 bg-ember-500" />
        </div>
        <h2 className="mt-4 text-4xl md:text-5xl font-semibold">
          Distinctive by Design.
        </h2>
      </Container>
    </section>
  );
}
