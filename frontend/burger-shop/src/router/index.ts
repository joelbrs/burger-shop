import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('../views/IndexPage.vue')
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/products/IndexPage.vue')
        }
      ],
      component: () => import('../layouts/MainLayout.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginPage.vue')
    }
  ]
})

router.beforeEach((to) => {
  const { cookies } = useCookies()
  if (to.name !== 'login') {
    const token: string | null = cookies.get('access_token')
    if (!token) {
      return { name: 'login' }
    }
  }
})

export default router
