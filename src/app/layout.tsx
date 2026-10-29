import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://rahul-portfolio-five-silk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rahul Kumar Rai — Digital Marketing & Growth Strategist",
  description:
    "Rahul Kumar Rai — MBA (Digital Marketing & Finance). SEO, performance marketing, social media, AI video and conversion-focused websites. Open to freelance and consulting.",
  keywords: [
    "Rahul Kumar Rai",
    "Digital Marketing",
    "SEO Specialist",
    "Performance Marketing",
    "Meta Ads",
    "Website Builder",
    "Growth Strategist",
  ],
  authors: [{ name: "Rahul Kumar Rai" }],
  openGraph: {
    title: "Rahul Kumar Rai — Digital Marketing & Growth Strategist",
    description: "SEO, performance marketing and websites that convert. Open to freelance and consulting.",
    url: siteUrl,
    siteName: "Rahul Kumar Rai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kumar Rai — Digital Marketing & Growth Strategist",
    description: "SEO, performance marketing and websites that convert.",
  },
};

export const viewport: Viewport = { themeColor: "#F7F5F0" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${serif.variable} ${sans.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
