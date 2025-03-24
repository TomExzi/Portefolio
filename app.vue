<template>
  <div>
    <!-- Debug display to check if translations are working -->
    <div class="fixed bottom-0 right-0 p-2 bg-black/50 text-white z-50">
      Locale: {{ $i18n.locale }}
    </div>

    <NuxtLayout>
      <TheHeader />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import TheHeader from "~/components/TheHeader.vue";

const { currentLanguage } = useLanguage();

// Update HTML lang attribute when language changes
watch(currentLanguage, (newLang) => {
  document.documentElement.lang = newLang;
});

// Set initial language attribute
onMounted(() => {
  document.documentElement.lang = currentLanguage.value;
});
</script>

<style>
html {
  scroll-behavior: smooth;
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
