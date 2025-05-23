"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiGitBranch,
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
import {
  FaGolang
} from "react-icons/fa6";
import { skills as skillsData } from "@/data/skills";

// Define our local skill type that includes the icon component
interface SkillWithIcon {
  id: number;
  name: string;
  icon: string;
  iconComponent: React.ReactNode;
  category: "frontend" | "backend" | "database" | "devops" | "other";
}

// Map icon names to actual icon components
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

const categoryDescriptions = {
  all: "This section highlights a broad range of my technical skills. Each one reflects tools and technologies I've worked with during projects and coursework.",
  frontend:
    "My frontend skills focus on building responsive, accessible interfaces using modern frameworks and libraries to ensure smooth user experiences.",
  backend:
    "I enjoy building scalable and maintainable backend systems, working with APIs, microservices, and key architectural patterns for efficiency.",
  database:
    "Experienced in both SQL and NoSQL databases, I've worked on designing schemas, optimizing queries, and applying caching for better performance.",
  devops:
    "I'm familiar with DevOps practices such as setting up CI/CD pipelines, managing deployments, and working with cloud infrastructure for automation and scalability.",
  other:
    "Additional tools and technologies that support and enhance my overall development workflow and technical capabilities.",
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [processedSkills, setProcessedSkills] = useState<SkillWithIcon[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<SkillWithIcon[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Process skills data on component mount
  useEffect(() => {
    // Transform the imported skills data to include the actual icon components
    const processed = skillsData.map((skill) => ({
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

    setProcessedSkills(processed);
    setFilteredSkills(processed); // Initially show all skills
  }, []);

  // Update filtered skills when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredSkills(processedSkills);
    } else {
      const filtered = processedSkills.filter(
        (skill) => skill.category === activeCategory
      );
      setFilteredSkills(filtered);
    }
  }, [activeCategory, processedSkills]);

  const categories = [
    { id: "all", name: "All", icon: <FiCode /> },
    { id: "frontend", name: "Frontend", icon: <FiCode /> },
    { id: "backend", name: "Backend", icon: <FiServer /> },
    { id: "database", name: "Database", icon: <FiDatabase /> },
    { id: "devops", name: "DevOps", icon: <FiCloud /> },
    { id: "other", name: "Other", icon: <FiGitBranch /> },
  ];

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

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

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
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={itemVariants}
            >
              Technical Skills
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={itemVariants}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {
                categoryDescriptions[
                  activeCategory as keyof typeof categoryDescriptions
                ]
              }
            </motion.p>
          </motion.div>

          {/* Category Filters */}
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
                whileHover={{
                  scale: activeCategory === category.id ? 1.05 : 1.05,
                }}
                whileTap={{ scale: 0.98 }}
              >
                {category.icon}
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="relative min-h-[400px]">
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
                      className={`bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg transition-all ${
                        hoveredSkill === skill.id
                          ? "ring-2 ring-blue-400 dark:ring-blue-500 shadow-lg"
                          : ""
                      }`}
                      variants={skillVariants}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      whileHover={{
                        y: -8,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                        {skill.iconComponent}
                      </div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </h3>
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
                    <p>No skills found in this category.</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
