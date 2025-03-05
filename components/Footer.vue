<template>
  <footer class="py-8 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400 flex items-center gap-2">
          <Icon name="heroicons:shield-check" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          © {{ new Date().getFullYear() }} ExziSoft. All rights reserved.
        </p>
        <div class="flex items-center space-x-4">
          <NuxtLink
            to="/privacy"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1.5"
          >
            <Icon name="heroicons:lock-closed" class="w-4 h-4" />
            Privacy
          </NuxtLink>
          <NuxtLink
            to="/terms"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 flex items-center gap-1.5"
          >
            <Icon name="heroicons:document-text" class="w-4 h-4" />
            Terms
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
