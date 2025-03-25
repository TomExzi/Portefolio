<template>
  <div>
    <NuxtLayout>
      <NuxtPage :key="locale" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// Get i18n instance at the top level of setup function
const { locale } = useI18n();

// Setup color mode
const colorMode = useColorMode();

// Update HTML lang attribute when language changes
watch(locale, (newLang) => {
  document.documentElement.lang = newLang;
});

// Set initial language attribute
onMounted(() => {
  document.documentElement.lang = locale.value;
});
</script>

<style>
html,
body {
  scroll-behavior: smooth;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: fixed;
}

body {
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
</style>
