<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">Minimalist Blog</h1>
      <p class="hero-subtitle">Elegant writing, beautiful themes</p>
    </section>

    <!-- Featured Posts -->
    <section class="featured-section">
      <h2 class="section-title">Featured Posts</h2>
      <div class="posts-grid">
        <article
          v-for="post in featuredPosts"
          :key="post.id"
          class="post-card featured"
          @click="goToPost(post.id)"
        >
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-category">{{ post.category }}</span>
          </div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- Recent Posts -->
    <section class="recent-section">
      <h2 class="section-title">Recent Posts</h2>
      <div class="posts-list">
        <article
          v-for="post in recentPosts"
          :key="post.id"
          class="post-card"
          @click="goToPost(post.id)"
        >
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-category">{{ post.category }}</span>
          </div>
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { posts } from '../data/posts';

const router = useRouter();

const featuredPosts = computed(() => posts.filter(p => p.featured));
const recentPosts = computed(() => posts.slice().sort((a, b) => 
  new Date(b.date).getTime() - new Date(a.date).getTime()
));

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const goToPost = (id: string) => {
  router.push(`/post/${id}`);
};
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 0 3rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: -2px;
  margin: 0;
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-secondary);
  margin: 1rem 0 0;
  font-weight: 300;
}

.section-title {
  font-size: 2rem;
  font-weight: 400;
  margin: 3rem 0 2rem;
  color: var(--text-primary);
  letter-spacing: -1px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.post-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border);
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--shadow);
  border-color: var(--accent);
}

.post-card.featured {
  border: 2px solid var(--accent);
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.post-date {
  font-weight: 500;
}

.post-category {
  background: var(--accent);
  color: var(--bg-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.post-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--text-primary);
  line-height: 1.3;
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: var(--tag-bg);
  color: var(--text-secondary);
  padding: 0.3rem 0.8rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .home-page {
    padding: 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>