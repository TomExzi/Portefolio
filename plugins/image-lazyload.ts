// Plugin to handle image lazy loading
export default defineNuxtPlugin({
  name: "image-lazyload",
  enforce: "pre", // Run before other plugins
  setup() {
    const nuxtApp = useNuxtApp();

    nuxtApp.hook("app:mounted", () => {
      if (process.client) {
        // Initialize IntersectionObserver for lazy loading images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if ("IntersectionObserver" in window) {
          const imageObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const img = entry.target as HTMLImageElement;
                  const dataSrc = img.getAttribute("data-src");

                  if (dataSrc) {
                    img.src = dataSrc;
                    img.removeAttribute("data-src");
                  }

                  img.classList.add("loaded");
                  imageObserver.unobserve(img);
                }
              });
            },
            {
              rootMargin: "50px 0px",
              threshold: 0.01,
            }
          );

          lazyImages.forEach((img) => {
            imageObserver.observe(img);
          });
        } else {
          // Fallback for browsers that don't support IntersectionObserver
          lazyImages.forEach((img) => {
            const dataSrc = img.getAttribute("data-src");
            if (dataSrc) {
              (img as HTMLImageElement).src = dataSrc;
              img.removeAttribute("data-src");
            }
          });
        }
      }
    });
  },
});
