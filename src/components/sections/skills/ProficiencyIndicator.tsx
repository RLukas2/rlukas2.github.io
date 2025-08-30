import React from "react";
import { motion } from "framer-motion";

interface ProficiencyIndicatorProps {
  level: number;
}

const ProficiencyIndicator: React.FC<ProficiencyIndicatorProps> = ({
  level,
}) => (
  <div className="mt-1 flex items-center space-x-1">
    {Array.from({ length: 5 }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className={`w-1.5 h-1.5 rounded-full ${
          i < level
            ? "bg-blue-500 dark:bg-blue-400"
            : "bg-gray-200 dark:bg-gray-600"
        }`}
      />
    ))}
  </div>
);

export default React.memo(ProficiencyIndicator);