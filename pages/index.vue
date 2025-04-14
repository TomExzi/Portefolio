<script setup lang="ts">
definePageMeta({
  layout: "default",
  name: "home",
});

// SEO optimization using Nuxt's composables with enhanced metadata
useHead({
  title: "Software Engineering & AI Solutions - Tom Rooman",
  meta: [
    {
      name: "description",
      content:
        "Expert software engineering and AI solutions by Tom Rooman. Specializing in AI integration, machine learning, and enterprise software solutions.",
    },
    {
      property: "og:title",
      content: "Software Engineering & AI Solutions - Tom Rooman",
    },
    {
      property: "og:description",
      content:
        "Expert AI solutions with custom development, NLP, document automation, and predictive analytics.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@tomrooman" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "theme-color", content: "#3b82f6" },
  ],
  link: [
    { rel: "canonical", href: "https://tomrooman.com" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
  ],
});

// Scroll handling with better performance
const mainContent = ref<HTMLElement | null>(null);
const { updateScrollPosition, scrollToSection, showFooter } = useScroll();

// Watch for changes in scroll height with proper cleanup
let lastScrollHeight = 0;
function checkScrollHeight() {
  if (!mainContent.value) return;
  const newScrollHeight = mainContent.value.scrollHeight;
  if (newScrollHeight !== lastScrollHeight) {
    lastScrollHeight = newScrollHeight;
    updateScrollPosition(mainContent.value);
  }
}

// Setup scroll monitoring with proper event cleanup
onMounted(() => {
  if (mainContent.value) {
    const handleScroll = () => {
      if (mainContent.value) updateScrollPosition(mainContent.value);
    };

    mainContent.value.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", checkScrollHeight, { passive: true });

    // Initial check
    checkScrollHeight();

    // Clean up event listeners properly
    onUnmounted(() => {
      if (mainContent.value) {
        mainContent.value.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", checkScrollHeight);
    });
  }
});
</script>

<template>
  <div class="page-wrapper">
    <main
      ref="mainContent"
      class="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth"
    >
      <!-- Hero Section -->
      <section
        id="hero"
        class="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-10 md:py-14 hero-section"
      >
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <div class="relative">
            <h1
              class="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 hero-title"
            >
              Software Engineering & AI Solutions
            </h1>
            <div class="title-arrow-container">
              <client-only>
                <img
                  src="/arrows/curved-arrow.webp"
                  alt="Curved arrow"
                  class="arrow-image title-arrow opacity-0 transition-opacity duration-500"
                  :class="{ 'opacity-100': true }"
                  width="150"
                  height="100"
                  loading="lazy"
                  fetchpriority="low"
                />
                <template #fallback>
                  <!-- Fallback during SSR -->
                  <div class="w-[150px] h-[100px]"></div>
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
              Building scalable, innovative solutions with modern technologies.
              Specializing in AI integration, web development, and enterprise
              software.
            </p>
            <div class="description-arrow-container">
              <client-only>
                <img
                  src="/arrows/curved-arrow.webp"
                  alt="Curved arrow"
                  class="arrow-image description-arrow opacity-0 transition-opacity duration-500"
                  :class="{ 'opacity-100': true }"
                  width="150"
                  height="100"
                  loading="lazy"
                  fetchpriority="low"
                />
                <template #fallback>
                  <!-- Fallback during SSR -->
                  <div class="w-[150px] h-[100px]"></div>
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
              @click="scrollToSection('services')"
              class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
            >
              <span>Get Started</span>
              <Icon name="heroicons:arrow-right" class="w-5 h-5" />
            </button>
            <NuxtLink
              to="/software-engineering"
              class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
              prefetch
            >
              <span>View Software Engineering</span>
              <Icon name="heroicons:arrow-right" class="w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Services Section - Load as needed with adjusted spacing -->
      <section class="py-6 md:py-10">
        <lazy-component>
          <ServicesSection />
        </lazy-component>
      </section>

      <!-- AI Automation Examples - Load as needed with adjusted spacing -->
      <section class="py-6 md:py-10">
        <lazy-component>
          <AutomationExamples />
        </lazy-component>
      </section>

      <!-- Contact Section - Lazy loaded with adjusted spacing -->
      <section class="py-6 md:py-10">
        <LazyContactSection />
      </section>

      <!-- Bottom padding for footer -->
      <div class="h-24"></div>
    </main>

    <!-- Footer (appears when scrolled to bottom) -->
    <footer
      class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 transition-opacity duration-200 z-10"
      :class="{
        'opacity-0 pointer-events-none': !showFooter,
        'opacity-100': showFooter,
      }"
    >
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ new Date().getFullYear() }} ExziTech. All rights reserved.
          </p>
          <div class="flex items-center space-x-4">
            <a
              href="https://github.com/TomExzi"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/tom-rogiers-290655221/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-5 h-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss">
.page-wrapper {
  @apply relative min-h-screen w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800;
}

.loading-placeholder {
  @apply flex items-center justify-center min-h-[200px];
}
</style>

<style scoped>
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
  width: 150px;
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
  width: 150px;
  height: 100px;
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
  width: 150px;
  height: 100px;
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

@media (prefers-reduced-motion: reduce) {
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
