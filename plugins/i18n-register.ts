// This plugin handles the i18n module registration using the newer hooks
export default defineNuxtPlugin(async (nuxtApp) => {
  // This plugin is registered after the i18n module is initialized
  // It provides a way to register custom i18n functionality

  // Access the Nuxt app hooks to register with the i18n:registerModule hook
  nuxtApp.hook("app:created", () => {
    // Register any custom i18n functionality here
    console.log("i18n-register plugin: app created");
  });

  // The plugin can also provide its own utilities
  return {
    provide: {
      i18nRegister: {
        // Add custom functionality here if needed
      },
    },
  };
});
