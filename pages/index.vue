<template>
  <div
    class="h-screen w-screen bg-white dark:bg-[#1a202c] flex flex-col overflow-hidden"
  >
    <!-- Top logo -->
    <div class="fixed top-0 left-0 w-full z-50 px-4 py-4">
      <div class="container mx-auto">
        <Logo />
      </div>
    </div>

    <NavBar />
    <main
      ref="mainContent"
      class="container mx-auto px-4 py-8 pt-20 flex-grow overflow-auto no-scrollbar"
      @scroll="checkScrollPosition"
    >
      <div class="space-y-16">
        <HeroSection />
        <ProjectsSection />
        <ProcessSection />
        <AboutSection />
        <!-- Lazy load Contact Section -->
        <LazyContactSection />
        <!-- Add padding at bottom to ensure space for footer -->
        <div class="pb-40"></div>
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

// Track scroll position to show/hide footer
const mainContent = ref<HTMLElement | null>(null);
const showFooter = ref(false);

function checkScrollPosition() {
  if (!mainContent.value) return;

  const element = mainContent.value;
  const scrollPosition = element.scrollTop;
  const maxScroll = element.scrollHeight - element.clientHeight;

  // Show footer when within 250px of bottom
  showFooter.value = maxScroll - scrollPosition < 250;
}

// Function to handle navigation to sections
function scrollToSection(sectionId: string) {
  if (!mainContent.value) return;

  nextTick(() => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      // Calculate position, accounting for any fixed headers/navbars
      const headerOffset = 80;

      // Option 1: Using offset calculation
      const containerRect = mainContent.value!.getBoundingClientRect();
      const elementRect = targetElement.getBoundingClientRect();
      const offsetPosition =
        elementRect.top -
        containerRect.top +
        mainContent.value!.scrollTop -
        headerOffset;

      // Scroll to element within our scroller
      mainContent.value!.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Force check scroll position after navigation with a longer timeout
      // to account for smooth scroll animation
      setTimeout(() => {
        checkScrollPosition();
      }, 500);
    }
  });
}

// Provide the scroll function to child components
provide("scrollToSection", scrollToSection);

// Handle hash navigation to prevent white space
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
  nextTick(() => {
    // Check initial position
    checkScrollPosition();

    // Handle hash navigation (like #contact)
    if (window.location.hash) {
      handleHashNavigation();
    }

    // Listen to hash changes
    window.addEventListener("hashchange", handleHashNavigation);
  });
});

onUnmounted(() => {
  window.removeEventListener("hashchange", handleHashNavigation);
});

// Watch for content changes that might affect scroll height
watch(
  () => mainContent.value?.scrollHeight,
  () => {
    checkScrollPosition();
  }
);

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

<style>
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
