import en from "~/locales/en.json";
import fr from "~/locales/fr.json";
import nl from "~/locales/nl.json";

export default defineNuxtPlugin((nuxtApp) => {
  const translations = {
    en,
    fr,
    nl,
  };

  // Create a global reactive locale state
  const currentLocale = useState("locale", () => "en");

  // Reactive translation function
  const $t = (key: string, fallback?: string): string => {
    try {
      const locale = unref(currentLocale);
      // Use unref to get the current value and make it reactive
      let value: any = translations[locale as keyof typeof translations];

      // Handle both dot notation and array notation (e.g., "ai.services[0].title")
      const path = key.replace(/\[(\d+)\]/g, ".$1").split(".");

      for (const k of path) {
        if (
          value &&
          (typeof value === "object" || Array.isArray(value)) &&
          k in value
        ) {
          value = value[k];
        } else {
          return fallback || key;
        }
      }

      return typeof value === "string" ? value : fallback || key;
    } catch (error) {
      return fallback || key;
    }
  };

  const $setLocale = (newLocale: string) => {
    if (newLocale in translations) {
      currentLocale.value = newLocale;
    }
  };

  // Make functions available globally in Vue templates
  nuxtApp.vueApp.config.globalProperties.$t = $t;
  nuxtApp.vueApp.config.globalProperties.$locale = currentLocale;
  nuxtApp.vueApp.config.globalProperties.$setLocale = $setLocale;

  // Provide functions for composables
  return {
    provide: {
      t: $t,
      locale: currentLocale,
      setLocale: $setLocale,
    },
  };
});
