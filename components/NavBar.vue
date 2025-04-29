<script setup lang="ts">
import { languages } from "~/config/portfolio.config";
import { ref, onMounted, onUnmounted, inject, watchEffect } from "vue";

// Access i18n directly at the top level (must be first)
const { locale, t } = useI18n();
const currentLocale = computed(() => locale.value);

// Theme handling
const colorMode = useColorMode();
const isDark = computed({
  get: () => colorMode.value === "dark",
  set: (value) => {
    colorMode.preference = value ? "dark" : "light";
  },
});

const isLanguageMenuOpen = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileView = ref(false);
const isProcessingClick = ref(false);

// Check if we're on mobile view
function checkMobileView() {
  isMobileView.value = window.innerWidth < 768;
}

// Generate language options from config
const languageOptions = languages.map((lang) => ({
  code: lang.code,
  label: lang.name,
  flag: lang.flag,
  path: lang.path,
}));

// Inject the scroll function provided by the parent component
const scrollToSection = inject("scrollToSection") as (
  sectionId: string
) => void;

function selectLanguage(langCode: string, langPath: string) {
  // Update the i18n locale
  locale.value = langCode;

  // Get the current route path without the language prefix
  let newPath = window.location.pathname;

  // Remove language prefix from current path
  for (const lang of languages) {
    if (lang.path !== "/" && newPath.startsWith(lang.path)) {
      newPath = newPath.substring(lang.path.length) || "/";
      break;
    }
  }

  // Construct the target path
  let targetPath;
  if (langPath === "/") {
    // For default language (EN), use path without prefix
    targetPath = newPath;
  } else {
    // For other languages (FR, NL), add the language prefix
    targetPath = `${langPath}${newPath === "/" ? "" : newPath}`;
  }

  // Navigate using window.location to ensure complete reload
  window.location.href = targetPath;
  isLanguageMenuOpen.value = false;
}

// Close the menu when clicking outside
function onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest(".language-menu") && isLanguageMenuOpen.value) {
    isLanguageMenuOpen.value = false;
  }
  if (
    !target.closest(".mobile-menu") &&
    !target.closest(".menu-toggle") &&
    isMobileMenuOpen.value
  ) {
    isMobileMenuOpen.value = false;
  }
}

// Prevent event propagation for menu toggles to avoid unexpected closures
function handleMenuToggle(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();

  // Prevent multiple rapid clicks
  if (isProcessingClick.value) return;
  isProcessingClick.value = true;

  // Toggle menu state
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  // Close language menu if open
  if (isLanguageMenuOpen.value) {
    isLanguageMenuOpen.value = false;
  }

  // Reset click processing flag after a short delay
  setTimeout(() => {
    isProcessingClick.value = false;
  }, 300);
}

// Stop propagation for language toggle
function handleLanguageToggle(event: MouseEvent) {
  event.stopPropagation();
  event.preventDefault();

  // Prevent multiple rapid clicks
  if (isProcessingClick.value) return;
  isProcessingClick.value = true;

  // Toggle language menu
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value;

  // Close mobile menu if open (on mobile)
  if (isMobileView.value && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }

  // Reset click processing flag after a short delay
  setTimeout(() => {
    isProcessingClick.value = false;
  }, 300);
}

function closeMenuOnNavigation() {
  isMobileMenuOpen.value = false;
}

// Function to handle smooth scrolling with proper offsets
function smoothScrollToSection(sectionId: string, event: Event) {
  event.preventDefault();

  // Close mobile menu if it's open
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }

  // Try to use the injected scroll function from the parent
  if (typeof scrollToSection === "function") {
    scrollToSection(sectionId);
  } else {
    // Direct implementation as fallback
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  // Update URL without causing a scroll
  history.pushState(null, "", `#${sectionId}`);
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  window.addEventListener("resize", checkMobileView);
  checkMobileView();
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
  window.removeEventListener("resize", checkMobileView);
});

