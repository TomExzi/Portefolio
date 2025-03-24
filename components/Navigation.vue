<script setup lang="ts">
import { languages } from "~/config/portfolio.config";
const { locale } = useI18n();
const route = useRoute();

// Get the current locale path prefix
const localePrefix = computed(() => {
  const currentLocale = locale.value;
  const langConfig = languages.find((lang) => lang.code === currentLocale);
  return langConfig?.path || "/";
});

// Determine if the current route is active
function isActive(path: string): boolean {
  const routePath = route.path;
  const normalizedPath = path.endsWith("/") ? path : `${path}/`;
  const normalizedRoutePath = routePath.endsWith("/")
    ? routePath
    : `${routePath}/`;

  // Check if the base paths match
  return normalizedRoutePath.startsWith(normalizedPath);
}
</script>

<template>
  <nav>
    <ul class="hidden md:flex items-center gap-6">
      <li>
        <NuxtLink
          :to="localePrefix === '/' ? '/' : localePrefix"
          class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
          :class="{
            'text-blue-600 dark:text-blue-400':
              route.path === localePrefix || route.path === '/',
          }"
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
