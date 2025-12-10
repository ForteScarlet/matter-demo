import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PostDetail from '../views/PostDetail.vue';
import SearchPage from '../views/SearchPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/post/:id',
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