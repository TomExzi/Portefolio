<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { about } = portfolioConfig;
const { t } = useTranslations();
</script>

<template>
  <SectionCard id="about">
    <div class="flex items-center gap-3 mb-12">
      <Icon
        name="heroicons:user"
        class="w-7 h-7 text-blue-600 dark:text-blue-400"
      />
      <h2 class="text-3xl font-bold dark:text-white">{{ t("about.title") }}</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div class="flex items-center gap-2 mb-6">
          <Icon
            name="heroicons:briefcase"
            class="w-6 h-6 text-blue-600 dark:text-blue-400"
          />
          <h3 class="text-2xl font-semibold dark:text-white">
            {{ t("about.experience") }}
          </h3>
        </div>
        <div class="space-y-8">
          <div
            v-for="experience in about.experiences"
            :key="experience.company"
            class="pl-4 border-l-2 border-blue-200 dark:border-blue-800"
          >
            <h4
              class="text-xl font-medium dark:text-white flex items-center gap-2"
            >
              <Icon
                name="heroicons:building-office"
                class="w-5 h-5 text-blue-600 dark:text-blue-400"
              />
              {{ experience.position }}
            </h4>
            <p
              class="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2"
            >
              <Icon
                name="heroicons:calendar"
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
              {{ experience.company }} | {{ experience.period }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in experience.description"
                :key="index"
                class="flex gap-2 text-gray-600 dark:text-gray-300"
              >
                <Icon
                  name="heroicons:check"
                  class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center gap-2 mb-6">
          <Icon
            name="heroicons:code-bracket"
            class="w-6 h-6 text-blue-600 dark:text-blue-400"
          />
          <h3 class="text-2xl font-semibold dark:text-white">
            {{ t("about.skillsTechnologies") }}
          </h3>
        </div>
        <div class="prose dark:prose-invert">
          <p class="text-gray-600 dark:text-gray-300 flex items-start gap-2">
            <Icon
              name="heroicons:light-bulb"
              class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            />
            <span>{{ t("about.specializeIn") }}</span>
          </p>
          <ul class="space-y-1 mt-4">
            <li
              v-for="skill in about.skills"
              :key="skill"
              class="flex gap-2 text-gray-600 dark:text-gray-300"
            >
              <Icon
                name="heroicons:star"
                class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
              />
              <span>{{ skill }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </SectionCard>
</template>
