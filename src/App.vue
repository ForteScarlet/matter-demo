<template>
  <main>
    <h1>matter-demo</h1>
    <HelloWorld msg="基于 Vite + Vue 3 + TypeScript 的模板" />
  </main>
</template>

<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<style scoped>
main {
  padding: 2rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
}
h1 {
  margin-bottom: 1rem;
}
</style>
