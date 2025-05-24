// Technology category mapping
export const TECHNOLOGY_CATEGORIES = {
  frontend: ["React", "Angular", "Electron.js", "TypeScript", "HTML/CSS"],
  backend: ["Node.js", "NestJS", "GraphQL", "gRPC", "Prisma", "TypeORM", "RabbitMQ", "Microservices", "RESTful APIs"],
  database: ["PostgreSQL", "Redis"],
  devops: ["Docker", "Kubernetes", "AWS", "CircleCI", "CI/CD"],
  other: ["Git", "Jira", "Zoho"],
} as const;

export const groupTechnologies = (techs: string[]) => {
  const groups = {
    frontend: [] as string[],
    backend: [] as string[],
    database: [] as string[],
    devops: [] as string[],
    other: [] as string[],
  };

  techs.forEach((tech) => {
    const category = Object.entries(TECHNOLOGY_CATEGORIES).find(([_, technologies]) =>
      technologies.some(t => tech.toLowerCase().includes(t.toLowerCase()))
    )?.[0] || "other";
    groups[category as keyof typeof groups].push(tech);
  });

  return groups;
}; 