// This file is deprecated and should no longer be used
// We're using the built-in Nuxt i18n module instead
// All the translations are now defined in the locales/ directory

// This is provided only for backward compatibility
export type TranslationKey = string;

export function useTranslations() {
  console.warn("useTranslations is deprecated. Use useI18n() instead.");

  // Use the i18n composable directly
  const { t, locale } = useI18n();

  return {
    t,
    currentLanguage: computed(() => locale.value),
    translations: {},
  };
}
