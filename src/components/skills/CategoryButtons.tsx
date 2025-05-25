import React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@/types"; // adjust path as needed

interface CategoryButtonProps {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  variants?: any; // optional: for animation variants if used
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  onClick,
}) => (
  <motion.button
    onClick={onClick}
    className={`
      px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
      flex items-center gap-2 border
      ${
        isActive
          ? "bg-blue-600 text-white shadow-lg border-blue-600 scale-105"
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
      }
    `}
    whileHover={{ scale: isActive ? 1.05 : 1.02 }}
    whileTap={{ scale: 0.98 }}
    aria-selected={isActive}
    role="tab"
  >
    {category.icon}
    {category.name}
  </motion.button>
);

export default React.memo(CategoryButton);
