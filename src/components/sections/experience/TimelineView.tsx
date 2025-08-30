import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiCheck, FiTool } from "react-icons/fi";
import { Experience as ExperienceType } from "@/types";
import { getTechIcon } from "@/utils/techIcons";

interface TimelineViewProps {
  experiences: ExperienceType[];
}

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const timelineItemRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const TimelineView: React.FC<TimelineViewProps> = ({ experiences }) => {
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
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/20" />
      
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          className={`relative mb-12 ${index % 2 === 0 ? 'ml-0' : 'ml-auto'} w-1/2`}
          initial="hidden"
          animate="visible"
          variants={index % 2 === 0 ? timelineItemVariants : timelineItemRightVariants}
        >
          {/* Timeline dot - now positioned on the line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full z-10" />
          
          <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {exp.position}
            </h3>
            <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              {exp.company}
            </h4>
            
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300 mb-4">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                <FiCalendar className="mr-2 text-blue-600 dark:text-blue-400" />
                <span>{exp.duration}</span>
              </div>
              <div className="flex items-center bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                <FiMapPin className="mr-2 text-blue-600 dark:text-blue-400" />
                <span>{exp.location}</span>
              </div>
            </div>

            <div className="space-y-4">
              {exp.description.map((item, idx) => (
                <div key={idx} className="flex items-start bg-gray-50 dark:bg-gray-700/30 p-3 rounded-lg">
                  <div className="flex-shrink-0 mr-3 mt-0.5">
                    <div className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-full">
                      <FiCheck size={14} />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center text-gray-900 dark:text-white">
                <FiTool className="mr-2 text-blue-600 dark:text-blue-400" />
                Technology Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full flex items-center"
                  >
                    <span className="mr-1.5">{getTechIcon(tech)}</span>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}; 