<script setup lang="ts">
import { languages } from "~/config/portfolio.config";

// Use i18n directly at the top level of setup
const { locale } = useI18n();
const currentLocale = computed(() => locale.value);

// Use centralized language utilities
const { switchLanguage } = useLanguage();

function handleLanguageSwitch(langCode: string) {
  // Use the centralized function from the composable
  switchLanguage(langCode);
}
</script>

<template>
  <div class="relative">
    <Menu as="div" class="relative inline-block text-left">
      <MenuButton
        class="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        <Icon
          :name="languages.find((l) => l.code === currentLocale)?.flag || ''"
          class="w-5 h-5"
        />
        <span>{{ currentLocale.toUpperCase() }}</span>
        <Icon
          name="heroicons:chevron-down"
          class="w-4 h-4"
          aria-hidden="true"
        />
      </MenuButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems
          class="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          <div class="py-1">
            <MenuItem
              v-for="lang in languages"
              :key="lang.code"
              v-slot="{ active }"
            >
              <button
                @click="handleLanguageSwitch(lang.code)"
                :class="[
                  active ? 'bg-gray-100 dark:bg-gray-700' : '',
                  'flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300',
                ]"
              >
                <Icon :name="lang.flag" class="w-5 h-5" />
                <span>{{ lang.name }}</span>
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
