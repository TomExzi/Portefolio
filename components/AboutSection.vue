<script setup lang="ts">
const { experiences } = usePortfolioData();
</script>

<template>
  <SectionCard id="about">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">About Me</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h3 class="text-2xl font-semibold mb-6 dark:text-white">Experience</h3>
        <div class="space-y-8">
          <div
            v-for="experience in experiences"
            :key="experience.company"
            class="border-l-2 border-blue-600 pl-4"
          >
            <h4 class="text-xl font-medium dark:text-white">
              {{ experience.position }}
            </h4>
            <p class="text-gray-600 dark:text-gray-400 mb-2">
              {{ experience.company }} | {{ experience.period }}
            </p>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-300">
              <li v-for="(item, index) in experience.description" :key="index">
                {{ item }}
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
            I specialize in frontend development with a focus on Vue.js and its
            ecosystem. My expertise includes:
          </p>
          <ul class="list-disc list-inside text-gray-600 dark:text-gray-300">
            <li>Vue.js & Nuxt.js</li>
            <li>TypeScript</li>
            <li>TailwindCSS</li>
            <li>State Management (Pinia, Vuex)</li>
            <li>Testing (Vitest, Jest)</li>
            <li>CI/CD & DevOps</li>
          </ul>
        </div>
      </div>
    </div>
  </SectionCard>
</template>
