<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";
import { ref } from "vue";
import SectionCard from "~/components/SectionCard.vue";

type ProjectCategory =
  | "DataRemediation"
  | "InfrastructurePortal"
  | "InformationProvider";
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

// Add this function to fix image paths
function fixImagePath(path: string) {
  // Remove /public prefix if present
  let fixedPath = path.replace("/public", "");

  // Ensure path starts with /
  if (!fixedPath.startsWith("/")) {
    fixedPath = "/" + fixedPath;
  }

  // For Infrastructure Portal specifically, try a different approach
  if (fixedPath.includes("InfrastructurePortal")) {
    // Try to use a more direct path
    const filename = fixedPath.split("/").pop();
    return `/projects/InfrastructurePortal/${filename}`;
  }

  return fixedPath;
}

// Load images from the projects folders
onMounted(async () => {
  try {
    console.log("Loading project images...");

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
        imageUrl: fixImagePath(path),
        category: "DataRemediation" as const,
      })
    );

    const infrastructureProjects = Object.keys(infrastructureFiles).map(
      (path, index) => ({
        id: `infra-${index + 1}`,
        title: "Infrastructure Portal",
        type: "Project",
        imageUrl: fixImagePath(path),
        category: "InfrastructurePortal" as const,
      })
    );

    const informationProviderProjects = Object.keys(
      informationProviderFiles
    ).map((path, index) => ({
      id: `info-${index + 1}`,
      title: "Information Provider",
      type: "Project",
      imageUrl: fixImagePath(path),
      category: "InformationProvider" as const,
    }));

    allProjects.value = [
      ...dataRemediationProjects,
      ...infrastructureProjects,
      ...informationProviderProjects,
    ];

    console.log("All projects loaded:", allProjects.value);
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

  // Force a re-render of the background
  nextTick(() => {
    // This will trigger a re-evaluation of the currentProjectImage computed property
    if (filteredProjects.value.length > 0) {
      const temp = currentIndex.value;
      currentIndex.value = -1;
      setTimeout(() => {
        currentIndex.value = temp;
      }, 10);
    }
  });
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
  if (currentTab.value === "all") return null;
  return portfolioConfig.projectCategories[currentTab.value as ProjectCategory];
});

// Add this to your script setup
const preloadedImages = ref(new Set<string>());

