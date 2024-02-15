<script setup lang="ts">
import type { ProductDTOOut } from '@/@types'
import { useCartStore } from '@/store/cart'
import { Plus, Minus } from 'lucide-vue-next'

defineProps<{
  product: ProductDTOOut
}>()

const $cartStore = useCartStore()

const getQuantity = (product: ProductDTOOut) => {
  return $cartStore.FIND_PRODUCT(product.id)?.quantity
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Minus class="w-3 h-3 hover:cursor-pointer" @click="$cartStore.REMOVE_PRODUCT(product)" />
    <p class="text-sm">{{ getQuantity(product) }}</p>
    <Plus class="w-3 h-3 hover:cursor-pointer" @click="$cartStore.ADD_PRODUCT(product)" />
  </div>
</template>
