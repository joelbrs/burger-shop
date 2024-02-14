<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart } from 'lucide-vue-next'
import BtnUserInfos from '@/components/BtnUserInfos.vue'

const $route = useRoute()

const isHome = $route.name === 'home'
const isCart = $route.name === 'cart'
const isProduct = $route.name === 'home-products' || $route.name === 'cart'

const setActive = (isCurrent: boolean) => {
  if (isCurrent) {
    return 'text-violet-700'
  }
  return 'hover:cursor-pointer hover:hover:text-violet-700'
}
</script>

<template>
  <header class="bg-secondary-foreground">
    <nav class="p-5">
      <div class="flex justify-between px-16 items-center">
        <div>
          <ul class="flex gap-5">
            <li :class="`text-md text-black font-serif ${setActive(isHome)}`">
              <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            </li>
            <li :class="`text-md text-black font-serif ${setActive(isProduct)}`">
              <RouterLink :to="{ name: 'home' }">Products</RouterLink>
            </li>
          </ul>
        </div>
        <div class="flex gap-5 h-7 items-center">
          <div class="text-black">
            <RouterLink :to="{ name: 'home' }">
              <ShoppingCart :class="setActive(isCart)" />
            </RouterLink>
          </div>
          <Separator orientation="vertical" />
          <div class="flex gap-2 items-center">
            <BtnUserInfos />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
