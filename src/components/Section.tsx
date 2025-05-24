"use client";

import { useEffect, useState, memo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

// Memoize the loading component
const LoadingSpinner = memo(() => (
  <div className="min-h-screen w-full flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
));

LoadingSpinner.displayName = "LoadingSpinner";

const Section = memo(function Section({
  id,
  children,
  className = "",
}: SectionProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const [hasIntersected, setHasIntersected] = useState(false);

  // Use a callback ref to observe the section element
  const setSectionRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node && !hasIntersected) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setHasIntersected(true);
              controls.start("visible");
              observer.disconnect();
            }
          },
          {
            rootMargin: "50px",
            threshold: 0.1,
          }
        );
        observer.observe(node);
      }
    },
    [controls, hasIntersected]
  );

  // Once the section is visible, set isLoaded using requestAnimationFrame
  useEffect(() => {
    if (hasIntersected) {
      requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    }
  }, [hasIntersected]);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      id={id}
      ref={setSectionRef}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`w-full ${className}`}
      style={{
        willChange: "transform, opacity", // Optimize for animations
        contain: "content", // Optimize paint and layout
      }}
    >
      {isLoaded ? children : <LoadingSpinner />}
    </motion.section>
  );
});

Section.displayName = "Section";

export default Section;
