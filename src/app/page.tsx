"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useSpring } from "framer-motion";

/* ================================================================== */
/*  CONTENT — edit the whole site from here                           */
/* ================================================================== */

const CONTACT = {
  email: "rahulkumarrai.work@gmail.com",
  phone: "+919876543210",
  linkedin: "https://www.linkedin.com/in/rahul-rai2003/",
};

const NAV = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "credentials", label: "Credentials" },
];

const CREDENTIALS_STRIP = [
  "IIT Roorkee",
  "IBM",
  "NISM · SEBI",
  "Lovely Professional University",
  "SBI Youth Ideathon · IIT Delhi",
  "E-NNOVATE Summit · Poland",
  "Punjab University",
];

const IMPACT = [
  { value: 40, prefix: "", suffix: "%", label: "Increase in organic impressions", note: "AI-assisted SEO at MNR Solutions" },
  { value: 27, prefix: "", suffix: "%", label: "Lift in CTR & session duration", note: "GA4 + Search Console analysis" },
  { value: 70, prefix: "", suffix: "%", label: "Profit margin on own brand", note: "Alankrita — ₹51,644 revenue" },
  { value: 2, prefix: "", suffix: "×", label: "Social engagement", note: "100+ content assets, NGO campaigns" },
];

const SERVICES = [
  {
    no: "01",
    title: "Search Engine Optimisation",
    desc: "Keyword clustering, on-page and technical fixes, content-gap analysis and backlink strategy — built to rank and stay ranked.",
    items: ["Keyword research", "On-page & meta", "Search Console & GA4", "Off-page / backlinks"],
  },
  {
    no: "02",
    title: "Performance Marketing",
    desc: "Meta and Google campaigns structured around revenue, not vanity metrics — from audience setup to creative testing.",
    items: ["Meta Ads Manager", "Google Ads", "Audience targeting", "ROAS tracking"],
  },
  {
    no: "03",
    title: "Social Media & Content",
    desc: "Platform strategy, content calendars and AI-assisted video that grow reach, engagement and community.",
    items: ["Content strategy", "AI video creation", "Canva design", "Insights & reporting"],
  },
  {
    no: "04",
    title: "Websites that Convert",
    desc: "Fast, modern websites and Shopify stores designed around SEO and conversion — from storefront UX to launch.",
    items: ["Website building", "Shopify stores", "SEO-led UI/UX", "Landing pages"],
  },
];

const CASES = [
  {
    tag: "E-commerce · Paid social",
    title: "Launching a Shopify store with Meta Ads",
    period: "Jan – Feb 2025",
    metric: "₹7,385",
    metricLabel: "Sales in the first month",
    did: [
      "Built the Shopify store end-to-end — product listings, catalogue structure and storefront UX",
      "Planned and launched Meta Ads campaigns to drive first-month revenue",
    ],
  },
  {
    tag: "Own venture · Brand building",
    title: "Alankrita — a handcrafted jewelry brand",
    period: "Venture",
    metric: "70.3%",
    metricLabel: "Profit margin on ₹51,644 revenue",
    did: [
      "Ran a social-media-led marketing strategy and customer engagement",
      "Managed finances and pricing to protect margin while scaling sales",
    ],
  },
  {
    tag: "Brand identity · Go-to-market",
    title: "Unbrand to Brand — USHMR",
    period: "Aug – Sept 2024",
    metric: "₹10,000",
    metricLabel: "Revenue across sourcing, branding & sales",
    did: ["Analysed the business model and positioning", "Designed the brand identity — logo and positioning — and took it to market"],
  },
  {
    tag: "Affiliate · Multi-channel",
    title: "August Bioscience affiliate campaigns",
    period: "Nov – Dec 2024",
    metric: "₹5,000",
    metricLabel: "Product sales driven",
    did: ["Ran campaigns across social, email, influencer tie-ups and paid promotion", "Earned ₹1,000 in commission on ₹5,000 of product sales"],
  },
];

