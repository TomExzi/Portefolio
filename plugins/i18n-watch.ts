// Nuxt plugin for watching i18n locale changes
export default defineNuxtPlugin(() => {
  try {
    // The plugin itself doesn't need to watch for locale changes
    // It can provide functionality for the rest of the app
    console.log("i18n watch plugin initialized");

    return {
      provide: {
        i18nWatch: {
          // Any utility functions related to i18n could go here
          logLocaleChange: (locale: string) => {
            console.log(`Language changed to: ${locale}`);
          },
        },
      },
    };
  } catch (error) {
    console.error("Error in i18n-watch plugin:", error);
  }
});
