<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <NavBar />
    <main class="container mx-auto px-4 py-8 pt-24 space-y-16">
      <HeroSection />
      <ProjectsSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Tom Rogiers - Full Stack Development at ExiSoftware",
  meta: [
    {
      name: "description",
      content:
        "Full Stack Developer at ExiSoftware specializing in Vue.js, Nuxt, and TypeScript",
    },
    {
      property: "og:title",
      content: "Tom Rogiers - Full Stack Development at ExiSoftware",
    },
    {
      property: "og:description",
      content:
        "Full Stack Developer at ExiSoft specializing in Vue.js, Nuxt, and TypeScript",
    },
    //{ property: "og:image", content: "/og-image.webp" },
    //{ name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>
