import { createRouter, createWebHistory } from 'vue-router';
import HomePagePersonal from '../views/HomePagePersonal.vue';
import BlogListPage from '../views/BlogListPage.vue';
import PostDetail from '../views/PostDetail.vue';
import SearchPage from '../views/SearchPage.vue';
import GamesPage from '../views/GamesPage.vue';
import Game2048View from '../views/Game2048View.vue';
import SnakeView from '../views/SnakeView.vue';
import BreakoutView from '../views/BreakoutView.vue';
import TankBattleView from '../views/TankBattleView.vue';

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
    },
    {
      path: '/games',
      name: 'games',
      component: GamesPage
    },
    {
      path: '/games/2048',
      name: 'game-2048',
      component: Game2048View
    },
    {
      path: '/games/snake',
      name: 'game-snake',
      component: SnakeView
    },
    {
      path: '/games/breakout',
      name: 'game-breakout',
      component: BreakoutView
    },
    {
      path: '/games/tank',
      name: 'game-tank',
      component: TankBattleView
    }
  ]
});

export default router;