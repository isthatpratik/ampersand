import type { Metadata } from "next";
import { Fustat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const fustat = Fustat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ampersand - Strategic Exits and Growth Solutions",
  description: "Helping investors and founders achieve success through strategic exits, smart capital moves, and tailored growth solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <meta name="google-site-verification" content="maMWNaPvCpL7a7oAcYgbekSgjOAFjNdlXFK_5311fJ0" />
      <meta name="google-site-verification" content="Ze-kEhGuimQiofPIkTEFHAHiq92gSGLbNeH6emnctgU" />
      <body
        className={`${fustat.className} antialiased bg-[#1A1A1A] text-white`}
      >
        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
