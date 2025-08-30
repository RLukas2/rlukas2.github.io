// src/types/index.ts

import { JSX } from "react";

// Section: About
export interface TabContentData {
  professional: JSX.Element;
  education: JSX.Element;
  personal: JSX.Element;
}

export interface DetailedInfo {
  technologies: string[];
  keySkills: string[];
  projects: ProjectInfo[];
}

export interface Expertise {
  id: string;
  title: string;
  icon: JSX.Element; // Using JSX.Element for React icons
  iconBg: string;
  color: string;
  description: string;
  detailedInfo?: DetailedInfo | null;
}

export interface CoreValue {
  icon: JSX.Element;
  title: string;
  description: string;
}

// Section: Experience
export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

// Section: Projects
export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  features: string[];
  technologies: string[];
  github?: string;
  demo?: string;
  status?: "completed" | "in-progress" | "planned";
  completionDate?: string;
  estimatedTime?: string;
}

export interface ProjectInfo {
  name: string;
  description: string;
}

// Section: Skills
export interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}
export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
  proficiency?: number;
  description?: string;
}

export interface SkillWithIcon extends Skill {
  iconComponent: React.ReactNode;
  category: "frontend" | "backend" | "database" | "devops" | "other";
}

// Section: Navigation (Header/Footer)
export interface NavLink {
  name: string;
  href: string;
}