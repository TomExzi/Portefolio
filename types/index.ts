export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  links: {
    github?: string;
    website?: string;
  };
  type: "Personal" | "Client" | "Open Source";
  imageUrl: string;
}

export interface WorkProcess {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}
