<template>
  <div class="personal-home">
    <div class="container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="glitch-wrapper">
          <h1 class="name-title" data-text="Forte Scarlet">Forte Scarlet</h1>
        </div>
        <p class="subtitle">// Building the future, one commit at a time</p>
        <div class="status-bar">
          <span class="status-item">
            <span class="status-dot"></span>
            Available for collaboration
          </span>
          <span class="status-item">
            <span class="blink">▊</span>
          </span>
        </div>
      </section>

      <!-- Bio Section -->
      <section class="bio-section">
        <div class="terminal-window">
          <div class="terminal-header">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-title">~/forte-scarlet</span>
          </div>
          <div class="terminal-body">
            <p class="terminal-line">
              <span class="prompt">$</span> cat about.txt
            </p>
            <p class="terminal-line output">
              Developer | Open Source Enthusiast | Code Architect
            </p>
            <p class="terminal-line output">
              "Code is poetry written in logic"
            </p>
            <p class="terminal-line">
              <span class="prompt">$</span> cat skills.json
            </p>
            <p class="terminal-line output">
              {<br>
              &nbsp;&nbsp;"languages": ["TypeScript", "Kotlin", "Java", "Python"],<br>
              &nbsp;&nbsp;"frameworks": ["Vue", "Spring", "Ktor"],<br>
              &nbsp;&nbsp;"interests": ["Architecture", "Open Source", "Innovation"]<br>
              }
            </p>
            <p class="terminal-line">
              <span class="prompt">$</span> <span class="blink">▊</span>
            </p>
          </div>
        </div>
      </section>

      <!-- Links Section -->
      <section class="links-section">
        <div class="link-cards">
          <a 
            href="https://github.com/ForteScarlet/" 
            target="_blank"
            class="link-card github"
          >
            <div class="link-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <div class="link-content">
              <h3>GitHub</h3>
              <p>@ForteScarlet</p>
            </div>
            <div class="link-arrow">→</div>
          </a>

          <router-link to="/blog" class="link-card blog">
            <div class="link-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </div>
            <div class="link-content">
              <h3>Blog</h3>
              <p>Thoughts & Articles</p>
            </div>
            <div class="link-arrow">→</div>
          </router-link>
        </div>
      </section>

      <!-- Easter Egg / Humor Section -->
      <section class="footer-section">
        <div class="code-quote">
          <pre><code>// TODO: Replace this comment with actual world-changing code
// Status: 99 little bugs in the code...
// 99 little bugs... Take one down, patch it around...
// 127 little bugs in the code...</code></pre>
        </div>
        <div class="footer-text">
          <p>{{ currentYear }} © Forte Scarlet</p>
          <p class="footer-joke">Powered by caffeine and Stack Overflow</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.personal-home {
  min-height: 100vh;
  padding: 2rem;
  background: var(--bg-primary);
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 4rem 0 3rem;
  margin-bottom: 4rem;
}

.glitch-wrapper {
  position: relative;
  display: inline-block;
}

.name-title {
  font-size: 4.5rem;
  font-weight: 700;
  letter-spacing: -2px;
  color: var(--text-primary);
  margin: 0;
  position: relative;
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  animation: fadeIn 1s ease-in 0.3s both;
}

.status-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
  animation: fadeIn 1s ease-in 0.6s both;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.blink {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Terminal Section */
.bio-section {
  margin-bottom: 4rem;
  animation: fadeIn 1s ease-in 0.9s both;
}

.terminal-window {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px var(--shadow);
}

.terminal-header {
  background: var(--bg-secondary);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dot.red { background: #ff5f56; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green { background: #27c93f; }

.terminal-title {
  margin-left: auto;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
}

.terminal-body {
  padding: 1.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  line-height: 1.8;
}

.terminal-line {
  margin: 0.5rem 0;
  color: var(--text-primary);
}

.prompt {
  color: var(--accent);
  margin-right: 0.5rem;
  font-weight: bold;
}

.output {
  color: var(--text-secondary);
  margin-left: 1.5rem;
}

/* Links Section */
.links-section {
  margin-bottom: 4rem;
  animation: fadeIn 1s ease-in 1.2s both;
}

.link-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--card-bg);
  border: 2px solid var(--border);
  border-radius: 16px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  cursor: pointer;
}

.link-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--shadow);
  border-color: var(--accent);
}

.link-card.github:hover {
  border-color: var(--accent);
}

.link-card.blog:hover {
  border-color: var(--accent);
}

.link-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-secondary);
  border-radius: 12px;
  flex-shrink: 0;
}

.link-icon svg {
  width: 28px;
  height: 28px;
  color: var(--accent);
}

.link-content {
  flex: 1;
}

.link-content h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
}

.link-content p {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.link-arrow {
  font-size: 1.5rem;
  color: var(--accent);
  transition: transform 0.3s ease;
}

.link-card:hover .link-arrow {
  transform: translateX(8px);
}

/* Footer Section */
.footer-section {
  text-align: center;
  padding: 3rem 0;
  animation: fadeIn 1s ease-in 1.5s both;
}

.code-quote {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.code-quote pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: left;
}

.code-quote code {
  color: var(--text-secondary);
}

.footer-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.footer-text p {
  margin: 0.5rem 0;
}

.footer-joke {
  font-style: italic;
  opacity: 0.7;
}

/* Responsive Design */
@media (max-width: 768px) {
  .personal-home {
    padding: 1rem;
  }

  .name-title {
    font-size: 2.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .link-cards {
    grid-template-columns: 1fr;
  }

  .terminal-body {
    font-size: 0.85rem;
    padding: 1rem;
  }

  .code-quote {
    padding: 1rem;
  }

  .code-quote pre {
    font-size: 0.75rem;
  }
}

/* Theme-specific adjustments */
:root[data-theme="punk"] .terminal-dot.red { background: #ff00ff; }
:root[data-theme="punk"] .terminal-dot.yellow { background: #00ff9f; }
:root[data-theme="punk"] .terminal-dot.green { background: #00ffff; }
</style>