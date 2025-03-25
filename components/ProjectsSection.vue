<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";
import { ref, computed, onMounted, onUnmounted } from "vue";
import SectionCard from "~/components/SectionCard.vue";

type ProjectCategory =
  | "DataRemediation"
  | "InfrastructurePortal"
  | "InformationProvider";
type TabType = ProjectCategory | "all";

const currentIndex = ref(0);
const currentTab = ref<TabType>("all");
const sliderRef = ref<HTMLElement | null>(null);
const isSliding = ref(false);
const isSwiping = ref(false);
const isImageExpanded = ref(false);
const currentExpandedImage = ref<string | null>(null);

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

// Enhanced navigation with debouncing to prevent rapid clicks
const next = () => {
  if (isSliding.value || filteredProjects.value.length <= 1) return;
  isSliding.value = true;

  currentIndex.value = (currentIndex.value + 1) % filteredProjects.value.length;

  setTimeout(() => {
    isSliding.value = false;
  }, 300); // Match this with slide transition duration
};

const prev = () => {
  if (isSliding.value || filteredProjects.value.length <= 1) return;
  isSliding.value = true;

  currentIndex.value =
    currentIndex.value === 0
      ? filteredProjects.value.length - 1
      : currentIndex.value - 1;

  setTimeout(() => {
    isSliding.value = false;
  }, 300); // Match this with slide transition duration
};

const goToSlide = (index: number) => {
  if (isSliding.value) return;
  isSliding.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isSliding.value = false;
  }, 300);
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

// Add automatic image dimension detection
const loadedImageDimensions = ref(new Map());

function updateImageDimensions(
  imageUrl: string,
  width: number,
  height: number
) {
  loadedImageDimensions.value.set(imageUrl, { width, height });
}

// Calculate appropriate object-fit based on image dimensions
const getObjectFit = computed(() => {
  if (filteredProjects.value.length === 0 || currentIndex.value < 0)
    return "contain";

  const project = filteredProjects.value[currentIndex.value];
  if (!project) return "contain";

  const dimensions = loadedImageDimensions.value.get(project.imageUrl);
  if (!dimensions) return "contain"; // Default to contain

  // Use cover for landscape images if they're not too wide
  const ratio = dimensions.width / dimensions.height;
  return ratio > 1.5 ? "contain" : "cover";
});

// Setup swipe handlers manually instead of using VueUse
let startX = 0;
let startY = 0;

function handleTouchStart(event: TouchEvent) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
  isSwiping.value = true;
}

function handleTouchEnd(event: TouchEvent) {
  if (!isSwiping.value) return;

  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;

  const diffX = startX - endX;
  const diffY = startY - endY;

  // Check if horizontal swipe is more significant than vertical
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
    if (diffX > 0) {
      next(); // Swipe left, go next
    } else {
      prev(); // Swipe right, go previous
    }
  }

  isSwiping.value = false;
}

// Add keyboard navigation
function handleKeydown(event: KeyboardEvent) {
  if (
    document.activeElement === sliderRef.value ||
    sliderRef.value?.contains(document.activeElement as Node)
  ) {
    if (event.key === "ArrowLeft") {
      prev();
    } else if (event.key === "ArrowRight") {
      next();
    }
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("keydown", handleEscapeKey);

  // Setup swipe detection
  isTouchDevice.value =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Add touch event listeners if slider exists
  if (sliderRef.value) {
    sliderRef.value.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    sliderRef.value.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
  }
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("keydown", handleEscapeKey);

  // Clean up touch event listeners
  if (sliderRef.value) {
    sliderRef.value.removeEventListener("touchstart", handleTouchStart);
    sliderRef.value.removeEventListener("touchend", handleTouchEnd);
  }
});

// Add detection for touch devices
const isTouchDevice = ref(false);

// Check if it's a touch device
onMounted(() => {
  isTouchDevice.value =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;
});

// Fix event handling by using a proper TypeScript cast for event target
function handleImageLoad(event: Event, imageUrl: string) {
  const img = event.target as HTMLImageElement;
  if (img && img.naturalWidth) {
    updateImageDimensions(imageUrl, img.naturalWidth, img.naturalHeight);
  }
}

