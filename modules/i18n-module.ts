import { defineNuxtModule, addPlugin, createResolver } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "i18n-extension",
    configKey: "i18nExtension",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Wait for i18n module to be initialized before registering our hook
    nuxt.hook("modules:done", () => {
      // Register a module hook handler for the modern i18n:registerModule hook
      // Note: this hook will only be triggered if the @nuxtjs/i18n module is loaded
      nuxt.hooks.hook("i18n:registerModule", async (registerModule) => {
        // This is where you would register additional i18n messages
        // Example: registerModule({ key: 'custom-module', messages: { en: { hello: 'world' } } })
        console.log(
          "Using modern i18n:registerModule hook instead of deprecated i18n:extend-messages"
        );
      });
    });

    // Register the plugin
    addPlugin(resolver.resolve("./runtime/i18n-plugin"));
  },
});
