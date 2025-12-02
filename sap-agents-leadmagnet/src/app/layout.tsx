import type { Metadata } from "next";
import localFont from "next/font/local";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAP AI Agents | CAP, Fiori & Fiori Elements",
  description:
    "Download 3 cutting-edge AI agents for SAP development. Supercharge your CAP, Fiori, and Fiori Elements workflow with intelligent automation.",
  keywords: ["SAP", "AI Agents", "CAP", "Fiori", "Fiori Elements", "Automation"],
  openGraph: {
    title: "SAP AI Agents | Transform Your Development",
    description: "3 AI agents that revolutionize SAP development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} antialiased bg-black text-white noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
