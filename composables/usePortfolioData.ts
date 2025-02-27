import type { Project, WorkProcess, Experience } from "~/types";

export function usePortfolioData() {
  const projects = ref<Project[]>([
    {
      id: "1",
      title: "EcoTracker",
      description:
        "A sustainable living app helping users track and reduce their carbon footprint",
      technologies: ["Nuxt 3", "TypeScript", "Tailwind CSS", "Supabase"],
      links: {
        github: "https://github.com/johndoe/ecotracker",
        website: "https://ecotracker.demo",
      },
      type: "Personal",
      imageUrl: "/projects/ecotracker.webp",
    },
    {
      id: "2",
      title: "DevConnect",
      description:
        "Professional networking platform for developers with real-time chat",
      technologies: ["Vue 3", "Socket.io", "TailwindCSS", "Firebase"],
      links: {
        github: "https://github.com/johndoe/devconnect",
        website: "https://devconnect.demo",
      },
      type: "Open Source",
      imageUrl: "/projects/devconnect.webp",
    },
  ]);

  const processes = ref<WorkProcess[]>([
    {
      id: "1",
      title: "Discovery",
      description:
        "Understanding project requirements and user needs through detailed research and analysis",
      icon: "i-heroicons-magnifying-glass",
    },
    {
      id: "2",
      title: "Planning",
      description:
        "Creating comprehensive project roadmap and architecture design",
      icon: "i-heroicons-document-text",
    },
    {
      id: "3",
      title: "Development",
      description: "Building scalable solutions with clean, maintainable code",
      icon: "i-heroicons-code-bracket",
    },
  ]);

  const experiences = ref<Experience[]>([
    {
      company: "TechCorp Inc.",
      position: "Senior Frontend Developer",
      period: "2021 - Present",
      description: [
        "Led development of company's flagship SaaS product",
        "Improved application performance by 40%",
        "Mentored junior developers",
      ],
    },
    {
      company: "StartupX",
      position: "Frontend Developer",
      period: "2019 - 2021",
      description: [
        "Built responsive web applications using Vue.js",
        "Implemented CI/CD pipelines",
        "Reduced bundle size by 60%",
      ],
    },
  ]);

  return {
    projects,
    processes,
    experiences,
  };
}
