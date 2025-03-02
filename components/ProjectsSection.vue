<script setup lang="ts">
const currentIndex = ref(0);
const currentTab = ref("all"); // 'all', 'personal', 'client'

interface Project {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  category: "DataRemediation" | "InfrastructurePortal" | "Mastering";
  // For future use:
  // description?: string;
  // technologies?: string[];
}

const tabs = [
  { id: "all", label: "All Projects" },
  { id: "DataRemediation", label: "Data Remediation" },
  { id: "InfrastructurePortal", label: "Infrastructure Portal" },
  { id: "Mastering", label: "Mastering" },
];

const allProjects = ref<Project[]>([]);

// Function to get project title based on category
function getProjectTitle(category: string) {
  switch (category) {
    case "DataRemediation":
      return "Data Remediation";
    case "InfrastructurePortal":
      return "Infrastructure Portal";
    case "Mastering":
      return "Mastering";
    default:
      return category;
  }
}

// Load images from the projects folders
onMounted(async () => {
  try {
    const dataRemediationFiles = import.meta.glob(
      "/public/projects/DataRemediation/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );
    const infrastructureFiles = import.meta.glob(
      "/public/projects/InfrastructurePortal/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );
    const masteringFiles = import.meta.glob(
      "/public/projects/Mastering/*.{jpg,jpeg,png,webp}",
      { eager: true }
    );

    const dataRemediationProjects = Object.keys(dataRemediationFiles).map(
      (path, index) => ({
        id: `data-${index + 1}`,
        title: "Data Remediation",
        type: "Project",
        imageUrl: path.replace("/public", ""),
        category: "DataRemediation" as const,
      })
    );

    const infrastructureProjects = Object.keys(infrastructureFiles).map(
      (path, index) => ({
        id: `infra-${index + 1}`,
        title: "Infrastructure Portal",
        type: "Project",
        imageUrl: path.replace("/public", ""),
        category: "InfrastructurePortal" as const,
      })
    );

    const masteringProjects = Object.keys(masteringFiles).map(
      (path, index) => ({
        id: `master-${index + 1}`,
        title: "Mastering",
        type: "Project",
        imageUrl: path.replace("/public", ""),
        category: "Mastering" as const,
      })
    );

    allProjects.value = [
      ...dataRemediationProjects,
      ...infrastructureProjects,
      ...masteringProjects,
    ];
  } catch (error) {
    console.error("Error loading project images:", error);
  }
});

const filteredProjects = computed(() => {
  if (currentTab.value === "all") return allProjects.value;
  return allProjects.value.filter(
    (project) => project.category === currentTab.value
  );
});

// Reset currentIndex when changing tabs
watch(currentTab, () => {
  currentIndex.value = 0;
});

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % filteredProjects.value.length;
};

const prev = () => {
  currentIndex.value =
    currentIndex.value === 0
      ? filteredProjects.value.length - 1
      : currentIndex.value - 1;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};
</script>

<template>
  <SectionCard id="projects">
    <h2 class="text-2xl font-bold mb-6 dark:text-white">Featured Projects</h2>

    <!-- Tabs -->
    <div class="flex justify-center mb-8 px-4 overflow-x-auto">
      <div
        class="inline-flex p-1 space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          class="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0"
          :class="[
            currentTab === tab.id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>

    <div class="relative max-w-6xl mx-auto space-y-8">
      <!-- Slider -->
      <div class="overflow-hidden relative rounded-xl">
        <NuxtTransitionGroup
          name="slide"
          tag="div"
          class="relative w-full"
          mode="out-in"
        >
          <article
            v-for="(project, index) in filteredProjects"
            :key="project.id"
            v-show="index === currentIndex"
            class="w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <!-- Project Title -->
            <div class="p-6 border-b border-gray-100 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <button
                  @click="currentTab = project.category"
                  class="text-xl md:text-2xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
                >
                  {{ project.title }}
                </button>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ project.type }}
                </span>
              </div>
            </div>

            <!-- Project Image -->
            <img
              :src="project.imageUrl"
              :alt="project.title"
              class="w-full h-[300px] md:h-[500px] object-contain bg-gray-100 dark:bg-gray-900"
            />
          </article>
        </NuxtTransitionGroup>

        <!-- Navigation Buttons -->
        <div
          class="absolute inset-0 flex items-center justify-between pointer-events-none"
        >
          <button
            v-if="filteredProjects.length > 1"
            @click="prev"
            class="pointer-events-auto ml-2 md:ml-4 p-1.5 md:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors transform hover:scale-110"
            aria-label="Previous project"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            v-if="filteredProjects.length > 1"
            @click="next"
            class="pointer-events-auto mr-2 md:mr-4 p-1.5 md:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors transform hover:scale-110"
            aria-label="Next project"
          >
            <Icon
              name="heroicons:chevron-right"
              class="w-4 h-4 md:w-6 md:h-6"
            />
          </button>
        </div>
      </div>

      <!-- Dots Navigation -->
      <div
        v-if="filteredProjects.length > 1"
        class="flex justify-center gap-1 md:gap-2 px-4"
      >
        <button
          v-for="(_, index) in filteredProjects"
          :key="index"
          @click="goToSlide(index)"
          class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300"
          :class="[
            index === currentIndex
              ? 'bg-blue-600 w-3 md:w-4'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
          ]"
          :aria-label="`Go to project ${index + 1}`"
        />
      </div>

      <!-- Project Info - Commented out for future use -->
      <!--
      <div
        v-for="(project, index) in projects"
        :key="`info-${project.id}`"
        v-show="index === currentIndex"
        class="max-w-3xl mx-auto space-y-6"
      >
        <div class="flex flex-wrap justify-center gap-2">
          <span
            v-for="tech in project.technologies"
            :key="tech"
            class="px-3 py-1.5 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full shadow-sm"
          >
            {{ tech }}
          </span>
        </div>

        <p class="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center">
          {{ project.description }}
        </p>
      </div>
      -->
    </div>
  </SectionCard>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

/* Add responsive styles for navigation */
@media (max-width: 640px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s ease;
  }
}
</style>
