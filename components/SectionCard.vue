<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <section
    :id="id"
    class="relative p-6 md:p-8 my-8 rounded-xl glass-light dark:glass-dark shadow-light-card dark:shadow-dark-card transition-card"
  >
    <div class="container mx-auto px-6 md:px-8 lg:px-10">
      <slot />
    </div>
  </section>
</template>

<style scoped>
section:hover {
  transform: scale(1.005);
}
</style>