// Modify the preload images function to add debugging and handle errors
watch(
  filteredProjects,
  (newProjects) => {
    newProjects.forEach((project) => {
      if (project.imageUrl && !preloadedImages.value.has(project.imageUrl)) {
        console.log(`Attempting to preload: ${project.imageUrl}`);

        const img = new Image();

        // Add error handling
        img.onerror = () => {
          console.error(`Failed to load image: ${project.imageUrl}`);
          // Try an alternative path format as fallback
          const altPath = project.imageUrl.replace(/^\//, "");
          console.log(`Trying alternative path: /${altPath}`);

          const altImg = new Image();
          altImg.src = `/${altPath}`;
          altImg.onload = () => {
            console.log(
              `Successfully loaded with alternative path: /${altPath}`
            );
            // Store the working path
            preloadedImages.value.add(project.imageUrl);
          };
        };

        img.onload = () => {
          console.log(`Successfully preloaded: ${project.imageUrl}`);
          preloadedImages.value.add(project.imageUrl);
        };

        img.src = project.imageUrl.startsWith("/")
          ? project.imageUrl
          : `/${project.imageUrl}`;
      }
    });
  },
  { immediate: true }
);

// Simplify the currentProjectImage computed property
const currentProjectImage = computed(() => {
  if (filteredProjects.value.length === 0) return null;

  const project = filteredProjects.value[currentIndex.value];
  if (!project) return null;

  return project.imageUrl;
});

// If you're using a slide component, make sure it's properly defined
const slides = ref([
  // Your slide data
]);

const isTabsMenuOpen = ref(false);

// Close the menu when clicking outside
function onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest(".tabs-menu") && isTabsMenuOpen.value) {
    isTabsMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <SectionCard
    id="projects"
    :style="
      currentProjectImage
        ? {
            backgroundImage: `url(${currentProjectImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            position: 'relative',
            isolation: 'isolate',
            imageRendering: 'auto',
          }
        : {}
    "
    class="relative overflow-hidden"
  >
    <!-- Overlay for the section background -->
    <div
      v-if="currentProjectImage"
      class="absolute inset-0 bg-white/70 dark:bg-gray-800/75 backdrop-blur-sm -z-10"
    ></div>

    <!-- Background for better contrast -->
    <div class="absolute inset-0 bg-white/85 dark:bg-gray-800/90 -z-10"></div>

    <div class="flex items-center gap-3 mb-6 relative">
      <Icon
        name="heroicons:rectangle-stack"
        class="w-6 h-6 text-blue-600 dark:text-blue-400"
        aria-hidden="true"
      />
      <h2 class="text-2xl font-bold dark:text-white">
        {{ $t("projects.featuredProjects") }}
      </h2>
    </div>

    <!-- Tabs -->
    <div class="mb-8 overflow-hidden">
      <!-- Mobile tabs dropdown (visible on small screens) -->
      <div class="md:hidden px-2 tabs-menu">
        <button
          @click="isTabsMenuOpen = !isTabsMenuOpen"
          class="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300"
        >
          <div class="flex items-center gap-2">
            <Icon
              v-if="currentTab !== 'all'"
              :name="portfolioConfig.projectCategories[currentTab as ProjectCategory].icon"
              class="w-4 h-4"
              aria-hidden="true"
            />
            <Icon
              v-else
              name="heroicons:squares-2x2"
              class="w-4 h-4"
              aria-hidden="true"
            />
            <span>
              {{
                currentTab === "all"
                  ? $t("projects.all")
                  : currentTab === "DataRemediation"
                  ? $t("projects.dataRemediation")
                  : currentTab === "InfrastructurePortal"
                  ? $t("projects.infrastructurePortal")
                  : $t("projects.informationProvider")
              }}
            </span>
          </div>
          <Icon
            name="heroicons:chevron-down"
            class="w-5 h-5"
            :class="{ 'transform rotate-180': isTabsMenuOpen }"
          />
        </button>

        <!-- Mobile dropdown menu -->
        <div
          v-if="isTabsMenuOpen"
          class="mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="
              currentTab = tab.id;
              isTabsMenuOpen = false;
            "
            class="w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-2"
            :class="[
              currentTab === tab.id
                ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750',
            ]"
          >
            <Icon
              v-if="tab.id !== 'all'"
              :name="portfolioConfig.projectCategories[tab.id as ProjectCategory].icon"
              class="w-4 h-4"
              aria-hidden="true"
            />
            <Icon
              v-else
              name="heroicons:squares-2x2"
              class="w-4 h-4"
              aria-hidden="true"
            />
            {{
              tab.id === "all"
                ? $t("projects.all")
                : tab.id === "DataRemediation"
                ? $t("projects.dataRemediation")
                : tab.id === "InfrastructurePortal"
                ? $t("projects.infrastructurePortal")
                : $t("projects.informationProvider")
            }}
          </button>
        </div>
      </div>

      <!-- Desktop tabs (visible on medium screens and up) -->
      <div class="hidden md:flex justify-center">
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
              aria-hidden="true"
            />
            <Icon
              v-else
              name="heroicons:squares-2x2"
              class="w-4 h-4"
              aria-hidden="true"
            />
            {{
              tab.id === "all"
                ? $t("projects.all")
                : tab.id === "DataRemediation"
                ? $t("projects.dataRemediation")
                : tab.id === "InfrastructurePortal"
                ? $t("projects.infrastructurePortal")
                : $t("projects.informationProvider")
            }}
          </button>
        </div>
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
            class="relative w-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <!-- Blurred Background Image -->
            <div
              class="absolute inset-0 w-full h-full bg-center bg-cover opacity-30 dark:opacity-20"
              :style="{
                backgroundImage: `url(${project.imageUrl})`,
                filter: 'blur(5px) saturate(1.2)',
                transform: 'scale(1.1)',
                zIndex: 0,
              }"
            ></div>

            <!-- Overlay to ensure content readability -->
            <div
              class="absolute inset-0 bg-white/85 dark:bg-gray-800/90"
              style="z-index: 1"
            ></div>

            <!-- Project Title -->
            <div
              class="relative p-6 border-b border-gray-100 dark:border-gray-700"
              style="z-index: 10"
            >
              <div class="flex items-center justify-between select-none">
                <button
                  @click="currentTab = project.category"
                  tabindex="-1"
                  class="text-xl md:text-2xl font-semibold dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-2"
                >
                  <Icon
                    :name="
                      portfolioConfig.projectCategories[project.category].icon
                    "
                    class="w-6 h-6 text-blue-600 dark:text-blue-400 pointer-events-none"
                    aria-hidden="true"
                  />
                  <span class="pointer-events-none">{{ project.title }}</span>
                </button>
              </div>
            </div>

            <!-- Project Image -->
            <div class="relative select-none" style="z-index: 10">
              <img
                :src="project.imageUrl"
                :alt="project.title"
                class="w-full h-[300px] md:h-[500px] object-contain bg-transparent pointer-events-none"
              />
              <div
                class="absolute bottom-3 right-3 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md"
              >
                <Icon
                  :name="
                    portfolioConfig.projectCategories[project.category].icon
                  "
                  class="w-5 h-5 text-blue-600 dark:text-blue-400 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </article>
        </NuxtTransitionGroup>

        <!-- Navigation Buttons -->
        <div
          class="absolute inset-0 flex items-center justify-between pointer-events-none z-20"
        >
          <button
            v-if="filteredProjects.length > 1"
            @click="prev"
            tabindex="-1"
            class="pointer-events-auto ml-1 sm:ml-2 md:ml-4 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors transform hover:scale-110"
            aria-label="Previous project"
          >
            <Icon
              name="heroicons:chevron-left"
              class="w-4 h-4 md:w-5 md:h-5"
              aria-hidden="true"
            />
          </button>

          <button
            v-if="filteredProjects.length > 1"
            @click="next"
            tabindex="-1"
            class="pointer-events-auto mr-1 sm:mr-2 md:mr-4 p-2 md:p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors transform hover:scale-110"
            aria-label="Next project"
          >
            <Icon
              name="heroicons:chevron-right"
              class="w-4 h-4 md:w-5 md:h-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Dots Navigation -->
      <div
        v-if="filteredProjects.length > 1"
        class="flex justify-center gap-1 md:gap-2 mb-4"
      >
        <button
          v-for="(_, index) in filteredProjects"
          :key="index"
          @click="goToSlide(index)"
          tabindex="-1"
          class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300"
          :class="[
            index === currentIndex
              ? 'bg-blue-600 w-4 md:w-5'
              : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500',
          ]"
          :aria-label="`Go to project ${index + 1}`"
        />
      </div>

      <!-- Project Category Info -->
      <div
        v-if="currentTab !== 'all' && currentCategoryData"
        class="max-w-3xl mx-auto space-y-6 select-none"
      >
        <div class="">
          <div class="flex items-center gap-4 mb-4">
            <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon
                :name="currentCategoryData.icon"
                class="w-8 h-8 text-blue-600 dark:text-blue-400 pointer-events-none"
                aria-hidden="true"
              />
            </div>
            <h3
              class="text-xl font-semibold dark:text-white pointer-events-none"
            >
              {{
                $t(
                  `projects.${
                    currentTab === "DataRemediation"
                      ? "dataRemediation"
                      : currentTab === "InfrastructurePortal"
                      ? "infrastructurePortal"
                      : currentTab === "InformationProvider"
                      ? "informationProvider"
                      : currentTab
                  }`
                )
              }}
            </h3>
          </div>

          <div class="text-gray-600 dark:text-gray-300 mb-5">
            <div class="flex items-start gap-2">
              <p class="pointer-events-none">
                {{ $t(`projects.${currentTab.toLowerCase()}Description`) }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <div class="w-full flex items-center gap-2 mb-2">
              <Icon
                name="heroicons:code-bracket"
                class="w-5 h-5 text-blue-600 dark:text-blue-400 pointer-events-none"
                aria-hidden="true"
              />
              <h4
                class="text-sm font-medium text-gray-700 dark:text-gray-300 pointer-events-none"
              >
                {{ $t("projects.technologies") }}
              </h4>
            </div>
            <div
              v-for="tech in currentCategoryData.technologies"
              :key="tech"
              class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1"
            >
              <span class="flex-shrink-0"> </span>
              <span class="pointer-events-none">{{ tech }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- All Projects Category Icons -->
      <div v-if="currentTab === 'all'" class="max-w-3xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(category, key) in portfolioConfig.projectCategories"
            :key="key"
            class="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:translate-y-[-4px] select-none overflow-hidden"
            @click="currentTab = key as ProjectCategory"
          >
            <!-- Blurred Background for Category Cards -->
            <div
              class="absolute inset-0 w-full h-full bg-center bg-cover opacity-10 dark:opacity-15"
              :style="{
                backgroundImage:
                  allProjects.filter((p) => p.category === key).length > 0
                    ? `url(${
                        allProjects.filter((p) => p.category === key)[0]
                          .imageUrl
                      })`
                    : 'none',
                filter: 'blur(3px) saturate(1.1)',
                transform: 'scale(1.1)',
              }"
              style="z-index: 0"
            ></div>

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-white/90 dark:bg-gray-800/95"
              style="z-index: 1"
            ></div>

            <!-- Card Content -->
            <div
              class="flex flex-col items-center text-center relative"
              style="z-index: 10"
            >
              <div
                class="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 relative"
              >
                <Icon
                  :name="category.icon"
                  class="w-10 h-10 text-blue-600 dark:text-blue-400 pointer-events-none"
                  aria-hidden="true"
                />
                <span
                  class="absolute -top-1 -right-1 bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold pointer-events-none"
                >
                  {{
                    allProjects.filter((p: Project) => p.category === key)
                      .length
                  }}
                </span>
              </div>
              <h3
                class="text-lg font-semibold mb-2 dark:text-white pointer-events-none"
              >
                {{
                  $t(
                    `projects.${
                      key === "DataRemediation"
                        ? "dataRemediation"
                        : key === "InfrastructurePortal"
                        ? "infrastructurePortal"
                        : key === "InformationProvider"
                        ? "informationProvider"
                        : key
                    }`
                  )
                }}
              </h3>
              <p
                class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 pointer-events-none"
              >
                {{ $t(`projects.${key.toLowerCase()}Description`) }}
              </p>
              <button
                class="mt-4 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline"
                @click.stop="currentTab = key as ProjectCategory"
              >
                <span class="pointer-events-none">{{
                  $t("projects.viewProjects")
                }}</span>
                <Icon
                  name="heroicons:arrow-right"
                  class="w-4 h-4 pointer-events-none"
                  aria-hidden="true"
                />
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

/* Prevent text selection on buttons and icons */
button,
.icon,
[class*="heroicons"],
[class*="mdi"] {
  user-select: none;
  -webkit-user-select: none;
}

/* Fix for icon positioning */
.flex.items-start {
  align-items: flex-start;
}

/* Ensure proper text wrapping */
p {
  word-break: normal;
  overflow-wrap: break-word;
}

/* Prevent cursor issues */
::selection {
  background: transparent;
}

/* Fix icon display issues */
.pointer-events-none {
  pointer-events: none;
}

/* Ensure all icons are properly displayed */
svg {
  display: inline-block;
  vertical-align: middle;
}

/* Hide icon names from screen readers and selection */
[aria-hidden="true"] {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Prevent selection of icon elements */
.select-none * {
  user-select: none;
  -webkit-user-select: none;
}

/* Ensure icons don't show their names when selected */
.icon,
svg {
  font-size: 0;
  line-height: 0;
}
</style>
