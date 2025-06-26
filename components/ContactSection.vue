<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { contact } = portfolioConfig;
const { t } = useI18n();
const contactBgUrl = "/assets/images/krakenimages-376KN_ISplE-unsplash.jpg";
const isVisible = ref(false);

// Lazy loading setup - fix by using template ref
const sectionRef = ref<HTMLElement | null>(null);

// Check for client-side
const isClient = typeof window !== "undefined";

onMounted(() => {
  // Ensure we're on client-side
  if (isClient) {
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
  <div
    ref="sectionRef"
    :class="{ 'opacity-0': !isVisible }"
    class="transition-opacity duration-1000"
  >
    <div
      class="relative rounded-3xl overflow-hidden max-w-[1380px] mx-auto shadow-2xl"
    >
      <!-- Background image -->
      <img
        v-if="isVisible"
        :src="contactBgUrl"
        alt="Contact background image"
        width="1920"
        height="1080"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/60"></div>

      <!-- Content -->
      <div class="relative z-10 py-24 px-8 md:px-12 lg:px-20">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
            {{ t("contact.title") }}
          </h2>
          <p class="text-xl md:text-2xl text-white max-w-4xl mx-auto">
            {{ t("contact.intro") }}
          </p>
        </div>

        <!-- Contact items -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto"
        >
          <!-- Email -->
          <NuxtLink
            :to="`mailto:${contact.email}`"
            external
            target="_blank"
            class="bg-gray-900/60 hover:bg-gray-800/80 text-white p-8 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-lg mb-5 shadow-lg"
            >
              <Icon
                name="mdi:email"
                class="h-10 w-10 text-white group-hover:scale-110 transition-all duration-200"
                :class="{ 'group-hover:text-red-400': true }"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-2">
              {{ t("contact.email") }}
            </h3>
            <p class="text-gray-300">{{ contact.email }}</p>
          </NuxtLink>

          <!-- LinkedIn -->
          <NuxtLink
            :to="contact.linkedin"
            external
            target="_blank"
            class="bg-gray-900/60 hover:bg-gray-800/80 text-white p-8 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-blue-600 to-cyan-600 p-5 rounded-lg mb-5 shadow-lg"
            >
              <Icon
                name="mdi:linkedin"
                class="h-10 w-10 text-white group-hover:scale-110 transition-all duration-200"
                :class="{ 'group-hover:text-blue-300': true }"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-2">LinkedIn</h3>
            <p class="text-gray-300">Connect with me</p>
          </NuxtLink>

          <!-- GitHub -->
          <NuxtLink
            :to="contact.github"
            external
            target="_blank"
            class="bg-gray-900/60 hover:bg-gray-800/80 text-white p-8 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 group"
          >
            <div
              class="bg-gradient-to-br from-purple-700 to-indigo-900 p-5 rounded-lg mb-5 shadow-lg"
            >
              <Icon
                name="mdi:github"
                class="h-10 w-10 text-white group-hover:scale-110 transition-all duration-200"
                :class="{ 'group-hover:text-purple-300': true }"
              />
            </div>
            <h3 class="text-2xl font-semibold mb-2">GitHub</h3>
            <p class="text-gray-300">View my repositories</p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-section {
  z-index: 0;
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: auto;
  border-radius: 0.75rem;
  box-shadow: 0 15px 35px -5px rgba(0, 0, 0, 0.3);
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

/* Glow effects for icons */
.from-indigo-600 {
  box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}

.from-blue-600 {
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.5);
}

.from-purple-700 {
  box-shadow: 0 0 15px rgba(126, 34, 206, 0.5);
}

.group:hover .from-indigo-600 {
  box-shadow: 0 0 25px rgba(129, 140, 248, 0.6);
}

.group:hover .from-blue-600 {
  box-shadow: 0 0 25px rgba(59, 130, 246, 0.6);
}

.group:hover .from-purple-700 {
  box-shadow: 0 0 25px rgba(147, 51, 234, 0.7);
}
</style>
