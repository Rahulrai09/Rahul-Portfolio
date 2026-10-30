/* =====================================================================
   All site content lives here. Edit text, numbers and links in one place.
   ===================================================================== */

export const CONTACT = {
  email: "rahulkumarrai.work@gmail.com",
  phone: "+918571926873",
  linkedin: "https://www.linkedin.com/in/rahul-rai2003/",
};

/** Put a photo at /public/rahul.webp (or .jpg) and set its path here to show it in the hero. */
export const HERO_PHOTO: string | null = null;

export const NAV = [
  { id: "top", label: "Home" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "shelf", label: "Journey" },
];

export const ROLES = ["SEO", "Performance Marketing", "Social Media", "AI Video", "Website Building"];

export const CREDENTIAL_MARKS = [
  { name: "Pulse", glyph: "◆" },
  { name: "Meta Ads", glyph: "▤" },
  { name: "Shopify", glyph: "◎" },
  { name: "LPU", glyph: "▲" },
  { name: "SBI Ideathon", glyph: "✳" },
  { name: "E-NNOVATE", glyph: "◐" },
];

export const SERVICES = [
  {
    name: "Search Engine Optimisation",
    desc: "Keyword clustering, on-page and technical fixes, content-gap analysis with Search Console and GA4, and backlink strategy — built to rank and stay ranked.",
  },
  {
    name: "Performance Marketing",
    desc: "Meta and Google Ads structured around revenue, not vanity metrics — audience setup, creative testing and budget moved toward what converts.",
  },
  {
    name: "Social Media Marketing",
    desc: "Platform strategy, content calendars and community growth across Instagram, Facebook, LinkedIn and X, measured with Insights and Meta Business Suite.",
  },
  {
    name: "AI Video & Content",
    desc: "AI-assisted video, Canva design and content systems that let brands publish more, faster, without losing quality.",
  },
  {
    name: "Website Building",
    desc: "Fast, modern websites and Shopify stores designed around SEO and conversion — including Pulseio.in and Pulsemotion.in, from structure and storefront UX to launch.",
  },
];

export const PROJECTS = [
  {
    name: "Pulseio.in",
    category: "Company website · Pulse",
    period: "Pulse",
    metric: "Live",
    metricLabel: "Website for a medical equipment maker",
    url: "https://pulseio.in",
    did: [
      "Built the company website for Pulse, a Bengaluru medical equipment maker serving clinics and hospitals across India",
      "Structured product categories — critical care, renal, cardiac, surgical, diagnostics and more — for search and enquiries",
    ],
    bars: [14, 22, 30, 36, 45, 56, 64, 78],
  },
  {
    name: "Pulsemotion.in",
    category: "E-commerce website · Pulse Motion",
    period: "Pulse",
    metric: "Live",
    metricLabel: "Electric wheelchair store for India",
    url: "https://pulsemotion.in",
    did: [
      "Built the Pulse Motion store for electric wheelchairs — premium, lightweight and heavy-duty ranges, accessories and spares",
      "Set up conversion paths for rentals, demo bookings and the donation programme, backed by Meta Ads",
    ],
    bars: [12, 18, 27, 33, 42, 50, 61, 72],
  },
  {
    name: "Shopify Store & Meta Ads",
    category: "E-commerce · Paid social",
    period: "Jan – Feb 2025",
    metric: "₹7,385",
    metricLabel: "Sales in the first month",
    did: [
      "Built the Shopify store end-to-end — product listings, catalogue structure and storefront UX",
      "Planned and launched Meta Ads campaigns that converted from month one",
    ],
    bars: [18, 26, 22, 38, 44, 52, 61, 74],
  },
  {
    name: "Alankrita Jewelry",
    category: "Own brand · Social-led growth",
    period: "Venture",
    metric: "70.3%",
    metricLabel: "Profit margin on ₹51,644 revenue",
    did: ["Ran a social-media-led marketing strategy and customer engagement", "Managed finances and pricing to protect margin while sales grew"],
    bars: [30, 34, 41, 39, 52, 58, 66, 70],
  },
  {
    name: "Unbrand to Brand — USHMR",
    category: "Brand identity · Go-to-market",
    period: "Aug – Sept 2024",
    metric: "₹10,000",
    metricLabel: "Revenue across sourcing, branding & sales",
    did: ["Analysed the business model and market positioning", "Designed the brand identity — logo and positioning — and took it to market"],
    bars: [12, 20, 28, 34, 46, 50, 63, 68],
  },
  {
    name: "August Bioscience",
    category: "Affiliate · Multi-channel",
    period: "Nov – Dec 2024",
    metric: "₹5,000",
    metricLabel: "Product sales driven",
    did: ["Ran campaigns across social, email, influencer tie-ups and paid promotion", "Earned ₹1,000 in commission on ₹5,000 of product sales"],
    bars: [10, 16, 24, 30, 28, 40, 47, 55],
  },
];

