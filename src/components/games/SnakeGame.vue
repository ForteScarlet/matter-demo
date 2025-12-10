<template>
  <div class="snake-game">
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
    
    <canvas 
      ref="canvasRef" 
      :width="canvasSize" 
      :height="canvasSize"
      @keydown="handleKeyDown"
      tabindex="0"
      class="game-canvas"
    ></canvas>
    
    <div class="instructions">
      Use arrow keys to move the snake. Eat the food to grow and score points!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Position {
  x: number;
  y: number;
}

const canvasSize = 400;
const gridSize = 20;
const cellSize = canvasSize / gridSize;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const gameOver = ref(false);
const snake = ref<Position[]>([{ x: 10, y: 10 }]);
const food = ref<Position>({ x: 15, y: 15 });
const direction = ref<Position>({ x: 1, y: 0 });
const nextDirection = ref<Position>({ x: 1, y: 0 });
let gameLoop: number | null = null;

const drawCell = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
};

const draw = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  
  snake.value.forEach((segment, index) => {
    const color = index === 0 ? '#4ade80' : '#22c55e';
    drawCell(ctx, segment.x, segment.y, color);
  });
  
  drawCell(ctx, food.value.x, food.value.y, '#ef4444');
};

const generateFood = () => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  } while (snake.value.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  
  food.value = newFood;
};

const update = () => {
  if (gameOver.value) return;
  
  direction.value = nextDirection.value;
  
  const head = snake.value[0];
  const newHead: Position = {
    x: (head.x + direction.value.x + gridSize) % gridSize,
    y: (head.y + direction.value.y + gridSize) % gridSize
  };
  
  if (snake.value.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    gameOver.value = true;
    if (gameLoop) cancelAnimationFrame(gameLoop);
    return;
  }
  
  snake.value.unshift(newHead);
  
  if (newHead.x === food.value.x && newHead.y === food.value.y) {
    score.value += 10;
    generateFood();
  } else {
    snake.value.pop();
  }
  
  draw();
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (gameOver.value) return;
  
  const keyMap: Record<string, Position> = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 }
  };
  
  const newDirection = keyMap[e.key];
  if (newDirection) {
    e.preventDefault();
    if (newDirection.x !== -direction.value.x || newDirection.y !== -direction.value.y) {
      nextDirection.value = newDirection;
    }
  }
};

const gameLoopFn = () => {
  update();
  if (!gameOver.value) {
    setTimeout(() => {
      gameLoop = requestAnimationFrame(gameLoopFn);
    }, 100);
  }
};

const resetGame = () => {
  snake.value = [{ x: 10, y: 10 }];
  direction.value = { x: 1, y: 0 };
  nextDirection.value = { x: 1, y: 0 };
  score.value = 0;
  gameOver.value = false;
  generateFood();
  draw();
  if (gameLoop) cancelAnimationFrame(gameLoop);
  gameLoop = requestAnimationFrame(gameLoopFn);
  canvasRef.value?.focus();
};

onMounted(() => {
  generateFood();
  draw();
  gameLoop = requestAnimationFrame(gameLoopFn);
  canvasRef.value?.focus();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.snake-game {
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

.reset-btn, .play-again-btn {
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

.reset-btn:hover, .play-again-btn:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.game-over {
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

.game-over h2 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.game-over p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.game-canvas {
  display: block;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: #1a1a1a;
  outline: none;
  cursor: pointer;
}

.instructions {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .snake-game {
    padding: 1rem;
  }
}
</style>