<script setup lang="ts">
defineProps<{
  project: {
    id: string;
    title: string;
    type: string;
    imageUrl: string;
    category: string;
  }
}>();
</script>

<template>
  <div class="glass-light dark:glass-dark rounded-xl overflow-hidden shadow-light-card dark:shadow-dark-card transition-card hover:transform hover:scale-[1.02]">
    <!-- Project Image -->
    <div class="relative h-48 overflow-hidden">
      <img
        :src="project.imageUrl"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div class="absolute bottom-3 left-3">
        <span class="px-2 py-1 text-xs font-medium rounded-full bg-primary-600 text-white">
          {{ project.type }}
        </span>
      </div>
    </div>
    
    <!-- Project Info -->
    <div class="p-4">
      <h3 class="text-lg font-display mb-2 text-light-primary dark:text-dark-primary">
        {{ project.title }}
      </h3>
      <div class="flex items-center justify-between">
        <span class="text-sm text-light-secondary dark:text-dark-secondary">
          {{ project.category.replace(/([A-Z])/g, ' $1').trim() }}
        </span>
        <button class="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline flex items-center gap-1">
          View Details
          <Icon name="heroicons:arrow-right" class="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
</template> 