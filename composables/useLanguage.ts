export type LanguageCode = 'en' | 'fr' | 'nl';

export function useLanguage() {
  const language = useState<LanguageCode>('language', () => 'en');

  const isEnglish = computed({
    get() {
      return language.value === 'en';
    },
    set(value: boolean) {
      language.value = value ? 'en' : 'fr';
    },
  });

  const currentLanguage = computed(() => {
    return language.value;
  });

  return {
    language,
    isEnglish,
    currentLanguage,
  };
} 