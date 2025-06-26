export default defineNuxtRouteMiddleware((to) => {
  // Access the Nuxt app instance to get our custom i18n
  const { $setLocale } = useNuxtApp();

  // Extract language from path
  const pathSegments = to.path.split("/").filter(Boolean);
  const possibleLang = pathSegments[0];

  // Set locale based on URL using our custom function
  if (possibleLang === "fr") {
    $setLocale("fr");
  } else if (possibleLang === "nl") {
    $setLocale("nl");
  } else {
    $setLocale("en");
  }
});
