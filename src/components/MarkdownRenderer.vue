<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps<{
  content: string;
}>();

const renderedContent = computed(() => {
  return marked(props.content);
});
</script>

<style scoped>
.markdown-content {
  line-height: 1.8;
  color: var(--text-primary);
}

.markdown-content :deep(h1) {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 2rem 0 1rem;
  color: var(--text-primary);
}

.markdown-content :deep(h2) {
  font-size: 2rem;
  font-weight: 600;
  margin: 1.8rem 0 0.8rem;
  color: var(--text-primary);
}

.markdown-content :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1.5rem 0 0.8rem;
  color: var(--text-primary);
}

.markdown-content :deep(p) {
  margin: 1rem 0;
  font-size: 1.1rem;
}

.markdown-content :deep(a) {
  color: var(--accent);
  text-decoration: none;
  border-bottom: 1px solid var(--accent);
  transition: opacity 0.2s;
}

.markdown-content :deep(a:hover) {
  opacity: 0.7;
}

.markdown-content :deep(code) {
  background: var(--code-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: var(--code-text);
}

.markdown-content :deep(pre) {
  background: var(--code-bg);
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--code-text);
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  color: var(--text-secondary);
  font-style: italic;
}

.markdown-content :deep(ul), .markdown-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.markdown-content :deep(li) {
  margin: 0.5rem 0;
}

.markdown-content :deep(strong) {
  font-weight: 600;
  color: var(--text-primary);
}

.markdown-content :deep(em) {
  font-style: italic;
}

.markdown-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1.5rem 0;
}
</style>