<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { about } = portfolioConfig;
</script>

<template>
  <SectionCard id="about">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">About Me</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h3 class="text-2xl font-semibold mb-6 dark:text-white">Experience</h3>
        <div class="space-y-8">
          <div
            v-for="experience in about.experiences"
            :key="experience.company"
            class="pl-4"
          >
            <h4 class="text-xl font-medium dark:text-white">
              {{ experience.position }}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 mb-2">
              {{ experience.company }} | {{ experience.period }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in experience.description"
                :key="index"
                class="flex gap-2 text-gray-600 dark:text-gray-300"
              >
                <span class="flex-shrink-0">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-6 dark:text-white">
          Skills & Technologies
        </h3>
        <div class="prose dark:prose-invert">
          <p class="text-gray-600 dark:text-gray-300">
            I specialize in full stack development with a focus on scalable
            architectures. My expertise includes:
          </p>
          <ul class="space-y-1">
            <li
              v-for="skill in about.skills"
              :key="skill"
              class="flex gap-2 text-gray-600 dark:text-gray-300"
            >
              <span class="flex-shrink-0">•</span>
              <span>{{ skill }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SectionCard>
</template>
