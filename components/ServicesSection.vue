<script setup lang="ts">
interface Service {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

const props = defineProps<{
  services?: Service[];
}>();

// Default services if none provided
const defaultServices = [
  {
    icon: "heroicons:cpu-chip",
    title: "AI Development & Integration",
    description:
      "Custom AI solutions built and integrated into your existing systems, leveraging state-of-the-art machine learning models and neural networks.",
    color: "blue",
  },
  {
    icon: "heroicons:chat-bubble-left-right",
    title: "Natural Language Processing",
    description:
      "Implement intelligent chatbots, content generation, and text analysis systems using advanced NLP models and transformers.",
    color: "purple",
  },
  {
    icon: "heroicons:document-text",
    title: "Document AI & Automation",
    description:
      "Automate document processing, extract information, and analyze content using AI-powered OCR and document understanding systems.",
    color: "indigo",
  },
  {
    icon: "heroicons:presentation-chart-line",
    title: "Predictive Analytics",
    description:
      "Leverage AI for business intelligence, forecasting, and decision-making through advanced data analysis and machine learning models.",
    color: "cyan",
  },
];

const servicesList = computed(() => props.services || defaultServices);

// Define background color classes based on service color
function getBackgroundClass(color?: string) {
  switch (color) {
    case "purple":
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    case "indigo":
      return "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
    case "cyan":
      return "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400";
    default:
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
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
  <section
    id="services"
    ref="servicesSection"
    class="w-full px-4 py-16 bg-white dark:bg-gray-800"
    aria-labelledby="services-heading"
  >
    <div class="max-w-6xl mx-auto">
      <div
        class="text-center mb-16 transform transition-all duration-700"
        :class="
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        "
      >
        <h2
          id="services-heading"
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          AI Services
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Professional AI solutions tailored for modern business needs
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div
          v-for="(service, index) in servicesList"
          :key="service.title"
          class="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          :class="
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          "
          :style="{ transitionDelay: `${index * 100}ms` }"
        >
          <div class="flex items-start gap-4">
            <div
              class="p-3 rounded-xl flex items-center justify-center"
              :class="getBackgroundClass(service.color)"
            >
              <Icon :name="service.icon" class="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3
                class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
              >
                {{ service.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Using CSS variables for better performance and customization */
:root {
  --card-transition-duration: 300ms;
  --card-hover-scale: 1.02;
  --card-shadow-hover: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Performance optimization with hardware acceleration */
.transform {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Reduce motion if user prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  .transform {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
</style>
