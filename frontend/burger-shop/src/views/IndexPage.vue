<script setup lang="ts">
import CarouselField, { type PropCarouselItem } from '@/components/CarouselField.vue'
import { ref } from 'vue'

const categories = ref<PropCarouselItem[]>([
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  },
  {
    id: '12312312',
    title: 'Burgers',
    img: '',
    price: 'R$ 35,90'
  }
])
</script>
<template>
  <div class="flex flex-col items-center justify-center bg-secondary-foreground">
    <div>
      <img class="w-lvw" src="../assets/bg-burger-home.svg" />
    </div>
    <div
      class="flex flex-col items-center w-full h-[75vh] bg-popover gap-10 rounded-t-3xl relative bottom-6"
    >
      <div class="mt-14">
        <h1 class="font-medium text-4xl text-violet-200">CATEGORIES</h1>
      </div>
      <div>
        <CarouselField :items="categories" />
      </div>
    </div>
    <div
      class="flex flex-col items-center bg-secondary-foreground w-full h-[75vh] gap-10 relative bottom-6"
    >
      <div class="mt-14">
        <h1 class="font-medium text-4xl text-violet-950">OFFERS</h1>
      </div>
      <div>
        <CarouselField type="offers" :items="categories" />
      </div>
    </div>
  </div>
</template>
