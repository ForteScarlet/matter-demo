<template>
  <div class="game-view">
    <div class="game-container">
      <router-link to="/games" class="back-link">← Back to Games</router-link>
      <TankBattle />
    </div>
  </div>
</template>

<script setup lang="ts">
import TankBattle from '../components/games/TankBattle.vue';
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg);
}

.game-container {
  max-width: 1200px;
  margin: 0 auto;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: transform 0.2s;
}

.back-link:hover {
  transform: translateX(-4px);
}

@media (max-width: 768px) {
  .game-view {
    padding: 1rem;
  }
}
</style>