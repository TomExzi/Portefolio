export function useI18n() {
  const { $t, $locale, $setLocale } = useNuxtApp();

  return {
    t: $t,
    locale: $locale,
    setLocale: $setLocale,
  };
}
