<script setup lang="ts">
import type { TranslationKey } from "~/composables/useTranslations";
import { languages } from "~/config/portfolio.config";

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

// Generate language options from config
const languageOptions = languages.map((lang) => ({
  code: lang.code,
  label: lang.name,
  flag: lang.flag,
  path: lang.path,
}));

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

function closeMenuOnNavigation() {
  isMobileMenuOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <nav
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 py-2 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
  >
    <!-- Mobile Toggle Button (visible on small screens) -->
    <div class="md:hidden flex items-center justify-between">
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="menu-toggle flex items-center gap-1 px-3 py-2 text-sm rounded-full text-gray-700 dark:text-gray-300"
        aria-label="Menu"
      >
        <Icon name="heroicons:bars-3" class="w-5 h-5" />
        <span class="sr-only">Menu</span>
      </button>

      <!-- Always visible on mobile: theme toggle and current language -->
      <div class="flex items-center space-x-1">
        <div class="language-menu relative">
          <button
            @click.stop="isLanguageMenuOpen = !isLanguageMenuOpen"
            class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
            aria-haspopup="true"
            :aria-expanded="isLanguageMenuOpen"
          >
            <span class="flex items-center gap-1.5">
              <Icon name="heroicons:language" class="w-4 h-4" />
              {{ currentLocale.toUpperCase() }}
            </span>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isLanguageMenuOpen"
            class="absolute bottom-full mb-2 right-0 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 w-40 z-50"
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
    </div>

    <!-- Mobile Menu (conditionally visible) -->
    <div
      v-if="isMobileMenuOpen"
      class="mobile-menu md:hidden absolute bottom-full mb-2 left-0 right-0 rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
    >
      <div class="flex flex-col w-full">
        <NuxtLink
          href="#projects"
          @click="closeMenuOnNavigation"
          class="px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
        >
          <Icon name="heroicons:rectangle-stack" class="w-4 h-4" />
          {{ $t("navigation.projects") }}
        </NuxtLink>

        <NuxtLink
          href="#process"
          @click="closeMenuOnNavigation"
          class="px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4" />
          {{ $t("navigation.process") }}
        </NuxtLink>

        <NuxtLink
          href="#about"
          @click="closeMenuOnNavigation"
          class="px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
        >
          <Icon name="heroicons:user" class="w-4 h-4" />
          {{ $t("navigation.about") }}
        </NuxtLink>

        <NuxtLink
          href="#contact"
          @click="closeMenuOnNavigation"
          class="px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
        >
          <Icon name="heroicons:envelope" class="w-4 h-4" />
          {{ $t("navigation.contact") }}
        </NuxtLink>
      </div>
    </div>

    <!-- Desktop Menu (visible on medium screens and up) -->
    <div class="hidden md:flex items-center space-x-1 sm:space-x-2">
      <NuxtLink
        href="#projects"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
      >
        <Icon name="heroicons:rectangle-stack" class="w-4 h-4" />
        {{ $t("navigation.projects") }}
      </NuxtLink>

      <NuxtLink
        href="#process"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
      >
        <Icon name="heroicons:arrow-path" class="w-4 h-4" />
        {{ $t("navigation.process") }}
      </NuxtLink>

      <NuxtLink
        href="#about"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
      >
        <Icon name="heroicons:user" class="w-4 h-4" />
        {{ $t("navigation.about") }}
      </NuxtLink>

      <NuxtLink
        href="#contact"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
      >
        <Icon name="heroicons:envelope" class="w-4 h-4" />
        {{ $t("navigation.contact") }}
      </NuxtLink>

      <!-- Language Menu -->
      <div class="language-menu relative">
        <button
          @click.stop="isLanguageMenuOpen = !isLanguageMenuOpen"
          class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
          aria-haspopup="true"
          :aria-expanded="isLanguageMenuOpen"
        >
          <span class="flex items-center gap-1.5">
            <Icon name="heroicons:language" class="w-4 h-4" />
            {{ currentLocale.toUpperCase() }}
          </span>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="isLanguageMenuOpen"
          class="absolute bottom-full mb-2 right-0 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 py-1 w-40 z-50"
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
</template>
