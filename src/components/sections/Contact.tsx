import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";

export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <Card>
            <h3 className="text-2xl font-semibold">
              Let’s build something extraordinary
            </h3>
            <p className="mt-2 text-neutral-400">
              Share a bit about your project and we’ll reach out within one
              business day.
            </p>
            <form className="mt-6 space-y-4">
              <input
                required
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:shadow-glow"
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:shadow-glow"
              />
              <input
                placeholder="Company (optional)"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:shadow-glow"
              />
              <textarea
                rows={5}
                placeholder="Tell us about your vision"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:shadow-glow"
              />
              <button className="w-full rounded-xl bg-ember-500 text-white font-medium py-3 hover:brightness-110">
                Send message
              </button>
            </form>
          </Card>

          <Card>
            <h4 className="font-semibold">Prefer a quick call?</h4>
            <p className="mt-2 text-neutral-400">
              Jump straight into a discovery session and we’ll align on scope,
              budget, and timeline.
            </p>
            <a
              href="/discovery"
              className="mt-4 inline-flex rounded-xl px-4 py-2 border border-white/10 bg-white/5 hover:border-ember-500/50"
            >
              Book a discovery call
            </a>
            <div className="mt-8 text-sm text-neutral-400">
              <p>Response time: within 24 hours</p>
              <p>Timezone: Europe/London</p>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
