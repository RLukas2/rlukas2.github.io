// Technology icon mapping
export const TECH_ICONS: Record<string, string> = {
  aws: "☁️",
  docker: "🐳",
  nest: "🪺",
  node: "🟢",
  graphql: "⬢",
  react: "⚛️",
  postgres: "🐘",
  redis: "🔴",
  angular: "🅰️",
  typescript: "TS",
  microservice: "μ️",
  kubernetes: "☸️",
  jira: "📋",
  git: "🔄",
};

export const getTechIcon = (tech: string): string => {
  const lowercaseTech = tech.toLowerCase();
  return Object.entries(TECH_ICONS).find(([key]) => 
    lowercaseTech.includes(key)
  )?.[1] || "🔧";
}; 