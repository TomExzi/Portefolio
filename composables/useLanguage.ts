export type LanguageCode = "en" | "fr" | "nl";

// Simpler implementation of useLanguage that avoids composable nesting issues
export function useLanguage() {
  // Return the function to be called within setup functions
  return {
    // Method to switch the language manually
    switchLanguage: (locale: string, path: string) => {
      // Simple redirect to the new path
      window.location.href = path;
    },
  };
}
