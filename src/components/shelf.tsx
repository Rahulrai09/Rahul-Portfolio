"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SHELF, SHELF_TABS, type ShelfItem } from "@/data";
import { CoverContent, CoverSvg, KIND_SHORT, SpineGlyph } from "./cover-art";
import { ease } from "./ui";

const N = SHELF.length;
const COPIES = 3;
const TOTAL = N * COPIES;
const START = SHELF.findIndex((s) => s.id === "pulse-exec");

const mod = (a: number, n: number) => ((a % n) + n) % n;
const smooth = (x: number) => x * x * (3 - 2 * x);
const B = (r: number) => (Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * 0.5);
const OPEN_EASE = "cubic-bezier(.76,0,.18,1)";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ------------------------------------------------------------------ */
/*  Caption line that swaps through a mask                             */
/* ------------------------------------------------------------------ */
function SwapLine({ k, dir, className = "", children }: { k: string; dir: number; className?: string; children: React.ReactNode }) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <span className="grid">
        <AnimatePresence initial={false} custom={dir}>
          <motion.span
            key={k}
            custom={dir}
            variants={{
              enter: (d: number) => ({ y: `${d * 105}%` }),
              center: { y: "0%" },
              exit: (d: number) => ({ y: `${-d * 105}%` }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.65, ease }}
            className="col-start-1 row-start-1 block"
          >
            {children}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Spine face                                                         */
/* ------------------------------------------------------------------ */
function Spine({ item }: { item: ShelfItem }) {
  const [bg, ink] = item.palette;
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden py-[8%]" style={{ background: bg, color: ink }}>
      {/* cardboard wear + edge shading */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,.18), transparent 14%, transparent 86%, rgba(0,0,0,.22)), linear-gradient(180deg, rgba(255,255,255,.08), transparent 30%, transparent 75%, rgba(0,0,0,.12))",
        }}
      />
      <div className="relative w-[62%]">
        <SpineGlyph item={item} />
      </div>
      <div
        className="relative min-h-0 flex-1 overflow-hidden py-[12%] font-[800] uppercase leading-none"
        style={{
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontFamily: "var(--font-display)",
          fontStretch: "62%",
          fontVariationSettings: '"wdth" 62',
          fontSize: `min(calc(var(--ws) * 0.38), calc(var(--H) * ${(1.18 / Math.max(item.title.length, 1)).toFixed(4)}))`,
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {item.title}
      </div>
      <div className="relative flex flex-col items-center gap-[6px]">
        <span className="font-[700] tracking-[0.06em]" style={{ fontSize: "calc(var(--ws) * 0.15)", fontFamily: "var(--font-sans)" }}>
          RKR
        </span>
        <span className="border px-[3px] py-[1px] font-[700]" style={{ borderColor: ink, fontSize: "calc(var(--ws) * 0.13)", fontFamily: "var(--font-sans)" }}>
          {KIND_SHORT[item.kind]}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHELF                                                              */
/* ------------------------------------------------------------------ */
export function Shelf() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const tapeEls = useRef<(HTMLDivElement | null)[]>([]);
  const coverEls = useRef<(HTMLDivElement | null)[]>([]);
  const spineShade = useRef<(HTMLDivElement | null)[]>([]);
  const coverShade = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const blobRefs = useRef<(SVGCircleElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const st = useRef({
    s: START + N,
    T: START + N,
    lifts: new Float32Array(TOTAL),
    hover: -1,
    mx: -999,
    my: -999,
    cx: -999,
    cy: -999,
    inside: false,
    overBtn: false,
    tiltX: 0,
    tiltY: 0,
    onCover: false,
    open: false,
    W: 1200,
    Hs: 800,
    H: 400,
    ws: 68,
    d: 210,
    gap: 12,
    down: false,
    dragging: false,
    dragX0: 0,
    dragT0: 0,
    suppressClick: false,
    wheelTimer: 0 as unknown as ReturnType<typeof setTimeout>,
    active: START,
    inView: false,
    reduced: false,
  });

  const [active, setActive] = useState(START);
  const [dir, setDir] = useState(1);
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, w: 0 });
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* --------------------------- geometry --------------------------- */
  const measure = useCallback(() => {
    const s = st.current;
    const sec = sectionRef.current;
    const probe = probeRef.current;
    if (!sec || !probe) return;
    s.W = sec.clientWidth;
    s.Hs = sec.clientHeight;
    s.H = probe.getBoundingClientRect().height;
    s.ws = (s.H * 142) / 840;
    s.d = (s.H * 474) / 900;
    s.gap = s.H * 0.03;
    const stage = stageRef.current;
    if (stage) {
      stage.style.setProperty("--ws", `${s.ws}px`);
      stage.style.setProperty("--d", `${s.d}px`);
    }
  }, []);

  useIso(() => {
    st.current.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ------------------------- decade-style tabs ------------------------- */
  const activeKind = SHELF[active].kind;
  useIso(() => {
    const idx = SHELF_TABS.findIndex((t) => t.kind === activeKind);
    const el = tabRefs.current[idx];
    if (el) setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [activeKind]);

  /* ---------------------------- main loop ---------------------------- */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const s = st.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // spring towards target
      const k = s.reduced ? 60 : s.dragging ? 18 : 5.2;
      s.s += (s.T - s.s) * (1 - Math.exp(-k * dt));
      if (Math.abs(s.T - s.s) < 1e-4) s.s = s.T;
      if (Math.abs(s.s) > N * 6) {
        const shift = Math.round(s.s / N) * N - N;
        s.s -= shift;
        s.T -= shift;
      }

      // active item → caption
      const act = mod(Math.round(s.s), N);
      if (act !== s.active) {
        const d = Math.sign(s.T - s.s) || 1;
        s.active = act;
        setDir(d);
        setActive(act);
      }

      // cover tilt test
      const W = s.W;
      const cyShelf = s.Hs / 2;
      const settled = Math.abs(s.T - s.s) < 0.3;
      s.onCover = !s.open && settled && s.inside && Math.abs(s.mx - W / 2) < 0.55 * s.d && Math.abs(s.my - cyShelf) < 0.55 * s.H;
      const tyT = s.onCover ? ((s.mx - W / 2) / (0.55 * s.d)) * 9 : s.inside ? ((s.mx - W / 2) / W) * 5 : 0;
      const txT = s.onCover ? (-(s.my - cyShelf) / (s.H / 2)) * 6 : 0;
      const tk = 1 - Math.exp(-7 * dt);
      s.tiltY += (tyT - s.tiltY) * tk;
      s.tiltX += (txT - s.tiltX) * tk;

      // tapes
      const step = s.ws + s.gap;
      const extra = s.d - s.ws + 1.6 * s.gap;
      for (let v = 0; v < TOTAL; v++) {
        const el = tapeEls.current[v];
        if (!el) continue;
        let r = v - s.s;
        r = mod(r + TOTAL / 2, TOTAL) - TOTAL / 2;
        const x = r * step + extra * B(r);
        if (Math.abs(x) > W / 2 + 1.5 * s.d) {
          if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
          continue;
        }
        if (el.style.visibility === "hidden") el.style.visibility = "visible";
        const liftT = s.hover === v && Math.abs(r) > 0.5 ? 1 : 0;
        s.lifts[v] += (liftT - s.lifts[v]) * (1 - Math.exp(-12 * dt));
        const o = smooth(Math.max(0, 1 - Math.abs(r)));
        const ry = -90 * o + s.tiltY * o;
        const rx = s.tiltX * o;
        const rz = -4.5 * o;
        const z = o * 0.2 * s.H;
        const y = -o * 0.025 * s.H - s.lifts[v] * 0.045 * s.H;
        el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateZ(${rz.toFixed(3)}deg) rotateX(${rx.toFixed(3)}deg) rotateY(${ry.toFixed(3)}deg)`;
        el.style.zIndex = String(Math.round(100 - Math.abs(r) * 4));
        const ss = spineShade.current[v];
        const cs = coverShade.current[v];
        if (ss) ss.style.opacity = (o * 0.55).toFixed(3);
        if (cs) cs.style.opacity = ((1 - o) * 0.5).toFixed(3);
      }

      // play ring
      const ring = ringRef.current;
      if (ring) {
        const sc = s.open ? 0 : smooth(Math.max(0, 1 - Math.abs(s.T - s.s) * 3));
        ring.style.left = `${W / 2 - 0.5 * s.d - 6}px`;
        ring.style.top = `${cyShelf + 0.36 * s.H}px`;
        ring.style.transform = `translate(-50%,-50%) scale(${sc.toFixed(3)})`;
        ring.style.pointerEvents = sc > 0.5 ? "auto" : "none";
      }

      // custom cursor
      const cur = cursorRef.current;
      if (cur) {
        const ck = 1 - Math.exp(-16 * dt);
        if (s.cx < -500) {
          s.cx = s.mx;
          s.cy = s.my;
        }
        s.cx += (s.mx - s.cx) * ck;
        s.cy += (s.my - s.cy) * ck;
        cur.style.transform = `translate3d(${s.cx.toFixed(1)}px, ${s.cy.toFixed(1)}px, 0)`;
        cur.style.opacity = s.inside && !s.open ? "1" : "0";
        const state = s.onCover ? "open" : s.hover >= 0 ? "spine" : s.overBtn ? "btn" : "default";
        if (cur.dataset.state !== state) cur.dataset.state = state;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------------------------- navigation ---------------------------- */
  const goTo = useCallback((index: number) => {
    const s = st.current;
    const base = Math.round(s.T);
    let delta = mod(index - mod(base, N), N);
    if (delta > N / 2) delta -= N;
    s.T = base + delta;
  }, []);
  const step = useCallback((d: number) => {
    const s = st.current;
    s.T = Math.round(s.T) + d;
  }, []);

  /* ----------------------------- detail ----------------------------- */
  const centreCoverRect = () => {
    const s = st.current;
    let best = -1;
    let bestR = 1e9;
    for (let v = 0; v < TOTAL; v++) {
      const r = Math.abs(mod(v - s.s + TOTAL / 2, TOTAL) - TOTAL / 2);
      if (r < bestR) {
        bestR = r;
        best = v;
      }
    }
    return coverEls.current[best]?.getBoundingClientRect();
  };

  const openDetail = useCallback(() => {
    const s = st.current;
    if (s.open) return;
    s.T = Math.round(s.T);
    s.s = s.T;
    s.open = true;
    setOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    const s = st.current;
    const el = dialogRef.current;
    if (!s.open || !el) return;
    const rect = centreCoverRect();
    const finish = () => {
      el.getAnimations().forEach((a) => a.cancel());
      el.style.visibility = "hidden";
      s.open = false;
      setOpen(false);
      document.documentElement.style.overflow = "";
    };
    if (!rect || s.reduced) return finish();
    const from = `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 3px)`;
    el.style.transformOrigin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
    const a = el.animate(
      [
        { clipPath: "inset(0px 0px 0px 0px round 0px)", transform: "rotate(0deg)" },
        { clipPath: from, transform: "rotate(-4.5deg)" },
      ],
      { duration: 850, easing: OPEN_EASE, fill: "both" }
    );
    a.onfinish = finish;
  }, []);

  // run the open animation once the dialog is mounted/visible
  useEffect(() => {
    if (!open) return;
    const s = st.current;
    const el = dialogRef.current;
    if (!el) return;
    document.documentElement.style.overflow = "hidden";
    const rect = centreCoverRect();
    el.style.visibility = "visible";
    blobRefs.current.forEach((c) => c?.setAttribute("r", "0"));
    if (rect && !s.reduced) {
      const from = `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px round 3px)`;
      el.style.transformOrigin = `${rect.left + rect.width / 2}px ${rect.top + rect.height / 2}px`;
      el.animate(
        [
          { clipPath: from, transform: "rotate(-4.5deg)" },
          { clipPath: "inset(0px 0px 0px 0px round 0px)", transform: "rotate(0deg)" },
        ],
        { duration: 1050, easing: OPEN_EASE, fill: "both" }
      );
    }
    // ink bleed
    const delays = [0, 120, 220, 300, 360, 420, 180];
    const t0 = performance.now() + (s.reduced ? -5000 : 520);
    let raf = 0;
    const ink = (now: number) => {
      let done = true;
      blobRefs.current.forEach((c, i) => {
        if (!c) return;
        const p = Math.min(1, Math.max(0, (now - t0 - delays[i]) / 1250));
        if (p < 1) done = false;
        c.setAttribute("r", String(720 * (1 - Math.pow(1 - p, 3))));
      });
      if (!done && now - t0 < 2400) raf = requestAnimationFrame(ink);
    };
    raf = requestAnimationFrame(ink);
    dialogRef.current?.querySelector<HTMLButtonElement>("[data-close]")?.focus({ preventScroll: true });
    return () => cancelAnimationFrame(raf);
  }, [open]);

  /* ------------------------------ input ------------------------------ */
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const s = st.current;

    const io = new IntersectionObserver(([e]) => (s.inView = e.intersectionRatio > 0.5), { threshold: [0, 0.5, 1] });
    io.observe(sec);

    const onMove = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      s.mx = e.clientX - r.left;
      s.my = e.clientY - r.top;
      s.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom && e.pointerType === "mouse";
      const t = e.target as HTMLElement | null;
      s.overBtn = !!t?.closest?.("button, a") && !t?.closest?.("[data-tape]");
      if (s.down) {
        const dx = e.clientX - s.dragX0;
        if (!s.dragging && Math.abs(dx) > 5) s.dragging = true;
        if (s.dragging) s.T = s.dragT0 - dx / (s.ws + s.gap);
      }
    };
    const onUp = () => {
      if (s.down && s.dragging) {
        s.T = Math.round(s.T);
        s.suppressClick = true;
        setTimeout(() => (s.suppressClick = false), 50);
      }
      s.down = false;
      s.dragging = false;
    };
    const onWheel = (e: WheelEvent) => {
      if (s.open) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical scroll keeps scrolling the page
      e.preventDefault();
      s.T += (e.deltaX / (s.ws + s.gap)) * 0.5;
      clearTimeout(s.wheelTimer);
      s.wheelTimer = setTimeout(() => (s.T = Math.round(s.T)), 160);
    };
    const onKey = (e: KeyboardEvent) => {
      if (s.open) {
        if (e.key === "Escape") closeDetail();
        return;
      }
      if (!s.inView) return;
      const tag = (document.activeElement?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Enter" && (document.activeElement === document.body || sec.contains(document.activeElement))) {
        const t = document.activeElement as HTMLElement | null;
        if (t && t !== document.body && t.tagName === "BUTTON") return;
        openDetail();
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("keydown", onKey);
    sec.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("keydown", onKey);
      sec.removeEventListener("wheel", onWheel);
    };
  }, [closeDetail, openDetail, step]);

  const onTapeClick = (v: number) => {
    const s = st.current;
    if (s.suppressClick) return;
    const r = mod(v - s.s + TOTAL / 2, TOTAL) - TOTAL / 2;
    if (Math.abs(r) < 0.5) openDetail();
    else s.T = Math.round(s.T + r);
  };

  const item = SHELF[active];
  const detailLines = [
    <span key="k" className="lbl text-cobalt">
      {item.kind} / {item.period}
    </span>,
    <h3 key="t" className="font-serif font-normal leading-[1] tracking-[-0.025em]" style={{ fontSize: "clamp(40px, 5.2vw, 82px)" }}>
      {item.title}
    </h3>,
    <span key="m" className="lbl text-muted">
      {[item.org, item.place, item.badge].filter(Boolean).join(" / ")}
    </span>,
    <p key="s" className="max-w-[44ch] font-serif text-[17px] leading-[1.5] md:text-[18px]">
      {item.summary}
    </p>,
    ...(item.points
      ? [
          <ul key="p" className="max-w-[52ch] space-y-2.5 text-[14.5px] leading-[1.5] text-ink-soft">
            {item.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[9px] h-px w-4 shrink-0 bg-cobalt" />
                {p}
              </li>
            ))}
          </ul>,
        ]
      : []),
    <p key="c" className="font-serif text-[15px] italic text-muted">
      Milestone {String(active + 1).padStart(2, "0")} of {N} — Rahul Kumar Rai.
    </p>,
    <a
      key="b"
      href="#contact"
      onClick={() => closeDetail()}
      className="inline-flex h-11 items-center border border-cobalt px-5 text-[11px] font-semibold uppercase tracking-[0.09em] text-cobalt transition-colors hover:bg-cobalt hover:text-white"
    >
      Work with me ↗
    </a>,
  ];

  const sheet = (
    <>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="fixed inset-0 z-[60] overflow-y-auto bg-sheet text-ink"
        style={{ visibility: "hidden" }}
      >
        <button data-close onClick={closeDetail} className="boxlbl absolute left-4 top-5 z-10 bg-sheet md:left-8 md:top-[31px]">
          Close ✕
        </button>
        <div className="absolute inset-x-0 top-0 flex h-16 flex-col items-center justify-center gap-[5px] text-cobalt md:h-[84px]">
          <span className="font-serif text-[18px] leading-none md:text-[22px]">Rahul Kumar Rai</span>
          <span className="pl-[0.34em] text-[8px] font-semibold tracking-[0.34em] md:text-[9px]">THE SHELF</span>
        </div>
        {open && (
          <div className="grid min-h-full items-center gap-6 px-[22px] pb-10 pt-[84px] md:grid-cols-2 md:gap-[4vw] md:px-[6vw] md:pb-14 md:pl-[7vw] md:pt-[110px]">
            <div className="order-2 flex max-w-[560px] flex-col items-start gap-[18px] md:order-1">
              {detailLines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[2px]">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, delay: 0.62 + i * 0.075, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </div>
            <div className="order-1 flex justify-center md:order-2">
              <svg viewBox="0 0 474 900" className="h-[46svh] w-auto md:h-[min(78vh,760px)]" aria-hidden>
                <defs>
                  <filter id="ink-filter" x="-50%" y="-50%" width="200%" height="200%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="120" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <mask id="ink-mask" maskUnits="userSpaceOnUse" x="-200" y="-200" width="874" height="1300">
                    <g filter="url(#ink-filter)">
                      {[
                        [150, 330],
                        [340, 600],
                        [250, 120],
                        [90, 760],
                        [400, 250],
                        [260, 860],
                        [230, 470],
                      ].map(([cx, cy], i) => (
                        <circle
                          key={i}
                          ref={(el) => {
                            blobRefs.current[i] = el;
                          }}
                          cx={cx}
                          cy={cy}
                          r="0"
                          fill="#fff"
                        />
                      ))}
                    </g>
                  </mask>
                  <clipPath id="poster-clip">
                    <rect width="474" height="900" />
                  </clipPath>
                </defs>
                <g clipPath="url(#poster-clip)">
                  <g mask="url(#ink-mask)">
                    <CoverContent item={item} n={active} total={N} />
                  </g>
                </g>
              </svg>
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
    {mounted && createPortal(sheet, document.body)}
    <section
      id="shelf"
      ref={sectionRef}
      aria-label="Journey shelf"
      className="shelf-zone grain relative z-10 -mt-12 h-[100svh] min-h-[640px] select-none overflow-hidden rounded-t-[40px] bg-[#EDEBE6] text-ink sm:rounded-t-[50px] md:-mt-14 md:min-h-[760px] md:rounded-t-[60px]"
    >
      {/* probe resolves --H to px */}
      <div ref={probeRef} aria-hidden className="pointer-events-none invisible absolute left-0 top-0 w-px [height:var(--H)]" />

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-30 grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[84px] md:px-8">
        <span className="boxlbl justify-self-start">Journey</span>
        <div className="flex flex-col items-center gap-[5px] text-cobalt">
          <span className="font-serif text-[18px] leading-none tracking-[0.02em] md:text-[22px]">Rahul Kumar Rai</span>
          <span className="pl-[0.34em] text-[8px] font-semibold tracking-[0.34em] md:text-[9px]">THE SHELF</span>
        </div>
        <span className="lbl hidden justify-self-end md:block">2017 — 2026</span>
      </div>

      {/* tabs */}
      <nav
        aria-label="Filter milestones"
        className="absolute left-1/2 z-30 flex -translate-x-1/2"
        style={{ top: "calc(50% - var(--H) / 2 - 86px)" }}
      >
        <span
          aria-hidden
          className="absolute top-0 h-[23px] bg-cobalt transition-all duration-[600ms] [transition-timing-function:var(--ease)]"
          style={{ width: indicator.w, transform: `translateX(${indicator.x}px)` }}
        />
        {SHELF_TABS.map((t, i) => {
          const on = t.kind === activeKind;
          return (
            <button
              key={t.label}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              onClick={() => (t.kind === "All" ? goTo(0) : goTo(SHELF.findIndex((x) => x.kind === t.kind)))}
              className={`relative -ml-px flex h-[23px] items-center whitespace-nowrap border border-ink/90 px-[7px] text-[9px] font-semibold uppercase leading-none tracking-[0.09em] transition-colors duration-[450ms] md:px-[11px] md:text-[10.5px] ${
                on ? "text-white" : "text-ink"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* shelf stage */}
      <div
        className="absolute inset-x-0 z-20 [perspective:2200px] [touch-action:pan-y]"
        style={{ top: "calc(50% - var(--H) / 2 - 40px)", height: "calc(var(--H) + 80px)" }}
        onPointerDown={(e) => {
          const s = st.current;
          s.down = true;
          s.dragging = false;
          s.dragX0 = e.clientX;
          s.dragT0 = s.T;
        }}
      >
        <div ref={stageRef} className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]">
          {Array.from({ length: TOTAL }).map((_, v) => {
            const it = SHELF[v % N];
            return (
              <div
                key={v}
                data-tape
                ref={(el) => {
                  tapeEls.current[v] = el;
                }}
                className="absolute left-0 top-0 h-0 w-0 cursor-pointer [transform-style:preserve-3d] [will-change:transform]"
                onPointerEnter={() => (st.current.hover = v)}
                onPointerLeave={() => {
                  if (st.current.hover === v) st.current.hover = -1;
                }}
                onClick={() => onTapeClick(v)}
              >
                <div
                  className="absolute overflow-hidden rounded-[2px] [backface-visibility:hidden]"
                  style={{
                    width: "var(--ws)",
                    height: "var(--H)",
                    left: "calc(var(--ws) / -2)",
                    top: "calc(var(--H) / -2)",
                    transform: "translateZ(calc(var(--d) / 2))",
                  }}
                >
                  <Spine item={it} />
                  <div
                    ref={(el) => {
                      spineShade.current[v] = el;
                    }}
                    className="pointer-events-none absolute inset-0 bg-black opacity-0"
                  />
                </div>
                <div
                  ref={(el) => {
                    coverEls.current[v] = el;
                  }}
                  className="absolute overflow-hidden rounded-[2px] shadow-[0_30px_60px_-28px_rgba(20,16,10,.55)] [backface-visibility:hidden]"
                  style={{
                    width: "var(--d)",
                    height: "var(--H)",
                    left: "calc(var(--d) / -2)",
                    top: "calc(var(--H) / -2)",
                    transform: "rotateY(90deg) translateZ(calc(var(--ws) / 2))",
                  }}
                >
                  <CoverSvg item={it} n={v % N} total={N} />
                  <div
                    ref={(el) => {
                      coverShade.current[v] = el;
                    }}
                    className="pointer-events-none absolute inset-0 bg-black opacity-50"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* play ring */}
      <button
        ref={ringRef}
        onClick={openDetail}
        aria-label="Open milestone"
        className="absolute z-30 grid h-[42px] w-[42px] place-items-center rounded-full border border-cobalt bg-[rgba(237,235,230,.75)] text-cobalt"
        style={{ transform: "translate(-50%,-50%) scale(0)" }}
      >
        <svg viewBox="0 0 12 12" className="ml-[2px] h-3 w-3" aria-hidden>
          <path d="M1 0 L11 6 L1 12 Z" fill="currentColor" />
        </svg>
      </button>

      {/* caption */}
      <div
        aria-live="polite"
        className="pointer-events-none absolute left-1/2 z-30 flex w-[min(92vw,760px)] -translate-x-1/2 flex-col items-center gap-[9px] text-center"
        style={{ top: "calc(50% + var(--H) / 2 + 30px)" }}
      >
        <SwapLine k={`t${active}`} dir={dir} className="w-full">
          <span className="block font-serif text-[22px] leading-[1.12] tracking-[-0.01em] md:text-[31px]">{item.title}</span>
        </SwapLine>
        <SwapLine k={`o${active}`} dir={dir} className="w-full">
          <span className="lbl block font-medium text-cobalt">
            {item.org} / {item.kind}
          </span>
        </SwapLine>
        <SwapLine k={`y${active}`} dir={dir} className="w-full">
          <span className="block text-[11px] font-medium tracking-[0.08em]">{item.period}</span>
        </SwapLine>
      </div>

      {/* arrows */}
      {[-1, 1].map((d) => (
        <button
          key={d}
          onClick={() => step(d)}
          aria-label={d < 0 ? "Previous milestone" : "Next milestone"}
          className="shelf-arrow absolute z-30 grid h-11 w-11 place-items-center"
          style={{ [d < 0 ? "left" : "right"]: "max(6px, 2vw)" }}
        >
          <svg viewBox="0 0 18 10" className="h-[10px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
            {d < 0 ? <path d="M5 1 L1 5 L5 9 M1 5 H17" /> : <path d="M13 1 L17 5 L13 9 M17 5 H1" />}
          </svg>
        </button>
      ))}

      {/* footer labels */}
      <div className="lbl absolute inset-x-4 bottom-[18px] z-30 flex justify-between text-[9px] md:inset-x-8 md:bottom-[26px] md:text-[10.5px]">
        <span>Drag · Click · ← → keys</span>
        <span>
          {N} milestones
        </span>
      </div>

      {/* custom cursor */}
      <div
        ref={cursorRef}
        data-state="default"
        aria-hidden
        className="shelf-cursor pointer-events-none absolute left-0 top-0 z-50 -ml-[29px] -mt-[29px] hidden h-[58px] w-[58px] opacity-0 [@media(pointer:fine)]:block"
      >
        <span className="sc-ring absolute inset-0 rounded-full border-[1.5px] border-ink" />
        <span className="sc-dot absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-ink" />
        <span className="sc-label absolute inset-0 grid place-items-center text-center text-[10px] font-semibold leading-[1.25] tracking-[0.1em] text-white">
          OPEN
        </span>
      </div>

    </section>
    </>
  );
}
