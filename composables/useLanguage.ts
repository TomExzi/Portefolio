import { languages } from "~/config/portfolio.config";

// Improved implementation of useLanguage to reliably switch languages
export function useLanguage() {
  const { locale, setLocale } = useI18n();

  function switchLanguage(langCode: string): void {
    // Validate the language code exists in our config
    const langConfig = languages.find((lang) => lang.code === langCode);
    if (!langConfig) return;

    // Use our simple locale switching
    setLocale(langCode as any);

    // Update the URL path if needed
    const route = useRoute();
    const router = useRouter();

    // Simple path switching based on language
    let newPath = route.path;

    // Remove existing language prefix
    for (const lang of languages) {
      if (lang.path !== "/" && newPath.startsWith(lang.path)) {
        newPath = newPath.substring(lang.path.length) || "/";
        break;
      }
    }

    // Add new language prefix if not default
    if (langConfig.path !== "/") {
      newPath = `${langConfig.path}${newPath === "/" ? "" : newPath}`;
    }

    // Navigate to new path if different
    if (newPath !== route.path) {
      router.push(newPath);
    }
  }

  return {
    switchLanguage,
    currentLocale: computed(() => locale.value),
  };
}
