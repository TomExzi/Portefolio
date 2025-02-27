// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-icon"],
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  components: {
    dirs: ["~/components"],
  },
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },
});
