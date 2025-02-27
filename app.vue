<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
}

/* Add smooth transitions for dark mode */
.dark-mode-transition {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

/* Apply the transition to common elements */
body,
.dark-mode-transition * {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out,
    border-color 0.3s ease-in-out;
}
</style>
