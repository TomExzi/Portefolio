<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { about } = portfolioConfig;
const { t } = useTranslations();
const bgSvgUrl = "/assets/svg/undraw_dev-productivity_5wps.svg";
</script>

<template>
  <SectionCard
    id="about"
    class="about-section relative overflow-hidden"
    :style="{
      backgroundImage: `url(${bgSvgUrl})`,
      backgroundSize: '60%',
      backgroundPosition: 'right -5% bottom 0%',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      isolation: 'isolate',
    }"
  >
    <!-- Overlay for content readability -->
    <div class="absolute inset-0 bg-white/90 dark:bg-gray-800/95 -z-10"></div>

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
            v-for="(experience, expIndex) in about.experiences"
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
              {{ t(`about.experiences.${expIndex}.position`) }}
            </h4>
            <p
              class="text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2"
            >
              <Icon
                name="heroicons:calendar"
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
              />
              {{ t(`about.experiences.${expIndex}.company`) }} |
              {{ t(`about.experiences.${expIndex}.period`) }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in experience.description.length"
                :key="index"
                class="flex gap-2 text-gray-600 dark:text-gray-300"
              >
                <Icon
                  name="heroicons:check"
                  class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                />
                <span>{{
                  t(`about.experiences.${expIndex}.description.${index}`)
                }}</span>
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
          <ul class="space-y-1 mt-4">
            <li
              v-for="(skill, skillIndex) in about.skills"
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

<style scoped>
.about-section {
  z-index: 0;
  transition: all 0.3s ease;
}

/* Optional animation for the background pattern */
@media (prefers-reduced-motion: no-preference) {
  .about-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    z-index: -20;
    opacity: 1;
    animation: subtle-float 120s infinite alternate ease-in-out;
  }

  @keyframes subtle-float {
    0% {
      transform: scale(1) translate(0, 0);
    }
    100% {
      transform: scale(1.05) translate(1%, 1%);
    }
  }
}

:deep(.dark) .about-section::before {
  filter: brightness(0.85) hue-rotate(10deg);
}
</style>
