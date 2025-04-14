<script setup lang="ts">
interface Example {
  title: string;
  features: string[];
  icon: string;
}

// Enhanced examples with icons for better visual cues
const examples = [
  {
    title: "Email Management",
    icon: "heroicons:envelope",
    features: [
      "Automatic email categorization and priority sorting",
      "Smart response suggestions based on email content",
      "Automated meeting scheduling and follow-ups",
    ],
  },
  {
    title: "Document Processing",
    icon: "heroicons:document-duplicate",
    features: [
      "Automated data extraction from invoices and receipts",
      "Contract analysis and key information highlighting",
      "PDF processing and data structuring",
    ],
  },
  {
    title: "Customer Service",
    icon: "heroicons:chat-bubble-bottom-center-text",
    features: [
      "24/7 AI-powered chatbot support",
      "Automatic ticket categorization and routing",
      "Sentiment analysis for customer feedback",
    ],
  },
  {
    title: "Content Generation",
    icon: "heroicons:pencil-square",
    features: [
      "Automated blog post and article writing",
      "Social media content creation and scheduling",
      "Product description and marketing copy generation",
    ],
  },
];

// Intersection observer for reveal animation
const examplesSection = ref<HTMLElement | null>(null);
const isVisible = ref(false);

onMounted(() => {
  if (!examplesSection.value) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  observer.observe(examplesSection.value);
});
</script>

<template>
  <section
    id="automation-examples"
    ref="examplesSection"
    class="w-full px-4 py-16 bg-gray-50 dark:bg-gray-900"
    aria-labelledby="examples-heading"
  >
    <div class="max-w-4xl mx-auto">
      <div
        class="text-center mb-16 transform transition-all duration-700"
        :class="
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        "
      >
        <h2
          id="examples-heading"
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          AI Automation Examples
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Discover how AI can transform your business operations
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(example, index) in examples"
          :key="example.title"
          class="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group"
          :class="
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          "
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <!-- Background decoration -->
          <div
            class="absolute top-0 right-0 w-32 h-32 -mr-10 -mt-10 opacity-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 group-hover:opacity-20 transition-opacity"
          ></div>

          <!-- Icon header -->
          <div class="flex items-center gap-3 mb-4 relative">
            <div
              class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
            >
              <Icon :name="example.icon" class="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ example.title }}
            </h3>
          </div>

          <!-- Features list -->
          <ul class="space-y-3 text-gray-600 dark:text-gray-300 relative">
            <li
              v-for="(feature, featureIndex) in example.features"
              :key="feature"
              class="flex items-start gap-2 transition-all duration-300"
              :class="
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
              "
              :style="{
                transitionDelay: `${index * 150 + featureIndex * 100}ms`,
              }"
            >
              <Icon
                name="heroicons:check-circle"
                class="w-5 h-5 text-green-500 mt-1 flex-shrink-0"
                aria-hidden="true"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Modern animation helpers */
.transform {
  will-change: transform, opacity;
  backface-visibility: hidden;
}

/* Gradient animation for the decorative background */
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

/* Accessibility: Reduce motion if user prefers */
@media (prefers-reduced-motion: reduce) {
  .transform,
  .transition-all {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }

  .bg-gradient-to-br {
    animation: none !important;
  }
}
</style>
