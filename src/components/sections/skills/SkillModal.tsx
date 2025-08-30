import React, { useEffect, useRef } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management and accessibility
  useEffect(() => {
    if (modalRef.current) {
      // Focus the modal when it opens
      modalRef.current.focus();
      
      // Set up focus trap
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      modalRef.current.addEventListener('keydown', handleTabKey);
      
      return () => {
        modalRef.current?.removeEventListener('keydown', handleTabKey);
      };
    }
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
            aria-hidden="true"
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              ref={modalRef}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
              tabIndex={-1}
            >
              {/* Header with skill name and icon */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    {skill.iconComponent}
                  </div>
                  <div>
                    <h3 
                      id="modal-title"
                      className="text-xl font-bold text-gray-900 dark:text-white"
                    >
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}
                    </p>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div 
                id="modal-description"
                className="p-6 overflow-y-auto"
              >
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
                      No description available for this skill.
                    </p>
                  </div>
                )}

                {/* Proficiency indicator */}
                {skill.proficiency && (
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Proficiency Level
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Skill Level:
                      </span>
                      <div className="flex gap-1" role="meter" aria-valuenow={skill.proficiency} aria-valuemin={1} aria-valuemax={5}>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                              i < (skill.proficiency ?? 0)
                                ? "bg-blue-500 dark:bg-blue-400"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.proficiency}/5
                      </span>
                    </div>
                  </div>
                )}

                {/* Additional skill information could go here */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Click outside or press Escape to close this modal.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(SkillModal);