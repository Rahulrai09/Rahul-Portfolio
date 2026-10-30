import type { Metadata, Viewport } from "next";
import { Archivo, Inter_Tight, Newsreader } from "next/font/google";
import "./globals.css";

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://rahul-portfolio-five-silk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rahul Kumar Rai — Digital Marketing & Growth",
  description:
    "Rahul Kumar Rai — MBA (Digital Marketing & Finance). SEO, performance marketing, social media, AI video and conversion-focused websites. Open to freelance and consulting.",
  keywords: ["Rahul Kumar Rai", "Digital Marketing", "SEO", "Performance Marketing", "Meta Ads", "Website Builder", "Portfolio"],
  authors: [{ name: "Rahul Kumar Rai" }],
  openGraph: {
    title: "Rahul Kumar Rai — Digital Marketing & Growth",
    description: "SEO, performance marketing and websites that convert. Open to freelance and consulting.",
    url: siteUrl,
    siteName: "Rahul Kumar Rai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kumar Rai — Digital Marketing & Growth",
    description: "SEO, performance marketing and websites that convert.",
  },
};

export const viewport: Viewport = { themeColor: "#E5E4E0" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${sans.variable} ${serif.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
