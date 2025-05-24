"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { ExpertiseData, TabContent, CoreValues } from "@/data/about";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("professional");
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [selectedExpertise, setSelectedExpertise] = useState<
    (typeof ExpertiseData)[0] | null
  >(null);
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
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
                <motion.button
                  onClick={() => setSelectedExpertise(item)}
                  className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
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
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Expertise Modal */}
      <AnimatePresence>
        {selectedExpertise && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedExpertise(null)}
            />
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 p-6 m-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <div
                    className={`p-3 ${selectedExpertise.iconBg} rounded-full mr-4`}
                  >
                    {selectedExpertise.icon}
                  </div>
                  <h3
                    className={`text-2xl font-bold ${selectedExpertise.color}`}
                  >
                    {selectedExpertise.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedExpertise(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <FiX className="text-gray-500 dark:text-gray-400" size={24} />
                </button>
              </div>

              {selectedExpertise.detailedInfo ? (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExpertise.detailedInfo.technologies.map(
                        (tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      Key Skills
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                      {selectedExpertise.detailedInfo.keySkills.map(
                        (skill, index) => (
                          <li key={index}>{skill}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                      Notable Projects
                    </h4>
                    <div className="space-y-4">
                      {selectedExpertise.detailedInfo.projects.map(
                        (project, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                          >
                            <h5 className="font-medium text-gray-900 dark:text-white mb-1">
                              {project.name}
                            </h5>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {project.description}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedExpertise.description}
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default About;
