<script setup lang="ts">
defineProps<{
  project: {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    link?: string;
  };
}>();
</script>

<template>
  <div class="relative w-full">
    <!-- Your slide content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="order-2 md:order-1">
        <h3 class="text-2xl font-bold mb-4">{{ project.title }}</h3>
        <p class="mb-4">{{ project.description }}</p>
        <!-- Other project details -->
      </div>
      <div class="order-1 md:order-2">
        <NuxtImg
          :src="project.image"
          alt="Project image"
          class="rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</template>
