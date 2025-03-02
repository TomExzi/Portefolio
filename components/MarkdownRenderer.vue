<template>
  <div v-html="compiledMarkdown" />
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import MarkdownIt from "markdown-it";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

const md = new MarkdownIt();
const compiledMarkdown = ref("");

watch(
  () => props.content,
  (newContent) => {
    compiledMarkdown.value = md.render(newContent);
  },
  { immediate: true }
);
</script>

<style scoped>
/* Add any necessary styles here */
</style>
