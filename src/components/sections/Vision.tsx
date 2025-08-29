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

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        // HEADLINE: fade+rise + mask sweep (same pattern you have)
        const head = section.querySelector(".vision-head") as HTMLElement;
        const lines = head?.querySelectorAll<HTMLElement>(".vision-line") ?? [];
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

        // GRID WRAPPER: soft reveal (like Features' .features-bento)
        const grid = section.querySelector(".vision-grid");
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

        // VISION CARDS: same batch animation as Features' bento cards
        const cards = section.querySelectorAll(".vision-grid .vision-card");
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
                  stagger: 0.06, // match Features’ stagger
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

        // ICON PARALLAX (subtle)
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

        // UNDERLINE progress scrub
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

    // Reduced motion: ensure visible, no animation
    mm.add("(prefers-reduced-motion: reduce)", () => {
      section.querySelector(".vision-head")?.classList.remove("translate-y-6");
      section
        .querySelectorAll(".vision-grid .vision-card")
        .forEach((el) => el.classList.remove("translate-y-6"));
    });

    return () => mm.revert();
  }, []);

  // Helps ScrollTrigger after bfcache restore
  useEffect(() => {
    const onShow = () => ScrollTrigger.refresh(true);
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
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
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center vision-head will-change-[transform,opacity]">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-widest text-ember-900 inline-block">
            <span className="vision-line block">OUR VISION?</span>
            <span className="vision-line block font-normal text-ember-100">
              TO ELEVATE DIGITAL EXPERIENCES.
            </span>
          </h2>
          <div className="vision-underline mt-4 h-[3px] w-44 mx-auto bg-ember-500/60 rounded-full scale-x-0 origin-left" />
          <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50">
            SEE WHAT MAKES EMBER DIFFERENT.
          </p>
        </div>

        {/* Cards (wrapped so the grid can have its own reveal) */}
        <div className="vision-grid mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {visionCards.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="vision-card py-16 md:py-20 text-center transition-transform will-change-[transform,opacity] hover:-translate-y-5"
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

// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Container from "@/components/ui/Container";
// import Card from "@/components/ui/Card";
// import { visionCards } from "@/lib/data";

// gsap.registerPlugin(ScrollTrigger);

// export default function Vision() {
//   const sectionRef = useRef<HTMLElement>(null);
//   const didInit = useRef(false);

//   useEffect(() => {
//     if (didInit.current) return;
//     didInit.current = true;

//     const section = sectionRef.current!;
//     const mm = gsap.matchMedia();

//     mm.add("(prefers-reduced-motion: no-preference)", () => {
//       const ctx = gsap.context(() => {
//         // HEADLINE: fade+rise + mask-sweep
//         const head = section.querySelector(".vision-head") as HTMLElement;
//         const lines = head?.querySelectorAll<HTMLElement>(".vision-line") ?? [];
//         lines.forEach((l) => l.classList.add("mask-reveal"));

//         gsap
//           .timeline({
//             scrollTrigger: { trigger: section, start: "top 70%", once: true },
//           })
//           .from(
//             head,
//             {
//               opacity: 0,
//               y: 24,
//               duration: 0.6,
//               ease: "power2.out",
//               immediateRender: false,
//             },
//             0
//           )
//           .fromTo(
//             lines,
//             { "--reveal": "0%" },
//             {
//               "--reveal": "100%",
//               duration: 0.8,
//               ease: "power2.out",
//               stagger: 0.1,
//             },
//             0.1
//           )
//           .set(head, { clearProps: "transform" }, ">");

//         // VISION CARDS: batch fade+rise + tiny scale-in, add a reveal class
//         const cards = section.querySelectorAll(".vision-card");
//         if (cards.length) {
//           ScrollTrigger.batch(cards, {
//             start: "top 80%",
//             once: true,
//             onEnter: (els) =>
//               gsap.fromTo(
//                 els,
//                 { opacity: 0, y: 24, scale: 0.98 },
//                 {
//                   opacity: 1,
//                   y: 0,
//                   scale: 1,
//                   duration: 0.7,
//                   ease: "power2.out",
//                   stagger: 0.08,
//                   onStart() {
//                     els.forEach((el) => el.classList.add("is-revealed"));
//                   },
//                   onComplete() {
//                     gsap.set(els, { clearProps: "transform,scale,opacity" });
//                   },
//                 }
//               ),
//           });
//         }

//         // ICON PARALLAX (subtle)
//         section
//           .querySelectorAll<HTMLElement>(".vision-icon")
//           .forEach((icon) => {
//             gsap.fromTo(
//               icon,
//               { yPercent: 0 },
//               {
//                 yPercent: -15,
//                 ease: "none",
//                 scrollTrigger: {
//                   trigger: icon,
//                   start: "top bottom",
//                   end: "bottom top",
//                   scrub: 0.5,
//                 },
//               }
//             );
//           });

//         // UNDERLINE progress scrub
//         const underline =
//           section.querySelector<HTMLElement>(".vision-underline");
//         if (underline) {
//           gsap.fromTo(
//             underline,
//             { scaleX: 0 },
//             {
//               scaleX: 1,
//               transformOrigin: "left center",
//               ease: "none",
//               scrollTrigger: {
//                 trigger: section,
//                 start: "top 80%",
//                 end: "bottom 60%",
//                 scrub: true,
//               },
//             }
//           );
//         }
//       }, section);

//       return () => ctx.revert();
//     });

//     // Reduced motion: just show things
//     mm.add("(prefers-reduced-motion: reduce)", () => {
//       section.querySelector(".vision-head")?.classList.remove("translate-y-6");
//       section
//         .querySelectorAll(".vision-card")
//         .forEach((el) => el.classList.remove("translate-y-6"));
//     });

//     return () => mm.revert();
//   }, []);

//   // Helps ST/Lenis after bfcache restore
//   useEffect(() => {
//     const onShow = () => ScrollTrigger.refresh(true);
//     window.addEventListener("pageshow", onShow);
//     return () => window.removeEventListener("pageshow", onShow);
//   }, []);

//   return (
//     <section
//       id="vision"
//       ref={sectionRef}
//       className="py-32 scroll-mt-24 relative"
//     >
//       {/* subtle section separator */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//       <Container>
//         {/* Heading */}
//         <div className="max-w-2xl mx-auto text-center vision-head will-change-[transform,opacity]">
//           <h2 className="text-3xl md:text-5xl font-semibold tracking-widest text-ember-900 inline-block">
//             <span className="vision-line block">OUR VISION?</span>
//             <span className="vision-line block font-normal text-ember-100">
//               TO ELEVATE DIGITAL EXPERIENCES.
//             </span>
//           </h2>
//           <div className="vision-underline mt-4 h-[3px] w-44 mx-auto bg-ember-500/60 rounded-full scale-x-0 origin-left" />
//           <p className="mt-8 text-[0.7rem] md:text-xs tracking-[0.22em] font-medium text-ember-100/50">
//             SEE WHAT MAKES EMBER DIFFERENT.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {visionCards.map(({ icon: Icon, title, text }) => (
//             <Card
//               key={title}
//               className="vision-card py-16 md:py-20 text-center transition-transform will-change-[transform,opacity] hover:-translate-y-5"
//             >
//               <div className="vision-icon mx-auto w-14 h-14 rounded-2xl bg-white/10 grid place-items-center">
//                 <Icon className="w-7 h-7 text-ember-400" />
//               </div>
//               <h3 className="mt-5 text-[1.35rem] md:text-2xl font-semibold leading-tight bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent">
//                 {title}
//               </h3>
//               <p className="mt-6 text-ember-100/80 text-[0.85rem] md:text-sm font-medium tracking-[0.18em] leading-relaxed uppercase">
//                 {text}
//               </p>
//             </Card>
//           ))}
//         </div>
//       </Container>
//     </section>
//   );
// }
