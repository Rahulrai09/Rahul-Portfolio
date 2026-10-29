"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  CONTENT — edit everything about the site from here                */
/* ------------------------------------------------------------------ */

const CONTACT = {
  email: "rahulkumarrai.work@gmail.com",
  phone: "+919876543210",
  linkedin: "https://www.linkedin.com/in/rahul-rai2003/",
};

const NAV = ["about", "experience", "projects", "skills", "education", "awards"] as const;

const ROLES = [
  "Digital Marketer",
  "SEO",
  "Performance Marketing",
  "AI Video Creation",
  "Social Media",
  "Website Building",
  "AI Tools",
];

const STATS = [
  { value: "40%", label: "Growth in organic impressions", tone: "violet" },
  { value: "₹51K+", label: "Revenue from Alankrita venture", tone: "sky" },
  { value: "70%", label: "Profit margin achieved", tone: "mint" },
  { value: "6+", label: "Awards & recognitions", tone: "rose" },
] as const;

const EXPERIENCE = [
  {
    company: "MNR Solutions (TWEOV – Silver Brand)",
    place: "Noida",
    role: "Digital Marketing Trainee",
    period: "May 2025 – Oct 2025",
    points: [
      "Implemented AI-assisted SEO workflows — keyword clustering, meta optimisation and SERP alignment — contributing to a 40% increase in organic impressions.",
      "Analysed Google Search Console + GA4 data to find content gaps, improving CTR and session duration by 27%.",
      "Researched 50+ competitor link profiles to strengthen backlink and off-page SEO strategy.",
      "Worked with design & content teams on SEO-driven UI/UX, cutting bounce rate by 15%.",
    ],
    tags: ["SEO", "GA4", "Search Console", "UI/UX"],
  },
  {
    company: "Sharva Aikyam Foundation",
    place: "NGO",
    role: "Social Media Head & Core Team Member",
    period: "Nov 2023 – Apr 2024",
    points: [
      "Led social media across Instagram, Facebook, Twitter & LinkedIn, growing reach and engagement by 35–45%.",
      "Created 100+ content assets, doubling engagement and lifting volunteer participation by 25%.",
      "Optimised campaigns with Instagram Insights, Meta Business Suite, Sheets & Excel across 1,000+ donor records.",
    ],
    tags: ["Social Media", "Content", "Meta Suite"],
  },
];

const PROJECTS = [
  {
    title: "Shopify Store & Meta Ads",
    kind: "E-commerce",
    period: "Jan – Feb 2025",
    metric: "₹7,385",
    metricLabel: "sales in month one",
    desc: "Built and optimised a Shopify store — listings, catalogue structure and storefront UX — then launched Meta Ads campaigns that converted from week one.",
    tone: "violet",
  },
  {
    title: "Alankrita — Handcrafted Jewelry",
    kind: "Own brand",
    period: "Venture",
    metric: "70.3%",
    metricLabel: "profit margin on ₹51,644",
    desc: "Social-media-led marketing strategy, finance management and customer engagement for a handcrafted jewelry brand.",
    tone: "rose",
  },
  {
    title: "Unbrand to Brand — USHMR",
    kind: "Brand identity",
    period: "Aug – Sept 2024",
    metric: "₹10,000",
    metricLabel: "revenue generated",
    desc: "Business model analysis plus a full brand identity — logo and positioning — taken through sourcing, branding and sales.",
    tone: "sky",
  },
  {
    title: "August Bioscience",
    kind: "Affiliate marketing",
    period: "Nov – Dec 2024",
    metric: "₹5,000",
    metricLabel: "product sales driven",
    desc: "Affiliate campaigns across social, email, influencer tie-ups and paid promotions — earning ₹1,000 in commission.",
    tone: "mint",
  },
] as const;

