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
  <div ref="examplesSection" class="w-full" aria-labelledby="examples-heading">
    <div class="flex items-center gap-3 mb-8">
      <div
        class="p-2 rounded-lg bg-blue-600/20 flex items-center justify-center"
      >
        <Icon
          name="heroicons:document-chart-bar"
          class="w-6 h-6 text-blue-400"
        />
      </div>
      <h2 id="examples-heading" class="text-2xl font-bold text-white">
        AI Automation Examples
      </h2>
    </div>

    <p class="text-lg text-gray-300 max-w-2xl mb-12">
      Discover how AI can transform your business operations
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="(example, index) in examples"
        :key="example.title"
        class="example-card"
        :class="
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        "
        :style="{ transitionDelay: `${index * 150}ms` }"
      >
        <!-- Header with icon -->
        <div class="flex items-center gap-4 mb-5">
          <div
            class="p-3 rounded-lg bg-blue-900/30 text-blue-400 flex-shrink-0 example-icon"
          >
            <Icon :name="example.icon" class="w-5 h-5" aria-hidden="true" />
          </div>
          <h3 class="text-xl font-semibold text-white">
            {{ example.title }}
          </h3>
        </div>

        <!-- Features list -->
        <ul class="space-y-4 pl-2">
          <li
            v-for="(feature, featureIndex) in example.features"
            :key="feature"
            class="flex items-start gap-3 transition-all duration-300"
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
            <span class="text-gray-300">{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.example-card {
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: rgba(37, 43, 69, 0.6);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
  height: 100%;
}

.example-card:hover {
  background-color: rgba(37, 43, 69, 0.9);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.example-icon {
  transition: all 0.3s ease;
}

.example-card:hover .example-icon {
  transform: scale(1.1);
}

/* Accessibility: Reduce motion if user prefers */
@media (prefers-reduced-motion: reduce) {
  .example-card,
  .example-icon,
  .transition-all {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
</style>
