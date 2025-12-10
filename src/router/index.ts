import { createRouter, createWebHistory } from 'vue-router';
import HomePagePersonal from '../views/HomePagePersonal.vue';
import BlogListPage from '../views/BlogListPage.vue';
import PostDetail from '../views/PostDetail.vue';
import SearchPage from '../views/SearchPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePagePersonal
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogListPage
    },
    {
      path: '/blog/:id',
      name: 'post',
      component: PostDetail
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage
    }
  ]
});

export default router;