"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiGitBranch,
  FiSearch,
  FiX,
} from "react-icons/fi";

import { skills as skillsData } from "@/data/skills";
import { SkillWithIcon } from "@/types";
import { SKILL_CATEGORIES, SKILL_ICON_MAP } from "@/lib/skills-config";
import { SKILL_ANIMATION_VARIANTS } from "@/lib/animations";
import CategoryButton from "./CategoryButton";
import SkillCard from "./SkillCard";
import SkillModal from "./SkillModal";

const { container, item, modal, section, skill } = SKILL_ANIMATION_VARIANTS;

// Extract search component for better organization
const SearchBar: React.FC<{
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClear: () => void;
}> = React.memo(({ searchQuery, onSearchChange, onClear }) => (
  <motion.div
    className="max-w-md mx-auto mb-8"
    variants={item}
  >
    <div className="relative">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search skills..."
        className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        aria-label="Search skills by name, category, or description"
        aria-describedby="search-description"
      />
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      {searchQuery && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search query"
        >
          <FiX />
        </button>
      )}
    </div>
    <div id="search-description" className="sr-only">
      Search through all skills by name, category, or description
    </div>
  </motion.div>
));

// Extract skills grid component
const SkillsGrid: React.FC<{
  skills: SkillWithIcon[];
  onSkillClick: (skill: SkillWithIcon) => void;
  hoveredSkill: number | null;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}> = React.memo(({ 
  skills, 
  onSkillClick, 
  hoveredSkill, 
  onHoverStart, 
  onHoverEnd, 
  containerRef 
}) => (
  <div className="relative min-h-[400px]" ref={containerRef}>
    <AnimatePresence mode="wait">
      <motion.div
        key={`skills-${skills.length}`}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <SkillCard
              key={`${skill.name}-${skill.category}`}
              skill={skill}
              onClick={() => onSkillClick(skill)}
              isHovered={hoveredSkill === index}
              onHoverStart={() => onHoverStart(index)}
              onHoverEnd={onHoverEnd}
              variants={skill}
            />
          ))
        ) : (
          <motion.div
            className="col-span-full text-center py-16 text-gray-500 dark:text-gray-400"
            variants={item}
            initial="hidden"
            animate="visible"
          >
            <div className="text-5xl mb-4 opacity-30 flex justify-center">
              <FiCode />
            </div>
            <p>No skills found matching your search.</p>
            <p className="text-sm mt-2">Try adjusting your search terms or category filter.</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  </div>
));

// Extract section header component
const SectionHeader: React.FC<{
  activeCategory: string;
}> = React.memo(({ activeCategory }) => {
  const categoryInfo = useMemo(() => 
    SKILL_CATEGORIES.find((cat) => cat.id === activeCategory), 
    [activeCategory]
  );

  return (
    <motion.div
      variants={item}
      className="text-center mb-16"
    >
      <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
        My Expertise
      </span>
      <motion.h2
        className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
        variants={item}
      >
        Technical Skills
      </motion.h2>
      <motion.div
        className="h-1 w-20 bg-blue-500 mx-auto mb-6"
        variants={item}
      />
      <motion.p
        className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        variants={item}
      >
        {categoryInfo?.description}
      </motion.p>
    </motion.div>
  );
});

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<SkillWithIcon | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Memoize processed skills to prevent recreation on every render
  const processedSkills = useMemo((): SkillWithIcon[] => {
    return skillsData.map((skill) => ({
      ...skill,
      iconComponent: SKILL_ICON_MAP[skill.icon] || null,
      category: (skill.category || "other") as SkillWithIcon["category"],
    }));
  }, []);

  // Memoize filtered skills with efficient filtering
  const filteredSkills = useMemo(() => {
    let filtered = processedSkills;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter((skill) => skill.category === activeCategory);
    }

    // Apply search filter with multiple criteria
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((skill) =>
        skill.name.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        (skill.description && skill.description.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [processedSkills, activeCategory, searchQuery]);

  // Optimized search handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedSkill) {
        setSelectedSkill(null);
      }
    };

    if (selectedSkill) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedSkill]);

  // Handlers
  const handleSkillClick = useCallback((skill: SkillWithIcon) => {
    setSelectedSkill(skill);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSkill(null);
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    // Clear search when changing categories for better UX
    if (searchQuery) {
      setSearchQuery("");
    }
  }, [searchQuery]);

  const handleHoverStart = useCallback((index: number) => {
    setHoveredSkill(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredSkill(null);
  }, []);

  return (
    <section
      id="skills"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
      aria-label="Technical Skills section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={section}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <SectionHeader activeCategory={activeCategory} />

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClear={handleClearSearch}
          />

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={item}
          >
            {SKILL_CATEGORIES.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              />
            ))}
          </motion.div>

          {/* Skills Grid */}
          <SkillsGrid
            skills={filteredSkills}
            onSkillClick={handleSkillClick}
            hoveredSkill={hoveredSkill}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            containerRef={containerRef}
          />
        </motion.div>
      </div>

      {/* Skill Details Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={handleCloseModal}
            variants={modal}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
