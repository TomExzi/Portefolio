<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { about } = portfolioConfig;
const { t } = useI18n();
const bgSvgUrl = "/undraw_dev-productivity_5wps.svg";

// Lazy loading setup
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // Ensure we're on client-side
  if (process.client) {
    nextTick(() => {
      try {
        if (sectionRef.value) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                isVisible.value = entry.isIntersecting;
              });
            },
            { threshold: 0.1, rootMargin: "200px" }
          );

          observer.observe(sectionRef.value);

          // Cleanup
          onBeforeUnmount(() => {
            if (observer) {
              observer.disconnect();
            }
          });
        } else {
          // Fallback when ref is not available
          isVisible.value = true;
        }
      } catch (error) {
        console.error("IntersectionObserver error:", error);
        // Fallback - always show image
        isVisible.value = true;
      }
    });
  } else {
    // Fallback for SSR
    isVisible.value = true;
  }
});
</script>

<template>
  <SectionCard
    id="about"
    ref="sectionRef"
    class="about-section relative overflow-hidden"
  >
    <!-- SVG Background Image with img tag -->
    <div class="absolute inset-0 -z-20 w-full h-full">
      <img
        v-if="isVisible"
        :src="bgSvgUrl"
        alt="Background pattern"
        width="1000"
        height="1000"
        loading="lazy"
        class="w-full h-full opacity-0 transition-opacity duration-500 dark:opacity-10 backdrop-blur-sm filter blur-sm"
        :class="{ 'opacity-15': isVisible }"
      />
    </div>

    <!-- Add semi-transparent overlay for better text contrast -->

    <div class="flex items-center gap-3 mb-12">
      <Icon
        name="heroicons:user"
        class="w-7 h-7 text-blue-600 dark:text-blue-400"
      />
      <h2
        class="text-3xl font-bold text-gray-900 dark:text-slate-100 text-shadow-dark"
      >
        {{ t("about.title") }}
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <div class="flex items-center gap-2 mb-6">
          <Icon
            name="heroicons:briefcase"
            class="w-6 h-6 text-blue-600 dark:text-blue-400"
          />
          <h3
            class="text-2xl font-semibold text-gray-800 dark:text-slate-100 text-shadow-dark"
          >
            {{ t("about.experience") }}
          </h3>
        </div>
        <div class="space-y-8">
          <div
            v-for="(experience, expIndex) in about.experiences"
            :key="experience.company"
            class="pl-4 border-l-2 border-blue-200 dark:border-slate-600"
          >
            <h4
              class="text-xl font-medium text-gray-800 dark:text-amber-50 flex items-center gap-2 text-shadow-dark"
            >
              <Icon
                name="heroicons:building-office"
                class="w-5 h-5 text-blue-600 dark:text-amber-400"
              />
              {{ t(`about.experiences.${expIndex}.position`) }}
            </h4>
            <p
              class="text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2"
            >
              <Icon
                name="heroicons:calendar"
                class="w-4 h-4 text-gray-500 dark:text-slate-300"
              />
              {{ t(`about.experiences.${expIndex}.company`) }} |
              {{ t(`about.experiences.${expIndex}.period`) }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in experience.description.length"
                :key="index"
                class="flex gap-2 text-gray-700 dark:text-slate-100"
              >
                <Icon
                  name="heroicons:check"
                  class="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5"
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
          <h3
            class="text-2xl font-semibold text-gray-800 dark:text-slate-100 text-shadow-dark"
          >
            {{ t("about.skillsTechnologies") }}
          </h3>
        </div>
        <div class="prose dark:prose-invert">
          <ul class="space-y-1 mt-4">
            <li
              v-for="(skill, skillIndex) in about.skills"
              :key="skill"
              class="flex gap-2 text-gray-700 dark:text-slate-100"
            >
              <Icon
                name="heroicons:star"
                class="w-5 h-5 text-yellow-500 dark:text-yellow-300 flex-shrink-0 mt-0.5"
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
  position: relative;
  width: 100%;
  height: 100%;
}

.text-shadow {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 4px rgba(255, 255, 255, 0.3);
}

.text-shadow-dark {
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* Optional animation for the background pattern */
@media (prefers-reduced-motion: no-preference) {
  .about-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: inherit;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -20;
    opacity: 0.2;
    animation: subtle-float 120s infinite alternate ease-in-out;
    filter: blur(2px);
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
  filter: brightness(0.8) hue-rotate(10deg);
  opacity: 0.1;
}
</style>