const EXPERIENCE = [
  {
    company: "MNR Solutions — TWEOV (Silver Brand)",
    place: "Noida",
    role: "Digital Marketing Trainee",
    period: "May 2025 — Oct 2025",
    points: [
      "Implemented AI-assisted SEO workflows — keyword clustering, meta optimisation, SERP alignment — contributing to a 40% increase in organic impressions.",
      "Analysed Google Search Console and GA4 data to identify content gaps, improving CTR and session duration by 27%.",
      "Researched 50+ competitor link profiles to strengthen the off-page SEO and backlink strategy.",
      "Partnered with design and content teams on SEO-driven UI/UX, reducing bounce rate by 15%.",
    ],
  },
  {
    company: "Sharva Aikyam Foundation",
    place: "NGO",
    role: "Social Media Head & Core Team Member",
    period: "Nov 2023 — Apr 2024",
    points: [
      "Led social media across Instagram, Facebook, Twitter and LinkedIn, growing reach and engagement by 35–45%.",
      "Produced 100+ content assets, doubling engagement and lifting volunteer participation by 25%.",
      "Optimised campaigns with Instagram Insights, Meta Business Suite, Sheets and Excel across 1,000+ donor and campaign records.",
    ],
  },
];

const PROCESS = [
  { step: "Audit", desc: "Analytics, search and competitor review to find where growth is being left on the table." },
  { step: "Strategy", desc: "A focused plan — channels, keywords, content and budget — tied to a revenue goal." },
  { step: "Execute", desc: "Campaigns, content and site improvements shipped fast, with clean tracking from day one." },
  { step: "Scale", desc: "Weekly reporting, testing and reallocation toward what's actually converting." },
];

const SKILL_GROUPS = [
  {
    title: "Marketing",
    skills: [
      { name: "Social Media Marketing", level: 85 },
      { name: "Meta Ads Manager", level: 85 },
      { name: "Google Ads / SEO", level: 82 },
    ],
  },
  {
    title: "Creative & Build",
    skills: [
      { name: "Canva", level: 85 },
      { name: "Website Building", level: 75 },
      { name: "MS PowerPoint", level: 85 },
    ],
  },
  {
    title: "Analytics",
    skills: [
      { name: "MS Excel", level: 85 },
      { name: "Data Visualization", level: 75 },
    ],
  },
];

const CAPABILITIES = ["Leadership", "Teamwork", "Communication", "Learning Agility", "CRM Systems", "Product Development", "Practical Application"];

const EDUCATION = [
  { degree: "MBA — Digital Marketing & Finance", school: "Lovely Professional University", period: "2024 — 2026", score: "CGPA 8.4" },
  { degree: "Bachelor of Commerce", school: "Punjab University", period: "2020 — 2023", score: "CGPA 7.1" },
  { degree: "Class XII — Commerce", school: "Kendriya Vidyalaya, Ambala Cantt", period: "2019 — 2020" },
  { degree: "Class X", school: "Kendriya Vidyalaya, Ambala Cantt", period: "2017 — 2018" },
];

const CERTIFICATIONS = [
  { title: "Digital Marketing Mastery", issuer: "IIT Roorkee", date: "Feb 2025" },
  { title: "SEBI Investor Certification (46/50)", issuer: "NISM", date: "Jan 2025" },
  { title: "Data Visualization with Python", issuer: "IBM", date: "Dec 2024" },
  { title: "Financial Markets & Investment Strategies", issuer: "Global Institutional Program", date: "Ongoing" },
];

const AWARDS = [
  { title: "Selected Innovation Exhibitor", org: "E-NNOVATE International Summit, Poland", date: "Jun 2025" },
  { title: "1st Position & Most Innovative Entrepreneurship–Startup Award", org: "Innotek, LPU", date: "Apr 2025" },
  { title: "Top 100 Student Innovations", org: "SBI College Youth Ideathon, IIT Delhi", date: "Mar 2025" },
  { title: "₹11,900 revenue from a live event on ₹1,500 investment", org: "Lovely Professional University", date: "Feb 2025" },
  { title: "2nd Runner-Up — Tourism Tapestry", org: "Lovely Professional University", date: "Jan 2025" },
  { title: "1st Position — Innovation Nation", org: "Venture Capital Competition, LPU", date: "Dec 2024" },
];

/* ================================================================== */
/*  Building blocks                                                    */
/* ================================================================== */

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-emerald" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

