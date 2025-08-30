import { JSX } from "react";
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

interface SocialLink {
    href: string;
    icon: JSX.Element;
    label: string;
}

interface TechIcon {
    name: string;
    icon: JSX.Element;
    color: string;
}  

export const TECH_ICONS: TechIcon[] = [
    {
        name: "React",
        icon: <SiReact className="text-blue-600" />,
        color: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        name: "Node.js",
        icon: <SiNodedotjs className="text-green-600" />,
        color: "bg-green-100 dark:bg-green-900/30",
    },
    {
        name: "GraphQL",
        icon: <SiGraphql className="text-pink-600" />,
        color: "bg-pink-100 dark:bg-pink-900/30",
    },
    {
        name: "AWS",
        icon: <SiAmazonwebservices className="text-orange-500" />,
        color: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
        name: "Docker",
        icon: <SiDocker className="text-blue-500" />,
        color: "bg-blue-100 dark:bg-blue-900/30",
    },
];

export const SOCIAL_LINKS: SocialLink[] = [
    {
        href: "https://github.com/RLukas2",
        icon: <FiGithub size={20} />,
        label: "GitHub",
    },
    {
        href: "https://linkedin.com/in/xbrk",
        icon: <FiLinkedin size={20} />,
        label: "LinkedIn",
    },
    {
        href: "mailto:iforgotmyemailwhatcanido@gmail.com",
        icon: <FiMail size={20} />,
        label: "Email",
    },
  ];