import { createRouter, createWebHistory } from 'vue-router';
const Login = () => import('@/pages/login/index.vue');
const Layout = () => import('@/pages/layout/index.vue');
const Page1 = () => import('@/pages/page1/index');
const Page2 = () => import('@/pages/page2/index.vue');
import { useUserStore } from '@/store/user';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          redirect: '/page1',
        },
        {
          path: '/page1',
          component: Page1,
        },
        {
          path: '/page2',
          component: Page2,
        },
      ],
    },
    {
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        // 路由守卫
        next();
      },
    },
  ], // 初始为 false，后续可以通过 router.addRoute 动态添加
});

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if (userStore.role === -1) {
    await userStore.check();
  }

  if (userStore.role === 0) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;
