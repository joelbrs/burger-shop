<script setup lang="ts">
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import { Separator } from '@/components/ui/separator'
import BtnUserInfos from '@/components/BtnUserInfos.vue'
import { onMounted, ref } from 'vue'
import BtnCart from './BtnCart.vue'

type RouteName = 'home' | 'products'

const $route = useRoute()

const active = ref({
  home: false,
  products: false
})

const activate = ({ name }: { name: RouteName }) => {
  for (const route in active.value) {
    if (route !== name) {
      active.value[route as keyof typeof active.value] = false
    }
  }
  active.value[name as keyof typeof active.value] = true
}

const setActive = (isCurrent: boolean) => {
  if (isCurrent) {
    return 'text-violet-500'
  }
  return 'hover:cursor-pointer hover:hover:text-violet-500'
}

onMounted(() => {
  const { name } = $route

  if (name) {
    activate({ name: name as RouteName })
  }
})
</script>

<template>
  <header class="w-full bg-primary-foreground">
    <nav class="p-5">
      <div class="flex justify-between px-16 items-center">
        <div>
          <ul class="flex gap-5">
            <li :class="`text-md font-serif ${setActive(active.home)}`">
              <RouterLink @click="activate({ name: 'home' })" :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
            <li :class="`text-md font-serif ${setActive(active.products)}`">
              <RouterLink @click="activate({ name: 'products' })" :to="{ name: 'products' }">
                Products
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="flex gap-5 h-7 items-center">
          <div>
            <RouterLink :to="{ name: 'home' }">
              <BtnCart />
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
