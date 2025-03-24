<template>
  <header
    class="sticky top-0 z-40 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 shadow-sm"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo and navigation -->
        <div class="flex items-center gap-8">
          <!-- Your logo -->
          <NuxtLink
            to="/"
            class="text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            <!-- Your logo or brand name -->
            Portfolio
          </NuxtLink>

          <!-- Navigation links -->
          <Navigation />
        </div>

        <!-- Right side - Theme toggle and language switcher -->
        <div class="flex items-center gap-3">
          <!-- Language switcher -->
          <LanguageSwitcher />

          <!-- Theme toggle -->
          <ColorModeSwitch v-if="hasThemeToggle" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Import the language switcher and navigation
import LanguageSwitcher from "~/components/LanguageSwitcher.vue";
import Navigation from "~/components/Navigation.vue";
import ColorModeSwitch from "~/components/ColorModeSwitch.vue";

// Define whether to show the theme toggle
const hasThemeToggle = ref(true);
</script>
