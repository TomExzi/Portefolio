<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { contact } = portfolioConfig;

const contactItems = [
  {
    icon: "heroicons:envelope",
    text: contact.email,
    link: `mailto:${contact.email}`,
    external: true,
  },
  {
    icon: "mdi:github",
    text: "GitHub",
    link: contact.github,
    external: true,
  },
  {
    icon: "mdi:linkedin",
    text: "LinkedIn",
    link: contact.linkedin,
    external: true,
  },
];
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
          v-for="item in contactItems"
          :key="item.link"
          :to="item.link"
          :external="item.external"
          target="_blank"
          class="flex items-center gap-3 text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 group"
        >
          <Icon
            :name="item.icon"
            class="w-6 h-6 transition-transform group-hover:scale-110"
          />
          <span class="text-lg">{{ item.text }}</span>
        </NuxtLink>
      </div>
    </div>
  </SectionCard>
</template>
