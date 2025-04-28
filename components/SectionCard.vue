<script setup lang="ts">
defineProps<{
  id?: string;
  noCard?: boolean;
  type?: "default" | "ai" | "engineering";
}>();
</script>

<template>
  <section
    :id="id"
    :class="[
      'relative p-6 md:p-8 my-12 rounded-xl overflow-hidden',
      !noCard && type === 'ai'
        ? 'bg-[#1a1e2e] text-white shadow-section mx-auto custom-width'
        : '',
      !noCard && type === 'engineering'
        ? 'bg-[#1a1e2e] text-white shadow-section'
        : '',
      !noCard && !type ? 'bg-[#1a1e2e] text-white shadow-section' : '',
    ]"
  >
    <!-- Background gradient -->
    <div
      v-if="!noCard"
      class="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a1e2e] to-[#12162a]"
    ></div>

    <div class="mx-auto px-4 md:px-6 lg:px-8 relative z-10">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.shadow-section {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.custom-width {
  max-width: 1380px; /* Between 7xl (1280px) and 8xl (1440px) */
}
</style>
