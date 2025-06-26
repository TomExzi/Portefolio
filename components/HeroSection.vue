<script setup lang="ts">
import { inject } from "vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const emit = defineEmits<{
  (e: "scroll-to", section: string): void;
}>();

// Use i18n for translations
const { t } = useI18n();

const handleGetStarted = () => {
  // Clear any previous hash state that might interfere with navigation
  if (window.location.hash) {
    history.pushState(null, "", window.location.pathname);
  }

  // Short delay to ensure the URL change has taken effect
  setTimeout(() => {
    emit("scroll-to", "contact");
  }, 50);
};

// Check for custom arrow positions from parent page
const customArrowPositions = inject("customArrowPositions", {
  titleArrowTop: 20, // default value
  descriptionArrowTop: 30, // default value
});

// Determine which translation context to use based on current route
const route = useRoute();
const translationContext = computed(() => {
  if (route.path.includes("software-engineering")) {
    return "software.hero";
  }
  return "hero"; // Default to main hero translations
});

// Get the appropriate button text based on context
const viewAISolutionsText = computed(() => {
  if (route.path.includes("software-engineering")) {
    return t("software.hero.viewAISolutions");
  }
  return t("ai.viewSoftwareEngineering");
});
</script>

<template>
  <section
    id="hero"
    class="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-10 md:py-14 hero-section"
  >
    <div class="max-w-4xl mx-auto text-center space-y-6">
      <div class="relative">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 hero-title"
        >
          {{ t(`${translationContext}.title`) }}
        </h1>
        <div class="title-arrow-container">
          <client-only>
            <img
              src="/arrows/curved-arrow.webp"
              alt="Curved arrow"
              class="arrow-image title-arrow opacity-0 transition-opacity duration-500"
              :class="{ 'opacity-100': true }"
              width="180"
              height="120"
              loading="lazy"
            />
            <template #fallback>
              <!-- Fallback during SSR -->
              <div class="w-[180px] h-[120px]"></div>
            </template>
          </client-only>
          <span
            class="arrow-text title-arrow-text opacity-0 transition-opacity duration-500"
            :class="{ 'opacity-100': true }"
            >Us</span
          >
        </div>
      </div>

      <div class="relative">
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto hero-description"
        >
          {{ t(`${translationContext}.description`) }}
        </p>
        <div class="description-arrow-container">
          <client-only>
            <img
              src="/arrows/curved-arrow.webp"
              alt="Curved arrow"
              class="arrow-image description-arrow opacity-0 transition-opacity duration-500"
              :class="{ 'opacity-100': true }"
              width="180"
              height="120"
              loading="lazy"
            />
            <template #fallback>
              <!-- Fallback during SSR -->
              <div class="w-[180px] h-[120px]"></div>
            </template>
          </client-only>
          <span
            class="arrow-text description-arrow-text opacity-0 transition-opacity duration-500"
            :class="{ 'opacity-100': true }"
            >Me</span
          >
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-4 pt-4">
        <button
          @click="handleGetStarted"
          class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
        >
          <span>{{ t(`${translationContext}.getStarted`) }}</span>
          <Icon name="heroicons:arrow-right" class="w-5 h-5" />
        </button>
        <NuxtLink
          to="/"
          class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
        >
          <span>{{ viewAISolutionsText }}</span>
          <Icon name="heroicons:arrow-right" class="w-5 h-5" />
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

/* Add transitions for smoother changes */
.arrow-image,
.arrow-text,
.title-arrow-container,
.description-arrow-container {
  transition: all;
}

/* Arrow styling */
.arrow-image {
  width: 180px;
  height: auto;
  position: absolute;
  z-index: 2;
  filter: none;
  mix-blend-mode: multiply;
}

.dark .arrow-image {
  filter: invert(1);
  mix-blend-mode: screen;
}

.arrow-text {
  position: absolute;
  font-family: "Permanent Marker", cursive, sans-serif;
  font-size: 1.8rem;
  color: #000;
  z-index: 3;
  text-shadow: 1px 1px 2px white;
}

.dark .arrow-text {
  color: #fff;
  text-shadow: 1px 1px 2px black;
}

/* Title arrow positioning */
.title-arrow-container {
  position: absolute;
  width: 180px;
  height: 120px;
  top: v-bind('customArrowPositions.titleArrowTop + "px"');
  left: -80px;
}

.title-arrow {
  top: 0;
  left: 0;
  transform: rotate(-30deg);
}

.title-arrow-text {
  top: 80%;
  left: 50px;
}

/* Description arrow positioning */
.description-arrow-container {
  position: absolute;
  width: 180px;
  height: 120px;
  top: v-bind('customArrowPositions.descriptionArrowTop + "px"');
  right: -140px;
}

.description-arrow {
  top: 0;
  right: 0;
  transform: scaleX(-1) rotate(-40deg);
}

.description-arrow-text {
  top: 85%;
  right: 60px;
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

/* Hide arrows on screens under 1200px */
@media (max-width: 1199px) {
  .title-arrow-container,
  .description-arrow-container {
    display: none;
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
