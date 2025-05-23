"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiHome,
  FiUser,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiMail,
} from "react-icons/fi";
import { NavLink } from "@/types";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Header scroll effect and active section detection
  useEffect(() => {
    const handleScroll = (): void => {
      // Update scrolled state for header styling
      setIsScrolled(window.scrollY > 20);

      // Determine active section for navigation highlighting
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100; // Offset for header height

      sections.forEach((section) => {
        const sectionId = section.getAttribute("id") || "";
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu toggle
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking on link
  const closeMenuOnClick = (): void => {
    if (isOpen) setIsOpen(false);
  };

  // Navigation links with icons
  const navLinks: (NavLink & { icon: JSX.Element })[] = [
    { name: "Home", href: "#home", icon: <FiHome className="text-primary" /> },
    {
      name: "About",
      href: "#about",
      icon: <FiUser className="text-primary" />,
    },
    {
      name: "Experience",
      href: "#experience",
      icon: <FiBriefcase className="text-primary" />,
    },
    {
      name: "Skills",
      href: "#skills",
      icon: <FiCode className="text-primary" />,
    },
    {
      name: "Projects",
      href: "#projects",
      icon: <FiFolder className="text-primary" />,
    },
    {
      name: "Contact",
      href: "#contact",
      icon: <FiMail className="text-primary" />,
    },
  ];

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: {
      x: -20,
      opacity: 0,
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="#home"
          className="group flex items-center space-x-3 font-bold text-primary transition-all duration-300 hover:text-primary-light"
          onClick={closeMenuOnClick}
        >
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary text-white font-extrabold text-xl"
            variants={logoVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            RL
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={closeMenuOnClick}
              className={`nav-link relative text-normal font-medium px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-1.5 ${
                activeSection === link.href.substring(1)
                  ? "text-primary-light bg-primary-900/20 font-bold"
                  : "text-gray-200 hover:text-primary hover:bg-gray-800"
              }`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.name}</span>
              {activeSection === link.href.substring(1) && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 mx-auto w-2/3 h-0.5 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu and Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Menu toggle button */}
          <motion.button
            onClick={toggleMenu}
            className="flex items-center justify-center w-9 h-9 rounded-md bg-primary text-white shadow-sm"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-800 shadow-xl overflow-hidden border-t border-gray-700"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <motion.div className="flex flex-col py-2">
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenuOnClick}
                    className={`py-3 px-6 flex items-center space-x-3 ${
                      activeSection === link.href.substring(1)
                        ? "bg-primary-900/20 text-primary-light font-medium"
                        : "hover:bg-gray-700 text-gray-200"
                    } transition-colors`}
                  >
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
