import { ref } from "vue";

export function useScroll() {
  const scrollPosition = ref(0);
  const showFooter = ref(false);
  const isScrolling = ref(false);

  function updateScrollPosition(element: HTMLElement) {
    if (!element) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    scrollPosition.value = scrollTop;

    // Show footer when near bottom (within 100px)
    const scrolledToBottom = scrollHeight - scrollTop - clientHeight < 100;
    showFooter.value = scrolledToBottom;
  }

  function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    const mainContent = document.querySelector("main");

    if (!section || !mainContent) return;

    // Prevent multiple concurrent scroll operations
    if (isScrolling.value) return;
    isScrolling.value = true;

    try {
      // Calculate position with proper offset
      const headerOffset = 80; // Adjust offset as needed
      const offset = section.offsetTop - headerOffset;

      mainContent.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      // Update URL hash without triggering scroll
      history.pushState(null, "", `#${sectionId}`);
    } catch (error) {
      console.error("Error scrolling to section:", error);
    } finally {
      // Reset scrolling state after animation completes
      setTimeout(() => {
        isScrolling.value = false;
      }, 1000); // Typical scroll animation duration
    }
  }

  return {
    scrollPosition,
    showFooter,
    isScrolling,
    updateScrollPosition,
    scrollToSection,
  };
}
