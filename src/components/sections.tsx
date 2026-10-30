"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CONTACT, PROJECTS, SERVICES, TILES } from "@/data";
import { ArrowUR, FadeIn, MaskLine, ease } from "./ui";

/* ------------------------------------------------------------------ */
/*  SCROLL-DRIVEN TILE ROWS                                            */
/* ------------------------------------------------------------------ */
const TONE: Record<string, { bg: string; k: string; v: string }> = {
  cobalt: { bg: "bg-[linear-gradient(150deg,#0F1B4D,#1F3FB0_55%,#7FA0FF)] text-white", k: "text-white", v: "text-white/70" },
  ink: { bg: "bg-ink text-white", k: "text-white", v: "text-white/60" },
  paper: { bg: "bg-white text-ink", k: "ink-text", v: "text-ink/60" },
  ice: { bg: "bg-cobalt-ice text-ink", k: "text-cobalt", v: "text-ink/60" },
};

function Tile({ t, i }: { t: (typeof TILES)[number]; i: number }) {
  const s = TONE[t.tone];
  return (
    <div className={`grain relative flex h-[200px] w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-6 md:h-[270px] md:w-[420px] md:p-8 ${s.bg}`}>
      {/* decorative motif */}
      {i % 3 === 0 ? (
        <svg viewBox="0 0 120 40" className="absolute right-6 top-6 w-28 opacity-60" aria-hidden>
          <polyline points="0,34 18,28 34,30 52,18 70,22 88,10 120,4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      ) : i % 3 === 1 ? (
        <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full border-[10px] border-current opacity-10" aria-hidden />
      ) : (
        <span className="absolute right-6 top-6 flex items-end gap-1 opacity-50" aria-hidden>
          {[10, 16, 13, 22, 28].map((h, k) => (
            <span key={k} className="w-2 rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
      )}
      <span className="lbl relative opacity-60">{String(i + 1).padStart(2, "0")}</span>
      <div className="relative">
        <div className={`wide-104 text-[44px] font-[640] leading-none tracking-[-0.05em] md:text-[64px] ${s.k}`}>{t.k}</div>
        <div className={`mt-2 text-[14px] md:text-[16px] ${s.v}`}>{t.v}</div>
      </div>
    </div>
  );
}

export function TileRows() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], [-420, 120]);
  const x2 = useTransform(scrollYProgress, [0, 1], [120, -420]);
  const half = Math.ceil(TILES.length / 2);
  const row1 = TILES.slice(0, half);
  const row2 = TILES.slice(half);
  return (
    <section ref={ref} aria-label="Highlights" className="relative z-10 -mt-12 overflow-hidden rounded-t-[40px] bg-paper pb-16 pt-24 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px] md:pb-20 md:pt-32">
      <div className="wrap mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
        <h2 className="wide-104 text-[44px] font-[640] uppercase leading-[0.9] tracking-[-0.05em] md:text-[88px]">
          <MaskLine>Proof,</MaskLine>
          <MaskLine delay={0.08}>
            <span className="text-muted">in numbers</span>
          </MaskLine>
        </h2>
        <FadeIn className="max-w-sm text-[15px] leading-relaxed text-ink-soft">
          Results from live campaigns, roles and ventures — scroll to move the rows.
        </FadeIn>
      </div>
      <div className="flex flex-col gap-3">
        <motion.div style={{ x: x1 }} className="flex w-max gap-3 will-change-transform">
          {[...row1, ...row1, ...row1].map((t, i) => (
            <Tile key={`a${i}`} t={t} i={i % row1.length} />
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="-ml-[600px] flex w-max gap-3 will-change-transform">
          {[...row2, ...row2, ...row2].map((t, i) => (
            <Tile key={`b${i}`} t={t} i={(i % row2.length) + row1.length} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SERVICES — giant numbered list on white                            */
/* ------------------------------------------------------------------ */
export function Services() {
  return (
    <section id="services" className="relative z-10 -mt-12 rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 className="wide-104 text-center font-[700] uppercase leading-none tracking-[-0.06em]" style={{ fontSize: "clamp(3rem, 12vw, 170px)" }}>
        <MaskLine>
          <span className="ink-text">Services</span>
        </MaskLine>
      </h2>
      <div className="mx-auto mt-16 max-w-5xl sm:mt-20 md:mt-28">
        {SERVICES.map((s, i) => (
          <FadeIn key={s.name} delay={i * 0.08}>
            <div className="group flex items-start gap-5 border-t border-ink/15 py-8 last:border-b sm:gap-8 sm:py-10 md:gap-14 md:py-12">
              <span
                className="wide-104 shrink-0 font-[700] leading-[0.8] tracking-[-0.06em] text-ink transition-colors duration-500 group-hover:text-cobalt"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-1 md:pt-3">
                <h3 className="font-medium uppercase tracking-[-0.01em]" style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                  {s.name}
                </h3>
                <p className="mt-3 max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)" }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WORK — sticky stacking cards                                       */
/* ------------------------------------------------------------------ */
function ProjectCard({
  p,
  i,
  total,
  progress,
}: {
  p: (typeof PROJECTS)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const target = 1 - (total - 1 - i) * 0.02;
  const scale = useTransform(progress, [i / total, 1], [1, target]);
  const hasUrl = "url" in p && !!p.url;
  return (
    <div className="md:sticky md:h-[calc(100vh-40px)]" style={{ top: `calc(84px + ${i * 14}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: "top center" }}
        className="mb-5 flex flex-col rounded-[32px] border-2 border-white/60 bg-night p-4 text-[#f4f4f4] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.9)] sm:p-6 md:mb-0 md:h-[clamp(400px,calc(100vh-150px),540px)] md:rounded-[44px] md:p-7"
      >
        {/* header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-1 pb-4 md:px-3 md:pb-5">
          <div className="flex min-w-0 items-center gap-4 md:gap-6">
            <span className="wide-104 metal-text shrink-0 font-[700] leading-[0.8] tracking-[-0.06em]" style={{ fontSize: "clamp(2.6rem, 5vw, 76px)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <div className="lbl text-white/55">{p.category}</div>
              <h3 className="mt-1.5 text-[22px] font-medium leading-tight tracking-[-0.02em] md:text-[30px]">{p.name}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/30 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/80 md:text-[12px]">{p.period}</span>
            {hasUrl && (
              <a
                href={(p as { url: string }).url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-transform hover:-translate-y-px md:text-[12px]"
              >
                Visit site <ArrowUR />
              </a>
            )}
          </div>
        </div>

        {/* body */}
        <div className="grid min-h-0 flex-1 gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_0.9fr]">
          {/* result */}
          <div className="grain relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-[24px] bg-[linear-gradient(150deg,#0F1B4D,#1F3FB0_55%,#7FA0FF)] p-6 md:rounded-[32px] md:p-7">
            <div className="lbl relative text-white/70">Result</div>
            <div className="relative">
              <div className="wide-104 text-[44px] font-[640] leading-none tracking-[-0.05em] md:text-[56px]">{p.metric}</div>
              <div className="mt-3 text-[15px] leading-snug text-white/85">{p.metricLabel}</div>
            </div>
          </div>

          {/* what I did */}
          <div className="flex flex-col rounded-[24px] bg-[#f4f2ed] p-6 text-ink md:rounded-[32px] md:p-7">
            <div className="lbl text-ink/55">What I did</div>
            <ul className="mt-4 space-y-4">
              {p.did.map((d) => (
                <li key={d} className="flex gap-3 text-[15px] leading-[1.55] md:text-[17px]">
                  <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* growth chart */}
          <div className="grain relative hidden overflow-hidden rounded-[24px] bg-[linear-gradient(180deg,#F3F5FB,#C9D5F6_55%,#7FA0FF)] lg:block lg:rounded-[32px]">
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,27,77,0.08)_1px,transparent_1px)] bg-[length:100%_20%]" />
            <div className="lbl absolute left-6 top-6 text-ink/55">Growth</div>
            <motion.div
              className="absolute inset-x-6 bottom-0 flex h-[70%] items-end gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {p.bars.map((h, k) => (
                <motion.span
                  key={k}
                  className={`flex-1 rounded-t-[8px] ${k === p.bars.length - 1 ? "bg-cobalt" : "bg-white/75"}`}
                  variants={{ hidden: { height: "0%" }, show: { height: `${h}%`, transition: { duration: 1.1, delay: 0.1 + k * 0.06, ease } } }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="work" className="relative z-10 -mt-12 rounded-t-[40px] bg-night px-4 pb-16 pt-20 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-24 md:pt-28">
      <h2 className="wide-104 text-center font-[700] uppercase leading-none tracking-[-0.06em]" style={{ fontSize: "clamp(3rem, 12vw, 170px)" }}>
        <MaskLine>
          <span className="metal-text">Work</span>
        </MaskLine>
      </h2>
      <p className="mx-auto mt-6 max-w-md text-center text-[15px] text-white/55">Websites, campaigns and ventures I&apos;ve built — scroll through all six.</p>
      <div ref={ref} className="mx-auto mt-14 max-w-6xl md:mt-20">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} total={PROJECTS.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */
export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };
  const links = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "LinkedIn", value: "in/rahul-rai2003", href: CONTACT.linkedin, ext: true },
    { label: "Phone", value: CONTACT.phone.replace(/^\+91(\d{5})(\d{5})$/, "+91 $1 $2"), href: `tel:${CONTACT.phone}` },
  ];
  return (
    <section id="contact" className="relative z-10 -mt-12 rounded-t-[40px] bg-paper px-5 pb-16 pt-20 sm:rounded-t-[50px] md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-[1302px]">
        <div className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em]">
          <span className="h-1.5 w-1.5 rounded-full bg-cobalt" /> (CONTACT)
        </div>
        <h2 className="wide-104 mt-6 font-[640] uppercase leading-[0.86] tracking-[-0.06em]" style={{ fontSize: "clamp(3rem, 10vw, 150px)" }}>
          <MaskLine>Let&apos;s build</MaskLine>
          <MaskLine delay={0.08}>
            <span className="text-muted">your growth.</span>
          </MaskLine>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <FadeIn>
            <p className="max-w-md text-[17px] leading-relaxed text-ink-soft">
              Freelance projects, brand collaborations, websites or consulting — tell me what you&apos;re working on and I&apos;ll get back to you.
            </p>
            <div className="mt-10 border-t border-ink/15">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 border-b border-ink/15 py-5"
                >
                  <span className="flex min-w-0 items-baseline gap-6">
                    <span className="lbl w-20 shrink-0 text-muted">{l.label}</span>
                    <span className="truncate text-[17px] font-medium md:text-[20px]">{l.value}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-ink group-hover:text-white">
                    <ArrowUR />
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={send} className="rounded-[28px] bg-white p-6 shadow-card md:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                {(["name", "email"] as const).map((k) => (
                  <label key={k} className="block">
                    <span className="lbl text-muted">{k === "name" ? "Your name" : "Email"}</span>
                    <input
                      required
                      type={k === "email" ? "email" : "text"}
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      placeholder={k === "name" ? "Jane Sharma" : "jane@company.com"}
                      className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-[16px] outline-none transition-colors placeholder:text-ink/30 focus:border-cobalt"
                    />
                  </label>
                ))}
              </div>
              <label className="mt-6 block">
                <span className="lbl text-muted">Project details</span>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What would you like to grow?"
                  className="mt-2 w-full resize-none border-b border-ink/20 bg-transparent py-3 text-[16px] outline-none transition-colors placeholder:text-ink/30 focus:border-cobalt"
                />
              </label>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <span className="text-[12px] text-muted">Opens your email app with this filled in.</span>
                <button type="submit" className="btn-glow">
                  Contact me
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-16 md:px-[57px]">
        <div className="wide-104 metal-text select-none font-[700] uppercase leading-[0.8] tracking-[-0.06em]" style={{ fontSize: "clamp(3.2rem, 13.5vw, 196px)" }} aria-hidden>
          Rahul K. Rai
        </div>
      </div>
      <div className="wide mx-auto mt-10 flex max-w-[1440px] flex-col justify-between gap-4 border-t border-white/15 px-5 py-7 text-[11px] font-[600] uppercase tracking-[0.04em] md:flex-row md:px-[57px] md:text-[12px]">
        <span>
          © {new Date().getFullYear()} Rahul Kumar Rai <span className="text-white/40">· All rights reserved</span>
        </span>
        <span className="flex gap-6">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cobalt-glow">
            LinkedIn
          </a>
          <a href={`mailto:${CONTACT.email}`} className="hover:text-cobalt-glow">
            Email
          </a>
          <a href="#top" className="text-white/40 hover:text-white">
            Back to top ↑
          </a>
        </span>
      </div>
    </footer>
  );
}

