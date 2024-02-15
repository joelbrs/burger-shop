<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import DataTable from '@/components/DataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { useCartStore } from '@/store/cart'
import { h, watch, ref, onMounted } from 'vue'
import type { ProductCart } from '@/@types'
import { Check, CheckCircle2 } from 'lucide-vue-next'

const $cartStore = useCartStore()

const frete = 5

const data = ref<ProductCart[]>([])
const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => h('div', { class: 'text-white' }, row.getValue('name'))
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => h('div', { class: 'text-white' }, row.getValue('price'))
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: ({ row }) => h('div', { class: 'text-white' }, row.getValue('quantity'))
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => h('div', { class: 'text-white' }, row.getValue('total'))
  }
]

const getOrderTotal = () => {
  return $cartStore.FORMAT_PRICE(Number($cartStore.cart.total) + Number(frete))
}

watch(
  () => $cartStore.cart,
  (newValue) => {
    if (newValue) {
      data.value = $cartStore.GET_ALL_PRODUCTS_FORMATTED()
    }
  },
  { deep: true }
)

onMounted(() => {
  data.value = $cartStore.GET_ALL_PRODUCTS_FORMATTED()
})
</script>

<template>
  <main class="flex flex-col gap-10">
    <section class="flex flex-col gap-10 mt-24">
      <div class="flex items-center px-36">
        <div>
          <h1 class="font-bold font-mono text-4xl">Checkout</h1>
        </div>
      </div>
      <div class="flex px-10 items-center justify-around mb-20">
        <div>
          <DataTable :columns="columns" :data="data" />
        </div>
        <div>
          <Card class="w-[32vw]">
            <CardHeader>
              <CardTitle>Order Resume</CardTitle>
              <CardDescription
                >Congratulations on your purchase! Here is your order information.</CardDescription
              >
            </CardHeader>
            <CardContent>
              <div class="mb-2">
                <span>SubTotal: {{ $cartStore.FORMAT_PRICE($cartStore.cart.total) }}</span>
              </div>
              <div>
                <span>Frete: {{ $cartStore.FORMAT_PRICE(frete) }}</span>
              </div>
            </CardContent>

            <div class="px-6 gap-5 mb-2 flex flex-col items-center justify-center">
              <div class="self-start w-full flex items-center justify-between">
                <h2 class="font-medium text-xl">Total:</h2>
                <h2 class="font-bold">{{ getOrderTotal() }}</h2>
              </div>
              <Button
                class="hover:bg-primary-foreground text-white rounded-xl w-full"
                color="bg-popover"
              >
                <Check class="w-4 h-4 mr-2" />
                Finalize Order
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  </main>
</template>
