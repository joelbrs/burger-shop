<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SelectField from '@/components/SelectField.vue'
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5">
    <div>
      <img class="w-lvw" src="../../assets/bg-burger-products.svg" />
    </div>
    <div class="w-full ml-48">
      <SelectField
        id="category"
        label="Category"
        item-value="id"
        item-text="description"
        :items="[]"
      />
    </div>
    <div class="grid grid-cols-3 gap-5">
      <Card class="max-w-[30vw] max-h-[25vh]" v-for="(_, index) in 9" :key="index">
        <CardContent>
          <div class="flex items-center justify-center gap-5">
            <div class="h-full pt-5">
              <img class="rounded-md h-[20vh] w-[25vh]" src="../../assets/bg-burger-login.svg" />
            </div>

            <div class="flex flex-col">
              <div class="mt-5">
                <h1 class="text-md font-mono">Hambúrguer de Picanha</h1>
                <p class="font-bold text-sm">R$ 39,00</p>
                <div class="mt-2">
                  <Button class="w-full bg-violet-700 hover:bg-violet-500 text-white font-medium"
                    >Adicionar</Button
                  >
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
