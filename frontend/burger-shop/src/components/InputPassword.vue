<script setup lang="ts">
import { Input } from './ui/input'
import { Label } from './ui/label'
import { ref, computed, watch } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const $emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const seePass = ref<boolean>(false)
const password = ref<string>('')

const type = computed(() => {
  return seePass.value ? 'text' : 'password'
})

watch(
  () => password.value,
  (newValue) => {
    if (newValue) {
      $emits('update:modelValue', newValue)
    }
  }
)
</script>

<template>
  <Label for="password">Password</Label>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <Input v-model:model-value="password" :type="type" id="password" placeholder="Password" />
    </div>

    <div class="relative right-8 w-0 hover:cursor-pointer">
      <Eye @click="seePass = true" v-if="!seePass" />
      <EyeOff @click="seePass = false" v-else />
    </div>
  </div>
</template>
