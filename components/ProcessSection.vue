<script setup lang="ts">
// No additional imports needed
</script>

<template>
  <section
    id="process"
    class="py-16 bg-gray-50 dark:bg-gray-900 process-section"
  >
    <div class="container mx-auto px-4">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold mb-6 font-display process-title"
        >
          {{ $t("process.title") }}
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 process-cards">
        <!-- Plan Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 process-card plan-card"
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
            {{ $t("process.plan.title") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center">
            {{ $t("process.plan.description") }}
          </p>
        </div>

        <!-- Build Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 process-card build-card"
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
            {{ $t("process.build.title") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center">
            {{ $t("process.build.description") }}
          </p>
        </div>

        <!-- Scale Card -->
        <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 process-card scale-card"
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
            {{ $t("process.scale.title") }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-center">
            {{ $t("process.scale.description") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  position: relative;
}

.process-title {
  color: #1e40af;
  position: relative;
  display: inline-block;
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
  background: #e5e7eb;
  z-index: 0;
}

.process-card {
  position: relative;
  transition: all 0.3s ease;
  z-index: 1;
  overflow: hidden;
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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.process-card:hover::before {
  opacity: 1;
}

.process-icon {
  transition: all 0.3s ease;
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
}

.dark .process-title::after {
  background: #60a5fa;
}

.dark .process-cards::before {
  background: #374151;
}

.dark .process-card::before {
  background: linear-gradient(90deg, #60a5fa, #93c5fd);
}

.dark .process-card:hover .process-icon {
  background: linear-gradient(135deg, #2563eb, #60a5fa);
}

@media (prefers-reduced-motion) {
  .plan-card,
  .build-card,
  .scale-card {
    animation: none;
  }
}

@media (max-width: 768px) {
  .process-cards::before {
    display: none;
  }
}
</style>
