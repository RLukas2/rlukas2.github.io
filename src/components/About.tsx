"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiChevronRight,
} from "react-icons/fi";
import { ExpertiseData, TabContent, CoreValues } from "@/data/about";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("professional");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Memoize the data to prevent unnecessary re-renders
  const memoizedExpertiseData = useMemo(() => ExpertiseData, []);
  const memoizedCoreValues = useMemo(() => CoreValues, []);
  const memoizedTabContent = useMemo(() => TabContent, []);

  // Track tab changes for analytics
  useEffect(() => {
    // You can add analytics tracking here
    console.log(`Tab changed to: ${activeTab}`);
  }, [activeTab]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
      aria-label="About section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              Get to Know Me
            </span>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeIn}
            >
              About Me
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={fadeIn}
            />
          </motion.div>

          {/* Enhanced Tab Navigation with better animations */}
          <motion.div className="flex justify-center mb-8" variants={fadeIn}>
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {[
                {
                  id: "professional",
                  label: "Professional",
                  icon: <FiTrendingUp className="mr-2" />,
                },
                {
                  id: "education",
                  label: "Education",
                  icon: <FiBookOpen className="mr-2" />,
                },
                {
                  id: "personal",
                  label: "Personal",
                  icon: <FiAward className="mr-2" />,
                },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                  aria-controls={`${tab.id}-panel`}
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Tab Content with smooth transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabVariants}
              className="mb-16 text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm [text-align:justify]"
              role="tabpanel"
              aria-labelledby={`${activeTab}-tab`}
              id={`${activeTab}-panel`}
            >
              {memoizedTabContent[activeTab as keyof typeof memoizedTabContent]}
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Core Values Section with better animations */}
          <motion.div variants={fadeIn} className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memoizedCoreValues.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  onHoverStart={() => setIsHovered(value.title)}
                  onHoverEnd={() => setIsHovered(null)}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                    animate={
                      isHovered === value.title
                        ? { rotate: 360 }
                        : { rotate: 0 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    {value.icon}
                  </motion.div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Key Expertise Areas with better animations */}
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            variants={fadeIn}
          >
            Key Areas of Expertise
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {memoizedExpertiseData.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5, scale: 1.02 }}
                onHoverStart={() => setIsHovered(item.id)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <div className="flex items-center mb-4">
                  <motion.div
                    className={`p-3 ${item.iconBg} rounded-full mr-4`}
                    animate={
                      isHovered === item.id ? { scale: 1.1 } : { scale: 1 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className={`text-xl font-semibold ${item.color}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
                <motion.div
                  className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isHovered === item.id
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -10 }
                  }
                  transition={{ duration: 0.2 }}
                >
                  <span>Learn more</span>
                  <FiChevronRight className="ml-1" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
