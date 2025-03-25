<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { contact } = portfolioConfig;
const { t } = useI18n();
const contactBgUrl = "/assets/images/krakenimages-376KN_ISplE-unsplash.jpg";
const isVisible = ref(false);

// Lazy loading setup - fix by using template ref
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

const contactItems = [
  {
    icon: "mdi:email",
    text: t("contact.email"),
    link: `mailto:${contact.email}`,
    external: true,
    hoverColor: "text-red-500",
  },
  {
    icon: "mdi:github",
    text: "GitHub",
    link: contact.github,
    external: true,
    hoverColor: "text-purple-500",
  },
  {
    icon: "mdi:linkedin",
    text: "LinkedIn",
    link: contact.linkedin,
    external: true,
    hoverColor: "text-purple-500",
  },
];
</script>

<template>
  <SectionCard
    id="contact"
    class="contact-section relative overflow-hidden"
    ref="sectionRef"
  >
    <!-- Full-width/height wrapper with NuxtImg -->
    <div class="absolute inset-0 w-full h-full -z-30">
      <!-- Background Image using NuxtImg for optimization -->
      <NuxtImg
        :src="contactBgUrl"
        format="webp"
        width="1920"
        height="1080"
        loading="lazy"
        quality="80"
        placeholder
        alt="Contact background"
        class="absolute inset-0 w-full h-full object-cover -z-20 opacity-0 transition-opacity duration-500 dark:opacity-70 contrast-120 saturate-120 brightness-105"
        :class="{ 'opacity-80': isVisible, 'dark:opacity-70': isVisible }"
      />

      <!-- Background overlay for better readability, especially in dark mode -->
      <div class="absolute inset-0 dark:bg-dark-background/70 -z-10"></div>
    </div>

    <div class="flex items-center gap-3 mb-8 relative z-10">
      <Icon name="mdi:email" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
      <h2 class="text-3xl font-bold dark:text-black">
        {{ t("contact.title") }}
      </h2>
    </div>

    <div class="max-w-3xl mx-auto relative z-10">
      <div
        class="bg-white/90 dark:bg-[#1a202c]/95 rounded-2xl shadow-xl overflow-hidden"
      >
        <div class="p-8">
          <p
            class="text-lg text-gray-700 dark:text-gray-200 mb-8 flex items-start gap-3"
          >
            <Icon
              name="heroicons:chat-bubble-left-right"
              class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
            />
            <span>{{ t("contact.intro") }}</span>
          </p>

          <h3
            class="text-xl font-semibold mb-6 dark:text-white flex items-center gap-2"
          >
            <Icon
              name="heroicons:link"
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
            />
            {{ t("contact.social") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <NuxtLink
              v-for="item in contactItems"
              :key="item.link"
              :to="item.link"
              :external="item.external"
              target="_blank"
              class="flex flex-col items-center text-center hover:translate-y-[-2px] transition-transform group py-4 cursor-pointer bg-white/90 dark:bg-[#1a202c]/95 rounded-xl hover:shadow-md"
            >
              <Icon
                :name="item.icon"
                class="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-200 mb-3 pointer-events-none"
                :class="{
                  'group-hover:text-red-500': item.icon === 'mdi:email',
                  'group-hover:text-purple-500': item.icon === 'mdi:github',
                  'group-hover:text-blue-500': item.icon === 'mdi:linkedin',
                }"
              />
              <span
                class="text-lg font-medium text-gray-700 dark:text-gray-200 pointer-events-none"
                >{{ item.text }}</span
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<style scoped>
.contact-section {
  z-index: 0;
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
}

/* Prevent text selection and cursor issues */
::selection {
  background: transparent;
}

.opacity-80 {
  opacity: 0.8;
}

.opacity-70 {
  opacity: 0.7;
}

.contrast-120 {
  filter: contrast(1.2);
}

.saturate-120 {
  filter: saturate(1.2);
}

.brightness-105 {
  filter: brightness(1.05);
}
</style>
