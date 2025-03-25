// Dark mode plugin that runs only on the client side
export default defineNuxtPlugin({
  name: "dark-mode-handler",
  enforce: "pre", // Run before other plugins
  setup() {
    // Access the Nuxt app instance
    const nuxtApp = useNuxtApp();

    // Get the color mode composable
    const colorMode = useColorMode();

    // Function to update HTML classes based on color mode
    function updateDarkModeClass(mode: string) {
      if (mode === "dark") {
        if (!document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.add("dark");
        }
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    // Add event handler for when the app is mounted
    nuxtApp.hook("app:mounted", () => {
      // Initial setup
      updateDarkModeClass(colorMode.value);

      // Handle system preference changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (colorMode.preference === "system") {
            updateDarkModeClass(e.matches ? "dark" : "light");
          }
        });

      // Watch for changes in color mode
      watch(() => colorMode.value, updateDarkModeClass);
    });
  },
});
