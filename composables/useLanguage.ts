export type LanguageCode = "en" | "fr" | "nl";

export function useLanguage() {
  const { locale } = useI18n();

  const currentLanguage = computed(() => {
    return locale.value;
  });

  // Add language ref for direct modification
  const language = ref(locale.value);

  // Watch language changes and update i18n locale
  watch(language, (newLang) => {
    locale.value = newLang;
  });

  return {
    currentLanguage,
    language,
  };
}
