<template>
  <div class="game-2048">
    <div class="game-header">
      <div class="score-container">
        <div class="score-label">Score</div>
        <div class="score-value">{{ score }}</div>
      </div>
      <button @click="resetGame" class="reset-btn">New Game</button>
    </div>
    
    <div v-if="gameOver" class="game-over">
      <h2>Game Over!</h2>
      <p>Final Score: {{ score }}</p>
      <button @click="resetGame" class="play-again-btn">Play Again</button>
    </div>
    
    <div v-if="won && !gameOver" class="game-won">
      <h2>You Win!</h2>
      <button @click="continueGame" class="continue-btn">Continue</button>
      <button @click="resetGame" class="play-again-btn">New Game</button>
    </div>
    
    <div class="grid" @keydown="handleKeyDown" tabindex="0" ref="gridRef">
      <div
        v-for="(tile, index) in tiles"
        :key="index"
        class="cell"
        :class="`tile-${tile}`"
      >
        <span v-if="tile">{{ tile }}</span>
      </div>
    </div>
    
    <div class="instructions">
      Use arrow keys to move tiles. Combine tiles with same numbers to reach 2048!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const score = ref(0);
const gameOver = ref(false);
const won = ref(false);
const tiles = ref<number[]>(Array(16).fill(0));
const gridRef = ref<HTMLElement | null>(null);

const initGame = () => {
  tiles.value = Array(16).fill(0);
  score.value = 0;
  gameOver.value = false;
  won.value = false;
  addRandomTile();
  addRandomTile();
};

const addRandomTile = () => {
  const emptyIndices = tiles.value
    .map((tile, index) => (tile === 0 ? index : -1))
    .filter(index => index !== -1);
  
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    tiles.value[randomIndex] = Math.random() < 0.9 ? 2 : 4;
  }
};

const getRow = (index: number) => Math.floor(index / 4);
const getCol = (index: number) => index % 4;
const getIndex = (row: number, col: number) => row * 4 + col;

const move = (direction: 'up' | 'down' | 'left' | 'right') => {
  const newTiles = [...tiles.value];
  let moved = false;
  let scoreIncrease = 0;

  const processLine = (line: number[]) => {
    const filtered = line.filter(x => x !== 0);
    const merged: number[] = [];
    let lineScore = 0;
    
    for (let i = 0; i < filtered.length; i++) {
      if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
        const mergedValue = filtered[i] * 2;
        merged.push(mergedValue);
        lineScore += mergedValue;
        if (mergedValue === 2048) won.value = true;
        i++;
      } else {
        merged.push(filtered[i]);
      }
    }
    
    while (merged.length < 4) merged.push(0);
    return { newLine: merged, score: lineScore };
  };

  if (direction === 'left' || direction === 'right') {
    for (let row = 0; row < 4; row++) {
      let line = [0, 1, 2, 3].map(col => newTiles[getIndex(row, col)]);
      if (direction === 'right') line.reverse();
      
      const result = processLine(line);
      scoreIncrease += result.score;
      
      if (direction === 'right') result.newLine.reverse();
      
      for (let col = 0; col < 4; col++) {
        const oldValue = newTiles[getIndex(row, col)];
        const newValue = result.newLine[col];
        if (oldValue !== newValue) moved = true;
        newTiles[getIndex(row, col)] = newValue;
      }
    }
  } else {
    for (let col = 0; col < 4; col++) {
      let line = [0, 1, 2, 3].map(row => newTiles[getIndex(row, col)]);
      if (direction === 'down') line.reverse();
      
      const result = processLine(line);
      scoreIncrease += result.score;
      
      if (direction === 'down') result.newLine.reverse();
      
      for (let row = 0; row < 4; row++) {
        const oldValue = newTiles[getIndex(row, col)];
        const newValue = result.newLine[row];
        if (oldValue !== newValue) moved = true;
        newTiles[getIndex(row, col)] = newValue;
      }
    }
  }

  if (moved) {
    tiles.value = newTiles;
    score.value += scoreIncrease;
    addRandomTile();
    checkGameOver();
  }
};

const checkGameOver = () => {
  if (tiles.value.some(tile => tile === 0)) return;
  
  for (let i = 0; i < 16; i++) {
    const row = getRow(i);
    const col = getCol(i);
    const current = tiles.value[i];
    
    if (col < 3 && tiles.value[getIndex(row, col + 1)] === current) return;
    if (row < 3 && tiles.value[getIndex(row + 1, col)] === current) return;
  }
  
  gameOver.value = true;
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (gameOver.value) return;
  
  const keyMap: Record<string, 'up' | 'down' | 'left' | 'right'> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  };
  
  const direction = keyMap[e.key];
  if (direction) {
    e.preventDefault();
    move(direction);
  }
};

const resetGame = () => {
  initGame();
  gridRef.value?.focus();
};

const continueGame = () => {
  won.value = false;
  gridRef.value?.focus();
};

onMounted(() => {
  initGame();
  gridRef.value?.focus();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.game-2048 {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.score-container {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 1rem 1.5rem;
}

.score-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
}

.score-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent);
}

.reset-btn, .play-again-btn, .continue-btn {
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.reset-btn:hover, .play-again-btn:hover, .continue-btn:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.game-over, .game-won {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.game-over h2, .game-won h2 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.game-over p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.game-won .continue-btn {
  margin-right: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 10px;
  position: relative;
  outline: none;
}

.cell {
  aspect-ratio: 1;
  background: var(--bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  transition: all 0.15s ease;
}

.tile-2 { background: #eee4da; color: #776e65; }
.tile-4 { background: #ede0c8; color: #776e65; }
.tile-8 { background: #f2b179; color: #f9f6f2; }
.tile-16 { background: #f59563; color: #f9f6f2; }
.tile-32 { background: #f67c5f; color: #f9f6f2; }
.tile-64 { background: #f65e3b; color: #f9f6f2; }
.tile-128 { background: #edcf72; color: #f9f6f2; font-size: 1.75rem; }
.tile-256 { background: #edcc61; color: #f9f6f2; font-size: 1.75rem; }
.tile-512 { background: #edc850; color: #f9f6f2; font-size: 1.75rem; }
.tile-1024 { background: #edc53f; color: #f9f6f2; font-size: 1.5rem; }
.tile-2048 { background: #edc22e; color: #f9f6f2; font-size: 1.5rem; }

.instructions {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .game-2048 {
    padding: 1rem;
  }
  
  .cell {
    font-size: 1.5rem;
  }
  
  .tile-128, .tile-256, .tile-512 {
    font-size: 1.25rem;
  }
  
  .tile-1024, .tile-2048 {
    font-size: 1rem;
  }
}
</style>