// Add a function to open the expanded image view
function expandImage(imageUrl: string) {
  currentExpandedImage.value = imageUrl;
  isImageExpanded.value = true;
  // Prevent scrolling on the body when modal is open
  document.body.style.overflow = "hidden";
}

// Reimplement the closeExpandedImage function to be more reliable
function closeExpandedImage(event?: Event) {
  console.log("Closing image view");
  isImageExpanded.value = false;
  currentExpandedImage.value = null;
  imageScale.value = 1;
  document.body.style.overflow = "";

  // Prevent any potential event conflicts
  if (event) {
    event.stopPropagation();
  }
}

// Close expanded image on escape key
function handleEscapeKey(event: KeyboardEvent) {
  if (event.key === "Escape" && isImageExpanded.value) {
    closeExpandedImage();
  }
}

// Add zoom functionality state variables
const imageScale = ref(1);
const startDistance = ref(0);
const isZooming = ref(false);

// Update the pinch-to-zoom functions to avoid preventDefault on passive events
function handleTouchStartZoom(event: TouchEvent) {
  if (event.touches.length === 2) {
    startDistance.value = getDistanceBetweenTouches(event);
    isZooming.value = true;
    // Don't call preventDefault on passive events
  }
}

function handleTouchMoveZoom(event: TouchEvent) {
  if (isZooming.value && event.touches.length === 2) {
    const currentDistance = getDistanceBetweenTouches(event);
    const scaleFactor = currentDistance / startDistance.value;

    // Limit scale between 1 and 3
    imageScale.value = Math.max(1, Math.min(3, scaleFactor));
    // Don't call preventDefault on passive events
  }
}

function handleTouchEndZoom() {
  // Reset zoom if scale is close to 1
  if (imageScale.value < 1.1) {
    imageScale.value = 1;
  }
  isZooming.value = false;
}

// Helper function to calculate distance between touches
function getDistanceBetweenTouches(event: TouchEvent) {
  const touch1 = event.touches[0];
  const touch2 = event.touches[1];
  return Math.sqrt(
    Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
  );
}

// Add double-tap zoom functionality
const lastTapTime = ref(0);
const doubleTapPosition = ref({ x: 0, y: 0 });

function handleImageTouch(event: TouchEvent) {
  // Handle single touch only (not during pinch zoom)
  if (event.touches.length === 1) {
    const now = new Date().getTime();
    const timeDiff = now - lastTapTime.value;

    // Detect double tap (time difference less than 300ms)
    if (timeDiff < 300 && timeDiff > 0) {
      // Toggle zoom on double tap
      if (imageScale.value === 1) {
        // Save tap position for centered zoom
        const touch = event.touches[0];
        doubleTapPosition.value = { x: touch.clientX, y: touch.clientY };
        imageScale.value = 2;
      } else {
        // Reset zoom
        imageScale.value = 1;
      }
    }

    lastTapTime.value = now;
  }
}

// Add zoom reset function for double-click on desktop
function handleImageDoubleClick(event: MouseEvent) {
  if (imageScale.value === 1) {
    doubleTapPosition.value = { x: event.clientX, y: event.clientY };
    imageScale.value = 2;
  } else {
    imageScale.value = 1;
  }
}
</script>

