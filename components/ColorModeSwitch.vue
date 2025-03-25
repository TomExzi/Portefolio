<script setup lang="ts">
// Get the color mode composable
const colorMode = useColorMode();

// Computed property to handle dark mode state
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value: boolean) {
    colorMode.preference = value ? "dark" : "light";
  },
});

// Function to toggle dark mode
function toggleDarkMode() {
  isDark.value = !isDark.value;
  // Force update of HTML classes for immediate effect
  nextTick(() => {
    if (isDark.value) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
}
</script>

<template>
  <button
    @click="toggleDarkMode"
    class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors duration-200"
    aria-label="Toggle dark mode"
  >
    <Icon
      :name="isDark ? 'heroicons:sun' : 'heroicons:moon'"
      class="w-5 h-5"
      aria-hidden="true"
    />
  </button>
</template>
