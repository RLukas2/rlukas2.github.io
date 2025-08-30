import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { SkillWithIcon } from "@/types";

interface SkillModalProps {
  skill: SkillWithIcon;
  onClose: () => void;
  variants: any;
}

const SkillModal: React.FC<SkillModalProps> = ({
  skill,
  onClose,
  variants,
}) => {
  return (
    <AnimatePresence>
      {skill && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with skill name and icon */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    {skill.iconComponent}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </p>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto">
                {/* Skill description */}
                {skill.description ? (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      About
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No description available.
                    </p>
                  </div>
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
                          className={`w-2 h-2 rounded-full ${i < (skill.proficiency ?? 0)
                              ? "bg-blue-500"
                              : "bg-gray-200 dark:bg-gray-700"
                            }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(SkillModal);