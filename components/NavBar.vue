<script setup lang="ts">
import type { TranslationKey } from '~/composables/useTranslations';
import type { LanguageCode } from '~/composables/useLanguage';

const { isDark } = useTheme();
const { currentLanguage, language } = useLanguage();
const { t } = useTranslations();

const navigation = [
  { name: 'projects' as TranslationKey, href: "#projects", icon: "heroicons:rectangle-stack" },
  { name: 'process' as TranslationKey, href: "#process", icon: "heroicons:arrow-path" },
  { name: 'about' as TranslationKey, href: "#about", icon: "heroicons:user" },
  { name: 'contact' as TranslationKey, href: "#contact", icon: "heroicons:envelope" },
];

const isLanguageMenuOpen = ref(false);

const languageOptions = [
  { code: 'en' as LanguageCode, label: 'English' },
  { code: 'fr' as LanguageCode, label: 'Français'},
  { code: 'nl' as LanguageCode, label: 'Nederlands' },
];

function selectLanguage(langCode: LanguageCode) {
  language.value = langCode;
  isLanguageMenuOpen.value = false;
}

// Close the menu when clicking outside
function onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.language-menu') && isLanguageMenuOpen.value) {
    isLanguageMenuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside);
});
</script>

<template>
  <div class="fixed top-0 left-0 w-full z-50">
    <div class="container mx-auto px-4 py-4">
      <Logo />
    </div>
  </div>

  <nav
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 py-2 px-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
  >
    <div class="flex items-center space-x-1 sm:space-x-2">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="px-3 py-2 text-sm rounded-full text-gray-700 hover:text-blue-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors flex items-center gap-1.5"
      >
        <Icon :name="item.icon" class="w-4 h-4" />
        {{ t(item.name) }}
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
            {{ currentLanguage.toUpperCase() }}
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
            @click="selectLanguage(option.code)"
            class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            :class="{ 'bg-gray-100 dark:bg-gray-700': currentLanguage === option.code }"
            :aria-current="currentLanguage === option.code ? 'true' : 'false'"
          >
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
