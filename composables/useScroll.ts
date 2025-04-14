import { ref } from "vue";

export function useScroll() {
  const scrollPosition = ref(0);
  const showFooter = ref(false);

  function updateScrollPosition(element: HTMLElement) {
    const { scrollTop, scrollHeight, clientHeight } = element;
    scrollPosition.value = scrollTop;

    // Show footer when near bottom
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight < 100;
    showFooter.value = scrolledToBottom;
  }

  function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    const mainContent = document.querySelector("main");

    if (section && mainContent) {
      const offset = section.offsetTop - 32; // Adjust offset as needed
      mainContent.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  }

  return {
    scrollPosition,
    showFooter,
    updateScrollPosition,
    scrollToSection,
  };
}
