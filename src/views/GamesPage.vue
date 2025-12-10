<template>
  <div class="games-page">
    <div class="games-container">
      <h1 class="games-title">Games</h1>
      <p class="games-subtitle">Choose a game to play</p>
      
      <div class="games-grid">
        <router-link 
          v-for="game in games" 
          :key="game.id"
          :to="`/games/${game.id}`"
          class="game-card"
        >
          <div class="game-icon">{{ game.icon }}</div>
          <h3 class="game-name">{{ game.name }}</h3>
          <p class="game-description">{{ game.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const games = [
  {
    id: '2048',
    name: '2048',
    icon: '🎮',
    description: 'Combine tiles to reach 2048'
  },
  {
    id: 'snake',
    name: 'Snake',
    icon: '🐍',
    description: 'Classic snake game'
  },
  {
    id: 'breakout',
    name: 'Breakout',
    icon: '🧱',
    description: 'Break all the bricks'
  },
  {
    id: 'tank',
    name: 'Tank Battle',
    icon: '🚀',
    description: 'Defend your base'
  }
];
</script>

<style scoped>
.games-page {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: var(--bg);
}

.games-container {
  max-width: 1200px;
  margin: 0 auto;
}

.games-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  text-align: center;
}

.games-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 3rem;
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.game-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--accent);
}

.game-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.game-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.game-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .games-page {
    padding: 2rem 1rem;
  }
  
  .games-title {
    font-size: 2rem;
  }
  
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>