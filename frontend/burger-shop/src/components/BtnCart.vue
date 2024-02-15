<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, UtensilsCrossed, Check, Eraser } from 'lucide-vue-next'
import type { ProductCart } from '@/@types'
import { ref, watch } from 'vue'
import { useCartStore } from '@/store/cart'
import { useRouter } from 'vue-router'

const $router = useRouter()
const $cartStore = useCartStore()

const products = ref<ProductCart[]>([])

const clearCart = () => {
  $cartStore.DESTROY_CART()
}

const getTotalQuantiy = () => {
  return products.value.reduce((acc, item) => acc + item.quantity, 0)
}

watch(
  () => $cartStore.cart,
  (newValue) => {
    if (newValue) {
      products.value = newValue.products
    }
  },
  { deep: true }
)
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="mt-4" as-child>
      <div>
        <ShoppingCart :class="`text-violet-700 hover:cursor-pointer`" />
        <div
          class="text-white relative bottom-8 left-5 bg-violet-600 text-center rounded-full h-3.5 w-3.5 text-[10px] font-medium animate-bounce"
        >
          {{ getTotalQuantiy() }}
        </div>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-25">
      <DropdownMenuGroup>
        <DropdownMenuItem
          v-for="product in products"
          :key="product.id"
          class="hover:cursor-pointer"
        >
          <div class="flex items-center w-full px-2 py-1 hover:text-violet-500">
            <UtensilsCrossed class="mr-2 h-4 w-4" />
            <Separator class="h-5 mr-2" orientation="vertical" />
            <div class="flex gap-5">
              <span>{{ product.quantity }}</span>
              <span>{{ product.name }}</span>
              <span>{{
                Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                  product.price
                )
              }}</span>
            </div>
          </div>
        </DropdownMenuItem>
        <div v-if="products.length !== 0">
          <div class="flex items-center justify-end gap-5 px-1 mb-2 mr-3">
            <!-- <span class="text-sm">Total:</span> -->
            <p class="text-sm font-mono">{{ $cartStore.cart.total }}</p>
          </div>
          <DropdownMenuSeparator />
          <div class="flex items-center justify-between px-2">
            <DropdownMenuItem @click="clearCart" class="hover:cursor-pointer">
              <div class="flex items-center">
                <Eraser class="mr-2 h-4 w-4 text-red-500" />
                <span>Clear Cart</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              @click.prevent.stop="$router.push({ name: 'home' })"
              class="hover:cursor-pointer"
            >
              <div class="flex items-center">
                <Check class="mr-2 h-4 w-4 text-green-500" />
                <span>Finalize Order</span>
              </div>
            </DropdownMenuItem>
          </div>
        </div>
        <div class="flex items-center justify-center" v-else>
          <h2 class="text-sm font-mono">Empty Cart.</h2>
        </div>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
