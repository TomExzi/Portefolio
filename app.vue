<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Setup color mode
const colorMode = useColorMode();

// Set initial language attribute
onMounted(() => {
  document.documentElement.lang = "en";
});
</script>

<style>
html,
body {
  scroll-behavior: smooth;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

body {
  display: flex;
  flex-direction: column;
}

.app-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

/* Hide scrollbar completely for all elements */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

* {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Add smooth transitions for dark mode */
.dark-mode-transition {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

/* Apply the transition to common elements */
body,
.dark-mode-transition * {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}

/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
