"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiArrowRight,
  FiCheck,
  FiTool,
  FiTarget,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data/experiences";

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (id: number): void => {
    setActiveTab(id);
    // Optional: Scroll to content on mobile
    if (window.innerWidth < 768 && timelineRef.current) {
      timelineRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Animation variants
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

  const panelVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Group technologies by category for better visual organization
  const groupTechnologies = (techs: string[]) => {
    const groups = {
      frontend: [] as string[],
      backend: [] as string[],
      database: [] as string[],
      devops: [] as string[],
      other: [] as string[],
    };

    const categoryMap: Record<string, keyof typeof groups> = {
      React: "frontend",
      Angular: "frontend",
      "Electron.js": "frontend",
      TypeScript: "frontend",
      "HTML/CSS": "frontend",

      "Node.js": "backend",
      NestJS: "backend",
      GraphQL: "backend",
      gRPC: "backend",
      Prisma: "backend",
      TypeORM: "backend",
      RabbitMQ: "backend",
      Microservices: "backend",
      "RESTful APIs": "backend",

      PostgreSQL: "database",
      Redis: "database",

      Docker: "devops",
      Kubernetes: "devops",
      "AWS (ECS, S3, CloudFront)": "devops",
      "AWS (Elastic Beanstalk, CodePipeline)": "devops",
      CircleCI: "devops",
      "CI/CD": "devops",

      Git: "other",
      Jira: "other",
      Zoho: "other",
    };

    techs.forEach((tech) => {
      const category = categoryMap[tech] || "other";
      groups[category].push(tech);
    });

    return groups;
  };

  const getTechIcon = (tech: string) => {
    const lowercaseTech = tech.toLowerCase();
    if (lowercaseTech.includes("aws")) return "☁️";
    if (lowercaseTech.includes("docker")) return "🐳";
    if (lowercaseTech.includes("nest")) return "🪺";
    if (lowercaseTech.includes("node")) return "🟢";
    if (lowercaseTech.includes("graphql")) return "⬢";
    if (lowercaseTech.includes("react")) return "⚛️";
    if (lowercaseTech.includes("postgres")) return "🐘";
    if (lowercaseTech.includes("redis")) return "🔴";
    if (lowercaseTech.includes("angular")) return "🅰️";
    if (lowercaseTech.includes("typescript")) return "TS";
    if (lowercaseTech.includes("microservice")) return "μ️";
    if (lowercaseTech.includes("kubernetes")) return "☸️";
    if (lowercaseTech.includes("jira")) return "📋";
    if (lowercaseTech.includes("git")) return "🔄";
    return "🔧";
  };

  return (
    <section
      id="experience"
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

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
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={itemVariants}
            >
              Work Experience
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={itemVariants}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              My professional journey as a backend engineer
            </motion.p>
          </motion.div>

          {/* Timeline and Content */}
          {experiences.length === 0 && (
            <motion.div
              className="text-center text-gray-500 dark:text-gray-400"
              variants={itemVariants}
            >
              <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg items-center">
                {/* <img
                  src="/assets/empty-state.svg"
                  alt="No experiences"
                  className="w-48 h-48 mb-6"
                /> */}
                <p className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white mb-4">
                  No experiences to showcase yet!
                </p>
                <p className="text-gray-700 dark:text-gray-300 max-w-md">
                  Stay tuned as I continue to grow my professional journey.
                  Exciting updates will be added here soon!
                </p>
              </div>
            </motion.div>
          )}
          {experiences.length > 0 && (
            <div className="lg:grid lg:grid-cols-12 gap-8">
              {/* Left sidebar - Timeline */}
              <motion.div
                className="lg:col-span-4 mb-6 lg:mb-0"
                variants={itemVariants}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg">
                  {experiences.map((exp) => (
                    <motion.button
                      key={exp.id}
                      onClick={() => handleTabClick(exp.id)}
                      className={`w-full py-4 px-5 text-left rounded-lg mb-1 transition-all flex items-start ${
                        activeTab === exp.id
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                      whileHover={{ x: activeTab === exp.id ? 0 : 5 }}
                      whileTap={{ scale: 0.98 }}
                      variants={itemVariants}
                    >
                      <div className="mr-4 mt-1">
                        <div
                          className={`p-2 rounded-full ${
                            activeTab === exp.id
                              ? "bg-white/20"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          <FiBriefcase size={18} />
                        </div>
                      </div>
                      <div>
                        <span className="block text-lg font-semibold leading-tight">
                          {exp.position}
                        </span>
                        <span
                          className={`block text-sm mb-1 ${
                            activeTab === exp.id
                              ? "text-blue-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {exp.company}
                        </span>
                        <span
                          className={`text-xs flex items-center ${
                            activeTab === exp.id
                              ? "text-blue-200"
                              : "text-gray-500 dark:text-gray-500"
                          }`}
                        >
                          <FiCalendar className="mr-1" size={12} />
                          {exp.duration}
                        </span>
                      </div>
                      {activeTab === exp.id && (
                        <FiArrowRight className="ml-auto self-center" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Right content - Experience Details */}
              <motion.div
                ref={timelineRef}
                className="lg:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-hidden"
                variants={itemVariants}
              >
                <AnimatePresence mode="wait">
                  {experiences.map(
                    (exp) =>
                      activeTab === exp.id && (
                        <motion.div
                          key={exp.id}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={panelVariants}
                        >
                          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                              {exp.position}
                            </h3>
                            <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                              {exp.company}
                            </h4>

                            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-2">
                              <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                <FiCalendar className="mr-2 text-blue-600 dark:text-blue-400" />
                                <span>{exp.duration}</span>
                              </div>
                              <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                                <FiMapPin className="mr-2 text-blue-600 dark:text-blue-400" />
                                <span>{exp.location}</span>
                              </div>
                            </div>
                          </div>

                          {/* Key Achievements - Improved UI with categories */}
                          <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                              <FiTarget className="mr-2 text-blue-600 dark:text-blue-400" />
                              Key Accomplishments
                            </h4>

                            <div className="space-y-4">
                              {exp.description.map((item, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{
                                    opacity: 1,
                                    x: 0,
                                    transition: { delay: idx * 0.1 },
                                  }}
                                  className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group"
                                >
                                  <div className="flex-shrink-0 mr-3 mt-0.5">
                                    <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                                      <FiCheck size={14} />
                                    </div>
                                  </div>
                                  <p className="text-gray-700 dark:text-gray-300">
                                    {item}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Technologies with categories */}
                          <div>
                            <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                              <FiTool className="mr-2 text-blue-600 dark:text-blue-400" />
                              Technology Stack
                            </h4>

                            <div className="space-y-4">
                              {Object.entries(
                                groupTechnologies(exp.technologies)
                              )
                                .filter(([, techs]) => techs.length > 0)
                                .map(([category, techs]) => (
                                  <div key={category} className="mb-4">
                                    <h5 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2 ml-1">
                                      {category.charAt(0).toUpperCase() +
                                        category.slice(1)}
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {techs.map((tech, idx) => (
                                        <motion.span
                                          key={idx}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                            transition: { delay: idx * 0.05 },
                                          }}
                                          whileHover={{
                                            y: -3,
                                            transition: { duration: 0.2 },
                                          }}
                                          className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full flex items-center shadow-sm transition-all duration-300"
                                        >
                                          <span className="mr-1.5">
                                            {getTechIcon(tech)}
                                          </span>
                                          {tech}
                                        </motion.span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </motion.div>
                      )
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
