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
    classSuffix: "",
    fallback: "light",
    preference: "system",
    dataValue: "theme",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
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
        { name: "description", content: "Personal Portfolio Website" },
        { name: "format-detection", content: "telephone=no" },
        {
          name: "theme-color",
          content: "#ffffff",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#1e293b",
          media: "(prefers-color-scheme: dark)",
        },
        // Open Graph tags for better social sharing
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Portfolio Website" },
        { property: "og:description", content: "Personal Portfolio Website" },
        { property: "og:image", content: "assets/images/og-image.jpg" },
        { property: "og:url", content: "https://yourwebsite.com" },
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
    format: ["webp", "jpg", "png"],
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
      avatar: {
        modifiers: {
          format: "webp",
          width: 400,
          height: 400,
          quality: 85,
        },
      },
      project: {
        modifiers: {
          format: "webp",
          width: 800,
          height: 600,
          quality: 85,
        },
      },
    },
    providers: {
      // Set default provider
      default: {
        provider: "ipx",
        options: {
          // Set default quality for all images
          quality: 80,
        },
      },
    },
    domains: ["localhost"],
    // Add default placeholders for faster loading experience
    placeholder: {
      enabled: true,
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
      crawlLinks: true, // Automatically detect and prerender all pages
      routes: ["/"],
      ignore: ["/api/**"], // Don't prerender API routes
    },
    compressPublicAssets: true,
    minify: true, // Minify all HTML/JS/CSS
  },
  build: {
    transpile: [],
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {},
        },
      },
    },
    optimizeDeps: {
      include: ["vue", "vue-router"],
      exclude: ["nuxt-icon", "@nuxtjs/tailwindcss"],
    },
    ssr: {
      noExternal: ["nuxt-icon", "@nuxtjs/tailwindcss"],
    },
    css: {
      devSourcemap: false,
    },
  },
  experimental: {
    asyncEntry: true,
    viewTransition: true,
    headNext: true,
    payloadExtraction: true, // Extract payloads for faster static site generation
  },
  routeRules: {
    "/assets/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      prerender: true,
    },
    "/projects/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      prerender: true,
    },
    // Prerender all static routes
    "/**": { prerender: true },
  },
});
