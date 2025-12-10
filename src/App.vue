<template>
  <div class="app">
    <Navigation />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from './components/Navigation.vue';
import { useTheme } from './composables/useTheme';

// Initialize theme
useTheme();
</script>

<style>
:root[data-theme="day"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --card-bg: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --accent: #4a90e2;
  --border: #e0e0e0;
  --shadow: rgba(0, 0, 0, 0.1);
  --tag-bg: #f0f0f0;
  --code-bg: #f5f5f5;
  --code-text: #333333;
}

:root[data-theme="night"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #0d0d0d;
  --card-bg: #252525;
  --text-primary: #e0e0e0;
  --text-secondary: #a0a0a0;
  --accent: #64b5f6;
  --border: #3a3a3a;
  --shadow: rgba(0, 0, 0, 0.5);
  --tag-bg: #333333;
  --code-bg: #2a2a2a;
  --code-text: #e0e0e0;
}

:root[data-theme="punk"] {
  --bg-primary: #0a0015;
  --bg-secondary: #150025;
  --card-bg: #1a0030;
  --text-primary: #ff00ff;
  --text-secondary: #cc00cc;
  --accent: #00ff9f;
  --border: #ff00ff;
  --shadow: rgba(255, 0, 255, 0.3);
  --tag-bg: #2a0045;
  --code-bg: #1a0030;
  --code-text: #00ffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
  line-height: 1.6;
}

.app {
  min-height: 100vh;
}

.main-content {
  background: var(--bg-primary);
  min-height: calc(100vh - 80px);
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>
