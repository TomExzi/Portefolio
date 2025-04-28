<script setup lang="ts">
import { useI18n } from "vue-i18n";

interface Example {
  title: string;
  features: string[];
  icon: string;
}

const { t } = useI18n();

// Enhanced examples with icons for better visual cues and translations
const examples = computed(() => [
  {
    title: t("ai.examples[0].title", "Email Management"),
    icon: "heroicons:envelope",
    features: [
      t(
        "ai.examples[0].features[0]",
        "Automatic email categorization and priority sorting"
      ),
      t(
        "ai.examples[0].features[1]",
        "Smart response suggestions based on email content"
      ),
      t(
        "ai.examples[0].features[2]",
        "Automated meeting scheduling and follow-ups"
      ),
    ],
  },
  {
    title: t("ai.examples[1].title", "Document Processing"),
    icon: "heroicons:document-duplicate",
    features: [
      t(
        "ai.examples[1].features[0]",
        "Automated data extraction from invoices and receipts"
      ),
      t(
        "ai.examples[1].features[1]",
        "Contract analysis and key information highlighting"
      ),
      t("ai.examples[1].features[2]", "PDF processing and data structuring"),
    ],
  },
  {
    title: t("ai.examples[2].title", "Customer Service"),
    icon: "heroicons:chat-bubble-bottom-center-text",
    features: [
      t("ai.examples[2].features[0]", "24/7 AI-powered chatbot support"),
      t(
        "ai.examples[2].features[1]",
        "Automatic ticket categorization and routing"
      ),
      t(
        "ai.examples[2].features[2]",
        "Sentiment analysis for customer feedback"
      ),
    ],
  },
  {
    title: t("ai.examples[3].title", "Content Generation"),
    icon: "heroicons:pencil-square",
    features: [
      t(
        "ai.examples[3].features[0]",
        "Automated blog post and article writing"
      ),
      t(
        "ai.examples[3].features[1]",
        "Social media content creation and scheduling"
      ),
      t(
        "ai.examples[3].features[2]",
        "Product description and marketing copy generation"
      ),
    ],
  },
]);

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
        {{ t("ai.automationTitle", "AI Automation Examples") }}
      </h2>
    </div>

    <p class="text-lg text-gray-300 max-w-2xl mb-12">
      {{
        t(
          "ai.automationDescription",
          "Discover how AI can transform your business operations"
        )
      }}
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
