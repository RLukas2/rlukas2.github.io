"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiDatabase,
  FiServer,
  FiCloud,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiHeart,
  FiZap,
  FiRefreshCw,
} from "react-icons/fi";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("professional");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const expertiseData = [
    {
      id: "backend",
      title: "Backend Development",
      icon: <FiServer className="text-blue-600 dark:text-blue-400 text-xl" />,
      iconBg: "bg-blue-100 dark:bg-blue-900",
      color: "text-blue-600 dark:text-blue-400",
      description:
        "Expert in Node.js, NestJS, Express.js, GraphQL, and gRPC. Specialized in building scalable APIs, microservices architectures, and event-driven systems that handle high traffic efficiently.",
    },
    {
      id: "database",
      title: "Database & Caching",
      icon: (
        <FiDatabase className="text-green-600 dark:text-green-400 text-xl" />
      ),
      iconBg: "bg-green-100 dark:bg-green-900",
      color: "text-green-600 dark:text-green-400",
      description:
        "Deep expertise in PostgreSQL, MongoDB, and Redis. Skilled in designing optimized schemas, implementing advanced indexing strategies, and developing efficient caching layers that dramatically improve performance.",
    },
    {
      id: "devops",
      title: "DevOps & Cloud",
      icon: (
        <FiCloud className="text-purple-600 dark:text-purple-400 text-xl" />
      ),
      iconBg: "bg-purple-100 dark:bg-purple-900",
      color: "text-purple-600 dark:text-purple-400",
      description:
        "Proficient with Docker, Kubernetes, and CI/CD pipelines. Extensive experience with AWS services including EC2, ECS, S3, Lambda, CloudFront, and SES. Specialized in automating infrastructure and deployment workflows.",
    },
    {
      id: "architecture",
      title: "System Architecture",
      icon: <FiZap className="text-orange-600 dark:text-orange-400 text-xl" />,
      iconBg: "bg-orange-100 dark:bg-orange-900",
      color: "text-orange-600 dark:text-orange-400",
      description:
        "Experienced in designing fault-tolerant, scalable systems. Skilled in implementing advanced architectural patterns, optimizing performance, and creating maintainable codebases that grow with your business needs.",
    },
  ];

  const tabContent = {
    professional: (
      <>
        <p className="mb-4">
          I&apos;m a Senior Backend Engineer with 5+ years of experience
          crafting high-performance, scalable solutions. My expertise spans
          Node.js, NestJS, GraphQL, and cloud infrastructure, with a focus on
          event-driven architectures and microservices that can handle
          substantial traffic demands.
        </p>
        <p className="mb-4">
          I excel at optimizing system performance, implementing caching
          strategies, and designing efficient database schemas. My approach
          combines deep technical knowledge with business-focused
          problem-solving to deliver solutions that align with organizational
          goals.
        </p>
        <p>
          I continuously explore emerging technologies and methodologies,
          staying at the forefront of backend development best practices. This
          commitment ensures I deliver robust solutions that leverage the most
          appropriate technologies for each specific challenge.
        </p>
      </>
    ),
    education: (
      <>
        <p className="mb-4">
          I hold a B.Tech in Computer Engineering from LDRP Institute of
          Technology & Research, Gandhinagar, providing me with strong
          foundations in computer science principles, algorithms, and software
          architecture.
        </p>
        <p className="mb-4">
          During my academic career, I developed a full-stack educational portal
          using PHP and Angular that streamlined administrative processes and
          increased departmental efficiency by 30%. This project was formally
          recognized for its innovative approach to campus management
          challenges.
        </p>
        <p>
          My education continues through professional development, focused on
          cloud-native architectures, distributed systems, and performance
          optimization. I regularly participate in industry conferences and
          technical workshops to refine my expertise.
        </p>
      </>
    ),
    personal: (
      <>
        <p className="mb-4">
          Beyond my technical skills, I&apos;m driven by building technology
          that delivers real value. I thrive in collaborative environments where
          I can contribute to innovative solutions while mentoring junior
          developers on best practices.
        </p>
        <p className="mb-4">
          I believe in writing clean, maintainable code and approach each
          project with meticulous attention to detail. My problem-solving
          mindset and analytical approach help me tackle complex technical
          challenges effectively.
        </p>
        <p>
          When not coding, I actively contribute to open-source projects,
          explore cutting-edge technologies, and share knowledge through
          technical articles and community engagement. These activities help me
          maintain a balanced perspective on software development.
        </p>
      </>
    ),
  };

  const values = [
    {
      icon: <FiRefreshCw className="text-blue-500" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and methodologies",
    },
    {
      icon: <FiHeart className="text-red-500" />,
      title: "Quality Craftsmanship",
      description: "Committed to clean, maintainable, and efficient code",
    },
    {
      icon: <FiZap className="text-yellow-500" />,
      title: "Performance Optimization",
      description: "Obsessed with creating high-performance systems",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-3xl -z-10"></div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full mb-3">
              Get to Know Me
            </span>
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
              variants={fadeIn}
            >
              About Me
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-blue-500 mx-auto mb-6"
              variants={fadeIn}
            ></motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div className="flex justify-center mb-8" variants={fadeIn}>
            <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              {[
                {
                  id: "professional",
                  label: "Professional",
                  icon: <FiTrendingUp className="mr-2" />,
                },
                {
                  id: "education",
                  label: "Education",
                  icon: <FiBookOpen className="mr-2" />,
                },
                {
                  id: "personal",
                  label: "Personal",
                  icon: <FiAward className="mr-2" />,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mb-16 text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            variants={fadeIn}
          >
            {tabContent[activeTab as keyof typeof tabContent]}
          </motion.div>

          {/* Core Values Section */}
          <motion.div variants={fadeIn} className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Core Values
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300"
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    {value.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Expertise Areas */}
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white"
            variants={fadeIn}
          >
            Key Areas of Expertise
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {expertiseData.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 ${item.iconBg} rounded-full mr-4`}>
                    {item.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${item.color}`}>
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
