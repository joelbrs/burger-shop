<script setup lang="ts">
import { Card, CardContent } from '@/components/ui/card'
import SelectField from '@/components/SelectField.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div>
      <img class="w-lvw" src="../../assets/bg-burger-products.svg" />
    </div>

    <div class="self-start ml-[9vw]">
      <div>
        <h1 class="font-bold font-mono text-4xl">Products</h1>
        <div class="flex items-center gap-5 ml-5 mt-5">
          <div class="mt-5">
            <h3>Filters:</h3>
          </div>
          <div class="flex gap-2">
            <div>
              <Label>Name</Label>
              <Input placeholder="Name" />
            </div>
            <div>
              <SelectField
                id="category"
                label="Category"
                item-value="id"
                item-text="description"
                :items="[]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <Card
        class="max-w-[30vw] max-h-[25vh] border-violet-950"
        v-for="(_, index) in 9"
        :key="index"
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
                  <h1 class="text-md font-mono mb-3">Hambúrguer de Picanha</h1>
                  <p class="font-bold text-sm">R$ 39,00</p>
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
  </div>
</template>