function SectionTitle({ kicker, children, aside }: { kicker: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1.4fr_1fr] md:items-end">
      <Reveal>
        <div className="kicker">{kicker}</div>
        <h2 className="h-section mt-5">{children}</h2>
      </Reveal>
      {aside && (
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-muted md:pb-2">{aside}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function Home() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 300) setActive("");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project enquiry from ${form.name || "your website"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-sapphire" />

      {/* ============================ NAV ============================ */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "border-b border-line bg-ivory/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-[76px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label="Rahul Kumar Rai — home">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-serif text-[15px] italic text-white">Rk</span>
            <span className="leading-tight">
              <span className="block font-serif text-[17px] font-medium">Rahul Kumar Rai</span>
              <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-muted">Growth & Digital Marketing</span>
            </span>
          </a>

          <div className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative py-1 text-[14px] font-medium transition-colors ${active === n.id ? "text-ink" : "text-muted hover:text-ink"}`}
              >
                {n.label}
                {active === n.id && <motion.span layoutId="nav-line" className="absolute -bottom-1 left-0 right-0 h-px bg-sapphire" />}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:inline-flex btn-primary !px-6 !py-3">
              Start a project <Arrow />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-paper lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                {menuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="border-t border-line bg-ivory lg:hidden">
            <div className="container-x py-4">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="block border-b border-line py-4 font-serif text-2xl">
                  {n.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-5 w-full justify-center">
                Start a project <Arrow />
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* ============================ HERO ============================ */}
      <section id="top" className="relative pt-[120px] md:pt-[150px] pb-16 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-10%] top-[-10%] h-[620px] w-[620px] rounded-full bg-sapphire/10 blur-[120px]" />
          <div className="absolute left-[-10%] bottom-[-20%] h-[500px] w-[500px] rounded-full bg-emerald/10 blur-[120px]" />
        </div>

        <div className="container-x grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald-soft px-3.5 py-1.5 text-[13px] font-semibold text-emerald">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
                </span>
                Available for new projects
              </span>
              <span className="text-[13px] font-medium text-muted">MBA · Digital Marketing & Finance</span>
            </motion.div>

            <h1 className="mt-8 font-serif text-[2.9rem] leading-[0.98] tracking-[-0.03em] sm:text-[4.4rem] lg:text-[4.6rem] xl:text-[5.1rem]">
              {[
                <>Marketing that</>,
                <>
                  <em className="font-normal italic text-sapphire">compounds</em>&nbsp;into
                </>,
                <>real revenue.</>,
              ].map((line, i) => (
                <motion.span key={i} className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.08 + i * 0.1, ease }}>
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
            >
              I&apos;m <span className="font-semibold text-ink">Rahul Kumar Rai</span> — a digital marketer specialising in SEO, performance marketing,
              social media and conversion-focused websites. I help brands grow from zero to measurable results.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-10 flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary">
                Let&apos;s work together <Arrow />
              </a>
              <a href="#work" className="btn-ghost">
                View case studies
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-sm text-muted"
            >
              <span>
                <span className="font-semibold text-ink">6+</span> awards
              </span>
              <span>
                <span className="font-semibold text-ink">4</span> live ventures
              </span>
              <span>
                <span className="font-semibold text-ink">IIT Roorkee</span> certified
              </span>
            </motion.div>
          </div>

          {/* Dossier card */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease }} className="relative">
            <div className="absolute -inset-4 -z-10 hidden rounded-[2.2rem] sm:block border border-line bg-paper/40" />
            <div className="overflow-hidden rounded-[1.8rem] bg-paper shadow-deep">
              <div className="noise relative bg-navy p-7 text-white">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sapphire/40 blur-3xl" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Growth snapshot</div>
                    <div className="mt-3 font-serif text-[2.8rem] leading-none">+40%</div>
                    <div className="mt-2 text-sm text-white/70">Organic impressions · 6 months</div>
                  </div>
                  <span className="rounded-full bg-emerald-light/15 px-3 py-1 text-xs font-semibold text-emerald-light">▲ SEO</span>
                </div>
                <svg viewBox="0 0 320 90" className="relative mt-6 h-[90px] w-full" aria-hidden>
                  <defs>
                    <linearGradient id="fillg" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#8FAEFF" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#8FAEFF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 78 C 40 74, 60 70, 90 62 S 140 58, 170 46 S 230 36, 260 22 S 300 12, 320 6 L 320 90 L 0 90 Z"
                    fill="url(#fillg)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                  <motion.path
                    d="M0 78 C 40 74, 60 70, 90 62 S 140 58, 170 46 S 230 36, 260 22 S 300 12, 320 6"
                    fill="none"
                    stroke="#8FAEFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 1.6, ease }}
                  />
                </svg>
              </div>
              <div className="grid grid-cols-2 divide-x divide-line border-b border-line">
                <div className="p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Meta Ads</div>
                  <div className="mt-2 font-serif text-3xl">₹7,385</div>
                  <div className="mt-1 text-xs text-muted">Sales in month one</div>
                </div>
                <div className="p-6">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Bounce rate</div>
                  <div className="mt-2 font-serif text-3xl text-emerald">−15%</div>
                  <div className="mt-1 text-xs text-muted">SEO-led UI/UX</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 p-6">
                {["SEO", "Meta Ads", "Google Ads", "Shopify", "AI Video", "Web Design"].map((t) => (
                  <span key={t} className="rounded-full bg-ivory px-3 py-1.5 text-xs font-semibold text-ink-soft">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* credentials strip */}
      <div className="border-y border-line bg-paper">
        <div className="container-x flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Certified & recognised by</span>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
              {[...CREDENTIALS_STRIP, ...CREDENTIALS_STRIP].map((c, i) => (
                <span key={i} className="font-serif text-xl text-ink/70">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================ IMPACT ============================ */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Impact" aside="Every engagement is measured. These are results from live campaigns, ventures and roles — not projections.">
            Numbers that <em className="italic text-sapphire">speak first.</em>
          </SectionTitle>
          <div className="grid gap-px overflow-hidden rounded-[1.6rem] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} className="bg-paper p-8 md:p-9">
                <div className="font-serif text-[3.4rem] leading-none tracking-tight text-navy md:text-[4rem]">
                  <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <div className="mt-5 font-semibold">{m.label}</div>
                <div className="mt-1 text-sm text-muted">{m.note}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ SERVICES ============================ */}
      <section id="services" className="border-y border-line bg-paper py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Services" aside="Four disciplines that work best together — search, paid, social and the website they all point to.">
            How I help brands <em className="italic text-sapphire">grow.</em>
          </SectionTitle>
          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.no} delay={(i % 2) * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[1.6rem] border border-line bg-ivory/50 p-8 transition-all duration-500 hover:border-navy hover:bg-navy md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-serif text-lg italic text-sapphire transition-colors group-hover:text-sapphire-light">{s.no}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:border-white/30 group-hover:text-white">
                      <Arrow />
                    </span>
                  </div>
                  <h3 className="mt-10 font-serif text-[2rem] leading-tight tracking-tight transition-colors group-hover:text-white">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted transition-colors group-hover:text-white/70">{s.desc}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {s.items.map((it) => (
                      <span
                        key={it}
                        className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors group-hover:border-white/15 group-hover:bg-white/10 group-hover:text-white"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ CASE STUDIES ============================ */}
      <section id="work" className="py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Selected work" aside="Real ventures and campaigns I've built, launched and grown — each with a revenue outcome.">
            Case studies with <em className="italic text-sapphire">results.</em>
          </SectionTitle>
          <div className="space-y-5">
            {CASES.map((c, i) => (
              <Reveal key={c.title}>
                <article className="group grid overflow-hidden rounded-[1.6rem] border border-line bg-paper shadow-soft transition-shadow duration-500 hover:shadow-deep md:grid-cols-[1.5fr_1fr]">
                  <div className="p-8 md:p-11">
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="font-serif italic text-sapphire">Case {String(i + 1).padStart(2, "0")}</span>
                      <span className="h-1 w-1 rounded-full bg-line" />
                      <span className="font-semibold text-muted">{c.tag}</span>
                    </div>
                    <h3 className="mt-5 font-serif text-[1.9rem] leading-tight tracking-tight md:text-[2.4rem]">{c.title}</h3>
                    <div className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">What I did</div>
                    <ul className="mt-3 space-y-2.5">
                      {c.did.map((d) => (
                        <li key={d} className="flex gap-3 leading-relaxed text-ink-soft">
                          <Check />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`noise relative flex flex-col justify-between p-8 md:p-11 ${
                      i % 2 === 0 ? "bg-navy text-white" : "bg-sapphire-soft text-navy"
                    }`}
                  >
                    <div className={`text-sm font-medium ${i % 2 === 0 ? "text-white/60" : "text-navy/60"}`}>{c.period}</div>
                    <div className="mt-10">
                      <div className="font-serif text-[3.5rem] leading-none tracking-tight md:text-[4.2rem]">{c.metric}</div>
                      <div className={`mt-3 text-sm ${i % 2 === 0 ? "text-white/75" : "text-navy/75"}`}>{c.metricLabel}</div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="noise relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <div aria-hidden className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-sapphire/30 blur-[140px]" />
        <div className="container-x relative">
          <div className="mb-16 grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <Reveal>
              <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-sapphire-light">
                <span className="block h-px w-8 bg-sapphire-light" /> Process
              </div>
              <h2 className="h-section mt-5">
                A simple, <em className="italic text-sapphire-light">accountable</em> way of working.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/65">Clear steps, honest reporting and decisions driven by data — so you always know what&apos;s working.</p>
            </Reveal>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[1.6rem] bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.08} className="bg-navy-deep/60 p-8 backdrop-blur">
                <div className="font-serif text-5xl italic text-sapphire-light/80">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-8 font-serif text-2xl">{p.step}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/65">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ EXPERIENCE ============================ */}
      <section id="experience" className="py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Experience">
            Where I&apos;ve <em className="italic text-sapphire">delivered.</em>
          </SectionTitle>
          <div className="divide-y divide-line border-y border-line">
            {EXPERIENCE.map((job) => (
              <Reveal key={job.company}>
                <article className="grid gap-8 py-12 md:grid-cols-[1fr_1.7fr] md:gap-16">
                  <div className="md:sticky md:top-28 md:self-start">
                    <div className="text-sm font-semibold text-sapphire">{job.period}</div>
                    <h3 className="mt-3 font-serif text-[1.9rem] leading-tight tracking-tight">{job.role}</h3>
                    <div className="mt-2 text-muted">
                      {job.company} · {job.place}
                    </div>
                  </div>
                  <ul className="space-y-5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-4 text-[17px] leading-relaxed text-ink-soft">
                        <span className="mt-[11px] h-px w-5 shrink-0 bg-sapphire" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ EXPERTISE ============================ */}
      <section id="expertise" className="border-y border-line bg-paper py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Expertise" aside="Tools I use daily, and the strengths I bring to every team.">
            The <em className="italic text-sapphire">toolkit.</em>
          </SectionTitle>
          <div className="grid gap-5 lg:grid-cols-3">
            {SKILL_GROUPS.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.08} className="rounded-[1.6rem] border border-line bg-ivory/50 p-8">
                <h3 className="font-serif text-2xl">{g.title}</h3>
                <div className="mt-8 space-y-6">
                  {g.skills.map((s, i) => (
                    <div key={s.name}>
                      <div className="flex items-baseline justify-between text-[15px]">
                        <span className="font-semibold">{s.name}</span>
                        <span className="font-serif text-navy">{s.level}%</span>
                      </div>
                      <div className="mt-2.5 h-[3px] overflow-hidden rounded-full bg-line">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-navy to-sapphire"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.3, delay: 0.15 + i * 0.08, ease }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5 flex flex-col gap-5 rounded-[1.6rem] border border-line p-8 md:flex-row md:items-center md:gap-10">
            <h3 className="shrink-0 font-serif text-2xl">Core strengths</h3>
            <div className="flex flex-wrap gap-2.5">
              {CAPABILITIES.map((c) => (
                <span key={c} className="rounded-full bg-sapphire-soft px-4 py-2 text-sm font-semibold text-navy">
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ CREDENTIALS ============================ */}
      <section id="credentials" className="py-24 md:py-32">
        <div className="container-x">
          <SectionTitle kicker="Credentials">
            Education, certifications <em className="italic text-sapphire">& honours.</em>
          </SectionTitle>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <Reveal>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">Education</h3>
              </Reveal>
              <div className="mt-6 divide-y divide-line border-y border-line">
                {EDUCATION.map((e, i) => (
                  <Reveal key={e.degree} delay={i * 0.05}>
                    <div className="grid grid-cols-[1fr_auto] gap-4 py-6">
                      <div>
                        <div className="font-serif text-xl">{e.degree}</div>
                        <div className="mt-1 text-sm text-muted">{e.school}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-muted">{e.period}</div>
                        {e.score && <div className="mt-1 text-sm font-semibold text-emerald">{e.score}</div>}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <h3 className="mt-14 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">Certifications</h3>
              </Reveal>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {CERTIFICATIONS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-line bg-paper p-5 shadow-soft">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-sapphire">{c.issuer}</span>
                        <span className="text-muted">{c.date}</span>
                      </div>
                      <div className="mt-3 font-serif text-lg leading-snug">{c.title}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <Reveal>
                <h3 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-muted">Honours & awards</h3>
              </Reveal>
              <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-line bg-paper shadow-soft">
                {AWARDS.map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.04}>
                    <div className="group flex items-start gap-5 border-b border-line p-6 last:border-b-0 transition-colors hover:bg-ivory/60">
                      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy font-serif text-sm italic text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold leading-snug">{a.title}</div>
                        <div className="mt-1 text-sm text-muted">{a.org}</div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-muted">{a.date}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ CONTACT ============================ */}
      <section id="contact" className="pb-24 md:pb-32">
        <div className="container-x">
          <Reveal>
            <div className="noise relative overflow-hidden rounded-[2rem] bg-navy text-white shadow-deep">
              <div aria-hidden className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-sapphire/35 blur-[120px]" />
              <div aria-hidden className="absolute -bottom-40 right-0 h-[380px] w-[380px] rounded-full bg-emerald/25 blur-[120px]" />
              <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-sapphire-light">
                      <span className="block h-px w-8 bg-sapphire-light" /> Contact
                    </div>
                    <h2 className="mt-6 font-serif text-[2.8rem] leading-[1.02] tracking-tight md:text-[4.2rem]">
                      Let&apos;s grow your brand <em className="italic text-sapphire-light">together.</em>
                    </h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
                      Freelance projects, brand collaborations, websites or consulting — tell me what you&apos;re working on and I&apos;ll get back to you.
                    </p>
                  </div>
                  <div className="mt-10 space-y-3">
                    {[
                      { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                      { label: "LinkedIn", value: "in/rahul-rai2003", href: CONTACT.linkedin, ext: true },
                      { label: "Phone", value: CONTACT.phone.replace(/^\+91/, "+91 "), href: `tel:${CONTACT.phone}` },
                    ].map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center justify-between border-b border-white/15 py-3 transition-colors hover:border-white/50"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="w-20 text-xs font-semibold uppercase tracking-[0.16em] text-white/50">{c.label}</span>
                          <span className="break-all font-medium">{c.value}</span>
                        </span>
                        <Arrow className="h-4 w-4 shrink-0 text-white/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </a>
                    ))}
                  </div>
                </div>

                <form onSubmit={sendMail} className="rounded-[1.4rem] bg-paper p-7 text-ink md:p-9">
                  <h3 className="font-serif text-2xl">Start a project</h3>
                  <p className="mt-1 text-sm text-muted">Opens your email app with the details filled in.</p>
                  <div className="mt-7 space-y-5">
                    {[
                      { k: "name", label: "Your name", type: "text", ph: "Jane Sharma" },
                      { k: "email", label: "Email address", type: "email", ph: "jane@company.com" },
                    ].map((f) => (
                      <label key={f.k} className="block">
                        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{f.label}</span>
                        <input
                          required
                          type={f.type}
                          placeholder={f.ph}
                          value={form[f.k as "name" | "email"]}
                          onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                          className="mt-2 w-full rounded-xl border border-line bg-ivory/60 px-4 py-3.5 outline-none transition focus:border-sapphire focus:bg-paper focus:ring-4 focus:ring-sapphire/10"
                        />
                      </label>
                    ))}
                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Project details</span>
                      <textarea
                        required
                        rows={4}
                        placeholder="What are you looking to achieve?"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="mt-2 w-full resize-none rounded-xl border border-line bg-ivory/60 px-4 py-3.5 outline-none transition focus:border-sapphire focus:bg-paper focus:ring-4 focus:ring-sapphire/10"
                      />
                    </label>
                  </div>
                  <button type="submit" className="btn-primary mt-7 w-full justify-center">
                    Send enquiry <Arrow />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ FOOTER ============================ */}
      <footer className="border-t border-line bg-paper">
        <div className="container-x py-14">
          <div className="font-serif text-[13vw] leading-[0.9] tracking-[-0.04em] text-navy/[0.07] md:text-[9rem]" aria-hidden>
            Rahul Kumar Rai
          </div>
          <div className="mt-8 flex flex-col justify-between gap-5 text-sm text-muted md:flex-row md:items-center">
            <span>© {new Date().getFullYear()} Rahul Kumar Rai. All rights reserved.</span>
            <div className="flex flex-wrap gap-7">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} className="hover:text-ink">
                  {n.label}
                </a>
              ))}
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
