<template>
  <div class="breakout-game">
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
    
    <div v-if="won" class="game-won">
      <h2>You Win!</h2>
      <p>Score: {{ score }}</p>
      <button @click="resetGame" class="play-again-btn">New Game</button>
    </div>
    
    <canvas 
      ref="canvasRef" 
      :width="canvasWidth" 
      :height="canvasHeight"
      @mousemove="handleMouseMove"
      class="game-canvas"
    ></canvas>
    
    <div class="instructions">
      Move your mouse to control the paddle. Break all the bricks to win!
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Brick {
  x: number;
  y: number;
  status: number;
  color: string;
}

const canvasWidth = 480;
const canvasHeight = 400;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const score = ref(0);
const lives = ref(3);
const gameOver = ref(false);
const won = ref(false);

const ball = ref({
  x: canvasWidth / 2,
  y: canvasHeight - 30,
  dx: 2,
  dy: -2,
  radius: 8
});

const paddle = ref({
  width: 75,
  height: 10,
  x: (canvasWidth - 75) / 2
});

const brickRowCount = 5;
const brickColumnCount = 8;
const brickWidth = 55;
const brickHeight = 20;
const brickPadding = 5;
const brickOffsetTop = 30;
const brickOffsetLeft = 15;

const bricks = ref<Brick[][]>([]);
let gameLoop: number | null = null;

const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

const initBricks = () => {
  bricks.value = [];
  for (let c = 0; c < brickColumnCount; c++) {
    bricks.value[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
      bricks.value[c][r] = {
        x: c * (brickWidth + brickPadding) + brickOffsetLeft,
        y: r * (brickHeight + brickPadding) + brickOffsetTop,
        status: 1,
        color: colors[r]
      };
    }
  }
};

const drawBall = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(ball.value.x, ball.value.y, ball.value.radius, 0, Math.PI * 2);
  ctx.fillStyle = '#3b82f6';
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.rect(paddle.value.x, canvasHeight - paddle.value.height - 10, paddle.value.width, paddle.value.height);
  ctx.fillStyle = '#8b5cf6';
  ctx.fill();
  ctx.closePath();
};

const drawBricks = (ctx: CanvasRenderingContext2D) => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks.value[c][r].status === 1) {
        const brick = bricks.value[c][r];
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const collisionDetection = () => {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const brick = bricks.value[c][r];
      if (brick.status === 1) {
        if (
          ball.value.x > brick.x &&
          ball.value.x < brick.x + brickWidth &&
          ball.value.y > brick.y &&
          ball.value.y < brick.y + brickHeight
        ) {
          ball.value.dy = -ball.value.dy;
          brick.status = 0;
          score.value += 10;
          
          if (score.value === brickRowCount * brickColumnCount * 10) {
            won.value = true;
            if (gameLoop) cancelAnimationFrame(gameLoop);
          }
        }
      }
    }
  }
};

const draw = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
  drawBricks(ctx);
  drawBall(ctx);
  drawPaddle(ctx);
  collisionDetection();
  
  if (ball.value.x + ball.value.dx > canvasWidth - ball.value.radius || ball.value.x + ball.value.dx < ball.value.radius) {
    ball.value.dx = -ball.value.dx;
  }
  
  if (ball.value.y + ball.value.dy < ball.value.radius) {
    ball.value.dy = -ball.value.dy;
  } else if (ball.value.y + ball.value.dy > canvasHeight - ball.value.radius - 10) {
    if (ball.value.x > paddle.value.x && ball.value.x < paddle.value.x + paddle.value.width) {
      ball.value.dy = -ball.value.dy;
    } else {
      lives.value--;
      if (lives.value === 0) {
        gameOver.value = true;
        if (gameLoop) cancelAnimationFrame(gameLoop);
      } else {
        ball.value.x = canvasWidth / 2;
        ball.value.y = canvasHeight - 30;
        ball.value.dx = 2;
        ball.value.dy = -2;
        paddle.value.x = (canvasWidth - paddle.value.width) / 2;
      }
    }
  }
  
  ball.value.x += ball.value.dx;
  ball.value.y += ball.value.dy;
  
  if (!gameOver.value && !won.value) {
    gameLoop = requestAnimationFrame(draw);
  }
};

const handleMouseMove = (e: MouseEvent) => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  
  const rect = canvas.getBoundingClientRect();
  const relativeX = e.clientX - rect.left;
  
  if (relativeX > 0 && relativeX < canvasWidth) {
    paddle.value.x = relativeX - paddle.value.width / 2;
  }
};

const resetGame = () => {
  ball.value = {
    x: canvasWidth / 2,
    y: canvasHeight - 30,
    dx: 2,
    dy: -2,
    radius: 8
  };
  paddle.value.x = (canvasWidth - paddle.value.width) / 2;
  score.value = 0;
  lives.value = 3;
  gameOver.value = false;
  won.value = false;
  initBricks();
  if (gameLoop) cancelAnimationFrame(gameLoop);
  gameLoop = requestAnimationFrame(draw);
};

onMounted(() => {
  initBricks();
  gameLoop = requestAnimationFrame(draw);
});

onUnmounted(() => {
  if (gameLoop) cancelAnimationFrame(gameLoop);
});
</script>

<style scoped>
.breakout-game {
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

.game-over p, .game-won p {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.game-canvas {
  display: block;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: #1a1a1a;
  cursor: none;
  margin: 0 auto;
}

.instructions {
  margin-top: 2rem;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 600px) {
  .breakout-game {
    padding: 1rem;
  }
  
  .game-header {
    justify-content: center;
  }
}
</style>