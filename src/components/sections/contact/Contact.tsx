"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiFacebook,
  FiMapPin,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { IoIosSend } from "react-icons/io";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Animation variants moved outside component
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Social links moved outside component
const socialLinks = [
  {
    icon: <FiLinkedin size={20} />,
    href: "https://linkedin.com/in/xbrk",
    label: "LinkedIn",
  },
  {
    icon: <FiGithub size={20} />,
    href: "https://github.com/RLukas2",
    label: "GitHub",
  },
  {
    icon: <FiFacebook size={20} />,
    href: "https://fb.com/rickielukas",
    label: "Facebook",
  },
];

// Form validation rules
const formValidationRules = {
  name: {
    required: "Name is required",
    maxLength: {
      value: 50,
      message: "Name cannot exceed 50 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      message: "Please enter a valid email",
    },
  },
  subject: {
    required: "Subject is required",
    maxLength: {
      value: 100,
      message: "Subject cannot exceed 100 characters",
    },
  },
  message: {
    required: "Message is required",
    minLength: {
      value: 10,
      message: "Message should be at least 10 characters",
    },
    maxLength: {
      value: 1000,
      message: "Message cannot exceed 1000 characters",
    },
  },
};

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const lastSubmissionTime = useRef<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  // Memoize form validation rules
  const memoizedValidationRules = useMemo(() => formValidationRules, []);

  // Save form data to localStorage
  const saveFormData = useCallback((data: Partial<FormData>) => {
    localStorage.setItem('contactFormData', JSON.stringify(data));
  }, []);

  // Load form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as Partial<FormData>;
        Object.entries(parsedData).forEach(([key, value]) => {
          const input = document.getElementById(key) as HTMLInputElement;
          if (input) {
            input.value = value as string;
          }
        });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentFormRef = formRef.current;

    if (currentFormRef) {
      observer.observe(currentFormRef);
    }

    return () => {
      if (currentFormRef) {
        observer.unobserve(currentFormRef);
      }
    };
  }, []);

  const onSubmit = async (formData: FormData) => {
    // Rate limiting check (1 submission per 30 seconds)
    const now = Date.now();
    if (now - lastSubmissionTime.current < 30000) {
      setIsRateLimited(true);
      setErrorMessage("Please wait 30 seconds before submitting again");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setIsRateLimited(false);
    lastSubmissionTime.current = now;

    try {
      const response = await fetch("https://formspree.io/f/xgvkblwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        reset();
        localStorage.removeItem('contactFormData'); // Clear saved form data
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(null);
        }, 5000);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitSuccess(false);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-save form data on change
  const handleFormChange = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const data: Partial<FormData> = {};
    formData.forEach((value, key) => {
      data[key as keyof FormData] = value as string;
    });
    saveFormData(data);
  }, [saveFormData]);

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      aria-label="Contact Section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              Contact Me
            </span>
            <motion.h2
              className="text-5xl font-bold text-center mb-12 relative"
              variants={fadeIn}
            >
              Get In Touch
              <span className="block w-20 h-1 bg-blue-500 mx-auto mt-4"></span>
            </motion.h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact Info */}
            <motion.div className="md:w-1/3" variants={fadeIn}>
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6">
                {/* Email Address */}
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                    <FiMail size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Email
                    </h4>
                    <a
                      href="mailto:iforgotmyemailwhatcanido@gmail.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      iforgotmyemailwhatcanido@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone Number */}
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                    <FiPhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Phone
                    </h4>
                    <a
                      href="tel:+84769702975"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      +84 76 9702975
                    </a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mr-4">
                    <FiMapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Address
                    </h4>
                    <a
                      href="https://www.google.com/maps/place/Ho+Chi+Minh+City,+Vietnam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Ho Chi Minh City, Vietnam
                    </a>
                  </div>
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold my-6 text-gray-900 dark:text-white">
                Social Profiles
              </h3>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 transition-colors"
                    aria-label={link.label}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="md:w-2/3" variants={fadeIn}>
              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                onChange={handleFormChange}
                className="space-y-6"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-normal font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border ${
                          errors.name
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="John Doe"
                        {...register("name", memoizedValidationRules.name)}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <FiAlertCircle size={20} />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-normal font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border ${
                          errors.email
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                        placeholder="john@example.com"
                        {...register("email", memoizedValidationRules.email)}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                          <FiAlertCircle size={20} />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-normal font-medium text-gray-900 dark:text-white"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border ${
                        errors.subject
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Example Subject"
                      {...register("subject", memoizedValidationRules.subject)}
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                        <FiAlertCircle size={20} />
                      </div>
                    )}
                  </div>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-normal font-medium text-gray-900 dark:text-white"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border ${
                        errors.message
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                      placeholder="Your message here..."
                      style={{ minHeight: "100px", resize: "vertical" }}
                      {...register("message", memoizedValidationRules.message)}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    ></textarea>
                    {errors.message && (
                      <div className="absolute right-3 top-3 text-red-500">
                        <FiAlertCircle size={20} />
                      </div>
                    )}
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isRateLimited}
                    className={`w-full px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                      (isSubmitting || isRateLimited)
                        ? "opacity-70 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
                        <span>Sending...</span>
                      </div>
                    ) : isRateLimited ? (
                      <span>Please wait before submitting again</span>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <IoIosSend className="mx-1" size={25} />
                        Send Message
                      </div>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {submitSuccess === true && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3 flex items-center text-sm text-green-600 dark:text-green-400"
                      >
                        <FiCheck className="mr-2" />
                        Your message has been sent successfully!
                      </motion.div>
                    )}

                    {submitSuccess === false && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3 flex items-center text-sm text-red-500"
                      >
                        <FiAlertCircle className="mr-2" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
