<script setup lang="ts">
import { ref, watch } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export interface Tab {
  id: string
  label: string
  title: string
  description?: string
  disabled?: boolean
}

const props = defineProps<{
  tabs: Tab[]
}>()

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const tab = ref<string>(props.tabs[0].id)

watch(
  () => tab.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Tabs v-model:model-value="tab" :default-value="tabs[0].id" class="w-[25vw]">
    <TabsList :class="`grid w-full grid-cols-2`">
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.id"
        :disabled="tab.disabled"
        :value="tab.id"
        class="data-[state=active]:border data-[state=active]:border-primary data-[state=active]:text-primary"
      >
        <slot :name="`label-${tab.id}`" />
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>
    <TabsContent v-for="tab in tabs" :key="tab.id" :value="tab.id">
      <Card class="border-primary">
        <CardHeader>
          <CardTitle class="text-bold text-2xl">{{ tab.title }}</CardTitle>
          <CardDescription>
            {{ tab.description }}
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <slot :name="`content-${tab.id}`" />
          <div class="pt-2">
            <slot class="" :name="`footer-${tab.id}`" />
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>