const SKILLS = [
  { name: "Social Media Marketing", level: 85 },
  { name: "Meta Ads Manager", level: 85 },
  { name: "Google Ads / SEO", level: 82 },
  { name: "Canva", level: 85 },
  { name: "MS Excel", level: 85 },
  { name: "MS PowerPoint", level: 85 },
  { name: "Website Building", level: 75 },
  { name: "Data Visualization", level: 75 },
];

const CAPABILITIES = [
  "Leadership",
  "Teamwork",
  "Communication",
  "Learning Agility",
  "CRM Systems",
  "Product Development",
  "Practical Application",
];

const EDUCATION = [
  {
    degree: "MBA — Digital Marketing & Finance",
    school: "Lovely Professional University",
    period: "Aug 2024 – May 2026",
    score: "CGPA 8.4",
    note: "Venture models, business strategy and computational analytics.",
  },
  {
    degree: "B.Com",
    school: "Punjab University",
    period: "Jul 2020 – Apr 2023",
    score: "CGPA 7.1",
    note: "Corporate accounting, financial systems, portfolio analytics and commerce regulation.",
  },
  {
    degree: "Class 12th — Commerce",
    school: "Kendriya Vidyalaya Ambala Cantt",
    period: "2019 – 2020",
    note: "Business fundamentals, economics and quantitative methods.",
  },
  {
    degree: "Class 10th",
    school: "Kendriya Vidyalaya Ambala Cantt",
    period: "2017 – 2018",
    note: "General science and humanities.",
  },
];

const CERTIFICATIONS = [
  { title: "Digital Marketing Mastery", issuer: "IIT Roorkee", date: "Feb 2025" },
  { title: "SEBI Investor Certification — 46/50", issuer: "NISM", date: "Jan 2025" },
  { title: "Data Visualization with Python", issuer: "IBM", date: "Dec 2024" },
  { title: "Financial Markets & Investment Strategies", issuer: "Global Institutional Program", date: "Ongoing" },
];

