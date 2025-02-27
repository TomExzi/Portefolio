<script setup lang="ts">
const email = "john.doe@example.com";
const github = "https://github.com/johndoe";
const linkedin = "https://linkedin.com/in/johndoe";
</script>

<template>
  <SectionCard id="contact">
    <h2 class="text-3xl font-bold mb-12 dark:text-white">Get in Touch</h2>

    <div class="max-w-2xl">
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
        I'm always interested in hearing about new projects and opportunities.
        Whether you have a question or just want to say hi, feel free to reach
        out!
      </p>

      <div class="space-y-4">
        <a
          :href="`mailto:${email}`"
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-envelope-20-solid w-5 h-5" />
          {{ email }}
        </a>

        <a
          :href="github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-code-bracket-20-solid w-5 h-5" />
          GitHub
        </a>

        <a
          :href="linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-link-20-solid w-5 h-5" />
          LinkedIn
        </a>
      </div>
    </div>
  </SectionCard>
</template>
