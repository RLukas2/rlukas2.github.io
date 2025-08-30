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
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { useRef, useState, JSX, useCallback, useMemo } from "react";

import PDFViewer from "./PDFViewer";
import { HERO_ANIMATION_VARIANTS } from "@/lib/animations";
import { SOCIAL_LINKS, TECH_ICONS } from "@/lib/hero-config";

const { container, item, image } = HERO_ANIMATION_VARIANTS;

// Extract floating orb component with better typing
interface FloatingOrbProps {
  className: string;
  icon: JSX.Element;
  animateProps: {
    animate: any;
    transition: any;
  };
}

const FloatingTechOrb: React.FC<FloatingOrbProps> = ({
  className,
  icon,
  animateProps,
}) => (
  <motion.div
    className={`absolute bg-white dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center shadow-lg ${className}`}
    {...animateProps}
  >
    {icon}
  </motion.div>
);

// Extract technology pills component
const TechnologyPills: React.FC = () => (
  <motion.div
    variants={item}
    className="flex flex-wrap gap-3 mb-8 justify-center lg:justify-start"
    role="list"
    aria-label="Technologies I work with"
  >
    {TECH_ICONS.map((tech, index) => (
      <motion.span
        key={index}
        className={`px-3 py-1.5 flex items-center gap-2 text-sm ${tech.color} text-gray-800 dark:text-gray-200 rounded-full shadow-sm hover:shadow transition-all hover:-translate-y-1 border border-gray-300 dark:border-gray-700`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        role="listitem"
      >
        {tech.icon}
        {tech.name}
      </motion.span>
    ))}
  </motion.div>
);

// Extract CTA buttons component
const CTAButtons: React.FC<{ onOpenPDF: () => void }> = ({ onOpenPDF }) => (
  <motion.div
    variants={item}
    className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
  >
    <Link
      href="#contact"
      className="group px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      aria-label="Get in touch"
    >
      <FiMail className="text-lg" />
      <span>Get in Touch</span>
      <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
    </Link>
    <button
      onClick={onOpenPDF}
      className="group px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
      aria-label="View CV"
    >
      <FiDownload className="text-lg text-blue-600 group-hover:scale-110 transition-transform" />
      <span>View CV</span>
    </button>
  </motion.div>
);

// Extract social icons component
const SocialIcons: React.FC = () => (
  <motion.div
    variants={item}
    className="flex gap-4 justify-center lg:justify-start"
    role="list"
    aria-label="Social media links"
  >
    {SOCIAL_LINKS.map((social, index) => (
      <motion.a
        key={index}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-md hover:shadow-lg border border-gray-300 dark:border-gray-700 transition-all hover:scale-110 hover:-translate-y-1"
        aria-label={social.label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        role="listitem"
      >
        {social.icon}
      </motion.a>
    ))}
  </motion.div>
);

// Extract profile image component
const ProfileImage: React.FC = () => {
  // Memoize floating orbs data to prevent recreation
  const floatingOrbs = useMemo(
    () => [
      {
        className: "-top-2 -left-2 w-16 h-16",
        icon: <SiReact className="text-3xl text-blue-600" />,
        animateProps: {
          animate: { y: [0, -10, 0], rotate: [0, 5, 0] },
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        },
      },
      {
        className: "top-1/4 -right-4 w-14 h-14",
        icon: <SiAmazonwebservices className="text-2xl text-yellow-600" />,
        animateProps: {
          animate: { y: [0, -15, 0], rotate: [0, -5, 0] },
          transition: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          },
        },
      },
      {
        className: "bottom-1/10 -left-6 w-12 h-12",
        icon: <SiGraphql className="text-xl text-pink-600" />,
        animateProps: {
          animate: { y: [0, -12, 0], rotate: [0, 5, 0] },
          transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.6,
          },
        },
      },
    ],
    []
  );

  return (
    <motion.div
      variants={image}
      className="lg:w-1/2 flex justify-center"
    >
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        {/* Glow effects */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 opacity-20 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Profile image */}
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl select-none pointer-events-none">
          <Image
            src="/images/profile.jpg"
            alt="Ngo Hoang Tuan - Backend Engineer"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 18rem, 24rem"
            quality={90}
          />
        </div>

        {/* Floating Orbs */}
        {floatingOrbs.map((orb, index) => (
          <FloatingTechOrb
            key={index}
            className={orb.className}
            icon={orb.icon}
            animateProps={orb.animateProps}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Extract scroll indicator component
const ScrollIndicator: React.FC<{ onScroll: () => void }> = ({ onScroll }) => (
  <motion.button
    className="absolute bottom-2 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
    onClick={onScroll}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2, duration: 0.5 }}
    aria-label="Scroll to next section"
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
  </motion.button>
);

const Hero: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Memoize scroll handler
  const scrollToNext = useCallback(() => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);

  // Memoize PDF viewer handlers
  const openPDFViewer = useCallback(() => setIsPDFViewerOpen(true), []);
  const closePDFViewer = useCallback(() => setIsPDFViewerOpen(false), []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="min-h-screen py-20 flex flex-col justify-center relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-white dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800 -z-10"
        style={{ y, opacity }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.03] -z-10" />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16"
        >
          {/* Text Content */}
          <motion.div className="lg:w-1/2 text-center lg:text-left z-10">
            <motion.span
              variants={item}
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-blue-600 text-white rounded-full shadow-sm"
              role="text"
              aria-label="Role: Backend Engineer"
            >
              Backend Engineer
            </motion.span>

            <motion.h3
              variants={item}
              className="text-xl mb-3 text-blue-600 dark:text-blue-400 font-medium tracking-wide"
            >
              Hello, I&apos;m
            </motion.h3>

            <motion.h1
              variants={item}
              className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight"
            >
              Ngô Hoàng Tuấn
            </motion.h1>

            <motion.h2
              variants={item}
              className="text-2xl text-gray-800 dark:text-gray-300 mb-6 font-semibold"
            >
              Aspiring Backend Developer
            </motion.h2>

            <motion.p
              variants={item}
              className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              I&apos;m a third-year Computer Science student at HCMUS with
              practical experience in building backend systems through academic
              and personal projects. I have a strong interest in designing
              scalable microservices, developing efficient backend, and
              deploying cloud-based solutions using AWS.
            </motion.p>

            {/* Technologies Pills with Icons */}
            <TechnologyPills />

            {/* CTA Buttons */}
            <CTAButtons onOpenPDF={openPDFViewer} />

            {/* Social Icons */}
            <SocialIcons />
          </motion.div>

          {/* Profile Image */}
          <ProfileImage />
        </motion.div>

        {/* Scroll indicator */}
        <ScrollIndicator onScroll={scrollToNext} />
      </div>

      <PDFViewer
        isOpen={isPDFViewerOpen}
        onClose={closePDFViewer}
        pdfUrl="/resume.pdf"
      />

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
      `}</style>
    </section>
  );
};

export default Hero;
