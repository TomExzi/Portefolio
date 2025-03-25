// Runtime plugin for i18n module
export default defineNuxtPlugin((nuxtApp) => {
  // Don't use useI18n here directly - it must be called inside setup functions

  return {
    provide: {
      i18nExtension: {
        // These methods will be called from within components where useI18n is available
        getCurrentLocale: () => {
          // Access i18n through nuxtApp
          // Using any type since we don't have the exact i18n types
          const i18n = nuxtApp.$i18n as any;
          if (
            i18n &&
            typeof i18n.locale === "object" &&
            "value" in i18n.locale
          ) {
            return i18n.locale.value;
          }
          return undefined;
        },
        translate: (key: string, params?: Record<string, any>) => {
          const i18n = nuxtApp.$i18n as any;
          if (i18n && typeof i18n.t === "function") {
            return i18n.t(key, params);
          }
          return key; // Fallback to just returning the key
        },
      },
    },
  };
});
