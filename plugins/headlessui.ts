import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("Menu", Menu);
  nuxtApp.vueApp.component("MenuButton", MenuButton);
  nuxtApp.vueApp.component("MenuItem", MenuItem);
  nuxtApp.vueApp.component("MenuItems", MenuItems);
});
