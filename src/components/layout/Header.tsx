"use client";

import { useState, useEffect, JSX, useCallback, useMemo } from "react";
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
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useTheme } from "next-themes";

import { NavLink } from "@/types";
import { HEADER_ANIMATION_VARIANTS } from "@/lib/animations";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Menu toggle
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking on link
  const closeMenuOnClick = (): void => {
    if (isOpen) setIsOpen(false);
  };

  // Close menu when clicking outside
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-toggle")
      ) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Navigation links with icons
  const navLinks = useMemo<(NavLink & { icon: JSX.Element })[]>(
    () => [
      {
        name: "Home",
        href: "/#home",
        icon: <FiHome className="text-primary" />,
      },
      {
        name: "About",
        href: "/#about",
        icon: <FiUser className="text-primary" />,
      },
      {
        name: "Experience",
        href: "/#experience",
        icon: <FiBriefcase className="text-primary" />,
      },
      {
        name: "Skills",
        href: "/#skills",
        icon: <FiCode className="text-primary" />,
      },
      {
        name: "Projects",
        href: "/#projects",
        icon: <FiFolder className="text-primary" />,
      },
      {
        name: "Contact",
        href: "/#contact",
        icon: <FiMail className="text-primary" />,
      },
    ],
    []
  );

  // Progress bar for scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScrollProgress);
    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    // Wait for menu animation to complete before scrolling
    setTimeout(() => {
      if (href.startsWith("/#")) {
        const id = href.substring(2);
        const element = document.getElementById(id);
        if (element) {
          // Add offset for header height
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    }, 100); // Match this with your menu close animation duration
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        activeSection !== "home"
          ? "bg-gray-900/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center space-x-3 font-bold text-primary transition-all duration-300 hover:text-primary-light"
          onClick={closeMenuOnClick}
          aria-label="Go to home section"
        >
          <motion.div
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-primary text-white font-extrabold text-xl"
            variants={HEADER_ANIMATION_VARIANTS.logoVariants}
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
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`nav-link relative text-normal font-medium px-3 py-2 rounded-md transition-all duration-200 flex items-center gap-1.5 ${
                activeSection === link.href.substring(2)
                  ? "text-primary-light bg-primary-900/20 font-bold"
                  : "text-gray-200 hover:text-primary hover:bg-gray-800"
              }`}
              aria-current={
                activeSection === link.href.substring(2) ? "page" : undefined
              }
              title={`Go to ${link.name} section`}
            >
              <span className="text-base">{link.icon}</span>
              <span>{link.name}</span>
              {activeSection === link.href.substring(2) && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 mx-auto w-2/3 h-0.5 bg-white rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          {/* Theme toggle button */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          )}
        </div>

        {/* Mobile Menu and Controls */}
        <div className="flex items-center space-x-3 md:hidden">
          {/* Theme toggle for mobile */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          )}

          {/* Menu toggle button */}
          <motion.button
            onClick={toggleMenu}
            className="menu-toggle flex items-center justify-center w-9 h-9 rounded-md bg-primary text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="mobile-menu"
              className="mobile-menu md:hidden mt-4 bg-gray-800 shadow-xl overflow-hidden border-t border-gray-700 z-50 relative"
              initial="closed"
              animate="open"
              exit="closed"
              variants={HEADER_ANIMATION_VARIANTS.mobileMenuVariants}
            >
              <motion.div className="flex flex-col py-2">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={HEADER_ANIMATION_VARIANTS.menuItemVariants}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`py-3 px-6 flex items-center space-x-3 ${
                        activeSection === link.href.substring(2)
                          ? "bg-primary-900/20 text-primary-light font-medium"
                          : "hover:bg-gray-700 text-gray-200"
                      } transition-colors`}
                      aria-current={
                        activeSection === link.href.substring(2)
                          ? "page"
                          : undefined
                      }
                    >
                      <span className="text-lg">{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
