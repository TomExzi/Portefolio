import type { LanguageCode } from './useLanguage';

export type TranslationKey = 
  // Navigation
  | 'projects' 
  | 'process' 
  | 'about' 
  | 'contact' 
  | 'switchToFrench' 
  | 'switchToEnglish'
  | 'switchToDutch'
  
  // Hero Section
  | 'hiIm'
  | 'getInTouch'
  
  // Section titles
  | 'aboutMe'
  | 'howIWork'
  | 'getInTouchTitle'
  
  // About section
  | 'experience'
  | 'skillsTechnologies'
  | 'specializeIn'
  
  // Contact section
  | 'contactIntro'
  | 'connectWithMe';

type TranslationsType = {
  [key in LanguageCode]: {
    [key in TranslationKey]: string;
  }
};

export function useTranslations() {
  const { currentLanguage } = useLanguage();
  
  const translations: TranslationsType = {
    en: {
      // Navigation
      projects: 'Projects',
      process: 'Process',
      about: 'About',
      contact: 'Contact',
      
      // Language toggle
      switchToFrench: 'Switch to French',
      switchToEnglish: 'Switch to English',
      switchToDutch: 'Switch to Dutch',
      
      // Hero Section
      hiIm: 'Hi, I\'m',
      getInTouch: 'Get in touch',
      
      // Section titles
      aboutMe: 'About Me',
      howIWork: 'How I Work',
      getInTouchTitle: 'Get in Touch',
      
      // About section
      experience: 'Experience',
      skillsTechnologies: 'Skills & Technologies',
      specializeIn: 'I specialize in full stack development with a focus on scalable architectures. My expertise includes:',
      
      // Contact section
      contactIntro: 'I\'m always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!',
      connectWithMe: 'Connect With Me'
    },
    fr: {
      // Navigation
      projects: 'Projets',
      process: 'Processus',
      about: 'À propos',
      contact: 'Contact',
      
      // Language toggle
      switchToFrench: 'Passer au français',
      switchToEnglish: 'Passer à l\'anglais',
      switchToDutch: 'Passer au néerlandais',
      
      // Hero Section
      hiIm: 'Bonjour, je suis',
      getInTouch: 'Me contacter',
      
      // Section titles
      aboutMe: 'À Propos de Moi',
      howIWork: 'Ma Méthode de Travail',
      getInTouchTitle: 'Me Contacter',
      
      // About section
      experience: 'Expérience',
      skillsTechnologies: 'Compétences & Technologies',
      specializeIn: 'Je me spécialise dans le développement full stack avec un accent sur les architectures évolutives. Mon expertise comprend:',
      
      // Contact section
      contactIntro: 'Je suis toujours intéressé par de nouveaux projets et opportunités. Que vous ayez une question ou que vous vouliez simplement dire bonjour, n\'hésitez pas à me contacter!',
      connectWithMe: 'Me Retrouver Sur'
    },
    nl: {
      // Navigation
      projects: 'Projecten',
      process: 'Proces',
      about: 'Over',
      contact: 'Contact',
      
      // Language toggle
      switchToFrench: 'Schakel naar Frans',
      switchToEnglish: 'Schakel naar Engels',
      switchToDutch: 'Schakel naar Nederlands',
      
      // Hero Section
      hiIm: 'Hallo, ik ben',
      getInTouch: 'Neem contact op',
      
      // Section titles
      aboutMe: 'Over Mij',
      howIWork: 'Hoe Ik Werk',
      getInTouchTitle: 'Neem Contact Op',
      
      // About section
      experience: 'Ervaring',
      skillsTechnologies: 'Vaardigheden & Technologieën',
      specializeIn: 'Ik ben gespecialiseerd in full stack ontwikkeling met focus op schaalbare architecturen. Mijn expertise omvat:',
      
      // Contact section
      contactIntro: 'Ik ben altijd geïnteresseerd in nieuwe projecten en kansen. Of je nu een vraag hebt of gewoon gedag wilt zeggen, aarzel niet om contact op te nemen!',
      connectWithMe: 'Verbind Met Mij'
    }
  };
  
  const t = (key: TranslationKey): string => {
    const lang = currentLanguage.value;
    return translations[lang][key] || translations['en'][key] || key;
  };
  
  return {
    t,
    translations
  };
} 