export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  path: string;
}

export const languages: LanguageConfig[] = [
  {
    code: "en",
    name: "English",
    flag: "emojione:flag-for-united-kingdom",
    path: "/",
  },
  {
    code: "fr",
    name: "Français",
    flag: "emojione:flag-for-france",
    path: "/fr",
  },
  {
    code: "nl",
    name: "Nederlands",
    flag: "emojione:flag-for-netherlands",
    path: "/nl",
  },
];

export const portfolioConfig = {
  languages,
  hero: {
    name: "Tom Rogiers",
    title: "Building the future and the present of the web",
    description:
      "Passionate Full Stack Developer focused on performance, SEO, and scalable architecture, crafting efficient and user-friendly web experiences.",
    ctaText: "Get in touch",
  },
  projects: [
    {
      id: "1",
      title: "AI-Powered Analytics Platform",
      description:
        "Enterprise-grade analytics platform leveraging machine learning for real-time business insights and predictive modeling.",
      technologies: ["Vue 3", "TypeScript", "Python", "TensorFlow", "AWS"],
      links: {
        github: "https://github.com/TomExzi/analytics-platform",
        website: "https://analytics-platform.demo",
      },
      type: "Client",
      imageUrl: "/projects/analytics.jpg",
    },
    {
      id: "2",
      title: "E-commerce Solution",
      description:
        "High-performance e-commerce platform with advanced inventory management and real-time order processing.",
      technologies: ["Nuxt 3", "Node.js", "MongoDB", "Redis", "Docker"],
      links: {
        github: "https://github.com/TomExzi/ecommerce",
        website: "https://ecommerce.demo",
      },
      type: "Open Source",
      imageUrl: "/projects/ecommerce.jpg",
    },
  ],
  process: [
    {
      id: "1",
      title: "Plan - Strategy & Architecture ",
      description:
        "We start by understanding your business needs and goals. I create a clear roadmap, selecting the right technologies to ensure scalability, performance, and maintainability.",
      icon: "i-heroicons-cube-transparent-20-solid",
    },
    {
      id: "2",
      title: "Build – Full-Stack Development",
      description:
        "From frontend UI to backend APIs, I develop fast, secure, and user-friendly applications tailored to your project's vision. Clean code, best practices, and seamless integrations are my priority",
      icon: "i-heroicons-code-bracket-20-solid",
    },
    {
      id: "3",
      title: "Scale – Optimization & Growth",
      description:
        "Once launched, I ensure your app runs at peak performance. Speed, SEO, and security enhancements help you reach more users while keeping your platform efficient and future-proof",
      icon: "i-heroicons-arrow-trending-up-20-solid",
    },
  ],
  about: {
    experiences: [
      {
        company: "Moody's",
        position: "Full Stack Software Engineer",
        period: "2022 - Present",
        description: [
          "Developed and maintained a web application for infrastructure automation, streamlining DevOps workflows.",
          "Designed and built the backend, ensuring seamless integration with infrastructure services.",
          "Transitioned from DevOps to Frontend Engineering, leveraging both backend and infrastructure knowledge for full-stack development.",
          "Optimized system performance and enhanced automation processes for better scalability.",
          "Worked with modern frontend frameworks to create dynamic and responsive applications.",
          "Collaborated with cross-functional teams to implement new features and improve existing systems.",
          "Developed and implemented recovery strategies, ensuring minimal downtime and data integrity.",
        ],
      },
    ],
    skills: [
      "Vue.js & Nuxt.js",
      "Pinia, Vite",
      "TailwindCSS, Headless UI",
      "Angular, Angular Material, RxJS, NgRx",
      "C# & .NET",
      "TypeScript & JavaScript",
      "Node.js & Express",
      "MongoDB & PostgreSQL",
      "AWS",
      "CI/CD & DevOps",
      "Performance Optimization",
      "SEO & Accessibility",
      "Retool",
      "n8n",
    ],
  },
  contact: {
    email: "Tom.rogiers@gmail.com",
    github: "https://github.com/TomExzi",
    linkedin: "https://www.linkedin.com/in/tom-rogiers-290655221/",
  },
  seo: {
    title: "Tom Rogiers - Full Stack Developer at ExziTech",
    description:
      "Full Stack Developer at ExziTech specializing in Vue.js, Nuxt, Node.js, and cloud architecture",
    ogImage: "/og-image.webp",
  },
  projectCategories: {
    DataRemediation: {
      title: "Data Remediation",
      description:
        "Advanced data cleansing and transformation solutions that ensure data quality and compliance across enterprise systems.",
      icon: "heroicons:document-chart-bar",
      technologies: ["Javascript", "Retool", "AWS", "MongoDB"],
    },
    InfrastructurePortal: {
      title: "Infrastructure Portal",
      description:
        "Centralized platform for managing cloud infrastructure, automating deployments, and monitoring system performance.",
      icon: "heroicons:server",
      technologies: ["Angular", "Node.js", "AWS", "C#", ".NET", "TypeScript"],
    },
    InformationProvider: {
      title: "Information Provider",
      description:
        "Real-time data aggregation and distribution systems that deliver critical business intelligence to stakeholders.",
      icon: "heroicons:chart-bar",
      technologies: ["Javascript", "Retool", "AWS", "MongoDB"],
    },
  },
};
