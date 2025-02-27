<template>
  <footer class="py-8 border-t border-gray-200 dark:border-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <p class="text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} John Doe. All rights reserved.
        </p>
        <div class="flex items-center space-x-4">
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Privacy
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            Terms
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