<template>
  <!-- Complete modal redesign for better close behavior -->
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="isImageExpanded && currentExpandedImage"
        class="fixed inset-0 z-50 bg-black/80 touch-manipulation flex items-center justify-center"
        @click="closeExpandedImage"
      >
        <!-- Content wrapper with a fixed size -->
        <div
          class="relative max-w-[92%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] max-h-[90vh] rounded-lg overflow-hidden"
          @click.stop
        >
          <!-- Close button positioned at corner of the wrapper -->
          <button
            class="absolute top-2 right-2 p-2 text-white bg-black/60 hover:bg-[#1a202c]/90 rounded-full z-50"
            @click="closeExpandedImage"
            aria-label="Close expanded image"
          >
            <Icon name="heroicons:x-mark" class="w-5 h-5" aria-hidden="true" />
          </button>

          <!-- Image container -->
          <div
            class="relative w-full h-full bg-[#1a202c]/40 flex items-center justify-center"
            @touchstart="handleTouchStartZoom"
            @touchmove="handleTouchMoveZoom"
            @touchend="handleTouchEndZoom"
          >
            <NuxtImg
              :src="currentExpandedImage"
              alt="Expanded project image"
              class="max-w-full max-h-[80vh] object-contain modal-image"
              :style="{ transform: `scale(${imageScale})` }"
              loading="eager"
              format="webp"
              quality="95"
              @touchstart="handleImageTouch"
              @dblclick="handleImageDoubleClick"
            />
          </div>
        </div>

        <!-- Instructions (pointer-events-none ensures they don't interfere) -->
        <div
          v-if="isTouchDevice"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#1a202c]/50 backdrop-blur-sm text-white py-1 px-3 rounded-full text-xs pointer-events-none"
        >
          <div class="flex items-center gap-3">
            <span>
              <Icon
                name="heroicons:arrows-pointing-out"
                class="w-3 h-3 inline mr-1"
                aria-hidden="true"
              />
              Pinch to zoom
            </span>
            <span>
              <Icon
                name="heroicons:hand-raised"
                class="w-3 h-3 inline mr-1"
                aria-hidden="true"
              />
              Double-tap to zoom
            </span>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>

  <SectionCard id="projects" class="relative overflow-hidden hw-accelerated">
    <!-- Background Image with blur (direct style approach) -->
    <div
      v-if="currentProjectImage"
      class="absolute inset-0 w-full h-full bg-cover bg-center"
      style="
        filter: blur(30px);
        z-index: -1; /* Move background below content */
        background-size: cover;
        background-position: center;
        border-radius: inherit;
        overflow: hidden;
      "
      :style="{
        backgroundImage: `url(${currentProjectImage})`,
      }"
    ></div>

    <!-- Solid overlay to prevent text blur -->
    <div
      class="absolute inset-0 bg-white/97 dark:bg-[#1a202c]/97"
      style="z-index: 0; border-radius: inherit"
    ></div>

    <!-- Content -->
    <div class="container mx-auto relative px-4" style="z-index: 5">
      <div class="flex items-center gap-3 mb-6">
        <Icon
          name="heroicons:rectangle-stack"
          class="w-6 h-6 text-blue-600 dark:text-blue-400"
          aria-hidden="true"
        />
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t("projects.featuredProjects") }}
        </h2>
      </div>

      <!-- Tabs -->
      <div class="mb-8 overflow-hidden relative project-menu">
        <!-- Mobile tabs dropdown (visible on small screens) -->
        <div class="md:hidden px-2 tabs-menu">
          <button
            @click="isTabsMenuOpen = !isTabsMenuOpen"
            class="w-full flex items-center justify-between px-4 py-2.5 bg-white dark:bg-[#1a202c]/90 rounded-xl text-gray-700 dark:text-gray-300 shadow-sm backdrop-blur-sm border border-gray-200 dark:border-transparent"
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
            class="mt-2 bg-white dark:bg-[#1a202c]/95 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-transparent"
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
                  ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-750',
              ]"
            >
              <Icon
                v-if="tab.id !== 'all'"
                :name="portfolioConfig.projectCategories[tab.id as ProjectCategory].icon"
                class="w-4 h-4"
                :class="{ 'text-blue-500': currentTab === tab.id }"
                aria-hidden="true"
              />
              <Icon
                v-else
                name="heroicons:squares-2x2"
                class="w-4 h-4"
                :class="{ 'text-blue-500': currentTab === tab.id }"
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
            class="inline-flex p-1 space-x-1 bg-gray-100/95 dark:bg-[#1a202c]/95 rounded-xl shadow-md"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="currentTab = tab.id"
              tabindex="-1"
              class="px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap flex-shrink-0 flex items-center gap-1.5"
              :class="[
                currentTab === tab.id
                  ? 'bg-white dark:bg-[#1a202c] text-blue-600 dark:text-blue-400 shadow-sm'
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
        <!-- Slider - Enhanced with swipe support and better mobile display -->
        <div
          ref="sliderRef"
          tabindex="0"
          class="overflow-hidden relative rounded-xl outline-none"
          aria-roledescription="carousel"
          aria-label="Project gallery"
        >
          <div
            class="absolute inset-0 flex items-center justify-center"
            v-if="filteredProjects.length === 0"
          >
            <p class="text-gray-500 dark:text-gray-400">
              No projects to display
            </p>
          </div>

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
              class="relative glass-light dark:glass-dark rounded-xl overflow-hidden shadow-light-card dark:shadow-dark-card transition-card"
            >
              <!-- Gradient border on top -->
              <div
                class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-blue-500"
                style="z-index: 15"
              ></div>

              <!-- Improved Blurred Background Image -->
              <div
                class="absolute inset-0 w-full h-full bg-center bg-cover opacity-10 dark:opacity-10"
                :style="{
                  backgroundImage: `url(${project.imageUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(25px) saturate(1.1)',
                }"
                style="z-index: -1; border-radius: inherit"
              ></div>

              <!-- Overlay to ensure content readability -->
              <div
                class="absolute inset-0 bg-white/97 dark:bg-[#1a202c]/97"
                style="z-index: 0; border-radius: inherit"
              ></div>

              <!-- Project Title -->
              <div
                class="relative p-4 sm:p-6 border-b border-gray-100 dark:border-gray-700"
                style="z-index: 10"
              >
                <div class="flex items-center justify-between select-none">
                  <button
                    @click="currentTab = project.category"
                    tabindex="-1"
                    class="text-lg sm:text-xl md:text-2xl font-semibold dark:text-black hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left flex items-center gap-2"
                  >
                    <Icon
                      :name="
                        portfolioConfig.projectCategories[project.category].icon
                      "
                      class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 pointer-events-none flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span class="pointer-events-none truncate">{{
                      project.title
                    }}</span>
                  </button>
                </div>
              </div>

              <!-- Project Image - Complete redesign of image container -->
              <div class="relative select-none" style="z-index: 10">
                <div
                  class="w-full aspect-video bg-gray-50 dark:bg-gray-900/30 overflow-hidden relative"
                >
                  <button
                    class="w-full h-full flex items-center justify-center focus:outline-none"
                    @click="expandImage(project.imageUrl)"
                    :aria-label="`Expand ${project.title} image`"
                  >
                    <!-- Use a div wrapper with absolute positioning -->
                    <div
                      class="absolute inset-0 flex items-center justify-center"
                    >
                      <NuxtImg
                        :src="project.imageUrl"
                        :alt="project.title"
                        class="max-h-full max-w-full w-auto h-auto object-contain"
                        loading="lazy"
                        format="webp"
                        quality="90"
                        @load="(e) => handleImageLoad(e, project.imageUrl)"
                      />
                    </div>

                    <!-- Zoom indicator overlay for mobile -->
                    <div
                      class="absolute bottom-12 right-12 bg-white/80 dark:bg-[#1a202c]/80 rounded-full p-2 shadow-md sm:hidden"
                      style="z-index: 6"
                    >
                      <Icon
                        name="heroicons:magnifying-glass-plus"
                        class="w-5 h-5 text-blue-600 dark:text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </div>

                <!-- Category icon remains unchanged -->
                <div
                  class="absolute bottom-3 right-3 bg-white/95 dark:bg-[#1a202c]/95 rounded-full p-2 shadow-md"
                  style="z-index: 6"
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

          <!-- Navigation Buttons - Enhanced for mobile -->
          <div
            class="absolute inset-0 flex items-center justify-between pointer-events-none z-30"
          >
            <button
              v-if="filteredProjects.length > 1"
              @click="prev"
              tabindex="-1"
              class="pointer-events-auto ml-1 sm:ml-2 md:ml-4 p-2.5 md:p-3 rounded-full glass-light dark:glass-dark shadow-light-card dark:shadow-dark-card transition-card hover:transform hover:scale-110"
              aria-label="Previous project"
            >
              <Icon
                name="heroicons:chevron-left"
                class="w-4 h-4 md:w-5 md:h-5 dark:text-black"
                aria-hidden="true"
              />
            </button>

            <button
              v-if="filteredProjects.length > 1"
              @click="next"
              tabindex="-1"
              class="pointer-events-auto mr-1 sm:mr-2 md:mr-4 p-2.5 md:p-3 rounded-full glass-light dark:glass-dark shadow-light-card dark:shadow-dark-card transition-card hover:transform hover:scale-110"
              aria-label="Next project"
            >
              <Icon
                name="heroicons:chevron-right"
                class="w-4 h-4 md:w-5 md:h-5 dark:text-black"
                aria-hidden="true"
              />
            </button>
          </div>

          <!-- Update the swipe indicator to only show on touch devices -->
          <div
            v-if="isTouchDevice && filteredProjects.length > 1"
            class="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white/80 dark:bg-[#1a202c]/80 rounded-full py-1 px-3 text-xs text-gray-600 shadow-sm sm:hidden flex items-center gap-1.5 opacity-80 z-30"
          >
            <Icon
              name="heroicons:arrow-left"
              class="w-3 h-3 text-black"
              aria-hidden="true"
            />
            <span>Swipe</span>
            <Icon
              name="heroicons:arrow-right"
              class="w-3 h-3 text-black"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- Dots Navigation -->
        <div
          v-if="filteredProjects.length > 1"
          class="flex justify-center gap-2 md:gap-4 mb-4"
        >
          <button
            v-for="(_, index) in filteredProjects"
            :key="index"
            @click="goToSlide(index)"
            tabindex="-1"
            class="w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 shadow-md"
            :class="[
              index === currentIndex
                ? 'bg-gradient-to-r from-blue-600 to-purple-500 w-6 md:w-8 dark:from-blue-400 dark:to-purple-400'
                : 'bg-blue-400 dark:bg-blue-300 hover:bg-blue-500 dark:hover:bg-blue-200',
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
                class="text-xl dark:text-black font-semibold pointer-events-none"
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

            <div class="text-black mb-5">
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
                  class="text-sm font-medium text-gray-700 dark:text-black pointer-events-none"
                >
                  {{ $t("projects.technologies") }}
                </h4>
              </div>
              <div
                v-for="tech in currentCategoryData.technologies"
                :key="tech"
                class="px-3 py-1 text-sm bg-gray-100 dark:bg-[#1a202c] text-gray-700 dark:text-gray-300 rounded-full flex items-center gap-1"
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
              class="relative glass-light dark:glass-dark rounded-xl p-6 shadow-light-card dark:shadow-dark-card transition-card cursor-pointer select-none overflow-hidden process-card"
              @click="currentTab = key as ProjectCategory"
            >
              <!-- Improved Blurred Background for Category Cards -->
              <div
                class="absolute inset-0 w-full h-full bg-center bg-cover opacity-10 dark:opacity-10"
                :style="{
                  backgroundImage:
                    allProjects.filter((p) => p.category === key).length > 0
                      ? `url(${
                          allProjects.filter((p) => p.category === key)[0]
                            .imageUrl
                        })`
                      : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(15px) saturate(1.1)',
                }"
                style="z-index: -1; border-radius: inherit"
              ></div>

              <!-- Gradient border on top -->
              <div
                class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-700 to-blue-500 transform scale-x-0 origin-left transition-transform"
                style="
                  z-index: 5;
                  opacity: 0;
                  transition: opacity 0.3s ease, transform 0.3s ease;
                "
              ></div>

              <!-- Card Content -->
              <div
                class="flex flex-col items-center text-center relative"
                style="z-index: 10"
              >
                <div
                  class="flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 relative process-icon"
                >
                  <Icon
                    :name="category.icon"
                    class="w-8 h-8 text-blue-600 dark:text-blue-400 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
                <h3
                  class="text-lg font-semibold mb-2 dark:text-black pointer-events-none"
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
                  class="text-sm text-gray-600 dark:text-black line-clamp-3 pointer-events-none"
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
    </div>
  </SectionCard>
</template>

<style scoped>
/* Project backdrop styling */
.SectionCard > div:first-of-type {
  border-radius: inherit;
  overflow: hidden;
}

/* Project tab menu styling for light mode */
html:not(.dark) .project-menu .inline-flex {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.95),
    rgba(249, 250, 251, 0.95)
  );
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.project-menu button[tabindex="-1"] {
  transition: all 0.2s ease;
}

.project-menu button[tabindex="-1"]:active {
  transform: scale(0.97);
}

/* Active tab in light mode */
html:not(.dark) .project-menu button.bg-white {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-bottom: 2px solid #3b82f6;
  font-weight: 500;
}

/* Project card styling */
.project-card {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Use a better solution for image display */
.max-h-full.max-w-full {
  object-fit: contain !important;
  max-height: 100% !important;
  max-width: 100% !important;
  width: auto !important;
  height: auto !important;
  margin: 0 auto;
}

/* Text shadow for better visibility on blurred backgrounds */
.text-shadow-lg {
  text-shadow: none;
  color: white;
}

.dark .text-shadow-lg {
  text-shadow: none;
  color: white;
}

/* Basic image styling */
.object-cover {
  object-fit: cover;
  transition: opacity 0.15s ease;
}

.object-contain {
  object-fit: contain;
}

/* Modal image styles */
.modal-image {
  transition: transform 0.05s linear;
  will-change: transform;
  user-select: none;
  -webkit-user-select: none;
}

/* Slide transition animations */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  will-change: transform, opacity;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* Improved mobile swipe transitions */
@media (max-width: 640px) {
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .slide-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  .slide-leave-to {
    opacity: 0;
    transform: translateX(-20px);
  }
}

/* Add visual feedback for touch interactions */
[ref="sliderRef"] {
  user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
}

/* Add focus and keyboard navigation improvements */
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Prevent text selection */
.select-none * {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* Add fade transition for the modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Add subtle zoom effect for clickable images */
[aria-label^="Expand"] {
  transition: transform 0.2s ease;
}

[aria-label^="Expand"]:active {
  transform: scale(0.98);
}

/* Make the modal feel more responsive */
.fixed.inset-0.z-50 {
  overscroll-behavior: none;
}

/* Optimize modal for touch interaction */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
}

/* Enhanced text contrast */
h2,
h3,
h4 {
  text-shadow: none;
  font-weight: 600;
  transform: translateZ(0);
}

.dark h2,
.dark h3,
.dark h4 {
  text-shadow: none;
  font-weight: 600;
  transform: translateZ(0);
}

/* Ensure text is always sharp */
p,
span,
h1,
h2,
h3,
h4,
h5,
h6,
button,
a {
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
  text-rendering: optimizeLegibility !important;
}

/* Hardware acceleration */
.hw-accelerated {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
  will-change: transform;
  text-rendering: optimizeLegibility;
}

/* Process card effects */
.process-card {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 1;
  overflow: hidden;
}

.process-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.process-card:hover [style*="opacity: 0"] {
  opacity: 1 !important;
  transform: scaleX(1) !important;
}

.process-icon {
  transition: transform 0.3s ease, background 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.process-card:hover .process-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, #1e40af, #3b82f6);
}

.process-card:hover .process-icon svg {
  color: white !important;
}

/* Animations for card entrance */
@media (prefers-reduced-motion: no-preference) {
  .process-card:nth-child(1) {
    animation: fadeInLeft 0.8s ease-out;
  }

  .process-card:nth-child(2) {
    animation: fadeInUp 1s ease-out;
  }

  .process-card:nth-child(3) {
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
}

/* Ensure proper aspect ratio for image containers */
.aspect-video {
  aspect-ratio: 16/9;
  height: auto;
  overflow: hidden;
}

@media (min-width: 640px) {
  .aspect-video {
    height: 300px;
  }
}

@media (min-width: 768px) {
  .aspect-video {
    height: 500px;
  }
}

/* Hover styles for tabs in light mode */
html:not(.dark) .project-menu button.text-gray-600:hover {
  background-color: rgba(249, 250, 251, 0.8);
  color: #3b82f6;
}

/* Mobile tab menu styling for light mode */
html:not(.dark) .tabs-menu button {
  transition: all 0.2s ease;
}

html:not(.dark) .tabs-menu > button {
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.98),
    rgba(250, 251, 252, 0.98)
  );
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

html:not(.dark) .tabs-menu > button:active {
  transform: scale(0.98);
  background-color: #f9fafb;
}

/* Selected item in mobile dropdown menu */
html:not(.dark) .tabs-menu .bg-blue-50 {
  border-left: 3px solid #3b82f6;
}

/* Animation for mobile dropdown menu in light mode */
html:not(.dark) .tabs-menu > div {
  animation: slideInDown 0.2s ease-out;
  transform-origin: top center;
  box-shadow: 0 4px 10px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -1px rgba(0, 0, 0, 0.02);
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
