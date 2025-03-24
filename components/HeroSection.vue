<script setup lang="ts">
// Import i18n composable to properly handle language changes
const { t, locale } = useI18n();

// Add reactivity to ensure component updates when language changes
const heroTitle = computed(() => t("hero.title"));
const heroDescription = computed(() => t("hero.description"));
const ctaText = computed(() => t("hero.ctaText"));
</script>

<template>
  <section class="py-16 md:py-24 hero-section">
    <div class="container mx-auto px-4">
      <div class="max-w-3xl">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display hero-title"
        >
          {{ heroTitle }}
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-400 mb-8 hero-description"
        >
          {{ heroDescription }}
        </p>
        <NuxtLink
          to="#contact"
          class="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium transition-colors hero-cta"
        >
          {{ ctaText }}
          <Icon name="heroicons:arrow-right" class="ml-2 w-5 h-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Prevent text selection */
::selection {
  background: transparent;
}

/* Hero section styling */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::after {
  content: "";
  position: absolute;
  top: -10%;
  right: -10%;
  width: 50%;
  height: 80%;
  background: radial-gradient(
    circle,
    rgba(59, 130, 246, 0.1) 0%,
    rgba(59, 130, 246, 0) 70%
  );
  z-index: -1;
  border-radius: 50%;
}

.hero-title {
  background: linear-gradient(90deg, #1e40af 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  animation: fadeInUp 1s ease-out;
}

.hero-description {
  word-break: normal;
  overflow-wrap: break-word;
  max-width: 90%;
  animation: fadeInUp 1.2s ease-out;
}

.hero-cta {
  animation: fadeInUp 1.4s ease-out;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
  transition: all 0.3s ease;
}

.hero-cta:hover {
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion) {
  .hero-title,
  .hero-description,
  .hero-cta {
    animation: none;
  }
}

.dark .hero-title {
  background: linear-gradient(90deg, #60a5fa 0%, #93c5fd 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.dark .hero-cta {
  box-shadow: 0 4px 14px rgba(96, 165, 250, 0.4);
}

.dark .hero-cta:hover {
  box-shadow: 0 6px 20px rgba(96, 165, 250, 0.6);
}
</style>
