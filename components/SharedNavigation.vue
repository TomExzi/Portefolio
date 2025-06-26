<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-opacity-90 bg-gray-900 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <Logo />
      <div class="flex gap-6">
        <NuxtLink
          to="/"
          class="text-gray-100 hover:text-blue-400 transition-colors relative"
          :class="{ 'text-blue-400': isHomePage }"
          @click.prevent="navigatePage('/')"
          >AI Solutions</NuxtLink
        >
        <NuxtLink
          to="/software-engineering"
          class="text-gray-100 hover:text-blue-400 transition-colors relative"
          :class="{ 'text-blue-400': isSoftwarePage }"
          @click.prevent="navigatePage('/software-engineering')"
          >Software Portfolio</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Handle page transitions properly
const route = useRoute();
const router = useRouter();

// Add active page highlighting
const isHomePage = computed(
  () =>
    route.path === "/" ||
    route.path.endsWith("/fr") ||
    route.path.endsWith("/nl")
);

const isSoftwarePage = computed(() =>
  route.path.includes("software-engineering")
);

// Smooth page navigation handler
function navigatePage(path: string) {
  // Don't navigate if we're already on the page
  if (
    (path === "/" && isHomePage.value) ||
    (path === "/software-engineering" && isSoftwarePage.value)
  ) {
    // Reset scroll position if we're on the same page but just refreshing
    // Find main content element and scroll to top
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // Clear any hash from URL
    if (window.location.hash) {
      history.pushState(null, "", path);
    }
    return;
  }

  // Use Nuxt navigation
  navigateTo(path);
}
</script>

<style scoped>
/* Active indicator styles */
.router-link-active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #60a5fa;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.router-link-active::after,
.text-blue-400::after {
  transform: scaleX(1);
}
</style>
