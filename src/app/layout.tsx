import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://auditly.dev";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Auditly — Free AI Spend Audit for Startups",
    template: "%s | Auditly",
  },
  description:
    "Find out exactly where your team is overspending on AI tools. Get an instant audit of Cursor, Claude, ChatGPT, Copilot and more — free, no login required.",
  openGraph: {
    title: "Auditly — Free AI Spend Audit",
    description:
      "Is your startup overpaying for AI tools? Get a free instant audit in 2 minutes.",
    url: APP_URL,
    siteName: "Auditly",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Auditly — AI Spend Audit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Auditly — Free AI Spend Audit",
    description:
      "Find out if your startup is overpaying for Cursor, Claude, ChatGPT, and Copilot.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-paper font-body antialiased text-ink">{children}</body>
    </html>
  );
}
