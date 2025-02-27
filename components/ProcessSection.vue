<script setup lang="ts">
const { processes } = usePortfolioData();
</script>

<template>
  <SectionCard id="process">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">How I Work</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="process in processes"
        :key="process.id"
        class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div class="mb-4">
          <div :class="[process.icon, 'w-8 h-8 text-blue-600']" />
        </div>
        <h3 class="text-xl font-semibold mb-3 dark:text-white">
          {{ process.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ process.description }}
        </p>
      </div>
    </div>
  </SectionCard>
</template>
