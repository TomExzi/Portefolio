<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { projects } = portfolioConfig;
const currentIndex = ref(0);

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % projects.length;
};

const prev = () => {
  currentIndex.value =
    currentIndex.value === 0 ? projects.length - 1 : currentIndex.value - 1;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>

<template>
  <SectionCard id="projects">
    <h2 class="text-2xl font-bold mb-6 dark:text-white">Featured Projects</h2>

    <div class="relative max-w-6xl mx-auto space-y-8">
      <!-- Slider -->
      <div class="overflow-hidden relative rounded-xl">
        <NuxtTransitionGroup
          name="slide"
          tag="div"
          class="relative w-full"
          mode="out-in"
        >
          <article
            v-for="(project, index) in projects"
            :key="project.id"
            v-show="index === currentIndex"
            class="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <!-- Project Title -->
            <div class="p-6 border-b border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-xl md:text-2xl font-semibold dark:text-white">
                  {{ project.title }}
                </h3>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ project.type }}
                </span>
              </div>
            </div>

            <!-- Project Image -->
            <NuxtImg
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-[300px] md:h-[500px] object-cover"
              loading="lazy"
              sizes="100vw"
              format="webp"
            />
          </article>
        </NuxtTransitionGroup>

        <!-- Navigation Buttons -->
        <button
          @click="prev"
          class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-1.5 md:p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Previous project"
        >
          <Icon name="heroicons:chevron-left" class="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button
          @click="next"
          class="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-1.5 md:p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label="Next project"
        >
          <Icon name="heroicons:chevron-right" class="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <!-- Dots Navigation -->
      <div class="flex justify-center gap-2">
        <button
          v-for="(_, index) in projects"
          :key="index"
          @click="goToSlide(index)"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="[
            index === currentIndex
              ? 'bg-blue-600 w-4'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
          ]"
          :aria-label="`Go to project ${index + 1}`"
        />
      </div>

      <!-- Project Info -->
      <div
        v-for="(project, index) in projects"
        :key="`info-${project.id}`"
        v-show="index === currentIndex"
        class="max-w-3xl mx-auto space-y-6"
      >
        <!-- Technologies -->
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-sm"
          >
            {{ tech }}
          </span>
        </div>

        <!-- Description -->
        <p
          class="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center"
        >
          {{ project.description }}
        </p>
      </div>
    </div>
  </SectionCard>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
