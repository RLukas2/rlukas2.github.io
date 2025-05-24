"use client";

import {
  FiArrowUp,
  FiHeart,
  FiCode,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiSend,
} from "react-icons/fi";
import { useEffect, useState, FormEvent, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const currentYear = new Date().getFullYear();

  // Detect scroll position
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 500);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Handle newsletter subscription
  const handleSubscribe = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubscriptionStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubscriptionStatus("idle"), 3000);
    }
  }, []);

  // Social media links
  const socialLinks = [
    {
      name: "GitHub",
      icon: <FiGithub size={20} />,
      url: "https://github.com/RLukas2",
    },
    {
      name: "LinkedIn",
      icon: <FiLinkedin size={20} />,
      url: "https://linkedin.com/in/xbrk",
    },
    {
      name: "Twitter",
      icon: <FiTwitter size={20} />,
      url: "https://twitter.com/rickielukas",
    },
    {
      name: "Email",
      icon: <FiMail size={20} />,
      url: "mailto:iforgotmyemail@gmail.com",
    },
  ];

  // Quick links
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="py-20 bg-white dark:bg-gray-900 text-white py-12 relative">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">About Me</h3>
            <p className="text-gray-400 text-sm">
              A passionate developer focused on creating beautiful and
              functional web experiences. Always learning and exploring new
              technologies.
            </p>
            {/* Social media links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visit my ${link.name} profile`}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription - now spans two columns */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to my newsletter for the latest updates and insights.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-500"
                  required
                  aria-label="Email address for newsletter"
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Subscribe to newsletter"
                >
                  <FiSend size={18} />
                </motion.button>
              </div>
              <AnimatePresence>
                {subscriptionStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-green-500 text-sm"
                  >
                    Thanks for subscribing!
                  </motion.p>
                )}
                {subscriptionStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-500 text-sm"
                  >
                    Something went wrong. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
            <span>
              &copy; {currentYear} Tuan-Ngo Hoang. All rights reserved.
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

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg z-50 transition-colors group"
            aria-label="Scroll to top"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiArrowUp size={24} />
            <span className="absolute right-full mr-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Scroll to top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
