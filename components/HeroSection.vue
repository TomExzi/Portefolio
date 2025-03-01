<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { hero } = portfolioConfig;

const scrollToContact = () => {
  const element = document.getElementById("contact");
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <section class="py-32 md:py-48">
    <h1 class="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
      Hi, I'm {{ hero.name }}
    </h1>
    <h2
      class="text-2xl md:text-4xl font-semibold mb-8 text-gray-700 dark:text-gray-300"
    >
      {{ hero.title }}
    </h2>
    <p
      class="text-lg md:text-xl mb-12 max-w-2xl text-gray-600 dark:text-gray-400"
    >
      {{ hero.description }}
    </p>
    <button
      @click="scrollToContact"
      class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium"
    >
      {{ hero.ctaText }}
    </button>
  </section>
</template>
