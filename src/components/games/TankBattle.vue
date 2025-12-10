<template>
  <div class="tank-battle">
    <div class="game-header">
      <div class="score-container">
        <div class="score-label">Score</div>
        <div class="score-value">{{ score }}</div>
      </div>
      <div class="lives-container">
        <div class="lives-label">Lives</div>
        <div class="lives-value">{{ lives }}</div>
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
      Use arrow keys to move, Space to shoot. Defend your base from enemy tanks!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Position {
  x: number;
  y: number;
}

interface Tank {
  x: number;
  y: number;
  direction: number;
}

interface Bullet {
  x: number;
  y: number;
  dx: number;
  dy: number;
  enemy: boolean;
}

const canvasSize = 500;
const tankSize = 20;
const bulletSize = 4;
const enemySpawnInterval = 3000;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const lives = ref(3);
const gameOver = ref(false);

const player = ref<Tank>({ x: 240, y: 460, direction: 0 });
const enemies = ref<Tank[]>([]);
const bullets = ref<Bullet[]>([]);
const base = ref<Position>({ x: 240, y: 480 });

let gameLoop: number | null = null;
let enemySpawnTimer: number | null = null;

const drawTank = (ctx: CanvasRenderingContext2D, tank: Tank, color: string) => {
  ctx.save();
  ctx.translate(tank.x + tankSize / 2, tank.y + tankSize / 2);
  ctx.rotate((tank.direction * Math.PI) / 180);
  ctx.fillStyle = color;
  ctx.fillRect(-tankSize / 2, -tankSize / 2, tankSize, tankSize);
  ctx.fillStyle = '#000';
  ctx.fillRect(-2, -tankSize / 2 - 5, 4, 5);
  ctx.restore();
};

const drawBullet = (ctx: CanvasRenderingContext2D, bullet: Bullet) => {
  ctx.fillStyle = bullet.enemy ? '#ef4444' : '#3b82f6';
  ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
};

const drawBase = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(base.value.x - 10, base.value.y - 10, 20, 20);
};

const draw = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  
  drawBase(ctx);
  drawTank(ctx, player.value, '#3b82f6');
  
  enemies.value.forEach(enemy => {
    drawTank(ctx, enemy, '#ef4444');
  });
  
  bullets.value.forEach(bullet => {
    drawBullet(ctx, bullet);
  });
};

const spawnEnemy = () => {
  const x = Math.floor(Math.random() * (canvasSize - tankSize));
  enemies.value.push({
    x,
    y: 0,
    direction: 180
  });
};

const shoot = (fromEnemy = false) => {
  const tank = fromEnemy ? enemies.value[Math.floor(Math.random() * enemies.value.length)] : player.value;
  if (!tank) return;
  
  const angle = (tank.direction * Math.PI) / 180;
  bullets.value.push({
    x: tank.x + tankSize / 2,
    y: tank.y + tankSize / 2,
    dx: Math.sin(angle) * 3,
    dy: -Math.cos(angle) * 3,
    enemy: fromEnemy
  });
};

const update = () => {
  if (gameOver.value) return;
  
  const newBullets: Bullet[] = [];
  
  bullets.value.forEach(bullet => {
    bullet.x += bullet.dx;
    bullet.y += bullet.dy;
    
    if (bullet.x < 0 || bullet.x > canvasSize || bullet.y < 0 || bullet.y > canvasSize) {
      return;
    }
    
    let keep = true;
    
    if (!bullet.enemy) {
      enemies.value.forEach((enemy, index) => {
        if (keep && bullet.x > enemy.x && bullet.x < enemy.x + tankSize && bullet.y > enemy.y && bullet.y < enemy.y + tankSize) {
          enemies.value.splice(index, 1);
          score.value += 100;
          keep = false;
        }
      });
    } else {
      if (bullet.x > player.value.x && bullet.x < player.value.x + tankSize && bullet.y > player.value.y && bullet.y < player.value.y + tankSize) {
        lives.value = lives.value - 1;
        if (lives.value <= 0) {
          gameOver.value = true;
          if (gameLoop) cancelAnimationFrame(gameLoop);
          if (enemySpawnTimer) clearInterval(enemySpawnTimer);
        }
        keep = false;
      }
      
      if (keep && bullet.x > base.value.x - 10 && bullet.x < base.value.x + 10 && bullet.y > base.value.y - 10 && bullet.y < base.value.y + 10) {
        lives.value = 0;
        gameOver.value = true;
        if (gameLoop) cancelAnimationFrame(gameLoop);
        if (enemySpawnTimer) clearInterval(enemySpawnTimer);
        keep = false;
      }
    }
    
    if (keep) {
      newBullets.push(bullet);
    }
  });
  
  bullets.value = newBullets;
  
  enemies.value.forEach(enemy => {
    enemy.y += 0.5;
    
    if (Math.random() < 0.01) {
      shoot(true);
    }
  });
  
  enemies.value = enemies.value.filter(enemy => enemy.y < canvasSize);
  
  draw();
  
  if (!gameOver.value) {
    gameLoop = requestAnimationFrame(update);
  }
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (gameOver.value) return;
  
  const speed = 5;
  
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      player.value.direction = 0;
      if (player.value.y > 0) player.value.y -= speed;
      break;
    case 'ArrowDown':
      e.preventDefault();
      player.value.direction = 180;
      if (player.value.y < canvasSize - tankSize) player.value.y += speed;
      break;
    case 'ArrowLeft':
      e.preventDefault();
      player.value.direction = 270;
      if (player.value.x > 0) player.value.x -= speed;
      break;
    case 'ArrowRight':
      e.preventDefault();
      player.value.direction = 90;
      if (player.value.x < canvasSize - tankSize) player.value.x += speed;
      break;
    case ' ':
      e.preventDefault();
      shoot(false);
      break;
  }
};

const resetGame = () => {
  player.value = { x: 240, y: 460, direction: 0 };
  enemies.value = [];
  bullets.value = [];
  score.value = 0;
  lives.value = 3;
  gameOver.value = false;
  
  if (gameLoop) cancelAnimationFrame(gameLoop);
  if (enemySpawnTimer) clearInterval(enemySpawnTimer);
  
  enemySpawnTimer = window.setInterval(spawnEnemy, enemySpawnInterval);
  gameLoop = requestAnimationFrame(update);
  canvasRef.value?.focus();
};

onMounted(() => {
  enemySpawnTimer = window.setInterval(spawnEnemy, enemySpawnInterval);
  gameLoop = requestAnimationFrame(update);
  canvasRef.value?.focus();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop);
  if (enemySpawnTimer) clearInterval(enemySpawnTimer);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.tank-battle {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.score-container, .lives-container {
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 8px;
  padding: 1rem 1.5rem;
}

.score-label, .lives-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
}

.score-value, .lives-value {
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
  cursor: crosshair;
  margin: 0 auto;
}

.instructions {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .tank-battle {
    padding: 1rem;
  }
  
  .game-header {
    justify-content: center;
  }
}
</style>