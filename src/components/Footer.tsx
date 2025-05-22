"use client";

import { FiArrowUp, FiHeart, FiCode } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const currentYear = new Date().getFullYear();

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="py-20 bg-white dark:bg-gray-900 text-white py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-2">
          <div className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            <span>
              &copy; {currentYear} Harsh Makwana. All rights reserved.
            </span>
          </div>
          <div className="text-gray-400 text-sm flex items-center">
            <span className="flex items-center">
              Built with <FiHeart className="mx-1 text-red-500" /> and{" "}
              <FiCode className="mx-1 text-blue-500" />
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to top button with animation */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg z-50 transition-colors"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
