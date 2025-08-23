export default function DiscoveryPage() {
  return (
    <section className="container py-24">
      <h1 className="text-4xl md:text-5xl font-semibold">
        Book a Discovery Call
      </h1>
      <p className="mt-3 max-w-2xl text-neutral-400">
        Tell us about your vision and we’ll map the path from idea to launch.
        Choose a time that suits you below.
      </p>
      {/* Embed Calendly/Cal.com here */}
      <div className="mt-8 card p-6">
        <p className="text-sm text-neutral-400">
          Embed your scheduling widget here (Cal.com, Calendly, etc.).
        </p>
      </div>
    </section>
  );
}
