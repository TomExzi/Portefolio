<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-opacity-90 bg-gray-900 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <Logo />
      <div class="flex gap-6">
        <NuxtLink to="/" class="hover:text-blue-400 transition-colors"
          >AI Solutions</NuxtLink
        >
        <NuxtLink
          to="/software-engineering"
          class="hover:text-blue-400 transition-colors"
          >Software Portfolio</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// No additional setup needed
</script>
