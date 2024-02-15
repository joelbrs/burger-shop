import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useCookies } from 'vue3-cookies'
import { useCartStore } from '@/store/cart'
import type { ProductCart } from '@/@types'

const { cookies } = useCookies()

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
  const $userStore = useUserStore()
  const $cartStore = useCartStore()

  const token: string | null = cookies.get('access_token')
  const cart: string | null = localStorage.getItem('cart')

  if (token) {
    $userStore.SET_USER_BY_TOKEN_JWT(token)

    if (cart) {
      $cartStore.SET_CART(cart)
    }
  }

  if (to.name !== 'login') {
    if (!token) {
      return { name: 'login' }
    }
  }
})

export default router
