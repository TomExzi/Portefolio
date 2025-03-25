<script setup lang="ts">
// Import i18n composable to properly handle language changes
const { t, locale } = useI18n();

// Add reactivity to ensure component updates when language changes
const heroTitle = computed(() => t("hero.title"));
const heroDescription = computed(() => t("hero.description"));
const ctaText = computed(() => t("hero.ctaText"));

// Import dark mode composable
const colorMode = useColorMode();
const isDarkMode = computed(() => colorMode.value === "dark");

// Single arrow image path
const arrowImage =
  "/Curved-arrow-doodle-Hand-drawn-brush-st-Graphics-70917217-1-1-580x387.png";

// Visibility state for lazy loading
const titleArrowVisible = ref(false);
const descArrowVisible = ref(false);
const heroSectionRef = ref<HTMLElement | null>(null);

// Setup lazy loading for arrows
onMounted(() => {
  // Ensure we're on client-side
  if (process.client) {
    nextTick(() => {
      try {
        if (heroSectionRef.value) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  titleArrowVisible.value = true;
                  descArrowVisible.value = true;
                }
              });
            },
            { threshold: 0.1 }
          );

          observer.observe(heroSectionRef.value);

          // Cleanup
          onBeforeUnmount(() => {
            if (observer) {
              observer.disconnect();
            }
          });
        } else {
          // Fallback when ref is not available
          titleArrowVisible.value = true;
          descArrowVisible.value = true;
        }
      } catch (error) {
        console.error("IntersectionObserver error:", error);
        // Fallback
        titleArrowVisible.value = true;
        descArrowVisible.value = true;
      }
    });
  } else {
    // Fallback for SSR
    titleArrowVisible.value = true;
    descArrowVisible.value = true;
  }
});
</script>

<template>
  <section class="py-16 md:py-24 hero-section" ref="heroSectionRef">
    <div class="container mx-auto px-4 text-center">
      <div class="max-w-3xl mx-auto relative">
        <!-- Title with arrow pointing to it -->
        <div class="relative">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display hero-title"
          >
            {{ heroTitle }}
          </h1>
          <div class="title-arrow-container">
            <client-only>
              <img
                :src="arrowImage"
                alt="Curved arrow"
                class="arrow-image title-arrow opacity-0 transition-opacity duration-500"
                :class="{ 'opacity-100': titleArrowVisible }"
                width="180"
                height="120"
              />
              <template #fallback>
                <!-- Fallback during SSR -->
                <div class="w-[180px] h-[120px]"></div>
              </template>
            </client-only>
            <span
              class="arrow-text title-arrow-text opacity-0 transition-opacity duration-500"
              :class="{ 'opacity-100': titleArrowVisible }"
              >Us</span
            >
          </div>
        </div>

        <!-- Description with arrow pointing to it -->
        <div class="relative">
          <p
            class="text-xl text-gray-600 dark:text-gray-400 mb-8 hero-description mx-auto"
          >
            {{ heroDescription }}
          </p>
          <div class="description-arrow-container">
            <client-only>
              <img
                :src="arrowImage"
                alt="Curved arrow"
                class="arrow-image description-arrow opacity-0 transition-opacity duration-500"
                :class="{ 'opacity-100': descArrowVisible }"
                width="180"
                height="120"
              />
              <template #fallback>
                <!-- Fallback during SSR -->
                <div class="w-[180px] h-[120px]"></div>
              </template>
            </client-only>
            <span
              class="arrow-text description-arrow-text opacity-0 transition-opacity duration-500"
              :class="{ 'opacity-100': descArrowVisible }"
              >Me</span
            >
          </div>
        </div>

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
  top: 20px;
  left: -160px;
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
  top: 30px;
  right: -160px;
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
