<script setup lang="ts">
const { projects } = usePortfolioData();
</script>

<template>
  <SectionCard id="projects">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">Featured Projects</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <article
        v-for="project in projects"
        :key="project.id"
        class="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div class="aspect-video overflow-hidden">
          <img
            :src="project.imageUrl"
            :alt="project.title"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            width="600"
            height="338"
          />
        </div>

        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold dark:text-white">
              {{ project.title }}
            </h3>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ project.type }}
            </span>
          </div>

          <p class="text-gray-600 dark:text-gray-300 mb-4">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tech in project.technologies"
              :key="tech"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
            >
              {{ tech }}
            </span>
          </div>

          <div class="flex gap-4">
            <NuxtLink
              v-if="project.links.github"
              :to="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <div class="i-heroicons-code-bracket-20-solid w-5 h-5" />
              Code
            </NuxtLink>

            <NuxtLink
              v-if="project.links.website"
              :to="project.links.website"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
            >
              <div
                class="i-heroicons-arrow-top-right-on-square-20-solid w-5 h-5"
              />
              Live Demo
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </SectionCard>
</template>
