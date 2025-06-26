// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "nuxt-icon",
    "@nuxt/image",
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
        // Google Fonts with display=swap for better performance
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap",
          crossorigin: "anonymous",
        },
        // Preload critical fonts to improve First Contentful Paint
        {
          rel: "preload",
          as: "font",
          href: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F7Uq9s.woff2",
          type: "font/woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          href: "https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXx-p7K4KLg.woff2",
          type: "font/woff2",
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
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
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
      thumbnail: {
        modifiers: {
          format: "webp",
          width: 300,
          height: 200,
          quality: 70, // Lower quality for thumbnails
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

  nitro: {
    prerender: {
      crawlLinks: false, // Disable automatic crawling
      routes: [], // Don't prerender any routes for now
      ignore: ["/api/**"], // Don't prerender API routes
    },
    compressPublicAssets: {
      // Enable Brotli and Gzip compression for better performance
      gzip: true,
      brotli: true,
    },
    minify: true, // Minify all HTML/JS/CSS
  },
  build: {
    transpile: [],
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      cssCodeSplit: true,
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
    renderJsonPayloads: true, // More efficient payload rendering
    typedPages: true, // Type checked pages
    scanPageMeta: true, // Required for i18n route localization features
  },
  routeRules: {
    // Cache assets with long expiry for better performance
    "/img/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      prerender: true,
    },
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
