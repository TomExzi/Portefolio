<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { process } = portfolioConfig;
</script>

<template>
  <SectionCard id="process">
    <div class="flex items-center gap-3 mb-12">
      <Icon name="heroicons:arrow-path" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
      <h2 class="text-3xl font-bold dark:text-white">How I Work</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="item in process"
        :key="item.id"
        class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all hover:translate-y-[-4px]"
      >
        <div class="mb-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg inline-block">
          <Icon :name="item.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 class="text-xl font-semibold mb-3 dark:text-white flex items-center gap-2">
          {{ item.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ item.description }}
        </p>
      </div>
    </div>
  </SectionCard>
</template>
