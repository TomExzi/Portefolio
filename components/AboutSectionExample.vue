<script setup lang="ts">
// This is just an example file to show how to implement the SVG background
// You can copy these styles and structure to your actual AboutSection.vue file

import { portfolioConfig } from "~/config/portfolio.config";

const { about } = portfolioConfig;
const { t } = useTranslations();

// To toggle between background patterns if needed
const useSimpleBackground = ref(false);
const backgroundSvgUrl = computed(() =>
  useSimpleBackground.value
    ? "/assets/svg/about-bg-simple.svg"
    : "/assets/svg/about-bg-pattern.svg"
);
</script>

<template>
  <SectionCard
    id="about"
    class="about-section relative overflow-hidden"
    :style="{
      backgroundImage: `url(${backgroundSvgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      isolation: 'isolate',
    }"
  >
    <!-- Overlay for content readability -->
    <div class="absolute inset-0 bg-white/90 dark:bg-gray-800/95 -z-10"></div>

    <!-- Your existing AboutSection content goes here -->
    <div class="flex items-center gap-3 mb-12">
      <Icon
        name="heroicons:user"
        class="w-7 h-7 text-blue-600 dark:text-blue-400"
      />
      <h2 class="text-3xl font-bold dark:text-white">{{ t("about.title") }}</h2>
    </div>

    <!-- Rest of your content... -->
  </SectionCard>
</template>

<style scoped>
.about-section {
  z-index: 0;
  transition: all 0.3s ease;
}

/* Optional animation for the background pattern */
@media (prefers-reduced-motion: no-preference) {
  .about-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    z-index: -20;
    animation: subtle-move 60s infinite alternate linear;
    opacity: 0.7;
  }

  @keyframes subtle-move {
    0% {
      transform: scale(1) translate(0, 0);
    }
    100% {
      transform: scale(1.05) translate(1%, 1%);
    }
  }
}

/* Override dark mode styles for better contrast if needed */
:deep(.dark) .about-section {
  /* Custom dark mode styling if needed */
}
</style>
