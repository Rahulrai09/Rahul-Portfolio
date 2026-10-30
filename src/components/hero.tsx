"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CREDENTIAL_MARKS, HERO_PHOTO, NAV } from "@/data";
import { ArrowDown, ArrowUR, CheckDisc, CountUp, MaskLine, ease } from "./ui";

/* Every desktop size is drawn on a 1440px artboard: u = min(100vw/1440, 1.333px). */
const U = "min(calc(100vw / 1440), 1.333px)";
const u = (n: number) => `calc(var(--u) * ${n})`;

/* rise-and-fade used by most hero elements, staggered 55ms */
const rise = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: 0.55 + i * 0.055, ease },
});

/* ------------------------------------------------------------------ */
/*  Segmented nav pill with a sliding black indicator                  */
/* ------------------------------------------------------------------ */
function NavPill({ size = 48 }: { size?: number }) {
  const [hover, setHover] = useState<string | null>(null);
  const current = hover ?? "top";
  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease }}
      className="inline-flex items-center rounded-full bg-white p-1 shadow-card"
      style={{ height: size }}
      onMouseLeave={() => setHover(null)}
      aria-label="Main"
    >
      {NAV.map((n) => (
        <a
          key={n.id}
          href={`#${n.id}`}
          onMouseEnter={() => setHover(n.id)}
          onFocus={() => setHover(n.id)}
          className={`relative flex h-full items-center rounded-full px-4 text-[14px] font-medium transition-colors duration-300 md:px-5 ${
            current === n.id ? "text-white" : "text-ink"
          }`}
        >
          {current === n.id && (
            <motion.span layoutId="navpill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
          )}
          <span className="relative">{n.label}</span>
        </a>
      ))}
    </motion.nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Centre visual: a photo slot, or an arch "growth window"            */
/* ------------------------------------------------------------------ */
function HeroVisual({ drift }: { drift: MotionValue<number> }) {
  if (HERO_PHOTO) {
    return (
      <motion.div style={{ y: drift }} className="absolute inset-0">
        <motion.img
          src={HERO_PHOTO}
          alt="Rahul Kumar Rai"
          initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: 0.1, ease }}
          className="h-full w-full object-cover grayscale [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]"
        />
      </motion.div>
    );
  }
  const bars = [22, 30, 27, 41, 38, 52, 49, 63, 71, 84];
  return (
    <motion.div
      style={{ y: drift }}
      initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.3, delay: 0.1, ease }}
      className="grain absolute inset-0 overflow-hidden rounded-t-[999px]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#F3F5FB_0%,#C9D5F6_42%,#6E8BEA_78%,#1F3FB0_100%)]" />
      {/* concentric halo */}
      <div className="absolute left-1/2 top-[22%] aspect-square w-[78%] -translate-x-1/2 rounded-full border border-white/70" />
      <div className="absolute left-1/2 top-[30%] aspect-square w-[56%] -translate-x-1/2 rounded-full border border-white/50" />
      <motion.div
        className="absolute left-1/2 top-[18%] aspect-square w-[34%] -translate-x-1/2 rounded-full bg-white/80 blur-2xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* hairline grid */}
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(to_top,rgba(255,255,255,0.22)_1px,transparent_1px)] bg-[length:100%_12.5%]" />
      {/* rising bars */}
      <div className="absolute inset-x-[9%] bottom-0 flex h-[52%] items-end gap-[3%]">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-t-[6px] bg-gradient-to-t from-white/10 to-white/70"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 1.2, delay: 0.9 + i * 0.07, ease }}
          />
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-x-[9%] bottom-0 h-[52%] w-[82%]" aria-hidden>
        <motion.path
          d="M2 80 L12 72 L22 74 L32 60 L42 63 L52 48 L62 51 L72 37 L82 29 L96 12"
          fill="none"
          stroke="#fff"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          style={{ strokeWidth: 2 }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, delay: 1.3, ease }}
        />
      </svg>
    </motion.div>
  );
}

