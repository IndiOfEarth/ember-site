"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import MagicBento from "./MagicBento";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const section = sectionRef.current!;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // HEADLINE: fade+rise + mask sweep (same pattern as Vision)
        const head = section.querySelector(".features-head") as HTMLElement;
        const lines =
          head?.querySelectorAll<HTMLElement>(".features-line") ?? [];
        lines.forEach((l) => l.classList.add("mask-reveal"));

        gsap
          .timeline({
            scrollTrigger: { trigger: section, start: "top 70%", once: true },
          })
          .from(
            head,
            {
              opacity: 0,
              y: 24,
              duration: 0.6,
              ease: "power2.out",
              immediateRender: false,
            },
            0
          )
          .fromTo(
            lines,
            { "--reveal": "0%" },
            {
              "--reveal": "100%",
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
            },
            0.1
          )
          .set(head, { clearProps: "transform" }, ">");

        // BENTO WRAPPER: soft reveal of the whole grid
        const grid = section.querySelector(".features-bento");
        if (grid) {
          gsap.from(grid, {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 75%",
              once: true,
            },
          });
        }

        // BENTO CARDS: batch in (fade + rise + tiny scale), add a class when shown
        const cards = section.querySelectorAll(".features-bento .card");
        if (cards.length) {
          ScrollTrigger.batch(cards, {
            start: "top 80%",
            once: true,
            onEnter: (els) =>
              gsap.fromTo(
                els,
                { opacity: 0, y: 24, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.7,
                  ease: "power2.out",
                  stagger: 0.06,
                  onStart() {
                    els.forEach((el) => el.classList.add("is-revealed"));
                  },
                  onComplete() {
                    gsap.set(els, { clearProps: "transform,scale,opacity" });
                  },
                }
              ),
          });
        }
      }, section);

      return () => ctx.revert();
    });

    // Reduced motion: no animation, just ensure visible
    mm.add("(prefers-reduced-motion: reduce)", () => {
      section
        .querySelector(".features-head")
        ?.classList.remove("opacity-0", "translate-y-6");
      section.querySelectorAll(".features-bento .card").forEach((el) => {
        el.classList.remove("opacity-0", "translate-y-6", "scale-[0.98]");
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-36 scroll-mt-24 relative"
    >
      {/* subtle section separators */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ambient brand glow behind bento */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[radial-gradient(closest-side,rgba(255,127,0,0.10),transparent_70%)] blur-3xl" />
      </div>

      <Container>
        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center features-head will-change-[transform,opacity]">
          <h2 className="text-2xl md:text-3xl font-normal tracking-widest text-ember-100 inline-block leading-tight">
            <span className="features-line block">
              PURPOSEFUL{" "}
              <span className="font-semibold text-ember-100">DESIGN</span>,
              SCALABLE{" "}
              <span className="font-semibold text-ember-100">SOFTWARE</span>.
            </span>
            <span className="features-line block">
              YOUR{" "}
              <span className="font-semibold text-ember-100">BUSINESS</span>.
              YOUR <span className="font-semibold text-ember-100">BRAND</span>.
            </span>
          </h2>
          <div className="mt-4 h-[3px] w-44 mx-auto bg-ember-500/60 rounded-full vision-underline scale-x-0 origin-left" />
          <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50">
            EXPLORE OFFERINGS POWERED BY EMBER.
          </p>
        </div>

        {/* Bento */}
        <div className="features-bento mt-14 md:mt-16 will-change-[transform,opacity]">
          <MagicBento
            textAutoHide
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism={false}
            clickEffect
            spotlightRadius={500}
            particleCount={12}
            glowColor="255, 127, 0"
          />
        </div>
      </Container>
    </section>
  );
}

// import Container from "@/components/ui/Container";
// import MagicBento from "./MagicBento";

// export default function Features() {
//   return (
//     <section id="features" className="py-24">
//       <Container>
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-2xl md:text-3xl font-normal tracking-widest text-ember-100">
//             PURPOSEFUL{" "}
//             <span className="font-semibold text-ember-100">DESIGN</span>,
//             SCALABLE{" "}
//             <span className="font-semibold text-ember-100">SOFTWARE</span>.
//             <br />
//             YOUR <span className="font-semibold text-ember-100">BUSINESS</span>.
//             YOUR <span className="font-semibold text-ember-100">BRAND</span>.
//           </h2>
//           <p className="mt-9 text-xs tracking-widest font-normal text-ember-100/40">
//             EXPLORE OFFERINGS POWERED BY EMBER.
//           </p>
//         </div>
//         <MagicBento
//           textAutoHide={true}
//           enableStars={true}
//           enableSpotlight={true}
//           enableBorderGlow={true}
//           enableTilt={true}
//           enableMagnetism={false}
//           clickEffect={true}
//           spotlightRadius={500}
//           particleCount={12}
//           glowColor="255, 127, 0"
//         />
//       </Container>
//     </section>
//   );
// }
