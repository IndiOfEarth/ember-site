import Container from "@/components/ui/Container";
import { packages, tools } from "@/lib/data";

function Tier({ name, items }: { name: string; items: readonly string[] }) {
  return (
    <div className="card p-5">
      <h4 className="font-semibold">{name}</h4>
      <ul className="mt-2 space-y-1 text-sm text-neutral-300 list-disc list-inside">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductsPackages() {
  return (
    <section className="py-24">
      <Container>
        <div className="max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-semibold">
            Any idea can be powered by ember. Your brand. Your website. Your
            app. Your vision.
          </h2>
          <p className="mt-3 text-neutral-400">
            Find out how ember can power your business
          </p>
        </div>

        {/* 3x3 interactive matrix */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {packages.branding.tiers.map((t) => (
            <Tier key={t.name} {...t} />
          ))}
          {packages.webapp.tiers.map((t) => (
            <Tier key={t.name} {...t} />
          ))}
          {packages.retainers.tiers.map((t) => (
            <Tier key={t.name} {...t} />
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-semibold">Tools & Integrations</h3>
          <p className="mt-2 text-neutral-400">
            Ember ensures you’re business is powered by modern, scalable
            technologies tailored to your company.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {tools.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
