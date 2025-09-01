"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import { visionCards, productCards } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Vision() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const ctx = gsap.context(() => {
      // Make sure ST respects Tailwind’s responsive styles
      ScrollTrigger.saveStyles(
        ".vision-row, .vision-tophead, .vision-icon, .row-glow, .vision-grid"
      );
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
      });

      // Reveal rows once
      const rows = section.querySelectorAll<HTMLElement>(".vision-row");
      if (rows.length) {
        ScrollTrigger.batch(rows, {
          start: "top 85%",
          once: true,
          onEnter: (els) =>
            gsap.fromTo(
              els,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
                onComplete() {
                  gsap.set(els, { clearProps: "transform,opacity" });
                  els.forEach((el) => {
                    el.classList.remove("opacity-0", "translate-y-6");
                    (el as HTMLElement).style.willChange = "auto";
                  });
                },
              }
            ),
        });

        // Calm parallax (lighter on small screens via responsive sizes below)
        rows.forEach((row, i) => {
          const glow = row.querySelector<HTMLElement>(".row-glow");
          const icon = row.querySelector<HTMLElement>(".vision-icon");
          const drift = i % 2 === 0 ? 22 : -22;

          if (glow) {
            gsap.fromTo(
              glow,
              { yPercent: drift },
              {
                yPercent: -drift,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                  fastScrollEnd: true,
                },
              }
            );
          }

          if (icon) {
            gsap.fromTo(
              icon,
              { yPercent: 0 },
              {
                yPercent: drift * 0.5,
                ease: "none",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                  fastScrollEnd: true,
                },
              }
            );
          }
        });
      }

      // Top heading
      const head = section.querySelector(".vision-tophead");
      if (head) {
        gsap.from(head, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });
      }

      window.addEventListener("load", () => ScrollTrigger.refresh());
    }, section);

    // Keep visible after bfcache / tab restore
    const showRowsImmediately = () => {
      const rows = section.querySelectorAll<HTMLElement>(".vision-row");
      rows.forEach((el) => {
        el.classList.remove("opacity-0", "translate-y-6");
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.willChange = "auto";
      });
      requestAnimationFrame(() => ScrollTrigger.refresh(true));
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if ((e as any).persisted) showRowsImmediately();
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        requestAnimationFrame(() => ScrollTrigger.refresh(true));
      }
    };
    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisible);
      ctx.revert();
    };
  }, []);

  // Reduced motion: show without animating
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const section = sectionRef.current;
      if (!section) return;
      section.querySelectorAll<HTMLElement>(".vision-row").forEach((el) => {
        el.classList.remove("opacity-0", "translate-y-6");
        (el as HTMLElement).style.willChange = "auto";
      });
    }
  }, []);

  return (
    <section
      id="vision"
      aria-labelledby="vision-heading"
      ref={sectionRef}
      className="
        py-24 sm:py-32 lg:py-40 scroll-mt-24 relative
        [--champagne:236,204,153] [--ember:255,127,0]
      "
    >
      <h2 id="vision-heading" className="sr-only">
        Our Vision
      </h2>

      {/* rails */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ambient (smaller on mobile) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="
          absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2
          w-[52rem] h-[52rem] sm:w-[72rem] sm:h-[72rem] xl:w-[88rem] xl:h-[88rem]
          bg-[radial-gradient(closest-side,rgba(var(--ember),0.045),transparent_75%)]
          blur-3xl
        "
        />
      </div>

      <Container>
        {/* Top heading */}
        <div className="vision-tophead max-w-4xl mx-auto text-center px-4">
          <h3 className="text-[1.8rem] sm:text-[2.3rem] md:text-[2.9rem] xl:text-[3.4rem] font-semibold tracking-[0.18em] text-ember-900 leading-[1.1]">
            OUR VISION?{" "}
            <span className="font-normal text-ember-100">
              TO ELEVATE DIGITAL EXPERIENCES.
            </span>
          </h3>
          <div className="mt-4 sm:mt-5 h-px w-24 sm:w-32 mx-auto bg-gradient-to-r from-[rgba(var(--champagne),0.45)] via-white/40 to-transparent" />
          <p className="mt-4 sm:mt-5 text-[0.9rem] md:text-sm xl:text-base tracking-[0.26em] text-ember-100/70">
            SEE WHAT MAKES EMBER DIFFERENT.
          </p>
        </div>

        {/* Cards */}
        <div className="vision-grid mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 px-4 sm:px-0 mb-16 sm:mb-20 lg:mb-28">
          {visionCards.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="
                vision-card text-center transition-transform will-change-[transform,opacity]
                md:hover:-translate-y-5
                py-12 sm:py-14 md:py-20
              "
            >
              <div className="vision-icon mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 grid place-items-center">
                <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-ember-400" />
              </div>
              <h3 className="mt-4 sm:mt-5 text-[1.2rem] sm:text-[1.35rem] md:text-2xl font-semibold leading-tight bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent px-4">
                {title}
              </h3>
              <p className="mt-4 sm:mt-6 text-ember-100/80 text-[0.85rem] md:text-sm font-medium tracking-[0.18em] leading-relaxed uppercase px-6">
                {text}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-16 sm:mt-20 lg:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 xl:gap-16 px-4 sm:px-0">
          {/* Left aside */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="text-sm sm:text-sm tracking-[0.32em] uppercase text-ember-100/70">
                EMBER / VISION
              </div>
              <p className="mt-3 sm:mt-4 text-ember-100/80 leading-relaxed">
                Distinctive brands. Refined digital products.
                <br className="hidden md:block" /> Built to perform — and to be
                felt.
              </p>
              <ul className="mt-5 sm:mt-6 space-y-2 text-ember-100/60">
                <li className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-white/20" />
                  Purposeful craft
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-white/20" />
                  Modern systems
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-[1px] w-8 bg-white/20" />
                  Lasting impact
                </li>
              </ul>
            </div>
          </aside>

          {/* Rows */}
          <ol
            className="lg:col-span-8 space-y-8 sm:space-y-10 xl:space-y-12"
            role="list"
          >
            {productCards.map((item, i) => {
              const { icon: Icon, title, text } = item as any;
              const img = (item as any).img as string | undefined;
              const spotLeft = i % 2 === 0;

              return (
                <li key={title} role="listitem">
                  <Card
                    className={[
                      "vision-row group relative overflow-hidden rounded-[24px] sm:rounded-[28px] xl:rounded-[30px] p-0 focus-ring",
                      "opacity-0 translate-y-6 will-change-[transform,opacity] [contain:layout_paint_style_size]",
                      "before:absolute before:inset-0 before:rounded-[inherit] before:p-[2px]",
                      "before:[background:linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))]",
                      "before:[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
                      "before:[-webkit-mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]",
                      "before:[mask-composite:exclude] before:[-webkit-mask-composite:xor]",
                      "before:shadow-[inset_0_0_120px_rgba(0,0,0,0.35)]",
                      "bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.22))] backdrop-blur-[2px]",
                      "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_140px_260px_-120px_rgba(0,0,0,0.9)]",
                      "after:absolute after:inset-0 after:rounded-[inherit] after:pointer-events-none after:opacity-0",
                      "transition-[transform,box-shadow,opacity] duration-700 ease-out",
                      "group-hover:after:opacity-80",
                      "after:[box-shadow:inset_0_0_0_1px_rgba(236,204,153,.17),inset_0_0_40px_rgba(236,204,153,.10)]",
                      "min-h-[32rem] sm:min-h-[32rem] md:min-h-[32rem] xl:min-h-[36rem]",
                    ].join(" ")}
                  >
                    {/* faint grain */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('/textures/noise.png')] bg-repeat"
                    />

                    {/* Optional image banner */}
                    {img && (
                      <div className="relative h-[10rem] sm:h-[12rem] md:h-[16rem] xl:h-[18rem] overflow-hidden">
                        <Image
                          src={img}
                          alt=""
                          fill
                          className="object-cover object-center opacity-[0.22]"
                          sizes="(min-width:1024px) 720px, 100vw"
                          priority={i === 0}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.38),transparent_35%,rgba(0,0,0,0.42))]" />
                      </div>
                    )}

                    {/* Soft radial glow */}
                    <div
                      aria-hidden
                      className={[
                        "absolute inset-0 pointer-events-none opacity-0",
                        "transition-opacity duration-700 ease-out",
                        "group-hover:opacity-100",
                        "bg-[radial-gradient(900px_circle_at_50%_40%,rgba(236,204,153,0.10),transparent_60%)]",
                      ].join(" ")}
                    />

                    {/* Champagne parallax glow (smaller on mobile) */}
                    <div
                      className={[
                        "row-glow absolute top-1/2 -translate-y-1/2 rounded-full blur-[60px] sm:blur-[70px] opacity-90",
                        spotLeft
                          ? "-left-24 sm:-left-44"
                          : "-right-24 sm:-right-44",
                        "w-[28rem] h-[28rem] sm:w-[36rem] sm:h-[36rem] md:w-[44rem] md:h-[44rem]",
                        "bg-[radial-gradient(circle,rgba(236,204,153,0.22),transparent_60%)]",
                      ].join(" ")}
                    />

                    {/* content */}
                    <div className="relative z-[1] px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-14">
                      {/* meta */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.32em] text-ember-100/60">
                        <span className="uppercase">EMBER / PRODUCTS</span>
                        <span className="hidden sm:block h-px w-8 bg-white/15" />
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </div>

                      {/* icon + title/desc */}
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-12 items-start gap-6 sm:gap-8 md:gap-10">
                        <div className="sm:col-span-2">
                          <div className="vision-icon relative mx-auto sm:mx-0 grid h-[5rem] w-[5rem] sm:h-[4rem] sm:w-[4rem] md:h-[5rem] md:w-[5rem] place-items-center rounded-2xl bg-white/[0.08] ring-1 ring-white/15 shadow-inner">
                            <div className="absolute -inset-3 rounded-[inherit] bg-[radial-gradient(closest-side,rgba(236,204,153,0.26),transparent)] blur-md opacity-85" />
                            <Icon className="relative h-7 w-7 sm:h-8 sm:w-8 text-ember-400" />
                          </div>
                        </div>

                        <div className="sm:col-span-10">
                          <h4
                            className="
                              bg-gradient-to-r from-ember-600 to-ember-100 to-56% bg-clip-text text-transparent
                              font-semibold tracking-[-0.005em]
                              leading-[1.16] md:leading-[1.14]
                              text-[clamp(1.1rem,4vw,1.6rem)]
                              sm:text-[clamp(1.45rem,2.8vw,2.05rem)]
                              md:text-[clamp(1.65rem,2.3vw,2.4rem)]
                              xl:text-[clamp(2.1rem,2.2vw,3.1rem)]
                              clamp-2
                              break-words [hyphens:auto]
                            "
                          >
                            {title}
                          </h4>

                          <div className="mt-3 sm:mt-4 h-[2px] w-24 sm:w-28 bg-gradient-to-r from-[rgba(236,204,153,0.35)] via-ember-200/70 to-transparent" />

                          <p
                            className="
                              text-ember-100/85 mt-4 sm:mt-6
                              leading-[1.55]
                              text-[clamp(0.95rem,3.2vw,1.02rem)]
                              sm:text-[clamp(1rem,1.8vw,1.08rem)]
                              md:text-[clamp(1.02rem,1.2vw,1.14rem)]
                              xl:text-[clamp(1.06rem,1vw,1.18rem)]
                              clamp-3
                              break-words [hyphens:auto] max-w-[72ch]
                            "
                          >
                            {text}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* hairline corners */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute left-0 top-0 h-[1px] w-16 bg-white/10" />
                      <div className="absolute left-0 top-0 w-[1px] h-16 bg-white/10" />
                      <div className="absolute right-0 bottom-0 h-[1px] w-16 bg-white/10" />
                      <div className="absolute right-0 bottom-0 w-[1px] h-16 bg-white/10" />
                    </div>
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
