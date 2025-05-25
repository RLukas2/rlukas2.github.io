import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { SkillWithIcon } from "@/types";

interface SkillModalProps {
  skill: SkillWithIcon;
  onClose: () => void;
  variants: any; // Adjust with your animation variants type if available
}

const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  onClose,
  variants,
}) => {
  return (
    <AnimatePresence>
      {skill && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            variants={variants.modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with skill name and icon */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  {skill.iconComponent}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.category.charAt(0).toUpperCase() +
                      skill.category.slice(1)}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Skill description */}
            {skill.description ? (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {skill.description}
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic mb-4">
                No description available.
              </p>
            )}
            {/* Proficiency indicator */}
            {skill.proficiency && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Proficiency:
                </span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < (skill.proficiency ?? 0)
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
  );
};

export default React.memo(SkillModal);
