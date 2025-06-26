<script setup lang="ts">
import SharedNavigation from "~/components/SharedNavigation.vue";

definePageMeta({
  name: "home-fr",
});

// SEO optimization for French
useHead({
  title: "Ingénierie Logicielle & Solutions IA - Tom Rogiers",
  meta: [
    {
      name: "description",
      content:
        "Solutions d'ingénierie logicielle et d'IA expertes par Tom Rogiers. Spécialisé en intégration IA, apprentissage automatique et solutions logicielles d'entreprise.",
    },
    {
      property: "og:title",
      content: "Ingénierie Logicielle & Solutions IA - Tom Rogiers",
    },
    {
      property: "og:description",
      content:
        "Solutions IA expertes avec développement personnalisé, NLP, automatisation de documents et analyses prédictives.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@tomRogiers" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "theme-color", content: "#3b82f6" },
  ],
  link: [{ rel: "canonical", href: "https://tomRogiers.com/fr" }],
});

// Scroll handling with better performance
const mainContent = ref<HTMLElement | null>(null);
const { updateScrollPosition, scrollToSection, showFooter } = useScroll();
const route = useRoute();
const timestamp = ref(Date.now());

// Provide scroll functionality to child components
provide("scrollToSection", scrollToSection);

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

// Handle hash navigation
function handleHashNavigation() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(targetId);
    }, 100);
  }
}

// Setup scroll monitoring with proper event cleanup
onMounted(() => {
  if (mainContent.value) {
    timestamp.value = Date.now();

    const handleScroll = () => {
      if (mainContent.value) updateScrollPosition(mainContent.value);
    };

    mainContent.value.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", checkScrollHeight, { passive: true });
    window.addEventListener("hashchange", handleHashNavigation);

    checkScrollHeight();

    if (window.location.hash) {
      handleHashNavigation();
    }

    onUnmounted(() => {
      if (mainContent.value) {
        mainContent.value.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", checkScrollHeight);
      window.removeEventListener("hashchange", handleHashNavigation);
    });
  }
});
</script>

<template>
  <div
    class="h-screen w-screen bg-white dark:bg-[#1a202c] flex flex-col overflow-hidden"
  >
    <SharedNavigation />
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
              {{
                $t(
                  "ai.heroTitle",
                  "Autonomiser Votre Entreprise avec des Solutions IA"
                )
              }}
            </h1>
          </div>

          <div class="relative">
            <p
              class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto hero-description"
            >
              {{
                $t(
                  "ai.heroDescription",
                  "Construire des solutions évolutives et innovantes avec des technologies modernes. Spécialisé dans l'intégration IA, le développement web et les logiciels d'entreprise."
                )
              }}
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-4 pt-4">
            <button
              @click="scrollToSection('contact')"
              class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
            >
              <span>{{ $t("ai.getStarted", "Commencer") }}</span>
              <Icon name="heroicons:arrow-right" class="w-5 h-5" />
            </button>
            <button
              @click="scrollToSection('projects')"
              class="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 flex items-center gap-2 hero-cta"
            >
              <span>{{ $t("projects.viewProjects", "Voir les projets") }}</span>
              <Icon name="heroicons:arrow-right" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <!-- Services Section with SectionCard -->
      <SectionCard
        id="services"
        type="ai"
        backgroundImage="/assets/images/4bab9366-e954-4702-921f-f4b0bbf07aa8.png"
      >
        <ServicesSection />
      </SectionCard>

      <!-- AI Automation Examples with SectionCard -->
      <SectionCard
        id="automation"
        type="ai"
        backgroundImage="/assets/images/robotic-interaction-abstract.jpg"
      >
        <AutomationExamples />
      </SectionCard>

      <!-- Projects Section -->
      <section id="projects" class="my-20">
        <ProjectsSection :key="`projects-${route.path}-${timestamp}`" />
      </section>

      <!-- Contact Section -->
      <section id="contact" class="my-20">
        <ContactSection :key="`contact-${route.path}-${timestamp}`" />
      </section>

      <!-- Bottom padding for footer -->
      <div class="h-36"></div>

      <!-- Footer -->
      <div
        class="transition-opacity duration-500 w-full"
        :class="showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <Footer />
      </div>
    </main>
  </div>
</template>

<style lang="postcss">
.page-wrapper {
  @apply relative min-h-screen w-full bg-white dark:bg-[#1a202c];
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
