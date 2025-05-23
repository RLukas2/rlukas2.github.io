"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiGitBranch,
  FiSearch,
  FiX,
} from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiElectron,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiGithubactions,
  SiCircleci,
  SiGit,
  SiEthereum,
  SiJest,
  SiGoogle,
  SiRabbitmq,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";
import { skills as skillsData } from "@/data/skills";
import { Skill } from "@/types";

interface SkillWithIcon extends Skill {
  iconComponent: React.ReactNode;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

// Map icon names to actual icon components with improved typing
const iconMap: Record<string, React.ReactNode> = {
  SiJavascript: <SiJavascript className="text-3xl text-yellow-400" />,
  SiTypescript: <SiTypescript className="text-3xl text-blue-600" />,
  SiReact: <SiReact className="text-3xl text-blue-400" />,
  SiAngular: <SiAngular className="text-3xl text-red-600" />,
  SiElectron: <SiElectron className="text-3xl text-blue-500" />,
  SiNodedotjs: <SiNodedotjs className="text-3xl text-green-600" />,
  SiNestjs: <SiNestjs className="text-3xl text-red-500" />,
  SiExpress: <SiExpress className="text-3xl text-gray-600" />,
  SiGraphql: <SiGraphql className="text-3xl text-pink-600" />,
  SiPrisma: <SiPrisma className="text-3xl text-blue-800" />,
  SiPostgresql: <SiPostgresql className="text-3xl text-blue-700" />,
  SiMongodb: <SiMongodb className="text-3xl text-green-500" />,
  SiRedis: <SiRedis className="text-3xl text-red-600" />,
  SiDocker: <SiDocker className="text-3xl text-blue-600" />,
  SiKubernetes: <SiKubernetes className="text-3xl text-blue-500" />,
  SiAmazonaws: <SiAmazonwebservices className="text-3xl text-yellow-500" />,
  SiCircleci: <SiCircleci className="text-3xl text-black dark:text-white" />,
  SiGithubactions: (
    <SiGithubactions className="text-3xl text-gray-800 dark:text-gray-200" />
  ),
  SiGit: <SiGit className="text-3xl text-orange-600" />,
  SiEthereum: <SiEthereum className="text-3xl text-purple-600" />,
  SiJest: <SiJest className="text-3xl text-red-700" />,
  SiGoogle: <SiGoogle className="text-3xl text-blue-500" />,
  SiRabbitmq: <SiRabbitmq className="text-3xl text-orange-500" />,
  FaGolang: <FaGolang className="text-3xl text-blue-400" />,
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 },
  },
};

// Memoize categories to prevent unnecessary re-renders
const categories = [
  {
    id: "all",
    name: "All",
    icon: <FiCode />,
    description:
      "This section highlights a broad range of my technical skills. Each one reflects tools and technologies I've worked with during projects and coursework.",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: <FiCode />,
    description:
      "My frontend skills focus on building responsive, accessible interfaces using modern frameworks and libraries to ensure smooth user experiences.",
  },
  {
    id: "backend",
    name: "Backend",
    icon: <FiServer />,
    description:
      "I enjoy building scalable and maintainable backend systems, working with APIs, microservices, and key architectural patterns for efficiency.",
  },
  {
    id: "database",
    name: "Database",
    icon: <FiDatabase />,
    description:
      "Experienced in both SQL and NoSQL databases, I've worked on designing schemas, optimizing queries, and applying caching for better performance.",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: <FiCloud />,
    description:
      "I'm familiar with DevOps practices such as setting up CI/CD pipelines, managing deployments, and working with cloud infrastructure for automation and scalability.",
  },
  {
    id: "other",
    name: "Other",
    icon: <FiGitBranch />,
    description:
      "Additional tools and technologies that support and enhance my overall development workflow and technical capabilities.",
  },
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<SkillWithIcon | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Memoize processed skills
  const processedSkills = useMemo(() => {
    return skillsData.map((skill) => ({
      ...skill,
      iconComponent: iconMap[skill.icon] || (
        <FiCode className="text-3xl text-gray-500" />
      ),
      category: skill.category as
        | "frontend"
        | "backend"
        | "database"
        | "devops"
        | "other",
    }));
  }, []);

  // Memoize filtered skills
  const filteredSkills = useMemo(() => {
    let filtered = processedSkills;

    if (activeCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (skill) =>
          skill.name.toLowerCase().includes(query) ||
          skill.category.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery, processedSkills]);

  // Debounced search handler
  const debouncedSetSearchQuery = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  // Memoize category buttons
  const categoryButtons = useMemo(() => (
    <motion.div
      className="flex flex-wrap justify-center gap-3 mb-12"
      variants={itemVariants}
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
            activeCategory === category.id
              ? "bg-blue-600 text-white shadow-md scale-105"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          aria-selected={activeCategory === category.id}
          role="tab"
        >
          {category.icon}
          {category.name}
        </motion.button>
      ))}
    </motion.div>
  ), [activeCategory]);

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
      aria-label="Technical Skills section"
    >
      {/* Static background elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={sectionVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              My Expertise
            </span>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={itemVariants}
            >
              Technical Skills
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={itemVariants}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {categories.find((cat) => cat.id === activeCategory)?.description}
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div className="max-w-md mx-auto mb-8" variants={itemVariants}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                placeholder="Search skills..."
                className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                aria-label="Search skills"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filters */}
          {categoryButtons}

          {/* Skills Grid */}
          <div className="relative min-h-[400px]" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className={`bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-all cursor-pointer ${
                        hoveredSkill === skill.id
                          ? "ring-2 ring-blue-400 dark:ring-blue-500 shadow-lg"
                          : ""
                      }`}
                      variants={skillVariants}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setSelectedSkill(skill)}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                        transition: { duration: 0.2 },
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View details for ${skill.name}`}
                    >
                      <motion.div
                        className="mb-4 transform transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {skill.iconComponent}
                      </motion.div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </h3>
                      {skill.proficiency && (
                        <div className="mt-2 flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                i < skill.proficiency!
                                  ? "bg-blue-500"
                                  : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center py-16 text-gray-500 dark:text-gray-400"
                    variants={itemVariants}
                  >
                    <div className="text-5xl mb-4 opacity-30 flex justify-center">
                      <FiCode />
                    </div>
                    <p>No skills found matching your search.</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    {selectedSkill.iconComponent}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedSkill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedSkill.category.charAt(0).toUpperCase() +
                        selectedSkill.category.slice(1)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label="Close modal"
                >
                  <FiX size={24} />
                </button>
              </div>
              {selectedSkill.description ? (
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedSkill.description}
                </p>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 italic mb-4">
                  No description available.
                </p>
              )}
              {selectedSkill.proficiency && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Proficiency:
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < selectedSkill.proficiency!
                            ? "bg-blue-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
