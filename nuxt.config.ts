// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/i18n",
  ],
  colorMode: {
    preference: "system",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "shortcut icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        // Google Fonts
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap",
          crossorigin: "anonymous",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
  components: {
    dirs: ["~/components"],
  },
  css: ["~/assets/css/main.css"],
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
    configPath: "tailwind.config.ts",
  },
  image: {
    quality: 80,
    format: ["webp", "png", "jpg"],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      background: {
        modifiers: {
          format: "webp",
          width: 1920,
          height: 1080,
          quality: 80,
        },
      },
    },
  },
  i18n: {
    lazy: true,
    langDir: "locales",
    defaultLocale: "en",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fr",
        file: "fr.json",
      },
      {
        code: "nl",
        file: "nl.json",
      },
    ],
    strategy: "prefix_except_default",
  },
  nitro: {
    prerender: {
      concurrency: 10,
      routes: ["/"],
    },
    compressPublicAssets: true,
  },
  build: {
    transpile: [],
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router"],
            ui: ["nuxt-icon", "@nuxtjs/tailwindcss"],
          },
        },
      },
      cssCodeSplit: true,
    },
    optimizeDeps: {
      include: ["vue", "vue-router"],
    },
    css: {
      devSourcemap: false,
    },
  },
  experimental: {
    asyncEntry: true,
    viewTransition: true,
    headNext: true,
  },
  routeRules: {
    "/assets/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  },
});
