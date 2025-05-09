<script setup lang="ts">
import { useI18n } from "vue-i18n";

interface Service {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

const props = defineProps<{
  services?: Service[];
}>();

const { t } = useI18n();

// Use translated services
const defaultServices = computed(() => [
  {
    icon: "heroicons:cpu-chip",
    title: t("ai.services[0].title", "AI Development & Integration"),
    description: t(
      "ai.services[0].description",
      "Custom AI solutions built and integrated into your existing systems, leveraging state-of-the-art machine learning models and neural networks."
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
    color: "purple",
  },
  {
    icon: "heroicons:document-text",
    title: t("ai.services[2].title", "Document AI & Automation"),
    description: t(
      "ai.services[2].description",
      "Automate document processing, extract information, and analyze content using AI-powered OCR and document understanding systems."
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
  <div ref="servicesSection" class="w-full" aria-labelledby="services-heading">
    <div class="flex items-center gap-3 mb-8">
      <div
        class="p-2 rounded-lg bg-blue-500/20 dark:bg-blue-500/20 flex items-center justify-center"
      >
        <Icon
          name="heroicons:cpu-chip"
          class="w-6 h-6 text-blue-600 dark:text-blue-400"
        />
      </div>
      <h2
        id="services-heading"
        class="text-2xl font-bold text-slate-800 dark:text-white"
      >
        {{ t("ai.servicesTitle", "AI Services") }}
      </h2>
    </div>

    <p class="text-lg text-slate-600 dark:text-gray-300 max-w-2xl mb-12">
      {{
        t(
          "ai.servicesDescription",
          "Professional AI solutions tailored for modern business needs"
        )
      }}
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="(service, index) in servicesList"
        :key="service.title"
        class="service-card"
        :class="
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        "
        :style="{ transitionDelay: `${index * 100}ms` }"
      >
        <div class="flex items-start gap-5">
          <div
            class="p-3 rounded-xl flex items-center justify-center service-icon"
            :class="getIconClass(service.color)"
          >
            <Icon :name="service.icon" class="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h3
              class="text-xl font-semibold text-slate-800 dark:text-white mb-3"
            >
              {{ service.title }}
            </h3>
            <p class="text-slate-700 dark:text-gray-300 leading-relaxed">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  padding: 1.75rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  border: 1px solid rgba(226, 232, 240, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
}

.dark .service-card {
  background-color: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(51, 65, 85, 0.7);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1);
}

.service-card:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.08),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-color: rgba(226, 232, 240, 1);
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
  padding: 1rem;
}

.dark .service-icon {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.service-card:hover .service-icon {
  transform: scale(1.1);
}

/* Reduce motion if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .service-card,
  .service-icon {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
</style>
