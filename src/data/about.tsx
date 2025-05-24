// src/data/about.tsx

import { Expertise, TabContentData, CoreValue } from "@/types";
import {
  FiServer,
  FiDatabase,
  FiCloud,
  FiZap,
  FiRefreshCw,
  FiHeart,
} from "react-icons/fi";

// [Key Areas of Expertise] for the About section
export const ExpertiseData: Expertise[] = [
  {
    id: "backend",
    title: "Backend Development",
    icon: <FiServer className="text-blue-600 dark:text-blue-400 text-xl" />,
    iconBg: "bg-blue-100 dark:bg-blue-900",
    color: "text-blue-600 dark:text-blue-400",
    description:
      "Experienced in building backend systems using Node.js, NestJS, Express.js, and GraphQL. Focused on developing scalable APIs, microservices, and event-driven applications that can efficiently handle increasing user demands.",
    detailedInfo: {
      technologies: ["Node.js", "NestJS", "Express.js", "GraphQL", "TypeScript"],
      keySkills: [
        "RESTful API Design",
        "Microservices Architecture",
        "Event-Driven Programming",
        "Authentication & Authorization",
        "API Documentation"
      ],
      projects: [
        {
          name: "Orantio",
          description: "A real-time messaging platform with server-channel hierarchy"
        },
        {
          name: "Skybox",
          description: "Cloud storage platform with file management and sharing capabilities"
        }
      ]
    }
  },
  {
    id: "database",
    title: "Database & Caching",
    icon: <FiDatabase className="text-green-600 dark:text-green-400 text-xl" />,
    iconBg: "bg-green-100 dark:bg-green-900",
    color: "text-green-600 dark:text-green-400",
    description:
      "Familiar with MongoDB, and Redis through academic and personal projects. Skilled in designing optimized schemas, creating indexes, and implementing caching to improve data retrieval and application responsiveness.",
    detailedInfo: {
      technologies: ["MongoDB", "Redis", "Mongoose", "Indexing", "Caching"],
      keySkills: [
        "Database Schema Design",
        "Query Optimization",
        "Data Modeling",
        "Caching Strategies",
        "Data Migration"
      ],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Implemented Redis caching for product catalog and user sessions"
        },
        {
          name: "Social Media API",
          description: "Designed MongoDB schemas for user profiles and content management"
        }
      ]
    }
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    icon: <FiCloud className="text-purple-600 dark:text-purple-400 text-xl" />,
    iconBg: "bg-purple-100 dark:bg-purple-900",
    color: "text-purple-600 dark:text-purple-400",
    description:
      "Knowledgeable in containerization with Docker and basic Kubernetes concepts. Hands-on experience with AWS services such as S3 and Lambda. Interested in automating deployments and managing cloud infrastructure efficiently.",
    detailedInfo: null, // No detailed info provided for DevOps & Cloud
    // detailedInfo: {
    //   technologies: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    //   keySkills: [
    //     "Container Orchestration",
    //     "Cloud Infrastructure",
    //     "Automated Deployments",
    //     "Monitoring & Logging",
    //     "Infrastructure as Code"
    //   ],
    //   projects: [
    //     {
    //       name: "Microservices Deployment",
    //       description: "Containerized and deployed microservices using Docker and Kubernetes"
    //     },
    //     {
    //       name: "Cloud Migration",
    //       description: "Migrated legacy applications to AWS cloud infrastructure"
    //     }
    //   ]
    // }
  },
  {
    id: "architecture",
    title: "System Architecture",
    icon: <FiZap className="text-orange-600 dark:text-orange-400 text-xl" />,
    iconBg: "bg-orange-100 dark:bg-orange-900",
    color: "text-orange-600 dark:text-orange-400",
    description:
      "Developed a strong foundation in designing scalable, maintainable, and fault-tolerant systems through coursework and projects. Comfortable applying architectural patterns and optimizing system performance to meet evolving requirements.",
    detailedInfo: null, 
    // detailedInfo: {
    //   technologies: ["System Design", "Design Patterns", "SOLID Principles", "Clean Architecture"],
    //   keySkills: [
    //     "System Design",
    //     "Performance Optimization",
    //     "Scalability Planning",
    //     "Fault Tolerance",
    //     "Technical Documentation"
    //   ],
    //   projects: [
    //     {
    //       name: "Distributed System",
    //       description: "Designed and implemented a fault-tolerant distributed system"
    //     },
    //     {
    //       name: "API Gateway",
    //       description: "Architected a scalable API gateway with load balancing"
    //     }
    //   ]
    // }
  },
];

// About Me section content
export const TabContent: TabContentData = {
  professional: (
    <>
      <p className="mb-4">
        I&apos;m a third-year Advanced Program in Computer Science student at
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
        I&apos;m currently pursuing a Bachelor&apos;s degree in Computer Science
        at the University of Science, VNU-HCM, providing me with strong
        foundations in computer science principles, algorithms, and software
        architecture.
      </p>
      <p className="mb-4">
        Notable projects include <strong>Orantio</strong>, a mobile messaging
        app inspired by Discord that features real-time communication,
        server-channel hierarchy and permissions, and <strong>Skybox</strong>, a
        cloud-based web storage platform similar to Google Drive, built with Go,
        MongoDB, and AWS.
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
        every project is handled with precision and care. My analytical thinking
        and problem-solving skills enable me to address intricate technical
        issues with efficiency.
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

// [Core Values] for the About section
export const CoreValues: CoreValue[] = [
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
