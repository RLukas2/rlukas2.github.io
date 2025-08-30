// src/app/layout.tsx
import { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ErrorBoundary } from "react-error-boundary";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "./providers";
import ErrorFallback from "@/components/error/ErrorFallback";

// Define metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://rlukas2.github.io"),
  title: {
    template: "%s | Ngo Hoang Tuan",
    default: "Ngo Hoang Tuan | Portfolio - Backend Developer",
  },
  description: "Ngo Hoang Tuan (Rickie Lukas) - Backend Developer specializing in Node.js, NestJS, GraphQL, and microservices. Passionate about scalable cloud architecture and modern web technologies.",
  keywords: [
    "Ngo Hoang Tuan", "Rickie Lukas", "rlukas2", "Backend Developer",
    "Node.js", "NestJS", "GraphQL", "TypeScript", "Microservices",
    "AWS", "Cloud Architecture", "Software Engineer", "Portfolio"
  ],
  authors: [{ name: "Ngo Hoang Tuan", url: "https://rlukas2.github.io" }],
  creator: "Ngo Hoang Tuan",
  publisher: "Ngo Hoang Tuan",
  category: "technology",
  alternates: {
    canonical: "https://rlukas2.github.io",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rlukas2.github.io",
    title: "Ngo Hoang Tuan | Portfolio - Backend Developer",
    description: "Backend Developer specializing in Node.js, NestJS, GraphQL, and microservices architecture. Building scalable solutions with modern technologies.",
    siteName: "Ngo Hoang Tuan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ngo Hoang Tuan - Backend Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@rickielukas",
    creator: "@rickielukas",
    title: "Ngo Hoang Tuan | Portfolio - Backend Developer",
    description: "Backend Developer specializing in Node.js, NestJS, GraphQL, and microservices architecture.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    noarchive: false,
    nosnippet: false,
    noimageindex: false,
    nocache: false,
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
  other: {
    "msapplication-TileColor": "#2563eb",
    "theme-color": "#2563eb",
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
  viewportFit: "cover",
};

// Define the JSON-LD structured data for SEO
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ngo Hoang Tuan",
  alternateName: ["Rickie Lukas", "rlukas2"],
  url: "https://rlukas2.github.io",
  image: "https://rlukas2.github.io/profile.jpg",
  description: "Backend Developer specializing in Node.js, NestJS, GraphQL, and microservices architecture.",
  jobTitle: "Backend Developer",
  worksFor: {
    "@type": "Organization",
    name: "Student & Freelance Developer"
  },
  sameAs: [
    "https://github.com/rlukas2",
    "https://twitter.com/rickielukas",
    "https://linkedin.com/in/xbrk",
  ],
  knowsAbout: [
    "Node.js", "NestJS", "GraphQL", "TypeScript", "Microservices",
    "AWS", "Cloud Architecture", "Backend Development", "API Design"
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Student"
  },
  skills: [
    "Backend Development", "API Design", "Microservices Architecture",
    "Cloud Computing", "Database Design", "DevOps"
  ]
};


// The root layout component
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
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://vercel.live" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//vitals.vercel-analytics.com" />
      </head>


      <body className="text-foreground bg-background font-sans antialiased flex flex-col min-h-screen">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
        >
          <Providers>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>

            {/* Analytics - only in production */}
            {process.env.NODE_ENV === 'production' && (
              <>
                <Analytics />
                <SpeedInsights />
              </>
            )}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
