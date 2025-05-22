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
        "Experienced in building backend systems using Node.js, NestJS, Express.js, and GraphQL. Focused on developing scalable APIs, microservices, and event-driven applications that can efficiently handle increasing user demands.",
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
        "Familiar with MongoDB, and Redis through academic and personal projects. Skilled in designing optimized schemas, creating indexes, and implementing caching to improve data retrieval and application responsiveness.",
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
        "Knowledgeable in containerization with Docker and basic Kubernetes concepts. Hands-on experience with AWS services such as S3 and Lambda. Interested in automating deployments and managing cloud infrastructure efficiently.",
    },
    {
      id: "architecture",
      title: "System Architecture",
      icon: <FiZap className="text-orange-600 dark:text-orange-400 text-xl" />,
      iconBg: "bg-orange-100 dark:bg-orange-900",
      color: "text-orange-600 dark:text-orange-400",
      description:
        "Developed a strong foundation in designing scalable, maintainable, and fault-tolerant systems through coursework and projects. Comfortable applying architectural patterns and optimizing system performance to meet evolving requirements.",
    },
  ];


  const tabContent = {
    professional: (
      <>
        <p className="mb-4">
          I&apos;m a third-year Advance Program in Computer Science student at
          HCMUS with a strong interest in backend development and system design.
          Through various academic and personal projects, I&apos;ve built and
          deployed backend systems that simulate real-world architectures.
        </p>
        <p className="mb-4">
          My main interests lie in designing scalable microservices, building
          efficient GraphQL APIs, and working with cloud platforms like AWS.
          I&apos;ve developed backend systems that handle user authentication,
          file storage, and distributed communication using tools such as Go,
          Node.js, MongoDB, and TypeScript.
        </p>
        <p>
          I&apos;m actively learning best practices in performance optimization,
          database design, and event-driven architecture, and I enjoy
          experimenting with new technologies to deepen my backend expertise.
        </p>
      </>
    ),
    education: (
      <>
        <p className="mb-4">
          I&apos;m currently pursuing a Bachelor&apos;s degree in Computer
          Science at the University of Science, VNU-HCM, providing me with
          strong foundations in computer science principles, algorithms, and
          software architecture.
        </p>
        <p className="mb-4">
          Notable projects include <strong>Orantio</strong>, a mobile messaging
          app inspired by Discord that features real-time communication,
          server-channel hierarchy and permissions, and <strong>Skybox</strong>,
          a cloud-based web storage platform similar to Google Drive, built with
          Go, MongoDB, and AWS.
        </p>
        <p>
          These experiences have strengthened my skills in backend development,
          system design, and cloud services. My coursework has also helped me
          build a strong foundation in data structures, operating systems, and
          software architecture.
        </p>
      </>
    ),
    personal: (
      <>
        <p className="mb-4">
          I strive to write code that is both clean and maintainable, ensuring
          every project is handled with precision and care. My analytical
          thinking and problem-solving skills enable me to address intricate
          technical issues with efficiency.
        </p>
        <p>
          Outside of coding, I enjoy reading about system design, following
          developer communities, and watching tech talks on emerging backend
          tools. I&apos;m curious by nature and love breaking down how large
          systems are built and optimized.
        </p>
      </>
    ),
  };

  const values = [
    {
      icon: <FiRefreshCw className="text-blue-500" />,
      title: "Lifelong Learning",
      description:
        "Continuously exploring new tools, technologies, and best practices to grow as a developer.",
    },
    {
      icon: <FiHeart className="text-red-500" />,
      title: "Quality Craftsmanship",
      description:
        "Focused on writing clean, maintainable code that's easy to understand and extend.",
    },
    {
      icon: <FiZap className="text-yellow-500" />,
      title: "Performance Matters",
      description:
        "Dedicated to building responsive and efficient systems with attention to speed and scalability.",
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
            className="mb-16 text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm [text-align:justify]"
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
