<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { process } = portfolioConfig;
</script>

<template>
  <SectionCard id="process">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">How I Work</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="item in process"
        :key="item.id"
        class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <div class="mb-4">
          <Icon :name="item.icon" class="w-8 h-8 text-blue-600" />
        </div>
        <h3 class="text-xl font-semibold mb-3 dark:text-white">
          {{ item.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          {{ item.description }}
        </p>
      </div>
    </div>
  </SectionCard>
</template>
