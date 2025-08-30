// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HeroSkeleton, SectionSkeleton } from "@/components/UI/LoadingSkeleton";
import { ErrorBoundary } from "react-error-boundary";

// Dynamically import components with optimized loading states
const Hero = dynamic(() => import("@/components/sections/hero/Hero"), {
  loading: () => <HeroSkeleton />,
  ssr: true,
});

const About = dynamic(() => import("@/components/sections/about/About"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const Experience = dynamic(() => import("@/components/sections/experience/Experience"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const Skills = dynamic(() => import("@/components/sections/skills/Skills"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const Projects = dynamic(() => import("@/components/sections/projects/Projects"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

const Contact = dynamic(() => import("@/components/sections/contact/Contact"), {
  loading: () => <SectionSkeleton />,
  ssr: true,
});

// Error fallback component for sections
const SectionErrorFallback = ({ error, resetErrorBoundary }: any) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        We encountered an error loading this section
      </h2>
      <p className="text-gray-600 mb-4">{error?.message || 'Something went wrong'}</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </div>
  </div>
);

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('Hero Section Error:', error)}
      >
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
      </ErrorBoundary>

      {/* About Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('About Section Error:', error)}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
      </ErrorBoundary>

      {/* Experience Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('Experience Section Error:', error)}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
      </ErrorBoundary>

      {/* Skills Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('Skills Section Error:', error)}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
      </ErrorBoundary>

      {/* Projects Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('Projects Section Error:', error)}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
      </ErrorBoundary>

      {/* Contact Section */}
      <ErrorBoundary
        FallbackComponent={SectionErrorFallback}
        onError={(error) => console.error('Contact Section Error:', error)}
      >
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}