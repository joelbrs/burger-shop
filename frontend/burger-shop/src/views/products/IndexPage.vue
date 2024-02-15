<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import SelectField from '@/components/SelectField.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ProductApi } from '@/services'
import { Search } from 'lucide-vue-next'
import { onMounted, ref, watch } from 'vue'
import type { ProductDTOOut } from '@/@types'

interface Filters {
  name: string | null
  category: string | null
}

const filters = ref({
  category: '',
  name: ''
})

const loading = ref<boolean>(false)
const products = ref<ProductDTOOut[]>([])

const getProducts = async () => {
  const params: Filters = {
    name: filters.value.name || null,
    category: filters.value.category || null
  }

  loading.value = true
  const { data, error } = await ProductApi.getProducts(params)
  loading.value = false

  if (error) return

  products.value = data.content
}

watch(
  () => filters.value,
  async () => {
    if (!filters.value.name && !filters.value.category) {
      await getProducts()
    }
  },
  { deep: true }
)

onMounted(async () => {
  await getProducts()
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div>
      <img class="w-lvw" src="../../assets/bg-burger-products.svg" />
    </div>

    <div class="w-[77vw] flex items-center justify-start">
      <div>
        <h1 class="font-bold font-mono text-4xl">Products</h1>
        <div class="flex items-center gap-5 ml-5 mt-5">
          <div class="mt-5">
            <h3>Filters:</h3>
          </div>
          <div class="flex gap-2">
            <div>
              <Label>Name</Label>
              <Input v-model:model-value="filters.name" placeholder="Name" />
            </div>
            <div>
              <SelectField
                v-model:model-value="filters.category"
                id="category"
                label="Category"
                item-value="id"
                item-text="description"
                :items="[]"
              />
            </div>
            <div class="mt-6">
              <Button
                @click="getProducts"
                :loading="loading"
                :disabled="loading"
                color="bg-popover-foreground"
              >
                <Search v-if="!loading" class="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-5 pb-20">
      <Card
        class="max-w-[30vw] max-h-[25vh] border-violet-800"
        v-for="product in products"
        :key="product.id"
      >
        <CardContent>
          <div class="flex items-center justify-center gap-5">
            <div class="pt-5">
              <img
                class="rounded-md relative right-2 h-[20vh] w-full"
                src="../../assets/bg-burger-login.svg"
              />
            </div>

            <div class="flex flex-col justify-around h-[20vh] mt-5">
              <div class="mt-5">
                <div>
                  <h1 class="text-md font-mono mb-3">{{ product.name }}</h1>
                  <p class="font-bold text-sm">
                    {{
                      Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        product.price
                      )
                    }}
                  </p>
                </div>
              </div>
              <div>
                <Button class="w-full font-medium"> Adicionar </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    <div class="h-[20vh]" v-if="products.length === 0">
      <h3>No results.</h3>
    </div>
  </div>
</template>
