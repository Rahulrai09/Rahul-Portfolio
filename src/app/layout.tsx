import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = "https://rahul-portfolio-five-silk.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rahul Kumar Rai — Digital Marketer, SEO & Website Builder",
  description:
    "Portfolio of Rahul Kumar Rai — MBA (Digital Marketing & Finance), SEO, performance marketing, social media, AI video creation and conversion-focused website building.",
  keywords: [
    "Rahul Kumar Rai",
    "Digital Marketer",
    "SEO",
    "Performance Marketing",
    "Meta Ads",
    "Website Builder",
    "Social Media Marketing",
    "Portfolio",
  ],
  authors: [{ name: "Rahul Kumar Rai" }],
  openGraph: {
    title: "Rahul Kumar Rai — Digital Marketer & Website Builder",
    description:
      "SEO, performance marketing, social media and websites that convert. Open to freelance and collaborations.",
    url: siteUrl,
    siteName: "Rahul Kumar Rai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kumar Rai — Digital Marketer & Website Builder",
    description: "SEO, performance marketing, social media and websites that convert.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F7FB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${display.variable} ${inter.variable} ${serif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
