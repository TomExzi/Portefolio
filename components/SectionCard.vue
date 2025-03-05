<script setup lang="ts">
defineProps<{
  id?: string;
}>();
</script>

<template>
  <section
    :id="id"
    class="py-16 my-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl scroll-mt-20"
  >
    <div class="container mx-auto px-6 md:px-8 lg:px-10">
      <slot />
    </div>
  </section>
</template>
