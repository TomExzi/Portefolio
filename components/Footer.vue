<script setup lang="ts">
import { languages } from "~/config/portfolio.config";

const { locale } = useI18n();

// Get the current locale path prefix
const localePrefix = computed(() => {
  const currentLocale = locale.value;
  const langConfig = languages.find((lang) => lang.code === currentLocale);
  return langConfig?.path || "/";
});
</script>

<template>
  <footer
    class="py-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-300 w-full"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
          <Icon
            name="heroicons:shield-check"
            class="w-5 h-5 text-blue-600 dark:text-blue-400"
          />
          {{ new Date().getFullYear() }} ExziSoft. All rights reserved.
        </p>
        <div class="flex items-center space-x-4">
          <NuxtLink
            :to="`${localePrefix === '/' ? '' : localePrefix}/privacy`"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1.5"
          >
            <Icon name="heroicons:lock-closed" class="w-4 h-4" />
            {{ $t("legal.footer.privacy") }}
          </NuxtLink>
          <NuxtLink
            :to="`${localePrefix === '/' ? '' : localePrefix}/terms`"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1.5"
          >
            <Icon name="heroicons:document-text" class="w-4 h-4" />
            {{ $t("legal.footer.terms") }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
