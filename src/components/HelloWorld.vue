<template>
  <section>
    <p>{{ msg }}</p>
    <button @click="count++">点击次数：{{ count }}</button>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  msg?: string
}>()

const msg = props.msg ?? 'Hello'
const count = ref(0)
</script>

<style scoped>
section {
  margin-top: 1rem;
}
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
