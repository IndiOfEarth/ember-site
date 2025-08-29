"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { visionCards } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;

    const section = sectionRef.current!;
    const mm = gsap.matchMedia();

    // Animate only if user allows motion
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // HEADLINE: fade+rise + mask-sweep on each line
        const head = section.querySelector(".vision-head") as HTMLElement;
        const lines = head?.querySelectorAll<HTMLElement>(".vision-line") ?? [];
        lines.forEach((l) => l.classList.add("mask-reveal"));

        // force starting state for the sweep
        gsap.set(lines, { "--reveal": "0%" });

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
          .to(
            lines,
            {
              "--reveal": "100%",
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
            },
            0.1
          )
          .set(head, { clearProps: "transform" }, ">");

        // CARDS: batch fade+rise + tiny scale-in, add class when revealed
        ScrollTrigger.batch(section.querySelectorAll(".vision-card"), {
          start: "top 80%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              onStart() {
                els.forEach((el) => el.classList.add("is-revealed"));
              },
              onComplete() {
                gsap.set(els, { clearProps: "transform,scale" });
              },
            }),
        });

        // ICON PARALLAX: subtle drift (scrubbed)
        section
          .querySelectorAll<HTMLElement>(".vision-icon")
          .forEach((icon) => {
            gsap.fromTo(
              icon,
              { yPercent: 0 },
              {
                yPercent: -15,
                ease: "none",
                scrollTrigger: {
                  trigger: icon,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                },
              }
            );
          });

        // UNDERLINE scrub as progress
        const underline =
          section.querySelector<HTMLElement>(".vision-underline");
        if (underline) {
          gsap.fromTo(
            underline,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 60%",
                scrub: true,
              },
            }
          );
        }
      }, section);

      return () => ctx.revert();
    });

    // Reduced motion: show without animating
    mm.add("(prefers-reduced-motion: reduce)", () => {
      section
        .querySelector(".vision-head")
        ?.classList.remove("opacity-0", "translate-y-6");
      section.querySelectorAll(".vision-card").forEach((el) => {
        el.classList.remove("opacity-0", "translate-y-6", "scale-[0.98]");
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="py-32 scroll-mt-24 relative"
    >
      {/* subtle section separator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <Container>
        {/* Heading block (starts hidden) */}
        <div className="max-w-2xl mx-auto text-center vision-head will-change-[transform,opacity]">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-widest text-ember-900 inline-block">
            <span className="vision-line block">OUR VISION?</span>
            <span className="vision-line block font-normal text-ember-100">
              TO ELEVATE DIGITAL EXPERIENCES.
            </span>
          </h2>
          <div className="vision-underline mt-4 h-[3px] w-44 mx-auto bg-ember-500/60 rounded-full scale-x-0 origin-left" />
          <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50">
            SEE WHAT MAKES EMBER DIFFERENT TO OTHERS
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visionCards.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="vision-card opacity-0 translate-y-6 scale-[0.98] py-16 md:py-20 text-center transition-transform will-change-[transform,opacity] hover:-translate-y-1"
            >
              <div className="vision-icon mx-auto w-14 h-14 rounded-2xl bg-white/10 grid place-items-center">
                <Icon className="w-7 h-7 text-ember-400" />
              </div>
              <h3 className="mt-5 text-[1.35rem] md:text-2xl font-semibold leading-tight bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent">
                {title}
              </h3>
              <p className="mt-6 text-ember-100/80 text-[0.85rem] md:text-sm font-medium tracking-[0.18em] leading-relaxed uppercase">
                {text}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// import Container from "@/components/ui/Container";
// import Card from "@/components/ui/Card";
// import { visionCards } from "@/lib/data";

// export default function Vision() {
//   return (
//     <section id="vision" className="py-32">
//       <Container>
//         <div className="max-w-2xl mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-semibold tracking-widest text-ember-900">
//             OUR VISION?
//             <br />
//             <span className="font-normal text-ember-100">
//               TO ELEVATE DIGITAL EXPERIENCES.
//             </span>
//           </h2>
//           <p className="mt-9 text-xs tracking-widest font-normal text-ember-100/40">
//             SEE WHAT MAKES EMBER DIFFERENT TO OTHERS
//           </p>
//         </div>
//         <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {visionCards.map(({ icon: Icon, title, text }) => (
//             <Card key={title} className="py-16 text-center">
//               <div className="mx-auto w-14 h-14 rounded-2xl bg-white/10 grid place-items-center">
//                 <Icon className="w-7 h-7 text-ember-400" />
//               </div>
//               <h3 className="mt-4 text-2xl font-semibold bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent">
//                 {title}
//               </h3>
//               <p className="mt-8 text-ember-100/76 text-sm font-medium tracking-wider leading-relaxed uppercase">
//                 {text}
//               </p>
//             </Card>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
