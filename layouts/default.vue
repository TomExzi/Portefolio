<template>
  <div class="layout-container">
    <NavBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
// Provide a default scrollToSection function for the NavBar
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

provide("scrollToSection", scrollToSection);
</script>

<style>
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
