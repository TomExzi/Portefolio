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
  <nav>
    <ul class="hidden md:flex items-center gap-6">
      <li>
        <NuxtLink
          :to="localePrefix === '/' ? '/' : localePrefix"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          {{ $t("navigation.home") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`${localePrefix === '/' ? '' : localePrefix}/#projects`"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          {{ $t("navigation.projects") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`${localePrefix === '/' ? '' : localePrefix}/#about`"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          {{ $t("navigation.about") }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          :to="`${localePrefix === '/' ? '' : localePrefix}/#contact`"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        >
          {{ $t("navigation.contact") }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
