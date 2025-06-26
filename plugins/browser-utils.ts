// Browser utilities plugin
export default defineNuxtPlugin(() => {
  return {
    provide: {
      browserUtils: {
        /**
         * Navigate to a new URL with a full page reload
         * This is useful for language switching to ensure
         * all components are remounted with the new locale
         */
        forceReload: (path: string) => {
          // Delay the reload slightly to ensure all client-side changes
          // are applied before the reload
          setTimeout(() => {
            window.location.href = path;
          }, 50);
        },

        /**
         * Get the browser's preferred languages
         */
        getPreferredLanguages: () => {
          if (typeof navigator === "undefined") return ["en"];

          const languages = navigator.languages || [
            navigator.language || (navigator as any).userLanguage || "en",
          ];

          return languages.map((lang) => lang.split("-")[0]);
        },
      },
    },
  };
});
