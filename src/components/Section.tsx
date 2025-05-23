"use client";

import { useEffect, useRef, useState, memo } from "react";
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

LoadingSpinner.displayName = 'LoadingSpinner';

const Section = memo(function Section({ id, children, className = "" }: SectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create observer only once
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            controls.start("visible");
            observerRef.current?.unobserve(entry.target);
          }
        },
        {
          root: null,
          rootMargin: "50px", // Start loading slightly before the section is visible
          threshold: 0.1,
        }
      );
    }

    const currentRef = sectionRef.current;
    if (currentRef) {
      observerRef.current.observe(currentRef);
    }

    return () => {
      if (currentRef && observerRef.current) {
        observerRef.current.unobserve(currentRef);
      }
    };
  }, [controls]);

  useEffect(() => {
    if (isVisible) {
      // Use requestAnimationFrame for smoother loading
      requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    }
  }, [isVisible]);

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
      ref={sectionRef}
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

Section.displayName = 'Section';

export default Section; 