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
  title: "John Doe - Frontend Developer",
  meta: [
    {
      name: "description",
      content:
        "Frontend developer specializing in Vue.js, Nuxt, and TypeScript",
    },
    { property: "og:title", content: "John Doe - Frontend Developer" },
    {
      property: "og:description",
      content:
        "Frontend developer specializing in Vue.js, Nuxt, and TypeScript",
    },
    { property: "og:image", content: "/og-image.webp" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>
