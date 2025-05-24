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
import { Experience as ExperienceType } from "@/types";
import { getTechIcon } from "@/utils/techIcons";
import { groupTechnologies } from "@/utils/techCategories";

interface TabsViewProps {
  experiences: ExperienceType[];
  activeTab: number;
  onTabClick: (id: number) => void;
  isHovered: string | null;
  onHoverStart: (tech: string) => void;
  onHoverEnd: () => void;
}

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

const timelineItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
    },
  },
};

export const TabsView: React.FC<TabsViewProps> = ({
  experiences,
  activeTab,
  onTabClick,
  isHovered,
  onHoverStart,
  onHoverEnd,
}) => {
  if (experiences.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <div className="flex flex-col bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg items-center">
          <p className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white mb-4">
            No experiences to showcase yet!
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-md">
            Stay tuned as I continue to grow my professional journey.
            Exciting updates will be added here soon!
          </p>
        </div>
      </div>
    );
  }

  return (
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
              onClick={() => onTabClick(exp.id)}
              className={`w-full py-4 px-5 text-left rounded-lg mb-1 transition-all flex items-start ${
                activeTab === exp.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              }`}
              whileHover={{ x: activeTab === exp.id ? 0 : 5 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
              aria-selected={activeTab === exp.id}
              role="tab"
              aria-controls={`experience-${exp.id}`}
            >
              <div className="mr-4 mt-1">
                <motion.div
                  className={`p-2 rounded-full ${
                    activeTab === exp.id
                      ? "bg-white/20"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                  animate={
                    activeTab === exp.id ? { scale: [1, 1.2, 1] } : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <FiBriefcase size={18} />
                </motion.div>
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
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FiArrowRight className="ml-auto self-center" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Right content - Experience Details */}
      <motion.div
        className="lg:col-span-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-hidden relative"
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
                  exit="exit"
                  variants={timelineItemVariants}
                  role="tabpanel"
                  id={`experience-${exp.id}`}
                >
                  <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.position}
                    </h3>
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                      {exp.company}
                    </h4>

                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-2">
                      <motion.div
                        className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiCalendar className="mr-2 text-blue-600 dark:text-blue-400" />
                        <span>{exp.duration}</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiMapPin className="mr-2 text-blue-600 dark:text-blue-400" />
                        <span>{exp.location}</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Key Achievements */}
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
                          whileHover={{ x: 5 }}
                          className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors group"
                        >
                          <motion.div
                            className="flex-shrink-0 mr-3 mt-0.5"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                              <FiCheck size={14} />
                            </div>
                          </motion.div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {item}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                      <FiTool className="mr-2 text-blue-600 dark:text-blue-400" />
                      Technology Stack
                    </h4>

                    <div className="space-y-4">
                      {Object.entries(groupTechnologies(exp.technologies))
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
                                    scale: 1.05,
                                    transition: { duration: 0.2 },
                                  }}
                                  onHoverStart={() => onHoverStart(tech)}
                                  onHoverEnd={onHoverEnd}
                                  className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full flex items-center shadow-sm transition-all duration-300"
                                >
                                  <motion.span
                                    className="mr-1.5"
                                    animate={
                                      isHovered === tech
                                        ? { rotate: 360 }
                                        : { rotate: 0 }
                                    }
                                    transition={{ duration: 0.5 }}
                                  >
                                    {getTechIcon(tech)}
                                  </motion.span>
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
  );
}; 