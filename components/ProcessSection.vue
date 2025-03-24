<script setup lang="ts">
// Use the preferred translation composable for consistency
const { t } = useTranslations();

// Add reactivity to ensure component updates when language changes
const sectionTitle = computed(() => t("process.title"));
const planTitle = computed(() => t("process.plan.title"));
const planDescription = computed(() => t("process.plan.description"));
const buildTitle = computed(() => t("process.build.title"));
const buildDescription = computed(() => t("process.build.description"));
const scaleTitle = computed(() => t("process.scale.title"));
const scaleDescription = computed(() => t("process.scale.description"));

// Background image path
const backgroundImageUrl =
  "/assets/images/daniel-mccullough-HtBlQdxfG9k-unsplash.jpg";
</script>

<template>
  <section
    id="process"
    class="py-16 process-section relative overflow-hidden"
    :style="{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      isolation: 'isolate',
    }"
  >
    <!-- Background overlay with reduced opacity -->
    <div
      class="absolute inset-0 bg-gray-50/60 dark:bg-gray-900/75 backdrop-blur-[1px] -z-10"
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold mb-6 font-display process-title"
        >
          {{ sectionTitle }}
        </h2>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 process-cards dark:text-white"
      >
        <!-- Plan Card -->
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 process-card plan-card"
        >
          <div
            class="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto process-icon"
          >
            <Icon
              name="heroicons:cube-transparent"
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 class="text-xl font-bold text-center mb-4">
            {{ planTitle }}
          </h3>
          <p class="text-gray-800 dark:text-gray-200 text-center">
            {{ planDescription }}
          </p>
        </div>

        <!-- Build Card -->
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 process-card build-card"
        >
          <div
            class="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto process-icon"
          >
            <Icon
              name="heroicons:code-bracket"
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 class="text-xl font-bold text-center mb-4">
            {{ buildTitle }}
          </h3>
          <p class="text-gray-800 dark:text-gray-200 text-center">
            {{ buildDescription }}
          </p>
        </div>

        <!-- Scale Card -->
        <div
          class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md p-6 process-card scale-card"
        >
          <div
            class="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 mx-auto process-icon"
          >
            <Icon
              name="heroicons:arrow-trending-up"
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
            />
          </div>
          <h3 class="text-xl font-bold text-center mb-4">
            {{ scaleTitle }}
          </h3>
          <p class="text-gray-800 dark:text-gray-200 text-center">
            {{ scaleDescription }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  position: relative;
  z-index: 0;
}

/* Enhanced animation for the background */
@media (prefers-reduced-motion: no-preference) {
  .process-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: inherit;
    background-size: inherit;
    background-position: inherit;
    background-repeat: inherit;
    z-index: -20;
    opacity: 1;
    animation: subtle-pan 180s infinite alternate ease-in-out;
    filter: contrast(1.2) saturate(1.2);
  }

  @keyframes subtle-pan {
    0% {
      transform: scale(1.05) translate(0%, 0%);
    }
    100% {
      transform: scale(1.05) translate(-2%, 0%);
    }
  }
}

.process-title {
  color: #1e40af;
  position: relative;
  display: inline-block;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
}

.process-title::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #3b82f6;
  border-radius: 3px;
}

.process-cards {
  position: relative;
}

.process-cards::before {
  content: "";
  position: absolute;
  top: 60px;
  left: 25%;
  right: 25%;
  height: 2px;
  background: rgba(229, 231, 235, 0.7);
  z-index: 0;
}

.process-card {
  position: relative;
  transition: all 0.3s ease;
  z-index: 1;
  overflow: hidden;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.process-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #1e40af, #3b82f6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.process-card:hover::before {
  opacity: 1;
}

.process-icon {
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.process-card:hover .process-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, #1e40af, #3b82f6);
}

.process-card:hover .process-icon svg {
  color: white !important;
}

.plan-card {
  animation: fadeInLeft 0.8s ease-out;
}

.build-card {
  animation: fadeInUp 1s ease-out;
}

.scale-card {
  animation: fadeInRight 1.2s ease-out;
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dark .process-title {
  color: #60a5fa;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
}

.dark .process-title::after {
  background: #60a5fa;
}

.dark .process-cards::before {
  background: rgba(55, 65, 81, 0.7);
}

.dark .process-card::before {
  background: linear-gradient(90deg, #60a5fa, #93c5fd);
}

.dark .process-card:hover .process-icon {
  background: linear-gradient(135deg, #2563eb, #60a5fa);
}

/* Dark mode adjustments */
:deep(.dark) .process-section::before {
  filter: brightness(0.8) saturate(1.1) contrast(1.2);
}

@media (prefers-reduced-motion) {
  .plan-card,
  .build-card,
  .scale-card {
    animation: none;
  }

  .process-section::before {
    animation: none;
  }
}

@media (max-width: 768px) {
  .process-cards::before {
    display: none;
  }
}
</style>