/** Tiles for the scroll-driven rows. */
export const TILES = [
  { k: "+40%", v: "Organic impressions", tone: "cobalt" },
  { k: "2 sites", v: "Pulseio.in · Pulsemotion.in", tone: "ice" },
  { k: "₹7,385", v: "Meta Ads sales · month one", tone: "ink" },
  { k: "SEO", v: "Keyword clustering · SERP", tone: "paper" },
  { k: "+27%", v: "CTR & session duration", tone: "ice" },
  { k: "−15%", v: "Bounce rate via SEO-led UX", tone: "ink" },
  { k: "Shopify", v: "Catalogue & storefront UX", tone: "paper" },
  { k: "100+", v: "Content assets created", tone: "cobalt" },
  { k: "2×", v: "Social engagement", tone: "ice" },
  { k: "Meta Ads", v: "Audience & creative testing", tone: "paper" },
  { k: "70.3%", v: "Profit margin · Alankrita", tone: "ink" },
  { k: "1,000+", v: "Donor & campaign records", tone: "ice" },
  { k: "50+", v: "Competitor link profiles", tone: "paper" },
  { k: "Pulse", v: "Intern → Marketing Executive", tone: "cobalt" },
  { k: "₹11,900", v: "Live event revenue on ₹1,500", tone: "ink" },
  { k: "AI Video", v: "Faster, sharper content", tone: "paper" },
  { k: "35–45%", v: "Reach & engagement growth", tone: "ice" },
] as const;

/* ---------------- Journey shelf (experience, education, awards) ---------------- */

export type ShelfKind = "Experience" | "Education" | "Award";

export type ShelfItem = {
  id: string;
  kind: ShelfKind;
  title: string;
  org: string;
  place?: string;
  period: string;
  year: number;
  badge?: string;
  summary: string;
  points?: string[];
  /** cover art palette: [background, ink, accent] */
  palette: [string, string, string];
  motif: "rings" | "bars" | "grid" | "wave" | "star" | "arc" | "steps" | "sun";
};

