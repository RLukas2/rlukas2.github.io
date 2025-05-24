// src/types/index.ts

import { JSX } from "react";

export interface ProjectInfo {
  name: string;
  description: string;
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

export interface TabContentData {
  professional: JSX.Element;
  education: JSX.Element;
  personal: JSX.Element;
}

export interface CoreValue {
  icon: JSX.Element;
  title: string;
  description: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
}

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

export interface Skill {
  id: number;
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
  proficiency?: number;
  description?: string;
}

export interface NavLink {
  name: string;
  href: string;
}