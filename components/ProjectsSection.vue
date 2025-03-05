<script setup lang="ts">
import { portfolioConfig } from '~/config/portfolio.config';

type ProjectCategory = "DataRemediation" | "InfrastructurePortal" | "InformationProvider";
type TabType = ProjectCategory | "all";

const currentIndex = ref(0);
const currentTab = ref<TabType>("all");

interface Project {
  id: string;
  title: string;
  type: string;
  imageUrl: string;
  category: ProjectCategory;
  // For future use:
  // description?: string;
  // technologies?: string[];
}

const tabs = [
  { id: "all" as const, label: "All Projects" },
  { id: "DataRemediation" as const, label: "Data Remediation" },
  { id: "InfrastructurePortal" as const, label: "Infrastructure Portal" },
  { id: "InformationProvider" as const, label: "Information Provider" },
];

const allProjects = ref<Project[]>([]);

// Function to get project title based on category
function getProjectTitle(category: string) {
  switch (category) {
    case "DataRemediation":
      return "Data Remediation";
    case "InfrastructurePortal":
      return "Infrastructure Portal";
    case "InformationProvider":
      return "Information Provider";
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
    const informationProviderFiles = import.meta.glob(
      "/public/projects/InformationProvider/*.{jpg,jpeg,png,webp}",
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

    const informationProviderProjects = Object.keys(
      informationProviderFiles
    ).map((path, index) => ({
      id: `info-${index + 1}`,
      title: "Information Provider",
      type: "Project",
      imageUrl: path.replace("/public", ""),
      category: "InformationProvider" as const,
      })
    );

    allProjects.value = [
      ...dataRemediationProjects,
      ...infrastructureProjects,
      ...informationProviderProjects,
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

// Safely access project category data with type checking
const currentCategoryData = computed(() => {
  if (currentTab.value === 'all') return null;
  return portfolioConfig.projectCategories[currentTab.value as ProjectCategory];
});
</script>

<template>
  <SectionCard id="projects">
    <div class="flex items-center gap-3 mb-6">
      <Icon name="heroicons:rectangle-stack" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
      <h2 class="text-2xl font-bold dark:text-white">Featured Projects</h2>
    </div>

    <!-- Tabs -->
    <div class="flex justify-center mb-8 px-4 overflow-x-auto">
      <div
        class="inline-flex p-1 space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="currentTab = tab.id"
          tabindex="-1"
          class="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1.5"
          :class="[
            currentTab === tab.id
              ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400',
          ]"
        >
          <Icon 
            v-if="tab.id !== 'all'" 
            :name="portfolioConfig.projectCategories[tab.id as ProjectCategory].icon" 
            class="w-4 h-4" 
          />
          <Icon v-else name="heroicons:squares-2x2" class="w-4 h-4" />
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
                  tabindex="-1"
                  class="text-xl md:text-2xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-2"
                >
                  <Icon 
                    :name="portfolioConfig.projectCategories[project.category].icon" 
                    class="w-6 h-6 text-blue-600 dark:text-blue-400" 
                  />
                  {{ project.title }}
                </button>
                <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Icon name="heroicons:folder" class="w-4 h-4" />
                  {{ project.type }}
                </span>
              </div>
            </div>

            <!-- Project Image -->
            <div class="relative">
              <img
                :src="project.imageUrl"
                :alt="project.title"
                class="w-full h-[300px] md:h-[500px] object-contain bg-gray-100 dark:bg-gray-900"
              />
              <div class="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md">
                <Icon 
                  :name="portfolioConfig.projectCategories[project.category].icon" 
                  class="w-5 h-5 text-blue-600 dark:text-blue-400" 
                />
              </div>
            </div>
          </article>
        </NuxtTransitionGroup>

        <!-- Navigation Buttons -->
        <div
          class="absolute inset-0 flex items-center justify-between pointer-events-none"
        >
          <button
            v-if="filteredProjects.length > 1"
            @click="prev"
            tabindex="-1"
            class="pointer-events-auto ml-2 md:ml-4 p-1.5 md:p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors transform hover:scale-110"
            aria-label="Previous project"
          >
            <Icon name="heroicons:chevron-left" class="w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button
            v-if="filteredProjects.length > 1"
            @click="next"
            tabindex="-1"
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
          tabindex="-1"
          class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300"
          :class="[
            index === currentIndex
              ? 'bg-blue-600 w-3 md:w-4'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
          ]"
          :aria-label="`Go to project ${index + 1}`"
        />
      </div>

      <!-- Project Category Info -->
      <div v-if="currentTab !== 'all' && currentCategoryData" class="max-w-3xl mx-auto space-y-6 px-4">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon 
                :name="currentCategoryData.icon" 
                class="w-8 h-8 text-blue-600 dark:text-blue-400"
              />
            </div>
            <h3 class="text-xl font-semibold dark:text-white">
              {{ currentCategoryData.title }}
            </h3>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-5 flex items-start gap-2">
            <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <span>{{ currentCategoryData.description }}</span>
          </p>
          
          <div class="flex flex-wrap gap-2">
            <div class="w-full flex items-center gap-2 mb-2">
              <Icon name="heroicons:code-bracket" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies</h4>
            </div>
            <span 
              v-for="tech in currentCategoryData.technologies" 
              :key="tech"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1"
            >
              <Icon name="heroicons:check-circle" class="w-3.5 h-3.5 text-green-500" />
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- All Projects Category Icons -->
      <div v-if="currentTab === 'all'" class="max-w-3xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(category, key) in portfolioConfig.projectCategories" 
            :key="key"
            class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:translate-y-[-4px]"
            @click="currentTab = key as ProjectCategory"
          >
            <div class="flex flex-col items-center text-center">
              <div class="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 relative">
                <Icon 
                  :name="category.icon" 
                  class="w-10 h-10 text-blue-600 dark:text-blue-400"
                />
                <span class="absolute -top-1 -right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                  {{ allProjects.filter((p: Project) => p.category === key).length }}
                </span>
              </div>
              <h3 class="text-lg font-semibold mb-2 dark:text-white flex items-center gap-1.5">
                {{ category.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                {{ category.description }}
              </p>
              <button 
                class="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline"
                @click.stop="currentTab = key as ProjectCategory"
              >
                View Projects
                <Icon name="heroicons:arrow-right" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<style scoped>
/* Slide transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Add responsive styles for navigation */
@media (max-width: 640px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.2s ease;
  }
}

/* Remove focus outline for mouse users but keep it for keyboard navigation */
button:focus {
  outline: none;
}

button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Prevent text selection on buttons */
button {
  user-select: none;
  -webkit-user-select: none;
}
</style>
