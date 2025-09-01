/*
"use client"; → Required because this is an interactive component (client-side).
motion → lets you turn normal elements (like <div>) into animated ones.
useMotionValue → a special state variable for animation values (here, tracking x position).
useRef → reference to the DOM element so we can constrain dragging if needed.
cn → className helper (not heavily used here, but available).
*/

"use client";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "./utils";

export default function Carousel({
  items,
}: {
  items: readonly { title: string; text: string }[];
}) {
  const x = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="overflow-hidden">
      <motion.div
        ref={ref}
        className="flex gap-6"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -((items.length - 1) * 320), right: 0 }}
      >
        {items.map((s, i) => (
          <div key={i} className="min-w-[320px] card p-6">
            <h4 className="text-xl font-semibold">{s.title}</h4>
            <p className="mt-2 text-neutral-400 text-sm leading-relaxed">
              {s.text}
            </p>
          </div>
        ))}
      </motion.div>
      <div className="mt-4 h-1 w-full bg-white/10 rounded overflow-hidden">
        <div className="h-full w-1/5 accent-gradient" />
      </div>
    </div>
  );
}
