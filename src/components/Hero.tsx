"use client";

import Image from "next/image";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiDownload,
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";
import {
  SiGraphql,
  SiAmazonwebservices,
  SiNodedotjs,
  SiDocker,
  SiReact,
} from "react-icons/si";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
    },
  };

  const techIcons = [
    { name: "React", icon: <SiReact className="text-blue-600" /> },
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
    { name: "GraphQL", icon: <SiGraphql className="text-pink-600" /> },
    { name: "AWS", icon: <SiAmazonwebservices className="text-orange-500" /> },
    { name: "Docker", icon: <SiDocker className="text-blue-500" /> },
  ];

  const scrollToNext = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-20 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Improved background with better contrast for light mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800 -z-10"></div>

      {/* Enhanced decorative elements with animations */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div
        className="absolute bottom-40 right-10 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl -z-10"
        style={{ animationDelay: "1.5s" }}
      ></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10 animate-float"></div>

      {/* Subtle grid pattern overlay with better visibility in light mode */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.03] -z-10"></div>

      <div className="container mx-auto px-4 py-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
        >
          {/* Text Content - Enhanced with better contrast for light mode */}
          <motion.div className="lg:w-1/2 text-center lg:text-left z-10">
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-blue-600 text-white rounded-full shadow-sm"
            >
              Backend Engineer
            </motion.span>

            <motion.h3
              variants={itemVariants}
              className="text-xl mb-3 text-blue-600 dark:text-blue-400 font-medium tracking-wide"
            >
              Hello, I&apos;m
            </motion.h3>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight"
            >
              Ngô Hoàng Tuấn
            </motion.h1>

            <motion.h2
              variants={itemVariants}
              className="text-2xl text-gray-800 dark:text-gray-300 mb-6 font-semibold"
            >
              Aspiring Backend Developer
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I&apos;m a Year 3 Computer Science student at HCMUS with hands-on
              experience building backend systems through various academic and
              side projects. I specialize in designing scalable microservices,
              crafting efficient GraphQL APIs, and deploying cloud-based
              solutions using AWS.
            </motion.p>

            {/* Enhanced Technologies Pills with Icons - Improved contrast */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
            >
              {techIcons.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 flex items-center gap-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full shadow-sm hover:shadow transition-all hover:-translate-y-1 border border-gray-300 dark:border-gray-700"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </motion.div>

            {/* Enhanced CTA Buttons with better contrast */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Link
                href="#contact"
                className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiMail className="text-lg" />
                <span>Get in Touch</span>
                <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <FiDownload className="text-lg text-blue-600" />
                <span>Download CV</span>
              </a>
            </motion.div>

            {/* Enhanced Social Icons with better visibility */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/RLukas2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-700 transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/xbrk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-700 transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href="mailto:iforgotmyemailwhatcanido@gmail.com"
                className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-700 transition-all hover:scale-110 hover:-translate-y-1"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Enhanced Profile Image with better contrasting elements */}
          <motion.div
            variants={imageVariants}
            className="lg:w-1/2 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Enhanced glow effects */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-3xl animate-pulse-slow"></div>
              <div
                className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 opacity-20 blur-2xl animate-pulse-slow"
                style={{ animationDelay: "1s" }}
              ></div>

              {/* Improved profile image with border */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl select-none pointer-events-none">
                <Image
                  src="/images/profile.jpg"
                  alt="Ngo Hoang Tuan - Backend Engineer"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 18rem, 24rem"
                />
              </div>

              {/* Decorative elements around the profile with better visibility */}
              {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-105">
                <span className="text-sm font-bold">
                  5+ YRS
                  <br />
                  EXP
                </span>
              </div> */}

              {/* Tech orbs floating around the profile with better borders */}
              <div
                className="absolute -top-2 -left-2 w-16 h-16 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg animate-float"
                style={{ animationDelay: "0s" }}
              >
                <SiReact className="text-3xl text-blue-600" />
              </div>

              <div
                className="absolute top-1/4 -right-4 w-14 h-14 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg animate-float"
                style={{ animationDelay: "0.8s" }}
              >
                <SiAmazonwebservices className="text-2xl text-yellow-600" />
              </div>

              <div
                className="absolute bottom-1/10 -left-6 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg animate-float"
                style={{ animationDelay: "1.6s" }}
              >
                <SiGraphql className="text-xl text-pink-600" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator with better contrast */}
        <motion.div
          className="absolute bottom-2 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          onClick={scrollToNext}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <span className="text-sm text-gray-700 dark:text-gray-400 mb-2 font-medium">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FiChevronDown className="text-blue-600 dark:text-blue-400 text-2xl" />
          </motion.div>
        </motion.div>
      </div>

      {/* Add custom styles for grid pattern with improved visibility */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .dark .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
