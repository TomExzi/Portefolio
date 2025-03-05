<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { hero } = portfolioConfig;

const scrollToContact = () => {
  const element = document.getElementById("contact");
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section class="py-16 md:py-24 select-none text-center">
    <div class="flex flex-col items-center justify-center gap-3 mb-4">
      <h1 class="text-4xl md:text-6xl font-bold dark:text-white pointer-events-none">
        Hi, I'm {{ hero.name }}
      </h1>
    </div>
    
    <div class="flex flex-col items-center justify-center gap-3 mb-8">
      <h2 class="text-2xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 pointer-events-none">
        {{ hero.title }}
      </h2>
    </div>
    
    <div class="flex flex-col items-center justify-center gap-3 mb-12">
      <p class="text-lg md:text-xl max-w-2xl text-gray-600 dark:text-gray-400 pointer-events-none mx-auto">
        {{ hero.description }}
      </p>
    </div>
    
    <div class="flex justify-center">
      <button
        @click="scrollToContact"
        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
      >
        <Icon name="heroicons:paper-airplane" class="w-5 h-5 pointer-events-none" aria-hidden="true" />
        {{ hero.ctaText }}
      </button>
    </div>
  </section>
</template>

<style scoped>
/* Prevent text selection */
::selection {
  background: transparent;
}

/* Ensure proper text wrapping */
p {
  word-break: normal;
  overflow-wrap: break-word;
}
</style>
