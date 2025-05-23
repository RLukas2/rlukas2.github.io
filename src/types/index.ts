// src/types/index.ts

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
