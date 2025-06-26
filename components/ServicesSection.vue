<script setup lang="ts">
// Remove vue-i18n import - using custom useI18n composable

interface Service {
  icon: string;
  title: string;
  description: string;
  shortDescription?: string;
  color?: string;
}

const props = defineProps<{
  services?: Service[];
}>();

const { t } = useI18n();

// Use translated services with shorter mobile descriptions
const defaultServices = computed(() => [
  {
    icon: "heroicons:cpu-chip",
    title: t("ai.services[0].title", "AI Development & Integration"),
    description: t(
      "ai.services[0].description",
      "Custom AI solutions built and integrated into your existing systems, leveraging state-of-the-art machine learning models and neural networks."
    ),
    shortDescription: t(
      "ai.services[0].shortDescription",
      "Custom AI solutions integrated into your existing systems using advanced ML models."
    ),
    color: "blue",
  },
  {
    icon: "heroicons:chat-bubble-left-right",
    title: t("ai.services[1].title", "Natural Language Processing"),
    description: t(
      "ai.services[1].description",
      "Implement intelligent chatbots, content generation, and text analysis systems using advanced NLP models and transformers."
    ),
    shortDescription: t(
      "ai.services[1].shortDescription",
      "Intelligent chatbots and content generation using advanced NLP models."
    ),
    color: "purple",
  },
  {
    icon: "heroicons:document-text",
    title: t("ai.services[2].title", "Document AI & Automation"),
    description: t(
      "ai.services[2].description",
      "Automate document processing, extract information, and analyze content using AI-powered OCR and document understanding systems."
    ),
    shortDescription: t(
      "ai.services[2].shortDescription",
      "Automate document processing and information extraction with AI-powered OCR."
    ),
    color: "indigo",
  },
  {
    icon: "heroicons:presentation-chart-line",
    title: t("ai.services[3].title", "Predictive Analytics"),
    description: t(
      "ai.services[3].description",
      "Leverage AI for business intelligence, forecasting, and decision-making through advanced data analysis and machine learning models."
    ),
    shortDescription: t(
      "ai.services[3].shortDescription",
      "AI-powered business intelligence and forecasting for better decision-making."
    ),
    color: "cyan",
  },
]);

const servicesList = computed(() => props.services || defaultServices.value);

// Define icon class based on service color
function getIconClass(color?: string) {
  switch (color) {
    case "purple":
      return "bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300";
    case "indigo":
      return "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300";
    case "cyan":
      return "bg-cyan-50 dark:bg-cyan-900/50 text-cyan-600 dark:text-cyan-300";
    default:
      return "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300";
  }
}

// Intersection observer for reveal animation
const servicesSection = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!servicesSection.value) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    {
      threshold: 0.1,
    }
  );

  observer.observe(servicesSection.value);
});
</script>

<template>
  <div
    ref="servicesSection"
    class="w-full relative py-6 sm:py-8 md:py-16"
    aria-labelledby="services-heading"
  >
    <!-- Remove background image and overlay logic here -->
    <div class="px-3 sm:px-4 md:px-8 lg:px-16">
      <div class="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <div
          class="p-1.5 sm:p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/20 flex items-center justify-center"
        >
          <Icon
            name="heroicons:cpu-chip"
            class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400"
          />
        </div>
        <h2
          id="services-heading"
          class="ai-services-title text-xl sm:text-2xl font-bold"
          style="
            color: #000000 !important;
            --tw-text-opacity: 1;
            color: rgb(0 0 0 / var(--tw-text-opacity)) !important;
          "
        >
          <span style="color: #000000 !important">{{
            t("ai.servicesTitle", "AI Services")
          }}</span>
        </h2>
      </div>

      <p
        class="text-base sm:text-lg font-medium text-slate-500 dark:text-slate-400 max-w-2xl mb-8 sm:mb-12 leading-relaxed"
      >
        {{
          t(
            "ai.servicesDescription",
            "Professional AI solutions tailored for modern business needs"
          )
        }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div
          v-for="(service, index) in servicesList"
          :key="service.title"
          class="service-card"
          :class="
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          "
          :style="{
            transitionDelay: `${index * 100}ms`,
          }"
        >
          <div class="flex items-start gap-3 sm:gap-4 md:gap-5">
            <div
              class="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex items-center justify-center service-icon flex-shrink-0"
              :class="getIconClass(service.color)"
            >
              <Icon
                :name="service.icon"
                class="w-5 h-5 sm:w-6 sm:h-6"
                aria-hidden="true"
              />
            </div>
            <div class="min-w-0 flex-1 space-y-2 sm:space-y-3">
              <h3
                class="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white leading-tight"
              >
                {{ service.title }}
              </h3>
              <!-- Show shorter description on mobile, full on larger screens -->
              <p
                class="ai-service-text text-sm sm:text-base leading-relaxed sm:hidden"
              >
                {{ service.shortDescription || service.description }}
              </p>
              <p
                class="ai-service-text hidden sm:block text-base leading-relaxed"
              >
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  padding: 1.125rem;
  border-radius: 0.75rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

/* Responsive padding for service cards */
@media (min-width: 640px) {
  .service-card {
    padding: 1.375rem;
    border-radius: 0.875rem;
  }
}

@media (min-width: 768px) {
  .service-card {
    padding: 1.625rem;
    border-radius: 1rem;
  }
}

@media (min-width: 1024px) {
  .service-card {
    padding: 1.75rem;
  }
}

.dark .service-card {
  background-color: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(51, 65, 85, 0.7);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-3px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.08),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(226, 232, 240, 1);
}

/* Reduce hover effects on mobile for better performance */
@media (max-width: 767px) {
  .service-card:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.06),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
}

.dark .service-card:hover {
  background-color: rgba(30, 41, 59, 0.9);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2);
  border-color: rgba(51, 65, 85, 0.9);
}

.service-icon {
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.dark .service-icon {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.service-card:hover .service-icon {
  transform: scale(1.05);
}

/* Reduce icon scaling on mobile */
@media (max-width: 767px) {
  .service-card:hover .service-icon {
    transform: scale(1.02);
  }
}

/* Reduce motion if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-icon {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}

/* Better text spacing and readability on mobile */
@media (max-width: 479px) {
  .service-card {
    padding: 1rem;
  }

  .service-card h3 {
    font-size: 1rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .service-card p {
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgb(71 85 105);
  }

  html.dark .ai-service-text {
    color: white !important;
  }
}

/* Improved text contrast and spacing */
.service-card h3 {
  word-break: break-word;
  hyphens: auto;
}

.service-card p {
  word-break: break-word;
  hyphens: auto;
  max-width: 100%;
}

/* Remove all old paragraph styling to prevent conflicts */

/* AI Services title - always black with maximum specificity */
#services-heading,
.ai-services-title,
html #services-heading,
html .ai-services-title,
html.dark #services-heading,
html.dark .ai-services-title,
section #services-heading,
section .ai-services-title {
  color: #000000 !important; /* Force pure black in all modes */
  --tw-text-opacity: 1 !important;
}

/* Even more aggressive override */
h2#services-heading {
  color: #000000 !important;
}

/* AI Service text using CSS variables from main.css */
.ai-service-text {
  color: rgb(
    var(--color-light-secondary)
  ); /* Light mode: secondary text color */
}

html.dark .ai-service-text {
  color: white !important; /* Dark mode: pure white for readability */
}
</style>
