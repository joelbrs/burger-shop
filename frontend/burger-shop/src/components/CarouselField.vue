<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Button } from './ui/button'
import { Card, CardContent } from '@/components/ui/card'

export interface PropCarouselItem {
  id: string
  title: string
  img: string
  price?: string
}

defineProps<{
  items: PropCarouselItem[]
  type?: string
}>()
</script>

<template>
  <Carousel
    :opts="{
      align: 'start'
    }"
  >
    <CarouselContent class="-ml-1 w-[65vw]">
      <CarouselItem
        v-for="(item, index) in items"
        :key="item.title"
        class="pl-5 md:basis-1/2 lg:basis-1/4"
      >
        <div class="flex flex-col gap-2">
          <div class="p-1">
            <Card class="hover:cursor-pointer hover:scale-95 h-[30vh] bg-transparent border-none">
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <img class="rounded-lg" :src="item.img" />
              </CardContent>
            </Card>
          </div>

          <div v-if="type === 'offers'" class="w-[5vw] px-1.5">
            <div class="text-sm text-nowrap text-black">{{ item.title }}</div>
            <div class="text-sm font-bold text-black">{{ item.price }}</div>
          </div>

          <div class="flex items-center justify-center p-1">
            <Button
              class="w-full text-primary font-sans text-md rounded-md bg-violet-600 hover:bg-violet-500"
            >
              {{ type === 'offers' ? 'Take it Now!' : item.title }}
            </Button>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>

    <div v-if="items.length">
      <CarouselPrevious class="bg-violet-800 text-white" />
      <CarouselNext class="bg-violet-800 text-white" />
    </div>
  </Carousel>
</template>
