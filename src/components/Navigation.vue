<template>
  <nav class="navigation">
    <div class="nav-container">
      <router-link to="/" class="logo">FS</router-link>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/blog" class="nav-link">Blog</router-link>
        <router-link to="/search" class="nav-link">Search</router-link>
      </div>

      <ThemeSwitcher />
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue';
</script>

<style scoped>
.navigation {
  background: var(--card-bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  letter-spacing: -1px;
  transition: color 0.3s;
}

.logo:hover {
  color: var(--accent);
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.router-link-active {
  color: var(--accent);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
    flex-wrap: wrap;
  }

  .nav-links {
    order: 3;
    width: 100%;
    justify-content: flex-start;
    gap: 1.5rem;
    margin-top: 1rem;
  }
}
</style>