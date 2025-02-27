<script setup lang="ts">
const email = "Tom.rogiers@gmail.com";
const github = "https://github.com/ExiSoftware";
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
        <NuxtLink
          :to="`mailto:${email}`"
          external
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-envelope-20-solid w-5 h-5" />
          {{ email }}
        </NuxtLink>

        <NuxtLink
          :to="github"
          target="_blank"
          external
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-code-bracket-20-solid w-5 h-5" />
          GitHub
        </NuxtLink>

        <NuxtLink
          :to="linkedin"
          target="_blank"
          external
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
        >
          <div class="i-heroicons-link-20-solid w-5 h-5" />
          LinkedIn
        </NuxtLink>
      </div>
    </div>
  </SectionCard>
</template>
