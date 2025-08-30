// lib/skills-config.tsx
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCloud,
  FiGitBranch,
} from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiAngular,
  SiElectron,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiGraphql,
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiGithubactions,
  SiCircleci,
  SiGit,
  SiEthereum,
  SiJest,
  SiGoogle,
  SiRabbitmq,
} from "react-icons/si";
import { FaGolang } from "react-icons/fa6";

import { SkillCategory } from "@/types";

// Map icon names to actual icon components
export const SKILL_ICON_MAP: Record<string, React.ReactNode> = {
  SiJavascript: <SiJavascript className="text-3xl text-yellow-400" />,
  SiTypescript: <SiTypescript className="text-3xl text-blue-600" />,
  SiReact: <SiReact className="text-3xl text-blue-400" />,
  SiAngular: <SiAngular className="text-3xl text-red-600" />,
  SiElectron: <SiElectron className="text-3xl text-blue-500" />,
  SiNodedotjs: <SiNodedotjs className="text-3xl text-green-600" />,
  SiNestjs: <SiNestjs className="text-3xl text-red-500" />,
  SiExpress: <SiExpress className="text-3xl text-gray-600" />,
  SiGraphql: <SiGraphql className="text-3xl text-pink-600" />,
  SiPrisma: <SiPrisma className="text-3xl text-blue-800" />,
  SiPostgresql: <SiPostgresql className="text-3xl text-blue-700" />,
  SiMongodb: <SiMongodb className="text-3xl text-green-500" />,
  SiRedis: <SiRedis className="text-3xl text-red-600" />,
  SiDocker: <SiDocker className="text-3xl text-blue-600" />,
  SiKubernetes: <SiKubernetes className="text-3xl text-blue-500" />,
  SiAmazonaws: <SiAmazonwebservices className="text-3xl text-yellow-500" />,
  SiCircleci: <SiCircleci className="text-3xl text-black dark:text-white" />,
  SiGithubactions: (
    <SiGithubactions className="text-3xl text-gray-800 dark:text-gray-200" />
  ),
  SiGit: <SiGit className="text-3xl text-orange-600" />,
  SiEthereum: <SiEthereum className="text-3xl text-purple-600" />,
  SiJest: <SiJest className="text-3xl text-red-700" />,
  SiGoogle: <SiGoogle className="text-3xl text-blue-500" />,
  SiRabbitmq: <SiRabbitmq className="text-3xl text-orange-500" />,
  FaGolang: <FaGolang className="text-3xl text-blue-400" />,
};

// Categories for skills
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "all",
    name: "All",
    icon: <FiCode />,
    description:
      "This section highlights a broad range of my technical skills. Each one reflects tools and technologies I've worked with during projects and coursework.",
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: <FiCode />,
    description:
      "My frontend skills focus on building responsive, accessible interfaces using modern frameworks and libraries to ensure smooth user experiences.",
  },
  {
    id: "backend",
    name: "Backend",
    icon: <FiServer />,
    description:
      "I enjoy building scalable and maintainable backend systems, working with APIs, microservices, and key architectural patterns for efficiency.",
  },
  {
    id: "database",
    name: "Database",
    icon: <FiDatabase />,
    description:
      "Experienced in both SQL and NoSQL databases, I've worked on designing schemas, optimizing queries, and applying caching for better performance.",
  },
  {
    id: "devops",
    name: "DevOps",
    icon: <FiCloud />,
    description:
      "I'm familiar with DevOps practices such as setting up CI/CD pipelines, managing deployments, and working with cloud infrastructure for automation and scalability.",
  },
  {
    id: "other",
    name: "Other",
    icon: <FiGitBranch />,
    description:
      "Additional tools and technologies that support and enhance my overall development workflow and technical capabilities.",
  },
];
