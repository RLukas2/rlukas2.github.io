import React from "react";
import { motion } from "framer-motion";

interface ProficiencyIndicatorProps {
  level: number;
}

const ProficiencyIndicator: React.FC<ProficiencyIndicatorProps> = ({
  level,
}) => (
  <div
    className="mt-3 flex gap-1"
    aria-label={`Proficiency: ${level} out of 5`}
  >
    {Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
          i < level ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-600"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.05 }}
      />
    ))}
  </div>
);

export default React.memo(ProficiencyIndicator);
