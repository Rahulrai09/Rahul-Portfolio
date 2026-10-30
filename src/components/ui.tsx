"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";

export const ease = [0.2, 0.8, 0.2, 1] as [number, number, number, number];

export function useMediaQuery(q: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [q]);
  return match;
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 24,
  className = "",
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -60px 0px", amount: 0 }}
      transition={{ duration, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A line of text that rises out of its own mask. */
export function MaskLine({
  children,
  delay = 0,
  className = "",
  onLoad = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onLoad?: boolean;
}) {
  const variants = { hidden: { y: "108%" }, show: { y: "0%", transition: { duration: 1, delay, ease } } };
  return (
    <motion.span
      className={`block overflow-hidden ${className}`}
      initial="hidden"
      {...(onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-30px" } })}
    >
      <motion.span className="block" variants={variants}>
        {children}
      </motion.span>
    </motion.span>
  );
}

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  delay = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, delay, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, duration, delay]);
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function ArrowUR({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowDown({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

export function CheckDisc({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full bg-ink text-white ${className}`}>
      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  );
}

/** Mouse-following magnetic wrapper (active within `padding` px of the element). */
export function Magnet({
  children,
  padding = 120,
  strength = 3,
  className = "",
}: {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const inside = Math.abs(e.clientX - cx) < r.width / 2 + padding && Math.abs(e.clientY - cy) < r.height / 2 + padding;
      if (inside) setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength, active: true });
      else setPos((p) => (p.active ? { x: 0, y: 0, active: false } : p));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [padding, strength]);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.active ? "transform 0.3s ease-out" : "transform 0.6s ease-in-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