export const SHELF: ShelfItem[] = [
  {
    id: "kv10",
    kind: "Education",
    title: "Class X",
    org: "Kendriya Vidyalaya, Ambala Cantt",
    period: "2017 – 2018",
    year: 2018,
    summary: "General science and humanities — where the core logical and analytical habits started.",
    palette: ["#E9E4D8", "#141414", "#1F3FB0"],
    motif: "grid",
  },
  {
    id: "kv12",
    kind: "Education",
    title: "Class XII — Commerce",
    org: "Kendriya Vidyalaya, Ambala Cantt",
    period: "2019 – 2020",
    year: 2020,
    summary: "Commerce stream focused on business fundamentals, economics and quantitative methods.",
    palette: ["#1F3FB0", "#F4F2ED", "#9DB4FF"],
    motif: "steps",
  },
  {
    id: "bcom",
    kind: "Education",
    title: "Bachelor of Commerce",
    org: "Punjab University",
    period: "Jul 2020 – Apr 2023",
    year: 2023,
    badge: "CGPA 7.1",
    summary: "Corporate accounting, financial systems, portfolio analytics and commerce regulation.",
    palette: ["#141414", "#F4F2ED", "#6E8BFF"],
    motif: "bars",
  },
  {
    id: "sharva",
    kind: "Experience",
    title: "Social Media Head",
    org: "Sharva Aikyam Foundation",
    place: "NGO · Core Team Member",
    period: "Nov 2023 – Apr 2024",
    year: 2024,
    summary: "Led multi-platform social media for an NGO and turned content into volunteers and donors.",
    points: [
      "Led social media across Instagram, Facebook, Twitter and LinkedIn, growing reach and engagement by 35–45%.",
      "Created 100+ content assets — 2× engagement and a 25% rise in volunteer participation.",
      "Optimised campaigns with Instagram Insights, Meta Business Suite, Sheets and Excel across 1,000+ donor records.",
    ],
    palette: ["#DCE5FF", "#0F1B4D", "#1F3FB0"],
    motif: "wave",
  },
  {
    id: "mba",
    kind: "Education",
    title: "MBA — Marketing & Finance",
    org: "Lovely Professional University",
    period: "Aug 2024 – May 2026",
    year: 2026,
    badge: "CGPA 8.4",
    summary: "Venture models, business strategy and computational analytics — with live ventures run alongside the degree.",
    palette: ["#0F1B4D", "#F4F2ED", "#7FA0FF"],
    motif: "arc",
  },
  {
    id: "vc",
    kind: "Award",
    title: "1st Position — Innovation Nation",
    org: "Venture Capital Competition, LPU",
    period: "Dec 2024",
    year: 2024,
    summary: "First place in LPU's venture capital competition.",
    palette: ["#1F3FB0", "#F4F2ED", "#FFFFFF"],
    motif: "star",
  },
  {
    id: "tourism",
    kind: "Award",
    title: "2nd Runner-Up — Tourism Tapestry",
    org: "Lovely Professional University",
    period: "Jan 2025",
    year: 2025,
    summary: "Placed third overall in LPU's Tourism Tapestry competition.",
    palette: ["#E9E4D8", "#141414", "#1F3FB0"],
    motif: "sun",
  },
  {
    id: "event",
    kind: "Award",
    title: "₹11,900 from ₹1,500",
    org: "Live event, Lovely Professional University",
    period: "Feb 2025",
    year: 2025,
    summary: "Generated ₹11,900 in revenue from a live event on a ₹1,500 investment.",
    palette: ["#0F1B4D", "#F4F2ED", "#9DB4FF"],
    motif: "steps",
  },
  {
    id: "sbi",
    kind: "Award",
    title: "Top 100 Student Innovations",
    org: "SBI College Youth Ideathon, IIT Delhi",
    period: "Mar 2025",
    year: 2025,
    summary: "Selected among the top 100 student innovations nationally.",
    palette: ["#F4F2ED", "#141414", "#1F3FB0"],
    motif: "grid",
  },
  {
    id: "innotek",
    kind: "Award",
    title: "1st Position & Most Innovative Startup",
    org: "Innotek, LPU",
    period: "Apr 2025",
    year: 2025,
    summary: "First position and the Most Innovative Entrepreneurship–Startup Award.",
    palette: ["#1F3FB0", "#F4F2ED", "#FFFFFF"],
    motif: "sun",
  },
  {
    id: "mnr",
    kind: "Experience",
    title: "Digital Marketing Trainee",
    org: "MNR Solutions — TWEOV (Silver Brand)",
    place: "Noida",
    period: "May 2025 – Oct 2025",
    year: 2025,
    summary: "AI-assisted SEO, analytics and SEO-led UX for a growing brand.",
    points: [
      "Implemented AI-assisted SEO workflows — keyword clustering, meta optimisation and SERP alignment — for a 40% increase in organic impressions.",
      "Analysed Search Console and GA4 data to find content gaps, improving CTR and session duration by 27%.",
      "Researched 50+ competitor link profiles to strengthen the off-page and backlink strategy.",
      "Worked with design and content teams on SEO-driven UI/UX, reducing bounce rate by 15%.",
    ],
    palette: ["#141414", "#F4F2ED", "#7FA0FF"],
    motif: "wave",
  },
  {
    id: "poland",
    kind: "Award",
    title: "Selected Innovation Exhibitor",
    org: "E-NNOVATE International Summit, Poland",
    period: "Jun 2025",
    year: 2025,
    summary: "Selected to exhibit an innovation at an international summit in Poland.",
    palette: ["#DCE5FF", "#0F1B4D", "#1F3FB0"],
    motif: "rings",
  },
  {
    id: "pulse-intern",
    kind: "Experience",
    title: "Marketing Intern",
    org: "Pulse",
    place: "Internship · Bengaluru",
    period: "Apr 2026 – Jul 2026",
    year: 2026,
    summary: "Joined Pulse as a marketing intern — running social media and Meta Ads, and building the company's websites.",
    points: [
      "Managed Pulse's social media channels and content.",
      "Planned and ran Meta Ads campaigns for Pulse and Pulse Motion.",
      "Built two websites: Pulseio.in and Pulsemotion.in.",
    ],
    palette: ["#F4F2ED", "#141414", "#1F3FB0"],
    motif: "bars",
  },
  {
    id: "pulse-exec",
    kind: "Experience",
    title: "Marketing Executive",
    org: "Pulse",
    place: "Full-time · Bengaluru · Converted from internship",
    period: "Jul 2026 – Present",
    year: 2026,
    summary: "Converted from intern to full-time Marketing Executive — owning social media, Meta Ads and the Pulse websites.",
    points: [
      "Handle social media for Pulse and Pulse Motion.",
      "Run and optimise Meta Ads campaigns.",
      "Built and maintain Pulseio.in (company site) and Pulsemotion.in (electric wheelchair store).",
    ],
    palette: ["#1F3FB0", "#F4F2ED", "#9DB4FF"],
    motif: "arc",
  },
];

export const SHELF_TABS: { label: string; kind: ShelfKind | "All" }[] = [
  { label: "All", kind: "All" },
  { label: "Experience", kind: "Experience" },
  { label: "Education", kind: "Education" },
  { label: "Awards", kind: "Award" },
];
