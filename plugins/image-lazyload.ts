// Plugin to handle image lazy loading with improved performance
export default defineNuxtPlugin({
  name: "image-lazyload",
  enforce: "pre", // Run before other plugins
  setup() {
    const nuxtApp = useNuxtApp();

    nuxtApp.hook("app:mounted", () => {
      if (process.client) {
        // Function to load and process images
        const processLazyImages = () => {
          const lazyImages = document.querySelectorAll('img[loading="lazy"]');

          if ("IntersectionObserver" in window) {
            // Use a more performant IntersectionObserver with better threshold options
            const imageObserver = new IntersectionObserver(
              (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const dataSrc = img.getAttribute("data-src");

                    if (dataSrc) {
                      // Create a new image to preload
                      const preloader = new Image();
                      preloader.onload = () => {
                        // Only swap the src after the image has loaded
                        img.src = dataSrc;
                        img.removeAttribute("data-src");
                        img.classList.add("loaded");
                      };
                      preloader.src = dataSrc;
                    } else {
                      img.classList.add("loaded");
                    }

                    // Unobserve the image once it's processed
                    imageObserver.unobserve(img);
                  }
                });
              },
              {
                rootMargin: "200px 0px", // Load images 200px before they come into view
                threshold: 0.01,
              }
            );

            lazyImages.forEach((img) => {
              // Only observe images that aren't already loaded
              if (!img.classList.contains("loaded")) {
                imageObserver.observe(img);
              }
            });
          } else {
            // Fallback for browsers that don't support IntersectionObserver
            lazyImages.forEach((img) => {
              const dataSrc = img.getAttribute("data-src");
              if (dataSrc) {
                (img as HTMLImageElement).src = dataSrc;
                img.removeAttribute("data-src");
              }
              img.classList.add("loaded");
            });
          }
        };

        // Process images on initial load
        processLazyImages();

        // Also monitor DOM changes to handle dynamically added images
        if ("MutationObserver" in window) {
          const observer = new MutationObserver((mutations) => {
            let hasNewImages = false;

            mutations.forEach((mutation) => {
              if (
                mutation.type === "childList" &&
                mutation.addedNodes.length > 0
              ) {
                mutation.addedNodes.forEach((node) => {
                  if (node.nodeType === 1) {
                    // Element node
                    const element = node as Element;
                    if (
                      element.tagName === "IMG" &&
                      element.getAttribute("loading") === "lazy"
                    ) {
                      hasNewImages = true;
                    } else if (element.querySelectorAll) {
                      const images = element.querySelectorAll(
                        'img[loading="lazy"]'
                      );
                      if (images.length > 0) {
                        hasNewImages = true;
                      }
                    }
                  }
                });
              }
            });

            if (hasNewImages) {
              processLazyImages();
            }
          });

          observer.observe(document.body, {
            childList: true,
            subtree: true,
          });

          // Process images after page transitions
          nuxtApp.hook("page:transition:finish", () => {
            processLazyImages();
          });

          // Store the observer for cleanup
          const appCleanup = () => {
            observer.disconnect();
          };

          // Add a cleanup event listener instead of using a hook
          window.addEventListener("beforeunload", appCleanup);
        }
      }
    });
  },
});
