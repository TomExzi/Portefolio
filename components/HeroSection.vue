<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { hero } = portfolioConfig;

const scrollToContact = () => {
  const element = document.getElementById("contact");
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section class="py-16 md:py-24">
    <div class="flex items-center gap-3 mb-4">
      <Icon name="heroicons:sparkles" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
      <h1 class="text-4xl md:text-6xl font-bold dark:text-white">
        Hi, I'm {{ hero.name }}
      </h1>
    </div>
    
    <div class="flex items-center gap-3 mb-8">
      <Icon name="heroicons:code-bracket" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      <h2 class="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300">
        {{ hero.title }}
      </h2>
    </div>
    
    <div class="flex items-start gap-3 mb-12">
      <Icon name="heroicons:light-bulb" class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
      <p class="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-400">
        {{ hero.description }}
      </p>
    </div>
    
    <button
      @click="scrollToContact"
      class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
    >
      <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
      {{ hero.ctaText }}
    </button>
  </section>
</template>
