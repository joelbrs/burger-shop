<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
  SelectItem
} from '@/components/ui/select'
import { Label } from './ui/label'
import { ref, watch } from 'vue'

defineProps<{
  label: string
  id: string
  items: any[]
  itemValue: string
  itemText: string
  disabled?: boolean
}>()

const $emits = defineEmits<{
  (e: 'update:modelValue', data: string): void
}>()

const value = ref<string>()

watch(
  () => value.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Label :for="id">{{ label }}</Label>
  <Select v-model:model-value="value" :disabled="disabled" :id="id">
    <SelectTrigger class="w-[180px]">
      <SelectValue :placeholder="label" />
    </SelectTrigger>

    <SelectContent>
      <SelectGroup v-for="item in items" :key="`${item[itemValue]}`">
        <SelectItem :value="`${item[itemValue]}`">{{ item[itemText] }}</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
