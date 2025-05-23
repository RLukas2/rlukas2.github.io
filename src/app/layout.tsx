// src/app/layout.tsx
import { Metadata, Viewport } from "next";
import { GeistSans, GeistMono } from "geist/font";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import ErrorFallback from "@/components/ErrorFallback";

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
  publisher: "Ngo Hoang Tuan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rlukas2.github.com",
    title: "Ngo Hoang Tuan | Portfolio",
    description:
      "Backend Engineer with expertise in Node.js, NestJS, GraphQL, and microservices architecture",
    siteName: "Ngo Hoang Tuan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ngo Hoang Tuan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ngo Hoang Tuan | Portfolio",
    description:
      "Backend Engineer with expertise in Node.js, NestJS, GraphQL, and microservices architecture",
    images: ["/og-image.jpg"],
    creator: "@rickielukas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "UZjg3rLNvmdngjzZyQOlUSFmQHAh1XV-SsdN8g7ut_E",
  },
};

// Define viewport for responsive design with dark theme color
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Ngo Hoang Tuan Portfolio"
        />
      </head>
      <body className="text-foreground bg-background font-sans antialiased flex flex-col min-h-screen">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Providers>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  );
}
