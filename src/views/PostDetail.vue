<template>
  <div class="post-detail">
    <div v-if="post" class="post-container">
      <!-- Header -->
      <header class="post-header">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-category">{{ post.category }}</span>
        </div>
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-author">By {{ post.author }}</div>
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </header>

      <!-- Content -->
      <div class="post-content">
        <MarkdownRenderer :content="post.content" />
      </div>

      <!-- Navigation -->
      <footer class="post-footer">
        <button class="back-btn" @click="goBack">← Back to Home</button>
      </footer>
    </div>

    <div v-else class="not-found">
      <h2>Post not found</h2>
      <button class="back-btn" @click="goBack">← Back to Home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { posts } from '../data/posts';
import MarkdownRenderer from '../components/MarkdownRenderer.vue';

const route = useRoute();
const router = useRouter();

const post = computed(() => posts.find(p => p.id === route.params.id));

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.post-detail {
  min-height: 100vh;
  padding: 2rem;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.post-date {
  font-weight: 500;
}

.post-category {
  background: var(--accent);
  color: var(--bg-primary);
  padding: 0.3rem 1rem;
  border-radius: 16px;
  font-weight: 500;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 1rem 0;
  color: var(--text-primary);
  line-height: 1.2;
  letter-spacing: -1px;
}

.post-author {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 1rem 0;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.tag {
  background: var(--tag-bg);
  color: var(--text-secondary);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.post-content {
  margin: 3rem 0;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: var(--accent);
  color: var(--bg-primary);
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.3s;
}

.back-btn:hover {
  opacity: 0.8;
}

.not-found {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .post-detail {
    padding: 1rem;
  }

  .post-title {
    font-size: 2rem;
  }
}
</style>