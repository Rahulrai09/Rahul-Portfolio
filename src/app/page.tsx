"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

// Helper components for icons to keep layout clean and modular
function MailIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.996.808H10a1 1 0 01.75.36l1.326 1.77a1 1 0 001.32.083l.8-2.2a1 1 0 01.94-.725H19a2 2 0 012 2v3.28a1 1 0 01-.725.94l-2.2.548a1 1 0 00-.808.996V14a1 1 0 01-.36.75l-1.77 1.326a1 1 0 00-.083 1.32l2.2.8a1 1 0 01.725.94V19a2 2 0 01-2 2h-3.28a1 1 0 01-.94-.725l-.548-2.2a1 1 0 00-.996-.808H14a1 1 0 01-.75-.36l-1.326-1.77a1 1 0 00-1.32-.083l-.8 2.2a1 1 0 01-.94.725H5a2 2 0 01-2-2v-3.28a1 1 0 01.725-.94l2.2-.548a1 1 0 00.808-.996V10a1 1 0 01.36-.75l1.77-1.326a1 1 0 00.083-1.32l-2.2-.8A1 1 0 013 5z" />
    </svg>
  );
}

// Fade-up animation properties for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  }
};

export default function Home() {
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  // Track scroll direction to show/hide navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 120) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  // Simple section tracking for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "education", "skills", "experience", "projects", "awards"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-bgDark text-white select-none selection:bg-acc selection:text-white font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={navHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-40 glassmorphism border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center"
      >
        <a href="#" className="font-syne text-2xl font-extrabold text-white tracking-tighter">
          RKR<span className="text-acc">.</span>
        </a>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-medium">
          {["about", "education", "skills", "experience", "projects", "awards"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`transition-colors duration-300 ${
                activeSection === item ? "text-acc font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {item === "experience" ? "Experience" : item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        <div>
          <a
            href="#contact"
            className="px-6 py-2.5 bg-acc hover:bg-opacity-90 rounded-full font-semibold tracking-wider text-xs md:text-sm uppercase transition-all duration-300 accent-glow-hover"
          >
            Hire Me
          </a>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 pt-20">
        <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-start h-full">
          
          {/* Animated Headline */}
          <motion.div
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-syne font-extrabold tracking-tighter text-left leading-none uppercase">
              {["RAHUL", "KUMAR", "RAI"].map((word, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block mr-4 md:mr-8 text-gradient"
                  variants={{
                    hidden: { opacity: 0, y: 80 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
                    }
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtext and pulsating dot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-3 mt-6 md:mt-8"
          >
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acc opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-acc"></span>
            </span>
            <p className="text-zinc-400 text-sm md:text-xl font-medium tracking-wide">
              Digital Marketer <span className="text-zinc-600">·</span> SEO <span className="text-zinc-600">·</span> Performance Marketing <span className="text-zinc-600">·</span> AI Video Creation <span className="text-zinc-600">·</span> Social Media <span className="text-zinc-600">·</span> Website Building <span className="text-zinc-600">·</span> AI Tools
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-4 mt-8 md:mt-12"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 bg-acc hover:bg-opacity-90 rounded-lg font-bold tracking-wider text-xs md:text-sm uppercase transition-all duration-300 accent-glow"
            >
              Let&apos;s Talk &rarr;
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 rounded-lg font-bold tracking-wider text-xs md:text-sm uppercase transition-all duration-300"
            >
              View Work
            </a>
          </motion.div>

          {/* Stats Grid - 2x2 layout */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24 w-full"
          >
            {[
              { val: "4+ Ventures", label: "Business Initiatives" },
              { val: "30+ Countries", label: "Global Reach" },
              { val: "70% Profit Margin", label: "Eco-Bites Venture" },
              { val: "6+ Awards", label: "International Recognition" }
            ].map((stat, i) => (
              <div
                key={i}
                className="glassmorphism p-6 rounded-2xl flex flex-col justify-between border-white/5 hover:border-acc/20 transition-colors duration-500"
              >
                <span className="font-syne text-2xl md:text-4xl font-extrabold text-acc tracking-tight block">
                  {stat.val}
                </span>
                <span className="text-zinc-500 text-xs md:text-sm font-medium tracking-wide mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <motion.section
        id="about"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 flex flex-col gap-6">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">About Me</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold leading-tight tracking-tight">
              I thrive at the intersection of data, design, and decision-making.
            </h2>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed mt-2">
              Currently pursuing an MBA, I bridge the gap between creative execution and analytical logic. With practical experience in financial modeling, CRM automation, digital campaigns, and product validation, I create structures that solve business bottlenecks and maximize organizational growth.
            </p>
          </div>
          
          <div className="md:col-span-7 flex flex-col gap-8">
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
              My journey centers around developing sustainable solutions. From analyzing passenger flight datasets to validate pricing models to launching an edible cutlery venture evaluated at international innovation summits, I aim to craft strategic digital programs backed by metrics. I am passionate about market strategy, digital growth frameworks, and data visual analytics.
            </p>
            <div className="p-6 border-l-4 border-acc bg-acc/5 rounded-r-xl accent-glow flex flex-col gap-2">
              <span className="text-white font-bold text-sm md:text-base tracking-wide">
                Currently open to full-time roles in Finance, Digital Marketing & Strategy
              </span>
              <span className="text-zinc-400 text-xs md:text-sm">
                Ready to contribute strategic depth and execute technical growth programs.
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* EDUCATION TIMELINE */}
      <motion.section
        id="education"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Timeline</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Education</h2>
          </div>

          <div className="relative border-l border-zinc-800 ml-4 md:ml-32">
            {[
              {
                title: "MBA – Digital Marketing & Finance",
                inst: "Lovely Professional University",
                date: "Aug 2024–May 2026",
                desc: "Engaging in venture models, business strategies, and computational analytics.",
                badge: "CGPA: 8.4"
              },
              {
                title: "B.Com",
                inst: "Punjab University",
                date: "Jul 2020–Apr 2023",
                desc: "Foundation in corporate accounting, financial systems, portfolio analytics, and commerce regulations.",
                badge: "CGPA: 7.1"
              },
              {
                title: "Class 12th",
                inst: "Kendriya Vidyalaya Ambala Cantt",
                date: "2019–2020",
                desc: "Commerce stream, focused on business fundamentals, economics, and quantitative methodology."
              },
              {
                title: "Class 10th",
                inst: "Kendriya Vidyalaya Ambala Cantt",
                date: "2017–2018",
                desc: "General science and humanities curricula, developing core logical and analytical capacities."
              }
            ].map((edu, idx) => (
              <div key={idx} className="relative mb-12 pl-8 md:pl-12 group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-[6px] top-1.5 w-3 h-3 rounded-full bg-zinc-800 group-hover:bg-acc group-hover:scale-125 border border-bgDark transition-all duration-300" />
                
                {/* Float Date for Large Screen */}
                <div className="hidden md:block absolute -left-36 top-1 text-zinc-500 font-syne font-bold text-sm tracking-wide text-right w-24">
                  {edu.date}
                </div>

                <div className="glassmorphism p-6 rounded-2xl border-white/5 group-hover:border-acc/25 transition-all duration-500 hover:shadow-[0_10px_30px_-15px_rgba(232,82,26,0.15)]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-syne text-lg md:text-xl font-bold text-white group-hover:text-acc transition-colors duration-300">
                      {edu.title}
                    </h3>
                    <span className="md:hidden text-acc text-xs font-semibold tracking-wider">
                      {edu.date}
                    </span>
                    {edu.badge && (
                      <span className="px-3 py-1 bg-acc/10 text-acc text-[10px] uppercase font-bold tracking-widest rounded-full border border-acc/20">
                        {edu.badge}
                      </span>
                    )}
                  </div>
                  <h4 className="text-zinc-300 text-sm md:text-base font-medium mb-3">{edu.inst}</h4>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">{edu.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SKILLS SECTION */}
      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Competence</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Skills & Tools</h2>
          </div>

          {/* Hard Skills - Animated Rings */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-20">
            {[
              { name: "Canva", val: 85 },
              { name: "MS Excel", val: 85 },
              { name: "MS PowerPoint", val: 85 },
              { name: "Website Building", val: 75 },
              { name: "Meta Ads Manager", val: 85 },
              { name: "Google Ads / SEO", val: 82 },
              { name: "Data Visualization", val: 75 },
              { name: "Social Media Marketing", val: 85 }
            ].map((skill, idx) => {
              const radius = 32;
              const circ = 2 * Math.PI * radius;
              const offset = circ - (skill.val / 100) * circ;

              return (
                <div
                  key={idx}
                  className="glassmorphism p-6 rounded-2xl border-white/5 flex flex-col items-center justify-center text-center hover:border-acc/20 transition-colors duration-500"
                >
                  <div className="relative w-20 h-20 flex items-center justify-center mb-4">
                    <svg className="w-full h-full transform -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#1f1f23"
                        strokeWidth="5"
                        fill="transparent"
                      />
                      {/* Animated foreground progress circle */}
                      <motion.circle
                        cx="40"
                        cy="40"
                        r={radius}
                        stroke="#E8521A"
                        strokeWidth="5"
                        fill="transparent"
                        strokeDasharray={circ}
                        initial={{ strokeDashoffset: circ }}
                        whileInView={{ strokeDashoffset: offset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </svg>
                    <span className="absolute font-syne text-sm font-extrabold text-white">
                      {skill.val}%
                    </span>
                  </div>
                  <span className="font-syne text-xs md:text-sm font-semibold tracking-wide text-zinc-300">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Soft Skills - Pip dot indicators */}
          <div className="max-w-3xl mx-auto">
            <h3 className="font-syne text-lg md:text-xl font-bold text-center text-zinc-400 mb-8 uppercase tracking-widest">
              Core Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { name: "Leadership", rate: 5 },
                { name: "Teamwork", rate: 5 },
                { name: "Communication", rate: 4 },
                { name: "Learning Agility", rate: 4 },
                { name: "CRM Systems", rate: 4 },
                { name: "Product Development", rate: 4 }
              ].map((soft, idx) => (
                <div
                  key={idx}
                  className="glassmorphism p-5 rounded-xl border-white/5 flex justify-between items-center"
                >
                  <span className="text-zinc-300 text-xs md:text-sm font-semibold tracking-wide">
                    {soft.name}
                  </span>
                  <div className="flex gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                          i < soft.rate ? "bg-acc accent-glow" : "bg-zinc-800"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* INTERNSHIPS (EXPERIENCE) */}
      <motion.section
        id="experience"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-t border-white/5"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Practical Application</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Internships</h2>
          </div>

          <div className="flex flex-col gap-8">
            {[
              {
                org: "MNR Solutions (TWEOV – Silver Brand) | Noida",
                role: "Digital Marketing Trainee",
                date: "May 2025 – Oct 2025",
                bullets: [
                  "Implemented AI-assisted SEO workflows, contributing to 40% increase in organic impressions through keyword clustering, meta optimization, and SERP alignment",
                  "Analyzed Google Search Console + GA4 data to identify content gaps, improving CTR and session duration by 27%",
                  "Supported backlink research & outreach, analyzing 50+ competitor link profiles to strengthen off-page SEO strategy",
                  "Collaborated with design & content teams on SEO-driven UI/UX, resulting in 15% reduction in bounce rate"
                ]
              },
              {
                org: "Sharva Aikyam Foundation",
                role: "Social Media Head & Core Team Member",
                date: "Nov 2023 – Apr 2024",
                bullets: [
                  "Led multi-platform social media across Instagram, Facebook, Twitter & LinkedIn, driving 35–45% growth in reach and engagement",
                  "Created 100+ content assets, resulting in 2× engagement and 25% increase in volunteer participation",
                  "Optimized campaigns using Instagram Insights, Meta Business Suite, Google Sheets & Excel, managing 1,000+ donor and campaign records"
                ]
              }
            ].map((intern, idx) => (
              <div
                key={idx}
                className="group border-l-4 border-acc/40 hover:border-acc bg-white/[0.02] p-8 rounded-r-2xl border-y border-r border-white/5 transition-all duration-500 hover:shadow-[0_15px_40px_-20px_rgba(232,82,26,0.2)] accent-glow-hover"
              >
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="font-syne text-lg md:text-xl font-bold text-white group-hover:text-acc transition-colors duration-300">
                      {intern.org}
                    </h3>
                    <span className="text-zinc-400 text-xs md:text-sm font-semibold tracking-wide block mt-1">
                      {intern.role}
                    </span>
                  </div>
                  <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-full text-xs font-bold tracking-wide uppercase">
                    {intern.date}
                  </span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-2 text-zinc-500 text-xs md:text-sm leading-relaxed">
                  {intern.bullets.map((b, i) => (
                    <li key={i} className="hover:text-zinc-300 transition-colors duration-300">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PROJECTS SECTION */}
      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Initiatives</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Key Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                num: "01",
                title: "E-Commerce Project – Shopify Store & Meta Ads",
                type: "Jan–Feb 2025",
                desc: "Built and optimized a Shopify store (product listings, catalog structuring, storefront UX). Launched Meta Ads generating ₹7,385 in sales within one month."
              },
              {
                num: "02",
                title: "August Bioscience – Affiliate Marketing",
                type: "Nov–Dec 2024",
                desc: "Executed affiliate marketing campaigns via social media, email, influencer tie-ups, and paid promotions. Drove ₹5,000 in product sales and earned ₹1,000 commission."
              },
              {
                num: "03",
                title: "Unbrand to Brand – USHMR",
                type: "Aug–Sept 2024",
                desc: "Conducted business model analysis and built brand identity (logo & positioning). Achieved ₹10,000 in revenue across sourcing, branding, and sales."
              },
              {
                num: "04",
                title: "Alankrita – Handcrafted Jewelry Brand",
                type: "Social media-driven marketing strategy, finance management, customer engagement",
                desc: "Achieved ₹51,644 revenue with 70.3% profit margin."
              }
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden group glassmorphism p-8 rounded-2xl border-white/5 hover:border-acc/20 transition-all duration-500"
              >
                {/* Large Ghost Number in Background */}
                <div className="absolute right-4 bottom-4 font-syne text-[100px] md:text-[130px] font-extrabold text-white/[0.02] group-hover:text-acc/[0.03] transition-colors duration-500 pointer-events-none select-none">
                  {proj.num}
                </div>

                <span className="px-3 py-1 bg-acc/10 text-acc text-[9px] uppercase font-bold tracking-widest rounded-full border border-acc/20 mb-6 inline-block">
                  {proj.type}
                </span>

                <h3 className="font-syne text-xl md:text-2xl font-bold text-white group-hover:text-acc transition-colors duration-300 mt-2 mb-3">
                  {proj.title}
                </h3>
                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed max-w-md">
                  {proj.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CERTIFICATIONS */}
      <motion.section
        id="certifications"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Qualifications</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Digital Marketing Mastery",
                issuer: "IIT Roorkee",
                date: "Feb 2025",
                desc: "Acquired depth in platform bidding algorithms, SEO architecture, audience modeling, and marketing automation analytics."
              },
              {
                title: "SEBI Investor Certification 46/50",
                issuer: "National Institute of Securities Markets (NISM)",
                date: "Jan 2025",
                desc: "Demonstrated technical proficiency in investment strategies, asset analysis, and security regulatory operations."
              },
              {
                title: "Data Visualization with Python",
                issuer: "IBM",
                date: "Dec 2024",
                desc: "Trained in quantitative graphing techniques, parsing and formatting complex tables using Matplotlib, Seaborn, and Pandas libraries."
              },
              {
                title: "Financial Markets & Investment Strategies",
                issuer: "Global Institutional Program",
                date: "Ongoing",
                desc: "Expanding frameworks on capital allocation metrics, valuation modeling, risk mitigation, and corporate finance planning."
              }
            ].map((cert, idx) => (
              <div
                key={idx}
                className="group glassmorphism p-6 rounded-2xl border-white/5 hover:border-acc/20 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <h3 className="font-syne text-base md:text-lg font-bold text-white group-hover:text-acc transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <span className="text-zinc-500 font-syne font-semibold text-xs whitespace-nowrap">
                      {cert.date}
                    </span>
                  </div>
                  <h4 className="text-acc text-xs font-semibold tracking-wider mb-2 uppercase">
                    {cert.issuer}
                  </h4>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ACHIEVEMENTS */}
      <motion.section
        id="awards"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-4 mb-16 text-center">
            <span className="text-xs uppercase tracking-widest text-acc font-semibold">Honors</span>
            <h2 className="text-3xl md:text-5xl font-syne font-bold tracking-tight">Achievements</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "1st Position & Most Innovative Entrepreneurship–Startup Award",
                desc: "Innotek | LPU",
                meta: "Apr 2025",
                icon: "🥇"
              },
              {
                title: "Top 100 Student Innovations",
                desc: "SBI College Youth Ideathon | IIT Delhi",
                meta: "Mar 2025",
                icon: "💡"
              },
              {
                title: "Generated ₹11,900 revenue from live event with ₹1,500 investment",
                desc: "Lovely Professional University (LPU)",
                meta: "Feb 2025",
                icon: "💰"
              },
              {
                title: "2nd Runner-Up",
                desc: "Tourism Tapestry | LPU",
                meta: "Jan 2025",
                icon: "🥉"
              },
              {
                title: "1st Position – Innovation Nation",
                desc: "Venture Capital Competition | LPU",
                meta: "Dec 2024",
                icon: "🥇"
              },
              {
                title: "Selected Innovation Exhibitor",
                desc: "E-NNOVATE International Summit, Poland",
                meta: "Jun 2025",
                icon: "🌍"
              }
            ].map((ach, idx) => (
              <div
                key={idx}
                className="group glassmorphism p-6 rounded-2xl border-white/5 hover:border-acc/20 transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 origin-left">
                    {ach.icon}
                  </div>
                  <h3 className="font-syne text-base md:text-lg font-bold text-white group-hover:text-acc transition-colors duration-300 mb-2">
                    {ach.title}
                  </h3>
                  <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                    {ach.desc}
                  </p>
                </div>
                <div className="text-zinc-600 font-bold text-[10px] tracking-widest uppercase mt-4">
                  {ach.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full py-24 md:py-32 px-6 md:px-12 bg-white/[0.01] border-t border-white/5"
      >
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-acc font-semibold mb-6">Get in Touch</span>
          <h2 className="text-4xl md:text-7xl font-syne font-extrabold tracking-tighter leading-tight mb-8">
            Let&apos;s work <span className="text-acc">together.</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mb-12">
            Looking for a quantitative partner to model strategy, coordinate brand channels, or assist portfolio audits? Connect with me.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              href="mailto:rahulkumarrai.work@gmail.com"
              className="px-6 py-3.5 bg-acc hover:bg-opacity-90 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300 accent-glow"
            >
              <MailIcon />
              Email Me
            </a>
            <a
              href="https://www.linkedin.com/in/rahul-rai2003/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              <LinkedInIcon />
              LinkedIn
            </a>
            <a
              href="tel:+919876543210"
              className="px-6 py-3.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/70 rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              <PhoneIcon />
              Call Me
            </a>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="w-full py-8 px-6 md:px-12 border-t border-white/5 text-center text-zinc-600 text-xs md:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 Rahul Kumar Rai. All rights reserved.</p>
          <div className="flex gap-6 text-zinc-500">
            <a href="#about" className="hover:text-acc transition-colors duration-300">About</a>
            <a href="#projects" className="hover:text-acc transition-colors duration-300">Projects</a>
            <a href="#contact" className="hover:text-acc transition-colors duration-300">Contact</a>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
