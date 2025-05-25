import React from "react";
import { motion } from "framer-motion";
import { SkillWithIcon } from "@/types";
import ProficiencyIndicator from "./ProficiencyIndicator";

interface SkillCardProps {
  skill: SkillWithIcon;
  onClick: () => void;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  variants: any;
}

const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  onClick,
  isHovered,
  onHoverStart,
  onHoverEnd,
  variants,
}) => (
  <motion.div
    className={`
      bg-white dark:bg-gray-800 rounded-xl p-6 
      flex flex-col items-center justify-center text-center 
      shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer
      border border-gray-100 dark:border-gray-700
      ${isHovered ? "ring-2 ring-blue-400 dark:ring-blue-500" : ""}
    `}
    variants={variants.skill}
    onMouseEnter={onHoverStart}
    onMouseLeave={onHoverEnd}
    onClick={onClick}
    whileHover={{ y: -6, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    role="button"
    tabIndex={0}
    aria-label={`View details for ${skill.name}`}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
  >
    <motion.div
      className="mb-4 flex items-center justify-center"
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.2 }}
    >
      {skill.iconComponent}
    </motion.div>
    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
      {skill.name}
    </h3>
    {skill.proficiency && (
      <ProficiencyIndicator level={skill.proficiency} />
    )}
  </motion.div>
);

export default React.memo(SkillCard);
