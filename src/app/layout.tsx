// src/app/layout.tsx
import { Metadata, Viewport } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

// Define metadata for better SEO
export const metadata: Metadata = {
  title: {
    template: "%s | Ngo Hoang Tuan",
    default: "Ngô Hoàng Tuấn | Backend Engineer",
  },
  description:
    "Backend Engineer specializing in scalable microservices, Node.js, NestJS, GraphQL, and cloud infrastructure with AWS.",
  keywords: [
    "software engineer",
    "backend developer",
    "node.js",
    "nestjs",
    "graphql",
    "microservices",
    "aws",
    "web3",
    "typescript",
    "cloud architecture",
  ],
  authors: [{ name: "Ngo Hoang Tuan" }],
  creator: "Ngo Hoang Tuan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rlukas2.github.com",
    title: "Ngo Hoang Tuan | Backend Engineer",
    description:
      "Backend Engineer with expertise in Node.js, NestJS, GraphQL, and microservices architecture",
    siteName: "Ngo Hoang Tuan Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Define viewport for responsive design with dark theme color
export const viewport: Viewport = {
  themeColor: "#0f172a", // Dark blue color for theme
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="text-foreground bg-background font-sans antialiased flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
