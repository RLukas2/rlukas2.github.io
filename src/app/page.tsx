// src/app/page.tsx
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import components with loading states
const Hero = dynamic(() => import("@/components/Hero"), {
  loading: () => <div key="hero-loading" className="h-screen animate-pulse" />,
  ssr: true,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div key="about-loading" className="h-screen animate-pulse" />,
  ssr: true,
});

const Experience = dynamic(() => import("@/components/Experience"), {
  loading: () => (
    <div key="experience-loading" className="h-screen animate-pulse" />
  ),
  ssr: true,
});

const Skills = dynamic(() => import("@/components/Skills"), {
  loading: () => (
    <div key="skills-loading" className="h-screen animate-pulse" />
  ),
  ssr: true,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => (
    <div key="projects-loading" className="h-screen animate-pulse" />
  ),
  ssr: true,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => (
    <div key="contact-loading" className="h-screen animate-pulse" />
  ),
  ssr: true,
});

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </Suspense>
  );
}
