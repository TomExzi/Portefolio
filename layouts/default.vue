<template>
  <div class="layout-container">
    <NavBar />
    <slot />
  </div>
</template>

<style>
.layout-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
