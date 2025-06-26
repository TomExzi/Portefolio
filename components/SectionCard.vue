<script setup lang="ts">
defineProps<{
  id?: string;
  noCard?: boolean;
  type?: "default" | "ai" | "engineering";
  backgroundImage?: string;
}>();
</script>

<template>
  <section
    :id="id"
    :class="[
      'relative p-6 md:p-8 my-12 min-h-[400px] rounded-xl',
      !noCard && type === 'ai'
        ? 'bg-transparent text-slate-800 dark:text-white shadow-section mx-auto custom-width'
        : '',
      !noCard && type === 'engineering'
        ? 'bg-white/80 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-section'
        : '',
      !noCard && !type
        ? 'bg-white/80 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-section'
        : '',
    ]"
  >
    <!-- Card Background Image (rounded, no border, lazy loaded) -->
    <img
      v-if="backgroundImage && !noCard"
      :src="backgroundImage"
      alt="Section background image"
      class="absolute inset-0 w-full h-full object-cover object-center z-10 rounded-xl"
      loading="lazy"
      aria-hidden="true"
    />
    <!-- Background gradient (skip for AI card) -->
    <div
      v-if="!noCard && type !== 'ai'"
      class="absolute inset-0 -z-10 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-xl"
    ></div>
    <div class="mx-auto px-4 md:px-6 lg:px-8 relative z-20">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.shadow-section {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.08);
}

.dark .shadow-section {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.custom-width {
  max-width: 1380px; /* Between 7xl (1280px) and 8xl (1440px) */
}
</style>
