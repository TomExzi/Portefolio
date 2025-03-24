<script setup lang="ts">
import { portfolioConfig } from "~/config/portfolio.config";

const { contact } = portfolioConfig;
const { t } = useTranslations();

const contactItems = [
  {
    icon: "mdi:email",
    text: t("contact.email"),
    link: `mailto:${contact.email}`,
    external: true,
    hoverColor: "text-red-500",
  },
  {
    icon: "mdi:github",
    text: "GitHub",
    link: contact.github,
    external: true,
    hoverColor: "text-purple-500",
  },
  {
    icon: "mdi:linkedin",
    text: "LinkedIn",
    link: contact.linkedin,
    external: true,
    hoverColor: "text-purple-500",
  },
];
</script>

<template>
  <SectionCard id="contact">
    <div class="flex items-center gap-3 mb-8">
      <Icon name="mdi:email" class="w-7 h-7 text-blue-600 dark:text-blue-400" />
      <h2 class="text-3xl font-bold dark:text-white">
        {{ t("contact.title") }}
      </h2>
    </div>

    <div class="max-w-3xl mx-auto">
      <div
        class="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden"
      >
        <div class="p-8">
          <p
            class="text-lg text-gray-600 dark:text-gray-300 mb-8 flex items-start gap-3"
          >
            <Icon
              name="heroicons:chat-bubble-left-right"
              class="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"
            />
            <span>{{ t("contact.intro") }}</span>
          </p>

          <h3
            class="text-xl font-semibold mb-6 dark:text-white flex items-center gap-2"
          >
            <Icon
              name="heroicons:link"
              class="w-5 h-5 text-blue-600 dark:text-blue-400"
            />
            {{ t("contact.social") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <NuxtLink
              v-for="item in contactItems"
              :key="item.link"
              :to="item.link"
              :external="item.external"
              target="_blank"
              class="flex flex-col items-center text-center hover:translate-y-[-2px] transition-transform group py-4 cursor-pointer"
            >
              <Icon
                :name="item.icon"
                class="w-10 h-10 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-all duration-200 mb-3 pointer-events-none"
                :class="{
                  'group-hover:text-red-500': item.icon === 'mdi:email',
                  'group-hover:text-purple-500': item.icon === 'mdi:github',
                  'group-hover:text-blue-500': item.icon === 'mdi:linkedin',
                }"
              />
              <span
                class="text-lg font-medium text-gray-700 dark:text-gray-200 pointer-events-none"
                >{{ item.text }}</span
              >
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </SectionCard>
</template>

<style scoped>
/* Prevent text selection and cursor issues */
::selection {
  background: transparent;
}
</style>
