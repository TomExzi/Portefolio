<script setup lang="ts">
const scrollToContact = () => {
  const element = document.getElementById("contact");
  element?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <button
    @click="scrollToContact"
    class="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
  >
    ExiTech
  </button>
</template>
