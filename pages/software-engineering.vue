<template>
  <div
    class="h-screen w-screen bg-white dark:bg-[#1a202c] flex flex-col overflow-hidden"
  >
    <SharedNavigation />
    <main
      ref="mainContent"
      class="h-screen w-full overflow-y-auto overflow-x-hidden scroll-smooth"
      @scroll="checkScrollPosition"
    >
      <div class="space-y-16 container mx-auto px-4 py-8 pt-20">
        <HeroSection :key="`hero-${timestamp}`" @scroll-to="scrollToSection" />
        <ProjectsSection :key="`projects-${timestamp}`" />
        <ProcessSection :key="`process-${timestamp}`" />
        <AboutSection :key="`about-${timestamp}`" />
        <!-- Engineering-specific contact section with larger sizing -->
        <div id="contact" class="my-16 w-full">
          <LazyEngineeringContactSection :key="`contact-${timestamp}`" />
        </div>
        <!-- Add padding at bottom to ensure space for footer -->
        <div class="pb-24"></div>
      </div>
      <!-- Footer only appears when scrolled to bottom -->
      <div
        class="transition-opacity duration-500 w-full"
        :class="showFooter ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      >
        <Footer />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, provide } from "vue";
import { useRoute } from "vue-router";

// Use shared scroll composable for consistency
const {
  updateScrollPosition,
  scrollToSection: scrollToSectionComposable,
  showFooter,
} = useScroll();
const mainContent = ref<HTMLElement | null>(null);
const route = useRoute();
const timestamp = ref(Date.now()); // Use timestamp for component keys

// Custom page configuration
provide("customArrowPositions", {
  titleArrowTop: -15,
  descriptionArrowTop: -10,
});

function checkScrollPosition() {
  if (!mainContent.value) return;
  updateScrollPosition(mainContent.value);
}

// Custom scroll function with proper offset handling
function scrollToSection(sectionId: string) {
  if (!mainContent.value) return;

  nextTick(() => {
    const section = document.getElementById(sectionId);

    if (section && mainContent.value) {
      // Calculate position with header offset
      const headerOffset = 80;
      const offset = section.offsetTop - headerOffset;

      mainContent.value.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      // Update URL hash without triggering scroll
      history.pushState(null, "", `#${sectionId}`);
    }
  });
}

// Provide the scroll function to child components
provide("scrollToSection", scrollToSection);

// Handle hash navigation
function handleHashNavigation() {
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    setTimeout(() => {
      scrollToSection(targetId);
    }, 100);
  }
}

// Set up scroll event monitoring
onMounted(() => {
  // Update timestamp when mounted to ensure components reload
  timestamp.value = Date.now();

  nextTick(() => {
    // Check initial position
    checkScrollPosition();

    // Handle hash navigation (like #contact)
    if (window.location.hash) {
      handleHashNavigation();
    }

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashNavigation);
    window.addEventListener("resize", checkScrollPosition, { passive: true });
  });
});

onUnmounted(() => {
  window.removeEventListener("hashchange", handleHashNavigation);
  window.removeEventListener("resize", checkScrollPosition);
});

// Watch for content changes that might affect scroll height
watch(
  () => mainContent.value?.scrollHeight,
  () => {
    checkScrollPosition();
  }
);

// Use translations for page metadata
const { t } = useI18n();

useHead({
  title: t("software.pageTitle"),
  meta: [
    {
      name: "description",
      content: t("software.pageDescription"),
    },
    {
      property: "og:title",
      content: t("software.ogTitle"),
    },
    {
      property: "og:description",
      content: t("software.ogDescription"),
    },
  ],
});
</script>

<style>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
