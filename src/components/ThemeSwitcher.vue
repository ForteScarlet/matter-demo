<template>
  <div class="theme-switcher">
    <button
      v-for="t in themes"
      :key="t.value"
      :class="['theme-btn', { active: theme === t.value }]"
      @click="setTheme(t.value)"
      :title="`Switch to ${t.label} theme`"
    >
      {{ t.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';
import type { Theme } from '../types/blog';

const { theme, setTheme } = useTheme();

const themes = [
  { value: 'day' as Theme, label: 'Day' },
  { value: 'night' as Theme, label: 'Night' },
  { value: 'punk' as Theme, label: 'Punk Girl' }
];
</script>

<style scoped>
.theme-switcher {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.theme-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background: var(--accent);
  color: var(--bg-primary);
  border-color: var(--accent);
}

.theme-btn.active {
  background: var(--accent);
  color: var(--bg-primary);
  border-color: var(--accent);
}
</style>