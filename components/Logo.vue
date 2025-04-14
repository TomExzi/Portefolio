<script setup lang="ts">
const scrollToContact = () => {
  const element = document.getElementById("contact");
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <button
    @click="scrollToContact"
    class="text-base font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent px-2 rounded-full hover:bg-gray-100/20 dark:hover:bg-gray-800/20 transition-colors"
  >
    ExziTech
  </button>
</template>
