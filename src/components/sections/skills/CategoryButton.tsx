import React from "react";
import { motion } from "framer-motion";
import { SkillCategory } from "@/types";

interface CategoryButtonProps {
  category: SkillCategory;
  isActive: boolean;
  onClick: () => void;
  variants?: any;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isActive,
  onClick,
  variants,
}) => (
  <motion.button
    variants={variants}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-400"
        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
    }`}
    aria-pressed={isActive}
    role="tab"
    aria-selected={isActive}
    aria-controls={`${category.id}-panel`}
    id={`${category.id}-tab`}
  >
    <span className="text-lg" aria-hidden="true">
      {category.icon}
    </span>
    <span>{category.name}</span>
  </motion.button>
);

export default React.memo(CategoryButton);