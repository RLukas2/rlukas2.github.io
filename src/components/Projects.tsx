"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
} from "react-icons/fi";
import { projects } from "@/data/projects";
import { useInView } from "react-intersection-observer";
import { Project } from "@/types";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const fadeIn = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    }),
    []
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  // Handle body scroll when modal opens/closes
  useState(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
      return () => {
        document.body.style.overflow = "auto"; // Re-enable scrolling
      };
    }
  });

  // Scroll the slider left or right
  const scrollSlider = useCallback((direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const scrollAmount = 400; // Amount to scroll each time
    const currentScroll = sliderRef.current.scrollLeft;

    sliderRef.current.scrollTo({
      left:
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount,
      behavior: "smooth",
    });
  }, []);

  // Project card component for better organization
  const ProjectCard = useCallback(
    ({ project }: { project: Project }) => (
      <motion.div
        key={project.id}
        className="w-[280px] h-[360px] flex-shrink-0 mx-2 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer flex flex-col"
        variants={fadeIn}
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        onClick={() => setSelectedProject(project.id)}
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
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-blue-900 hover:bg-blue-100 transition-colors transform hover:scale-110"
                  aria-label={`GitHub Repository for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiGithub size={18} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white text-blue-900 hover:bg-blue-100 transition-colors transform hover:scale-110"
                  aria-label={`Live Demo for ${project.title}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiExternalLink size={18} />
                </a>
              )}
            </div>
          </div>
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
          <div className="mt-3 flex justify-end">
            <button
              className="text-blue-600 dark:text-blue-400 text-xs font-medium flex items-center gap-1 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded-md px-2 py-1"
              onClick={() => setSelectedProject(project.id)}
              aria-label={`View details for ${project.title}`}
            >
              View details
              <FiArrowRight size={12} />
            </button>
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
      className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background Elements - Improved for better performance */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

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
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeIn}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={fadeIn}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-400 max-w-2xl mx-auto"
              variants={fadeIn}
            >
              Explore some of my recent work and personal projects
            </motion.p>
          </motion.div>

          {/* Horizontal Slider Container */}
          {projects.length === 0 ? (
            <div className="flex flex-col bg-gray-50 dark:bg-gray-900 p-12 rounded-xl shadow-lg items-center">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                No projects available at the moment
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation Arrows */}
              <button
                onClick={() => scrollSlider("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:-left-4"
                aria-label="Scroll left"
              >
                <FiChevronLeft size={24} />
              </button>

              <button
                onClick={() => scrollSlider("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 shadow-lg backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 md:-right-4"
                aria-label="Scroll right"
              >
                <FiChevronRight size={24} />
              </button>

              {/* Slider */}
              <motion.div
                ref={sliderRef}
                className="flex overflow-x-auto py-6 px-2 scrollbar-hide scroll-smooth"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  gap: "16px",
                }}
                variants={containerVariants}
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>

              {/* Scroll indicator - subtle hint that content is scrollable */}
              <div className="mt-6 flex justify-center space-x-2">
                {projects.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === 0
                        ? "w-6 bg-blue-500"
                        : "w-2 bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Details Modal - Improved accessibility and animations */}
      <AnimatePresence>
        {selectedProject !== null && selectedProjectDetails && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
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
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Close details"
                >
                  <FiX size={20} />
                </button>
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

                  {/* Feature highlights - new section */}
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
                              <li
                                key={idx}
                                className="flex items-start bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md"
                              >
                                <span className="text-blue-500 mr-2 mt-0.5">
                                  •
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                  {/* Technologies - new section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FiCode className="mr-2 text-blue-500" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProjectDetails.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    {selectedProjectDetails.github && (
                      <a
                        href={selectedProjectDetails.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                      >
                        <FiGithub size={18} />
                        View Source
                      </a>
                    )}
                    {selectedProjectDetails.demo && (
                      <a
                        href={selectedProjectDetails.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <FiExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add CSS for hiding scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Projects;
