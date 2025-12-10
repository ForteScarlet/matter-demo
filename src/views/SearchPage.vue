<template>
  <div class="search-page">
    <div class="search-container">
      <div class="search-header">
        <h1>Search Posts</h1>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search by title, content, tags, or category..."
        />
      </div>

      <div class="filters">
        <div class="filter-group">
          <h3>Categories</h3>
          <div class="filter-options">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="['filter-btn', { active: selectedCategory === cat }]"
              @click="toggleCategory(cat)"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="filter-group">
          <h3>Tags</h3>
          <div class="filter-options">
            <button
              v-for="tag in allTags"
              :key="tag"
              :class="['filter-btn', { active: selectedTags.includes(tag) }]"
              @click="toggleTag(tag)"
            >
              #{{ tag }}
            </button>
          </div>
        </div>
      </div>

      <div class="results">
        <div class="results-header">
          <h2>{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'Post' : 'Posts' }} Found</h2>
          <button v-if="hasFilters" class="clear-btn" @click="clearFilters">Clear All</button>
        </div>

        <div v-if="filteredPosts.length > 0" class="posts-list">
          <article
            v-for="post in filteredPosts"
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
              <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
            </div>
          </article>
        </div>

        <div v-else class="no-results">
          <p>No posts found matching your criteria.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { posts } from '../data/posts';
import type { BlogPost } from '../types/blog';

const router = useRouter();
const searchQuery = ref('');
const selectedCategory = ref<string | null>(null);
const selectedTags = ref<string[]>([]);

const categories = computed(() => {
  const cats = new Set(posts.map((p: BlogPost) => p.category));
  return Array.from(cats);
});

const allTags = computed(() => {
  const tags = new Set(posts.flatMap((p: BlogPost) => p.tags));
  return Array.from(tags).sort();
});

const filteredPosts = computed(() => {
  return posts.filter((post: BlogPost) => {
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      const matchesTitle = post.title.toLowerCase().includes(query);
      const matchesContent = post.content.toLowerCase().includes(query);
      const matchesTags = post.tags.some((tag: string) => tag.toLowerCase().includes(query));
      const matchesCategory = post.category.toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesContent && !matchesTags && !matchesCategory) {
        return false;
      }
    }

    if (selectedCategory.value && post.category !== selectedCategory.value) {
      return false;
    }

    if (selectedTags.value.length > 0) {
      const hasAllTags = selectedTags.value.every((tag: string) => post.tags.includes(tag));
      if (!hasAllTags) {
        return false;
      }
    }

    return true;
  });
});

const hasFilters = computed(() => {
  return searchQuery.value !== '' || selectedCategory.value !== null || selectedTags.value.length > 0;
});

const toggleCategory = (category: string) => {
  selectedCategory.value = selectedCategory.value === category ? null : category;
};

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = null;
  selectedTags.value = [];
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const goToPost = (id: string) => {
  router.push(`/blog/${id}`);
};
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  padding: 2rem;
}

.search-container {
  max-width: 1200px;
  margin: 0 auto;
}

.search-header {
  margin-bottom: 3rem;
}

.search-header h1 {
  font-size: 3rem;
  font-weight: 300;
  margin-bottom: 2rem;
  color: var(--text-primary);
  letter-spacing: -1px;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid var(--border);
  border-radius: 12px;
  background: var(--card-bg);
  color: var(--text-primary);
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.filters {
  margin-bottom: 3rem;
}

.filter-group {
  margin-bottom: 2rem;
}

.filter-group h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border);
  background: var(--card-bg);
  color: var(--text-secondary);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent);
  color: var(--bg-primary);
  border-color: var(--accent);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.results-header h2 {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.clear-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: var(--accent);
  color: var(--bg-primary);
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

.no-results {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
}

.no-results p {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .search-page {
    padding: 1rem;
  }

  .search-header h1 {
    font-size: 2rem;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>