// Close mobile menu on window resize if it goes to desktop view
watchEffect(() => {
  if (!isMobileView.value && isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
});
</script>

<template>
  <div>
    <!-- Backdrop for mobile menu (prevent accidental clicks) -->
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black/5 backdrop-blur-sm z-[90]"
      @click="isMobileMenuOpen = false"
    ></div>

    <nav
      class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[95] py-2 px-4 glass-light dark:glass-dark dark:bg-[#1a202c]/95 rounded-full shadow-light-card dark:shadow-dark-card"
    >
      <!-- Mobile Toggle Button (visible on small screens) -->
      <div class="md:hidden flex items-center justify-between">
        <button
          @click="handleMenuToggle"
          class="menu-toggle flex items-center gap-1 px-3 py-2 text-sm rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors relative"
          aria-label="Menu"
          :class="{
            'bg-gray-100 dark:bg-gray-800 ring-2 ring-blue-500/50':
              isMobileMenuOpen,
          }"
        >
          <div class="relative">
            <Icon
              v-if="!isMobileMenuOpen"
              name="heroicons:bars-3"
              class="w-5 h-5"
            />
            <Icon
              v-else
              name="heroicons:x-mark"
              class="w-5 h-5 text-blue-500 dark:text-blue-400"
            />
            <span
              v-if="!isMobileMenuOpen"
              class="absolute -top-1 -right-1 flex h-2 w-2"
            >
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"
              ></span>
            </span>
          </div>
          <span
            class="text-xs font-medium"
            :class="{ 'text-blue-500 dark:text-blue-400': isMobileMenuOpen }"
            >Menu</span
          >
        </button>

        <!-- Always visible on mobile: theme toggle and current language -->
        <div class="flex items-center space-x-1">
          <div class="language-menu relative">
            <button
              @click.stop="handleLanguageToggle"
              class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors relative"
              aria-haspopup="true"
              :aria-expanded="isLanguageMenuOpen"
              :class="{ 'bg-gray-100 dark:bg-[#1a202c]': isLanguageMenuOpen }"
            >
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:language" class="w-4 h-4" />
                {{ currentLocale.toUpperCase() }}
                <Icon
                  name="heroicons:chevron-up"
                  v-if="isLanguageMenuOpen"
                  class="w-3 h-3 transition-transform"
                />
                <Icon
                  name="heroicons:chevron-down"
                  v-else
                  class="w-3 h-3 transition-transform"
                />
              </span>
            </button>

            <!-- Dropdown Menu -->
            <div
              v-if="isLanguageMenuOpen"
              class="absolute bottom-full mb-2 right-0 max-w-[95vw] rounded-lg bg-white dark:bg-[#1a202c] shadow-xl py-1 w-40 z-50 transition-all duration-200 ease-in-out animate-fadeIn"
            >
              <button
                v-for="option in languageOptions"
                :key="option.code"
                @click="selectLanguage(option.code, option.path)"
                class="flex items-center gap-2 w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                :class="{
                  'bg-gray-100 dark:bg-gray-700': currentLocale === option.code,
                }"
                :aria-current="currentLocale === option.code ? 'true' : 'false'"
              >
                <Icon :name="option.flag" class="w-5 h-5" />
                <span>{{ option.label }}</span>
              </button>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="isDark = !isDark"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            aria-label="Toggle dark mode"
          >
            <Icon
              v-if="isDark"
              name="heroicons:sun-20-solid"
              class="w-5 h-5 text-yellow-100"
            />
            <Icon
              v-if="!isDark"
              name="heroicons:moon-20-solid"
              class="w-5 h-5 text-gray-700"
            />
          </button>
        </div>
      </div>

      <!-- Mobile Menu (conditionally visible) -->
      <div
        v-show="isMobileMenuOpen"
        class="mobile-menu md:hidden fixed bottom-[4.5rem] left-0 right-0 mx-auto w-[90%] max-w-[95vw] rounded-xl glass-light dark:glass-dark dark:bg-[#1a202c]/95 shadow-light-card dark:shadow-dark-card py-2 z-[100]"
        @click.stop
      >
        <div class="flex flex-col w-full">
          <NuxtLink
            href="#contact"
            @click.prevent="smoothScrollToSection('contact', $event)"
            class="px-4 py-4 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5 active:bg-gray-200 dark:active:bg-gray-700"
          >
            <Icon name="heroicons:envelope" class="w-4 h-4" />
            {{ $t("navigation.contact") }}
          </NuxtLink>
        </div>
      </div>

      <!-- Desktop Menu (visible on medium screens and up) -->
      <div class="hidden md:flex items-center space-x-1 sm:space-x-2">
        <NuxtLink
          href="#contact"
          @click.prevent="smoothScrollToSection('contact', $event)"
          class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
        >
          <Icon name="heroicons:envelope" class="w-4 h-4" />
          {{ $t("navigation.contact") }}
        </NuxtLink>

        <!-- Language Menu -->
        <div class="language-menu relative">
          <button
            @click.stop="handleLanguageToggle"
            class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
            aria-haspopup="true"
            :aria-expanded="isLanguageMenuOpen"
          >
            <span class="flex items-center gap-1.5">
              <Icon name="heroicons:language" class="w-4 h-4" />
              {{ currentLocale.toUpperCase() }}
              <Icon
                name="heroicons:chevron-up"
                v-if="isLanguageMenuOpen"
                class="w-3 h-3 transition-transform"
              />
              <Icon
                name="heroicons:chevron-down"
                v-else
                class="w-3 h-3 transition-transform"
              />
            </span>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isLanguageMenuOpen"
            class="absolute bottom-full mb-2 right-0 max-w-[95vw] rounded-lg bg-white dark:bg-[#1a202c] shadow-xl border-2 border-gray-200 dark:border-gray-600/50 py-1 w-40 z-50 transition-all duration-200 ease-in-out animate-fadeIn"
          >
            <button
              v-for="option in languageOptions"
              :key="option.code"
              @click="selectLanguage(option.code, option.path)"
              class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              :class="{
                'bg-gray-100 dark:bg-gray-700': currentLocale === option.code,
              }"
              :aria-current="currentLocale === option.code ? 'true' : 'false'"
            >
              <Icon :name="option.flag" class="w-5 h-5" />
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="isDark = !isDark"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          aria-label="Toggle dark mode"
        >
          <Icon
            v-if="isDark"
            name="heroicons:sun-20-solid"
            class="w-5 h-5 text-yellow-100"
          />
          <Icon
            v-if="!isDark"
            name="heroicons:moon-20-solid"
            class="w-5 h-5 text-gray-700"
          />
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}

.fixed.bottom-\[4\.5rem\] {
  animation: slideInUp 0.3s ease-out;
}

@media (max-width: 768px) {
  .mobile-menu {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    transform-origin: bottom center;
    will-change: transform, opacity;
    touch-action: manipulation;
  }

  .language-menu button:active {
    background-color: rgba(209, 213, 219, 0.4);
  }

  .dark .language-menu button:active {
    background-color: rgba(55, 65, 81, 0.4);
  }

  nav {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    touch-action: manipulation;
  }

  /* Larger touch targets on mobile */
  .menu-toggle,
  .language-menu button,
  .mobile-menu a {
    touch-action: manipulation;
  }
}
</style>
