"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
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
import { SkillCategory, SkillWithIcon } from "@/types";
import CategoryButton from "./skills/CategoryButtons";
import SkillCard from "./skills/SkillCard";
import SkillModal from "./skills/SkillModal";

// Map icon names to actual icon components
const ICON_MAP: Record<string, React.ReactNode> = {
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

// Categories for skills
const CATEGORIES: SkillCategory[] = [
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

// Animation variants
const ANIMATION_VARIANTS = {
  section: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  },
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  skill: {
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
  },
  modal: {
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
  },
};


const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<SkillWithIcon | null>(
    null
  );
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
    return skillsData.map(
      (skill): SkillWithIcon => ({
        ...skill,
        iconComponent: ICON_MAP[skill.icon] || (
          <FiCode className="text-3xl text-gray-500" />
        ),
        category: (skill.category || "other") as SkillWithIcon["category"],
      })
    );
  }, []);

  // Memoize filtered skills
  const filteredSkills = useMemo(() => {
    let filtered = processedSkills;

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === activeCategory);
    }

    // Search filter with multiple criteria
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

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedSkill) {
        setSelectedSkill(null);
      }
    };

    if (selectedSkill) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedSkill]);

  // Handlers
  const handleSkillClick = useCallback((skill: SkillWithIcon) => {
    setSelectedSkill(skill);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
      aria-label="Technical Skills section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={ANIMATION_VARIANTS.section}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={ANIMATION_VARIANTS.item}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              My Expertise
            </span>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={ANIMATION_VARIANTS.item}
            >
              Technical Skills
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={ANIMATION_VARIANTS.item}
            />
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              variants={ANIMATION_VARIANTS.item}
            >
              {CATEGORIES.find((cat) => cat.id === activeCategory)?.description}
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="max-w-md mx-auto mb-8"
            variants={ANIMATION_VARIANTS.item}
          >
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
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={ANIMATION_VARIANTS.item}
          >
            {CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="relative min-h-[400px]" ref={containerRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {filteredSkills.length > 0 ? (
                  filteredSkills.map((skill, index) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      onClick={() => handleSkillClick(skill)}
                      isHovered={hoveredSkill === index}
                      onHoverStart={() => setHoveredSkill(index)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      variants={ANIMATION_VARIANTS.skill}
                    />
                  ))
                ) : (
                  <motion.div
                    className="col-span-full text-center py-16 text-gray-500 dark:text-gray-400"
                    variants={ANIMATION_VARIANTS.item}
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
          <SkillModal
            skill={selectedSkill}
            onClose={() => setSelectedSkill(null)}
            variants={ANIMATION_VARIANTS.modal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
