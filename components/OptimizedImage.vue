<script setup lang="ts">
import { computed } from "vue";

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  format?: string;
  quality?: number;
  sizes?: string;
  preset?: string;
  className?: string;
  objectFit?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: 800,
  height: 600,
  format: "webp",
  quality: 80,
  sizes: "sm:100vw md:50vw lg:33vw",
  preset: undefined,
  className: "",
  objectFit: "cover",
});

// Calculate aspect ratio for responsive sizing
const aspectRatioPercentage = computed(() => {
  return `${(props.height / props.width) * 100}%`;
});

// Combine classes
const imageClasses = computed(() => {
  return ["optimized-image", props.className, `object-${props.objectFit}`];
});
</script>

<template>
  <div
    class="optimized-image-container"
    :style="{ paddingBottom: aspectRatioPercentage }"
  >
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :format="format"
      :quality="quality"
      :sizes="sizes"
      :preset="preset"
      :class="imageClasses"
      loading="lazy"
      placeholder
    />
  </div>
</template>

<style scoped>
.optimized-image-container {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.optimized-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}
</style>