const AWARDS = [
  { icon: "🥇", title: "1st Position & Most Innovative Entrepreneurship–Startup Award", org: "Innotek, LPU", date: "Apr 2025" },
  { icon: "🌍", title: "Selected Innovation Exhibitor", org: "E-NNOVATE International Summit, Poland", date: "Jun 2025" },
  { icon: "💡", title: "Top 100 Student Innovations", org: "SBI College Youth Ideathon, IIT Delhi", date: "Mar 2025" },
  { icon: "💰", title: "₹11,900 revenue from a live event on ₹1,500 investment", org: "Lovely Professional University", date: "Feb 2025" },
  { icon: "🥉", title: "2nd Runner-Up", org: "Tourism Tapestry, LPU", date: "Jan 2025" },
  { icon: "🏆", title: "1st Position — Innovation Nation", org: "Venture Capital Competition, LPU", date: "Dec 2024" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TONES = {
  violet: { text: "text-violet", bg: "bg-violet-soft", bar: "bg-violet" },
  sky: { text: "text-sky", bg: "bg-sky-soft", bar: "bg-sky" },
  mint: { text: "text-mint", bg: "bg-mint-soft", bar: "bg-mint" },
  rose: { text: "text-rose", bg: "bg-rose-soft", bar: "bg-rose" },
} as const;

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16 max-w-3xl">
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-violet" />
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
        {title} <span className="font-serif italic font-normal text-brand">{accent}</span>
      </h2>
      {sub && <p className="mt-5 text-lg text-muted leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

function Arrow({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M8 7h9v9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* scroll progress */}
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brand" />

      {/* ============================== NAV ============================== */}
      <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 md:px-6 transition-all duration-500 ${
            scrolled ? "border-line bg-white/80 shadow-card backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-sm font-bold text-white shadow-glow">
              RK
            </span>
            <span className="hidden sm:block font-display font-semibold tracking-tight">Rahul Kumar Rai</span>
          </a>

          <div className="hidden lg:flex items-center gap-1 rounded-full bg-bg/70 p-1">
            {NAV.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  active === id ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className="relative">{id}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Hire me <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                {menuOpen ? <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-white p-3 shadow-lift"
          >
            {NAV.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 font-medium capitalize text-ink hover:bg-violet-soft"
              >
                {id}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      {/* ============================== HERO ============================== */}
      <section id="top" className="relative px-5 pt-32 md:pt-40 pb-20">
        {/* ambient colour */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="grid-bg absolute inset-0" />
          <div className="absolute -top-32 left-[8%] h-[480px] w-[480px] rounded-full bg-violet/25 blur-[120px]" />
          <div className="absolute top-10 right-[4%] h-[420px] w-[420px] rounded-full bg-sky/25 blur-[120px]" />
          <div className="absolute top-[420px] left-[40%] h-[320px] w-[320px] rounded-full bg-rose/15 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 text-sm font-medium text-muted shadow-card backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Available for freelance & collaborations
            </span>
          </motion.div>

          <h1 className="mt-8 font-display text-[3.4rem] leading-[0.95] sm:text-7xl md:text-8xl lg:text-[8.5rem] font-extrabold tracking-[-0.04em]">
            {["Rahul", "Kumar Rai"].map((w, i) => (
              <motion.span
                key={w}
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
              >
                {i === 1 ? <span className="text-brand">{w}</span> : w}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
          >
            <div>
              <p className="max-w-xl text-xl md:text-2xl leading-snug text-ink/80">
                I turn ideas into <span className="font-serif italic text-violet text-[1.15em]">results</span> — with SEO, performance
                marketing and websites built to convert.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Let&apos;s talk <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-4 text-sm font-semibold text-ink shadow-card transition-all hover:-translate-y-0.5 hover:border-violet/40"
                >
                  View my work
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              {ROLES.map((r, i) => {
                const tone = TONES[(["violet", "sky", "mint", "rose"] as const)[i % 4]];
                return (
                  <span key={r} className={`rounded-full ${tone.bg} ${tone.text} px-3.5 py-1.5 text-sm font-semibold`}>
                    {r}
                  </span>
                );
              })}
            </div>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
          >
            {STATS.map((s) => (
              <div key={s.label} className="card group p-5 md:p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className={`font-display text-3xl md:text-5xl font-bold tracking-tight ${TONES[s.tone].text}`}>{s.value}</div>
                <div className="mt-2 text-sm text-muted leading-snug">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* marquee */}
      <div className="relative border-y border-line bg-white py-5 overflow-hidden" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl md:text-3xl font-semibold tracking-tight">
          {[...Array(2)].flatMap((_, k) =>
            ["SEO", "Meta Ads", "Google Ads", "Shopify", "Content Strategy", "AI Video", "Web Design", "Analytics", "Branding"].map((t, i) => (
              <span key={`${k}-${t}`} className="flex items-center gap-10">
                <span className={i % 2 ? "text-ink" : "font-serif italic font-normal text-brand"}>{t}</span>
                <span className="text-violet/40">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ============================== ABOUT ============================== */}
      <section id="about" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_1.15fr] md:gap-16">
          <Reveal>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" /> About me
            </span>
            <h2 className="mt-5 font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.02]">
              Strategy, creativity <span className="font-serif italic font-normal text-brand">& execution.</span>
            </h2>

            <div className="mt-10 card relative overflow-hidden p-7">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand opacity-20 blur-2xl" />
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand font-display text-2xl font-bold text-white shadow-glow">RK</div>
                <div>
                  <div className="font-display text-xl font-semibold">Rahul Kumar Rai</div>
                  <div className="text-sm text-muted">MBA · Digital Marketing & Finance</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-bg p-4">
                  <div className="text-muted">Education</div>
                  <div className="mt-1 font-semibold">LPU · CGPA 8.4</div>
                </div>
                <div className="rounded-2xl bg-bg p-4">
                  <div className="text-muted">Status</div>
                  <div className="mt-1 font-semibold text-mint">Open to work</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-16">
            <p className="text-xl md:text-2xl leading-relaxed text-ink">
              MBA graduate in Digital Marketing & Finance from Lovely Professional University. I specialise in{" "}
              <span className="font-semibold text-violet">SEO</span>, <span className="font-semibold text-sky">performance marketing</span>,{" "}
              <span className="font-semibold text-rose">social media</span>, AI video creation and website building.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              I&apos;ve driven 40% growth in organic impressions, generated ₹7,385 in Meta Ads sales in a single month, and built brands from zero to
              revenue. From managing 1,000+ donor records at an NGO to running live SEO campaigns and Shopify stores, I bring hands-on expertise —
              and I build websites that are fast, modern and conversion-focused.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Currently working full-time and open to freelance projects, brand collaborations and consulting.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Freelance", "Brand collaborations", "Website projects", "Consulting"].map((t) => (
                <span key={t} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== EXPERIENCE ============================== */}
      <section id="experience" className="px-5 py-24 md:py-32 bg-white border-y border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Experience" title="Where I've" accent="made an impact." />
          <div className="grid gap-6">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.08}>
                <article className="group grid gap-6 rounded-3xl border border-line bg-bg/60 p-7 md:p-10 md:grid-cols-[1fr_2fr] transition-all hover:bg-white hover:shadow-lift">
                  <div>
                    <div className="text-sm font-semibold text-violet">{job.period}</div>
                    <h3 className="mt-3 font-display text-2xl md:text-3xl font-bold tracking-tight">{job.role}</h3>
                    <div className="mt-2 text-muted">
                      {job.company} · {job.place}
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tags.map((t) => (
                        <span key={t} className="rounded-full bg-violet-soft px-3 py-1 text-xs font-semibold text-violet">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ul className="space-y-4">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[17px] leading-relaxed text-ink/80">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
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

      {/* ============================== PROJECTS ============================== */}
      <section id="projects" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="Selected work"
            title="Projects with"
            accent="real numbers."
            sub="Live ventures and campaigns — each one measured in revenue, not just reach."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((p, i) => {
              const t = TONES[p.tone];
              return (
                <Reveal key={p.title} delay={(i % 2) * 0.08}>
                  <article className="card group relative h-full overflow-hidden p-7 md:p-9 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                    <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full ${t.bg} transition-transform duration-500 group-hover:scale-125`} />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full ${t.bg} ${t.text} px-3 py-1 text-xs font-bold uppercase tracking-wider`}>{p.kind}</span>
                        <span className="text-sm text-muted">{p.period}</span>
                      </div>
                      <div className={`mt-10 font-display text-5xl md:text-6xl font-bold tracking-tight ${t.text}`}>{p.metric}</div>
                      <div className="mt-1 text-sm font-medium text-muted">{p.metricLabel}</div>
                      <h3 className="mt-8 font-display text-2xl font-bold tracking-tight">{p.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{p.desc}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================== SKILLS ============================== */}
      <section id="skills" className="px-5 py-24 md:py-32 bg-white border-y border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Skills & tools" title="The toolkit" accent="behind the work." />
          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <Reveal className="card bg-bg/60 p-7 md:p-9">
              <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {SKILLS.map((s, i) => {
                  const t = TONES[(["violet", "sky", "mint", "rose"] as const)[i % 4]];
                  return (
                    <div key={s.name}>
                      <div className="flex items-baseline justify-between">
                        <span className="font-semibold">{s.name}</span>
                        <span className={`text-sm font-bold ${t.text}`}>{s.level}%</span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-line">
                        <motion.div
                          className={`h-full rounded-full ${t.bar}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${s.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.1 + i * 0.05, ease }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="relative overflow-hidden rounded-3xl bg-ink p-7 md:p-9 text-white">
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet/50 blur-3xl" />
              <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-sky/30 blur-3xl" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold">Core capabilities</h3>
                <p className="mt-2 text-white/60">What I bring to every team.</p>
                <div className="mt-8 flex flex-wrap gap-2.5">
                  {CAPABILITIES.map((c) => (
                    <span key={c} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== EDUCATION + CERTS ============================== */}
      <section id="education" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Education" title="Learning that" accent="compounds." />
          <div className="grid gap-12 md:grid-cols-2">
            <ol className="relative border-l-2 border-line pl-8 space-y-10">
              {EDUCATION.map((e, i) => (
                <Reveal key={e.degree} delay={i * 0.06}>
                  <li className="relative">
                    <span className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-bg ${i === 0 ? "bg-violet" : "bg-sky"}`} />
                    <div className="text-sm font-semibold text-violet">{e.period}</div>
                    <h3 className="mt-1 font-display text-xl md:text-2xl font-bold tracking-tight">{e.degree}</h3>
                    <div className="mt-1 text-muted">
                      {e.school}
                      {e.score && <span className="ml-2 rounded-full bg-mint-soft px-2.5 py-0.5 text-xs font-bold text-mint">{e.score}</span>}
                    </div>
                    <p className="mt-2 text-muted/90 text-[15px]">{e.note}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div>
              <Reveal>
                <h3 className="font-display text-2xl font-bold tracking-tight">Certifications</h3>
              </Reveal>
              <div className="mt-6 grid gap-3">
                {CERTIFICATIONS.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.06}>
                    <div className="card flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-soft text-violet">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.6-4.1A12 12 0 0112 3a12 12 0 01-8.6 2.9A12 12 0 003 9c0 5.6 3.8 10.3 9 11.6 5.2-1.3 9-6 9-11.6 0-1-.1-2.1-.4-3.1z" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold leading-snug">{c.title}</div>
                        <div className="text-sm text-muted">{c.issuer}</div>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-muted">{c.date}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== AWARDS ============================== */}
      <section id="awards" className="px-5 py-24 md:py-32 bg-white border-y border-line">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Achievements" title="Recognised for" accent="innovation." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AWARDS.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06}>
                <div className="group h-full rounded-3xl border border-line bg-bg/60 p-7 transition-all hover:-translate-y-1 hover:bg-white hover:shadow-lift">
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-3xl shadow-card transition-transform group-hover:scale-110 group-hover:-rotate-6">
                      {a.icon}
                    </span>
                    <span className="text-xs font-semibold text-muted">{a.date}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold leading-snug">{a.title}</h3>
                  <p className="mt-2 text-sm text-muted">{a.org}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== CONTACT ============================== */}
      <section id="contact" className="px-5 py-24 md:py-32">
        <Reveal className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brand px-7 py-16 md:px-16 md:py-24 text-white shadow-lift">
            <div aria-hidden className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-rose/40 blur-3xl" />
            <div className="relative grid gap-12 md:grid-cols-[1.3fr_1fr] md:items-end">
              <div>
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
                  Get in touch
                </span>
                <h2 className="mt-6 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.98]">
                  Let&apos;s build something <span className="font-serif italic font-normal">that grows.</span>
                </h2>
                <p className="mt-6 max-w-lg text-lg text-white/80">
                  Need SEO that ranks, ads that sell or a website that converts? I&apos;m open to freelance projects, brand collaborations and
                  consulting.
                </p>
              </div>
              <div className="grid gap-3">
                {[
                  { label: "Email me", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { label: "LinkedIn", value: "rahul-rai2003", href: CONTACT.linkedin, external: true },
                  { label: "Call me", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 text-ink transition-all hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{c.label}</span>
                      <span className="block truncate font-semibold">{c.value}</span>
                    </span>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-soft text-violet transition-colors group-hover:bg-violet group-hover:text-white">
                      <Arrow />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="px-5 pb-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <span>© {new Date().getFullYear()} Rahul Kumar Rai. All rights reserved.</span>
          <div className="flex gap-6">
            {["about", "projects", "contact"].map((l) => (
              <a key={l} href={`#${l}`} className="capitalize hover:text-violet">
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
