"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useScroll } from "framer-motion";
import { FiClock, FiList, FiGrid } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experiences";
import { Experience as ExperienceType } from "@/types";
import { TimelineView } from "./experience/TimelineView";
import { TableView } from "./experience/TableView";
import { TabsView } from "./experience/TabsView";

// View modes
type ViewMode = "tabs" | "timeline" | "table";

// Animation variants moved outside component
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("tabs");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const handleTabClick = useCallback((id: number): void => {
    setActiveTab(id);
    if (window.innerWidth < 768 && timelineRef.current) {
      timelineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        const nextTab = activeTab < experiences.length ? activeTab + 1 : 1;
        handleTabClick(nextTab);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        const prevTab = activeTab > 1 ? activeTab - 1 : experiences.length;
        handleTabClick(prevTab);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, handleTabClick]);

  return (
    <section
      id="experience"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
      aria-label="Work Experience section"
    >
      {/* Background Elements with improved animations */}
      <motion.div
        className="absolute top-20 left-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              Career Path
            </span>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={itemVariants}
            >
              Work Experience
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={itemVariants}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              My professional journey as a backend engineer
            </motion.p>

            {/* View mode controls */}
            <motion.div 
              className={`flex justify-center gap-4 mt-8 ${
                experiences.length === 0 ? "hidden" : ""
              }`}
              variants={itemVariants}
            >
              <button
                onClick={() => setViewMode("tabs")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "tabs"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiList />
                Tabs
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "timeline"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiClock />
                Timeline
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === "table"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FiGrid />
                Table
              </button>
            </motion.div>
          </motion.div>

          {/* Content based on view mode */}
          <div ref={timelineRef}>
            {viewMode === "timeline" ? (
              <TimelineView experiences={experiences} />
            ) : viewMode === "table" ? (
              <TableView experiences={experiences} />
            ) : (
              <TabsView
                experiences={experiences}
                activeTab={activeTab}
                onTabClick={handleTabClick}
                isHovered={isHovered}
                onHoverStart={setIsHovered}
                onHoverEnd={() => setIsHovered(null)}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