/* dark glass brand plate */
function Plate({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div {...rise(6)} className={`glass-dark flex items-center justify-between rounded-[14px] px-5 text-white ${className}`} style={style}>
      <span className="flex items-center gap-3">
        <svg viewBox="0 0 28 24" className="h-[22px] w-[26px]" aria-hidden>
          <path d="M0 24 L10 4 L14 12 L8 24 Z" fill="#fff" />
          <path d="M12 24 L20 8 L28 24 Z" fill="#7FA0FF" />
        </svg>
        <span className="wide text-[19px] font-[640] tracking-[-0.02em]">RAHUL K. RAI</span>
      </span>
      <span className="flex flex-col gap-[5px]" aria-hidden>
        <span className="block h-[2px] w-5 bg-white" />
        <span className="block h-[2px] w-3 self-end bg-white" />
      </span>
    </motion.div>
  );
}

/* stats frame: dark card + visual card */
function StatsFrame({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div {...rise(7)} className={`grid grid-cols-2 gap-1.5 rounded-[14px] bg-paper-deep p-1.5 ${className}`} style={style}>
      <div className="flex flex-col justify-between rounded-[10px] bg-ink p-3.5 text-white">
        <div>
          <div className="wide-104 text-[30px] font-[640] leading-none tracking-[-0.04em]">
            <CountUp to={40} suffix="%+" delay={0.9} />
          </div>
          <div className="mt-1 text-[11px] text-white/60">Organic growth driven</div>
        </div>
        <div className="my-2.5 grid grid-cols-3 gap-x-2 gap-y-1.5 text-[9px] text-white/70">
          {CREDENTIAL_MARKS.map((m) => (
            <span key={m.name} className="flex items-center gap-1 whitespace-nowrap">
              <span className="text-[8px] text-cobalt-glow">{m.glyph}</span>
              {m.name.split(" ")[0]}
            </span>
          ))}
        </div>
        <a href="#work" className="flex items-center justify-between rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-ink">
          See results <ArrowUR className="h-3 w-3" />
        </a>
      </div>
      <div className="grain relative flex flex-col justify-between overflow-hidden rounded-[10px] bg-[linear-gradient(160deg,#0F1B4D,#1F3FB0_60%,#7FA0FF)] p-3.5 text-white">
        <div className="relative flex items-center justify-between border-t border-white/40 pt-2 text-[10px] text-white/75">
          <span>Honours</span>
          <span>2024 · 25</span>
        </div>
        <div className="relative text-right">
          <div className="wide-104 text-[30px] font-[640] leading-none tracking-[-0.04em]">
            <CountUp to={6} suffix="+" delay={1} />
          </div>
          <div className="mt-1 text-[11px] leading-tight text-white/75">
            Awards & national
            <br />
            recognitions
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* "Latest" card with progress line */
function LatestCard({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.a href="#work" {...rise(9)} className={`group block ${className}`} style={style}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[12px] text-muted">Latest venture</div>
          <div className="wide-104 mt-1 text-[22px] font-[640] leading-none tracking-[-0.03em]">Alankrita</div>
        </div>
        <span className="text-[12px] font-medium text-muted">[2025]</span>
      </div>
      <div className="grain relative mt-3 h-[196px] overflow-hidden rounded-[12px] bg-ink">
        <div className="absolute inset-0 origin-[62%_45%] bg-[radial-gradient(circle_at_62%_45%,#7FA0FF_0%,#1F3FB0_32%,#0B0B0C_70%)] transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute left-[18%] top-[18%] aspect-square w-[46%] rounded-full border-[6px] border-white/80" />
        <div className="absolute left-[38%] top-[30%] aspect-square w-[40%] rounded-full border-[3px] border-cobalt-glow/90" />
        <div className="absolute bottom-3 left-3 text-white">
          <div className="wide-104 text-[26px] font-[640] leading-none">70.3%</div>
          <div className="text-[10px] text-white/70">profit margin</div>
        </div>
        <span className="glass absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full text-white transition-transform duration-500 group-hover:rotate-45">
          <ArrowUR />
        </span>
      </div>
      <div className="mt-3 h-px w-full bg-ink/20">
        <motion.div className="h-full origin-left bg-ink" initial={{ scaleX: 0 }} animate={{ scaleX: 0.62 }} transition={{ duration: 1.6, delay: 1.2, ease }} />
      </div>
    </motion.a>
  );
}

function AboutBlock({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <motion.div {...rise(2)} className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em]">
        <span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> (ABOUT)
      </motion.div>
      <motion.p {...rise(3)} className="mt-4 max-w-[300px] text-[14px] leading-[1.45] text-ink-soft">
        Digital marketer & MBA building brands that rank, convert and grow — SEO, ads, social and websites.
      </motion.p>
      <motion.div {...rise(4)} className="mt-6">
        <a href="#contact" className="btn-dark">
          Book a call <ArrowUR />
        </a>
      </motion.div>
    </div>
  );
}

function Title({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <h1 className={`wide-104 font-[640] uppercase leading-[0.86] tracking-[-0.06em] ${className}`} style={style}>
      <span className="flex items-start">
        <MaskLine onLoad delay={0.15}>
          Rahul
        </MaskLine>
        <motion.span {...rise(1)} className="ml-[0.12em] mt-[0.1em] block text-[0.24em] font-medium normal-case leading-none tracking-[-0.02em]">
          (&apos;26)
        </motion.span>
      </span>
      <MaskLine onLoad delay={0.26}>
        Kumar Rai
      </MaskLine>
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, (v) => v * 0.12);

  return (
    <>
      <section id="top" ref={ref} className="relative overflow-hidden bg-paper" style={{ ["--u" as string]: U }}>
        {/* ======================= DESKTOP (artboard) ======================= */}
        <div className="relative hidden lg:block" style={{ height: u(938) }}>
          <div className="absolute" style={{ left: u(338), top: u(-86), width: u(764), height: u(1024) }}>
            <div className="absolute" style={{ left: u(122), top: u(200), width: u(520), height: u(910) }}>
              <HeroVisual drift={drift} />
            </div>
          </div>

          <div className="absolute z-20" style={{ left: u(57), top: u(61) }}>
            <NavPill />
          </div>

          <motion.div {...rise(0)} className="absolute z-20 text-[13px] leading-[1.35]" style={{ left: u(1010), top: u(64) }}>
            <div className="font-medium">Open for projects</div>
            <div className="text-muted">Freelance · Consulting · 2026</div>
          </motion.div>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="btn-dark absolute z-20 justify-center !px-0"
            style={{ left: u(1237), top: u(63), width: u(146), height: u(46) }}
          >
            Contact Us <ArrowUR />
          </motion.a>

          <Title className="absolute z-10" style={{ left: u(57), top: u(246), fontSize: u(96) }} />

          <AboutBlock className="absolute z-10" style={{ left: u(57), top: u(458) }} />

          <StatsFrame className="absolute z-10" style={{ left: u(57), top: u(693), width: u(341), height: u(208) }} />

          {/* right column */}
          <motion.div
            {...rise(5)}
            className="glass absolute z-10 flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-[13px] font-medium"
            style={{ right: u(57), top: u(258) }}
          >
            Revenue-first growth <CheckDisc className="h-7 w-7" />
          </motion.div>
          <motion.div {...rise(6)} className="absolute z-10 text-right" style={{ right: u(57), top: u(400) }}>
            <div className="wide-104 font-[600] leading-[0.95] tracking-[-0.04em]" style={{ fontSize: u(34) }}>
              I&apos;m available
            </div>
            <div className="wide-104 flex items-center justify-end gap-2 font-[600] leading-[1] tracking-[-0.04em] text-muted" style={{ fontSize: u(34) }}>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cobalt opacity-50" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-cobalt" />
              </span>
              for you
            </div>
          </motion.div>
          <LatestCard className="absolute z-10" style={{ right: u(57), top: u(560), width: u(260) }} />

          <Plate className="absolute z-10" style={{ left: u(538), top: u(470), width: u(364), height: u(73) }} />

          <motion.div
            {...rise(8)}
            className="wide absolute z-10 flex justify-center gap-[calc(var(--u)*34)] text-[13px] font-[600] uppercase tracking-[0.02em] text-white/90"
            style={{ left: u(460), width: u(520), top: u(860) }}
          >
            <span>IIT Roorkee</span>
            <span>IBM</span>
            <span>NISM</span>
          </motion.div>
        </div>

        {/* ======================= MOBILE / TABLET ======================= */}
        <div className="relative px-5 pb-10 pt-5 lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <NavPill size={44} />
            <a href="#contact" aria-label="Contact" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white">
              <ArrowUR className="h-4 w-4" />
            </a>
          </div>
          <Title className="mt-12" style={{ fontSize: "min(17vw, 120px)" }} />
          <AboutBlock className="mt-8" />
          <div className="relative mx-auto mt-10 h-[min(120vw,560px)] w-full max-w-[460px]">
            <HeroVisual drift={drift} />
            <Plate className="absolute inset-x-[7%] top-[44%] h-[60px]" />
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <motion.div {...rise(5)} className="glass flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-[13px] font-medium">
              Revenue-first growth <CheckDisc className="h-7 w-7" />
            </motion.div>
          </div>
          <StatsFrame className="mt-5 h-[210px]" />
          <LatestCard className="mt-8" />
        </div>
      </section>

      {/* ======================= BLACK BAR ======================= */}
      <div className="wide relative z-10 border-b border-white/15 bg-night text-white">
        <div className="mx-auto flex h-[84px] max-w-[1440px] items-center justify-between px-5 text-[11px] font-[600] uppercase tracking-[0.04em] md:h-[111px] md:px-[57px] md:text-[13px]">
          <span>
            Est <span className="text-white/40">2023</span>
          </span>
          <a href="#statement" className="flex items-center gap-3">
            <span className="hidden sm:inline">Scroll down</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink"
            >
              <ArrowDown />
            </motion.span>
          </a>
          <span className="text-white/40">Live in details</span>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  STATEMENT — words fill grey → white as you scroll                  */
/* ------------------------------------------------------------------ */
const STATEMENT =
  "I believe the strongest brands are built through strategy, not just aesthetics. Every campaign I run is designed to capture attention, inspire action and create lasting business growth.";

function FillWord({ word, i, progress, total }: { word: string; i: number; progress: MotionValue<number>; total: number }) {
  // 3-word soft edge in reading order
  const color = useTransform(progress, (p) => {
    const filled = p * (total + 3);
    const t = Math.min(1, Math.max(0, (filled - i) / 3));
    const c = Math.round(111 + (244 - 111) * t);
    return `rgb(${c},${c},${c})`;
  });
  return (
    <motion.span style={{ color }} className="inline-block whitespace-pre">
      {word}{" "}
    </motion.span>
  );
}

export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = STATEMENT.split(" ");
  return (
    <section id="statement" className="bg-night px-5 pb-[140px] pt-[110px] text-[#f4f4f4] md:pb-[230px] md:pt-[170px]">
      <p
        ref={ref}
        className="mx-auto max-w-[880px] text-center text-[28px] font-medium leading-[1.3] tracking-[-0.028em] md:text-[52px] md:leading-[1.33]"
      >
        {words.map((w, i) => (
          <FillWord key={i} word={w} i={i} progress={scrollYProgress} total={words.length} />
        ))}
      </p>
      <div className="mx-auto mt-[90px] max-w-[880px] text-center text-[18px] leading-[1.35] tracking-[-0.01em] md:mt-[150px] md:text-[23px]">
        <MaskLine>Performance-driven marketing, from</MaskLine>
        <MaskLine delay={0.08}>
          strategy to execution. <span className="text-white/45">Built for growing brands.</span>
        </MaskLine>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TRUST PANEL                                                        */
/* ------------------------------------------------------------------ */
const DISCS = ["IIT", "IBM", "NISM", "LPU", "SBI", "PU", "KV", "E-N"];

function Laurel() {
  const leaves = Array.from({ length: 7 });
  return (
    <svg viewBox="0 0 200 120" className="h-auto w-full" aria-hidden>
      {[-1, 1].map((side) => (
        <g key={side} transform={`translate(100 0) scale(${side} 1)`}>
          <path d="M-12 108 C -58 98, -82 64, -78 18" fill="none" stroke="#f4f4f4" strokeWidth="1.6" />
          {leaves.map((_, i) => {
            const t = i / 6;
            const x = -12 - 66 * Math.sin(t * 1.35);
            const y = 106 - 88 * t;
            return <ellipse key={i} cx={x} cy={y} rx="9" ry="3.6" fill="#f4f4f4" transform={`rotate(${-40 - t * 60} ${x} ${y})`} />;
          })}
        </g>
      ))}
      <text x="100" y="52" textAnchor="middle" fill="#f4f4f4" fontSize="11" fontWeight="700" letterSpacing="1.5">
        1ST POSITION
      </text>
      <text x="100" y="68" textAnchor="middle" fill="#7FA0FF" fontSize="9" fontWeight="600" letterSpacing="1.2">
        INNOTEK · 2025
      </text>
    </svg>
  );
}

export function TrustPanel() {
  return (
    <section className="bg-night px-5 pb-[110px] md:pb-[150px]">
      <div className="mx-auto grid max-w-[1302px] gap-10 rounded-[14px] border border-white/25 p-6 text-[#f4f4f4] md:p-10 lg:grid-cols-[1fr_auto] lg:gap-8">
        <div className="relative">
          <h2 className="text-[40px] font-medium leading-[1.02] tracking-[-0.035em] md:text-[55px]">
            <MaskLine>Trusted for</MaskLine>
            <MaskLine delay={0.06}>real, measurable</MaskLine>
            <MaskLine delay={0.12}>
              <span className="text-white/45">growth.</span>
            </MaskLine>
          </h2>
          <FadeTile className="absolute right-[6%] top-[-6px] hidden md:grid" glyph="✳" />
          <p className="mt-8 max-w-[380px] text-[14.5px] leading-[1.55] text-white/60">
            From an NGO&apos;s 1,000+ donor records to live SEO campaigns and my own brands, every number here comes from work that shipped — certified by IIT
            Roorkee, IBM and NISM along the way.
          </p>
        </div>

        <div className="flex gap-3 overflow-hidden lg:-mr-10">
          {/* discs card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex w-[260px] shrink-0 flex-col justify-between rounded-[8px] bg-[#d6d6d6] p-5 text-ink md:h-[326px] md:w-[293px]"
          >
            <div className="grid grid-cols-4 gap-2.5">
              {DISCS.map((d, i) => (
                <motion.span
                  key={d}
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + i * 0.06 }}
                  className={`grid aspect-square place-items-center rounded-full text-[10px] font-bold ${i % 3 === 0 ? "bg-ink text-white" : i % 3 === 1 ? "bg-white" : "bg-cobalt text-white"}`}
                >
                  {d}
                </motion.span>
              ))}
            </div>
            <div className="mt-10">
              <div className="text-[43px] font-medium leading-none tracking-[-0.04em]">
                <CountUp to={100} suffix="+" />
              </div>
              <div className="mt-2 text-[14px] text-ink/70">Content assets shipped</div>
            </div>
          </motion.div>

          {/* awards card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="flex w-[260px] shrink-0 flex-col justify-between rounded-[8px] bg-[#262626] p-5 md:h-[326px] md:w-[298px]"
          >
            <div>
              <div className="text-[43px] font-medium leading-none tracking-[-0.04em]">
                <CountUp to={6} suffix="+" />
              </div>
              <div className="mt-2 text-[14px] text-white/60">Honours & awards</div>
            </div>
            <div className="mx-auto my-4 w-[78%]">
              <Laurel />
            </div>
            <p className="text-[12px] leading-[1.45] text-white/50">
              Including Top 100 Student Innovations at IIT Delhi and an exhibitor slot in Poland.
            </p>
          </motion.div>

          {/* cut-off card */}
          <motion.div
            whileHover={{ y: -6 }}
            className="grain relative hidden w-[200px] shrink-0 overflow-hidden rounded-[8px] bg-[linear-gradient(170deg,#9DB4FF,#3B5BF0_55%,#0F1B4D)] p-5 md:block md:h-[326px]"
          >
            <div className="relative text-[12px] text-white/80">MBA · LPU</div>
            <div className="absolute bottom-5 left-5 text-white">
              <div className="text-[43px] font-medium leading-none tracking-[-0.04em]">8.4</div>
              <div className="mt-1 text-[12px] text-white/75">CGPA</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FadeTile({ className = "", glyph, delay = 0 }: { className?: string; glyph: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease }}
      className={`h-[88px] w-[88px] place-items-center rounded-[12px] border border-white/20 bg-white/10 text-[34px] text-white backdrop-blur-md ${className}`}
      aria-hidden
    >
      {glyph}
    </motion.span>
  );
}

