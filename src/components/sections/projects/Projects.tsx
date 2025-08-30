"use client";

import { useState, useRef, useCallback, useMemo, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiX,
  FiArrowRight,
  FiLayout,
  FiCode,
  FiLayers,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
} from "react-icons/fi";

import { projects } from "@/data/projects";
import { useInView } from "react-intersection-observer";
import { Project } from "@/types";
import { PROJECTS_ANIMATION_VARIANTS } from "@/lib/animations";

const { containerVariants, fadeIn, modalVariants } = PROJECTS_ANIMATION_VARIANTS;

interface FilterState {
  search: string;
  status: string;
  technologies: string[];
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filterState, setFilterState] = useState<FilterState>({
    search: "",
    status: "all",
    technologies: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>(
    []
  );

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add state for drag scrolling
  const [isDragging, setIsDragging] = useState(false);
  const dragX = useMotionValue(0);
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 });

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track slider scroll position
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Add state for visible items count
  const [visibleItems, setVisibleItems] = useState(3);

  // Update visible items count based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // sm breakpoint
        setVisibleItems(1);
      } else if (width < 1024) {
        // lg breakpoint
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  // Calculate current slide index
  const currentSlideIndex = useMemo(() => {
    if (!sliderRef.current) return 0;
    const slideWidth = sliderRef.current.clientWidth / visibleItems;
    return Math.round(scrollPosition / slideWidth);
  }, [scrollPosition, visibleItems]);

  // Extract unique technologies from projects
  useEffect(() => {
    const techs = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => techs.add(tech));
    });
    setAvailableTechnologies(Array.from(techs));
  }, []);

  // Filter projects based on search, status, and technologies
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(filterState.search.toLowerCase()) ||
        project.description
          .toLowerCase()
          .includes(filterState.search.toLowerCase());

      const matchesStatus =
        filterState.status === "all" || project.status === filterState.status;

      const matchesTechnologies =
        filterState.technologies.length === 0 ||
        filterState.technologies.every((tech) =>
          project.technologies.includes(tech)
        );

      return matchesSearch && matchesStatus && matchesTechnologies;
    });
  }, [filterState]);

  // Update scroll position and max scroll
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const updateScroll = () => {
      setScrollPosition(slider.scrollLeft);
      setMaxScroll(slider.scrollWidth - slider.clientWidth);
    };

    slider.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);
    updateScroll();

    return () => {
      slider.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [filteredProjects]);

  // Handle mouse events for drag scrolling
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    const startX = e.pageX - sliderRef.current.scrollLeft;

    const handleMouseMove = (e: MouseEvent) => {
      if (!sliderRef.current) return;
      const x = e.pageX - startX;
      sliderRef.current.scrollLeft = -x;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  // Handle body scroll when modal opens/closes
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [selectedProject]);

  // Scroll the slider left or right
  const scrollSlider = useCallback(
    (direction: "left" | "right") => {
      if (!sliderRef.current) return;

      const slideWidth = sliderRef.current.clientWidth / visibleItems;
      const currentScroll = sliderRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? Math.max(0, currentScroll - slideWidth)
          : Math.min(maxScroll, currentScroll + slideWidth);

      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    },
    [maxScroll, visibleItems]
  );

  // Scroll to specific slide
  const scrollToSlide = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const slideWidth = sliderRef.current.clientWidth / visibleItems;
      const targetScroll = index * slideWidth;

      sliderRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    },
    [visibleItems]
  );

  // Project card component with enhanced animations
  const ProjectCard = useCallback(
    ({ project }: { project: Project }) => (
      <motion.div
        key={project.id}
        className="w-[280px] h-[360px] flex-shrink-0 mx-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer flex flex-col"
        variants={fadeIn}
        whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
        onClick={() => setSelectedProject(project.id)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${project.title}`}
      >
        <div className="relative h-[140px] w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <div className="flex gap-4">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-blue-900 hover:bg-blue-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`GitHub Repository for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={18} />
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-blue-900 hover:bg-blue-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Live Demo for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>
          {project.status && (
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  project.status === "completed"
                    ? "bg-green-500/90 text-white"
                    : project.status === "in-progress"
                    ? "bg-yellow-500/90 text-white"
                    : "bg-blue-500/90 text-white"
                }`}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm">
            {project.shortDescription ||
              project.description.substring(0, 120) + "..."}
          </p>
          <div className="flex flex-wrap gap-1 mt-auto">
            {project.technologies.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-full">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
          <div className="mt-3 flex justify-between items-center">
            {project.completionDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FiCalendar size={12} />
                {project.completionDate}
              </span>
            )}
            <motion.button
              className="text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md px-2 py-1"
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ x: 2 }}
              aria-label={`View details for ${project.title}`}
            >
              View details
              <FiArrowRight size={12} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    ),
    [fadeIn, setSelectedProject]
  );

  // Selected project details
  const selectedProjectDetails = useMemo(() => {
    if (selectedProject === null) return null;
    return projects.find((project) => project.id === selectedProject);
  }, [selectedProject]);

  // Handle click outside of modal to close it
  const handleModalBackdropClick = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-black via-blue-950/10 to-black relative overflow-hidden"
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              My Work
            </span>
            <motion.h2
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeIn}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={fadeIn}
            />
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Explore some of my recent work and personal projects
            </motion.p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div className="mb-8" variants={fadeIn}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  value={filterState.search}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      search: e.target.value,
                    }))
                  }
                  placeholder="Search projects..."
                  className="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  aria-label="Search projects"
                />
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <motion.button
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-expanded={showFilters}
                aria-controls="filter-panel"
              >
                <FiFilter />
                Filters
              </motion.button>
            </div>

            {/* Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  id="filter-panel"
                  className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </h3>
                      <div className="flex gap-2">
                        {["all", "completed", "in-progress", "planned"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() =>
                                setFilterState((prev) => ({ ...prev, status }))
                              }
                              className={`px-3 py-1 rounded-full text-sm ${
                                filterState.status === status
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {availableTechnologies.map((tech) => (
                          <button
                            key={tech}
                            onClick={() => {
                              setFilterState((prev) => ({
                                ...prev,
                                technologies: prev.technologies.includes(tech)
                                  ? prev.technologies.filter((t) => t !== tech)
                                  : [...prev.technologies, tech],
                              }));
                            }}
                            className={`px-3 py-1 rounded-full text-sm ${
                              filterState.technologies.includes(tech)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Horizontal Slider Container */}
          <div className="relative">
            {/* Navigation Arrows - Hide on mobile */}
            <motion.button
              onClick={() => scrollSlider("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:-left-4 hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll left"
            >
              <FiChevronLeft size={24} />
            </motion.button>

            <motion.button
              onClick={() => scrollSlider("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:-right-4 hidden sm:block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll right"
            >
              <FiChevronRight size={24} />
            </motion.button>

            {/* Slider */}
            <motion.div
              ref={sliderRef}
              className="flex overflow-x-auto py-6 scrollbar-hide scroll-smooth cursor-grab active:cursor-grabbing snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                gap: "16px",
                userSelect: "none",
              }}
              variants={containerVariants}
              onMouseDown={handleMouseDown}
            >
              {filteredProjects.length === 0 ? (
                <motion.div
                  className="w-full flex flex-col bg-white dark:bg-gray-800 p-12 rounded-xl shadow-lg items-center"
                  variants={fadeIn}
                >
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                    {projects.length === 0
                      ? "No projects available currently, check back soon!"
                      : "No projects found matching your criteria"}
                  </p>
                </motion.div>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} className="snap-center">
                    <ProjectCard project={project} />
                  </div>
                ))
              )}
            </motion.div>

            {/* Scroll indicator - Improved for mobile */}
            {filteredProjects.length > 0 && (
              <div className="mt-6 flex justify-center space-x-2 overflow-x-auto py-2 px-4 max-w-full">
                {Array.from({
                  length: Math.ceil(filteredProjects.length / visibleItems),
                }).map((_, index) => (
                  <motion.button
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlideIndex === index
                        ? "w-8 bg-blue-500"
                        : "w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => scrollToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Mobile Navigation Dots */}
            <div className="sm:hidden flex justify-center mt-4 space-x-2">
              {Array.from({
                length: Math.ceil(filteredProjects.length / visibleItems),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlideIndex === index
                      ? "bg-blue-500 scale-125"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject !== null && selectedProjectDetails && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalBackdropClick}
            role="dialog"
            aria-labelledby="project-modal-title"
            aria-modal="true"
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close details"
                >
                  <FiX size={20} />
                </motion.button>
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src={selectedProjectDetails.image}
                    alt={selectedProjectDetails.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                    <div className="p-6 md:p-8">
                      <h2
                        id="project-modal-title"
                        className="text-2xl md:text-3xl font-bold text-white mb-2"
                      >
                        {selectedProjectDetails.title}
                      </h2>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedProjectDetails.technologies.map(
                          (tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-blue-600/80 text-white rounded-full"
                            >
                              {tech}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FiLayout className="mr-2 text-blue-500" />
                    Project Overview
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-line leading-relaxed">
                    {selectedProjectDetails.description}
                  </p>

                  {/* Feature highlights */}
                  {selectedProjectDetails.features &&
                    selectedProjectDetails.features.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                          <FiLayers className="mr-2 text-blue-500" />
                          Key Features
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedProjectDetails.features.map(
                            (feature, idx) => (
                              <motion.li
                                key={idx}
                                className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <span className="text-blue-500 mr-2 mt-0.5">
                                  •
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Technologies */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FiCode className="mr-2 text-blue-500" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectDetails.technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Project Timeline */}
                  {selectedProjectDetails.completionDate && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <FiClock className="mr-2 text-blue-500" />
                        Project Timeline
                      </h3>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <FiCalendar className="text-blue-500" />
                        <span>
                          Completed: {selectedProjectDetails.completionDate}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-4 mt-8">
                    {selectedProjectDetails.github && (
                      <motion.a
                        href={selectedProjectDetails.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiGithub size={18} />
                        View Source
                      </motion.a>
                    )}
                    {selectedProjectDetails.demo && (
                      <motion.a
                        href={selectedProjectDetails.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FiExternalLink size={18} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add CSS for hiding scrollbar and snap scrolling */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .snap-x {
          scroll-snap-type: x mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
};

export default Projects;
