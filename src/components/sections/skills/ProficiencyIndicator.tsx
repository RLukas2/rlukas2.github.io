import React from "react";
import { motion } from "framer-motion";

interface ProficiencyIndicatorProps {
  level: number;
}

const ProficiencyIndicator: React.FC<ProficiencyIndicatorProps> = ({
  level,
}) => {
  // Validate level to ensure it's within bounds
  const validLevel = Math.max(1, Math.min(5, level));
  
  // Create array of 5 proficiency dots
  const dots = Array.from({ length: 5 }, (_, i) => ({
    index: i,
    isActive: i < validLevel,
    delay: i * 0.1,
  }));

  return (
    <div 
      className="mt-2 flex items-center space-x-1"
      role="meter"
      aria-valuenow={validLevel}
      aria-valuemin={1}
      aria-valuemax={5}
      aria-label={`Proficiency level: ${validLevel} out of 5`}
    >
      {dots.map(({ index, isActive, delay }) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay, 
            duration: 0.3,
            ease: "easeOut"
          }}
          className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
            isActive
              ? "bg-blue-500 dark:bg-blue-400 shadow-sm"
              : "bg-gray-200 dark:bg-gray-600"
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">
        Proficiency level: {validLevel} out of 5
      </span>
    </div>
  );
};

export default React.memo(ProficiencyIndicator);