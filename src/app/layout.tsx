import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rahul Kumar Rai | Portfolio",
  description: "Portfolio of Rahul Kumar Rai - MBA Candidate specializing in Finance & Digital Marketing Strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${inter.variable} font-sans antialiased`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
