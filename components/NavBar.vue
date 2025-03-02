<script setup lang="ts">
const { isDark } = useTheme();

const navigation = [
  { name: "Projects", href: "#projects" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto px-4 py-4">
      <Logo />
    </div>
  </div>

  <nav
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 py-2 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-center space-x-1 sm:space-x-2">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
      >
        {{ item.name }}
      </NuxtLink>

      <button
        @click="isDark = !isDark"
        class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
        aria-label="Toggle dark mode"
      >
        <Icon
          v-if="isDark"
          name="heroicons:sun-20-solid"
          class="w-5 h-5 text-yellow-100"
        />
        <Icon
          v-else
          name="heroicons:moon-20-solid"
          class="w-5 h-5 text-gray-700"
        />
      </button>
    </div>
  </nav>
</template>
